import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, Input, EventEmitter, Output, OnInit, Optional, Host, SkipSelf, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { AsyncValidatorFn, ControlContainer, ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ValidationErrors, ValidatorFn} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ComponentTheme } from '../../shared/component-theme.enum';
import { InputType, PasswordVisibility } from '../../shared/input-type.enum';

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
export class InputComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {

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
	private defaultValue: number | string | boolean | null | undefined;
	private ngUnsubscribe: Subject<any> = new Subject();

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
		this.defaultValue = Boolean(this.value) ?  this.value : null;
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
		this.inlineSyncValidators = this.getInlineSyncValidatorsFromFormControl();
		this.inlineAsyncValidators = this.getInlineAsyncValidatorsFromFormControl();
		this.setSyncValidator();
		this.setAsyncValidator();
		this.setValidatorsToFormControl();
		this.switchToDisable();
		this.errorsFromFormControl();
		this.getDefaultValue();
	}

	public ngAfterViewInit(): void {
		if (Boolean(this.defaultValue)) {
			setTimeout(() => {
					this.formControl.setValue(this.defaultValue);
			});
		}
	}

	public ngOnDestroy(): void {
		this.ngUnsubscribe.next();
		this.ngUnsubscribe.complete();
	}

	public switchToDisable(): void {
		if (Boolean(this.formControl) && this.disabled) {
			this.formControl.disable();
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
		if (Boolean(this.value) && this.value !== value) {
			this.value = value;
			this.onChange(value);
			this.valueChange.emit(value);
		}
	}

	public onValueInput(value: any): void {
		this.value = value;
		this.onChange(value);
		console.log(this.onChange)
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

	private getDefaultValue(): void {
		if (this.formControl?.value && !Boolean(this.defaultValue)) {
			this.defaultValue = this.formControl?.value;
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

	private subscribeToChanges(): void {
		this.formControl.valueChanges.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
		this.errorsFromFormControl();
		});
	}

	private errorsFromFormControl(): void {
		setTimeout(() => {
			this.errorsArray = [];
			const errors: ValidationErrors = this.formControl.errors;
			this.getCustomErrorsArray(errors);
		}, 0);
	}

	private getCustomErrorsArray(errors: ValidationErrors): void {
		const errorKeys: string[] = errors ? Object.keys(errors) : null;
		if (errorKeys?.length > 0) {
			errorKeys.map((errorKey: string) => {
				if (typeof(errors[errorKey]) === 'string') {
					this.errorsArray.push(errors[errorKey]);
				}
			});
		}
		this.changeDetector.detectChanges();
	}

}
