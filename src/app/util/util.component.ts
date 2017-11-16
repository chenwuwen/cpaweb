import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { UtilService } from "./util.service";
import { BsModalRef, BsModalService, ModalDirective } from "ngx-bootstrap";
import swal from 'sweetalert2';
import * as $ from 'jquery';  //引入jquery，如需使用jquery，则直接用$.grep()这样的形式即可


@Component({
  selector: 'app-util',
  templateUrl: './util.component.html',
  styleUrls: ['./util.component.css']
})
export class UtilComponent implements OnInit {
  /*Input相当于指令的值绑定，无论是单向的(@)还是双向的(=)。都是将父作用域的值“输入”到子作用域中，然后子作用域进行相关处理。
  Output相当于指令的方法绑定，子作用域触发事件执行响应函数，而响应函数方法体则位于父作用域中，相当于将事件“输出到”父作用域中，在父作用域中处理。*/
  @Input() pAnswer;
  @Input() totleCount;
  @Input() typeCode;
  /*声明事件发射器*/
  @Output() childResult = new EventEmitter<any>();

  public notDoCount: number;
  public result: any;
  public mark: number = 0;
  public newAnswer: Array<any> = [];

  @ViewChild('staticModal')
  public staticModal: ModalDirective;
  public bsModalRef: BsModalRef;

  constructor(private _utilService: UtilService,
    private _bsModalService: BsModalService) {
  }

  ngOnInit() {
  }


  // 提交用户答案到后台
  submitUnitExam(): any {
    this.staticModal.hide();
    console.log(`点击了提交按钮： ${this.newAnswer}`);
    return this._utilService.commitAnswer(this.newAnswer, this.typeCode).subscribe(res => {
      this.result = res['data'];
      this.launchResult(res);
      /*如果提交了答案将typeCode置为null,这时如果父组件切换了路由typeCode会将值传递给子组件*/
      this.typeCode = null;
      /*如果提交了答案将newAnswer设为空数组;若不置为空数组,当再次切换到该路由后所做的题还会包括上次所做的题*/
      this.newAnswer = [];
    }, (err) => {
      console.log(`error ${err}`);
    }, () => console.log(`编译！`)
    );
  }

  launchResult(data): void {
    /*发射事件*/
    this.childResult.emit(data);
  }

  // 还有几道题没有做提示
  notDo(): boolean {
    let falg: boolean = false;
    /* 原来的想法是将pAnswer中空值去掉，但是有一个问题就是去掉之后原数组结构改变，导致在视图上已选择的答案消失
     if (this.mark > 0) {
       for (let index = 0; index < this.pAnswer.length; index++) {
         if (this.pAnswer[index] == "" || typeof(this.pAnswer[index]) == "undefined") {
           this.pAnswer.splice(index, 1);
           index = index - 1;
         }
       }*/
    /*   采用遍历原数组，过滤push到新数组会有问题
       if (this.mark > 0) {
         for (let index = 0; index < this.pAnswer.length; index++) {
           if (typeof(this.pAnswer[index]) != "undefined") {
             this.newAnswer.push(this.pAnswer[index]);
           }
         }
       }*/

    /* 使用jquery的方式获取新数组
      if (this.mark > 0) {
        this.newAnswer = $.grep(this.pAnswer,function (e,i) {
          return (typeof(e) != "undefined");
        })
      }*/
    // 使用filter方法获取新数组
    if (this.mark > 0) {
      /*     这是原生JS的写法
           this.newAnswer = this.pAnswer.filter(function (ele, index, arr) {
             if (typeof (ele) != 'undefined' || ele == '') {
               return true
             }
             return false
           })*/
      this.newAnswer = this.pAnswer.filter((item) => item);
      /*   该代码是上面代码的完整写法，返回去除null的
         arr.filter((item) => Object.prototypy.toString.call(item) === '[object Null]' || item);
         返回去除字符串的
         arr.filter((item) => Object.prototypy.toString.call(item) === '[object String]' || item);*/


      this.notDoCount = this.totleCount - this.newAnswer.length;
      if (this.notDoCount > 0) {
        falg = true;
      }
    }
    return falg;
  }

  // 如果用户一道题都没有做点提交选择不同的弹窗,如果用户已经提交过一次，就不让他再次提交
  chooseModel(): void {
    if (this.pAnswer.length == 0) {
      this.tip1();
    } else if (this.result != undefined && this.typeCode == null) {
      this.tip2();
    } else {
      this.mark = 1;
      this.staticModal.show();
    }
  }

  initMark(): void {
    this.mark = 0;
  }

  //下载试题
  private downloadItem() {
    this._utilService.downloadItem(this.typeCode).subscribe(res => {
      console.log(`下载成功！`)
    }, (err) => {
      console.log(`下载失败！`)
    })
  }

  tip1(): void {
    swal({
      title: '提示',
      text: "至少选择一个答案!",
      type: 'warning',
      timer: 2000
    })
  }

  tip2(): void {
    swal({
      title: '提示',
      text: "您已经提交过一次，请勿重复提交!",
      type: 'warning',
      timer: 2000
    })
  }

}
