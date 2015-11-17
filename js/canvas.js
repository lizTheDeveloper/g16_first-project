var Canvas = function(height, width, selector){
	//create canvas
	this.canvas = document.createElement("canvas");
	this.canvas.height = height;
	this.canvas.width = width;

	//get context
	this.ctx = this.canvas.getContext("2d")

	var element = document.querySelectorAll(selector)[0];
	if (element) {
		element.appendChild(this.canvas);
	} else {
		console.error("Oh no, that element does not exist, appending to body");
		document.body.appendChild(this.canvas);
	}
}

//appends to the first element returned by selector
Canvas.prototype.append = function(selector) {
	
};

//bind this to a filereader's onload event handler
Canvas.prototype.loadImage = function(event) {
	//create an unattached img element
	var img = document.createElement("img");
	img.src = event.target.result;
	this.ctx.drawImage(img, 0, 0);
};


//redraw the image onto the canvas
Canvas.prototype.applyFilter = function(filter) {
	//get px
	var pxData = this.getPxData();
	//filter px
	pxData.data = filter(pxData.data);

	var img = new ImageData(pxData.data, this.canvas.width, this.canvas.height);

	//send it back out
	this.ctx.putImageData(img, 0, 0);

	//this.ctx.drawImage(pxData, 0, 0);
}

Canvas.prototype.getPxData = function() {
	return this.ctx.getImageData(0,0, this.canvas.width, this.canvas.height);
};

Canvas.prototype.greyScale = function(pxData) {


	for (var i = 0; i < pxData.length; i+=4) {
		var r = pxData[i];
		var g = pxData[i+1];
		var b = pxData[i+2];

		var v = 0.2126*r + 0.7152*g + 0.0722*b;

		pxData[i] = pxData[i+1] = pxData[i+2] = v;
	};
	return pxData;
};