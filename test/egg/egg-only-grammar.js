// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const lexer = require('./lex.js');
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "program", "symbols": ["expression"], "postprocess": id},
    {"name": "expression", "symbols": [(lexer.has("STRING") ? {type: "STRING"} : STRING)], "postprocess": id},
    {"name": "expression", "symbols": [(lexer.has("NUMBER") ? {type: "NUMBER"} : NUMBER)], "postprocess": id},
    {"name": "expression", "symbols": [(lexer.has("WORD") ? {type: "WORD"} : WORD), "applies"], "postprocess": d => [d[0]].concat(d[1])},
    {"name": "applies", "symbols": [], "postprocess": d => null},
    {"name": "applies", "symbols": ["parenExp", "applies"], "postprocess": d => d[1]? d[0].concat(d[1]) : d[0]},
    {"name": "parenExp", "symbols": [{"literal":"("}, "commaExp", {"literal":")"}], "postprocess": ([lp, commaExp, rp]) => commaExp},
    {"name": "commaExp", "symbols": [], "postprocess": d => []},
    {"name": "commaExp$ebnf$1", "symbols": []},
    {"name": "commaExp$ebnf$1$subexpression$1", "symbols": [{"literal":","}, "expression"], "postprocess": ([_, e]) => e},
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
