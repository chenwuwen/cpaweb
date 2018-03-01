import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
  selector: 'app-searchmodal',
  templateUrl: './searchmodal.component.html',
  styleUrls: ['./searchmodal.component.css']
})
export class SearchmodalComponent implements OnInit {
  @ViewChild('autoShownModal')
  autoShownModal: ModalDirective;
  isModalShown: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }


  showModal(): void {
    this.isModalShown = true;
  }

  hideModal(): void {
    this.autoShownModal.hide();
  }

  onHidden(): void {
    this.isModalShown = false;
  }

}
