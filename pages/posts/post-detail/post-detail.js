var postsData = require("../../../data/posts-data.js");
Page({
  onLoad: function (options) {
    var postid=options.id;
    this.data.currentPostid=postid;
    // this.data.currentPostId = postid;
    var postData = postsData.postList[postid];
    // this.data.postData = postData;
    this.setData({
      postData: postData 
    })
   
    var postsCollected = wx.getStorageSync('posts_collected')
    if (postsCollected) {
      var postCollected = postsCollected[postid]
      this.setData({
        collected: postCollected
      })
    }
    else {
      var postsCollected = {};
      postsCollected[postid] = false;
      wx.setStorageSync('posts_collected', postsCollected);
    }
  },
  
   onColletionTap: function (event) {
     var postsCollected = wx.getStorageSync("posts_collected");
     var postCollected = postsCollected[this.data.currentPostid];
     //收藏变成未收藏，未收藏变成收藏
     postCollected = !postCollected;
     postsCollected[this.data.currentPostid] = postCollected;
     this.showModal(postsCollected, postCollected)
  },

   showModal: function (postsCollected, postCollected) {
     var that = this;
     wx.showModal({
       title: "收藏",
       content: postCollected ? "收藏该文章？" : "取消收藏该文章？",
       showCancel: "true",
       cancelText: "取消",
       cancelColor: "#333",
       confirmText: "确认",
       confirmColor: "#405f80",
       success: function (res) {
         if (res.confirm) {
           wx.setStorageSync('posts_collected', postsCollected);
           // 更新数据绑定变量，从而实现切换图片
           that.setData({
             collected: postCollected
           })
         }
       }
     })
   }

  //  showToast: function (postsCollected, postCollected) {
  //    // 更新文章是否的缓存值
  //    wx.setStorageSync('posts_collected', postsCollected);
  //    // 更新数据绑定变量，从而实现切换图片
  //    this.setData({
  //      collected: postCollected
  //    })
  //    wx.showToast({
  //      title: postCollected ? "收藏成功" : "取消成功",
  //      duration: 1000,
  //      icon: "success"
  //    })
  //  },

})