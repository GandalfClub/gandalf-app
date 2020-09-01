import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDescriptionComponent } from './event-description.component';
import { ActivatedRoute } from '@angular/router';
import { EventDescriptionFacadeService } from '../../store/event-description/event-description.facade';

describe('EventDescriptionComponent', () => {
	let component: EventDescriptionComponent;
	let fixture: ComponentFixture<EventDescriptionComponent>;
	let eventId: string;

	const mockEventDescriptionFacadeService: any = {
		getEventDescription(id: string): void {
			return;
		},
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [EventDescriptionComponent],
			providers: [
				{
					provide: ActivatedRoute,
					useValue: {
						snapshot: {
							params: {
								id: '1',
							},
						},
					},
				},
				{ provide: EventDescriptionFacadeService, useValue: mockEventDescriptionFacadeService },
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EventDescriptionComponent);
		component = fixture.componentInstance;
		eventId = '1';
		mockEventDescriptionFacadeService.getEventDescription(eventId);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
