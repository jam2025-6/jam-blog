import { request } from '../utils/request';

// 文章相关API
export const articleApi = {
  // 获取文章列表
  getArticles: () => {
    return request({
      url: '/articles',
      method: 'GET'
    });
  },
  // 获取文章详情
  getArticleById: (id: number) => {
    return request({
      url: `/articles/${id}`,
      method: 'GET'
    });
  },
  // 创建文章
  createArticle: (data: any) => {
    return request({
      url: '/articles',
      method: 'POST',
      data
    });
  },
  // 更新文章
  updateArticle: (id: number, data: any) => {
    return request({
      url: `/articles/${id}`,
      method: 'PUT',
      data
    });
  },
  // 删除文章
  deleteArticle: (id: number) => {
    return request({
      url: `/articles/${id}`,
      method: 'DELETE'
    });
  }
};

// 回忆相关API
export const memoryApi = {
  // 获取回忆列表
  getMemories: () => {
    return request({
      url: '/memories',
      method: 'GET'
    });
  },
  // 获取回忆详情
  getMemoryById: (id: number) => {
    return request({
      url: `/memories/${id}`,
      method: 'GET'
    });
  },
  // 创建回忆
  createMemory: (data: any) => {
    return request({
      url: '/memories',
      method: 'POST',
      data
    });
  },
  // 更新回忆
  updateMemory: (id: number, data: any) => {
    return request({
      url: `/memories/${id}`,
      method: 'PUT',
      data
    });
  },
  // 删除回忆
  deleteMemory: (id: number) => {
    return request({
      url: `/memories/${id}`,
      method: 'DELETE'
    });
  }
};

// 自言自语相关API
export const selfTalkingApi = {
  // 获取自言自语列表
  getSelfTalkings: () => {
    return request({
      url: '/self-talkings',
      method: 'GET'
    });
  },
  // 创建自言自语
  createSelfTalking: (data: any) => {
    return request({
      url: '/self-talkings',
      method: 'POST',
      data
    });
  },
  // 删除自言自语
  deleteSelfTalking: (id: number) => {
    return request({
      url: `/self-talkings/${id}`,
      method: 'DELETE'
    });
  }
};

// 留言相关API
export const messageApi = {
  // 获取留言列表
  getMessages: () => {
    return request({
      url: '/messages',
      method: 'GET'
    });
  },
  // 创建留言
  createMessage: (data: any) => {
    return request({
      url: '/messages',
      method: 'POST',
      data
    });
  },
  // 获取留言详情
  getMessageById: (id: number) => {
    return request({
      url: `/messages/${id}`,
      method: 'GET'
    });
  },
  // 删除留言
  deleteMessage: (id: number) => {
    return request({
      url: `/messages/${id}`,
      method: 'DELETE'
    });
  },
  // 更新留言状态
  updateMessageStatus: (id: number, status: string) => {
    return request({
      url: `/messages/${id}/status`,
      method: 'PUT',
      data: { status }
    });
  }
};