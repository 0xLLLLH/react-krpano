import React, { useContext } from 'react';
import { KrpanoRendererContext } from '../contexts/KrpanoRendererContext';
import { EventCallback } from '../types';
import { Logger, mapEventPropsToJSCall, mapObject } from '../utils';

interface ImageHotspotConfig {
    name: string;
    url: string;
    type?: string;
    keep?: boolean;
    visible?: boolean;
    enabled?: boolean;
    handCursor?: boolean;
    cursor?: string;
    maskChildren?: boolean;
    zOrder?: string;
    style?: string;
    ath?: number;
    atv?: number;
    edge?: string;
    zoom?: boolean;
    distorted?: boolean;
    rx?: number;
    ry?: number;
    rz?: number;
    width?: string;
    height?: string;
    scale?: number;
    rotate?: number;
    alpha?: number;
    onOver?: EventCallback;
    onHover?: EventCallback;
    onOut?: EventCallback;
    onDown?: EventCallback;
    onUp?: EventCallback;
    onClick?: EventCallback;
    onLoaded?: EventCallback;
}

interface HotspotProps extends ImageHotspotConfig {}

const Hotspot: React.FC<HotspotProps> = ({ name, children, ...hotspotAttrs }) => {
    const renderer = useContext(KrpanoRendererContext);
    const EventSelector = `hotspot[${name}]`;

    React.useEffect(() => {
        const eventsObj = mapObject({ ...hotspotAttrs }, (key, value) => {
            if (key.startsWith('on') && typeof value === 'function') {
                return {
                    [key]: value,
                };
            }
            return {};
        });
        renderer?.bindEvents(EventSelector, eventsObj as any);

        renderer?.addHotspot(name, {});

        return () => {
            renderer?.unbindEvents(EventSelector, eventsObj as any);
            renderer?.removeHotspot(name);
        };
    }, []);

    React.useEffect(() => {
        renderer?.setTag(
            'hotspot',
            name,
            Object.assign(
                { ...hotspotAttrs },
                mapEventPropsToJSCall(
                    { ...hotspotAttrs },
                    (key) => `js(${renderer?.name}.fire(${key},${EventSelector}))`,
                ),
            ),
        );
        Logger.log(`hotspot ${name} updated due to attrs change`);
    }, [renderer, name, hotspotAttrs, EventSelector]);

    return <div className="hotspot">{children}</div>;
};

export default Hotspot;
