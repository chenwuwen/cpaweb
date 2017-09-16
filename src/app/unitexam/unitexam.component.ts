import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UnitexamService} from "./unitexam.service";
import {flyIn} from '../animations/fly-in';
import {BsModalService, ModalDirective} from "ngx-bootstrap";


@Component({
  selector: 'app-unitexam',
  templateUrl: './unitexam.component.html',
  styleUrls: ['./unitexam.component.css', './magic-check.css'],
  animations: [
    flyIn
  ]
})
export class UnitexamComponent implements OnInit {


  public typeCode: string;
  public Listdata: Array<any>;   //试题集合
  public totleCount: number;    //加载记录数
  public pAnswers: Array<any>;  //用户回答
  public result: any;           //结果，由子组件传递过来
  public isModalShown: boolean = false;
  @ViewChild('autoShownModal')
  public autoShownModal: ModalDirective;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _unitexamService: UnitexamService, private _bsModalService: BsModalService) {
    /*通过这种形式来接收父级页面传过来的值  或者通过  this.route.params['value']['typeCode']*/
    /*route.params是一个可观察对象，可以使用.subscribe(),将参数值提取到固定值，这种情况下，我们将params['id'];赋值给组件实例变量id*/
    // route.params与route.queryParams不同,route.params在路由配置中匹配参数，而queryParams在查询字符串中匹配参数
    // this.route.params.subscribe(data=>console.log("传递的参数为："+data.typeCode));
    // 如果没有typeCode参数，那么我们将this.typeCode设置为 空字符串
    this._route.params.subscribe(params => {
      this.typeCode = params['typeCode'] || '';
    });
    this.pAnswers = [];
  }


  ngOnInit() {
    /*订阅事件将路由传递参数值传递给Service*/
    this._route.params.subscribe((params) => {
      this.typeCode = params['typeCode'] || '';
      this.getUnitExam(this.typeCode);
    });
  }


  getUnitExam(typeCode: string): any {
    return this._unitexamService.getUnitExam(typeCode).subscribe(res => {
        this.Listdata = res['data'];
        this.totleCount = res['totalCount'];
        /*从service获取数据，订阅将数据到Component*/
      }, (err) => {
        console.log(`error ${err}`);
      }, () => console.log(`编译！`)
    );
  }

  showMsg(): void {
    console.log(`click: ` + this.pAnswers);
  }

  /*父组件事件回调接收*/
  hitResult(data): void {
    console.log(`接收子组件数据`);
    this.result = data;
    console.log(`得分: ` + this.result.score);
    this.isModalShown = true;
  }

  initHidden(): void {
    /*model弹出之后,再关闭需要设置isModalShown为初始值*/
    this.isModalShown = false;
  }

  reviewErr(): void {
    this.autoShownModal.hide();
    console.log("查看错题。。。。。。。。");
  }
  reviewErrList(examId: number): boolean {
    let falg: boolean = false;
    // console.log("result:  "+this.result);
    // let errList = this.result.errorList;
    // if (examId == errList.errorItemId){
    //   falg = true;
    // }
    return falg;
  }

}
