import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, Input, EventEmitter, Output, OnInit, Optional, Host, SkipSelf, ChangeDetectorRef, OnDestroy, AfterViewInit } from '@angular/core';
import { AsyncValidatorFn, ControlContainer, ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ValidationErrors, ValidatorFn} from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { ComponentTheme } from '../../shared/component-theme.enum';
import { PasswordVisibility } from '../../shared/password-visibility.enum';
import { fromPromise } from 'rxjs/internal-compatibility';

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
export class InputComponent implements ControlValueAccessor, OnInit, OnDestroy, AfterViewInit {

	@Input() public inputValidators: ValidatorFn[] = null;

	@Input() public inputValidatorsAsync: AsyncValidatorFn[] = null;

	@Input() public changeValidators: ValidatorFn[] = null;

	@Input() public changeValidatorsAsync: AsyncValidatorFn[] = null;

	@Input() public formControlName: string;

	@Input() public disabled: boolean = false;

	@Input() public formControl: FormControl;

	@Input() public value: number | string | boolean | null | undefined;

	@Input() public secured: boolean = true;

	@Input() public type: InputType = InputType.Text;

	@Input() public label: string;

	@Input() public placeholder: string;

	@Input() public showRequiredSign: boolean;

	@Input() public theme: ComponentTheme = ComponentTheme.Light;

	@Output() public valueChange: EventEmitter<number | string | boolean | null | undefined> = new EventEmitter();

	public inlineSyncValidators: ValidatorFn[] = null;
	public inlineAsyncValidators: AsyncValidatorFn[] = null;

	public errorsArray: string[] = [];

	private syncValidators: ValidatorFn[] | null = null;
	private asyncValidators: AsyncValidatorFn[] | null = null;

	private destroy$: Subject<any> = new Subject();

	private errorOnInlineValidators: string = 'All inline validators are ignored';

	public get icon(): string {
		return Boolean(this.secured) ? PasswordVisibility.On : PasswordVisibility.Off;
	}

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}

	public get isText(): boolean {
		return this.type === InputType.Text ? true : false;
	}

	public get isEmail(): boolean {
		return this.type === InputType.Email ? true : false;
	}

	public get isPassword(): boolean {
		return this.type === InputType.Password ? true : false;
	}

	public get inputType(): string {
		if (this.type !== InputType.Password) {
			return this.type;
		} else if (this.type === InputType.Password && this.secured) {
			return InputType.Password;
		} else if (this.type === InputType.Password && !this.secured) {
			return InputType.Text;
		}
	}

	public constructor(
		@Optional() @Host() @SkipSelf() protected parentFormContainer: ControlContainer,
		public elementRef: ElementRef,
		public changeDetector: ChangeDetectorRef
	) {}

	public ngOnInit(): void {

		this.formControlName = this.elementRef.nativeElement.getAttribute('formControlName');
		if (this.formControlName != null && this.parentFormContainer != null) {

			this.formControl = (this.parentFormContainer.control as FormGroup).controls[this.formControlName] as FormControl;
			if (this.formControl === undefined) {
				throw new Error(`Form control ${this.formControlName} is not registered in form group`);
			}

		} else {
			this.formControl = new FormControl('');
		}

		this.subscribeToChanges();
		this.checkInlineValidators();
		this.setSyncValidator();
		this.setAsyncValidator();
		this.switchToDisable();
	}
	public ngAfterViewInit(): void {
		setTimeout(() => {
			if (Boolean(this.value)) {
				this.formControl.setValue(this.value);
			}
		}, 0);
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	public switchToDisable(): void {
		if (Boolean(this.formControl) && this.disabled) {
			this.formControl.disable();
		}
	}

	public onTouched: any = () => undefined;

	public onChange: any = () => undefined;

	public writeValue(value: any): void {
		if (!Boolean(this.value) ) {
			this.value = value;
		}
		this.onChange(value);
		if (this.formControl && this.formControl.value) {
			this.onTouched();
		}
		this.valueChange.emit(value);
		this.validate();
	}

	public onValueChange(value: any): void {
		this.onTouched();
		if (Boolean(this.value) && this.value !== value) {
			this.value = value;
			this.onChange(value);
			this.valueChange.emit(value);
		}
		this.validate();
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
		this.errorsArray = [];
		this.invokeSyncValidators();
		this.invokeAsyncValidators().
			then(() => {
				if (Boolean(this.errorsArray?.length)) {
					this.formControl.setErrors({error: 'formControl has error'});
					this.changeDetector.detectChanges();
				} else {
					this.formControl.setErrors(null);
					this.changeDetector.detectChanges();
				}
			});
	}

	private setSyncValidator(): void {
		this.syncValidators = [].concat(this.inputValidators, this.changeValidators)
		.filter((validator: ValidatorFn | null) => validator);
	}
	private setAsyncValidator(): void {
		this.asyncValidators = [].concat(this.inputValidatorsAsync, this.changeValidatorsAsync)
		.filter((validator: ValidatorFn | null) => validator);
	}

	private invokeSyncValidators(): void {
		if (Boolean(this.syncValidators?.length)) {
			this.syncValidators.map((validator: ValidatorFn ) => {
				const error: ValidationErrors = validator(this.formControl);
				// this.formControl.setErrors(error);
				if (error?.message) {
				this.getCustomErrorsArray(error);
				}

			});
		}
	}

	private async invokeAsyncValidators(): Promise<any> {
		return new Promise((resolve: (value?: any) => void) => {
			if (Boolean (this.asyncValidators?.length)) {
				this.asyncValidators.map(async (validator: AsyncValidatorFn) => {
					let asyncError: Promise<ValidationErrors | null> | Observable<ValidationErrors | null> = validator(this.formControl);
					asyncError = this.promiseToObservable(asyncError);
					asyncError.pipe(take(1)).subscribe((error: ValidationErrors) => {
						if (error?.message && !this.errorsArray?.includes(error.message)) {
							this.getCustomErrorsArray(error);
						}
						resolve();
					});
				});
			} else {
				resolve();
			}
		});

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

	private checkInlineValidators(): void {
		if (this.formControl.validator) {
			this.formControl.clearValidators();
			throw new Error(this.errorOnInlineValidators);
		}
		if (this.formControl.asyncValidator) {
			this.formControl.clearAsyncValidators();
			throw new Error(this.errorOnInlineValidators);
		}
	}

	private subscribeToChanges(): void {
		this.formControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
			if (Boolean(this.errorsArray?.length)) {
				this.formControl.setErrors({error: 'formControl has error'});
			}
		});
	}

	private getCustomErrorsArray(error: ValidationErrors): void {
		if (typeof(error.message === 'string')) {
			this.errorsArray.push(error.message);
		}
		this.changeDetector.detectChanges();
	}

}
