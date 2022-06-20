// 增删改，修改默认值问题
export default [
    {
        prop: 'isTransformPercent',
        name: '转换百分比',
        type: 'radio',
        default: true,
    },
    {
        prop: 'itemWidthRatio',
        name: '宽度比例',
        type: 'ratioRange',
        min: 0.01,
        max: 1,
        step: 1,
        default: 0.6,
    },
    {
        prop: 'itemMaxWidth',
        name: '最大宽度',
        type: 'range',
        min: 1,
        max: 500,
        step: 1,
        default: 500,
    },
    {
        prop: 'autoItemMargin',
        name: '平均分布每一项',
        type: 'radio',
        default: true,
    },
    {
        prop: 'itemMarginRatio',
        name: '每一项间距比例',
        visiable: (s) => s.autoItemMargin === false,
        type: 'ratioRange',
        min: 0,
        max: 1,
        step: 0.01,
        default: 0.2,
    },

    {
        prop: 'enableWarpRing',
        type: 'block',
        default: true,
        name: '外环',
        block: [
            {
                prop: 'warpRingRadius',
                name: '环半径',
                type: 'ratioRange',
                unit: '%',
                min: 0,
                max: 2,
                default: 1.08,
            },
            {
                prop: 'itemborderWidth',
                name: '边框宽度',
                type: 'range',
                unit: 'px',
                min: 0,
                max: 10,
                default: 3,
            },
        ],
    },
];