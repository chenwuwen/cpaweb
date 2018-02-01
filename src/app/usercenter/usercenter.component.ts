import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
// A: 引入FileUpload模块
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload';
import { element } from 'protractor';

@Component({
  selector: 'app-usercenter',
  templateUrl: './usercenter.component.html',
  styleUrls: ['./usercenter.component.css']
})
export class UsercenterComponent implements OnInit {

  @ViewChild('headImg')
  private headImg: ElementRef;

  /**
   * 使用 @ViewChild的时候需要注意,该元素是否存在,即是否在DOM中存在，
   * 如果不存在当使用的时候会报错Cannot read property 'nativeElement' of undefined
   * 如预览图片，input相关的DOM和预览图片的DOM一开始采用的是*ngIf的写法，后来出错后一直找原因
   * 最后使用[ngStyle]来控制两个区块的显示和隐藏，最后发现可以使用了，所以使用@ViewChild的时候，需要注意
   * 元素是否存在，如果不希望在页面显示可以使用[ngStyle]来控制，相当于替代了ng1.x的ngShow
   */
  @ViewChild('preview')
  private preview: ElementRef;

  /**存储已经选择的图片*/
  private selectedImgUrl: any[] = [];
  private selectedImgLength: number = 0;
  private imgFlag: boolean = true;

  // B: 初始化定义uploader变量,用来配置input中的uploader属性
  public uploader: FileUploader = new FileUploader({
    url: 'api/user/upLoadUserHeaderImg',
    method: 'POST', //上传文件的方式
    itemAlias: 'uploadFile',  //（文件标记／别名）此处的名称要与后台方法参数@RequestParam("uploadedfile")内的字符串值一样
    autoUpload: false, //是否自动上传
    // maxFileSize: 1024, //最大可上传文件的大小
    // allowedFileType: ['image/*'],  //允许上传的文件类型

  });

  constructor() {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit方法获取头像地址：' + this.headImg.nativeElement.src);
  }

  /**
   * 上传头像【预览图片移除】
   * @param event
   */
  removeImg() {
    this.imgFlag = !this.imgFlag;
    // 点击删除预览图片按钮,将上传队列清空同时存储图片的数组置空
    this.selectedImgUrl = [];
    this.uploader.clearQueue();
  }

  /**
   * ng2-file-upload定义事件，选择文件事件
   * @param event
   */
  selectedFileOnChanged(event: any) {
    console.log("--------------------")
    this.imgFlag = !this.imgFlag;
    let index = 0;
    //选择图片
    let $this = this;//区别于new FileReader()中的this
    let selectedArr = this.selectedImgUrl;//存储选择的图片并进行标记存储
    this.uploader.queue.forEach((q, i) => {
      //this.selectedImgLength记录已选择的总的图片数量。并根据此来判断图片如何进行存储；
      if (this.selectedImgLength == 0 || i > this.selectedImgLength - 1) {
        let reader = new FileReader();
        //生成base64图片地址，实现本地预览。只是same属性被protected修饰，需要修改。修改方法,到ng2-file-upload模块中，file-upload文件夹下修改file-item.class.d.ts some的some属性，把some的修饰符protected去掉就行了
        reader.readAsDataURL(q.some);
        reader.onload = function () {
          let imgs = {
            url: this.result,//当前选择的图片生成的base64图片地址
            uploadID: i,//该图片在队列中的位置标记
            pIndex: index//当前上传的图片所属，因为如果是订单评价的话，会存在多个商品，index就是标记上传的是哪个商品的评价图。
          };
          if (selectedArr.length > 0) {
            let isSame = false;//标识是否选择过同一张图片
            selectedArr.forEach((img, j) => {
              if (img.url == this.result) {
                isSame = true;
              }
            });
            if (!isSame) {
              //避免选择相同的图片
              selectedArr.push(imgs);
            } else {
              $this.uploader.queue[i].remove();//如果已经选择，就需要在队列中移除该图片
              $this.selectedImgLength = $this.uploader.queue.length;//并更新已选图片数量
            }
          } else {
            selectedArr.push(imgs);
          }
        };
      }
    });
    this.selectedImgLength = this.uploader.queue.length;
    console.log('已选择 ' + this.selectedImgLength + ' 张图片');
    console.log(selectedArr);
    for (var i = 0; i < this.selectedImgLength; i++) {
      // 预览图片返回的是blob对象，需要使用blob封装,在使用window.URL.createObjectURL()携程url;
      var blob = new Blob(selectedArr[i]);
      var url = window.URL.createObjectURL(blob);
      console.log('已选择的图片的url：' + url);

      this.preview.nativeElement.src = url


    }
    // 打印文件选择名称
    console.log(`打印文件选择名称:` + event.target.value);
  }

  /**
   * ng2-file-upload上传文件事件
   */
  uploadFile() {

    // 上传
    this.uploader.queue[0].onSuccess = function (response, status, headers) {
      console.log(1);
      // 上传文件成功
      if (status == 200) {

        console.log(`上传文件成功`);

      } else {
        // 上传文件后获取服务器返回的数据错误
        alert('');
      }

    };

    this.uploader.queue[0].upload(); // 开始上传

    // 上传一个文件成功的回调
    this.uploader.onSuccessItem = function (item, response, status, headers) {
      // 上传文件后获取服务器返回的数据
      let tempRes = JSON.parse(response);
      if (tempRes['state'] == 1) {
        console.log('新头像地址：' + tempRes['data']);
        let src = 'http://kanyun123.3vcm.net/image/' + tempRes['data'];
        this.headImg.nativeElement.src = src;
      }
    };
  }


}
