import { Component } from '@angular/core';
import { ComponentTheme } from 'src/app/libs/common-components/shared/component-theme.enum';

@Component({
  selector: 'app-scrollbar-demo',
  templateUrl: './scrollbar-demo.component.html',
  styleUrls: ['./scrollbar-demo.component.scss']
})
export class ScrollbarDemoComponent {
	public lightTheme: ComponentTheme = ComponentTheme.Light;
	public darkTheme: ComponentTheme = ComponentTheme.Dark;
}
