import React from 'react';
import { KrpanoRendererContext } from '../contexts/KrpanoRendererContext';
import { EventCallback } from '../types';
import { mapEventPropsToJSCall } from '../utils';

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

const GlobalEvents = '__GlobalEvents';

const Events: React.FC<EventsProps> = ({ name, keep, children, ...EventsAttrs }) => {
    const renderer = React.useContext(KrpanoRendererContext);
    const EventSelector = `events[${name || GlobalEvents}]`;

    React.useEffect(() => {
        renderer?.bindEvents(EventSelector, { ...EventsAttrs });

        return () => {
            renderer?.unbindEvents(EventSelector, { ...EventsAttrs });
        };
    }, [renderer, EventsAttrs, EventSelector]);

    React.useEffect(() => {
        renderer?.setTag(
            'events',
            // 全局事件直接设置
            name || null,
            mapEventPropsToJSCall({ ...EventsAttrs }, key => `js(${renderer.name}.fire(${key},${EventSelector}))`)
        );
    }, []);

    return <div className="events"></div>;
};

export default Events;
