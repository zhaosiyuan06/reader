var app=getApp();
Page({
//原来通过 SOAP接口获取到 XML
// 现在RESTFULL API JSON
data:{
  inTheaters:{},
  comingSoon:{},
  top250:{}
},
onLoad:function(event){
  var InTheatersUrl = app.globalData.g_UrlData+"/v2/movie/in_theaters"+"?start=0&count=3";
  var ComingSoonUrl = app.globalData.g_UrlData + "/v2/movie/coming_soon"+"?start=0&count=3";
  var Top250Url = app.globalData.g_UrlData + "/v2/movie/top250"+"?start=0&count=3";
  this.getMovieListData(InTheatersUrl,"inTheaters");
  this.getMovieListData(ComingSoonUrl,"comingSoon");
  this.getMovieListData(Top250Url,"top250");
},
  
  getMovieListData: function (url,settedKey){
  var that=this;
  wx.request({
    url: url,
    method: "GET",
    header: {
      "Content-Type": "application/xml"
    },
    success: function (res) {
      // console.log(res);
      that.processDoubanData(res.data, settedKey)
    },
    fail: function (error) {
      console.log(error)
    },
    complete: function () {

    }
  })
},
processDoubanData:function(moviesDouban,settedKey){
    var movies=[];
    for(var idx in moviesDouban.subjects){
      var subject = moviesDouban.subjects[idx];
      var title=subject.title;
      if(title.length>=6){
        title=title.substring(0,6)+"...";
      }
      var temp={
        title:title,
        average:subject.rating.average,
        coverageUrl:subject.images.large,
        moviesId:subject.id
      }
      movies.push(temp);
    }
    var readyData={};
    readyData[settedKey]={
      movies:movies
    }
    this.setData(readyData);

}
})