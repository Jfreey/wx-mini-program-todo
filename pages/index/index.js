const app = getApp();
Page({
    data: {
        userInfo: null,
        todoContent: '',
        todoList: [],
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
    },
    onLoad(options) {},
    onReady() {},
    onShow() {},
    onHide() {},
    onUnload() {},
    onShareAppMessage() {
        return {
            title: '',
        };
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
                    todoContent: '',
                });
            },
        );
    },
    selectHandle(e) {
        const { index } = e.currentTarget.dataset;
        this.setData({
            [`todoList[${index}].checked`]: !this.data.todoList[index].checked,
        });
    },
});
