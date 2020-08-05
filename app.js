//app.js
App({
    onLaunch() {
        const list = wx.getStorageSync('list') || [];
    },
    globalData: {
        userInfo: null,
        list: [],
    },
});
