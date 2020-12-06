export interface IKrpanoConfig {
    // swf: string; // flash模式下用到的swf文件，非必须
    /** 全景图xml路径 */
    xml?: string;
    /**  挂载点id */
    target: string;
}

export interface IKrpanoRendererObject {
    get(key: string): any;
    call(action: string): void;
}

declare global {
    interface EmbedpanoConfig {
        /* flash模式下用到的swf文件，非必须 */
        swf?: string;
        /* 全景图xml路径，用于描述整个全景图 */
        xml?: string;
        /* 挂载点id，唯一必须的参数 */
        target: string;
        /* krpano支持flash和html5两种模式，此属性确定是否优先用html5，具体规则见：https://krpano.com/docu/html/#html5 */
        html5?: string;

        /* 回调函数，类似的还有onerror */
        onready?: (renderer: IKrpanoRendererObject) => void;
    }

    interface Window {
        embedpano?: (config: EmbedpanoConfig) => void;
    }
}
