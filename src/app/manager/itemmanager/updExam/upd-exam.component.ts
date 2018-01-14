import { Component, OnInit } from '@angular/core';
import { UpdExamService } from './upd-exam.service';
import { Item } from '../item-model';
import swal from 'sweetalert2';

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
      console.log(`编译`);
    });
  }

  pageChanged(event: any): void {
    console.log('页码转换到: ' + event.page);
    console.log('每页显示数量: ' + event.itemsPerPage);
  }

  /**
   * 删除试题确认弹窗
   * @param id 试题id
   * @param number 
   */
  delExamTip(idEle: any): void {
    console.log(idEle)
    swal({
      title: '警告',
      text: "您确定删除该试题么?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '确定!',
      cancelButtonText: '取消!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false
    }).then(function (isConfirm) {
      if (isConfirm === true && this.delExam(idEle)) {
        swal(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      } else if (isConfirm === false) {
        swal(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        );
      } else {
        // Esc, close button or outside click
        // isConfirm is undefined
      }
    })
  }


  // updExam(id: any) {
  //   confirm
  //   // this._updExamService.updEx

  // }

  /**
   * 获取试题详情【修改试题】
   * @param id 试题ID
   */
  getExamDetail(idEle: any) {
    //方法接收实际的参数对象是HTMLTableCellElement
    // tabledataObject.abbr=text获取表格中abbr的值
    console.log(`修改试题ID为：` + idEle.abbr);
    this._updExamService.getExamDetail(idEle.abbr).subscribe(res => {

    }, (err) => { console.log(`err: ${err}`) }, () => { console.log(`编译`) }
    )
  }


  /**
   * 删除试题
   * @param id 
   */
  delExam(idEle: any): boolean {
    console.log(`被删除的试题Id：` + idEle.abbr);
    let key: boolean;
    this._updExamService.delExam(idEle.abbr).subscribe(res => {
      key = res['state'] == 1 ? true : false;
    }, (err) => { console.log(`error ${err}`); key = true }, () => { console.log(`编译`) })
    return key
  }
}
