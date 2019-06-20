// pages/shopList/shopList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    pageIndex: 1,
    pageSize: 20,
    catId: 1,
    loadmore: true,
    hasMore: false
  },

  getList: function() {
    console.log(this.data.hasMore);
    if (this.data.hasMore) {
      this.setData({
        loadmore: false,
      })
      return;
    }
    this.setData({
      loadmore: true
    })
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://locally.uieee.com/categories/' + this.data.catId + '/shops',
      data: {
        _limit: this.data.pageSize,
        _page: this.data.pageIndex
      },
      success: (res) => {
        console.log((this.data.pageIndex * this.data.pageSize));
        setTimeout(() => {
          wx.hideNavigationBarLoading();
          wx.hideLoading();
        }, 1000);
        this.setData({
          list: [...this.data.list, ...res.data],
          loadmore: false,
          hasMore: (this.data.pageIndex * this.data.pageSize) >= parseInt(res.header['X-Total-Count'])
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.scanCode({
    //   onlyFromCamera: true,
    //   success(res) {
    //     console.log(res)
    //   }
    // })
    wx.setNavigationBarTitle({
      title: options.title
    })
    this.data.catId = options.cat;
    this.getList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      list: [],
      pageIndex: 1,
      loadmore: true,
      hasMore: false
    });
    this.getList();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    ++this.data.pageIndex;
    this.getList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})