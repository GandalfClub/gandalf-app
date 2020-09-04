import { Router } from 'express';
import { PublicEventsComponent } from '../components';

/**
 * @constant {express.Router}
 */

const router: Router = Router();

router.get('/', PublicEventsComponent.getAllEvents);

router.get('/:id', PublicEventsComponent.getEvent);

/**
 * @export {express.Router}
 */
export default router;
