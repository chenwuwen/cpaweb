import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/startWith';

interface ScrollPosition {
  sH: number;
  sT: number;
  cH: number;
}

const DEFAULT_SCROLL_POSITION: ScrollPosition = {
  sH: 0,
  sT: 0,
  cH: 0
};

/**
 * 此指令作用：翻页，但不是点击翻页按钮，而是监听页面滚动进行翻页
 * 指令接收3个输入值:
 * 1.scrollPercent - 用户需要滚动到容器的百分比，达到后方可调用 scrollCallback
 * 2.scrollCallback - 返回 observable 的回调函数。
 * 3.immediateCallback  - 布尔值，如果为 true 则指令初始化后会立即调用 scrollCallback
 */

@Directive({
  selector: '[appScrollPage]'
})
export class ScrollPageDirective implements AfterViewInit {

  private scrollEvent$;

  private userScrolledDown$;

  private requestStream$;

  private requestOnScroll$;

  @Input()
  scrollCallback;

  /**
   *可选的输入条件 immediateCallback，如果设置为 true 的话
   * 我们会将 DEFAULT_SCROLL_POSITION 作为流的起始数据，它会触发 scrollCallback 而无需用户滚动
   * 页面。这样的话会调用一次 API 以获取初始数据展示在页面中
   */

  @Input()
  immediateCallback;

  @Input()
  scrollPercent = 70;

  /**
   * 对于这个指令，我们想要进入 ngAfterViewInit 生命周期钩子以注册和处理滚动事件
   * 在构造函数中，我们注入了 ElementRef，它可以让我们引用应用了指令的元素，即滚动容器
   * ，需要在html中的元素内，加入该指令
   * @param {ElementRef} elm
   */
  constructor(private elm: ElementRef) {
  }

  /**
   * 在 ngAfterViewInit 生命周期钩子中，我们执行了3个函数:
   * 1.registerScrollEvent - 使用 Observable.fromEvent 来监听元素的滚动事件。
   * 2.streamScrollEvents - 根据我们的需求来处理传入的滚动事件流，当滚动到给定的容器高度百分比时发起 API 请求。
   * 3.requestCallbackOnScroll - 一旦达到我们设定的条件后，调用 scrollCallback 来发起 API 请求。
   */
  ngAfterViewInit() {

    this.registerScrollEvent();

    this.streamScrollEvents();

    this.requestCallbackOnScroll();

  }

  /**
   * 使用窗口滚动，而不是使用容器滚动，使用如下两个方法
   */
  private registerScrollEvent() {

    this.scrollEvent$ = Observable.fromEvent(window, 'scroll'); // change to window

  }

  private streamScrollEvents() {
    this.userScrolledDown$ = this.scrollEvent$
      .map((e: any): ScrollPosition => ({
        sH: e.target.body.scrollHeight, // instead get scrollHeight of body
        sT: window.pageYOffset, // instead get pageYOffset of window
        cH: e.target.body.clientHeight // instead get clientHeightof body
      }))
      .pairwise()
      .filter(positions => this.isUserScrollingDown(positions) && this.isScrollExpectedPercent(positions[1]))
  }

  /**
   * 使用容器滚动,即定义一个固定宽高的容器,在内容进行无线滚动
   */
  // private registerScrollEvent() {
  //   console.log(`registerScrollEvent()方法监听页面滚动`);
  //   this.scrollEvent$ = Observable.fromEvent(this.elm.nativeElement, 'scroll');
  //
  // }
  //
  // private streamScrollEvents() {
  //   this.userScrolledDown$ = this.scrollEvent$
  //     .map((e: any): ScrollPosition => ({
  //       sH: e.target.scrollHeight,
  //       sT: e.target.scrollTop,
  //       cH: e.target.clientHeight
  //     }))
  //     .pairwise()
  //     .filter(positions => this.isUserScrollingDown(positions) && this.isScrollExpectedPercent(positions[1]));
  // }

  private requestCallbackOnScroll() {
    console.log(`requestCallbackOnScroll()方法,一旦达到我们设定的条件后，调用 scrollCallback 来发起 API 请求`);
    this.requestOnScroll$ = this.userScrolledDown$;

    if (this.immediateCallback) {
      this.requestOnScroll$ = this.requestOnScroll$
        .startWith([DEFAULT_SCROLL_POSITION, DEFAULT_SCROLL_POSITION]);
    }

    this.requestOnScroll$
      .exhaustMap(() => {
        return this.scrollCallback();
      })
      .subscribe(() => {
      });

  }

  private isUserScrollingDown = (positions) => {
    return positions[0].sT < positions[1].sT;
  }

  private isScrollExpectedPercent = (position) => {
    return ((position.sT + position.cH) / position.sH) > (this.scrollPercent / 100);
  }
}
