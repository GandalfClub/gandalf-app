import { Router } from 'express';
import { ParticipationComponent } from '../components';
import * as AccessGuard from '../config/middleware/access-guard';

const router: Router = Router();

router.post('/', ParticipationComponent.getAllParticipations);

router.post('/competition-status', AccessGuard.isAdmin, ParticipationComponent.setCompetitionStatus);

export default router;
