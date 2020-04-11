var haveEvents = 'ongamepadconnected' in window;
var controllers = {};

var leftX;
var leftY;
var rightX;
var rightY;
var xPressed = false;

function connecthandler(e) {
  addgamepad(e.gamepad);
  console.log("CONNECTED");
}

function addgamepad(gamepad) {
  controllers[gamepad.index] = gamepad;
  requestAnimationFrame(updateStatus);
}

function disconnecthandler(e) {
  removegamepad(e.gamepad);
}

function removegamepad(gamepad) {
  delete controllers[gamepad.index];
}

function updateStatus() {
  if (!haveEvents) {
    scangamepads();
  }

  for (j in controllers) {
    var controller = controllers[j];
    leftX = controller.axes[0];
    leftY = controller.axes[1];
    rightX = controller.axes[2];
    rightY = controller.axes[3];
    xPressed = controller.buttons[0].pressed;
  

    // for (i = 0; i < controller.axes.length; i++) {
    //   console.log(controller.axes);
    // }
  }

  requestAnimationFrame(updateStatus);
}

function scangamepads() {
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
  for (var i = 0; i < gamepads.length; i++) {
    if (gamepads[i]) {
      if (gamepads[i].index in controllers) {
        controllers[gamepads[i].index] = gamepads[i];
      } else {
        addgamepad(gamepads[i]);
      }
    }
  }
}

window.addEventListener("gamepadconnected", connecthandler);
window.addEventListener("gamepaddisconnected", disconnecthandler);

if (!haveEvents) {
  setInterval(scangamepads, 500);
}