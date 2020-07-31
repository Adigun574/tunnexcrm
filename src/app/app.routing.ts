import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

// import { AuthGuard } from './auth.guard';

// import { P404Component } from './views/error/404.component';
// import { P500Component } from './views/error/500.component';
// import { LoginComponent } from './views/login/login.component';
// import { RegisterComponent } from './views/register/register.component';

// import { AuthGuard } from './util/auth.guard';
import { AuthGuard } from './auth.guard';
import { CustomersComponent } from './views/customer/customers/customers.component';
import { CustomerDetailsComponent } from './views/customer/customer-details/customer-details.component';
import { SalesReportComponent } from './views/sale/sales-report/sales-report.component';
import { EmployeesComponent } from './views/employee/employees/employees.component';
import { EmployeeDetailComponent } from './views/employee/employee-detail/employee-detail.component';
import { InventoryComponent } from './views/sale/inventory/inventory.component';
import { CustomerReportComponent } from './views/customer/customer-report/customer-report.component';
import { RequestedItemsComponent } from './views/sale/requested-items/requested-items.component';
import { MessagingComponent } from './views/messaging/messaging.component';
import { TrainingProgramsComponent } from './views/employee/training-programs/training-programs.component';
import { SkillMonitoringComponent } from './views/employee/skill-monitoring/skill-monitoring.component';
import { LoginComponent } from './views/login/login.component';
import { ProductsComponent } from './views/product/products/products.component';
import { EditProductComponent } from './views/product/edit-product/edit-product.component';
import { RoleComponent } from './views/employee/role/role.component';
import { UserComponent } from './views/employee/user/user.component';
import { PosComponent } from './views/sale/pos/pos.component';
import { SalesHistoryComponent } from './views/sale/sales-history/sales-history.component';
import { LeadsComponent } from './views/customer/leads/leads.component';
import { ConversationsComponent } from './views/customer/conversations/conversations.component';
import { AssessmentComponent } from './views/employee/assessment/assessment.component';
import { InvoiceComponent } from './views/sale/invoice/invoice.component';
import { DebtorsReportComponent } from './views/sale/debtors-report/debtors-report.component';
// import { HomeComponent } from './views/home/home.component';

