import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { Identifiers } from '@angular/compiler';
import { AfterViewInit, Compiler, Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, ElementRef, EventEmitter, Input, ModuleWithComponentFactories, NgModule, OnDestroy, OnInit, Output, Renderer2, TemplateRef, Type, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Data } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CheckboxGroupDataDemo } from 'src/app/libs/common-components-demo/models/checkbox-group-data-demo';
import { ComponentTheme } from '../../shared/component-theme.enum';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { SlideToggleComponent } from '../slide-toggle/slide-toggle.component';
import { TableConfig, Column, TableColumnType } from './models/row-config.enum';

export interface PeriodicElement {
	name: string;
	position: number;
	weight: number;
	symbol: string;
}
let tableTemplate: string = '';
@Component({
	selector: 'app-table',
	template: '',
	styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit, OnDestroy {

	@Input()
	public theme: ComponentTheme = ComponentTheme.Light;

	@Input()
	public template: string;

	public columns: Column[] = [];

	public tableTemplate: string;

	public displayedColumns: string[] = [];

	@Input()
	public tableConfig: TableConfig[];

	@Input()
	public data: any;

	@Output()
	public toggled: EventEmitter<PeriodicElement> = new EventEmitter();

	@Output()
	public checked: EventEmitter<PeriodicElement[]> = new EventEmitter();

	@ViewChild('table', {read: ViewContainerRef})
	public container: ViewContainerRef;

	private hasTextSortable: boolean;

	private destroy$: Subject<any> = new Subject();

	constructor(private elementRef: ElementRef,
		private renderer: Renderer2,
		private viewContainer: ViewContainerRef,
		private compiler: Compiler) {
	}

	public ngOnInit(): void {
		this.setRows();
		this.createDom();

		// формируем лист для шапки таблицы из инпутов даты и конфига
		// формирем через элементреф начинку дома
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}



	public setRows(): void {
		const dataNames: string[] = Object.keys(this.data[0]);
		let i: number = 0;
		for (const tableConfig of this.tableConfig) {
			if (tableConfig.columnType === TableColumnType.Text || tableConfig.columnType === TableColumnType.TextSortable) {
				this.columns.push({
					columnType: tableConfig.columnType,
					columnName: tableConfig.name,
					dataName: dataNames[i]
				});
				i++;
			} else {
				this.columns.push({
					columnType: tableConfig.columnType,
					columnName: tableConfig.name,
					dataName: tableConfig.name
				});
			}
		}
	}

	public createDom(): void {
		// tableEl.outerHTML = `<table mat-table [dataSource]="dataSource" class="mat-elevation-z8">`;

		let columns: string = '';

		for (const column of this.columns) {
			console.log('row', column)
			let element: string = null;
			if (column.columnType === TableColumnType.Text) {
				element =
				`<ng-container matColumnDef="${column.dataName}">
					<th mat-header-cell *matHeaderCellDef> ${column.columnName} </th>
					<td mat-cell *matCellDef="let element"> {{element.${column.dataName}}} </td>
				</ng-container>`;
				this.displayedColumns.push(column.dataName)
			} else if (column.columnType === TableColumnType.TextSortable) {
				element =
				`<ng-container matColumnDef="${column.dataName}">
					<th mat-header-cell *matHeaderCellDef mat-sort-header> ${column.dataName} </th>
					<td mat-cell *matCellDef="let row"> {{row.${column.dataName}}} </td>
			  	</ng-container>`;
				this.displayedColumns.push(column.dataName);
				this.hasTextSortable = true;
			} else if (column.columnType === TableColumnType.Checkbox) {
				element =
				`<ng-container matColumnDef="${column.dataName}">
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
				this.displayedColumns.push(column.dataName);
			} else if (column.columnType === TableColumnType.Toggle) {
				element =
				`<ng-container matColumnDef="${column.dataName}">
					<th mat-header-cell *matHeaderCellDef> ${column.dataName} </th>
					<td mat-cell *matCellDef="let row">
						<app-slide-toggle
							[value]="false"
							[disabled]="false"
							[theme]=theme
							(toggled)="onToggle(row)">
						</app-slide-toggle>
					</td>
			  	</ng-container>`;
				this.displayedColumns.push(column.dataName)
			}
			columns = columns + ` ${element}`;
		}


		tableTemplate =
			this.hasTextSortable ?
			`<table mat-table [dataSource]="dataSource" class="mat-elevation-z8 table-component" [class.table-component--dark-theme]="isDarkTheme" matSort>
			${columns}
			<tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
			<tr mat-row *matRowDef="let row; columns: displayedColumns;"
				(click)="selection.toggle(row)">
			</tr>
			</table>` :
			`<table mat-table [dataSource]="dataSource" class="mat-elevation-z8 table-component" [class.table-component--dark-theme]="isDarkTheme">
				${columns}
				<tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
				<tr mat-row *matRowDef="let row; columns: displayedColumns;"
					(click)="selection.toggle(row)">
				</tr>
			</table>`;
		console.log(this.displayedColumns)


		const component = this.createDynamicComponent();
		console.log(component)
		const module = this.createDynamicModule(component);
		this.compiler.compileModuleAndAllComponentsAsync(module)
			.then((moduleWithFactories: ModuleWithComponentFactories<any>) => {
				const componentFactory: ComponentFactory<typeof component> =
				moduleWithFactories.componentFactories.find((x: ComponentFactory<any>) => x.componentType === component);
				const componentRef: ComponentRef<typeof component> = this.viewContainer.createComponent(componentFactory);
				componentRef.instance.theme = this.theme;
				componentRef.instance.data = this.data;
				componentRef.instance.displayedColumns = this.displayedColumns;

				componentRef.instance.toggled.pipe(takeUntil(this.destroy$)).subscribe(row => this.toggled.emit(row));
				componentRef.instance.checked.pipe(takeUntil(this.destroy$)).subscribe(selected => this.toggled.emit(selected));

			})
			.catch((error: Error) => {
				console.log(error);
			});
	}

	public createDynamicComponent(): any  {

		@Component({template: tableTemplate, jit: true })
		class CustomDynamicComponent implements OnInit, AfterViewInit  {

			@Input()
			public theme: ComponentTheme = ComponentTheme.Light;

			@Input()
			public data: any;

			@Input()
			public displayedColumns: string[] = [];

			@Output()
			public toggled: EventEmitter<PeriodicElement> = new EventEmitter();

			@Output()
			public checked: EventEmitter<PeriodicElement[]> = new EventEmitter();

			@ViewChild(MatSort) sort: MatSort;
			public dataSource: MatTableDataSource<PeriodicElement>;

			public selection: SelectionModel<PeriodicElement> = new SelectionModel<PeriodicElement>(true, []);

			public selected: any;

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

			public ngOnInit(): void {
				this.dataSource = new MatTableDataSource<PeriodicElement>(this.data);
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
				console.log(this.selection)

			  this.isAllSelected() ?
				  this.selection.clear() :
				  this.dataSource.data.forEach((row: PeriodicElement) => this.selection.select(row));
			}

			/** The label for the checkbox on the passed row */
			public checkboxLabel(row?: PeriodicElement): string {
			  if (!row) {
				return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
			  }
			  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
			}

			public get isDarkTheme(): boolean {
				return this.theme === ComponentTheme.Dark;
			}

			public onToggle(row: PeriodicElement): void {
				this.toggled.emit(row);
			}

			public onCheckHeader(event: Event): void {
				if (event) {
					this.masterToggle()
				}
				this.checked.emit(this.selection.selected)
			}

			public onCheck(row): void {
				this.selection.toggle(row)
				this.checked.emit(this.selection.selected)
			}

		}

		console.log( CustomDynamicComponent);

		return CustomDynamicComponent;
	  }

	  private createDynamicModule (component: Type<any>) {

		const moduleClass = class RuntimeComponentModule {
		};
		const decoratedNgModule: typeof moduleClass =
			NgModule({
				imports: [
					CommonModule,
					MatCheckboxModule,
					MatSlideToggleModule,
					MatSortModule,
					MatTableModule],
				declarations: [
					component,
					CheckboxComponent,
					SlideToggleComponent
				] })(moduleClass);

	 return decoratedNgModule;
	  }
}
