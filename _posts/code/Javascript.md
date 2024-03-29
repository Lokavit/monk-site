﻿---
title: Javascript
date: '2013-07-11'
tags: ['code']
draft: false
---

```js
/**
 佛历计算的方法：将佛降生于公元前623年减去佛寿80岁，得543为佛涅盘年数（佛涅盘于公元前543年）；
2019年加543年是2562年。佛历是2562年4月7日。
到今年佛诞（每年的农历四月初八）起，应增加1年；
如：公元2019年5月12日（农历四月初八），应增加1年，佛历是：2563年4月8日；
计算佛历方法，依此类推。 
佛历/泰历：2566年2月6日
公历/西历：2023年9月17日
农历/阴历：二月初六
*/
function calcBuddhimDate() {
    // '2023癸卯年八月初三星期日 16:19:57'
    // const toCnDate = date => date.toLocaleString('zh-u-ca-chinese', { dateStyle: 'full' }) + ' ' + date.toLocaleTimeString(0, { hour12: false });
    // toCnDate(new Date);
    // ja-JP-u-ca-japanese
    // 'วันอาทิตย์ที่ 17 กันยายน พ.ศ. 2566 16:18:43'
    const toCnDate = date => date.toLocaleString('th-u-ca-thai', { year: "numeric" }) + ' ' + date.toLocaleTimeString(0, { hour12: false });
    const buddhimYear = toCnDate(new Date).split(' ')[1];
    const dateTime = new Date().toLocaleDateString('zh').split('/');
    return {
        date: `${buddhimYear} 年 ${dateTime[1]} 月 ${dateTime[2]} 日`,
        // time: new Date().toLocaleTimeString('zh'),
    }
}
```

```js
// test.js
const Coordinate = function (x, y) {
  this.x = x;
  this.y = y;
};
Coordinate.equals = function (a, b) {/** some code */}
Coordinate.prototype.translate = function (tx, ty) {/** some code */}
export default Coordinate;
```

### 堆、栈、队列
- 堆：存基本类型。(优先队列、堆排序等场景)
- 栈：存引用类型，后进先出。（字符串匹配、数据反转等场景）
- 队列：先进先出。（任务队列）

---

```
浏览器支持import的方式，以Edge/Chrome为例：
1.输入 edge://flags=>搜索js相关。
2.将 Experimental JavaScript 设置为启用。
```

解析器发现非阻塞资源，例如一张图片，浏览器会请求这些资源并且继续解析。当遇到一个 CSS 文件时，解析也可以继续进行，但是对于 <script> 标签（特别是没有 async 或者 defer 属性的）会阻塞渲染并停止 HTML 的解析。尽管浏览器的预加载扫描器加速了这个过程，但过多的脚本仍然是一个重要的瓶颈。


```js
跨页面传值
window.addEventListener('storage', e => {});
```

# js Object

```js
const Person = {
  isHuman: false,
  say() {
    // say:function(){/* do some */}
    // 作用域问题，函数内调用其它属性需要this.
    console.log(`Hello ${this.isHuman}`);
    // 此处若无return，则调用时最后会多输出一个undefined
    return "say()函数的返回值";
  },
};
console.log(Object.create(Person));

const Test = Object.create(Person);
console.log(Test.isHuman);
console.log(Test.say());

/** 创建一个原型为null的空对象。该对象中无任何属性 */
const ObjNull = Object.create(null);
console.log("原型为null的空对象：", ObjNull);
// 报错 Uncaught TypeError: Object prototype may only be an Object or null: undefined
// const ObjNull2 = Object.create();
// console.log('()创建形式:',ObjNull2);

/** 创建一个对象，__proto__: Object */
const ObjProto = new Object();
console.log("new Object()形式创建对象:", ObjProto);
const ObjProto2 = {}; // 控制台看起来与new Object()同样
console.log("{}形式创建对象:", ObjProto2);

function fn() {}
console.dir(fn);
```

# ask

```js
/*
You probably know the "like" system from Facebook and other pages. People can "like" blog posts, pictures or other items. We want to create the text that should be displayed next to such an item.

Implement a function , which must take in input array, containing the names of people who like an item. It must return the display text as shown in the examples:likes :: [String] -> String

likes [] -- must be "no one likes this"
likes ["Peter"] -- must be "Peter likes this"
likes ["Jacob", "Alex"] -- must be "Jacob and Alex like this"
likes ["Max", "John", "Mark"] -- must be "Max, John and Mark like this"
likes ["Alex", "Jacob", "Mark", "Max"] -- must be "Alex, Jacob and 2 others like this"

*/
//
function likes(names) {
  switch (names.length) {
    case 0:
      return "no one likes this";
    case 1:
      return `${names[0]} likes this`;
    case 2:
      return `${names[0]} and ${names[1]} like this`;
    case 3:
      return `${names[0]}, ${names[1]} and ${names[2]} like this`;
    default:
      return `${names[0]}, ${names[1]} and ${
        names.length - 2
      } others like this`;
  }
  return str;
}
```

```js
/**
 * @function 在指定范围内，生成随机不重复指定长度的整数
 * @param {*} len 指定长度
 * @param {*} start 开始值
 * @param {*} end 结束值
 * @example generateRandInt(30, 0, 35);
 */
export function generateRandInt(len, start, end) {
  let temp = [];
  function _inner(start, end) {
    let span = end - start;
    return parseInt(Math.random() * span + start);
  }
  while (temp.length < len) {
    let num = _inner(start, end);
    if (temp.indexOf(num) == -1) {
      temp.push(num);
    }
  }
  return temp;
}
```

## Progressive Web Apps 渐进式网络应用

### App shell 程序外壳

- 尽快加载最小的用户界面并缓存它，以便后续访问可以离线使用.然后加载应用趁墟的所有内容。下次从设备访问时，UI 立即从缓存加载，并从服务器请求新的内容(如果它已在缓存中不可用)
- 用户立即看到内容，而非加载动画或空白页，感觉很快，且可离线。
- 通过 service worker 控制从服务器请求的内容以及从缓存中检索的内容。
- 添加到主屏幕或推送通知，更像原生应用。

```css
/* 响应式布局 */
```

```js
/* app.js */
// 模板字符串
// 注册 service worker
// 点击按钮时请求用户权限，用来向用户推送通知
// 创建通知,随机展示列表中的一个项目

/* sw.js */
// 引入 game.js文件 (也就是数据 数据对象)
self.importScripts("data/games.js");
// 程序对app shell和主体内容(content)里面的数据创建一个缓存列表
// 配置service worker，缓存 列表的工作在此执行
// 如果条件允许，service worker将从缓存中请求content中所需的数据，从而提供离线应用功能
```

### Service Workers

- 是浏览器和网络之间的虚拟代理。正确缓存网站资源并使其在用户设备离线时可用。
- API 是非阻塞的，且可以在不同上下文之间发送和接收通信
- 分配给 SW 一些任务，并在使用基于 Promise 的方法当任务完成时收到结果
- 主要:离线功能、处理通知、在单独的线程上执行繁重的计算
- 控制网络请求，修改网络请求，返回缓存的自定义响应，或合成响应。
- 需使用 HTTPS，使用 web storage 无效，因其不返回 Promise。
- 独立于主线程、在后台运行的脚本。不能直接操纵 dom
- 被 install 后就永远存在，除非被手动卸载
- 可编程拦截请求和返回，缓存文件。sw 可以通过 fetch 这个 api，来拦截网络和处理网络请求，再配合 cacheStorage 来实现 web 页面的缓存管理以及与前端 postMessage 通信。
- 异步实现，sw 大量使用 promise。
- “离线优先”或“缓存优先”模式是向用户提供内容的最流行策略。 如果资源已缓存且可脱机使用，请在尝试从服务器下载资源之前先将其返回。 如果它已经不在缓存中，请下载并缓存以备将来使用。

- service worker 的生命周期
  service worker 从代码的编写，到在浏览器中的运行，主要经过下面几个阶段 installing -> installed -> activating -> activated -> redundant;

installing：这个状态发生在 service worker 注册之后，表示开始安装。在这个过程会触发 install 事件回调指定一些静态资源进行离线缓存。
installed：sw 已经完成了安装，进入了 waiting 状态，等待其他的 Service worker 被关闭（在 install 的事件回调中，可以调用 skipWaiting 方法来跳过 waiting 这个阶段）
activating： 在这个状态下没有被其他的 Service Worker 控制的客户端，允许当前的 worker 完成安装，并且清除了其他的 worker 以及关联缓存的旧缓存资源，等待新的 Service Worker 线程被激活。
activated： 在这个状态会处理 activate 事件回调，并提供处理功能性事件：fetch、sync、push。（在 acitive 的事件回调中，可以调用 self.clients.claim()）
redundant：废弃状态，这个状态表示一个 sw 的使命周期结束

### 版本更新

```js
contentToCache.push("/notes/pwa/js13kpwa/icons/icon-32.png");
// ...
self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open("js13kPWA-v2").then(function (cache) {
      return cache.addAll(contentToCache);
    })
  );
});
```

### 其它用途

可以把比较耗时的计算从主线程中提取出来，在 SW 中计算完成，从 SW 中取得计算结果；可以在 SW 中对即将使用的资源进行预加载。

### 从设备启动

- js13kpwa.webmanifest：清单文件，列举网站所有信息

```html
<link rel="manifest" href="js13kpwa.webmanifest" />
```

## WebComponents 另一种使用方式

- 尝试将 WebComponents 的类组件形式，实现 Modal 的类形式
- 如果以上成立，则可以将页面组件拆分，分别以类的形式实现
- 最终页面为拼接类组件形式展现

## 原生实现 状态管理

- 订阅发布/观察者模式 当对象的某种状态发生改变,所有依赖它的对象都将得到通知,触发已经注册的事件

### Generator

```js
/** 封装了一个异步操作，该操作先读取一个远程接口，然后从 JSON 格式的数据解析信息 */
function* gen() {
  const URL = `https://api.github.com/users/Lokavit`;
  // 启动生成器之后就开始请求数据
  let result = yield fetch(URL);
  console.log("* gen() result:", result);
  let res = yield result.json();
  // console.log("yield result.json() :", result.json());
  // let res = yield result;
  // 从第二次调用 next(data)中输出指定结果，
  console.log("请求结果:", result.name);
}
// 执行以上生成器函数 获取遍历器对象
let g = gen();
// 执行异步任务的第一阶段。相当于启动 gen()生成器
let result = g.next();
console.log("result:", result); // 1.最先输出该语句
// 继续向下执行 .value中是一个promise，所以在.then中调用下一个next()方法
result.value
  .then(function (data) {
    return data.json();
  })
  .then(function (data) {
    // 2. 其次输出该语句
    console.log("data:", data);
    // 表示执行 gen()生成器 的
    g.next(data);
  });
```

---

```js
// Intl.DateTimeFormat() constructor
/** 将 2020-07-30T04:00:00Z 转换为 2020年7月30日 */
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
console.log(formatDate(new Date())); // 2020年7月30日
```

### classList

```html
<div id="el"></div>
<script>
  const el = document.querySelector("#el");
  // Add a class
  el.classList.add("open");

  // Add many classes
  el.classList.add("this", "little", "piggy");
  let classes = ["is-message", "is-warning"];
  el.classList.add(...classes);

  // Remove a class
  el.classList.remove("open");

  // Remove multiple classes
  el.classList.remove("this", "little", "piggy");

  // Loop over each class
  el.classList; // DOMTokenList (pretty much an array)
  el.classList.forEach((className) => {
    // don't use "class" as that's a reserved word
    console.log(className);
  });
  // $0.classList 从控制台更新其属性
  for (let className of $0.classList) {
    console.log(className);
  }

  el.classList.length; // integer of how many classes there are

  // Replace a class (replaces first with second)
  el.classList.replace("is-big", "is-small");

  // Toggle a class (if it's there, remove it, if it's not there, add it)
  el.classList.toggle("open");
  // Remove the class
  el.classList.toggle("open", false);
  // Add the class
  el.classList.toggle("open", true);
  // Add the class with logic
  el.classList.toggle("raining", weather === "raining");

  // Check if element has class (returns true or false)
  el.classList.contains("open");

  // Look at individual classes <div class="hot dog">
  el.classList.item(0); // hot
  el.classList.item(1); // dog
  el.classList.item(2); // null
  el.classList[1]; // dog
</script>
```

```js
let btn = document.querySelector(".btn");
console.log(btn.classList);
// ["btn", "show", value: "btn show"]

console.log(btn.classList[1]); // show

// 向元素添加一个或多个类
btn.classList.add("xxx", "yyy");
// 元素中是否存在指定类
console.log(btn.classList.contains("show")); // true
// 获取指定索引的类
console.log(btn.classList.item(2)); // yyy
// 向元素移除一个或多个类
btn.classList.remove("show", "make", "me");

// 切换 toggle
if (btn.classList.contains("yyy")) {
  btn.classList.remove("xxx");
} else {
  btn.classList.add("show");
}

/** 点击按钮，如果没有test就加上，有就移除test */
btn.addEventListener("click", () => {
  btn.classList.toggle("test");
});

// 使用展开语法添加或移除多个类值
const cls = ["foo", "bar"];
btn.classList.add(...cls);
btn.classList.remove(...cls);

