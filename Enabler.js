// ==UserScript==
// @name        Enabler
// @namespace   Violentmonkey Scripts
// @match       https://admin261.acellus.com/StudentFunctions/Interface/acellus_engine.html
// @grant       none
// @version     1.0
// @author      -
// @description 1/6/2022, 5:37:22 PM
// ==/UserScript==
function allowTextSelection() {
  window.console && console.log("allowTextSelection");

  //add styles that enable text selection
  var style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = `*, p, div {
    user-select: text !important;
    -moz-user-select: text !important;
    -webkit-user-select:text !important;}
  `;

  document.head.appendChild(style);

  //Put all of <body> children in a collection
  //Use getElementsByTagName because it has better compatibility (it's older) than querySelectorAll('*')
  var elArray = document.body.getElementsByTagName("*");

  //allow mouse events typically involved in selection
  for (var i = 0; i < elArray.length; i++) {
    var el = elArray[i];
    el.onselectstart = el.ondragstart = el.ondrag = el.oncontextmenu = el.onmousedown = el.onmouseup = function() {
      return true;
    };

    //special processing for text-style <input> elements
    if (
      el instanceof HTMLInputElement &&
      ["text", "password", "email", "number", "tel", "url"].indexOf(
        el.type.toLowerCase()
      ) > -1
    ) {
      //enable text inputs (to defeat an easy way to block selection by setting input's 'disabled' attribute)
      el.removeAttribute("disabled");

      //counteract any listener that would block copy&paste keyboard shortcuts. (I can't figure out yet why
      // although this works on the first text input in text-selection-demo.html, it doesn't work on the 2nd
      el.onkeydown = el.onkeyup = function() {
        return true;
      };
    }
  }
}
javascript:(function(){
  allowCopyAndPaste = function(e){
  e.stopImmediatePropagation();
  return true;
  };
  document.addEventListener('copy', allowCopyAndPaste, true);
  document.addEventListener('paste', allowCopyAndPaste, true);
  document.addEventListener('onpaste', allowCopyAndPaste, true);
})(); 
allowTextSelection();
