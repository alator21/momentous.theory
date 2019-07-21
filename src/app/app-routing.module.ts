import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ElementsListBootstrapComponent} from './infrastructure/components/elements-list/elements-list-bootstrap/elements-list-bootstrap.component';

const routes: Routes = [
  {
    path: '',
    component: ElementsListBootstrapComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
