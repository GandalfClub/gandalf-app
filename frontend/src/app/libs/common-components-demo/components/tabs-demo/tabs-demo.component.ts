import { Component } from '@angular/core';
import { ComponentTheme } from 'src/app/libs/common-components/shared/component-theme.enum';

@Component({
  selector: 'app-tabs-demo',
  templateUrl: './tabs-demo.component.html',
  styleUrls: ['./tabs-demo.component.scss']
})
export class TabsDemoComponent {
	public darkTheme: ComponentTheme = ComponentTheme.Dark;
}
