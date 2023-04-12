@{%
const lexer = require('./lex.js');
%}
@lexer lexer

program -> expression {% id %}
expression -> 
       %STRING  {% id %}
    |  %NUMBER  {% id %}  
    |  %WORD applies {% d => [d[0]].concat(d[1]) %}
applies ->   null             {% d => null %}
        |  parenExp   applies {% d => d[1]? d[0].concat(d[1]) : d[0] %}

parenExp -> "("  commaExp ")" {% ([lp, commaExp, rp]) => commaExp %}

commaExp -> null       {% d => [] %}
        | expression ("," expression {% ([_, e]) => e %}):* {% d => [d[0]].concat(d[1]) %}