import { Component, OnInit } from '@angular/core';

@Component({
  selector: 're-expense-categories',
  templateUrl: './expense-categories.component.html',
  styleUrls: ['./expense-categories.component.scss']
})
export class ExpenseCategoriesComponent implements OnInit {

  public categories = [
    { id: 0, name: 'Stationary',  icon: 'fa fa-2x fa-pencil text-pink',       label: 'Stationary',     value: 1000},
    { id: 1, name: 'travel',      icon: 'fa fa-2x fa-plane text-primary',        label: 'Travelling',     value: 1200},
    { id: 2, name: 'canteen',     icon: 'fa fa-2x fa-cutlery text-warning',      label: 'Canteen',        value: 2000},
    { id: 3, name: 'equipment',   icon: 'fa fa-2x fa-headphones',                label: 'Equipment',      value: 800},
    { id: 4, name: 'course',      icon: 'fa fa-2x fa-book text-success',         label: 'Training',       value: 5000},
    { id: 4, name: 'medical',     icon: 'fa fa-2x fa-medkit text-red',           label: 'Medical',        value: 10000},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
