import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList,
  ApplicationRef,
  Output,
  EventEmitter
} from '@angular/core';
import {CustomValidators} from 'ng2-validation';
import {ModalDirective, BsModalRef} from 'ngx-bootstrap';
import {CpaUser} from './user-model';
import {LoginmodalService} from './loginmodal.service';
import swal from 'sweetalert2';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import {LoginState} from '../reducer/loginStateReducer';


@Component({
  selector: 'app-loginmodal',
  templateUrl: './loginmodal.component.html',
  styleUrls: ['./loginmodal.component.css']
})
export class LoginmodalComponent implements OnInit {

  public isModalShown: boolean = false;
  private schema: number;
  private cpaUser: CpaUser = new CpaUser();
  private registerUser: CpaUser = new CpaUser();
  private ifshow: boolean = false;    //登陆用户名或密码错误
  private ifshow1: boolean = false;   //登陆验证码错误
  private ifshow2: boolean = false;   //注册验证码错误
  private ifshow3: boolean = false;   //用户名是否被占用
  private msg: string;
  /*  ViewChild 装饰器用于获取模板视图中的元素，它支持 Type 类型或 string 类型的选择器，同时支持设置 read 查询条件，
   以获取不同类型的实例。而 ViewChildren 装饰器是用来从模板视图中获取匹配的多个元素，返回的结果是一个 QueryList 集合。 */
  // #validateCodeUrl0,模板局部变量最好写在html元素的最前面,否则有可能获取不到
  // 还需要注意点，this.elementRef0 对象获取模板局部变量时机，仅在ngAfterViewInit生命周期之后才有，也就是说在组件构造器，及onint等生命周期时是获取不到的。
  @ViewChild('validateCodeUrl0')
  private elementRef0: ElementRef;
  @ViewChild('validateCodeUrl1')
  private elementRef1: ElementRef;
  @ViewChild('loginModal')
  private loginModal: ModalDirective;
  @ViewChild('loginForm')
  private loginForm: NgForm;
  @ViewChild('registerForm')
  private registerForm: NgForm;
  /*声明事件发射器*/
  /*已弃用,原为登陆成功后向父组件传递登陆人信息,现已由ngRx进行管理*/
  @Output() childResult = new EventEmitter<any>();


  constructor(private loginModalService: LoginmodalService, private applicationRef: ApplicationRef, private store: Store<LoginState>) {
  }

  ngOnInit() {
  }

  public showLoginModal(): void {
    this.isModalShown = true;
  }


  public changeLoginSchema(): void {
    this.schema = 1;
  }

  public changeRegisterSchema(): void {
    this.schema = 0;
  }

  /**
   *   destroy销毁组件
   */
  public destroy() {

  }

  /**
   * Modal关闭或者打开后做一些处理
   */
  public handler(type: string, $event: ModalDirective) {
    console.log(`type:  ` + type);
    // $event.dismissReason
    // 关闭Modal
    if (type == 'onHidden') {
      /* 登陆弹窗隐藏后重置表单[以下两种方式都可以,第二种应该来说更规范一些,但需要在组件内定义变量来获取表单]*/
      // this.cpaUser = new CpaUser();
      // this.registerUser = new CpaUser();
      this.loginForm.reset();
      this.registerForm.reset();
      this.isModalShown = false;
      this.loginModal.hide();
      //将错误信息屏蔽
      this.ifshow = false;
      this.ifshow1 = false;
      this.ifshow2 = false;
      this.ifshow3 = false;
    } else {
      /* 验证码需要在弹窗显示出来后才可以重置否则报错故写在(onShown)方法里 */
      this.reloadValidateCode();
    }

  }

  /**
   * 检查用户名是否被占用
   */
  public checkUserName(newUsername: string) {
    console.log(`新用户名：` + newUsername);
    this.loginModalService.checkUsername(newUsername).subscribe(res => {
      if (res['state'] != 1) {
        this.ifshow3 = true;
      } else {
        this.ifshow3 = false;
      }
      console.log(res);
    });
  }


  public onKeyPress(event: any) {
    console.log(`键盘弹起事件：` + event.keyCode);
    // let keyCode = event.keyCode;
    // if (keyCode!=13) {
    //   this.ifshow3 = false;
    // }
  }

