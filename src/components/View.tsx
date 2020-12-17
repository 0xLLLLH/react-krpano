import React, { useContext } from 'react';
import { KrpanoRendererContext } from '../contexts/KrpanoRendererContext';

/**
 * @see https://krpano.com/docu/xml/#view
 */
interface ViewProps {
    hlookat?: number;
    vlookat?: number;
    fov?: number;
    fovMin?: number;
    fovMax?: number;
    camRoll?: number;
    /**
     * @see https://krpano.com/docu/xml/#view.fovtype
     */
    fovType?: 'VFOV' | 'HFOV' | 'DFOV' | 'MFOV' | 'SFOV';
    maxPixelZoom?: number;
    mFovRatio?: number;
    distortion?: number;
    distortionFovLink?: number;
    stereographic?: boolean;
    pannini?: number;
    architectural?: number;
    architecturalOnlyMiddle?: boolean;
    /**
     * @see https://krpano.com/docu/xml/#view.limitview
     */
    limitView?: 'off' | 'auto' | 'lookat' | 'range' | 'fullrange' | 'offrange';
    hlookatMin?: number;
    hlookatMax?: number;
    vlookatMin?: number;
    vlookatMax?: number;
    rx?: number;
    ry?: number;
    tx?: number;
    ty?: number;
    tz?: number;
    ox?: number;
    oy?: number;
    oz?: number;
    children?: null;
}

const View: React.FC<ViewProps> = ({ children, ...viewAttrs }) => {
    const renderer = useContext(KrpanoRendererContext);

    React.useEffect(() => {
        renderer?.setTag('view', null, { ...viewAttrs });
    }, [viewAttrs]);

    return <div className="view">{children}</div>;
};

export default View;