// 将类值 "foo" 替换成 "bar"
btn.classList.replace("foo", "bar");
```

# String

- 字符串处理相关工具速查

## fileName

```js
/**
 * fileName.md => fileName
 */
let str = "fileName.md";
str = str.subString(0, str.lastIndexOf(".")); // fileName

// 转驼峰后，首字母转大写。移除末尾扩展名
upperFirst(camelCase(str));
```

### 文件名提取

```js
let fileName = "./Material/ListMaterial.vue";
// 先将最后一个斜杠前面剔除，再从下标0开始，至上一步截取的结果中，剔除后缀名部分
// 最终返回： ListMaterial
fileName
  .substring(fileName.lastIndexOf("/") + 1, fileName.length)
  .substring(
    0,
    fileName
      .substring(fileName.lastIndexOf("/") + 1, fileName.length)
      .lastIndexOf(".")
  );
```

## upperFirst

```js
/**
 * 首字母转大写
 * @param {String} str 需处理字符串
 * use:upperFirst("abc")
 * result: Abc
 */
export function upperFirst(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
}
```

## camelCase

```js
/**
 * 字符串转驼峰
 * @param {String} str 需处理的字符串
 * use:camelCase("ab-cd-ef")
 * result:abCdEf
 */
export function camelCase(str) {
  let arr = str.split("");
  if (arr[0] == "-") {
    arr.splice(0, 1);
  }
  for (let i = 0, len = arr.length; i < len; i++) {
    if (arr[i] == "-") {
      arr.splice(i, 1);
      arr[i] = arr[i].toUpperCase();
    }
  }
  return arr.join("");
}
```

## getToURL

```js
console.log("请求拦截中的url：", config.url);
console.log("请求拦截中的params:", config.params);
if (config.params != undefined) {
  // 转为键值对数组形式 ,然后使用 reduce 将其拼接，最后替换掉第一个'&'为'?'
  let result = Object.entries(config.params)
    .reduce((prev, curr) => {
      return prev + ("&" + curr[0] + "=" + curr[1]);
    }, "")
    .replace("&", "?");
  console.log("处理完毕的params转url:", result);

  config.url = config.url + result;
}
```

```js
// 排列算法，n中m个元素。m不能大于n
// n! 就是 n(n-1)(n-2)(n-3)……(n-m+1)
// 如：7个人拍成一列，有几种排法？因每人都可以移动，所以是a的下7上7 =

/*
在数学中有排列组合，用来计算概率。

比如：从4个数字中，任意选择两个的情况。从5个数字中任意选择3个数字的情况。（这里我们只考虑没有顺序的情况）。

公式：C(n,m)=n!/[m!(n-m)!]=n*(n-1)*...*(n-m+1)/[1*2*...*m],如C(5,2)=[5*4]/[1*2]=10.

举例说明：有 1,2,3,4 四个数字，从这四个数字中，任意选择两个数字一共有多少种情况：[1,2], [1,3], [1,4], [2,3], [2,4], [3,4]一共有这六种情况。

下面用代码实现从5个数字中任意选择3个的情况(不考虑顺序)。
 */

var array = [1, 2, 3, 4, 5];
for (var i = 0, len1 = array.length; i < len1; i++) {
  var a2 = array.concat();
  /*
    排除之前已经组合过的数据
    比如：第一次的时候，i[0] = 1, 这个时候2层循环, 只循环 2~5, 
    第二次的时候, i[1] = 2, 这个时候2层循环, 只循环 3~5
    同理：3层循环也是相比于2层循环来
    */
  a2.splice(0, i + 1);
  for (var j = 0, len2 = a2.length; j < len2; j++) {
    var a3 = a2.concat();
    a3.splice(0, j + 1);
    for (var k = 0, len3 = a3.length; k < len3; k++) {
      console.log(array[i] + " " + a2[j] + " " + a3[k]);
    }
  }
}

// 组合算法。

// 数据库的传统集合运算（并、差、交、笛卡尔积）和专门的关系运算（选择、投影、连接、除运算）

// SKU 笛卡尔积

// 将数组添加到另一个数组
let array = ["a", "b"];
let elements = [0, 1, 2];
array.push.apply(array, elements);
// console.info(array); // ["a", "b", 0, 1, 2]

// 数组求和
let arr = [1, 2, 3, 4, 5];
// 方式一
let result = arr.reduce((sum, current) => sum + current, 0);
// alert(result); // 15
// 方式二
arr.reduce((prev, current) => {
  return prev + current;
}, 0);

// eval() 函数会将传入的字符串当做 JavaScript 代码进行执行
// 比其他替代方法更慢，因为它必须调用 JS 解释器。慎用
// console.log("SUM:", eval(arr.join("+")));

// 根据输入值，输出该值所在范围

/**
 * 业务中独立的变量转化成数组和对象结构
 * 数组多重对比，确定所属范围的逻辑,根据毫秒数，返回颜色值
 * 绿：0-30mm ； 黄：30-100mm ； 橙：100-250mm； 红：>250mm
 */
let datas = [
  {
    time: 30,
    color: "normal",
  },
  {
    time: 100,
    color: "orange",
  },
  {
    time: 250,
    color: "yellow",
  },
];

// 再通过高效的api进行处理
function iconFilter(num, data) {
  if (num < 0) return;
  let selectData = data.find((item) => num <= item.time);
  return selectData ? selectData.color : "red";
}
// console.log(iconFilter(88, datas));

// 数组对象比较
/* 以数据中的 [baseEntry] 及 [baseLineId] 作为判定 */
let table = [
  {
    baseEntry: 2,
    baseLineId: 2,
    id: 2,
    itemCode: "B00002",
    itemDescription: "或天戟",
    quantity: 1,
    openQuantity: 1,
  },
  {
    baseEntry: 3,
    baseLineId: 3,
    id: 3,
    itemCode: "B00002",
    itemDescription: "或天戟",
    quantity: 9,
    openQuantity: 9,
  },
];
let args = [
  {
    baseEntry: 2,
    baseLineId: 2,
    id: 2,
    itemCode: "B00002",
    itemDescription: "或天戟",
    quantity: 1,
    openQuantity: 1,
  },
  {
    baseEntry: 3,
    baseLineId: 4,
    id: 4,
    itemCode: "B00004",
    itemDescription: "计都刀",
    quantity: 7,
    openQuantity: 7,
  },
];

/**
 * 暂存 每次向导操作完成后，带过来的[args]数据集
 * map一下 args ，于 table中find 基本[baseEntry]单据编号相同，[baseLineId]基本行号相同，则认为是重复数据
 * 若find为 undefind ，则将该项，push到temp ，最后为数组，添加到 table
 */
let temp = []; // 暂存满足条件的数据
args.map((argsItem) => {
  // 根据条件查找 ： 单项数据的基本[baseEntry]单据编号相同，并且[baseLineId]基本行号相同，则认为是重复数据
  if (
    table.find(
      (item) =>
        item.baseEntry === argsItem.baseEntry &&
        item.baseLineId === argsItem.baseLineId
    ) == undefined
  ) {
    // console.log(`ArgsITEM:${argsItem.baseEntry},${argsItem.baseLineId}`);
    temp.push(argsItem);
  }
});
// apply() 方法调用一个具有给定this值的函数，以及作为一个数组（或类似数组对象）提供的参数。
table.push.apply(table, temp);

// 合并数组对象相同 KEY 的值
// 测试比较数组对象， 相同key相加
let res = [
  {
    id: "B00001",
    batches: [
      {
        name: "A1",
        count: 3,
      },
      {
        name: "A2",
        count: 6,
      },
      {
        name: "A1",
        count: 9,
      },
      {
        name: "B1",
        count: 6,
      },
      {
        name: "A1",
        count: 12,
      },
    ],
  },
  {
    id: "B00002",
    batches: [
      {
        name: "B1",
        count: 4,
      },
      {
        name: "B2",
        count: 5,
      },
      {
        name: "B1",
        count: 6,
      },
      {
        name: "A1",
        count: 12,
      },
    ],
  },
];
for (let i = 0; i < res.length; i++) {
  if (!res[i].batches) continue;
  let newRES = [];
  // 用于确定一个 cur ，作为key值的判定条件
  res[i].batches.reduce((pre, cur) => {
    let temp = res[i].batches
      // 过滤 返回， key值相同的批次数据集
      .filter((i) => i.name === cur.name)
      // 计算上一步结果数据集中，指定属性的值合并结果
      .reduce((p, c) => {
        // 将其返回为一个新的对象
        return {
          name: p.name,
          count: p.count + c.count,
        };
      });
    // 如果新数组中，找不到key值相同的元素，
    if (newRES.find((i) => i.name === temp.name) == undefined) {
      // 将该元素，添加到 新数组
      newRES.push(temp);
    }
  }, 0);
  // 将处理好的新数组，赋值给当前数据中的批次数据集
  res[i].batches = newRES;
}
// console.log("RES:", res);

// 数组完全展开，代替 flat不支持的情况
function myFlat(arr) {
  while (arr.some((t) => Array.isArray(t))) {
    arr = [].concat.apply([], arr);
  }
  return arr;
}
let arrTest1 = [1, [2, 3, [4]], 5, 6, [7, 8], [[9, [10, 11], 12], 13], 14];
// Expected Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
// console.log(myFlat(arrTest1));

/** chrome 69以上才支持 */
let arr1 = [1, 2, [3, 4]];
// console.log("数组拍平", arr1.flat()); // 数组拍平，一层
let arr2 = [1, 2, [3, [4, 5]]];
// console.log("数组拍平", arr2.flat(2)); // 数组拍平多层
let arr3 = [1, [2, [3, [4]]]];
// console.log("数组降维", arr3.flat(Infinity)); //数组拍平无限层级

/**
 * 对比两个对象是否相等
 * @param {*} obj1 对象1
 * @param {*} obj2 对象2
 */
export function equalObject(obj1, obj2) {
  // 类型对比
  if (!(obj1 instanceof Object) || !(obj2 instanceof Object)) return false;
  // obj.toString() 效果与上相同 [object object]，但[↑返回true/false]，[↓返回string]
  // if (!obj1.toString() || !obj2.toString()) return false;
  // 长度对比
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
  // 每个key对比
  return Object.keys(obj1).every((v) => obj1[v] === obj2[v]);
}

let obj1 = {
  a: "1",
  b: "2",
};
let obj2 = {
  b: "2",
  a: "1",
};
// console.log(equalObject(obj1, obj2));

/**
 * 字符串转数组 将文章名字按照一个数字一位，进行转换，如10转换为['1','0']
 * @param {*} value 传入的字符串，将其切分为数组
 */
const stringToArray = (value) => value.split("");

/**
 * 数组转字符串，如['一','〇']转换为一〇
 * @param {*} value
 */
const arrayToString = (value) => value.join("");

/**
 * 数字转为汉字
 * @param {*} value 传入的数字，只接收单个数字
 */
const numberToString = (value) => {
  // console.log("传入的数字:", value); // 切分为单个数字
  let result = "";
  switch (value) {
    case "0":
      result = "〇";
      break;
    case "1":
      result = "一";
      break;
    case "2":
      result = "二";
      break;
    case "3":
      result = "三";
      break;
    case "4":
      result = "四";
      break;
    case "5":
      result = "五";
      break;
    case "6":
      result = "六";
      break;
    case "7":
      result = "七";
      break;
    case "8":
      result = "八";
      break;
    case "9":
      result = "九";
      break;
    default:
      return;
  }
  // console.log('转换后的值：', result);
  return result;
};

/**
 * 切割文件后缀名
 * @param {*} value 需切割的文件名(含后缀名)
 */
const excisionFileExtension = (value) =>
  value.substring(0, value.lastIndexOf("."));

/** 数据格式，后台返回为:{name:"1.md",download_url:"https://raw.githubusercontent.com"}
 * 文件名切割，对象中添加id，值为文件名；添加一个转换后的汉字数字
 * 根据 item.id排序后显示
 */

const tempCurry = (name) => (download_url) =>
  `Name:${name} | download_url:${download_url}`;
console.log(`输出:`, tempCurry("aa")("bb"));

resultData.map((item) => tempCurry(item.name)(item.download_url));
console.log("新的数据结果：", resultData);
```

## 2020.10.19

- 组合模式(把方法提取到独立的类和辅助对象中，然后组合起来，但不使用继承) 组合胜过继承

### 类

- 定义不能提升，受块作用域限制
- 类继承：继承类，也可继承普通构造函数

### 继承

- 原型链继承 (缺点:原型包含引用值会在所有实例间共享)
- 盗用构造函数(缺点:必须在构造函数中定义方法，函数不能重用)
- 组合继承（综合以上两种的优点）(缺点:被继承对象的实例属性重复调用)
- 原型式继承 (Object.create()适合无需单独创建构造函数,又需对象间共享信息)
- 寄生式继承
- 寄生式组合继承，实现基于类型继承的最有效的方式

```js
/** 寄生式组合继承 */
/**
 * 不通过调用父类构造函数为子类原型赋值，取得父类克原型副本
 * childC :子类构造函数
 * parentC:父类构造函数
 */
