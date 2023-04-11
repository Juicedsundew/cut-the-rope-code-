const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var ground;
var fruit, rope;
var fruit_con;
var bg_img;
var food;
var bunny_img;
var button;
var bunny;
var fruit_con_2;
var rabbit;
var blink, eat, sad;
var fruit_con_3, rope3, fr, canW, canH
var drop3

var bk_song, cut_sound, sad_sound, eating_sound, air;




function preload()
{
  bg_img = loadImage ("background.png");
  food = loadImage ("melon.png")
  bunny_img = loadImage("Rabbit-01.png")
  
  blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png")
  eat = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png")
  sad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png")

  bk_song = loadSound("sound1.mp3");
  sad_sound = loadSound("sad.wav");
  cut_sound = loadSound("rope_cut.mp3");
  eating_sound = loadSound("eating_sound.mp3");
  air = loadSound("air.wav");

  blink.playing = true
  eat.playing = true
  sad.playing = true
  sad.looping = false
  eat.looping = false

}

function setup() 
{
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if(isMobile)
  {
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(displayWidth + 80,displayHeight)
  }
  else
  {
    canW = windowWidth;
    canH = windowHeight;
    createCanvas(windowWidth, windowHeight)
  }
  frameRate(80);

  bk_song.play()
  bk_song.setVolume(0.5)


  engine = Engine.create();
  world = engine.world;
  
  //button1
  button = createImg("cut_button.png");
  button.position(20, 30);
  button.size(50, 50);
  button.mouseClicked(drop);

  //button2
  button2 = createImg("cut_button.png");
  button2.position(330, 35);
  button2.size(60, 60);
  button2.mouseClicked(drop2);

  //button3
  button3 = createImg("cut_button.png");
  button3.position(360, 200);
  button3.size(60, 60);
  button3.mouseClicked(drop3);

  //air blower
  blower = createImg("balloon.png");
  blower.position(10, 250);
  blower.size(150, 100);
  blower.mouseClicked(airBlow);

  //mute
  mute_btn = createImg("mute.png");
  mute_btn.position(450, 20);
  mute_btn.size(50, 50);
  mute_btn.mouseClicked(mute)

  ground = new Ground(200, canH, 600, 20);

  rope = new Rope(8, {x:40, y:30})

  rope2 = new Rope(7, {x:370, y:40})

  rope3 = new Rope(4, {x:400, y:225})


  
  blink.frameDelay = 20
  eat.frameDelay = 20
  sad.frameDelay = 20

  //bunny
  bunny = createSprite(50, 620, 100, 100);
  //bunny.addImage(bunny_img);
  bunny.scale = 0.2;

  bunny.addAnimation("blinking", blink)
  bunny.addAnimation("eating", eat)
  bunny.addAnimation("crying", sad)
  bunny.changeAnimation("blinking")

  fruit = Bodies.circle(300, 300, 20)
  Matter.Composite.add(rope.body, fruit)
  fruit_con = new Link(rope, fruit)
  fruit_con_2 = new Link(rope2, fruit)
  fruit_con_3 = new Link(rope3, fruit)

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER)
}

function draw() 
{
  background(51);
  image(bg_img, 0, 0, displayWidth + 80, displayHeight)
  
  push()
  imageMode(CENTER)
  if(fruit != null)
  {
    image(food, fruit.position.x, fruit.position.y, 70, 70);
  }
  pop()
  	
  Engine.update(engine);
  if(collide(fruit, bunny) == true)
  {
    bunny.changeAnimation("eating")
    eating_sound.play()
  }

  if(fruit != null && fruit.position.y >= 650)
  {
    bunny.changeAnimation("crying")
    bk_song.stop()
    sad_sound.play()
    fruit = null
  }

  ground.show();
  
  rope.show()
  rope2.show()
  rope3.show()
  drawSprites()
}

function drop()
{
  cut_sound.play()
  rope.break()
  fruit_con.detatch()
  fruit_con = null
}

function drop2()
{
  cut_sound.play()
  rope2.break()
  fruit_con_2.detatch()
  fruit_con_2 = null
}

function drop3()
{
  cut_sound.play()
  rope3.break()
  fruit_con_3.detatch()
  fruit_con_3 = null
}

function keyPressed()
{
  if(keyCode == LEFT_ARROW)
  {
    airBlow()
  }
}

function collide(body, sprite)
{
  if(body != null)
  {
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y)
    if(d <= 80)
    {
      World.remove(engine.world, fruit)
      fruit = null
      return true
    }
    else
    {
      return false
    }
  }
}

function airBlow()
{
  Matter.Body.applyForce(fruit, {x:0, y:0}, {x:0.01, y:0})
  air.play()
}

function mute()
{
  if(bk_song.isPlaying())
  {
    bk_song.stop()
  }
  else
  {
    bk_song.play()
  }
}

