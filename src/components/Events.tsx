import { stringify } from 'querystring';
import React from 'react';
import { KrpanoRendererContext } from '../contexts/KrpanoRendererContext';
import KrpanoActionProxy from '../KrpanoActionProxy';
import { Logger } from '../utils';

type EventCallback = (renderer: KrpanoActionProxy) => void;

interface EventsConfig {
    /** 事件名，若存在该参数则为局部事件 */
    name?: string;
    keep?: boolean;
    onEnterFullscreen?: EventCallback;
    onExitFullscreen?: EventCallback;
    onXmlComplete?: EventCallback;
    onPreviewComplete?: EventCallback;
    onLoadComplete?: EventCallback;
    onBlendComplete?: EventCallback;
    onNewPano?: EventCallback;
    onRemovePano?: EventCallback;
    onNewScene?: EventCallback;
    onXmlError?: EventCallback;
    onLoadError?: EventCallback;
    onKeydown?: EventCallback;
    onKeyup?: EventCallback;
    onClick?: EventCallback;
    onSingleClick?: EventCallback;
    onDoubleClick?: EventCallback;
    onMousedown?: EventCallback;
    onMouseup?: EventCallback;
    onMousewheel?: EventCallback;
    oncontextmenu?: EventCallback;
    onIdle?: EventCallback;
    onViewChange?: EventCallback;
    onViewChanged?: EventCallback;
    onResize?: EventCallback;
    onFrameBufferResize?: EventCallback;
    onAutorotateStart?: EventCallback;
    onAutorotateStop?: EventCallback;
    onAutorotateOneRound?: EventCallback;
    onAutorotateChange?: EventCallback;
    onIPhoneFullscreen?: EventCallback;
}

interface EventsProps extends EventsConfig {}

const GlobalEventName = '__GlobalEvents';

const Events: React.FC<EventsProps> = ({ name, children, ...EventsAttrs }) => {
    const renderer = React.useContext(KrpanoRendererContext);

    React.useEffect(() => {
        if (!(window as any).ReactKrpanoEvents) {
            (window as any).ReactKrpanoEvents = {};
        }

        (window as any).ReactKrpanoEvents[name || GlobalEventName] = (
            eventName: keyof Omit<EventsConfig, 'name' | 'keep'>,
        ) => {
            console.log(eventName);
            const callback = EventsAttrs[eventName];
            if (typeof callback === 'function' && renderer) {
                callback(renderer);
            }
        };

        return () => {
            (window as any).ReactKrpanoEvents[name || GlobalEventName] = null;
        };
    }, [renderer, EventsAttrs]);

    React.useEffect(() => {
        renderer?.setTag(
            'events',
            // 全局事件直接设置
            name || null,
            Object.assign(
                {},
                ...Object.keys(EventsAttrs).map((key) => ({
                    [key.toLowerCase()]: `js(ReactKrpanoEvents.${name || GlobalEventName}(${key}))`,
                })),
            ),
        );
        // return () => {
        //     renderer?.removeEvents(name);
        // };
    }, []);

    // React.useEffect(() => {}, [renderer, name, EventsAttrs]);

    return <div className="events"></div>;
};

export default Events;
