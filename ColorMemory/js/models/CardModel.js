function CardModel(){
	this.isShown = false;
	this.isRemoved = false;
	this.hasFocus = false;
	this.backgroundImage = 'images/colour1.gif';
	this.foregroundImage = '';
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