export const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
    path: 'main',
    component:DefaultLayoutComponent,
    children:[
      {
        path:'',
        component:SalesReportComponent,
        data: {
          title: 'saleshistory'
        }
      },
      {
        path:'customers',
        component:CustomersComponent,
        data: {
          title: 'customer'
        },
        canActivate:[AuthGuard]
      },
      {
        path:'products',
        component:ProductsComponent,
        data: {
          title: 'product'
        },
        canActivate:[AuthGuard]
      },
      {
        path:'product/:id',
        component:EditProductComponent,
        data: {
          title: 'product'
        },
        canActivate:[AuthGuard]
      },
      {
        path:'customer/:id',
        component:CustomerDetailsComponent,
        data: {
          title: 'customer'
        },
        canActivate:[AuthGuard]
      },
      {
        path:'salesreport',
        component:SalesReportComponent,
        data: {
          title: 'saleshistory'
        },
        canActivate:[AuthGuard]
      },
      {
        path:'employees',
        component:EmployeesComponent,
        data: {
          title: 'employees'
        },
        canActivate:[AuthGuard]
      },
      {
        path:'employee/:id',
        component:EmployeeDetailComponent,
        data: {
          title: 'employees'
        },
        canActivate:[AuthGuard]
      },
      {
        path:'inventory',
        component:InventoryComponent,
        data: {
          title: 'inventory'
        },
        canActivate:[AuthGuard]
      },
      {
        path:'customers-report',
        component:CustomerReportComponent,
        data: {
          title: 'customersreport'
        },
        canActivate:[AuthGuard]
      },
      {
        path:'requested-items',
        component:RequestedItemsComponent,
      },
      {
        path:'messaging',
        component:MessagingComponent
      },
      {
        path:'training-programs',
        component:TrainingProgramsComponent,
        data: {
          title: 'training programmes'
        },
        canActivate:[AuthGuard]
      },
      {
        path:'skill-monitoring',
        component:SkillMonitoringComponent,
        data: {
          title: 'skillmonitoring'
        },
        canActivate:[AuthGuard]
      },
      {
        path:'role',
        component:RoleComponent,
        data: {
          title: 'role'
        },
        canActivate:[AuthGuard]
      },
      {
        path:'user',
        component:UserComponent,
        data: {
          title: 'users'
        },
        canActivate:[AuthGuard]
      },
      {
        path:'pos',
        component:PosComponent,
        data: {
          title: 'pos'
        },
        canActivate:[AuthGuard]
      },
      {
        path:'sales-history',
        component:SalesHistoryComponent,
        data: {
          title: 'saleshistory'
        },
        canActivate:[AuthGuard]
      },
      {
        path:'leads',
        component:LeadsComponent,
        data: {
          title: 'leads'
        },
        canActivate:[AuthGuard]
      },
      {
        path:'conversations/:id',
        component:ConversationsComponent,
      },
      {
        path:'assessment',
        component:AssessmentComponent,
      },
      {
        path:'invoice/:customerID/:invoiceNo',
        component:InvoiceComponent,
      },
      {
        path:'debtors-report',
        component:DebtorsReportComponent,
      },
      {
        path:'**',
        component:SalesReportComponent
      }
    ]
  }
  // {
  //   path: '',
  //   redirectTo: 'home', // should be dashboard but only for user  with user credentials
  //   pathMatch: 'full'
  // },
  // {
  //   path: '404',
  //   component: P404Component,
  //   data: {
  //     title: 'Page 404'
  //   }
  // },
  // {
  //   path: '500',
  //   component: P500Component,
  //   data: {
  //     title: 'Page 500'
  //   }
  // },
  // {
  //   path: 'home',
  //   component: HomeComponent,
  //   data: {
  //     title: 'Home Page'
  //   }
  // },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  //   data: {
  //     title: 'Login Page'
  //   }
  // },
  // {
  //   path: 'register',
  //   component: RegisterComponent,
  //   data: {
  //     title: 'Register Page'
  //   }
  // },
  // {
  //   path: '',
  //   component: DefaultLayoutComponent,
  //   canActivate: [AuthGuard],
  //   data: {
  //     title: 'Home'
  //   },
  //   children: [
  //     {
  //       path: 'employee',
  //       loadChildren: () =>
  //         import('./views/employee/employee.module').then(m => m.EmployeeModule)
  //     },
  //     {
  //       path: 'leave',
  //       loadChildren: () =>
  //         import('./views/leave/leave.module').then(m => m.LeaveModule)
  //     },
  //     {
  //       path: 'attendance',
  //       loadChildren: () =>
  //         import('./views/attendance/attendance.module').then(
  //           m => m.AttendanceModule
  //         )
  //     },
  //     {
  //       path: 'base',
  //       loadChildren: () =>
  //         import('./views/base/base.module').then(m => m.BaseModule)
  //     },
  //     {
  //       path: 'payroll',
  //       loadChildren: () =>
  //         import('./views/allPayroll/payroll.module').then(m => m.PayrollModule)
  //     },

  //     {
  //       path: 'charts',
  //       loadChildren: () =>
  //         import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule)
  //     },
  //     {
  //       path: 'dashboard',
  //       loadChildren: () =>
  //         import('./views/dashboard/dashboard.module').then(
  //           m => m.DashboardModule
  //         )
  //     },

  //     {
  //       path: 'notifications',
  //       loadChildren: () =>
  //         import('./views/notifications/notifications.module').then(
  //           m => m.NotificationsModule
  //         )
  //     },

  //     {
  //       path: 'widgets',
  //       loadChildren: () =>
  //         import('./views/widgets/widgets.module').then(m => m.WidgetsModule)
  //     }
  //   ]
  // },
  // { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule {}
