import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks-creator',
  templateUrl: './tasks-creator.component.html',
  styleUrls: ['./tasks-creator.component.scss'],
})
export class TasksCreatorComponent implements OnInit {
  public isListEmpty: boolean = true;

  constructor() {}

  ngOnInit(): void {}
}
