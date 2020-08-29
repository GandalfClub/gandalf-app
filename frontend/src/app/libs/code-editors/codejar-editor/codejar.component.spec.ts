import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodejarComponent } from './codejar.component';
import { SimpleChanges, SimpleChange } from '@angular/core';
import * as Prism from 'prismjs';
import { Language } from '../shared/enum/languages.enum';

describe('CodejarComponent', () => {
	let component: CodejarComponent;
	let fixture: ComponentFixture<CodejarComponent>;
	const previousValue: string = 'previous';
	const currentValue: string = 'current';
	let changes: SimpleChanges = {};

	const mockCodeJar: any = {
		updateCode: jasmine.createSpy('updateCode'),
		destroy: jasmine.createSpy('destroy'),
		toString: jasmine.createSpy('toString').and.returnValue('test'),
	} as any;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CodejarComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		spyOn(Prism, 'highlight');
		fixture = TestBed.createComponent(CodejarComponent);
		component = fixture.componentInstance;

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('when keyup event in code editor fires', () => {
		beforeEach(() => {
			component.editor = mockCodeJar;
			const event: Event = new KeyboardEvent('keyup', {});
			spyOn(component.changedCode, 'emit');
			component.editorElementReference.nativeElement.dispatchEvent(event);
			component.ngAfterViewInit();
		});

		it('calls codechange emitter', () => {
			expect(component.changedCode.emit).toHaveBeenCalledWith('test');
		});
	});

	describe('when ngOnChanges called with updated code', () => {
		beforeEach(() => {
			changes = {};
			component.editor = mockCodeJar;
			changes.code = new SimpleChange(previousValue, currentValue, true);
			component.code = currentValue;
			component.ngOnChanges(changes);
		});

		it('editor must be updated with code', () => {
			expect(component.editor.updateCode).toHaveBeenCalledWith(component.code);
		});
	});

	describe('when ngOnChanges called with updated language', () => {
		beforeEach(() => {
			changes = {};
			component.editor = mockCodeJar;
			changes.language = new SimpleChange(previousValue, currentValue, true);
			component.language = Language.JAVASCRIPT;
			component.ngOnChanges(changes);
		});

		it('editor must be updated with language', () => {
			expect(component.editor).toBeDefined();
		});
	});

	describe('when ngOnDestroy called', () => {
		beforeEach(() => {
			spyOn(component['destroy$'], 'next');
			spyOn(component.editor, 'destroy');
			component.ngOnDestroy();
		});

		it('calls destroy on ediitor', () => {
			expect(component.editor.destroy).toHaveBeenCalled();
		});

		it('calls next on destroy$', () => {
			expect(component['destroy$'].next).toHaveBeenCalled();
		});
	});
});
