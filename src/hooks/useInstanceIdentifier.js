import { useMemo } from '/dependencies/react.js';

let id = 0;

// Create a per-component-instance identifier
export const useInstanceIdentifier = () => {
    const idMemo = useMemo(() => id++, []);
    return idMemo;
};
