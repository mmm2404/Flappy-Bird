

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');



//загружаем картинки и аудио

const background = new Image();
const ground = new Image();
const pipeBottom = new Image();
const pipeTop = new Image();
const bird = new Image();
const score_audio = new Audio();
const fly_audio = new Audio();
const hit_audio = new Audio();


// источники изображений

background.src = "./sprites/bg.jpg";
pipeBottom.src = "./sprites/pipeBottom.png";
pipeTop.src = "./sprites/pipeTop.png";
bird.src = "https://i.ibb.co/Q9yv5Jk/flappy-bird-set.png";
ground.src = "./sprites/bg.jpg";
score_audio.src = "./sounds/audio_point.wav";
fly_audio.src = "./sounds/audio_wing.wav";
hit_audio.src = "./sounds/audio_hit.wav";


//переменные 
 let bgSpeed = 2; //скорость фона
 let grSpeed = 2; //скорость дороги
 let index = 0;
 let gap = 150;//расстояние между трубами
 let score = 0;
 let best_score = 0;
 let gravity = 0.5;
 let birdY = 150;
 let birdX = 30;
 let jump = 45; //прыжок
 let pause = true;
 const SIZE = [51, 36]; //размеры птички 

 let pipe = []; //массив с трубами

 pipe[0] = {
        x : canvas.width,
        y : 0
   };
 
 //навешиваем обработчик  для прыжка птички вверх  

document.addEventListener(`keyup`, function(event) {
    if (event.code == "Enter") {
     flyUp();    
    }
  });

function flyUp(){
    birdY -= jump;
    
};


// функция перезагрузки игры при столкновении
function reload() {
    birdX = 30;
    birdY = 150;  
    score = 0;
    pipe = [];
    pipe[0] = {
        x : canvas.width,
        y : 0
    };
};

//функция и обработчик для начала и паузы игры
function game_pause() {
    pause = !pause;
  
};

document.addEventListener(`keyup`, function(event) {
    if (event.code == "KeyP") {
      game_pause();
     
    }   
  });
 

 const draw = () => {
    if (!pause) {
    index += 0.1;
    const bgX = -((index * bgSpeed) % canvas.width);

// отрисовка фона, для имитпции движения рисуем  две части, идущие одна за другой 
    
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height, bgX + canvas.width, 0, canvas.width, canvas.height);      
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height, bgX, 0, canvas.width, canvas.height);    
    
    
// отрисовываем трубы

    for(let i = 0; i < pipe.length; i++){
        ctx.drawImage(pipeTop, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeTop.height + gap);
        pipe[i].x -= 2;

        if(pipe[i].x == 6) {
            score_audio.play();
            score++;
            if (score > best_score) {
                best_score = score;
                localStorage.setItem("hiscore", JSON.stringify(best_score));
                ctx.fillText("Best score: " + best_score, 10, canvas.height - 20)
        };
        ctx.fillText("Score: " + score, 10, canvas.height - 50);   
        };

        if(pipe[i].x == 360) {
            pipe.push({
            x : canvas.width,
            y : Math.floor(Math.random() * pipeTop.height) - pipeTop.height
            });
        };

 //в роли ground выступает часть background с изображением неба (типа вода отражает небо :))

     const grX = -((index * bgSpeed) % canvas.width);

     ctx.drawImage(ground, 0, 0, canvas.width, 150, grX + canvas.width, 450, canvas.width, canvas.height - ground.height);
     ctx.drawImage(ground, 0, 0, canvas.width, 150, grX, 450, canvas.width, canvas.height - ground.height);


// риcуем птичку

    ctx.drawImage( bird, 432, Math.floor((index % 9) / 3) * SIZE[1], SIZE[0], SIZE[1], birdX, birdY, SIZE[0], SIZE[1])
    birdY += gravity;
    fly_audio.play();

 //отслеживаем столкновения
    
    if(birdX + SIZE[0] >= pipe[i].x && birdX <= pipe[i].x + pipeTop.width && 
        (birdY <= pipe[i].y + pipeTop.height || birdY + SIZE[1] >= pipe[i].y + pipeTop.height + gap)) {
        hit_audio.play();
        reload();
  };
             
        
        
// рисуем поля со счетом игры

        ctx.fillStyle = "#000";
        ctx.font = "24px Verdana";
        ctx.fillText("Score: " + score, 10, canvas.height - 50);
        ctx.fillStyle = "#000";
        ctx.font = "24px Verdana";
        ctx.fillText("Best score: " + best_score, 10, canvas.height - 20);
    };
 
    //записываем наивысший результат в local storage  и показываем его при перезапуске игры 
     let hiscore = localStorage.getItem("hiscore");
     
     if(hiscore === null){
         best_score = 0;
         localStorage.setItem("hiscore", JSON.stringify(best_score));
        }
     else{
        best_score = JSON.parse(hiscore);
        ctx.fillText("Best score: " + best_score, 10, canvas.height - 20);
        };
    };

    window.requestAnimationFrame(draw);
};    
 

    draw();


