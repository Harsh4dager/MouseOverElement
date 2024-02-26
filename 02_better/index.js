// start better version

// let's select canvas and it's 2d rendering
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// let's see the canvas dim same as of the window
function setCanvasDIM(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
setCanvasDIM();

// Function to handle mousemove event
function handleMouseMove(event) {
    // Get mouse coordinates relative to the canvas
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Reset the radius of all balls to their original sizes
    balls.forEach(function(ball) {
        ball.radius = ball.originalRadius;
    });

    // Check if the mouse is over any ball
    for (let i = 0; i < balls.length; i++) {
        const ball = balls[i];
        // Calculate distance between mouse and ball center
        const distance = Math.sqrt((mouseX - ball.x) ** 2 + (mouseY - ball.y) ** 2);
        // If the distance is less than or equal to the radius, mouse is over the ball
        if (distance <= ball.originalRadius) {
            // Double the radius of the ball
            ball.radius *= 2;
            // Break the loop once a ball is hovered to prevent multiple balls from increasing in size
            break;
        }
    }
}

// Add mousemove event listener to the canvas
canvas.addEventListener('mousemove', handleMouseMove);


// let's now define a ball ( from size in range of  10 to 30)
function ball(){
    this.originalRadius = Math.random() * 30 + 10; // Store the original radius( will use it in handling event on balls)
    this.radius = this.originalRadius; // Current radius
    this.color = `rgba(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.random()})`;
    this.x = (Math.random() * canvas.width); // x-coordinate of the center of the ball.
    this.y = (Math.random() * canvas.height); // y-coordinate of the center of the ball.

    let maxVelocity = 3
    let minVelocity = -3
    this.dx = Math.random() * (maxVelocity - minVelocity) + minVelocity; // horizontal velocity
    this.dy = Math.random() * (maxVelocity - minVelocity) + minVelocity;// vertical velocity
}

// now we've defined variables of ball object, so let's draw this ball by creating a seperate unction that takes a "ball" Object as a parameter
function drawBall(ball){
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
    // It begins a new path on the canvas, draws a filled circle using arc method, sets the fill style to the ball's color, fills the circle, and closes the path.
}

// now let's define a update function which will continuousy draw and clear the canvas to make it show that the balls are moving
// now let's define a update function which will continuously draw and clear the canvas to make it show that the balls are moving
function update() {
    // initially let's clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // now let's loop through all balls
    for (let i = 0; i < balls.length; i++) {
        let myBall = balls[i];

        // update ball position
        myBall.x += myBall.dx;
        myBall.y += myBall.dy;

        // now let's check if the ball hits the canvas edges
        if (myBall.x + myBall.radius > canvas.width || myBall.x - myBall.radius < 0) {
            myBall.dx = -myBall.dx;
        }
        if (myBall.y + myBall.radius > canvas.height || myBall.y - myBall.radius < 0) {
            myBall.dy = -myBall.dy;
        }

        // now draw these balls
        drawBall(myBall);
    }

    // now let's Request animation frame
    requestAnimationFrame(update);
}



// let's create 100 balls
const balls = [];
for(let i = 0; i<100; i++){
    balls.push( new ball());
}

update();