
import Singleton from "../Singleton";


interface Item{
    func: Function
    ctx:unknown
}

export default class EventManager extends Singleton {

    static get Instance() {
        return super.getInstance<EventManager>()
    }

    /**事件存放 */
    private eventDir: Map<string, Array<Item>> = new Map();

    /**注册事件 */
    on(eventName:string,func:Function,ctx?:unknown) {
        if (this.eventDir.has(eventName)) {
            this.eventDir.get(eventName).push({ func,ctx });
        } else {
            this.eventDir.set(eventName, [{ func, ctx }]);
        }
    }

    off(eventName: string, func: Function) {
        if (this.eventDir.has(eventName)) {
            let index = this.eventDir.get(eventName).findIndex(i => i.func == func);
            index > -1 && this.eventDir.get(eventName).splice(index, 1);
        } 
    }

    emit(eventName: string, ...param: unknown[]) {
        if (this.eventDir.has(eventName)) {
            this.eventDir.get(eventName).forEach(({func,ctx}) => {
                ctx ? func.apply(ctx, ...param) : func(...param);
            })
        } 
    }

    /**清空当前事件 */
    clear() {
        this.eventDir.clear();
    }
}

