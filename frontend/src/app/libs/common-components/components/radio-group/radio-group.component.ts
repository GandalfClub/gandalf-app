import { Component, EventEmitter, Input, Output } from '@angular/core';
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
	public value: any;

	@Input()
	public disabled: boolean;

	@Input()
	public options: any[];

	@Input()
	public labelField: string;

	@Input()
	public valueField: string;

	@Output()
	public onChange: EventEmitter<any> = new EventEmitter<any>();

	public onValueChange(value: any): void {
		this.value = value;
		this.onChange.emit(value);
	}

	public isDefined(value: any): boolean {
		return value !== undefined;
	}

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}
}
