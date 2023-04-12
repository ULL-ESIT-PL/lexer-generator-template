// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

/**
 * The Grammar of the Egg Lang in nearley.js 
 * @external Grammar
 * @see {@link https://ull-esit-pl-2223.github.io/temas/syntax-analysis/teoria.html#gramaticas-independientes-del-contexto}
 */

const lexer = require('./lex.js');
const { buildStringValue, buildNumberValue, buildWordApplies, buildApplyApplies, buildNestedApplies } = require('./build-ast.js');
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "program", "symbols": ["expression", (lexer.has("EOF") ? {type: "EOF"} : EOF)], "postprocess": id},
    {"name": "expression", "symbols": [(lexer.has("STRING") ? {type: "STRING"} : STRING)], "postprocess": buildStringValue},
    {"name": "expression", "symbols": [(lexer.has("NUMBER") ? {type: "NUMBER"} : NUMBER)], "postprocess": buildNumberValue},
    {"name": "expression", "symbols": [(lexer.has("WORD") ? {type: "WORD"} : WORD), "applies"], "postprocess": buildWordApplies},
    {"name": "applies", "symbols": [], "postprocess": d => null},
    {"name": "applies", "symbols": ["parenExp", "applies"], "postprocess": buildNestedApplies},
    {"name": "parenExp", "symbols": [(lexer.has("LP") ? {type: "LP"} : LP), "commaExp", (lexer.has("RP") ? {type: "RP"} : RP)], "postprocess": ([lp, commaExp, rp]) => commaExp},
    {"name": "commaExp", "symbols": [], "postprocess": d => []},
    {"name": "commaExp$ebnf$1", "symbols": []},
    {"name": "commaExp$ebnf$1$subexpression$1", "symbols": [(lexer.has("COMMA") ? {type: "COMMA"} : COMMA), "expression"], "postprocess": ([_, e]) => e},
    {"name": "commaExp$ebnf$1", "symbols": ["commaExp$ebnf$1", "commaExp$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "commaExp", "symbols": ["expression", "commaExp$ebnf$1"], "postprocess": d => [d[0]].concat(d[1])}
]
  , ParserStart: "program"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
