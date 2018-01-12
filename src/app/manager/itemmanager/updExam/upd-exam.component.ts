///<reference path="upd-exam.service.ts"/>
import {Component, OnInit} from '@angular/core';
import {UpdExamService} from './upd-exam.service';
import {Item} from '../item-model';

@Component({
  selector: 'app-upd-exam',
  templateUrl: './upd-exam.component.html',
  styleUrls: ['./upd-exam.component.css']
})
export class UpdExamComponent implements OnInit {

  private ListExam: Array<any>;
  private bigCurrentPage: number;
  private cpaRepertory: Item = new Item();
  private pageNo: number = 0;
  private pageSize: number = 0;

  constructor(private _updExamService: UpdExamService) {

  }

  ngOnInit() {
    this.getListExam();
  }

  /**
   * 获取试题列表
   * @param {number} pageNo
   * @param {number} pageSize
   * @param typeCode
   * @param value
   */
  getListExam(): void {
    this._updExamService.getListExam(this.pageNo, this.pageSize, this.cpaRepertory).subscribe(res => {
      this.ListExam = res['data'];
      this.bigCurrentPage = res['totalPage'];
    }, (err) => {
      console.log(`error ${err}`);
    }, () => {
      console.log(`编译}`);
    });
  }

  pageChanged(event: any): void {
    console.log('页码转换到: ' + event.page);
    console.log('每页显示数量: ' + event.itemsPerPage);
  }

  // updExam(id: HTMLTdElement) {
  //   this._updExamService.updEx
  //
  // }
  //
  // delExam(id: HTMLTdElement) {
  //
  // }
}
