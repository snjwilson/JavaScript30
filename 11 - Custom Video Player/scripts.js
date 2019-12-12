//first we are going to grab our elements

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const ranges = player.querySelectorAll('.player__slider');
const skipButtons = player.querySelectorAll('[data-skip]');


//then build our functions

function togglePlay(){
	let method = video.paused? 'play': 'pause';
	video[method]();
}

function updateButton(){
	let button = video.paused? '►': '❚ ❚';
	toggle.	textContent = button;
}

function skip(){
	//console.log("skipping!");
	video.currentTime += parseFloat(this.dataset.skip);

}

function rangeUpdate(){
	//console.log(this.value);
	video[this.name] = this.value;
}

function progressBarUpdate(){
	//console.log(this);
	let percent = (video.currentTime/video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
	//console.log(e);
	let scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}

//hook up the event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', progressBarUpdate);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('click', rangeUpdate));
progress.addEventListener('click', scrub);

let mouseDown = false;
progress.addEventListener('mousemove', (e) => {
	if(mouseDown){
		scrub(e);
	}
});
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);




