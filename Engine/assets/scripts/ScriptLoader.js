/************************************************************************************
 * Credit where credit is due, this code is almost verbatim extracted from			*
 * https://www.educative.io/answers/how-to-dynamically-load-a-js-file-in-javascript	*
 ************************************************************************************/
 
function loadScript(file){
	return new Promise((resolve, reject) => {
		const newScript = document.createElement("script");
		newScript.setAttribute("src", file);
		newScript.setAttribute("type", "module");
		newScript.setAttribute("async", "true");
		
		newScript.onload = () => {
			console.log("File " + file + " loaded successfully");
			resolve();
		};
		newScript.onerror = () => {
			console.log("Error loading " + file);
			reject(new Error("Failed to load " + file));
		};
		
		document.head.appendChild(newScript);
	});
}

loadScript("./assets/scripts/Engine.js");