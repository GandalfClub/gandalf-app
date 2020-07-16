import { Router } from 'express';
import { TaskComponent } from '../components';
import * as AccessGuard from '../config/middleware/access-guard';

const router: Router = Router();

router.get('/', TaskComponent.findAllTasks);

router.get('/types', TaskComponent.findAllTaskTypes);

router.post('/event-tasks', TaskComponent.findAllTasksForEvent);

router.post('/', AccessGuard.isAdmin, TaskComponent.createTask);

router.post('/update', AccessGuard.isAdmin, TaskComponent.updateTask);

router.post('/create-type', AccessGuard.isAdmin, TaskComponent.createTaskType);

router.post('/delete-type', AccessGuard.isAdmin, TaskComponent.deleteTaskType);

router.post('/delete-task', AccessGuard.isAdmin, TaskComponent.deleteTask);

export default router;
