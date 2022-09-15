import { Component, OnInit, TemplateRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { OverlayContainer } from '@angular/cdk/overlay';
import { NavbarService } from 'app/shared/services/navbar.service';
import { StorageUtil, StorageType, StorageKeys } from 'app/shared';

@Component({
  selector: 're-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  public tabsTemplate: TemplateRef<any>;
  public user = { userName: 'Axay Nisang' };

  private unsubscribe$ = new Subject();

  constructor(
    private router: Router,
    private overlayContainer: OverlayContainer,
    private navbarService: NavbarService) { }

  ngOnInit(): void {
    const user = StorageUtil.getAttribute(StorageType.SESSION, StorageKeys.LOGGED_IN_USER);

    if (user === 'ADMIN') {
      this.loadTabsTemplate();
    }
  }

  private loadTabsTemplate(): void {
    this.navbarService.tabsTemplateChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(template => {
        // Register this as a macrotask to prevent change detection error
        setTimeout(() => {
          this.tabsTemplate = template;
        }, 0);
      });
  }

  logout(): void {
    this.router.navigate(['/login']);
  }

  toggleTheme(): void {

    if (this.overlayContainer.getContainerElement().classList.contains('unicorn-dark-theme')) {
      this.overlayContainer.getContainerElement().classList.remove('unicorn-dark-theme');
      document.querySelector('.page-wrapper').classList.remove('unicorn-dark-theme');
    } else {
      this.overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');
      document.querySelector('.page-wrapper').classList.add('unicorn-dark-theme');
    }
  }

}
