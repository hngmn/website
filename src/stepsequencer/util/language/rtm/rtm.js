/*
 * Generated by PEG.js 0.10.0.
 *
 * http://pegjs.org/
 */

"use strict";

function peg$subclass(child, parent) {
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor();
}

function peg$SyntaxError(message, expected, found, location) {
  this.message  = message;
  this.expected = expected;
  this.found    = found;
  this.location = location;
  this.name     = "SyntaxError";

  if (typeof Error.captureStackTrace === "function") {
    Error.captureStackTrace(this, peg$SyntaxError);
  }
}

peg$subclass(peg$SyntaxError, Error);

peg$SyntaxError.buildMessage = function(expected, found) {
  var DESCRIBE_EXPECTATION_FNS = {
        literal: function(expectation) {
          return "\"" + literalEscape(expectation.text) + "\"";
        },

        "class": function(expectation) {
          var escapedParts = "",
              i;

          for (i = 0; i < expectation.parts.length; i++) {
            escapedParts += expectation.parts[i] instanceof Array
              ? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1])
              : classEscape(expectation.parts[i]);
          }

          return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
        },

        any: function(expectation) {
          return "any character";
        },

        end: function(expectation) {
          return "end of input";
        },

        other: function(expectation) {
          return expectation.description;
        }
      };

  function hex(ch) {
    return ch.charCodeAt(0).toString(16).toUpperCase();
  }

  function literalEscape(s) {
    return s
      .replace(/\\/g, '\\\\')
      .replace(/"/g,  '\\"')
      .replace(/\0/g, '\\0')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
  }

  function classEscape(s) {
    return s
      .replace(/\\/g, '\\\\')
      .replace(/\]/g, '\\]')
      .replace(/\^/g, '\\^')
      .replace(/-/g,  '\\-')
      .replace(/\0/g, '\\0')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
  }

  function describeExpectation(expectation) {
    return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
  }

  function describeExpected(expected) {
    var descriptions = new Array(expected.length),
        i, j;

    for (i = 0; i < expected.length; i++) {
      descriptions[i] = describeExpectation(expected[i]);
    }

    descriptions.sort();

    if (descriptions.length > 0) {
      for (i = 1, j = 1; i < descriptions.length; i++) {
        if (descriptions[i - 1] !== descriptions[i]) {
          descriptions[j] = descriptions[i];
          j++;
        }
      }
      descriptions.length = j;
    }

    switch (descriptions.length) {
      case 1:
        return descriptions[0];

      case 2:
        return descriptions[0] + " or " + descriptions[1];

      default:
        return descriptions.slice(0, -1).join(", ")
          + ", or "
          + descriptions[descriptions.length - 1];
    }
  }

  function describeFound(found) {
    return found ? "\"" + literalEscape(found) + "\"" : "end of input";
  }

  return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
};

