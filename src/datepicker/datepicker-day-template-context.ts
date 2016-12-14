import {NgbDateStruct} from './ngb-date-struct';
/**
 * Context for the datepicker 'day' template in case you want to override the default one
 */
export interface DayTemplateContext {
  /**
   * True if outsideDays set to 'collapsed' and day out of currentMonth
   */
  collapsed: boolean;
  /**
   * Month currently displayed by the datepicker
   */
  currentMonth: number;

  /**
   * Date that corresponds to the template
   */
  date: NgbDateStruct;

  /**
   * True if current date is disabled
   */
  disabled: boolean;

  /**
   * True if focused
   */
  focused: boolean;

  /**
   * True if outsideDays set to 'hidden' and day out of currentMonth
   */
  hidden: boolean;

  /**
   * True if current date is selected
   */
  selected: boolean;
}
