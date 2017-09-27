import {RouterModule} from '@angular/router';
import {ItemmanagerComponent} from "./itemmanager/itemmanager.component";
import {ManagerComponent} from "./manager.component";



export const managerRoutes = [{
  path: 'manager',
  component: ManagerComponent,
  children: [
    {path: '', redirectTo: 'posttable/page/1', pathMatch: 'full'}, /*写入二级路由forChild，此处必不可少的是path的空白链接*/
    {path: 'addExam', component: ItemmanagerComponent}

  ]
}


];

