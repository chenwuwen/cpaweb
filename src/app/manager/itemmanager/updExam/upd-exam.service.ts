import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

import {CpaOption, CpaSolution, Item} from '../item-model';

@Injectable()
export class UpdExamService {

  constructor(private _http: HttpClient) {
  }

  private getHttpHeaders(contentType: string): HttpHeaders {
    var headers: HttpHeaders = new HttpHeaders();
    // angular post请求默认是json格式的即请求头时application/json;charset=utf-8，这是springMVc接受参数需要添加@RequestBody注解
    // 而springMvc的默认接受请求头为application/x-www-form-urlencoded;charset=utf-8'，即jquery Ajax那种 data:{}方式
    // 如果不需要设置请求头,则不必调用此方法
    if (contentType == '' || contentType == null) {
      headers.append('content-type', 'application/x-www-form-urlencoded;charset=utf-8');
    } else {
      headers.append('content-type', contentType);
    }
    return headers;
  }

  /**
   * 获取试题列表(修改试题仅获取题干)
   */
  getListExam(pageNo: number, pageSize: number, cpaRepertoryDto: Item): Observable<any> {
    let url = '/api/unitExam/getListExam';
    console.log('后台管理,【试题列表】pageNo: ' + pageNo);
    console.log('后台管理,【试题列表】pageSize: ' + pageSize);
    return this._http.post(url, {pageNo, pageSize, cpaRepertoryDto},).map(this.extractData).catch(this.handleError);
  }

  /**
   * 获取试题详情
   */
  getExamDetail(id: number): Observable<any> {
    let url = '/api/unitExam/getExamDetail/';
    return this._http.get(url + id).map(this.extractData).catch(this.handleError);
  }

  /**
   * 删除试题
   */
  delExam(id: number): Observable<any> {
    let url = '/api/unitExam/delUnitExam/';
    return this._http.delete(url + id).map(this.extractData).catch(this.handleError);
  }

  /**
   * 修改试题
   */
  updExam(cpaRepertory: Item, cpaOptions: Array<CpaOption>, cpaSolution: CpaSolution): Observable<any> {
    let url = '/api/unitExam/updUnitExam';
    let headers = this.getHttpHeaders('');

    return this._http.post(url, {cpaRepertory, cpaOptions, cpaSolution}, {headers})
      .map(this.extractData)
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
