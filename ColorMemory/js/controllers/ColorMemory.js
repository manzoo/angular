
//var app = angular.module('colormemory', []);
/*
function studentController($scope) {
   $scope.student = {
      firstName: "Mahesh",
      lastName: "Parashar",
      fullName: function() {
         var studentObject;
         studentObject = $scope.student;
         return studentObject.firstName + " " + studentObject.lastName;
      }
   };
}
/*
app.controller('ColorMemoryController', function ColorMemoryController() {
		'use strict';

		this.numberOfRows = 4;
		this.numberOfColumns =4;
		this.cards =[];
		for(var i=0; i< this.numberOfRows; i++){
			for(var j=0; i< this.numberOfRows; j++){
				var card = new CardModel();
				this.cards.push(card);
			}
		}
	});
*/
var mainApp = angular.module("colorMemory", []);

      mainApp.controller("ColorMemoryController", function($scope) {
        $scope.numberOfWrongSelectionAllowed = 4;
		$scope.gameEnabled = true;
		$scope.numberOfRows = 4;
		$scope.numberOfColumns =4;
		$scope.cards =[];
		$scope.selectedCard = null;
		$scope.numberOfSelection = 0;
		$scope.numberOfCorrectSelection = 0;
		$scope.gameShowTime = 2000;
		$scope.availableColors =[];
		
		$scope.init = function(){	
			$scope.gameEnabled = true;		
			$scope.availableColors = ['colour1','colour2','colour3','colour4','colour5','colour6','colour7','colour8']
			$scope.cards =[];
			$scope.selectedCard = null;
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
			console.log(selectedColors);
			// shuffle the array elements- colors
			selectedColors = shuffle(selectedColors);
			console.log(selectedColors);
			for(var i=0; i< ($scope.numberOfRows*$scope.numberOfColumns); i++){
					var card = new CardModel();
					card.backgroundImage = 'images/'+selectedColors[i]+'.gif';
					$scope.cards.push(card);
			}
					
			window.setTimeout(function () {
				for(var i=0; i< $scope.cards.length; i++){				
					$scope.cards[i].flipBack();
				}
				$scope.$apply();
			}, $scope.gameShowTime);
			
		}		
		
		// Initialise the game
		$scope.init();
		
		$scope.newGame = function(){
			$scope.init();
		}
		
		$scope.select = function(card){
			$scope.gameEnabled = false;
			if($scope.selectedCard){				
				$scope.numberOfSelection = $scope.numberOfSelection +1;
				if($scope.selectedCard.backgroundImage == card.backgroundImage){
					
					console.log('same color');
					card.flip();
					$scope.numberOfCorrectSelection = $scope.numberOfCorrectSelection +1	
					window.setTimeout(function () {
						card.remove();
						$scope.selectedCard.remove();
						$scope.gameEnabled = true;	
						$scope.selectedCard = null;
						$scope.$apply();
					}, 2000)
					
					if($scope.numberOfCorrectSelection ==  $scope.numberOfRows * $scope.numberOfColumns)
					{
						alert('Congratulations ! You have completed the game. Click New Game to start fresh');
					}
				}
				else{
					
					console.log('wrong selection');
					card.flip();
					if($scope.numberOfWrongSelectionAllowed == ($scope.numberOfSelection - $scope.numberOfCorrectSelection)){
						window.setTimeout(function () {
							alert('You have lost!Click New Game to start fresh');
						}, 1000)	
					}
					else{
						window.setTimeout(function () {	
							console.log('flipped back');
							card.flipBack();
							$scope.selectedCard.flipBack();
							$scope.selectedCard = null;
							$scope.gameEnabled = true;	
							$scope.$apply();
						}, 2000)
					}
				}
			}
			else{			
				console.log('first selection');
				card.flip();
				$scope.selectedCard = card;
				$scope.gameEnabled = true;
			}
			
			console.log('click count '+$scope.numberOfSelection +' correct click ' + $scope.numberOfCorrectSelection);
		}
		
	  });	  
