import React from 'react';
import { KrpanoRendererContext } from '../contexts/KrpanoRendererContext';
import { EventCallback } from '../types';
import { mapEventPropsToJSCall } from '../utils';

export interface EventsConfig {
    /** 事件名，若存在该参数则为局部事件 */
    name?: string;
    /** 暂时不支持 */
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
    onContextmenu?: EventCallback;
    onIdle?: EventCallback;
    onViewChange?: EventCallback;
    onViewChanged?: EventCallback;
    onResize?: EventCallback;
    onFrameBufferResize?: EventCallback;
    onAutoRotateStart?: EventCallback;
    onAutoRotateStop?: EventCallback;
    onAutoRotateOneRound?: EventCallback;
    onAutoRotateChange?: EventCallback;
    onIPhoneFullscreen?: EventCallback;
}

export interface EventsProps extends EventsConfig {}

const GlobalEvents = '__GlobalEvents';

export const Events: React.FC<EventsProps> = ({ name, keep, children, ...EventsAttrs }) => {
    const renderer = React.useContext(KrpanoRendererContext);
    const EventSelector = React.useMemo(() => `events[${name || GlobalEvents}]`, [name]);

    // 在renderer上绑定回调
    React.useEffect(() => {
        renderer?.bindEvents(EventSelector, { ...EventsAttrs });

        return () => {
            renderer?.unbindEvents(EventSelector, { ...EventsAttrs });
        };
    }, [renderer, EventsAttrs, EventSelector]);

    // Krpano标签上添加js call，触发事件
    React.useEffect(() => {
        renderer?.setTag(
            'events',
            // 全局事件直接设置
            name || null,
            mapEventPropsToJSCall(
                { ...EventsAttrs },
                eventName => `js(${renderer.name}.fire(${eventName},${EventSelector}))`
            )
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [EventSelector, name, renderer]);

    return <div className="events"></div>;
};

export default Events;
