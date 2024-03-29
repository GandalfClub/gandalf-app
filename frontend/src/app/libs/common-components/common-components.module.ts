import { CompilerFactory, COMPILER_OPTIONS, NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { SlideToggleComponent } from './components/slide-toggle/slide-toggle.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { CreateDraftEventPopoverComponent } from './create-draft-event-popover/create-draft-event-popover.component';
import { ButtonComponent } from './components/button/button.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PopoverComponent } from './components/popover/popover.component';
import { ScrollbarDirective } from './directives/scrollbar/scrollbar.directive';
import { RadioGroupComponent } from './components/radio-group/radio-group.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TabsPanelComponent } from './components/tabs-panel/tabs-panel.component';
import { TagListComponent } from './components/tag-list/tag-list.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { EventCardDateComponent } from './components/event-card/components/event-card-date/event-card-date.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { TableComponent } from './components/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';
import { MatSortModule } from '@angular/material/sort';
import { MatBadgeModule } from '@angular/material/badge';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { InputComponent } from './components/input/input.component';
import { NgxMaskModule } from 'ngx-mask';
import { IconComponent } from './components/icon/icon.component';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { SelectComponent } from './components/select/select.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { TabNavigationComponent } from './components/tab-navigation/tab-navigation.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { CkeditorComponent } from './components/ckeditor/ckeditor.component';
import { FormControlCommonDirective } from './directives/formControl/form-control-common.directive';
import { SafeHtmlPipe } from '../pipes/sanitizer.pipe';
import { CodejarComponent } from '../code-editors/codejar-editor/codejar.component';

@NgModule({
	declarations: [
		SlideToggleComponent,
		CheckboxComponent,
		CreateDraftEventPopoverComponent,
		ButtonComponent,
		InputComponent,
		ProgressBarComponent,
		ScrollbarDirective,
		PopoverComponent,
		RadioGroupComponent,
		TabsComponent,
		TabsPanelComponent,
		TagListComponent,
		EventCardComponent,
		EventCardDateComponent,
		TableComponent,
		SearchInputComponent,
		IconComponent,
		IconButtonComponent,
		DatepickerComponent,
		SelectComponent,
		TextareaComponent,
		TabNavigationComponent,
		CkeditorComponent,
		FormControlCommonDirective,
		SafeHtmlPipe,
		CodejarComponent
	],
	imports: [
		ReactiveFormsModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
		MatFormFieldModule,
		CommonModule,
		MatTooltipModule,
		MatSlideToggleModule,
		FormsModule,
		MatCardModule,
		MatCheckboxModule,
		MatMenuModule,
		MatProgressBarModule,
		MatRadioModule,
		MatTabsModule,
		MatChipsModule,
		MatTableModule,
		MatSortModule,
		NgxMaskModule.forRoot({
			showMaskTyped : true,
		  }),
		MatDatepickerModule,
		MatSelectModule,
		CKEditorModule
	],
	exports: [
		MatInputModule,
		MatButtonModule,
		MatFormFieldModule,
		MatIconModule,
		CommonModule,
		FormsModule,
		MatCardModule,
		ReactiveFormsModule,
		MatDialogModule,
		MatTooltipModule,
		MatSlideToggleModule,
		MatCheckboxModule,
		CreateDraftEventPopoverComponent,
		ButtonComponent,
		SlideToggleComponent,
		CheckboxComponent,
		InputComponent,
		MatProgressBarModule,
		ProgressBarComponent,
		RadioGroupComponent,
		PopoverComponent,
		ScrollbarDirective,
		TabsComponent,
		TabsPanelComponent,
		TagListComponent,
		EventCardComponent,
		TableComponent,
		MatTableModule,
		MatSortModule,
		MatBadgeModule,
		MatToolbarModule,
		MatSelectModule,
		MatMenuModule,
		MatDividerModule,
		SearchInputComponent,
		IconComponent,
		IconButtonComponent,
		DatepickerComponent,
		SelectComponent,
		TextareaComponent,
		TabNavigationComponent,
		CkeditorComponent,
		FormControlCommonDirective,
		SafeHtmlPipe,
		CodejarComponent
	],
	providers: [
		{
			provide: MatDialogRef,
			useValue: {},
		},
		{
			provide: CompilerFactory,
			useClass: JitCompilerFactory,
			deps: [COMPILER_OPTIONS]
		},
	],
})
export class CommonComponentsModule { }
