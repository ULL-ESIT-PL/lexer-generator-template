/**
 * The ASTs of the Egg Lang 
 * @external Grammar
 * @see {@link https://ull-esit-pl-2223.github.io/temas/syntax-analysis/ast.html#gramatica-informal-de-los-arboles-del-parser-de-egg}
 */

function buildNumberValue([token]) {
  //console.log(token);
  return {
    type: "value",
    value: token.value,
    raw: token.text,
  };
}

function buildStringValue([token]) {
  //console.log(token);
  return {
    type: "value",
    value: token.value.replace(/^"|"$/g, ""),
    raw: token.text,
  };
}

function buildWordApplies([word, applies]) {
  //console.log(word);
  //console.log(JSON.stringify(applies, null,2));
  if (applies == null) {
    word.type = "word";
    word.name = word.value;
    delete(word.value);
    delete(word.text);
    return word;  
  }

  let ast = {
    type: "apply",
    operator: word,
    args: applies[0],
  };

  if (applies.length == 1) {
    return ast;
  }
  for(let i=1; i < applies.length; i++) {
      let oldAst = ast;
      ast = {
          type: "apply",
          operator: oldAst,
          args: applies[i]
      }
  }
  //console.log("nested applies");
  return ast;
}


function buildNestedApplies([parenExp, applies]) {
    //console.log("buildNestedApplies---\n", JSON.stringify(applies, null,2));
    if (applies) return [parenExp].concat(applies)
    return [ parenExp ];
}

module.exports = { buildStringValue, buildNumberValue, buildWordApplies, buildNestedApplies };
