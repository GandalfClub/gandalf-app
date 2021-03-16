import { Component, Input, ChangeDetectionStrategy, forwardRef, Output, EventEmitter, OnChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { FormControlCommonDirective } from '../../directives/formControl/form-control-common.directive';
import { SelectOption } from './models/select-option';

@Component({
	selector: 'app-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SelectComponent),
			multi: true
		}
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent extends FormControlCommonDirective implements OnChanges {
	public icon: string = 'keyboard_arrow_down';
	public opened: boolean = false;

	@Input() public label: string;
	@Input() public formControlName: string;
	@Input() public formControl: FormControl;
	@Input() public value: number | string | null | undefined;
	@Input() public eventTimeType: boolean = false;
	@Input() public options: SelectOption[];

	@Output()
  public openedChangeEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output()
  public selectionChanged: EventEmitter<any> = new EventEmitter<any>();

	public openedChange(opened: boolean): void {
		this.opened = opened;
		this.icon = opened ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
		this.openedChangeEmitter.emit(opened);
	}

  public ngOnChanges(): void {
	  if (this.eventTimeType) {
	    this.options = this.generateEventTime();
    }
  }

  private generateEventTime(): SelectOption[] {
    const MAX_HOUR: number = 23;
    const TEN_HOURS: number = 10;
    let arrayTime: SelectOption[] = [];

    for (let i: number = 0; i <= MAX_HOUR; i++) {
      let hour: string = i.toString();
      if (i < TEN_HOURS) {
        hour = '0' + hour;
      }
      arrayTime = [
        ...arrayTime,
        {
          value: `${hour}:00`,
          label: `${hour}:00`,
        },
        {
          value: `${hour}:30`,
          label: `${hour}:30`,
        }
      ];
    }
    return arrayTime;
  }

}
