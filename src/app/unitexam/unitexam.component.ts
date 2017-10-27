import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { UnitexamService } from "./unitexam.service";
import { flyIn } from '../animations/fly-in';
import { BsModalService, ModalDirective } from "ngx-bootstrap";
import swal from 'sweetalert2';

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
  private collectIndexs: boolean[] = new Array();   //收藏试题索引数组
  private commentIndexs: boolean[] = new Array();   //评论试题索引数组


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
      /*切换路由将上次用户回答置为空;此设值不能写在构造函数中，因为构造函数只在组建被访问时执行，而是应该写在订阅里，这样每次切换菜单，都可以重置数组*/
      this.pAnswers = [];
    });
  }


  ngOnInit() {
    /*订阅事件将路由传递参数值传递给Service*/
    this._route.params.subscribe((params) => {
      this.typeCode = params['typeCode'] || '';
      this.getUnitExam(this.typeCode);
      this.result = undefined;
      /*切换路由,将测试结果置为undefined;以免切换后还可以看到错题样式*/
    });
  }


  getUnitExam(typeCode: string): any {
    return this._unitexamService.getUnitExam(typeCode).subscribe(res => {
      /*从service获取数据，订阅将数据到Component*/
      this.Listdata = res['data'];
      this.totleCount = res['totalCount'];
      // this.collectIndexs = new Array(this.Listdata.length)
      for (var i = 0; i < this.Listdata.length; i++) {
        this.collectIndexs.push(true);
        this.commentIndexs.push(false);
      }
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

  // 查看错题明细，增加样式
  reviewErrList(examId: number): boolean {
    let falg: boolean = false;
    if (this.result != undefined) {
      let errList = this.result.errorList;
      for (var i = 0; i < errList.length; i++) {
        if (examId == errList[i].errorItemId) {
          falg = true;
          break;
        }
      }
    }
    return falg;
  }

  // 未做的题增加样式
  reviewNotDoList(index: number): boolean {
    let falg: boolean = false;
    if (this.result != undefined) {
      if (this.pAnswers[index] == '' || this.pAnswers[index] == undefined) {
        falg = true;
      }
    }
    return falg;
  }
  //试题收藏
  toggleCollect(index: number, reId: number): void {
    console.log(`index: ` + index);
    console.dir(`reId: ` + reId);
    this.collectIndexs[index] = !this.collectIndexs[index];
    this._unitexamService.toggleCollect(reId).subscribe(res => {
      if (res == 0) {
        this.collectIndexs[index] = !this.collectIndexs[index];
        this.tip2();
      }
    }, (err) => { console.log(`error ${err}`); this.collectIndexs[index] = !this.collectIndexs[index]; this.tip2(); },
      () => { console.log(`编译`) })
  }


  //评论试题
  commentItem(index: number, reId: number, comment: string): any {
    console.log(`reId: ` + reId);
    console.log(`comment: ` + comment);
    this._unitexamService.commentItem(reId, comment).subscribe(res => {
      this.commentIndexs[index] = !this.commentIndexs[index];
      if (res != 0) {
        this.tip();
      } else {
        this.tip1();
      }

    }, (err) => { console.log(`error ${err}`); this.tip1(); },
      () => { console.log(`编译`) })
  }
  //打开关闭评论窗口
  toggleCommentwindow(index: number): void {
    this.commentIndexs[index] = !this.commentIndexs[index]
  }

  tip(): void {
    swal({
      title: '提示',
      text: "评论已提交!",
      type: 'success',
      timer: 2000
    })
  }
  tip1(): void {
    swal({
      title: '提示',
      text: "评论失败!",
      type: 'error',
      timer: 2000
    })
  }
  tip2(): void {
    swal({
      title: '提示',
      text: "收藏失败!",
      type: 'error',
      timer: 2000
    })
  }

}

