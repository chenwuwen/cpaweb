import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {ShareService} from './share.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {

  @ViewChild('shareModal')
  private shareModal: ModalDirective;
  isModalShown: boolean = false;
  @ViewChild('shareUrl')
  private shareUrl: ElementRef;

  constructor(private _shareService: ShareService) {
  }

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

  getPic(): void {
    /*如果有图片就不再请求后台了,*/
    let source: string = this.shareUrl.nativeElement.src;
    console.log(source);
    if (source != null && source != undefined && source != 'http://localhost:4200/') {
      return;
    }

    this._shareService.generateChain().subscribe(res => {
      if (res['state'] == 2) {
        this.shareUrl.nativeElement.src = '';
        return;
      }
      let src: string = res['data'];
      let baseUrl: string = 'http://115.47.155.3/';
      this.shareUrl.nativeElement.src = baseUrl + src;
    }, (err) => {
      console.error(`${err}`);
    }, () => {
    });
  }
}
