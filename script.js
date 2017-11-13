var green = document.getElementById('0');
var red = document.getElementById('1');
var yellow = document.getElementById('2');
var blue = document.getElementById('3');
var simon = document.getElementById('simon');
var start = document.getElementById('start');
var count = document.getElementById('count');
var restart = document.getElementById('restart');
var strict = document.getElementById('strict');
var mistake = 0;
			
var x;
var y;
var z;    //переменная для подсветки кнопки и музыки
var computerArr = [];    //массив для ходов компьютера
var playerArr = [];      //массив для ходов игрока
			
//------------------------------------------
//после подсвечивания кнопки вернуть первоначальный background
function toReturnBackground() {
  if (green.style.background != 'rgb(55, 179, 11)') {
	green.style.background = 'rgb(55, 179, 11)';
  }
  if (red.style.background != 'rgb(240, 43, 29))') {
	red.style.background = 'rgb(240, 43, 29)';
  }
  if (yellow.style.background != 'rgb(224, 255, 2))') {
	yellow.style.background = 'rgb(224, 255, 2)';
  }
  if (blue.style.background != 'rgb(53, 62, 222))') {
	blue.style.background = 'rgb(53, 62, 222)';
  }
};
			
//подсветить выбранную кнопку и вернуть обратно
function toLightOn() {
  if (z == 0) {
	green.style.background = 'radial-gradient(rgb(212, 255, 196), rgb(55, 179, 11))';
	var audio = new Audio(); // Создаём новый элемент Audio
	audio.src = 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3';  // Указываем путь к звуку "клика"
	audio.autoplay = true;   // Автоматически запускаем
	setTimeout(toReturnBackground, 500);
  }
  if (z == 1){
	red.style.background = 'radial-gradient(rgb(255, 215, 212), rgb(240, 43, 29))';
	var audio = new Audio(); // Создаём новый элемент Audio
	audio.src = 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3';  // Указываем путь к звуку "клика"
	audio.autoplay = true;   // Автоматически запускаем
	setTimeout(toReturnBackground, 500);
  }
  if (z == 2) {
	yellow.style.background = 'radial-gradient(rgb(255, 255, 255), rgb(224, 255, 2))';
	var audio = new Audio(); // Создаём новый элемент Audio
	audio.src = 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3';  // Указываем путь к звуку "клика"
	audio.autoplay = true;   // Автоматически запускаем
	setTimeout(toReturnBackground, 500);
  }
  if (z == 3) {
	blue.style.background = 'radial-gradient(rgb(219, 221, 252), rgb(53, 62, 222))';
	var audio = new Audio(); // Создаём новый элемент Audio
	audio.src = 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3';  // Указываем путь к звуку "клика"
	audio.autoplay = true;   // Автоматически запускаем
	setTimeout(toReturnBackground, 500);
  }
};
			
//если игрок ошибся, подсветить все кнопки красным.
function toGetWrong(){
  if (green.style.background == 'rgb(55, 179, 11)') {
	green.style.background = 'radial-gradient(rgb(255, 215, 212), rgb(240, 43, 29))';
  }
  if (red.style.background == 'rgb(240, 43, 29)') {
	red.style.background = 'radial-gradient(rgb(255, 215, 212), rgb(240, 43, 29))';
  }
  if (yellow.style.background == 'rgb(224, 255, 2)') {
	yellow.style.background = 'radial-gradient(rgb(255, 215, 212), rgb(240, 43, 29))' ;
  }
  if (blue.style.background == 'rgb(53, 62, 222)') {
	blue.style.background = 'radial-gradient(rgb(255, 215, 212), rgb(240, 43, 29))';
  }
};
			
//если игрок выиграл, подсветить все зеленым
function toGetWin() {
  if (green.style.background == 'rgb(55, 179, 11)') {
	green.style.background = 'radial-gradient(rgb(212, 255, 196), rgb(55, 179, 11))';
  }
  if (red.style.background == 'rgb(240, 43, 29)') {
    red.style.background = 'radial-gradient(rgb(212, 255, 196), rgb(55, 179, 11))';
  }
  if (yellow.style.background == 'rgb(224, 255, 2)') {
    yellow.style.background = 'radial-gradient(rgb(212, 255, 196), rgb(55, 179, 11))';
  }
  if (blue.style.background == 'rgb(53, 62, 222)') {
	blue.style.background = 'radial-gradient(rgb(212, 255, 196), rgb(55, 179, 11))';
  }
};
			
//1. начало игры, ходы компьютера (обработчик на #start)
function toStart() {
  start.onclick = null;     //отключить старт кнопку, чтобы не кликнуть несколько раз
  strict.onclick = null;   //отключить стрикт кнопку, чтобы не кликать в момент игры
  playerArr = [];
							
  //генератор случайных чисел
  //если нет ошибки игрока или режим strict on
  if (mistake == 0) {
	y = Math.floor(Math.random() * (4 - 0)) + 0;
	computerArr.push(y);
	count.innerHTML++;
  }
  //если ошибка игрока и режим strict off - просто повторить хода компьютера
  if (mistake == 1) {
	computerArr = computerArr;
  }
  //цикл с задержкой итерации, для последовательного подсвечивания кнопок
  for(var i = 0; i < computerArr.length; i++) {
	(function(i) {
	  setTimeout(function() {
		z = computerArr[i];
		toLightOn();
	  }, i * 1000);
	})(i);
  }
												
  //разрешить ходить игроку
  simon.onclick = toPlay;
};
start.onclick = toStart;
			
//2. ход игрока (обработчик на #simon)
function toPlay(event) {
  mistake = 0;
  var target = event.target;
  x = target.id;
  playerArr.push(+x);
  z = x;
  toLightOn();		//подстветить выбранную кнопку, через 0.5сек вернуть назад background
									
  //3. проверка хода игрока с ходом компьютера
  //если правильно
  var index = (playerArr.length - 1);
  //если ошибка
  if (computerArr[index] != +x) {
	setTimeout(toGetWrong, 500);   		   //to get a background of all buttons is red
	setTimeout(toReturnBackground, 2000)   //to return background of buttons;
	//если strict on
	if (strict.nextElementSibling.innerHTML == 'on') {
	  computerArr = [];						
	  setTimeout(toStart, 3000);    //ход компьютера через 2сек
	  count.innerHTML = 0;
	  return;
	}
	//если strict off
	if (strict.nextElementSibling.innerHTML == 'off') {
	  mistake = 1;
	  setTimeout(toStart, 3000);    //ход компьютера через 2сек
	  return;
	}
  }
  if (computerArr.length == playerArr.length) {
	simon.onclick = null    	  //не больше чем количество кликов компьютера 
	//выигрыш
	if (computerArr.length > 4) {
		setTimeout(toGetWin, 500);   		   //to get a background of all buttons is green
		setTimeout(toReturnBackground, 2000)
		computerArr = [];						
		setTimeout(toStart, 3000);    //ход компьютера через 2сек
		count.innerHTML = 0;
		return;
	}
	setTimeout(toStart, 2000);    //ход компьютера через 2сек
	return;
  }
};
			
function toRestart() {
  location.reload();
};
restart.onclick = toRestart;
			
function toGetStrict() {
  if (strict.nextElementSibling.innerHTML == 'on') {
	 strict.nextElementSibling.innerHTML = 'off';
  } else {
	 strict.nextElementSibling.innerHTML = 'on';
  }
};
strict.onclick = toGetStrict;
