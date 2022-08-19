import { html } from '/dependencies/htm.js';

import { useStyles } from '/src/useStyles.js';
import { css } from '/src/css.js';

export const Component = ({ color }) => {
    const { styles } = useStyles('component', css`
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
