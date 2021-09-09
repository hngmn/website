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
              return rtm;
          },
      peg$c1 = "=",
      peg$c2 = peg$literalExpectation("=", false),
      peg$c3 = function(id, rtm) {
              if (id in env) {
                  error(`Variable "${id} already defined."`);
              }

              env[id] = rtm;
          },
      peg$c4 = function(id) {
              if (!(id in env)) {
                  error(`Variable "${id}" undefined.`);
              }

              return env[id];
          },
      peg$c5 = "cat",
      peg$c6 = peg$literalExpectation("cat", false),
      peg$c7 = function(head, tail) {
              return head.concat(
                  tail.map(([_, rtm]) => rtm).flat()
              );
          },
      peg$c8 = function(n) {
              return new Array(n).fill(true);
          },
      peg$c9 = function(n) {
              return new Array(n).fill(false);
          },
      peg$c10 = function(rtm) {
              return rtm.map(beat => !beat);
          },
      peg$c11 = function(n, rtm) {
              if (n > rtm.length) {
                  return rtm.concat(new Array(n - rtm.length).fill(false));
              } else {
                  return rtm.slice(n);
              }
          },
      peg$c12 = function(n, rtm) {
              return new Array(n).fill(rtm).flat();
          },
      peg$c13 = function(n, rtm) {
              for (let i = 0; i < n; i++) {
                  rtm.unshift(rtm.pop());
              }
              return rtm;
          },
      peg$c14 = function(n, rtm) {
              for (let i = 0; i < n; i++) {
                  rtm.push(rtm.shift());
              }
              return rtm;
          },
      peg$c15 = function(r1, r2) {
              const [shorter, longer] = shorterLonger(r1, r2);

              const andRtm = longer;
              shorter.forEach((b, index) => {
                  andRtm[index] = andRtm[index] && b;
              });

              return andRtm;
          },
      peg$c16 = function(r1, r2) {
              const [shorter, longer] = shorterLonger(r1, r2);

              const orRtm = longer;
              shorter.forEach((b, index) => {
                  orRtm[index] = orRtm[index] || b;
              });

              return orRtm;
          },
      peg$c17 = function(r1, r2) {
              const [shorter, longer] = shorterLonger(r1, r2);

              const xorRtm = longer;
              shorter.forEach((b, index) => {
                  xorRtm[index] = (xorRtm[index] || b) && !(xorRtm[index] && b);
              });

              return xorRtm;
          },
      peg$c18 = "all",
      peg$c19 = peg$literalExpectation("all", false),
      peg$c20 = "a",
      peg$c21 = peg$literalExpectation("a", false),
      peg$c22 = "empty",
      peg$c23 = peg$literalExpectation("empty", false),
      peg$c24 = "e",
      peg$c25 = peg$literalExpectation("e", false),
      peg$c26 = "invert",
      peg$c27 = peg$literalExpectation("invert", false),
      peg$c28 = "i",
      peg$c29 = peg$literalExpectation("i", false),
      peg$c30 = "fixedlength",
      peg$c31 = peg$literalExpectation("fixedlength", false),
      peg$c32 = "fl",
      peg$c33 = peg$literalExpectation("fl", false),
      peg$c34 = "repeat",
      peg$c35 = peg$literalExpectation("repeat", false),
      peg$c36 = "rpt",
      peg$c37 = peg$literalExpectation("rpt", false),
      peg$c38 = "r",
      peg$c39 = peg$literalExpectation("r", false),
      peg$c40 = "rs",
      peg$c41 = peg$literalExpectation("rs", false),
      peg$c42 = "ls",
      peg$c43 = peg$literalExpectation("ls", false),
      peg$c44 = "and",
      peg$c45 = peg$literalExpectation("and", false),
      peg$c46 = "both",
      peg$c47 = peg$literalExpectation("both", false),
      peg$c48 = "overlap",
      peg$c49 = peg$literalExpectation("overlap", false),
      peg$c50 = "or",
      peg$c51 = peg$literalExpectation("or", false),
      peg$c52 = "either",
      peg$c53 = peg$literalExpectation("either", false),
      peg$c54 = "merge",
      peg$c55 = peg$literalExpectation("merge", false),
      peg$c56 = "exor",
      peg$c57 = peg$literalExpectation("exor", false),
      peg$c58 = /^[\-.]/,
      peg$c59 = peg$classExpectation(["-", "."], false, false),
      peg$c60 = function(beats) {
              return beats
                  // .filter(c => c != ' ')
                  .map(beat => beat === '-' ? true : false);
          },
      peg$c61 = function(n, unit) {
              const unitMap = {
                  m: NBEATS_PER_MEASURE,
                  h: NBEATS_PER_MEASURE / 2,
                  q: NBEATS_PER_MEASURE / 4,
                  e: NBEATS_PER_MEASURE / 8,
                  s: NBEATS_PER_MEASURE / 16
              }

              return n * unitMap[unit];
          },
      peg$c62 = /^[mhqes]/,
      peg$c63 = peg$classExpectation(["m", "h", "q", "e", "s"], false, false),
      peg$c64 = /^[a-z]/,
      peg$c65 = peg$classExpectation([["a", "z"]], false, false),
      peg$c66 = function(id) { return text(); },
      peg$c67 = peg$otherExpectation("integer"),
      peg$c68 = /^[0-9]/,
      peg$c69 = peg$classExpectation([["0", "9"]], false, false),
      peg$c70 = function() { return parseInt(text(), 10); },
      peg$c71 = peg$otherExpectation("whitespaceoptional"),
      peg$c72 = /^[ \t\n\r]/,
      peg$c73 = peg$classExpectation([" ", "\t", "\n", "\r"], false, false),
      peg$c74 = peg$otherExpectation("whitespacerequired"),

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

  function peg$parseRhythm() {
    var s0, s1;

    s0 = peg$parseRhythmLiteral();
    if (s0 === peg$FAILED) {
      s0 = peg$parseFunction();
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parseIdentifier();
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c4(s1);
        }
        s0 = s1;
      }
    }

    return s0;
  }

  function peg$parseFunction() {
    var s0, s1, s2, s3, s4, s5, s6, s7;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 3) === peg$c5) {
      s1 = peg$c5;
      peg$currPos += 3;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c6); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parse__();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseRhythm();
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$currPos;
          s6 = peg$parse__();
          if (s6 !== peg$FAILED) {
            s7 = peg$parseRhythm();
            if (s7 !== peg$FAILED) {
              s6 = [s6, s7];
              s5 = s6;
            } else {
              peg$currPos = s5;
              s5 = peg$FAILED;
            }
          } else {
            peg$currPos = s5;
            s5 = peg$FAILED;
          }
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$currPos;
            s6 = peg$parse__();
            if (s6 !== peg$FAILED) {
              s7 = peg$parseRhythm();
              if (s7 !== peg$FAILED) {
                s6 = [s6, s7];
                s5 = s6;
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
            } else {
              peg$currPos = s5;
              s5 = peg$FAILED;
            }
          }
          if (s4 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c7(s3, s4);
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
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = peg$parseAll();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseNORINTERVAL();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c8(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parseEmpty();
        if (s1 !== peg$FAILED) {
          s2 = peg$parseNORINTERVAL();
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c9(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parseInvert();
          if (s1 !== peg$FAILED) {
            s2 = peg$parse__();
            if (s2 !== peg$FAILED) {
              s3 = peg$parseRhythm();
              if (s3 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c10(s3);
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
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parseFixedLength();
            if (s1 !== peg$FAILED) {
              s2 = peg$parseNORINTERVAL();
              if (s2 !== peg$FAILED) {
                s3 = peg$parse__();
                if (s3 !== peg$FAILED) {
                  s4 = peg$parseRhythm();
                  if (s4 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c11(s2, s4);
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
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              s1 = peg$parseRepeat();
              if (s1 !== peg$FAILED) {
                s2 = peg$parseInteger();
                if (s2 !== peg$FAILED) {
                  s3 = peg$parse__();
                  if (s3 !== peg$FAILED) {
                    s4 = peg$parseRhythm();
                    if (s4 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c12(s2, s4);
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
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                s1 = peg$parseRightShift();
                if (s1 !== peg$FAILED) {
                  s2 = peg$parseNORINTERVAL();
                  if (s2 !== peg$FAILED) {
                    s3 = peg$parse__();
                    if (s3 !== peg$FAILED) {
                      s4 = peg$parseRhythm();
                      if (s4 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c13(s2, s4);
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
                if (s0 === peg$FAILED) {
                  s0 = peg$currPos;
                  s1 = peg$parseLeftShift();
                  if (s1 !== peg$FAILED) {
                    s2 = peg$parseNORINTERVAL();
                    if (s2 !== peg$FAILED) {
                      s3 = peg$parse__();
                      if (s3 !== peg$FAILED) {
                        s4 = peg$parseRhythm();
                        if (s4 !== peg$FAILED) {
                          peg$savedPos = s0;
                          s1 = peg$c14(s2, s4);
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
                  if (s0 === peg$FAILED) {
                    s0 = peg$currPos;
                    s1 = peg$parseAnd();
                    if (s1 !== peg$FAILED) {
                      s2 = peg$parse__();
                      if (s2 !== peg$FAILED) {
                        s3 = peg$parseRhythm();
                        if (s3 !== peg$FAILED) {
                          s4 = peg$parse__();
                          if (s4 !== peg$FAILED) {
                            s5 = peg$parseRhythm();
                            if (s5 !== peg$FAILED) {
                              peg$savedPos = s0;
                              s1 = peg$c15(s3, s5);
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
                    if (s0 === peg$FAILED) {
                      s0 = peg$currPos;
                      s1 = peg$parseOr();
                      if (s1 !== peg$FAILED) {
                        s2 = peg$parse__();
                        if (s2 !== peg$FAILED) {
                          s3 = peg$parseRhythm();
                          if (s3 !== peg$FAILED) {
                            s4 = peg$parse__();
                            if (s4 !== peg$FAILED) {
                              s5 = peg$parseRhythm();
                              if (s5 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c16(s3, s5);
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
                      if (s0 === peg$FAILED) {
                        s0 = peg$currPos;
                        s1 = peg$parseXor();
                        if (s1 !== peg$FAILED) {
                          s2 = peg$parse__();
                          if (s2 !== peg$FAILED) {
                            s3 = peg$parseRhythm();
                            if (s3 !== peg$FAILED) {
                              s4 = peg$parse__();
                              if (s4 !== peg$FAILED) {
                                s5 = peg$parseRhythm();
                                if (s5 !== peg$FAILED) {
                                  peg$savedPos = s0;
                                  s1 = peg$c17(s3, s5);
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
                }
              }
            }
          }
        }
      }
    }

    return s0;
  }

  function peg$parseAll() {
    var s0;

    if (input.substr(peg$currPos, 3) === peg$c18) {
      s0 = peg$c18;
      peg$currPos += 3;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c19); }
    }
    if (s0 === peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 97) {
        s0 = peg$c20;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c21); }
      }
    }

    return s0;
  }

  function peg$parseEmpty() {
    var s0;

    if (input.substr(peg$currPos, 5) === peg$c22) {
      s0 = peg$c22;
      peg$currPos += 5;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c23); }
    }
    if (s0 === peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 101) {
        s0 = peg$c24;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c25); }
      }
    }

    return s0;
  }

  function peg$parseInvert() {
    var s0;

    if (input.substr(peg$currPos, 6) === peg$c26) {
      s0 = peg$c26;
      peg$currPos += 6;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c27); }
    }
    if (s0 === peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 105) {
        s0 = peg$c28;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c29); }
      }
    }

    return s0;
  }

  function peg$parseFixedLength() {
    var s0;

    if (input.substr(peg$currPos, 11) === peg$c30) {
      s0 = peg$c30;
      peg$currPos += 11;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c31); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 2) === peg$c32) {
        s0 = peg$c32;
        peg$currPos += 2;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c33); }
      }
    }

    return s0;
  }

  function peg$parseRepeat() {
    var s0;

    if (input.substr(peg$currPos, 6) === peg$c34) {
      s0 = peg$c34;
      peg$currPos += 6;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c35); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 3) === peg$c36) {
        s0 = peg$c36;
        peg$currPos += 3;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c37); }
      }
      if (s0 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 114) {
          s0 = peg$c38;
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c39); }
        }
      }
    }

    return s0;
  }

  function peg$parseRightShift() {
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

  function peg$parseLeftShift() {
    var s0;

    if (input.substr(peg$currPos, 2) === peg$c42) {
      s0 = peg$c42;
      peg$currPos += 2;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c43); }
    }

    return s0;
  }

  function peg$parseAnd() {
    var s0;

    if (input.substr(peg$currPos, 3) === peg$c44) {
      s0 = peg$c44;
      peg$currPos += 3;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c45); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 4) === peg$c46) {
        s0 = peg$c46;
        peg$currPos += 4;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c47); }
      }
      if (s0 === peg$FAILED) {
        if (input.substr(peg$currPos, 7) === peg$c48) {
          s0 = peg$c48;
          peg$currPos += 7;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c49); }
        }
      }
    }

    return s0;
  }

  function peg$parseOr() {
    var s0;

    if (input.substr(peg$currPos, 2) === peg$c50) {
      s0 = peg$c50;
      peg$currPos += 2;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c51); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 6) === peg$c52) {
        s0 = peg$c52;
        peg$currPos += 6;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c53); }
      }
      if (s0 === peg$FAILED) {
        if (input.substr(peg$currPos, 5) === peg$c54) {
          s0 = peg$c54;
          peg$currPos += 5;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c55); }
        }
      }
    }

    return s0;
  }

  function peg$parseXor() {
    var s0;

    if (input.substr(peg$currPos, 4) === peg$c56) {
      s0 = peg$c56;
      peg$currPos += 4;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c57); }
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
    if (peg$c58.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c59); }
    }
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        if (peg$c58.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c59); }
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c60(s1);
    }
    s0 = s1;

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
        s1 = peg$c61(s1, s2);
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
    var s0;

    if (peg$c62.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c63); }
    }

    return s0;
  }

  function peg$parseIdentifier() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    if (peg$c64.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c65); }
    }
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        if (peg$c64.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c65); }
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c66(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseInteger() {
    var s0, s1, s2;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = [];
    if (peg$c68.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c69); }
    }
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        if (peg$c68.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c69); }
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c70();
    }
    s0 = s1;
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c67); }
    }

    return s0;
  }

  function peg$parse_() {
    var s0, s1;

    peg$silentFails++;
    s0 = [];
    if (peg$c72.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c73); }
    }
    while (s1 !== peg$FAILED) {
      s0.push(s1);
      if (peg$c72.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c73); }
      }
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c71); }
    }

    return s0;
  }

  function peg$parse__() {
    var s0, s1;

    peg$silentFails++;
    s0 = [];
    if (peg$c72.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c73); }
    }
    if (s1 !== peg$FAILED) {
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        if (peg$c72.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c73); }
        }
      }
    } else {
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c74); }
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
