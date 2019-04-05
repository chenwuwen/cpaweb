export enum Chat {
  URL,
  /**
   * 认证编码 【发送】
   */
  AUTH_CODE,
  /**
   * 聊天消息编码 【发送】
   */
  MESS_CODE,
  /**
   * 谁加入了聊天【接收】
   */
  SYS_USER_WHO,
  /**
   * 在线人数【接收】
   */
  SYS_USER_COUNT,
  /**
   * 认证结果【接收】
   */
  SYS_AUTH_STATE,
  /**
   * Ping编码【接收】
   */
  PING_CODE,
  /**
   * Pong编码【发送/接收】
   */
  PONG_CODE,
  /**
   * 系统消息【接收】
   */
  SYS_OTHER_INFO,
}