function inheritPrototype(childC, parentC) {
  // 创建对象 创建父类原型副本
  let prototype = Object(parentC.prototype);
  // 增强对象 设置constructor属性，解决重写原型导致constructor丢失问题
  prototype.constructor = childC;
  // 赋值对象 新创建的对象赋值给子类型的原型
  childC.prototype = prototype;
}
function Demo(val) {
  this.val = val;
  this.colors = ["red", "aqua", "blue"];
}
Demo.prototype.fun = function () {
  console.log("this.val:", this.val);
};
function Demo2(val, val2) {
  //继承属性 或者 Demo.apply(this,val)
  Demo.call(this, val);
  this.val2 = val2;
}
// 调用子类型原型赋值函数
inheritPrototype(Demo2, Demo);

Demo2.prototype.fun2 = function () {
  console.log("this.val2:", this.val2);
};

let instance1 = new Demo2("satya", 1);
instance1.colors.push("black");
console.log("colors:", instance1.colors);
instance1.fun();
instance1.fun2();

let instance2 = new Demo2("lokavit", 3);
console.log("colors:", instance2.colors);
instance2.fun();
instance2.fun2();
```

```js
/** 组合继承 */
function Demo(val) {
  this.val = val;
  this.colors = ["red", "aqua", "blue"];
}
Demo.prototype.fun = function () {
  console.log("this.val:", this.val);
};
function Demo2(val, val2) {
  //继承属性 或者 Demo.apply(this,val)
  Demo.call(this, val);
  this.val2 = val2;
}
// 继承方法
Demo2.prototype = new Demo();
Demo2.prototype.fun2 = function () {
  console.log("this.val2:", this.val2);
};

let instance1 = new Demo2("satya", 1);
instance1.colors.push("black");
console.log("colors:", instance1.colors);
instance1.fun();
instance1.fun2();

let instance2 = new Demo2("lokavit", 3);
console.log("colors:", instance2.colors);
instance2.fun();
instance2.fun2();
```

### 创建对象

- 原型模式

```js
function Demo() {}
let Demoo = function () {};

// 避免 Object.setPrototypeOf()造成的性能下降，改为创建对象并指定原型
let demo1 = { a: 1 };
let demo2 = Object.create(demo1);
demo2.b = "val";
console.log(Object.getPrototypeOf(demo2) === demo1);

// 原型语法
function Demo3() {}
Demo3.prototype.a = "val-a";
Demo3.prototype.fun = function () {
  console.log("a:", this.a);
};

// 其他原型语法
function Demo4() {}
Demo4.prototype = {
  // constructor:Demo4, // [[enumerable]]:true
  a: "val-a",
  fun: function () {
    console.log("a:", this.a);
  },
};
// 追加恢复constructor
Object.defineProperty(Demo4.prototype, "constructor", {
  enumerable: false,
  value: Demo4,
});
```

- 创建对象 构造函数模式

```js
function Demo(a, b, c) {
  this.a = a;
  this.b = b;
  this.c = c;
  // 该函数可以定义在外部
  this.fun = function () {
    console.log(this.a);
  };
  this.fun2 = fun2;
}
function fun2() {
  console.log(this.a);
}

let demo = new Demo("vala", "valb", "valc");
demo.fun();

let Demo2 = function Demo(a, b, c) {
  this.a = a;
  this.b = b;
  this.c = c;
  this.fun = function () {
    console.log(this.a);
  };
};
// 构造函数
let demo2 = new Demo2("vala", "valb", "valc");
demo2.fun();

// 作为函数调用，添加到window对象
Demo2("a-val", "b-val", "c-val");

/**
 * 在另一个对象的作用域调用
 * 对象o为Demo2内部的this值，执行后所有属性和方法会添加到对象o上。
 */
let o = new Object();
Demo2.call(o, "a-val", "b-val", "c-val");
o.fun();
```

## DOM 操作

### 选择器

- Element.querySelector()
- Element.closest()
- Element.matches()

## 字符串处理

### String Format

```js
/* 按照指定位数及指定分隔符进行分割 */
const STRING_FORMAT = (s, sp, sep) => {
  sp = sp || 3;
  sep = sep || ",";
  var i = s.length % sp,
    r = i ? [s.slice(0, i)] : [];
  for (; i < s.length; i += sp) {
    r.push(s.substr(i, sp));
  }
  return r.join(sep);
};

/* 使用方式 */
STRING_FORMAT("315576000"); // '315,576,000'
STRING_FORMAT("315576000", 2, " "); // '3 15 57 60 00'
STRING_FORMAT("315576", 1, "-"); // '3-1-5-5-7-6'
```

### HTMLSTRING TO DOM

#### 按照性能

- document.createDocumentFragment()一次添加多节点
- Range.createContextualFragment()•优胜者（最快在火狐）
- Element.insertAdjacentHTML()•优胜者
- Element.innerHTML•优胜者
- DOMParser.parseFromString()•慢 90%

#### document.createDocumentFragment()

```js
const htmlToElement = (html) => ({
  /* ... */
});
const fragment = document.createDocumentFragment();
items.forEach((item) => {
  const node = htmlToElement(`<div>${item.name}</div>`);
  fragment.appendChild(node);
});
document.body.appendChild(fragment);
```

#### Range.createContextualFragment()

```js
const table = document.createElement(`table`);
const tbody = document.createElement(`tbody`);
table.appendChild(tbody);

const range = document.createRange();
range.selectNodeContents(tbody);
const node = range.createContextualFragment(`<tr><td>Foo</td></tr>`); //=> tr

//
const template = document.createElement("template");
template.innerHTML = `<tr><td>Foo</td></tr>`;
const node = template.content.firstElementChild; //=> tr
```

#### Element.insertAdjacentHTML()

```js
// 原为 <div id="one">one</div>
var d1 = document.getElementById("one");
d1.insertAdjacentHTML("afterend", '<div id="two">two</div>');
// 此时，新结构变成：
// <div id="one">one</div><div id="two">two</div>

// 将指定的文本解析为 Element 元素，并将结果节点插入到DOM树中的指定位置
el.insertAdjacentHTML("beforebegin", string_of_html);
el.insertAdjacentHTML("afterbegin", string_of_html);
el.insertAdjacentHTML("beforeend", string_of_html);
el.insertAdjacentHTML("afterend", string_of_html);
```

#### DOMParser.parseFromString()

```js
// HTML字符串转dom,t
let dom = new DOMParser().parseFromString(string_of_html, "text/html");
```

---

### getComputedStyle()

```js
/**
 * 获取指定元素对应CSS属性的最终计算值。只读
 *  @param {*} element 指定的元素
 *  @param {*} pseudoElt 可选。表示指定元素的伪元素(:before、:after等)
 */
window.getComputedStyle(element, [pseudoElt]);
window.getComputedStyle(first, null);
window.getComputedStyle(first, ":before");

/** 小封装一下，便于使用
 * 检查元素中是否有style的指定属性
 * @param {*} el 需检查的指定元素
 * @param {*} attr 元素中style的指定属性
 * @return 返回属性值
 */
const CHECK_STYLE = (el, attr) => {
  let attr_value = getComputedStyle(el, null)[attr];
  // 如果没有该属性样式值 或者属性样式值是'static',返回 ""，否则返回属性值
  return !attr_value || attr_value === "static" ? "" : attr_value;
};
```

```js
// 假设 .css文件中 html{--color-accent: #00eb9b;}
const colorAccent = getComputedStyle(document.documentElement).getPropertyValue(
  "--color-accent"
); // #00eb9b
```

---

```js
/**
 * 创建dom元素 [隐式return写法]
 * @param {*} element 元素名
 * return:根据传入的元素名，返回创建的元素
 * use:createElement('div');
 */
export const createElement = (element) => document.createElement(element);

/**
 * 创建Input 元素，设定其必要属性
 * @param {*} name 元素的name属性值(外部传入)
 * @param {*} text 元素的提示明文(外部传入)
 */
export const createInput = (name, text) => {
  let _input = createElement("input");
  // _input.type = "text"; // input类型
  _input.name = name; // name属性
  _input.required = "required"; // 校验
  _input.placeholder = `请输入${text}`; // 输入提示
  _input.style.marginLeft = "20px"; // input的外左边距
  return _input; // 返回创建的元素
};

/**
 * 创建Label 元素，设定必要属性
 * @param {*} text 元素的明文(外部传入)
 */
export const createLabel = (text) => {
  let _label = createElement("label");
  _label.innerHTML = `${text}`;
  _label.style.paddingRight = "20px"; // label的内右边距
  return _label;
};

/** form.js */
/** 表单序列化
 * 获取form下所有输入值，最终输出为JSON对象
 * @param {*} formName 表单的name属性值
 * @return JSON对象，用于POST提交的body
 */
export function serializeForm(formName) {
  // let formData = {}; // 用于存储序列化的JSON对象
  // 利用 FormData 对象获取 roleForm 提交内容
  const formData = new FormData(formName);
  // // 这是一种取值的方式。具体如何组织内容，此处不展开
  // console.table([...formData.entries()]);
  // 获取所有 当前表单中，所有 label 标签。返回结果为类数组形式
  let allLabel = formName.getElementsByTagName("label");
  console.log("所有LABEL:", allLabel);
  let infoData = []; // 用于存储info数组对象
  /**
   * 将类数组转数组，而后遍历
   * 参数一:待转换类数组
   * 参数二:在集合中每个项目上调用的函数。即将遍历函数作为参数二使用。
   * 也可写作:Array.from(allLabel).forEach((item,index)=>{some code ……})
   */
  Array.from(allLabel, (item, index) => {
    // 每个label的明文内容，其下input的 name属性值，以及其value
    // console.log(`ITEM内容:${item.textContent},其第一个子元素input的name属性值:${item.firstElementChild.name},及value:${item.firstElementChild.value}`);
    // 如果是名字项
    if (item.firstElementChild.name == "name") {
      // 最终返回表单对象的name属性，赋值为当前项的value
      formData.name = item.firstElementChild.value;
    }
    // 如果 input的name属性值，包含[info_]字符串，将他们存为一个数组对象
    if (item.firstElementChild.name.indexOf("info_") > -1) {
      console.log(`找到包含info_前缀的:${item.firstElementChild.name}`);
      infoData.push({
        key: item.textContent, // "年龄",即label的明文
        value: item.firstElementChild.value, //
      });
    }
  });

  console.table(infoData);
  formData.info = infoData;

  // formData = {
  //     // name: formName.name.value,
  //     // info: [{
  //     //     key: config.role.info[0].key,
  //     //     value: formName.info_0.value,
  //     // }, {
  //     //     key: config.role.info[1].key,
  //     //     value: formName.info_1.value
  //     // }]
  //     // infoData,
  // }

  console.log("表单数据:", formData);
  return formData;
}

/** modal.js */
class Modal {
  constructor() {}

  /**
   * 创建一个弹层，展示章节具体内容
   * @param {*} data modal中显示的内容
   */
  createModal(data) {
    let modalMask = document.createElement("div"); // modal遮罩
    modalMask.setAttribute("class", "modal_mask"); // 遮罩样式
    modalMask.setAttribute("id", "modal"); // 遮罩id
    modalMask.style.display = "block"; // 遮罩块级

    let modal = document.createElement("div"); // modal整体
    modal.setAttribute("class", "modal"); // modal整体样式

    let modalHeader = document.createElement("header"); // modal 头部
    let cwordCount = document.createElement("label"); // header 字数统计部分
    cwordCount.innerText = `字数:${data.length}`; // 此处调用字数统计函数，
    modalHeader.appendChild(cwordCount);
    let close = document.createElement("span"); // 头部右侧关闭按钮
    close.innerText = "X";
    close.onclick = (event) => {
      closeModal(); // 点击按钮，调用关闭事件
    };
    modalHeader.appendChild(close);
    let modalBody = document.createElement("main"); // 内容主体
    modalBody.setAttribute("class", "scrollbar"); // 主体下超长隐藏所需div
    let scrollbarInsetDiv = document.createElement("div"); // 主体下超长隐藏所需div 之内层div
    scrollbarInsetDiv.setAttribute("class", "scrollbar_inset_div");
    let modalSection = document.createElement("section"); // 实际渲染的文章内容区域
    modalSection.innerText = data; // 请求的文章内容，原样输出 [innerHTML则会改格式]

    scrollbarInsetDiv.appendChild(modalSection);
    modalBody.appendChild(scrollbarInsetDiv);
    modal.appendChild(modalHeader);
    modal.appendChild(modalBody);

    modalMask.appendChild(modal);
    document.body.appendChild(modalMask);
  }
}

export default new Modal();

/**
 * 关闭 模态框 事件
 */
function closeModal() {
  let modal = document.getElementById("modal");
  modal.style.display = "none";
  modal.parentElement.removeChild(modal); // 找到modal父级，删除modal节点
}

/** util.js */
/**
 * 切割文件后缀名
 * @param {*} value 需切割的文件名(含后缀名)
 */
export const excisionFileExtension = (value) =>
  value.substring(0, value.lastIndexOf("."));

/**
 * 字符串转数组 将文章名字按照一个数字一位，进行转换，如10转换为['1','0']
 * @param {*} value 传入的字符串，将其切分为数组
 */
export const stringToArray = (value) => value.split("");

/**
 * 数组转字符串，如['一','〇']转换为一〇
 * @param {*} value 待转换的数组
 */
export const arrayToString = (value) => value.join("");

/**
 * 将数组元素反转
 * @param {*} value 待反转的数组
 */
export const arrayReverse = (value) => value.reverse();

