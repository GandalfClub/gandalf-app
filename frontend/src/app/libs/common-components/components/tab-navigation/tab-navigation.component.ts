import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ComponentTheme } from '../../shared/component-theme.enum';
import { Tabs } from './models/tabs';
import { NewEventFacadeService } from '../../../event-creation/store/event.facade';
import { AutoCloseable } from '../../../utils/auto-closable';
import { takeUntil } from 'rxjs/operators';
import { ITask } from '../tasks-creator/models/task';

@Component({
	selector: 'app-tab-navigation',
	templateUrl: './tab-navigation.component.html',
	styleUrls: ['./tab-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabNavigationComponent extends AutoCloseable implements OnInit {
	public lightTheme: ComponentTheme = ComponentTheme.Light;
	@Output() changeTab: EventEmitter<Tabs> = new EventEmitter<Tabs>();

  public tabsEnum: typeof Tabs = Tabs;

  public tasksNumber: number;

	public currentTab: Tabs = Tabs.generalTab;

  constructor(private eventFacadeService: NewEventFacadeService) {
    super();
  }

  public changePage(tab: Tabs): void {
		this.currentTab = tab;
		this.changeTab.emit(tab);
	}

	public get generalTab(): boolean {
		return this.currentTab === Tabs.generalTab;
	}

	public get tasksTab(): boolean {
		return this.currentTab === Tabs.tasksTab;
	}

	public get invitationsTab(): boolean {
		return this.currentTab === Tabs.invitationsTab;
	}

  public ngOnInit(): void {
    this.eventFacadeService.tasks$
    .pipe(
      takeUntil(this.destroyedSource$),
    )
    .subscribe(
      (tasks: Map<Symbol, ITask>): void => {
        this.tasksNumber = tasks.size;
      },
    );
  }

}
