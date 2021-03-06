import { Component, Input, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { CKEditor4 } from 'ckeditor4-angular';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlCommonDirective } from '../../directives/formControl/form-control-common.directive';

@Component({
	selector: 'app-ckeditor',
	templateUrl: './ckeditor.component.html',
	styleUrls: ['./ckeditor.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => CkeditorComponent),
			multi: true
		}
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CkeditorComponent extends FormControlCommonDirective {

	@Input() public value: boolean;

	@Input() public formControlName: string;

	@Input() public formControl: FormControl;

	public config: CKEditor4.Config = {
		extraPlugins: ['font', 'editorplaceholder'],
		editorplaceholder: 'Type details for this new event',
		uiColor: '#FFFFFF',
		height: '300',
		removePlugins: ['elementspath', 'resize'],
		toolbar: [
			{ name: 'styles', items: ['Font', 'Format', 'FontSize'] },
			{ name: 'basicstyles', groups: ['basicstyles', 'cleanup'], items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat'] },
			{ name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi'], items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language'] },
			{ name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
			{ name: 'insert', items: ['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe'] },
			{ name: 'colors', items: ['TextColor', 'BGColor'] },
			{ name: 'tools', items: ['Maximize', 'ShowBlocks'] }
		]
	};

	public getDataCkeditor(event: any): any {
		return event.editor.getData();
	}

}
