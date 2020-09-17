import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PopoverComponent } from './popover.component';

describe('PopoverCommonComponent', () => {
	let component: PopoverComponent;
	let fixture: ComponentFixture<PopoverComponent>;
	const timer: number = 1000;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [PopoverComponent],
			imports: [MatDialogModule, BrowserAnimationsModule],
			providers: [
				{
					provide: MatDialogRef,
					useValue: {},
				},
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PopoverComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('modal window', () => {
		it('open method should open modal',  () => {
					component.open();
					expect (document.body.innerHTML.includes('mat-dialog-container')).toBeTruthy();
					fixture.detectChanges();
					component.close();

			});
		it('close method should close modal', async () => {
			await new Promise ((resolve: any) => {
						component.open();
						fixture.detectChanges();
						component.close();
						setTimeout(() => {
						expect (document.body.innerHTML.includes('mat-dialog-container')).toBeFalsy();
						resolve();
					}, timer);
				});
		});


	});
});
