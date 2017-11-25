import { Component, ViewChild } from '@angular/core';  /*所有组件必须引入*/
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { ElementRef } from '@angular/core/src/linker/element_ref';
import { LoginmodelComponent } from './common/loginmodel/loginmodel.component';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']   /*HTML模板使用的样式表，可以有多个。*/
})
export class AppComponent {
  @ViewChild('loginModal')
  private loginModal: LoginmodelComponent;
  public userName: string = "请登陆";

  constructor(
    // 在constructor中注入的依赖，就可以作为类的属性被使用了
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public appService: AppService
  ) {

  }

  private login() {
    this.loginModal.showLoginModal();
    return;
  }

  private logout(): void {
    console.log(`用户注销`);
    this.appService.logout()
  }

}
