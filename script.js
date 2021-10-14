// Specifies resources
let resources = {images:[
                  {id:"bk", src:"images/bk.png"},
                  {id:"apple", src:"images/apple.png"},
                  {id:"basket",src:"images/basket.png"},
                  {id:"grass" , src:"images/grass.png"},
                  {id:"logo" , src:"images/logo.png"}
                  ],
                 audios:[
                
                  ]
                };

// Load resources and starts the game loop
function preload(){
    game = new Game("game");
    game.preload(resources);
    game.state = init;
    gameloop();
}
document.onload = preload();

// Controls the state of the game
function gameloop(){
  game.processInput()
  if(game.ready){
    game.state();
  }
  game.update()
  setTimeout(gameloop,20);
}


// Create game objects and perform any game initialization
function init(){
  bk = new Sprite(game.images.bk, game)
  bk.scale=0.50
  game.setBackground(bk)
  apple = new Sprite(game.images.apple, game)
  apple.scale=0.50
  apple.x = randint(100,350)
  apple.y = -10
  apple.setVector(4,180)
  basket = new Sprite(game.images.basket, game)
  basket.scale = 0.75
  grass = new Sprite(game.images.grass,game)
  grass.scale = 5.5
  grass.y=game.height +180
  game.state = main;
  word = new Font("30px", "Comic Sans MS" , "blue", "black")
  scoree = new Sprite(game.images.apple, game)
  scoree.scale=0.50
  scoree.x = 40
  scoree.y = game.height - 40
  logo = new Sprite(game.images.logo,game)
  logo.scale = 9

  game.state = instructions;
}


function instructions(){
  bk.draw()
  logo.draw()
  game.drawText("Press [Space] to begin", game.height/2 - 130, game.width /2 + 30, word)
  game.drawText("Catch as many apples as you can!", game.height/2 - 210, game.width /2 + 55, word)
  
  
  if(key.pressed[key.space]){
    game.state = main;
  }
}
// Game logic
function main(){
  bk.draw()
  grass.draw()
  apple.move()
  basket.draw()
  basket.moveTo(mouse.x,mouse.y)
  scoree.draw()
  game.drawText(`X ${game.score}` , scoree.right + 5, scoree.y + 7, word)

  if(apple.collidedWith(basket)){
    apple.speed += .1
    apple.visible = false
    apple.x = randint(100,400)
    apple.y = -5
    apple.speed += 1
    apple.visible = true
    game.score += 1
  }

  

  if(apple.y >= 450){
    game.state = gameover;
  }

}

function gameover(){
  bk.draw()
  scoree.draw()
  game.drawText(`X ${game.score}` , scoree.right + 5, scoree.y + 7, word)
  game.drawText("You Lost.", game.height/2 - 50, game.width /2 - 50, word)
  game.drawText("Press [P] to play again", game.height/2 - 120, game.width /2 - 20, word)

  if(key.pressed[key.P]){
    game.score = 0
    apple.speed += .1
    apple.visible = false
    apple.x = randint(100,400)
    apple.y = -5
    apple.speed += 1
    apple.setVector(4,180)
    apple.visible = true
    game.state = main;

  }
}
