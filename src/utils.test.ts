import { buildKrpanoAction, buildKrpanoTagSetterActions, buildXML, mapObject, mapEventPropsToJSCall } from './utils';

describe('buildKrpanoAction()', () => {
    test('call', () => {
        expect(buildKrpanoAction('set', 'view.fov', 120)).toMatchSnapshot();

        expect(buildKrpanoAction('addhotspot', 'hotspotName')).toMatchSnapshot();

        expect(buildKrpanoAction('loadscene', 'scene1', 'null', 'MERGE', 'BLEND(0.5)')).toMatchSnapshot();
    });
});

describe('buildKrpanoTagSetterActions()', () => {
    test('call without tag name', () => {
        expect(buildKrpanoTagSetterActions('view', { fov: 90 })).toMatchSnapshot();
    });
    test('call with tag name', () => {
        expect(
            buildKrpanoTagSetterActions('scene[scene1]', { autoload: false, content: '<preview url="/preview.jpg" />' })
        ).toMatchSnapshot();

        expect(
            buildKrpanoTagSetterActions('hotspot[hotspotName]', {
                ath: 10,
                atv: 20,
                c: undefined,
            })
        ).toMatchSnapshot();
    });

    test('assignstyle', () => {
        expect(
            buildKrpanoTagSetterActions('hotspot[hotspotName]', {
                ath: 10,
                atv: 20,
                style: 'hotspot_style1',
            })
        ).toMatchSnapshot();
    });

    test('escape string', () => {
        expect(
            buildKrpanoTagSetterActions('hotspot[hotspotName]', {
                needEscape: `<div>It's normal string</div>`,
                content: `<xml>It's xml string, keep everything</xml>`,
            })
        ).toMatchSnapshot();
    });
});

describe('buildXML()', () => {
    test('empty attrs & children', () => {
        expect(
            buildXML({
                tag: 'tagName',
                attrs: {},
            })
        ).toMatchSnapshot();
    });

    test('empty children', () => {
        expect(
            buildXML({
                tag: 'tagName',
                attrs: {
                    key1: 'val1',
                    key2: 2,
                },
            })
        ).toMatchSnapshot();
    });

    test('children empty array', () => {
        expect(
            buildXML({
                tag: 'tagName',
                attrs: {
                    key1: 'val1',
                    key2: 2,
                },
                children: [],
            })
        ).toMatchSnapshot();
    });

    test('one childreny', () => {
        expect(
            buildXML({
                tag: 'tagName',
                attrs: {
                    key1: 'val1',
                    key2: 2,
                },
                children: [
                    {
                        tag: 'inner',
                        attrs: {
                            k: 'v',
                        },
                    },
                ],
            })
        ).toMatchSnapshot();
    });
});

describe('mapObject()', () => {
    test('call', () => {
        const obj = { a: 1, b: 2 };

        expect(mapObject(obj, (k, v) => ({ [k]: (v as number) + 1 }))).toEqual({
            a: 2,
            b: 3,
        });
    });
});

describe('mapEventPropsToJSCall()', () => {
    test('call', () => {
        const obj = { a: 1, b: 2, onClick: () => console.log(1) };

        expect(mapEventPropsToJSCall(obj, k => `js(${k}, selector)`)).toEqual({
            onClick: 'js(onClick, selector)',
        });
    });
});
