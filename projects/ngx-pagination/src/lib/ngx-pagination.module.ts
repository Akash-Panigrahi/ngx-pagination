import { NgModule } from '@angular/core';
import { NgxPaginationComponent } from './components/ngx-pagination/ngx-pagination.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [NgxPaginationComponent],
  imports: [
    CommonModule
  ],
  exports: [NgxPaginationComponent]
})
export class NgxPaginationModule { }
