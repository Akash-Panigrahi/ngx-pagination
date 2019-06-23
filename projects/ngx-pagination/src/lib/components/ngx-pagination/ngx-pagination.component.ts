import { Component, OnInit, EventEmitter, Input, Output, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Observable, range } from 'rxjs';
import { map, filter, toArray, take } from 'rxjs/operators';

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
    @Input() boundaryPagesHandles = true;
    @Input() adjacentPagesHandles = true;
    @Input() morePagesHint = true;
    @Input() edgePages = true; // works only if moreHintPages is true
    @Input() rotate = true;
    @Input() disabled = false;
    @Input() autoHide = false;

    @Output()
    pageChange = new EventEmitter<number>();

    visiblePages: number[];
    totalPages: number;

    constructor() { }

    ngOnInit() {
        console.log('Meow');
        this._createOrUpdatePages();
    }

    ngOnChanges() {
        this._createOrUpdatePages();
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

            this._createOrUpdatePages();
            this.pageChange.emit(page);
        }
    }

    cancelEvent(event: Event) {
        event.preventDefault();
    }

    private _applyPagination(): [number, number] {
        const page = Math.ceil(this.currentPage / this.elementsPerPage) - 1;
        const start = page * this.elementsPerPage;
        const end = start + this.elementsPerPage;

        return [start, end];
    }

    /** informative functions */
    hasBefore(): boolean {
        return this.currentPage > 1;
    }

    hasAfter(): boolean {
        return this.currentPage < this.totalPages;
    }

    isBeforeDisabled(): boolean {
        return !this.hasBefore() || this.disabled;
    }

    isAfterDisabled(): boolean {
        return !this.hasAfter() || this.disabled;
    }

    private _applyMorePagesHint(from: number, to: number): void {
        if (from > 0 && from > 1) {
            this.visiblePages.unshift(-1);
        }
        if (to < this.totalPages && to < (this.totalPages - 1)) {
            this.visiblePages.push(-1);
        }
    }

    private _applyEdgePages(from: number, to: number): void {
        if (from > 0) {
            this.visiblePages.unshift(1);
        }
        if (to > this.totalPages) {
            this.visiblePages.push(this.totalPages);
        }
    }

    private _applyRotation(): [number, number] {
        let start = 0;
        let end = this.totalPages;
        let leftOffset = Math.floor(this.maxPages / 2);
        let rightOffset = this.maxPages % 2 === 0 ? leftOffset - 1 : leftOffset;

        if (this.currentPage <= leftOffset) {
            // very beginning, no rotation -> [0..maxPages]
            end = this.maxPages;
        } else if (this.totalPages - this.currentPage < leftOffset) {
            // very end, no rotation -> [len-maxPages..len]
            start = this.totalPages - this.maxPages;
        } else {
            // rotate
            start = this.currentPage - leftOffset - 1;
            end = this.currentPage + rightOffset;
        }

        return [start, end];
    }

    private _createOrUpdatePages(): void {
        console.log('totalPages', this.totalPages);

        this.totalPages = this.getTotalPages(this.elementsPerPage, this.totalElements);

        range(1, this.totalPages)
            .pipe(
                toArray(),
                take(1)
            )
            .subscribe(visiblePages => this.visiblePages = visiblePages);

        if (this.maxPages > 0 && this.totalPages > this.maxPages) {
            let from = 0;
            let to = this.totalPages;

            // either paginating or rotating page numbers
            if (this.rotate) {
                [from, to] = this._applyRotation();
            } else {
                [from, to] = this._applyPagination();
            }

            this.visiblePages = this.visiblePages.slice(from, to);

            if (this.morePagesHint) {
                this._applyMorePagesHint(from, to);

                if (this.edgePages) {
                    this._applyEdgePages(from, to);
                }
            }
        }

        console.log('totalPages', this.totalPages);
    }
}
