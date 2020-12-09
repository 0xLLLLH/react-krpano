import React, { useContext, useEffect } from 'react';
import { KrpanoRendererContext } from '../contexts/KrpanoRendererContext';

interface ImageHotspotConfig {
    name: string;
    url: string;
    type?: string;
    keep?: boolean;
    visible?: boolean;
    enabled?: boolean;
    handcursor?: boolean;
    cursor?: string;
    maskchildren?: boolean;
    zorder?: string;
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
}

interface HotspotProps extends ImageHotspotConfig {}

const Hotspot: React.FC<HotspotProps> = ({ name, children, ...hotspotAttrs }) => {
    const renderer = useContext(KrpanoRendererContext);

    React.useEffect(() => {
        renderer?.addHotspot(name, { ...hotspotAttrs });

        return () => {
            renderer?.removeHotspot(name);
        };
    }, []);

    React.useEffect(() => {
        renderer?.setTag('hotspot', name, { ...hotspotAttrs });
    }, [renderer, name, hotspotAttrs]);

    return <div className="hotspot">{children}</div>;
};

export default Hotspot;
