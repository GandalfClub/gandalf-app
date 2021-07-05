import { ActionTypes, EventInfoAction } from './event-info.actions';
import { SolutionStatus, Task } from '../../landing/models/task.model';
import { EntityWrapper } from '../../auth/models/entity-wraper';
import { EntityStatus } from '../../auth/models/entity-status';

export interface EventInfoState {
	tasks: EntityWrapper<Task[]>;
	selectedTask: Task | null;
}

export const initialState: EventInfoState = {
	tasks: {
		status: EntityStatus.Init,
		error: null,
		value: []
	},
	selectedTask: null
};

export function eventInfoReducer(state: EventInfoState = initialState, action: EventInfoAction): EventInfoState {
	switch (action.type) {
		case ActionTypes.TaskSelected: {
			return {
				...state,
				selectedTask: action.payload
			};
		}

		case ActionTypes.SetSolution: {
			return {
				...state,
				tasks: {
					status: EntityStatus.Success,
					error: null,
					value: state.tasks.value.map(task => task.id === action.payload.id ? action.payload : task)
				},
				selectedTask: action.payload
			};
		}

		case ActionTypes.FetchTasks: {
			return {
				...state,
				tasks: {
					...state.tasks,
					status: EntityStatus.Pending,
					error: null,
				}
			};
		}

		case ActionTypes.FetchTasksSuccess: {
			return {
				...state,
				tasks: {
					status: EntityStatus.Success,
					error: null,
					value: action.payload
				}
			};
		}

		case ActionTypes.FetchTasksError: {
			return {
				...state,
				tasks: {
					...state.tasks,
					status: EntityStatus.Error,
					error: action.payload,
				}
			};
		}

		default:
			return state;
	}
}
