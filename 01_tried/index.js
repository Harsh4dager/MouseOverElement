// tried this-> https://codepen.io/b4rb4tron/pen/wjyXNJ

// let's get canvas and 2D rendering context.
let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')

// now let's define Circle class: each circle have properties like: position, velocity, radius and color
class Circle{
    constructor(x,y,radius, dx, dy, color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx; // velocity of circle in x direction
        this.dy = dy; // velocity of circle in y direction
        this.color = color;
    }

    // now let's define the draw function
    draw(){
        ctx.beginPath(); // this clears previous paths and it's good to call it before drawing a new shape

        // now let's draw a circle using arc() function.
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); // here x and y are the cooridinates of the arc's center, 0 here is starting angle and Math.PI * 2 means 360 deg in radian as our ending angle.

        ctx.fillStyle = this.color; // filling the interior shape with the given color.

        ctx.fill(); // this func will apply these above defined color.
    }

    // now let's define a function which will used to update positions of the circle and make sure that the circle bounce back from the boudries
    update(){
        // let's increment the current postion with the given velocities(both horizontally and vertically)
        this.x += this.dx; 
        this.y += this.dy; 

        // now let's check condition what if the updated pos will make the circle out from the canvas
        if((this.x + this.radius > canvas.width) || (this.x - this.radius < 0)){
            this.dx = -this.dx; // start moving in opposite direction with -ve velocity.
        }
        if((this.y + this.radius > canvas.width) || (this.y - this.radius < 0)){
            this.dy = -this.dy; 
        }

        // now let's draw the circle
        this.draw(); // here this refers to the circle's instance.
    }
};

// now let's create circles
const circles = [];
for(let i = 0; i<50; i++){
    const radius = Math.random() *10 + 5; // making the circles with atleast 5 radius and atmost 15 radius

    // now let's define radom positions within the width of canvas.
    const x = Math.random() * (canvas.width - radius * 2) + radius;
    const y = Math.random() * (canvas.width - radius * 2) + radius;

    // now let's define random velocities( in both x and y directions)
    const dx = (Math.random() - 0.5) * 5;
    const dy = (Math.random() - 0.5) * 5;

    // now let's also take a random color
    const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;

    // now let's push this particular circle into circles
    circles.push(new Circle(x, y, radius, dx, dy, color));
}

// now let's create an animation loop that continuouly updates and redraws the circles on the canvas.
function animate(){
    // we'll use requestAnimationFrame(animate); for creating smooth and efficient animations.
    // its purpose is to schedule the execution of a callback function before the next repaint of the browser window
    requestAnimationFrame(animate);

    // now in animation we dont actually "MOVE" objects on the canvas, instead, we continously redraw them in slightly updated positions in each frame, so we need to clear the canvas before drawing the new circle
    ctx.clearRect(0, 0, canvas.width, canvas.height); // it says start from x = 0 and y = 0 ( initial pos ) and clear upto x = canvas.width and y = canvas.height ( menaing the whole canvas);

    // now let's use a forEach loop and update the circles
    circles.forEach(circle => {
        circle.update();
    })
}

animate();
