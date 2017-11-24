import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
// A: 引入FileUpload模块
import { FileSelectDirective, FileDropDirective, FileUploader } from "ng2-file-upload";
@Component({
  selector: 'app-usercenter',
  templateUrl: './usercenter.component.html',
  styleUrls: ['./usercenter.component.css']
})
export class UsercenterComponent implements OnInit {

  @ViewChild('headImg')
  private headImg: ElementRef;

  // B: 初始化定义uploader变量,用来配置input中的uploader属性
  public uploader: FileUploader = new FileUploader({
    url: "api/user/upLoadUserHeaderImg",
    method: "POST", //上传文件的方式
    itemAlias: "uploadedfile",  //（文件标记／别名）此处的名称要与后台方法参数@RequestParam("uploadedfile")内的字符串值一样
    autoUpload: false, //是否自动上传
    // maxFileSize: 1024, //最大可上传文件的大小
    // allowedFileType: ["*.jpg", "*.png","*.jpeg"],  //允许上传的文件类型
    
  });

  constructor() { }

  ngOnInit() {

  }
  ngAfterViewInit() {
    console.log("ngAfterViewInit方法获取头像地址：" + this.headImg.nativeElement.src)
  }

  // C: 定义事件，选择文件
  selectedFileOnChanged(event: any) {
    // 打印文件选择名称
    console.log(`打印文件选择名称:` + event.target.value);
  }
  // D: 定义事件，上传文件
  uploadFile() {

    // 上传
    this.uploader.queue[0].onSuccess = function (response, status, headers) {
      console.log(1)
      // 上传文件成功
      if (status == 200) {

        console.log(`上传文件成功`)

      } else {
        // 上传文件后获取服务器返回的数据错误
        alert("");
      }

    }

    this.uploader.queue[0].upload(); // 开始上传

    // 上传一个文件成功的回调
    this.uploader.onSuccessItem = function (item, response, status, headers) {
      // 上传文件后获取服务器返回的数据
      let tempRes = JSON.parse(response);
      if (tempRes['state'] == 1) {
        console.log("新头像地址：" + tempRes['data']);
        let src = "http://kanyun123.3vcm.net/image/" + tempRes['data']
        this.headImg.nativeElement.src = src
      }
    }
  }
}
