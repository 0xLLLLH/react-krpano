# Krpano

Krpano组件负责krpano的初始化。

## 属性

| 属性名 | 类型 | 必须 | 说明 |
|:--|:--:|:--:|:--|
| className | string |  | 根节点的className|
| currentScene | string | | 当前展示的场景名，需要与Scene的name属性对应 |
| target | string | | 组件渲染的dom元素的id，krpano将被渲染到该元素上 |
| id | string | | 内部JavaScriptInterfaceObjective的id，多个krpano实例的id需要不同 |
| xml | string | | xml地址，可以通过该参数直接展示全景图。也是后续渲染的基础。 |
| onReady | EventCallback |  | krpano的onready回调触发后调用 |

## 示例
**krpano.xml**
```xml
<krpano onstart="loadscene(scene1);">
    <scene name="scene1">
        <image>
            <cube url="https://some.jpg_%s" />
        </image>
    </scene>
    <view hlookat="0" vlookat="0" fovtype="VFOV" fov="90" fovmin="30" fovmax="150" />
</krpano>
```

**App.tsx**
``` tsx
ReactDOM.render(<Krpano className="App" xml="/krpano.xml" />, document.getElementById('app'));
```

# View

View组件控制和限制视角。

## 属性
目前支持所有属性的设置，具体属性见[官方文档](https://krpano.com/docu/xml/#view)。
下面是几个比较常用的属性：

| 属性名 | 类型 | 必须 | 说明 |
|:--|:--:|:--:|:--|
| hlookat | number |  | 当前视角对应水平点的水平坐标|
| vlookat | number | | 当前视角对应水平点的垂直坐标|
| fov | number | | 视场角（Field of View）大小 |
| fovtype | string | | fov类型，取值可以为'VFOV'、'HFOV'、'DFOV'、'MFOV'、'SFOV'中的任意一个 |
| fovmin | number | | fov最小值，默认为1 |
| fovmax | number | | fov最大值，默认为179 |

> ❗️**注意**
> react-krpano组件中绝大多数属性都以camelCase来书写，而对应的属性在krpano中全都是小写的。

## 示例

``` tsx
ReactDOM.render(
    <Krpano className="App" xml="/krpano.xml">
        <View fov={80} fovMin={60} fovMax={120} />
    </Krpano>,
    document.getElementById('app')
);
```

# Scene

Scene代表场景。

| 属性名 | 类型 | 必须 | 说明 |
|:--|:--:|:--:|:--|
| name | string | ✅ | 场景的名称|
| previewUrl | string | | 预览图的url，通常是一张低质量的图片 |
| content | string | | 直接指定scene标签的xml内容，使用后会忽略其他设置 |
| imageTagAttributes | Record | | 给scene内image标签设置的属性，详见[image标签官方文档](https://krpano.com/docu/xml/#image) |
| images | [SceneImage] or SceneImageWithMultires[] | | 场景要展示的图片。当长度大于1时，触发[multires](https://krpano.com/examples/?multires) |


## 相关接口
``` tsx
export interface SceneImage {
    /** 图标类型，一般是cube */
    type: string;
    url: string;
}

export interface SceneImageWithMultires {
    /** 图标类型，一般是cube */
    type: string;
    url: string;
    // multires配置
    tiledImageWidth: number;
    tiledImageHeight: number;
    tileSize?: number;
    asPreview?: boolean;
}
```

## 示例

**单一分辨率**
``` tsx
ReactDOM.render(
    <Krpano className="App">
        <Scene
            name="scene0"
            images={[
                {
                    type: 'cube',
                    url:
                        'https://qhyxpicoss.kujiale.com/r/2017/09/01/L3D221IS3QKUQUQBOGAPEK3P3XU888_7500x1250.jpg_%s',
                },
            ]}
        >
            <View fov={80} fovMin={60} fovMax={120} />
        </Scene>
    </Krpano>,
    document.getElementById('app')
);
```

**多分辨率（Multi-resolution）**

> 此处multires所用的图片是阿里云oss图片处理API得到的，也可以使用其他方式预处理生成图片

``` tsx
ReactDOM.render(
    <Krpano className="App" >
        <Scene
            name="scene0"
            images={[
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
            ]}
        >
        <View fov={80} fovMin={60} fovMax={120} />
        </Scene>
    </Krpano>,
    document.getElementById('app')
);
```

# Hotspot

## 属性
目前仅支持图片热点及其基本属性的设置，具体属性见[官方文档](https://krpano.com/docu/xml/#hotspot)。
下面是几个比较常用的属性：

| 属性名 | 类型 | 必须 | 说明 |
|:--|:--:|:--:|:--|
| name | string | ✅ | 热点名称，同一系列的热点可以有相同的名称|
| url | string | ✅ | 热点图片地址|
| type | string | ✅ | 热点类型，目前仅支持'image' |
| ath | number | | 水平坐标 |
| atv | number | | 垂直坐标 |
| onClick | EventCallback | | 点击回调 |

> ❗️**注意**
> react-krpano组件中绝大多数属性都以camelCase来书写，而对应的属性在krpano中全都是小写的。

## 示例

``` tsx
ReactDOM.render(
    <Krpano className="App">
        <Scene
            name="scene0"
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
                ath={-50}
                atv={20}
                onClick={() => console.log('hotspot click')}
            />
            <View fov={80} fovMin={60} fovMax={120} />
        </Scene>

    </Krpano>,
    document.getElementById('app')
);
```
# Events
Events组件主要用于全局事件的处理。


## 属性
目前支持除了`keep`外所有属性的设置，具体属性见[官方文档](https://krpano.com/docu/xml/#hotspot)。
下面是几个比较常用的属性：

| 属性名 | 类型 | 必须 | 说明 |
|:--|:--:|:--:|:--|
| name | string |  | 事件名称。若提供该属性则会被认为是局部事件，详见[官方文档](https://krpano.com/docu/xml/#events)。|
| keep | boolean |  | 暂时不生效 |
| onClick | EventCallback | | 点击回调，注意如果热点等有onClick的元素点击不会触发 |
| onViewChange | EventCallback | | 视角变化时触发 |

其中EventCallback是事件回调的统一接口：
``` typescript
export type EventCallback = (renderer: KrpanoActionProxy) => void;
```

> ❗️**注意**
> react-krpano组件中绝大多数属性都以camelCase来书写，而对应的属性在krpano中全都是小写的。

## 示例

``` tsx
ReactDOM.render(
    <Krpano className="App">
        <Scene
            name="scene0"
            images={[
                {
                    type: 'cube',
                    url:
                        'https://qhyxpicoss.kujiale.com/r/2017/09/01/L3D221IS3QKUQUQBOGAPEK3P3XU888_7500x1250.jpg_%s',
                },
            ]}
        >
            <View fov={80} fovMin={60} fovMax={120} />
        </Scene>
        <Events
            onClick={renderer => {
                console.log(renderer.get('view.fov'));
            }}
        />
    </Krpano>,
    document.getElementById('app')
);
```
