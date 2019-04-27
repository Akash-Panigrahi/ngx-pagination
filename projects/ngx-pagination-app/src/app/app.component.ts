import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngx-pagination-app';
  offset = 1;

  onPageChange(offset: number) {
    console.log({ offset });
  }
}