/**
 * 数字转为汉字 0-9=> 〇-九
 * @param {*} value 传入的数字，只接收单个数字
 */
export const numberToString = (value) => {
  console.log("传入的数字:", value); // 切分为单个数字
  let result = "";
  switch (value) {
    case "0":
      result = "〇";
      break;
    case "1":
      result = "一";
      break;
    case "2":
      result = "二";
      break;
    case "3":
      result = "三";
      break;
    case "4":
      result = "四";
      break;
    case "5":
      result = "五";
      break;
    case "6":
      result = "六";
      break;
    case "7":
      result = "七";
      break;
    case "8":
      result = "八";
      break;
    case "9":
      result = "九";
      break;
    default:
      return;
  }
  console.log("转换后的值：", result);
  return result;
};

/**
 * 产生随机整数，包含下限值，包括上限值
 * @param {Number} lower 下限
 * @param {Number} upper 上限
 * @return {Number} 返回在下限到上限之间的一个随机整数
 */
export function randomIntNumber(lower, upper) {
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

/**
 * 生成随机值
 * @param {*} data 可以随机的数组
 * return: 数组中，随机值的那个元素值
 */
export function genterateRandomString(data) {
  if (!data.length) return;
  return data[randomIntNumber(0, data.length - 1)];
}

/**
 * 返回随机值下标的字符
 * @param {*} data 字符串
 * return:下标所指的字符
 */
export function genterateRandomChar(data) {
  if (!data) return;
  return data.charAt(randomIntNumber(0, data.length - 1));
}

/**
 * 处理文件名，去掉后缀名
 * @param {*} name 传入的文件名(含后缀名)
 * return: 去掉后缀名的文件名
 */
export function fileName(name) {
  return name.substring(0, name.lastIndexOf("."));
}

/**
 * 颜色随机
 * return: 返回一个随机颜色值
 */
export function randomColor() {
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += ((Math.random() * 16) | 0).toString(16);
  }
  return color;
}

/**
 * 对比两个对象是否相等
 * @param {*} obj1 对象1
 * @param {*} obj2 对象2
 */
export function equalObject(obj1, obj2) {
  // 类型对比
  if (!(obj1 instanceof Object) || !(obj2 instanceof Object)) return false;
  // obj.toString() 效果与上相同 [object object]，但[↑返回true/false]，[↓返回string]
  // if (!obj1.toString() || !obj2.toString()) return false;
  // 长度对比
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
  // 每个key对比
  return Object.keys(obj1).every((v) => obj1[v] === obj2[v]);
}
```

- 动态生成

```js
const Systems = [
  {
    folder: "article",
    title: "ESSAY",
    name: "随笔",
  },
  {
    folder: "game",
    title: "GAME",
    name: "游戏",
  },
  {
    folder: "article",
    title: "FICTION",
    name: "小说",
  },
  {
    folder: "script",
    title: "SCRIPT",
    name: "剧本",
  },
  {
    folder: "design",
    title: "DESIGN",
    name: "设计",
  },
  {
    folder: "example",
    title: "EXAMPLE",
    name: "示例",
  },
];

let nav_systems = document.querySelector(".nav_system");

Systems.forEach((item) => {
  let system_item = `
    <section data-folder="${item.folder}">
       <span class="box-title">${item.title}</span>
       <div class="hsl">
           <h1>${item.name}</h1>
       </div>
   </section>
   `;
  nav_systems.innerHTML += system_item;
});

/** 获取页面所有子系统 */
Array.from(nav_systems.children).forEach((nav_item) => {
  nav_item.onclick = function () {
    // 每次点击时，优先清理缓存的书籍信息
    localStorage.removeItem("system");
    /** 跳转到指定页面 */
    location.href = `./system/${nav_item.dataset.folder}/index.html`;
    // 重新缓存选中的书籍信息
    localStorage.setItem(
      "system",
      nav_item.firstElementChild.textContent.toLowerCase()
    );
  };
});
```

# Temp Note

```js
function fn() {}
console.dir(fn); // prototype __proto__
const fn2 = (a, b) => console.log(a + b);
console.dir(fn2); // __proto__
// 由上可知:箭头函数没有prototype。不是函数构造函数，不能用作原型
```

```js
/**
 * 创建prototype的新实例
 * 使用 new 的语法
 * 1. 函数调用构造函数
 * 2.new object{} 已创建
 * 3. __proto__ 已添加
 * 4. props已添加(可选)
 * 5. 对象由构造函数返回
 * @param {*} props
 */
function CivilPlane(props) {
  console.log(this); // {__proto__:...}
  console.log(this.__proto__); // CiviPlane.prototype
  this.numberOfSeats = props.numberOfSeats;
  console.log(this); // {numberOfSeats:...,__proto__:...}

  /** 不要这样写。该方法将添加到原型每个实例中 */
  //   this.seatsInfo = function () {
  //     console.log(`?${this.numberOfSeats}`);
  //   };
}

/** 此为，正确将方法添加到原型的方式
 * 注:此方式不可写为箭头函数形式,会发生undefined(因箭头函数会this到window)
 */
CivilPlane.prototype.seatsInfo = function () {
  console.log(this); // 原型实例
  console.log(`?${this.numberOfSeats}`);
};

CivilPlane.prototype.modifySeatsNumber = function (newSeatsOty) {
  this.numberOfSeats = newSeatsOty;
};

const propsForSmallPlane = {
  numberOfSeats: 5,
};
const smallPlane = new CivilPlane(propsForSmallPlane);
console.log(smallPlane);
console.log(smallPlane.__proto__ === CivilPlane.prototype); // true
console.log(smallPlane.seatsInfo());
smallPlane.seatsInfo(); // 5
smallPlane.modifySeatsNumber(7); // 7
smallPlane.seatsInfo(); // 7
smallPlane.numberOfSeats = 9; // 直接改变其值

const propsForLagePlane = { numberOfSeats: 333 };
const lagePlane = new CivilPlane(propsForLagePlane);

const Parent = {
  type: "Parent",
  typeInfo: function () {
    console.log(`form ${this.type}`);
  },
  modifyType: function (newType) {
    this.type = newType;
  },
};
console.log(Parent.type); // "Parent"
Parent.typeInfo(); // form Parent
console.log(Parent.prototype); // undefined

/** 这样创建的child __proto__是Parent相关 */
const child = Object.create(Parent);
console.log(child.__proto__ === Parent); // true
child.typeInfo(); // from Parent
child.type = "Child"; //Child
child.typeInfo(); // from Child
child.modifyType("Modified Child");
console.log(child.type); // Modified Child
child.typeInfo(); // from Modified Child

// 17节 原型链

// 21节 instanceof typeof
smallPlane instanceof CivilPlane; // true
CivilPlane instanceof Airplane; // false
// 以上两个不同结果，则因前者new 创建，后者Object.create()创建
```

## 库 函数版

```js
/** lib/uid.js */
export function GenerateUID() {}
export const Add = () => {};

/** lib/convert-types.js */
export const StyleToString = (styleObj) => {
  return str;
};

/** lib/index.js */
import * as Uid from "./uid";
import * as ConvertTypes from "./convert-types";
export default { ConvertTypes, Uid };

/** use/test.js */
import Commonjs from "commonjs";
console.log("CLASS:", Commonjs);
// 如下:调用通用库中类型转换模块下的样式转字符串函数
this.props.domElement.style.cssText = Commonjs.ConvertTypes.StyleToString(
  this.props.style
);
```

## 库 类-对象 prototype

```js
/** lib/colour.js */
class Colour {
  constructor() {
    this._colour = "black";
  }
  getColour() {
    console.log("类=获取颜色函数:", this._colour);
    return "aqua";
  }
}
export default Colour;

/** lib/index.js */
import * as Colour from "./colour";
export default { Colour };

/** use/test.js */
import Commonjs from "commonjs";
console.log("引入私有库:", Commonjs.Colour.default.prototype.getColour());
```

## 库 类版 使用时类实例化

```js
/** lib/colour.js */
class Colour {
  constructor() {
    this._colour = "black";
  }
  getColour() {
    console.log("类=获取颜色函数:", this._colour);
    return "aqua";
  }
}
export default Colour;

/** lib/index.js */
import Colour from "./colour";
export default { Colour };

/** use/test.js */
import Commonjs from "commonjs";
let Colour = new Commonjs.Colour();
console.log("颜色类实例化:", Colour.getColour());
```

- 页面自动跳转

```js
<script language="javascript">
    function goHome() {
        var url = "./client/index.html";
        location.href = url;
    }
</script>

<body onload="setTimeout('goHome()', 500);"> </body>
```

- github API

```js
const USER_URL = "https://api.github.com/users/Lokavit";

fetchGithub(USER_URL).then((data) => {
  let uNameParent = document.getElementById("uname");
  let h1 = document.createElement("h1");
  h1.setAttribute("class", "uname");
  h1.innerHTML = data.name;
  uNameParent.appendChild(h1);

  let h3 = document.createElement("h3");
  h3.setAttribute("class", "bio");
  h3.innerHTML = data.bio;
  uNameParent.appendChild(h3);
});

async function fetchGithub(url) {
  try {
    // 链式：
    // return fetch(url).then(res => res.json()).then(data => alert(data.name));
    const res = await fetch(url);
    console.log("RES:", res);
    const data = await res.json();
    console.log("data:", data);
    return data;
    // return alert(data.name);
  } catch (e) {
    console.error(e);
  }
}
```

- 验证

```js
//这些验证有关的信息一般可能来自 别的模块 或者 AJAX请求
const validationList = [
  {
    name: "username",
    pattern: /正则表达式/,
    content: "6-20位字母、数字或“_”,字母开头",
  },
  {
    name: "password",
    pattern: /正则表达式/,
    content: "6-18位，包括数字字母或符号，中间不能有空格",
  },
  {
    name: "check_password",
    pattern: /正则表达式/,
    content: "请输入相同的密码",
  },
  {
    name: "fullname",
    pattern: /正则表达式/,
    content: "真姓名，两位到四位的中文汉字",
  },
  {
    name: "id_number",
    pattern: /正则表达式/,
    content: "5位或者18位的数字，18位时最后一位可能是x",
  },
  {
    name: "mail",
    pattern: /正则表达式/,
    content: "请输入正确的邮箱地址",
  },
  {
    name: "phone_number",
    pattern: /正则表达式/,
    content: "请输入正确的手机号码",
  },
];

const container = document.querySelector("form#form_container"); //获取包装元素 用于事件委托
const passwordElement = document.querySelector("[name=password]"); //用户密码
const checkPasswordElement = document.querySelector("[name=check_password]"); //确认密码
const checkPasswordHintEl = document.querySelector("span.checkpwd_hint"); //确认密码的提示信息 span
const inputs = document.querySelectorAll("input.user_input");
const spans = document.querySelectorAll("span.hint");

passwordElement.addEventListener("change", () => {
  //如果用户密码修改 清空 确认密码 清空提示span
  checkPasswordElement.value = "";
  checkPasswordHintEl.innerText = "";
});

//事件代理
container.addEventListener("focusout", (event) => {
  event.stopPropagation(); //阻止冒泡
  const { value, name } = event.target;

  validationList.forEach((item, index) => {
    //处理边界
    if (item.name !== name) {
      return;
    }

    //处理边界
    if (item.name === "check_password") {
      const passwordValue = passwordElement.value;
      value === passwordValue
        ? (spans[index].innerText = "OK")
        : (spans[index].innerText = item.content);
      return;
    }

    item.pattern.exec(value)
      ? (spans[index].innerText = "OK")
      : (spans[index].innerText = item.content);
  });
});

container.addEventListener("submit", (event) => {
  event.preventDefault(); //阻止默认跳页
  let sum = 0;
  spans.forEach((item, index) => {
    spans[index].innerText === "OK" && sum++;
  });
  sum === spans.length ? alert("验证成功") : alert("验证失败");
});
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      /* .box{
            width: 0;
            height: 0;
            border: 100px #000 solid;
            border-color: #f00 #0f0 #00f #0ff;
            border-right: none;
            border-top: 100px solid transparent;
            border-bottom: 100px solid transparent;
        } */
      body {
        position: relative;
        margin: 20%;
      }

      .box {
        width: 120px;
        height: 208px;
        background-color: #0f0;
      }
      .box:before {
        content: "";
        width: 0;
        height: 0;
        border-right: 60px #0f0 solid;
        border-left: none;
        border-top: 104px solid transparent;
        border-bottom: 104px solid transparent;
        position: absolute;
        top: 0;
        left: -60px;
      }
      .box:after {
        content: "";
        width: 0;
        height: 0;
        border-left: 60px #0f0 solid;
        border-right: none;
        border-top: 104px solid transparent;
        border-bottom: 104px solid transparent;
        position: absolute;
        top: 0;
        left: 120px;
      }
    </style>
  </head>
  <body>
    <div class="box"></div>
  </body>
