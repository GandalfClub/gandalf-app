import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { EntityStatus } from '../../auth/models/entity-status';
import { EntityWrapper } from '../../auth/models/entity-wraper';
import { User } from '../../auth/models/user';
import { AuthFacadeService } from '../../auth/store/auth/auth.facade';
import { State } from '../../container/store/container/container.reducer';
import { EventFacadeService } from '../../event-description/store/event/event.facade';
import { Event } from '../../landing/models/event';

import { EventInfoGuard } from './event-info.guard';

describe('EventInfoGuard', () => {
	let guard: EventInfoGuard;
	let authService: AuthFacadeService;
	let eventService: EventFacadeService;
	let event: Event;
	let userState: EntityWrapper<User>;
	const userId: string = 'userid';
	const initialState: State = {} as State;

	beforeEach(() => {
		event = {
			eventParticipations: [{ userId, approved: true }]
		} as Event;

		userState = {
			status: EntityStatus.Success,
			error: null,
			value: {
				id: userId,
			}
		} as EntityWrapper<User>;

		authService = {
			user$: of(userState)
		} as AuthFacadeService;

		eventService = {
			eventValue$: of(event)
		} as EventFacadeService;

		TestBed.configureTestingModule({
			providers: [
				provideMockStore({ initialState }),
				{ provide: AuthFacadeService, useValue: authService },
				{ provide: EventFacadeService, useValue: eventService },
			]
		});
		guard = TestBed.inject(EventInfoGuard);
		authService = TestBed.inject(AuthFacadeService);
		eventService = TestBed.inject(EventFacadeService);
	});

	it('should be created', () => {
		expect(guard).toBeTruthy();
	});

	describe('canActivateChild', () => {
		it('should be true if the user is participated and his participation was approved', () => {
			guard.canActivateChild().subscribe((res: boolean) => expect(res).toBeTrue());
		});

		it('should be false if the user does not participate', () => {
			userState.value.id = 'anotherId';
			guard.canActivateChild().subscribe((res: boolean) => expect(res).toBeFalsy());
		});

		it('should be false if the user participation was not aprroved', () => {
			event.eventParticipations[0].approved = false;
			guard.canActivateChild().subscribe((res: boolean) => expect(res).toBeFalsy());
		});
	});
});
