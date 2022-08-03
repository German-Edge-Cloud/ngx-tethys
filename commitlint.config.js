module.exports = {
    extends: ['@commitlint/config-angular'],
    rules: {
        'header-max-length': [0, 'always', 120],
        'scope-enum': [
            2,
            'always',
            [
                'deps',
                'cdk',
                'schematics',
                'variables',
                'core',
                'action',
                'testing',
                'shared',
                'types',
                'util',
                'styles',
                'action-menu',
                'alert',
                'arrow-switcher',
                'copy',
                'autocomplete',
                'avatar',
                'badge',
                'breadcrumb',
                'button',
                'card',
                'cascader',
                'checkbox',
                'date-picker',
                'date-range',
                'datepicker',
                'dialog',
                'directive',
                'drag-drop',
                'dropdown',
                'empty',
                'flexible-text',
                'form',
                'grid',
                'table',
                'icon',
                'input',
                'label',
                'tag',
                'layout',
                'link',
                'list',
                'loading',
                'markdown',
                'mention',
                'menu',
                'nav',
                'notify',
                'nav',
                'pagination',
                'popover',
                'progress',
                'property-operation',
                'radio',
                'result',
                'select',
                'skeleton',
                'slide',
                'slider',
                'statistic',
                'stepper',
                'store',
                'strength',
                'switch',
                'time-picker',
                'tooltip',
                'transfer',
                'tree',
                'tree-select',
                'upload',
                'vote',
                'anchor',
                'back-top',
                'timeline',
                'divider',
                'space',
                'calendar',
                'fullscreen',
                'guider',
                'resizable',
                'input-number',
                'collapse',
                'rate',
                'select-control',
                'image',
                'segment',
                'dot',
                'affix',
                'tabs',
                'watermark'
            ]
        ]
    }
};
