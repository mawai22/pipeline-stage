// 获取当前的 sessionStorage中的bread
export function getBread() {
  return JSON.parse(sessionStorage.getItem('bread'));
}

// 在当前 sessionStorage中的 中插入 某一个类目
export function pushBread(name, value) {
  let breatList = getBread();
  let hasItem = breatList.findIndex(item => item.name === name);
  if (hasItem < 0) {
    breatList.push({name: name, value: value})
  } else {
    breatList[hasItem].value = value;
  }
  setBreadList(breatList);
}

// 整体替换 整个 sessionStorage中 bread
export function setBreadList(objArr) {
  sessionStorage.setItem('bread', JSON.stringify(objArr));
}

// 删除某一个 sessionStorage中的项
export function deleteBread(name) {
  let breatList = getBread();
  let hasItem = breatList.findIndex(item => item.name === name);
  if (hasItem < 0) {
    return;
  } else {
    breatList.splice(hasItem, 1);
  }
  setBreadList(breatList);
}
