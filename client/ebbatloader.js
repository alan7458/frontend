function reloadEbbattle(newParams) {
    // Update global parameters
    globalThis.params = newParams;

    // Remove the old canvas if it exists
    let oldCanvas = document.getElementById("ebbattle");
    if (oldCanvas) {
        oldCanvas.remove();
        console.log("Old canvas removed.");
    }

    // Remove the old ebbattle.js script
    let existingScript = document.getElementById("ebbattle-script");
    if (existingScript) {
        existingScript.remove();
    }

    // Create and append a new script element
    let script = document.createElement("script");
    script.src = "ebbattle.js";
    script.id = "ebbattle-script";
    script.onload = () => console.log("ebbattle.js reloaded with params:", globalThis.params);

    document.body.appendChild(script);
}
