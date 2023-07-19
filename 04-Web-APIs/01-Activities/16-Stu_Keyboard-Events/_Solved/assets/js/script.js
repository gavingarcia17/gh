function keydownAction(event) {
  document.querySelector("#key").textContent = event.key;
  document.querySelector("#code").textContent = event.code;
  document.querySelector("#status").textContent = "KEYDOWN Event";
}

function keyupAction() {
  // Updates event to KEYUP Event when key is released
  document.querySelector("#status").innerHTML = "KEYUP Event";
}
// Adds listener for keydown event
document.addEventListener("keydown", keydownAction);
// Adds listener for keyup event
document.addEventListener("keyup", keyupAction);
