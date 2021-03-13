import { NgModule}  from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { CustomersComponent } from './customers.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { FilterTextboxComponent } from './customers-list/filter-textbox.component';
import { CustomersRoutingModule } from './customers-routing.module';

@NgModule({
    imports: [ CommonModule, SharedModule, FormsModule, CustomersRoutingModule ],
    declarations: [CustomersComponent, CustomersListComponent, FilterTextboxComponent],
    exports: [CustomersComponent]
})
export class CustomersModule{

}