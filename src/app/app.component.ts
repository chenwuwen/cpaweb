import {Component, ViewChild, ElementRef} from '@angular/core';
/*所有组件必须引入*/
import {ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot} from '@angular/router';
import {LoginmodelComponent} from './common/loginmodel/loginmodel.component';
import {tokenNotExpired} from 'angular2-jwt';
import {AppService} from './app.service';
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']   /*HTML模板使用的样式表，可以有多个。*/
})
export class AppComponent {
  @ViewChild('loginModal')
  private loginModal: LoginmodelComponent;
  @ViewChild('circleHeadImg')
  private circleHeadImg: ElementRef;
  public userName: string = "请登陆";
  public hasLogin: boolean = false;
  private loginState

  constructor(// 在constructor中注入的依赖，就可以作为类的属性被使用了
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public appService: AppService,
    private store: Store<any>) {
    this.loginState = this.store.select('loginSate');
  }

  ngOnInit() {
    if (tokenNotExpired()) {
      console.log(`Token未过期`)
      this.setNavBar(JSON.parse(localStorage.getItem('user')));
    } else {
      console.log(`Token已过期`)
      localStorage.clear;
    }
  }

  private login() {
    this.loginModal.showLoginModal();
    return;
  }

  /**
   * 用户退出登陆
   *
   */
  private logout(): void {
    console.log(`用户注销`);
    this.userName = "请登录";
    this.hasLogin = !this.hasLogin;
    this.appService.logout().subscribe(res => {
      console.log(res)
      localStorage.setItem('token', null);
    }, (err) => {
      console.log(`error ${err}`);
    }, () => {
      console.log(`编译！`)
    })
  }

  /*父组件事件回调接收*/
  public hitResult(value: any): void {
    this.setNavBar(value);
  }

  /**
   * 设置导航栏显示
   * @param data
   */
  public setNavBar(data: any) {
    this.userName = data.userName;
    this.hasLogin = !this.hasLogin;
    if (data.imgPath != null && data.imgPath != undefined) {
      let n1: number = data.imgPath.lastIndexOf(".");
      let src = data.imgPath.substring(0, n1) + '_50-50' + data.imgPath.substring(n1);
      this.circleHeadImg.nativeElement.src = 'http://kanyun123.3vcm.net/image/' + src;
      console.log(`appComponent接收loginComponent传过来的值` + data);
    }

  }
}
