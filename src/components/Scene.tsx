import React, { useContext } from 'react';
import { CurrentSceneContext } from '../contexts/CurrentSceneContext';
import { KrpanoRendererContext } from '../contexts/KrpanoRendererContext';
import { buildXML, Logger, XMLMeta } from '../utils';

export interface SceneImage {
    type: string;
    url: string;
}

export interface SceneImageWithMultires {
    type: string;
    url: string;
    // multires props
    tiledImageWidth: number;
    tiledImageHeight: number;
    tileSize?: number;
    asPreview?: boolean;
}

export interface SceneProps {
    name: string;
    previewUrl?: string;
    /** 直接指定scene的xml内容。指定后会忽略其他设置 */
    content?: string;
    /** image标签的附加属性，仅少部分情况用到 */
    imageTagAttributes?: Record<string, string | number | boolean>;
    /** Scene包含的图片。数组的长度大于1时按multires解析为多个level */
    images?: [SceneImage] | SceneImageWithMultires[];
}

export const Scene: React.FC<SceneProps> = ({
    name,
    previewUrl,
    imageTagAttributes = {},
    images = [],
    content,
    children,
}) => {
    const renderer = useContext(KrpanoRendererContext);
    const currentScene = useContext(CurrentSceneContext);

    React.useEffect(() => {
        const contentImageMeta: XMLMeta = {
            tag: 'image',
            attrs: imageTagAttributes,
            children: [],
        };

        // multires
        if (images.length > 1) {
            contentImageMeta.children!.push(
                ...(images as SceneImageWithMultires[]).map(
                    ({ tiledImageWidth, tiledImageHeight, tileSize, asPreview = false, type, ...img }) => {
                        const imgXML: XMLMeta = {
                            tag: 'level',
                            // FIXME: tiledImageWidth等值使用者不一定会提供，需要进行检查、提示以及fallback
                            attrs: {
                                tiledImageWidth,
                                tiledImageHeight,
                                asPreview,
                            },
                            children: [
                                {
                                    tag: type,
                                    attrs: { ...img },
                                },
                            ],
                        };

                        if (tileSize) {
                            imgXML.attrs = Object.assign(imgXML.attrs, { tileSize });
                        }

                        return imgXML;
                    }
                )
            );
        } else if (images.length === 1) {
            const { type, ...img } = images[0] as SceneImage;

            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            contentImageMeta.children!.push({
                tag: type,
                attrs: { ...img },
            });
        }

        renderer?.setTag('scene', name, {
            content:
                content ||
                `${previewUrl ? `<preview url="${previewUrl}" />` : ''}${
                    images.length > 0 ? buildXML(contentImageMeta) : ''
                }`,
        });

        return () => {
            renderer?.removeScene(name);
        };
    }, [renderer, name, images, imageTagAttributes, content]);

    React.useEffect(() => {
        if (currentScene === name) {
            renderer?.loadScene(name);
            Logger.log(`Scene ${name} loaded due to currentScene change.`);
        }
    }, [name, renderer, currentScene]);

    return <div className="scene">{currentScene === name ? children : null}</div>;
};

export default Scene;
