import {Component, OnInit} from '@angular/core';
import {CpaOption, CpaSolution, Item} from "./item-model";
import {ItemmanagerService} from "./itemmanager.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import swal from 'sweetalert2';

@Component({
  selector: 'app-itemmanager',
  templateUrl: './itemmanager.component.html',
  styleUrls: ['./itemmanager.component.css']
})
export class ItemmanagerComponent implements OnInit {

  private addItemForm: FormGroup;
  public serialNumber: number = 0;

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
      'choice': [''],
      'result': [''],
      'cpaOptions': this.fromBuild.array([
        [''],
        [''],
        [''],
        ['']
      ])
    })
  }

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
    for (var i = 0, k = value.cpaOptions.length; i < k; i++) {
      const cpaOption: CpaOption = {selectData: i.toString(), optionData: value.cpaOptions[i]}
      cpaOptions.push(cpaOption);
    }
    console.log('cpaOptions : ' + JSON.stringify(cpaOptions));
    this._itemManagerService.addItem(item, cpaOptions, cpaSolution).subscribe(res => {
        this.serialNumber = res;
        this.tip(this.serialNumber);
      }, (err) => {
        this.tip(this.serialNumber);
        console.log(`error ${err}`);
      }, () => console.log(`编译！`)
    )
    console.log(`click button`);
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

