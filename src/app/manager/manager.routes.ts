import {AddExamComponent} from './itemmanager/addExam/add-exam.component';
import {ManagerComponent} from './manager.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {UpdExamComponent} from './itemmanager/updExam/upd-exam.component';


export const managerRoutes = [{
  path: 'manager',
  component: ManagerComponent,
  children: [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'}, /*写入二级路由forChild，此处必不可少的是path的空白链接*/
    {path: 'dashboard', component: DashboardComponent},
    {path: 'addExam', component: AddExamComponent},
    {path: 'updExam', component: UpdExamComponent},

  ]
}


];

