import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { EventFacadeService } from '../../store/event/event.facade';
import { Observable } from 'rxjs';
import { EntityWrapper } from 'src/app/libs/auth/models/entity-wraper';
import { User } from 'src/app/libs/auth/models/user';
import { AuthFacadeService } from 'src/app/libs/auth/store/auth/auth.facade';

import { EventComponent } from './event.component';

describe('EventComponent', () => {
	let component: EventComponent;
	let fixture: ComponentFixture<EventComponent>;

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
			declarations: [EventComponent],
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
		fixture = TestBed.createComponent(EventComponent);
		component = fixture.componentInstance;
		eventId = '1';
		mockEventDescriptionFacadeService.getEvent(eventId);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
