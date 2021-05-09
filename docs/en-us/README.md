# React Krpano
> React bindings for krpano.


[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/0xLLLLH/react-krpano/blob/main/LICENSE)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![NPM version][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/@0xllllh/react-krpano?style=flat-square
[npm-url]: https://www.npmjs.com/package/@0xllllh/react-krpano

[Demo](https://0xllllh.github.io/react-krpano-examples)
## ✨ Features
* Dynamic rendering of scenes and hotspots without generating xml
* Use Typescript to develop and provide a complete type definition file.

## 🖥 Dependencies

* krpano.js >= 1.20.9
* React >= 16.8

## 📦 Installation

* With NPM
``` bash
yarn add @0xllllh/react-krpano
```
* Dowload the latest Krpano from [Krpano official website](https://krpano.com/download/) and unzip it to get JS file, then import it through the script tag of your index.html to make the script available globally.
```html
<script src="krpano.js"></script>
```

## 🔨 How to use
### Loading XML file
The most basic usage is to directly load the krpano xml file through `Krpano` the `xml` parameters of the component . The Krpano component will faithfully render according to the xml configuration.

**krpano.xml**
```xml
<krpano onstart="loadscene(scene1);">
    <scene name="scene1">
        <image>
            <cube url="https://some.jpg_%s" />
        </image>
        <hotspot
            name="image_hotspot"
            type="image"
            url="https://0xllllh.github.io/krpano-examples/images/hotspot.png"
            ath="0"
            atv="0"
        />
    </scene>
    <view hlookat="0" vlookat="0" fovtype="VFOV" fov="90" fovmin="30" fovmax="150" />
</krpano>
```

**App.css**
``` css
.App {
    width: 600px;
    height: 400px;
}
```

**App.tsx**
``` tsx
ReactDOM.render(<Krpano className="App" xml="/krpano.xml" />, document.getElementById('app'));
```

### Scene display and switching
> In order to simplify the implementation and use, the implementation of krpano's image tag has been merged into the Scene component. The images of the scene can be specified through the `images` props of Scene component

To add a scene, you need to use the Scene component. Each one represents a scene, and active scene can be specified through the `currentScene` prop of Krpano component. 

```tsx
ReactDOM.render(
<Krpano currentScene="scene0">
    <Scene
        name="scene0"
        images={[{
            type: 'cube',
            url: 'https://qhyxpicoss.kujiale.com/r/2017/09/01/L3D221IS3QKUQUQBOGAPEK3P3XU888_7500x1250.jpg_%s',
        }]}
    />
    <Scene
        name="scene1"
        images={[{
            type: 'cube',
            url: 'https://qhyxpicoss.kujiale.com/r/2017/09/01/L3D221IS3QKUQUQBOGAPEK3P3XU888_7500x1250.jpg_%s',
        }]}
    />
    <View fov={90} fovmin={80} fovmax={120} />
</Krpano>,
document.getElementById('app'));
```

### Hotspots

> Currently support only image hotspots

Hotspots can be easily rendered using Hotspot component. It support a bunch of callback settings

```tsx
const App = () => {
    const [currentScene, setCurrentScene] = React.useState('scene0');
    // Datas
    const scenes = [{
        name: 'scene0',
        previewUrl: '/preview.jpg',
        hotspots: [{
            name: 'hot',
            type: 'image',
            url: 'hotspot.png',
            ath: 0,
            atv: 20,
            onClick: () => setCurrentScene('scene1')
        }]
    },
        name: 'scene1',
        previewUrl: '/preview.jpg',
        hotspots: []
    }]

    return (
        <Krpano currentScene={currentScene}>
            <View fov={90} fovmin={80} fovmax={120} />
            {scenes.map(sc => (
                <Scene name={sc.name} previewUrl={sc.previewUrl}>
                    {sc.hotspots.map(pt => <Hotspot {...pt} />)}
                </Scene>
            ))}
        </Krpano>
    )
}

ReactDOM.render(<App />, document.getElementById('app'));
```

### Access unsuported features
Since this project has just started development, many components and functions are not yet completed. If there is a function that needs priority support, you can raise an issue on Github. If you want, you can use the `KrpanoActionProxy` to call the krpano functions by yourself after obtaining it.

Various callback functions will get the KrpanoActionProxy instance as a parameter, and the encapsulated method can be used to control krpano. You can also use `renderer.KrpanoRenderer` to get a native instance of krpano.
```tsx
const App = () => {
    const [currentScene, setCurrentScene] = React.useState('scene0');
    const onHotspotClick = React.useCallback((renderer: KrpanoActionProxy) => {
        console.log(renderer.get('view.fov'));
        setCurrentScene('scene1');
    }, []);

    return (
        <Krpano
            className="App"
            currentScene={currentScene}
            onReady={renderer => {
                console.log('Ready message from App', renderer.krpanoRenderer);
            }}
        >
            <View fov={90} fovmin={80} fovmax={120} />
            <Scene name="scene0" previewUrl="/preview.jpg">
                <Hotspot
                    name="hot"
                    type="image"
                    url="https://0xllllh.github.io/krpano-examples/images/hotspot.png"
                    ath={0}
                    atv={20}
                    onClick={onHotspotClick}
                />
            </Scene>
            <Scene name="scene1" previewUrl="/preview.jpg" />
        </Krpano>
    );
};
```

In addition, tags such as style and action can be written in xml, then imported through `xml` prop of Krpano component.

**pano.xml**
```xml
<krpano>
    <style name="hotspot_style" url="hotspot.png" scale="0.5" edge="top" distorted="true" onover="tween(scale,0.55);" onout="tween(scale,0.5);" />
    ...
</krpano>
```
**App.tsx**
```tsx
const App = () => (
    <Krpano
        className="App"
        xml="/pano.xml"
        currentScene="scene0"
    >
        <Scene name="scene0" previewUrl="/preview.jpg">
            <Hotspot
                name="hot"
                type="image"
                style="hotspot_style"
                ath={0}
                atv={20}
            />
        </Scene>
    </Krpano>
);
```
## ❗️ Restrictions

* Only one krpano panorama is displayed on a page at a time. If you need to display multiple panoramas at the same time, a lighter solution will be more appropriate.
* React components only implement part of their functions for the time being.

## 🔗 Link
* [Home](https://0xllllh.github.io/react-krpano/)
* [Components Documentation](https://0xllllh.github.io/react-krpano/#/components)
* [Sample project](https://github.com/0xLLLLH/react-krpano-examples)
* [CHANGELOG](/CHANGELOG.md)
* [Krpano official website](https://krpano.com/docu/xml/)
