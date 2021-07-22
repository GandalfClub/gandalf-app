import { NewEventsActions, EventsActionTypes } from './event.actions';
import { Event } from '../../landing/models/event';
import { EntityWrapper } from './model/entity-wrapper';
import { EntityStatus } from './model/entity-status';
import { Task } from '../../common-components/components/tasks-creator/models/task';

export interface GeneralEventState {
	event: EntityWrapper<Event>;
}

export interface EventsCreationState {
	event: EntityWrapper<Event>;
	tasks: EntityWrapper<Map<Symbol, Task>>;
}

export const initialState: EventsCreationState = {
	event: {
		status: EntityStatus.Init,
		value: null,
		error: null,
	},
	tasks: {
		value: new Map<Symbol, Task>(),
		status: EntityStatus.Init,
		error: null,
	},
};

export function newEventReducer(state: EventsCreationState = initialState, action: NewEventsActions): EventsCreationState {
	switch (action.type) {
		case EventsActionTypes.CreateEvent: {
			return {
				...state,
				event: {
					...state.event,
					status: EntityStatus.Pending,
					error: null,
				}
			};
		}

		case EventsActionTypes.CreateEventTask: {
			return {
				...state,
				tasks: {
					...state.tasks,
					status: EntityStatus.Pending,
					error: null,
				},
			};
		}

		case EventsActionTypes.CreateEventTaskSuccess: {
			const updatedTask: Task = action.payload as Task;
			const tasks: Map<Symbol, Task> = state.tasks.value;
			tasks.set(updatedTask.id, updatedTask);

			return {
				...state,
				tasks: {
					...state.tasks,
					value: new Map<Symbol, Task>([
						...tasks,
					]),
				}
			};
		}

		case EventsActionTypes.CreateEventTaskFail: {
			return {
				...state,
				tasks: {
					...state.tasks,
					status: EntityStatus.Error,
					error: action.payload as Error,
				},
			};
		}

		case EventsActionTypes.CreateEventSuccess:
		case EventsActionTypes.UpdateEventSuccess:
		case EventsActionTypes.LoadEventSuccess: {
			return {
				...state,
				event: {
					value: action.payload as Event,
					status: EntityStatus.Success,
					error: null,
				}
			};
		}

		case EventsActionTypes.LoadEventTasksSuccess: {
			return {
				...state,
				tasks: {
					...state.tasks,
					value: new Map<Symbol, Task>([
						...action.payload as Map<Symbol, Task>,
					]),
				}
			};
		}

		case EventsActionTypes.LoadEventTasksFail: {
			return {
				...state,
				tasks: {
					...state.tasks,
					error: action.payload as Error,
				}
			};
		}

		case EventsActionTypes.CreateEventFail: {
			return {
				...state,
				event: {
					...state.event,
					status: EntityStatus.Error,
					error: action.payload as Error,
				}
			};
		}

		default:
			return state;
	}
}