function peg$parse(input, options) {
  options = options !== void 0 ? options : {};

  var peg$FAILED = {},

      peg$startRuleFunctions = { Start: peg$parseStart },
      peg$startRuleFunction  = peg$parseStart,

      peg$c0 = function(rtm) {
              return rtm.data;
          },
      peg$c1 = "=",
      peg$c2 = peg$literalExpectation("=", false),
      peg$c3 = function(id, rtm) {
              if (id in env) {
                  error(`Variable "${id} already defined."`);
              }

              env[id] = rtm.data;
          },
      peg$c4 = function(head, tail) {
              return [head].concat(
                  tail.map(([_, expr]) => expr).flat()
              );
          },
      peg$c5 = "(",
      peg$c6 = peg$literalExpectation("(", false),
      peg$c7 = ")",
      peg$c8 = peg$literalExpectation(")", false),
      peg$c9 = function(rtm) { return rtm; },
      peg$c10 = function(v) {
              console.log(`VariableRef: ${v.data}`);
              if (!(id in env)) {
                  error(`Variable "${v.data}" undefined.`);
              }

              return {
                  type: 'VARIABLE',
                  variable: id,
                  data: env[id],
              }
          },
      peg$c11 = function(fn, args) {
              // console.log(`FunctionCall: ${fn.data}, ${args.length} args`);
              // args.forEach((arg, index) => console.log(`${index}: `, arg));

              const fnName = fn.data;
              if (!(fnName in builtins)) {
                  error(`Function ${fnName} not found`);
              }

              const result = builtins[fnName]['fn'].apply(null, args.map(arg => arg.data));
              // console.log('result: ', result);
              const node = {
                  type: 'FUNCTIONCALL',
                  name: fnName,
                  args: args,
                  data: result,
              };
              console.log('FUNCTIONCALL: ', node);
              return node;
          },
      peg$c12 = "all",
      peg$c13 = peg$literalExpectation("all", false),
      peg$c14 = "a",
      peg$c15 = peg$literalExpectation("a", false),
      peg$c16 = "empty",
      peg$c17 = peg$literalExpectation("empty", false),
      peg$c18 = "e",
      peg$c19 = peg$literalExpectation("e", false),
      peg$c20 = "invert",
      peg$c21 = peg$literalExpectation("invert", false),
      peg$c22 = "i",
      peg$c23 = peg$literalExpectation("i", false),
      peg$c24 = "reverse",
      peg$c25 = peg$literalExpectation("reverse", false),
      peg$c26 = "rv",
      peg$c27 = peg$literalExpectation("rv", false),
      peg$c28 = "fixedlength",
      peg$c29 = peg$literalExpectation("fixedlength", false),
      peg$c30 = "fl",
      peg$c31 = peg$literalExpectation("fl", false),
      peg$c32 = "repeat",
      peg$c33 = peg$literalExpectation("repeat", false),
      peg$c34 = "rpt",
      peg$c35 = peg$literalExpectation("rpt", false),
      peg$c36 = "r",
      peg$c37 = peg$literalExpectation("r", false),
      peg$c38 = "rs",
      peg$c39 = peg$literalExpectation("rs", false),
      peg$c40 = "ls",
      peg$c41 = peg$literalExpectation("ls", false),
      peg$c42 = "and",
      peg$c43 = peg$literalExpectation("and", false),
      peg$c44 = "both",
      peg$c45 = peg$literalExpectation("both", false),
      peg$c46 = "overlap",
      peg$c47 = peg$literalExpectation("overlap", false),
      peg$c48 = "or",
      peg$c49 = peg$literalExpectation("or", false),
      peg$c50 = "either",
      peg$c51 = peg$literalExpectation("either", false),
      peg$c52 = "merge",
      peg$c53 = peg$literalExpectation("merge", false),
      peg$c54 = "exor",
      peg$c55 = peg$literalExpectation("exor", false),
      peg$c56 = /^[\-.]/,
      peg$c57 = peg$classExpectation(["-", "."], false, false),
      peg$c58 = function(beats) {
              return {
                  type: 'LITERAL',
                  data: beats.map(beat => beat === '-' ? true : false),
              };
          },
      peg$c59 = function(n, unit) {
              const unitMap = {
                  m: NBEATS_PER_MEASURE,
                  h: NBEATS_PER_MEASURE / 2,
                  q: NBEATS_PER_MEASURE / 4,
                  e: NBEATS_PER_MEASURE / 8,
                  s: NBEATS_PER_MEASURE / 16
              }

              return {
                  type: 'INTERVAL',
                  data: n * unitMap[unit.data],
              };
          },
      peg$c60 = /^[mhqes]/,
      peg$c61 = peg$classExpectation(["m", "h", "q", "e", "s"], false, false),
      peg$c62 = function() {
          return {
              type: 'UNIT',
              data: text(),
          }
      },
      peg$c63 = /^[a-z]/,
      peg$c64 = peg$classExpectation([["a", "z"]], false, false),
      peg$c65 = function() {
              return {
                  type: 'IDENTIFIER',
                  data: text(),
              };
          },
      peg$c66 = peg$otherExpectation("integer"),
      peg$c67 = /^[0-9]/,
      peg$c68 = peg$classExpectation([["0", "9"]], false, false),
      peg$c69 = function() {
              return {
                  type: 'INTEGER',
                  data: parseInt(text(), 10),
              };
          },
      peg$c70 = peg$otherExpectation("whitespaceoptional"),
      peg$c71 = /^[ \t\n\r]/,
      peg$c72 = peg$classExpectation([" ", "\t", "\n", "\r"], false, false),
      peg$c73 = peg$otherExpectation("whitespacerequired"),

      peg$currPos          = 0,
      peg$savedPos         = 0,
      peg$posDetailsCache  = [{ line: 1, column: 1 }],
      peg$maxFailPos       = 0,
      peg$maxFailExpected  = [],
      peg$silentFails      = 0,

      peg$result;

  if ("startRule" in options) {
    if (!(options.startRule in peg$startRuleFunctions)) {
      throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
    }

    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
  }

  function text() {
    return input.substring(peg$savedPos, peg$currPos);
  }

  function location() {
    return peg$computeLocation(peg$savedPos, peg$currPos);
  }

  function expected(description, location) {
    location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos)

    throw peg$buildStructuredError(
      [peg$otherExpectation(description)],
      input.substring(peg$savedPos, peg$currPos),
      location
    );
  }

  function error(message, location) {
    location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos)

    throw peg$buildSimpleError(message, location);
  }

  function peg$literalExpectation(text, ignoreCase) {
    return { type: "literal", text: text, ignoreCase: ignoreCase };
  }

  function peg$classExpectation(parts, inverted, ignoreCase) {
    return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
  }

  function peg$anyExpectation() {
    return { type: "any" };
  }

  function peg$endExpectation() {
    return { type: "end" };
  }

  function peg$otherExpectation(description) {
    return { type: "other", description: description };
  }

  function peg$computePosDetails(pos) {
    var details = peg$posDetailsCache[pos], p;

    if (details) {
      return details;
    } else {
      p = pos - 1;
      while (!peg$posDetailsCache[p]) {
        p--;
      }

      details = peg$posDetailsCache[p];
      details = {
        line:   details.line,
        column: details.column
      };

      while (p < pos) {
        if (input.charCodeAt(p) === 10) {
          details.line++;
          details.column = 1;
        } else {
          details.column++;
        }

        p++;
      }

      peg$posDetailsCache[pos] = details;
      return details;
    }
  }

  function peg$computeLocation(startPos, endPos) {
    var startPosDetails = peg$computePosDetails(startPos),
        endPosDetails   = peg$computePosDetails(endPos);

    return {
      start: {
        offset: startPos,
        line:   startPosDetails.line,
        column: startPosDetails.column
      },
      end: {
        offset: endPos,
        line:   endPosDetails.line,
        column: endPosDetails.column
      }
    };
  }

  function peg$fail(expected) {
    if (peg$currPos < peg$maxFailPos) { return; }

    if (peg$currPos > peg$maxFailPos) {
      peg$maxFailPos = peg$currPos;
      peg$maxFailExpected = [];
    }

    peg$maxFailExpected.push(expected);
  }

  function peg$buildSimpleError(message, location) {
    return new peg$SyntaxError(message, null, null, location);
  }

  function peg$buildStructuredError(expected, found, location) {
    return new peg$SyntaxError(
      peg$SyntaxError.buildMessage(expected, found),
      expected,
      found,
      location
    );
  }

  function peg$parseStart() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = peg$parse_();
    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      s3 = peg$parseDefinitionList();
      if (s3 !== peg$FAILED) {
        s4 = peg$parse__();
        if (s4 !== peg$FAILED) {
          s3 = [s3, s4];
          s2 = s3;
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parseRhythm();
        if (s3 !== peg$FAILED) {
          s4 = peg$parse_();
          if (s4 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c0(s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseDefinitionList() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$parseDefinition();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$parse__();
      if (s4 !== peg$FAILED) {
        s5 = peg$parseDefinition();
        if (s5 !== peg$FAILED) {
          s4 = [s4, s5];
          s3 = s4;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$parse__();
        if (s4 !== peg$FAILED) {
          s5 = peg$parseDefinition();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseDefinition() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$parseIdentifier();
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 61) {
          s3 = peg$c1;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c2); }
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parse_();
          if (s4 !== peg$FAILED) {
            s5 = peg$parseRhythm();
            if (s5 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c3(s1, s5);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseExpr() {
    var s0;

    s0 = peg$parseRhythm();
    if (s0 === peg$FAILED) {
      s0 = peg$parsePrimitive();
    }

    return s0;
  }

  function peg$parseExprList() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$parseExpr();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$parse__();
      if (s4 !== peg$FAILED) {
        s5 = peg$parseExpr();
        if (s5 !== peg$FAILED) {
          s4 = [s4, s5];
          s3 = s4;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$parse__();
        if (s4 !== peg$FAILED) {
          s5 = peg$parseExpr();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c4(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseRhythm() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$parseRhythmLiteral();
    if (s0 === peg$FAILED) {
      s0 = peg$parseFunctionCall();
      if (s0 === peg$FAILED) {
        s0 = peg$parseVariableRef();
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 40) {
            s1 = peg$c5;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c6); }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
              s3 = peg$parseRhythm();
              if (s3 !== peg$FAILED) {
                s4 = peg$parse_();
                if (s4 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s5 = peg$c7;
                    peg$currPos++;
                  } else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c8); }
                  }
                  if (s5 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c9(s3);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        }
      }
    }

    return s0;
  }

  function peg$parseVariableRef() {
    var s0, s1;

    s0 = peg$currPos;
    s1 = peg$parseIdentifier();
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c10(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseFunctionCall() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parseIdentifier();
    if (s1 !== peg$FAILED) {
      s2 = peg$parse__();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseExprList();
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c11(s1, s3);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseAll() {
    var s0;

    if (input.substr(peg$currPos, 3) === peg$c12) {
      s0 = peg$c12;
      peg$currPos += 3;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c13); }
    }
    if (s0 === peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 97) {
        s0 = peg$c14;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c15); }
      }
    }

    return s0;
  }

  function peg$parseEmpty() {
    var s0;

    if (input.substr(peg$currPos, 5) === peg$c16) {
      s0 = peg$c16;
      peg$currPos += 5;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c17); }
    }
    if (s0 === peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 101) {
        s0 = peg$c18;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c19); }
      }
    }

    return s0;
  }

  function peg$parseInvert() {
    var s0;

    if (input.substr(peg$currPos, 6) === peg$c20) {
      s0 = peg$c20;
      peg$currPos += 6;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c21); }
    }
    if (s0 === peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 105) {
        s0 = peg$c22;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c23); }
      }
    }

    return s0;
  }

  function peg$parseReverse() {
    var s0;

    if (input.substr(peg$currPos, 7) === peg$c24) {
      s0 = peg$c24;
      peg$currPos += 7;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c25); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 2) === peg$c26) {
        s0 = peg$c26;
        peg$currPos += 2;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c27); }
      }
    }

    return s0;
  }

  function peg$parseFixedLength() {
    var s0;

    if (input.substr(peg$currPos, 11) === peg$c28) {
      s0 = peg$c28;
      peg$currPos += 11;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c29); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 2) === peg$c30) {
        s0 = peg$c30;
        peg$currPos += 2;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c31); }
      }
    }

    return s0;
  }

  function peg$parseRepeat() {
    var s0;

    if (input.substr(peg$currPos, 6) === peg$c32) {
      s0 = peg$c32;
      peg$currPos += 6;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c33); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 3) === peg$c34) {
        s0 = peg$c34;
        peg$currPos += 3;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c35); }
      }
      if (s0 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 114) {
          s0 = peg$c36;
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c37); }
        }
      }
    }

    return s0;
  }

  function peg$parseRightShift() {
    var s0;

    if (input.substr(peg$currPos, 2) === peg$c38) {
      s0 = peg$c38;
      peg$currPos += 2;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c39); }
    }

    return s0;
  }

  function peg$parseLeftShift() {
    var s0;

    if (input.substr(peg$currPos, 2) === peg$c40) {
      s0 = peg$c40;
      peg$currPos += 2;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c41); }
    }

    return s0;
  }

  function peg$parseAnd() {
    var s0;

    if (input.substr(peg$currPos, 3) === peg$c42) {
      s0 = peg$c42;
      peg$currPos += 3;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c43); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 4) === peg$c44) {
        s0 = peg$c44;
        peg$currPos += 4;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c45); }
      }
      if (s0 === peg$FAILED) {
        if (input.substr(peg$currPos, 7) === peg$c46) {
          s0 = peg$c46;
          peg$currPos += 7;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c47); }
        }
      }
    }

    return s0;
  }

  function peg$parseOr() {
    var s0;

    if (input.substr(peg$currPos, 2) === peg$c48) {
      s0 = peg$c48;
      peg$currPos += 2;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c49); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 6) === peg$c50) {
        s0 = peg$c50;
        peg$currPos += 6;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c51); }
      }
      if (s0 === peg$FAILED) {
        if (input.substr(peg$currPos, 5) === peg$c52) {
          s0 = peg$c52;
          peg$currPos += 5;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c53); }
        }
      }
    }

    return s0;
  }

  function peg$parseXor() {
    var s0;

    if (input.substr(peg$currPos, 4) === peg$c54) {
      s0 = peg$c54;
      peg$currPos += 4;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c55); }
    }

    return s0;
  }

  function peg$parseNORINTERVAL() {
    var s0;

    s0 = peg$parseInterval();
    if (s0 === peg$FAILED) {
      s0 = peg$parseInteger();
    }

    return s0;
  }

  function peg$parseRhythmLiteral() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    if (peg$c56.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c57); }
    }
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        if (peg$c56.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c57); }
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c58(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parsePrimitive() {
    var s0;

    s0 = peg$parseInterval();
    if (s0 === peg$FAILED) {
      s0 = peg$parseUnit();
      if (s0 === peg$FAILED) {
        s0 = peg$parseInteger();
      }
    }

    return s0;
  }

  function peg$parseInterval() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = peg$parseInteger();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseUnit();
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c59(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseUnit() {
    var s0, s1;

    s0 = peg$currPos;
    if (peg$c60.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c61); }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c62();
    }
    s0 = s1;

    return s0;
  }

  function peg$parseIdentifier() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    if (peg$c63.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c64); }
    }
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        if (peg$c63.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c64); }
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c65();
    }
    s0 = s1;

    return s0;
  }

  function peg$parseInteger() {
    var s0, s1, s2;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = [];
    if (peg$c67.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c68); }
    }
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        if (peg$c67.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c68); }
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c69();
    }
    s0 = s1;
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c66); }
    }

    return s0;
  }

  function peg$parse_() {
    var s0, s1;

    peg$silentFails++;
    s0 = [];
    if (peg$c71.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c72); }
    }
    while (s1 !== peg$FAILED) {
      s0.push(s1);
      if (peg$c71.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c72); }
      }
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c70); }
    }

    return s0;
  }

  function peg$parse__() {
    var s0, s1;

    peg$silentFails++;
    s0 = [];
    if (peg$c71.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c72); }
    }
    if (s1 !== peg$FAILED) {
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        if (peg$c71.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c72); }
        }
      }
    } else {
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c73); }
    }

    return s0;
  }


      const env = {};
      const NBEATS_PER_MEASURE = 16;

      function shorterLonger(arr1, arr2) {
          return arr1.length <= arr2.length ?
              [arr1, arr2] :
              [arr2, arr1];
      }

      const builtins = {

          all: {
              name: 'all',
              aliases: [],
              fn: (n) => {
                  return new Array(n).fill(true);
              }
          },

          empty: {
              name: 'empty',
              aliases: [],
              fn: (n) => {
                  return new Array(n).fill(false);
              }
          },

          invert: {
              name: 'invert',
              aliases: [],
              fn: (rtm) => {
                  return rtm.map(beat => !beat);
              }
          },

          reverse: {
              name: 'reverse',
              aliases: [],
              fn: (rtm) => {
                  return rtm.reverse();
              }
          },

          repeat: {
              name: 'repeat',
              aliases: [],
              fn: (n, rtm) => {
                  return new Array(n).fill(rtm).flat();
              }
          },

          rightshift: {
              name: 'rightshift',
              aliases: [],
              fn: (n, rtm) => {
                  for (let i = 0; i < n; i++) {
                      rtm.unshift(rtm.pop());
                  }
                  return rtm;
              }
          },

          leftshift: {
              name: 'leftshift',
              aliases: [],
              fn: (n, rtm) => {
                  for (let i = 0; i < n; i++) {
                      rtm.push(rtm.shift());
                  }
                  return rtm;
              }
          },

          fixedlength: {
              name: 'fixedlength',
              aliases: [],
              fn: (n, rtm) => {
                  if (n > rtm.length) {
                      return rtm.concat(new Array(n - rtm.length).fill(false));
                  } else {
                      return rtm.slice(n);
                  }
              }
          },

          bwand: {
              name: 'bwand',
              aliases: ['and'],
              fn: (r1, r2) => {
                  const [shorter, longer] = shorterLonger(r1, r2);

                  const andRtm = longer;
                  shorter.forEach((b, index) => {
                      andRtm[index] = andRtm[index] && b;
                  });

                  return andRtm;
              }
          },

          bwor: {
              name: 'bwor',
              aliases: ['or'],
              fn: (r1, r2) => {
                  const [shorter, longer] = shorterLonger(r1, r2);

                  const orRtm = longer;
                  shorter.forEach((b, index) => {
                      orRtm[index] = orRtm[index] || b;
                  });

                  return orRtm;
              }
          },

          bwxor: {
              name: 'bwxor',
              aliases: ['xor'],
              fn: (r1, r2) => {
                  const [shorter, longer] = shorterLonger(r1, r2);

                  const xorRtm = longer;
                  shorter.forEach((b, index) => {
                      xorRtm[index] = (xorRtm[index] || b) && !(xorRtm[index] && b);
                  });

                  return xorRtm;
              }
          },


          /*

          / "cat" __ head:Rhythm tail:(__ Rhythm)* {
              return [head].concat(
                  tail.map(([_, rtm]) => rtm).flat()
              );
          }
          */
      };


  peg$result = peg$startRuleFunction();

  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
    return peg$result;
  } else {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$fail(peg$endExpectation());
    }

    throw peg$buildStructuredError(
      peg$maxFailExpected,
      peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
      peg$maxFailPos < input.length
        ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
        : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
    );
  }
}

module.exports = {
  SyntaxError: peg$SyntaxError,
  parse:       peg$parse
};
