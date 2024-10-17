"use strict";

const inputString = document.getElementById("inputString");
const outputString = document.getElementById("outputString");
const encodeButton = document.getElementById("encodeButton");
const decodeButton = document.getElementById("decodeButton");
const copyButton = document.getElementById("copyButton");

encodeButton.addEventListener("click", () => {
  outputString.value = btoa(inputString.value);
});

decodeButton.addEventListener("click", () => {
  outputString.value = atob(inputString.value);
});

copyButton.addEventListener("click", () => {
  if (outputString.value) {
    navigator.clipboard
      .writeText(outputString.value)
      .then(() => console.log("Copied to clipboard."))
      .catch((error) => console.log("Failed to copy to clipboard: ", error));
  }
});
