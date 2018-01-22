import {Component, ViewChild, ElementRef} from '@angular/core';
/*所有组件必须引入*/
import {ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot} from '@angular/router';
import {LoginmodelComponent} from './common/loginmodel/loginmodel.component';
import {tokenNotExpired} from 'angular2-jwt';
import {AppService} from './app.service';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

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
  public userName: string = '请登陆';
  public hasLogin: boolean = false;
  private loginState: Observable<String>;

  constructor(// 在constructor中注入的依赖，就可以作为类的属性被使用了
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public appService: AppService,
    private store: Store<any>) {
    this.loginState = store.select('loginState');

  }

  ngOnInit() {
    if (tokenNotExpired()) {
      console.log(`Token未过期`);
      this.setNavBar(JSON.parse(localStorage.getItem('user')));
    } else {
      console.log(`Token已过期`);
      localStorage.clear();
    }
  }

  /**
   * 通过Angular生命周期方法ngAfterContentInit(当把内容投影进组件之后调用)
   * 来获取当前状态是否为已登陆(由于只有点登陆按钮,后台返回数据,才可以触发Action),所以
   * 其他组件的投影不受影响.关于这个生命周期的方法我也是一个一个似的，百度：Angular生命周期
   * 其中还有一个方法ngDoCheck,它是实时检测的,但是当我点击注销的时候setNavBar()方法报错
   * 原因是因为ngDoCheck检查时机造成的,ngDoCheck检测的太频繁了,以至于当去点击注销的一瞬间他还去执行
   * setNavBar()方法以至于报错(因为点击注销会清除localStorage而setNavBar()方法需要使用localStorage的数据)
   */
  ngAfterContentInit() {
    console.log(`=======================`);
    console.log(this.loginState);
    this.loginState.subscribe(state => {
      console.log(`订阅登录状态的值为：` + JSON.stringify(state));
      if (state == 'HASLOGIN') {
        var data = localStorage.getItem('user');
        console.log(`#################################`);
        console.log(data);
        this.setNavBar(JSON.parse(data));
      }
    });
    console.log('-------------ngRx状态改变------已登录状态-------');

  }

  /**
   * 打开登录弹窗
   */
  private login(): void {
    this.loginModal.showLoginModal();
    return;
  }

  /**
   * 下拉菜单相关事件
   */
  onShown(): void {
    console.log(`按钮下拉菜单：显示弹出窗口时发出事件`);
  }

  onHidden(): void {
    console.log(`按钮下拉菜单：弹出窗口隐藏时发出事件`);
  }

  isOpenChange(): void {
    console.log(`按钮下拉菜单：isOpen变更时发出事件`);

  }

  /**
   * 用户退出登陆
   *
   */
  private logout(): void {
    console.log(`用户注销`);
    this.userName = '请登录';
    this.hasLogin = !this.hasLogin;
    localStorage.clear();
    this.appService.logout().subscribe(res => {
      console.log(`用户注销成功`);
      localStorage.setItem('token', null);
    }, (err) => {
      console.log(`用户注销失败`);
      console.log(`error ${err}`);
    }, () => {
      console.log(`编译！`);
    });
  }

  /**
   * 父组件事件回调接收(此处为接收登陆组件返回的值)
   * 该方法已启用
   * 登陆状态已由ngRx进行管理
   */
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
      let n1: number = data.imgPath.lastIndexOf('.');
      let src = data.imgPath.substring(0, n1) + '_50-50' + data.imgPath.substring(n1);
      this.circleHeadImg.nativeElement.src = 'http://kanyun123.3vcm.net/image/' + src;
      console.log(`appComponent接收loginComponent传过来的值` + data);
    }

  }
}
