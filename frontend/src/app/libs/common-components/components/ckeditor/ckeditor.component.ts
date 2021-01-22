import { Component } from '@angular/core';
import { CKEditor4 } from 'ckeditor4-angular';

@Component({
	selector: 'app-ckeditor',
	templateUrl: './ckeditor.component.html',
	styleUrls: ['./ckeditor.component.scss'],
})
export class CkeditorComponent {

	public config: CKEditor4.Config = {
		extraPlugins: ['font', 'editorplaceholder', 'divarea'],
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
}
