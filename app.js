// Student: Atakhanov Akbarjon
// ID: 18012806

//globally declared variables 
var tileBox; 
var spaceY;
var spaceX;

 window.onload = function (){
	var puzzleArea = document.getElementById('puzzlearea');
	tileBox = puzzleArea.getElementsByTagName('div'); //retrieve element within puzzlearea

    //applies features to each puzzle piece
	for (var i=0; i < tileBox.length; i++) {
		tileBox[i].className = 'tile'; //setting up the puzzle piece code
		tileBox[i].style.left = (i%4*100)+'px'; //calculates the position for puzzle pieces from the left of the screen
		tileBox[i].style.top = (parseInt(i/4)*100) + 'px'; //calculates the position for puzzle pieces from the top of the screen
		tileBox[i].style.backgroundPosition= '-' + tileBox[i].style.left + ' ' + '-' + tileBox[i].style.top; 
		//calculates the position of the background picture so in moves in relation to the puzzle pieces
        tileBox[i].style.backgroundImage = "url('https://lorempokemon.fakerapi.it/pokemon/400')"
        //aplies features when mouse moves over puzzle pieces
		tileBox[i].onmouseover = function() {
			if (checkMove(parseInt(this.innerHTML))) //checks whenever a move is made
			{
				this.style.border = "5px solid green";
			}
		};
        //activates whenever mouse moves out of puzzle piece
		tileBox[i].onmouseout = function() {
			this.style.border = "2px solid black";
		};
        //activates when mouse clicks on a puzzle piece
		tileBox[i].onclick = function() {
            
            //checks whether or not the puzzle piece can move into an empty space
			if (checkMove(parseInt(this.innerHTML))) 
			{
				swap(this.innerHTML-1); //moves into an empty space if true
                
                //checks when the all the 15 pieces are in its right space
				if (winCheck()) {
                    setTimeout(function(){
                        alert('Winner! Shuffle and Play Again!')
						window.location.reload();
                    }, 200);;
				}
				return;
			}
		};
	}


	/******************************************* Shuffle Button *********************************************/

	var shuffle = document.getElementById('shufflebutton'); //initializes the shuffle button
	spaceX = '300px'; 
	spaceY = '300px';

	shuffle.onclick = function() 
	{
		for (var i=0; i<300; i++) {
			var rand = parseInt(Math.random()* 100) %4; //generates a random number for shuffling each piece
			
            if (rand == 0) {
				var temp = up(spaceX, spaceY); 
				if ( temp != -1) {
					swap(temp);
				}
			}

			if (rand == 1) {
				var temp = down(spaceX, spaceY);

				if ( temp != -1) {
					swap(temp);
				}
			}

			if (rand == 2) {
				var temp = left(spaceX, spaceY);

				if ( temp != -1) {
					swap(temp);
				}
			}

			if (rand == 3) {
				var temp = right(spaceX, spaceY);
				
                if (temp != -1) {
					swap(temp);
				}
			}
		}
	};
};

/******************************************* Possible Movement Check *********************************************/

// returns true whenever a piece can be moved into an empty space
function checkMove(position) {

	if (left(spaceX, spaceY) == (position-1)) {
		return true;
	}

	if (down(spaceX, spaceY) == (position-1)) {
		return true;
	}

	if (up(spaceX, spaceY) == (position-1)) {
		return true;
	}

	if (right(spaceX, spaceY) == (position-1)) {
		return true;
	}
}

/******************************************* Win Check *********************************************/
function winCheck() {
	var flag = true;

    //for each puzzle piece 
	for (var i = 0; i < tileBox.length; i++) {
		var top = parseInt(tileBox[i].style.top);
		var left = parseInt(tileBox[i].style.left);

        //checks if each piece matches its left and top position
		if (left != (i%4*100) || top != parseInt(i/4)*100) {
			flag = false;
			break;
		}
	}
	return flag;
}


/******************************************* Direction *********************************************/

//calculates how far to the "left" a tilePiece should position
function left(x, y) {
	var cordX = parseInt(x);
	var cordY = parseInt(y);

	if (cordX > 0) {
		for (var i = 0; i < tileBox.length; i++) {
			if (parseInt(tileBox[i].style.left) + 100 == cordX && parseInt(tileBox[i].style.top) == cordY) {
				return i;
			} 
		}
	} else {
		return -1;
	}
}

//calculates how far to the "right" a tilePiece should position
function right (x, y) {
	var cordX = parseInt(x);
	var cordY = parseInt(y);

	if (cordX < 300) {
		for (var i =0; i<tileBox.length; i++) {
			if (parseInt(tileBox[i].style.left) - 100 == cordX && parseInt(tileBox[i].style.top) == cordY) {
				return i;
			}
		}
	} else {
		return -1;
	} 

}

//calculates how far "up" a tilePiece should position
function up(x, y) {
	var cordX = parseInt(x);
	var cordY = parseInt(y);

	if (cordY > 0) {
		for (var i=0; i<tileBox.length; i++) {
			if (parseInt(tileBox[i].style.top) + 100 == cordY && parseInt(tileBox[i].style.left) == cordX) {
				return i;
			}
		} 
	} else {
		return -1;
	}
}

//calculates how far "down" a tilePiece should position
function down (x, y) {
	var cordX = parseInt(x);
	var cordY = parseInt(y);

	if (cordY < 300) {
		for (var i=0; i<tileBox.length; i++) {
			if (parseInt(tileBox[i].style.top) - 100 == cordY && parseInt(tileBox[i].style.left) == cordX) {
				return i;
			}
		}
	} else {
		return -1;
	} 
}

//moves the "tilePiece" by switching position with an empty space
function swap (position) {
	var temp = tileBox[position].style.top;

	tileBox[position].style.top = spaceY;
	spaceY = temp;
	temp = tileBox[position].style.left;
	tileBox[position].style.left = spaceX;
	spaceX = temp;
}

