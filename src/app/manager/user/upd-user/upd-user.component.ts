import {Component, OnInit, ViewChild} from '@angular/core';
import {CpaUserDto} from '../cpauserdto-model';
import {UpdUserService} from './upd-user.service';
import swal from 'sweetalert2';
import {Observable} from 'rxjs/Observable';
/*datepicker 设置中文的必备条件的引用*/
import {BsDatepickerConfig, BsLocaleService, defineLocale, ModalDirective, zhCnLocale} from 'ngx-bootstrap';


@Component({
  selector: 'app-upd-user',
  templateUrl: './upd-user.component.html',
  styleUrls: ['./upd-user.component.css', './bs-datepicker.css']
})
export class UpdUserComponent implements OnInit {
  private cpaUserDto: CpaUserDto = new CpaUserDto();
  // 注册时间日期范围选择
  private registerDaterangepickerModel: Date[] = [];
  //注册时间选择最小时间
  private registerMinDate: Date;
  //注册时间选择最大时间
  private registerMaxDate: Date;
  // 最后一次登录时间日期范围选择
  private lastLoginDaterangepickerModel: Date[] = [];
  //最后一次登录选择最小时间
  private lastLoginMaxDate: Date;
  //最后一次登录选择最大时间
  private lastLoginMinDate: Date;

  // bsdatepicker配置
  private bsConfig: Partial<BsDatepickerConfig>;

  // 是否显示修改User Modal
  private isModalShown: boolean = false;

  @ViewChild('updUserModal')
  private updUserModal: ModalDirective;

  private userDtos: Array<CpaUserDto>;

  constructor(private _localeService: BsLocaleService, private _updUserService: UpdUserService) {
    this.registerMaxDate = new Date();
    this.lastLoginMaxDate = new Date();
    this.registerMinDate = new Date(2017, 0, 1);
    this.lastLoginMinDate = new Date(2017, 0, 1);
    //设置最小查询时间为：2017/2/1
    this.registerMinDate.setDate(this.registerMinDate.getDate());
    this.registerMaxDate.setDate(this.registerMaxDate.getDate());
    this.lastLoginMaxDate.setDate(this.registerMaxDate.getDate());
    this.lastLoginMinDate.setDate(this.lastLoginMinDate.getDate());
    /*datepicker 设置中文的必备条件*/
    defineLocale('zh-cn', zhCnLocale);
  }

  ngOnInit() {
    /*datepicker 设置中文方法*/
    this._localeService.use('zh-cn');
    this.datePickerConfig();
    this.getUserList();
  }

  /**
   * 日期选择器设定主题
   * @param 主题列表
   * theme-default  theme-green theme-blue theme-dark-blue theme-red theme-orange
   * @returns {Observable<any>}
   * containerClass: datePicker主题 displayMonths：datePicker显示数量
   * maxDate:所有日期/范围选择器的默认最大日期  minDate:所有日期/范围选择器的默认最短日期
   * showWeekNumbers: 允许在datepicker中隐藏星期数字
   */
  datePickerConfig() {

    this.bsConfig = Object.assign({},
      {containerClass: 'theme-red'},
      {displayMonths: 2},
      {minDate: new Date(2017, 0, 1)},
      {maxDate: new Date()},
      {showWeekNumbers: false});
  }

  /**
   * 获取用户列表
   * month 加1 是因为，js的月是从0开始的
   */
  getUserList(): void {
    // console.log(this.lastLoginDaterangepickerModel[0].toTimeString());
    if (this.lastLoginDaterangepickerModel.length > 0) {
      const startLastLoginDate = this.lastLoginDaterangepickerModel[0].getFullYear() + '-' + this.lastLoginDaterangepickerModel[0].getMonth() + 1 + '-' + this.lastLoginDaterangepickerModel[0].getDay();
      this.cpaUserDto.startLastLoginDate = startLastLoginDate;
      const endLastLoginDate = this.lastLoginDaterangepickerModel[1].getFullYear() + '-' + this.lastLoginDaterangepickerModel[1].getMonth() + 1 + '-' + this.lastLoginDaterangepickerModel[1].getDay();
      this.cpaUserDto.endLastLoginDate = endLastLoginDate;
    }
    if (this.registerDaterangepickerModel.length > 0) {
      const startRegisterDate = this.registerDaterangepickerModel[0].getFullYear() + '-' + this.registerDaterangepickerModel[0].getMonth() + 1 + '-' + this.registerDaterangepickerModel[0].getDay();
      this.cpaUserDto.startRegisterDate = startRegisterDate;
      const endRegisterDate = this.registerDaterangepickerModel[1].getFullYear() + '-' + this.registerDaterangepickerModel[1].getMonth() + 1 + '-' + this.registerDaterangepickerModel[1].getDay();
      this.cpaUserDto.endRegisterDate = endRegisterDate;
    }
    console.log(this.cpaUserDto);
    this._updUserService.getUserList(this.cpaUserDto).subscribe(res => {
      if (res['state'] === 1) {
        this.userDtos = res['data'];
      }
    }, (err) => {
      // console.log(`error ${err}`);
      console.log(`111111`);
    }, () => console.log(`编译`));
  }

  /**
   * 获取用户详细信息
   */
  getUserDetail(idUser: any): void {
    this._updUserService.getUserDetail(idUser.abbr).subscribe(res => {
      this.cpaUserDto = res['data'];
      console.log('leixing : ' + typeof (this.cpaUserDto.status));
      this.isModalShown = !this.isModalShown;
    }, (err) => console.error(`error ${err}`), () => console.log(`编译`));
  }

  /**
   * 删除用户提示
   * @param idUser
   */
  delUserTip(idUser: any): void {
    console.log('idUser的类型为：' + idUser);
    console.log(`console.log()方法在打印对象时,如果跟上了字符串,则该对象将被打印成字符串(如上所示),单独打印对象,则会打印出Dom数组或者对象本身(如下所示)`);
    console.log(idUser);
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
        this.delUser(idUser).subscribe(key => {
          if (key) {
            swal(
              '成功!',
              '删除用户成功.',
              'success'
            );
          } else {
            swal(
              '失败',
              '删除用户失败 :(',
              'error'
            );
          }
        }, (error2 => {
          swal(
            '失败',
            '删除用户失败 :(',
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
   * 删除用户
   * @param idUser
   * @returns {Observable<boolean>}
   */
  delUser(idUser: any): Observable<boolean> {
    let key: boolean = false;
    return this._updUserService.delUser(idUser.abbr).map(res => {
      key = res['state'] === 1;
      return key;
    }).catch((err) => {
      console.error(err.message);
      return Observable.throw(err.message);
    });
  }

  /**
   * 更改用户
   */
  updUser(): void {
    this._updUserService.updUser(this.cpaUserDto).subscribe(res => {
      res['state'] === 1 ? console.log('修改成功') : console.log('修改失败');
    }, (err) => {
      console.log(`err：${err}`);
    }, () => console.log(`编译`));
  }
}
