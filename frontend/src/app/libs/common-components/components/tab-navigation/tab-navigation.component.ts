import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ComponentTheme } from '../../shared/component-theme.enum';
import { Tabs } from './models/tabs';
import { NewEventFacadeService } from '../../../event-creation/store/event.facade';
import { AutoCloseable } from '../../../utils/auto-closable';
import { takeUntil } from 'rxjs/operators';
import { Task } from '../tasks-creator/models/task';

@Component({
	selector: 'app-tab-navigation',
	templateUrl: './tab-navigation.component.html',
	styleUrls: ['./tab-navigation.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabNavigationComponent extends AutoCloseable implements OnInit {
	public lightTheme: ComponentTheme = ComponentTheme.Light;
	@Output() changeTab: EventEmitter<Tabs> = new EventEmitter<Tabs>();

	public tasksNumber: number;

	public currentTab: Tabs = Tabs.General;

	constructor(private eventFacadeService: NewEventFacadeService) {
		super();
	}

	public isGeneralTabActive(): boolean {
		return this.currentTab === Tabs.General;
	}

	public isTaskTabActive(): boolean {
		return this.currentTab === Tabs.Tasks;
	}

	public isInvitationsTabActive(): boolean {
		return this.currentTab === Tabs.Invitations;
	}

	public switchToGeneral(): void {
		this.currentTab = Tabs.General;
		this.changeTab.emit(Tabs.General);
	}

	public switchToTasks(): void {
		this.currentTab = Tabs.Tasks;
		this.changeTab.emit(Tabs.Tasks);
	}

	public switchToInvitations(): void {
		this.currentTab = Tabs.Invitations;
		this.changeTab.emit(Tabs.Invitations);
	}

	public ngOnInit(): void {
		this.eventFacadeService.tasks$
			.pipe(takeUntil(this.destroyedSource$))
			.subscribe(
				(tasks: Map<Symbol, Task>): void => {
					this.tasksNumber = tasks.size;
				},
			);
	}

}
