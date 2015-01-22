"use strict";

var _inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) subClass.__proto__ = superClass;
};

var _prototypeProperties = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var _get = function get(object, property, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    return desc.value;
  } else {
    var getter = desc.get;
    if (getter === undefined) {
      return undefined;
    }
    return getter.call(receiver);
  }
};

module("JSHint - .");
test("bootstrap.js should pass jshint", function () {
  ok(true, "bootstrap.js should pass jshint.");
});

module("JSHint - .");
test("compiler.js should pass jshint", function () {
  ok(true, "compiler.js should pass jshint.");
});

module("JSHint - .");
test("emblem.js should pass jshint", function () {
  ok(true, "emblem.js should pass jshint.");
});

module("JSHint - .");
test("emblem.umd.js should pass jshint", function () {
  ok(true, "emblem.umd.js should pass jshint.");
});

module("JSHint - parser-delegate");
test("parser-delegate/base.js should pass jshint", function () {
  ok(true, "parser-delegate/base.js should pass jshint.");
});

module("JSHint - parser-delegate");
test("parser-delegate/ember.js should pass jshint", function () {
  ok(true, "parser-delegate/ember.js should pass jshint.");
});

module("JSHint - .");
test("parser.js should pass jshint", function () {
  ok(true, "parser.js should pass jshint.");
});

module("JSHint - .");
test("preprocessor.js should pass jshint", function () {
  ok(true, "preprocessor.js should pass jshint.");
});

module("JSHint - tests");
test("tests/ast-test.js should pass jshint", function () {
  ok(false, "tests/ast-test.js should pass jshint.\ntests/ast-test.js: line 11, col 13, 'parse' is not defined.\n\n1 error");
});

