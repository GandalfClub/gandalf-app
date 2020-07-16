import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MonacoEditorComponent } from './monaco-editor.component';
import { DebugElement, SimpleChange, SimpleChanges } from '@angular/core';
import { editor } from 'monaco-editor';
import { Theme } from '../shared/enum/themes.enum';
import { Language } from '../shared/enum/languages.enum';

describe('MonacoEditorComponent', () => {
	let component: MonacoEditorComponent;
	let fixture: ComponentFixture<MonacoEditorComponent>;
	let debugElement: DebugElement;
	const previousValue: string = 'previous';
	const currentValue: string = 'current';
	const codeEditorMock: any = {
		setValue: jasmine.createSpy('setValue'),
		getContainerDomNode: jasmine.createSpy('getContainerDomNode'),
		getModel: jasmine.createSpy('getModel'),
		dispose: jasmine.createSpy('dispose').and.callThrough(),
		getValue: jasmine.createSpy('getValue').and.returnValue('test'),
	} as any;
	let changes: SimpleChanges = {};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MonacoEditorComponent],
		});
	}));

	beforeEach(() => {
		spyOn(editor, 'create').and.returnValue(codeEditorMock);
		spyOn(editor, 'setTheme').and.stub();
		spyOn(editor, 'setModelLanguage').and.stub();
		fixture = TestBed.createComponent(MonacoEditorComponent);
		component = fixture.componentInstance;
		debugElement = fixture.debugElement;
		const editorElement: HTMLElement = fixture.debugElement.nativeElement;
		codeEditorMock.getContainerDomNode = jasmine.createSpy('getContainerDomNode').and.returnValue(editorElement);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('when ngOnChanges called with updated code', () => {
		beforeEach(() => {
			changes = {};
			changes.code = new SimpleChange(previousValue, currentValue, true);
			component.code = currentValue;
			component.ngOnChanges(changes);
		});
		it('calls setValue on codeEditor', () => {
			expect(component.codeEditor.setValue).toHaveBeenCalledWith(component.code);
		});
	});

	describe('when ngOnChanges called with updated theme', () => {
		beforeEach(() => {
			changes = {};
			changes.theme = new SimpleChange(previousValue, currentValue, true);
			component.theme = Theme.HC_BLACK;
			component.ngOnChanges(changes);
		});

		it('calls setTheme on editor', () => {
			expect(editor.setTheme).toHaveBeenCalledWith(component.theme);
		});
	});

	describe('when ngOnChanges called with updated language', () => {
		beforeEach(() => {
			changes = {};
			changes.language = new SimpleChange(previousValue, currentValue, true);
			component.language = Language.TYPESCRIPT;
			component.ngOnChanges(changes);
		});

		it('calls setModelLanguage on editor', () => {
			expect(editor.setModelLanguage).toHaveBeenCalledWith(component.codeEditor.getModel(), component.language);
		});
	});

	describe('when keyup event in code editor fires', () => {
		beforeEach(() => {
			spyOn(component.codeChange, 'emit');
			const editorElement: HTMLElement = fixture.debugElement.nativeElement;
			const event: Event = new KeyboardEvent('keyup', {});
			editorElement.dispatchEvent(event);
			component.ngAfterViewInit();
		});

		it('calls codechange emitter', () => {
			expect(component.codeChange.emit).toHaveBeenCalledWith('test');
		});
	});

	describe('when ngOnDestroy called', () => {
		beforeEach(() => {
			spyOn(component['destroy$'], 'next');
			component.ngOnDestroy();
		});

		it('calls dispose on ediitor', () => {
			expect(component.codeEditor.dispose).toHaveBeenCalled();
		});

		it('calls next on destroy$', () => {
			expect(component['destroy$'].next).toHaveBeenCalled();
		});
	});
});
