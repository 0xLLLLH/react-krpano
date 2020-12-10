import React, { useEffect, useState } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Krpano, View, Scene, Hotspot, Events } from '../src';

interface CompProps {}

const images = [
    {
        type: 'cube',
        url:
            'https://qhrenderpicoss.kujiale.com/r/2020/11/08/L3D222S21ENDIK37RIAUI5L7ELUF3P3WO888.0_6000x1000.jpg_%s?x-oss-process=image/resize,w_512|image/indexcrop,x_512,i_%h|image/indexcrop,y_512,i_%v',
        // tileSize: 512,
        tiledImageWidth: 512,
        tiledImageHeight: 512,
        asPreview: true,
    },
    {
        type: 'cube',
        url:
            'https://qhrenderpicoss.kujiale.com/r/2020/11/08/L3D222S21ENDIK37RIAUI5L7ELUF3P3WO888.0_6000x1000.jpg_%s?x-oss-process=image/resize,w_1024|image/indexcrop,x_512,i_%h|image/indexcrop,y_512,i_%v',
        // tileSize: 512,
        tiledImageWidth: 1024,
        tiledImageHeight: 1024,
    },
    {
        type: 'cube',
        url:
            'https://qhrenderpicoss.kujiale.com/r/2020/11/08/L3D222S21ENDIK37RIAUI5L7ELUF3P3WO888.0_6000x1000.jpg_%s?x-oss-process=image/indexcrop,x_512,i_%h|image/indexcrop,y_512,i_%v',
        // tileSize: 512,
        tiledImageWidth: 1200,
        tiledImageHeight: 1200,
    },
];

const Comp: React.FC<CompProps> = () => {
    const scenes = ['scene0', 'scene1'];
    const [currentSceneIndex, setCurrentSceneIndex] = useState(1);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setCurrentSceneIndex((currentSceneIndex + 1) % scenes.length);
    //     }, 10000);
    // }, []);

    return (
        <Krpano
            currentScene={scenes[currentSceneIndex]}
            // xml="/test.xml"
        >
            {/* <View fov={90} fovmin={80} fovmax={120} /> */}
            <Scene
                name="scene0"
                // autoLoad={true}
                // previewUrl="/preview.jpg"
                imageTagAttributes={{
                    tilesize: 512,
                    baseindex: 0,
                }}
                images={images}
            >
                <View fov={90} fovmin={80} fovmax={120} />
            </Scene>
            <Scene
                name="scene1"
                images={[
                    {
                        type: 'cube',
                        url:
                            'https://qhyxpicoss.kujiale.com/r/2017/09/01/L3D221IS3QKUQUQBOGAPEK3P3XU888_7500x1250.jpg_%s',
                    },
                ]}
            >
                <Hotspot
                    name="hotspot0"
                    type="image"
                    url="https://0xllllh.github.io/krpano-examples/images/hotspot.png"
                    ath={50}
                    atv={20}
                    visible={true}
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
                onClick={(renderer) => {
                    console.log(renderer.get('view.fov'));
                }}
            />
        </Krpano>
    );
};

ReactDOM.render(<Comp />, document.getElementById('app'));
