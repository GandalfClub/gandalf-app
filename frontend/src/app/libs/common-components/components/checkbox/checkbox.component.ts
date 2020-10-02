import { Component, OnInit, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { ComponentTheme } from '../../shared/component-theme.enum';

@Component({
	selector: 'app-checkbox-group',
	templateUrl: './checkbox.component.html',
	styleUrls: ['./checkbox.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent {

	@Input()
	public disabled: boolean = false;
	@Input()
	public checked: boolean = false;
	@Input()
	public theme: ComponentTheme = ComponentTheme.Light;
	@Input()
	public options: any[];
	@Output()
	public onChange: EventEmitter<any> = new EventEmitter<any>();
	@Input()
	public labelField: string;
	@Input()
	public valueField: string;
	@Input()
	public value: any;

	public check(event: any): void {
		const checkboxValue: any = event.source.value;
		this.onChange.emit(checkboxValue);
	}
	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}
	public isDefined(value: any): boolean {
		return value !== undefined;
	}
}
