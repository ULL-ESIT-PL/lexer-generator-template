@{%
/**
 * The Grammar of the Egg Lang in nearley.js 
 * @external Grammar
 * @see {@link https://ull-esit-pl-2223.github.io/temas/syntax-analysis/teoria.html#gramaticas-independientes-del-contexto}
 */

const lexer = require('./lex.js');
const { buildStringValue, buildNumberValue, buildWordApplies, buildApplyApplies, buildNestedApplies } = require('./build-ast.js');
%}

@lexer lexer
program -> expression %EOF {% id %}
expression -> 
       %STRING       {% buildStringValue %}
    |  %NUMBER       {% buildNumberValue %}
    |  %WORD applies {% buildWordApplies %}

applies ->   null             {% d => null %}
        |  parenExp   applies {% buildNestedApplies %}

parenExp -> "("  commaExp ")" {% ([lp, commaExp, rp]) => commaExp %}

commaExp -> null       {% d => [] %}
        | expression ("," expression {% ([_, e]) => e %}):* {% d => [d[0]].concat(d[1]) %}