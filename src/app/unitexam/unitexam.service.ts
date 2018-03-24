import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';


@Injectable()
export class UnitexamService {

  constructor(private _http: HttpClient) {
  }

  // 私有变量加上下划线符号
  // private _url = "/api/unitExam/getUnitExam/";

  /**
   * 构建请求头
   * @param {string} contentType
   * @returns {any}
   */
  private getHttpRequestOptions(contentType: string): any {
    // angular post请求默认是json格式的即请求头时application/json;charset=utf-8，这是springMVc接受参数需要添加@RequestBody注解
    // 而springMvc的默认接受请求头为application/x-www-form-urlencoded;charset=utf-8'，即jquery Ajax那种 data:{}方式
    // 如果不需要设置请求头,则不必调用此方法
    const httpOptions = {
      // 通常token前面需要加bearer
      headers: new HttpHeaders({'Content-Type': contentType, 'Authorization': 'Bearer ' + localStorage.getItem('token')})
    };
    return httpOptions;
  }


  /**
   * 向 get 方法传递资源URL，它会访问服务端并返回 数据。
   * 返回的结果可能会很惊讶，因为我们会比较期待返回一个 promise，这样我们可以使用 then() 来获取数据，然后我们调用了 map() 方法，而非 promise。
   * 事实上，http.get 方法返回的是一个HTTP响应 Observable 对象，由RxJS库提供，map() 也是RxJS的一个操作符。同时Angular也推荐使用RXJS
   */

  /**
   * 获取试题（单元测试,包括试题，选项等）
   * @param {string} testType
   * @param {number} pageNo
   * @param {number} pageSize
   * @returns {Observable<any>}
   */
  getUnitExam(testType: string, pageNo: number, pageSize: number): Observable<any> {
    let url = '/api/unitExam/getUnitExam/';
    // let params = new URLSearchParams();
    let params = new HttpParams();
    console.log(pageNo.toString());
    params.set('pageNo', pageNo.toString());
    params.set('pageSize', pageSize.toString());
    return this._http.get(url + testType, {params})
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   *  收藏题目
   * @param {number} reId
   * @returns {Observable<any>}
   */
  toggleCollect(reId: number): Observable<any> {
    let url = '/api/usercollect/toggleCollect/';
    return this._http.get(url + reId)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * 评论试题
   * @param {number} reId
   * @param {string} comment
   * @returns {Observable<any>}
   */
  commentItem(reId: number, comment: string): Observable<any> {
    let url = '/api/usercomment/saveComment';
    return this._http.post(url, {reId, comment})
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * 获取试题评论内容
   * @param {number} reId
   * @returns {Observable<any>}
   */
  getComment(reId: number): Observable<any> {
    let url = '/api/usercomment/getItemComment/';
    return this._http.get(url + reId).map(this.extractData)
      .catch(this.handleError);
  }

  /*response 对象并不是返回我们可以直接使用的数据，要想变成应用程序所需要的数据需要：检查不良响应,解析响应数据*/
  private extractData(res: HttpResponse<any>) {
    /*示例中的状态码200-300范围从应用角度来说是错误，但对于 http 角度来说并非错误，所以先判断状态码并抛出一个错误。而对于 404 - Not Found 像其他一样会有响应，我们发送一请求出去，然后返回一个响应，这对于 http 来说是错误的，所以会立即得到一个 observable 错误。
    因为状态码200-300范围从应用角度来说是错误，所以我们拦截并抛出，移动 observable 链到错误路径。而 catch 操作来处理我们抛出的错误。*/

    /* 在Angular4中,此方法返回的是Response对象,res.status的值为请求服务端返回的状态码如:404,200,500 ,而在Angular5中由于Response对象被废弃,
      使用HttpResponse对象, 而该对象默认为json,所以res.status所得到的值为我后台所封装的对象的status的值了,所以此处需要注释掉*/

    // if (res.status < 200 || res.status >= 300) {
    //   throw new Error('Bad response status: ' + res.status);
    // }
    /*解析JSON:响应数据返回的是一个JSON字符串格式，我们必须调用 response.json() 转换成JavaScript对象,然而在Angular5中可以去掉res.json()方法了(当然也找不到这个方法了)因为 JSON 是默认的数据格式，我们不需要再进行显式的解析*/
    // let result = res.json();
    /*我们不应该让 json() 直接返回一个数组 ，而应该是返回一个带有 data 属性的对象，比如：{data: [ hero, hero ] } 这是因对于老式浏览器可能会有JSON被劫持安全漏洞*/
    // return result.data || {};
    // 我这边之所以不用上面的写法，是因为我返回的是有至少一个对象的
    // return result;
    return res;
  }

  private handleError(error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
