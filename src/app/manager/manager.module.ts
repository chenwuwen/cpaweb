import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManagerComponent} from "./manager.component";
import {RouterModule} from "@angular/router";
import {managerRoutes} from "./manager.routes";
import {ItemmanagerModule} from "./itemmanager/itemmanager.module";
import {DashboardModule} from "./dashboard/dashboard.module";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(managerRoutes), /*子路由使用forChild*/
    DashboardModule,
    ItemmanagerModule
  ],
  declarations: [ManagerComponent]
})
export class ManagerModule {
}
