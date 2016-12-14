import {Component, EventEmitter, Input, TemplateRef, Output } from '@angular/core';
import {DayViewModel, MonthViewModel } from './datepicker-view-model';
import {NgbDate} from './ngb-date';
import {NgbDatepickerI18n} from './datepicker-i18n';
import {DayTemplateContext} from './datepicker-day-template-context';

@Component({
  selector: 'ngb-datepicker-month-view',
  styles: [`
    .weekday {
    }
    .weeknumber {
    }
    .day {
      padding: 0;
      height: 100%;
      cursor: pointer;
    }
    .day.disabled, .day.hidden, .day.collapsed {
      cursor: default;
    }
    :host/deep/.day.collapsed > * {
      display: none;
    }
    :host/deep/.day.hidden > * {
      visibility: hidden;
    }
  `],
  template: `
    <table>
      <tr *ngIf="showWeekdays">
        <td *ngIf="showWeekNumbers"></td>
        <td *ngFor="let w of month.weekdays" class="weekday text-xs-center font-weight-bold">{{ i18n.getWeekdayName(w) }}</td>
      </tr>
      <tr *ngFor="let week of month.weeks">
        <td *ngIf="showWeekNumbers" class="weeknumber small text-xs-center">{{ week.number }}</td>
        <td *ngFor="let day of week.days" (click)="doSelect(day)" class="day" (keydown.ArrowLeft)="doNavigatePreviousDay(day)" (keydown.ArrowRight)="doNavigateNextDay(day)" (keydown.ArrowUp)="doNavigatePreviousWeekDay(day)"
        (keydown.ArrowDown)="doNavigateNextWeekDay(day)" (keydown.Enter)="doSelect(day)" (keydown.Space)="doSelect(day)">
            <template [ngTemplateOutlet]="dayTemplate"
            [ngOutletContext]="{date: {year: day.date.year, month: day.date.month, day: day.date.day},
              currentMonth: month.number,
              disabled: isDisabled(day),
              selected: isSelected(day.date),
              collapsed: isCollapsed(day),
              hidden: isHidden(day),
              focused: isFocused(day.date),
              test: focusedDate}">
            </template>
        </td>
      </tr>
    </table>
  `
})
export class NgbDatepickerMonthView {
  @Input() dayTemplate: TemplateRef<DayTemplateContext>;
  @Input() disabled: boolean;
  @Input() month: MonthViewModel;
  @Input() outsideDays: 'visible' | 'hidden' | 'collapsed';
  @Input() selectedDate: NgbDate;
  @Input() focusedDate: NgbDate;
  @Input() showWeekdays;
  @Input() showWeekNumbers;


  @Output() select = new EventEmitter<NgbDate>();
  @Output() focusDate = new EventEmitter<NgbDate>();

  constructor(public i18n: NgbDatepickerI18n) {}

  doSelect(day: DayViewModel) {
    if (!this.isDisabled(day) && !this.isCollapsed(day) && !this.isHidden(day)) {
      this.select.emit(NgbDate.from(day.date));
    }
  }

  doNavigateNextDay(day: DayViewModel) {
    let date = NgbDate.from(day.date);
    date.day++;
    this.focusDate.emit(date);
  }

  doNavigatePreviousDay(day: DayViewModel) {
    let date = NgbDate.from(day.date);
    date.day--;
    this.focusDate.emit(date);
  }

  doNavigateNextWeekDay(day: DayViewModel) {
    let date = NgbDate.from(day.date);
    date.day =+ 7;
    this.focusDate.emit(date);
  }

  doNavigatePreviousWeekDay(day: DayViewModel) {
    let date = NgbDate.from(day.date);
    date.day =- 7;
    this.focusDate.emit(date);
  }

  isDisabled(day: DayViewModel) { return this.disabled || day.disabled; }

  isSelected(date: NgbDate) { return this.selectedDate && this.selectedDate.equals(date); }

  isCollapsed(day: DayViewModel) { return this.outsideDays === 'collapsed' && this.month.number !== day.date.month; }

  isHidden(day: DayViewModel) { return this.outsideDays === 'hidden' && this.month.number !== day.date.month; }

  isFocused(date: NgbDate) { return this.focusedDate && this.focusedDate.equals(date); }
}
