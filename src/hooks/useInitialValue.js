import { useMemo } from '/dependencies/react.js';

export const useInitialValue = (value) => useMemo(() => value, []);
