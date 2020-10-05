import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ComponentTheme } from '../../shared/component-theme.enum';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent {

@Input()
  public progress: number = 20;

@Input()
	public theme: ComponentTheme = ComponentTheme.Light;



}
