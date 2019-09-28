'use strict'
/**
 * Vue DOM懒动画
 *
 * options {
 *  top: 监听加载高节点
 * }
 *
 * DOM 随滚动进度，在可视区显示情况渲染
 *
 */
export default {
  install: (Vue, options = { top: -40 }) => {
    if (!Array.prototype.remove) {
      Array.prototype.remove = function(item) {
        if (!this.length) return
        var index = this.indexOf(item)
        if (index > -1) {
          this.splice(index, 1)
          return this
        }
      }
    }
    var listenList = []
    var catcheList = []

    const isAlredyLoad = dom => {
      if (catcheList.indexOf(dom) > -1) {
        return true
      } else {
        return false
      }
    }

    // 检测是否可以加载，如果可以则进行加载
    const isCanShow = ({ ele, ani }) => {
      // var src = item.src;
      // 图片距离页面顶部的距离
      let top = ele.getBoundingClientRect().top
      // 页面可视区域的高度
      // var windowHeight = window.innerHight;
      // top + 20 已经进入了可视区域20像素
      if (top + options.top < window.innerHeight) {
        // // 图片的懒加载
        // if (item.type === 1 || item.type === 2) {
        //   var image = new Image();
        //   image.src = src;
        //   image.onload = function() {
        //     // 加载成功
        //     ele.src = src;
        //     catcheList.push(src);
        //     listenList.remove(item);
        //   };
        //   image.onerror = function() {
        //     // 加载失败
        //     ele.src = init.errImage;
        //     catcheList.push(init.errImage);
        //     listenList.remove(item);
        //   };
        // }
        // 盒模型的懒加载
        // if (item.type === 3) {
        let dom = ele
        if (dom.className.split(' ').indexOf(ani) === -1) {
          catcheList.push(dom)
          dom.classList.add(ani)
        }
        // }
        return true
      } else {
        return false
      }
    }

    const onListenScroll = () => {
      window.addEventListener('scroll', function() {
        var length = listenList.length
        for (let i = 0; i < length; i++) {
          isCanShow(listenList[i])
        }
      })
    }
    // Vue 指令最终的方法
    const addListener = (ele, binding) => {
      ele.style.opacity = 0
      // 绑定的图片地址
      // var imageSrc =
      //   Object.prototype.toString.call(binding.value) === '[object Object]'
      //     ? binding.value.src
      //     : binding.value;
      // let type =
      //   Object.prototype.toString.call(binding.value) === '[object Object]'
      //     ? binding.value.type
      //     : 1;

      // 如果已经加载过，则无需重新加载，直接将src赋值
      if (isAlredyLoad(ele)) {
        return false
      }

      var item = {
        ele: ele,
        ani: binding.value ? binding.value : 'animate-slideInUpSpe'
      }
      // 再看看是否可以显示此图片
      if (isCanShow(item)) {
        return
      }
      // 否则将dom地址和元素均放入监听的lisenList里
      listenList.push(item)

      // 然后开始监听页面scroll事件
      onListenScroll()
    }

    Vue.directive('lazyAnimate', {
      inserted: addListener
      // updated: addListener,
      // componentUpdated: addListener
    })
  }
}
// var _default = function _default(Vue) {
//   var options =
//     arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

//   if (!Array.prototype.remove) {
//     Array.prototype.remove = function(item) {
//       if (!this.length) return;
//       var index = this.indexOf(item);

//       if (index > -1) {
//         this.splice(index, 1);
//         return this;
//       }
//     };
//   }

//   var listenList = [];
//   var catcheList = [];

//   var isAlredyLoad = function isAlredyLoad(dom) {
//     if (catcheList.indexOf(dom) > -1) {
//       return true;
//     } else {
//       return false;
//     }
//   }; // 检测是否可以加载，如果可以则进行加载

//   var isCanShow = function isCanShow(_ref) {
//     var ele = _ref.ele,
//       ani = _ref.ani;
//     // var src = item.src;
//     // 图片距离页面顶部的距离
//     var top = ele.getBoundingClientRect().top; // 页面可视区域的高度
//     // var windowHeight = window.innerHight;
//     // top + 10 已经进入了可视区域10像素

//     if (top + 10 < window.innerHeight) {
//       // // 图片的懒加载
//       // if (item.type === 1 || item.type === 2) {
//       //   var image = new Image();
//       //   image.src = src;
//       //   image.onload = function() {
//       //     // 加载成功
//       //     ele.src = src;
//       //     catcheList.push(src);
//       //     listenList.remove(item);
//       //   };
//       //   image.onerror = function() {
//       //     // 加载失败
//       //     ele.src = init.errImage;
//       //     catcheList.push(init.errImage);
//       //     listenList.remove(item);
//       //   };
//       // }
//       // 盒模型的懒加载
//       // if (item.type === 3) {
//       var dom = ele;

//       if (dom.className.split(' ').indexOf(ani) === -1) {
//         catcheList.push(dom);
//         dom.classList.add(ani);
//       } // }

//       return true;
//     } else {
//       return false;
//     }
//   };

//   var onListenScroll = function onListenScroll() {
//     window.addEventListener('scroll', function() {
//       var length = listenList.length;

//       for (var i = 0; i < length; i++) {
//         isCanShow(listenList[i]);
//       }
//     });
//   }; // Vue 指令最终的方法

//   var addListener = function addListener(ele, binding) {
//     // 绑定的图片地址
//     // var imageSrc =
//     //   Object.prototype.toString.call(binding.value) === '[object Object]'
//     //     ? binding.value.src
//     //     : binding.value;
//     // let type =
//     //   Object.prototype.toString.call(binding.value) === '[object Object]'
//     //     ? binding.value.type
//     //     : 1;
//     // 如果已经加载过，则无需重新加载，直接将src赋值
//     if (isAlredyLoad(ele)) {
//       return false;
//     }

//     var item = {
//       ele: ele,
//       ani: binding.value ? binding.value : 'animate-slideInUpSpe'
//     }; // 再看看是否可以显示此图片

//     if (isCanShow(item)) {
//       return;
//     } // 否则将dom地址和元素均放入监听的lisenList里

//     listenList.push(item); // 然后开始监听页面scroll事件

//     onListenScroll();
//   };

//   Vue.directive('lazyAnimate', {
//     inserted: addListener // updated: addListener,
//     // componentUpdated: addListener
//   });
// };

// exports.default = _default;
