import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {

  @ViewChild('shareModal')
  private shareModal: ModalDirective;
  isModalShown: boolean = false;

  ngOnInit() {
  }

  showShareModal(): void {
    this.isModalShown = true;
  }

  hideShareModal(): void {
    this.shareModal.hide();
  }

  onHidden(): void {
    this.isModalShown = false;
  }

}
