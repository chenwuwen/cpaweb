import { Pipe, PipeTransform } from '@angular/core';
/* 注意引入URLSearchParams, 之前没引入导致生成的数据不正确, 这个地方可能不会自动引入(在component中new URLSearchParams() 是会
提示引入的，在Pipe中写没有提示,但是写完也不报错，所以需要手动引入,也可能是编辑器的问题) */
import { Http, Headers, Response, URLSearchParams, RequestOptions, ResponseContentType } from "@angular/http";

@Pipe({
  name: 'changePostBody'
})

/* 此Pipe主要是用来转换angular发送post请求时请求体的结构,使之与传统jquery发送post的请求体一致，这样方便后台接收,主要其主要步骤有两部
一是要将post的请求头配置为application/x-www-form-urlencoded;charset=utf-8
而是将要post的对象,放在此pipe中进行转换,这样后台就可以按照原来的方法接收参数了 */
export class ChangePostBodyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(`管道中的value：` + value);
    let data = new URLSearchParams();
    if (value != null && value != undefined) {
      for (var key in value) {
        data.append(key, value[key])
      }
    }
    console.log(`管道处理后的结果：`+JSON.stringify(data))
    return data;
  }

}
