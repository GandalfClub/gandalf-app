import { Component } from '@angular/core';
import { ComponentTheme } from 'src/app/libs/common-components/shared/component-theme.enum';

@Component({
  selector: 'app-popover-common-demo',
  templateUrl: './popover-common-demo.component.html',
  styleUrls: ['./popover-common-demo.component.scss']
})
export class PopoverCommonDemoComponent  {

	public lightTheme: ComponentTheme = ComponentTheme.Light;
  public darkTheme: ComponentTheme = ComponentTheme.Dark;

}
