import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ComponentTheme } from '../../common-components/shared/component-theme.enum';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { NewEventFacadeService } from '../store/event.facade';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../../landing/models/event';
import { GeneralEventInfo } from '../store/model/model';

@Component({
	selector: 'app-general-info',
	templateUrl: './general-info-page.component.html',
	styleUrls: ['./general-info-page.component.scss'],
})
export class GeneralInfoPageComponent implements OnInit {
	@Output() passForm: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
	@Output() passEventId: EventEmitter<string> = new EventEmitter<string>();

	public lightTheme: ComponentTheme = ComponentTheme.Light;
	public eventFormGroup: FormGroup;
	public requiredValidator: ValidatorFn = Validators.required;

	constructor(
		private eventFacadeService: NewEventFacadeService,
		private activatedRouter: ActivatedRoute,
	) { }

	public ngOnInit(): void {
		const eventId: string = this.activatedRouter.snapshot.paramMap.get('id');
		this.eventFacadeService.loadEvent(eventId);
		this.passEventId.emit(eventId);
		this.createForm();
		this.prepopulateForm();

		this.eventFormGroup.valueChanges.subscribe(() => {
			this.passForm.emit(this.eventFormGroup);
		});
	}

	private createForm(): void {
		this.eventFormGroup = new FormGroup({
			title: new FormControl(''),
			shortSummary: new FormControl(''),
			description: new FormControl('', this.requiredValidator),
			startDate: new FormControl('', this.requiredValidator),
			endDate: new FormControl('', this.requiredValidator),
			startTime: new FormControl('', this.requiredValidator),
			endTime: new FormControl('', this.requiredValidator),
			isPrivate: new FormControl(false),
			isContinuous: new FormControl(false),
			isDraft: new FormControl(true),
		});
	}

	private prepopulateForm(): void {
		this.eventFacadeService.event$.subscribe((event: Event) => {
			const generalInfo: GeneralEventInfo = event?.generalInfo;
			this.eventFormGroup.patchValue({ ...generalInfo });
		});
	}

}
