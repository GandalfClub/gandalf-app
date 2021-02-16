import { Router } from 'express';
import { RecaptchaComponent } from '../components';

const router: Router = Router();

router.post('/recaptcha-status', RecaptchaComponent.postRecaptchaToken);

export default router;
