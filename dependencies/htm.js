import React from '/dependencies/react.js';

import htm from '/node_modules/htm/dist/htm.module.js'

export { default } from '/node_modules/htm/dist/htm.module.js';
export * from '/node_modules/htm/dist/htm.module.js';

export const html = htm.bind(React.createElement);
