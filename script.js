const para = document.querySelector('p');
// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// define Shape constructor

class Shape {
  constructor(x, y, velX, velY, exists) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = exists;
  }
}

class Ball extends Shape {
  constructor(x, y, velX, velY, color, size, exists) {
    super(x, y, velX, velY, exists)
    
    this.color = color;
    this.size = size;
  }
  
  // drawing the ball
  
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }


// Ball.prototype.draw = function() {
//   ctx.beginPath();
//   ctx.fillStyle = this.color;
//   ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
//   ctx.fill();
// }

// Ball updating method

// if the x/y coordinate is greater than the width/height of the canvas (the ball is going out of the right/bottom edge)
// if the x/y coordinate is smaller than 0 (the ball is going out of the left/top edge)
// plus the size of the ball, so when the ball hits the edge and not when the center of the ball hits the edge
// revert the velocity of the ball, so it goes the other way

  update() {
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }
    
    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }
    
    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }
    
    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }
    
// Ball.prototype.update = function() {
//   if ((this.x + this.size) >= width) {
//     this.velX = -(this.velX);
//   }

//   if ((this.x - this.size) <= 0) {
//     this.velX = -(this.velX);
//   }

//   if ((this.y + this.size) >= height) {
//     this.velY = -(this.velY);
//   }

//   if ((this.y - this.size) <= 0) {
//     this.velY = -(this.velY);
//   }

  // add the velocity to the coordinate so the ball can actually move

    this.x += this.velX;
    this.y += this.velY;
  }

// define the ball colision detection
  
  colisionDetect() {
    for (let j = 0; j < balls.length; j++) {
      if (!(this === balls[j])) {
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.size + balls[j].size) {
          balls[j].color = this.color = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}`;
        }
      }
    }
  }
  
//   Ball.prototype.colisionDetect = function() {
//     for (let j = 0; j < balls.length; j++) {
//       if (!(this === balls[j])) {
//         const dx = this.x - balls[j].x;
//         const dy = this.y - balls[j].y;
//         const distance = Math.sqrt(dx * dx + dy * dy);

//         if (distance < this.size + balls[j].size) {
//           balls[j].color = this.color = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}`;
//         }
//       }
//     }
//   }

} // --> end of class Ball

// evil circle

class EvilCircle extends Shape {
  constructor(x, y, velX, velY, color, size, exists) {
    super(x, y, 20, 20, exists)
    
    this.color = 'white';
    this.size = 10;
  }
  
  draw() {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }   
  
  checkBounds() {
    if ((this.x + this.size) >= width) {
      this.x -= this.size;
    }
    
    if ((this.x - this.size) <= 0) {
      this.x += this.size;
    }
    
    if ((this.y + this.size) >= height) {
      this.y -= this.size;
    }
    
    if ((this.y - this.size) <= 0) {
      this.y += this.size;
    }
  }
  
  setControls() {
    let _this = this;
    window.onkeydown = function(e) {
      if (e.key === 'a' || e.key === 'ArrowLeft') {
        _this.x -= _this.velX;
      } else if (e.key === 'd' || e.key === 'ArrowRight') {
        _this.x += _this.velX;
      } else if (e.key === 'w' || e.key === 'ArrowUp') {
        _this.y -= _this.velY;
      } else if (e.key === 's' || e.key === 'ArrowDown') {
        _this.y += _this.velY;
      }
    }
  }
  
  colisionDetect() {
    for (let j = 0; j < balls.length; j++) {
      if ( balls[j].exists === true ) {
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.size + balls[j].size) {
          balls[j].exists = false;
        }
      }
    }
  }
}

// animating the ball

// define an array to store the balls and populate it

let balls = [];

while (balls.length < 25) {
  let size = random(10, 20);
  let ball = new Ball(
// ball position is always drawn at least one ball width away from the edge of the canvas, to avoid drawing errors
    random(0 + size,width - size),
    random(0 + size,height - size),
    random(-7,7),
    random(-7,7),
    `rgb(${random(0,255)}, ${random(0,255)}, ${random(0,255)})`,
    size,
    true
  );
  balls.push(ball);
}

let evilCircle1 = new EvilCircle(
  random(0 + 10, width - 10),
  random(0 + 10, height - 10),
  true
);

evilCircle1.setControls();

// define a loop that keeps drawing the scene constantly

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);
  let ballCount = balls.length;
  
  for (let i = 0; i < balls.length; i++) {
    if (balls[i].exists === true) {
      balls[i].draw();
      balls[i].update();
      balls[i].colisionDetect();
      para.textContent = `Ball count: ${ballCount}`;
    } else if (balls[i].exists === false) {
      ballCount -= 1;
      para.textContent = `Ball count: ${ballCount}`;
    }
    
    evilCircle1.draw();
    evilCircle1.checkBounds();
    evilCircle1.colisionDetect();
  }
  
  requestAnimationFrame(loop);
}

loop();