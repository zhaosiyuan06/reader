var postsData = require('../../data/posts-data.js')

Page({
  data: {
    //小程序总是会读取data对象来做数据绑定，这个动作我们称为动作A
    // 而这个动作A的执行，是在onLoad函数执行之后发生的
  },
  onLoad: function () {
    // this.data.postList = postsData.postList
    this.setData({
      posts_key: postsData.postList
    });
  },
  onPostTab:function(event){
    var postId = event.currentTarget.dataset.postid;
    // console.log(postId)
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+postId,
    })
  },
 onSwiperitemtap: function (event) {
    var postId = event.currentTarget.dataset.postid;
    // console.log(postId)
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
  }

})