</html>
```

## Module

- 天然严格模式
- import 关键字允许从其他模块中导入一些诸如函数之类的功能等等。[取代 require]
- export 关键字表示在当前模块之外可以访问的变量和功能。[取代 module.exports]
- 如果模块只有一个输出值，就使用 export default，多个则在 function 前加[export],不要同时使用
- 不要在模块导入中使用通配符。确保模块之中，有一个默认输出（export default）

### 无凭证

如果请求来自同一个源（域名一样），大多数基于 CORS 的 API 将发送凭证（如 cookie 等），但 fetch()和模块脚本是例外 – 除非您要求，否则它们不会发送凭证。

- crossorigin:HTML 属性,可以明确<script>以及<img>等可外链元素在获取资源时候，是否带上凭证。
- anonymous:元素的跨域资源请求不需要凭证标志设置。
- use-credentials:元素的跨域资源请求需要凭证标志设置，意味着该请求需要提供凭证。
- 只要 crossOrigin 的属性值不是 use-credentials，全部都会解析为 anonymous

```html
/* 未标记[type="module"]的 js 会优先且完整执行。 */
<script src="./recursion.js" type="module"></script>
/* 若皆标记[type="module"]则视为 js 模块，按照书写顺序执行。 */
<script src="./filter.js"></script>

/* ① 获取资源会带上凭证（如cookie等） 传统JS加载，都是默认带凭证的 */
<script src="1.js"></script>

/* ② 获取资源不带凭证 module模块加载默认不带凭证 */
<script type="module" src="1.mjs"></script>

/* ③ 获取资源带凭证 -设置crossOrigin为匿名anonymous，将带凭证 ->
<script type="module" crossorigin src="1.mjs?"></script>

/* ④ 获取资源不带凭证  import模块跨域，则设置crossOrigin为anonymous不带凭证 */
<script type="module" crossorigin src="//cdn.zhangxinxu.com/.../1.mjs"></script>

/* ⑤ 获取资源带凭证 import模块跨域，且明确设置crossOrigin为使用凭证use-credentials，则带凭证 */
<script
  type="module"
  crossorigin="use-credentials"
  src="//cdn.zhangxinxu.com/.../1.mjs?"
></script>
```

```js IIFE 立即调用函数表达式
// 因IIFE是一个函数，函数会创建新的变量作用域，常用于声明不会影响IIFE外代码的变量
var a = 15;
(function IIFE(){
  var a = 11;
  console.log(a); // 11;
})();
console.log(a) // 15;

// 也可以是返回值形式
var x = (function IIFE{
  return 13;
})();
console.log(x) // 13;

```

```html
<body>
  <script>
    // 封装请求函数 返回请求结果
    function getData() {
      return fetch("http://xxx.xxx.xx.xx:1111/roles").then((result) =>
        result.json()
      );
    }

    // 异步函数 return只能是promise 所以数据在内部处理
    async function fetchData() {
      let res = await getData();

      console.warn(res.content);

      let _div = document.createElement("div");
      _div.innerHTML = res.content;
      document.body.appendChild(_div);
    }

    // 调用异步函数
    fetchData();
  </script>
</body>
```

```js
var a = {
  value: 0,
  valueOf: function () {
    this.value++;
    return this.value;
  },
};
console.log(a == 1 && a == 2); //true
```

```js
/**
 * Normalize 8-bit color (RGB / RGBA) to [0, 1]. If A is missing, use 1.0.
 */
export function normalize8bitColor(color8bit: Vec3 | Vec4): Vec4 {
  return [...color8bit.map(x => x / 255), 1.0].slice(0, 4) as Vec4
}
```

```js 计时
const startTime = new Date().getTime(); // 开始时间
const endTime = new Date().getTime(); // 结束时间
let myTime = endTime - startTime; // 计算出来耗时
```

```html
<label id="label1" for="test">Label 1</label>
<input id="test" />
<label id="label2" for="test">Label 2</label>
<script>
  // HTMLInputElement.labels 为只读属性，它返回一个NodeList 实例，绑定当前的<input> 节点的<label> 元素。
  window.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("test");
    for (var i = 0; i < input.labels.length; i++) {
      console.log(input.labels[i].textContent); // "Label 1" and "Label 2"
    }
  });
</script>
```

```js
/** 表单验证 */

console.log("找到所有带验证的", demo);
demo.setAttribute("novalidate", true);

document.addEventListener(
  "blur",
  (event) => {
    let error = hasError(event.target);
    console.log("错误:", error);
  },
  true
);

let hasError = (field) => {
  console.log("处理错误:", field);
  // Don't validate submits, buttons, file and reset inputs, and disabled fields
  if (
    field.disabled ||
    field.type === "file" ||
    field.type === "reset" ||
    field.type === "submit" ||
    field.type === "button"
  )
    return;

  // Get validity
  let validity = field.validity;
  console.log("validity:", validity);
};
```

---

## Document

- DOM 集合非数组，只读，实时，可用 for..of 迭代，不要 for..in 来遍历

```js
<html> = document.documentElement
<body> = document.body 值可能为null[脚本无法访问在运行时不存在的元素]
<head> = document.head
childNodes, 集合提供了对所有子节点包括其中文本节点的访问
firstChild, lastChild:访问第一个和最后一个子元素的快捷方式
elem.hasChildNodes() 用于检测节点是否有子节点
for (let node of document.body.childNodes) {
  alert(node); // shows all nodes from the collection
}
parentNode:父节点;nextSibling:下一个兄弟节点;previousSibling:上一个兄弟节点
只考虑元素节点时更多的导航链接:
children —— 只获取类型为元素节点的子节点。
firstElementChild，lastElementChild —— 第一个和最后一个子元素。
previousElementSibling，nextElementSibling —— 兄弟元素。
parentElement —— 父元素。
for (let elem of document.body.children) { // 只显示元素
  alert(elem); // DIV, UL, DIV, SCRIPT
}
table:除了以上，还有自己的属性:
table.rows — 用于表示表中 <tr> 元素的集合。
table.caption/tHead/tFoot — 用于访问元素 <caption>、<thead>、<tfoot>
table.tBodies — <tbody> 元素的集合（根据标准该元素数量可以很多）
<thead>、<tfoot>、<tbody> 元素提供了 rows 属性:tbody.rows — 表内部 <tr> 元素的集合。
<tr>：
tr.cells — 在给定 <tr> 元素下 <td> 和 <th> 单元格的集合。
tr.sectionRowIndex — 在封闭的 <thead>/<tbody> 中 <tr> 的编号。
tr.rowIndex — 在表中 <tr> 元素的编号。
<td> 和 <th>：td.cellIndex — 在封闭的 <tr> 中单元格的编号。
```

```js
<table id="table">
  <tr><td>one</td><td>two</td></tr>
  <tr><td>three</td><td>four</td></tr>
</table>
<script>
  // 获取第一行中第二个单元格的内容
  alert( table.rows[0].cells[1].innerHTML ) // "two"
</script>
```

```js
elem.querySelectorAll(css) 的调用将返回与给定 CSS 选择器匹配 elem 中的所有元素
<ul><li>The</li><li>test</li></ul>
<ul><li>has</li><li>passed</li></ul>
let elements = document.querySelectorAll('ul > li:last-child');
for (let elem of elements) {
    alert(elem.innerHTML); // "test", "passed"
  }
CSS 选择器的伪类，如 :hover 和 :active
document.querySelectorAll(':hover')

elem.matches(css) 用于检查 elem 与给定的 CSS 选择器是否匹配。
<a href="http://example.com/file.zip">...</a>
<a href="http://ya.ru">...</a>
<script>
  // 不一定是 document.body.children，也可以是任何集合
  for (let elem of document.body.children) {
    if (elem.matches('a[href$="zip"]')) {
      alert("The archive reference: " + elem.href );
    }
  }
</script>
elem.closest(css) 用于查找与给定 CSS 选择器相匹配的最近的祖先。elem 本身也会被检查。
<h1>Contents</h1>
<div class="contents">
  <ul class="book">
    <li class="chapter">Chapter 1</li>
    <li class="chapter">Chapter 1</li>
  </ul>
</div>
<script>
  let chapter = document.querySelector('.chapter'); // LI
  alert(chapter.closest('.book')); // UL
  alert(chapter.closest('.contents')); // DIV
  alert(chapter.closest('h1')); // null（因为 h1 不是祖先）
</script>
```

```js
// hidden 指定元素是否可见
<div hidden>With the attribute "hidden"</div>
<div id="elem">JavaScript assigned the property "hidden"</div>
<script>
  elem.hidden = true;
</script>

所有以 “data-” 开头的特性值可以给编程人员正常使用，同时它还是 dataset 合法值。
<body data-about="Elephants">
<script>
  alert(document.body.dataset.about); // Elephants
</script>
<style>
  .order[data-order-state="new"] {color: green;}
  .order[data-order-state="pending"] {color: blue;}
  .order[data-order-state="canceled"] {color: red;}
</style>
<div id="order" class="order" data-order-state="new">A new order.</div>
<script>
  // 读取
  alert(order.dataset.orderState); // new
  // 修改
  order.dataset.orderState = "pending"; // (*)
</script>
```

## 浏览器事件

- 函数应该作为 test 进行分发，而不是 test(),添加括号将是函数执行的结果

```js
button.onclick = test; // right
button.onclick = test(); // wrong
```

```html
<button onclick="openFormModal()">无参</button>
<button onclick="onTest(this)">传元素</button>
<button onclick="onTestEvent(event)">传事件</button>
<button onclick="onTestParam(123)">传值</button>
<button onclick="onTestParams('321')">传值</button>

<script>
  // 非箭头函数写法
  function onTest(args) {
    console.log(args);
  }

  // 箭头函数写法
  onTest = (args) => {
    console.log(args);
  };
  onTestEvent = (event) => {
    console.log(event);
  };
  onTestParam = (val) => {
    console.log(val);
  };
  onTestParams = (val) => {
    console.log(val);
  };
</script>
```

```html
<div class="book" id="zfem">
  <img
    src="https://raw.githubusercontent.com/…………/master/IMG/zfem.jpg"
    alt="ZFEM"
  />
</div>
<script>
  let zfemBtn = document.getElementById("zfem");
  zfemBtn.onclick = (event) => {
    console.log("EVENT:", event.target.alt);
    getZFEMContent(event.target.alt);
  };

  async function getZFEMContent(book) {
    const res = await httpGet(BASE_URL + book);
    console.log("RES:", JSON.parse(res));
  }
</script>
```

## Class 类

- class, extends, super
- class import export 多种写法

```js
/**
 * 写法一:
 */
/* demo.js */
class Demo {
  test() {
    console.log("demo.js Demo test()!");
  }
}
export default Demo;
/* use.js 具体使用 */
import Demo from "./demo.js";
let demo = new Demo(); // 实例化类
demo.test(); // output: demo.js Demo test()!

/**
 * 写法二:
 */
/* demo.js */
class Demo {
  test() {
    console.log("demo.js Demo test()!");
  }
}
export default new Demo(); // 导出时候就实例化
/* use.js 具体使用 */
import Demo from "./demo.js";
Demo.test(); // 无需实例化，直接使用

/**
 * 写法三:
 */
/* demo.js */
export default class Demo {
  test() {
    console.log("demo.js Demo test()!");
  }
}
/* use.js 具体使用 */
import Demo from "./demo.js";
let demo = new Demo();
demo.test();
```

### 构造函数

- getter,setter

```js
export class Demo {
  /**
   * 构造函数 constructor内定义的方法和属性是实例对象自己的，而constructor外定义的方法和属性则是所有实例对象可以共享的
   * @param {*} name
   * use: new Demo('satya');
   */
  constructor(name) {
    // 调用 setter
    this.name = name;
  }

  get name() {
    return this._name;
  }
  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }
}

/* use.js 具体使用 */
let demo = new Demo("satya");
// let demo = new Demo(''); // Name too short.
alert(demo.name);
```

### extends

- 意味着 Child.prototype.**proto** 将是 Parent.prototype，所以方法被继承

```js
/**
 * 写法四: 一个js里，多个需要导出的 or 导出继承的
 */
/* demo.js */
export class Demo {
  test() {
    console.log("demo.js Demo test()!");
  }

  /**
   * 构造函数 constructor内定义的方法和属性是实例对象自己的，而constructor外定义的方法和属性则是所有实例对象可以共享的
   * @param {*} name
   * use: new Demo('satya');
   */
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed += speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }
  stop() {
    this.speed = 0;
    alert(`${this.name} stoped!`);
  }
}

/**
 * 类继承 [extends]
 */
export class DemoChild extends Demo {
  hide() {
    alert(`${this.name}hides!`);
  }
}
/* use.js 具体使用 */
import { Demo, DemoChild } from "./demo.js";
let demo = new Demo("satya");
demo.test();
demo.run(10);
let demoChild = new DemoChild("shakya");
demoChild.hide();
```

### super

- 继承父类函数，将其功能性扩展
- 执行 super.method(...) 调用父类方法
- 执行 super(...) 调用父类构造函数（只能在子类的构造函数中运行）。
- 箭头函数没有自己的 this 或 super

```js
/* demo.js */
export class Demo {
  test() {
    console.log("demo.js Demo test()!");
  }

  /**
   * 构造函数 constructor内定义的方法和属性是实例对象自己的，而constructor外定义的方法和属性则是所有实例对象可以共享的
   * @param {*} name
   * use: new Demo('satya');
   */
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed += speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }
  stop() {
    this.speed = 0;
    alert(`${this.name} stoped!`);
  }
}

/**
 * 类继承 [extends]
 */
export class DemoChild extends Demo {
  hide() {
    alert(`${this.name}hides!`);
  }