(function () {
  "use strict";
  var $$compiler$$throwCompileError = function (line, msg) {
    throw new Error("Emblem syntax error, line " + line + ": " + msg);
  };

  var $$compiler$$registerPartial = function (handlebarsVariant, partialName, text) {
    if (!text) {
      text = partialName;
      partialName = handlebarsVariant;
      handlebarsVariant = window.Handlebars;
    }
    return handlebarsVariant.registerPartial(partialName, $$compiler$$compile(handlebarsVariant, text));
  };

  var $$compiler$$parse = function (string, handlebarsVariant) {
    var e, line, lines, msg;

    try {
      var AST = {};
      var astDelegate = new $$parser$delegate$ember$$default(AST, $$compiler$$parse);
      var processed = emblem$$default.Preprocessor.processSync(string);
      return $$parser$$parse(processed, {
        astDelegate: astDelegate
      });
    } catch (_error) {
      e = _error;
      if (e instanceof emblem$$default.Parser.SyntaxError) {
        lines = string.split("\n");
        line = lines[e.line - 1];
        msg = "" + e.message + "\n" + line + "\n";
        msg += new Array(e.column).join("-");
        msg += "^";
        return emblem$$default.throwCompileError(e.line, msg);
      } else {
        throw e;
      }
    }
  };

  var $$compiler$$precompile = function (handlebarsVariant, string, options) {
    var ast;
    if (options == null) {
      options = {};
    }
    emblem$$default.handlebarsVariant = handlebarsVariant;
    ast = emblem$$default.parse(string);
    return handlebarsVariant.precompile(ast, false);
  };

  var $$compiler$$compile = function (handlebarsVariant, string, options) {
    var ast;
    if (options == null) {
      options = {};
    }
    emblem$$default.handlebarsVariant = handlebarsVariant;
    ast = emblem$$default.parse(string);
    return handlebarsVariant.compile(ast, options);
  };

  var $$bootstrap$$compileScriptTags = function (scope) {
    var Handlebars = scope.Handlebars;
    var Ember = scope.Ember;

    if (typeof Ember === "undefined" || Ember === null) {
      throw new Error("Can't run Emblem.enableEmber before Ember has been defined");
    }
    if (typeof document !== "undefined" && document !== null) {
      return Ember.$("script[type=\"text/x-emblem\"], script[type=\"text/x-raw-emblem\"]", Ember.$(document)).each(function () {
        var handlebarsVariant, script, templateName;
        script = Ember.$(this);
        handlebarsVariant = script.attr("type") === "text/x-raw-handlebars" ? Handlebars : Ember.Handlebars;
        templateName = script.attr("data-template-name") || script.attr("id") || "application";
        Ember.TEMPLATES[templateName] = $$compiler$$compile(handlebarsVariant, script.html());
        return script.remove();
      });
    }
  };

  /*jshint newcap: false, laxbreak: true */
  var $$parser$$Parser = (function () {
    /*
     * Generated by PEG.js 0.8.0.
     *
     * http://pegjs.majda.cz/
     */

    var peg$subclass = function (child, parent) {
      var ctor = function () {
        this.constructor = child;
      };

      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
    };

    var SyntaxError = function (message, expected, found, offset, line, column) {
      this.message = message;
      this.expected = expected;
      this.found = found;
      this.offset = offset;
      this.line = line;
      this.column = column;

      this.name = "SyntaxError";
    };

    var parse = function (input) {
      var text = function () {
        return input.substring(peg$reportedPos, peg$currPos);
      };

      var offset = function () {
        return peg$reportedPos;
      };

      var line = function () {
        return peg$computePosDetails(peg$reportedPos).line;
      };

      var column = function () {
        return peg$computePosDetails(peg$reportedPos).column;
      };

      var expected = function (description) {
        throw peg$buildException(null, [{ type: "other", description: description }], peg$reportedPos);
      };

      var error = function (message) {
        throw peg$buildException(message, null, peg$reportedPos);
      };

      var peg$computePosDetails = function (pos) {
        var advance = function (details, startPos, endPos) {
          var p, ch;

          for (p = startPos; p < endPos; p++) {
            ch = input.charAt(p);
            if (ch === "\n") {
              if (!details.seenCR) {
                details.line++;
              }
              details.column = 1;
              details.seenCR = false;
            } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
              details.line++;
              details.column = 1;
              details.seenCR = true;
            } else {
              details.column++;
              details.seenCR = false;
            }
          }
        };

        if (peg$cachedPos !== pos) {
          if (peg$cachedPos > pos) {
            peg$cachedPos = 0;
            peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };
          }
          advance(peg$cachedPosDetails, peg$cachedPos, pos);
          peg$cachedPos = pos;
        }

        return peg$cachedPosDetails;
      };

      var peg$fail = function (expected) {
        if (peg$currPos < peg$maxFailPos) {
          return;
        }

        if (peg$currPos > peg$maxFailPos) {
          peg$maxFailPos = peg$currPos;
          peg$maxFailExpected = [];
        }

        peg$maxFailExpected.push(expected);
      };

      var peg$buildException = function (message, expected, pos) {
        var cleanupExpected = function (expected) {
          var i = 1;

          expected.sort(function (a, b) {
            if (a.description < b.description) {
              return -1;
            } else if (a.description > b.description) {
              return 1;
            } else {
              return 0;
            }
          });

          while (i < expected.length) {
            if (expected[i - 1] === expected[i]) {
              expected.splice(i, 1);
            } else {
              i++;
            }
          }
        };

        var buildMessage = function (expected, found) {
          var stringEscape = function (s) {
            var hex = function (ch) {
              return ch.charCodeAt(0).toString(16).toUpperCase();
            };

            return s.replace(/\\/g, "\\\\").replace(/"/g, "\\\"").replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E\x0F]/g, function (ch) {
              return "\\x0" + hex(ch);
            }).replace(/[\x10-\x1F\x80-\xFF]/g, function (ch) {
              return "\\x" + hex(ch);
            }).replace(/[\u0180-\u0FFF]/g, function (ch) {
              return "\\u0" + hex(ch);
            }).replace(/[\u1080-\uFFFF]/g, function (ch) {
              return "\\u" + hex(ch);
            });
          };

          var expectedDescs = new Array(expected.length), expectedDesc, foundDesc, i;

          for (i = 0; i < expected.length; i++) {
            expectedDescs[i] = expected[i].description;
          }

          expectedDesc = expected.length > 1 ? expectedDescs.slice(0, -1).join(", ") + " or " + expectedDescs[expected.length - 1] : expectedDescs[0];

          foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

          return "Expected " + expectedDesc + " but " + foundDesc + " found.";
        };

        var posDetails = peg$computePosDetails(pos),
            found = pos < input.length ? input.charAt(pos) : null;

        if (expected !== null) {
          cleanupExpected(expected);
        }

        return new SyntaxError(message !== null ? message : buildMessage(expected, found), expected, found, pos, posDetails.line, posDetails.column);
      };

      var peg$parsestart = function () {
        var s0;

        s0 = peg$parseinvertibleContent();

        return s0;
      };

      var peg$parseinvertibleContent = function () {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

        s0 = peg$currPos;
        s1 = peg$parsecontent();
        if (s1 !== peg$FAILED) {
          s2 = peg$currPos;
          s3 = peg$parseDEDENT();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseelse();
            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();
              if (s5 !== peg$FAILED) {
                s6 = peg$parseTERM();
                if (s6 !== peg$FAILED) {
                  s7 = [];
                  s8 = peg$parseblankLine();
                  while (s8 !== peg$FAILED) {
                    s7.push(s8);
                    s8 = peg$parseblankLine();
                  }
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parseindentation();
                    if (s8 !== peg$FAILED) {
                      s9 = peg$parsecontent();
                      if (s9 !== peg$FAILED) {
                        peg$reportedPos = s2;
                        s3 = peg$c3(s9);
                        s2 = s3;
                      } else {
                        peg$currPos = s2;
                        s2 = peg$c0;
                      }
                    } else {
                      peg$currPos = s2;
                      s2 = peg$c0;
                    }
                  } else {
                    peg$currPos = s2;
                    s2 = peg$c0;
                  }
                } else {
                  peg$currPos = s2;
                  s2 = peg$c0;
                }
              } else {
                peg$currPos = s2;
                s2 = peg$c0;
              }
            } else {
              peg$currPos = s2;
              s2 = peg$c0;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$c0;
          }
          if (s2 === peg$FAILED) {
            s2 = peg$c1;
          }
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c4(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parseelse = function () {
        var s0, s1, s2, s3;

        s0 = peg$currPos;
        s1 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 61) {
          s2 = peg$c5;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c6);
          }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            s2 = [s2, s3];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$c0;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
        if (s1 === peg$FAILED) {
          s1 = peg$c1;
        }
        if (s1 !== peg$FAILED) {
          if (input.substr(peg$currPos, 4) === peg$c7) {
            s2 = peg$c7;
            peg$currPos += 4;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c8);
            }
          }
          if (s2 !== peg$FAILED) {
            s1 = [s1, s2];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parsecontent = function () {
        var s0, s1, s2;

        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parsestatement();
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parsestatement();
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c9(s1);
        }
        s0 = s1;

        return s0;
      };

      var peg$parsestatement = function () {
        var s0, s1;

        peg$silentFails++;
        s0 = peg$parseblankLine();
        if (s0 === peg$FAILED) {
          s0 = peg$parsecomment();
          if (s0 === peg$FAILED) {
            s0 = peg$parsecontentStatement();
          }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c10);
          }
        }

        return s0;
      };

      var peg$parsecontentStatement = function () {
        var s0, s1;

        peg$silentFails++;
        s0 = peg$parselegacyPartialInvocation();
        if (s0 === peg$FAILED) {
          s0 = peg$parsehtmlElement();
          if (s0 === peg$FAILED) {
            s0 = peg$parsetextLine();
            if (s0 === peg$FAILED) {
              s0 = peg$parsemustache();
            }
          }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c11);
          }
        }

        return s0;
      };

      var peg$parseblankLine = function () {
        var s0, s1, s2;

        s0 = peg$currPos;
        s1 = peg$parse_();
        if (s1 !== peg$FAILED) {
          s2 = peg$parseTERM();
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c12();
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parselegacyPartialInvocation = function () {
        var s0, s1, s2, s3, s4, s5, s6;

        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 62) {
          s1 = peg$c13;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c14);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            s3 = peg$parselegacyPartialName();
            if (s3 !== peg$FAILED) {
              s4 = [];
              s5 = peg$parseinMustacheParam();
              while (s5 !== peg$FAILED) {
                s4.push(s5);
                s5 = peg$parseinMustacheParam();
              }
              if (s4 !== peg$FAILED) {
                s5 = peg$parse_();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parseTERM();
                  if (s6 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c15(s3, s4);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parselegacyPartialName = function () {
        var s0, s1, s2, s3;

        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = [];
        if (peg$c16.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c17);
          }
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            if (peg$c16.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c17);
              }
            }
          }
        } else {
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s2 = input.substring(s1, peg$currPos);
        }
        s1 = s2;
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c18(s1);
        }
        s0 = s1;

        return s0;
      };

      var peg$parsemustache = function () {
        var s0, s1;

        s0 = peg$currPos;
        s1 = peg$parseexplicitMustache();
        if (s1 === peg$FAILED) {
          s1 = peg$parselineStartingMustache();
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c19(s1);
        }
        s0 = s1;

        return s0;
      };

      var peg$parsecommentContent = function () {
        var s0, s1, s2, s3, s4, s5, s6, s7;

        s0 = peg$currPos;
        s1 = peg$parselineContent();
        if (s1 !== peg$FAILED) {
          s2 = peg$parseTERM();
          if (s2 !== peg$FAILED) {
            s3 = [];
            s4 = peg$currPos;
            s5 = peg$parseindentation();
            if (s5 !== peg$FAILED) {
              s6 = [];
              s7 = peg$parsecommentContent();
              if (s7 !== peg$FAILED) {
                while (s7 !== peg$FAILED) {
                  s6.push(s7);
                  s7 = peg$parsecommentContent();
                }
              } else {
                s6 = peg$c0;
              }
              if (s6 !== peg$FAILED) {
                s7 = peg$parseanyDedent();
                if (s7 !== peg$FAILED) {
                  s5 = [s5, s6, s7];
                  s4 = s5;
                } else {
                  peg$currPos = s4;
                  s4 = peg$c0;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$c0;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$currPos;
              s5 = peg$parseindentation();
              if (s5 !== peg$FAILED) {
                s6 = [];
                s7 = peg$parsecommentContent();
                if (s7 !== peg$FAILED) {
                  while (s7 !== peg$FAILED) {
                    s6.push(s7);
                    s7 = peg$parsecommentContent();
                  }
                } else {
                  s6 = peg$c0;
                }
                if (s6 !== peg$FAILED) {
                  s7 = peg$parseanyDedent();
                  if (s7 !== peg$FAILED) {
                    s5 = [s5, s6, s7];
                    s4 = s5;
                  } else {
                    peg$currPos = s4;
                    s4 = peg$c0;
                  }
                } else {
                  peg$currPos = s4;
                  s4 = peg$c0;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$c0;
              }
            }
            if (s3 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c12();
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parsecomment = function () {
        var s0, s1, s2;

        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 47) {
          s1 = peg$c20;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c21);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parsecommentContent();
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c12();
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parseinlineComment = function () {
        var s0, s1, s2;

        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 47) {
          s1 = peg$c20;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c21);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parselineContent();
          if (s2 !== peg$FAILED) {
            s1 = [s1, s2];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parselineStartingMustache = function () {
        var s0;

        s0 = peg$parsecapitalizedLineStarterMustache();
        if (s0 === peg$FAILED) {
          s0 = peg$parsemustacheOrBlock();
        }

        return s0;
      };

      var peg$parsecapitalizedLineStarterMustache = function () {
        var s0, s1, s2;

        s0 = peg$currPos;
        s1 = peg$currPos;
        peg$silentFails++;
        if (peg$c23.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c24);
          }
        }
        peg$silentFails--;
        if (s2 !== peg$FAILED) {
          peg$currPos = s1;
          s1 = peg$c22;
        } else {
          s1 = peg$c0;
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parsemustacheOrBlock();
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c25(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parsehtmlNestedTextNodes = function () {
        var s0, s1, s2, s3, s4, s5, s6;

        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 32) {
          s1 = peg$c26;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c27);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parsetextNodes();
          if (s2 !== peg$FAILED) {
            s3 = peg$currPos;
            s4 = peg$parseindentation();
            if (s4 !== peg$FAILED) {
              s5 = [];
              s6 = peg$parsewhitespaceableTextNodes();
              if (s6 !== peg$FAILED) {
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$parsewhitespaceableTextNodes();
                }
              } else {
                s5 = peg$c0;
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parseDEDENT();
                if (s6 !== peg$FAILED) {
                  s4 = [s4, s5, s6];
                  s3 = s4;
                } else {
                  peg$currPos = s3;
                  s3 = peg$c0;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
            if (s3 === peg$FAILED) {
              s3 = peg$c1;
            }
            if (s3 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c28(s2, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parseindentedContent = function () {
        var s0, s1, s2, s3, s4;

        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parseblankLine();
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parseblankLine();
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parseindentation();
          if (s2 !== peg$FAILED) {
            s3 = peg$parsecontent();
            if (s3 !== peg$FAILED) {
              s4 = peg$parseDEDENT();
              if (s4 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c29(s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parseunindentedContent = function () {
        var s0, s1, s2, s3;

        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parseblankLine();
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parseblankLine();
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parsecontent();
          if (s2 !== peg$FAILED) {
            s3 = peg$parseDEDENT();
            if (s3 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c29(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parsehtmlTerminator = function () {
        var s0, s1, s2, s3, s4, s5;

        s0 = peg$parsecolonContent();
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parse_();
          if (s1 !== peg$FAILED) {
            s2 = peg$parseexplicitMustache();
            if (s2 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c30(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parse_();
            if (s1 !== peg$FAILED) {
              s2 = peg$parseinlineComment();
              if (s2 === peg$FAILED) {
                s2 = peg$c1;
              }
              if (s2 !== peg$FAILED) {
                s3 = peg$parseTERM();
                if (s3 !== peg$FAILED) {
                  s4 = peg$parseindentedContent();
                  if (s4 === peg$FAILED) {
                    s4 = peg$c1;
                  }
                  if (s4 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c29(s4);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              s1 = peg$parse_();
              if (s1 !== peg$FAILED) {
                s2 = peg$parseinlineComment();
                if (s2 === peg$FAILED) {
                  s2 = peg$c1;
                }
                if (s2 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 93) {
                    s3 = peg$c31;
                    peg$currPos++;
                  } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c32);
                    }
                  }
                  if (s3 !== peg$FAILED) {
                    s4 = peg$parseTERM();
                    if (s4 !== peg$FAILED) {
                      s5 = peg$parseunindentedContent();
                      if (s5 === peg$FAILED) {
                        s5 = peg$c1;
                      }
                      if (s5 !== peg$FAILED) {
                        peg$reportedPos = s0;
                        s1 = peg$c29(s5);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$c0;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c0;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                s1 = peg$parsehtmlNestedTextNodes();
                if (s1 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c33(s1);
                }
                s0 = s1;
              }
            }
          }
        }

        return s0;
      };

      var peg$parsehtmlElement = function () {
        var s0, s1, s2;

        s0 = peg$currPos;
        s1 = peg$parseinHtmlTag();
        if (s1 !== peg$FAILED) {
          s2 = peg$parsehtmlTerminator();
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c34(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parsemustacheOrBlock = function () {
        var s0, s1, s2, s3, s4;

        s0 = peg$currPos;
        s1 = peg$parseinMustache();
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            s3 = peg$parseinlineComment();
            if (s3 === peg$FAILED) {
              s3 = peg$c1;
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parsemustacheNestedContent();
              if (s4 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c35(s1, s4);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parsecolonContent = function () {
        var s0, s1, s2, s3;

        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c36) {
          s1 = peg$c36;
          peg$currPos += 2;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c37);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            s3 = peg$parsecontentStatement();
            if (s3 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c29(s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parsemustacheNestedContent = function () {
        var s0, s1, s2, s3, s4, s5, s6;

        s0 = peg$currPos;
        s1 = peg$parsecolonContent();
        if (s1 === peg$FAILED) {
          s1 = peg$parsetextLine();
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c38(s1);
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parse_();
          if (s1 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 93) {
              s2 = peg$c31;
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c32);
              }
            }
            if (s2 !== peg$FAILED) {
              s3 = peg$parseTERM();
              if (s3 !== peg$FAILED) {
                s4 = peg$parsecolonContent();
                if (s4 === peg$FAILED) {
                  s4 = peg$parsetextLine();
                }
                if (s4 !== peg$FAILED) {
                  s5 = peg$parseDEDENT();
                  if (s5 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c38(s4);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parseTERM();
            if (s1 !== peg$FAILED) {
              s2 = peg$currPos;
              s3 = [];
              s4 = peg$parseblankLine();
              while (s4 !== peg$FAILED) {
                s3.push(s4);
                s4 = peg$parseblankLine();
              }
              if (s3 !== peg$FAILED) {
                s4 = peg$parseindentation();
                if (s4 !== peg$FAILED) {
                  s5 = peg$parseinvertibleContent();
                  if (s5 !== peg$FAILED) {
                    s6 = peg$parseDEDENT();
                    if (s6 !== peg$FAILED) {
                      s3 = [s3, s4, s5, s6];
                      s2 = s3;
                    } else {
                      peg$currPos = s2;
                      s2 = peg$c0;
                    }
                  } else {
                    peg$currPos = s2;
                    s2 = peg$c0;
                  }
                } else {
                  peg$currPos = s2;
                  s2 = peg$c0;
                }
              } else {
                peg$currPos = s2;
                s2 = peg$c0;
              }
              if (s2 === peg$FAILED) {
                s2 = peg$c1;
              }
              if (s2 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c39(s2);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              s1 = peg$parse_();
              if (s1 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 93) {
                  s2 = peg$c31;
                  peg$currPos++;
                } else {
                  s2 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c32);
                  }
                }
                if (s2 !== peg$FAILED) {
                  s3 = peg$parseTERM();
                  if (s3 !== peg$FAILED) {
                    s4 = peg$parseinvertibleContent();
                    if (s4 !== peg$FAILED) {
                      s5 = peg$parseDEDENT();
                      if (s5 !== peg$FAILED) {
                        peg$reportedPos = s0;
                        s1 = peg$c40(s4);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$c0;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c0;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            }
          }
        }

        return s0;
      };

      var peg$parseexplicitMustache = function () {
        var s0, s1, s2;

        s0 = peg$currPos;
        s1 = peg$parseequalSign();
        if (s1 !== peg$FAILED) {
          s2 = peg$parsemustacheOrBlock();
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c41(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parseinMustache = function () {
        var s0, s1, s2, s3, s4, s5;

        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 62) {
          s1 = peg$c13;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c14);
          }
        }
        if (s1 === peg$FAILED) {
          s1 = peg$c1;
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$currPos;
          peg$silentFails++;
          s3 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 91) {
            s4 = peg$c42;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c43);
            }
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parseTERM();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
          peg$silentFails--;
          if (s3 === peg$FAILED) {
            s2 = peg$c22;
          } else {
            peg$currPos = s2;
            s2 = peg$c0;
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parse_();
            if (s3 !== peg$FAILED) {
              s4 = peg$parsesexpr();
              if (s4 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c44(s1, s4);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parsesexpr = function () {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

        s0 = peg$currPos;
        s1 = peg$parsepathIdNode();
        if (s1 !== peg$FAILED) {
          s2 = peg$currPos;
          peg$silentFails++;
          if (input.substr(peg$currPos, 2) === peg$c45) {
            s3 = peg$c45;
            peg$currPos += 2;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c46);
            }
          }
          peg$silentFails--;
          if (s3 === peg$FAILED) {
            s2 = peg$c22;
          } else {
            peg$currPos = s2;
            s2 = peg$c0;
          }
          if (s2 !== peg$FAILED) {
            s3 = [];
            s4 = peg$parseinMustacheParam();
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$parseinMustacheParam();
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parsehash();
              if (s4 === peg$FAILED) {
                s4 = peg$c1;
              }
              if (s4 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c47(s1, s3, s4);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parsepathIdNode();
          if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 91) {
                s3 = peg$c42;
                peg$currPos++;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c43);
                }
              }
              if (s3 !== peg$FAILED) {
                s4 = peg$parse_();
                if (s4 !== peg$FAILED) {
                  s5 = [];
                  s6 = peg$parseTERM();
                  while (s6 !== peg$FAILED) {
                    s5.push(s6);
                    s6 = peg$parseTERM();
                  }
                  if (s5 !== peg$FAILED) {
                    s6 = [];
                    s7 = peg$parseINDENT();
                    while (s7 !== peg$FAILED) {
                      s6.push(s7);
                      s7 = peg$parseINDENT();
                    }
                    if (s6 !== peg$FAILED) {
                      s7 = peg$parse_();
                      if (s7 !== peg$FAILED) {
                        s8 = [];
                        s9 = peg$parseinMustacheBracketedParam();
                        while (s9 !== peg$FAILED) {
                          s8.push(s9);
                          s9 = peg$parseinMustacheBracketedParam();
                        }
                        if (s8 !== peg$FAILED) {
                          s9 = peg$parsebracketedHash();
                          if (s9 === peg$FAILED) {
                            s9 = peg$c1;
                          }
                          if (s9 !== peg$FAILED) {
                            peg$reportedPos = s0;
                            s1 = peg$c47(s1, s8, s9);
                            s0 = s1;
                          } else {
                            peg$currPos = s0;
                            s0 = peg$c0;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$c0;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$c0;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c0;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        }

        return s0;
      };

      var peg$parsehtmlMustacheAttribute = function () {
        var s0, s1, s2, s3;

        s0 = peg$currPos;
        s1 = peg$parse_();
        if (s1 !== peg$FAILED) {
          s2 = peg$currPos;
          s3 = peg$parsetagNameShorthand();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s2;
            s3 = peg$c48(s3);
          }
          s2 = s3;
          if (s2 === peg$FAILED) {
            s2 = peg$currPos;
            s3 = peg$parseidShorthand();
            if (s3 !== peg$FAILED) {
              peg$reportedPos = s2;
              s3 = peg$c49(s3);
            }
            s2 = s3;
            if (s2 === peg$FAILED) {
              s2 = peg$currPos;
              s3 = peg$parseclassShorthand();
              if (s3 !== peg$FAILED) {
                peg$reportedPos = s2;
                s3 = peg$c50(s3);
              }
              s2 = s3;
            }
          }
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c51(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parseattributesAtLeastID = function () {
        var s0, s1, s2, s3;

        s0 = peg$currPos;
        s1 = peg$parseidShorthand();
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$parseclassShorthand();
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parseclassShorthand();
          }
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c52(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parseattributesAtLeastClass = function () {
        var s0, s1, s2;

        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parseclassShorthand();
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parseclassShorthand();
          }
        } else {
          s1 = peg$c0;
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c53(s1);
        }
        s0 = s1;

        return s0;
      };

      var peg$parseinMustacheParam = function () {
        var s0, s1, s2, s3;

        s0 = peg$currPos;
        s1 = peg$parsehtmlMustacheAttribute();
        if (s1 === peg$FAILED) {
          s1 = peg$currPos;
          s2 = peg$parse__();
          if (s2 !== peg$FAILED) {
            s3 = peg$parseparam();
            if (s3 !== peg$FAILED) {
              peg$reportedPos = s1;
              s2 = peg$c54(s3);
              s1 = s2;
            } else {
              peg$currPos = s1;
              s1 = peg$c0;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$c0;
          }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c55(s1);
        }
        s0 = s1;

        return s0;
      };

      var peg$parseinMustacheBracketedParam = function () {
        var s0, s1, s2, s3, s4;

        s0 = peg$currPos;
        s1 = peg$parsehtmlMustacheAttribute();
        if (s1 === peg$FAILED) {
          s1 = peg$currPos;
          s2 = peg$parseparam();
          if (s2 !== peg$FAILED) {
            s3 = [];
            s4 = peg$parseTERM();
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$parseTERM();
            }
            if (s3 !== peg$FAILED) {
              peg$reportedPos = s1;
              s2 = peg$c54(s2);
              s1 = s2;
            } else {
              peg$currPos = s1;
              s1 = peg$c0;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$c0;
          }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c55(s1);
        }
        s0 = s1;

        return s0;
      };

      var peg$parsehash = function () {
        var s0, s1, s2;

        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parsehashSegment();
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parsehashSegment();
          }
        } else {
          s1 = peg$c0;
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c56(s1);
        }
        s0 = s1;

        return s0;
      };

      var peg$parsebracketedHash = function () {
        var s0, s1, s2, s3, s4;

        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parseINDENT();
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parseINDENT();
        }
        if (s1 !== peg$FAILED) {
          s2 = [];
          if (input.charCodeAt(peg$currPos) === 32) {
            s3 = peg$c26;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c27);
            }
          }
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            if (input.charCodeAt(peg$currPos) === 32) {
              s3 = peg$c26;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c27);
              }
            }
          }
          if (s2 !== peg$FAILED) {
            s3 = [];
            s4 = peg$parsebracketedHashSegment();
            if (s4 !== peg$FAILED) {
              while (s4 !== peg$FAILED) {
                s3.push(s4);
                s4 = peg$parsebracketedHashSegment();
              }
            } else {
              s3 = peg$c0;
            }
            if (s3 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c56(s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parsepathIdent = function () {
        var s0, s1, s2, s3, s4;

        peg$silentFails++;
        if (input.substr(peg$currPos, 2) === peg$c58) {
          s0 = peg$c58;
          peg$currPos += 2;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c59);
          }
        }
        if (s0 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 46) {
            s0 = peg$c60;
            peg$currPos++;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c61);
            }
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$currPos;
            s2 = [];
            if (peg$c62.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c63);
              }
            }
            if (s3 !== peg$FAILED) {
              while (s3 !== peg$FAILED) {
                s2.push(s3);
                if (peg$c62.test(input.charAt(peg$currPos))) {
                  s3 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s3 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c63);
                  }
                }
              }
            } else {
              s2 = peg$c0;
            }
            if (s2 !== peg$FAILED) {
              s2 = input.substring(s1, peg$currPos);
            }
            s1 = s2;
            if (s1 !== peg$FAILED) {
              s2 = peg$currPos;
              peg$silentFails++;
              if (input.charCodeAt(peg$currPos) === 61) {
                s3 = peg$c5;
                peg$currPos++;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c6);
                }
              }
              peg$silentFails--;
              if (s3 === peg$FAILED) {
                s2 = peg$c22;
              } else {
                peg$currPos = s2;
                s2 = peg$c0;
              }
              if (s2 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c64(s1);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              if (input.charCodeAt(peg$currPos) === 91) {
                s1 = peg$c42;
                peg$currPos++;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c43);
                }
              }
              if (s1 !== peg$FAILED) {
                s2 = peg$currPos;
                s3 = [];
                if (peg$c65.test(input.charAt(peg$currPos))) {
                  s4 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s4 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c66);
                  }
                }
                while (s4 !== peg$FAILED) {
                  s3.push(s4);
                  if (peg$c65.test(input.charAt(peg$currPos))) {
                    s4 = input.charAt(peg$currPos);
                    peg$currPos++;
                  } else {
                    s4 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c66);
                    }
                  }
                }
                if (s3 !== peg$FAILED) {
                  s3 = input.substring(s2, peg$currPos);
                }
                s2 = s3;
                if (s2 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 93) {
                    s3 = peg$c31;
                    peg$currPos++;
                  } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c32);
                    }
                  }
                  if (s3 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c67(s2);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            }
          }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c57);
          }
        }

        return s0;
      };

      var peg$parsekey = function () {
        var s0, s1, s2;

        peg$silentFails++;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parsenmchar();
        if (s2 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 58) {
            s2 = peg$c69;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c70);
            }
          }
        }
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parsenmchar();
          if (s2 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 58) {
              s2 = peg$c69;
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c70);
              }
            }
          }
        }
        if (s1 !== peg$FAILED) {
          s1 = input.substring(s0, peg$currPos);
        }
        s0 = s1;
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c68);
          }
        }

        return s0;
      };

      var peg$parsehashSegment = function () {
        var s0, s1, s2, s3, s4, s5;

        s0 = peg$currPos;
        s1 = peg$parse__();
        if (s1 !== peg$FAILED) {
          s2 = peg$currPos;
          s3 = peg$parsekey();
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 61) {
              s4 = peg$c5;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c6);
              }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parseparam();
              if (s5 !== peg$FAILED) {
                s3 = [s3, s4, s5];
                s2 = s3;
              } else {
                peg$currPos = s2;
                s2 = peg$c0;
              }
            } else {
              peg$currPos = s2;
              s2 = peg$c0;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$c0;
          }
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c71(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parsebracketedHashSegment = function () {
        var s0, s1, s2, s3, s4, s5, s6;

        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parseINDENT();
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parseINDENT();
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            s3 = peg$currPos;
            s4 = peg$parsekey();
            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 61) {
                s5 = peg$c5;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c6);
                }
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parseparam();
                if (s6 !== peg$FAILED) {
                  s4 = [s4, s5, s6];
                  s3 = s4;
                } else {
                  peg$currPos = s3;
                  s3 = peg$c0;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
            if (s3 !== peg$FAILED) {
              s4 = [];
              s5 = peg$parseTERM();
              while (s5 !== peg$FAILED) {
                s4.push(s5);
                s5 = peg$parseTERM();
              }
              if (s4 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c72(s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parseparam = function () {
        var s0, s1, s2, s3;

        s0 = peg$parsebooleanNode();
        if (s0 === peg$FAILED) {
          s0 = peg$parseintegerNode();
          if (s0 === peg$FAILED) {
            s0 = peg$parsepathIdNode();
            if (s0 === peg$FAILED) {
              s0 = peg$parsestringNode();
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                s1 = peg$parsesexprOpen();
                if (s1 !== peg$FAILED) {
                  s2 = peg$parsesexpr();
                  if (s2 !== peg$FAILED) {
                    s3 = peg$parsesexprClose();
                    if (s3 !== peg$FAILED) {
                      peg$reportedPos = s0;
                      s1 = peg$c73(s2);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c0;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              }
            }
          }
        }

        return s0;
      };

      var peg$parsepath = function () {
        var s0, s1, s2, s3, s4, s5;

        s0 = peg$currPos;
        s1 = peg$parsepathIdent();
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$currPos;
          s4 = peg$parseseperator();
          if (s4 !== peg$FAILED) {
            s5 = peg$parsepathIdent();
            if (s5 !== peg$FAILED) {
              peg$reportedPos = s3;
              s4 = peg$c74(s4, s5);
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$currPos;
            s4 = peg$parseseperator();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsepathIdent();
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s3;
                s4 = peg$c74(s4, s5);
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          }
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c75(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parseseperator = function () {
        var s0, s1;

        peg$silentFails++;
        if (peg$c77.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c78);
          }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c76);
          }
        }

        return s0;
      };

      var peg$parsepathIdNode = function () {
        var s0, s1;

        s0 = peg$currPos;
        s1 = peg$parsepath();
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c79(s1);
        }
        s0 = s1;

        return s0;
      };

      var peg$parsestringNode = function () {
        var s0, s1;

        s0 = peg$currPos;
        s1 = peg$parsestring();
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c80(s1);
        }
        s0 = s1;

        return s0;
      };

      var peg$parseintegerNode = function () {
        var s0, s1;

        s0 = peg$currPos;
        s1 = peg$parseinteger();
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c81(s1);
        }
        s0 = s1;

        return s0;
      };

      var peg$parsebooleanNode = function () {
        var s0, s1;

        s0 = peg$currPos;
        s1 = peg$parseboolean();
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c82(s1);
        }
        s0 = s1;

        return s0;
      };

      var peg$parseboolean = function () {
        var s0, s1;

        peg$silentFails++;
        if (input.substr(peg$currPos, 4) === peg$c84) {
          s0 = peg$c84;
          peg$currPos += 4;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c85);
          }
        }
        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 5) === peg$c86) {
            s0 = peg$c86;
            peg$currPos += 5;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c87);
            }
          }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c83);
          }
        }

        return s0;
      };

      var peg$parseinteger = function () {
        var s0, s1, s2, s3, s4, s5;

        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 45) {
          s3 = peg$c89;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c90);
          }
        }
        if (s3 === peg$FAILED) {
          s3 = peg$c1;
        }
        if (s3 !== peg$FAILED) {
          s4 = [];
          if (peg$c91.test(input.charAt(peg$currPos))) {
            s5 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c92);
            }
          }
          if (s5 !== peg$FAILED) {
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              if (peg$c91.test(input.charAt(peg$currPos))) {
                s5 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c92);
                }
              }
            }
          } else {
            s4 = peg$c0;
          }
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$c0;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s2 = input.substring(s1, peg$currPos);
        }
        s1 = s2;
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c93(s1);
        }
        s0 = s1;
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c88);
          }
        }

        return s0;
      };

      var peg$parsestring = function () {
        var s0, s1, s2, s3, s4;

        s0 = peg$currPos;
        s1 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 34) {
          s2 = peg$c94;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c95);
          }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsehashDoubleQuoteStringValue();
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 34) {
              s4 = peg$c94;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c95);
              }
            }
            if (s4 !== peg$FAILED) {
              s2 = [s2, s3, s4];
              s1 = s2;
            } else {
              peg$currPos = s1;
              s1 = peg$c0;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$c0;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
        if (s1 === peg$FAILED) {
          s1 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 39) {
            s2 = peg$c96;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c97);
            }
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parsehashSingleQuoteStringValue();
            if (s3 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 39) {
                s4 = peg$c96;
                peg$currPos++;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c97);
                }
              }
              if (s4 !== peg$FAILED) {
                s2 = [s2, s3, s4];
                s1 = s2;
              } else {
                peg$currPos = s1;
                s1 = peg$c0;
              }
            } else {
              peg$currPos = s1;
              s1 = peg$c0;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$c0;
          }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c98(s1);
        }
        s0 = s1;

        return s0;
      };

      var peg$parsehashDoubleQuoteStringValue = function () {
        var s0, s1, s2, s3, s4;

        s0 = peg$currPos;
        s1 = [];
        s2 = peg$currPos;
        s3 = peg$currPos;
        peg$silentFails++;
        s4 = peg$parseTERM();
        peg$silentFails--;
        if (s4 === peg$FAILED) {
          s3 = peg$c22;
        } else {
          peg$currPos = s3;
          s3 = peg$c0;
        }
        if (s3 !== peg$FAILED) {
          if (peg$c99.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c100);
            }
          }
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$c0;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$currPos;
          s3 = peg$currPos;
          peg$silentFails++;
          s4 = peg$parseTERM();
          peg$silentFails--;
          if (s4 === peg$FAILED) {
            s3 = peg$c22;
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
          if (s3 !== peg$FAILED) {
            if (peg$c99.test(input.charAt(peg$currPos))) {
              s4 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c100);
              }
            }
            if (s4 !== peg$FAILED) {
              s3 = [s3, s4];
              s2 = s3;
            } else {
              peg$currPos = s2;
              s2 = peg$c0;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$c0;
          }
        }
        if (s1 !== peg$FAILED) {
          s1 = input.substring(s0, peg$currPos);
        }
        s0 = s1;

        return s0;
      };

      var peg$parsehashSingleQuoteStringValue = function () {
        var s0, s1, s2, s3, s4;

        s0 = peg$currPos;
        s1 = [];
        s2 = peg$currPos;
        s3 = peg$currPos;
        peg$silentFails++;
        s4 = peg$parseTERM();
        peg$silentFails--;
        if (s4 === peg$FAILED) {
          s3 = peg$c22;
        } else {
          peg$currPos = s3;
          s3 = peg$c0;
        }
        if (s3 !== peg$FAILED) {
          if (peg$c101.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c102);
            }
          }
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$c0;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$currPos;
          s3 = peg$currPos;
          peg$silentFails++;
          s4 = peg$parseTERM();
          peg$silentFails--;
          if (s4 === peg$FAILED) {
            s3 = peg$c22;
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
          if (s3 !== peg$FAILED) {
            if (peg$c101.test(input.charAt(peg$currPos))) {
              s4 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c102);
              }
            }
            if (s4 !== peg$FAILED) {
              s3 = [s3, s4];
              s2 = s3;
            } else {
              peg$currPos = s2;
              s2 = peg$c0;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$c0;
          }
        }
        if (s1 !== peg$FAILED) {
          s1 = input.substring(s0, peg$currPos);
        }
        s0 = s1;

        return s0;
      };

      var peg$parsealpha = function () {
        var s0;

        if (peg$c103.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c104);
          }
        }

        return s0;
      };

      var peg$parsewhitespaceableTextNodes = function () {
        var s0, s1, s2, s3, s4;

        s0 = peg$currPos;
        s1 = peg$parseindentation();
        if (s1 !== peg$FAILED) {
          s2 = peg$parsetextNodes();
          if (s2 !== peg$FAILED) {
            s3 = [];
            s4 = peg$parsewhitespaceableTextNodes();
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$parsewhitespaceableTextNodes();
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parseanyDedent();
              if (s4 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c105(s1, s2, s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$parsetextNodes();
        }

        return s0;
      };

      var peg$parsetextLineStart = function () {
        var s0, s1, s2;

        s0 = peg$currPos;
        if (peg$c106.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c107);
          }
        }
        if (s1 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 32) {
            s2 = peg$c26;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c27);
            }
          }
          if (s2 === peg$FAILED) {
            s2 = peg$c1;
          }
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c64(s1);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$currPos;
          peg$silentFails++;
          if (input.charCodeAt(peg$currPos) === 60) {
            s2 = peg$c108;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c109);
            }
          }
          peg$silentFails--;
          if (s2 !== peg$FAILED) {
            peg$currPos = s1;
            s1 = peg$c22;
          } else {
            s1 = peg$c0;
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c110();
          }
          s0 = s1;
        }

        return s0;
      };

      var peg$parsetextLine = function () {
        var s0, s1, s2, s3, s4, s5, s6;

        s0 = peg$currPos;
        s1 = peg$parsetextLineStart();
        if (s1 !== peg$FAILED) {
          s2 = peg$parsetextNodes();
          if (s2 !== peg$FAILED) {
            s3 = peg$currPos;
            s4 = peg$parseindentation();
            if (s4 !== peg$FAILED) {
              s5 = [];
              s6 = peg$parsewhitespaceableTextNodes();
              while (s6 !== peg$FAILED) {
                s5.push(s6);
                s6 = peg$parsewhitespaceableTextNodes();
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parseDEDENT();
                if (s6 !== peg$FAILED) {
                  s4 = [s4, s5, s6];
                  s3 = s4;
                } else {
                  peg$currPos = s3;
                  s3 = peg$c0;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
            if (s3 === peg$FAILED) {
              s3 = peg$c1;
            }
            if (s3 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c111(s1, s2, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parsetextNodes = function () {
        var s0, s1, s2, s3, s4, s5;

        s0 = peg$currPos;
        s1 = peg$parsepreMustacheText();
        if (s1 === peg$FAILED) {
          s1 = peg$c1;
        }
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$currPos;
          s4 = peg$parserawMustache();
          if (s4 !== peg$FAILED) {
            s5 = peg$parsepreMustacheText();
            if (s5 === peg$FAILED) {
              s5 = peg$c1;
            }
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$currPos;
            s4 = peg$parserawMustache();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsepreMustacheText();
              if (s5 === peg$FAILED) {
                s5 = peg$c1;
              }
              if (s5 !== peg$FAILED) {
                s4 = [s4, s5];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parseTERM();
            if (s3 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c112(s1, s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parseattributeTextNodes = function () {
        var s0, s1, s2, s3;

        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 34) {
          s1 = peg$c94;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c95);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parseattributeTextNodesInner();
          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 34) {
              s3 = peg$c94;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c95);
              }
            }
            if (s3 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c55(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 39) {
            s1 = peg$c96;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c97);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parseattributeTextNodesInnerSingle();
            if (s2 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 39) {
                s3 = peg$c96;
                peg$currPos++;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c97);
                }
              }
              if (s3 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c55(s2);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        }

        return s0;
      };

      var peg$parseattributeTextNodesInner = function () {
        var s0, s1, s2, s3, s4, s5;

        s0 = peg$currPos;
        s1 = peg$parsepreAttrMustacheText();
        if (s1 === peg$FAILED) {
          s1 = peg$c1;
        }
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$currPos;
          s4 = peg$parserawMustache();
          if (s4 !== peg$FAILED) {
            s5 = peg$parsepreAttrMustacheText();
            if (s5 === peg$FAILED) {
              s5 = peg$c1;
            }
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$currPos;
            s4 = peg$parserawMustache();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsepreAttrMustacheText();
              if (s5 === peg$FAILED) {
                s5 = peg$c1;
              }
              if (s5 !== peg$FAILED) {
                s4 = [s4, s5];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          }
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c113(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parseattributeTextNodesInnerSingle = function () {
        var s0, s1, s2, s3, s4, s5;

        s0 = peg$currPos;
        s1 = peg$parsepreAttrMustacheTextSingle();
        if (s1 === peg$FAILED) {
          s1 = peg$c1;
        }
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$currPos;
          s4 = peg$parserawMustache();
          if (s4 !== peg$FAILED) {
            s5 = peg$parsepreAttrMustacheTextSingle();
            if (s5 === peg$FAILED) {
              s5 = peg$c1;
            }
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$currPos;
            s4 = peg$parserawMustache();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsepreAttrMustacheTextSingle();
              if (s5 === peg$FAILED) {
                s5 = peg$c1;
              }
              if (s5 !== peg$FAILED) {
                s4 = [s4, s5];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          }
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c113(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parserawMustache = function () {
        var s0;

        s0 = peg$parserawMustacheUnescaped();
        if (s0 === peg$FAILED) {
          s0 = peg$parserawMustacheEscaped();
        }

        return s0;
      };

      var peg$parserecursivelyParsedMustacheContent = function () {
        var s0, s1, s2, s3, s4;

        s0 = peg$currPos;
        s1 = peg$currPos;
        peg$silentFails++;
        if (input.charCodeAt(peg$currPos) === 123) {
          s2 = peg$c114;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c115);
          }
        }
        peg$silentFails--;
        if (s2 === peg$FAILED) {
          s1 = peg$c22;
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$currPos;
          s3 = [];
          if (peg$c116.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c117);
            }
          }
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            if (peg$c116.test(input.charAt(peg$currPos))) {
              s4 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c117);
              }
            }
          }
          if (s3 !== peg$FAILED) {
            s3 = input.substring(s2, peg$currPos);
          }
          s2 = s3;
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c118(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parserawMustacheEscaped = function () {
        var s0, s1, s2, s3, s4, s5;

        s0 = peg$currPos;
        s1 = peg$parsedoubleOpen();
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            s3 = peg$parserecursivelyParsedMustacheContent();
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsedoubleClose();
                if (s5 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c119(s3);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parsehashStacheOpen();
          if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
              s3 = peg$parserecursivelyParsedMustacheContent();
              if (s3 !== peg$FAILED) {
                s4 = peg$parse_();
                if (s4 !== peg$FAILED) {
                  s5 = peg$parsehashStacheClose();
                  if (s5 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c119(s3);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        }

        return s0;
      };

      var peg$parserawMustacheUnescaped = function () {
        var s0, s1, s2, s3, s4, s5;

        s0 = peg$currPos;
        s1 = peg$parsetripleOpen();
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            s3 = peg$parserecursivelyParsedMustacheContent();
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsetripleClose();
                if (s5 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c120(s3);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parsepreAttrMustacheText = function () {
        var s0, s1, s2, s3;

        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = [];
        s3 = peg$parsepreAttrMustacheUnit();
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parsepreAttrMustacheUnit();
          }
        } else {
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s2 = input.substring(s1, peg$currPos);
        }
        s1 = s2;
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c121(s1);
        }
        s0 = s1;

        return s0;
      };

      var peg$parsepreAttrMustacheTextSingle = function () {
        var s0, s1, s2, s3;

        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = [];
        s3 = peg$parsepreAttrMustacheUnitSingle();
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parsepreAttrMustacheUnitSingle();
          }
        } else {
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s2 = input.substring(s1, peg$currPos);
        }
        s1 = s2;
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c121(s1);
        }
        s0 = s1;

        return s0;
      };

      var peg$parsepreAttrMustacheUnit = function () {
        var s0, s1, s2;

        s0 = peg$currPos;
        s1 = peg$currPos;
        peg$silentFails++;
        s2 = peg$parsenonMustacheUnit();
        if (s2 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 34) {
            s2 = peg$c94;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c95);
            }
          }
        }
        peg$silentFails--;
        if (s2 === peg$FAILED) {
          s1 = peg$c22;
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
        if (s1 !== peg$FAILED) {
          if (input.length > peg$currPos) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c122);
            }
          }
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c29(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parsepreAttrMustacheUnitSingle = function () {
        var s0, s1, s2;

        s0 = peg$currPos;
        s1 = peg$currPos;
        peg$silentFails++;
        s2 = peg$parsenonMustacheUnit();
        if (s2 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 39) {
            s2 = peg$c96;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c97);
            }
          }
        }
        peg$silentFails--;
        if (s2 === peg$FAILED) {
          s1 = peg$c22;
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
        if (s1 !== peg$FAILED) {
          if (input.length > peg$currPos) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c122);
            }
          }
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c29(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parsepreMustacheText = function () {
        var s0, s1, s2, s3;

        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = [];
        s3 = peg$parsepreMustacheUnit();
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parsepreMustacheUnit();
          }
        } else {
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s2 = input.substring(s1, peg$currPos);
        }
        s1 = s2;
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c121(s1);
        }
        s0 = s1;

        return s0;
      };

      var peg$parsepreMustacheUnit = function () {
        var s0, s1, s2;

        s0 = peg$currPos;
        s1 = peg$currPos;
        peg$silentFails++;
        s2 = peg$parsenonMustacheUnit();
        peg$silentFails--;
        if (s2 === peg$FAILED) {
          s1 = peg$c22;
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
        if (s1 !== peg$FAILED) {
          if (input.length > peg$currPos) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c122);
            }
          }
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c29(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parsenonMustacheUnit = function () {
        var s0;

        s0 = peg$parsetripleOpen();
        if (s0 === peg$FAILED) {
          s0 = peg$parsedoubleOpen();
          if (s0 === peg$FAILED) {
            s0 = peg$parsehashStacheOpen();
            if (s0 === peg$FAILED) {
              s0 = peg$parseanyDedent();
              if (s0 === peg$FAILED) {
                s0 = peg$parseTERM();
              }
            }
          }
        }

        return s0;
      };

      var peg$parserawMustacheSingle = function () {
        var s0, s1, s2, s3, s4, s5;

        s0 = peg$currPos;
        s1 = peg$parsesingleOpen();
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            s3 = peg$parserecursivelyParsedMustacheContent();
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsesingleClose();
                if (s5 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c119(s3);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parseinTagMustache = function () {
        var s0;

        s0 = peg$parserawMustacheSingle();
        if (s0 === peg$FAILED) {
          s0 = peg$parserawMustacheUnescaped();
          if (s0 === peg$FAILED) {
            s0 = peg$parserawMustacheEscaped();
          }
        }

        return s0;
      };

      var peg$parsesingleOpen = function () {
        var s0, s1;

        peg$silentFails++;
        if (input.charCodeAt(peg$currPos) === 123) {
          s0 = peg$c114;
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c115);
          }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c123);
          }
        }

        return s0;
      };

      var peg$parsedoubleOpen = function () {
        var s0, s1;

        peg$silentFails++;
        if (input.substr(peg$currPos, 2) === peg$c125) {
          s0 = peg$c125;
          peg$currPos += 2;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c126);
          }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c124);
          }
        }

        return s0;
      };

      var peg$parsetripleOpen = function () {
        var s0, s1;

        peg$silentFails++;
        if (input.substr(peg$currPos, 3) === peg$c128) {
          s0 = peg$c128;
          peg$currPos += 3;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c129);
          }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c127);
          }
        }

        return s0;
      };

      var peg$parsesingleClose = function () {
        var s0, s1;

        peg$silentFails++;
        if (input.charCodeAt(peg$currPos) === 125) {
          s0 = peg$c131;
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c132);
          }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c130);
          }
        }

        return s0;
      };

      var peg$parsedoubleClose = function () {
        var s0, s1;

        peg$silentFails++;
        if (input.substr(peg$currPos, 2) === peg$c134) {
          s0 = peg$c134;
          peg$currPos += 2;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c135);
          }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c133);
          }
        }

        return s0;
      };

      var peg$parsetripleClose = function () {
        var s0, s1;

        peg$silentFails++;
        if (input.substr(peg$currPos, 3) === peg$c137) {
          s0 = peg$c137;
          peg$currPos += 3;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c138);
          }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c136);
          }
        }

        return s0;
      };

      var peg$parsesexprOpen = function () {
        var s0, s1;

        peg$silentFails++;
        if (input.charCodeAt(peg$currPos) === 40) {
          s0 = peg$c140;
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c141);
          }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c139);
          }
        }

        return s0;
      };

      var peg$parsesexprClose = function () {
        var s0, s1;

        peg$silentFails++;
        if (input.charCodeAt(peg$currPos) === 41) {
          s0 = peg$c143;
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c144);
          }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c142);
          }
        }

        return s0;
      };

      var peg$parsehashStacheOpen = function () {
        var s0, s1;

        peg$silentFails++;
        if (input.substr(peg$currPos, 2) === peg$c146) {
          s0 = peg$c146;
          peg$currPos += 2;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c147);
          }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c145);
          }
        }

        return s0;
      };

      var peg$parsehashStacheClose = function () {
        var s0, s1;

        peg$silentFails++;
        if (input.charCodeAt(peg$currPos) === 125) {
          s0 = peg$c131;
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c132);
          }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c148);
          }
        }

        return s0;
      };

      var peg$parseequalSign = function () {
        var s0, s1, s2;

        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c149) {
          s1 = peg$c149;
          peg$currPos += 2;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c150);
          }
        }
        if (s1 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 32) {
            s2 = peg$c26;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c27);
            }
          }
          if (s2 === peg$FAILED) {
            s2 = peg$c1;
          }
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c151();
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 61) {
            s1 = peg$c5;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c6);
            }
          }
          if (s1 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 32) {
              s2 = peg$c26;
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c27);
              }
            }
            if (s2 === peg$FAILED) {
              s2 = peg$c1;
            }
            if (s2 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c152();
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        }

        return s0;
      };

      var peg$parsehtmlStart = function () {
        var s0, s1, s2, s3, s4;

        s0 = peg$currPos;
        s1 = peg$parsehtmlTagName();
        if (s1 === peg$FAILED) {
          s1 = peg$c1;
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parseshorthandAttributes();
          if (s2 === peg$FAILED) {
            s2 = peg$c1;
          }
          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 47) {
              s3 = peg$c20;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c21);
              }
            }
            if (s3 === peg$FAILED) {
              s3 = peg$c1;
            }
            if (s3 !== peg$FAILED) {
              peg$reportedPos = peg$currPos;
              s4 = peg$c153(s1, s2);
              if (s4) {
                s4 = peg$c22;
              } else {
                s4 = peg$c0;
              }
              if (s4 !== peg$FAILED) {
                s1 = [s1, s2, s3, s4];
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parseinHtmlTag = function () {
        var s0, s1, s2, s3, s4, s5, s6;

        s0 = peg$currPos;
        s1 = peg$parsehtmlStart();
        if (s1 !== peg$FAILED) {
          if (input.substr(peg$currPos, 2) === peg$c45) {
            s2 = peg$c45;
            peg$currPos += 2;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c46);
            }
          }
          if (s2 !== peg$FAILED) {
            s3 = [];
            s4 = peg$parseTERM();
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$parseTERM();
            }
            if (s3 !== peg$FAILED) {
              s4 = [];
              s5 = peg$parseinTagMustache();
              while (s5 !== peg$FAILED) {
                s4.push(s5);
                s5 = peg$parseinTagMustache();
              }
              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$parsebracketedAttribute();
                if (s6 !== peg$FAILED) {
                  while (s6 !== peg$FAILED) {
                    s5.push(s6);
                    s6 = peg$parsebracketedAttribute();
                  }
                } else {
                  s5 = peg$c0;
                }
                if (s5 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c154(s1, s4, s5);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parsehtmlStart();
          if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$parseinTagMustache();
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              s3 = peg$parseinTagMustache();
            }
            if (s2 !== peg$FAILED) {
              s3 = [];
              s4 = peg$parsefullAttribute();
              while (s4 !== peg$FAILED) {
                s3.push(s4);
                s4 = peg$parsefullAttribute();
              }
              if (s3 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c154(s1, s2, s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        }

        return s0;
      };

      var peg$parseshorthandAttributes = function () {
        var s0, s1, s2, s3;

        s0 = peg$currPos;
        s1 = [];
        s2 = peg$currPos;
        s3 = peg$parseidShorthand();
        if (s3 !== peg$FAILED) {
          peg$reportedPos = s2;
          s3 = peg$c155(s3);
        }
        s2 = s3;
        if (s2 === peg$FAILED) {
          s2 = peg$currPos;
          s3 = peg$parseclassShorthand();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s2;
            s3 = peg$c156(s3);
          }
          s2 = s3;
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$currPos;
            s3 = peg$parseidShorthand();
            if (s3 !== peg$FAILED) {
              peg$reportedPos = s2;
              s3 = peg$c155(s3);
            }
            s2 = s3;
            if (s2 === peg$FAILED) {
              s2 = peg$currPos;
              s3 = peg$parseclassShorthand();
              if (s3 !== peg$FAILED) {
                peg$reportedPos = s2;
                s3 = peg$c156(s3);
              }
              s2 = s3;
            }
          }
        } else {
          s1 = peg$c0;
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c157(s1);
        }
        s0 = s1;

        return s0;
      };

      var peg$parsefullAttribute = function () {
        var s0, s1, s2;

        s0 = peg$currPos;
        s1 = [];
        if (input.charCodeAt(peg$currPos) === 32) {
          s2 = peg$c26;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c27);
          }
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            if (input.charCodeAt(peg$currPos) === 32) {
              s2 = peg$c26;
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c27);
              }
            }
          }
        } else {
          s1 = peg$c0;
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parseactionAttribute();
          if (s2 === peg$FAILED) {
            s2 = peg$parsebooleanAttribute();
            if (s2 === peg$FAILED) {
              s2 = peg$parseboundAttribute();
              if (s2 === peg$FAILED) {
                s2 = peg$parserawMustacheAttribute();
                if (s2 === peg$FAILED) {
                  s2 = peg$parsenormalAttribute();
                }
              }
            }
          }
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c158(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parsebracketedAttribute = function () {
        var s0, s1, s2, s3, s4, s5;

        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parseINDENT();
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parseINDENT();
        }
        if (s1 !== peg$FAILED) {
          s2 = [];
          if (input.charCodeAt(peg$currPos) === 32) {
            s3 = peg$c26;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c27);
            }
          }
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            if (input.charCodeAt(peg$currPos) === 32) {
              s3 = peg$c26;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c27);
              }
            }
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parseactionAttribute();
            if (s3 === peg$FAILED) {
              s3 = peg$parsebooleanAttribute();
              if (s3 === peg$FAILED) {
                s3 = peg$parseboundAttribute();
                if (s3 === peg$FAILED) {
                  s3 = peg$parserawMustacheAttribute();
                  if (s3 === peg$FAILED) {
                    s3 = peg$parsenormalAttribute();
                  }
                }
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = [];
              s5 = peg$parseTERM();
              while (s5 !== peg$FAILED) {
                s4.push(s5);
                s5 = peg$parseTERM();
              }
              if (s4 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c158(s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parseboundAttributeValueChar = function () {
        var s0;

        if (peg$c159.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c160);
          }
        }
        if (s0 === peg$FAILED) {
          s0 = peg$parsenonSeparatorColon();
        }

        return s0;
      };

      var peg$parseactionValue = function () {
        var s0, s1;

        s0 = peg$parsequotedActionValue();
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parsepathIdNode();
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c161(s1);
          }
          s0 = s1;
        }

        return s0;
      };

      var peg$parsequotedActionValue = function () {
        var s0, s1, s2, s3, s4;

        s0 = peg$currPos;
        s1 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 34) {
          s2 = peg$c94;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c95);
          }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseinMustache();
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 34) {
              s4 = peg$c94;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c95);
              }
            }
            if (s4 !== peg$FAILED) {
              s2 = [s2, s3, s4];
              s1 = s2;
            } else {
              peg$currPos = s1;
              s1 = peg$c0;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$c0;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
        if (s1 === peg$FAILED) {
          s1 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 39) {
            s2 = peg$c96;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c97);
            }
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parseinMustache();
            if (s3 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 39) {
                s4 = peg$c96;
                peg$currPos++;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c97);
                }
              }
              if (s4 !== peg$FAILED) {
                s2 = [s2, s3, s4];
                s1 = s2;
              } else {
                peg$currPos = s1;
                s1 = peg$c0;
              }
            } else {
              peg$currPos = s1;
              s1 = peg$c0;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$c0;
          }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c98(s1);
        }
        s0 = s1;

        return s0;
      };

      var peg$parseactionAttribute = function () {
        var s0, s1, s2, s3;

        s0 = peg$currPos;
        s1 = peg$parseknownEvent();
        if (s1 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 61) {
            s2 = peg$c5;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c6);
            }
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parseactionValue();
            if (s3 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c162(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parsebooleanAttribute = function () {
        var s0, s1, s2, s3;

        s0 = peg$currPos;
        s1 = peg$parsekey();
        if (s1 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 61) {
            s2 = peg$c5;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c6);
            }
          }
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 4) === peg$c84) {
              s3 = peg$c84;
              peg$currPos += 4;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c85);
              }
            }
            if (s3 === peg$FAILED) {
              if (input.substr(peg$currPos, 5) === peg$c86) {
                s3 = peg$c86;
                peg$currPos += 5;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c87);
                }
              }
            }
            if (s3 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c163(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parseboundAttributeValue = function () {
        var s0, s1, s2, s3, s4, s5;

        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 123) {
          s1 = peg$c114;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c115);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            s3 = peg$currPos;
            s4 = [];
            s5 = peg$parseboundAttributeValueChar();
            if (s5 === peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 32) {
                s5 = peg$c26;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c27);
                }
              }
            }
            if (s5 !== peg$FAILED) {
              while (s5 !== peg$FAILED) {
                s4.push(s5);
                s5 = peg$parseboundAttributeValueChar();
                if (s5 === peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 32) {
                    s5 = peg$c26;
                    peg$currPos++;
                  } else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c27);
                    }
                  }
                }
              }
            } else {
              s4 = peg$c0;
            }
            if (s4 !== peg$FAILED) {
              s4 = input.substring(s3, peg$currPos);
            }
            s3 = s4;
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 125) {
                  s5 = peg$c131;
                  peg$currPos++;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c132);
                  }
                }
                if (s5 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c164(s3);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = [];
          s2 = peg$parseboundAttributeValueChar();
          if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
              s1.push(s2);
              s2 = peg$parseboundAttributeValueChar();
            }
          } else {
            s1 = peg$c0;
          }
          if (s1 !== peg$FAILED) {
            s1 = input.substring(s0, peg$currPos);
          }
          s0 = s1;
        }

        return s0;
      };

      var peg$parseboundAttribute = function () {
        var s0, s1, s2, s3, s4, s5;

        s0 = peg$currPos;
        s1 = peg$parsekey();
        if (s1 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 61) {
            s2 = peg$c5;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c6);
            }
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parseboundAttributeValue();
            if (s3 !== peg$FAILED) {
              s4 = peg$currPos;
              peg$silentFails++;
              if (input.charCodeAt(peg$currPos) === 33) {
                s5 = peg$c165;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c166);
                }
              }
              peg$silentFails--;
              if (s5 === peg$FAILED) {
                s4 = peg$c22;
              } else {
                peg$currPos = s4;
                s4 = peg$c0;
              }
              if (s4 !== peg$FAILED) {
                peg$reportedPos = peg$currPos;
                s5 = peg$c167(s1, s3);
                if (s5) {
                  s5 = peg$c22;
                } else {
                  s5 = peg$c0;
                }
                if (s5 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c168(s1, s3);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parserawMustacheAttribute = function () {
        var s0, s1, s2, s3;

        s0 = peg$currPos;
        s1 = peg$parsekey();
        if (s1 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 61) {
            s2 = peg$c5;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c6);
            }
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parsepathIdNode();
            if (s3 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c169(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parsenormalAttribute = function () {
        var s0, s1, s2, s3;

        s0 = peg$currPos;
        s1 = peg$parsekey();
        if (s1 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 61) {
            s2 = peg$c5;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c6);
            }
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parseattributeTextNodes();
            if (s3 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c170(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parseattributeName = function () {
        var s0, s1, s2;

        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parseattributeChar();
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parseattributeChar();
        }
        if (s1 !== peg$FAILED) {
          s1 = input.substring(s0, peg$currPos);
        }
        s0 = s1;

        return s0;
      };

      var peg$parseattributeChar = function () {
        var s0;

        s0 = peg$parsealpha();
        if (s0 === peg$FAILED) {
          if (peg$c91.test(input.charAt(peg$currPos))) {
            s0 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c92);
            }
          }
          if (s0 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 95) {
              s0 = peg$c171;
              peg$currPos++;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c172);
              }
            }
            if (s0 === peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 45) {
                s0 = peg$c89;
                peg$currPos++;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c90);
                }
              }
            }
          }
        }

        return s0;
      };

      var peg$parsetagNameShorthand = function () {
        var s0, s1, s2;

        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 37) {
          s1 = peg$c173;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c174);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parsecssIdentifier();
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c29(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parseidShorthand = function () {
        var s0, s1, s2;

        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 35) {
          s1 = peg$c175;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c176);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parsecssIdentifier();
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c177(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parseclassShorthand = function () {
        var s0, s1, s2;

        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 46) {
          s1 = peg$c60;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c61);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parsecssIdentifier();
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c29(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parsecssIdentifier = function () {
        var s0, s1;

        peg$silentFails++;
        s0 = peg$parseident();
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c178);
          }
        }

        return s0;
      };

      var peg$parseident = function () {
        var s0, s1, s2;

        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parsenmchar();
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parsenmchar();
          }
        } else {
          s1 = peg$c0;
        }
        if (s1 !== peg$FAILED) {
          s1 = input.substring(s0, peg$currPos);
        }
        s0 = s1;

        return s0;
      };

      var peg$parsenmchar = function () {
        var s0;

        if (peg$c179.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c180);
          }
        }
        if (s0 === peg$FAILED) {
          s0 = peg$parsenonascii();
        }

        return s0;
      };

      var peg$parsenmstart = function () {
        var s0;

        if (peg$c181.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c182);
          }
        }
        if (s0 === peg$FAILED) {
          s0 = peg$parsenonascii();
        }

        return s0;
      };

      var peg$parsenonascii = function () {
        var s0;

        if (peg$c183.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c184);
          }
        }

        return s0;
      };

      var peg$parsetagString = function () {
        var s0, s1, s2;

        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parsetagChar();
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parsetagChar();
          }
        } else {
          s1 = peg$c0;
        }
        if (s1 !== peg$FAILED) {
          s1 = input.substring(s0, peg$currPos);
        }
        s0 = s1;

        return s0;
      };

      var peg$parsehtmlTagName = function () {
        var s0, s1, s2, s3;

        peg$silentFails++;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 37) {
          s1 = peg$c173;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c174);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            s3 = peg$parsetagString();
            if (s3 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c64(s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$parseknownTagName();
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c185);
          }
        }

        return s0;
      };

      var peg$parseknownTagName = function () {
        var s0, s1, s2;

        s0 = peg$currPos;
        s1 = peg$parsetagString();
        if (s1 !== peg$FAILED) {
          peg$reportedPos = peg$currPos;
          s2 = peg$c186(s1);
          if (s2) {
            s2 = peg$c22;
          } else {
            s2 = peg$c0;
          }
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c187(s1);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parsetagChar = function () {
        var s0;

        if (peg$c179.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c180);
          }
        }
        if (s0 === peg$FAILED) {
          s0 = peg$parsenonSeparatorColon();
        }

        return s0;
      };

      var peg$parsenonSeparatorColon = function () {
        var s0, s1, s2, s3;

        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 58) {
          s1 = peg$c69;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c70);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$currPos;
          peg$silentFails++;
          if (input.charCodeAt(peg$currPos) === 32) {
            s3 = peg$c26;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c27);
            }
          }
          peg$silentFails--;
          if (s3 === peg$FAILED) {
            s2 = peg$c22;
          } else {
            peg$currPos = s2;
            s2 = peg$c0;
          }
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c29(s1);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parseknownEvent = function () {
        var s0, s1, s2;

        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parsetagString();
        if (s1 !== peg$FAILED) {
          peg$reportedPos = peg$currPos;
          s2 = peg$c189(s1);
          if (s2) {
            s2 = peg$c22;
          } else {
            s2 = peg$c0;
          }
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c187(s1);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c188);
          }
        }

        return s0;
      };

      var peg$parseindentation = function () {
        var s0, s1, s2;

        s0 = peg$currPos;
        s1 = peg$parseINDENT();
        if (s1 !== peg$FAILED) {
          s2 = peg$parse__();
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c64(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parseINDENT = function () {
        var s0, s1;

        peg$silentFails++;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 61423) {
          s1 = peg$c191;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c192);
          }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c193();
        }
        s0 = s1;
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c190);
          }
        }

        return s0;
      };

      var peg$parseDEDENT = function () {
        var s0, s1;

        peg$silentFails++;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 61438) {
          s1 = peg$c195;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c196);
          }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c193();
        }
        s0 = s1;
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c194);
          }
        }

        return s0;
      };

      var peg$parseUNMATCHED_DEDENT = function () {
        var s0, s1;

        peg$silentFails++;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 61422) {
          s1 = peg$c198;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c199);
          }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c193();
        }
        s0 = s1;
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c197);
          }
        }

        return s0;
      };

      var peg$parseTERM = function () {
        var s0, s1, s2, s3;

        peg$silentFails++;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 13) {
          s1 = peg$c201;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c202);
          }
        }
        if (s1 === peg$FAILED) {
          s1 = peg$c1;
        }
        if (s1 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 61439) {
            s2 = peg$c203;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c204);
            }
          }
          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 10) {
              s3 = peg$c205;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c206);
              }
            }
            if (s3 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c151();
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c200);
          }
        }

        return s0;
      };

      var peg$parseanyDedent = function () {
        var s0, s1;

        peg$silentFails++;
        s0 = peg$parseDEDENT();
        if (s0 === peg$FAILED) {
          s0 = peg$parseUNMATCHED_DEDENT();
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c207);
          }
        }

        return s0;
      };

      var peg$parse__ = function () {
        var s0, s1, s2;

        peg$silentFails++;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parsewhitespace();
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parsewhitespace();
          }
        } else {
          s1 = peg$c0;
        }
        if (s1 !== peg$FAILED) {
          s1 = input.substring(s0, peg$currPos);
        }
        s0 = s1;
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c208);
          }
        }

        return s0;
      };

      var peg$parse_ = function () {
        var s0, s1;

        peg$silentFails++;
        s0 = [];
        s1 = peg$parsewhitespace();
        while (s1 !== peg$FAILED) {
          s0.push(s1);
          s1 = peg$parsewhitespace();
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c209);
          }
        }

        return s0;
      };

      var peg$parsewhitespace = function () {
        var s0, s1;

        peg$silentFails++;
        if (peg$c211.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c212);
          }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c210);
          }
        }

        return s0;
      };

      var peg$parselineChar = function () {
        var s0, s1, s2;

        s0 = peg$currPos;
        s1 = peg$currPos;
        peg$silentFails++;
        s2 = peg$parseINDENT();
        if (s2 === peg$FAILED) {
          s2 = peg$parseDEDENT();
          if (s2 === peg$FAILED) {
            s2 = peg$parseTERM();
          }
        }
        peg$silentFails--;
        if (s2 === peg$FAILED) {
          s1 = peg$c22;
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
        if (s1 !== peg$FAILED) {
          if (input.length > peg$currPos) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c122);
            }
          }
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c29(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }

        return s0;
      };

      var peg$parselineContent = function () {
        var s0, s1, s2;

        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parselineChar();
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parselineChar();
        }
        if (s1 !== peg$FAILED) {
          s1 = input.substring(s0, peg$currPos);
        }
        s0 = s1;

        return s0;
      };

      var textNodesResult = function (first, tail) {
        var ret = [];
        if (first) {
          ret.push(first);
        }
        for (var i = 0; i < tail.length; ++i) {
          var t = tail[i];
          ret.push(t[0]);
          if (t[1]) {
            ret.push(t[1]);
          }
        }
        return ret;
      };

      var parseSexpr = function (path, params, hash) {
        var actualParams = [];
        var attrs = {};
        var hasAttrs = false;

        // Convert shorthand html attributes (e.g. % = tagName, . = class, etc)
        for (var i = 0; i < params.length; ++i) {
          var p = params[i];
          var attrKey = p[0];
          if (attrKey === "tagName" || attrKey === "elementId" || attrKey === "class") {
            hasAttrs = true;
            attrs[attrKey] = attrs[attrKey] || [];
            attrs[attrKey].push(p[1]);
          } else {
            actualParams.push(p);
          }
        }

        if (hasAttrs) {
          hash = hash || new AST.HashNode([]);
          for (var k in attrs) {
            if (!attrs.hasOwnProperty(k)) continue;
            hash.pairs.push([k, new AST.StringNode(attrs[k].join(" "))]);
          }
        }

        actualParams.unshift(path);
        return new AST.SexprNode(actualParams, hash);
      };

      var parseInHtml = function (h, inTagMustaches, fullAttributes) {
        var tagName = h[0] || "div",
            shorthandAttributes = h[1] || [],
            id = shorthandAttributes[0],
            classes = shorthandAttributes[1] || [],
            tagOpenContent = [],
            updateMustacheNode;

        updateMustacheNode = function (node) {
          var pairs, pair, stringNode, original;
          if (!classes.length) {
            return;
          }
          if (!node.id || node.id.string !== "bind-attr") {
            return;
          }
          if (node.hash && node.hash.pairs && (pairs = node.hash.pairs)) {
            for (var i2 in pairs) {
              if (!pairs.hasOwnProperty(i2)) {
                continue;
              }
              pair = pairs[i2];
              if (pair && pair[0] === "class" && pair[1] instanceof AST.StringNode) {
                stringNode = pair[1];
                original = stringNode.original;
                stringNode.original = stringNode.string = stringNode.stringModeValue = ":" + classes.join(" :") + " " + original;
                classes = [];
              }
            }
          }
        };

        tagOpenContent.push(new AST.ContentNode("<" + tagName));

        if (id) {
          tagOpenContent.push(new AST.ContentNode(" id=\"" + id + "\""));
        }

        // Pad in tag mustaches with spaces.
        var i;
        for (i = 0; i < inTagMustaches.length; ++i) {
          // Check if given mustache node has class bindings and prepend shorthand classes
          updateMustacheNode(inTagMustaches[i]);
          tagOpenContent.push(new AST.ContentNode(" "));
          tagOpenContent.push(inTagMustaches[i]);
        }
        for (i = 0; i < fullAttributes.length; ++i) {
          for (var i2 in fullAttributes[i]) {
            if (fullAttributes[i][i2] instanceof AST.MustacheNode) {
              updateMustacheNode(fullAttributes[i][i2]);
            }
          }
          if (classes.length) {
            var isClassAttr = fullAttributes[i][1] && fullAttributes[i][1].string === "class=\"";

            // Check if attribute is class attribute and has content
            if (isClassAttr && fullAttributes[i].length === 4) {
              if (fullAttributes[i][2].type === "mustache") {
                var mustacheNode, classesContent, hash, params;
                // If class was mustache binding, transform attribute into bind-attr MustacheNode
                mustacheNode = fullAttributes[i][2];
                classesContent = ":" + classes.join(" :") + " " + mustacheNode.id.original;
                hash = new AST.HashNode([["class", new AST.StringNode(classesContent)]]);

                params = [new AST.IdNode([{ part: "bind-attr" }])].concat(mustacheNode.params);
                fullAttributes[i] = [fullAttributes[i][0], astDelegate.createMustacheNode(params, hash, true)];
              } else {
                // Else prepend shorthand classes to attribute
                classes.push(fullAttributes[i][2].string);
                fullAttributes[i][2].string = classes.join(" ");
              }
              classes = [];
            }
          }

          tagOpenContent = tagOpenContent.concat(fullAttributes[i]);
        }

        if (classes && classes.length) {
          tagOpenContent.push(new AST.ContentNode(" class=\"" + classes.join(" ") + "\""));
        }
        var closingTagSlashPresent = !!h[2];
        if (SELF_CLOSING_TAG[tagName] || closingTagSlashPresent) {
          tagOpenContent.push(new AST.ContentNode(" />"));
          return [tagOpenContent];
        } else {
          tagOpenContent.push(new AST.ContentNode(">"));

          return [tagOpenContent, new AST.ContentNode("</" + tagName + ">")];
        }
      };

      var options = arguments.length > 1 ? arguments[1] : {},
          peg$FAILED = {},
          peg$startRuleFunctions = { start: peg$parsestart },
          peg$startRuleFunction = peg$parsestart,
          peg$c0 = peg$FAILED,
          peg$c1 = null,
          peg$c2 = [],
          peg$c3 = function (c) {
        return c;
      },
          peg$c4 = function (c, i) {
        var programNode = astDelegate.createProgramNode(c);
        if (i) {
          programNode.inverse = astDelegate.createProgramNode(i);
        }
        return programNode;
      },
          peg$c5 = "=",
          peg$c6 = { type: "literal", value: "=", description: "\"=\"" },
          peg$c7 = "else",
          peg$c8 = { type: "literal", value: "else", description: "\"else\"" },
          peg$c9 = function (statements) {
        // Coalesce all adjacent ContentNodes into one.

        var compressedStatements = [];
        var buffer = [];

        for (var i = 0; i < statements.length; ++i) {
          var nodes = statements[i];

          for (var j = 0; j < nodes.length; ++j) {
            var node = nodes[j];
            if (node.type === "content") {
              if (node.string) {
                // Ignore empty strings (comments).
                buffer.push(node.string);
              }
              continue;
            }

            // Flush content if present.
            if (buffer.length) {
              compressedStatements.push(new AST.ContentNode(buffer.join("")));
              buffer = [];
            }
            compressedStatements.push(node);
          }
        }

        if (buffer.length) {
          compressedStatements.push(new AST.ContentNode(buffer.join("")));
        }

        return compressedStatements;
      },
          peg$c10 = { type: "other", description: "BeginStatement" },
          peg$c11 = { type: "other", description: "ContentStatement" },
          peg$c12 = function () {
        return [];
      },
          peg$c13 = ">",
          peg$c14 = { type: "literal", value: ">", description: "\">\"" },
          peg$c15 = function (n, params) {
        return [new AST.PartialNode(n, params[0], undefined, {})];
      },
          peg$c16 = /^[a-zA-Z0-9_$-\/]/,
          peg$c17 = { type: "class", value: "[a-zA-Z0-9_$-\\/]", description: "[a-zA-Z0-9_$-\\/]" },
          peg$c18 = function (s) {
        return new AST.PartialNameNode(new AST.StringNode(s));
      },
          peg$c19 = function (m) {
        return [m];
      },
          peg$c20 = "/",
          peg$c21 = { type: "literal", value: "/", description: "\"/\"" },
          peg$c22 = void 0,
          peg$c23 = /^[A-Z]/,
          peg$c24 = { type: "class", value: "[A-Z]", description: "[A-Z]" },
          peg$c25 = function (ret) {
        return astDelegate.capitalizedLineStarterMustache(ret);
      },
          peg$c26 = " ",
          peg$c27 = { type: "literal", value: " ", description: "\" \"" },
          peg$c28 = function (ret, multilineContent) {
        if (multilineContent) {
          multilineContent = multilineContent[1];
          for (var i = 0, len = multilineContent.length; i < len; ++i) {
            ret.push(new AST.ContentNode(" "));
            ret = ret.concat(multilineContent[i]);
          }
        }
        return ret;
      },
          peg$c29 = function (c) {
        return c;
      },
          peg$c30 = function (m) {
        return [m];
      },
          peg$c31 = "]",
          peg$c32 = { type: "literal", value: "]", description: "\"]\"" },
          peg$c33 = function (h) {
        return h;
      },
          peg$c34 = function (h, nested) {
        // h is [[open tag content], closing tag ContentNode]
        var ret = h[0];
        if (nested) {
          ret = ret.concat(nested);
        }

        // Push the closing tag ContentNode if it exists (self-closing if not)
        if (h[1]) {
          ret.push(h[1]);
        }

        return ret;
      },
          peg$c35 = function (mustacheNode, nestedContentProgramNode) {
        if (!nestedContentProgramNode) {
          return mustacheNode;
        }

        var strip = {
          left: false,
          right: false
        };

        var block = new AST.BlockNode(mustacheNode, nestedContentProgramNode, nestedContentProgramNode.inverse, strip);

        block.path = mustacheNode.id;
        return block;
      },
          peg$c36 = ": ",
          peg$c37 = { type: "literal", value: ": ", description: "\": \"" },
          peg$c38 = function (statements) {
        return astDelegate.createProgramNode(statements, []);
      },
          peg$c39 = function (block) {
        return block && block[2];
      },
          peg$c40 = function (block) {
        return block;
      },
          peg$c41 = function (e, ret) {
        var mustache = ret.mustache || ret;
        mustache.escaped = e;
        return ret;
      },
          peg$c42 = "[",
          peg$c43 = { type: "literal", value: "[", description: "\"[\"" },
          peg$c44 = function (isPartial, sexpr) {
        if (isPartial) {
          var n = new AST.PartialNameNode(new AST.StringNode(sexpr.id.string));
          return new AST.PartialNode(n, sexpr.params[0], undefined, {});
        }

        var mustacheNode = astDelegate.createMustacheNode(sexpr, null, true);

        var tm = sexpr.id._emblemSuffixModifier;
        if (tm === "!") {
          return astDelegate.unshiftParam(mustacheNode, "unbound");
        } else if (tm === "?") {
          return astDelegate.unshiftParam(mustacheNode, "if");
        } else if (tm === "^") {
          return astDelegate.unshiftParam(mustacheNode, "unless");
        }
        return mustacheNode;
      },
          peg$c45 = " [",
          peg$c46 = { type: "literal", value: " [", description: "\" [\"" },
          peg$c47 = function (path, params, hash) {
        return parseSexpr(path, params, hash);
      },
          peg$c48 = function (t) {
        return ["tagName", t];
      },
          peg$c49 = function (i) {
        return ["elementId", i];
      },
          peg$c50 = function (c) {
        return ["class", c];
      },
          peg$c51 = function (a) {
        return a;
      },
          peg$c52 = function (id, classes) {
        return [id, classes];
      },
          peg$c53 = function (classes) {
        return [null, classes];
      },
          peg$c54 = function (p) {
        return p;
      },
          peg$c55 = function (a) {
        return a;
      },
          peg$c56 = function (h) {
        return new AST.HashNode(h);
      },
          peg$c57 = { type: "other", description: "PathIdent" },
          peg$c58 = "..",
          peg$c59 = { type: "literal", value: "..", description: "\"..\"" },
          peg$c60 = ".",
          peg$c61 = { type: "literal", value: ".", description: "\".\"" },
          peg$c62 = /^[a-zA-Z0-9_$\-!?\^@]/,
          peg$c63 = { type: "class", value: "[a-zA-Z0-9_$\\-!?\\^@]", description: "[a-zA-Z0-9_$\\-!?\\^@]" },
          peg$c64 = function (s) {
        return s;
      },
          peg$c65 = /^[^\]]/,
          peg$c66 = { type: "class", value: "[^\\]]", description: "[^\\]]" },
          peg$c67 = function (segmentLiteral) {
        return segmentLiteral;
      },
          peg$c68 = { type: "other", description: "Key" },
          peg$c69 = ":",
          peg$c70 = { type: "literal", value: ":", description: "\":\"" },
          peg$c71 = function (h) {
        return [h[0], h[2]];
      },
          peg$c72 = function (h) {
        return [h[0], h[2]];
      },
          peg$c73 = function (s) {
        s.isHelper = true;return s;
      },
          peg$c74 = function (s, p) {
        return { part: p, separator: s };
      },
          peg$c75 = function (first, tail) {
        var ret = [{ part: first }];
        for (var i = 0; i < tail.length; ++i) {
          ret.push(tail[i]);
        }
        return ret;
      },
          peg$c76 = { type: "other", description: "PathSeparator" },
          peg$c77 = /^[\/.]/,
          peg$c78 = { type: "class", value: "[\\/.]", description: "[\\/.]" },
          peg$c79 = function (v) {
        var last = v[v.length - 1];
        var idNode;

        // Support for data keywords that are prefixed with @ in the each
        // block helper such as @index, @key, @first, @last
        if (last.part.charAt(0) === "@") {
          last.part = last.part.slice(1);
          idNode = new AST.IdNode(v);
          var dataNode = new AST.DataNode(idNode);
          return dataNode;
        }

        var match;
        var suffixModifier;
        if (match = last.part.match(/[!\?\^]$/)) {
          suffixModifier = match[0];
          last.part = last.part.slice(0, -1);
        }

        idNode = new AST.IdNode(v);
        idNode._emblemSuffixModifier = suffixModifier;

        return idNode;
      },
          peg$c80 = function (v) {
        return new AST.StringNode(v);
      },
          peg$c81 = function (v) {
        return new AST.NumberNode(v);
      },
          peg$c82 = function (v) {
        return new AST.BooleanNode(v);
      },
          peg$c83 = { type: "other", description: "Boolean" },
          peg$c84 = "true",
          peg$c85 = { type: "literal", value: "true", description: "\"true\"" },
          peg$c86 = "false",
          peg$c87 = { type: "literal", value: "false", description: "\"false\"" },
          peg$c88 = { type: "other", description: "Integer" },
          peg$c89 = "-",
          peg$c90 = { type: "literal", value: "-", description: "\"-\"" },
          peg$c91 = /^[0-9]/,
          peg$c92 = { type: "class", value: "[0-9]", description: "[0-9]" },
          peg$c93 = function (s) {
        return parseInt(s);
      },
          peg$c94 = "\"",
          peg$c95 = { type: "literal", value: "\"", description: "\"\\\"\"" },
          peg$c96 = "'",
          peg$c97 = { type: "literal", value: "'", description: "\"'\"" },
          peg$c98 = function (p) {
        return p[1];
      },
          peg$c99 = /^[^"}]/,
          peg$c100 = { type: "class", value: "[^\"}]", description: "[^\"}]" },
          peg$c101 = /^[^'}]/,
          peg$c102 = { type: "class", value: "[^'}]", description: "[^'}]" },
          peg$c103 = /^[A-Za-z]/,
          peg$c104 = { type: "class", value: "[A-Za-z]", description: "[A-Za-z]" },
          peg$c105 = function (ind, nodes, w) {
        nodes.unshift(new AST.ContentNode(ind));

        for (var i = 0; i < w.length; ++i) {
          nodes.push(new AST.ContentNode(ind));
          nodes = nodes.concat(w[i]);
          nodes.push("\n");
        }
        return nodes;
      },
          peg$c106 = /^[|`']/,
          peg$c107 = { type: "class", value: "[|`']", description: "[|`']" },
          peg$c108 = "<",
          peg$c109 = { type: "literal", value: "<", description: "\"<\"" },
          peg$c110 = function () {
        return "<";
      },
          peg$c111 = function (s, nodes, indentedNodes) {
        var i;

        if (nodes.length || !indentedNodes) {
          nodes.push("\n");
        }

        if (indentedNodes) {
          indentedNodes = indentedNodes[1];
          for (i = 0; i < indentedNodes.length; ++i) {
            nodes = nodes.concat(indentedNodes[i]);
            nodes.push("\n");
          }
        }

        var ret = [];
        var strip = s !== "`";
        for (i = 0; i < nodes.length; ++i) {
          var node = nodes[i];
          if (node === "\n") {
            if (!strip) {
              ret.push(new AST.ContentNode("\n"));
            }
          } else {
            ret.push(node);
          }
        }

        if (s === "'") {
          ret.push(new AST.ContentNode(" "));
        }
        return ret;
      },
          peg$c112 = function (first, tail) {
        return textNodesResult(first, tail);
      },
          peg$c113 = function (first, tail) {
        return textNodesResult(first, tail);
      },
          peg$c114 = "{",
          peg$c115 = { type: "literal", value: "{", description: "\"{\"" },
          peg$c116 = /^[^}]/,
          peg$c117 = { type: "class", value: "[^}]", description: "[^}]" },
          peg$c118 = function (text) {
        // Force interpretation as mustache.
        // TODO: change to just parse with a specific rule?
        text = "=" + text;
        return astDelegate.recursiveParse(text).statements[0];
      },
          peg$c119 = function (m) {
        m.escaped = true;return m;
      },
          peg$c120 = function (m) {
        m.escaped = false;return m;
      },
          peg$c121 = function (a) {
        return new AST.ContentNode(a);
      },
          peg$c122 = { type: "any", description: "any character" },
          peg$c123 = { type: "other", description: "SingleMustacheOpen" },
          peg$c124 = { type: "other", description: "DoubleMustacheOpen" },
          peg$c125 = "{{",
          peg$c126 = { type: "literal", value: "{{", description: "\"{{\"" },
          peg$c127 = { type: "other", description: "TripleMustacheOpen" },
          peg$c128 = "{{{",
          peg$c129 = { type: "literal", value: "{{{", description: "\"{{{\"" },
          peg$c130 = { type: "other", description: "SingleMustacheClose" },
          peg$c131 = "}",
          peg$c132 = { type: "literal", value: "}", description: "\"}\"" },
          peg$c133 = { type: "other", description: "DoubleMustacheClose" },
          peg$c134 = "}}",
          peg$c135 = { type: "literal", value: "}}", description: "\"}}\"" },
          peg$c136 = { type: "other", description: "TripleMustacheClose" },
          peg$c137 = "}}}",
          peg$c138 = { type: "literal", value: "}}}", description: "\"}}}\"" },
          peg$c139 = { type: "other", description: "SubexpressionOpen" },
          peg$c140 = "(",
          peg$c141 = { type: "literal", value: "(", description: "\"(\"" },
          peg$c142 = { type: "other", description: "SubexpressionClose" },
          peg$c143 = ")",
          peg$c144 = { type: "literal", value: ")", description: "\")\"" },
          peg$c145 = { type: "other", description: "InterpolationOpen" },
          peg$c146 = "#{",
          peg$c147 = { type: "literal", value: "#{", description: "\"#{\"" },
          peg$c148 = { type: "other", description: "InterpolationClose" },
          peg$c149 = "==",
          peg$c150 = { type: "literal", value: "==", description: "\"==\"" },
          peg$c151 = function () {
        return false;
      },
          peg$c152 = function () {
        return true;
      },
          peg$c153 = function (h, s) {
        return h || s;
      },
          peg$c154 = function (h, inTagMustaches, fullAttributes) {
        return parseInHtml(h, inTagMustaches, fullAttributes);
      },
          peg$c155 = function (s) {
        return { shorthand: s, id: true };
      },
          peg$c156 = function (s) {
        return { shorthand: s };
      },
          peg$c157 = function (shorthands) {
        var id, classes = [];
        for (var i = 0, len = shorthands.length; i < len; ++i) {
          var shorthand = shorthands[i];
          if (shorthand.id) {
            id = shorthand.shorthand;
          } else {
            classes.push(shorthand.shorthand);
          }
        }

        return [id, classes];
      },
          peg$c158 = function (a) {
        if (a.length) {
          return [new AST.ContentNode(" ")].concat(a);
        } else {
          return [];
        }
      },
          peg$c159 = /^[A-Za-z.0-9_\-]/,
          peg$c160 = { type: "class", value: "[A-Za-z.0-9_\\-]", description: "[A-Za-z.0-9_\\-]" },
          peg$c161 = function (id) {
        return astDelegate.createMustacheNode([id], null, true);
      },
          peg$c162 = function (event, mustacheNode) {
        // Replace the IdNode with a StringNode to prevent unquoted action deprecation warnings
        mustacheNode.id = new AST.StringNode(mustacheNode.id.string);

        // Unshift the action helper and augment the hash
        return [astDelegate.unshiftParam(mustacheNode, "action", [["on", new AST.StringNode(event)]])];
      },
          peg$c163 = function (key, boolValue) {
        if (boolValue === "true") {
          return [new AST.ContentNode(key)];
        } else {
          return [];
        }
      },
          peg$c164 = function (value) {
        return value.replace(/ *$/, "");
      },
          peg$c165 = "!",
          peg$c166 = { type: "literal", value: "!", description: "\"!\"" },
          peg$c167 = function (key, value) {
        return astDelegate.allowBoundAttributes;
      },
          peg$c168 = function (key, value) {
        var hashNode = new AST.HashNode([[key, new AST.StringNode(value)]]);
        var params = [new AST.IdNode([{ part: "bind-attr" }])];
        var mustacheNode = astDelegate.createMustacheNode(params, hashNode);

        return [mustacheNode];
      },
          peg$c169 = function (key, id) {
        return astDelegate.rawMustacheAttribute(key, id);
      },
          peg$c170 = function (key, nodes) {
        var result = [new AST.ContentNode(key + "=" + "\"")].concat(nodes);
        return result.concat([new AST.ContentNode("\"")]);
      },
          peg$c171 = "_",
          peg$c172 = { type: "literal", value: "_", description: "\"_\"" },
          peg$c173 = "%",
          peg$c174 = { type: "literal", value: "%", description: "\"%\"" },
          peg$c175 = "#",
          peg$c176 = { type: "literal", value: "#", description: "\"#\"" },
          peg$c177 = function (c) {
        return c;
      },
          peg$c178 = { type: "other", description: "CSSIdentifier" },
          peg$c179 = /^[_a-zA-Z0-9\-]/,
          peg$c180 = { type: "class", value: "[_a-zA-Z0-9\\-]", description: "[_a-zA-Z0-9\\-]" },
          peg$c181 = /^[_a-zA-Z]/,
          peg$c182 = { type: "class", value: "[_a-zA-Z]", description: "[_a-zA-Z]" },
          peg$c183 = /^[\x80-\xFF]/,
          peg$c184 = { type: "class", value: "[\\x80-\\xFF]", description: "[\\x80-\\xFF]" },
          peg$c185 = { type: "other", description: "KnownHTMLTagName" },
          peg$c186 = function (t) {
        return !!KNOWN_TAGS[t];
      },
          peg$c187 = function (t) {
        return t;
      },
          peg$c188 = { type: "other", description: "a JS event" },
          peg$c189 = function (t) {
        return !!KNOWN_EVENTS[t];
      },
          peg$c190 = { type: "other", description: "INDENT" },
          peg$c191 = "",
          peg$c192 = { type: "literal", value: "", description: "\"\\uEFEF\"" },
          peg$c193 = function () {
        return "";
      },
          peg$c194 = { type: "other", description: "DEDENT" },
          peg$c195 = "",
          peg$c196 = { type: "literal", value: "", description: "\"\\uEFFE\"" },
          peg$c197 = { type: "other", description: "Unmatched DEDENT" },
          peg$c198 = "",
          peg$c199 = { type: "literal", value: "", description: "\"\\uEFEE\"" },
          peg$c200 = { type: "other", description: "LineEnd" },
          peg$c201 = "\r",
          peg$c202 = { type: "literal", value: "\r", description: "\"\\r\"" },
          peg$c203 = "",
          peg$c204 = { type: "literal", value: "", description: "\"\\uEFFF\"" },
          peg$c205 = "\n",
          peg$c206 = { type: "literal", value: "\n", description: "\"\\n\"" },
          peg$c207 = { type: "other", description: "ANYDEDENT" },
          peg$c208 = { type: "other", description: "RequiredWhitespace" },
          peg$c209 = { type: "other", description: "OptionalWhitespace" },
          peg$c210 = { type: "other", description: "InlineWhitespace" },
          peg$c211 = /^[ \t]/,
          peg$c212 = { type: "class", value: "[ \\t]", description: "[ \\t]" },
          peg$currPos = 0,
          peg$reportedPos = 0,
          peg$cachedPos = 0,
          peg$cachedPosDetails = { line: 1, column: 1, seenCR: false },
          peg$maxFailPos = 0,
          peg$maxFailExpected = [],
          peg$silentFails = 0,
          peg$result;

      if ("startRule" in options) {
        if (!(options.startRule in peg$startRuleFunctions)) {
          throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
        }

        peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
      }




      var astDelegate = options.astDelegate;
      var AST = astDelegate.AST;

      var SELF_CLOSING_TAG = {
        area: true,
        base: true,
        br: true,
        col: true,
        command: true,
        embed: true,
        hr: true,
        img: true,
        input: true,
        keygen: true,
        link: true,
        meta: true,
        param: true,
        source: true,
        track: true,
        wbr: true
      };

      var KNOWN_TAGS = {
        figcaption: true, blockquote: true, plaintext: true, textarea: true, progress: true,
        optgroup: true, noscript: true, noframes: true, frameset: true, fieldset: true,
        datalist: true, colgroup: true, basefont: true, summary: true, section: true,
        marquee: true, listing: true, isindex: true, details: true, command: true,
        caption: true, bgsound: true, article: true, address: true, acronym: true,
        strong: true, strike: true, spacer: true, source: true, select: true,
        script: true, output: true, option: true, object: true, legend: true,
        keygen: true, iframe: true, hgroup: true, header: true, footer: true,
        figure: true, center: true, canvas: true, button: true, applet: true, video: true,
        track: true, title: true, thead: true, tfoot: true, tbody: true, table: true,
        style: true, small: true, param: true, meter: true, label: true, input: true,
        frame: true, embed: true, blink: true, audio: true, aside: true, time: true,
        span: true, samp: true, ruby: true, nobr: true, meta: true, menu: true,
        mark: true, main: true, link: true, html: true, head: true, form: true,
        font: true, data: true, code: true, cite: true, body: true, base: true,
        area: true, abbr: true, xmp: true, wbr: true, "var": true, sup: true,
        sub: true, pre: true, nav: true, map: true, kbd: true, ins: true,
        img: true, div: true, dir: true, dfn: true, del: true, col: true,
        big: true, bdo: true, bdi: true, ul: true, tt: true, tr: true, th: true, td: true,
        rt: true, rp: true, ol: true, li: true, hr: true, h6: true, h5: true, h4: true,
        h3: true, h2: true, h1: true, em: true, dt: true, dl: true, dd: true, br: true,
        u: true, s: true, q: true, p: true, i: true, b: true, a: true
      };

      var KNOWN_EVENTS = {
        touchStart: true, touchMove: true, touchEnd: true, touchCancel: true,
        keyDown: true, keyUp: true, keyPress: true, mouseDown: true, mouseUp: true,
        contextMenu: true, click: true, doubleClick: true, mouseMove: true,
        focusIn: true, focusOut: true, mouseEnter: true, mouseLeave: true,
        submit: true, input: true, change: true, dragStart: true,
        drag: true, dragEnter: true, dragLeave: true,
        dragOver: true, drop: true, dragEnd: true
      };




      peg$result = peg$startRuleFunction();

      if (peg$result !== peg$FAILED && peg$currPos === input.length) {
        return peg$result;
      } else {
        if (peg$result !== peg$FAILED && peg$currPos < input.length) {
          peg$fail({ type: "end", description: "end of input" });
        }

        throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);
      }
    };

    peg$subclass(SyntaxError, Error);

    return {
      SyntaxError: SyntaxError,
      parse: parse
    };
  })();
  var $$parser$$parse = $$parser$$Parser.parse,
      $$parser$$ParserSyntaxError = $$parser$$Parser.SyntaxError;
  var $$parser$$default = $$parser$$parse;
  var $$parser$delegate$base$$ParserDelegate = (function () {
    function $$parser$delegate$base$$ParserDelegate(AST, parse) {
      _get(Object.getPrototypeOf($$parser$delegate$base$$ParserDelegate.prototype), "constructor", this).call(this, AST, parse);
    }

    _prototypeProperties($$parser$delegate$base$$ParserDelegate, null, {
      capitalizedLineStarterMustache: {
        value: function capitalizedLineStarterMustache(node) {
          if (node.mustache) {
            node.mustache = this.handleCapitalizedMustache(node.mustache);
            return node;
          } else {
            return this.handleCapitalizedMustache(node);
          }
        },
        writable: true,
        enumerable: true,
        configurable: true
      },
      handleCapitalizedMustache: {
        value: function handleCapitalizedMustache(mustache) {
          return mustache;
        },
        writable: true,
        enumerable: true,
        configurable: true
      },
      rawMustacheAttribute: {
        value: function rawMustacheAttribute(key, id) {
          var mustacheNode = this.createMustacheNode([id], null, true);

          mustacheNode = this.handleUnboundSuffix(mustacheNode, id);

          return [new this.AST.ContentNode(key + "=" + "\""), mustacheNode, new this.AST.ContentNode("\"")];
        },
        writable: true,
        enumerable: true,
        configurable: true
      },
      handleUnboundSuffix: {
        value: function handleUnboundSuffix(mustacheNode, id) {
          return mustacheNode;
        },
        writable: true,
        enumerable: true,
        configurable: true
      },
      unshiftParam: {

        // Returns a new MustacheNode with a new preceding param (id).
        value: function unshiftParam(mustacheNode, helperName, newHashPairs) {
          var hash = mustacheNode.hash;

          // Merge hash.
          if (newHashPairs) {
            hash = hash || new this.AST.HashNode([]);

            for (var i = 0; i < newHashPairs.length; ++i) {
              hash.pairs.push(newHashPairs[i]);
            }
          }

          var params = [mustacheNode.id].concat(mustacheNode.params);
          params.unshift(new this.AST.IdNode([{ part: helperName }]));
          return this.createMustacheNode(params, hash, mustacheNode.escaped);
        },
        writable: true,
        enumerable: true,
        configurable: true
      },
      createMustacheNode: {
        value: function createMustacheNode(params, hash, escaped) {
          var open = escaped ? "{{" : "{{{";
          return new this.AST.MustacheNode(params, hash, open, { left: false, right: false });
        },
        writable: true,
        enumerable: true,
        configurable: true
      },
      createProgramNode: {
        value: function createProgramNode(statements, inverse) {
          return new this.AST.ProgramNode(statements, { left: false, right: false }, inverse, null);
        },
        writable: true,
        enumerable: true,
        configurable: true
      }
    });

    return $$parser$delegate$base$$ParserDelegate;
  })();

  var $$parser$delegate$base$$default = $$parser$delegate$base$$ParserDelegate;

  var $$parser$delegate$ember$$EmberParserDelegate = (function ($$parser$delegate$base$$default) {
    function $$parser$delegate$ember$$EmberParserDelegate(AST, parse) {
      this.AST = AST;
      this.recursiveParse = parse;
    }

    _inherits($$parser$delegate$ember$$EmberParserDelegate, $$parser$delegate$base$$default);

    _prototypeProperties($$parser$delegate$ember$$EmberParserDelegate, null, {
      handleCapitalizedMustache: {
        value: function handleCapitalizedMustache(mustache) {
          return this.unshiftParam(mustache, "view");
        },
        writable: true,
        enumerable: true,
        configurable: true
      },
      handleUnboundSuffix: {
        value: function handleUnboundSuffix(mustacheNode, id) {
          if (id._emblemSuffixModifier === "!") {
            return this.unshiftParam(mustacheNode, "unbound");
          } else {
            return mustacheNode;
          }
        },
        writable: true,
        enumerable: true,
        configurable: true
      }
    });

    return $$parser$delegate$ember$$EmberParserDelegate;
  })($$parser$delegate$base$$default);

  var $$parser$delegate$ember$$default = $$parser$delegate$ember$$EmberParserDelegate;

  if (typeof window !== "undefined" && window !== null) {
    var $$bootstrap$$ENV = window.ENV || (window.ENV = {});
    $$bootstrap$$ENV.EMBER_LOAD_HOOKS = $$bootstrap$$ENV.EMBER_LOAD_HOOKS || {};
    $$bootstrap$$ENV.EMBER_LOAD_HOOKS.application = $$bootstrap$$ENV.EMBER_LOAD_HOOKS.application || [];
    $$bootstrap$$ENV.EMBER_LOAD_HOOKS.application.push($$bootstrap$$compileScriptTags);
    $$bootstrap$$ENV.EMBER_LOAD_HOOKS["Ember.Application"] = $$bootstrap$$ENV.EMBER_LOAD_HOOKS["Ember.Application"] || [];
    $$bootstrap$$ENV.EMBER_LOAD_HOOKS["Ember.Application"].push(function (Application) {
      if (Application.initializer) {
        return Application.initializer({
          name: "emblemDomTemplates",
          before: "registerComponentLookup",
          initialize: $$bootstrap$$compileScriptTags
        });
      } else {
        return window.Ember.onLoad("application", $$bootstrap$$compileScriptTags);
      }
    });
  }

  var emblem$$default = {
    Parser: $$parser$$default,
    VERSION: "0.4.0"
  };

  module("Parsing into AST", {
    setup: function () {}
  });

  test("single char", function () {
    deepEqual(parse("| a"), {
      type: "program",
      children: [{
        type: "text",
        content: "a"
      }]
    });
  });

  module("The match DSL", {
    setup: function () {}
  });

  test("wat", function () {
    ok(emblem$$default, "wat");
  });
}).call(this);

//# sourceMappingURL=emblem-test-bundle.js.map
module("JSHint - tests");
test("tests/emblem-test.js should pass jshint", function () {
  ok(true, "tests/emblem-test.js should pass jshint.");
});