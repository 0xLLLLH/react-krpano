# React Krpano
> React bindings for krpano.


[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/0xLLLLH/react-krpano/blob/main/LICENSE)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![NPM version][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/@0xllllh/react-krpano?style=flat-square
[npm-url]: https://www.npmjs.com/package/@0xllllh/react-krpano

[Demo](https://0xllllh.github.io/react-krpano-examples)
## ✨ 特性
* 动态渲染场景和热点，无需生成xml
* 使用Typescript开发，提供完整的类型定义文件。

## 🖥 依赖

* krpano.js >= 1.20.9
* React >= 16.8

## 📦 安装

* 安装npm包
``` bash
yarn add @0xllllh/react-krpano
```
* 从[Krpano官网](https://krpano.com/download/)下载最新的Krpano并解压得到krpano.js，然后通过script标签引入，使`window.embedpano`函数可用
```html
<script src="krpano.js"></script>
```

## 🔨 使用方法
### 加载xml
最基础的用法是通过`Krpano`组件的`xml`参数直接加载krpano xml文件。Krpano组件会忠实的按照xml的配置来进行渲染。

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

### 场景的展示及切换
> 为了简化实现和使用，krpano的image标签的功能被合并到了Scene组件中。通过Scene组件的images属性可以指定场景展示的图片。

想要添加一个场景，需要使用Scene组件。
每个Scene组件代表一个场景，可以通过Krpano组件的`currentScene`来显示与切换当前展示的场景。

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

### 热点的使用

> 目前只支持图片热点

使用Hotspot组件可以轻松的渲染热点。同时Hotspot组件还支持一系列的回调设置。

```tsx
const App = () => {
    const [currentScene, setCurrentScene] = React.useState('scene0');
    // 元数据
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

### 使用暂未支持的功能
由于本项目刚开始开发，很多组件和功能都还没完善，如果有需要优先支持的功能可以提issue。倘若急于使用，则可以在获取到`KrpanoActionProxy`后自行调用krpano功能。

各种回调函数都会获得KrpanoActionProxy实例作为参数，可以使用其中封装的方法来控制krpano。也可以通过`renderer.krpanoRenderer`获取krpano原生的实例。
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

此外，对于style和action等标签，可以在写在xml中，而后通过Krpano的`xml`属性引入。xml属性的内容会和React渲染的内容同时存在。
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
## ❗️ 限制

* 一个页面同一时间仅展示一个krpano全景图。如果需要同时展示多个全景图，更轻量的方案会比较合适。
* React组件暂时只实现了部分功能。

## 🔗 链接
* [Home](https://0xllllh.github.io/react-krpano/)
* [组件参数](https://0xllllh.github.io/react-krpano/#/components)
* [示例项目](https://github.com/0xLLLLH/react-krpano-examples)
* [CHANGELOG](./CHANGELOG.md)
* [Krpano官方文档](https://krpano.com/docu/xml/)
