#!/usr/bin/env node
/**
 * @description A parser for egg lang files
 * @author XXXX <aluXXXX@ull.edu.es>
 * @since XX/XX/20XX
 */

 'use strict';

const fs = require('fs');
const nearley = require("nearley");
const grammar = require("./grammar.js");
 /**
 * A function that parses a egg file
 * @param {string} origin The name of the origin file
 * @throws Will throw if there are errors in the program or if the files
 *     can't be opened
 */
const parseFromFile = (origin) => {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  const source = fs.readFileSync(origin, 'utf8');
  parser.feed(source);
  debugger;
  const ast = parser.results[0];

  return ast;
};

module.exports = { parseFromFile };