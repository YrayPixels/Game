//Object Oriented Programming
//all your assets are loaded on the page
window.addEventListener('load', function () {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d'); //context is to draw on 2d
    canvas.width = 300;
    canvas.height = 700;

    let enemies = [];
    // inputHandler
    class InputHandler {
        constructor() {
            this.keys = [];
            window.addEventListener('keydown', e => {
                const key = e.key;
                const available = this.keys.indexOf(key) == -1
                if ((key === 'ArrowUp'
                    || key === 'ArrowDown'
                    || key === 'ArrowRight'
                    || key === 'ArrowLeft') && available) {
                    this.keys.push(key);
                }
            })
            window.addEventListener('keyup', e => {
                const key = e.key;
                if (key === 'ArrowUp'
                    || key === 'ArrowDown'
                    || key === 'ArrowRight'
                    || key === 'ArrowLeft') {
                    this.keys.splice(this.keys.indexOf(key), 1);
                }
            })
        }
    }
    class Player {
        constructor(gameWidth, gameHeight) {
            this.gameHeight = gameHeight;
            this.gameWidth = gameWidth;
            this.width = 80;
            this.height = 150;
            this.y = this.gameHeight - this.height;
            this.x = 0;
        }
        draw(context) {
            const playerImage = document.getElementById('player');
            context.drawImage(playerImage, this.x, this.y, this.width, this.height);
        }
        update(input) {
            if (input.keys.indexOf('ArrowUp') > -1) {
                this.y -= 5;
            } else if (input.keys.indexOf('ArrowDown') > -1) {
                this.y += 5;
            } else if (input.keys.indexOf('ArrowLeft') > -1) {
                this.x -= 5;
            } else if (input.keys.indexOf('ArrowRight') > -1) {
                this.x += 5;
            }
            if (this.x < 0) this.x = 0;
            else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width
            if (this.y < 0) this.y = 0
            else if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height
        }
    }
    // Background
    class Background {
        constructor(gameWidth, gameHeight) {
            this.gameHeight = gameHeight;
            this.gameWidth = gameWidth;
            this.height = this.gameHeight;
            this.width = this.gameWidth;
            this.x = 0;
            this.speed = 5;
            this.y = 0;
            this.image = document.getElementById('background');
        }
        draw(context) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.x, this.y - this.gameHeight, this.width, this.height);
        }

        update() {
            this.y += this.speed;
            if (this.y > this.gameHeight) {
                this.y = 0
            }
        }
    }
    class Enemy {
        constructor(gameWidth, gameHeight) {
            this.gameHeight = gameHeight;
            this.gameWidth = gameWidth;
            this.width = 80;
            this.height = 150;
            this.y = -this.height;
            this.speed = Math.floor(Math.random() * 5)
            this.x = Math.floor(Math.random() * this.gameWidth - 0);

        }
        draw(context) {
            const playerImage = document.getElementById('enemy');
            context.drawImage(playerImage, this.x, this.y, this.width, this.height);
        }
        update() {
            this.y += this.speed;
        }
    }


    function handleEnemiesMovement(timeDiff) {
        if (enemyTimer > enemyInterval + randomInterval) {
            enemies.push(new Enemy(canvas.width, canvas.height));
            randomInterval = Math.random() * 1000 + 500;
            enemyTimer = 0;
        } else {
            enemyTimer = timeDiff;
        }
        enemies.forEach((enemy) => {
            enemies.draw(ctx)
            enemy.update();
        })
    }

    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    const bg = new Background(canvas.width, canvas.height);

    let enemyTimer = 0;
    let enemyInterval = 1000;
    let randomInterval = Math.random() * 1000 + 500;
    let previousTime = 0
    function animate(timeStamp) {
        const timeDiff = timeStamp - previousTime;
        previousTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        bg.draw(ctx);
        bg.update();
        handleEnemiesMovement(timeDiff);
        player.draw(ctx);
        player.update(input);
        requestAnimationFrame(animate);
    }
    animate();
})