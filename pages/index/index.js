const app = getApp();
Page({
    data: {
        userInfo: null,
        todoList: [],
        hasUserInfo: false,
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
    addNewTodo(e) {
        const { value } = e.detail;
        this.setData(
            {
                todoList: [{ value }, ...this.data.todoList],
            },
            () => {
                this.setData({
                    selectAll: false,
                });
                wx.setStorageSync('todoList', [...this.data.todoList]);
            },
        );
    },
    deleteTodo(e) {
        const { value: index } = e.detail;
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
        const { value: index } = e.detail;
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
    selectAllHandle(e) {
        const { value: selectAll } = e.detail;

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
        const { value } = e.detail;
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
