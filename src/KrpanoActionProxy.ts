import { NativeKrpanoRendererObject } from './types';
import { buildKrpanoAction, buildKrpanoTagSetterActions } from './utils';

export type HandlerFunc = (renderer: KrpanoActionProxy) => void;

interface EventHandler {
    eventName: string;
    selector: string;
    handler: HandlerFunc;
}
export class KrpanoActionProxy {
    name: string;
    krpanoRenderer?: NativeKrpanoRendererObject;
    eventHandlers: EventHandler[] = [];

    constructor(krpanoRenderer?: NativeKrpanoRendererObject, name = 'ReactKrpanoActionProxy') {
        this.krpanoRenderer = krpanoRenderer;
        this.name = name;
    }

    call(action: string, nexttick = false): void {
        const actionStr = nexttick ? `nexttick(${action})` : action;

        this.krpanoRenderer?.call(actionStr);
    }

    set(name: string, ...params: Array<string | number | boolean>): void {
        this.call(buildKrpanoAction('set', name, ...params));
    }

    setTag(
        tag: 'scene' | 'hotspot' | 'layer' | 'view' | 'events',
        name: string | null,
        attrs: Record<string, string | boolean | number | undefined>
    ): void {
        let nexttick = false;

        if (tag === 'hotspot' || tag === 'events') {
            nexttick = true;
        }

        this.call(buildKrpanoTagSetterActions(name ? `${tag}[${name}]` : tag, attrs), nexttick);
    }

    get<T = any>(name: string): T {
        return this.krpanoRenderer?.get(name);
    }

    loadScene(name: string): void {
        this.call(buildKrpanoAction('loadscene', name, 'null', 'MERGE', 'BLEND(0.5)'));
    }
    removeScene(name: string): void {
        if (this.get('scene') && typeof this.get('scene').removeItem === 'function') {
            this.get('scene').removeItem(name);
        } else {
            // TODO: report Error
        }
    }

    addHotspot(name: string, attrs: Record<string, string | boolean | number | undefined>): void {
        this.call(buildKrpanoAction('addhotspot', name), true);
        this.setTag('hotspot', name, attrs);
    }
    removeHotspot(name: string): void {
        this.call(buildKrpanoAction('removehotspot', name), true);
    }

    on(eventName: string, selector: string, handler: HandlerFunc): this {
        this.eventHandlers.push({
            eventName: eventName.toLowerCase(),
            selector,
            handler,
        });
        return this;
    }

    off(eventName: string, selector: string, handler: HandlerFunc): void {
        this.eventHandlers = this.eventHandlers.filter(
            e => !(e.eventName === eventName.toLowerCase() && e.selector === selector && e.handler === handler)
        );
    }

    fire(eventName: string, selector: string): void {
        this.eventHandlers
            .filter(e => e.eventName === eventName.toLowerCase() && e.selector === selector)
            .map(({ handler }) => handler(this));
    }

    bindEvents(selector: string, mapEventsToHandler: Record<string, HandlerFunc | undefined>): void {
        Object.keys(mapEventsToHandler).map(eventName => {
            const func = mapEventsToHandler[eventName];

            if (func) {
                this.on(eventName, selector, func);
            }
        });
    }

    unbindEvents(selector: string, mapEventsToHandler: Record<string, HandlerFunc | undefined>): void {
        Object.keys(mapEventsToHandler).map(eventName => {
            const func = mapEventsToHandler[eventName];

            if (func) {
                this.off(eventName, selector, func);
            }
        });
    }
}

export default KrpanoActionProxy;
