import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonComponentsDemoComponent } from './common-components-demo.component';

const routes: Routes = [{ path: '', component: CommonComponentsDemoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonComponentsDemoRoutingModule { }
