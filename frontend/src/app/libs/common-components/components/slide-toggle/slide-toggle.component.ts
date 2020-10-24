import { Component, OnInit, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { ComponentTheme } from '../../shared/component-theme.enum';

@Component({
	selector: 'app-slide-toggle',
	templateUrl: './slide-toggle.component.html',
	styleUrls: ['./slide-toggle.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlideToggleComponent {

	@Input()
	public disabled: boolean = false;

	@Input()
	public title: string = '';

	@Input()
	public theme: ComponentTheme = ComponentTheme.Light;

	@Output()
	public toggled: EventEmitter<boolean> = new EventEmitter();

	@Input()
	public value: boolean;

	public toggle(): void {
		this.value = !this.value;
		this.toggled.emit(this.value);
	}

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}
}
