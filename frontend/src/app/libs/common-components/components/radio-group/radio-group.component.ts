import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { ComponentTheme } from '../../shared/component-theme.enum';

@Component({
  selector: 'app-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss']
})
export class RadioGroupComponent {

	@Input()
	public theme: ComponentTheme = ComponentTheme.Light;

	@Input()
	public title: string = '';

	@Input()
	public value: string | number;

	@Input()
	public disabled: boolean;

	@Input()
	public options: object[];

	@Input()
	public labelField: string;

	@Input()
	public valueField: string;

	@Input()
	public disabledField: string;

	@Output()
	public onChange: EventEmitter<MatRadioChange> = new EventEmitter<MatRadioChange>();

	public onValueChange(event: MatRadioChange): void {
		this.value = event.value;
		this.onChange.emit(event);
	}

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}
}
