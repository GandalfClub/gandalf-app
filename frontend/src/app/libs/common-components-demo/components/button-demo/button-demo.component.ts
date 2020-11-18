import { Component } from '@angular/core';
import { ButtonIconSize } from 'src/app/libs/common-components/components/button/models/button-icons-size.eum';
import { ComponentTheme } from 'src/app/libs/common-components/shared/component-theme.enum';

@Component({
  selector: 'app-button-demo',
  templateUrl: './button-demo.component.html',
  styleUrls: ['./button-demo.component.scss']
})
export class ButtonDemoComponent {

  public buttonText: string = 'Button';

  public extraSmall: ButtonIconSize = ButtonIconSize.XS;
  public small: ButtonIconSize = ButtonIconSize.S;
  public medium: ButtonIconSize = ButtonIconSize.M;
  public large: ButtonIconSize = ButtonIconSize.L;

	public lightTheme: ComponentTheme = ComponentTheme.Light;
	public darkTheme: ComponentTheme = ComponentTheme.Dark;
}
