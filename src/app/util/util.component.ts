import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {UtilService} from "./util.service"

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

  constructor(private _utilService: UtilService) {
  }

  ngOnInit() {
  }

  submitUnitExam(pAnswer: any): any {
    console.log(`点击了提交按钮： ` + this.pAnswer);
    return this._utilService.commitAnswer(this.pAnswer).subscribe(res => {
        // this.result = res['data'];
        this.launchResult(res['data']);
      }, (err) => {
        console.log(`error ${err}`);
      }, () => console.log(`编译！`)
    );
  }

  launchResult(data) {
    /*发射事件*/
    this.childResult.emit(data);
  }
}
