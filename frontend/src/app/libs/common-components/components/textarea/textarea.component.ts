import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'app-textarea',
	templateUrl: './textarea.component.html',
	styleUrls: ['./textarea.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaComponent {
	@Input() public label: string;
	@Input() public widthTextarea: string;
}
