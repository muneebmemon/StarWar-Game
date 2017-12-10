const PLAYER_TO_SELECT_CHARACTER = 1;
const PLAYER_TO_SELECT_DEFENDER = 2;
const PLAYER_TO_ATTACK = 3;
const YOU_LOSE = 4;
const YOU_WIN = 5;
var characters = [];
var gameStatus;
var yourCharacter;
var enmChr;
var enemiesAvailable = [];
var enemiesAvailableLength;

// Constructor for creating game character objects
function Character(chrName, chrHealth, chrImgName, chrNickName){

	this.characterName = chrName;
	this.characterHealth = chrHealth;
	this.characterImageName = chrImgName;
	this.characterNickName = chrNickName;
}

// Function to initialize game
function initializeGame(){

	// intializing/setting variables & HTML elements to default
	gameStatus = PLAYER_TO_SELECT_CHARACTER;
	yourCharacter = "";
	enmChr = "";
	characters = [];
	enemiesAvailable = [];
	enemiesAvailableLength = 3;

	$("#enemiesAvailable").empty();
	$("#defender").empty();
	$("#yourCharacter").empty();

	$("#gameOverStatus").removeClass("attackStatusDisp");
	$("#gameOverStatus").addClass("attackStatus");
	
	$("#attackSumm").removeClass("attackStatusDisp");
	$("#attackSumm").addClass("attackStatus");	

	$(".myDefender").text("");
	$("#defDamage").text("");
	$("#atkDamage").text("");

	// Creating 4 Character objects with respective parameters
	characters[0] = new Character("Obi-Wan Kenobi",120,"obiwankenobi.jpg","Obi");
	characters[1] = new Character("Luke SkyWalker",130,"lukeskywalker.jpg","Luke");
	characters[2] = new Character("Darth Sidious",150,"darthsidious.jpg", "Sid");
	characters[3] = new Character("Darth Maul",160,"darthmaul.jpg", "Maul");

	//Prepending Character list div at the top
	var $container = $(".container");

	var $chrListDiv = $("<div>");
	$chrListDiv.addClass("row");
	$chrListDiv.attr("id","characterList");
	$container.prepend($chrListDiv);
	
	// adding characters to character list so that player can select their character
	for(var i=0 ; i<characters.length ; i++){
		var $chrDiv = $("<div>");
		$chrDiv.addClass("col-xs-3 col-sm-3 col-md-2 col-lg-2 chrStyle");
		$chrDiv.attr("nickname",characters[i].characterNickName);
		var $chrName = $("<h5>");
		$chrName.html(characters[i].characterName);
		$chrDiv.append($chrName);
		var $chrImg = $("<img>");
		$chrImg.attr("src","assets/images/" + characters[i].characterImageName);
		$chrImg.addClass("center-block img-responsive");
		$chrDiv.append($chrImg);
		var $chrHealth = $("<h5>");
		$chrHealth.html(characters[i].characterHealth);
		$chrDiv.append($chrHealth);
		$chrListDiv.append($chrDiv);
	}

	//Selecting character and calling method after player clicks on any character object 
	$(".chrStyle").on("click", function(){
		if(gameStatus==PLAYER_TO_SELECT_CHARACTER){
			if($(this).attr("nickname")==="Obi"){
				yourCharacter = characters[0];
				enemiesAvailable = [characters[1],characters[2],characters[3]];
			}else if($(this).attr("nickname")==="Luke"){
				yourCharacter = characters[1];
				enemiesAvailable = [characters[0],characters[2],characters[3]];
			}else if($(this).attr("nickname")==="Sid"){
				yourCharacter = characters[2];
				enemiesAvailable = [characters[0],characters[1],characters[3]];
			}else if($(this).attr("nickname")==="Maul"){
				yourCharacter = characters[3];
				enemiesAvailable = [characters[0],characters[1],characters[2]];
			}

			playerSelectedCharacter();
			new Audio('assets/sounds/startSound.mp3').play();
		}
	});
}

// Main Function which is going to execute once document is ready.
$(function(){
	"use strict";
	initializeGame();

	//this function executes whenever ATTACK button is clicked
	$("#attackButton").on("click", function(){
		if(gameStatus==PLAYER_TO_ATTACK){
			attackDefender();
		}
	});

	//this function executes whnever RESTART button is clicked
	$("#restartButton").on("click", function(){
		$("#restartButton").toggleClass("resButton");
		initializeGame();
	});
	
});

// this function is called whenever Player clicks ATTACK button when game status is PLAYER_TO_ATTACK
function attackDefender(){
	if(yourCharacter.characterHealth>0 && enmChr.characterHealth>0){
		var yourDamage = Math.ceil(Math.random()*(yourCharacter.characterHealth/20));
		var enmDamage = Math.ceil(Math.random()*(enmChr.characterHealth/4));
		yourCharacter.characterHealth -= yourDamage;
		enmChr.characterHealth -= enmDamage;
		$(".myDefender").text(enmChr.characterName);
		$("#defDamage").text(enmDamage);
		$("#atkDamage").text(yourDamage);

		var $yourCharacter = $("#yourCharacter").find(".yourChrStyle")
												.find(":nth-child(3)");

		var $defenderChr = $("#defender").find(".defenderStyle")
												.find(":nth-child(3)");

		$yourCharacter.text(yourCharacter.characterHealth);
		$defenderChr.text(enmChr.characterHealth);
		new Audio('assets/sounds/attackSound.mp3').play();

		//Condition to check whether current game ends or is still played on
		if(enmChr.characterHealth<=0 && enemiesAvailableLength > 0 && yourCharacter.characterHealth > 0) {
			gameStatus = PLAYER_TO_SELECT_DEFENDER;
			$("#defender").empty();
			$("#attackSumm").removeClass("attackStatusDisp");
			$("#attackSumm").addClass("attackStatus");

			$(".myDefender").text("");
			$("#defDamage").text("");
			$("#atkDamage").text("");

		}else if(yourCharacter.characterHealth<=0){
			gameStatus = YOU_LOSE;
			gameOver();
		}else if(enmChr.characterHealth<=0 && enemiesAvailableLength == 0 && yourCharacter.characterHealth > 0){
			gameStatus = YOU_WIN;
			gameOver();
		}
	}
}

