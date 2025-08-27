import mitt from "mitt";

// 定义事件类型（推荐写上，方便 TS 提示）
type Events = {
  globalSearch: Record<string, string>;
};

const bus = mitt<Events>();

export default bus;
