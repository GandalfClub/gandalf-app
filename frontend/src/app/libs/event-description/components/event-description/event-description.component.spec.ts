import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDescriptionComponent } from './event-description.component';
import { ActivatedRoute } from '@angular/router';
import { EventFacadeService } from '../../store/event-description/event-description.facade';
import { Observable } from 'rxjs';
import { EntityWrapper } from 'src/app/libs/auth/models/entity-wraper';
import { User } from 'src/app/libs/auth/models/user';
import { AuthFacadeService } from 'src/app/libs/auth/store/auth/auth.facade';

describe('EventDescriptionComponent', () => {
	let component: EventDescriptionComponent;
	let fixture: ComponentFixture<EventDescriptionComponent>;
	let eventId: string;

	const mockEventDescriptionFacadeService: any = {
		getEvent(id: string): void {
			return;
		},
	};

	const mockAuthFacadeService: any = {
		get user$(): Observable<EntityWrapper<User>> {
			return;
		},
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [EventDescriptionComponent],
			providers: [
				{ provide: AuthFacadeService, useValue: mockAuthFacadeService },
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
				{ provide: EventFacadeService, useValue: mockEventDescriptionFacadeService },
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EventDescriptionComponent);
		component = fixture.componentInstance;
		eventId = '1';
		mockEventDescriptionFacadeService.getEvent(eventId);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
