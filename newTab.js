let config = [{
  "id": "google",
  "btnName": "谷歌搜索",
  "searchUrl": "https://www.google.com/search?&q=",
  "keyCode": "112",
  "kerName": "F1"
}, {
  "id": "baidu",
  "btnName": "百度一下",
  "searchUrl": "https://www.baidu.com/s?wd=",
  "keyCode": "113",
  "kerName": "F2"
}, {
  "id": "bing",
  "btnName": "必应国际",
  "searchUrl": "https://cn.bing.com/search?ensearch=1&q=",
  "keyCode": "114",
  "kerName": "F3"
}, {
  "id": "sogou",
  "btnName": "搜狗搜索",
  "searchUrl": "https://www.sogou.com/web?ie=UTF-8&query=",
  "keyCode": "115",
  "kerName": "F4"
}, {
  "id": "360so",
  "btnName": "360搜索",
  "searchUrl": "https://www.so.com/s?ie=UTF-8&q=",
  "keyCode": "116",
  "kerName": "F5"
}];
let searchVal = document.getElementById('searchVal');
searchVal.focus(); // 定位光标

// 动态加载搜索引擎
let btnsHtml = '';
let btntip = '搜索快捷键：回车默认' + config[0].btnName;
for (let i = 0; i < config.length; i++) {
  btnsHtml += '<div onclick="clickIn(\'' + config[i].searchUrl + '\')">' + config[i].btnName + '</div>';
  btntip += ' | ' + config[i].kerName + config[i].btnName;
}
document.getElementById('btns').innerHTML = btnsHtml;
document.getElementById('searchTip').innerText = btntip;
// 点击按钮搜索
function clickIn(url) {
  window.location.href = url + searchVal.value
}

// 全局按键方法
document.onkeydown = function (event) {
  let e = event || window.event || arguments.callee.caller.arguments[0];
  if (e && e.keyCode == 13) { // 按回车、默认采取配置第一个
    event.preventDefault();
    window.location.href = config[0].searchUrl + searchVal.value;
  }
  for (let i = 0; i < config.length; i++) {
    if (e && e.keyCode == config[i].keyCode) {
      event.preventDefault(); // 通知 Web 浏览器不要执行与事件关联的默认动作(如果存在这样的动作)
      window.location.href = config[i].searchUrl + searchVal.value;
    }
  }
};

// js简单封装ajax
var ajaxHdFn = function (uri, func, data, cb) {
  var getXmlHttpRequest = function () {
    if (window.XMLHttpRequest) {
      //主流浏览器提供了XMLHttpRequest对象
      return new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      //低版本的IE浏览器没有提供XMLHttpRequest对象
      //所以必须使用IE浏览器的特定实现ActiveXObject
      return new ActiveXObject("Microsoft.XMLHttpRequest");
    }
  };
  var xhr = getXmlHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      //获取成功后执行操作
      //数据在xhr.responseText
      var resJson = JSON.parse(xhr.responseText)
      cb(resJson);
    }
  };
  xhr.open(func, uri, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
  var dataStr = '';
  for (var i in data) {
    if (dataStr) {
      dataStr += '&';
    }
    dataStr += i + '=' + data[i];
  }
  xhr.send(dataStr);
};

// 接入一言
var hitokoto = document.getElementById('hitokoto')
ajaxHdFn('https://v1.hitokoto.cn', 'get', {
  format: 'json'
}, function (res) {
  console.log('res', res)
  hitokoto.innerText = res.hitokoto;
})
// 接入爱词霸的每日一句
var iciba_cn = document.getElementById('iciba_cn')
var iciba_en = document.getElementById('iciba_en')
ajaxHdFn('./iciba.json', 'get', {
  format: 'json'
}, function (res) {
  var index = Math.floor((Math.random()*res.length)); 
  iciba_cn.innerText = res[index]['txt_cn'];
  iciba_en.innerText = res[index]['txt_en'];
})