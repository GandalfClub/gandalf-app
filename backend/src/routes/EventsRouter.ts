import { Router } from 'express';
import { EventsComponent } from '../components';
import * as AccessGuard from '../config/middleware/access-guard';

const router: Router = Router();

router.get('/', EventsComponent.getAllEvents);

router.post('/', AccessGuard.isAdmin, EventsComponent.createEvent);

router.post('/update-event', AccessGuard.isAdmin, EventsComponent.updateEvent);

router.post('/update-task', AccessGuard.isAdmin, EventsComponent.updateTaskInEvent);

router.post('/delete-event', AccessGuard.isAdmin, EventsComponent.deleteEvent);

export default router;
