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
            if (key === 'style') {
                return `assignstyle(${tag}[${name}], ${attrs[key]});`;
            }
            if (typeof attrs[key] === 'boolean') {
                return `set(${tag}[${name}].${key}, ${attrs[key]});`;
            }
            // content是XML文本，不能转义，因为不涉及用户输入也不需要
            return `set(${tag}[${name}].${key}, "${
                key === 'content' ? attrs[key] : escapeHTML(attrs[key].toString())
            }");`;
        })
        .join('');

export const Logger = {
    log: (...args: any[]): void => {
        if (process.env.NODE_ENV === 'development') {
            console.log(...args);
        }
    },
};
