import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Event } from '../../../landing/models/event';
import { EventDescriptionPanelComponent } from './event-description-panel.component';
import { User } from 'src/app/libs/auth/models/user';
import { EntityWrapper } from 'src/app/libs/auth/models/entity-wraper';
import { EntityStatus } from 'src/app/libs/auth/models/entity-status';
import { EventCardSize } from 'src/app/libs/common-components/components/event-card/models/event-card-size';
import { ButtonComponent } from 'src/app/libs/common-components/components/button/button.component';
import { SafeHtmlPipe } from 'src/app/libs/pipes/sanitizer.pipe';
import { BreadcrumbFacadeService } from 'src/app/libs/common-components/components/breadcrumb/store/breadcrumb.facade';
import { BreadcrumbComponent } from 'src/app/libs/common-components/components/breadcrumb/breadcrumb.component';
import { of } from 'rxjs';
import { EventFacadeService } from '../../store/event/event.facade';
import { EventParticipation } from 'src/app/libs/landing/models/event-participation.class';

const event: Event = {
	id: '',
	title: 'test',
	description: '',
	created: null,
	startDate: null,
	startTime: null,
	endDate: null,
	endTime: null,
	users: [],
	size: EventCardSize.S,
	eventParticipations: [],
	roles: [],
	tasks: []
};

const user: EntityWrapper<User> = {
	status: EntityStatus.Init,
	value: {
		id: '1',
		email: 'test@test',
		isAdmin: false,
		claims: []
	}
};

const breadcrumbFacadeService: any = {
	label$: of('hello test'),
	loadBreadcrumb: () => { }
};

describe('EventComponent', () => {
	let component: EventDescriptionPanelComponent;
	let fixture: ComponentFixture<EventDescriptionPanelComponent>;
	let compiledElement: typeof fixture.nativeElement;
	let mockParticipation: EventParticipation;
	const mockEventFacadeService: EventFacadeService = jasmine.createSpyObj<EventFacadeService>('EventFacadeService', ['regForEvent']);

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				EventDescriptionPanelComponent,
				ButtonComponent,
				SafeHtmlPipe,
				BreadcrumbComponent
			],
			providers: [
				{ provide: BreadcrumbFacadeService, useValue: breadcrumbFacadeService },
				{ provide: EventFacadeService, useValue: mockEventFacadeService }
			]
		}).compileComponents();
		fixture = TestBed.createComponent(EventDescriptionPanelComponent);
		component = fixture.componentInstance;
		component.event = event;
		component.user = user;
		compiledElement = fixture.nativeElement;
		fixture.detectChanges();

		mockParticipation = new EventParticipation(user.value.id, event.id);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('when @Input get event value', () => {
		it('should correctly render the passed @Input event value', () => {
			expect(
				compiledElement.querySelector('.app-event-description-panel__title')
					.textContent
			).toContain('test');
		});
	});

	describe('onTakePartInEvent:', () => {
		it('should call regForEvent in EventFacadeService', () => {
			component.onTakePartInEvent(mockParticipation);
			expect(mockEventFacadeService.regForEvent).toHaveBeenCalledWith(mockParticipation);
		});
	});
});
