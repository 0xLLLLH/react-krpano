# React Krpano
React bindings for krpano.

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
## 安装

开发中，暂未发布npm包。

## 限制

* 一个页面仅展示一个krpano全景图。如果需要同时展示多个，更轻量的方案会比较合适。
* 暂时只实现了部分功能

## 使用方法

### 直接加载xml
```tsx
const xmlString = `
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
</krpano>`;

ReactDOM.render(<Krpano xml={xmlString} />, document.getElementById('app'));
```

### 多个Scene

#### 写法一
```tsx
const Comp = () => {
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

ReactDOM.render(<Comp />, document.getElementById('app'));
```
#### 写法二
```tsx
const Comp = () => {
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
        <Krpano>
            <View fov={90} fovmin={80} fovmax={120} />
            {scenes.map(sc => sc.name === currentScene ? (
                <Scene name={sc.name} previewUrl={sc.previewUrl} >
                    {sc.hotspots.map(pt => <Hotspot {...pt} />)}
                </Scene>
             : null))}
        </Krpano>
    )
}

ReactDOM.render(<Comp />, document.getElementById('app'));
```

## 功能支持进度

基本组件：
- [ ] Krpano
  - [x] 加载指定xml
- [ ] View
  - [x] 基本属性：fov,hlookat,vlookat,fovmin,fovmax
  - [ ] 更多设置
- [ ] Hotspot
- [ ] Scene
  - [ ] 设置preview
  - [ ] 设置单个图片及多级图片
- [ ] Layer
- [ ] Events

插件功能：
- [ ] 音乐
- [ ] 自动旋转

测试：
- [ ] 性能测试，是否存在不必要的更新？
## 已知问题

- [ ] Hotspot的keep不生效（应该）
