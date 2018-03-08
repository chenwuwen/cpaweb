import {Action} from '@ngrx/store';
import {LoginStateAction} from './loginStateAction';

/**
 * ngrx的核心也是通过reducer来获取储存在store中的值（状态），通过action来改变store的中值（状态）
 * Reducers规定了行为对应的具体状态变化。它是纯函数，通过接收前一个状态和派发行为返回新对象作为下一个状态的方式来改变状态，
 * 新对象通常用Object.assign和扩展语法来实现。
 * store中储存了应用中所有的不可变状态。ngrx/store中的store是RxJS状态的可观察对象，以及行为的观察者。
 * 可以利用Store来派发行为。当然，我们也可以用Store的select()方法获取可观察对象，然后订阅观察，在状态变化之后做出反应。
 * Action与Store之间添加ngrx/Effect   实现action异步请求与store处理结果间的解耦
 */


/**
 *第一个参数是state，就像我们在组件或服务中自己维护了一个内存数组一样,可以赋一个初始值（避免出现undefined错误）
 * 第二个参数是一个有type和payload两个属性的对象，其实就是Action。也就是说我们其实可以不用定义Action，直接给出构造的对象形式即可，即(state :any = null, {type, payload}) =>{}
 * 内部的话其实reducer就是一个大的switch语句，根据不同的Action类型决定返回什么样的状态。默认状态下我们直接将之前状态返回即可。Reducer就是这么单纯的一个函数。
 * 现在我们来考虑其中一个动作，增加一个loginState，我们需要发送一个Action，这个Action的type是 ’HASLOGIN’ ，payload就是新增加的这个loginState。
 */



export interface LoginState {
  loginState: string;  /*登录状态*/
}

export function loginStateReducer(state: any = null, action: LoginStateAction) {
  switch (action.type) {
    case 'NOTLOGIN':
      console.log(`通知Reducer改变Store状态,当前状态是：` + action.payload);
      return action.payload;
    case 'HASLOGIN':
      console.log(`通知Reducer改变Store状态,当前状态是：` + action.payload);
      return action.payload;
    default:
      console.log(`通知Reducer改变Store状态(默认的),当前状态是：` + state);
      return state;
  }
};




