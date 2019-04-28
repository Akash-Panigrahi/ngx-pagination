import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule, MatButtonModule, MatIconModule } from '@angular/material';

import { NgxPaginationComponent } from './components/ngx-pagination/ngx-pagination.component';

@NgModule({
  declarations: [NgxPaginationComponent],
  imports: [
    CommonModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [NgxPaginationComponent]
})
export class NgxPaginationModule { }
