import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Krpano, View, Scene } from '../src';

interface CompProps {}

const Comp: React.FC<CompProps> = () => {
    // const [hlookat, setH] = useState(0);

    // useEffect(() => {
    //     console.log('hlookat', hlookat);
    //     setTimeout(() => {
    //         setH((hlookat + 1) % 180);
    //     }, 100);
    // });

    return (
        <Krpano>
            {/* <View fov={90} fovmin={80} fovmax={120} /> */}
            <Scene name="scene0" autoLoad={true} previewUrl="/preview.jpg">
                <View fov={90} fovmin={80} fovmax={120} />
            </Scene>
            <Scene name="scene1">
                <View fov={170} />
            </Scene>
        </Krpano>
    );
};

ReactDOM.render(<Comp />, document.getElementById('app'));
