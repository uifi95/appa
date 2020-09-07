import { Event } from "./event";

export class MouseOver extends Event {
    constructor(eventDescriptor) {
        super(eventDescriptor);
    }

    async trigger(browser) {
        const driverElement = await super.getElement(browser);
        const { size: masterSize, position, identifier } = this.eventDescriptor;

        const [slaveSize] = await browser.execute(
            function mouseOver(identifier) {
                const element = document.querySelector(identifier);
                const rectangle = element.getBoundingClientRect();
                return {
                    width: rectangle.right - rectangle.left,
                    height: rectangle.bottom - rectangle.top
                };
            },
            identifier
        );

        const x = position.x * masterSize.width / slaveSize.width;
        const y = position.y * masterSize.height / slaveSize.height;
        driverElement.moveTo(x, y);
    }
}
