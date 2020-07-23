import SDK from './base'
import { ResponseFormat } from './base'

const LIMIT = 20

export enum TopicTabEnum {
  ASK = 'ask',
  SHARE = 'share',
  JOB = 'job',
  GOOD = 'good'
}

class CnodeSDK extends SDK {
  constructor() {
    super({
      baseURL: 'https://cnodejs.org/api/v1',
      timeout: 8000
    })
  }

  /**
   * 获取分类列表
   * @param {Number} page 页码
   * @param {Number} limit 每页数量 
   * @param {String} tab 类型
   */
  getTopicsByTab(
    tab: string,
    page: number = 1,
    limit: number = LIMIT,
  ): Promise<ResponseFormat> {
    return this.get('/topics', {
      page,
      limit,
      tab
    })
  }

  /**
   * 主题详情
   * @param {string | number} id
   */
  getTopicDetail(id: string | number): Promise<ResponseFormat> {
    return this.get(`/topic/${id}`)
  }

  /**
   * 用户详情
   * @param {string} name 
   */
  getUserDetail(name: string): Promise<ResponseFormat> {
    return this.get(`/user/${name}`)
  }
}

export default new CnodeSDK()
