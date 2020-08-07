Component({
    properties: {},
    data: {
        todoContent: '',
    },
    methods: {
        confirmHandle() {
            this.triggerEvent('confirmHandle', {
                value: this.data.todoContent,
            });
            this.setData({ todoContent: '' });
        },
    },
});
