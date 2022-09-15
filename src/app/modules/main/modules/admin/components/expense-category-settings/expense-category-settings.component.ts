import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 're-expense-category-settings',
  templateUrl: './expense-category-settings.component.html',
  styleUrls: ['./expense-category-settings.component.scss']
})
export class ExpenseCategorySettingsComponent implements OnInit {

  @Input()
  public categoryList = [];

  @Input()
  public icons = [];

  @Output()
  private addNewCategoryEvent = new EventEmitter();

  @Output()
  private closeEvent = new EventEmitter();

  public newCategory = null;
  public editingIndex = null;

  constructor() { }

  ngOnInit(): void {
  }

  addCategoryToList(): void {
    this.addNewCategoryEvent.emit(this.newCategory);
   }

   close(): void{
    this.closeEvent.emit();
   }

   edit(i: number): void {
     this.editingIndex = i;
   }

   saveEdit(i: number): void {
    this.editingIndex = null;
   }

}
