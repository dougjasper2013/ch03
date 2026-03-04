import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CopyrightDirective } from './copyright.directive';
import { NumericDirective } from './numeric.directive.spec';
import { APP_SETTINGS, appSettings } from './app.settings';
import { Observable } from 'rxjs';
import { KeyLoggerComponent } from './key-logger/key-logger.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductListComponent, CopyrightDirective, NumericDirective, KeyLoggerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    { provide: APP_SETTINGS, useValue: appSettings }
  ]
})
export class AppComponent {
  title = 'ch03';

  settings = inject(APP_SETTINGS);

  private setTitle = () => {
    const timestamp = new Date();
    this.title = `${this.settings.title} (${timestamp})`;
  }

  private changeTitle(callback: Function) {
    setTimeout(() => {
      callback();
    }, 2000);
  }

  constructor() {
    // this.changeTitle(this.setTitle);
    // this.onComplete().then(this.setTitle);
    // this.title$.subscribe(this.setTitle);
    this.title$.subscribe(this.setTitle);
  }

  private onComplete() {
    return new Promise<void>(resolve => {
      setInterval(() => {
        resolve();
      }, 2000);
    });
  }

  title$ = new Observable(observer => {
    setInterval(() => {
      observer.next(this.setTitle);
    }, 2000);
  });
  
}
