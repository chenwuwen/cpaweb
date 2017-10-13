import {Component, OnInit} from '@angular/core';
import {CpaOption, Item} from "./item-model";
import {ItemmanagerService} from "./itemmanager.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-itemmanager',
  templateUrl: './itemmanager.component.html',
  styleUrls: ['./itemmanager.component.css']
})
export class ItemmanagerComponent implements OnInit {

  private addItemForm: FormGroup;

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
      testStem: ['', [
        Validators.required,
        Validators.minLength(10)
      ]],
      testType: ['', [Validators.required]],
      choice: [''],
      bresult: [''],
      cpaOptionDtos: this.fromBuild.array([
        [''],
        [''],
        [''],
        ['']
      ])
    })
  }

  // submitItem(item: Item, cpaOptionDtos: Array<CpaOption>): void {
  //   console.log(item);
  //   console.log(cpaOptionDtos);
  //   console.log(this.cpaOption);
  //   console.log('item的类型是：' + typeof item);
  //   console.log('--------' + item.cpaOptionDtos);
  //   console.log(`click button`);
  // }
  submitItem(value: any): void {
    console.log(value);
    console.log(`click button`);
  }
}
