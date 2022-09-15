import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject ,  Observable } from 'rxjs';

@Injectable()
export class NavbarService {

  private tabsTemplate$: BehaviorSubject<TemplateRef<any>>;

  /**
   * Emits an event every time the value of the primary navbar
   * template changes
   *
   * @readonly
   * @type {Observable<TemplateRef<any>>}
   * @memberof NavbarService
   */
  get tabsTemplateChanges(): Observable<TemplateRef<any>> {
    return this.tabsTemplate$.asObservable();
  }

  // -------------------------------------------------------------------------
  // Constructor
  // -------------------------------------------------------------------------

  constructor() {
    // Initialize the subject
    this.tabsTemplate$ = new BehaviorSubject(null);
  }

  // -------------------------------------------------------------------------
  // Public methods
  // -------------------------------------------------------------------------

  /**
   * Sets the template reference for the primary navbar
   *
   * @param {TemplateRef<any>} templateRef - the template reference
   * @memberof NavbarService
   */
  loadTabsTemplate(templateRef: TemplateRef<any>): void {
    this.tabsTemplate$.next(templateRef);
  }

  /**
   * Unloads the template from the primary navbar
   *
   * @memberof NavbarService
   */
  unloadTabsTemplate(): void {
    this.tabsTemplate$.next(null);
  }

}
