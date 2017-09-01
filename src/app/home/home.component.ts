import { Component, OnInit } from '@angular/core';
import { flyIn } from '../animations/fly-in';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    flyIn
  ]
})
export class HomeComponent implements OnInit {

  constructor() {
    let localStorage  = window['localStorage'];
    localStorage.setItem("username","kanyun");
    let username = localStorage.getItem("username");
  }



  ngOnInit() {
  }

}
