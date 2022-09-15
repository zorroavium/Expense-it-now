import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'at-slider-sidebar',
  templateUrl: './slider-sidebar.component.html',
  styleUrls: ['./slider-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('sliderLeft', [
      state('0', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      state('1', style({
        opacity: 0,
        transform: 'translateX(-320px)'
      })),
      transition('1 => 0', animate('250ms linear')),
      transition('0 => 1', animate('250ms linear'))
    ]),
    trigger('sliderRight', [
      state('0', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      state('1', style({
        opacity: 0,
        transform: 'translateX(320px)'
      })),
      transition('1 => 0', animate('250ms linear')),
      transition('0 => 1', animate('250ms linear'))
    ])
  ]
})
export class SliderSidebarComponent {

  @Input()
  public width = 320;

  @Input()
  public top = 0;

  @Input()
  public relative: boolean; // Is sidebar relative i.e placed inside popup

  @Input()
  public placement: 'left' | 'right' = 'left';

  @Input()
  public showCollapseButton = true;

  @Input()
  public marginRight: '';

  @Input()
  public marginTop: '';

  @Input()
  public marginBottom: '';

  @Input()
  public screen: '';

  @Input()
  public set collapsed(value) {
    this._collapsed = value;
    this.collapsedChange.emit(this._collapsed);
  }

  @Output()
  public collapsedChange = new EventEmitter();

  private _collapsed = false;

  public get collapsed(): boolean {
    return this._collapsed;
  }

}
