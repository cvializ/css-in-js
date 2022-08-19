import { useMemo } from '/dependencies/react.js';

let id = 0;

export const useUniqueIdentifier = () => {
    const idMemo = useMemo(() => id++, []);
    return idMemo;
};
