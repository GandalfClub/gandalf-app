import { EntityStatus } from '../../auth/models/entity-status';
import { Task } from '../../landing/models/task.model';
import { FetchTasks, FetchTasksError, FetchTasksSuccess, TaskSelected } from './event-info.actions';
import { eventInfoReducer, EventInfoState } from './event-info.reducer';

describe('eventInfoReducer', () => {
	const tasks: Task[] = [{ taskName: 'test_name_1' } as Task, { taskName: 'test_name_2' } as Task];
	let initialState: EventInfoState;

	beforeEach(() => {
		initialState = {
			tasks: {
				status: EntityStatus.Init,
				error: null,
				value: tasks
			},
			selectedTask: null
		};
	});

	it('should set a selected task', () => {
		const task: Task = tasks[0];
		const result: EventInfoState = eventInfoReducer(initialState, new TaskSelected(task));
		expect(result.selectedTask).toEqual(task);
	});

	describe('FetchTasks', () => {
		const result: EventInfoState = eventInfoReducer(initialState, new FetchTasks());
		it('should set a task state status to Pending', () => {
			expect(result.tasks.status).toBe(EntityStatus.Pending);
		});

		it('should set a tasks state error to null', () => {
			expect(result.tasks.error).toBe(null);
		});
	});

	describe('FetchTasksSuccess', () => {
		const newTasks: Task[] = [{ taskName: 'test_name_2' } as Task, { taskName: 'test_name_3' } as Task];
		const result: EventInfoState = eventInfoReducer(initialState, new FetchTasksSuccess(newTasks));
		it('should set a task state status to Success', () => {
			expect(result.tasks.status).toBe(EntityStatus.Success);
		});

		it('should set a tasks state error to null', () => {
			expect(result.tasks.error).toBe(null);
		});

		it('should set a tasks state value', () => {
			expect(result.tasks.value).toEqual(newTasks);
		});
	});

	describe('FetchTasksError', () => {
		const error: Error = new Error();
		const result: EventInfoState = eventInfoReducer(initialState, new FetchTasksError(error));
		it('should set a task state status to Error', () => {
			expect(result.tasks.status).toBe(EntityStatus.Error);
		});

		it('should set a tasks state error to Error', () => {
			expect(result.tasks.error).toEqual(error);
		});
	});
});
