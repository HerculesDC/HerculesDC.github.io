document.getElementById("randomize").addEventListener("click", randomize);
const ghostList = document.getElementById("ghostList");
const ghostAttrib = document.getElementById("ghostAttrib");
const evidences = document.getElementById("evidence");

const chosenEvidence = document.getElementById("ghostEvidence");
const chosenHunting = document.getElementById("ghostHunting");
const chosenExtra = document.getElementById("ghostExtra");
const ghostIndex = -1;

const chosenGhost = document.getElementById("chosen");

function randomize(){
	
	var parsed = JSON.parse(ghostList.textContent);
	var ghostIndex = Math.floor(Math.random()*parsed.length);
	
	chosenGhost.innerHTML = ghostIndex+1 + ": " + parsed[ghostIndex];
	getAttrib(parsed[ghostIndex]);
}

function getAttrib(ghost){

	console.log(ghost);
	let gAttrib = JSON.parse(ghostAttrib.textContent);
	let evidencesJSON = JSON.parse(evidences.textContent);
	console.log(evidencesJSON);
	console.log(gAttrib[ghost].evidence);
	chosenEvidence.innerHTML = "";
	
	for(var evd = 0; evd < gAttrib[ghost].evidence.length; ++evd){
		chosenEvidence.innerHTML += evidencesJSON[gAttrib[ghost].evidence[evd]] + ", ";
	}
	chosenEvidence.innerHTML = chosenEvidence.innerHTML.substring(0, chosenEvidence.innerHTML.length-2);
	console.log(chosenEvidence.innerHTML);
	chosenHunting.innerHTML = gAttrib[ghost].hunting;
	chosenExtra.innerHTML = gAttrib[ghost].extra;
}