console.log('hellooo');

const canvas = document.querySelector('canvas');
console.log(canvas);

const ctx = canvas.getContext('2d');

// input controls - move to another file, as not involving logic
let up = false,
      down = false,
      left = false,
      right = false;

window.addEventListener('keydown', function(e) {
    const key = e.key;

    if (key === 'a') {
        left = true;
    } else if (key === 'w') {
        up = true;
    } else if (key === 's') {
        down = true;
    } else if (key === 'd') {
        right = true;
    }
});

window.addEventListener('keyup', function(e) {
    const key = e.key;

    if (key === 'a') {
        left = false;
    } else if (key === 'w') {
        up = false;
    } else if (key === 's') {
        down = false;
    } else if (key === 'd') {
        right = false;
    }
});

const shitWidth = 50;
const playerWidth = 50;
const shitHeight = 50;
const playerHeight = 50;

const player = {
    x: canvas.width/2 - 25,
    y: canvas.height -= 50,
    ySpeed: 0,
    jumpCoolDown: 0
};

const shitFalling = [
    {
        x: Math.random() * (canvas.width - shitWidth),
        y: -shitHeight,
    }
];

let newShitCooldown = 30;

const playerDraw = function() {
    //player colour
    ctx.fillStyle = 'red';
    //player location
    ctx.fillRect(player.x, player.y, playerWidth, playerHeight);
}

const shitDraw = function() {
    //shit colour
    ctx.fillStyle = 'brown';
    //shit location
    shitFalling.forEach((shit) => {
        ctx.fillRect(shit.x, shit.y, shitWidth, shitHeight);
    });
  
}

const canvasDraw = function() {
    //clearing bg with white
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //drawing border around canvas(ctx)
    ctx.strokeRect(0, 0,canvas.width, canvas.height);
}
//game loop
const playerMovement = function(){
 // if (down) {
    //     player.y +=10;
    // }
    if (up && player.jumpCoolDown === 0) {
        player.ySpeed =-20;
        console.log('jump bro!');
        player.jumpCoolDown = 30;
    }
    if (left) {
        player.x -=10;
    }
    if (right) {
        player.x +=10;
    }

    // gravity is a down force
    player.ySpeed += 1.5;
    player.y += player.ySpeed;
    if(player.jumpCoolDown > 0){
        player.jumpCoolDown -= 1;
    };

    //player can't be lower than canvas y
    if (player.y + playerHeight > canvas.height) {
        player.y = canvas.height - playerHeight;
    } 
}

const shitMovement = () => {
    shitFalling.forEach((shit) => {
        shit.y += 5;
    });
}

const shitPlayerCollision = () => {

    let playerTouchingShit = false;

    shitFalling.forEach((shit) => {
        const touchingInX = player.x + playerWidth > shit.x && player.x < shit.x + shitWidth;
        const touchingInY = player.y + playerHeight > shit.y && player.y < shit.y + shitHeight;
        if (touchingInX && touchingInY) {
            playerTouchingShit = true;
        }
    });

    if (playerTouchingShit){
        console.log('oh shit');
    }
}

const makeNewShit = () => {
    if (newShitCooldown === 0) {
        console.log('making new shit');
        shitFalling.push( 
            {
                x: Math.random() * (canvas.width - shitWidth),
                y: -shitHeight,
            }
        )
        newShitCooldown = 30;
    }

    newShitCooldown--;
}

setInterval(() => {
    makeNewShit();
    playerMovement();
    shitMovement();
    shitPlayerCollision();
    canvasDraw();
    playerDraw();
    shitDraw();
}, 30);


