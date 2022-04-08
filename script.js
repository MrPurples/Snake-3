let lastRenderTime = 0;
const snakeSpeed = 8;
const snakeBody = [{x:11, y:11}];
const gameBoard = document.getElementById('game-board');
let inputDirection = {x:0, y:0};
let lastInputDirection ={x:0, y:0};
let foodBody = [{x:5, y:5}];

function main(currentTime) {
  if (snakeBody[0].x < 1 || snakeBody[0].x > 21 || snakeBody[0].y < 1 || snakeBody[0].y > 21) {
    if(confirm('You lost Press ok to restart')) {
        location.reload()
    } return ;
  }

  for (let i = 2; i < snakeBody.length ; i++) {
    if(snakeBody[0].x === snakeBody[i].x &&
       snakeBody[0].y === snakeBody[i].y &&
       snakeBody[0].x !== foodBody[0].x &&
       snakeBody[0].y !== foodBody[0].y &&
       snakeBody[i].x !== foodBody[0].x &&
       snakeBody[i].y !== foodBody[0].y){
        if(confirm('You lost Press ok to restart')) {
          location.reload()
      } return ;
    }
  }

  window.requestAnimationFrame(main)

  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
  if(secondsSinceLastRender < 1 / snakeSpeed) return
  lastRenderTime = currentTime
  update();
  draw(gameBoard);
  foodDraw(gameBoard);
  eatFood();

}

window.requestAnimationFrame(main)

function eatFood() {
  let randomX = Math.floor(Math.random() * 21) + 1;
  let randomY = Math.floor(Math.random() * 21) + 1;
  for (let i = 0; i < snakeBody.length ; i++) {
    if (randomX === snakeBody[i].x && randomY === snakeBody[i].y) {
      randomX = Math.floor(Math.random() * 21) + 1;
      randomY = Math.floor(Math.random() * 21) + 1;
    }
  }
  if (snakeBody[0].x === foodBody[0].x && snakeBody[0].y === foodBody[0].y) {
    foodBody[0] = {
      x: randomX,
      y: randomY
    }
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] })}
}

function update() { 
  const inputDirection = getInputDirection()
  for(let i = snakeBody.length -2 ; i >= 0 ; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] }
  }
  
  snakeBody[0].x += inputDirection.x
  snakeBody[0].y += inputDirection.y

  
}

function draw() {
  gameBoard.innerHTML = ''
  snakeBody.forEach(segment => {
    const snakeElement = document.createElement('div')
    snakeElement.style.gridRowStart = segment.y
    snakeElement.style.gridColumnStart= segment.x
    snakeElement.classList.add('snake')
    gameBoard.appendChild(snakeElement);

  })
  
}

function foodDraw() {
  foodBody.forEach(element => {
    const fooddie = document.createElement('div')
    fooddie.style.gridRowStart = element.y
    fooddie.style.gridColumnStart = element.x
    fooddie.classList.add('food')
    gameBoard.appendChild(fooddie)
  })
}

function getInputDirection () {
  lastInputDirection = inputDirection
return inputDirection
}

window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowUp':
      if(lastInputDirection.y !== 0) break
      inputDirection = {x: 0, y: -1}
      break;
    case 'ArrowDown':
      if(lastInputDirection.y !== 0) break
      inputDirection = {x: 0, y: 1}
      break;
    case 'ArrowLeft':
      if(lastInputDirection.x !== 0) break
      inputDirection = {x: -1, y: 0}
      break;
    case 'ArrowRight':
      if(lastInputDirection.x !== 0) break
      inputDirection = {x: 1, y: 0}
      break;
  }
})