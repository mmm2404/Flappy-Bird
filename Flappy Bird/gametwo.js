// const scores = document.getElementsByClassName('score');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//загружаем картинки

const background = new Image();
const ground = new Image();
const pipeBottom = new Image();
const pipeTop = new Image();
const bird = new Image();

// источники изображений

background.src = "./sprites/bg.jpg";
pipeBottom.src = "./sprites/pipeBottom.png";
pipeTop.src = "./sprites/pipeTop.png";
bird.src = "https://i.ibb.co/Q9yv5Jk/flappy-bird-set.png";
ground.src = "./sprites/bg.jpg";


//переменные 
 let bgSpeed = 1.2; 
 let grSpeed = 1.2;
 let index = 0;
 let gap = 100;
 let velY = 0;
 let score = 0;
 let best_score = 0;
 let gravity = 0.9;
 let birdY = 120;
 let birdX = 10;
 let jump = 35;
 const SIZE = [51, 36]; //размеры птички 

 let pipe = [];

 pipe[0] = {
        x : canvas.width,
        y : 0
   };
const grX = -((index * bgSpeed) % canvas.width);
const bgX = -((index * bgSpeed) % canvas.width);
const i = 0;
document.addEventListener("click", flyUp);

function flyUp(){
    birdY -= 24;
};

function reload() {
    birdX = 10;
    birdY = 120;
    speed= 0;
    pipe = [];
    if (score > best_score) {
            best_score = score;
    }
    score = 0;
    pipe[0] = {
        x : canvas.width,
        y : 0
   };
     
  };

 function draw() {
    index += 0.1;


// отрисовка фона, для имитпции движения рисуем  две части, идущие одна за другой 
    
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height, bgX + canvas.width, 0, canvas.width, canvas.height);           
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height, bgX, 0, canvas.width, canvas.height);    

 //в роли ground выступает часть background с изображением неба (типа вода отражает небо :))
  
     ctx.drawImage(ground, 0, 0, canvas.width, 150, grX + canvas.width, 450, canvas.width, canvas.height - ground.height);
     ctx.drawImage(ground, 0, 0, canvas.width, 150, grX, 450, canvas.width, canvas.height - ground.height);
    
 // риcуем птичку

 ctx.drawImage(bird, 432, Math.floor((index % 9) / 3) * SIZE[1], SIZE[0], SIZE[1], birdX, birdY, SIZE[0], SIZE[1]);

 birdY += gravity;
//  if(birdY + SIZE[1] >= canvas.height - ground.height){
//     reload();
//  }
      
 // отрисовываем трубы
 
 for(let i = 0; i < pipe.length; i++){
        // if(pipe[i].x < -pipeTop.width){
        //     pipe.shift()
        // }
        // else{
        ctx.drawImage(pipeTop, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeTop.height + gap);
        pipe[i].x--;

        if(pipe[i].x == 300){
            pipe.push({
            x : canvas.width,
            y : Math.floor(Math.random() * pipeTop.height) - pipeTop.height});
        
    }
 }
     //отслеживаем столкновения

    
     if(birdX + SIZE[0] >= pipe[i].x && birdX <= pipe[i].x + pipeTop.width && 
       	(birdY <= pipe[i].y + pipeTop.height || birdY + SIZE[1] >= pipe[i].y + pipeTop.height + gap)) {
            
       	reload();
       }
           
        if(pipe[i].x == 0) {
            score++;
        
     ctx.fillStyle = "#000";
     ctx.font = "24px Verdana";
     ctx.fillText("Score: " + score, 10, canvas.height - 50);
     ctx.fillStyle = "#000";
     ctx.font = "24px Verdana";
     ctx.fillText("Best score: " + score, 10, canvas.height - 20);
   
 }
else{


    ctx.drawImage(background, 0, 0, canvas.width, canvas.height, bgX + canvas.width, 0, canvas.width, canvas.height);      
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height, bgX, 0, canvas.width, canvas.height);    
    ctx.drawImage(bird, 432, Math.floor((index % 9) / 3) * SIZE[1], SIZE[0], SIZE[1], birdX, birdY, SIZE[0], SIZE[1])

    birdY += gravity;
 
    for(let i = 0; i < pipe.length; i++){
            ctx.drawImage(pipeTop, pipe[i].x, pipe[i].y);
            ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeTop.height + gap);
            pipe[i].x--;
        }
    ctx.drawImage(ground, 0, 0, canvas.width, 150, grX + canvas.width, 450, canvas.width, canvas.height - ground.height);
    ctx.drawImage(ground, 0, 0, canvas.width, 150, grX, 450, canvas.width, canvas.height - ground.height);

        }
 
        

      window.requestAnimationFrame(draw);
    };    
 

     draw();