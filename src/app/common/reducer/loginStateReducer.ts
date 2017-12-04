import {Reducer,Action} from "@ngrx/store";

/**
 * ngrx的核心也是通过reducer来获取储存在store中的值（状态），通过action来改变store的中值（状态）
 * @param state
 * @param action
 * @returns {any}
 */

/**
 *第一个参数是state，就像我们在组件或服务中自己维护了一个内存数组一样,可以赋一个初始值（避免出现undefined错误）
 * 第二个参数是一个有type和payload两个属性的对象，其实就是Action。也就是说我们其实可以不用定义Action，直接给出构造的对象形式即可，即(state :any = null, {type, payload}) =>{}
 * 内部的话其实reducer就是一个大的switch语句，根据不同的Action类型决定返回什么样的状态。默认状态下我们直接将之前状态返回即可。Reducer就是这么单纯的一个函数。
 * 现在我们来考虑其中一个动作，增加一个loginState，我们需要发送一个Action，这个Action的type是 ’HASLOGIN’ ，payload就是新增加的这个loginState。
 */

export const loginStateReducer: Reducer<any> = (state: any = null, action: Action): any => {
  switch (action.type) {
    case 'NOTLOGIN':
      return action.payload;
    case 'HASLOGIN':
      return action.payload;
    default:
      return state;
  }
};


