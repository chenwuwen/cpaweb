import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {UnitexamService} from "./unitexam.service";

@Component({
  selector: 'app-unitexam',
  templateUrl: './unitexam.component.html',
  styleUrls: ['./unitexam.component.css']
})
export class UnitexamComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private _unitexamService: UnitexamService
  ) {}

  ngOnInit() {
    /*通过这种形式来接收父级页面传过来的值  或者通过  this.route.params['value']['typeCode']*/
    this.route.params.subscribe(data=>console.log("传递的参数为："+data.typeCode));
    const typeCode =  this.route.params['value']['typeCode'];
    console.log("typeCode:"+typeCode);
    /*将路由传递参数值传递给Service*/
    this.getUnitExam(typeCode);
  }
  getUnitExam(typeCode: string){
    this._unitexamService.getUnitExam(typeCode);
  }
}
