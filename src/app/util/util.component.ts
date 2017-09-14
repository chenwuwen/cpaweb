import {Component, OnInit, Input, Output, EventEmitter, TemplateRef, ViewChild} from '@angular/core';
import {UtilService} from "./util.service";
import {BsModalRef, BsModalService, ModalDirective} from "ngx-bootstrap";
import swal from 'sweetalert2';


@Component({
  selector: 'app-util',
  templateUrl: './util.component.html',
  styleUrls: ['./util.component.css']
})
export class UtilComponent implements OnInit {
  /*Input相当于指令的值绑定，无论是单向的(@)还是双向的(=)。都是将父作用域的值“输入”到子作用域中，然后子作用域进行相关处理。
  Output相当于指令的方法绑定，子作用域触发事件执行响应函数，而响应函数方法体则位于父作用域中，相当于将事件“输出到”父作用域中，在父作用域中处理。*/
  @Input() pAnswer;
  /*声明事件发射器*/
  @Output() childResult = new EventEmitter<any>();

  @ViewChild('staticModal')
  public staticModal: ModalDirective;
  public bsModalRef: BsModalRef;

  constructor(private _utilService: UtilService,
              private _bsModalService: BsModalService) {
  }

  ngOnInit() {
  }

  submitUnitExam(): any {
    this.staticModal.hide();
    console.log(`点击了提交按钮： ` + this.pAnswer);
    return this._utilService.commitAnswer(this.pAnswer).subscribe(res => {
        // this.result = res['data'];
        this.launchResult(res['data']);
      }, (err) => {
        console.log(`error ${err}`);
      }, () => console.log(`编译！`)
    );
  }

  launchResult(data): void {
    /*发射事件*/
    this.childResult.emit(data);
  }

  /* inquirySubmit(): void {
     swal({
       title: '确定提交吗',
       text: "You won't be able to revert this!",
       type: 'warning',
       showCancelButton: true,
       cancelButtonText: '取消',
       cancelButtonColor: '#d33',
       confirmButtonColor: '#3085d6',
       confirmButtonText: '确认提交',
       showConfirmButton: true
     }).then(function (isConfirm) {
       if (isConfirm === true) {
         //回调可能会报错
         this.submitUnitExam();
       }
     })
   }*/

}
