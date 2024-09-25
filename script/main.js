const canvas = document.getElementById('canvas'); // 获取画布元素
const ctx = canvas.getContext('2d'); // 获取2D渲染上下文

canvas.width = window.innerWidth; // 设置画布宽度为窗口宽度
canvas.height = window.innerHeight; // 设置画布高度为窗口高度

class Star {
  constructor(x, y, outerRadius, innerRadius, color, dx, dy) {
    this.x = x; // 星星的x坐标
    this.y = y; // 星星的y坐标
    this.outerRadius = outerRadius; // 星星的外部半径
    this.innerRadius = innerRadius; // 星星的内部半径
    this.color = color; // 星星的颜色
    this.dx = dx; // 星星在x轴的速度
    this.dy = dy; // 星星在y轴的速度
    this.angle = 0; // 用于旋转星星的角度
    this.history = []; // 用于存储星星的轨迹
    this.maxHistory = 100; // 轨迹的最大长度
  }

  draw() {
    // 绘制轨迹
    ctx.beginPath(); // 开始一个新的路径
    ctx.moveTo(this.x, this.y); // 将画笔移动到星星当前位置
    this.history.forEach((point, index) => { // 遍历轨迹数组
      ctx.lineTo(point.x, point.y); // 绘制线条到每个轨迹点
    });
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'; // 设置轨迹颜色和透明度
    ctx.stroke(); // 绘制轨迹线条

    // 绘制星星
    ctx.beginPath(); // 开始一个新的路径
    for (let i = 0; i < 5; i++) { // 星星有5个顶点
      ctx.lineTo(
        this.x + this.outerRadius * Math.cos(this.angle + i * 2 * Math.PI / 5),
        this.y + this.outerRadius * Math.sin(this.angle + i * 2 * Math.PI / 5)
      );
      ctx.lineTo(
        this.x + this.innerRadius * Math.cos(this.angle + (i * 2 + 1) * Math.PI / 5),
        this.y + this.innerRadius * Math.sin(this.angle + (i * 2 + 1) * Math.PI / 5)
      );
    }
    ctx.closePath(); // 关闭路径
    ctx.fillStyle = this.color; // 设置星星填充颜色
    ctx.fill(); // 填充星星
  }

  update() {
    // 更新星星位置
    if (this.x + this.outerRadius > canvas.width || this.x - this.outerRadius < 0) {
      this.dx = -this.dx; // 改变x方向速度
    }
    if (this.y + this.outerRadius > canvas.height || this.y - this.outerRadius < 0) {
      this.dy = -this.dy; // 改变y方向速度
    }
    this.x += this.dx; // 更新x坐标
    this.y += this.dy; // 更新y坐标

    // 更新轨迹历史
    this.history.push({ x: this.x, y: this.y }); // 添加新的轨迹点
    if (this.history.length > this.maxHistory) { // 如果轨迹长度超过最大长度
      this.history.shift(); // 移除最早的轨迹点
    }
  }
}

let stars = []; // 存储星星的数组

for (let i = 0; i < 70; i++) { // 创建10个星星
  let outerRadius = Math.random() * 20 + 10; // 随机外半径
  let innerRadius = outerRadius * 0.4; // 内部半径约为外部半径的40%
  let x = Math.random() * (canvas.width - outerRadius * 2) + outerRadius; // 随机x坐标
  let y = Math.random() * (canvas.height - outerRadius * 2) + outerRadius; // 随机y坐标
  let dx = Math.random() * 2 - 1; // 随机x方向速度
  let dy = Math.random() * 2 - 1; // 随机y方向速度
  let color = `hsl(${Math.random() * 360}, 100%, 50%)`; // 随机颜色
  stars.push(new Star(x, y, outerRadius, innerRadius, color, dx, dy)); // 将新星星添加到数组
}

function animate() {
  requestAnimationFrame(animate); // 请求下一帧动画
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除画布
  stars.forEach(star => { // 遍历星星数组
    star.draw(); // 绘制星星
    star.update(); // 更新星星位置
  });
}

animate(); // 开始动画