  stop() {
    super.stop(); // 调用父类的stop函数
    this.hide();
  }
}

/* use.js 具体使用 */
import { Demo, DemoChild } from "./demo.js";
let demo = new Demo("satya");
demo.test();
demo.run(10);
let demoChild = new DemoChild("shakya");
demoChild.stop();
```

### 重写构造函数

- 如果一个类继承了另一个类并且没有 constructor，那么将生成“空” constructor
- 继承类的构造函数必须调用 super(...)，并且 (!) 一定要在使用 this 之前调用

```js
class DemoChild extends Demo {
  // 为没有构造函数的继承类生成以下的构造函数
  // 调用了父类的 constructor，并传递了所有的参数
  constructor(...args) {
    super(...args);
  }
}
```

```js
export class Demo {
  /**
   * 构造函数 constructor内定义的方法和属性是实例对象自己的，而constructor外定义的方法和属性则是所有实例对象可以共享的
   * @param {*} name
   * use: new Demo('satya');
   */
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed += speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }
  stop() {
    this.speed = 0;
    alert(`${this.name} stoped!`);
  }
}

/**
 * 类继承 [extends]
 */
export class DemoChild extends Demo {
  /**
   * 重写构造函数
   * @param {*} name
   * @param {*} earLength
   */
  constructor(name, earLength) {
    // 继承类的构造函数必须调用 super(...)，并且 (!) 一定要在使用 this 之前调用
    // this.name = name;
    super(name); // super必须在 this.xxx= xxx 之前
    this.earLength = earLength;
  }

  hide() {
    alert(`${this.name}hides!`);
  }

  stop() {
    super.stop(); // 调用父类的stop函数
    this.hide();
  }
}
```

## destructuring 解构

### ES6 解构赋值

```js
let cat = "ken";
let dog = "lili";
let zoo = { cat, dog };
console.log(zoo); //Object {cat: "ken", dog: "lili"}

let dog = { type: "animal", many: 2 };
let { type, many } = dog;
console.log(type, many); //animal 2
```

## default, Rest parameters 剩余参数

- 如果函数的最后一个命名参数以...为前缀，则它将成为一个由剩余参数组成的真数组，其中从 0（包括）到 theArgs.length（排除）的元素由传递给函数的实际参数提供
- 只包含那些没有对应形参的实参,是真正的 Array，可用直接使用所有的数组方法，比如 sort，map，forEach 或 pop

- 当需要对对象中某一个或几个属性进行再处理时

```js
let { a, b, c, ...other } = this.form;
this.form = {
  a: "a的值",
  b: "b的值",
  c: "c的值",
  ...other,
};
```

- 当需要对传入的对象参数进行处理时

```js
/**
  * 获取当前页面列表数据集
  * page: 当前页
  * size: 每页数据集条数
  * search: 于查询框输入的值,当其为对象时，使用[...search]解构
  */
async fetchData(page, size, search = {}) {
  let params = {
    page: page > 0 ? page - 1 : 0,
    size: this.tableData.size,
    ...search // 解构赋值
  };
  this.loading = true;
  try {
    let res = await getActivities(params);
    console.log("中日程列表数据集:", res);
    this.tableData = res;
    this.loading = false;
  } catch (err) {
    this.loading = false;
  }
},
```

- 当 剩余参数作为函数参数的时候

```js
// 计算传入不定参数结果
function sum(...theArgs) {
  alert(theArgs.length); // 可以使用length属性得到剩余参数的个数
  return theArgs.reduce((previous, current) => {
    return previous + current;
  });
}
console.log(sum(1, 2, 3)); // expected output: 6
console.log(sum(1, 2, 3, 4)); // expected output: 10

// 解构剩余参数
function f(...[a, b, c]) {
  return a + b + c;
}
f(1); // NaN (b and c are undefined)
f(1, 2, 3); // 6
f(1, 2, 3, 4); // 6 (the fourth parameter is not destructured)

// 剩余参数包含了从第二个到最后的所有实参，然后用第一个实参依次乘以它们
function multiply(multiplier, ...theArgs) {
  return theArgs.map(function (element) {
    return multiplier * element;
  });
}
var arr = multiply(2, 1, 2, 3);
console.log(arr); // [2, 4, 6]

// 在剩余参数上使用任意数组方法
function sortRestArgs(...theArgs) {
  var sortedArgs = theArgs.sort();
  return sortedArgs;
}
alert(sortRestArgs(5, 3, 7, 1)); // 弹出 1,3,5,7
```

## async/await

- async:函数前面的「async」：该函数总是返回一个 promise。允许在函数内部使用 await。
- await:让 JS 引擎等待直到 promise 完成并返回结果

```js
async function f() {
  return 1;
}
f().then(alert); // 1

async function f() {
  return Promise.resolve(1); // 显式返回一个 promise
}
f().then(alert); // 1

async function f() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000);
  });
  let result = await promise; // 等待直到 promise 决议 (*)
  alert(result); // "done!" // 一秒后显示的
}
f();

// 包裹在一个匿名 async 函数中
(async () => {
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();
  ...
})();
```

## Promise

- 异步编程的一种解决方案，比传统的——回调函数和事件——更合理更强大

```js
  /**
   * get 请求
   * @param {*} url 请求的url
   * @param {*} responseType  响应类型
   * return Promise
   * use: HTTP.get(BASE_URL_RAW + 'novel.json').then(data => rendererBook(Object.values(JSON.parse(data))));
   */
  get(url, responseType = "") {
    return new Promise(function(resolve, reject) {
      const request = new XMLHttpRequest();
      request.onload = function() {
        if (this.status === 200) {
          // Success
          resolve(this.response);
        } else {
          // Something went wrong (404 etc.)
          reject(new Error(this.statusText));
        }
      };
      request.onerror = function() {
        reject(new Error("XMLHttpRequest Error: " + this.statusText));
      };
      request.open("GET", url);
      request.responseType = responseType;
      request.send();
    });
  }

/* ues.js 具体使用 */
import HTTP from "./common/http.js";
const roleJSONURL = "https://raw.githubusercontent.com/……role.json"; // 文件url
HTTP.get(roleJSONURL).then(data => console.log("DATA:", JSON.parse(data)));

/**
 * 请求一个json，根据指定属性值，请求数据集，渲染至页面
 */
loadContent(BASE_URL_RAW);
async function loadContent(url) {
  const data = await HTTP.get(url + "novel.json");
  const content = await HTTP.get(BASE_URL + JSON.parse(data).kgyy.folder);
  return render(JSON.parse(content));
}
```

```js
// 第一种方式
export function getMaterial(params) {
  return http({
    url: "/materials",
    method: "get",
    params,
  });
}
// 第二种方式
export function getMaterial(query) {
  return http({
    url: "/materials",
    method: "get",
    params: query,
  });
}
```

```js
function loadScript(src, callback) {
  let script = document.createElement("script");
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}

// 用法： loadScript('path/script.js', (err, script) => {...})

let loadScriptPromise = function (src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err);
      else resolve(script);
    });
  });
};

// 用法： loadScriptPromise('path/script.js').then(...)
```

## fetch

```js
// 可以是链式
function loadJson(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => alert(data.name));
}
// 该代码块为vscode建议写法,效果与上相同
async function loadJson(url) {
  const response = await fetch(url);
  const data = await response.json();
  return alert(data.name);
}
```

```js
async function fetchJson(url) {
  try {
    let request = await fetch(url);
    let text = await request.text();
    return JSON.parse(text);
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
  }
}
fetchJson("http://example.com/some_file.json").then((obj) => console.log(obj));
```

```js
/** 进阶版  */
const roleJSONURL = `${BASE_URL}/Concept/role/hong.json`;
async function showAvatar() {
  // 读取JSON文件
  let response = await fetch(roleJSONURL);
  let user = await response.json();

  // 读取Github用户信息
  let githubResponse = await fetch(`https://api.github.com/users/${name}`);
  let githubUser = await githubResponse.json();

  // 显示头像
  let img = document.createElement("img");
  img.src = githubUser.avatar_url; // 传入用户的头像地址
  img.className = "promise-avatar-example";
  document.body.append(img); // 添加到body下

  // 等待3秒
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));
  img.remove(); // 移除img元素
  return githubUser;
}
showAvatar();

/* 使用 async/await 重写以下示例 */

const roleJSONURL = "https://raw.githubusercontent.com/……role.json"; // 文件url
/**
 * 向指定URL发送请求,并从服务器加载内容
 * @param {*} url 请求的url
 * 使用 response.json() 把远程内容解析为 JSON
 * 注：编辑器建议使用 async/await方式
 */
async function loadJson(url) {
  const response = await fetch(url);
  console.log("RES:", response);
  return await response.json();
}

/**
 * 发一个请求到 GitHub，加载用户信息
 * @param {*} name 用户名
 */
async function loadGithubUser(name) {
  const response = await fetch(`https://api.github.com/users/${name}`);
  console.log("RES:", response);
  return await response.json();
}

/**
 * 根据上一步请求得到的用户信息，获取其中的头像url
 * 于页面创建img元素，显示用户头像
 * @param {*} githubUser 用户信息
 * 注：作为一个规律，一个异步动作应该永远返回一个 promise。
 */
async function showAvatar(githubUser) {
  return new Promise(function (resolve, reject) {
    let img = document.createElement("img");
    img.src = githubUser.avatar_url; // 传入用户的头像地址
    img.className = "promise-avatar-example";
    document.body.append(img); // 添加到body下

    setTimeout(() => {
      img.remove(); // 移除img元素？
      /**
             * 为了使链可扩展，我们需要在头像结束显示时返回一个 resolved 状态的 promise。
            在 setTimeout 后运行 img.remove()，然后调用 resolve(githubUser)，这样链中的控制流程走到下一个 .then 并传入用户数据。作为一个规律，一个异步动作应该永远返回一个 promise。这让它规划下一步动作成为可能。虽然现在我们没打算扩展链，我们可能在日后需要它。
             */
      resolve(githubUser); // 该行，对应使用时的最后一个.then，alert一个字符串。
    }, 3000);
  });
}

/** 使用以上封装好的函数 达到链式操作效果 */
loadJson(roleJSONURL)
  .then((user) => loadGithubUser(user.name))
  .then(showAvatar)
  // showAvatar函数中，setTimeout中的 [resolve]
  .then((githubUser) => alert(`Finished showing ${githubUser.name}`));
```

```js
/* 向指定URL发送请求,并从服务器加载内容 
发一个请求到 GitHub，加载用户信息并显示头像
alert之后，移除加载的头像元素 */

const roleJSONURL = "https://raw.githubusercontent.com/……role.json"; // 文件url

/* 加载指定url的内容 */
function loadJson(url) {
  return fetch(url).then((response) => response.json());
}
/* 根据传入name，加载指定用户信息 */
function loadGithubUser(name) {
  return fetch(`https://api.github.com/users/${name}`).then((response) =>
    response.json()
  );
}
/* 根据传入用户名，获取并显示头像于页面 */
function showAvatar(githubUser) {
  return new Promise(function (resolve, reject) {
    let img = document.createElement("img");
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  });
}
// 使用它们
loadJson(roleJSONURL)
  .then((user) => loadGithubUser(user.name))
  .then(showAvatar)
  .then((githubUser) => alert(`Finished showing ${githubUser.name}`));
```

#### 请求错误

```js
const roleJSONURLERROR = `${BASE_URL}/Satya/master/Concept/role/role.json`;
/**
 * 检查具有HTTP状态的[response.status]属性,非200抛出错误
 * 为 HTTP 错误创建一个自定义类用于区分 HTTP 错误和其他类型错误
 * 构造函数接受 response 对象，并将其保存到 error 中,能够获得响应数据
 */
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = "HttpError";
    this.response = response;
  }
}
/**
 * 将请求（requesting）和错误处理代码包装进一个函数，它能够 fetch url 并 将所有状态码不是 200 视为错误
 */
async function loadJsonAddHttpError(url) {
  const response = await fetch(url);
  // 添加对状态码进行判断
  if (response.status == 200) {
    return await response.json();
  } else {
    throw new HttpError(response);
  }
}

loadJsonAddHttpError(roleJSONURLERROR).catch(alert);
```

```js
/**
 * 创建请求，如果得到 404 就可以告知用户修改信息
 * 从 GitHub 加载给定名称的用户。如果没有这个用户，它将告知用户填写正确的名称
 * 如果有加载指示（load-indication），.finally 是一个很好的处理程序，在 fetch 完成时停止它
 */
function demoGithubUser() {
  let name = prompt("Enter a name?", "iliakan");

  document.body.style.opacity = 0.3; // (1) 开始指示（indication）调暗文档指示加载

  return loadJson(`https://api.github.com/users/${name}`)
    .finally(() => {
      // (2) 停止指示（indication） fetch成功or错误，触发终止加载
      document.body.style.opacity = "";
      // 浏览器技巧 (*) 是从 finally 返回零延时（zero-timeout）的 promise
      return new Promise((resolve) => setTimeout(resolve)); // (*)
    })
    .then((user) => {
      alert(`Full name: ${user.name}.`);
      return user;
    })
    .catch((err) => {
      if (err instanceof HttpError && err.response.status == 404) {
        alert("No such user, please reenter.");
        return demoGithubUser();
      } else {
        throw err;
      }
    });
}

