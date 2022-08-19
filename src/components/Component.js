import { html } from '/dependencies/htm.js';

import { useStyles } from '/src/hooks/useStyles.js';
import { css } from '/src/lib/css.js';

export const Component = ({ color }) => {
    const { styles } = useStyles('component', css`
        .component {
            border: 1px solid black;
        }

        p {
            color: ${color || 'red'};
        }
    `);

    return html`
        <div className="${styles.component}">
            <p>Hello worlds</p>
        </div>
    `;
}
