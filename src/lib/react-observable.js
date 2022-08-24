import rxjs from '/dependencies/rxjs.js';

const { BehaviorSubject, Subject, distinctUntilChanged } = rxjs;

export const getStateObservable = (initialState) => {
    const stateSubject$ = new BehaviorSubject(initialState);
    const state$ = stateSubject$.asObservable().pipe(distinctUntilChanged)
    return {
        nextState: (state) => stateSubject$.next(state),
        state$,
    };
}

export const getActionObservable = () => {
    const actionSubject$ = new Subject();
    const action$ = actionSubject$.asObservable();

    return {
        nextAction: (action) => actionSubject$.next(action),
        action$,
    };
}
