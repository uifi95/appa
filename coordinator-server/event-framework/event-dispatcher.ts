
import { Event } from './event';
import { Click } from './click';
import { KeyPress } from './keypress';
import { Scroll } from './scroll';
import { MouseOver } from './mouseover';
import { BeforeUnload } from './beforeunload';
import { Resize } from './resize';
import { Browser } from 'webdriverio';

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

    constructor(private browser: Browser) {
    }

    async ExecQueue() {
        if (this.dispatchQueue && this.dispatchQueue.length > 0) {
            var ev = this.dispatchQueue.shift();
            if (ev) {
                try {
                    await ev.trigger(this.browser);
                }
                catch (err) {
                    console.error(`Failed to execute '${ev.name}' event: `, err);
                }
            }
        } else {
            await new Promise((resolve) => setTimeout(resolve, 100));
        }

        this.ExecQueue();
    }

    async dispatch(event: Event) {
        try {
            this.dispatchQueue.push(new this.eventMap[event.name](event));
        } catch (err) {
            console.error('Could not find handle for event with name=', event.name);
        }
    }
}
