import {
	AfterViewInit,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnChanges,
	OnDestroy,
	Output,
	SimpleChanges,
	ViewChild,
} from '@angular/core';
import { CodeJar } from 'codejar';
import * as Prism from 'prismjs';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {Language} from '../shared/enum/languages.enum';

@Component({
	selector: 'app-codejar',
	templateUrl: './codejar.component.html',
	styleUrls: ['./codejar.component.scss'],
})
export class CodejarComponent implements AfterViewInit, OnChanges, OnDestroy {
	@ViewChild('editor', { static: true })
	public editorElementReference: ElementRef;

	@Input()
	public language: Language;

	@Input()
	public code: string;

	@Input()
	public readonly: boolean;

	@Output()
	public changedCode: EventEmitter<string> = new EventEmitter<string>();

	public editor: CodeJar;

	private destroy$: Subject<boolean> = new Subject<boolean>();

	private languagePrism: Prism.Grammar;
	private languagePrismText: string;

	public ngAfterViewInit(): void {
		this.languagePrismText = this.language;
		this.languagePrism = Prism.languages[this.languagePrismText];
		const highlightOptions: any = (editor: HTMLElement) => {
			this.highlightChanges(editor);
		};
		this.editor = CodeJar(this.editorElementReference.nativeElement, highlightOptions);

		fromEvent(this.editorElementReference.nativeElement, 'keyup')
			.pipe(takeUntil(this.destroy$))
			.subscribe(() => {
				const newCode: string = this.editor.toString();
				if (!this.readonly) {
					this.changedCode.emit(newCode);
				} else {
					this.editor.destroy();
					this.destroy$.next(true);
				}
			});
	}

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes.language) {
			this.languagePrism = Prism.languages[changes.language.currentValue];
			this.languagePrismText = changes.language.currentValue;
			const highlightOptions: any = (editor: HTMLElement) => {
				this.highlightChanges(editor);
			};
			this.editor = CodeJar(this.editorElementReference.nativeElement, highlightOptions);
		}
		if (changes.code) {
			this.editor.updateCode(changes.code.currentValue);
		}
		if (changes.readonly?.currentValue) {
			this.destroy$.next(true);
			this.editor.destroy();
		}
	}

	public ngOnDestroy(): void {
		this.destroy$.next(true);
		this.editor.destroy();
	}

	private highlightChanges(editor: HTMLElement): void {
		let code: string = editor.textContent;
		code = Prism.highlight(code, this.languagePrism, this.languagePrismText);
		editor.innerHTML = code;
	}
}
