import { OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { NavbarService } from 'app/shared/services/navbar.service';

@Component({
  selector: 're-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AdminLayoutComponent implements OnInit {

  @ViewChild('tabsTemplate', { static: true })
  public tabsTemplate: TemplateRef<any>;

  public selectedIndex = 0;

  constructor(private navbarService: NavbarService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.navbarService.loadTabsTemplate(this.tabsTemplate);

    this.updateActiveTabSelection();

    this.router.events.subscribe((events) => {
      if (events instanceof NavigationEnd) {

        this.updateActiveTabSelection();
        console.log('upadted');
      }
    });
  }

  private updateActiveTabSelection(): void {
    if (window.location.hash.includes('/expense')) {
      this.selectedIndex = 1;
    }
    if (window.location.hash.includes('/approval')) {
      this.selectedIndex = 2;
    }
    if (window.location.hash.includes('/category')) {
      this.selectedIndex = 3;
    }
  }

  tabClick(event: MatTabChangeEvent): void {
    this.router.navigate([event.tab.textLabel], { relativeTo: this.activatedRoute.parent });
  }
}
