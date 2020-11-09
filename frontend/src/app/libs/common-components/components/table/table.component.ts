import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Compiler, Component, ComponentFactory, ComponentRef, DoCheck, EventEmitter, Inject, Injectable, Input, ModuleWithComponentFactories, NgModule, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CheckboxGroupDataDemo } from 'src/app/libs/common-components-demo/models/checkbox-group-data-demo';
import { ComponentTheme } from '../../shared/component-theme.enum';
import { ButtonComponent } from '../button/button.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { InputComponent } from '../input/input.component';
import { SearchInputComponent } from '../search-input/search-input.component';
import { SlideToggleComponent } from '../slide-toggle/slide-toggle.component';
import { ColumnConfig, Column, TableColumnType } from './models/row-config.enum';
import { RowToggleOutput } from './models/row-toggle-output.enum';

let TableTemplate: string = '';
@Component({
	selector: 'app-table',
	template: '',
	styleUrls: ['./table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TableComponent <T> implements OnChanges, OnInit, OnDestroy {

	@Input() public theme: ComponentTheme = ComponentTheme.Light;

	@Input() public columnsConfig: ColumnConfig[];

	@Input() public data: T[];

	@Input() public searchInputLabel: string;

	@Input() public searchInputPlaceholder: string;

	@Input() public headerButtonText: string;

	@Input() public headerButtonIcon: string;

	@Input() public rowButtonIcon: string;

	@Output() public toggled: EventEmitter<RowToggleOutput<T>> = new EventEmitter();

	@Output() public checked: EventEmitter<T[]> = new EventEmitter();

	@Output() public headerButtonClicked: EventEmitter<T[]> = new EventEmitter();

	@Output() public rowButtonClicked: EventEmitter<T> = new EventEmitter();

	public columns: Column[] = [];

	public displayedColumns: string[] = [];

	public innerComponentRef: ComponentRef<any>;

	private destroy$: Subject<any> = new Subject();

	constructor(
		private viewContainer: ViewContainerRef,
		private compiler: Compiler) {
	}

	public ngOnChanges(changes: SimpleChanges): void {
		if (Boolean(this.innerComponentRef)) {
			this.setUpdatedDataToInnerComponent(this.innerComponentRef);
		}
	}

	public ngOnInit(): void {
		this.createDom();
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	public createDom(): void {
		let columns: string = '';

		for (const column of this.columnsConfig) {
			let element: string = null;
			switch (column.columnType) {
				case TableColumnType.Text:
					element = this.createTextColumn(column);
					this.displayedColumns.push(column.dataName);
					break;
				case TableColumnType.TextSortable:
					element = this.createTextSortableColumn(column);
					this.displayedColumns.push(column.dataName);
					break;
				case TableColumnType.Checkbox:
					element = this.createCheckboxColumn(column);
					this.displayedColumns.push(column.dataName);
					break;
				case TableColumnType.Toggle:
					element = this.createToggleColumn(column);
					this.displayedColumns.push(column.dataName);
					break;
			}
			columns = columns + ` ${element}`;
		}
		this.displayedColumns.push('button');

		this.setTemplate(columns);

		const component: any = this.createDynamicComponent();
		const module: any = this.createDynamicModule(component);
		this.renderTableInnerComponent(component, module);
	}

	public createTextColumn(column: ColumnConfig): string {
		return	`<ng-container matColumnDef="${column.dataName}">
					<th mat-header-cell *matHeaderCellDef> ${column.columnName} </th>
					<td mat-cell *matCellDef="let element"> {{element.${column.dataName}}} </td>
				</ng-container>`;
	}

	public createTextSortableColumn(column: ColumnConfig): string {
		return	`<ng-container matColumnDef="${column.dataName}">
					<th mat-header-cell *matHeaderCellDef mat-sort-header> ${column.columnName} </th>
					<td mat-cell *matCellDef="let row"> {{row.${column.dataName}}} </td>
				</ng-container>`;
	}

	public createCheckboxColumn(column: ColumnConfig): string {
		return	`<ng-container matColumnDef="${column.dataName}">
					<th mat-header-cell *matHeaderCellDef>
						<app-checkbox-group	class="checkbox-group-demo__container"
							[options]="checkboxGroupData.options"
							[checked]="selection.hasValue() && isAllSelected()"
							[theme]="theme"
							[indeterminate]="selection.hasValue() && !isAllSelected()"
							[labelField]="checkboxLabel()"
							[valueField]="checkboxGroupData.valueField"
							(change)="onCheckHeader($event)">
						</app-checkbox-group>
					</th>
					<td mat-cell *matCellDef="let row">
						<app-checkbox-group	class="checkbox-group-demo__container"
							(click)="$event.stopPropagation()"
							[options]="checkboxGroupData.options"
							[checked]="selection.isSelected(row)"
							[theme]="theme"
							[labelField]="checkboxLabel(row)"
							[valueField]="checkboxGroupData.valueField"
							(change)="$event ? onCheck(row) : null">
						</app-checkbox-group>
					</td>
				</ng-container>`;
	}

	public createToggleColumn(column: ColumnConfig): string {
		return	`<ng-container matColumnDef="${column.dataName}">
					<th mat-header-cell *matHeaderCellDef> ${column.columnName} </th>
					<td mat-cell *matCellDef="let row">
						<app-slide-toggle
							[value]="row.${column.dataName}"
							[disabled]="false"
							[theme]=theme
							(toggled)="onToggle($event,row)"
							(click)="$event.stopPropagation()">
						</app-slide-toggle>
					</td>

				</ng-container>`;
	}

	public setTemplate(columns: string): void {
		const templateHeader: string =
			`<div class="table-header" [class.table-header--dark-theme]="isDarkTheme" [class.table-header--selected]="selection.selected.length">

				<app-search-input
					*ngIf="!selection.selected.length"
					#input
					(keyup)="applyFilter($event)"
					[theme]="theme"
					[preIcon]="'search'"
					[label]="searchInputLabel"
					[placeholder]="searchInputPlaceholder">
				</app-search-input>

				<p class="table-header__selected" *ngIf="selection.selected?.length">
					{{selection.selected.length}} {{selection.selected.length===1 ? 'user' : 'users'}} selected
				</p>
				<app-button
					type="outlined"
					[icon]="headerButtonIcon"
					[theme]="theme"
					*ngIf="selection.selected?.length"
					(click)="onHeaderButtonClick()">
					{{headerButtonText}}
				</app-button>

			</div>`;

		TableTemplate =
		`<div class="table">
			${templateHeader}

			<table mat-table [dataSource]="dataSource" class="mat-elevation-z8 table-content" [class.table-content--dark-theme]="isDarkTheme" matSort>

				${columns}

				<ng-container matColumnDef="button">
					<th mat-header-cell *matHeaderCellDef></th>
					<td class="table-content__row-button" mat-cell *matCellDef="let row">
						<app-button
							*ngIf="rowButtonIcon && this.hoverRow===row"
							type="basic"
							[icon]="rowButtonIcon"
							[theme]="theme"
							(click)="onRowButtonClick(row, $event)">
						</app-button>
					</td>
				</ng-container>

				<tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
				<tr mat-row *matRowDef="let row; columns: displayedColumns;"
					(click)="onCheck(row)"
					(mouseenter)="onMouseIn(row)"
					[class.table-content__row--hover]="this.hoverRow===row"
					[class.table-content__last-row]="row===data[data.length-1]">
				</tr>

				<tr class="mat-row" *matNoDataRow>
					<td class="mat-cell" colspan="displayedColumns.length">No data matching the filter "{{input.value}}"</td>
				</tr>
			</table>
			</div>`;
	}

	public renderTableInnerComponent(component: any, module: any): void {
		this.compiler.compileModuleAndAllComponentsAsync(module)
		.then((moduleWithFactories: ModuleWithComponentFactories<any>) => {
			const componentFactory: ComponentFactory<typeof component> =
			moduleWithFactories.componentFactories.find((x: ComponentFactory<any>) => x.componentType === component);
			this.innerComponentRef = this.viewContainer.createComponent(componentFactory);
			this.setInputsToInnerComponent(this.innerComponentRef);

			this.handleToggleOutput(this.innerComponentRef);
			this.handleCheckboxOutput(this.innerComponentRef);
			this.handleHeaderButtonOutput(this.innerComponentRef);
			this.handleRowButtonOutput(this.innerComponentRef);
		})
		.catch((error: Error) => {
			console.log(error);
		});
	}

	public setInputsToInnerComponent(componentRef: any): void {
		componentRef.instance.theme = this.theme;
		componentRef.instance.data = this.data;
		componentRef.instance.headerButtonText = this.headerButtonText;
		componentRef.instance.headerButtonIcon = this.headerButtonIcon;
		componentRef.instance.rowButtonIcon = this.rowButtonIcon;
		componentRef.instance.displayedColumns = this.displayedColumns;

		componentRef.instance.searchInputLabel = this.searchInputLabel;
		componentRef.instance.searchInputPlaceholder = this.searchInputPlaceholder;
	}

	public setUpdatedDataToInnerComponent(componentRef: any): void {
		componentRef.instance.data = this.data;
	}

	public handleToggleOutput(componentRef: any): void {
		componentRef.instance.toggled.pipe(takeUntil(this.destroy$)).subscribe((event: RowToggleOutput<T>) => this.toggled.emit(event));
	}

	public handleCheckboxOutput(componentRef: any): void {
		componentRef.instance.checked.pipe(takeUntil(this.destroy$)).subscribe((selected: T[]) => this.checked.emit(selected));
	}

	public handleHeaderButtonOutput(componentRef: any): void {
		componentRef.instance.headerButtonClicked.pipe(takeUntil(this.destroy$))
		.subscribe((selected: T[]) => this.headerButtonClicked.emit(selected));
	}
	public handleRowButtonOutput(componentRef: any): void {
		componentRef.instance.rowButtonClicked.pipe(takeUntil(this.destroy$)).subscribe((selected: T) => this.rowButtonClicked.emit(selected));
	}

	public clearSelectedRows(): void {
		if (Boolean(this.innerComponentRef)) {
			this.innerComponentRef.instance.clearSelectedRows();
		}
	}

	public createDynamicComponent(): any  {
		@Component({
			template: TableTemplate,
			jit: true,
			changeDetection: ChangeDetectionStrategy.OnPush})

		class CustomDynamicComponent implements DoCheck, AfterViewInit  {

			@Input() public theme: ComponentTheme = ComponentTheme.Light;

			@Input() public data: T[];

			public previousData: T[];

			@Input() public displayedColumns: string[] = [];

			@Input() public searchInputLabel: string;

			@Input() public searchInputPlaceholder: string;

			@Input() public headerButtonText: string;

			@Input() public headerButtonIcon: string;

			@Input() public rowButtonIcon: string;

			@Output() public toggled: EventEmitter<RowToggleOutput<T>> = new EventEmitter();

			@Output() public checked: EventEmitter<T[]> = new EventEmitter();

			@Output() public headerButtonClicked: EventEmitter<T[]> = new EventEmitter();

			@Output() public rowButtonClicked: EventEmitter<T> = new EventEmitter();

			@ViewChild(MatSort) sort: MatSort;
			public dataSource: MatTableDataSource<T>;

			public selection: SelectionModel<T> = new SelectionModel<T>(true, []);

			public hoverRow: T;

			public filterValue: string;

			public checkboxGroupData: CheckboxGroupDataDemo = {
				options: [
					{
						title: '',
						value: 1,
						checked: false
					}],
					labelField: '',
					valueField: 'value'
				};

			constructor(@Inject(ChangeDetectorRef) public cdr: ChangeDetectorRef) {}

			public ngDoCheck(): void {
				if (this.data !== this.previousData) {
					this.previousData = this.data;
					this.dataSource = new MatTableDataSource<T>(this.data);
					if (Boolean(this.filterValue)) {
						this.applyFilterAfterChanges(this.filterValue);
					}
					this.cdr.detectChanges();
				}
			}

			public ngAfterViewInit(): void {
				this.dataSource.sort = this.sort;
			}

			/** Whether the number of selected elements matches the total number of rows. */
			public isAllSelected(): boolean {
			  const numSelected: number = this.selection.selected.length;
			  const numRows: number = this.dataSource.data.length;
			  return numSelected === numRows;
			}

			/** Selects all rows if they are not all selected; otherwise clear selection. */
			public masterToggle(): void {

			  this.isAllSelected() ?
				  this.selection.clear() :
				  this.dataSource.data.forEach((row: T) => this.selection.select(row));
			}

			/** The label for the checkbox on the passed row */
			public checkboxLabel(row?: T): string {
			  if (!row) {
				return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
			  }
			  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row}`;
			}

			public get isDarkTheme(): boolean {
				return this.theme === ComponentTheme.Dark;
			}

			public onToggle(event: boolean, row: T): void {
				const newToggleEvent: RowToggleOutput <T> = {
					state: event,
					row: row
				};
				this.toggled.emit(newToggleEvent);
			}

			public onCheckHeader(event: Event): void {
				if (event) {
					this.masterToggle();
				}
				this.checked.emit(this.selection.selected);
			}

			public onCheck(row: T): void {
				this.selection.toggle(row);
				this.checked.emit(this.selection.selected);
			}

			public applyFilter(event: Event): void {
				const filterValue: string = (event.target as HTMLInputElement).value;
				this.dataSource.filter = filterValue.trim().toLowerCase();
				this.filterValue = filterValue;
			}

			public applyFilterAfterChanges(filterValue: string): void {
				this.dataSource.filter = filterValue.trim().toLowerCase();
			}

			public onMouseIn(row: T): void {
				this.hoverRow = row;
			}

			public onHeaderButtonClick(): void {
				this.headerButtonClicked.emit(this.selection.selected);
			}

			public onRowButtonClick(row: T, event: Event): void {
				this.rowButtonClicked.emit(row);
				event.stopPropagation();
			}

			public clearSelectedRows(): void {
				this.selection.clear();
			}

		}

		return CustomDynamicComponent;
	}

	private createDynamicModule (component: Type<any>): any {

		const moduleClass: any = class RuntimeComponentModule {
		};
		const decoratedNgModule: typeof moduleClass =
			NgModule({
				imports: [
					CommonModule,
					MatCheckboxModule,
					MatSlideToggleModule,
					MatSortModule,
					MatTableModule,
					MatFormFieldModule,
					FormsModule,
					MatInputModule,
					MatButtonModule,
					MatIconModule,
					MatFormFieldModule,
					ReactiveFormsModule],
				declarations: [
					component,
					CheckboxComponent,
					SlideToggleComponent,
					ButtonComponent,
					InputComponent,
					SearchInputComponent
				] })(moduleClass);

	return decoratedNgModule;
	}
}
