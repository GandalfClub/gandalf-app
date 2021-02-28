import { NewEventsActions, EventsActionTypes } from './event.actions';
import { GeneralEvent } from './model/model';
import { EntityWrapper } from './model/entity-wrapper';
import { EntityStatus } from './model/entity-status';
import { ITask } from '../../common-components/components/tasks-creator/models/task';
import { TasksTypes } from '../../common-components/components/tasks-creator/models/tasks-creator';

export interface GeneralEventState {
	title: string;
	event: EntityWrapper<GeneralEvent>;
}

export interface EventsCreationState {
  general: GeneralEventState;
  tasks: Set<ITask>;
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
  tasks: new Set<ITask>(// todo example, remove and set empty "Set" after backend implementation
    [
      {
        taskName: 'task 1',
        taskType: TasksTypes.single,
        mentorCheck: false,
        maxScore: 100,
        question: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur assumenda esse iure laboriosam natus non porro quam rem sed similique?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur assumenda esse iure laboriosam natus non porro quam rem sed similique?</p>',
        answers: new Set([
          {
            label: 'label',
            isCorrect: false,
          },
          {
            label: 'Some label12',
            isCorrect: true,
          },
        ]),
      },
      {
        taskName: 'task 2',
        taskType: TasksTypes.coding,
        mentorCheck: true,
        maxScore: 300,
        question: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur assumenda esse iure laboriosam natus non porro quam rem sed similique?</p>',
        code: `function a() {\n console.log(\'Hello world\');\n}`,
      },
      {
        taskName: 'task 3',
        taskType: TasksTypes.multiple,
        mentorCheck: false,
        maxScore: 60,
        question: '<p>Question text3</p>',
        answers: new Set([
          {
            label: 'Some label31',
            isCorrect: false,
          },
          {
            label: 'Some label32',
            isCorrect: true,
          },
        ]),
      }
    ]),
};

export function newEventReducer(state: EventsCreationState = initialState, action: NewEventsActions): EventsCreationState {
	switch (action.type) {

    case EventsActionTypes.SetTitleForEvent: {
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

		case EventsActionTypes.CreateEventSuccess: {
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

		case EventsActionTypes.CreateEventFail: {
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
