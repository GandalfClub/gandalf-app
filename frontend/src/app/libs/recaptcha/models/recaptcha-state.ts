import { EntityWrapper } from './entity-wraper';
import { Recaptcha } from './recaptcha';

export interface RecaptchaState {
	recaptcha: EntityWrapper<Recaptcha>;
}
