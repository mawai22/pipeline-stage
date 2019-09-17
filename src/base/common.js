import Vue from 'vue';
export function searchItem(list, key) {
  return list.find(item => item[key] === key);
}

export function dateFormat(val) {
  let date = new Date();
  if (val) {
    date.setTime(val);
  }
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  if (m < 10) {
    m = '0' + m;
  }
  let d = date.getDate();
  if (d < 10) {
    d = '0' + d;
  }
  let h = date.getHours();
  if (h < 10) {
    h = '0' + h;
  }
  let min = date.getMinutes();
  if (min < 10) {
    min = '0' + min;
  }
  let mm = date.getSeconds();
  if (mm < 10) {
    mm = '0' + mm;
  }
  return y + '' + m + '' + d + ' ' + h + ':' + min;
}

export function success(msg) {
  Vue.prototype.$Message.success({
    content: msg,
    duration: 2,
    closable: true
  });
}

export function error(msg) {
  Vue.prototype.$Message.error({
    content: msg,
    duration: 2,
    closable: true
  });
}
