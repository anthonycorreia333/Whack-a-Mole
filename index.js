const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp;
let score = 0;

function randomTime(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
	const idx = Math.floor(Math.random() * holes.length);
	const hole = holes[idx];
	//to ensure that you don't get the same hole back to back
	if(hole === lastHole) {
		return randomHole(holes);
	}
	console.log(hole);
	lastHole = hole;
	return hole;
}

function popUp() {
	const time = randomTime(200, 1000);
	const hole = randomHole(holes);
	hole.classList.add('up');
	setTimeout(() => {
		hole.classList.remove('up');
		if(!timeUp) popUp();
	}, time);
}

function startGame() {
	scoreBoard.textContent = 0;
	timeUp = false;
	score = 0;
	popUp();
	setTimeout(() => timeUp = true, 10000);
}

function bonk(e) {
	if(!e.isTrusted) return; //person is cheating by fake clicking
	score++
	this.classList.remove('up');
	scoreBoard.textContent = score;
	//console.log(e);
}

moles.forEach(mole => mole.addEventListener('click', bonk));


















