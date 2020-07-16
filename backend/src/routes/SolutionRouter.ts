import { Router } from 'express';
import { SolutionComponent } from '../components';
import * as AccessGuard from '../config/middleware/access-guard';

const router: Router = Router();

router.post('/', AccessGuard.isCompetitionActive, SolutionComponent.postSolution);
router.post('/html', AccessGuard.isCompetitionActive, SolutionComponent.postHtmlSolutions);
router.post('/get-all', SolutionComponent.getAllUserSolutions);
router.post('/selected', SolutionComponent.getSomeSolutions);
router.post('/user/selected', AccessGuard.isAdmin, SolutionComponent.getSelectedUserSolutions);

export default router;
