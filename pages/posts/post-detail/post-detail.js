var postsData = require("../../../data/posts-data.js");
var app=getApp();
Page({
  onLoad: function (options) {
    var postid = options.id;
    this.data.currentPostid = postid;
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
    //间听音乐状态，改变并保留音乐状态
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postid){
      this.setData({
        isPlayingMusic:true
      })
      
    }
    this.setAudioMonitor();
  },

  setAudioMonitor:function(){
  // 监听音乐播放与暂停
  var that = this
  wx.onBackgroundAudioPlay(function () {
    that.setData({
      isPlayingMusic: true
    })
    app.globalData.g_isPlayingMusic=true;
    app.globalData.g_currentMusicPostId = that.data.currentPostid;
  }),
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false
      app.globalData.g_currentMusicPostId = null
    })
},

  onColletionTap: function (event) {
    var postsCollected = wx.getStorageSync("posts_collected");
    var postCollected = postsCollected[this.data.currentPostid];
    //收藏变成未收藏，未收藏变成收藏
    postCollected = !postCollected;
    postsCollected[this.data.currentPostid] = postCollected;
    this.showToast(postsCollected, postCollected)
  },

  //  showModal: function (postsCollected, postCollected) {
  //    var that = this;
  //    wx.showModal({
  //      title: "收藏",
  //      content: postCollected ? "收藏该文章？" : "取消收藏该文章？",
  //      showCancel: "true",
  //      cancelText: "取消",
  //      cancelColor: "#333",
  //      confirmText: "确认",
  //      confirmColor: "#405f80",
  //      success: function (res) {
  //        if (res.confirm) {
  //          wx.setStorageSync('posts_collected', postsCollected);
  //          // 更新数据绑定变量，从而实现切换图片
  //          that.setData({
  //            collected: postCollected
  //          })
  //        }
  //      }
  //    })
  //  }
// 收藏
  showToast: function (postsCollected, postCollected) {
    // 更新文章是否的缓存值
    wx.setStorageSync('posts_collected', postsCollected);
    // 更新数据绑定变量，从而实现切换图片
    this.setData({
      collected: postCollected
    })
    wx.showToast({
      title: postCollected ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success"
    })
  },
  // 分享
  onShareTap: function (event) {
    var itemlist = [
      "分享到微博",
      "分享到微信朋友圈",
      "分享到微信",
      "分享到QQ"
    ]
    wx.showActionSheet({
      itemList: itemlist,
      itemColor: "#405f80",
      success: function (res) {
        //res.cancel 用户是不是点击了取消按钮
        //res.tapIndex 数组元素的序号，从0开始
        wx.showModal({
          title: '用户' + itemlist[res.tapIndex],
          content: '用户是否取消？' + res.cancel + "微信小程序暂不支持分享功能",
        })

      }
    })
  },
  // 音乐播放
  onMusicTap: function (event) {
    var currentPostId = this.data.currentPostid;
    var postData = postsData.postList[currentPostId]
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio()
      this.setData({
        isPlayingMusic: false
      })
    } else {
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg,
      })
      this.setData({
        isPlayingMusic: true
      })
    }
  }

})