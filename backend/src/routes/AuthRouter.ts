import { AuthComponent } from '../components';
import { Router } from 'express';
import appConfig from '../config/env';

const router: Router = Router();

router.post('/signup', AuthComponent.signup);

router.post('/signin', AuthComponent.signin);

router.post('/login', AuthComponent.login);

router.post('/logout', AuthComponent.logout);

if (appConfig.environment === 'test' || appConfig.environment === 'development') {
    router.post('/signup/admin', AuthComponent.signupAdmin);
}

export default router;
