import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceString'
})
/**
 * 切割字符串然后拼接…的管道【用于渲染数据过长截取】
 */
export class SliceStringPipe implements PipeTransform {

  /**
   * 参数后面跟随了一个问号，代表这个为可选参数而不是必选的
   * @param value 传入管道的字符串
   * @param start 从哪个位置开始截取
   * @param end 从哪个位置结束截取
   * @param extraStr 末尾追加什么字符串
   */
  transform(value: string, start?: number, end?: number, extraStr?: string): string {
    if (value) {
      if (typeof (start) === 'number' && typeof (end) === 'number') {
        if (value.length > end && extraStr && typeof (extraStr) === 'string') {
          // console.log( start, end, extraStr );
          return value.slice(start, end) + extraStr.toString();
        } else {
          return value.slice(start, end);
        }

      } else {
        return value;
      }
    } else {
      return value;
    }

  }

}
