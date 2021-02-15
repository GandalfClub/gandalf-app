import { EntityWrapper } from '../../auth/models/entity-wraper';
import { Recaptcha } from './recaptcha';

export interface RecaptchaState {
	recaptcha: EntityWrapper<Recaptcha>;
}
