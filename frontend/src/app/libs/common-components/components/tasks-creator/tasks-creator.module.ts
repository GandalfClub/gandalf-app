import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TasksCreatorComponent } from './tasks-creator/tasks-creator.component';
import { CommonComponentsModule } from '../../common-components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [TasksListComponent, TasksCreatorComponent],
  exports: [TasksListComponent, TasksCreatorComponent],
  imports: [CommonModule, CommonComponentsModule, TranslateModule],
})
export class TasksCreatorModule {}
