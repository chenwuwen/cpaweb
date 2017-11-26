import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList, ApplicationRef, Output, EventEmitter } from '@angular/core';
import { CustomValidators } from 'ng2-validation';
import { ModalDirective, BsModalRef } from 'ngx-bootstrap';
import { CpaUser } from './user-model';
import { LoginmodelService } from './loginmodel.service';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-loginmodel',
  templateUrl: './loginmodel.component.html',
  styleUrls: ['./loginmodel.component.css']
})
export class LoginmodelComponent implements OnInit {

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
  private loginForm: NgForm
  @ViewChild('registerForm')
  private registerForm: NgForm
  /*声明事件发射器*/
  @Output() childResult = new EventEmitter<any>();


  constructor(private loginModelService: LoginmodelService, private applicationRef: ApplicationRef) { }

  ngOnInit() {
  }

  public showLoginModal(): void {
    this.isModalShown = true;
  }

  // 关闭Modal
  public onHidden(): void {
    this.loginModal.hide()
    this.isModalShown = false;
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
    if (type == "onHidden") {
      /* 登陆弹窗隐藏后重置表单[以下两种方式都可以,第二种应该来说更规范一些,但需要在组件内定义变量来获取表单]*/
      // this.cpaUser = new CpaUser();
      // this.registerUser = new CpaUser();
      this.loginForm.reset();
      this.registerForm.reset();
      this.isModalShown = false;
    }else {
      /* 验证码需要在弹窗显示出来后才可以重置否则报错故写在(onShown)方法里 */
      this.reloadValidateCode();
    }

  }
  /**
   * 检查用户名是否被占用
   */
  public checkUserName(newUsername: string) {
    console.log(`新用户名：` + newUsername);
    this.loginModelService.checkUsername(newUsername).subscribe(res => {
      if (res['state'] != 1) {
        this.ifshow3 = true
      } else {
        this.ifshow3 = false
      }
      console.log(res);
    })
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

  // 登陆
  public login(): any {
    console.log(this.cpaUser);
    this.loginModelService.login(this.cpaUser).subscribe(res => {
      if (res['status'] == 1) {
        this.launchResult(res['data']);
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
    }, (err) => { console.log(`error ${err}`); },
      () => { console.log(`编译`) })
  }

  // 注册
  public register(): any {
    console.log(this.registerUser)
    this.loginModelService.register(this.registerUser).subscribe(res => {
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
    }, (err) => { console.log(`error ${err}`); },
      () => { console.log(`编译`) })
  }

  // 点击更换验证码
  public reloadValidateCode(): any {
    console.log(`更换验证码`);
    /*    this.loginModelService.reloadValidateCode().subscribe(res => {
         console.log(res);
         console.log(`更换验证码返回类型为：`+typeof res);
         this.validateCodeUrl = res;
       }, (err) => { console.log(`error ${err}`); },
         () => { console.log(`编译`) }) */
    let src = '/api/validateCode?data=' + new Date() + Math.floor(Math.random() * 24).toString();
    console.log(`当前验证码图片地址为：` + this.elementRef0.nativeElement.src)
    this.elementRef0.nativeElement.src = src
    this.elementRef1.nativeElement.src = src

  }

  launchResult(data): void {
    /*发射事件*/
    this.childResult.emit(data);
  }

  tip(): void {
    swal({
      title: '提示',
      text: "注册成功!",
      type: 'success',
      timer: 2000
    })
  }

  tip1(): void {
    swal({
      title: '提示',
      text: "注册失败!",
      type: 'error',
      timer: 2000
    })
  }
}



