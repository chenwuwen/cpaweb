import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsercenterComponent } from './usercenter.component';
import { FileUploadModule } from 'ng2-file-upload';
import { BaseModule } from '../common/base.module';
import { ModalModule } from 'ngx-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    BaseModule, //引入基础modal
    FileUploadModule,   //文件上传库
    ModalModule.forRoot()
  ],
  declarations: [UsercenterComponent]
})
export class UsercenterModule { }
