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
	public change: EventEmitter<any> = new EventEmitter<any>();
	@Input()
	public labelField: string;
	@Input()
	public valueField: string;
	@Input()
	public value: any;
	public check(event: any): void {
		this.change.emit(event);
	}
	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}
	public getValue(index: number): any {
		const option: any = this.options[index];
		const value: any = this.valueField !== undefined ? option[this.valueField] : index;
		return value;
	}
}
