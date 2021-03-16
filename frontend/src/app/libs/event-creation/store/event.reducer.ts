import { NewEventsActions, EventsActionTypes } from './event.actions';
import { GeneralEvent } from './model/model';
import { EntityWrapper } from './model/entity-wrapper';
import { EntityStatus } from './model/entity-status';
import { Task } from '../../common-components/components/tasks-creator/models/task';

export interface GeneralEventState {
	title: string;
	event: EntityWrapper<GeneralEvent>;
}

export interface EventsCreationState {
  general: GeneralEventState;
  tasks: EntityWrapper<Map<Symbol, Task>>;
}

export const initialState: EventsCreationState = {
  general: {
	title: '',
	event: {
		status: EntityStatus.Init,
		value: null,
		error: null,
	}
  },
  tasks: {
	value: new Map<Symbol, Task>(),
	status: EntityStatus.Init,
	error: null,
  },
};

export function newEventReducer(state: EventsCreationState = initialState, action: NewEventsActions): EventsCreationState {
	switch (action.type) {

  	case EventsActionTypes.SetTitleForGeneralEvent: {
			return {
				...state,
				general: {
				  ...state.general,
				  title: action.payload as string
				},
			};
		}

		case EventsActionTypes.CreateGeneralEvent: {
			return {
				...state,
				general: {
				  ...state.general,
  			event: {
			status: EntityStatus.Pending,
			error: null,
			},
		}
			};
		}

	case EventsActionTypes.CreateTaskEvent: {
		return {
		...state,
		tasks: {
			...state.tasks,
			status: EntityStatus.Pending,
			error: null,
		},
		};
	}

	case EventsActionTypes.CreateTaskSuccess: {
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

	  case EventsActionTypes.CreateTaskFail: {
		return {
		...state,
		tasks: {
			...state.tasks,
			status: EntityStatus.Error,
			error: action.payload as Error,
		},
		};
	}

		case EventsActionTypes.CreateGeneralEventSuccess: {
			return {
				...state,
				general: {
				  ...state.general,
			event: {
			value: action.payload as GeneralEvent,
			status: EntityStatus.Success,
			error: null,
			},
		}
			};
		}

	case EventsActionTypes.LoadTasksSuccess: {
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

	case EventsActionTypes.LoadTasksFail: {
		return {
		...state,
		tasks: {
			...state.tasks,
			error: action.payload as Error,
		}
		};
	}

		case EventsActionTypes.CreateGeneralEventFail: {
			return {
				...state,
		general: {
				  ...state.general,
			event: {
			status: EntityStatus.Error,
			error: action.payload as Error,
			},
		}
			};
		}

		default:
			return state;
	}
}
