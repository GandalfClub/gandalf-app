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
	let activatedRoute: ActivatedRoute;

	let eventId: string;

	const mockEventDescriptionFacadeService: Partial<EventFacadeService> = {
		loadEvent(id: string): void {
			return;
		},
	};

	const mockAuthFacadeService: Partial<AuthFacadeService> = {
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
		activatedRoute = TestBed.inject(ActivatedRoute);
		mockEventDescriptionFacadeService.loadEvent(eventId);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('when activated route', () => {
		it('should return id from URL', async () => {
			expect(activatedRoute.snapshot.params.id).toEqual(eventId);
		});
	});
});
