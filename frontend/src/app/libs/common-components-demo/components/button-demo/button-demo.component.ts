import { Component, OnInit } from '@angular/core';
import { ComponentTheme } from 'src/app/libs/common-components/shared/component-theme.enum';

@Component({
  selector: 'app-button-demo',
  templateUrl: './button-demo.component.html',
  styleUrls: ['./button-demo.component.scss']
})
export class ButtonDemoComponent {
	public lightTheme: ComponentTheme = ComponentTheme.Light;
	public darkTheme: ComponentTheme = ComponentTheme.Dark;
}
