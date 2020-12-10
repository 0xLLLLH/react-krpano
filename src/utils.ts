import escapeHTML from 'escape-html';

type FuncName = 'set' | 'loadxml' | 'loadscene' | 'addhotspot' | 'removehotspot' | 'nexttick';

/**
 * 执行单个函数
 * @param func 函数名
 * @param params 参数列表
 */
export const buildKrpanoAction = (func: FuncName, ...params: Array<string | number | boolean>): string =>
    `${func}(${params.map((p) => `${p}`).join(', ')});`;

/**
 * 动态添加标签用
 * @see https://krpano.com/forum/wbb/index.php?page=Thread&threadID=15873
 */
export const buildKrpanoTagSetterActions = (
    name: string,
    attrs: Record<string, string | boolean | number | undefined>,
): string =>
    Object.keys(attrs)
        .map((key) => {
            const val = attrs[key];
            key = key.toLowerCase();
            if (val === undefined) {
                return '';
            }
            // 如果属性值中有双引号，需要改用单引号
            let quete = '"';
            if (val.toString().includes(quete)) {
                // eslint-disable-next-line quotes
                quete = "'";
            }
            if (key === 'style') {
                return `assignstyle(${name}, ${val});`;
            }
            if (typeof val === 'boolean' || typeof val === 'number') {
                return `set(${name}.${key}, ${val});`;
            }
            // content是XML文本，不能转义，因为不涉及用户输入也不需要
            return `set(${name}.${key}, ${quete}${key === 'content' ? val : escapeHTML(val.toString())}${quete});`;
        })
        .filter((str) => !!str)
        .join('');

export const Logger = {
    log: (...args: any[]): void => {
        if (process.env.NODE_ENV === 'development') {
            console.log(...args);
        }
    },
};

export interface XMLMeta {
    tag: string;
    attrs: Record<string, string | number | boolean>;
    children?: XMLMeta[];
}

/**
 * 根据元数据构建xml
 */
export const buildXML = ({ tag, attrs, children }: XMLMeta): string => {
    const attributes = Object.keys(attrs)
        .map((key) => `${key.toLowerCase()}="${attrs[key]}"`)
        .join(' ');

    if (children && children.length) {
        return `<${tag} ${attributes}>${children.map((child) => buildXML(child)).join('')}</${tag}>`;
    }
    return `<${tag} ${attributes} />`;
};

export const mapObject = (
    obj: Record<string, unknown>,
    mapper: (key: string, value: unknown) => Record<string, unknown>,
): Record<string, unknown> => {
    return Object.assign(
        {},
        ...Object.keys(obj).map((key) => {
            const value = obj[key];
            return mapper(key, value);
        }),
    );
};

export const mapEventPropsToJSCall = (
    obj: Record<string, unknown>,
    getString: (key: string, value: unknown) => string,
): Record<string, string> =>
    mapObject(obj, (key, value) => {
        if (key.startsWith('on') && typeof value === 'function') {
            return { [key]: getString(key, value) };
        }
        return {};
    }) as Record<string, string>;