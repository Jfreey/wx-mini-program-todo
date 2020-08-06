const app = getApp();
Page({
    data: {
        userInfo: null,
        todoContent: '',
        todoList: [],
        filterList: [
            { name: '全部', value: 'all', checked: true },
            { name: '未完成', value: 'active', checked: false },
            { name: '已完成', value: 'complete', checked: false },
        ],
        selectAll: false,
        hasUserInfo: false,
        activeTabName: 'all',
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
    },
    onLoad(options) {
        this.setData({ todoList: wx.getStorageSync('todoList') || [] });
    },
    getUserInfo(e) {
        const { userInfo } = e.detail;
        app.globalData.userInfo = userInfo;
        this.setData({
            userInfo,
            hasUserInfo: true,
        });
    },
    addNewTodo() {
        this.setData(
            {
                todoList: [
                    { value: this.data.todoContent },
                    ...this.data.todoList,
                ],
            },
            () => {
                this.setData({
                    selectAll: false,
                    todoContent: '',
                });
                wx.setStorageSync('todoList', [...this.data.todoList]);
            },
        );
    },
    deleteTodo(index) {
        this.data.todoList.splice(index, 1);
        this.setData(
            {
                todoList: this.data.todoList,
            },
            () => {
                wx.setStorageSync('todoList', [...this.data.todoList]);
            },
        );
    },
    selectHandle(e) {
        const { index } = e.currentTarget.dataset;
        const checked = !this.data.todoList[index].checked;
        this.setData(
            {
                [`todoList[${index}].checked`]: checked,
            },
            () => {
                this.setData({
                    selectAll: this.data.todoList.every((item) => item.checked),
                });
                const todoListStorage = wx.getStorageSync('todoList');
                todoListStorage[index].checked = checked;
                wx.setStorageSync('todoList', todoListStorage);
            },
        );
    },
    selectAll() {
        const selectAll = !this.data.selectAll;
        this.setData(
            {
                selectAll,
                todoList: this.data.todoList.map((item) => {
                    item.checked = selectAll;
                    return item;
                }),
            },
            () => {
                wx.setStorageSync(
                    'todoList',
                    this.data.todoList.map((item) => {
                        item.checked = selectAll;
                        return item;
                    }),
                );
            },
        );
    },
    filter(e) {
        const { value } = e.currentTarget.dataset;
        let todoList;
        switch (value) {
            case 'all':
                todoList = [...wx.getStorageSync('todoList')];
                break;
            case 'active':
                todoList = wx
                    .getStorageSync('todoList')
                    .filter((item) => !item.checked);
                break;
            case 'complete':
                todoList = wx
                    .getStorageSync('todoList')
                    .filter((item) => item.checked);
                break;
        }
        this.setData({
            todoList,
            activeTabName: value,
        });
    },
});