//this function is called when game is over. Either player wins or lose
function gameOver(){
	if(gameStatus==YOU_LOSE){
		$("#gameOverStatusHeading").text("YOU LOST THE GAME. PRESS RESTART BUTTON TO PLAY AGAIN !!!")
		$("#gameOverStatus").addClass("attackStatusDisp");
		$("#gameOverStatus").removeClass("attackStatus");
		new Audio('assets/sounds/loseSound.mp3').play();

	}else if(gameStatus==YOU_WIN){
		$("#gameOverStatusHeading").text("YOU WON THE GAME. PRESS RESTART BUTTON TO PLAY AGAIN !!!")
		$("#gameOverStatus").addClass("attackStatusDisp");
		$("#gameOverStatus").removeClass("attackStatus");
		new Audio('assets/sounds/winSound.mp3').play();
	}

	$("#restartButton").toggleClass("resButton");
}

//this function is called once player is selected Character and game status is PLAYER_TO_SELECT_CHARACTER
function playerSelectedCharacter(){
	gameStatus = PLAYER_TO_SELECT_DEFENDER;
	$("#characterList").remove();
	
	var $yourCharacter = $("#yourCharacter");
	var $chrDiv = $("<div>");
	$chrDiv.addClass("col-xs-3 col-sm-3 col-md-2 col-lg-2 yourChrStyle");
	$chrDiv.attr("nickname",yourCharacter.characterNickName);
	var $chrName = $("<h5>");
	$chrName.html(yourCharacter.characterName);
	$chrDiv.append($chrName);
	var $chrImg = $("<img>");
	$chrImg.attr("src","assets/images/" + yourCharacter.characterImageName);
	$chrImg.addClass("center-block img-responsive");
	$chrDiv.append($chrImg);
	var $chrHealth = $("<h5>");
	$chrHealth.html(yourCharacter.characterHealth);
	$chrDiv.append($chrHealth);
	$yourCharacter.append($chrDiv);

	var $enemiesCharacter = $("#enemiesAvailable");

	for(var i=0 ; i<enemiesAvailable.length ; i++){
		var $chrDiv = $("<div>");
		$chrDiv.addClass("col-xs-3 col-sm-3 col-md-2 col-lg-2 enemiesStyle");
		$chrDiv.attr("nickname",enemiesAvailable[i].characterNickName);
		$chrDiv.attr("id","enemiesStyle");
		var $chrName = $("<h5>");
		$chrName.html(enemiesAvailable[i].characterName);
		$chrDiv.append($chrName);
		var $chrImg = $("<img>");
		$chrImg.attr("src","assets/images/" + enemiesAvailable[i].characterImageName);
		$chrImg.addClass("center-block img-responsive");
		$chrDiv.append($chrImg);
		var $chrHealth = $("<h5>");
		$chrHealth.html(enemiesAvailable[i].characterHealth);
		$chrDiv.append($chrHealth);
		$enemiesCharacter.append($chrDiv);
	}

	$(".enemiesStyle").on("click", function(){
		if(gameStatus==PLAYER_TO_SELECT_DEFENDER){
			for(var i=0; i<enemiesAvailable.length ; i++){
				if($(this).attr("nickname")===enemiesAvailable[i].characterNickName){
					enmChr = enemiesAvailable[i];
					playerToSelectDefender();
					$(this).remove();
					break;
				}
			}
		}
	});
}

//this function is called when player selected a Defender and game status is PLAYER_TO_ATTACK
function playerToSelectDefender(){
	gameStatus = PLAYER_TO_ATTACK;

	$("#attackSumm").removeClass("attackStatus");
	$("#attackSumm").addClass("attackStatusDisp");

	enemiesAvailableLength -= 1;
	var $defenderChr = $("#defender");
	var $chrDiv = $("<div>");
	$chrDiv.addClass("col-xs-3 col-sm-3 col-md-2 col-lg-2 defenderStyle");
	$chrDiv.attr("nickname",enmChr.characterNickName);
	var $chrName = $("<h5>");
	$chrName.html(enmChr.characterName);
	$chrDiv.append($chrName);
	var $chrImg = $("<img>");
	$chrImg.attr("src","assets/images/" + enmChr.characterImageName);
	$chrImg.addClass("center-block img-responsive");
	$chrDiv.append($chrImg);
	var $chrHealth = $("<h5>");
	$chrHealth.html(enmChr.characterHealth);
	$chrDiv.append($chrHealth);
	$defenderChr.append($chrDiv);

	delete enmchr;
}