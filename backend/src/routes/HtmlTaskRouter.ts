import { Router } from 'express';
import { HtmlTask } from '../components';
import * as AccessGuard from '../config/middleware/access-guard';

const router: Router = Router();

router.get('/', HtmlTask.findAllTasks);

router.post('/event-tasks', HtmlTask.findAllTasksForEvent);

router.post('/', AccessGuard.isAdmin, HtmlTask.createTask);

router.post('/update', AccessGuard.isAdmin, HtmlTask.updateTask);


export default router;
