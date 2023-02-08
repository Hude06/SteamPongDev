import { Bounds, Point, Size } from "../node_modules/josh_js_util/dist/index.js";
Bounds.prototype.translate = function (pt) {
  return new Bounds(this.position.add(pt), this.size);
}
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let bootsImage = new Image()
class Paddle {
  constructor(x,y,w,h,speed) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.moving = false;
    this.AISpeed = 1;
    this.speed = speed;
    this.color = "black"
    this.accessory = ""
  }
  draw() {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x,this.y,this.w,this.h)
  }
  move() {
    if (GameGlobals.currentKey.get("w") === true) {
      paddle.y -= paddle.speed;
      this.moving = true;
    }
    if (GameGlobals.currentKey.get("W") === false) {
      this.moveing = false;
    }
    if (GameGlobals.currentKey.get("s") === true) {
      paddle.y += paddle.speed;
      this.moveing = true;
    }
  }
  AI() {
    if (player2.y <= ball.y) {
      player2.y += this.AISpeed
    }
    if (player2.y >= ball.y) {
      player2.y -= this.AISpeed
    }
  }
  Accessory() {
  
  if (this.accessory === "boots") {
    Boots.draw(this.x-10 ,this.y+85,2,2)
    }
  }
}
class Ball {
  constructor() {
    this.w = 10;
    this.h = 10;
    this.x = 500;
    this.y = 50;
    this.speed = -3;
    this.spin = 0.5;
    this.color = "red";
  }
  draw() {
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = this.color
    ctx.fillRect(this.x,this.y,this.w,this.h)
  }
  update() {
    this.x += this.speed;
    this.y += this.spin
  }
  reset() {
    this.w = 10
    this.h = 10
    this.x = 500
    this.y = 50
    this.spin = 0.2
    this.speed = -3
    this.color = "red"
  }
}
class Score  {
  constructor() {
    this.color = "red"
    this.Size = 50
    this.PlayerScore = 0;
    this.Player2Score = 0;
    this.horOfset = 10
    this.vertOfset = -80
  }

  draw() {
    ctx.font = + this.Size + "px serif";
    ctx.fillStyle = this.color
    ctx.fillText(this.Player2Score, canvas.width/2+180 + this.horOfset, 90 + this.vertOfset + this.Size);
    ctx.fillText(this.PlayerScore, canvas.width/2-200 - this.horOfset, 90 + this.vertOfset + this.Size);


  }

}
class Item {  
  constructor() {
    this.color = "black"
    this.src = ""
    this.image = ""
  }
  draw(x,y,w,h) {
    ctx.drawImage(this.image,x,y,16*w,16*h)
  }
}
class Store {
  constructor() {
    this.color = "white"
    this.Size = 50;
    this.itemOn = 0;
  }
  draw() {
    console.log("Drawing Store")
    ctx.strokeStyle = this.color;
    ctx.font = + this.Size + "px serif";
    ctx.fillText("Store", canvas.width/2 - 60, 50)
    ctx.strokeRect(0,0,window.innerWidth-20,window.innerHeight-50)
  }
  CheckItems() {
    for (let i = 0; i < items.length; i++) {
        ctx.strokeStyle = "black"
        ctx.lineWidth = 1;
        ctx.strokeRect(25+i*75,60,50,50)
        items[i].draw(25+i*75,55,3,3);
    }
  }
  Selector() {
    console.log("s")
    console.log(GameGlobals.currentKey)
    if (GameGlobals.navKey.get("d") === true || GameGlobals.navKey.get("ArrowRight") === true) {
      this.itemOn += 1;
    }
    if (GameGlobals.navKey.get("a") === true || GameGlobals.navKey.get("ArrowLeft") === true) {
      this.itemOn -= 1;
    }
    if (this.itemOn >= items.length) {
      this.itemOn = 0;
    }
    if (this.itemOn <= -1) {
      this.itemOn = 0;
    }
    ctx.strokeStyle = "red"
    ctx.strokeRect(22.5+75*this.itemOn,58,55,55)
    if (GameGlobals.navKey.get("Enter") === true) {
      if (this.itemOn === 0) {
        paddle.accessory = "boots"
      }
      GameGlobals.mode = "game"
    }
  }
}
let Boots = new Item();
bootsImage.src = "./assets/Boots.png"
Boots.image = bootsImage;
const food = null;
const hude = null
const jude = null
const items = [Boots]
let ball = new Ball();
let paddle = new Paddle(10,10,10,100,3);
let player2 = new Paddle(window.innerWidth-100,10,10,100,1);
let score = new Score();
let store = new Store();
let GameGlobals = {
  mode: "game",
  DevModeOn: false,
  currentKey: new Map(),
  navKey: new Map(),
}
function GameKeyboardLoop() {
  if (GameGlobals.currentKey.get("o") === true) {
    GameGlobals.mode = "store"
  }
  if (GameGlobals.currentKey.get("g") === true) {
    GameGlobals.mode = "game"
  }
}
function CheckPaddleWalls() {
  if (paddle.y >= (canvas.height - paddle.h)) {
    console.log("Bottom")
    paddle.y = canvas.height - paddle.h
  }
  if (paddle.y <= (canvas.height - canvas.height)) {
    console.log("TOPPP")
    paddle.y = canvas.height - canvas.height
  }

  if (player2.y >= (canvas.height - player2.h)) {
    console.log("Bottom")
    player2.y = canvas.height - player2.h
  }
  if (player2.y <= (canvas.height - canvas.height)) {
    console.log("TOPPP")
    player2.y = canvas.height - canvas.height
  }
}
function ClearScreen() {
  ctx.clearRect(0,0,canvas.width,canvas.height)
}
function setupKeyboard() {
  window.addEventListener("keydown", function (event) {
    GameGlobals.currentKey.set(event.key, true);
    GameGlobals.navKey.set(event.key, true);

  });
  window.addEventListener("keyup", function (event) {
    GameGlobals.currentKey.set(event.key, false);
    GameGlobals.navKey.set(event.key, false);

  });
}
function ResizeCanvas() {
  canvas.width = window.innerWidth -20
  canvas.height = window.innerHeight -50
  paddle.y = (window.innerHeight / 2) - 50
  player2.y = (window.innerHeight / 2) - 50
  player2.x = (window.innerWidth) - 40
}
function CheckDebug() {
  if (GameGlobals.DevModeOn === true) {
    if (GameGlobals.currentKey.get("r") === true) {
      ball.reset();
    }
  }
}
function Loop() {
  GameKeyboardLoop();
  if (GameGlobals.mode === "game") {
    CheckDebug();
    paddle.move();
    ball.update();
    CheckPaddleWalls();
    ClearScreen();
    paddle.AI();
    paddle.draw();
    paddle.Accessory(); 
    player2.draw();
    ball.draw();
    score.draw();
    }
  if (GameGlobals.mode === "store") {
    ClearScreen();
    store.draw();
    store.CheckItems();
    store.Selector();
  }
  GameGlobals.navKey.clear();
  requestAnimationFrame(Loop)
}
function init() {
  window.addEventListener("load", (e) => {
    ResizeCanvas()
  })
  window.addEventListener("resize", (e) => {
    ResizeCanvas();

  })
  setupKeyboard();
  Loop();
}
init();