import { Component, Input, forwardRef, ChangeDetectionStrategy, Output, EventEmitter, Optional, Host, SkipSelf, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { CKEditor4 } from 'ckeditor4-angular';
import { FormControl, NG_VALUE_ACCESSOR, ControlContainer, FormGroup } from '@angular/forms';
import { ComponentTheme } from '../../shared/component-theme.enum';

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
export class CkeditorComponent implements OnInit, AfterViewInit {

	@Input() public value: boolean;

	@Input() public formControlName: string;

	@Input() public formControl: FormControl;

	@Output() public valueChange: EventEmitter<boolean> = new EventEmitter();

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
	theme: any;

	public constructor(
		@Optional() @Host() @SkipSelf() protected parentFormContainer: ControlContainer,
		public elementRef: ElementRef,
	) { }

	public ngOnInit(): void {
		this.formControlName = this.elementRef.nativeElement.getAttribute('formControlName');
		if (this.formControlName != null && this.parentFormContainer != null) {

			this.formControl = (this.parentFormContainer.control as FormGroup).controls[this.formControlName] as FormControl;
			if (this.formControl === undefined) {
				throw new Error(`Form control ${this.formControlName} is not registered in form group`);
			}

		} else {
			this.formControl = new FormControl('');
		}
	}

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}

	public writeValue(val: boolean | null): void {
		this.value = val;
	}

	public onValueChange(value: any): void {
		this.onTouched();
		if (Boolean(this.value) && this.value !== value) {
			this.setValue(value);
			this.valueChange.emit(value);
		}

	}
	public ngAfterViewInit(): void {
		setTimeout(() => {
			if (Boolean(this.value)) {
				this.formControl.setValue(this.value);
			}
		}, 0);
	}

	public onTouched: any = () => this.value;

	public onChange: any = () => this.value;

	registerOnChange(fn: any): void { this.onChange = fn; }

	registerOnTouched(fn: any): void { this.onTouched = fn; }

	public getDataCkeditor(event: any): any {
		return event.editor.getData();
	}

	private setValue(value: any): void {
		this.value = value;
		this.onChange(value);
	}

}
