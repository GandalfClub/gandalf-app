import { Component } from '@angular/core';
import { ComponentTheme } from 'src/app/libs/common-components/shared/component-theme.enum';

@Component({
  selector: 'app-icon-button-demo',
  templateUrl: './icon-button-demo.component.html',
  styleUrls: ['./icon-button-demo.component.scss']
})
export class IconButtonDemoComponent {

  public buttonText: string = 'Button';

	public lightTheme: ComponentTheme = ComponentTheme.Light;
	public darkTheme: ComponentTheme = ComponentTheme.Dark;

}
