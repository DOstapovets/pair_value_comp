export default [
    require('./src/editor/editor.vue'),
    require('./src/input/input.vue')
];

export const meta = {
    name    : 'paired-values-external-component',
    type    : 'onereach-studio-plugin',
    label   : 'Paired values',
    version : '1.0'
};
