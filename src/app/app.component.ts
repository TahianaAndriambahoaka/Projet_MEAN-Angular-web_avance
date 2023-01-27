import { AfterViewInit, Component } from '@angular/core';
import { LoadingComponent } from './loading/loading.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  entryComponents: [LoadingComponent]
})
export class AppComponent implements AfterViewInit {
  title = 'm1p10mean-tahiana-tsantaniaina';
  loading: boolean = true;

  constructor() {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.loading = false;
   }, 1000);
  }
}
