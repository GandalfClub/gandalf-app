import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Event } from '../../../landing/models/event';
import { EventDescriptionPanelComponent } from './event-description-panel.component';
import { User } from 'src/app/libs/auth/models/user';
import { EntityWrapper } from 'src/app/libs/auth/models/entity-wraper';
import { EntityStatus } from 'src/app/libs/auth/models/entity-status';

const event: Event = {
	id: '',
	title: 'test',
	description: '',
	created: null,
	startDate: null,
	startTime: null,
	endDate: null,
	endTime: null,
};

const user: EntityWrapper<User> = {
	status: EntityStatus.Init,
};

describe('EventComponent', () => {
	let component: EventDescriptionPanelComponent;
	let fixture: ComponentFixture<EventDescriptionPanelComponent>;
	let compiledElement: typeof fixture.nativeElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [EventDescriptionPanelComponent],
		}).compileComponents();
		fixture = TestBed.createComponent(EventDescriptionPanelComponent);
		component = fixture.componentInstance;
		component.event = event;
		component.user = user;
		compiledElement = fixture.nativeElement;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('when @Input get event value', () => {
		it('should correctly render the passed @Input event value', () => {
			expect(compiledElement.querySelector('.app-event-description-panel__title').textContent).toContain('test');
		});
	});

	describe('when @Input get not loged in user value', () => {
		beforeEach(() => {
			user.status = EntityStatus.Init;
			fixture.detectChanges();
		});

		it('should disable button take event', () => {
			expect(compiledElement.querySelector('.app-event-description-panel__take-part-button').disabled).toBeTrue();
		});
	});

	describe('when @Input get loged in user value', () => {
		beforeEach(() => {
			user.status = EntityStatus.Success;
			fixture.detectChanges();
		});

		it('should enable button take event', () => {
			expect(compiledElement.querySelector('.app-event-description-panel__take-part-button').disabled).toBeFalse();
		});
	});
});
