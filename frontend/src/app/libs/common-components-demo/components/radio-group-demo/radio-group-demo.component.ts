import { Component } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { ComponentTheme } from 'src/app/libs/common-components/shared/component-theme.enum';
import { RadioGroupDataDemo } from '../../models/radio-group-data-demo';

@Component({
  selector: 'app-radio-group-demo',
  templateUrl: './radio-group-demo.component.html',
  styleUrls: ['./radio-group-demo.component.scss']
})
export class RadioGroupDemoComponent {
	public darkTheme: ComponentTheme = ComponentTheme.Dark;

	public radioGroupData: RadioGroupDataDemo = {
		title: 'Radio group Title',
		value: 2,
		options: [
			{
				title: 'Option 1',
				value: 1,
			},
			{
				title: 'Option 2',
				value: 2,
			},
			{
				title: 'Option 3',
				value: 3,
				disabled: true
			}
		],
		labelField: 'title',
		valueField: 'value',
		disabledField: 'disabled'
	};

	public onChange(event: MatRadioChange): void {
		console.log(event.value);
	}
}
