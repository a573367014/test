import Mock from 'mockjs';
console.log('mock');
Mock.mock(/test/, 'post', {
    status: 200,
    data: {
        // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
        'list|1-10': [
            {
                // 属性 id 是一个自增数，起始值为 1，每次增 1
                'id|+1': 1,
            },
        ],
    },
});