  //  input的值改变事件
  public changeName(event: any) {
    this.ifshow3 = false;
  }

  /**
   * 用户登陆
   * @returns {any}
   */
  public login(): any {
    console.log(this.cpaUser);
    this.loginModalService.login(this.cpaUser).subscribe(res => {
        if (res['status'] == 1) {
          /**
           *将token存入localStorage,其会自动是别token,在控制台使用命令
           *localStorage.token即可显示token值，与
           *localStorage.getItem("token")的值一样
           */
          localStorage.setItem('token', res['data'].token);

          /**
           * 用localStorage.setItem()正确存储JSON对象方法是：
           * 存储前先用JSON.stringify()方法将json对象转换成字符串形式
           * JSON.stringify() 方法可以将任意的 JavaScript 值序列化成 JSON 字符串
           * 后续要操作该JSON对象，要将之前存储的JSON字符串先转成JSON对象再进行操作
           */
          localStorage.setItem('user', JSON.stringify(res['data']));
          /*ngRx状态中action,主要作用是发送Redux改变store中状态,payload是可选的其值可以是任意值,也可以是对象*/
          /*派发action，从而更新store,type描述我们期待的状态变化类型,payload是发送到待更新store中的数据*/
          this.store.dispatch({type: 'HASLOGIN', payload: 'HASLOGIN'});
          /*调用本地方法,向父级组件传递登陆信息,已弃用,由ngRx来管理登陆状态*/
          // this.launchResult(res['data']);
          this.loginModal.hide();
        } else {
          this.msg = res['msg'];
          if (this.msg == '验证码错误！') {
            this.ifshow1 = !this.ifshow1;
            this.reloadValidateCode();
          } else {
            this.ifshow = !this.ifshow;
          }

        }
      }, (err) => {
        console.log(`error ${err}`);
      },
      () => {
        console.log(`编译`);
      });
  }

  /**
   * 用户注册
   * @returns {any}
   */
  public register(): any {
    console.log(this.registerUser);
    this.loginModalService.register(this.registerUser).subscribe(res => {
        if (res['state'] == 1) {
          this.loginModal.hide();
          this.tip();
        } else {
          if (this.msg == '验证码错误！') {
            this.ifshow2 = !this.ifshow2;
            this.reloadValidateCode();
          } else {
            this.tip1();
          }
        }
      }, (err) => {
        console.log(`error ${err}`);
      },
      () => {
        console.log(`编译`);
      });
  }

  /**
   * 点击更换验证码
   * @returns {any}
   */
  public reloadValidateCode(): any {
    console.log(`更换验证码`);
    /*    this.loginModalService.reloadValidateCode().subscribe(res => {
     console.log(res);
     console.log(`更换验证码返回类型为：`+typeof res);
     this.validateCodeUrl = res;
     }, (err) => { console.log(`error ${err}`); },
     () => { console.log(`编译`) }) */
    let src = '/api/validateCode?data=' + new Date() + Math.floor(Math.random() * 24).toString();
    console.log(`当前验证码图片地址为：` + this.elementRef0.nativeElement.src);
    this.elementRef0.nativeElement.src = src;
    this.elementRef1.nativeElement.src = src;

  }

  /**
   * 向父组件传递值的方法(登陆状态)
   * 目前已弃用,由ngRx来进行管理
   * @param data
   */
  launchResult(data): void {
    /*发射事件*/
    this.childResult.emit(data);
  }

  /**
   * 第三方登录图标,鼠标移入事件
   * @param event
   */
  logoMouseenter(event): void {
    // event包含了很多信息
    console.log(event);
    // event.target获取了当前操作的DOM
    console.log(event.target);
    event.target.style.height = '3em';
  }

  /**
   * 第三方登录图标,鼠标移出事件
   * @param event
   */
  logoMouseleave(event): void {
    event.target.style.height = '2em';
  }

  /**
   * 第三方登录图标,鼠标点击事件
   * @param event
   */
  logoClick(type: string): void {
    console.log('当前点击的图标是：', type);
  }

  tip(): void {
    swal({
      title: '提示',
      text: '注册成功!',
      type: 'success',
      timer: 2000
    });
  }

  tip1(): void {
    swal({
      title: '提示',
      text: '注册失败!',
      type: 'error',
      timer: 2000
    });
  }
}



