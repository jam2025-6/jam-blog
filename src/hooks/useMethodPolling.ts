// composables/useMethodPolling.ts
import { ref, onUnmounted, onMounted } from 'vue';

interface MethodPollingOptions {
    interval?: number; // 轮询间隔，默认1分钟
    immediate?: boolean; // 是否立即执行
    autoStart?: boolean; // 是否自动启动
}

export function useMethodPolling(
    method: () => Promise<void> | void,
    options: MethodPollingOptions = {}
) {
    const {
        interval: initialInterval = 60000, // 1分钟
        immediate = true,
        autoStart = false
    } = options;

    const isPolling = ref(false);
    const executionCount = ref(0);
    const lastError = ref<Error | null>(null);
    const currentInterval = ref(initialInterval); // 使用ref来管理间隔
    let pollingInterval: number | null = null;

    // 执行方法
    const execute = async () => {
        try {
            await method();
            executionCount.value++;
            lastError.value = null;
        } catch (error) {
            lastError.value = error as Error;
            console.error('轮询方法执行失败:', error);
        }
    };

    // 启动轮询
    const startPolling = () => {
        if (isPolling.value) return;

        isPolling.value = true;

        if (immediate) {
            execute();
        }

        pollingInterval = window.setInterval(execute, currentInterval.value);
    };

    // 停止轮询
    const stopPolling = () => {
        if (pollingInterval) {
            clearInterval(pollingInterval);
            pollingInterval = null;
        }
        isPolling.value = false;
    };

    // 重启轮询（可改变间隔）
    const restartPolling = (newInterval?: number) => {
        stopPolling();
        if (!!newInterval) {
            currentInterval.value = newInterval;
        }
        startPolling();
    };

    // 自动清理
    onUnmounted(() => {
        stopPolling();
    });
    // 自动启动
    onMounted(() => {
        if (autoStart) {
            startPolling();
        }
    });
    return {
        isPolling,
        executionCount,
        lastError,
        currentInterval,
        startPolling,
        stopPolling,
        restartPolling
    };
}