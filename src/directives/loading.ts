import type { Directive, DirectiveBinding } from 'vue';

// 创建loading元素
const createLoadingElement = (): HTMLElement => {
  const loadingContainer = document.createElement('div');
  loadingContainer.className = 'loading-directive-container';

  const loading = document.createElement('div');
  loading.className = 'loading';

  // 创建波纹容器
  const rippleContainer = document.createElement('div');
  rippleContainer.className = 'ripple-container';

  // 创建三个波纹元素
  for (let i = 0; i < 3; i++) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.animationDelay = `${i * 0.4}s`;
    rippleContainer.appendChild(ripple);
  }

  const text = document.createElement('p');
  text.className = 'loading-text';
  text.textContent = '加载中...';

  loading.appendChild(rippleContainer);
  loading.appendChild(text);
  loadingContainer.appendChild(loading);

  // 添加样式
  const style = document.createElement('style');
  style.textContent = `
    .loading-directive-container {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      z-index: 9999;
    }
    
    .loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
      background: transparent;
    }
    
    /* 波纹动画 */
    .ripple-container {
      position: relative;
      width: 80px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
    }
    
    .ripple {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 4px solid var(--color-main);
      border-radius: 50%;
      opacity: 0;
      animation: ripple-animation 1.2s ease-out infinite;
    }
    
    @keyframes ripple-animation {
      0% {
        transform: scale(0.3);
        opacity: 1;
      }
      100% {
        transform: scale(1.2);
        opacity: 0;
      }
    }
    
    .loading-text {
      margin: 0;
      color: var(--text-color);
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 0.3px;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
  `;

  document.head.appendChild(style);

  return loadingContainer;
};

// 定义loading指令
const loadingDirective: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    if (binding.value) {
      const loadingElement = createLoadingElement();
      el._loadingElement = loadingElement;
      document.body.appendChild(loadingElement);
    }
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    if (binding.value && !el._loadingElement) {
      const loadingElement = createLoadingElement();
      el._loadingElement = loadingElement;
      document.body.appendChild(loadingElement);
    } else if (!binding.value && el._loadingElement) {
      document.body.removeChild(el._loadingElement);
      delete el._loadingElement;
    }
  },
  unmounted(el: HTMLElement) {
    if (el._loadingElement) {
      document.body.removeChild(el._loadingElement);
      delete el._loadingElement;
    }
  }
};

export default loadingDirective;

// 扩展HTMLElement类型，添加_loadingElement属性
declare global {
  interface HTMLElement {
    _loadingElement?: HTMLElement;
  }
}
