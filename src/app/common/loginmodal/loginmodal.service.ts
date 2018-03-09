import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {CpaUser} from './user-model';
import {ChangePostBodyPipe} from '../pipe/ChangePostBodyPipe/change-post-body.pipe';

@Injectable()
export class LoginmodalService {

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
   * 点击跟换验证码(返回流);返回流需要设置responseType;需要注意的一点是,使用get请求,使用URLSearchParams设置参数时;直接使用
   * URLSearchParams,需要在url后面加上问号，使用RequestOptions设置的话,其功能更为强大,可以设置请求参数(在此处url可不加问号),请
   * 求头headers,返回类型responseType(其接收参数为枚举类型)
   *
   * 该方法不再使用,点击更换验证码的功能在Component内完成了
   * @returns {Observable<any>}
   */
  reloadValidateCode(): Observable<any> {
    let url = '/api/validateCode';
    let random = new Date() + Math.floor(Math.random() * 24).toString();
    let params = new HttpParams();
    params.set('data', random);
    // 需要注意的是如何仅设置了请求参数的话需要在url后面加上?
    // return this._http.get(url+params);
    // let options = new RequestOptions({search: params, responseType: ResponseContentType.Blob});
    return this._http.get(url, {params}).catch(this.handleError);

  }

  /**
   * 登陆
   * @param {CpaUser} cpaUser
   * @returns {Observable<any>}
   */
  login(cpaUser: CpaUser): Observable<any> {
    let url = '/api/login';
    let user = new FormData();
    user.append('userName', cpaUser.userName.trim());
    user.append('password', cpaUser.password.trim());
    user.append('validateCode', cpaUser.validateCode.trim());
    user.append('isRememberMe', cpaUser.isRememberMe ? 'on' : null);
    return this._http.post(url, user).map(this.extractData).catch(this.handleError);
  }

  /**
   * 注册
   * @param {CpaUser} cpaUser
   * @returns {Observable<any>}
   */
  register(cpaUser: CpaUser): Observable<any> {
    let url = '/api/user/register';
    let changePostBodyPipe = new ChangePostBodyPipe();
    let userDto = changePostBodyPipe.transform(cpaUser);
    let headers = this.getHttpHeaders('');
    return this._http.post(url, userDto, {headers}).map(this.extractData).catch(this.handleError);
  }

  /**
   * 检查用户名是否已存在
   * @param {string} newUsername
   * @returns {Observable<any>}
   */
  public checkUsername(newUsername: string): Observable<any> {
    let url = '/api/user/checkname';
    let headers = this.getHttpHeaders('');
    let params = new HttpParams();
    params.set('username', newUsername.trim());
    // let options = new RequestOptions({search: params, headers: headers});
    return this._http.get(url, {headers, params}).map(this.extractData).catch(this.handleError);
  }

  /*response 对象并不是返回我们可以直接使用的数据，要想变成应用程序所需要的数据需要：检查不良响应,解析响应数据*/
  private extractData(res: HttpResponse<any>) {
    /*示例中的状态码200-300范围从应用角度来说是错误，但对于 http 角度来说并非错误，所以先判断状态码并抛出一个错误。而对于 404 - Not Found 像其他一样会有响应，我们发送一请求出去，然后返回一个响应，这对于 http 来说是错误的，所以会立即得到一个 observable 错误。
    因为状态码200-300范围从应用角度来说是错误，所以我们拦截并抛出，移动 observable 链到错误路径。而 catch 操作来处理我们抛出的错误。*/
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
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
