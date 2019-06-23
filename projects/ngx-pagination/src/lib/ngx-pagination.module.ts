import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

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
