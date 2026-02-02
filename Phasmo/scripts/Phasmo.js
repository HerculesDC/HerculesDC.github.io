(async ()=>{
	document.getElementById("randomize").addEventListener("click", randomize);

	const evid = await fetch("./scripts/evidenceList.json");
	const evidences = await evid.json();

	const attrib = await fetch("./scripts/ghostAttrib.json");
	const ghostAttrib = await attrib.json();
	const ghostList = Object.keys(ghostAttrib);

	const chosenEvidence = document.getElementById("ghostEvidence");
	const chosenHunting = document.getElementById("ghostHunting");
	const chosenExtra = document.getElementById("ghostExtra");
	var ghostIndex = -1;
	const chosenGhost = document.getElementById("chosen");

	const bookletIcon = document.getElementById("symbol");
	const itemIcon = [ document.getElementById("equip00"),
					   document.getElementById("equip01"),
					   document.getElementById("equip02"),
					   document.getElementById("equip03"),
					   document.getElementById("equip04"),
					   document.getElementById("equip05"),
					   document.getElementById("equip06"),
					   document.getElementById("sanity"),
					   document.getElementById("speed"),
					   document.getElementById("diff"),
					   document.getElementById("extraAttrib"),
					   document.getElementById("reveal")]

	for(let i = 0; i < itemIcon.length; ++i){
		itemIcon[i].addEventListener("click", () => { reveal(i, ghostIndex); });
	}

	function randomize(){
		ghostIndex = Math.floor(Math.random()*ghostList.length);
		bookletIcon.innerHTML="NEW<br>GHOST\nCHOSEN";
		for(let i = 0; i < itemIcon.length; ++i){
			itemIcon[i].style.color="silver";;
		}
	}

	function getGhostAttrib(ghost){
		return ghostAttrib[ghostList[ghost]];
	}

	function highlight(iconNo){
		for(let i = 0;i < itemIcon.length; ++i){
			itemIcon[i].removeAttribute("class");
		}
		itemIcon[iconNo].setAttribute("class", "highlighted");
	}

	function revealGhost(ghost){
		bookletIcon.style.color="ivory";
		bookletIcon.style.fontSize="50px";
		bookletIcon.innerHTML=ghostList[ghost];
	}

	function revealExtra(ghost){
		bookletIcon.style.color="silver";
		bookletIcon.style.fontSize="50px";
		bookletIcon.innerHTML = getGhostAttrib(ghost).extra.replace(" ", "<br>");
	}

	function revealHuntingAttribute(attrib, ghost){
		bookletIcon.style.color="silver";
		bookletIcon.innerHTML = getGhostAttrib(ghost).hunting[attrib];
	}

	function revealEquipmentInteraction(equip, ghost){
		if(getGhostAttrib(ghost).evidence.includes(equip)){
			itemIcon[equip].style.color = bookletIcon.style.color = "green";
			bookletIcon.innerHTML = "O";
		}
		else{
			itemIcon[equip].style.color = bookletIcon.style.color = "red";
			bookletIcon.innerHTML = "X";
		}
	}

	function reveal(evidenceNo, ghost){
		highlight(evidenceNo);
		
		if (ghostIndex < 0) return;
		
		if (evidenceNo == 11){
			revealGhost(ghost);
			return;
		}
		
		if(evidenceNo == 10){
			revealExtra(ghost);
			return;
		}
		
		bookletIcon.style.color="silver";
		bookletIcon.style.fontSize = "128px";
		bookletIcon.style.fontWeight = "bold";
		if (evidenceNo >= evidences.length){
			revealHuntingAttribute(evidenceNo-evidences.length, ghost);
			return;
		}
		
		revealEquipmentInteraction(evidenceNo, ghost);
	}
})();