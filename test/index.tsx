import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Krpano, Preview, View } from '../src';

interface CompProps {}

const Comp: React.FC<CompProps> = () => {
    const [hlookat, setH] = useState(0);

    // useEffect(() => {
    //     console.log('hlookat', hlookat);
    //     setTimeout(() => {
    //         setH((hlookat + 1) % 180);
    //     }, 100);
    // });

    return (
        <Krpano>
            {/* <Preview url="https://qhrenderpicoss.kujiale.com/r/2020/11/11/L3D222S21ENDIK2RMTYUI5NYALUF3P3WK888.0_6000x1000.jpg" /> */}
            <View hlookat={hlookat} fov={90} />
        </Krpano>
    );
};

ReactDOM.render(<Comp />, document.getElementById('app'));
