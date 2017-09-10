import { Component, OnInit, Input } from '@angular/core';
import { UtilService } from "./util.service"

@Component({
  selector: 'app-util',
  templateUrl: './util.component.html',
  styleUrls: ['./util.component.css']
})
export class UtilComponent implements OnInit {
  @Input() pAnswer;
  score: number;
  constructor(private _utilService: UtilService) { }

  ngOnInit() {
  }

  submitUnitExam(pAnswer: any): any {
    console.log(`点击了提交按钮： ` + this.pAnswer);
    return this._utilService.commitAnswer(this.pAnswer).subscribe(res => {
      this.score = res['data'];
    }, (err) => {
      console.log(`error ${err}`)
    }, () => console.log(`编译！`)
    );
  }
}
