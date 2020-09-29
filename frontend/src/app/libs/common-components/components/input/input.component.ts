import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, Input, EventEmitter, Output, OnInit, Optional, Host, SkipSelf, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { AsyncValidatorFn, ControlContainer, ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, ValidationErrors, ValidatorFn} from '@angular/forms';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal/observable/fromPromise';
import { take } from 'rxjs/operators';
import { ComponentTheme } from '../../shared/component-theme.enum';
import { InputType } from '../../shared/input-type.enum';

@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputComponent),
			multi: true
		}
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent<T> implements ControlValueAccessor, OnInit, AfterViewInit {

	private syncValidators: ValidatorFn[] | null = null;
	private asyncValidators: AsyncValidatorFn[] | null = null;
	private defaultValue: string | boolean;

	@Input() public inputValidators: ValidatorFn[] = null;

	@Input() public inputValidatorsAsync: AsyncValidatorFn[] = null;

	@Input() public changeValidators: ValidatorFn[] = null;

	@Input() public changeValidatorsAsync: AsyncValidatorFn[] = null;

	@Input() public formControlName: string;

	@Input() public disabled: boolean = false;

	@Input() public formControl: FormControl;

	@Input() public value: string | boolean = '';

	@Input() public hide: boolean = true;

	@Input() public inputType: InputType = InputType.Text;

	@Input() public label: string = 'label';

	@Input() public placeholder: string = 'placeholder';

	@Input() public isRequired: boolean = true;

	@Input() public theme: ComponentTheme = ComponentTheme.Light;

	@Output() public valueChange: EventEmitter<T> = new EventEmitter<T>();

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}

	public inlineSyncValidators: ValidatorFn[] = null;
	public inlineAsyncValidators: AsyncValidatorFn[] = null;

	public errors: ValidationErrors = null;
	public customValidatorsErrors: ValidationErrors = null;
	public customValidatorsErrorsArray: string[] = [];

	public inputFormGroup: FormGroup = new FormGroup({
	formControl : new FormControl ('')
		});

	public get isText(): boolean {
		return this.inputType === InputType.Text ? true : false;
	}

	public get isEmail(): boolean {
		return this.inputType === InputType.Email ? true : false;
	}

	public get isPassword(): boolean {
		return this.inputType === InputType.Password ? true : false;
	}

	public get type(): string {
		if (this.inputType !== 'password') {
			return this.inputType;
		} else if (this.inputType === 'password' && this.hide) {
			return 'password';
		} else if (this.inputType === 'password' && !this.hide) {
			return 'text';
		}
	}
	public constructor(
		@Optional() @Host() @SkipSelf() protected parentFormContainer: ControlContainer,
		public elementRef: ElementRef,
		public changeDetector: ChangeDetectorRef
	) {}

	public ngOnInit(): void {
		this.defaultValue = this.value;
		this.formControlName = this.elementRef.nativeElement.getAttribute('formControlName');
		if (this.formControlName != null && this.parentFormContainer != null) {

			this.formControl = (this.parentFormContainer.control as FormGroup).controls[this.formControlName] as FormControl;
			if (this.formControl === undefined) {
				throw new Error(`Form control ${this.formControlName} is not registered in form group`);
			}

	} else {
		this.formControl = new FormControl('');
	}
	this.onChange(this.value);

	this.inlineSyncValidators = this.getInlineSyncValidatorsFromFormControl();
	this.inlineAsyncValidators = this.getInlineAsyncValidatorsFromFormControl();
	this.setSyncValidator();
	this.setAsyncValidator();
	this.setValidatorsToFormControl();
	this.validate();
	this.switchToDisable();
	}

	public ngAfterViewInit(): void {
		if (this.defaultValue !== '') {
			setTimeout(() => {
					this.formControl.setValue(this.defaultValue);
					this.validate();

			});
		}
	}

	public switchToDisable(): void {
		if (Boolean(this.formControl) && this.disabled) {
			this.formControl.disable();
		}
	}
	public switchToEnable(): void {
		if (Boolean(this.formControl) && this.disabled) {
			this.formControl.enable();
		}
	}

	public onTouched: any = () => undefined;

	public onChange: any = () => undefined;

	public writeValue(value: any): void {
		this.value = value;
		this.onChange(value);
		if (this.formControl && this.formControl.value) {
			this.onTouched();
		}
		this.valueChange.emit(value);
	}

	public onValueChange(value: any): void {
		this.onTouched();
		if (this.value !== value) {
			this.value = value;
			this.onChange(value);
			this.validate();
			this.valueChange.emit(value);

		}
	}

	public onValueInput(value: any): void {
		this.value = value;
		this.onChange(value);
		this.validate();
	}

	public registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	public setValidatorsToFormControl(): void {
		if (this.syncValidators.length > 0) {this.formControl.setValidators(this.syncValidators); }
		if (this.asyncValidators.length > 0) {this.formControl.setAsyncValidators(this.asyncValidators); }
	}

	public validate(): void {
		this.errors = null;
		this.customValidatorsErrorsArray = [];
		this.invokeSyncValidators();
		this.invokeAsyncValidators();
	}

	private invokeSyncValidators(): void {
		if (Boolean(this.syncValidators?.length)) {
			this.syncValidators.map((validator: ValidatorFn ) => {
				const error: ValidationErrors = validator(this.formControl);

				if (error) {
				this.setErrors(error);
				this.getCustomErrorsArray(error);
				}

			});
		}
	}

	private invokeAsyncValidators(): void {
		if (Boolean(this.asyncValidators?.length)) {
			this.asyncValidators.map((validator: AsyncValidatorFn) => {
				let validationAsyncError: ValidationErrors = null;
				let asyncError: Promise<ValidationErrors | null> | Observable<ValidationErrors | null> = validator(this.formControl);
				asyncError = this.promiseToObservable(asyncError);
				asyncError.pipe(take(1)).subscribe((error: ValidationErrors) => {
					validationAsyncError = error;
					this.setErrors(validationAsyncError);
					this.getCustomErrorsArray(validationAsyncError);
				});

			} );
		}
	}

	private setSyncValidator(): void {
		this.syncValidators = [].concat(this.inputValidators, this.changeValidators, this.inlineSyncValidators)
		.filter((validator: ValidatorFn | null) => validator);
	}
	private setAsyncValidator(): void {
		this.asyncValidators = [].concat(this.inputValidatorsAsync, this.changeValidatorsAsync, this.inlineAsyncValidators)
		.filter((validator: ValidatorFn | null) => validator);
	}

	private setErrors(errors: ValidationErrors | null): void {
		const errorKeys: string[] = errors ? Object.keys(errors) : null;
		if (Boolean(errors) && errorKeys) {
			errorKeys.map((errorKey: string) => {
				if (this.errors === null) {
					this.errors = {};
					this.errors[errorKey] = errors[errorKey];
				} else {
					this.errors[errorKey] = errors[errorKey];
				}
			});
		}
	}

	private isAsyncErrorPromise(error: Promise<ValidationErrors | null> | Observable<ValidationErrors | null>): boolean {
		return (error as Promise<ValidationErrors>).then !== undefined;
	}

	private promiseToObservable(error: Promise<ValidationErrors | null> | Observable<ValidationErrors | null>): Observable<ValidationErrors> {

		if (this.isAsyncErrorPromise(error)) {
			return fromPromise(error as Promise<ValidationErrors>);
		}
		return error as Observable<ValidationErrors>;
	}

	private getInlineSyncValidatorsFromFormControl(): ValidatorFn[] {
		if (this.formControl?.validator) {
			return [].concat(this.formControl.validator);
		}
		return null;
	}

	private getInlineAsyncValidatorsFromFormControl(): AsyncValidatorFn[] {
		if (this.formControl.asyncValidator) {
			return [].concat(this.formControl.asyncValidator);
		}
		return null;
	}

	private getCustomErrorsArray(errors: ValidationErrors): void {
		const errorKeys: string[] = errors ? Object.keys(errors) : null;
		if (errorKeys?.length > 0) {
			errorKeys.map((errorKey: string) => {
				if (typeof(errors[errorKey]) === 'string') {
					this.customValidatorsErrorsArray.push(errors[errorKey]);
				}
			});
		}
	}

}
