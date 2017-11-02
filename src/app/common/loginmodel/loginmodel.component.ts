import { Component, OnInit, ViewChild } from '@angular/core';
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
    // this.loginModelService.reloadValidateCode
  }
}