demoGithubUser();
```

```js
// 浏览器里，可以使用 unhandledrejection 事件来捕获这类错误
window.addEventListener("unhandledrejection", function (event) {
  // the event object has two special properties:
  alert(event.promise); // [object Promise] - 产生错误的 promise
  alert(event.reason); // Error: Whoops! - 未处理的错误对象
});

new Promise(function () {
  throw new Error("Whoops!");
}); // 没有 catch 处理错误
//如果发生错误且没有 .catch 捕获，unhandledrejection 处理程序就会被触发并获取具有相关错误信息的 event 对象，此时我们就能做一些处理了。通常这种错误是不可恢复的，所以我们最好的办法是告知用户有关问题的信息，并可能将事件报告给服务器。
```

#### Promise.all

```js
const BASE_URL_DICT = `${BASE_URL}/Dict/zh/`;
let fileNames = [
  "surname.txt",
  "cn.txt",
  "baijiaxing.txt",
  "qianziwen.txt",
  "idiom.txt",
];

let requests = fileNames.map((fileName) => fetch(BASE_URL_DICT + fileName));

Promise.all(requests)
  .then((responses) => {
    // 所有响应都就绪时，显示HTTP状态码
    for (let response of responses) {
      alert(`${response.url}: ${response.status}`); // 每个url都显示200
    }
    return responses;
  })
  // 映射 responses 数组到 response.text()中读取它们的内容
  .then((responses) => Promise.all(responses.map((res) => res.text())));
```

```js
let names = ["iliakan", "remy", "jeresig"];
let requests = names.map((name) =>
  fetch(`https://api.github.com/users/${name}`)
);

Promise.all(requests)
  .then((responses) => {
    // 所有响应都就绪时，我们可以显示 HTTP 状态码
    for (let response of responses) {
      alert(`${response.url}: ${response.status}`); // 每个 url 都显示 200
    }

    return responses;
  })
  // 映射 response 数组到 response.json() 中以读取它们的内容
  .then((responses) => Promise.all(responses.map((r) => r.json())))
  // 所有 JSON 结果都被解析：“users” 是它们的数组
  .then((users) => users.forEach((user) => alert(user.name)));
```

### 基础示例

```js
/**
 * 返回一个 promise
 * @param {*} src  script的url
 */
function loadScript(src) {
  return new Promise(function (resolve, reject) {
    let script = document.createElement("script");
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error("Script load error: " + src));

    document.head.append(script);
  });
}

let promise = loadScript(
  "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js"
);

promise.then(
  (script) => alert(`${script.src} is loaded!`),
  (error) => alert(`Error: ${error.message}`)
);

promise.then((script) => alert("One more handler to do something else!"));
```

### 制作快速加载的 HTML 页面

- 减小页面的大小[排除不必要空格，注释，动态内嵌脚本，和放入外部文件的 CSS 等]
- 最小化文件数量，减少域名查找，缓存重用的内容，高效地排列页面组件，减少内联脚本的数量
- 使用现代 CSS 和合法标记
- 给内容分块[用 <div> 替代基于 TABLE 的布局或者将 TABLE 拆分为更小的 TABLE]

### 异步加载脚本：Defer/Async

- defer 这个布尔属性被设定用来通知浏览器该脚本将在文档完成解析后
- async 该布尔属性指示浏览器是否在允许的情况下异步执行该脚本
- 以上属性对于内联脚本无作用 (即没有 src 属性的脚本）

```html
/*异步执行*/
<script src="one.js" async></script>
/*延迟执行*/
<script src="one.js" defer></script>
```

# Array&Object

```js
export default function groupBy(array, f) {
  const groups = {};
  array.forEach(function (o) {
    const group = JSON.stringify(f(o));
    groups[group] = groups[group] || [];
    groups[group].push(o);
  });
  return Object.keys(groups).map(function (group) {
    return groups[group];
  });
}
```

```js
let array = [1, 2, 1, 4, 5, 3, "1"];
console.log("数组去重", [...new Set(array)]);

// （2） 实现并集、交集、差集
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);
// 并集
let union = new Set([...a, ...b]); // Set {1, 2, 3, 4}
// 交集
let intersect = new Set([...a].filter((x) => b.has(x))); // set {2, 3}
// 差集
let difference = new Set([...a].filter((x) => !b.has(x))); // Set {1}
```

- for…of 迭代

```js
// 输出对象种每个 key-value ，若内中有数组，则依然输出数组
for (let [key, value] of Object.entries(obj)) {
  console.log(key, value); // 每个 key value
}

// 将每个key-value作为数组形式输出["key","value"],遇到对象数组,照例输出
console.log(Object.entries(obj));
```

### 两个对象或数组是否相等

```js
// 如果键值对相等，则两个对象相等
let obj1 = { a: 1, b: 2 };
let obj2 = { b: 2, a: 1 };
equalObject(obj1, obj2); // true
equalObject({ a: [] }, { a: [] }); // false

// 如果数组项一样，则两个数组相等
let arr1 = [1, 2, 5, 7, 9];
let arr2 = [1, 2, 5, 7, 9];
euqalObject([1, 2], [1, 2]); // true
euqalObject([1, 2], ["1", "2"]); // false

// 实现一个方法，只要内容形态一致，则数组或对象相等
let obj1 = { a: [1, "2"], b: 2 };
let obj2 = { b: 2, a: [1, "2"] };
let arr1 = [1, 2, { a: 1, b: 2 }, 9];
let arr2 = [1, 2, { b: 2, a: 1 }, 9];
euqal(obj1, obj2); // true
euqal(arr1, arr2); // true
euqal(obj1, arr1); // false

// 补充，应该再加上类型一致性判断，否则[1, 2] 和 {'0': 1, '1': 2} 会认为相等。

let equalObject = (o1, o2) => {
  if (!(o1 instanceof Object) || !(o2 instanceof Object)) {
    return false;
  }
  if (Object.keys(o1).length !== Object.keys(o2).length) {
    return false;
  }
  return Object.keys(o1).every((v) => o1[v] === o2[v]);
};

let equalArray = equalObject;

let equal = (o1, o2) => {
  if (!(o1 instanceof Object) || !(o2 instanceof Object)) {
    return false;
  }
  if (Object.keys(o1).length !== Object.keys(o2).length) {
    return false;
  }
  return Object.keys(o1).every((v) => {
    if (o1[v] instanceof Object) {
      return equal(o1[v], o2[v]);
    } else {
      return o1[v] === o2[v];
    }
  });
};
```

## Array 数组方法

- from() 从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。
- forEach、map、filter、find、every、some、reduce
- forEach(),遍历，无返回值。
- forEach 与 map 最大区别，前者没有返回值
- filter(),返回根据条件过滤后的数组
- find(),返回找到的符合条件的第一个元素
- findIndex(),返回第一个符合条件的索引
- every(),当所有元素满足条件时，返回 true,否则返回 false
- some(), 当所有元素中，有一个以上满足条件时,返回 true,否则返回 false
- reduce(),递归累计,返回计算结果.
- reduceRight(),以上，从又至左

### from()

- 第一个参数允许任意可迭代对象。

```js
// 类数组中每项*2
const someNumbers = { 0: 10, 1: 15, length: 2 };
console.log(Array.from(someNumbers, (value) => value * 2)); // [20,30]
```

```js
/** 将类数组对象转换成数组
  * 通常的类数组对象:
  *    函数的 arguments 关键字
  *    DOM集合
  */
// 对函数的参数求和
sumArguments() {
  return Array.from(arguments).reduce((sum, num) => sum + num);
},
// 类数组转换数组 之 对函数的参数求和
console.log(this.sumArguments(1, 2, 3));

// 对DOM集合的操作
testDOM() {
  // document.getElementsByTagName("li");
  let li = this.$el.getElementsByTagName("li");
  console.log("LI:", li); // 所有<li>标签
  let newLI = Array.from(li).filter(item => item.textContent != "B");
  console.log("newLI:", newLI); // 输出结果：AC
}
```

```js
// 数组最大值
[1, 4, 6].reduce(function (a, b) {
  return Math.max(a, b);
}); //6

// 遍历
numbers = [1, 2, 3, 4, 5];
numbers.forEach((number) => {
  console.log(number); //1 2 3 4 5
});

// 将数组中所有数字相加（这里用了函数抽离的方式）
numbers = [1, 2, 3, 4, 5];
var sum = 0;
function add(num) {
  sum += num;
}
numbers.forEach(add);
console.log(sum); //15

// map() 原数组被“映射”成对应新数组,返回一个新数组
// 案例1将原数组的每个数字都*2

var numbers = [1, 2, 3, 4, 5];
var doublnumbers = numbers.map((number) => {
  return number * 2;
});
console.log(doublnumbers); //[2,4,6,8,10]

// 将A对象数组中某个属性存到B数组中
let building = [
  { name: "the Great Wall", location: "BeiJing" },
  { name: "Eiffel Tower", location: "Paris " },
];
let citys = building.map((item) => {
  return item.location;
});
console.log(citys); //["BeiJing", "Paris "]

// 案例2假定有两个数组(A,B),根据A中id值,过滤掉B数组不等于A中id的数据

var post = { id: 4, title: "Javascript" };
var comments = [
  { postId: 4, content: "Angular4" },
  { postId: 2, content: "Vue.js" },
  { postId: 3, content: "Node.js" },
  { postId: 4, content: "React.js" },
];
function commentsForPost(post, comments) {
  return comments.filter(function (comment) {
    return comment.postId === post.id;
  });
}

console.log(commentsForPost(post, comments)); //[ {postId:4,content:"Angular4"},{postId:4,content:"React.js"}]

// 案例2假定有两个数组(A,B),根据A中id值,找到B数组等于A中id的数据

var post = { id: 4, title: "Javascript" };
var comments = [
  { postId: 4, content: "Angular4" },
  { postId: 2, content: "Vue.js" },
  { postId: 3, content: "Node.js" },
  { postId: 4, content: "React.js" },
];
function commentsForPost(post, comments) {
  return comments.find(function (comment) {
    return comment.postId === post.id;
  });
}

console.log(commentsForPost(post, comments)); // {postId:4,content:"Angular4"}
```

```js
/**
 * 静态方法 Reflect.ownKeys() 返回一个由目标对象自身的属性键组成的数组。
 */
const object1 = {
  property1: 42,
  property2: 13,
};
var array1 = [];
console.log(Reflect.ownKeys(object1));
// expected output: Array ["property1", "property2"]
console.log(Reflect.ownKeys(array1));
// expected output: Array ["length"]
```

# JS_INFO

## Object 对象

- 排序:数字从小至大;非数字由创建顺序决定
- 对象的属性键只能是 String 类型或者 Symbol 类型

```js
let a = new Object(); // 构造函数的语法
let b = {}; // 字面量的语法

/**
 * Object.assign 复制和合并
 * 语法:Object.assign(dest[, src1, src2, src3...])
 * 复制src1-srcN所有对象到dest
 * 如果接收的对象已经有了同样属性名的属性，前面的会被覆盖
 */
let user = {
  name: "John",
};
let permissions1 = {
  canView: true,
};
let permissions2 = {
  canEdit: true,
};
// 把 permissions1 和 permissions2 的所有属性都拷贝给 user
Object.assign(user, permissions1, permissions2);
// 现在 user = { name: "John", canView: true, canEdit: true }
```

### Symbol 类型

- 值表示唯一的标识符,无法自动转换;
- 保证是唯一的。即使我们创建了许多具有相同描述的 Symbol，它们的值也是不同。描述只是一个不影响任何东西的标签。
- 隐藏对象属性，属性不参与 for..in 循环

```js
// id 是 symbol 的一个实例化对象
let id = Symbol();
// id 是描述为 "id" 的 Symbol
let id = Symbol("id");
let id1 = Symbol("id");
let id2 = Symbol("id");
alert(id1 == id2); // false

let id3 = Symbol("id");
alert(id3.toString()); // Symbol(id)

/**
 * 全局 symbol
 * 全局 symbol 注册表
 */
// 从全局注册表中读取
let id = Symbol.for("id"); // 如果该 Symbol 不存在，则创建它

// 再次读取
let idAgain = Symbol.for("id");

// 相同的 Symbol
alert(id === idAgain); // true

/**
 * 通过全局 symbol 返回一个名称
 * 语法： Symbol.keyFor(sym)
 */
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// 从 symbol 中获取 name
alert(Symbol.keyFor(sym)); // name
alert(Symbol.keyFor(sym2)); // id
```

### 对象方法和 this

- 对象方法：存储在对象中的函数
- 方法可以将该对象引用为 this
- this 不受限制，可以用于任何函数
- this 在运行时求值，可以为任何值
- 箭头函数没有自己的 this

```js
/**
 * 对象方法
 */
let user = {
  name: "Satya",
  age: 15,
};
// user.sayHi = function () {
//   alert("Hello!");
// }
// 箭头函数写法
user.sayHi = () => alert("Hello!");
user.sayHi();

/**
 * 方法简写
 */
let use = {
  sayHi() {
    alert("Hello!!");
  },
};
use.sayHi(); // 调用

/**
 * 方法中的 this
 * 为了访问该对象，方法中可以使用 this 关键字
 * this 的值就是在点之前的这个对象，即调用该方法的对象
 */
let us = {
  name: "Satya",
  age: 15,
  sayHi() {
    alert(this.name); // this=us对象
  },
};

