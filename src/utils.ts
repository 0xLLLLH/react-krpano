import escapeHTML from 'escape-html';

type FuncName = 'set' | 'loadxml' | 'loadscene';

/**
 * 执行单个函数
 * @param func 函数名
 * @param params 参数列表
 */
export const buildKrpanoAction = (func: FuncName, params: Array<string | number | boolean>): string =>
    `${func}(${params.map((p) => p.toString()).join(', ')});`;

/**
 * 动态添加标签
 * @see https://krpano.com/forum/wbb/index.php?page=Thread&threadID=15873
 */
export const buildKrpanoTagSetterActions = (
    tag: 'scene' | 'hotspot' | 'layer',
    name: string,
    attrs: Record<string, string | boolean | number>,
): string =>
    Object.keys(attrs)
        .map((key) => {
            // 如果属性值中有双引号，需要改用单引号
            let quete = '"';
            if (attrs[key].toString().includes(quete)) {
                // eslint-disable-next-line quotes
                quete = "'";
            }
            if (key === 'style') {
                return `assignstyle(${tag}[${name}], ${attrs[key]});`;
            }
            if (typeof attrs[key] === 'boolean') {
                return `set(${tag}[${name}].${key}, ${attrs[key]});`;
            }
            // content是XML文本，不能转义，因为不涉及用户输入也不需要
            return `set(${tag}[${name}].${key}, ${quete}${
                key === 'content' ? attrs[key] : escapeHTML(attrs[key].toString())
            }${quete});`;
        })
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
