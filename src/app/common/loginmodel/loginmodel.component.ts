import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { CpaUser } from './user-model';

@Component({
  selector: 'app-loginmodel',
  templateUrl: './loginmodel.component.html',
  styleUrls: ['./loginmodel.component.css']
})
export class LoginmodelComponent implements OnInit {
  public isModalShown: boolean = false;
  private schema: number;
  private cpaUser: CpaUser = new CpaUser();

  constructor() { }

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

  public login(cpaUser: CpaUser): any {
    console.log(cpaUser)
  }

  public register(cpaUser: CpaUser): any {
    console.log(cpaUser)
  }
}
