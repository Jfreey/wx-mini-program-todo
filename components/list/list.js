Component({
    properties: {
        todoList: {
            type: Array,
            value: [],
        },
    },
    data: {},
    methods: {
        selectHandle(e) {
            this.triggerEvent('selectHandle', {
                value: e.currentTarget.dataset.index,
            });
        },
        deleteHandle(e) {
            this.triggerEvent('deleteHandle', {
                value: e.currentTarget.dataset.index,
            });
        },
    },
});
