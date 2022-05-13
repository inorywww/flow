import { Message } from 'element-ui';

export function alertInfo(message, type) {
  Message({
    showClose: true,
    message,
    type,
  });
}
export function base64ToPng(qrBase64, name, type = 'png') {
  const imgUrl = qrBase64
  // 如果浏览器支持msSaveOrOpenBlob方法（也就是使用IE浏览器的时候），那么调用该方法去下载图片
  if (window.navigator.msSaveOrOpenBlob) {
    const bstr = atob(imgUrl.split(',')[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    const blob = new Blob([u8arr])
    window.navigator.msSaveOrOpenBlob(blob, name + '.' + type)
  } else {
    // 这里就按照chrome等新版浏览器来处理
    const a = document.createElement('a')
    a.href = imgUrl
    a.setAttribute('download', name + '.' + type)
    a.click()
  }
}

export function isPoneAvailable (pone) {
  var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (!myreg.test(pone)) {
    return false;
  } else {
    return true;
  }
}

export function isPassword(s){
  var regu = "^[0-9a-zA-Z]{6,16}$"; 
  var re = new RegExp(regu); 
  if (re.test(s)) { 
    return true; 
  }else{ 
    return false; 
  }

}