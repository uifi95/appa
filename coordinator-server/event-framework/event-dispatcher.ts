
import { Event } from './event';
import { Click } from './click';
import { KeyPress } from './keypress';
import { Scroll } from './scroll';
import { MouseOver } from './mouseover';
import { BeforeUnload } from './beforeunload';
import { Resize } from './resize';

export class EventDispatcher {
    private eventMap: { [key: string]: any } = {
        click: Click,
        keypress: KeyPress,
        scroll: Scroll,
        mouseover: MouseOver,
        beforeunload: BeforeUnload,
        resize: Resize,
    }

    private dispatchQueue: Array<Event> = [];

    constructor(private browser) {
    }

    async ExecQueue() {
        if (this.dispatchQueue && this.dispatchQueue.length > 0) {
            var ev = this.dispatchQueue.shift();
            if (ev) {
                await ev.trigger(this.browser);
            }
        } else {
            await new Promise((resolve) => setTimeout(resolve, 100));
        }

        this.ExecQueue();
    }

    async dispatch(event) {
        console.error('event dispatch', event);
        try {
            this.dispatchQueue.push(new this.eventMap[event.name](event));
            //return await new this.eventMap[event.name](event).trigger(this.browser);
        } catch (err) {
            console.error('Failed event dispatch', event);
        }
    }
}
