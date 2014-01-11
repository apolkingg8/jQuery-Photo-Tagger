CommentOnPhoto
==============

在圖片上留言的jQuery Plugin

## Getting Started

### 相依檔案

[jQuery 1.6+](http://jquery.com)  
[jQuery UI](http://jqueryui.com)  
(必須包含draggble及resizeable)

### 套件檔案

[CommentOnPhoto.js](https://github.com/apolkingg8/CommentOnPhoto/blob/master/CommentOnPhoto.js)  
套件的js檔案

[CommentOnPhoto.css](https://github.com/apolkingg8/CommentOnPhoto/blob/master/Styles/CommentOnPhoto.css)  
套件的style檔案，也可以直接拿編譯前的CommentOnPhoto.less來做修改

### 使用方法

引入必須檔案(button style預設是使用jqueryui的style，可以在CommentOnPhoto.css中做修改)
```html
    <link rel="stylesheet" href="Styles/CommentOnPhoto.css">
    <link rel="stylesheet" href="Styles/jquery-ui-1.10.3.custom.css">
    <script type="text/javascript" src="Libs/jquery-1.9.1.js"></script>
    <script type="text/javascript" src="Libs/jquery-ui-1.10.3.custom.js"></script>
    <script type="text/javascript" src="CommentOnPhoto.js"></script>
```
給予img一個`data-copid`屬性作為套件索引
```html
<img class="testImage" data-copid="img1" src="Images/10974963553_594b9e8416_o.jpg">
```
初始化  
```js
$('.testImage').COP();
```

## API Document

### Options  
在初始化時用jQueryUI的風格做設定，例如：
```js
var cops = $('.testImg').COP({
    hintText: '在這張圖片上留言'
});
```
下面會列出可使用的options

#### hintText
`String``Defaule:'Comment on this photo...'`  
要在圖片上方提示欄顯示的文字
```js
$('.testImg').COP({
    hintText: '在這張圖片上留言'
});
```
#### btnSubmitText
`String``Post'`  
送出按鈕的顯示文字
```js
$('.testImg').COP({
    btnSubmitText: '張貼'
});
```
#### btnCancelText   
`String``Cancel'`  
取消按鈕的顯示文字
```js
$('.testImg').COP({
    btnCancelText: '取消'
});
```
#### userName   
`Object``Defaule:'{ canEdit: false,name: 'NoName', hint: 'Somebody'}'`  
使用者名稱的相關設定  
`canEdit`: 是否可以輸入使用者名稱  
`name`: 使用者名稱（不開放輸入的情況下）  
`hint`: 使用者名稱欄位的預設值（開放輸入的情況下）
```js
$('.testImg').COP({
    userName: {
        canEdit: false,
        name: 'NoName',
        hint: 'Somebody'
    }
});
```
#### renderComments
`Object``Defaule:'{ onInit: true,afterPost: true}'`  
輸出留言的相關設定  
`onInit`: 在初始化後依據renderData輸出留言  
`afterPost`: 在送出留言後將留言貼至圖片上  

#### renderData
`Object``Defaule:'{}'`  
留言的資料檔案，格式可接受JSON，單一Object（一則留言）或JSON String
```js
[{
    // 單一留言所對應的data object, 可從callback取得
    copid: '', // 對應到的img[data-copid]
    draggableBox: {
        top: '', // 留言的位置
        left: '',
        chooseBox: {
            width: '', // 方框的大小
            height: ''
        },
        commentBox: {
            commentUser: '', // 使用者名稱
            commentText: '' // 留言內容
        }
    },
    image: { // img相關資訊
        src: '',
        name: '',
        ID: '',
        dataObj: {} // Object, img的data tag name-value pair
    }
}]
```
#### callback
`Function``Defaule:function(){}`  
按下張貼按鈕後呼叫的callback function
```js
var test = $('.testImage').COP({
    callback: function(event, stat){
        // do something, like storage
        // stat為此則留言的data, 格式參考上面的renderData
    }
});
```

### Methods
可以在在初始化後使用套件的方法，如下：
```js
var test = $('.testImage').COP();
test.COP('refreshComments', getCookie('copCookie'));
```
#### refreshComments
`format: ('refreshComments', Object renderData, Opion String [copid])`  
更新留言，可選擇只更新部分圖片上的留言
```js
// init before use methods
var test = $('.testImage').COP();
// format: refreshComments(renderData, [copid])
// 更新全部圖片上的留言
test.COP('refreshComments', getCookie('copCookie'));
// 更新圖片data-copid='img1'上的留言
test.COP('refreshComments', getCookie('copCookie'), img1);
```

## Reporting an Issue

如果有發現任何的問題，請Mail給我，或是在Blog上留言

Mail: apolkingg8@gmail.com

Blog: 

## Update Notes

2014-01-11 release beta.

## License

Copyright (c) 2014 apolkingg8  
Licensed under the MIT license.
