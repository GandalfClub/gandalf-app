import { Component, OnInit } from '@angular/core';
import { ComponentTheme } from 'src/app/libs/common-components/shared/component-theme.enum';

@Component({
  selector: 'app-input-demo',
  templateUrl: './input-demo.component.html',
  styleUrls: ['./input-demo.component.scss']
})
export class InputDemoComponent {

  public lightTheme: ComponentTheme = ComponentTheme.Light;
	public darkTheme: ComponentTheme = ComponentTheme.Dark;

}
