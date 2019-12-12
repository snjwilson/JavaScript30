const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
	navigator.mediaDevices.getUserMedia({video: true, audio: false})
		.then(localMediaStream => {
			console.log(localMediaStream);
			video.srcObject = localMediaStream;
			video.play();
		})
		.catch(err => console.log(err));
}

function paintToCanvas(){
	const width = video.videoWidth;
	const height = video.videoHeight;
	canvas.width = width;
	canvas.height = height;

	return setInterval(() => {
		ctx.drawImage(video, 0, 0, width, height);
		//get the image data from canvas
		let pixels = ctx.getImageData(0,0, width, height);
		//console.log(pixels);
		//paint it red
		//pixels = redEffect(pixels);
		pixels = rgbSplit(pixels);
		ctx.globalAlpha = 0.1;
		//put the pixels back
		ctx.putImageData(pixels, 0, 0);	
	}, 10)
}

function takePhoto(){
	//play the snapshot sound
	snap.currentTime = 0;
	snap.play();

	//than we will take the sdata out of the canvas
	const data = canvas.toDataURL('image/jpeg');
	//console.log(data);
	const link = document.createElement('a');
	link.href = data;
	link.setAttribute('download', 'handsome');
	link.innerHTML = `<img src=${data} alt='handsome dude'>`;
	strip.insertBefore(link, strip.firstChild);

}

function redEffect(pixels){
	for(let i = 0; i < pixels.data.length ; i+=4){
		pixels.data[i + 0] = pixels.data[i + 0] + 100;//this is the red channel
		pixels.data[i + 1] = pixels.data[i + 1] - 50;//this is the green channel
		pixels.data[i + 2] = pixels.data[i + 2] * 0.5;//this is the blue channel
	}
	return pixels;
}

function rgbSplit(pixels){
	for(let i = 0; i < pixels.data.length ; i+=4){
		pixels.data[i - 150] = pixels.data[i + 0];//this is the red channel
		pixels.data[i - 200] = pixels.data[i + 1];//this is the green channel
		pixels.data[i -50] = pixels.data[i + 2];//this is the blue channel
	}
	return pixels;
}


getVideo();

video.addEventListener('canplay', paintToCanvas);