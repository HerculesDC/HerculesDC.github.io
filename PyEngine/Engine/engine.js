(async () => {
	let c = document.createElement("canvas");
	document.body.appendChild(c);
	const pyodide = await loadPyodide();
	const f = await fetch("./Engine/engine.py");
	const t = await f.text()
	pyodide.runPythonAsync(t);
	
	console.log(t);
})();