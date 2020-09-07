// 所有的js文件中书写代码，都是全局作用域
// function fn() {
//   // 局部作用域
//   var n = 1
// }

// 自调用函数  开启一个新的作用域，避免匿名冲突
(function() {
  
  // 记录上一次创建的食物，为删除做准备
  var elements = []

  function Food(options) {
    options = options || {}
    this.x = options.x || 0
    this.y = options.y || 0
    this.width = options.width || 20
    this.height = options.height || 20
    this.color = options.color || 'green'


  }

  Food.prototype.render = function(map) {
    // 删除之前创建的食物
    remove()

    // 随机设置x,y
    this.x = Tools.getRandom(0, map.offsetWidth / this.width - 1) * this.width
    this.y = Tools.getRandom(0, map.offsetHeight / this.height - 1) * this.height

    // 动态创建div
    var div = document.createElement('div')
    map.appendChild(div)

    elements.push(div)

    // 设置div样式
    div.style.left = this.x + 'px'
    div.style.top = this.y + 'px'
    div.style.position = 'absolute'
    div.style.width = this.width + 'px'
    div.style.height = this.height + 'px'
    div.style.backgroundColor = this.color
  }

  function remove() {
    for(var i = elements.length - 1; i >= 0; i--) {
      // 删除div和数组中的元素
      elements[i].parentNode.removeChild(elements[i])
      elements.splice(i, 1)
    }
  }

  // 局部作用域
  // 把Food构造函数，让外部可以访问到
  window.Food = Food
})()




// 测试
// var map = document.getElementById('map')
// var food = new Food()
// food.render(map)