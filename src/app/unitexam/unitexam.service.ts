import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http"
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";

@Injectable()
export class UnitexamService {

  constructor(private _http: Http) {
  }

  // 私有变量加上下划线符号
  // private _url = "/api/unitExam/getUnitExam/";
  public headers = new Headers({ 'Content-Type': 'application/json' });
  /*向 get 方法传递资源URL，它会访问服务端并返回 数据。
  返回的结果可能会很惊讶，因为我们会比较期待返回一个 promise，这样我们可以使用 then() 来获取数据，然后我们调用了 map() 方法，而非 promise。
  事实上，http.get 方法返回的是一个HTTP响应 Observable 对象，由RxJS库提供，map() 也是RxJS的一个操作符。同时Angular也推荐使用RXJS*/

  getUnitExam(typeCode: string): Observable<any> {
    let url = "/api/unitExam/getUnitExam/";
    return this._http.get(url + typeCode)
      .map(this.extractData)
      .catch(this.handleError);
  }

  // 收藏题目
  toggleCollect(reId: number): Observable<any> {
    let url = "/api/usercollect/toggleCollect/";
    return this._http.get(url + reId)
      .map(this.extractData)
      .catch(this.handleError);
  }
  //评论试题
  commentItem(reId: number, comment: string): Observable<any> {
    let url = "/api/usercomment/saveComment";
    return this._http.post(url, { reId, comment })
      .map(this.extractData)
      .catch(this.handleError);
  }
  //获取试题评论内容
  getComment(reId: number): Observable<any> {
    let url = "/api/usercomment/getItemComment/";
    return this._http.get(url + reId).map(this.extractData)
      .catch(this.handleError);
  }
  /*response 对象并不是返回我们可以直接使用的数据，要想变成应用程序所需要的数据需要：检查不良响应,解析响应数据*/
  private extractData(res: Response) {
    /*示例中的状态码200-300范围从应用角度来说是错误，但对于 http 角度来说并非错误，所以先判断状态码并抛出一个错误。而对于 404 - Not Found 像其他一样会有响应，我们发送一请求出去，然后返回一个响应，这对于 http 来说是错误的，所以会立即得到一个 observable 错误。
    因为状态码200-300范围从应用角度来说是错误，所以我们拦截并抛出，移动 observable 链到错误路径。而 catch 操作来处理我们抛出的错误。*/
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    /*解析JSON:响应数据返回的是一个JSON字符串格式，我们必须调用 response.json() 转换成JavaScript对象*/
    let result = res.json();
    /*我们不应该让 json() 直接返回一个数组 ，而应该是返回一个带有 data 属性的对象，比如：{data: [ hero, hero ] } 这是因对于老式浏览器可能会有JSON被劫持安全漏洞*/
    // return result.data || {};
    // 我这边之所以不用上面的写法，是因为我返回的是有至少一个对象的
    return result;
  }

  private handleError(error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
