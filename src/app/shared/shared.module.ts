import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FilterPipe } from '../pipes/filter.pipe';
// import { LoaderComponent } from '../loader/loader.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { ErrorMsgComponent } from '../views/components/error-msg/error-msg.component';
// import { TextLoaderComponent } from '../views/components/text-loader/text-loader.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';
import { LoaderComponent } from '../loader/loader.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    // FilterPipe, 
    LoaderComponent, 
    // ErrorMsgComponent, TextLoaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,    
    RouterModule
  ],
  exports: [
    // LoaderComponent, 
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    LoaderComponent,
    RouterModule
    // ErrorMsgComponent, FilterPipe, TextLoaderComponent
  ]
})
export class SharedModule {}
