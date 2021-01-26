import { Component, OnInit, EventEmitter, Output, DoCheck } from '@angular/core';
import { ComponentTheme } from '../../common-components/shared/component-theme.enum';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NewEventFacadeService } from '../store/newEvent.facade';
import { take, first } from 'rxjs/operators';

@Component({
	selector: 'app-general-info',
	templateUrl: './general-info-page.component.html',
	styleUrls: ['./general-info-page.component.scss'],
})
export class GeneralInfoPageComponent implements OnInit {
	@Output() passForm: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
	public lightTheme: ComponentTheme = ComponentTheme.Light;
	public dataFromEventForm: FormGroup;
	public title: string;

	constructor(private formBuilder: FormBuilder, private titleForNewEvent: NewEventFacadeService) {
		this.titleForNewEvent.title$.subscribe((item: string) => {
			this.title = item;
		});
	}

	public ngOnInit(): void {
		this.dataFromEventForm = this.formBuilder.group({
			title: '',
			// shortSummary: '',
			startDate: '',
			endDate: '',
			// startTime: '',
			// endTime: '',
			// description: '',
			// isPrivate: '',
			// isContinuous: '',
			// isDraft: '',
		});

		this.dataFromEventForm.valueChanges.subscribe(() => {
			this.passForm.emit(this.dataFromEventForm);
		});
	}

}
