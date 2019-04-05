import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UnitExamService} from './unitexam.service';
import {flyIn} from '../animations/fly-in';
import {BsModalService, ModalDirective} from 'ngx-bootstrap';
import swal from 'sweetalert2';
import {Message} from 'primeng/api';
import {LoginmodalComponent} from '../common/loginmodal/loginmodal.component';

@Component({
  selector: 'app-unitexam',
  templateUrl: './unitexam.component.html',
  styleUrls: ['./unitexam.component.css', './magic-check.css'],
  animations: [
    flyIn
  ]
})
export class UnitExamComponent implements OnInit {


  public testType: string;
  public Listdata: Array<any> = [];   // 试题集合
  public totleCount: number;    // 加载记录数
  public pAnswers: Array<any>;  // 用户回答
  public result: any;           // 结果，由子组件传递过来
  public isScoreModalShown: boolean = false; // 得分modal
  private collectIndexs: boolean[] = new Array();   // 收藏试题索引数组
  private commentIndexs: boolean[] = new Array();   // 评论试题索引数组
  private commentContentIndexs: boolean[] = new Array();  // 评论试题内容索引数组
  private listComment: any[] = new Array();   // 获取试题评论数组
  public commentContent: any[] = new Array();  // 评论内容数组,用在表单验证上
  public msgs: Message[] = [];  // primeng消息提示,之前消息提示用的是sweetalert2

  public scrollCallback;

  private is_loading: boolean = false; // 是否显示loading加载组件
  @ViewChild('scoreModal')
  public scoreModal: ModalDirective; // 得分弹出层
  @ViewChild('loginModal')
  private loginModal: LoginmodalComponent; // 登陆弹出层


