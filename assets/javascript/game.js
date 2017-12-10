const PLAYER_TO_SELECT_CHARACTER = 1;
const PLAYER_TO_SELECT_DEFENDER = 2;
const PLAYER_TO_ATTACK = 3;
var characters = [];
var gameStatus;
var yourCharacter;
var enemiesAvailable = [];

// Constructor for creating game characters
function Character(chrName, chrHealth, chrImgName, chrNickName){

	this.characterName = chrName;
	this.characterHealth = chrHealth;
	this.characterImageName = chrImgName;
	this.characterNickName = chrNickName;
}

// Function to initialize game
function initializeGame(){

	gameStatus = PLAYER_TO_SELECT_CHARACTER;
	yourCharacter = "";
	enemiesAvailable = [];
	characters[0] = new Character("Obi-Wan Kenobi",120,"obiwankenobi.jpg","Obi");
	characters[1] = new Character("Luke SkyWalker",100,"lukeskywalker.jpg","Luke");
	characters[2] = new Character("Darth Sidious",150,"darthsidious.jpg", "Sid");
	characters[3] = new Character("Darth Maul",180,"darthmaul.jpg", "Maul");

	var $container = $(".container");

	var $chrListDiv = $("<div>");
	$chrListDiv.addClass("row");
	$chrListDiv.attr("id","characterList");
	$container.prepend($chrListDiv);
	
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
}



$(function(){
	"use strict";
	initializeGame();

	$("#attackButton").on("click", function(){
		if(gameStatus==PLAYER_TO_ATTACK){

		}
	});

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
		}

	});

	
});


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
					playerToSelectDefender(enemiesAvailable[i]);
					$(this).remove();
					break;
				}
			}
		}
	});
}


function playerToSelectDefender(enmChr){
	gameStatus = PLAYER_TO_ATTACK;

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