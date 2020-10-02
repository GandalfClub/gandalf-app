import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateDraftEventPopoverComponent } from './create-draft-event-popover.component';
import { ImportState } from '@ngrx/store-devtools/src/actions';
import { ReactiveFormsModule, FormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateDraftEventPopoverComponent', () => {
	let component: CreateDraftEventPopoverComponent;
	let fixture: ComponentFixture<CreateDraftEventPopoverComponent>;
	let testValue: string;
	let submitBtnEl: DebugElement;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CreateDraftEventPopoverComponent],
			imports: [ReactiveFormsModule, FormsModule, MatDialogModule, BrowserAnimationsModule],
			providers: [
				{
				provide: MatDialogRef,
				useValue: {}
				}
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CreateDraftEventPopoverComponent);
		component = fixture.componentInstance;
		component.ngOnInit();
		fixture.detectChanges();
		testValue = 'test';
		submitBtnEl = fixture.debugElement.query(By.css('button'));
	});

	it('should create component', () => {
		expect(component).toBeTruthy();
	});

	it('form should be invalid when empty', () => {
		expect(component.eventPopoverForm.valid).toBeFalsy();
	});

	it('title validity', () => {
		const title: AbstractControl = component.eventPopoverForm.controls['title'];
		expect(title.valid).toBeFalsy();

		const errors: ValidationErrors = title.errors || {};
		expect(errors['required']).toBeTruthy();

		title.setValue('test');
		expect(title.errors).toEqual(null);
	});

	it('button should be disabled in begining', () => {
		expect(submitBtnEl.nativeElement.disabled).toBeTruthy();
	});

	it('submit button should close event popover', () => {
		submitBtnEl.triggerEventHandler('click', null);
		expect(document.documentElement.textContent.includes('app-create-draft-event-popover')).toBeFalsy();
	});

});
