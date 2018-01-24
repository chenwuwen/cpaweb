import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UpdUserService} from './upd-user.service';
import {BaseModule} from '../../../common/base.module';
import {UpdUserComponent} from './upd-user.component';
import {FormsModule} from '@angular/forms';
import {BsDatepickerModule} from 'ngx-bootstrap';
import {defineLocale} from 'ngx-bootstrap/chronos';
import {zhCnLocale} from 'ngx-bootstrap/chronos/i18n/zh-cn';

@NgModule({
  imports: [
    CommonModule,
    BaseModule,
    BsDatepickerModule.forRoot(), /*ngx-bootstrap datePicker模块*/
    FormsModule, /*template中如果使用了[(ngModule)]需要导入此模块,模型驱动表单*/
  ],
  declarations: [UpdUserComponent],
  providers: [UpdUserService]
})
export class UpdUserModule {

}
