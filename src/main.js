// @ts-check
/**
 * @author Casiano Rodríguez León <crguezl@ull.edu.es>
 * @since 28/03/2223 22/03/2022
 * @module lexgen-code
 * @file This module exports the functions buildLexer and nearleyLexer
 *     that allows to create lexical analyzers
 */

'use strict';

const HasNamedRegexp = / fill it /;
const IsNamedRegexp = /fill it/; // The same regexp as before but with anchors

/**
 * A helper function to check a regular expression has a
 *     named and only one named parenthesis and a body
 * @param {RegExp} namedRegexp The regular expression
 * @return {string | boolean} Whether the regular expression is named and has no named parenthesis inside
 * @private
 */
const checkRegExpIsNamed = (namedRegexp) => {
  // fill it
};

/**
 * Creates a lexical analyzer
 * @param {array} regexps An array of regular expressions.
 *     Regexps must be named using a parenthesis. Example: `/(?<NAME>.)/`.
 *     The whole regexp must be inside the parenthesis.
 *     The names SPACE and ERROR are special:<br><br>
 *     1. SPACE. If something matches a parenthesis named SPACE it will
 *     be ignored<br><br>
 *     2. ERROR. It is a special value reserved for the implementation.
 *     When something doesn't match any of the provided regexps it will
 *     be returned as error. The error will span from the point where nothing
 *     matched to the next whitespace(\s)<br><br>
 *     **Note**: When two regexps can match the one that appears
 *     earlier will be chosen
 * @throws {Error} Will throw if each regular expression isn't named
 *     or has more than one name
 * @return {Object} The map of valid tokens and a lexical analyzer in form of a function
 */
const buildLexer = (regexps) => {
  let validTokens = new Map();
  regexps.push(/(?<ERROR>(.|\n)+)/);
  regexps.forEach((regexp) => {
    // fill it
  });
  const regexp = new RegExp(
    // fill it
  );
  let lexer = (string, line=1) => {
    // fill it
  };

  return {validTokens, lexer};
};

const nearleyLexer = function(regexps, options) {
  //debugger;
  const {validTokens, lexer} = buildLexer(regexps);
  validTokens.set("EOF");
  return {
    currentPos: 0,
    buffer: '',
    lexer: lexer,
    validTokens: validTokens,
    regexps: regexps,
    /**
     * Sets the internal buffer to data, and restores line/col/state info taken from save().
     * Compatibility not tested
     */
    reset: function(data, info) { 
      this.buffer = data || '';
      this.currentPos = 0;
      let line = info ? info.line : 1;
      this.tokens = lexer(data, line);
      
      let lastToken = {}; 
        // Replicate the last token if it exists
      Object.assign(lastToken, this.tokens[this.tokens.length-1]);
      lastToken.type = "EOF"
      lastToken.value = "EOF"

      this.tokens.push(lastToken);

      //console.log(this.tokens);
      if (options && options.transform) {
        if (typeof options.transform === 'function') {
          debugger;
          this.tokens = options.transform(this.tokens);
        } else if (Array.isArray(options.transform)) {
          options.transform.forEach(trans => this.tokens = trans(this.tokens))
        }
      } 
      return this;
    },
    /**
     * Returns e.g. {type, value, line, col, …}. Only the value attribute is required.
     */
    next: function() { // next(): Token | undefined;
      if (this.currentPos < this.tokens.length)
        return this.tokens[this.currentPos++];
      return undefined;
    },
    has: function(tokenType) {
      return validTokens.has(tokenType);
    },
    /**
     * Returns an object describing the current line/col etc. This allows nearley.JS
     * to preserve this information between feed() calls, and also to support Parser#rewind().
     * The exact structure is lexer-specific; nearley doesn't care what's in it.
     */
    save: function() {
      return this.tokens[this.currentPos];
    }, // line and col
    /**
     * Returns a string with an error message describing the line/col of the offending token.
     * You might like to include a preview of the line in question.
     */
    formatError: function(token) {
      return `Error near "${token.value}" in line ${token.line}`;
    } // string with error message
  };
}

module.exports = { buildLexer, nearleyLexer };
