import { Component, OnInit } from '@angular/core';
import { ComponentTheme } from 'src/app/libs/common-components/shared/component-theme.enum';

@Component({
  selector: 'app-progress-bar-demo',
  templateUrl: './progress-bar-demo.component.html',
  styleUrls: ['./progress-bar-demo.component.scss']
})
export class ProgressBarDemoComponent {



  public lightTheme: ComponentTheme = ComponentTheme.Light;
  public darkTheme: ComponentTheme = ComponentTheme.Dark;

}
