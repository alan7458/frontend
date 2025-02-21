const canvas = document.createElement("canvas");
canvas.id = "cursor-trail";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.pointerEvents = "none";
canvas.style.zIndex = "2";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.globalAlpha = 0.5;

const trails = {};

function drawTrail(userId, x, y, color) {
    if (!trails[userId]) trails[userId] = [];
    trails[userId].push({ x, y, color, time: Date.now() });

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let id in trails) {
        trails[id] = trails[id].filter(p => Date.now() - p.time < 1000);
        trails[id].forEach((p, i) => {
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x * canvas.width / 100, p.y * canvas.height / 100, 5 - i * 0.5, 0, Math.PI * 2);
            ctx.fill();
        });
    }
}

const users = {}; // Store user data

socket.on("ch", (data) => {
    users = {}; 
    data.ppl.forEach(p => {
        users[p.id] = { color: p.color };
    });
});

socket.on("p", (data) => {
    users[data.id] = { color: data.color };
});

socket.on("bye", (data) => {
    delete users[data.p];
});
