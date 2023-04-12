const SPACE = /(?<SPACE>\s+|#.*|\/[*](?:.|\n)*?[*]\/)/; SPACE.skip = true;
const NUMBER = /(?<NUMBER>[-+]?\d+\.?\d*(?:[eE][-+]?\d+)?)/; NUMBER.value =  x => Number(x);
const STRING =  /(?<STRING>"(?:[^"\\]|\\.)*")/;
const WORD  = /(?<WORD>[^\s(),"]+)/;
const LP = /(?<LP>\()/;
const RP = /(?<RP>\))/;
const COMMA = /(?<COMMA>,)/;

/** Tokens object: definitions */
const tokens = [
  SPACE,
  NUMBER,
  STRING,
  WORD,
  LP,
  RP,
  COMMA,
];

const { nearleyLexer } = require("../../src/main.js");

let lexer = nearleyLexer(tokens);

debugger;

module.exports = lexer;
