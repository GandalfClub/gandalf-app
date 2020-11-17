import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ComponentTheme } from '../../shared/component-theme.enum';

@Component({
	selector: 'app-progress-bar',
	templateUrl: './progress-bar.component.html',
	styleUrls: ['./progress-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent {

	@Input()
	public mode: string = 'determinate';

	@Input()
	public progress: number;

	@Input()
	public theme: ComponentTheme = ComponentTheme.Light;

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}

}
