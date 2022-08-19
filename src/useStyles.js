
import 'https://mozilla.github.io/sanitizer-polyfill/dist/sanitizer-polyfill.js'
import { useEffect, useRef } from '/dependencies/react.js';
import { useInitialValue } from './useInitialValue.js';
import { useRunOnce } from './useRunOnce.js';
import { useUniqueIdentifier } from './useUniqueIdentifier.js';

const sanitizer = new window.Sanitizer();

const stylesheetFromTemplate = (css) => {
    const tempDoc = document.implementation.createHTMLDocument();
    tempDoc.body.appendChild(sanitizer.sanitizeFor('style', css));
    const style = tempDoc.querySelector("style");
    return style.sheet;
}

const classNameRegex = /\.[^. #>\[\]]+/g

const getMatches = (regex, value) => (value.match(regex) || []);

const getClassNames =
    (ruleText) => getMatches(classNameRegex, ruleText).map(c => c.replace('.', ''));

export const useStyles = (scope, css) => {
    const initialScope = useInitialValue(scope);
    const uniqueId = useUniqueIdentifier();
    const classMappingRef = useRef({});
    const wrapperRef = useRef(null);

    const doIt = (css, initialScope) => {
        let classNames = [initialScope];

        const sheet = stylesheetFromTemplate(css);

        const newStyle = document.createElement("style");
        for (let i = 0; i < sheet.cssRules.length; i++) {
            const rule = sheet.cssRules[i];

            classNames = [...classNames, ...getClassNames(rule.selectorText)];

            rule.selectorText = `.${initialScope}__${uniqueId} ${rule.selectorText}`;
            newStyle.innerHTML += rule.cssText;
        }

        const uniqueClassNames = [...new Set(classNames)];
        const classMapping = Object.fromEntries(uniqueClassNames.map(c =>
            [c, c === initialScope ? `${c}__${uniqueId}` : c]
        ));

        classMappingRef.current = classMapping;
        wrapperRef.current.innerHTML = '';
        wrapperRef.current.appendChild(newStyle);
        document.body.appendChild(wrapperRef.current);
    };

    useRunOnce(() => {
        wrapperRef.current = document.createElement('div');
        doIt(css, initialScope);
    });

    useEffect(() => {
        if (!wrapperRef.current) {
            wrapperRef.current = document.createElement('div');
        }
        const wrapper = wrapperRef.current;

        doIt(css, initialScope);

        return () => document.body.removeChild(wrapper);
    }, [css, initialScope]);

    return {
        styles: classMappingRef.current,
    }
};
