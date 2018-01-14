import { Component, OnInit, TemplateRef } from '@angular/core';
import { UpdExamService } from './upd-exam.service';
import { Item } from '../item-model';
import swal from 'sweetalert2';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

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
  private modalRef: BsModalRef;

  constructor(private _updExamService: UpdExamService,private modalService: BsModalService) {

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
    console.log("idEle的类型为："+idEle)
    console.log(`console.log()方法在打印对象时,如果跟上了字符串,则该对象将被打印成字符串(如上所示),单独打印对象,则会打印出Dom数组或者对象本身(如下所示)`)
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
          '成功!',
          '删除成功.',
          'success'
        );
      } else if (isConfirm === false) {
        swal(
          '已取消',
          '您取消了当前操作 :)',
          'error'
        );
      } else if (!this.delExam(idEle)) {
        swal(
          '失败',
          '删除试题失败 :(',
          'error'
        )
      } else {
        // Esc, close button or outside click
        // isConfirm is undefined
        swal(
          '已取消',
          '您取消了当前操作 :)',
          'error'
        );
      }
    })
  }

  /**
   * 打开修改试题弹窗
   * @param template 
   */
  openupdExamModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
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
