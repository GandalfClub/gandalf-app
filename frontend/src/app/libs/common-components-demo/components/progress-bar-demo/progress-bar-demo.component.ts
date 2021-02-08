import { Component } from '@angular/core';
import { ComponentTheme } from 'src/app/libs/common-components/shared/component-theme.enum';
import { ProgressBarMode } from 'src/app/libs/common-components/shared/progress-bar-mode.enum';

@Component({
  selector: 'app-progress-bar-demo',
  templateUrl: './progress-bar-demo.component.html',
  styleUrls: ['./progress-bar-demo.component.scss']
})
export class ProgressBarDemoComponent {

  public mode: string = ProgressBarMode.Determinate;

  public lightTheme: ComponentTheme = ComponentTheme.Light;
  public darkTheme: ComponentTheme = ComponentTheme.Dark;

}
