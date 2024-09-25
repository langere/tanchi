document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);
    const scoreDisplay = document.getElementById("scoreCount");

    let score = 0;
    let snake = [{ x: 50, y: 50 }]; // 初始化蛇，包含蛇头
    let snakeSize = 40; // 蛇的大小
    let food = generateFood(); // 随机生成食物
    let speedIncrement = 2; // 速度
    let velX = speedIncrement; // 初始水平速度
    let velY = 0; // 初始垂直速度


    // 随机生成食物的位置
    function generateFood() {
        return {
            x: random(0, Math.floor(width / snakeSize)) * snakeSize,
            y: random(0, Math.floor(height / snakeSize)) * snakeSize
        };
    }

    // 生成随机数
    function random(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    // 绘制蛇
    function drawSnake() {
        ctx.fillStyle = "green"; // 蛇的颜色
        snake.forEach(segment => {
            ctx.fillRect(segment.x, segment.y, snakeSize, snakeSize); // 绘制每个蛇身部分
        });
    }

    // 绘制食物
    function drawFood() {
        ctx.fillStyle = "red"; // 食物的颜色
        ctx.fillRect(food.x, food.y, snakeSize, snakeSize); // 绘制食物
    }

    // 更新蛇的位置
    function updateSnake() {
        const head = { x: snake[0].x + velX, y: snake[0].y + velY };

        // 如果蛇头超出了画布的边界，从另一边出现
        if (head.x >= width) head.x = 0;
        if (head.x < 0) head.x = width - snakeSize;
        if (head.y >= height) head.y = 0;
        if (head.y < 0) head.y = height - snakeSize;

        // 检查蛇是否吃到食物
        if (head.x < food.x + snakeSize && head.x + snakeSize > food.x &&
            head.y < food.y + snakeSize && head.y + snakeSize > food.y) {
            score++; // 增加分数
            speedIncrement=speedIncrement+score*0.02; // 增加速度
            if(speedIncrement>5){peedIncrement=5;}
            updateScoreDisplay(); // 更新分数显示
            food = generateFood(); // 随机生成新食物
        } else {
            snake.pop(); // 移除蛇尾，保持蛇的长度
        }

        // 检查蛇头是否与身体碰撞
        if (collisionWithSelf(head)) {
            alert("游戏结束！你的分数是：" + score);
            resetGame(); // 重新开始游戏
            return; // 退出当前更新函数
        }

        // 将新头部添加到蛇的数组中
        snake.unshift(head); 
    }

    // 检查蛇头是否与身体碰撞
    function collisionWithSelf(head) {
        for (let i = 1; i < snake.length; i++) { // 从1开始，排除蛇头
            if (head.x === snake[i].x && head.y === snake[i].y) {
                return true; // 碰撞
            }
        }
        return false; // 没有碰撞
    }

    // 更新分数显示
    function updateScoreDisplay() {
        scoreDisplay.textContent = `当前分数: ${score}`;
    }

    // 重置游戏
    function resetGame() {
        score = 0;
        snake = [{ x: 50, y: 50 }];
        velX = snakeSize;
        velY = 0;
        food = generateFood();
        updateScoreDisplay(); // 更新分数显示
    }

    // 设置控制
    window.onkeydown = (e) => {
        switch (e.key) {
            case "a": 
                if (velX === 0) { // 防止反向移动
                    velX = -speedIncrement; 
                    velY = 0; 
                }
                break;  
            case "d": 
                if (velX === 0) {
                    velX = speedIncrement; 
                    velY = 0; 
                }
                break;  
            case "w": 
                if (velY === 0) {
                    velY = -speedIncrement; 
                    velX = 0; 
                }
                break;  
            case "s": 
                if (velY === 0) {
                    velY = speedIncrement; 
                    velX = 0; 
                }
                break;  
        }
    };
// 添加虚拟按键控制
document.getElementById("up").addEventListener("click", () => {
    if (velY === 0) {
        velY = -speedIncrement;
        velX = 0;
    }
});

document.getElementById("down").addEventListener("click", () => {
    if (velY === 0) {
        velY = speedIncrement;
        velX = 0;
    }
});

document.getElementById("left").addEventListener("click", () => {
    if (velX === 0) {
        velX = -speedIncrement;
        velY = 0;
    }
});

document.getElementById("right").addEventListener("click", () => {
    if (velX === 0) {
        velX = speedIncrement;
        velY = 0;
    }
});
    // 游戏循环
    function loop() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.25)"; // 背景颜色
        ctx.fillRect(0, 0, width, height);

        drawSnake(); // 绘制蛇
        drawFood(); // 绘制食物
        updateSnake(); // 更新蛇的位置

        requestAnimationFrame(loop);
    }

    loop(); // 启动循环
});
