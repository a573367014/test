export default [
    {
        prop: 'isTransformPercent',
        name: '转换百分比',
        type: 'radio',
        default: false,
    },
    {
        prop: 'startAngle',
        name: '起始角度',
        type: 'range',
        unit: '°',
        min: 0,
        max: 360,
        step: 1,
        default: 90,
    },
    {
        prop: 'allAngle',
        name: '整圆角度',
        type: 'range',
        unit: '°',
        min: 0,
        max: 360,
        step: 1,
        default: 360,
    },
    {
        prop: 'coordRadius',
        name: '半径百分比',
        type: 'ratioRange',
        unit: '%',
        min: 0,
        max: 1,
        step: 0.01,
        default: 1,
    },
    {
        prop: 'coordInnerRadius',
        name: '内半径比例',
        type: 'ratioRange',
        unit: '%',
        min: 0,
        max: 0.99,
        step: 0.01,
        default: 0,
    },
    {
        prop: 'itemBorder',
        type: 'border',
        default: true,
        name: '图形描边',
        block: [
            {
                prop: 'borderColor',
                name: '柱子边框颜色',
                default: '#ffffffff',
            },
            {
                prop: 'borderWidth',
                name: '柱子边框宽度',
                default: 0,
            },
        ],
    },
];
