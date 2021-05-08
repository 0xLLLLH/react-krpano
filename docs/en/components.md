# Krpano

The Krpano component is responsible for the initialization of krpano.

## Props

| Attribute | Type | Needed | Description |
|:--|:--:|:--:|:--|
| className | string |  | css class of root node |
| currentScene | string | | Name of the currently displayed scene. Must be the same as Scene name attribut |
| target | string | | ID of the Krpano DOM element |
| id | string | | The id of the internal JavaScriptInterfaceObjective, the id of multiple krpano instances needs to be different |
| xml | string | | XML file path to include into krpano instance |
| onReady | EventCallback |  | Called after krpano's onready callback is triggered |

## Example
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

The View component controls and limits the viewing angle.

## Attributes

Currently supports the setting of all attributes, see [official documentation](https://krpano.com/docu/xml/#view) for specific attributes . The following are some of the more commonly used attributes:

| Attribute | Type | Needed | Description |
|:--|:--:|:--:|:--|
| hlookat | number |  | The horizontal coordinate of the current viewing angle corresponding to the horizontal point |
| vlookat | number | | The current angle of view corresponds to the vertical coordinate of the horizontal point |
| fov | number | | Field of view size |
| fovtype | string | | FoV type，can be: 'VFOV', 'HFOV', 'DFOV', 'MFOV' or 'SFOV' |
| fovmin | number | | Minimum FoV value |
| fovmax | number | | Maximum FoV value |

> ❗️ **Note**
> that most of the attributes in the react-krpano component are written in camelCase, and the corresponding attributes are all lowercase in krpano.

## Example

``` tsx
ReactDOM.render(
    <Krpano className="App" xml="/krpano.xml">
        <View fov={80} fovMin={60} fovMax={120} />
    </Krpano>,
    document.getElementById('app')
);
```

# Scene

Represent krpano scenes

| Attribute | Type | Needed | Description |
|:--|:--:|:--:|:--|
| name | string | ✅ | Scene name |
| previewUrl | string | | Preview image url, usually a low-quality image |
| content | string | | Directly specify the xml content of the scene tag, other settings will be ignored after use |
| imageTagAttributes | Record | | Set image tag attributes, see the [official documentation](https://krpano.com/docu/xml/#image) for details |
| images | [SceneImage] or SceneImageWithMultires[] | | Define picture to display in the scene. When length > 1, it will trigger [multires](https://krpano.com/examples/?multires) |


## Interface
``` tsx
export interface SceneImage {
    /** Image type, generally cube */
    type: string;
    url: string;
}

export interface SceneImageWithMultires {
    /** Image type, generally cube */
    type: string;
    url: string;
    // multires settings
    tiledImageWidth: number;
    tiledImageHeight: number;
    tileSize?: number;
    asPreview?: boolean;
}
```

## Examples

**Single resolution**
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

**Multi-resolution**

> The image used in multires here is obtained from the Alibaba Cloud OSS image processing API, and other methods can also be used to preprocess the generated image

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

## Attributes

Currently only supports the setting of image hotspots and their basic attributes. See the  [official documentation](https://krpano.com/docu/xml/#hotspot) for specific attributes . The following are some of the more commonly used attributes:


| Attribute | Type | Needed | Description |
|:--|:--:|:--:|:--|
| name | string | ✅ | Hotspot name |
| url | string | ✅ | Hotspot image path |
| type | string | ✅ | Hotspot type, currently only support `image` |
| ath | number | | Horizontal coordinate |
| atv | number | | Vertical coordinate |
| onClick | EventCallback | | Click event callback |

> ❗️ **Note**
> that most of the attributes in the react-krpano component are written in camelCase, and the corresponding attributes are all lowercase in krpano.

## Example

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

The Events component is mainly used for the processing of global events.

## Attributes

| Attribute | Type | Needed | Description |
|:--|:--:|:--:|:--|
| name | string |  | Event name，if specified, it will be concidered as a local event. Please refer to the [official documentation](https://krpano.com/docu/xml/#events) for details |
| keep | boolean |  | Not working for the moment |
| onClick | EventCallback | | Click callback, note that if there is an onClick element such as a hotspot, it will not be triggered |
| onViewChange | EventCallback | | Triggered when viewing angle changes |

EventCallback is a unified interface for event callbacks:
``` typescript
export type EventCallback = (renderer: KrpanoActionProxy) => void;
```

> ❗️ **Note**
> that most of the attributes in the react-krpano component are written in camelCase, and the corresponding attributes are all lowercase in krpano.

## Example

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
