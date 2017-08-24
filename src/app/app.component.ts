import { Component } from '@angular/core';  /*所有组件必须引入*/
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']   /*HTML模板使用的样式表，可以有多个。*/
})
export class AppComponent {

  constructor(
    // 在constructor中注入的依赖，就可以作为类的属性被使用了
    public router: Router,
    public activatedRoute: ActivatedRoute
  ){

  }


}
