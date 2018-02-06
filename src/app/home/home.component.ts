import {Component, OnInit} from '@angular/core';
import {flyIn} from '../animations/fly-in';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    flyIn
  ]
})
export class HomeComponent implements OnInit {
  userName: string;

  constructor() {

  }


  ngOnInit() {
    this.userName = localStorage.getItem('userName');
  }

}
