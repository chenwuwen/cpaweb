import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList, ApplicationRef } from '@angular/core';
import { CustomValidators } from 'ng2-validation';
import { ModalDirective, BsModalRef } from 'ngx-bootstrap';
import { CpaUser } from './user-model';
import { LoginmodelService } from './loginmodel.service';

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
  private ifshow: boolean = false;
  private ifshow1: boolean = false;
  private ifshow2: boolean = false;
  private ifshow3: boolean = false;
  private msg: string;
  /*  ViewChild 装饰器用于获取模板视图中的元素，它支持 Type 类型或 string 类型的选择器，同时支持设置 read 查询条件，
   以获取不同类型的实例。而 ViewChildren 装饰器是用来从模板视图中获取匹配的多个元素，返回的结果是一个 QueryList 集合。 */
  @ViewChild('validateCodeUrl0')
  private elementRef0: ElementRef;
  @ViewChild('validateCodeUrl1')
  private elementRef1: ElementRef;
  @ViewChild('loginModal')
  private loginModal: ModalDirective;


  constructor(private loginModelService: LoginmodelService, private applicationRef: ApplicationRef) { }

  ngOnInit() {
  }

  public showLoginModal(): void {
    /* 显示登陆弹窗前重置表单以及验证码 */
    this.cpaUser = new CpaUser();
    this.registerUser = new CpaUser();
    this.isModalShown = true;
    // this.reloadValidateCode();
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
      this.isModalShown = false;
    } else {
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
        this.onHidden();
      } else {
        this.msg = res['msg'];
        if (this.msg == '验证码错误！') {
          this.ifshow1 = !this.ifshow1;
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
        this.onHidden();
      } else {
        if (this.msg == '验证码错误！') {

        } else {

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
}
