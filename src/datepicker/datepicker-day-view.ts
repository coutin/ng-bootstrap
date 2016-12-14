import {Component, Input} from '@angular/core';
import {NgbDateStruct} from './ngb-date-struct';

@Component({
  selector: '[ngbDatepickerDayView]',
  styles: [`
    :host {
      text-align: center;
      padding: 0.185rem 0.25rem;
      border-radius: 0.25rem;
    }
  `],
  template: `<button role="cell" class="btn btn-sm btn-block"
              [attr.aria-selected]="selected"
              [attr.aria-disabled]="disabled"
              [class.bg-primary]="selected"
              [class.text-white]="selected"
              [class.text-muted]= "isMuted()"
              [class.btn-secondary]="!disabled"
              [class.disabled]="disabled"
              [class.collapsed]="collapsed"
              [class.hidden]="hidden"
              [class.focus]="focused">
    <span>{{ date.day }} {{ test }}</span>
    <span class="sr-only"></span>
  </button>`
})
export class NgbDatepickerDayView {
  @Input() currentMonth: number;
  @Input() collapsed: boolean;
  @Input() date: NgbDateStruct;
  @Input() disabled: boolean;
  @Input() focused: boolean = false;
  @Input() hidden: boolean;
  @Input() selected: boolean;

  isMuted() { return !this.selected && (this.date.month !== this.currentMonth || this.disabled); }
}
