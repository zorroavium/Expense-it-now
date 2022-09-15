import { Component } from '@angular/core';
import { NavigationEnd, Router, RoutesRecognized } from '@angular/router';

// Application internal imports
import { StorageUtil, StorageType, StorageKeys } from './shared';

@Component({
  selector: 're-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router) {
    router.events.subscribe((events) => {
      if (events instanceof NavigationEnd) {
        this.validateAuthorization(events);
      }
    });
  }

  private validateAuthorization(events: NavigationEnd): void {
    const user = StorageUtil.getAttribute(StorageType.SESSION, StorageKeys.LOGGED_IN_USER);

    if (user === 'EMPLOYEE' && !!events.url.includes('/admin')) {
      this.router.navigate(['/login']);
    }

  }
}
