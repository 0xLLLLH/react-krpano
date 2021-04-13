import React from 'react';

/**
 * This hook is design to cache component's callback from props, and avoid unnecessary re-render cause by arrow function.
 * This pattern might cause problems in the concurrent mode.
 *
 * [related section in react doc](https://reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback)
 *
 * [related github ticket](https://github.com/facebook/react/issues/14099#issuecomment-440013892)
 *
 * @param callback callback to memorize
 * @returns mutable ref object
 */
export default function useEventCallback<T>(callback: T): React.MutableRefObject<T> {
    const callbackRef = React.useRef(callback);

    React.useLayoutEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    return callbackRef;
}
