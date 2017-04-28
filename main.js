'use strict';

/** main.js */

var latexInput = document.getElementById('latex-input');
var latexOutput = document.getElementById('latex-output');

// finds all items of class katex-name and renders them with logo
function renderKatexClass() {
  var els = document.getElementsByClassName('katex-name');

  for (var i = 0; i < els.length; ++i) {
    katex.render('\\KaTeX', els[i]);
  }
}

function initialParseQueryString() {
  // try and split it by '#'
  var parts = window.location.href.split('#');

  if (parts.length < 2) return;

  latexInput.value = decodeURI(parts.slice(1).join('#'));
}

function updateQueryString(latexInput) {
  // try and split it by '?'
  var parts = window.location.href.split('#');

  window.location.href = parts[0] + '#' + encodeURI(latexInput);
}

function renderKatex(latexString) {
  katex.render(latexString, latexOutput, { displayMode: true });
  console.log('rerendering');
}

function attachListeners() {
  function onInputChange(e) {
    updateQueryString(e.target.value);
    renderKatex(e.target.value);
  }

  latexInput.addEventListener('input', onInputChange);
}

/** call any setup functions */
initialParseQueryString();
renderKatexClass();
renderKatex(latexInput.value);
attachListeners();
