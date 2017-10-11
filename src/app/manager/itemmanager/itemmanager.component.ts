import {Component, OnInit} from '@angular/core';
import {CpaOption, Item} from "./item-model";
import {ItemmanagerService} from "./itemmanager.service";

@Component({
  selector: 'app-itemmanager',
  templateUrl: './itemmanager.component.html',
  styleUrls: ['./itemmanager.component.css']
})
export class ItemmanagerComponent implements OnInit {

  public item: Item = new Item();

  constructor(private _itemManagerService: ItemmanagerService) {
  }

  ngOnInit() {
  }

  submitItem(item: Item): void {
    console.log(item);
    console.log('item的类型是：' + typeof item);
    console.log(`click button`);
  }
}
