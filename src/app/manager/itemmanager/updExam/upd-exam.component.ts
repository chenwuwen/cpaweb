import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {UpdExamService} from './upd-exam.service';
import {CpaOption, CpaSolution, Item} from '../item-model';
import swal from 'sweetalert2';
import {ModalDirective} from 'ngx-bootstrap';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-upd-exam',
  templateUrl: './upd-exam.component.html',
  styleUrls: ['./upd-exam.component.css']
})
export class UpdExamComponent implements OnInit {

  private ListExam: Array<any>;
  private bigCurrentPage: number = 1;
  private bigTotalItems: number = 0;
  private numPages: number = 0;
  private maxSize: number = 20;

  /**试题搜索表单*/
  private cpaRepertory: Item = new Item();
  /**试题修改表单*/
  private item: Item = new Item();
  private cpaOptions: Array<CpaOption>;
  private cpaSolution: CpaSolution = new CpaSolution();
  private pageNo: number = 0;
  private pageSize: number = 0;

  @ViewChild('udpExamModal')
  private udpExamModal: ModalDirective;
  private isModalShown: boolean = false;

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
      // this.numPages = res['totalPage'];
      this.bigTotalItems = res['totalCount'];
    }, (err) => {
      console.log(`error ${err}`);
    }, () => {
      console.log(`编译`);
    });
  }

  pageChanged(event: any): void {
    console.log('页码转换到: ' + event.page);
    console.log('每页显示数量: ' + event.itemsPerPage);
    this.pageNo = event.page;
    this.pageSize = event.itemsPerPage;
    this.getListExam();
  }

  /**
   * 删除试题确认弹窗
   * @param id 试题id
   * @param number
   */
  delExamTip(idEle: any): void {
    console.log('idEle的类型为：' + idEle);
    console.log(`console.log()方法在打印对象时,如果跟上了字符串,则该对象将被打印成字符串(如上所示),单独打印对象,则会打印出Dom数组或者对象本身(如下所示)`);
    console.log(idEle);
    swal({
      title: '警告',
      text: '您确定删除该试题么?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '确定!',
      cancelButtonText: '取消!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false
    }).then(isConfirm => {
      // 这个地方使用了this,上面应该使用箭头函数而不是function,否则this指向有问题
      if (isConfirm === true) {
        this.delExam(idEle).subscribe(key => {
          if (key) {
            swal(
              '成功!',
              '删除试题成功.',
              'success'
            );
          } else {
            swal(
              '失败',
              '删除试题失败 :(',
              'error'
            );
          }
        }, (error2 => {
          swal(
            '失败',
            '删除试题失败 :(',
            'error'
          );
        }));
      } else if (isConfirm === false) {
        swal(
          '已取消',
          '您取消了当前操作 :)',
          'error'
        );
      }
    });
  }


  /**
   * 提交修改试题
   * @param id
   */
  updExam(): void {
    console.log(this.item);
    console.log(this.cpaOptions);
    console.log(this.cpaSolution);
    this._updExamService.updExam(this.item, this.cpaOptions, this.cpaSolution).subscribe(res => {
      if (res['state'] == 1) {
        this.successTip();
      } else {
        this.errorTip();
      }
    }, (err) => {
      console.log(`err：${err}`);
    }, () => {
      console.log(`编译`);
    });

  }

  /**
   * 获取试题详情【修改试题】
   * @param id 试题ID
   */
  getExamDetail(idEle: any) {
    //方法接收实际的参数对象是HTMLTableCellElement
    // tabledataObject.abbr=text获取表格中abbr的值
    console.log(`修改试题ID为：` + idEle.abbr);
    this._updExamService.getExamDetail(idEle.abbr).subscribe(res => {
        this.item = res['data'];
        console.log('item:');
        console.log(this.item);
        this.cpaOptions = res['data'].cpaOptionDtos;
        console.log('cpaOptions:');
        console.log(this.cpaOptions);
        this.cpaSolution = res['data'].bresult;
        console.log('cpaSolution:');
        console.log(this.cpaSolution);

        // 打开修改试题弹窗
        this.isModalShown = true;
      }, (err) => {
        console.log(`err: ${err}`);
      }, () => {
        console.log(`编译`);
      }
    );
  }

  /**
   * 多选单选切换
   * @param value
   */
  changeGenre(value: any): void {
    this.item.choice = value;
  }

  /**
   * 关闭修改试题弹窗
   */
  hideModal(): void {
    this.udpExamModal.hide();
  }

  /**
   * 修改试题弹窗关闭时做哪些事情
   */
  onHidden(): void {
    this.isModalShown = false;
  }

  /**
   * 删除试题
   * 这个方法被其他方法调用,应写成permise即返回类型应为Observable
   * 本组件在if中判断该方法的返回值,如果该方法返回值只是booble值,那么if不会等待
   * 该方法执行完成,再进行判断,而是直接走else了,需要特别注意
   * @param id
   */
  delExam(idEle: any): Observable<boolean> {
    console.log(`被删除的试题Id：` + idEle.abbr);
    let key: boolean = false;
    return this._updExamService.delExam(idEle.abbr).map(res => {
      // key = res['state'] == 1 ? true : false;
      key = res['state'] === 1;
      console.log('删除试题是否成功：' + key);
      return key;
    }).catch((err) => {
      console.error(err.message);
      return Observable.throw(err.message);
    });
  }

  /**
   * 成功提示
   */
  successTip() {
    swal(
      '成功!',
      '',
      'success'
    );
  }

  /**
   * 失败提示
   */
  errorTip() {
    swal(
      '失败!',
      '',
      'error'
    );
  }
}
