import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
/**
 * 聊天 常态下是一个 圆形悬浮球(可在大部分页面显示) 点击出现聊天框.可以进行聊天
 */
export class ChatComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
