/*
triangle.js
Erik Fredericks, c/o Ed Angel

This file does the actual drawing of the triangle
*/

// Global variables we'll need
var gl;
var points;

let x = 0.0;
let y = 0.0;
let xLoc, yLoc;

let dirs = [null, null]; // horizontal, vertical


// This function executes our WebGL code AFTER the window is loaded.
// Meaning, that we wait for our canvas element to exist.
window.onload = function init() {
  window.addEventListener(
    "keydown",
    function (e) {
    console.log("Key: " + e.key);
    if (e.key == "ArrowLeft") {
      dirs[0] = false;
      } else if (e.key == "ArrowRight") {
      dirs[0] = true;
      } else if (e.key == "ArrowUp") {
      dirs[1] = true;
      } else if (e.key == "ArrowDown") {
      dirs[1] = false;
      } else if (e.key == " ") {
      dirs[0] = null;
      dirs[1] = null;
      }
    },
    false
    
    );
  // Grab the canvas object and initialize it
  var canvas = document.getElementById('gl-canvas');
  gl = WebGLUtils.setupWebGL(canvas);

  // Error checking
  if (!gl) { alert('WebGL unavailable'); }

  // triangle vertices
  var vertices = [
    vec2(-0.25, -0.25),
    vec2(0, 0.25),
    vec2(0.25, -0.25)
  ];

  // configure WebGL
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  // load shaders and initialize attribute buffers
  var program = initShaders(gl, 'vertex-shader', 'fragment-shader');
  gl.useProgram(program);

  xLoc = gl.getUniformLocation(program, "x");
  yLoc = gl.getUniformLocation(program, "y");

  // load data into GPU
  var bufferID = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferID);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

  // set its position and render it
  var vPosition = gl.getAttribLocation(program, 'vPosition');
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);
  render();
};

// Render whatever is in our gl variable
function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  if (dirs[0] === true) // move right
  x += 0.01;
  else if (dirs[0] === false) // move left
  x -= 0.01;
  if (dirs[1] === true) // move up
  y += 0.01;
  else if (dirs[1] === false) // move down
  y -= 0.01;
  gl.uniform1f(xLoc, x);
  gl.uniform1f(yLoc, y);

  window.requestAnimationFrame(render);

}
