import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers/customers.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerReportComponent } from './customer-report/customer-report.component';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { LeadsComponent } from './leads/leads.component';
import { ConversationsComponent } from './conversations/conversations.component';
import { SharedModule } from '../../shared/shared.module';
// import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [CustomersComponent, CustomerDetailsComponent, CustomerReportComponent, LeadsComponent, ConversationsComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTabsModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    RouterModule,
    NgSelectModule,
    SharedModule
    // NgbTabset
  ]
})
export class CustomerModule { }
