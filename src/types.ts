/**
 * @see https://krpano.com/docu/html/#wmode
 */
export interface IKrpanoConfig {
    // swf: string; // flash模式下用到的swf文件，非必须
    /** 全景图xml路径 */
    xml?: string;
    /**  挂载点id */
    target: string;
    swf?: string;
    id?: string;
    bgcolor?: string;
    /**
     * @see https://krpano.com/docu/html/#html5
     */
    html5?: string;
    flash?: string;
    wmode?: string;
    localfallback?: string;
    vars?: Record<string, unknown>;
    initvars?: Record<string, unknown>;
    consolelog?: boolean;
    basepath?: string;
    mwheel?: boolean;
    capturetouch?: boolean;
    focus?: boolean;
    webglsettings?: Record<string, unknown>;
    webxr?: string;
    mobilescale?: number;
    touchdevicemousesupport?: boolean;
    fakedevice?: string;
    onready?: (renderer: IKrpanoRendererObject) => void;
}

export interface IKrpanoRendererObject {
    get(key: string): any;
    call(action: string): void;
}

declare global {
    interface Window {
        embedpano?: (config: IKrpanoConfig) => void;
    }
}
