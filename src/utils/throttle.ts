export function throttle<T extends (...args: unknown[]) => void>(
    func: T,
    limit: number
) {
    let inThrottle = false;

    return function (this: unknown, ...args: Parameters<T>) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}