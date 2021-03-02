import { Component, Input } from '@angular/core';
import { ComponentTheme } from '../../shared/component-theme.enum';
import { IconSize } from '../icon/models/icon-size.enum';
import { ButtonType } from '../button/models/button-type.enum';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent {

  @Input()
  public theme: ComponentTheme;

  @Input()
  public type: ButtonType = ButtonType.Basic;

  @Input()
  public startIcon: string;

  @Input()
  public endIcon: string;

  @Input()
  public iconSize: IconSize;

  @Input()
  public iconColor: string;

}
