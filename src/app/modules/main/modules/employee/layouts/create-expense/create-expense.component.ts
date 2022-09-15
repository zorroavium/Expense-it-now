import { CreateExpenseState } from './../../store/create-expense/create-expense.state';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BsModalService } from 'ngx-bootstrap/modal';
import * as Moment from 'moment';

import * as employeeStore from './../../store/create-expense';

const QUILL_MODULE = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline'],
    ['formula'],
    ['image', 'code-block']
  ]
};

const CATEGORY = [
  'Travel Expense',
  'Meal and Entertaintment',
  'Office Supplies',
  'Parking',
  'Other Expense'
]
@Component({
  selector: 're-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.scss']
})
export class CreateExpenseComponent implements OnInit, OnChanges {

  @Input()
  public editExpense = null;

  public form: FormGroup;

  public quillModule = QUILL_MODULE;

  public files = [];

  public categoryList = CATEGORY;

  public columnDefs = [
   { headerName: 'Expense name'},
   { headerName: 'Category'},
   { headerName: 'Description'},
   { headerName: 'Amount'},
   { headerName: 'Upload File', pinned: 'right'}
  ];

  constructor(private fb: FormBuilder,
              private store: Store<{ loginStore: CreateExpenseState }>,
              private modalService: BsModalService) {}

  ngOnInit(): void {
    if (!this.editExpense) {
      this.form = this.buildForm(null);
    }
  }

  ngOnChanges(Changes: SimpleChanges): void {
    if (Changes.editExpense && this.editExpense) {
      this.form = this.buildForm(this.editExpense);
    }
  }

  buildForm(expenseDetail): FormGroup {
    const isDisabled = this.checkLastUpdatedOn(expenseDetail);
    return this.fb.group({
      expenseForm: this.fb.group({
        expenseCategory: [{value: expenseDetail ? expenseDetail.category : null, disabled : isDisabled}],
        expenseDescription: [{value: expenseDetail ? expenseDetail.description : null,  disabled : isDisabled}],
        expenseAmount: [{value: expenseDetail ? expenseDetail.amount : null,  disabled : isDisabled}],
        expenseDate: [{value: expenseDetail ? new Date(Moment(expenseDetail.expense_date, 'DD/MM/YYYY').format('YYYY-MM-DD')) : null,
           disabled : isDisabled}],
        expenseFile: []
      })
    });
  }

  saveExpense(): void {
    this.store.dispatch(employeeStore.CreateExpense(null));

    setTimeout(() => this.closeBtn(), 500);
  }

  closeBtn(): void {
    this.modalService.hide();
  }

  checkLastUpdatedOn(expenseDetail): boolean {
   let disabled = false;

   if (expenseDetail && expenseDetail['expense_status'] && expenseDetail.expense_status.length) {
    expenseDetail.expense_status.forEach(expense => {
      if (expense.last_update_on && !disabled ) {
         disabled = true;
      }
    });
   }

   return disabled;
  }

  processFile(event): void {
    const file: File = event.files[0];

    if (file) {
      const fileReader = new FileReader();

      // Event triggered after file is read, then converted to base 64
      fileReader.onload = this.convertFileToBase64.bind(this, file.name);
      fileReader.readAsDataURL(file);

    }
  }

  convertFileToBase64(fileName: string, event: any): void {

    const data = event.target.result;

    this.files.push({fileName, fileData: data.split('base64,')[1]});

    this.prepareFilesList();

    if (this.form) {
     this.form.markAsDirty();
    }
  }

  prepareFilesList(): void {

     this.files = this.files.map(file => {
       if (file && !file.progress) {
        file.progress = 0;
       }

       return file;
     });

     this.uploadFilesSimulator(0);
  }

  uploadFilesSimulator(index: number): void {

    setTimeout(() => {
        if (index === this.files.length) {

            // this.fileUploadComplete.emit(this.filesAsJSON);
            return;
        } else {
            const progressInterval = setInterval(() => {

                if (this.files[index].progress === 100) {
                    clearInterval(progressInterval);
                    this.uploadFilesSimulator(index + 1);
                } else {
                    this.files[index].progress += 5;
                }

            }, 100);
        }
    }, 1000);
  }

  deleteFile(index: number): void {
   this.files = this.files.filter((file, idx) => idx !== index);
  }

}
