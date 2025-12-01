import md5 from "md5";

type Callback = () => void;
declare global {
    interface Window {
        runAndDelayTasks?: Record<string, Date>;
        delayAndRunTasks?: Record<string, number>;
    }
}

export function runAndDelay(callback: Callback, delay: number = 100): boolean {
    const key = md5(callback.toString());
    const now = new Date();

    if (!window.runAndDelayTasks) {
        window.runAndDelayTasks = {};
    }

    const lastRun = window.runAndDelayTasks[key];
    if (lastRun && now.getTime() - lastRun.getTime() < delay) {
        return false;
    }

    window.runAndDelayTasks[key] = now;
    callback();
    return true;
}

export function delayAndRun(callback: Callback, delay: number = 250): void {
    const key = md5(callback.toString());

    if (!window.delayAndRunTasks) {
        window.delayAndRunTasks = {};
    }

    clearTimeout(window.delayAndRunTasks[key]);
    window.delayAndRunTasks[key] = window.setTimeout(callback, delay);
}

type NestedObject = {
    [key: string]: unknown | NestedObject;
};

export function dotObject(flatObj: Record<string, unknown>): NestedObject {
    const result: NestedObject = {};

    for (const path in flatObj) {
        const value = flatObj[path];
        const keys = path.split(".");
        let current: NestedObject = result;

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];

            if (i === keys.length - 1) {
                current[key] = value;
            } else {
                if (!(key in current)) {
                    current[key] = {};
                }
                current = current[key] as NestedObject;
            }
        }
    }
    return result;
}

export function cleanNullProperties<T extends object>(object: T): Partial<T> {
    return Object.fromEntries(
        Object.entries(object).filter(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            ([_, valor]) => valor != null && valor !== "",
        ),
    ) as Partial<T>;
}
