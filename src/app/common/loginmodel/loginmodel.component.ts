import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CustomValidators } from 'ng2-validation';
import { ModalDirective } from 'ngx-bootstrap';
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
  /*  ViewChild 装饰器用于获取模板视图中的元素，它支持 Type 类型或 string 类型的选择器，同时支持设置 read 查询条件，
   以获取不同类型的实例。而 ViewChildren 装饰器是用来从模板视图中获取匹配的多个元素，返回的结果是一个 QueryList 集合。 */
  @ViewChild('validateCodeUrl0')
  private elementRef0: ElementRef;
  @ViewChild('validateCodeUrl1')
  private elementRef1: ElementRef;


  constructor(private loginModelService: LoginmodelService) { }

  ngOnInit() {
  }

  public showLoginModal(): void {
    this.isModalShown = true;
  }


  public onHidden(): void {
    this.isModalShown = false;
  }

  public changeLoginSchema(): void {
    this.schema = 1;
  }

  public changeRegisterSchema(): void {
    this.schema = 0;
  }

  public login(): any {
    console.log(this.cpaUser);
    this.loginModelService.login(this.cpaUser).subscribe(res => {
      if (res['status'] == 1) {
        this.onHidden();
      }
    }, (err) => { console.log(`error ${err}`); },
      () => { console.log(`编译`) })
  }

  public register(): any {
    console.log(this.registerUser)
    this.loginModelService.register(this.registerUser).subscribe(res => {

    }, (err) => { console.log(`error ${err}`); },
      () => { console.log(`编译`) })
  }


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
