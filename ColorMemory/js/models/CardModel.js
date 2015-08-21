function CardModel(){
	this.isShown = true;
	this.isRemoved = false;
	this.backgroundImage = 'images/colour1.gif';
	this.flip = function(){
		this.isShown = true;
	};
	
	this.flipBack = function(){
		this.isShown = false;
	};
	
	this.remove = function(){
		console.log('remove');
		this.isRemoved = true;		
	};
}