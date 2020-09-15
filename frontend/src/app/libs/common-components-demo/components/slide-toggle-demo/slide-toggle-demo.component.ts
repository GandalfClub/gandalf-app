import { Component, OnInit } from '@angular/core';
import { ComponentTheme } from 'src/app/libs/common-components/shared/component-theme.enum';

@Component({
  selector: 'app-slide-toggle-demo',
  templateUrl: './slide-toggle-demo.component.html',
  styleUrls: ['./slide-toggle-demo.component.scss']
})
export class SlideToggleDemoComponent {

  public disabled: boolean;

	public lightTheme: ComponentTheme = ComponentTheme.Light;
  public darkTheme: ComponentTheme = ComponentTheme.Dark;

  public onToggle(state: string): void {
		console.log(state);
  }

}
