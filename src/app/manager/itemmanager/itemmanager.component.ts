import {Component, OnInit} from '@angular/core';
import {CpaOption, Item} from "./item-model";

@Component({
  selector: 'app-itemmanager',
  templateUrl: './itemmanager.component.html',
  styleUrls: ['./itemmanager.component.css']
})
export class ItemmanagerComponent implements OnInit {

  public item: Item = new Item();
  public cpaOption: CpaOption = new CpaOption();

  constructor() {
  }

  ngOnInit() {
  }

  submitItem(): void {

  }
}
