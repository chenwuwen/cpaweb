import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  max: number = 200;
  showWarning: boolean;
  dynamic: number;
  type: string;


  constructor() {
    // this.rate(this.dynamic);
  }

  ngOnInit() {
  }

  public rate(value: number): void {
    let type: string;

    if (value < 25) {
      type = 'warning';
    } else if (value < 50) {
      type = 'info';
    } else if (value < 75) {
      type = 'info';
    } else {
      type = 'success';
    }

    this.showWarning = type === 'danger' || type === 'warning';
    this.dynamic = value;
    this.type = type;
  }

}
