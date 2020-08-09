import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesReportComponent } from './sales-report/sales-report.component';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InventoryComponent } from './inventory/inventory.component';
import { RouterModule } from '@angular/router';
import { RequestedItemsComponent } from './requested-items/requested-items.component';
import { PosComponent } from './pos/pos.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../shared/shared.module';
import { SalesHistoryComponent } from './sales-history/sales-history.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { DebtorsReportComponent } from './debtors-report/debtors-report.component';
import { QuotationComponent } from './quotation/quotation.component';
import { WaybillComponent } from './waybill/waybill.component';
import { SalesHistory2Component } from './sales-history2/sales-history2.component';



@NgModule({
  declarations: [SalesReportComponent, InventoryComponent, RequestedItemsComponent, PosComponent, SalesHistoryComponent, InvoiceComponent, DebtorsReportComponent, QuotationComponent, WaybillComponent, SalesHistory2Component],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    RouterModule,
    NgSelectModule,
    SharedModule
  ]
})
export class SaleModule { }
