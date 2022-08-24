import { Component } from '/src/components/Component.js';
import { useRequest } from '/src/hooks/useRequest.js';
import { html } from '/dependencies/htm.js';
import operators from '/dependencies/rxjs-operators.js';
import rxjs from '/dependencies/rxjs.js';

const {
    of,
    concat,
} = rxjs;
const {
    filter,
    mergeMap,
    catchError,
    tap,
} = operators;

export const ComponentContainer = () => {
    const epic = (action$) =>
        action$.pipe(
            filter(action => action.type === dataRequest().type),
            mergeMap(() => fetch('.')),
            mergeMap((x) => {
                return [dataSuccess({ foo: 'Bar' })];
            }),
            catchError((error, source$) => {
                return concat(of(dataError(error)), source$);
            }),
        );

    const {
        dispatch,
        dataRequest,
        dataError,
        dataSuccess,
        dataReset,
        getIsUnrequested,
        getIsLoading,
        getIsLoadingOrUnrequested,
        getData,
        getErrors,
    } = useRequest([epic]);

    return html`
        <${Component}
            errors=${errors}
            onClickRequest=${() => dispatch(dataRequest())}
            onClickSuccess=${() => dispatch(dataSuccess({ foo: 'Bar' }))}
            onClickError=${() => dispatch(dataError({ message: ['Sad : ('] }))}
            onClickReset=${() => dispatch(dataReset())}
            data=${getData()}
            loading=${getIsLoading()}
            errors=${getErrors()}
        />
    `;
}
