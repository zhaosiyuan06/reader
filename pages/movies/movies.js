Page({
//原来通过 SOAP接口获取到 XML
// 现在RESTFULL API JSON
onLoad:function(event){
  wx.request({
    url: "https://api.douban.com/v2/movie/top250",
    data:{},
    method:"GET",
    header:{
      "Content-Type": "application/xml"
    },
    success:function(res){
      console.log(res)
    },
    fail:function(error){
      console.log(error)
    },
    complete:function(){
      
    }
  })
}
  

})