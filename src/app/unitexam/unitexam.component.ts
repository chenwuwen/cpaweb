import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {UnitexamService} from "./unitexam.service";

@Component({
  selector: 'app-unitexam',
  templateUrl: './unitexam.component.html',
  styleUrls: ['./unitexam.component.css']
})
export class UnitexamComponent implements OnInit {

  constructor(public route: ActivatedRoute,private _unitexamService: UnitexamService) {
    //通过这种形式来接收父级页面传过来的值
    this.route.params.subscribe(data=>console.log("传递的参数为："+data.typeCode));
    //或者通过
    // this.route.params['value']['typeCode'];
  }

  ngOnInit() {
  }

}
