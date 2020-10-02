import {
	Component,
	ViewChild,
	ElementRef,
	Input,
	Output,
	OnChanges,
	AfterViewInit,
	EventEmitter,
	SimpleChanges,
	OnDestroy,
} from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { editor } from 'monaco-editor';
import { Language } from '../shared/enum/languages.enum';
import { Theme } from '../shared/enum/themes.enum';

@Component({
	selector: 'app-monaco-editor',
	templateUrl: './monaco-editor.component.html',
	styleUrls: ['./monaco-editor.component.scss'],
})
export class MonacoEditorComponent implements AfterViewInit, OnChanges, OnDestroy {
	@ViewChild('editorContainer') public editorElementReference: ElementRef;

	@Input() public code: string;

	@Input() public theme: Theme;

	@Input() public language: Language;

	@Output() public codeChange: EventEmitter<string> = new EventEmitter<string>();

	public codeEditor: editor.IStandaloneCodeEditor;

	private destroy$: Subject<boolean> = new Subject<boolean>();

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes.code && this.codeEditor) {
			this.codeEditor.setValue(this.code);
		}
		if (changes.theme && this.codeEditor) {
			editor.setTheme(this.theme);
		}
		if (changes.language && this.codeEditor) {
			editor.setModelLanguage(this.codeEditor.getModel(), this.language);
		}
	}

	public ngAfterViewInit(): void {
		const config: {} = {
			value: this.code,
			language: this.language,
			theme: this.theme,
			automaticLayout: true,
		};

		this.codeEditor = editor.create(this.editorElementReference.nativeElement, config);

		fromEvent(this.codeEditor.getContainerDomNode(), 'keyup')
			.pipe(takeUntil(this.destroy$))
			.subscribe(() => {
				const codeChanges: string = this.codeEditor.getValue();
				this.codeChange.emit(codeChanges);
			});
	}

	public ngOnDestroy(): void {
		this.destroy$.next(true);
		this.codeEditor.dispose();
	}
}
