import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

// import { P404Component } from './views/error/404.component';
// import { P500Component } from './views/error/500.component';
// import { LoginComponent } from './views/login/login.component';
// import { RegisterComponent } from './views/register/register.component';

const APP_CONTAINERS = [DefaultLayoutComponent];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ChartsModule } from 'ng2-charts';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ErrorInterceptor } from './util/error.interceptor';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { GlobalErrorHandler } from './util/global-error-handler';
import { CustomerModule } from './views/customer/customer.module';
import { SaleModule } from './views/sale/sale.module';
import { EmployeeModule } from './views/employee/employee.module';
import { MessagingComponent } from './views/messaging/messaging.component';
import { LoginComponent } from './views/login/login.component';
import { ProductModule } from './views/product/product.module';
import { NgxPaginationModule } from 'ngx-pagination';
//import { TotalsComponent } from './views/sale/invoice/totals/totals.component';



@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    NgbModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    SweetAlert2Module.forRoot(),
    ChartsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AngularMaterialModule,
    CustomerModule,
    SaleModule,
    EmployeeModule,
    ProductModule,
    NgxPaginationModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    MessagingComponent,
    LoginComponent,
   // TotalsComponent,
    // P404Component,
    // P500Component,
    // LoginComponent,
    // RegisterComponent
  ],
  entryComponents: [
    // DialogBoxComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],

  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    // { provide: ErrorHandler, useClass: GlobalErrorHandler },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ErrorInterceptor,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

// https://www.google.com/search?q=Refused+to+apply+style+from+%27http%3A%2F%2Flocalhost%3A5000%2Fcustomer%2Fassets%2Fjs%2Fplugins%2F%40fortawesome%2Ffontawesome-free%2Fcss%2Fall.min.css%27+because+its+MIME+type+(%27text%2Fhtml%27)+is+not+a+supported+stylesheet+MIME+type%2C+and+strict+MIME+checking+is+enabled.&rlz=1C1CHBF_enNG870NG870&oq=Refused+to+apply+style+from+%27http%3A%2F%2Flocalhost%3A5000%2Fcustomer%2Fassets%2Fjs%2Fplugins%2F%40fortawesome%2Ffontawesome-free%2Fcss%2Fall.min.css%27+because+its+MIME+type+(%27text%2Fhtml%27)+is+not+a+supported+stylesheet+MIME+type%2C+and+strict+MIME+checking+is+enabled.&aqs=chrome..69i57.552j0j7&sourceid=chrome&ie=UTF-8