  private pageNo: number = 0;
  private pageSize: number = 10;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _unitExamService: UnitExamService,
              private _bsModalService: BsModalService) {
    /*通过这种形式来接收父级页面传过来的值  或者通过  this.route.params['value']['testType']*/
    /*route.params是一个可观察对象，可以使用.subscribe(),将参数值提取到固定值，这种情况下，我们将params['id'];赋值给组件实例变量id*/
    // route.params与route.queryParams不同,route.params在路由配置中匹配参数，而queryParams在查询字符串中匹配参数
    // this.route.params.subscribe(data=>console.log("传递的参数为："+data.testType));
    // 如果没有testType参数，那么我们将this.testType设置为 空字符串
    this._route.params.subscribe(params => {
      this.testType = params['testType'] || '';
      /*切换路由将上次用户回答置为空;此设值不能写在构造函数中，因为构造函数只在组建被访问时执行，而是应该写在订阅里，这样每次切换菜单，都可以重置数组*/
      this.pAnswers = [];
      // 初始化loading加载组件(只在第一次请求时初始化)
      if (this.Listdata.length === 0) {
        this.is_loading = !this.is_loading;
      }
      this.scrollCallback = this.getUnitExam.bind(this);
    });
  }


  ngOnInit() {
    // 订阅事件将路由传递参数值传递给Service
    this._route.params.subscribe((params) => {
      this.testType = params['testType'] || '';
      this.getUnitExam();
      // 切换路由,将测试结果置为undefined;以免切换后还可以看到错题样式
      this.result = undefined;
      // 切换路由,将结果集置为空数组
      this.Listdata = [];
    });
  }

  /**
   * 获取试题
   * @returns {any}
   */
  getUnitExam(): any {
    // 页码初始化为0,请求一次,页码加一
    this.pageNo++;
    return this._unitExamService.getUnitExam(this.testType, this.pageNo, this.pageSize).subscribe(res => {
        // 从service获取数据，订阅将数据到Component
        // this.Listdata = res['data'];
        this.Listdata = this.Listdata.concat(res['data']);
        this.totleCount = res['totalCount'];
        for (let i = 0; i < this.Listdata.length; i++) {
          this.collectIndexs.push(true);
          this.commentIndexs.push(false);
          this.commentContentIndexs.push(false);
          this.listComment.push();
        }
        // 加载试题成功,隐藏loading加载组件
        if (this.Listdata.length <= this.pageSize) {
          this.is_loading = !this.is_loading;
        }
      }, (err) => {
        // 加载试题失败,隐藏loading加载组件
      if (this.Listdata.length <= this.pageSize) {
        this.is_loading = !this.is_loading;
      }
        console.log(`error ${err}`);
      }, () => console.log(`编译！`)
    );
  }

  showMsg(): void {
    console.log(`click: ` + this.pAnswers);
  }

  /**
   * 父组件事件回调接收
   * @param data
   */
  hitResult(data): void {
    console.log(`接收子组件数据`);
    if (data.status === 0) {
      this.loginModal.showLoginModal();
      return;
    }
    this.result = data.data;
    console.log(`得分: ` + this.result.score);
    this.isScoreModalShown = !this.isScoreModalShown;
  }

  initHidden(): void {
    /*model弹出之后,再关闭需要设置isModalShown为初始值*/
    this.isScoreModalShown = false;
  }

  reviewErr(): void {
    this.scoreModal.hide();
    console.log('查看错题。。。。。。。。');
  }

  /**
   * 查看错题明细，增加样式
   * @param examId
   */
  reviewErrList(examId: number): boolean {
    let flag: boolean = false;
    if (this.result != undefined) {
      let errList = this.result.errorList;
      for (let i = 0; i < errList.length; i++) {
        if (examId == errList[i].errorItemId) {
          flag = true;
          break;
        }
      }
    }
    return flag;
  }

  /**
   * 未做的题增加样式
   * @param index
   */
  reviewNotDoList(index: number): boolean {
    let falg: boolean = false;
    if (this.result != undefined) {
      if (this.pAnswers[index] == '' || this.pAnswers[index] == undefined) {
        falg = true;
      }
    }
    return falg;
  }

  /**
   * 试题收藏
   * @param {number} index
   * @param {number} reId
   */
  toggleCollect(index: number, reId: number): void {
    console.log(`index: ` + index);
    console.dir(`reId: ` + reId);
    this.collectIndexs[index] = !this.collectIndexs[index];
    this._unitExamService.toggleCollect(reId).subscribe(res => {
        // 用户未登录，弹出登陆框
        if (res['status'] == 0) {
          this.collectIndexs[index] = !this.collectIndexs[index];
          console.log('弹出登陆窗口');
          // 调用子组件打开登陆窗口
          this.loginModal.showLoginModal();
        } else if (res['state'] == 2) {   //操作失败
          this.collectIndexs[index] = !this.collectIndexs[index];
          // this.tip2();
          this.msgs = [];
          this.msgs.push({severity: 'error', summary: '失败', detail: '收藏失败'});
        } else {
          console.log('试题收藏成功');
          this.msgs.push({severity: 'success', summary: '成功', detail: '已收藏'});
        }
      }, (err) => {
        console.log(`error ${err}`);
        this.collectIndexs[index] = !this.collectIndexs[index];
        // this.tip2();
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: '失败', detail: '收藏失败'});
      },
      () => {
        console.log(`编译`);
      });
  }


  /**
   * 评论试题
   */
  commentItem(index: number, reId: number, comment: string): any {
    console.log(`reId: ` + reId);
    console.log(`comment: ` + comment);
    this._unitExamService.commentItem(reId, comment).subscribe(res => {
        this.commentIndexs[index] = !this.commentIndexs[index];
        // 用户未登录，弹出登陆框
        if (res['status'] == 0) {
          this.commentIndexs[index] = !this.commentIndexs[index];
          console.log('弹出登陆窗口');
          // 调用子组件打开登陆窗口
          this.loginModal.showLoginModal();
        } else if (res['state'] == 2) {   //操作失败
          this.commentIndexs[index] = !this.commentIndexs[index];
          // this.tip1();
          this.msgs = [];
          this.msgs.push({severity: 'error', summary: '失败', detail: '评论失败'});
        } else {
          this.msgs = [];
          this.msgs.push({severity: 'success', summary: '成功', detail: '评论已提交'});
          // 评论完成,将评论数加一,此处应该在后台查询,先这样写吧
          console.log(this.listComment[index]);
          console.log(typeof this.listComment[index]);
          this.listComment[index].commentCount = this.listComment[index].commentCount + 1;
          //如果当前评论窗口是打开状态,触发查看评论方法
          if (this.commentContentIndexs[index]) {
            this.getComment(index, reId, 0);
          }
        }

      }, (err) => {
        console.log(`error ${err}`);
        // this.tip1();
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: '失败', detail: '评论失败'});
      },
      () => {
        console.log(`编译`);
      });
  }

  /**
   * 打开关闭评论窗口
   * @param index
   */
  toggleCommentWindow(index: number): void {
    this.commentIndexs[index] = !this.commentIndexs[index];
  }

  /**
   * 获取试题评论
   */
  getComment(index: number, reId: number, falg: number): any {
    if (!this.commentContentIndexs[index]) {   //如果评论内容Dom未打开
      this._unitExamService.getComment(reId).subscribe(res => {
          if (res['status'] == 0) {
            this.loginModal.showLoginModal();
          }
          this.listComment[index] = res['data'];
          //如果评论内容加载完Dom打开
          this.commentContentIndexs[index] = !this.commentContentIndexs[index];
        }, (err) => {
          console.log(`error ${err}`);
        }, () => console.log(`编译`)
      );
    } else if (falg == index) {    // 这里用falg变量来判断,请求该方法的操作是来自Dom的点击还是Js的回调
      console.log(`是dom点击操作调用的`);
      //再次点击dom时如果评论内容Dom打开则关闭
      this.commentContentIndexs[index] = !this.commentContentIndexs[index];
    } else {
      this._unitExamService.getComment(reId).subscribe(res => {
          if (res['status'] == 0) {
            this.loginModal.showLoginModal();
          }
          this.listComment[index] = res['data'];
        }, (err) => {
          console.log(`error ${err}`);
        }, () => console.log(`编译`)
      );
    }
  }

  tip(): void {
    swal({
      title: '提示',
      text: '评论已提交!',
      type: 'success',
      timer: 2000
    });
  }

  tip1(): void {
    swal({
      title: '提示',
      text: '评论失败!',
      type: 'error',
      timer: 2000
    });
  }

  tip2(): void {
    swal({
      title: '提示',
      text: '收藏失败!',
      type: 'error',
      timer: 2000
    });
  }

}

