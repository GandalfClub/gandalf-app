import { Component } from '@angular/core';
import { ComponentTheme } from 'src/app/libs/common-components/shared/component-theme.enum';

@Component({
  selector: 'app-radio-button-demo',
  templateUrl: './radio-button-demo.component.html',
  styleUrls: ['./radio-button-demo.component.scss']
})
export class RadioButtonDemoComponent {
	public darkTheme: ComponentTheme = ComponentTheme.Dark;
}
