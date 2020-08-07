Component({
    properties: {},
    data: {
        selectAll: false,
        filterList: [
            { name: '全部', value: 'all', checked: true },
            { name: '未完成', value: 'active', checked: false },
            { name: '已完成', value: 'complete', checked: false },
        ],
        activeTabName: 'all',
    },
    lifetimes: {
        attached() {
            this.setData({
                selectAll: wx
                    .getStorageSync('todoList')
                    .every((item) => item.checked),
            });
        },
    },
    methods: {
        filterHandle(e) {
            const { value } = e.currentTarget.dataset;
            this.setData({
                activeTabName: value,
            });
            this.triggerEvent('filterHandle', { value });
        },
        selectAllHandle() {
            const selectAll = !this.data.selectAll;
            this.setData(
                {
                    selectAll,
                },
                () => {
                    this.triggerEvent('selectAllHandle', {
                        value: selectAll,
                    });
                },
            );
        },
    },
});
