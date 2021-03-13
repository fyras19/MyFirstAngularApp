import { Component, OnInit, Input } from '@angular/core';

import { SorterService } from '../../core/sorter.service';
import { ICustomer } from '../../shared/interfaces'

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {
  private _customers: ICustomer[] = [];
  @Input() get customers(): ICustomer[] {
    return this._customers;
  }

  set customers(value: ICustomer[]){
    if(value){
      this.filteredCustomers = this._customers = value;
      this.calculateOrders();
    }
  }

  filteredCustomers: ICustomer[] = [];
  customersOrderTotal: number = 0;
  currencyCode: string = 'USD';


  constructor(private sorterService:SorterService) {}

  ngOnInit(): void {
    
  }

  calculateOrders(){
    this.customersOrderTotal = 0;
    this.filteredCustomers.forEach((cust: ICustomer) => {
      if(cust.orderTotal)
        this.customersOrderTotal += cust.orderTotal;
    });
  }

  filter(data: string){
    if(data){
      this.filteredCustomers = this.filteredCustomers.filter((cust: ICustomer) => {
        if(cust.orderTotal)
          return cust.name.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
                cust.city.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
                cust.orderTotal.toString().indexOf(data) > -1;
        else return cust.name.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
                    cust.city.toLowerCase().indexOf(data.toLowerCase()) > -1;
      });
    }
    else {
      this.filteredCustomers = this.customers;
    }
    this.calculateOrders();
  }

  sort(prop: string){
    // A sorter service will handle the sorting
    this.sorterService.sort(this.filteredCustomers, prop);
  }

}
