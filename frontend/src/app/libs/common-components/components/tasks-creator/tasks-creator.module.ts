import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TasksCreatorComponent } from './tasks-creator/tasks-creator.component';
import { CommonComponentsModule } from '../../common-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { MonacoEditorComponent } from '../../../code-editors/monaco-editor/monaco-editor.component';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [TasksListComponent, TasksCreatorComponent, MonacoEditorComponent],
  exports: [TasksListComponent, TasksCreatorComponent],
  imports: [CommonModule, CommonComponentsModule, TranslateModule, MatRadioModule],
})
export class TasksCreatorModule {}
