import { EntityStatus } from '../../auth/models/entity-status';
import { Task } from '../../landing/models/task.model';
import { EventInfoState } from './event-info.reducer';
import { getSelectedTask, getTasks } from './event-info.selectors';

describe('EventInfoSelectors', () => {
	const tasks: Task[] =  [{ taskName: 'test_name_1' } as Task, { taskName: 'test_name_2' } as Task];
	const initialState: EventInfoState = {
		tasks: {
			status: EntityStatus.Init,
			error: null,
			value: tasks
		},
		selectedTask: tasks[0]
	};

	describe('getSelectedTask', () => {
		it('should select selected task', () => {
			const result: Task = getSelectedTask.projector(initialState);
			expect(result).toEqual(initialState.selectedTask);
		});
	});

	describe('getTasks', () => {
		it('should select tasks', () => {
			const result: Task[] = getTasks.projector(initialState);
			expect(result).toEqual(initialState.tasks.value);
		});
	});
});
