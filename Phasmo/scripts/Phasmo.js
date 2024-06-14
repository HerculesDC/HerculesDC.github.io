const ghostLink = document.createElement("link");
ghostLink.id = "ghostList";
ghostLink.href = "./assets/json/ghostList.json";

document.body.appendChild(ghostLink);

function randomize(){
	
	let ghostListLink = document.getElementById("ghostList");
	let ghostList = fetch(ghostListLink.href);
	console.log(ghostList.length);
}

randomize();