import React, { useEffect, useState } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Krpano, View, Scene, Hotspot, Events } from '../dist/';

interface CompProps {}

const images = [
    {
        type: 'cube',
        url:
            'https://qhrenderpicoss.kujiale.com/r/2020/11/08/L3D222S21ENDIK37RIAUI5L7ELUF3P3WO888.0_6000x1000.jpg_%s?x-oss-process=image/resize,w_256',

        tiledImageWidth: 256,
        tiledImageHeight: 256,
        asPreview: true,
    },
    {
        type: 'cube',
        url:
            'https://qhrenderpicoss.kujiale.com/r/2020/11/08/L3D222S21ENDIK37RIAUI5L7ELUF3P3WO888.0_6000x1000.jpg_%s?x-oss-process=image/resize,w_512|image/indexcrop,x_256,i_%h|image/indexcrop,y_256,i_%v',

        tiledImageWidth: 512,
        tiledImageHeight: 512,
    },
    {
        type: 'cube',
        url:
            'https://qhrenderpicoss.kujiale.com/r/2020/11/08/L3D222S21ENDIK37RIAUI5L7ELUF3P3WO888.0_6000x1000.jpg_%s?x-oss-process=image/indexcrop,x_256,i_%h|image/indexcrop,y_256,i_%v',

        tiledImageWidth: 1200,
        tiledImageHeight: 1200,
    },
];

const Comp: React.FC<CompProps> = () => {
    const scenes = ['dynamic_scene0', 'dynamic_scene1'];
    const [currentSceneIndex, setCurrentSceneIndex] = useState(1);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setCurrentSceneIndex((currentSceneIndex + 1) % scenes.length);
    //     }, 10000);
    // }, []);

    return (
        <Krpano currentScene={scenes[currentSceneIndex]}>
            {/* <View fov={90} fovmin={80} fovmax={120} /> */}
            <Scene
                name="dynamic_scene0"
                // autoLoad={true}
                // previewUrl="/preview.jpg"
                imageTagAttributes={{
                    tilesize: 256,
                    baseindex: 0,
                }}
                images={images}
            >
                <Hotspot
                    name="hotspot0"
                    type="image"
                    url="https://0xllllh.github.io/krpano-examples/images/hotspot.png"
                    ath={-50}
                    atv={20}
                    onClick={() => {
                        setCurrentSceneIndex((currentSceneIndex + 1) % scenes.length);
                    }}
                />
                <View fov={90} fovmin={80} fovmax={120} />
            </Scene>
            <Scene
                name="dynamic_scene1"
                images={[
                    {
                        type: 'cube',
                        url:
                            'https://qhyxpicoss.kujiale.com/r/2017/09/01/L3D221IS3QKUQUQBOGAPEK3P3XU888_7500x1250.jpg_%s',
                    },
                ]}
            >
                <Hotspot
                    name="hotspot1"
                    type="image"
                    url="https://0xllllh.github.io/krpano-examples/images/hotspot.png"
                    ath={50}
                    atv={20}
                    onClick={() => {
                        setCurrentSceneIndex((currentSceneIndex + 1) % scenes.length);
                    }}
                />
                <View fov={80} />

                <Events
                    name="localEvent"
                    onClick={() => {
                        console.log('localEvent');
                    }}
                />
            </Scene>
            <Events
                onClick={renderer => {
                    console.log(renderer.get('view.fov'));
                }}
            />
        </Krpano>
    );
};

ReactDOM.render(<Comp />, document.getElementById('app'));
