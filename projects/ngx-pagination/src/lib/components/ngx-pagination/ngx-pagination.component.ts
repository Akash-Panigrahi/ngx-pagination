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
  @Input()
  offset = 0;

  @Input()
  limit = 1;

  @Input()
  size = 1;

  @Input()
  range = 3;

  @Output()
  pageChange = new EventEmitter<number>();

  pages: Observable<number[]>;
  currentPage: number;
  totalPages: number;

  constructor() { }

  ngOnInit() {
    this.createPages(this.offset, this.limit, this.size);
  }

  ngOnChanges() {
    this.createPages(this.offset, this.limit, this.size);
  }

  createPages(offset: number, limit: number, size: number) {
    this.currentPage = this.getCurrentPage(offset, limit);
    this.totalPages = this.getTotalPages(limit, size);
    this.pages = range(-this.range, this.range * 2 + 1)
      .pipe(
        map(offset => this.currentPage + offset),
        filter(page => this.isValidPageNumber(page, this.totalPages)),
        toArray()
      );
  }

  isValidPageNumber(page: number, totalPages: number): boolean {
    return page > 0 && page <= totalPages;
  }

  getCurrentPage(offset: number, limit: number): number {
    return Math.floor(offset / limit) + 1;
  }

  getTotalPages(limit: number, size: number): number {
    return Math.ceil(Math.max(size, 1) / Math.max(limit, 1));
  }

  selectPage(page: number, event: Event) {
    this.cancelEvent(event);

    if (this.isValidPageNumber(page, this.totalPages)) {
      const offset = (page - 1) * this.limit;

      this.createPages(offset, this.limit, this.size);
      this.pageChange.emit(offset);
    }
  }

  cancelEvent(event: Event) {
    event.preventDefault();
  }
}
