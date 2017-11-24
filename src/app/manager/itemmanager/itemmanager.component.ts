import { Component, OnInit } from '@angular/core';
import { CpaOption, CpaSolution, Item } from "./item-model";
import { ItemmanagerService } from "./itemmanager.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import swal from 'sweetalert2';
import { DigitalTransferPipe } from '../../common/pipe/DigitalTransferPipe/digital-transfer.pipe';

@Component({
  selector: 'app-itemmanager',
  templateUrl: './itemmanager.component.html',
  styleUrls: ['./itemmanager.component.css']
})
export class ItemmanagerComponent implements OnInit {

  private addItemForm: FormGroup;
  public serialNumber: number = 0;  //新增试题返回ID
  public checkeds: Array<any> = []; //多选题选择的答案数组
  private genre: number = 1;  //控制单选Dom，多选Dom的标志

  constructor(private fromBuild: FormBuilder, private _itemManagerService: ItemmanagerService) {
  }

  ngOnInit() {
    /*FormBuilder仅仅是一个语法糖,不是必须要使用的,使用FormBuilder仅仅是不需要去new FormGroup和new FormControl*/
    // this.addItemForm = new FormGroup({
    //   testStem: new FormControl(""),
    //   testType: new FormControl(""),
    //   choice: new FormControl(""),
    //   bresult: new FormControl(""),
    //   cpaOption: new FormGroup({
    //     selectData: new FormControl(""),
    //     optionData: new FormControl(""),
    //   })
    // })
    this.addItemForm = this.fromBuild.group({
      'testStem': ['', [
        Validators.required,
        Validators.minLength(1)
      ]],
      'testType': ['', [Validators.required]],
      'choice': ['', [Validators.required]],
      'result': ['', [Validators.required]],
      'cpaOptions': this.fromBuild.array([
        ['', [Validators.required]],
        ['', [Validators.required]],
        ['', [Validators.required]],
        ['', [Validators.required]]
      ])
    })
  };

  /**
   * checkbox选择事件
   * @param check 
   * @param value 
   */
  selectCheckbox(check: boolean, value: string) {
    // console.log(result);
    //先判断选中的数组里面是否包括当前值,includes目前不支持
    //var isInclude:boolean = this.selectHobby.includes(value); 
    var index: number = this.checkeds.indexOf(value);
    //当前选择的就追加否则就移除
    if (check) {
      if (index < 0) {
        this.checkeds.push(value);
      }
    } else {
      this.checkeds = this.checkeds.filter((ele, index) => {
        return ele != value;
      })
    }

    console.log(`当前多选题的答案有：` + this.checkeds.toString());
    /**
     * setValue和patchValue这两个方法是真正给表单模型赋值用的。因为表单显示的数据与真实的底层数据肯定不能使同一个，
     * 否则表单输入数据一旦更改，源数据就被污染了，而这两个方法就是用来将源数据赋值到表单模型数据上的。
     * 每当需要赋值时就可以调用，其中setValue必须准确赋值，并且会在数据不匹配时报告错误；而patchValue没有这么严格，
     * 但可以传一个对象，且不匹配时不会报告错误。而我们要做的就是在ng2组件的ngOnChanges回调中手动执行setValue设置数据值
     * 同时ng2还提供了一个reset方法来重新调用setValue方法(setValue本身好像只是用来一次性赋值的)。
     */
    //当选择的是多选题,将选择的答案,赋给表单的value里面
    this.addItemForm.patchValue({
      result: this.checkeds.toString()
    })

  }

  /**
   * 提交新增的试题
   * @param value 
   */
  submitItem(value: any): void {
    console.log(value);
    const item: Item = {
      testStem: value.testStem,
      testType: value.testType,
      choice: value.choice
    };
    console.log(`Item : ` + JSON.stringify(item));
    const cpaSolution: CpaSolution = {
      result: value.result
    };
    console.log(`CpaSolution : ` + JSON.stringify(cpaSolution));
    let cpaOptions: Array<CpaOption> = [];
    let digitalTransferPipe: DigitalTransferPipe = new DigitalTransferPipe();
    for (var i = 0, k = value.cpaOptions.length; i < k; i++) {
      const cpaOption: CpaOption = { selectData: digitalTransferPipe.transform(i), optionData: value.cpaOptions[i] }
      cpaOptions.push(cpaOption);
    }
    console.log('cpaOptions : ' + JSON.stringify(cpaOptions));
    this._itemManagerService.addItem(item, cpaOptions, cpaSolution).subscribe(res => {
      if (res['status'] == 0) {
        console.log(`用户未登录,但是会有个问题就是,此页面是管理员页面,如果未登陆,是弹出登陆框,还是跳到登陆页面进行登陆,值得商榷`);
        return
      }
      this.serialNumber = res['data'];
      this.tip(this.serialNumber);
      // 表单重置
      this.addItemForm.reset();
    }, (err) => {
      this.tip(this.serialNumber);
      console.log(`error ${err}`);
    }, () => console.log(`编译！`)
    )
    console.log(`click button`);
  }

  /**
   * 更换单选题多选题Dom
   * @param genre 
   */
  changeGenre(genreVal: string): void {
    console.log(`更换选择题题型` + genreVal)
    this.addItemForm.patchValue({
      result: ''
    })
    if (genreVal == "exclusive") {
      this.genre = 1;
    } else {
      this.genre = 2
    }
    console.log(`当前选择的题型为：` + this.genre)
  }

  tip(serialNumber: number): void {
    if (serialNumber > 0) {
      swal({
        title: '提示',
        text: "提交成功!",
        type: 'success',
        timer: 2000
      })
    } else {
      swal({
        title: '提示',
        text: "提交失败!",
        type: 'warning',
        timer: 2000
      })
    }
  }
}

