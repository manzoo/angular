var mainApp = angular.module("colorMemory", []);
mainApp.controller("ColorMemoryController", function($scope) {
	$scope.numberOfWrongSelectionAllowed = 4;
	$scope.gameEnabled = true;
	$scope.numberOfRows = 4;
	$scope.numberOfColumns =4;
	$scope.cards =[];
	$scope.firstCard = null;
	$scope.secondCard = null;
	$scope.numberOfSelection = 0;
	$scope.numberOfCorrectSelection = 0;
	$scope.availableColors =[];
	$scope.currentElementIndex = 0;
	
	$scope.init = function(){	
		$scope.gameEnabled = true;		
		$scope.availableColors = ['colour1','colour2','colour3','colour4','colour5','colour6','colour7','colour8']
		$scope.cards =[];
		$scope.firstCard = null;
		$scope.secondCard = null;
		$scope.numberOfSelection = 0;
		$scope.numberOfCorrectSelection = 0;
		
		var selectedColors = [];
		for(var i=0; i< ($scope.numberOfRows*$scope.numberOfColumns)/2;i++){
			var ran = Math.floor(Math.random()*$scope.availableColors.length)
			var color = $scope.availableColors[ran];
			// push two times
			selectedColors.push(color);
			selectedColors.push(color);
			$scope.availableColors.splice(ran,1);
		}
		//console.log(selectedColors);
		// shuffle the array elements- colors
		selectedColors = shuffle(selectedColors);
		//console.log(selectedColors);
		for(var i=0; i< ($scope.numberOfRows*$scope.numberOfColumns); i++){
				var card = new CardModel();
				card.backgroundImage = 'images/'+selectedColors[i]+'.gif';
				$scope.cards.push(card);
		}
		
		// set focus to first card
		$scope.cards[0].hasFocus = true;
		$scope.currentElementIndex = 0;
		
	}		
	
	// Initialise the game
	$scope.init();
	
	$scope.newGame = function(){
		$scope.init();
	};
	
	$scope.select = function(card){
		
		// show the card
		card.flip();
		$scope.gameEnabled = false;
		if($scope.firstCard && $scope.secondCard){
			// both already selected this is next set of card so reset previous selection	
			$scope.firstCard.flipBack();
			$scope.secondCard.flipBack();
			$scope.firstCard = null;
			$scope.secondCard = null;
		}
		if($scope.firstCard){	
			$scope.secondCard = card;			
			$scope.numberOfSelection = $scope.numberOfSelection +1;
			if($scope.firstCard.backgroundImage == $scope.secondCard.backgroundImage){		
				$scope.numberOfCorrectSelection = $scope.numberOfCorrectSelection +1
				$scope.gameEnabled = true;	
				$scope.firstCard = null;
				$scope.secondCard = null;
				if($scope.numberOfCorrectSelection ==  $scope.numberOfRows * $scope.numberOfColumns)
				{
					alert('Congratulations ! You have completed the game. Click New Game to start fresh');
				}
			}
			else{				
				/*console.log('wrong selection');
				if($scope.numberOfWrongSelectionAllowed == ($scope.numberOfSelection - $scope.numberOfCorrectSelection)){
					alert('You have lost!Click New Game to start fresh');
				}*/
			}
		}
		else{			
			console.log('first selection');
			card.flip();
			$scope.firstCard = card;
			$scope.gameEnabled = true;
		}
		
		console.log('click count '+$scope.numberOfSelection +' correct click ' + $scope.numberOfCorrectSelection);
	};
	
	$scope.key = function($event){
		
		var keyKode = $event.keyCode
		
		if(keyKode != 13){
			//clear the focus
			$scope.cards[$scope.currentElementIndex].hasFocus = false;
		}
		switch(keyKode){
			case 13:
				$scope.select( $scope.cards[$scope.currentElementIndex]);
			break;
			case 37:
				if($scope.currentElementIndex % $scope.numberOfColumns == 0){
					$scope.currentElementIndex = $scope.currentElementIndex - 1 + $scope.numberOfColumns
				}
				else{
					$scope.currentElementIndex = $scope.currentElementIndex-1;
				}
				console.log("left arrow");
			break;
			case 38:
				if($scope.currentElementIndex < $scope.numberOfColumns){
					$scope.currentElementIndex = $scope.currentElementIndex + ($scope.numberOfRows * $scope.numberOfColumns) -$scope.numberOfRows;;
				}
				else{
					$scope.currentElementIndex = $scope.currentElementIndex - $scope.numberOfRows;
				}
				console.log("up arrow");
			break;
			case 39:
				if(($scope.currentElementIndex+1) % $scope.numberOfColumns == 0){
					$scope.currentElementIndex = $scope.currentElementIndex + 1 - $scope.numberOfColumns
				}
				else{
					$scope.currentElementIndex = $scope.currentElementIndex+1;
				}
				console.log("right arrow");
			break;
			case 40:
				if($scope.currentElementIndex >= ($scope.numberOfRows-1)*($scope.numberOfColumns)){
					$scope.currentElementIndex = $scope.currentElementIndex -($scope.numberOfRows * $scope.numberOfColumns) +$scope.numberOfRows;
				}
				else{
					$scope.currentElementIndex = $scope.currentElementIndex + $scope.numberOfRows;
				}
				console.log("down arrow");
			break;
			default: break;
		}
		
		console.log($scope.currentElementIndex);
		if(keyKode != 13){
			// set the focus
			$scope.cards[$scope.currentElementIndex].hasFocus = true;
		}
	};
});	  
