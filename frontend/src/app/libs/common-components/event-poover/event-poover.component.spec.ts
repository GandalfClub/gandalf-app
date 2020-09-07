import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPooverComponent } from './event-poover.component';
import { ImportState } from '@ngrx/store-devtools/src/actions';
import { ReactiveFormsModule, FormsModule, AbstractControl } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('EventPooverComponent', () => {
	let component: EventPooverComponent;
	let fixture: ComponentFixture<EventPooverComponent>;
	let testValue: string;
	let submitBtnEl: DebugElement;
	let titleEl: DebugElement;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
		declarations: [ EventPooverComponent ],
		imports: [ReactiveFormsModule, FormsModule]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EventPooverComponent);
		component = fixture.componentInstance;
		component.ngOnInit();
		fixture.detectChanges();
		testValue = 'test';
		submitBtnEl = fixture.debugElement.query(By.css('button'));
		titleEl = fixture.debugElement.query(By.css('input[type=text]'))
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('form should be invalid when empty', () => {
		expect(component.eventPopoverForm.valid).toBeFalsy();
	});

	it('title validity', () => {
		let title: AbstractControl = component.eventPopoverForm.controls['title']
		expect(title.valid).toBeFalsy();

		let errors = title.errors || {};
		expect(errors['required']).toBeTruthy();

		title.setValue('test');
		expect(errors['requiered']).toBeFalsy();
	});

	it('button should be disabled in begining', () => {
		expect(submitBtnEl.nativeElement.disabled).toBeTruthy();
	});

	// it('submit should give value', () => {
	//   let title = component.eventPopoverForm.value.title;
	//   titleEl.nativeElement.value = testValue;      don't get this data??
	//   submitBtnEl.triggerEventHandler('click', null)
	//   fixture.detectChanges();
	//   expect(title).toEqual(testValue);
	// });

});