/**
 * 不同对象调用同一函数，this值不同
 */
let user1 = {
  name: "Satya",
};
let user2 = {
  name: "Shakya",
};

function sayHi() {
  alert(this.name);
}
// 在两个对象中使用同一个函数
user1.f = sayHi;
user2.f = sayHi;
// 它们调用时有不同的 this 值。
// 函数内部的 "this" 是点之前的这个对象。
user1.f(); // Satya (this=user1)
user2.f(); // Shakya (this=user2)

/**
 * 严格模式下：this = undefined
 * 非严格模式: this = 全局对象[浏览器的window]
 */
function sayHi() {
  alert(this);
}
sayHi(); // undefined
```

### 构造函数和操作符【new】

- 大写字母命名，只能用[new]操作符来执行
- 构造函数的主要目的 — 实现可重用的对象创建代码
- 通常构造函数没有 return 语句

```js
/**
 * 构造函数
 * 当函数作为 new User()执行时，步骤如下：
 * 1.一个新的空对象被创建并分配给this
 * 2.函数体执行，通常会修改this,为其添加新属性
 * 3.返回this的值
 */
function User(name) {
  this.name = name;
  this.isAdmin = false;
  this.sayHi = () => alert("Say Hi!");
}
// 创建新对象，分配给this
let user = new User("Satya");
alert(user.name);
alert(user.isAdmin);
user.sayHi();
```

### 数字类型

- 所有数字函数（包括 isFinite）中的空字符串或空格字符串均被视为 0

```js
/**
 * 数字类型 科学计数
 * "e" 把数字乘以 1 后面跟着指定数量的 0
 * e 后面的负数表示除以 1 后面跟着给定数量的 0
 */
let num1 = 1e3; // 1*1000
let num2 = 1.23e6; // 1.23*1000000
let num3 = 1e-3; // 1/1000(=0.001)
let num4 = 1.23e-6; //1.23/1000000(=0.00000123)

/**
 * toString(base)
 * 返回带有给定base的进制中的字符串表示
 * base可以从2变到36，默认为10
 * base=16 用于十六进制颜色，字符编码等，数字可以是 0..9 或 A..F。
 * base=2 主要用于调试按位操作，数字可以是 0 或 1
 * base=36 是最大值，数字可以是 0..9 或 A..Z
 */
let num5 = 255;
alert(num5.toString(16)); // ff
alert(num5.toString(2)); // 11111111
// 需要将一个较长的数字标识符变成较短，如做一个简短的URL。可以简单地用基数为 36 的数字系统表示：
alert((123456).toString(36)); // 2n9c // 直接在数字上调用方法需要两个点

alert(0.1 + 0.2 == 0.3); // false
alert(0.1 + 0.2); // 0.30000000000000004
/**
 * 损失精度的解决方式
 * toFixed 总是返回一个字符串。它确保它在小数点后有 2 位数字
 */
let sum = 0.1 + 0.2;
alert(sum.toFixed(2)); // 0.30
alert(+sum.toFixed(2)); // 0.3 使用一元加号，强制为一个数字
alert((0.1 * 10 + 0.2 * 10) / 10); // 0.3

// Hello! I'm a self-increasing number!
alert(9999999999999999); // shows 10000000000000000

/**
 * isNaN(value) 将其参数转换为数字，然后测试它是否为 NaN
 * 值 “NaN” 是独一无二的，它不等于任何东西，包括它本身
 */
alert(isNaN(NaN)); // true
alert(isNaN("str")); // true
alert(NaN === NaN); // false

/**
 * isFinite(value) 将其参数转换为数字，如果是常规数字，则返回 true，而不是 NaN / Infinity / -Infinity
 */
alert(isFinite("15")); // true
alert(isFinite("str")); // false, because a special value: NaN
alert(isFinite(Infinity)); // false, because a special value: Infinity
// 验证字符串值是否为常规数字
let num = +prompt("Enter a number", "");
alert(isFinite(num)); // 结果会是 true，除非输入无穷或不是数字

/**
 * parseInt 和 parseFloat
 * 从字符串中读取数字
 * parseInt() 函数有一个可选的第二个参数，可以解析十六进制数字，二进制数字等字符串
 */
alert(parseInt("100px")); // 100
alert(parseFloat("12.5em")); // 12.5
alert(parseInt("0xff", 16)); // 255
alert(parseInt("ff", 16)); // 255, without 0x also works
alert(parseInt("2n9c", 36)); // 123456

/**
 * 其它常用Math
 */
alert(Math.random()); // 随机数 0-1,不含1
alert(Math.max(3, 5, -10, 0, 1)); // 5 返回最大值
alert(Math.min(1, 2)); // 1 返回最小值
// 返回经过 n 进制转换的 power 值
alert(Math.pow(2, 10)); // 2 in power 10 = 1024
```

### 交互 alert prompt confirm

```js
/**
 * alert 浏览器弹出信息，并赞同脚本，直到用户点击确定
 */
alert("alert");

/**
 * prompt 浏览器显示带有文本消息的模态框，还有input和确定取消按钮
 * 语法：result = prompt(title[, default]);
 * title:显示给用户的文本
 * default:可选参，指定input的初始值
 * result:返回输入的文本，取消输入返回null
 */
let age = prompt("How old are you?", 100);
alert(`You are ${age} years old!`);

/**
 * confirm 显示一个带有question和两个按钮的模态框[确定|取消]
 * 点击确定返回true,点击取消返回false
 * 语法：result = confirm(question);
 */
let isBoss = confirm("Are you the boss?");
alert(isBoss);

/**
 * 输入 name 并输出它。
 */
let name = prompt("Input your name", "user");
alert(`My name is:${name}`);
```

### 条件

```js
let age = prompt("age?", 18);

let message =
  age < 3
    ? "Hi, baby!"
    : age < 18
    ? "Hello!"
    : age < 100
    ? "Greetings!"
    : "What an unusual age!";

alert(message);
```

### Proxy 对象

- 用于定义基本操作的自定义行为(属性查找，赋值，枚举，函数调用等)

```js
/* 语法：
 * target:需拦截的对象，用Proxy包装的目标对象(可以是任何类型的对象,包括原生数组，函数，甚至另一个代理(proxy))
 * handler:定制拦截行为，一个对象，其属性是当执行一个操作时定义代理的行为的函数。
 */
let p = new Proxy(target, handler);
```

针对对象
不需要对 keys 进行遍历。这解决 Object.defineProperty() 的第二个问题.Proxy 是针对整个 obj 的。所以 obj 内部包含的所有的 key ，都可以走进 set。(省了一个 Object.keys() 的遍历)

```js
let obj = {
  name: "Eason",
  age: 30,
};
let handler = {
  get(target, key, receiver) {
    console.log("get", key);
    // Reflect 内置对象,提供拦截js操作的方法。
    // 获取对象身上某个属性的值，类似于 target[name]
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    console.log("set", key, value);
    // 将值分配给属性的函数,返回一个Boolean，如果更新成功，则返回true。
    return Reflect.set(target, key, value, receiver);
  },
};
let proxy = new Proxy(obj, handler);
proxy.name = "Zoe"; // set name Zoe
proxy.age = 18; // set age 18
```

#### 支持数组

```js
let arr = [1, 2, 3];
let proxy = new Proxy(arr, {
  get(target, key, receiver) {
    console.log("get", key);
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    console.log("set", key, value);
    return Reflect.set(target, key, value, receiver);
  },
});
proxy.push(4);
// 能够打印出很多内容
// get push     (寻找 proxy.push 方法)
// get length   (获取当前的 length)
// set 3 4      (设置 proxy[3] = 4)
// set length 4 (设置 proxy.length = 4)
```

嵌套支持
Proxy 也是不支持嵌套的，这点和 Object.defineProperty() 是一样的。因此也需要通过逐层遍历来解决。Proxy 的写法是在 get 里面递归调用 Proxy 并返回

```js
let obj = {
  info: {
    name: "eason",
    blogs: ["webpack", "babel", "cache"],
  },
};
let handler = {
  get(target, key, receiver) {
    console.log("get", key);
    // 递归创建并返回
    if (typeof target[key] === "object" && target[key] !== null) {
      return new Proxy(target[key], handler);
    }
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    console.log("set", key, value);
    return Reflect.set(target, key, value, receiver);
  },
};
let proxy = new Proxy(obj, handler);
// 以下两句都能够进入 set
proxy.info.name = "Zoe";
proxy.info.blogs.push("proxy");
```

```js
let cur = 0;
Object.defineProperty(window, "x", {
  get() {
    cur++;
    console.log(cur);
    return cur;
  },
});
console.log(x === 1 && x === 2 && x === 3); // true
```

```js
/* 实现：(a == 1 && a == 2 && a == 3) */
let a = {
  i: 1,
  toString: function () {
    return a.i++;
  },
};
if (a == 1 && a == 2 && a == 3) {
  console.log("Hello World!");
  console.log(a); // Object对象 Object:{i:4,toString:function(){return a.i++;}}
  console.log(a.i); // 4
  console.log(a.toString); // function(){return a.i++}
}
```

## 事件流分析

- 冒泡流，支持 IE6+
- window[1]-document[2]-body[3]-div[4]-[5](text)[6]-div[7]-body[8]-document[9]-window[10]
- 1-5 捕獲過程,5-6 目標過程,6-10 冒泡過程
- 以下先輸出[btn1],後輸出[content]

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
  </head>
  <body>
    <div style="width:200px;height:200px;background:lightblue" id="content">
      <div
        style="width:100px;height:100px;background: lightyellow;"
        id="btn1"
      ></div>
    </div>
  </body>
  <script type="text/javascript">
    var content = document.getElementById("content");
    var btn1 = document.getElementById("btn1");
    btn1.onclick = function () {
      alert("btn1"); // 先执行
    };
    content.onclick = function () {
      alert("content"); // 后执行
    };
  </script>
</html>
```

### 自定义对象

- 基于原型的编程语言,没有 class,把函数用作类;

**Example** 姓名的示例

```Javascript
// 人名函数 (名,姓)
function PersonName(first, last) {
    return {
        first: first,
        last: last,
        // 全名
        fullName: function () {
            return this.first + ' ' + this.last;
        },
        // 名姓 翻转
        fullNameReversed: function () {
            return this.last + ',' + this.first;
        }
    }
}

var p1 = PersonName("Lokavit", "Shakya");
console.log(p1); // 返回的是对象
console.log(p1.fullName()); // Lokavit Shakya
console.log(p1.fullNameReversed()); // Shakya,Lokavit


// this
s = PersonName("Simon", "Willison");
var fullName = s.fullName;
fullName(); // undefined undefined(因为指向了全局)

// 使用this 改进PersonName函数:
// this的特定函数不会返回任何值,只会修改this对象本身
function PersonName2(first, last) {
    this.first = first;
    this.last = last;
    // 全名
    this.fullName = function () {
        return this.first + ' ' + this.last;
    }
    // 名姓 翻转
    this.fullNameReversed = function () {
        return this.last + ',' + this.first;
    }
}

var p2 =new PersonName2("Lokavit", "Shakya");


// 创建一次方法函数,在构造函数中引用:
function PersonName3(first,last){
    this.first =first;
    this.last =last;
}
// 返回全名
// prototype:可以被所有PersonName3实例共享的对象;
PersonName3.prototype.fullName =function(){
    return this.first+' '+this.last;
}
// 返回名姓翻转
PersonName3.prototype.fullNameReversed =function(){
    return this.last +','+this.first;
}


// 运行时,给已存在的对象添加额外方法:
var p3 =new PersonName3("Lokavit", "Shakya");
// 给新实例添加一个 名转大写的函数
PersonName3.prototype.firstNameCaps =function(){
    return this.first.toUpperCase();
}
p3.firstNameCaps(); // LOKAVIT


// 将对象转换成字符串:
var p4 =new PersonName3("Lokavit", "Shakya");

PersonName3.prototype.toString =function(){
    return '<Person:'+this.fullName()+'>';
}
// <Person:Lokavit Shakya>
console.log(p4.toString());


// 使用call():设置this,但它带有一个扩展的参数列表，非数组
function lastNameCaps(){
    return this.last.toUpperCase();
}

var p5 =new PersonName3("Lokavit", "Shakya");
lastNameCaps.call(p5); // SHAKYA
// 和以下方式等价
p5.lastNameCaps =lastNameCaps;
p5.lastNameCaps();
```

---

## GitHub

```js
// 个人主信息
let url = "https://api.github.com/users/用户名";
// 个人所有repo
let url = "https://api.github.com/users/用户名/repos";
// repo详细信息
let url = "https://api.github.com/repos/用户名/仓库名";
// 获取某个repo的内容列表
let url = "https://api.github.com/repos/用户名/仓库名/contents";
// 获取repo中子目录的内容列表 获取repo中某文件信息（不包括内容）
let url =
  "https://api.github.com/repos/用户名/仓库名/contents/子文件夹/子子文件夹";
// 获取某文件的原始内容（Raw） 也就是每个.md文件的内容
let url =
  "https://raw.githubusercontent.com/用户名/仓库名/master/子文件夹/子子文件夹/文件名.md";
let url =
  "https://raw.githubusercontent.com/用户名/仓库名/master/子文件夹/子子文件夹/" +
  title;
```
