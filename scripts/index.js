"use strict";

const inputString = document.getElementById("inputString");
const outputString = document.getElementById("outputString");
const encodeButton = document.getElementById("encodeButton");
const decodeButton = document.getElementById("decodeButton");

encodeButton.addEventListener("click", () => {
  outputString.value = btoa(inputString.value);
});

decodeButton.addEventListener("click", () => {
  outputString.value = atob(inputString.value);
});
