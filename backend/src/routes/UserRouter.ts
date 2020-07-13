import { Router } from 'express';
import { UserComponent } from '../components';
import * as AccessGuard from '../config/middleware/access-guard';

/**
 * @constant {express.Router}
 */
const router: Router = Router();

router.get('/self', UserComponent.findSelf);

router.get('/', AccessGuard.isAdmin, UserComponent.findAllUsers);

router.post('/', AccessGuard.isAdmin, UserComponent.createUser);

router.get('/:id', AccessGuard.isAdmin, UserComponent.findUser);

router.delete('/:id', AccessGuard.isAdmin, UserComponent.removeUser);

/**
 * @export {express.Router}
 */
export default router;
