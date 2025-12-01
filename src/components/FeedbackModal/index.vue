<template>
  <!-- 悬浮留言板按钮 -->
  <div class="floating-feedback-btn" ref="floatingBtnRef" @mousedown="startDrag" @click="showFeedbackModal = true">
    <SvgIcon name="comment" />
  </div>

  <!-- 留言板弹窗 -->
  <n-modal
    v-model:show="showFeedbackModal"
    title="留言板"
    preset="dialog"
    size="large"
    :bordered="false"
    :close-on-esc="true"
    :close-on-click-outside="true"
  >
    <div class="feedback-form">
      <n-form :model="feedbackForm" layout="vertical">
        <n-form-item label="留言内容" required>
          <n-input
            v-model:value="feedbackForm.content"
            placeholder="请输入您的留言"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 8 }"
          />
        </n-form-item>
      </n-form>
    </div>
    <template #action>
      <div class="modal-footer">
        <n-button @click="showFeedbackModal = false">取消</n-button>
        <n-button type="primary" @click="submitFeedback">确定保存</n-button>
      </div>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useMessage } from "naive-ui";
import SvgIcon from "../SvgIcon/index.vue";

const message = useMessage();

// 响应式数据
const showFeedbackModal = ref(false);
const floatingBtnRef = ref<HTMLElement | null>(null);
const isDragging = ref(false);
const startX = ref(0);
const startY = ref(0);
const offsetX = ref(0);
const offsetY = ref(0);

// 留言板表单数据
const feedbackForm = ref({
  content: "",
});

// 提交留言
const submitFeedback = () => {
  // 简单的表单验证
  if (!feedbackForm.value.content.trim()) {
    message.error("请输入留言内容");
    return;
  }

  // 模拟提交成功
  message.success("留言提交成功，感谢您的反馈！");

  // 重置表单并关闭弹窗
  feedbackForm.value = {
    content: "",
  };
  showFeedbackModal.value = false;
};

// 拖动功能相关函数
const startDrag = (e: MouseEvent) => {
  if (!floatingBtnRef.value) return;

  isDragging.value = true;
  startX.value = e.clientX;
  startY.value = e.clientY;

  // 获取当前按钮的位置
  const rect = floatingBtnRef.value.getBoundingClientRect();
  offsetX.value = e.clientX - rect.left;
  offsetY.value = e.clientY - rect.top;

  // 添加全局事件监听器
  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", stopDrag);

  // 阻止默认行为，避免文本选择
  e.preventDefault();
};

const onDrag = (e: MouseEvent) => {
  if (!isDragging.value || !floatingBtnRef.value) return;

  // 计算新位置
  const newX = e.clientX - offsetX.value;
  const newY = e.clientY - offsetY.value;

  // 确保按钮不会超出屏幕边界
  const maxX = window.innerWidth - floatingBtnRef.value.offsetWidth;
  const maxY = window.innerHeight - floatingBtnRef.value.offsetHeight;

  const finalX = Math.max(0, Math.min(newX, maxX));
  const finalY = Math.max(0, Math.min(newY, maxY));

  // 设置新位置
  floatingBtnRef.value.style.left = `${finalX}px`;
  floatingBtnRef.value.style.top = `${finalY}px`;
};

const stopDrag = () => {
  isDragging.value = false;
  // 移除全局事件监听器
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", stopDrag);
};
</script>

<style lang="scss" scoped>
/* 悬浮留言板按钮样式 */
.floating-feedback-btn {
  position: fixed;
  right: 32px;
  bottom: 32px;
  width: 56px;
  height: 56px;
  // background-color: var(--color-main);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  // box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
  z-index: 2025;
  transition: all 0.3s ease;
  user-select: none;

  .svg-icon {
    font-size: 24px;
    color: white;
    opacity: 1;
  }

  &:hover {
    transform: translateY(-2px);
    //box-shadow: 0 6px 16px rgba(64, 158, 255, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
}

/* 留言板样式 */
.feedback-form {
  padding: 16px 0;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 16px;
  // border-top: 1px solid var(--border-color);
}
</style>
