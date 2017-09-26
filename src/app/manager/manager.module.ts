import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ManagerComponent} from "./manager.component";
import {RouterModule} from "@angular/router";
import {managerRoutes} from "./manager.routes";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(managerRoutes, {useHash: false}),
  ],
  declarations: [ManagerComponent]
})
export class ManagerModule { }
