import { Component, OnInit, EventEmitter, Input, Output, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Observable, range } from 'rxjs';
import { map, filter, toArray } from 'rxjs/operators';

@Component({
  selector: 'np-ngx-pagination',
  templateUrl: './ngx-pagination.component.html',
  styleUrls: ['./ngx-pagination.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NgxPaginationComponent implements OnInit {

  @Input() id: string;
  @Input() currentPage = 1;
  @Input() elementsPerPage = 10;
  @Input() totalElements = 100;
  @Input() maxPages = 3;
  @Input() endPages = true;
  @Input() adjacentPages = true;

  @Output()
  pageChange = new EventEmitter<number>();

  visiblePages: Observable<number[]>;
  totalPages: number;

  constructor() { }

  ngOnInit() {
    this.createPages(this.currentPage, this.elementsPerPage, this.totalElements);
  }

  ngOnChanges() {
    this.createPages(this.currentPage, this.elementsPerPage, this.totalElements);
  }

  createPages(offset: number, elementsPerPage: number, totalElements: number) {
    this.currentPage = offset;
    this.totalPages = this.getTotalPages(elementsPerPage, totalElements);
    this.visiblePages = range(-this.maxPages, this.maxPages * 2 + 1)
      .pipe(
        map(offset => this.currentPage + offset),
        filter(page => this.isValidPageNumber(page, this.totalPages)),
        toArray()
      );
  }

  isValidPageNumber(page: number, totalPages: number): boolean {
    return page > 0 && page <= totalPages;
  }

  getCurrentPage(offset: number, elementsPerPage: number): number {
    return Math.floor(offset / elementsPerPage) + 1;
  }

  getTotalPages(elementsPerPage: number, totalElements: number): number {
    return Math.ceil(Math.max(totalElements, 1) / Math.max(elementsPerPage, 1));
  }

  selectPage(page: number, event: Event) {
    this.cancelEvent(event);

    if (this.isValidPageNumber(page, this.totalPages)) {

      this.createPages(page, this.elementsPerPage, this.totalElements);
      this.pageChange.emit(page);
    }
  }

  cancelEvent(event: Event) {
    event.preventDefault();
  }
}
