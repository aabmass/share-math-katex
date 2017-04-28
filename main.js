'use strict';

/** main.js */

var latexInput = document.getElementById('latex-input');
var latexOutput = document.getElementById('latex-output');

function base64UrlEncode(text) {
  var nonUrlSafe = btoa(text);

  // now replace replace the non-safe chars:
  //
  // + -> -
  // / -> _
  //
  // and the padding ('='):
  // = -> ''
  return nonUrlSafe.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function base64UrlDecode(encodedText) {
  // do the opposite of base64UrlEncode()
  var nonUrlSafe = encodedText.replace('-', '+').replace('_', '-');

  // now fix the padding
  var extraSize = nonUrlSafe.length % 4;
  if (extraSize === 2)
    nonUrlSafe += '==';
  else if (extraSize === 3)
    nonUrlSafe += '=';

  return atob(nonUrlSafe);
}

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

  // catch any decoding errors
  try {
    latexInput.value = base64UrlDecode(parts.slice(1).join('#'));
  }
  catch(e) {
    // the encoded url wasn't valid, just trim it and continue on..
    window.location.href = parts[0] + '#';
    latexInput.value = '';
  }
}

function updateQueryString(latexInput) {
  // try and split it by '?'
  var parts = window.location.href.split('#');

  window.location.href = parts[0] + '#' + base64UrlEncode(latexInput);
}

function renderKatex(latexString) {
  katex.render(latexString, latexOutput, { displayMode: true });
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
