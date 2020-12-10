import { IKrpanoRendererObject } from './types';
import { buildKrpanoAction, buildKrpanoTagSetterActions } from './utils';

export default class KrpanoActionProxy {
    krpanoRenderer?: IKrpanoRendererObject;

    constructor(krpanoRenderer?: IKrpanoRendererObject) {
        this.krpanoRenderer = krpanoRenderer;
    }

    call(action: string, nexttick = false): void {
        const actionStr = nexttick ? `nexttick(${action})` : action;

        this.krpanoRenderer?.call(actionStr);
    }

    set(name: string, ...params: (string | number | boolean)[]): void {
        this.call(buildKrpanoAction('set', name, ...params));
    }

    setTag(
        tag: 'scene' | 'hotspot' | 'layer' | 'view' | 'events',
        name: string | null,
        attrs: Record<string, string | boolean | number | undefined>,
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
}
