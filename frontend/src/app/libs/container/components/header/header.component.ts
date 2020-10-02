import { Component, OnInit } from '@angular/core';
import { ContainerFacadeService } from '../../services/container.facade';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private role: String;

  constructor(private containerFacadeService: ContainerFacadeService) { }

  public ngOnInit(): void {
  }

}
