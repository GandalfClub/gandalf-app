import { Router } from 'express';
import { UserComponent } from '../components';
import * as AccessGuard from '../config/middleware/access-guard';

/**
 * @constant {express.Router}
 */
const router: Router = Router();

router.get('/self', UserComponent.findSelf);

router.get('/', UserComponent.findAllUsers);

router.post('/', AccessGuard.isAdmin, UserComponent.createUser);

router.get('/:id', AccessGuard.isAdmin, UserComponent.findUser);

router.post('/update-user', UserComponent.updateUser);

router.delete('/:id', AccessGuard.isAdmin, UserComponent.removeUser);

router.post('/remove-users', AccessGuard.isAdmin, UserComponent.removeSelectedUsers);

/**
 * @export {express.Router}
 */
export default router;
