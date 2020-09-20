import { Component } from '@angular/core';
import { ComponentTheme } from 'src/app/libs/common-components/shared/component-theme.enum';

@Component({
	selector: 'app-popover-demo',
	templateUrl: './popover-demo.component.html',
	styleUrls: ['./popover-demo.component.scss'],
})
export class PopoverDemoComponent {
	public lightTheme: ComponentTheme = ComponentTheme.Light;
	public darkTheme: ComponentTheme = ComponentTheme.Dark;
}
