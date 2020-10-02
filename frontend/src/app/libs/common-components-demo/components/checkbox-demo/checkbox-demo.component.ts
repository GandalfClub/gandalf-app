import { Component } from '@angular/core';
import { ComponentTheme } from 'src/app/libs/common-components/shared/component-theme.enum';
import { CheckboxGroupDataDemo } from '../../models/checkbox-group-data-demo';

@Component({
	selector: 'app-checkbox-demo',
	templateUrl: './checkbox-demo.component.html',
	styleUrls: ['./checkbox-demo.component.scss']
})
export class CheckboxDemoComponent {

	public disabled: boolean;

	public lightTheme: ComponentTheme = ComponentTheme.Light;
	public darkTheme: ComponentTheme = ComponentTheme.Dark;

	public checkboxGroupData: CheckboxGroupDataDemo = {
		options: [
			{
				title: 'Active 1',
				value: 1,
				checked: true
			},
			{
				title: 'Active 2',
				value: 2,
				checked: false
			},
			{
				title: 'Disabled 1',
				value: 3,
				disabled: true,
				checked: true
			},
			{
				title: 'Disabled 2',
				value: 4,
				disabled: true,
				checked: false
			}
		],
		labelField: 'title',
		valueField: 'value',
	};

	public onChange(state: string): void {
		console.log(state);
	}

}
