(function() {
  var that // 记录游戏对象
  function Game(map) {
    this.food = new Food()
    this.snake = new Snake()
    this.map = map
    that = this
  }

  Game.prototype.start = function() {
    // 1、把蛇和食物渲染
    this.food.render(this.map)
    this.snake.render(this.map)

    // 2、开始游戏的逻辑
    // 2.1 让蛇移动起来
    // 2.2 当蛇遇到边界游戏结束
    runSnake()
    // 2.3 通过键盘控制蛇移动的方向
    bindKey()
    // 2.4 当蛇遇到食物做相应的处理
  }

  // 2.3 通过键盘控制蛇移动的方向
  function bindKey() {
    // document.onkeydown = function() {}
    document.addEventListener('keydown', function(e) {
      // console.log(e.keyCode)
      // 37 left
      // 38 top
      // 39 right
      // 40 bottom
      switch(e.keyCode) {
        case 37:
          this.snake.direction = 'left'
          break
        case 38:
          this.snake.direction = 'top'
          break
        case 39:
          this.snake.direction = 'right'
          break
        case 40:
          this.snake.direction = 'bottom'
          break
      }
    }.bind(that), false)
  }

  // 私有的函数
  function runSnake() {
    var timerId = setInterval(function() {
      // 让蛇走一格
      // 在定时器的function中this指向window
      // 要获取游戏对象中的蛇属性
      this.snake.move(this.food, this.map)
      this.snake.render(this.map)

      // 2.2 当蛇遇到边界游戏结束
      // 获取蛇头的坐标
      var maxX = this.map.offsetWidth / this.snake.width
      var maxY = this.map.offsetHeight / this.snake.height
      var headX = this.snake.body[0].x
      var headY = this.snake.body[0].y
      if(headX < 0 || headX >= maxX) {
        alert('Game Over')
        clearInterval(timerId)
      }

      if(headY < 0 || headY >= maxY) {
        alert('Game Over')
        clearInterval(timerId)
      }
    }.bind(that), 150)
  }

  // 暴露构造函数给外部
  window.Game = Game
})()

// 测试
// var map = document.getElementById('map')
// var game = new Game(map)
// game.start()