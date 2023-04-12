#!/usr/bin/env node
/**
 * @description A executable to be able to compile eggc lang files
 * @author XXXX <aluXXXX@ull.edu.es>
 * @since XX/XX/20XX
 */

 'use strict';

 const fs = require('fs');
 const { parseFromFile } = require("./index.js");

const compile = (origin, destination = undefined) => {
  if (destination == undefined) {
    destination = origin.match(/^[^\.]*/)[0] + '.json';
  }

  const ast = parseFromFile(origin);

  //console.log(ast);
  const astString = JSON.stringify(ast, null, 2);

  fs.writeFileSync(destination, astString);
};

compile(process.argv[2] || 'array.egg');
