import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UnitexamService} from "./unitexam.service";

@Component({
  selector: 'app-unitexam',
  templateUrl: './unitexam.component.html',
  styleUrls: ['./unitexam.component.css']
})
export class UnitexamComponent implements OnInit {

  typeCode: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _unitexamService: UnitexamService

  ) {
    /*通过这种形式来接收父级页面传过来的值  或者通过  this.route.params['value']['typeCode']*/
    /*route.params是一个可观察对象，可以使用.subscribe(),将参数值提取到固定值，这种情况下，我们将params['id'];赋值给组件实例变量id*/
    // route.params与route.queryParams不同,route.params在路由配置中匹配参数，而queryParams在查询字符串中匹配参数
    // this.route.params.subscribe(data=>console.log("传递的参数为："+data.typeCode));
    // 如果没有typeCode参数，那么我们将this.typeCode设置为 空字符串
    this.route.params.subscribe(params => {this.typeCode = params['typeCode'] || ''; });
  }


  ngOnInit() {
    /*订阅事件将路由传递参数值传递给Service*/
      this.route.params.subscribe((params) => {
        this.typeCode = params['typeCode'] || '';
        this.getUnitExam(this.typeCode);
    });
  }



  getUnitExam(typeCode: string): any{
    this._unitexamService.getUnitExam(typeCode).subscribe({
      next:(event: any) => console.log(`从service获取数据，订阅将数据到Component ${event.target.value}`),
      error:(err) => console.log(`error ${err}`),
      complete: () => console.log(`编译！`)
    });
  }
}
