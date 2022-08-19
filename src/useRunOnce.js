import { useRef } from '/dependencies/react.js';

export const useRunOnce = (cb) => {
    const flagRef = useRef(false);

    if (!flagRef.current) {
        flagRef.current = true;
        cb();
    }
};
