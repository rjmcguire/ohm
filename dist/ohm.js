(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ohm = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ohm = require('..');
module.exports = ohm.makeRecipe(["grammar",{"source":"BuiltInRules {\n\n  alnum  (an alpha-numeric character)\n    = letter\n    | digit\n\n  letter  (a letter)\n    = lower\n    | upper\n    | unicodeLtmo\n\n  digit  (a digit)\n    = \"0\"..\"9\"\n\n  hexDigit  (a hexadecimal digit)\n    = digit\n    | \"a\"..\"f\"\n    | \"A\"..\"F\"\n\n  ListOf<elem, sep>\n    = NonemptyListOf<elem, sep>\n    | EmptyListOf<elem, sep>\n\n  NonemptyListOf<elem, sep>\n    = elem (sep elem)*\n\n  EmptyListOf<elem, sep>\n    = /* nothing */\n\n  listOf<elem, sep>\n    = nonemptyListOf<elem, sep>\n    | emptyListOf<elem, sep>\n\n  nonemptyListOf<elem, sep>\n    = elem (sep elem)*\n\n  emptyListOf<elem, sep>\n    = /* nothing */\n\n}"},"BuiltInRules",null,null,{"alnum":["define",{"sourceInterval":[18,78]},"an alpha-numeric character",[],["alt",{"sourceInterval":[60,78]},["app",{"sourceInterval":[60,66]},"letter",[]],["app",{"sourceInterval":[73,78]},"digit",[]]]],"letter":["define",{"sourceInterval":[82,142]},"a letter",[],["alt",{"sourceInterval":[107,142]},["app",{"sourceInterval":[107,112]},"lower",[]],["app",{"sourceInterval":[119,124]},"upper",[]],["app",{"sourceInterval":[131,142]},"unicodeLtmo",[]]]],"digit":["define",{"sourceInterval":[146,177]},"a digit",[],["range",{"sourceInterval":[169,177]},"0","9"]],"hexDigit":["define",{"sourceInterval":[181,254]},"a hexadecimal digit",[],["alt",{"sourceInterval":[219,254]},["app",{"sourceInterval":[219,224]},"digit",[]],["range",{"sourceInterval":[231,239]},"a","f"],["range",{"sourceInterval":[246,254]},"A","F"]]],"ListOf":["define",{"sourceInterval":[258,336]},null,["elem","sep"],["alt",{"sourceInterval":[282,336]},["app",{"sourceInterval":[282,307]},"NonemptyListOf",[["param",{},0],["param",{},1]]],["app",{"sourceInterval":[314,336]},"EmptyListOf",[["param",{},0],["param",{},1]]]]],"NonemptyListOf":["define",{"sourceInterval":[340,388]},null,["elem","sep"],["seq",{"sourceInterval":[372,388]},["param",{},0],["star",{"sourceInterval":[377,388]},["seq",{"sourceInterval":[378,386]},["param",{},1],["param",{},0]]]]],"EmptyListOf":["define",{"sourceInterval":[392,434]},null,["elem","sep"],["seq",{"sourceInterval":[438,438]}]],"listOf":["define",{"sourceInterval":[438,516]},null,["elem","sep"],["alt",{"sourceInterval":[462,516]},["app",{"sourceInterval":[462,487]},"nonemptyListOf",[["param",{},0],["param",{},1]]],["app",{"sourceInterval":[494,516]},"emptyListOf",[["param",{},0],["param",{},1]]]]],"nonemptyListOf":["define",{"sourceInterval":[520,568]},null,["elem","sep"],["seq",{"sourceInterval":[552,568]},["param",{},0],["star",{"sourceInterval":[557,568]},["seq",{"sourceInterval":[558,566]},["param",{},1],["param",{},0]]]]],"emptyListOf":["define",{"sourceInterval":[572,614]},null,["elem","sep"],["seq",{"sourceInterval":[616,616]}]]}]);

},{"..":41}],2:[function(require,module,exports){
var ohm = require('..');
module.exports = ohm.makeRecipe(["grammar",{"source":"Ohm {\n\n  Grammars\n    = Grammar*\n\n  Grammar\n    = ident SuperGrammar? \"{\" Rule* \"}\"\n\n  SuperGrammar\n    = \"<:\" ident\n\n  Rule\n    = ident Formals? ruleDescr? \"=\"  RuleBody  -- define\n    | ident Formals?            \":=\" RuleBody  -- override\n    | ident Formals?            \"+=\" RuleBody  -- extend\n\n  RuleBody\n    = \"|\"? NonemptyListOf<TopLevelTerm, \"|\">\n\n  TopLevelTerm\n    = Seq caseName  -- inline\n    | Seq\n\n  Formals\n    = \"<\" ListOf<ident, \",\"> \">\"\n\n  Params\n    = \"<\" ListOf<Seq, \",\"> \">\"\n\n  Alt\n    = NonemptyListOf<Seq, \"|\">\n\n  Seq\n    = Iter*\n\n  Iter\n    = Pred \"*\"  -- star\n    | Pred \"+\"  -- plus\n    | Pred \"?\"  -- opt\n    | Pred\n\n  Pred\n    = \"~\" Lex  -- not\n    | \"&\" Lex  -- lookahead\n    | Lex\n\n  Lex\n    = \"#\" Base  -- lex\n    | Base\n\n  Base\n    = ident Params? ~(ruleDescr? \"=\" | \":=\" | \"+=\")  -- application\n    | terminal \"..\" terminal                         -- range\n    | terminal                                       -- terminal\n    | \"(\" Alt \")\"                                    -- paren\n\n  ruleDescr  (a rule description)\n    = \"(\" ruleDescrText \")\"\n\n  ruleDescrText\n    = (~\")\" any)*\n\n  caseName\n    = \"--\" (~\"\\n\" space)* name (~\"\\n\" space)* (\"\\n\" | &\"}\")\n\n  name  (a name)\n    = nameFirst nameRest*\n\n  nameFirst\n    = \"_\"\n    | letter\n\n  nameRest\n    = \"_\"\n    | alnum\n\n  ident  (an identifier)\n    = name\n\n  terminal\n    = \"\\\"\" terminalChar* \"\\\"\"\n\n  terminalChar\n    = escapeChar\n    | ~\"\\\\\" ~\"\\\"\" ~\"\\n\" any\n\n  escapeChar  (an escape sequence)\n    = \"\\\\\\\\\"                                     -- backslash\n    | \"\\\\\\\"\"                                     -- doubleQuote\n    | \"\\\\\\'\"                                     -- singleQuote\n    | \"\\\\b\"                                      -- backspace\n    | \"\\\\n\"                                      -- lineFeed\n    | \"\\\\r\"                                      -- carriageReturn\n    | \"\\\\t\"                                      -- tab\n    | \"\\\\u\" hexDigit hexDigit hexDigit hexDigit  -- unicodeEscape\n    | \"\\\\x\" hexDigit hexDigit                    -- hexEscape\n\n  space\n   += comment\n\n  comment\n    = \"//\" (~\"\\n\" any)* \"\\n\"  -- singleLine\n    | \"/*\" (~\"*/\" any)* \"*/\"  -- multiLine\n\n  tokens = token*\n\n  token = caseName | comment | ident | operator | punctuation | terminal | any\n\n  operator = \"<:\" | \"=\" | \":=\" | \"+=\" | \"*\" | \"+\" | \"?\" | \"~\" | \"&\"\n\n  punctuation = \"<\" | \">\" | \",\" | \"--\"\n}"},"Ohm",null,"Grammars",{"Grammars":["define",{"sourceInterval":[9,32]},null,[],["star",{"sourceInterval":[24,32]},["app",{"sourceInterval":[24,31]},"Grammar",[]]]],"Grammar":["define",{"sourceInterval":[36,83]},null,[],["seq",{"sourceInterval":[50,83]},["app",{"sourceInterval":[50,55]},"ident",[]],["opt",{"sourceInterval":[56,69]},["app",{"sourceInterval":[56,68]},"SuperGrammar",[]]],["terminal",{"sourceInterval":[70,73]},"{"],["star",{"sourceInterval":[74,79]},["app",{"sourceInterval":[74,78]},"Rule",[]]],["terminal",{"sourceInterval":[80,83]},"}"]]],"SuperGrammar":["define",{"sourceInterval":[87,116]},null,[],["seq",{"sourceInterval":[106,116]},["terminal",{"sourceInterval":[106,110]},"<:"],["app",{"sourceInterval":[111,116]},"ident",[]]]],"Rule_define":["define",{"sourceInterval":[131,181]},null,[],["seq",{"sourceInterval":[131,170]},["app",{"sourceInterval":[131,136]},"ident",[]],["opt",{"sourceInterval":[137,145]},["app",{"sourceInterval":[137,144]},"Formals",[]]],["opt",{"sourceInterval":[146,156]},["app",{"sourceInterval":[146,155]},"ruleDescr",[]]],["terminal",{"sourceInterval":[157,160]},"="],["app",{"sourceInterval":[162,170]},"RuleBody",[]]]],"Rule_override":["define",{"sourceInterval":[188,240]},null,[],["seq",{"sourceInterval":[188,227]},["app",{"sourceInterval":[188,193]},"ident",[]],["opt",{"sourceInterval":[194,202]},["app",{"sourceInterval":[194,201]},"Formals",[]]],["terminal",{"sourceInterval":[214,218]},":="],["app",{"sourceInterval":[219,227]},"RuleBody",[]]]],"Rule_extend":["define",{"sourceInterval":[247,297]},null,[],["seq",{"sourceInterval":[247,286]},["app",{"sourceInterval":[247,252]},"ident",[]],["opt",{"sourceInterval":[253,261]},["app",{"sourceInterval":[253,260]},"Formals",[]]],["terminal",{"sourceInterval":[273,277]},"+="],["app",{"sourceInterval":[278,286]},"RuleBody",[]]]],"Rule":["define",{"sourceInterval":[120,297]},null,[],["alt",{"sourceInterval":[131,297]},["app",{"sourceInterval":[131,170]},"Rule_define",[]],["app",{"sourceInterval":[188,227]},"Rule_override",[]],["app",{"sourceInterval":[247,286]},"Rule_extend",[]]]],"RuleBody":["define",{"sourceInterval":[301,354]},null,[],["seq",{"sourceInterval":[316,354]},["opt",{"sourceInterval":[316,320]},["terminal",{"sourceInterval":[316,319]},"|"]],["app",{"sourceInterval":[321,354]},"NonemptyListOf",[["app",{"sourceInterval":[336,348]},"TopLevelTerm",[]],["terminal",{"sourceInterval":[350,353]},"|"]]]]],"TopLevelTerm_inline":["define",{"sourceInterval":[377,400]},null,[],["seq",{"sourceInterval":[377,389]},["app",{"sourceInterval":[377,380]},"Seq",[]],["app",{"sourceInterval":[381,389]},"caseName",[]]]],"TopLevelTerm":["define",{"sourceInterval":[358,410]},null,[],["alt",{"sourceInterval":[377,410]},["app",{"sourceInterval":[377,389]},"TopLevelTerm_inline",[]],["app",{"sourceInterval":[407,410]},"Seq",[]]]],"Formals":["define",{"sourceInterval":[414,454]},null,[],["seq",{"sourceInterval":[428,454]},["terminal",{"sourceInterval":[428,431]},"<"],["app",{"sourceInterval":[432,450]},"ListOf",[["app",{"sourceInterval":[439,444]},"ident",[]],["terminal",{"sourceInterval":[446,449]},","]]],["terminal",{"sourceInterval":[451,454]},">"]]],"Params":["define",{"sourceInterval":[458,495]},null,[],["seq",{"sourceInterval":[471,495]},["terminal",{"sourceInterval":[471,474]},"<"],["app",{"sourceInterval":[475,491]},"ListOf",[["app",{"sourceInterval":[482,485]},"Seq",[]],["terminal",{"sourceInterval":[487,490]},","]]],["terminal",{"sourceInterval":[492,495]},">"]]],"Alt":["define",{"sourceInterval":[499,533]},null,[],["app",{"sourceInterval":[509,533]},"NonemptyListOf",[["app",{"sourceInterval":[524,527]},"Seq",[]],["terminal",{"sourceInterval":[529,532]},"|"]]]],"Seq":["define",{"sourceInterval":[537,552]},null,[],["star",{"sourceInterval":[547,552]},["app",{"sourceInterval":[547,551]},"Iter",[]]]],"Iter_star":["define",{"sourceInterval":[567,584]},null,[],["seq",{"sourceInterval":[567,575]},["app",{"sourceInterval":[567,571]},"Pred",[]],["terminal",{"sourceInterval":[572,575]},"*"]]],"Iter_plus":["define",{"sourceInterval":[591,608]},null,[],["seq",{"sourceInterval":[591,599]},["app",{"sourceInterval":[591,595]},"Pred",[]],["terminal",{"sourceInterval":[596,599]},"+"]]],"Iter_opt":["define",{"sourceInterval":[615,631]},null,[],["seq",{"sourceInterval":[615,623]},["app",{"sourceInterval":[615,619]},"Pred",[]],["terminal",{"sourceInterval":[620,623]},"?"]]],"Iter":["define",{"sourceInterval":[556,642]},null,[],["alt",{"sourceInterval":[567,642]},["app",{"sourceInterval":[567,575]},"Iter_star",[]],["app",{"sourceInterval":[591,599]},"Iter_plus",[]],["app",{"sourceInterval":[615,623]},"Iter_opt",[]],["app",{"sourceInterval":[638,642]},"Pred",[]]]],"Pred_not":["define",{"sourceInterval":[657,672]},null,[],["seq",{"sourceInterval":[657,664]},["terminal",{"sourceInterval":[657,660]},"~"],["app",{"sourceInterval":[661,664]},"Lex",[]]]],"Pred_lookahead":["define",{"sourceInterval":[679,700]},null,[],["seq",{"sourceInterval":[679,686]},["terminal",{"sourceInterval":[679,682]},"&"],["app",{"sourceInterval":[683,686]},"Lex",[]]]],"Pred":["define",{"sourceInterval":[646,710]},null,[],["alt",{"sourceInterval":[657,710]},["app",{"sourceInterval":[657,664]},"Pred_not",[]],["app",{"sourceInterval":[679,686]},"Pred_lookahead",[]],["app",{"sourceInterval":[707,710]},"Lex",[]]]],"Lex_lex":["define",{"sourceInterval":[724,740]},null,[],["seq",{"sourceInterval":[724,732]},["terminal",{"sourceInterval":[724,727]},"#"],["app",{"sourceInterval":[728,732]},"Base",[]]]],"Lex":["define",{"sourceInterval":[714,751]},null,[],["alt",{"sourceInterval":[724,751]},["app",{"sourceInterval":[724,732]},"Lex_lex",[]],["app",{"sourceInterval":[747,751]},"Base",[]]]],"Base_application":["define",{"sourceInterval":[766,827]},null,[],["seq",{"sourceInterval":[766,811]},["app",{"sourceInterval":[766,771]},"ident",[]],["opt",{"sourceInterval":[772,779]},["app",{"sourceInterval":[772,778]},"Params",[]]],["not",{"sourceInterval":[780,811]},["alt",{"sourceInterval":[782,810]},["seq",{"sourceInterval":[782,796]},["opt",{"sourceInterval":[782,792]},["app",{"sourceInterval":[782,791]},"ruleDescr",[]]],["terminal",{"sourceInterval":[793,796]},"="]],["terminal",{"sourceInterval":[799,803]},":="],["terminal",{"sourceInterval":[806,810]},"+="]]]]],"Base_range":["define",{"sourceInterval":[834,889]},null,[],["seq",{"sourceInterval":[834,856]},["app",{"sourceInterval":[834,842]},"terminal",[]],["terminal",{"sourceInterval":[843,847]},".."],["app",{"sourceInterval":[848,856]},"terminal",[]]]],"Base_terminal":["define",{"sourceInterval":[896,954]},null,[],["app",{"sourceInterval":[896,904]},"terminal",[]]],"Base_paren":["define",{"sourceInterval":[961,1016]},null,[],["seq",{"sourceInterval":[961,972]},["terminal",{"sourceInterval":[961,964]},"("],["app",{"sourceInterval":[965,968]},"Alt",[]],["terminal",{"sourceInterval":[969,972]},")"]]],"Base":["define",{"sourceInterval":[755,1016]},null,[],["alt",{"sourceInterval":[766,1016]},["app",{"sourceInterval":[766,811]},"Base_application",[]],["app",{"sourceInterval":[834,856]},"Base_range",[]],["app",{"sourceInterval":[896,904]},"Base_terminal",[]],["app",{"sourceInterval":[961,972]},"Base_paren",[]]]],"ruleDescr":["define",{"sourceInterval":[1020,1079]},"a rule description",[],["seq",{"sourceInterval":[1058,1079]},["terminal",{"sourceInterval":[1058,1061]},"("],["app",{"sourceInterval":[1062,1075]},"ruleDescrText",[]],["terminal",{"sourceInterval":[1076,1079]},")"]]],"ruleDescrText":["define",{"sourceInterval":[1083,1114]},null,[],["star",{"sourceInterval":[1103,1114]},["seq",{"sourceInterval":[1104,1112]},["not",{"sourceInterval":[1104,1108]},["terminal",{"sourceInterval":[1105,1108]},")"]],["app",{"sourceInterval":[1109,1112]},"any",[]]]]],"caseName":["define",{"sourceInterval":[1118,1186]},null,[],["seq",{"sourceInterval":[1133,1186]},["terminal",{"sourceInterval":[1133,1137]},"--"],["star",{"sourceInterval":[1138,1152]},["seq",{"sourceInterval":[1139,1150]},["not",{"sourceInterval":[1139,1144]},["terminal",{"sourceInterval":[1140,1144]},"\n"]],["app",{"sourceInterval":[1145,1150]},"space",[]]]],["app",{"sourceInterval":[1153,1157]},"name",[]],["star",{"sourceInterval":[1158,1172]},["seq",{"sourceInterval":[1159,1170]},["not",{"sourceInterval":[1159,1164]},["terminal",{"sourceInterval":[1160,1164]},"\n"]],["app",{"sourceInterval":[1165,1170]},"space",[]]]],["alt",{"sourceInterval":[1174,1185]},["terminal",{"sourceInterval":[1174,1178]},"\n"],["lookahead",{"sourceInterval":[1181,1185]},["terminal",{"sourceInterval":[1182,1185]},"}"]]]]],"name":["define",{"sourceInterval":[1190,1230]},"a name",[],["seq",{"sourceInterval":[1211,1230]},["app",{"sourceInterval":[1211,1220]},"nameFirst",[]],["star",{"sourceInterval":[1221,1230]},["app",{"sourceInterval":[1221,1229]},"nameRest",[]]]]],"nameFirst":["define",{"sourceInterval":[1234,1266]},null,[],["alt",{"sourceInterval":[1250,1266]},["terminal",{"sourceInterval":[1250,1253]},"_"],["app",{"sourceInterval":[1260,1266]},"letter",[]]]],"nameRest":["define",{"sourceInterval":[1270,1300]},null,[],["alt",{"sourceInterval":[1285,1300]},["terminal",{"sourceInterval":[1285,1288]},"_"],["app",{"sourceInterval":[1295,1300]},"alnum",[]]]],"ident":["define",{"sourceInterval":[1304,1337]},"an identifier",[],["app",{"sourceInterval":[1333,1337]},"name",[]]],"terminal":["define",{"sourceInterval":[1341,1379]},null,[],["seq",{"sourceInterval":[1356,1379]},["terminal",{"sourceInterval":[1356,1360]},"\""],["star",{"sourceInterval":[1361,1374]},["app",{"sourceInterval":[1361,1373]},"terminalChar",[]]],["terminal",{"sourceInterval":[1375,1379]},"\""]]],"terminalChar":["define",{"sourceInterval":[1383,1440]},null,[],["alt",{"sourceInterval":[1402,1440]},["app",{"sourceInterval":[1402,1412]},"escapeChar",[]],["seq",{"sourceInterval":[1419,1440]},["not",{"sourceInterval":[1419,1424]},["terminal",{"sourceInterval":[1420,1424]},"\\"]],["not",{"sourceInterval":[1425,1430]},["terminal",{"sourceInterval":[1426,1430]},"\""]],["not",{"sourceInterval":[1431,1436]},["terminal",{"sourceInterval":[1432,1436]},"\n"]],["app",{"sourceInterval":[1437,1440]},"any",[]]]]],"escapeChar_backslash":["define",{"sourceInterval":[1483,1538]},null,[],["terminal",{"sourceInterval":[1483,1489]},"\\\\"]],"escapeChar_doubleQuote":["define",{"sourceInterval":[1545,1602]},null,[],["terminal",{"sourceInterval":[1545,1551]},"\\\""]],"escapeChar_singleQuote":["define",{"sourceInterval":[1609,1666]},null,[],["terminal",{"sourceInterval":[1609,1615]},"\\'"]],"escapeChar_backspace":["define",{"sourceInterval":[1673,1728]},null,[],["terminal",{"sourceInterval":[1673,1678]},"\\b"]],"escapeChar_lineFeed":["define",{"sourceInterval":[1735,1789]},null,[],["terminal",{"sourceInterval":[1735,1740]},"\\n"]],"escapeChar_carriageReturn":["define",{"sourceInterval":[1796,1856]},null,[],["terminal",{"sourceInterval":[1796,1801]},"\\r"]],"escapeChar_tab":["define",{"sourceInterval":[1863,1912]},null,[],["terminal",{"sourceInterval":[1863,1868]},"\\t"]],"escapeChar_unicodeEscape":["define",{"sourceInterval":[1919,1978]},null,[],["seq",{"sourceInterval":[1919,1960]},["terminal",{"sourceInterval":[1919,1924]},"\\u"],["app",{"sourceInterval":[1925,1933]},"hexDigit",[]],["app",{"sourceInterval":[1934,1942]},"hexDigit",[]],["app",{"sourceInterval":[1943,1951]},"hexDigit",[]],["app",{"sourceInterval":[1952,1960]},"hexDigit",[]]]],"escapeChar_hexEscape":["define",{"sourceInterval":[1985,2040]},null,[],["seq",{"sourceInterval":[1985,2008]},["terminal",{"sourceInterval":[1985,1990]},"\\x"],["app",{"sourceInterval":[1991,1999]},"hexDigit",[]],["app",{"sourceInterval":[2000,2008]},"hexDigit",[]]]],"escapeChar":["define",{"sourceInterval":[1444,2040]},"an escape sequence",[],["alt",{"sourceInterval":[1483,2040]},["app",{"sourceInterval":[1483,1489]},"escapeChar_backslash",[]],["app",{"sourceInterval":[1545,1551]},"escapeChar_doubleQuote",[]],["app",{"sourceInterval":[1609,1615]},"escapeChar_singleQuote",[]],["app",{"sourceInterval":[1673,1678]},"escapeChar_backspace",[]],["app",{"sourceInterval":[1735,1740]},"escapeChar_lineFeed",[]],["app",{"sourceInterval":[1796,1801]},"escapeChar_carriageReturn",[]],["app",{"sourceInterval":[1863,1868]},"escapeChar_tab",[]],["app",{"sourceInterval":[1919,1960]},"escapeChar_unicodeEscape",[]],["app",{"sourceInterval":[1985,2008]},"escapeChar_hexEscape",[]]]],"space":["extend",{"sourceInterval":[2044,2063]},null,[],["app",{"sourceInterval":[2056,2063]},"comment",[]]],"comment_singleLine":["define",{"sourceInterval":[2081,2118]},null,[],["seq",{"sourceInterval":[2081,2103]},["terminal",{"sourceInterval":[2081,2085]},"//"],["star",{"sourceInterval":[2086,2098]},["seq",{"sourceInterval":[2087,2096]},["not",{"sourceInterval":[2087,2092]},["terminal",{"sourceInterval":[2088,2092]},"\n"]],["app",{"sourceInterval":[2093,2096]},"any",[]]]],["terminal",{"sourceInterval":[2099,2103]},"\n"]]],"comment_multiLine":["define",{"sourceInterval":[2125,2161]},null,[],["seq",{"sourceInterval":[2125,2147]},["terminal",{"sourceInterval":[2125,2129]},"/*"],["star",{"sourceInterval":[2130,2142]},["seq",{"sourceInterval":[2131,2140]},["not",{"sourceInterval":[2131,2136]},["terminal",{"sourceInterval":[2132,2136]},"*/"]],["app",{"sourceInterval":[2137,2140]},"any",[]]]],["terminal",{"sourceInterval":[2143,2147]},"*/"]]],"comment":["define",{"sourceInterval":[2067,2161]},null,[],["alt",{"sourceInterval":[2081,2161]},["app",{"sourceInterval":[2081,2103]},"comment_singleLine",[]],["app",{"sourceInterval":[2125,2147]},"comment_multiLine",[]]]],"tokens":["define",{"sourceInterval":[2165,2180]},null,[],["star",{"sourceInterval":[2174,2180]},["app",{"sourceInterval":[2174,2179]},"token",[]]]],"token":["define",{"sourceInterval":[2184,2260]},null,[],["alt",{"sourceInterval":[2192,2260]},["app",{"sourceInterval":[2192,2200]},"caseName",[]],["app",{"sourceInterval":[2203,2210]},"comment",[]],["app",{"sourceInterval":[2213,2218]},"ident",[]],["app",{"sourceInterval":[2221,2229]},"operator",[]],["app",{"sourceInterval":[2232,2243]},"punctuation",[]],["app",{"sourceInterval":[2246,2254]},"terminal",[]],["app",{"sourceInterval":[2257,2260]},"any",[]]]],"operator":["define",{"sourceInterval":[2264,2329]},null,[],["alt",{"sourceInterval":[2275,2329]},["terminal",{"sourceInterval":[2275,2279]},"<:"],["terminal",{"sourceInterval":[2282,2285]},"="],["terminal",{"sourceInterval":[2288,2292]},":="],["terminal",{"sourceInterval":[2295,2299]},"+="],["terminal",{"sourceInterval":[2302,2305]},"*"],["terminal",{"sourceInterval":[2308,2311]},"+"],["terminal",{"sourceInterval":[2314,2317]},"?"],["terminal",{"sourceInterval":[2320,2323]},"~"],["terminal",{"sourceInterval":[2326,2329]},"&"]]],"punctuation":["define",{"sourceInterval":[2333,2369]},null,[],["alt",{"sourceInterval":[2347,2369]},["terminal",{"sourceInterval":[2347,2350]},"<"],["terminal",{"sourceInterval":[2353,2356]},">"],["terminal",{"sourceInterval":[2359,2362]},","],["terminal",{"sourceInterval":[2365,2369]},"--"]]]}]);

},{"..":41}],3:[function(require,module,exports){
var ohm = require('..');
module.exports = ohm.makeRecipe(["grammar",{"source":"OperationsAndAttributes {\n\n  AttributeSignature =\n    name\n\n  OperationSignature =\n    name Formals?\n\n  Formals\n    = \"(\" ListOf<name, \",\"> \")\"\n\n  name  (a name)\n    = nameFirst nameRest*\n\n  nameFirst\n    = \"_\"\n    | letter\n\n  nameRest\n    = \"_\"\n    | alnum\n\n}"},"OperationsAndAttributes",null,"AttributeSignature",{"AttributeSignature":["define",{"sourceInterval":[29,58]},null,[],["app",{"sourceInterval":[54,58]},"name",[]]],"OperationSignature":["define",{"sourceInterval":[62,100]},null,[],["seq",{"sourceInterval":[87,100]},["app",{"sourceInterval":[87,91]},"name",[]],["opt",{"sourceInterval":[92,100]},["app",{"sourceInterval":[92,99]},"Formals",[]]]]],"Formals":["define",{"sourceInterval":[104,143]},null,[],["seq",{"sourceInterval":[118,143]},["terminal",{"sourceInterval":[118,121]},"("],["app",{"sourceInterval":[122,139]},"ListOf",[["app",{"sourceInterval":[129,133]},"name",[]],["terminal",{"sourceInterval":[135,138]},","]]],["terminal",{"sourceInterval":[140,143]},")"]]],"name":["define",{"sourceInterval":[147,187]},"a name",[],["seq",{"sourceInterval":[168,187]},["app",{"sourceInterval":[168,177]},"nameFirst",[]],["star",{"sourceInterval":[178,187]},["app",{"sourceInterval":[178,186]},"nameRest",[]]]]],"nameFirst":["define",{"sourceInterval":[191,223]},null,[],["alt",{"sourceInterval":[207,223]},["terminal",{"sourceInterval":[207,210]},"_"],["app",{"sourceInterval":[217,223]},"letter",[]]]],"nameRest":["define",{"sourceInterval":[227,257]},null,[],["alt",{"sourceInterval":[242,257]},["terminal",{"sourceInterval":[242,245]},"_"],["app",{"sourceInterval":[252,257]},"alnum",[]]]]}]);

},{"..":41}],4:[function(require,module,exports){
'use strict';

module.exports = {
  toAST: require('./semantics-toAST').helper,
  semanticsForToAST: require('./semantics-toAST').semantics
};

},{"./semantics-toAST":5}],5:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var pexprs = require('../src/pexprs');
var MatchResult = require('../src/MatchResult');
var Grammar = require('../src/Grammar');
var extend = require('util-extend');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

var defaultOperation = {
  _terminal: function() {
    return this.primitiveValue;
  },

  _nonterminal: function(children) {
    var ctorName = this._node.ctorName;
    var mapping = this.args.mapping;

    // without customization
    if (!mapping.hasOwnProperty(ctorName)) {
      // intermediate node
      if (this._node instanceof pexprs.Alt || this._node instanceof pexprs.Apply) {
        return children[0].toAST(mapping);
      }

      // lexical rule
      if (this.isLexical()) {
        return this.sourceString;
      }

      // singular node (e.g. only surrounded by literals or lookaheads)
      var realChildren = children.filter(function(child) {
        return !child.isTerminal();
      });
      if (realChildren.length === 1) {
        return realChildren[0].toAST(mapping);
      }

      // rest: terms with multiple children
    }

    // direct forward
    if (typeof mapping[ctorName] === 'number') {
      return children[mapping[ctorName]].toAST(mapping);
    }

    // named/mapped children or unnamed children ('0', '1', '2', ...)
    var propMap = mapping[ctorName] || children;
    var node = {
      type: ctorName
    };
    for (var prop in propMap) {
      var mappedProp = mapping[ctorName] && mapping[ctorName][prop];
      if (typeof mappedProp === 'number') {
        // direct forward
        node[prop] = children[mappedProp].toAST(mapping);
      } else if ((typeof mappedProp === 'string') || (typeof mappedProp === 'boolean') ||
          (mappedProp === null)) {
        // primitive value
        node[prop] = mappedProp;
      } else if ((typeof mappedProp === 'object') && (mappedProp instanceof Number)) {
        // primitive number (must be unboxed)
        node[prop] = Number(mappedProp);
      } else if (typeof mappedProp === 'function') {
        // computed value
        node[prop] = mappedProp.call(this, children);
      } else if (mappedProp === undefined) {
        if (children[prop] && !children[prop].isTerminal()) {
          node[prop] = children[prop].toAST(mapping);
        } else {
          // delete predefined 'type' properties, like 'type', if explicitely removed
          delete node[prop];
        }
      }
    }
    return node;
  },

  _iter: function(children) {
    if (this._node.isOptional()) {
      if (this.numChildren === 0) {
        return null;
      } else {
        return children[0].toAST(this.args.mapping);
      }
    }

    return children.map(function(child) {
      return child.toAST(this.args.mapping);
    }, this);
  },

  NonemptyListOf: function(first, sep, rest) {
    return [first.toAST(this.args.mapping)].concat(rest.toAST(this.args.mapping));
  },

  EmptyListOf: function() {
    return [];
  }
};

// Returns a plain JavaScript object that includes an abstract syntax tree (AST)
// for the given match result `res` containg a concrete syntax tree (CST) and grammar.
// The optional `mapping` parameter can be used to customize how the nodes of the CST
// are mapped to the AST (see /doc/extras.md#toastmatchresult-mapping).
function toAST(res, mapping) {
  if (!(res instanceof MatchResult) || res.failed()) {
    throw new Error('toAST() expects a succesfull MatchResult as first parameter');
  }

  mapping = extend({}, mapping);
  var operation = extend({}, defaultOperation);
  for (var termName in mapping) {
    if (typeof mapping[termName] === 'function') {
      operation[termName] = mapping[termName];
      delete mapping[termName];
    }
  }
  var g = res._cst.grammar;
  var s = g.createSemantics().addOperation('toAST(mapping)', operation);
  return s(res).toAST(mapping);
}

// Returns a semantics containg the toAST(mapping) operation for the given grammar g.
function semanticsForToAST(g) {
  if (!(g instanceof Grammar)) {
    throw new Error('semanticsToAST() expects a Grammar as parameter');
  }

  return g.createSemantics().addOperation('toAST(mapping)', defaultOperation);
}

module.exports = {
  helper: toAST,
  semantics: semanticsForToAST
};

},{"../src/Grammar":29,"../src/MatchResult":33,"../src/pexprs":59,"util-extend":26}],6:[function(require,module,exports){
'use strict';

var assign        = require('es5-ext/object/assign')
  , normalizeOpts = require('es5-ext/object/normalize-options')
  , isCallable    = require('es5-ext/object/is-callable')
  , contains      = require('es5-ext/string/#/contains')

  , d;

d = module.exports = function (dscr, value/*, options*/) {
	var c, e, w, options, desc;
	if ((arguments.length < 2) || (typeof dscr !== 'string')) {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (dscr == null) {
		c = w = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
		w = contains.call(dscr, 'w');
	}

	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

d.gs = function (dscr, get, set/*, options*/) {
	var c, e, options, desc;
	if (typeof dscr !== 'string') {
		options = set;
		set = get;
		get = dscr;
		dscr = null;
	} else {
		options = arguments[3];
	}
	if (get == null) {
		get = undefined;
	} else if (!isCallable(get)) {
		options = get;
		get = set = undefined;
	} else if (set == null) {
		set = undefined;
	} else if (!isCallable(set)) {
		options = set;
		set = undefined;
	}
	if (dscr == null) {
		c = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
	}

	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

},{"es5-ext/object/assign":7,"es5-ext/object/is-callable":10,"es5-ext/object/normalize-options":14,"es5-ext/string/#/contains":16}],7:[function(require,module,exports){
'use strict';

module.exports = require('./is-implemented')()
	? Object.assign
	: require('./shim');

},{"./is-implemented":8,"./shim":9}],8:[function(require,module,exports){
'use strict';

module.exports = function () {
	var assign = Object.assign, obj;
	if (typeof assign !== 'function') return false;
	obj = { foo: 'raz' };
	assign(obj, { bar: 'dwa' }, { trzy: 'trzy' });
	return (obj.foo + obj.bar + obj.trzy) === 'razdwatrzy';
};

},{}],9:[function(require,module,exports){
'use strict';

var keys  = require('../keys')
  , value = require('../valid-value')

  , max = Math.max;

module.exports = function (dest, src/*, …srcn*/) {
	var error, i, l = max(arguments.length, 2), assign;
	dest = Object(value(dest));
	assign = function (key) {
		try { dest[key] = src[key]; } catch (e) {
			if (!error) error = e;
		}
	};
	for (i = 1; i < l; ++i) {
		src = arguments[i];
		keys(src).forEach(assign);
	}
	if (error !== undefined) throw error;
	return dest;
};

},{"../keys":11,"../valid-value":15}],10:[function(require,module,exports){
// Deprecated

'use strict';

module.exports = function (obj) { return typeof obj === 'function'; };

},{}],11:[function(require,module,exports){
'use strict';

module.exports = require('./is-implemented')()
	? Object.keys
	: require('./shim');

},{"./is-implemented":12,"./shim":13}],12:[function(require,module,exports){
'use strict';

module.exports = function () {
	try {
		Object.keys('primitive');
		return true;
	} catch (e) { return false; }
};

},{}],13:[function(require,module,exports){
'use strict';

var keys = Object.keys;

module.exports = function (object) {
	return keys(object == null ? object : Object(object));
};

},{}],14:[function(require,module,exports){
'use strict';

var forEach = Array.prototype.forEach, create = Object.create;

var process = function (src, obj) {
	var key;
	for (key in src) obj[key] = src[key];
};

module.exports = function (options/*, …options*/) {
	var result = create(null);
	forEach.call(arguments, function (options) {
		if (options == null) return;
		process(Object(options), result);
	});
	return result;
};

},{}],15:[function(require,module,exports){
'use strict';

module.exports = function (value) {
	if (value == null) throw new TypeError("Cannot use null or undefined");
	return value;
};

},{}],16:[function(require,module,exports){
'use strict';

module.exports = require('./is-implemented')()
	? String.prototype.contains
	: require('./shim');

},{"./is-implemented":17,"./shim":18}],17:[function(require,module,exports){
'use strict';

var str = 'razdwatrzy';

module.exports = function () {
	if (typeof str.contains !== 'function') return false;
	return ((str.contains('dwa') === true) && (str.contains('foo') === false));
};

},{}],18:[function(require,module,exports){
'use strict';

var indexOf = String.prototype.indexOf;

module.exports = function (searchString/*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};

},{}],19:[function(require,module,exports){
'use strict';

module.exports = require('./is-implemented')() ? Symbol : require('./polyfill');

},{"./is-implemented":20,"./polyfill":22}],20:[function(require,module,exports){
'use strict';

var validTypes = { object: true, symbol: true };

module.exports = function () {
	var symbol;
	if (typeof Symbol !== 'function') return false;
	symbol = Symbol('test symbol');
	try { String(symbol); } catch (e) { return false; }

	// Return 'true' also for polyfills
	if (!validTypes[typeof Symbol.iterator]) return false;
	if (!validTypes[typeof Symbol.toPrimitive]) return false;
	if (!validTypes[typeof Symbol.toStringTag]) return false;

	return true;
};

},{}],21:[function(require,module,exports){
'use strict';

module.exports = function (x) {
	if (!x) return false;
	if (typeof x === 'symbol') return true;
	if (!x.constructor) return false;
	if (x.constructor.name !== 'Symbol') return false;
	return (x[x.constructor.toStringTag] === 'Symbol');
};

},{}],22:[function(require,module,exports){
// ES2015 Symbol polyfill for environments that do not support it (or partially support it)

'use strict';

var d              = require('d')
  , validateSymbol = require('./validate-symbol')

  , create = Object.create, defineProperties = Object.defineProperties
  , defineProperty = Object.defineProperty, objPrototype = Object.prototype
  , NativeSymbol, SymbolPolyfill, HiddenSymbol, globalSymbols = create(null)
  , isNativeSafe;

if (typeof Symbol === 'function') {
	NativeSymbol = Symbol;
	try {
		String(NativeSymbol());
		isNativeSafe = true;
	} catch (ignore) {}
}

var generateName = (function () {
	var created = create(null);
	return function (desc) {
		var postfix = 0, name, ie11BugWorkaround;
		while (created[desc + (postfix || '')]) ++postfix;
		desc += (postfix || '');
		created[desc] = true;
		name = '@@' + desc;
		defineProperty(objPrototype, name, d.gs(null, function (value) {
			// For IE11 issue see:
			// https://connect.microsoft.com/IE/feedbackdetail/view/1928508/
			//    ie11-broken-getters-on-dom-objects
			// https://github.com/medikoo/es6-symbol/issues/12
			if (ie11BugWorkaround) return;
			ie11BugWorkaround = true;
			defineProperty(this, name, d(value));
			ie11BugWorkaround = false;
		}));
		return name;
	};
}());

// Internal constructor (not one exposed) for creating Symbol instances.
// This one is used to ensure that `someSymbol instanceof Symbol` always return false
HiddenSymbol = function Symbol(description) {
	if (this instanceof HiddenSymbol) throw new TypeError('TypeError: Symbol is not a constructor');
	return SymbolPolyfill(description);
};

// Exposed `Symbol` constructor
// (returns instances of HiddenSymbol)
module.exports = SymbolPolyfill = function Symbol(description) {
	var symbol;
	if (this instanceof Symbol) throw new TypeError('TypeError: Symbol is not a constructor');
	if (isNativeSafe) return NativeSymbol(description);
	symbol = create(HiddenSymbol.prototype);
	description = (description === undefined ? '' : String(description));
	return defineProperties(symbol, {
		__description__: d('', description),
		__name__: d('', generateName(description))
	});
};
defineProperties(SymbolPolyfill, {
	for: d(function (key) {
		if (globalSymbols[key]) return globalSymbols[key];
		return (globalSymbols[key] = SymbolPolyfill(String(key)));
	}),
	keyFor: d(function (s) {
		var key;
		validateSymbol(s);
		for (key in globalSymbols) if (globalSymbols[key] === s) return key;
	}),

	// If there's native implementation of given symbol, let's fallback to it
	// to ensure proper interoperability with other native functions e.g. Array.from
	hasInstance: d('', (NativeSymbol && NativeSymbol.hasInstance) || SymbolPolyfill('hasInstance')),
	isConcatSpreadable: d('', (NativeSymbol && NativeSymbol.isConcatSpreadable) ||
		SymbolPolyfill('isConcatSpreadable')),
	iterator: d('', (NativeSymbol && NativeSymbol.iterator) || SymbolPolyfill('iterator')),
	match: d('', (NativeSymbol && NativeSymbol.match) || SymbolPolyfill('match')),
	replace: d('', (NativeSymbol && NativeSymbol.replace) || SymbolPolyfill('replace')),
	search: d('', (NativeSymbol && NativeSymbol.search) || SymbolPolyfill('search')),
	species: d('', (NativeSymbol && NativeSymbol.species) || SymbolPolyfill('species')),
	split: d('', (NativeSymbol && NativeSymbol.split) || SymbolPolyfill('split')),
	toPrimitive: d('', (NativeSymbol && NativeSymbol.toPrimitive) || SymbolPolyfill('toPrimitive')),
	toStringTag: d('', (NativeSymbol && NativeSymbol.toStringTag) || SymbolPolyfill('toStringTag')),
	unscopables: d('', (NativeSymbol && NativeSymbol.unscopables) || SymbolPolyfill('unscopables'))
});

// Internal tweaks for real symbol producer
defineProperties(HiddenSymbol.prototype, {
	constructor: d(SymbolPolyfill),
	toString: d('', function () { return this.__name__; })
});

// Proper implementation of methods exposed on Symbol.prototype
// They won't be accessible on produced symbol instances as they derive from HiddenSymbol.prototype
defineProperties(SymbolPolyfill.prototype, {
	toString: d(function () { return 'Symbol (' + validateSymbol(this).__description__ + ')'; }),
	valueOf: d(function () { return validateSymbol(this); })
});
defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toPrimitive, d('', function () {
	var symbol = validateSymbol(this);
	if (typeof symbol === 'symbol') return symbol;
	return symbol.toString();
}));
defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d('c', 'Symbol'));

// Proper implementaton of toPrimitive and toStringTag for returned symbol instances
defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toStringTag,
	d('c', SymbolPolyfill.prototype[SymbolPolyfill.toStringTag]));

// Note: It's important to define `toPrimitive` as last one, as some implementations
// implement `toPrimitive` natively without implementing `toStringTag` (or other specified symbols)
// And that may invoke error in definition flow:
// See: https://github.com/medikoo/es6-symbol/issues/13#issuecomment-164146149
defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toPrimitive,
	d('c', SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive]));

},{"./validate-symbol":23,"d":6}],23:[function(require,module,exports){
'use strict';

var isSymbol = require('./is-symbol');

module.exports = function (value) {
	if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
	return value;
};

},{"./is-symbol":21}],24:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],25:[function(require,module,exports){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

},{}],26:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = extend;
function extend(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || typeof add !== 'object') return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
}

},{}],27:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var GrammarDecl = require('./GrammarDecl');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function Builder() {}

Builder.prototype = {
  currentDecl: null,

  newGrammar: function(name) {
    return new GrammarDecl(name);
  },

  grammar: function(metaInfo, name, superGrammar, defaultStartRule, rules) {
    var gDecl = new GrammarDecl(name);
    if (superGrammar) {
      gDecl.withSuperGrammar(this.fromRecipe(superGrammar));
    }
    if (defaultStartRule) {
      gDecl.withDefaultStartRule(defaultStartRule);
    }
    if (metaInfo && metaInfo.source) {
      gDecl.withSource(metaInfo.source);
    }

    var self = this;
    this.currentDecl = gDecl;
    Object.keys(rules).forEach(function(ruleName) {
      var ruleRecipe = rules[ruleName];

      var action = ruleRecipe[0]; // define/extend/override
      var metaInfo = ruleRecipe[1];
      var description = ruleRecipe[2];
      var formals = ruleRecipe[3];
      var body = self.fromRecipe(ruleRecipe[4]);

      var source;
      if (gDecl.source && metaInfo && metaInfo.sourceInterval) {
        var inputStream = gDecl.source.inputStream;
        source = inputStream.interval.apply(inputStream, metaInfo.sourceInterval);
      }
      gDecl[action](ruleName, formals, body, description, source);
    });
    this.currentDecl = null;
    return gDecl.build();
  },

  terminal: function(x) {
    return new pexprs.Terminal(x);
  },

  range: function(from, to) {
    return new pexprs.Range(from, to);
  },

  param: function(index) {
    return new pexprs.Param(index);
  },

  alt: function(/* term1, term1, ... */) {
    var terms = [];
    for (var idx = 0; idx < arguments.length; idx++) {
      var arg = arguments[idx];
      if (!(arg instanceof pexprs.PExpr)) {
        arg = this.fromRecipe(arg);
      }
      if (arg instanceof pexprs.Alt) {
        terms = terms.concat(arg.terms);
      } else {
        terms.push(arg);
      }
    }
    return terms.length === 1 ? terms[0] : new pexprs.Alt(terms);
  },

  seq: function(/* factor1, factor2, ... */) {
    var factors = [];
    for (var idx = 0; idx < arguments.length; idx++) {
      var arg = arguments[idx];
      if (!(arg instanceof pexprs.PExpr)) {
        arg = this.fromRecipe(arg);
      }
      if (arg instanceof pexprs.Seq) {
        factors = factors.concat(arg.factors);
      } else {
        factors.push(arg);
      }
    }
    return factors.length === 1 ? factors[0] : new pexprs.Seq(factors);
  },

  star: function(expr) {
    if (!(expr instanceof pexprs.PExpr)) {
      expr = this.fromRecipe(expr);
    }
    return new pexprs.Star(expr);
  },

  plus: function(expr) {
    if (!(expr instanceof pexprs.PExpr)) {
      expr = this.fromRecipe(expr);
    }
    return new pexprs.Plus(expr);
  },

  opt: function(expr) {
    if (!(expr instanceof pexprs.PExpr)) {
      expr = this.fromRecipe(expr);
    }
    return new pexprs.Opt(expr);
  },

  not: function(expr) {
    if (!(expr instanceof pexprs.PExpr)) {
      expr = this.fromRecipe(expr);
    }
    return new pexprs.Not(expr);
  },

  la: function(expr) {
    // TODO: temporary to still be able to read old recipes
    return this.lookahead(expr);
  },

  lookahead: function(expr) {
    if (!(expr instanceof pexprs.PExpr)) {
      expr = this.fromRecipe(expr);
    }
    return new pexprs.Lookahead(expr);
  },

  lex: function(expr) {
    if (!(expr instanceof pexprs.PExpr)) {
      expr = this.fromRecipe(expr);
    }
    return new pexprs.Lex(expr);
  },

  app: function(ruleName, optParams) {
    if (optParams && optParams.length > 0) {
      optParams = optParams.map(function(param) {
        return param instanceof pexprs.PExpr ? param :
          this.fromRecipe(param);
      }, this);
    }
    return new pexprs.Apply(ruleName, optParams);
  },

  fromRecipe: function(recipe) {
    // the meta-info of 'grammar' is proccessed in Builder.grammar
    var result = this[recipe[0]].apply(this,
      recipe[0] === 'grammar' ? recipe.slice(1) : recipe.slice(2));

    var metaInfo = recipe[1];
    if (metaInfo) {
      if (metaInfo.sourceInterval && this.currentDecl) {
        result.withSource(
          this.currentDecl.sourceInterval.apply(this.currentDecl, metaInfo.sourceInterval)
        );
      }
    }
    return result;
  }
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Builder;

},{"./GrammarDecl":30,"./pexprs":59}],28:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

/*
  `Failure`s represent expressions that weren't matched while parsing. They are used to generate
  error messages automatically. The interface of `Failure`s includes the collowing methods:

  - getText() : String
  - getType() : String  (one of {"description", "string", "code"})
  - isDescription() : bool
  - isStringTerminal() : bool
  - isCode() : bool
  - isFluffy() : bool
  - makeFluffy() : void
  - subsumes(Failure) : bool
*/

function isValidType(type) {
  return type === 'description' || type === 'string' || type === 'code';
}

function Failure(pexpr, text, type) {
  if (!isValidType(type)) {
    throw new Error('invalid Failure type: ' + type);
  }
  this.pexpr = pexpr;
  this.text = text;
  this.type = type;
  this.fluffy = false;
}

Failure.prototype.getPExpr = function() {
  return this.pexpr;
};

Failure.prototype.getText = function() {
  return this.text;
};

Failure.prototype.getType = function() {
  return this.type;
};

Failure.prototype.isDescription = function() {
  return this.type === 'description';
};

Failure.prototype.isStringTerminal = function() {
  return this.type === 'string';
};

Failure.prototype.isCode = function() {
  return this.type === 'code';
};

Failure.prototype.isFluffy = function() {
  return this.fluffy;
};

Failure.prototype.makeFluffy = function() {
  this.fluffy = true;
};

Failure.prototype.clearFluffy = function() {
  this.fluffy = false;
};

Failure.prototype.subsumes = function(that) {
  return this.getText() === that.getText() &&
      this.type === that.type &&
      (!this.isFluffy() || this.isFluffy() && that.isFluffy());
};

Failure.prototype.toString = function() {
  return this.type === 'string' ?
    JSON.stringify(this.getText()) :
    this.getText();
};

Failure.prototype.clone = function() {
  var failure = new Failure(this.pexpr, this.text, this.type);
  if (this.isFluffy()) {
    failure.makeFluffy();
  }
  return failure;
};

Failure.prototype.toKey = function() {
  return this.toString() + '#' + this.type;
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Failure;

},{}],29:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var MatchResult = require('./MatchResult');
var Semantics = require('./Semantics');
var State = require('./State');
var common = require('./common');
var errors = require('./errors');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function Grammar(
    name,
    superGrammar,
    rules,
    optDefaultStartRule) {
  this.name = name;
  this.superGrammar = superGrammar;
  this.rules = rules;
  if (optDefaultStartRule) {
    if (!(optDefaultStartRule in rules)) {
      throw new Error("Invalid start rule: '" + optDefaultStartRule +
                      "' is not a rule in grammar '" + name + "'");
    }
    this.defaultStartRule = optDefaultStartRule;
  }
}

var ohmGrammar;
var buildGrammar;

// This method is called from main.js once Ohm has loaded.
Grammar.initApplicationParser = function(grammar, builderFn) {
  ohmGrammar = grammar;
  buildGrammar = builderFn;
};

Grammar.prototype = {
  // Return true if the grammar is a built-in grammar, otherwise false.
  // NOTE: This might give an unexpected result if called before BuiltInRules is defined!
  isBuiltIn: function() {
    return this === Grammar.ProtoBuiltInRules || this === Grammar.BuiltInRules;
  },

  _match: function(input, opts) {
    var state = new State(this, input, opts);
    state.evalFromStart();
    return state;
  },

  match: function(input, optStartApplication) {
    var state = this._match(input, {startApplication: optStartApplication});
    return MatchResult.newFor(state);
  },

  trace: function(input, optStartApplication) {
    var state = this._match(input, {startApplication: optStartApplication, trace: true});

    // The trace node for the start rule is always the last entry. If it is a syntactic rule,
    // the first entry is for an application of 'spaces'.
    // TODO(pdubroy): Clean this up by introducing a special `Match<startAppl>` rule, which will
    // ensure that there is always a single root trace node.
    var rootTrace = state.trace[state.trace.length - 1];
    rootTrace.state = state;
    rootTrace.result = MatchResult.newFor(state);
    return rootTrace;
  },

  semantics: function() {
    // TODO: Remove this eventually! Deprecated in v0.12.
    throw new Error('semantics() is deprecated -- use createSemantics() instead.');
  },

  createSemantics: function() {
    return Semantics.createSemantics(this);
  },

  extendSemantics: function(superSemantics) {
    return Semantics.createSemantics(this, superSemantics._getSemantics());
  },

  // Check that every key in `actionDict` corresponds to a semantic action, and that it maps to
  // a function of the correct arity. If not, throw an exception.
  _checkTopDownActionDict: function(what, name, actionDict) {
    function isSpecialAction(a) {
      return a === '_iter' || a === '_terminal' || a === '_nonterminal' || a === '_default';
    }

    var problems = [];
    for (var k in actionDict) {
      var v = actionDict[k];
      if (!isSpecialAction(k) && !(k in this.rules)) {
        problems.push("'" + k + "' is not a valid semantic action for '" + this.name + "'");
      } else if (typeof v !== 'function') {
        problems.push(
            "'" + k + "' must be a function in an action dictionary for '" + this.name + "'");
      } else {
        var actual = v.length;
        var expected = this._topDownActionArity(k);
        if (actual !== expected) {
          problems.push(
              "Semantic action '" + k + "' has the wrong arity: " +
              'expected ' + expected + ', got ' + actual);
        }
      }
    }
    if (problems.length > 0) {
      var prettyProblems = problems.map(function(problem) { return '- ' + problem; });
      var error = new Error(
          "Found errors in the action dictionary of the '" + name + "' " + what + ':\n' +
          prettyProblems.join('\n'));
      error.problems = problems;
      throw error;
    }
  },

  // Return the expected arity for a semantic action named `actionName`, which
  // is either a rule name or a special action name like '_nonterminal'.
  _topDownActionArity: function(actionName) {
    if (actionName === '_iter' || actionName === '_nonterminal' || actionName === '_default') {
      return 1;
    } else if (actionName === '_terminal') {
      return 0;
    }
    return this.rules[actionName].body.getArity();
  },

  _inheritsFrom: function(grammar) {
    var g = this.superGrammar;
    while (g) {
      if (g === grammar) {
        return true;
      }
      g = g.superGrammar;
    }
    return false;
  },

  toRecipe: function(optVarName) {
    var metaInfo = {};
    // Include the grammar source if it is available.
    if (this.source) {
      metaInfo.source = this.source.contents;
    }

    var superGrammar = null;
    if (this.superGrammar && !this.superGrammar.isBuiltIn()) {
      superGrammar = JSON.parse(this.superGrammar.toRecipe());
    }

    var startRule = null;
    if (this.defaultStartRule) {
      startRule = this.defaultStartRule;
    }

    var rules = {};
    var self = this;
    Object.keys(this.rules).forEach(function(ruleName) {
      var ruleInfo = self.rules[ruleName];
      var body = ruleInfo.body;
      var isDefinition = !self.superGrammar || !self.superGrammar.rules[ruleName];

      var operation;
      if (isDefinition) {
        operation = 'define';
      } else {
        operation = body instanceof pexprs.Extend ? 'extend' : 'override';
      }

      var metaInfo = {};
      if (ruleInfo.source && self.source) {
        var adjusted = ruleInfo.source.relativeTo(self.source);
        metaInfo.sourceInterval = [adjusted.startIdx, adjusted.endIdx];
      }

      var description = isDefinition ? ruleInfo.description : null;
      var bodyRecipe = body.outputRecipe(ruleInfo.formals, self.source);

      rules[ruleName] = [
        operation, // "define"/"extend"/"override"
        metaInfo,
        description,
        ruleInfo.formals,
        bodyRecipe
      ];
    });

    return JSON.stringify([
      'grammar',
      metaInfo,
      this.name,
      superGrammar,
      startRule,
      rules
    ]);
  },

  // TODO: Come up with better names for these methods.
  // TODO: Write the analog of these methods for inherited attributes.
  toOperationActionDictionaryTemplate: function() {
    return this._toOperationOrAttributeActionDictionaryTemplate();
  },
  toAttributeActionDictionaryTemplate: function() {
    return this._toOperationOrAttributeActionDictionaryTemplate();
  },

  _toOperationOrAttributeActionDictionaryTemplate: function() {
    // TODO: add the super-grammar's templates at the right place, e.g., a case for AddExpr_plus
    // should appear next to other cases of AddExpr.

    var sb = new common.StringBuffer();
    sb.append('{');

    var first = true;
    for (var ruleName in this.rules) {
      var body = this.rules[ruleName].body;
      if (first) {
        first = false;
      } else {
        sb.append(',');
      }
      sb.append('\n');
      sb.append('  ');
      this.addSemanticActionTemplate(ruleName, body, sb);
    }

    sb.append('\n}');
    return sb.contents();
  },

  addSemanticActionTemplate: function(ruleName, body, sb) {
    sb.append(ruleName);
    sb.append(': function(');
    var arity = this._topDownActionArity(ruleName);
    sb.append(common.repeat('_', arity).join(', '));
    sb.append(') {\n');
    sb.append('  }');
  },

  // Parse a string which expresses a rule application in this grammar, and return the
  // resulting Apply node.
  parseApplication: function(str) {
    var app;
    if (str.indexOf('<') === -1) {
      // simple application
      app = new pexprs.Apply(str);
    } else {
      // parameterized application
      var cst = ohmGrammar.match(str, 'Base_application');
      app = buildGrammar(cst, {});
    }

    // Ensure that the application is valid.
    if (!(app.ruleName in this.rules)) {
      throw errors.undeclaredRule(app.ruleName, this.name);
    }
    var formals = this.rules[app.ruleName].formals;
    if (formals.length !== app.args.length) {
      var source = this.rules[app.ruleName].source;
      throw errors.wrongNumberOfParameters(app.ruleName, formals.length, app.args.length, source);
    }
    return app;
  }
};

// The following grammar contains a few rules that couldn't be written  in "userland".
// At the bottom of src/main.js, we create a sub-grammar of this grammar that's called
// `BuiltInRules`. That grammar contains several convenience rules, e.g., `letter` and
// `digit`, and is implicitly the super-grammar of any grammar whose super-grammar
// isn't specified.
Grammar.ProtoBuiltInRules = new Grammar(
  'ProtoBuiltInRules',  // name
  undefined,  // supergrammar
  {
    // The following rules can't be written in userland because they reference
    // `any` and `end` directly.
    any: {body: pexprs.any, formals: [], description: 'any object'},
    end: {body: pexprs.end, formals: [], description: 'end of input'},

    // The following rule is invoked implicitly by syntactic rules to skip spaces.
    spaces: {
      body: new pexprs.Star(new pexprs.Apply('space')),
      formals: []
    },

    // The `space` rule must be defined here because it's referenced by `spaces`.
    space: {
      body: new pexprs.Range('\x00', ' '),
      formals: [],
      description: 'a space'
    },

    // These rules are implemented natively because they use UnicodeChar directly, which is
    // not part of the Ohm grammar.
    lower: {
      body: new pexprs.UnicodeChar('Ll'),
      formals: [],
      description: 'a lowercase letter'
    },
    upper: {
      body: new pexprs.UnicodeChar('Lu'),
      formals: [],
      description: 'an uppercase letter'
    },

    // The union of Lt (titlecase), Lm (modifier), and Lo (other), i.e. any letter not
    // in Ll or Lu.
    unicodeLtmo: {
      body: new pexprs.UnicodeChar('Ltmo'),
      formals: []
    }
  }
);

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Grammar;

},{"./MatchResult":33,"./Semantics":36,"./State":37,"./common":39,"./errors":40,"./pexprs":59}],30:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var Grammar = require('./Grammar');
var InputStream = require('./InputStream');
var common = require('./common');
var errors = require('./errors');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Private Stuff
// --------------------------------------------------------------------

// Constructors

function GrammarDecl(name) {
  this.name = name;
}

// Helpers

GrammarDecl.prototype.sourceInterval = function(startIdx, endIdx) {
  var inputStream = this.source.inputStream;
  return inputStream.interval(startIdx, endIdx);
};

GrammarDecl.prototype.ensureSuperGrammar = function() {
  if (!this.superGrammar) {
    this.withSuperGrammar(
        // TODO: The conditional expression below is an ugly hack. It's kind of ok because
        // I doubt anyone will ever try to declare a grammar called `BuiltInRules`. Still,
        // we should try to find a better way to do this.
        this.name === 'BuiltInRules' ?
            Grammar.ProtoBuiltInRules :
            Grammar.BuiltInRules);
  }
  return this.superGrammar;
};

GrammarDecl.prototype.installOverriddenOrExtendedRule = function(name, formals, body, source) {
  var duplicateParameterNames = common.getDuplicates(formals);
  if (duplicateParameterNames.length > 0) {
    throw errors.duplicateParameterNames(name, duplicateParameterNames, body, source);
  }
  var ruleInfo = this.ensureSuperGrammar().rules[name];
  var expectedFormals = ruleInfo.formals;
  var expectedNumFormals = expectedFormals ? expectedFormals.length : 0;
  if (formals.length !== expectedNumFormals) {
    throw errors.wrongNumberOfParameters(name, expectedNumFormals, formals.length, body, source);
  }
  return this.install(name, formals, body, ruleInfo.description, source);
};

GrammarDecl.prototype.install = function(name, formals, body, description, source) {
  this.rules[name] = {
    body: body.introduceParams(formals),
    formals: formals,
    description: description,
    source: source
  };
  return this;
};

// Stuff that you should only do once

GrammarDecl.prototype.withSuperGrammar = function(superGrammar) {
  if (this.superGrammar) {
    throw new Error('the super grammar of a GrammarDecl cannot be set more than once');
  }
  this.superGrammar = superGrammar;
  this.rules = Object.create(superGrammar.rules);

  // Grammars with an explicit supergrammar inherit a default start rule.
  if (!superGrammar.isBuiltIn()) {
    this.defaultStartRule = superGrammar.defaultStartRule;
  }
  return this;
};

GrammarDecl.prototype.withDefaultStartRule = function(ruleName) {
  this.defaultStartRule = ruleName;
  return this;
};

GrammarDecl.prototype.withSource = function(source) {
  this.source = new InputStream(source).interval(0, source.length);
  return this;
};

// Creates a Grammar instance, and if it passes the sanity checks, returns it.
GrammarDecl.prototype.build = function() {
  var grammar = new Grammar(
      this.name,
      this.ensureSuperGrammar(),
      this.rules,
      this.defaultStartRule);

  // TODO: change the pexpr.prototype.assert... methods to make them add
  // exceptions to an array that's provided as an arg. Then we'll be able to
  // show more than one error of the same type at a time.
  // TODO: include the offending pexpr in the errors, that way we can show
  // the part of the source that caused it.
  var grammarErrors = [];
  var grammarHasInvalidApplications = false;
  Object.keys(grammar.rules).forEach(function(ruleName) {
    var body = grammar.rules[ruleName].body;
    try {
      body.assertChoicesHaveUniformArity(ruleName);
    } catch (e) {
      grammarErrors.push(e);
    }
    try {
      body.assertAllApplicationsAreValid(ruleName, grammar);
    } catch (e) {
      grammarErrors.push(e);
      grammarHasInvalidApplications = true;
    }
  });
  if (!grammarHasInvalidApplications) {
    // The following check can only be done if the grammar has no invalid applications.
    Object.keys(grammar.rules).forEach(function(ruleName) {
      var body = grammar.rules[ruleName].body;
      try {
        body.assertIteratedExprsAreNotNullable(grammar, ruleName);
      } catch (e) {
        grammarErrors.push(e);
      }
    });
  }
  if (grammarErrors.length > 0) {
    errors.throwErrors(grammarErrors);
  }
  if (this.source) {
    grammar.source = this.source;
  }

  return grammar;
};

// Rule declarations

GrammarDecl.prototype.define = function(name, formals, body, description, source) {
  this.ensureSuperGrammar();
  if (this.superGrammar.rules[name]) {
    throw errors.duplicateRuleDeclaration(name, this.name, this.superGrammar.name, body, source);
  } else if (this.rules[name]) {
    throw errors.duplicateRuleDeclaration(name, this.name, this.name, body, source);
  }
  var duplicateParameterNames = common.getDuplicates(formals);
  if (duplicateParameterNames.length > 0) {
    throw errors.duplicateParameterNames(name, duplicateParameterNames, body, source);
  }
  return this.install(name, formals, body, description, source);
};

GrammarDecl.prototype.override = function(name, formals, body, descIgnored, source) {
  var ruleInfo = this.ensureSuperGrammar().rules[name];
  if (!ruleInfo) {
    throw errors.cannotOverrideUndeclaredRule(name, this.superGrammar.name, body, source);
  }
  this.installOverriddenOrExtendedRule(name, formals, body, source);
  return this;
};

GrammarDecl.prototype.extend = function(name, formals, fragment, descIgnored, source) {
  var ruleInfo = this.ensureSuperGrammar().rules[name];
  if (!ruleInfo) {
    throw errors.cannotExtendUndeclaredRule(name, this.superGrammar.name, fragment, source);
  }
  var body = new pexprs.Extend(this.superGrammar, name, fragment);
  body.source = fragment.source;
  this.installOverriddenOrExtendedRule(name, formals, body, source);
  return this;
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = GrammarDecl;

},{"./Grammar":29,"./InputStream":31,"./common":39,"./errors":40,"./pexprs":59}],31:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var Interval = require('./Interval');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function InputStream(source) {
  this.source = source;
  this.pos = 0;
  this.posInfos = [];
}

InputStream.prototype = {
  atEnd: function() {
    return this.pos === this.source.length;
  },

  next: function() {
    return this.source[this.pos++];
  },

  matchString: function(s) {
    for (var idx = 0; idx < s.length; idx++) {
      if (this.next() !== s[idx]) {
        return false;
      }
    }
    return true;
  },

  sourceSlice: function(startIdx, endIdx) {
    return this.source.slice(startIdx, endIdx);
  },

  interval: function(startIdx, optEndIdx) {
    return new Interval(this, startIdx, optEndIdx ? optEndIdx : this.pos);
  }
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = InputStream;

},{"./Interval":32}],32:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var assert = require('./common').assert;
var errors = require('./errors');
var util = require('./util');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function Interval(inputStream, startIdx, endIdx) {
  this.inputStream = inputStream;
  this.startIdx = startIdx;
  this.endIdx = endIdx;
}

Interval.coverage = function(/* interval1, interval2, ... */) {
  var inputStream = arguments[0].inputStream;
  var startIdx = arguments[0].startIdx;
  var endIdx = arguments[0].endIdx;
  for (var idx = 1; idx < arguments.length; idx++) {
    var interval = arguments[idx];
    if (interval.inputStream !== inputStream) {
      throw errors.intervalSourcesDontMatch();
    } else {
      startIdx = Math.min(startIdx, arguments[idx].startIdx);
      endIdx = Math.max(endIdx, arguments[idx].endIdx);
    }
  }
  return new Interval(inputStream, startIdx, endIdx);
};

Interval.prototype = {
  coverageWith: function(/* interval1, interval2, ... */) {
    var intervals = Array.prototype.slice.call(arguments);
    intervals.push(this);
    return Interval.coverage.apply(undefined, intervals);
  },

  collapsedLeft: function() {
    return new Interval(this.inputStream, this.startIdx, this.startIdx);
  },

  collapsedRight: function() {
    return new Interval(this.inputStream, this.endIdx, this.endIdx);
  },

  getLineAndColumnMessage: function() {
    var range = [this.startIdx, this.endIdx];
    return util.getLineAndColumnMessage(this.inputStream.source, this.startIdx, range);
  },

  // Returns an array of 0, 1, or 2 intervals that represents the result of the
  // interval difference operation.
  minus: function(that) {
    if (this.inputStream !== that.inputStream) {
      throw errors.intervalSourcesDontMatch();
    } else if (this.startIdx === that.startIdx && this.endIdx === that.endIdx) {
      // `this` and `that` are the same interval!
      return [
      ];
    } else if (this.startIdx < that.startIdx && that.endIdx < this.endIdx) {
      // `that` splits `this` into two intervals
      return [
        new Interval(this.inputStream, this.startIdx, that.startIdx),
        new Interval(this.inputStream, that.endIdx, this.endIdx)
      ];
    } else if (this.startIdx < that.endIdx && that.endIdx < this.endIdx) {
      // `that` contains a prefix of `this`
      return [
        new Interval(this.inputStream, that.endIdx, this.endIdx)
      ];
    } else if (this.startIdx < that.startIdx && that.startIdx < this.endIdx) {
      // `that` contains a suffix of `this`
      return [
        new Interval(this.inputStream, this.startIdx, that.startIdx)
      ];
    } else {
      // `that` and `this` do not overlap
      return [
        this
      ];
    }
  },

  // Returns a new Interval that has the same extent as this one, but which is relative
  // to `that`, an Interval that fully covers this one.
  relativeTo: function(that, newInputStream) {
    if (this.inputStream !== that.inputStream) {
      throw errors.intervalSourcesDontMatch();
    }
    assert(this.startIdx >= that.startIdx && this.endIdx <= that.endIdx,
           'other interval does not cover this one');
    return new Interval(newInputStream,
                        this.startIdx - that.startIdx,
                        this.endIdx - that.startIdx);
  },

  // Returns a new Interval which contains the same contents as this one,
  // but with whitespace trimmed from both ends. (This only makes sense when
  // the input stream is a string.)
  trimmed: function() {
    var contents = this.contents;
    var startIdx = this.startIdx + contents.match(/^\s*/)[0].length;
    var endIdx = this.endIdx - contents.match(/\s*$/)[0].length;
    return new Interval(this.inputStream, startIdx, endIdx);
  }
};

Object.defineProperties(Interval.prototype, {
  contents: {
    get: function() {
      if (this._contents === undefined) {
        this._contents = this.inputStream.sourceSlice(this.startIdx, this.endIdx);
      }
      return this._contents;
    },
    enumerable: true
  },
  length: {
    get: function() { return this.endIdx - this.startIdx; },
    enumerable: true
  }
});

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Interval;


},{"./common":39,"./errors":40,"./util":60}],33:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var inherits = require('inherits');

var common = require('./common');
var nodes = require('./nodes');
var util = require('./util');
var Interval = require('./Interval');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

// Create a short error message for an error that occurred during matching.
function getShortMatchErrorMessage(pos, source, detail) {
  var errorInfo = util.getLineAndColumn(source, pos);
  return 'Line ' + errorInfo.lineNum + ', col ' + errorInfo.colNum + ': ' + detail;
}

// ----------------- MatchFailure -----------------

function MatchResult(state) {
  this.state = state;
  this._cst = state.bindings[0];
}

MatchResult.newFor = function(state) {
  var succeeded = state.bindings.length > 0;
  return succeeded ? new MatchResult(state) : new MatchFailure(state);
};

MatchResult.prototype.failed = function() {
  return false;
};

MatchResult.prototype.succeeded = function() {
  return !this.failed();
};

// Returns a `MatchResult` that can be fed into operations or attributes that care
// about the whitespace that was implicitly skipped over by syntactic rules. This
// is useful for doing things with comments, e.g., syntax highlighting.
MatchResult.prototype.getDiscardedSpaces = function() {
  if (this.failed()) {
    return [];
  }

  var state = this.state;
  var grammar = state.grammar;
  var inputStream = state.inputStream;

  var intervals = [new Interval(inputStream, 0, inputStream.source.length)];

  // Subtract the interval of each terminal from the set of intervals above.
  var s = grammar.createSemantics().addOperation('subtractTerminals', {
    _nonterminal: function(children) {
      children.forEach(function(child) {
        child.subtractTerminals();
      });
    },
    _terminal: function() {
      var t = this;
      intervals = intervals
          .map(function(interval) { return interval.minus(t.source); })
          .reduce(function(xs, ys) { return xs.concat(ys); }, []);
    }
  });
  s(this).subtractTerminals();

  // Now `intervals` holds the intervals of the input stream that were skipped over by syntactic
  // rules, because they contained spaces.

  // Next, we want to match the contents of each of those intervals with the grammar's `spaces`
  // rule, to reconstruct the CST nodes that were discarded by syntactic rules. But if we simply
  // pass each interval's `contents` to the grammar's `match` method, the resulting nodes and
  // their children will have intervals that are associated with a different input, i.e., a
  // substring of the original input. The following operation will fix this problem for us.
  s.addOperation('fixIntervals(idxOffset)', {
    _default: function(children) {
      var idxOffset = this.args.idxOffset;
      this.source.inputStream = inputStream;
      this.source.startIdx += idxOffset;
      this.source.endIdx += idxOffset;
      if (!this.isTerminal()) {
        children.forEach(function(child) {
          child.fixIntervals(idxOffset);
        });
      }
    }
  });

  // Now we're finally ready to reconstruct the discarded CST nodes.
  var discardedNodes = intervals.map(function(interval) {
    var r = grammar.match(interval.contents, 'spaces');
    s(r).fixIntervals(interval.startIdx);
    return r._cst;
  });

  // Rather than return a bunch of CST nodes and make the caller of this method loop over them,
  // we can construct a single CST node that is the parent of all of the discarded nodes. An
  // `IterationNode` is the obvious choice for this.
  discardedNodes = new nodes.IterationNode(
      grammar,
      discardedNodes,
      discardedNodes.length === 0 ?
          new Interval(inputStream, 0, 0) :
          new Interval(
              inputStream,
              discardedNodes[0].source.startIdx,
              discardedNodes[discardedNodes.length - 1].source.endIdx));

  // But remember that a CST node can't be used directly by clients. What we really need to return
  // from this method is a successful `MatchResult` that can be used with the clients' semantics.
  // We already have one -- `this` -- but it's got a different CST node inside. So we create a new
  // object that delegates to `this`, and override its `_cst` property.
  var r = Object.create(this);
  r._cst = discardedNodes;

  // We also override its `getDiscardedSpaces` method, in case someone decides to call it.
  r.getDiscardedSpaces = function() { return r; };

  return r;
};

// ----------------- MatchFailure -----------------

function MatchFailure(state) {
  this.state = state;
  common.defineLazyProperty(this, '_failures', function() {
    return this.state.getFailures();
  });
  common.defineLazyProperty(this, 'message', function() {
    var source = this.state.inputStream.source;
    if (typeof source !== 'string') {
      return 'match failed at position ' + this.getRightmostFailurePosition();
    }

    var detail = 'Expected ' + this.getExpectedText();
    return util.getLineAndColumnMessage(source, this.getRightmostFailurePosition()) + detail;
  });
  common.defineLazyProperty(this, 'shortMessage', function() {
    if (typeof this.state.inputStream.source !== 'string') {
      return 'match failed at position ' + this.getRightmostFailurePosition();
    }
    var detail = 'expected ' + this.getExpectedText();
    return getShortMatchErrorMessage(
        this.getRightmostFailurePosition(),
        this.state.inputStream.source,
        detail);
  });
}
inherits(MatchFailure, MatchResult);

MatchFailure.prototype.toString = function() {
  return '[MatchFailure at position ' + this.getRightmostFailurePosition() + ']';
};

MatchFailure.prototype.failed = function() {
  return true;
};

MatchFailure.prototype.getRightmostFailurePosition = function() {
  return this.state.getRightmostFailurePosition();
};

MatchFailure.prototype.getRightmostFailures = function() {
  return this._failures;
};

// Return a string summarizing the expected contents of the input stream when
// the match failure occurred.
MatchFailure.prototype.getExpectedText = function() {
  var sb = new common.StringBuffer();
  var failures = this.getRightmostFailures();

  // Filter out the fluffy failures to make the default error messages more useful
  failures = failures.filter(function(failure) {
    return !failure.isFluffy();
  });

  for (var idx = 0; idx < failures.length; idx++) {
    if (idx > 0) {
      if (idx === failures.length - 1) {
        sb.append((failures.length > 2 ? ', or ' : ' or '));
      } else {
        sb.append(', ');
      }
    }
    sb.append(failures[idx].toString());
  }
  return sb.contents();
};

MatchFailure.prototype.getInterval = function() {
  var pos = this.state.getRightmostFailurePosition();
  return new Interval(this.state.inputStream, pos, pos);
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = MatchResult;

},{"./Interval":32,"./common":39,"./nodes":42,"./util":60,"inherits":24}],34:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var extend = require('util-extend');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function Namespace() {
}
Namespace.prototype = Object.create(null);

Namespace.asNamespace = function(objOrNamespace) {
  if (objOrNamespace instanceof Namespace) {
    return objOrNamespace;
  }
  return Namespace.createNamespace(objOrNamespace);
};

// Create a new namespace. If `optProps` is specified, all of its properties
// will be copied to the new namespace.
Namespace.createNamespace = function(optProps) {
  return Namespace.extend(Namespace.prototype, optProps);
};

// Create a new namespace which extends another namespace. If `optProps` is
// specified, all of its properties will be copied to the new namespace.
Namespace.extend = function(namespace, optProps) {
  if (namespace !== Namespace.prototype && !(namespace instanceof Namespace)) {
    throw new TypeError('not a Namespace object: ' + namespace);
  }
  var ns = Object.create(namespace, {
    constructor: {
      value: Namespace,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  return extend(ns, optProps);
};

// TODO: Should this be a regular method?
Namespace.toString = function(ns) {
  return Object.prototype.toString.call(ns);
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Namespace;

},{"util-extend":26}],35:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function PosInfo(state) {
  this.state = state;
  this.applicationMemoKeyStack = [];  // a stack of "memo keys" of the active applications
  this.memo = {};
  this.currentLeftRecursion = undefined;
}

PosInfo.prototype = {
  isActive: function(application) {
    return this.applicationMemoKeyStack.indexOf(application.toMemoKey()) >= 0;
  },

  enter: function(application) {
    this.state.enter(application);
    this.applicationMemoKeyStack.push(application.toMemoKey());
  },

  exit: function() {
    this.state.exit();
    this.applicationMemoKeyStack.pop();
  },

  startLeftRecursion: function(headApplication, memoRec) {
    memoRec.isLeftRecursion = true;
    memoRec.headApplication = headApplication;
    memoRec.nextLeftRecursion = this.currentLeftRecursion;
    this.currentLeftRecursion = memoRec;

    var applicationMemoKeyStack = this.applicationMemoKeyStack;
    var indexOfFirstInvolvedRule = applicationMemoKeyStack.indexOf(headApplication.toMemoKey()) + 1;
    var involvedApplicationMemoKeys = applicationMemoKeyStack.slice(indexOfFirstInvolvedRule);

    memoRec.isInvolved = function(applicationMemoKey) {
      return involvedApplicationMemoKeys.indexOf(applicationMemoKey) >= 0;
    };

    memoRec.updateInvolvedApplicationMemoKeys = function() {
      for (var idx = indexOfFirstInvolvedRule; idx < applicationMemoKeyStack.length; idx++) {
        var applicationMemoKey = applicationMemoKeyStack[idx];
        if (!this.isInvolved(applicationMemoKey)) {
          involvedApplicationMemoKeys.push(applicationMemoKey);
        }
      }
    };
  },

  endLeftRecursion: function() {
    this.currentLeftRecursion = this.currentLeftRecursion.nextLeftRecursion;
  },

  // Note: this method doesn't get called for the "head" of a left recursion -- for LR heads,
  // the memoized result (which starts out being a failure) is always used.
  shouldUseMemoizedResult: function(memoRec) {
    if (!memoRec.isLeftRecursion) {
      return true;
    }
    var applicationMemoKeyStack = this.applicationMemoKeyStack;
    for (var idx = 0; idx < applicationMemoKeyStack.length; idx++) {
      var applicationMemoKey = applicationMemoKeyStack[idx];
      if (memoRec.isInvolved(applicationMemoKey)) {
        return false;
      }
    }
    return true;
  }
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = PosInfo;

},{}],36:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var Symbol = require('es6-symbol');  // eslint-disable-line no-undef
var inherits = require('inherits');

var MatchResult = require('./MatchResult');
var IterationNode = require('./nodes').IterationNode;
var common = require('./common');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

// JSON is not a valid subset of JavaScript because there are two possible line terminators,
// U+2028 (line separator) and U+2029 (paragraph separator) that are allowed in JSON strings
// but not in JavaScript strings.
// jsonToJS() properly encodes those two characters in JSON so that it can seamlessly be
// inserted into JavaScript code (plus the encoded version is still valid JSON)
function jsonToJS(str) {
  var output = str.replace(/[\u2028\u2029]/g, function(char, pos, str) {
    var hex = char.codePointAt(0).toString(16);
    return '\\u' + '0000'.slice(hex.length) + hex;
  });
  return output;
}

// ----------------- Wrappers -----------------

// Wrappers decorate CST nodes with all of the functionality (i.e., operations and attributes)
// provided by a Semantics (see below). `Wrapper` is the abstract superclass of all wrappers. A
// `Wrapper` must have `_node` and `_semantics` instance variables, which refer to the CST node and
// Semantics (resp.) for which it was created, and a `_childWrappers` instance variable which is
// used to cache the wrapper instances that are created for its child nodes. Setting these instance
// variables is the responsibility of the constructor of each Semantics-specific subclass of
// `Wrapper`.
function Wrapper() {}

Wrapper.prototype.toString = function() {
  return '[semantics wrapper for ' + this._node.grammar.name + ']';
};

Wrapper.prototype._forgetMemoizedResultFor = function(attributeName) {
  // Remove the memoized attribute from the cstNode and all its children.
  delete this._node[this._semantics.attributeKeys[attributeName]];
  this.children.forEach(function(child) {
    child._forgetMemoizedResultFor(attributeName);
  });
};

// Returns the wrapper of the specified child node. Child wrappers are created lazily and cached in
// the parent wrapper's `_childWrappers` instance variable.
Wrapper.prototype.child = function(idx) {
  if (!(0 <= idx && idx < this._node.numChildren())) {
    // TODO: Consider throwing an exception here.
    return undefined;
  }
  var childWrapper = this._childWrappers[idx];
  if (!childWrapper) {
    childWrapper = this._childWrappers[idx] = this._semantics.wrap(this._node.childAt(idx));
  }
  return childWrapper;
};

// Returns an array containing the wrappers of all of the children of the node associated with this
// wrapper.
Wrapper.prototype._children = function() {
  // Force the creation of all child wrappers
  for (var idx = 0; idx < this._node.numChildren(); idx++) {
    this.child(idx);
  }
  return this._childWrappers;
};

// Returns `true` if the CST node associated with this wrapper corresponds to an iteration
// expression, i.e., a Kleene-*, Kleene-+, or an optional. Returns `false` otherwise.
Wrapper.prototype.isIteration = function() {
  return this._node.isIteration();
};

// Returns `true` if the CST node associated with this wrapper is a terminal node, `false`
// otherwise.
Wrapper.prototype.isTerminal = function() {
  return this._node.isTerminal();
};

// Returns `true` if the CST node associated with this wrapper is a nonterminal node, `false`
// otherwise.
Wrapper.prototype.isNonterminal = function() {
  return this._node.isNonterminal();
};

// Returns `true` if the CST node associated with this wrapper is a nonterminal node
// corresponding to a syntactic rule, `false` otherwise.
Wrapper.prototype.isSyntactic = function() {
  return this.isNonterminal() && this._node.isSyntactic();
};

// Returns `true` if the CST node associated with this wrapper is a nonterminal node
// corresponding to a lexical rule, `false` otherwise.
Wrapper.prototype.isLexical = function() {
  return this.isNonterminal() && this._node.isLexical();
};

// Returns `true` if the CST node associated with this wrapper is an iterator node
// having either one or no child (? operator), `false` otherwise.
// Otherwise, throws an exception.
Wrapper.prototype.isOptional = function() {
  return this._node.isOptional();
};

// Create a new IterationNode in the same semantics as this wrapper.
Wrapper.prototype.iteration = function(optElements) {
  var iter = new IterationNode(this._node.grammar, optElements || [], this.source, false);
  return this._semantics.wrap(iter);
};

Object.defineProperties(Wrapper.prototype, {
  // Returns an array containing the children of this CST node.
  children: {get: function() { return this._children(); }},

  // Returns the name of grammar rule that created this CST node.
  ctorName: {get: function() { return this._node.ctorName; }},

  // TODO: Remove this eventually (deprecated in v0.12).
  interval: {get: function() {
    throw new Error('The `interval` property is deprecated -- use `source` instead');
  }},

  // Returns the interval consumed by the CST node associated with this wrapper.
  source: {get: function() { return this._node.source; }},

  // Returns the number of children of this CST node.
  numChildren: {get: function() { return this._node.numChildren(); }},

  // Returns the primitive value of this CST node, if it's a terminal node. Otherwise,
  // throws an exception.
  primitiveValue: {
    get: function() {
      if (this.isTerminal()) {
        return this._node.primitiveValue;
      }
      throw new TypeError(
          "tried to access the 'primitiveValue' attribute of a non-terminal CST node");
    }
  },

  // Returns the contents of the input stream consumed by this CST node.
  sourceString: {get: function() { return this.source.contents; }}
});

// ----------------- Semantics -----------------

// A Semantics is a container for a family of Operations and Attributes for a given grammar.
// Semantics enable modularity (different clients of a grammar can create their set of operations
// and attributes in isolation) and extensibility even when operations and attributes are mutually-
// recursive. This constructor should not be called directly except from
// `Semantics.createSemantics`. The normal ways to create a Semantics, given a grammar 'g', are
// `g.createSemantics()` and `g.extendSemantics(parentSemantics)`.
function Semantics(grammar, superSemantics) {
  var self = this;
  this.grammar = grammar;
  this.checkedActionDicts = false;

  // Constructor for wrapper instances, which are passed as the arguments to the semantic actions
  // of an operation or attribute. Operations and attributes require double dispatch: the semantic
  // action is chosen based on both the node's type and the semantics. Wrappers ensure that
  // the `execute` method is called with the correct (most specific) semantics object as an
  // argument.
  this.Wrapper = function(node) {
    self.checkActionDictsIfHaventAlready();
    this._semantics = self;
    this._node = node;
    this._childWrappers = [];
  };

  this.super = superSemantics;
  if (superSemantics) {
    if (grammar !== this.super.grammar && !grammar._inheritsFrom(this.super.grammar)) {
      throw new Error(
          "Cannot extend a semantics for grammar '" + this.super.grammar.name +
          "' for use with grammar '" + grammar.name + "' (not a sub-grammar)");
    }
    inherits(this.Wrapper, this.super.Wrapper);
    this.operations = Object.create(this.super.operations);
    this.attributes = Object.create(this.super.attributes);
    this.attributeKeys = Object.create(null);

    // Assign unique symbols for each of the attributes inherited from the super-semantics so that
    // they are memoized independently.
    for (var attributeName in this.attributes) {
      this.attributeKeys[attributeName] = Symbol();
    }
  } else {
    inherits(this.Wrapper, Wrapper);
    this.operations = Object.create(null);
    this.attributes = Object.create(null);
    this.attributeKeys = Object.create(null);
  }
}

Semantics.prototype.toString = function() {
  return '[semantics for ' + this.grammar.name + ']';
};

Semantics.prototype.checkActionDictsIfHaventAlready = function() {
  if (!this.checkedActionDicts) {
    this.checkActionDicts();
    this.checkedActionDicts = true;
  }
};

// Checks that the action dictionaries for all operations and attributes in this semantics,
// including the ones that were inherited from the super-semantics, agree with the grammar.
// Throws an exception if one or more of them doesn't.
Semantics.prototype.checkActionDicts = function() {
  var name;
  for (name in this.operations) {
    this.operations[name].checkActionDict(this.grammar);
  }
  for (name in this.attributes) {
    this.attributes[name].checkActionDict(this.grammar);
  }
};

Semantics.prototype.toRecipe = function(semanticsOnly) {
  function hasSuperSemantics(s) {
    return s.super !== Semantics.BuiltInSemantics._getSemantics();
  }

  var str = '(function(g) {\n';
  if (hasSuperSemantics(this)) {
    str += '  var semantics = ' + this.super.toRecipe(true) + '(g';

    var superSemanticsGrammar = this.super.grammar;
    var relatedGrammar = this.grammar;
    while (relatedGrammar !== superSemanticsGrammar) {
      str += '.superGrammar';
      relatedGrammar = relatedGrammar.superGrammar;
    }

    str += ');\n';
    str += '  return g.extendSemantics(semantics)';
  } else {
    str += '  return g.createSemantics()';
  }
  ['Operation', 'Attribute'].forEach(function(type) {
    var semanticOperations = this[type.toLowerCase() + 's'];
    Object.keys(semanticOperations).forEach(function(name) {
      var signature = name;
      if (semanticOperations[name].formals.length > 0) {
        signature += '(' + semanticOperations[name].formals.join(', ') + ')';
      }

      var method;
      if (hasSuperSemantics(this) && this.super[type.toLowerCase() + 's'][name]) {
        method = 'extend' + type;
      } else {
        method = 'add' + type;
      }
      str += '\n    .' + method + '(' + JSON.stringify(signature) + ', {';

      var actions = semanticOperations[name].actionDict;
      var srcArray = [];
      Object.keys(actions).forEach(function(actionName) {
        if (semanticOperations[name].builtInDefault !== actions[actionName]) {
          srcArray.push('\n      ' + JSON.stringify(actionName) + ': ' +
            actions[actionName].toString());
        }
      });
      str += srcArray.join(',');

      str += '\n    })';
    }, this);
  }, this);
  str += ';\n  })';

  if (!semanticsOnly) {
    str =
      '(function() {\n' +
      '  var grammar = this.fromRecipe(' + jsonToJS(this.grammar.toRecipe()) + ');\n' +
      '  var semantics = ' + str + '(grammar);\n' +
      '  return semantics;\n' +
      '});\n';
  }

  return str;
};

var prototypeGrammar;
var prototypeGrammarSemantics;

// This method is called from main.js once Ohm has loaded.
Semantics.initPrototypeParser = function(grammar) {
  prototypeGrammarSemantics = grammar.createSemantics().addOperation('parse', {
    AttributeSignature: function(name) {
      return {
        name: name.parse(),
        formals: []
      };
    },
    OperationSignature: function(name, optFormals) {
      return {
        name: name.parse(),
        formals: optFormals.parse()[0] || []
      };
    },
    Formals: function(oparen, fs, cparen) {
      return fs.asIteration().parse();
    },
    name: function(first, rest) {
      return this.sourceString;
    }
  });
  prototypeGrammar = grammar;
};

function parseSignature(signature, type) {
  if (!prototypeGrammar) {
    // The Operations and Attributes grammar won't be available while Ohm is loading,
    // but we can get away the following simplification b/c none of the operations
    // that are used while loading take arguments.
    common.assert(signature.indexOf('(') === -1);
    return {
      name: signature,
      formals: []
    };
  }

  var r = prototypeGrammar.match(
      signature,
      type === 'operation' ? 'OperationSignature' : 'AttributeSignature');
  if (r.failed()) {
    throw new Error(r.message);
  }

  return prototypeGrammarSemantics(r).parse();
}

function newDefaultAction(type, name, doIt) {
  return function(children) {
    var self = this;
    var thisThing = this._semantics.operations[name] || this._semantics.attributes[name];
    var args = thisThing.formals.map(function(formal) {
      return self.args[formal];
    });

    if (this.isIteration()) {
      // This CST node corresponds to an iteration expression in the grammar (*, +, or ?). The
      // default behavior is to map this operation or attribute over all of its child nodes.
      return children.map(function(child) { return doIt.apply(child, args); });
    }

    // This CST node corresponds to a non-terminal in the grammar (e.g., AddExpr). The fact that
    // we got here means that this action dictionary doesn't have an action for this particular
    // non-terminal or a generic `_nonterminal` action.
    if (children.length === 1) {
      // As a convenience, if this node only has one child, we just return the result of
      // applying this operation / attribute to the child node.
      return doIt.apply(children[0], args);
    } else {
      // Otherwise, we throw an exception to let the programmer know that we don't know what
      // to do with this node.
      throw new Error(
          'Missing semantic action for ' + this.ctorName + ' in ' + name + ' ' + type);
    }
  };
}

Semantics.prototype.addOperationOrAttribute = function(type, signature, actionDict) {
  var typePlural = type + 's';

  var parsedNameAndFormalArgs = parseSignature(signature, type);
  var name = parsedNameAndFormalArgs.name;
  var formals = parsedNameAndFormalArgs.formals;

  // TODO: check that there are no duplicate formal arguments

  this.assertNewName(name, type);

  // Create the action dictionary for this operation / attribute that contains a `_default` action
  // which defines the default behavior of iteration, terminal, and non-terminal nodes...
  var builtInDefault = newDefaultAction(type, name, doIt);
  var realActionDict = {_default: builtInDefault};
  // ... and add in the actions supplied by the programmer, which may override some or all of the
  // default ones.
  Object.keys(actionDict).forEach(function(name) {
    realActionDict[name] = actionDict[name];
  });

  var entry = type === 'operation' ?
      new Operation(name, formals, realActionDict, builtInDefault) :
      new Attribute(name, realActionDict, builtInDefault);

  // The following check is not strictly necessary (it will happen later anyway) but it's better to
  // catch errors early.
  entry.checkActionDict(this.grammar);

  this[typePlural][name] = entry;

  function doIt() {
    // Dispatch to most specific version of this operation / attribute -- it may have been
    // overridden by a sub-semantics.
    var thisThing = this._semantics[typePlural][name];

    // Check that the caller passed the correct number of arguments.
    if (arguments.length !== thisThing.formals.length) {
      throw new Error(
          'Invalid number of arguments passed to ' + name + ' ' + type + ' (expected ' +
          thisThing.formals.length + ', got ' + arguments.length + ')');
    }

    // Create an "arguments object" from the arguments that were passed to this
    // operation / attribute.
    var args = Object.create(null);
    for (var idx = 0; idx < arguments.length; idx++) {
      var formal = thisThing.formals[idx];
      args[formal] = arguments[idx];
    }

    var oldArgs = this.args;
    this.args = args;
    var ans = thisThing.execute(this._semantics, this);
    this.args = oldArgs;
    return ans;
  }

  if (type === 'operation') {
    this.Wrapper.prototype[name] = doIt;
    this.Wrapper.prototype[name].toString = function() {
      return '[' + name + ' operation]';
    };
  } else {
    Object.defineProperty(this.Wrapper.prototype, name, {
      get: doIt,
      configurable: true  // So the property can be deleted.
    });
    this.attributeKeys[name] = Symbol();
  }
};

Semantics.prototype.extendOperationOrAttribute = function(type, name, actionDict) {
  var typePlural = type + 's';

  // Make sure that `name` really is just a name, i.e., that it doesn't also contain formals.
  parseSignature(name, 'attribute');

  if (!(this.super && name in this.super[typePlural])) {
    throw new Error('Cannot extend ' + type + " '" + name +
        "': did not inherit an " + type + ' with that name');
  }
  if (Object.prototype.hasOwnProperty.call(this[typePlural], name)) {
    throw new Error('Cannot extend ' + type + " '" + name + "' again");
  }

  // Create a new operation / attribute whose actionDict delegates to the super operation /
  // attribute's actionDict, and which has all the keys from `inheritedActionDict`.
  var inheritedFormals = this[typePlural][name].formals;
  var inheritedActionDict = this[typePlural][name].actionDict;
  var newActionDict = Object.create(inheritedActionDict);
  Object.keys(actionDict).forEach(function(name) {
    newActionDict[name] = actionDict[name];
  });

  this[typePlural][name] = type === 'operation' ?
      new Operation(name, inheritedFormals, newActionDict) :
      new Attribute(name, newActionDict);

  // The following check is not strictly necessary (it will happen later anyway) but it's better to
  // catch errors early.
  this[typePlural][name].checkActionDict(this.grammar);
};

Semantics.prototype.assertNewName = function(name, type) {
  if (Wrapper.prototype.hasOwnProperty(name)) {
    throw new Error(
        'Cannot add ' + type + " '" + name + "': that's a reserved name");
  }
  if (name in this.operations) {
    throw new Error(
        'Cannot add ' + type + " '" + name + "': an operation with that name already exists");
  }
  if (name in this.attributes) {
    throw new Error(
        'Cannot add ' + type + " '" + name + "': an attribute with that name already exists");
  }
};

// Returns a wrapper for the given CST `node` in this semantics.
// If `node` is already a wrapper, returns `node` itself.  // TODO: why is this needed?
Semantics.prototype.wrap = function(node) {
  return node instanceof this.Wrapper ? node : new this.Wrapper(node);
};

// Creates a new Semantics instance for `grammar`, inheriting operations and attributes from
// `optSuperSemantics`, if it is specified. Returns a function that acts as a proxy for the new
// Semantics instance. When that function is invoked with a CST node as an argument, it returns
// a wrapper for that node which gives access to the operations and attributes provided by this
// semantics.
Semantics.createSemantics = function(grammar, optSuperSemantics) {
  var s = new Semantics(
      grammar,
      optSuperSemantics !== undefined ?
          optSuperSemantics :
          Semantics.BuiltInSemantics._getSemantics());

  // To enable clients to invoke a semantics like a function, return a function that acts as a proxy
  // for `s`, which is the real `Semantics` instance.
  var proxy = function ASemantics(matchResult) {
    if (!(matchResult instanceof MatchResult)) {
      throw new TypeError(
          'Semantics expected a MatchResult, but got ' + common.unexpectedObjToString(matchResult));
    }
    if (!matchResult.succeeded()) {
      throw new TypeError(
          'cannot apply Semantics to ' + matchResult.toString());
    }

    var cst = matchResult._cst;
    if (cst.grammar !== grammar) {
      throw new Error(
          "Cannot use a MatchResult from grammar '" + cst.grammar.name +
          "' with a semantics for '" + grammar.name + "'");
    }
    return s.wrap(cst);
  };

  // Forward public methods from the proxy to the semantics instance.
  proxy.addOperation = function(signature, actionDict) {
    s.addOperationOrAttribute('operation', signature, actionDict);
    return proxy;
  };
  proxy.extendOperation = function(name, actionDict) {
    s.extendOperationOrAttribute('operation', name, actionDict);
    return proxy;
  };
  proxy.addAttribute = function(name, actionDict) {
    s.addOperationOrAttribute('attribute', name, actionDict);
    return proxy;
  };
  proxy.extendAttribute = function(name, actionDict) {
    s.extendOperationOrAttribute('attribute', name, actionDict);
    return proxy;
  };
  proxy._getActionDict = function(operationOrAttributeName) {
    var action = s.operations[operationOrAttributeName] || s.attributes[operationOrAttributeName];
    if (!action) {
      throw new Error('"' + operationOrAttributeName + '" is not a valid operation or attribute ' +
        'name in this semantics for "' + grammar.name + '"');
    }
    return action.actionDict;
  };
  proxy._remove = function(operationOrAttributeName) {
    var semantic;
    if (operationOrAttributeName in s.operations) {
      semantic = s.operations[operationOrAttributeName];
      delete s.operations[operationOrAttributeName];
    } else if (operationOrAttributeName in s.attributes) {
      semantic = s.attributes[operationOrAttributeName];
      delete s.attributes[operationOrAttributeName];
    }
    delete s.Wrapper.prototype[operationOrAttributeName];
    return semantic;
  };
  proxy.getOperationNames = function() {
    return Object.keys(s.operations);
  };
  proxy.getAttributeNames = function() {
    return Object.keys(s.attributes);
  };
  proxy.getGrammar = function() {
    return s.grammar;
  };
  proxy.toRecipe = function(semanticsOnly) {
    return s.toRecipe(semanticsOnly);
  };

  // Make the proxy's toString() work.
  proxy.toString = s.toString.bind(s);

  // Returns the semantics for the proxy.
  proxy._getSemantics = function() {
    return s;
  };

  return proxy;
};

Semantics.initBuiltInSemantics = function(builtInRules) {
  var actions = {
    empty: function() {
      return this.iteration();
    },
    nonEmpty: function(first, _, rest) {
      return this.iteration([first].concat(rest.children));
    }
  };

  Semantics.BuiltInSemantics = Semantics
      .createSemantics(builtInRules, null)
      .addOperation('asIteration', {
        emptyListOf: actions.empty,
        nonemptyListOf: actions.nonEmpty,
        EmptyListOf: actions.empty,
        NonemptyListOf: actions.nonEmpty
      });
};

// ----------------- Operation -----------------

// An Operation represents a function to be applied to a concrete syntax tree (CST) -- it's very
// similar to a Visitor (http://en.wikipedia.org/wiki/Visitor_pattern). An operation is executed by
// recursively walking the CST, and at each node, invoking the matching semantic action from
// `actionDict`. See `Operation.prototype.execute` for details of how a CST node's matching semantic
// action is found.
function Operation(name, formals, actionDict, builtInDefault) {
  this.name = name;
  this.formals = formals;
  this.actionDict = actionDict;
  this.builtInDefault = builtInDefault;
}

Operation.prototype.typeName = 'operation';

Operation.prototype.checkActionDict = function(grammar) {
  grammar._checkTopDownActionDict(this.typeName, this.name, this.actionDict);
};

// Execute this operation on the CST node associated with `nodeWrapper` in the context of the given
// Semantics instance.
Operation.prototype.execute = function(semantics, nodeWrapper) {
  // Look for a semantic action whose name matches the node's constructor name, which is either the
  // name of a rule in the grammar, or '_terminal' (for a terminal node), or '_iter' (for an
  // iteration node). In the latter case, the action function receives a single argument, which is
  // an array containing all of the children of the CST node.
  var actionFn = this.actionDict[nodeWrapper._node.ctorName];
  if (actionFn) {
    return this.doAction(semantics, nodeWrapper, actionFn, nodeWrapper.isIteration());
  }

  // The action dictionary does not contain a semantic action for this specific type of node.
  // If this is a nonterminal node and the programmer has provided a `_nonterminal` semantic
  // action, we invoke it:
  if (nodeWrapper.isNonterminal()) {
    actionFn = this.actionDict._nonterminal;
    if (actionFn) {
      return this.doAction(semantics, nodeWrapper, actionFn, true);
    }
  }

  // Otherwise, we invoke the '_default' semantic action.
  return this.doAction(semantics, nodeWrapper, this.actionDict._default, true);
};

// Invoke `actionFn` on the CST node that corresponds to `nodeWrapper`, in the context of
// `semantics`. If `optPassChildrenAsArray` is truthy, `actionFn` will be called with a single
// argument, which is an array of wrappers. Otherwise, the number of arguments to `actionFn` will
// be equal to the number of children in the CST node.
Operation.prototype.doAction = function(semantics, nodeWrapper, actionFn, optPassChildrenAsArray) {
  return optPassChildrenAsArray ?
      actionFn.call(nodeWrapper, nodeWrapper._children()) :
      actionFn.apply(nodeWrapper, nodeWrapper._children());
};

// ----------------- Attribute -----------------

// Attributes are Operations whose results are memoized. This means that, for any given semantics,
// the semantic action for a CST node will be invoked no more than once.
function Attribute(name, actionDict, builtInDefault) {
  this.name = name;
  this.formals = [];
  this.actionDict = actionDict;
  this.builtInDefault = builtInDefault;
}
inherits(Attribute, Operation);

Attribute.prototype.typeName = 'attribute';

Attribute.prototype.execute = function(semantics, nodeWrapper) {
  var node = nodeWrapper._node;
  var key = semantics.attributeKeys[this.name];
  if (!node.hasOwnProperty(key)) {
    // The following is a super-send -- isn't JS beautiful? :/
    node[key] = Operation.prototype.execute.call(this, semantics, nodeWrapper);
  }
  return node[key];
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Semantics;

},{"./MatchResult":33,"./common":39,"./nodes":42,"es6-symbol":19,"inherits":24}],37:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var InputStream = require('./InputStream');
var PosInfo = require('./PosInfo');
var Trace = require('./Trace');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

var RM_RIGHTMOST_FAILURE_POSITION = 0;
var RM_RIGHTMOST_FAILURES = 1;

var applySpaces = new pexprs.Apply('spaces');

function State(grammar, input, opts) {
  this.grammar = grammar;
  this.startExpr = this._getStartExpr(grammar, opts.startApplication);
  this.inputStream = new InputStream(input);
  this.tracingEnabled = opts.trace || false;
  this.init(RM_RIGHTMOST_FAILURE_POSITION);
}

State.prototype = {
  init: function(recordingMode) {
    this.posInfos = [];
    this.bindings = [];
    this.applicationStack = [];
    this.inLexifiedContextStack = [false];

    this.recordingMode = recordingMode;
    if (recordingMode === RM_RIGHTMOST_FAILURE_POSITION) {
      this.rightmostFailurePosition = -1;
    } else if (recordingMode === RM_RIGHTMOST_FAILURES) {
      // We always run in *rightmost failure position* recording mode before running in
      // *rightmost failures* recording mode. And since the traces generated by each of
      // these passes would be identical, there's no need to record it now if we have
      // already recorded it in the first pass.
      this.tracingEnabled = false;
    } else {
      throw new Error('invalid recording mode: ' + recordingMode);
    }

    if (this.isTracing()) {
      this.trace = [];
    }
  },

  enter: function(app) {
    this.applicationStack.push(app);
    this.inLexifiedContextStack.push(false);
  },

  exit: function() {
    this.applicationStack.pop();
    this.inLexifiedContextStack.pop();
  },

  enterLexifiedContext: function() {
    this.inLexifiedContextStack.push(true);
  },

  exitLexifiedContext: function() {
    this.inLexifiedContextStack.pop();
  },

  currentApplication: function() {
    return this.applicationStack[this.applicationStack.length - 1];
  },

  inSyntacticContext: function() {
    if (typeof this.inputStream.source !== 'string') {
      return false;
    }
    var currentApplication = this.currentApplication();
    if (currentApplication) {
      return currentApplication.isSyntactic() && !this.inLexifiedContext();
    } else {
      // The top-level context is syntactic if the start application is.
      return this.startExpr.factors[0].isSyntactic();
    }
  },

  inLexifiedContext: function() {
    return this.inLexifiedContextStack[this.inLexifiedContextStack.length - 1];
  },

  skipSpaces: function() {
    var origFailuresInfo = this.getFailuresInfo();
    this.eval(applySpaces);
    this.bindings.pop();
    this.restoreFailuresInfo(origFailuresInfo);
    return this.inputStream.pos;
  },

  skipSpacesIfInSyntacticContext: function() {
    return this.inSyntacticContext() ?
        this.skipSpaces() :
        this.inputStream.pos;
  },

  maybeSkipSpacesBefore: function(expr) {
    if (expr instanceof pexprs.Apply && expr.isSyntactic()) {
      return this.skipSpaces();
    } else if (expr.allowsSkippingPrecedingSpace() && expr !== applySpaces) {
      return this.skipSpacesIfInSyntacticContext();
    } else {
      return this.inputStream.pos;
    }
  },

  truncateBindings: function(newLength) {
    // Yes, this is this really faster than setting the `length` property (tested with
    // bin/es5bench on Node v6.1.0).
    while (this.bindings.length > newLength) {
      this.bindings.pop();
    }
  },

  getCurrentPosInfo: function() {
    return this.getPosInfo(this.inputStream.pos);
  },

  getPosInfo: function(pos) {
    var posInfo = this.posInfos[pos];
    if (!posInfo) {
      posInfo = this.posInfos[pos] = new PosInfo(this);
    }
    return posInfo;
  },

  processFailure: function(pos, expr) {
    if (this.recordingMode === RM_RIGHTMOST_FAILURE_POSITION) {
      if (pos > this.rightmostFailurePosition) {
        this.rightmostFailurePosition = pos;
      }
    } else /* if (this.recordingMode === RM_RIGHTMOST_FAILURES) */
        if (pos === this.rightmostFailurePosition) {
          // We're only interested in failures at the rightmost failure position that haven't
          // already been recorded.

          var app = this.currentApplication();
          if (app) {
            // Substitute parameters with the actual pexprs that were passed to
            // the current rule.
            expr = expr.substituteParams(app.args);
          } else {
            // This branch is only reached for the "end-check" that is
            // performed after the top-level application. In that case,
            // expr === pexprs.end so there is no need to substitute
            // parameters.
          }

          this.addRightmostFailure(expr.toFailure(this.grammar), false);
        }
  },

  ensureRightmostFailures: function() {
    if (!this.rightmostFailures) {
      this.rightmostFailures = Object.create(null);
    }
  },

  addRightmostFailure: function(failure, shouldCloneIfNew) {
    this.ensureRightmostFailures();
    var key = failure.toKey();
    if (!this.rightmostFailures[key]) {
      this.rightmostFailures[key] = shouldCloneIfNew ? failure.clone() : failure;
    } else if (this.rightmostFailures[key].isFluffy() && !failure.isFluffy()) {
      this.rightmostFailures[key].clearFluffy();
    }
  },

  addRightmostFailures: function(failures, shouldCloneIfNew) {
    var self = this;
    Object.keys(failures).forEach(function(key) {
      self.addRightmostFailure(failures[key], shouldCloneIfNew);
    });
  },

  cloneRightmostFailures: function() {
    if (!this.rightmostFailures) {
      return undefined;
    }

    var ans = Object.create(null);
    var self = this;
    Object.keys(this.rightmostFailures).forEach(function(key) {
      ans[key] = self.rightmostFailures[key].clone();
    });
    return ans;
  },

  getRightmostFailurePosition: function() {
    return this.rightmostFailurePosition;
  },

  getFailures: function() {
    if (this.recordingMode === RM_RIGHTMOST_FAILURE_POSITION) {
      // Rewind, then try to match the input again, recording failures.
      this.init(RM_RIGHTMOST_FAILURES);
      this.evalFromStart();
    }

    this.ensureRightmostFailures();
    var self = this;
    return Object.keys(this.rightmostFailures).map(function(key) {
      return self.rightmostFailures[key];
    });
  },

  // Returns the memoized trace entry for `expr` at `pos`, if one exists, `null` otherwise.
  getMemoizedTraceEntry: function(pos, expr) {
    var posInfo = this.posInfos[pos];
    if (posInfo && expr.ruleName) {
      var memoRec = posInfo.memo[expr.toMemoKey()];
      if (memoRec && memoRec.traceEntry) {
        var entry = memoRec.traceEntry.cloneWithExpr(expr);
        entry.isMemoized = true;
        return entry;
      }
    }
    return null;
  },

  // Returns a new trace entry, with the currently active trace array as its children.
  getTraceEntry: function(pos, expr, succeeded, bindings) {
    return this.getMemoizedTraceEntry(pos, expr) ||
           new Trace(this.inputStream, pos, expr, succeeded, bindings, this.trace);
  },

  isTracing: function() {
    return this.tracingEnabled;
  },

  useMemoizedResult: function(memoRec) {
    if (this.isTracing()) {
      this.trace.push(memoRec.traceEntry);
    }

    if (this.recordingMode === RM_RIGHTMOST_FAILURES && memoRec.failuresAtRightmostPosition) {
      this.addRightmostFailures(memoRec.failuresAtRightmostPosition, true);
    }

    if (memoRec.value) {
      this.inputStream.pos = memoRec.pos;
      this.bindings.push(memoRec.value);
      return true;
    }
    return false;
  },

  // Evaluate `expr` and return `true` if it succeeded, `false` otherwise. On success, `bindings`
  // will have `expr.getArity()` more elements than before, and the input stream's position may
  // have increased. On failure, `bindings` and position will be unchanged.
  eval: function(expr) {
    var inputStream = this.inputStream;
    var origNumBindings = this.bindings.length;

    var origFailures;
    if (this.recordingMode === RM_RIGHTMOST_FAILURES) {
      origFailures = this.rightmostFailures;
      this.rightmostFailures = undefined;
    }

    var origPos = inputStream.pos;
    var memoPos = this.maybeSkipSpacesBefore(expr);

    var origTrace;
    if (this.isTracing()) {
      origTrace = this.trace;
      this.trace = [];
    }

    // Do the actual evaluation.
    var ans = expr.eval(this);

    if (this.isTracing()) {
      var bindings = this.bindings.slice(origNumBindings);
      var traceEntry = this.getTraceEntry(memoPos, expr, ans, bindings);
      traceEntry.isImplicitSpaces = expr === applySpaces;
      traceEntry.isRootNode = expr === this.startExpr;
      origTrace.push(traceEntry);
      this.trace = origTrace;
    }

    if (ans) {
      if (this.rightmostFailures &&
        (inputStream.pos === this.rightmostFailurePosition ||
         this.skipSpacesIfInSyntacticContext() === this.rightmostFailurePosition)) {
        var self = this;
        Object.keys(this.rightmostFailures).forEach(function(key) {
          self.rightmostFailures[key].makeFluffy();
        });
      }
    } else {
      // Reset the position and the bindings.
      inputStream.pos = origPos;
      this.truncateBindings(origNumBindings);
    }

    if (this.recordingMode === RM_RIGHTMOST_FAILURES && origFailures) {
      this.addRightmostFailures(origFailures, false);
    }

    return ans;
  },

  // Return the starting expression for this grammar. If `optStartApplication` is specified, it
  // is a string expressing a rule application in the grammar. If not specified, the grammar's
  // default start rule will be used.
  _getStartExpr: function(grammar, optStartApplication) {
    var applicationStr = optStartApplication || grammar.defaultStartRule;
    if (!applicationStr) {
      throw new Error('Missing start rule argument -- the grammar has no default start rule.');
    }

    var startApp = grammar.parseApplication(applicationStr);
    return new pexprs.Seq([startApp, pexprs.end]);
  },

  evalFromStart: function() {
    this.eval(this.startExpr);
  },

  getFailuresInfo: function() {
    if (this.recordingMode === RM_RIGHTMOST_FAILURE_POSITION) {
      return this.rightmostFailurePosition;
    } else /* if (this.recordingMode === RM_RIGHTMOST_FAILURES) */ {
      return this.rightmostFailures;
    }
  },

  restoreFailuresInfo: function(failuresInfo) {
    if (this.recordingMode === RM_RIGHTMOST_FAILURE_POSITION) {
      this.rightmostFailurePosition = failuresInfo;
    } else /* if (this.recordingMode === RM_RIGHTMOST_FAILURES) */ {
      this.rightmostFailures = failuresInfo;
    }
  }
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = State;

},{"./InputStream":31,"./PosInfo":35,"./Trace":38,"./pexprs":59}],38:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var Interval = require('./Interval');
var common = require('./common');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

// Unicode characters that are used in the `toString` output.
var BALLOT_X = '\u2717';
var CHECK_MARK = '\u2713';
var DOT_OPERATOR = '\u22C5';
var RIGHTWARDS_DOUBLE_ARROW = '\u21D2';
var SYMBOL_FOR_HORIZONTAL_TABULATION = '\u2409';
var SYMBOL_FOR_LINE_FEED = '\u240A';
var SYMBOL_FOR_CARRIAGE_RETURN = '\u240D';

function spaces(n) {
  return common.repeat(' ', n).join('');
}

// Return a string representation of a portion of `inputStream` at offset `pos`.
// The result will contain exactly `len` characters.
function getInputExcerpt(inputStream, pos, len) {
  var excerpt = asEscapedString(inputStream.sourceSlice(pos, pos + len));

  // Pad the output if necessary.
  if (excerpt.length < len) {
    return excerpt + common.repeat(' ', len - excerpt.length).join('');
  }
  return excerpt;
}

function asEscapedString(obj) {
  if (typeof obj === 'string') {
    // Replace non-printable characters with visible symbols.
    return obj
        .replace(/ /g, DOT_OPERATOR)
        .replace(/\t/g, SYMBOL_FOR_HORIZONTAL_TABULATION)
        .replace(/\n/g, SYMBOL_FOR_LINE_FEED)
        .replace(/\r/g, SYMBOL_FOR_CARRIAGE_RETURN);
  }
  return String(obj);
}

// ----------------- Trace -----------------

function Trace(inputStream, pos, expr, succeeded, bindings, optChildren) {
  this.inputStream = inputStream;
  this.pos = pos;
  this.source = new Interval(inputStream, pos, inputStream.pos);
  this.expr = expr;
  this.succeeded = succeeded;
  this.bindings = bindings;
  this.children = optChildren || [];

  this.isHeadOfLeftRecursion = false;  // Is this the outermost LR application?
  this.isImplicitSpaces = false;
  this.isMemoized = false;
  this.isRootNode = false;
  this.terminatesLR = false;
  this.terminatingLREntry = null;
}

// A value that can be returned from visitor functions to indicate that a
// node should not be recursed into.
Trace.prototype.SKIP = {};

Object.defineProperty(Trace.prototype, 'displayString', {
  get: function() { return this.expr.toDisplayString(); }
});

Trace.prototype.clone = function() {
  return this.cloneWithExpr(this.expr);
};

Trace.prototype.cloneWithExpr = function(expr) {
  var ans = new Trace(
      this.inputStream, this.pos, expr, this.succeeded, this.bindings, this.children);

  ans.isHeadOfLeftRecursion = this.isHeadOfLeftRecursion;
  ans.isImplicitSpaces = this.isImplicitSpaces;
  ans.isMemoized = this.isMemoized;
  ans.isRootNode = this.isRootNode;
  ans.terminatesLR = this.terminatesLR;
  ans.terminatingLREntry = this.terminatingLREntry;
  return ans;
};

// Record the trace information for the terminating condition of the LR loop.
Trace.prototype.recordLRTermination = function(ruleBodyTrace, value) {
  this.terminatingLREntry =
      new Trace(this.inputStream, this.pos, this.expr, false, [value], [ruleBodyTrace]);
  this.terminatingLREntry.terminatesLR = true;
};

// Recursively traverse this trace node and all its descendents, calling a visitor function
// for each node that is visited. If `vistorObjOrFn` is an object, then its 'enter' property
// is a function to call before visiting the children of a node, and its 'exit' property is
// a function to call afterwards. If `visitorObjOrFn` is a function, it represents the 'enter'
// function.
//
// The functions are called with three arguments: the Trace node, its parent Trace, and a number
// representing the depth of the node in the tree. (The root node has depth 0.) `optThisArg`, if
// specified, is the value to use for `this` when executing the visitor functions.
Trace.prototype.walk = function(visitorObjOrFn, optThisArg) {
  var visitor = visitorObjOrFn;
  if (typeof visitor === 'function') {
    visitor = {enter: visitor};
  }

  function _walk(node, parent, depth) {
    var recurse = true;
    if (visitor.enter) {
      if (visitor.enter.call(optThisArg, node, parent, depth) === Trace.prototype.SKIP) {
        recurse = false;
      }
    }
    if (recurse) {
      node.children.forEach(function(child) {
        _walk(child, node, depth + 1);
      });
      if (visitor.exit) {
        visitor.exit.call(optThisArg, node, parent, depth);
      }
    }
  }
  if (this.isRootNode) {
    // Don't visit the root node itself, only its children.
    this.children.forEach(function(c) { _walk(c, null, 0); });
  } else {
    _walk(this, null, 0);
  }
};

// Return a string representation of the trace.
// Sample:
//     12⋅+⋅2⋅*⋅3 ✓ exp ⇒  "12"
//     12⋅+⋅2⋅*⋅3   ✓ addExp (LR) ⇒  "12"
//     12⋅+⋅2⋅*⋅3       ✗ addExp_plus
Trace.prototype.toString = function() {
  var sb = new common.StringBuffer();
  this.walk(function(node, parent, depth) {
    if (!node) {
      return this.SKIP;
    }
    var ctorName = node.expr.constructor.name;
    // Don't print anything for Alt nodes.
    if (ctorName === 'Alt') {
      return;  // eslint-disable-line consistent-return
    }
    sb.append(getInputExcerpt(node.inputStream, node.pos, 10) + spaces(depth * 2 + 1));
    sb.append((node.succeeded ? CHECK_MARK : BALLOT_X) + ' ' + node.displayString);
    if (node.isHeadOfLeftRecursion) {
      sb.append(' (LR)');
    }
    if (node.succeeded) {
      var contents = asEscapedString(node.source.contents);
      sb.append(' ' + RIGHTWARDS_DOUBLE_ARROW + '  ');
      sb.append(typeof contents === 'string' ? '"' + contents + '"' : contents);
    }
    sb.append('\n');
  }.bind(this));
  return sb.contents();
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Trace;

},{"./Interval":32,"./common":39}],39:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var extend = require('util-extend');

// --------------------------------------------------------------------
// Private Stuff
// --------------------------------------------------------------------

// Helpers

var escapeStringFor = {};
for (var c = 0; c < 128; c++) {
  escapeStringFor[c] = String.fromCharCode(c);
}
escapeStringFor["'".charCodeAt(0)] = "\\'";
escapeStringFor['"'.charCodeAt(0)] = '\\"';
escapeStringFor['\\'.charCodeAt(0)] = '\\\\';
escapeStringFor['\b'.charCodeAt(0)] = '\\b';
escapeStringFor['\f'.charCodeAt(0)] = '\\f';
escapeStringFor['\n'.charCodeAt(0)] = '\\n';
escapeStringFor['\r'.charCodeAt(0)] = '\\r';
escapeStringFor['\t'.charCodeAt(0)] = '\\t';
escapeStringFor['\u000b'.charCodeAt(0)] = '\\v';

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

exports.abstract = function(optMethodName) {
  var methodName = optMethodName || '';
  return function() {
    throw new Error(
      'this method ' + methodName + ' is abstract! ' +
      '(it has no implementation in class ' + this.constructor.name + ')');
  };
};

exports.assert = function(cond, message) {
  if (!cond) {
    throw new Error(message);
  }
};

// Define a lazily-computed, non-enumerable property named `propName`
// on the object `obj`. `getterFn` will be called to compute the value the
// first time the property is accessed.
exports.defineLazyProperty = function(obj, propName, getterFn) {
  var memo;
  Object.defineProperty(obj, propName, {
    get: function() {
      if (!memo) {
        memo = getterFn.call(this);
      }
      return memo;
    }
  });
};

exports.clone = function(obj) {
  if (obj) {
    return extend({}, obj);
  }
  return obj;
};

exports.extend = extend;

exports.repeatFn = function(fn, n) {
  var arr = [];
  while (n-- > 0) {
    arr.push(fn());
  }
  return arr;
};

exports.repeatStr = function(str, n) {
  return new Array(n + 1).join(str);
};

exports.repeat = function(x, n) {
  return exports.repeatFn(function() { return x; }, n);
};

exports.getDuplicates = function(array) {
  var duplicates = [];
  for (var idx = 0; idx < array.length; idx++) {
    var x = array[idx];
    if (array.lastIndexOf(x) !== idx && duplicates.indexOf(x) < 0) {
      duplicates.push(x);
    }
  }
  return duplicates;
};

exports.copyWithoutDuplicates = function(array) {
  var noDuplicates = [];
  array.forEach(function(entry) {
    if (noDuplicates.indexOf(entry) < 0) {
      noDuplicates.push(entry);
    }
  });
  return noDuplicates;
};

exports.isSyntactic = function(ruleName) {
  var firstChar = ruleName[0];
  return firstChar === firstChar.toUpperCase();
};

exports.isLexical = function(ruleName) {
  return !exports.isSyntactic(ruleName);
};

exports.padLeft = function(str, len, optChar) {
  var ch = optChar || ' ';
  if (str.length < len) {
    return exports.repeatStr(ch, len - str.length) + str;
  }
  return str;
};

// StringBuffer

exports.StringBuffer = function() {
  this.strings = [];
};

exports.StringBuffer.prototype.append = function(str) {
  this.strings.push(str);
};

exports.StringBuffer.prototype.contents = function() {
  return this.strings.join('');
};

// Character escaping and unescaping

exports.escapeChar = function(c, optDelim) {
  var charCode = c.charCodeAt(0);
  if ((c === '"' || c === "'") && optDelim && c !== optDelim) {
    return c;
  } else if (charCode < 128) {
    return escapeStringFor[charCode];
  } else if (128 <= charCode && charCode < 256) {
    return '\\x' + exports.padLeft(charCode.toString(16), 2, '0');
  } else {
    return '\\u' + exports.padLeft(charCode.toString(16), 4, '0');
  }
};

exports.unescapeChar = function(s) {
  if (s.charAt(0) === '\\') {
    switch (s.charAt(1)) {
      case 'b': return '\b';
      case 'f': return '\f';
      case 'n': return '\n';
      case 'r': return '\r';
      case 't': return '\t';
      case 'v': return '\v';
      case 'x': return String.fromCharCode(parseInt(s.substring(2, 4), 16));
      case 'u': return String.fromCharCode(parseInt(s.substring(2, 6), 16));
      default: return s.charAt(1);
    }
  } else {
    return s;
  }
};

// Helper for producing a description of an unknown object in a safe way.
// Especially useful for error messages where an unexpected type of object was encountered.
exports.unexpectedObjToString = function(obj) {
  if (obj == null) {
    return String(obj);
  }
  var baseToString = Object.prototype.toString.call(obj);
  try {
    var typeName;
    if (obj.constructor && obj.constructor.name) {
      typeName = obj.constructor.name;
    } else if (baseToString.indexOf('[object ') === 0) {
      typeName = baseToString.slice(8, -1);  // Extract e.g. "Array" from "[object Array]".
    } else {
      typeName = typeof obj;
    }
    return typeName + ': ' + JSON.stringify(String(obj));
  } catch (e) {
    return baseToString;
  }
};

},{"util-extend":26}],40:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var Namespace = require('./Namespace');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function createError(message, optInterval) {
  var e;
  if (optInterval) {
    e = new Error(optInterval.getLineAndColumnMessage() + message);
    e.shortMessage = message;
    e.interval = optInterval;
  } else {
    e = new Error(message);
  }
  return e;
}

// ----------------- errors about intervals -----------------

function intervalSourcesDontMatch() {
  return createError("Interval sources don't match");
}

// ----------------- errors about grammars -----------------

// Grammar syntax error

function grammarSyntaxError(matchFailure) {
  var e = new Error();
  Object.defineProperty(e, 'message', {get: function() { return matchFailure.message; }});
  Object.defineProperty(e, 'shortMessage', {get: function() {
    return 'Expected ' + matchFailure.getExpectedText();
  }});
  e.interval = matchFailure.getInterval();
  return e;
}

// Undeclared grammar

function undeclaredGrammar(grammarName, namespace, interval) {
  var message = namespace ?
      'Grammar ' + grammarName + ' is not declared in namespace ' + Namespace.toString(namespace) :
      'Undeclared grammar ' + grammarName;
  return createError(message, interval);
}

// Duplicate grammar declaration

function duplicateGrammarDeclaration(grammar, namespace) {
  return createError('Grammar ' + grammar.name + ' is already declared in this namespace');
}

// ----------------- rules -----------------

// Undeclared rule

function undeclaredRule(ruleName, grammarName, optInterval) {
  return createError(
      'Rule ' + ruleName + ' is not declared in grammar ' + grammarName,
      optInterval);
}

// Cannot override undeclared rule

function cannotOverrideUndeclaredRule(ruleName, grammarName, optSource) {
  return createError(
      'Cannot override rule ' + ruleName + ' because it is not declared in ' + grammarName,
      optSource);
}

// Cannot extend undeclared rule

function cannotExtendUndeclaredRule(ruleName, grammarName, optSource) {
  return createError(
      'Cannot extend rule ' + ruleName + ' because it is not declared in ' + grammarName,
      optSource);
}

// Duplicate rule declaration

function duplicateRuleDeclaration(ruleName, grammarName, declGrammarName, body, optSource) {
  var message = "Duplicate declaration for rule '" + ruleName +
      "' in grammar '" + grammarName + "'";
  if (grammarName !== declGrammarName) {
    message += " (originally declared in '" + declGrammarName + "')";
  }
  return createError(message, optSource);
}

// Wrong number of parameters

function wrongNumberOfParameters(ruleName, expected, actual, body, source) {
  return createError(
      'Wrong number of parameters for rule ' + ruleName +
          ' (expected ' + expected + ', got ' + actual + ')',
      source);
}

// Wrong number of arguments

function wrongNumberOfArguments(ruleName, expected, actual, expr) {
  return createError(
      'Wrong number of arguments for rule ' + ruleName +
          ' (expected ' + expected + ', got ' + actual + ')',
      expr.source);
}

// Duplicate parameter names

function duplicateParameterNames(ruleName, duplicates, body, source) {
  return createError(
      'Duplicate parameter names in rule ' + ruleName + ': ' + duplicates.join(','),
      source);
}

// Invalid parameter expression

function invalidParameter(ruleName, expr) {
  return createError(
      'Invalid parameter to rule ' + ruleName + ': ' + expr + ' has arity ' + expr.getArity() +
         ', but parameter expressions must have arity 1',
      expr.source);
}

// Application of syntactic rule from lexical rule

function applicationOfSyntacticRuleFromLexicalContext(ruleName, applyExpr) {
  return createError(
      'Cannot apply syntactic rule ' + ruleName + ' from here (inside a lexical context)',
      applyExpr.source);
}

// ----------------- Kleene operators -----------------

function kleeneExprHasNullableOperand(kleeneExpr) {
  return createError(
      'Nullable expression ' + kleeneExpr.expr.source.contents + " is not allowed inside '" +
          kleeneExpr.operator + "' (possible infinite loop)",
      kleeneExpr.expr.source);
}

// ----------------- arity -----------------

function inconsistentArity(ruleName, expected, actual, expr) {
  return createError(
      'Rule ' + ruleName + ' involves an alternation which has inconsistent arity ' +
          '(expected ' + expected + ', got ' + actual + ')',
      expr.source);
}

// ----------------- properties -----------------

function duplicatePropertyNames(duplicates) {
  return createError('Object pattern has duplicate property names: ' + duplicates.join(', '));
}

// ----------------- constructors -----------------

function invalidConstructorCall(grammar, ctorName, children) {
  return createError(
      'Attempt to invoke constructor ' + ctorName + ' with invalid or unexpected arguments');
}

// ----------------- convenience -----------------

function multipleErrors(errors) {
  var messages = errors.map(function(e) { return e.message; });
  return createError(
      ['Errors:'].concat(messages).join('\n- '),
      errors[0].interval);
}

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = {
  applicationOfSyntacticRuleFromLexicalContext: applicationOfSyntacticRuleFromLexicalContext,
  cannotExtendUndeclaredRule: cannotExtendUndeclaredRule,
  cannotOverrideUndeclaredRule: cannotOverrideUndeclaredRule,
  duplicateGrammarDeclaration: duplicateGrammarDeclaration,
  duplicateParameterNames: duplicateParameterNames,
  duplicatePropertyNames: duplicatePropertyNames,
  duplicateRuleDeclaration: duplicateRuleDeclaration,
  inconsistentArity: inconsistentArity,
  intervalSourcesDontMatch: intervalSourcesDontMatch,
  invalidConstructorCall: invalidConstructorCall,
  invalidParameter: invalidParameter,
  grammarSyntaxError: grammarSyntaxError,
  kleeneExprHasNullableOperand: kleeneExprHasNullableOperand,
  undeclaredGrammar: undeclaredGrammar,
  undeclaredRule: undeclaredRule,
  wrongNumberOfArguments: wrongNumberOfArguments,
  wrongNumberOfParameters: wrongNumberOfParameters,

  throwErrors: function(errors) {
    if (errors.length === 1) {
      throw errors[0];
    }
    if (errors.length > 1) {
      throw multipleErrors(errors);
    }
  }
};

},{"./Namespace":34}],41:[function(require,module,exports){
/* global document, XMLHttpRequest */

'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var Builder = require('./Builder');
var Grammar = require('./Grammar');
var Namespace = require('./Namespace');
var common = require('./common');
var errors = require('./errors');
var pexprs = require('./pexprs');
var util = require('./util');

var isBuffer = require('is-buffer');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

// The metagrammar, i.e. the grammar for Ohm grammars. Initialized at the
// bottom of this file because loading the grammar requires Ohm itself.
var ohmGrammar;

// An object which makes it possible to stub out the document API for testing.
var documentInterface = {
  querySelector: function(sel) { return document.querySelector(sel); },
  querySelectorAll: function(sel) { return document.querySelectorAll(sel); }
};

// Check if `obj` is a DOM element.
function isElement(obj) {
  return !!(obj && obj.nodeType === 1);
}

function isUndefined(obj) {
  return obj === void 0;  // eslint-disable-line no-void
}

var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

function isArrayLike(obj) {
  if (obj == null) {
    return false;
  }
  var length = obj.length;
  return typeof length === 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
}

// TODO: just use the jQuery thing
function load(url) {
  var req = new XMLHttpRequest();
  req.open('GET', url, false);
  try {
    req.send();
    if (req.status === 0 || req.status === 200) {
      return req.responseText;
    }
  } catch (e) {}
  throw new Error('unable to load url ' + url);
}

// Returns a Grammar instance (i.e., an object with a `match` method) for
// `tree`, which is the concrete syntax tree of a user-written grammar.
// The grammar will be assigned into `namespace` under the name of the grammar
// as specified in the source.
function buildGrammar(match, namespace, optOhmGrammarForTesting) {
  var builder = new Builder();
  var decl;
  var currentRuleName;
  var currentRuleFormals;
  var overriding = false;
  var metaGrammar = optOhmGrammarForTesting || ohmGrammar;

  // A visitor that produces a Grammar instance from the CST.
  var helpers = metaGrammar.createSemantics().addOperation('visit', {
    Grammar: function(n, s, open, rs, close) {
      var grammarName = n.visit();
      decl = builder.newGrammar(grammarName, namespace);
      s.visit();
      rs.visit();
      var g = decl.build();
      g.source = this.source.trimmed();
      if (grammarName in namespace) {
        throw errors.duplicateGrammarDeclaration(g, namespace);
      }
      namespace[grammarName] = g;
      return g;
    },

    SuperGrammar: function(_, n) {
      var superGrammarName = n.visit();
      if (superGrammarName === 'null') {
        decl.withSuperGrammar(null);
      } else {
        if (!namespace || !(superGrammarName in namespace)) {
          throw errors.undeclaredGrammar(superGrammarName, namespace, n.source);
        }
        decl.withSuperGrammar(namespace[superGrammarName]);
      }
    },

    Rule_define: function(n, fs, d, _, b) {
      currentRuleName = n.visit();
      currentRuleFormals = fs.visit()[0] || [];
      // If there is no default start rule yet, set it now. This must be done before visiting
      // the body, because it might contain an inline rule definition.
      if (!decl.defaultStartRule && decl.ensureSuperGrammar() !== Grammar.ProtoBuiltInRules) {
        decl.withDefaultStartRule(currentRuleName);
      }
      var body = b.visit();
      var description = d.visit()[0];
      var source = this.source.trimmed();
      return decl.define(currentRuleName, currentRuleFormals, body, description, source);
    },
    Rule_override: function(n, fs, _, b) {
      currentRuleName = n.visit();
      currentRuleFormals = fs.visit()[0] || [];
      overriding = true;
      var body = b.visit();
      var source = this.source.trimmed();
      var ans = decl.override(currentRuleName, currentRuleFormals, body, null, source);
      overriding = false;
      return ans;
    },
    Rule_extend: function(n, fs, _, b) {
      currentRuleName = n.visit();
      currentRuleFormals = fs.visit()[0] || [];
      var body = b.visit();
      var source = this.source.trimmed();
      var ans = decl.extend(currentRuleName, currentRuleFormals, body, null, source);
      return ans;
    },
    RuleBody: function(_, terms) {
      var args = terms.visit();
      return builder.alt.apply(builder, args).withSource(this.source);
    },

    Formals: function(opointy, fs, cpointy) {
      return fs.visit();
    },

    Params: function(opointy, ps, cpointy) {
      return ps.visit();
    },

    Alt: function(seqs) {
      var args = seqs.visit();
      return builder.alt.apply(builder, args).withSource(this.source);
    },

    TopLevelTerm_inline: function(b, n) {
      var inlineRuleName = currentRuleName + '_' + n.visit();
      var body = b.visit();
      var source = this.source.trimmed();
      var isNewRuleDeclaration =
          !(decl.superGrammar && decl.superGrammar.rules[inlineRuleName]);
      if (overriding && !isNewRuleDeclaration) {
        decl.override(inlineRuleName, currentRuleFormals, body, null, source);
      } else {
        decl.define(inlineRuleName, currentRuleFormals, body, null, source);
      }
      var params = currentRuleFormals.map(function(formal) { return builder.app(formal); });
      return builder.app(inlineRuleName, params).withSource(body.source);
    },

    Seq: function(expr) {
      return builder.seq.apply(builder, expr.visit()).withSource(this.source);
    },

    Iter_star: function(x, _) {
      return builder.star(x.visit()).withSource(this.source);
    },
    Iter_plus: function(x, _) {
      return builder.plus(x.visit()).withSource(this.source);
    },
    Iter_opt: function(x, _) {
      return builder.opt(x.visit()).withSource(this.source);
    },

    Pred_not: function(_, x) {
      return builder.not(x.visit()).withSource(this.source);
    },
    Pred_lookahead: function(_, x) {
      return builder.lookahead(x.visit()).withSource(this.source);
    },

    Lex_lex: function(_, x) {
      return builder.lex(x.visit()).withSource(this.source);
    },

    Base_application: function(rule, ps) {
      return builder.app(rule.visit(), ps.visit()[0] || []).withSource(this.source);
    },
    Base_range: function(from, _, to) {
      return builder.range(from.visit(), to.visit()).withSource(this.source);
    },
    Base_terminal: function(expr) {
      return builder.terminal(expr.visit()).withSource(this.source);
    },
    Base_paren: function(open, x, close) {
      return x.visit();
    },

    ruleDescr: function(open, t, close) {
      return t.visit();
    },
    ruleDescrText: function(_) {
      return this.sourceString.trim();
    },

    caseName: function(_, space1, n, space2, end) {
      return n.visit();
    },

    name: function(first, rest) {
      return this.sourceString;
    },
    nameFirst: function(expr) {},
    nameRest: function(expr) {},

    terminal: function(open, cs, close) {
      return cs.visit().map(function(c) { return common.unescapeChar(c); }).join('');
    },

    terminalChar: function(_) {
      return this.sourceString;
    },

    escapeChar: function(_) {
      return this.sourceString;
    },

    NonemptyListOf: function(x, _, xs) {
      return [x.visit()].concat(xs.visit());
    },
    EmptyListOf: function() {
      return [];
    },

    _terminal: function() {
      return this.primitiveValue;
    }
  });
  return helpers(match).visit();
}

function compileAndLoad(source, namespace) {
  var m = ohmGrammar.match(source, 'Grammars');
  if (m.failed()) {
    throw errors.grammarSyntaxError(m);
  }
  return buildGrammar(m, namespace);
}

// Return the contents of a script element, fetching it via XHR if necessary.
function getScriptElementContents(el) {
  if (!isElement(el)) {
    throw new TypeError('Expected a DOM Node, got ' + common.unexpectedObjToString(el));
  }
  if (el.type !== 'text/ohm-js') {
    throw new Error('Expected a script tag with type="text/ohm-js", got ' + el);
  }
  return el.getAttribute('src') ? load(el.getAttribute('src')) : el.innerHTML;
}

function grammar(source, optNamespace) {
  var ns = grammars(source, optNamespace);

  // Ensure that the source contained no more than one grammar definition.
  var grammarNames = Object.keys(ns);
  if (grammarNames.length === 0) {
    throw new Error('Missing grammar definition');
  } else if (grammarNames.length > 1) {
    var secondGrammar = ns[grammarNames[1]];
    var interval = secondGrammar.source;
    throw new Error(
        util.getLineAndColumnMessage(interval.inputStream.source, interval.startIdx) +
        'Found more than one grammar definition -- use ohm.grammars() instead.');
  }
  return ns[grammarNames[0]];  // Return the one and only grammar.
}

function grammars(source, optNamespace) {
  var ns = Namespace.extend(Namespace.asNamespace(optNamespace));
  if (typeof source !== 'string') {
    // For convenience, detect Node.js Buffer objects and automatically call toString().
    if (isBuffer(source)) {
      source = source.toString();
    } else {
      throw new TypeError(
          'Expected string as first argument, got ' + common.unexpectedObjToString(source));
    }
  }
  compileAndLoad(source, ns);
  return ns;
}

function grammarFromScriptElement(optNode) {
  var node = optNode;
  if (isUndefined(node)) {
    var nodeList = documentInterface.querySelectorAll('script[type="text/ohm-js"]');
    if (nodeList.length !== 1) {
      throw new Error(
          'Expected exactly one script tag with type="text/ohm-js", found ' + nodeList.length);
    }
    node = nodeList[0];
  }
  return grammar(getScriptElementContents(node));
}

function grammarsFromScriptElements(optNodeOrNodeList) {
  // Simple case: the argument is a DOM node.
  if (isElement(optNodeOrNodeList)) {
    return grammars(optNodeOrNodeList);
  }
  // Otherwise, it must be either undefined or a NodeList.
  var nodeList = optNodeOrNodeList;
  if (isUndefined(nodeList)) {
    // Find all script elements with type="text/ohm-js".
    nodeList = documentInterface.querySelectorAll('script[type="text/ohm-js"]');
  } else if (typeof nodeList === 'string' || (!isElement(nodeList) && !isArrayLike(nodeList))) {
    throw new TypeError('Expected a Node, NodeList, or Array, but got ' + nodeList);
  }
  var ns = Namespace.createNamespace();
  for (var i = 0; i < nodeList.length; ++i) {
    // Copy the new grammars into `ns` to keep the namespace flat.
    common.extend(ns, grammars(getScriptElementContents(nodeList[i]), ns));
  }
  return ns;
}

function makeRecipe(recipe) {
  if (typeof recipe === 'function') {
    return recipe.call(new Builder());
  } else {
    if (typeof recipe === 'string') {
      // stringified JSON recipe
      recipe = JSON.parse(recipe);
    }
    return (new Builder()).fromRecipe(recipe);
  }
}

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

// Stuff that users should know about
module.exports = {
  createNamespace: Namespace.createNamespace,
  grammar: grammar,
  grammars: grammars,
  grammarFromScriptElement: grammarFromScriptElement,
  grammarsFromScriptElements: grammarsFromScriptElements,
  makeRecipe: makeRecipe,
  ohmGrammar: null,  // Initialized below, after Grammar.BuiltInRules.
  pexprs: pexprs,
  util: util,
  extras: require('../extras')
};

// Stuff for testing, etc.
module.exports._buildGrammar = buildGrammar;
module.exports._setDocumentInterfaceForTesting = function(doc) { documentInterface = doc; };

// Late initialization for stuff that is bootstrapped.

Grammar.BuiltInRules = require('../dist/built-in-rules');

var Semantics = require('./Semantics');
var operationsAndAttributesGrammar = require('../dist/operations-and-attributes');
Semantics.initBuiltInSemantics(Grammar.BuiltInRules);
Semantics.initPrototypeParser(operationsAndAttributesGrammar);  // requires BuiltInSemantics

module.exports.ohmGrammar = ohmGrammar = require('../dist/ohm-grammar');
Grammar.initApplicationParser(ohmGrammar, buildGrammar);

},{"../dist/built-in-rules":1,"../dist/ohm-grammar":2,"../dist/operations-and-attributes":3,"../extras":4,"./Builder":27,"./Grammar":29,"./Namespace":34,"./Semantics":36,"./common":39,"./errors":40,"./pexprs":59,"./util":60,"is-buffer":25}],42:[function(require,module,exports){
'use strict';

var inherits = require('inherits');

var common = require('./common');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function Node(grammar, ctorName, children, source) {
  this.grammar = grammar;
  this.ctorName = ctorName;
  this.children = children;
  this.source = source;
}

Node.prototype.numChildren = function() {
  return this.children.length;
};

Node.prototype.childAt = function(idx) {
  return this.children[idx];
};

Node.prototype.indexOfChild = function(arg) {
  return this.children.indexOf(arg);
};

Node.prototype.hasChildren = function() {
  return this.children.length > 0;
};

Node.prototype.hasNoChildren = function() {
  return !this.hasChildren();
};

Node.prototype.onlyChild = function() {
  if (this.children.length !== 1) {
    throw new Error(
        'cannot get only child of a node of type ' + this.ctorName +
        ' (it has ' + this.numChildren() + ' children)');
  } else {
    return this.firstChild();
  }
};

Node.prototype.firstChild = function() {
  if (this.hasNoChildren()) {
    throw new Error(
        'cannot get first child of a ' + this.ctorName + ' node, which has no children');
  } else {
    return this.childAt(0);
  }
};

Node.prototype.lastChild = function() {
  if (this.hasNoChildren()) {
    throw new Error(
        'cannot get last child of a ' + this.ctorName + ' node, which has no children');
  } else {
    return this.childAt(this.numChildren() - 1);
  }
};

Node.prototype.childBefore = function(child) {
  var childIdx = this.indexOfChild(child);
  if (childIdx < 0) {
    throw new Error('Node.childBefore() called w/ an argument that is not a child');
  } else if (childIdx === 0) {
    throw new Error('cannot get child before first child');
  } else {
    return this.childAt(childIdx - 1);
  }
};

Node.prototype.childAfter = function(child) {
  var childIdx = this.indexOfChild(child);
  if (childIdx < 0) {
    throw new Error('Node.childAfter() called w/ an argument that is not a child');
  } else if (childIdx === this.numChildren() - 1) {
    throw new Error('cannot get child after last child');
  } else {
    return this.childAt(childIdx + 1);
  }
};

Node.prototype.isTerminal = function() {
  return false;
};

Node.prototype.isNonterminal = function() {
  return false;
};

Node.prototype.isIteration = function() {
  return false;
};

Node.prototype.isOptional = function() {
  return false;
};

Node.prototype.toJSON = function() {
  var r = {};
  r[this.ctorName] = this.children;
  return r;
};

// Terminals

function TerminalNode(grammar, value, source) {
  Node.call(this, grammar, '_terminal', [], source);
  this.primitiveValue = value;
}
inherits(TerminalNode, Node);

TerminalNode.prototype.isTerminal = function() {
  return true;
};

// Nonterminals

function NonterminalNode(grammar, ruleName, children, source) {
  Node.call(this, grammar, ruleName, children, source);
}
inherits(NonterminalNode, Node);

NonterminalNode.prototype.isNonterminal = function() {
  return true;
};

NonterminalNode.prototype.isLexical = function() {
  return common.isLexical(this.ctorName);
};

NonterminalNode.prototype.isSyntactic = function() {
  return common.isSyntactic(this.ctorName);
};

// Iterations

function IterationNode(grammar, children, source, optional) {
  Node.call(this, grammar, '_iter', children, source);
  this.optional = optional;
}
inherits(IterationNode, Node);

IterationNode.prototype.isIteration = function() {
  return true;
};

IterationNode.prototype.isOptional = function() {
  return this.optional;
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = {
  Node: Node,
  TerminalNode: TerminalNode,
  NonterminalNode: NonterminalNode,
  IterationNode: IterationNode
};

},{"./common":39,"inherits":24}],43:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

/*
  Return true if we should skip spaces preceding this expression in a syntactic context.
*/
pexprs.PExpr.prototype.allowsSkippingPrecedingSpace = common.abstract(
  'allowsSkippingPrecedingSpace'
);

/*
  Generally, these are all first-order expressions and (with the exception of Apply)
  directly read from the input stream.
*/
pexprs.any.allowsSkippingPrecedingSpace =
pexprs.end.allowsSkippingPrecedingSpace =
pexprs.Apply.prototype.allowsSkippingPrecedingSpace =
pexprs.Terminal.prototype.allowsSkippingPrecedingSpace =
pexprs.Range.prototype.allowsSkippingPrecedingSpace =
pexprs.UnicodeChar.prototype.allowsSkippingPrecedingSpace = function() {
  return true;
};

/*
  Higher-order expressions that don't directly consume input.
*/
pexprs.Alt.prototype.allowsSkippingPrecedingSpace =
pexprs.Iter.prototype.allowsSkippingPrecedingSpace =
pexprs.Lex.prototype.allowsSkippingPrecedingSpace =
pexprs.Lookahead.prototype.allowsSkippingPrecedingSpace =
pexprs.Not.prototype.allowsSkippingPrecedingSpace =
pexprs.Param.prototype.allowsSkippingPrecedingSpace =
pexprs.Seq.prototype.allowsSkippingPrecedingSpace = function() {
  return false;
};

},{"./common":39,"./pexprs":59}],44:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var errors = require('./errors');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

var lexifyCount;

pexprs.PExpr.prototype.assertAllApplicationsAreValid = function(ruleName, grammar) {
  lexifyCount = 0;
  this._assertAllApplicationsAreValid(ruleName, grammar);
};

pexprs.PExpr.prototype._assertAllApplicationsAreValid = common.abstract(
  '_assertAllApplicationsAreValid'
);

pexprs.any._assertAllApplicationsAreValid =
pexprs.end._assertAllApplicationsAreValid =
pexprs.Terminal.prototype._assertAllApplicationsAreValid =
pexprs.Range.prototype._assertAllApplicationsAreValid =
pexprs.Param.prototype._assertAllApplicationsAreValid =
pexprs.UnicodeChar.prototype._assertAllApplicationsAreValid = function(ruleName, grammar) {
  // no-op
};

pexprs.Lex.prototype._assertAllApplicationsAreValid = function(ruleName, grammar) {
  lexifyCount++;
  this.expr._assertAllApplicationsAreValid(ruleName, grammar);
  lexifyCount--;
};

pexprs.Alt.prototype._assertAllApplicationsAreValid = function(ruleName, grammar) {
  for (var idx = 0; idx < this.terms.length; idx++) {
    this.terms[idx]._assertAllApplicationsAreValid(ruleName, grammar);
  }
};

pexprs.Seq.prototype._assertAllApplicationsAreValid = function(ruleName, grammar) {
  for (var idx = 0; idx < this.factors.length; idx++) {
    this.factors[idx]._assertAllApplicationsAreValid(ruleName, grammar);
  }
};

pexprs.Iter.prototype._assertAllApplicationsAreValid =
pexprs.Not.prototype._assertAllApplicationsAreValid =
pexprs.Lookahead.prototype._assertAllApplicationsAreValid = function(ruleName, grammar) {
  this.expr._assertAllApplicationsAreValid(ruleName, grammar);
};

pexprs.Apply.prototype._assertAllApplicationsAreValid = function(ruleName, grammar) {
  var ruleInfo = grammar.rules[this.ruleName];

  // Make sure that the rule exists...
  if (!ruleInfo) {
    throw errors.undeclaredRule(this.ruleName, grammar.name, this.source);
  }

  // ...and that this application is allowed
  if (common.isSyntactic(this.ruleName) && (!common.isSyntactic(ruleName) || lexifyCount > 0)) {
    throw errors.applicationOfSyntacticRuleFromLexicalContext(this.ruleName, this);
  }

  // ...and that this application has the correct number of arguments
  var actual = this.args.length;
  var expected = ruleInfo.formals.length;
  if (actual !== expected) {
    throw errors.wrongNumberOfArguments(this.ruleName, expected, actual, this);
  }

  // ...and that all of the argument expressions only have valid applications and have arity 1.
  var self = this;
  this.args.forEach(function(arg) {
    arg._assertAllApplicationsAreValid(ruleName, grammar);
    if (arg.getArity() !== 1) {
      throw errors.invalidParameter(self.ruleName, arg);
    }
  });
};

},{"./common":39,"./errors":40,"./pexprs":59}],45:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var errors = require('./errors');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.assertChoicesHaveUniformArity = common.abstract(
  'assertChoicesHaveUniformArity'
);

pexprs.any.assertChoicesHaveUniformArity =
pexprs.end.assertChoicesHaveUniformArity =
pexprs.Terminal.prototype.assertChoicesHaveUniformArity =
pexprs.Range.prototype.assertChoicesHaveUniformArity =
pexprs.Param.prototype.assertChoicesHaveUniformArity =
pexprs.Lex.prototype.assertChoicesHaveUniformArity =
pexprs.UnicodeChar.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  // no-op
};

pexprs.Alt.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  if (this.terms.length === 0) {
    return;
  }
  var arity = this.terms[0].getArity();
  for (var idx = 0; idx < this.terms.length; idx++) {
    var term = this.terms[idx];
    term.assertChoicesHaveUniformArity();
    var otherArity = term.getArity();
    if (arity !== otherArity) {
      throw errors.inconsistentArity(ruleName, arity, otherArity, term);
    }
  }
};

pexprs.Extend.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  // Extend is a special case of Alt that's guaranteed to have exactly two
  // cases: [extensions, origBody].
  var actualArity = this.terms[0].getArity();
  var expectedArity = this.terms[1].getArity();
  if (actualArity !== expectedArity) {
    throw errors.inconsistentArity(ruleName, expectedArity, actualArity, this.terms[0]);
  }
};

pexprs.Seq.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  for (var idx = 0; idx < this.factors.length; idx++) {
    this.factors[idx].assertChoicesHaveUniformArity(ruleName);
  }
};

pexprs.Iter.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  this.expr.assertChoicesHaveUniformArity(ruleName);
};

pexprs.Not.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  // no-op (not required b/c the nested expr doesn't show up in the CST)
};

pexprs.Lookahead.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  this.expr.assertChoicesHaveUniformArity(ruleName);
};

pexprs.Apply.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  // The arities of the parameter expressions is required to be 1 by
  // `assertAllApplicationsAreValid()`.
};

},{"./common":39,"./errors":40,"./pexprs":59}],46:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var errors = require('./errors');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.assertIteratedExprsAreNotNullable = common.abstract(
  'assertIteratedExprsAreNotNullable'
);

pexprs.any.assertIteratedExprsAreNotNullable =
pexprs.end.assertIteratedExprsAreNotNullable =
pexprs.Terminal.prototype.assertIteratedExprsAreNotNullable =
pexprs.Range.prototype.assertIteratedExprsAreNotNullable =
pexprs.Param.prototype.assertIteratedExprsAreNotNullable =
pexprs.UnicodeChar.prototype.assertIteratedExprsAreNotNullable = function(grammar, ruleName) {
  // no-op
};

pexprs.Alt.prototype.assertIteratedExprsAreNotNullable = function(grammar, ruleName) {
  for (var idx = 0; idx < this.terms.length; idx++) {
    this.terms[idx].assertIteratedExprsAreNotNullable(grammar, ruleName);
  }
};

pexprs.Seq.prototype.assertIteratedExprsAreNotNullable = function(grammar, ruleName) {
  for (var idx = 0; idx < this.factors.length; idx++) {
    this.factors[idx].assertIteratedExprsAreNotNullable(grammar, ruleName);
  }
};

pexprs.Iter.prototype.assertIteratedExprsAreNotNullable = function(grammar, ruleName) {
  // Note: this is the implementation of this method for `Star` and `Plus` expressions.
  // It is overridden for `Opt` below.
  this.expr.assertIteratedExprsAreNotNullable(grammar, ruleName);
  if (this.expr.isNullable(grammar)) {
    throw errors.kleeneExprHasNullableOperand(this, ruleName);
  }
};

pexprs.Opt.prototype.assertIteratedExprsAreNotNullable =
pexprs.Not.prototype.assertIteratedExprsAreNotNullable =
pexprs.Lookahead.prototype.assertIteratedExprsAreNotNullable =
pexprs.Lex.prototype.assertIteratedExprsAreNotNullable = function(grammar, ruleName) {
  this.expr.assertIteratedExprsAreNotNullable(grammar, ruleName);
};

pexprs.Apply.prototype.assertIteratedExprsAreNotNullable = function(grammar, ruleName) {
  this.args.forEach(function(arg) {
    arg.assertIteratedExprsAreNotNullable(grammar, ruleName);
  });
};

},{"./common":39,"./errors":40,"./pexprs":59}],47:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var nodes = require('./nodes');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.check = common.abstract('check');

pexprs.any.check = function(grammar, vals) {
  return vals.length >= 1;
};

pexprs.end.check = function(grammar, vals) {
  return vals[0] instanceof nodes.Node &&
         vals[0].isTerminal() &&
         vals[0].primitiveValue === undefined;
};

pexprs.Terminal.prototype.check = function(grammar, vals) {
  return vals[0] instanceof nodes.Node &&
         vals[0].isTerminal() &&
         vals[0].primitiveValue === this.obj;
};

pexprs.Range.prototype.check = function(grammar, vals) {
  return vals[0] instanceof nodes.Node &&
         vals[0].isTerminal() &&
         typeof vals[0].primitiveValue === typeof this.from;
};

pexprs.Param.prototype.check = function(grammar, vals) {
  return vals.length >= 1;
};

pexprs.Alt.prototype.check = function(grammar, vals) {
  for (var i = 0; i < this.terms.length; i++) {
    var term = this.terms[i];
    if (term.check(grammar, vals)) {
      return true;
    }
  }
  return false;
};

pexprs.Seq.prototype.check = function(grammar, vals) {
  var pos = 0;
  for (var i = 0; i < this.factors.length; i++) {
    var factor = this.factors[i];
    if (factor.check(grammar, vals.slice(pos))) {
      pos += factor.getArity();
    } else {
      return false;
    }
  }
  return true;
};

pexprs.Iter.prototype.check = function(grammar, vals) {
  var arity = this.getArity();
  var columns = vals.slice(0, arity);
  if (columns.length !== arity) {
    return false;
  }
  var rowCount = columns[0].length;
  var i;
  for (i = 1; i < arity; i++) {
    if (columns[i].length !== rowCount) {
      return false;
    }
  }

  for (i = 0; i < rowCount; i++) {
    var row = [];
    for (var j = 0; j < arity; j++) {
      row.push(columns[j][i]);
    }
    if (!this.expr.check(grammar, row)) {
      return false;
    }
  }

  return true;
};

pexprs.Not.prototype.check = function(grammar, vals) {
  return true;
};

pexprs.Lookahead.prototype.check =
pexprs.Lex.prototype.check = function(grammar, vals) {
  return this.expr.check(grammar, vals);
};

pexprs.Apply.prototype.check = function(grammar, vals) {
  if (!(vals[0] instanceof nodes.Node &&
        vals[0].grammar === grammar &&
        vals[0].ctorName === this.ruleName)) {
    return false;
  }

  // TODO: think about *not* doing the following checks, i.e., trusting that the rule
  // was correctly constructed.
  var ruleNode = vals[0];
  var body = grammar.rules[this.ruleName].body;
  return body.check(grammar, ruleNode.children) && ruleNode.numChildren() === body.getArity();
};

pexprs.UnicodeChar.prototype.check = function(grammar, vals) {
  return vals[0] instanceof nodes.Node &&
         vals[0].isTerminal() &&
         typeof vals[0].primitiveValue === 'string';
};

},{"./common":39,"./nodes":42,"./pexprs":59}],48:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var Trace = require('./Trace');
var common = require('./common');
var nodes = require('./nodes');
var pexprs = require('./pexprs');

var TerminalNode = nodes.TerminalNode;
var NonterminalNode = nodes.NonterminalNode;
var IterationNode = nodes.IterationNode;

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

/*
  Evaluate the expression and return `true` if it succeeds, `false` otherwise. This method should
  only be called directly by `State.prototype.eval(expr)`, which also updates the data structures
  that are used for tracing. (Making those updates in a method of `State` enables the trace-specific
  data structures to be "secrets" of that class, which is good for modularity.)

  The contract of this method is as follows:
  * When the return value is `true`,
    - the state object will have `expr.getArity()` more bindings than it did before the call.
  * When the return value is `false`,
    - the state object may have more bindings than it did before the call, and
    - its input stream's position may be anywhere.

  Note that `State.prototype.eval(expr)`, unlike this method, guarantees that neither the state
  object's bindings nor its input stream's position will change if the expression fails to match.
*/
pexprs.PExpr.prototype.eval = common.abstract('eval');  // function(state) { ... }

pexprs.any.eval = function(state) {
  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  var ch = inputStream.next();
  if (ch) {
    var source = inputStream.interval(origPos);
    state.bindings.push(new TerminalNode(state.grammar, ch, source));
    return true;
  } else {
    state.processFailure(origPos, this);
    return false;
  }
};

pexprs.end.eval = function(state) {
  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  if (inputStream.atEnd()) {
    var source = inputStream.interval(inputStream.pos);
    state.bindings.push(new TerminalNode(state.grammar, undefined, source));
    return true;
  } else {
    state.processFailure(origPos, this);
    return false;
  }
};

pexprs.Terminal.prototype.eval = function(state) {
  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  if (!inputStream.matchString(this.obj)) {
    state.processFailure(origPos, this);
    return false;
  } else {
    var source = inputStream.interval(origPos);
    var primitiveValue = this.obj;
    state.bindings.push(new TerminalNode(state.grammar, primitiveValue, source));
    return true;
  }
};

pexprs.Range.prototype.eval = function(state) {
  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  var ch = inputStream.next();
  if (ch && this.from <= ch && ch <= this.to) {
    var source = inputStream.interval(origPos);
    state.bindings.push(new TerminalNode(state.grammar, ch, source));
    return true;
  } else {
    state.processFailure(origPos, this);
    return false;
  }
};

pexprs.Param.prototype.eval = function(state) {
  return state.eval(state.currentApplication().args[this.index]);
};

pexprs.Lex.prototype.eval = function(state) {
  state.enterLexifiedContext();
  var ans = state.eval(this.expr);
  state.exitLexifiedContext();
  return ans;
};

pexprs.Alt.prototype.eval = function(state) {
  for (var idx = 0; idx < this.terms.length; idx++) {
    if (state.eval(this.terms[idx])) {
      return true;
    }
  }
  return false;
};

pexprs.Seq.prototype.eval = function(state) {
  for (var idx = 0; idx < this.factors.length; idx++) {
    var factor = this.factors[idx];
    if (!state.eval(factor)) {
      return false;
    }
  }
  return true;
};

pexprs.Iter.prototype.eval = function(state) {
  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  var arity = this.getArity();
  var cols = [];
  while (cols.length < arity) {
    cols.push([]);
  }
  var numMatches = 0;
  var idx;
  while (numMatches < this.maxNumMatches && state.eval(this.expr)) {
    numMatches++;
    var row = state.bindings.splice(state.bindings.length - arity, arity);
    for (idx = 0; idx < row.length; idx++) {
      cols[idx].push(row[idx]);
    }
  }
  if (numMatches < this.minNumMatches) {
    return false;
  }
  var source;
  if (numMatches === 0) {
    source = inputStream.interval(origPos, origPos);
  } else {
    var firstCol = cols[0];
    var lastCol = cols[cols.length - 1];
    source = inputStream.interval(
        firstCol[0].source.startIdx,
        lastCol[lastCol.length - 1].source.endIdx);
  }
  for (idx = 0; idx < cols.length; idx++) {
    state.bindings.push(new IterationNode(state.grammar, cols[idx], source,
      this instanceof pexprs.Opt));
  }
  return true;
};

pexprs.Not.prototype.eval = function(state) {
  /*
    TODO:
    - Right now we're just throwing away all of the failures that happen inside a `not`, and
      recording `this` as a failed expression.
    - Double negation should be equivalent to lookahead, but that's not the case right now wrt
      failures. E.g., ~~'foo' produces a failure for ~~'foo', but maybe it should produce
      a failure for 'foo' instead.
  */

  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  var failuresInfo = state.getFailuresInfo();

  var ans = state.eval(this.expr);

  state.restoreFailuresInfo(failuresInfo);
  if (ans) {
    state.processFailure(origPos, this);
    return false;
  }

  inputStream.pos = origPos;
  return true;
};

pexprs.Lookahead.prototype.eval = function(state) {
  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  if (state.eval(this.expr)) {
    inputStream.pos = origPos;
    return true;
  } else {
    return false;
  }
};

pexprs.Apply.prototype.eval = function(state) {
  var caller = state.currentApplication();
  var actuals = caller ? caller.args : [];
  var app = this.substituteParams(actuals);

  var posInfo = state.getCurrentPosInfo();
  if (posInfo.isActive(app)) {
    // This rule is already active at this position, i.e., it is left-recursive.
    return app.handleCycle(state);
  }

  var memoKey = app.toMemoKey();
  var memoRec = posInfo.memo[memoKey];
  return memoRec && posInfo.shouldUseMemoizedResult(memoRec) ?
      state.useMemoizedResult(memoRec) :
      app.reallyEval(state);
};

pexprs.Apply.prototype.handleCycle = function(state) {
  var posInfo = state.getCurrentPosInfo();
  var currentLeftRecursion = posInfo.currentLeftRecursion;
  var memoKey = this.toMemoKey();
  var memoRec = posInfo.memo[memoKey];

  if (currentLeftRecursion && currentLeftRecursion.headApplication.toMemoKey() === memoKey) {
    // We already know about this left recursion, but it's possible there are "involved
    // applications" that we don't already know about, so...
    memoRec.updateInvolvedApplicationMemoKeys();
  } else if (!memoRec) {
    // New left recursion detected! Memoize a failure to try to get a seed parse.
    memoRec = posInfo.memo[memoKey] = {pos: -1, value: false};
    posInfo.startLeftRecursion(this, memoRec);
  }
  return state.useMemoizedResult(memoRec);
};

pexprs.Apply.prototype.reallyEval = function(state) {
  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  var origPosInfo = state.getCurrentPosInfo();
  var ruleInfo = state.grammar.rules[this.ruleName];
  var body = ruleInfo.body;
  var description = ruleInfo.description;

  origPosInfo.enter(this);

  var origFailuresInfo;
  if (description) {
    origFailuresInfo = state.getFailuresInfo();
  }

  var value = this.evalOnce(body, state);
  var currentLR = origPosInfo.currentLeftRecursion;
  var memoKey = this.toMemoKey();
  var isHeadOfLeftRecursion = !!currentLR && currentLR.headApplication.toMemoKey() === memoKey;
  var memoized = true;

  if (isHeadOfLeftRecursion) {
    value = this.growSeedResult(body, state, origPos, currentLR, value);
    origPosInfo.endLeftRecursion();
  } else if (currentLR && currentLR.isInvolved(memoKey)) {
    // Don't memoize the result
    memoized = false;
  } else {
    origPosInfo.memo[memoKey] = {
      pos: inputStream.pos,
      value: value,
      failuresAtRightmostPosition: state.cloneRightmostFailures()
    };
  }

  if (description) {
    state.restoreFailuresInfo(origFailuresInfo);
    if (!value) {
      state.processFailure(origPos, this);
    }

    if (memoized) {
      origPosInfo.memo[memoKey].failuresAtRightmostPosition = state.cloneRightmostFailures();
    }
  }

  // Record trace information in the memo table, so that it is available if the memoized result
  // is used later.
  if (state.isTracing() && origPosInfo.memo[memoKey]) {
    var succeeded = !!value;
    var entry = state.getTraceEntry(origPos, this, succeeded, succeeded ? [value] : []);
    if (isHeadOfLeftRecursion) {
      common.assert(entry.terminatingLREntry != null || !succeeded);
      entry.isHeadOfLeftRecursion = true;
    }
    origPosInfo.memo[memoKey].traceEntry = entry;
  }

  origPosInfo.exit();

  if (value) {
    state.bindings.push(value);
    return true;
  } else {
    return false;
  }
};

pexprs.Apply.prototype.evalOnce = function(expr, state) {
  var inputStream = state.inputStream;
  var origPos = inputStream.pos;

  if (state.eval(expr)) {
    var arity = expr.getArity();
    var bindings = state.bindings.splice(state.bindings.length - arity, arity);
    var ans =
        new NonterminalNode(state.grammar, this.ruleName, bindings, inputStream.interval(origPos));
    return ans;
  } else {
    return false;
  }
};

pexprs.Apply.prototype.growSeedResult = function(body, state, origPos, lrMemoRec, newValue) {
  if (!newValue) {
    return false;
  }

  var inputStream = state.inputStream;

  while (true) {
    lrMemoRec.pos = inputStream.pos;
    lrMemoRec.value = newValue;
    lrMemoRec.failuresAtRightmostPosition = state.cloneRightmostFailures();

    if (state.isTracing()) {
      // Before evaluating the body again, add a trace node for this application to the memo entry.
      // Its only child is a copy of the trace node from `newValue`, which will always be the last
      // element in `state.trace`.
      var seedTrace = state.trace[state.trace.length - 1];
      lrMemoRec.traceEntry = new Trace(
          state.inputStream, origPos, this, true, [newValue], [seedTrace.clone()]);
    }
    inputStream.pos = origPos;
    newValue = this.evalOnce(body, state);
    if (inputStream.pos <= lrMemoRec.pos) {
      break;
    }
    if (state.isTracing()) {
      state.trace.splice(-2, 1);  // Drop the trace for the old seed.
    }
  }
  if (state.isTracing()) {
    // The last entry is for an unused result -- pop it and save it in the "real" entry.
    lrMemoRec.traceEntry.recordLRTermination(state.trace.pop(), newValue);
  }
  inputStream.pos = lrMemoRec.pos;
  return lrMemoRec.value;
};

pexprs.UnicodeChar.prototype.eval = function(state) {
  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  var ch = inputStream.next();
  if (ch && this.pattern.test(ch)) {
    var source = inputStream.interval(origPos);
    state.bindings.push(new TerminalNode(state.grammar, ch, source));
    return true;
  } else {
    state.processFailure(origPos, this);
    return false;
  }
};

},{"./Trace":38,"./common":39,"./nodes":42,"./pexprs":59}],49:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------

function flatten(listOfLists) {
  return Array.prototype.concat.apply([], listOfLists);
}

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.generateExample = common.abstract('generateExample');

pexprs.any.generateExample = function(grammar, examples, inSyntacticContext, actuals) {
  return {value: String.fromCharCode(Math.floor(Math.random() * 255))};
};

function categorizeExamples(examples) {
  // A list of rules that the system needs examples of, in order to generate an example
  //   for the current rule
  var examplesNeeded = examples.filter(function(example) {
    return example.hasOwnProperty('examplesNeeded');
  })
  .map(function(example) { return example.examplesNeeded; });

  examplesNeeded = flatten(examplesNeeded);

  var uniqueExamplesNeeded = {};
  for (var i = 0; i < examplesNeeded.length; i++) {
    var currentExampleNeeded = examplesNeeded[i];
    uniqueExamplesNeeded[currentExampleNeeded] = true;
  }
  examplesNeeded = Object.keys(uniqueExamplesNeeded);

  // A list of successfully generated examples
  var successfulExamples = examples.filter(function(example) {
    return example.hasOwnProperty('value');
  })
  .map(function(item) { return item.value; });

  // This flag returns true if the system cannot generate the rule it is currently
  //   attempting to generate, regardless of whether or not it has the examples it needs.
  //   Currently, this is only used in overriding generators to prevent the system from
  //   generating examples for certain rules (e.g. 'ident').
  var needHelp = examples.some(function(item) { return item.needHelp; });

  return {
    examplesNeeded: examplesNeeded,
    successfulExamples: successfulExamples,
    needHelp: needHelp
  };
}

pexprs.Alt.prototype.generateExample = function(grammar, examples, inSyntacticContext, actuals) {
  // items -> termExamples
  var termExamples = this.terms.map(function(term) {
    return term.generateExample(grammar, examples, inSyntacticContext, actuals);
  });

  var categorizedExamples = categorizeExamples(termExamples);

  var examplesNeeded = categorizedExamples.examplesNeeded;
  var successfulExamples = categorizedExamples.successfulExamples;
  var needHelp = categorizedExamples.needHelp;

  var ans = {};

  // Alt can contain both an example and a request for examples
  if (successfulExamples.length > 0) {
    var i = Math.floor(Math.random() * successfulExamples.length);
    ans.value = successfulExamples[i];
  }
  if (examplesNeeded.length > 0) {
    ans.examplesNeeded = examplesNeeded;
  }
  ans.needHelp = needHelp;

  return ans;
};

pexprs.Seq.prototype.generateExample = function(grammar, examples, inSyntacticContext, actuals) {
  var factorExamples = this.factors.map(function(factor) {
    return factor.generateExample(grammar, examples, inSyntacticContext, actuals);
  });
  var categorizedExamples = categorizeExamples(factorExamples);

  var examplesNeeded = categorizedExamples.examplesNeeded;
  var successfulExamples = categorizedExamples.successfulExamples;
  var needHelp = categorizedExamples.needHelp;

  var ans = {};

  // In a Seq, all pieces must succeed in order to have a successful example.
  if (examplesNeeded.length > 0 || needHelp) {
    ans.examplesNeeded = examplesNeeded;
    ans.needHelp = needHelp;
  } else {
    ans.value = successfulExamples.join(inSyntacticContext ? ' ' : '');
  }

  return ans;
};

pexprs.Apply.prototype.generateExample = function(grammar, examples, inSyntacticContext, actuals) {
  var ans = {};

  var ruleName = this.substituteParams(actuals).toString();

  if (!examples.hasOwnProperty(ruleName)) {
    ans.examplesNeeded = [ruleName];
  } else {
    var relevantExamples = examples[ruleName];
    var i = Math.floor(Math.random() * relevantExamples.length);
    ans.value = relevantExamples[i];
  }

  return ans;
};

// Assumes that terminal's object is always a string
pexprs.Terminal.prototype.generateExample = function(grammar, examples, inSyntacticContext) {
  return {value: this.obj};
};

pexprs.Range.prototype.generateExample = function(grammar, examples, inSyntacticContext) {
  var rangeSize = this.to.charCodeAt(0) - this.from.charCodeAt(0);
  return {value: String.fromCharCode(
    this.from.charCodeAt(0) + Math.floor(rangeSize * Math.random())
  )};
};

// TODO: make 'Not' and 'Lookahead' behaviour smarter
// Right now, 'Not' and 'Lookahead' generate nothing and assume that whatever follows will
//   work according to the encoded constraints.
pexprs.Not.prototype.generateExample = function(grammar, examples, inSyntacticContext) {
  return {value: ''};
};

pexprs.Lookahead.prototype.generateExample = function(grammar, examples, inSyntacticContext) {
  return {value: ''};
};

pexprs.Param.prototype.generateExample = function(grammar, examples, inSyntacticContext, actuals) {
  return actuals[this.index].generateExample(grammar, examples, inSyntacticContext, actuals);
};

function generateNExamples(pexpr, grammar, examples, inSyntacticContext, actuals, numTimes) {
  var items = [];

  for (var i = 0; i < numTimes; i++) {
    items.push(pexpr.expr.generateExample(grammar, examples, inSyntacticContext, actuals));
  }

  var categorizedExamples = categorizeExamples(items);

  var examplesNeeded = categorizedExamples.examplesNeeded;
  var successfulExamples = categorizedExamples.successfulExamples;

  var ans = {};

  // It's always either one or the other.
  // TODO: instead of ' ', call 'spaces.generateExample()'
  ans.value = successfulExamples.join(inSyntacticContext ? ' ' : '');
  if (examplesNeeded.length > 0) {
    ans.examplesNeeded = examplesNeeded;
  }

  return ans;
}

pexprs.Star.prototype.generateExample = function(grammar, examples, inSyntacticContext, actuals) {
  return generateNExamples(this, grammar, examples, inSyntacticContext, actuals,
                           Math.floor(Math.random() * 4));
};

pexprs.Plus.prototype.generateExample = function(grammar, examples, inSyntacticContext, actuals) {
  return generateNExamples(this, grammar, examples, inSyntacticContext, actuals,
                           Math.floor(Math.random() * 3 + 1));
};

pexprs.Opt.prototype.generateExample = function(grammar, examples, inSyntacticContext, actuals) {
  return generateNExamples(this, grammar, examples, inSyntacticContext, actuals,
                           Math.floor(Math.random() * 2));
};

pexprs.UnicodeChar.prototype.generateExample = function(
    grammar, examples, inSyntacticContext, actuals) {
  var char;
  switch (this.category) {
    case 'Lu': char = 'Á'; break;
    case 'Ll': char = 'ŏ'; break;
    case 'Lt': char = 'ǅ'; break;
    case 'Lm': char = 'ˮ'; break;
    case 'Lo': char = 'ƻ'; break;

    case 'Nl': char = 'ↂ'; break;
    case 'Nd': char = '½'; break;

    case 'Mn': char = '\u0487'; break;
    case 'Mc': char = 'ि'; break;

    case 'Pc': char = '⁀'; break;

    case 'Zs': char = '\u2001'; break;

    case 'L': char = 'Á'; break;
    case 'Ltmo': char = 'ǅ'; break;
  }
  return {value: char}; // 💩
};

},{"./common":39,"./pexprs":59}],50:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.getArity = common.abstract('getArity');

pexprs.any.getArity =
pexprs.end.getArity =
pexprs.Terminal.prototype.getArity =
pexprs.Range.prototype.getArity =
pexprs.Param.prototype.getArity =
pexprs.Apply.prototype.getArity =
pexprs.UnicodeChar.prototype.getArity = function() {
  return 1;
};

pexprs.Alt.prototype.getArity = function() {
  // This is ok b/c all terms must have the same arity -- this property is
  // checked by the Grammar constructor.
  return this.terms.length === 0 ? 0 : this.terms[0].getArity();
};

pexprs.Seq.prototype.getArity = function() {
  var arity = 0;
  for (var idx = 0; idx < this.factors.length; idx++) {
    arity += this.factors[idx].getArity();
  }
  return arity;
};

pexprs.Iter.prototype.getArity = function() {
  return this.expr.getArity();
};

pexprs.Not.prototype.getArity = function() {
  return 0;
};

pexprs.Lookahead.prototype.getArity =
pexprs.Lex.prototype.getArity = function() {
  return this.expr.getArity();
};

},{"./common":39,"./pexprs":59}],51:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

/*
  Called at grammar creation time to rewrite a rule body, replacing each reference to a formal
  parameter with a `Param` node. Returns a PExpr -- either a new one, or the original one if
  it was modified in place.
*/
pexprs.PExpr.prototype.introduceParams = common.abstract('introduceParams');

pexprs.any.introduceParams =
pexprs.end.introduceParams =
pexprs.Terminal.prototype.introduceParams =
pexprs.Range.prototype.introduceParams =
pexprs.Param.prototype.introduceParams =
pexprs.UnicodeChar.prototype.introduceParams = function(formals) {
  return this;
};

pexprs.Alt.prototype.introduceParams = function(formals) {
  this.terms.forEach(function(term, idx, terms) {
    terms[idx] = term.introduceParams(formals);
  });
  return this;
};

pexprs.Seq.prototype.introduceParams = function(formals) {
  this.factors.forEach(function(factor, idx, factors) {
    factors[idx] = factor.introduceParams(formals);
  });
  return this;
};

pexprs.Iter.prototype.introduceParams =
pexprs.Not.prototype.introduceParams =
pexprs.Lookahead.prototype.introduceParams =
pexprs.Lex.prototype.introduceParams = function(formals) {
  this.expr = this.expr.introduceParams(formals);
  return this;
};

pexprs.Apply.prototype.introduceParams = function(formals) {
  var index = formals.indexOf(this.ruleName);
  if (index >= 0) {
    if (this.args.length > 0) {
      // TODO: Should this be supported? See issue #64.
      throw new Error('Parameterized rules cannot be passed as arguments to another rule.');
    }
    return new pexprs.Param(index);
  } else {
    this.args.forEach(function(arg, idx, args) {
      args[idx] = arg.introduceParams(formals);
    });
    return this;
  }
};

},{"./common":39,"./pexprs":59}],52:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

// Returns `true` if this parsing expression may accept without consuming any input.
pexprs.PExpr.prototype.isNullable = function(grammar) {
  return this._isNullable(grammar, Object.create(null));
};

pexprs.PExpr.prototype._isNullable = common.abstract('_isNullable');

pexprs.any._isNullable =
pexprs.Range.prototype._isNullable =
pexprs.Param.prototype._isNullable =
pexprs.Plus.prototype._isNullable =
pexprs.UnicodeChar.prototype._isNullable = function(grammar, memo) {
  return false;
};

pexprs.end._isNullable = function(grammar, memo) {
  return true;
};

pexprs.Terminal.prototype._isNullable = function(grammar, memo) {
  if (typeof this.obj === 'string') {
    // This is an over-simplification: it's only correct if the input is a string. If it's an array
    // or an object, then the empty string parsing expression is not nullable.
    return this.obj === '';
  } else {
    return false;
  }
};

pexprs.Alt.prototype._isNullable = function(grammar, memo) {
  return this.terms.length === 0 ||
      this.terms.some(function(term) { return term._isNullable(grammar, memo); });
};

pexprs.Seq.prototype._isNullable = function(grammar, memo) {
  return this.factors.every(function(factor) { return factor._isNullable(grammar, memo); });
};

pexprs.Star.prototype._isNullable =
pexprs.Opt.prototype._isNullable =
pexprs.Not.prototype._isNullable =
pexprs.Lookahead.prototype._isNullable = function(grammar, memo) {
  return true;
};

pexprs.Lex.prototype._isNullable = function(grammar, memo) {
  return this.expr._isNullable(grammar, memo);
};

pexprs.Apply.prototype._isNullable = function(grammar, memo) {
  var key = this.toMemoKey();
  if (!Object.prototype.hasOwnProperty.call(memo, key)) {
    var body = grammar.rules[this.ruleName].body;
    var inlined = body.substituteParams(this.args);
    memo[key] = false;  // Prevent infinite recursion for recursive rules.
    memo[key] = inlined._isNullable(grammar, memo);
  }
  return memo[key];
};

},{"./common":39,"./pexprs":59}],53:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function getMetaInfo(expr, grammarInterval) {
  var metaInfo = {};
  if (expr.source && grammarInterval) {
    var adjusted = expr.source.relativeTo(grammarInterval);
    metaInfo.sourceInterval = [adjusted.startIdx, adjusted.endIdx];
  }
  return metaInfo;
}

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.outputRecipe = common.abstract('outputRecipe');

pexprs.any.outputRecipe = function(formals, grammarInterval) {
  return ['any', getMetaInfo(this, grammarInterval)];
};

pexprs.end.outputRecipe = function(formals, grammarInterval) {
  return ['end', getMetaInfo(this, grammarInterval)];
};

pexprs.Terminal.prototype.outputRecipe = function(formals, grammarInterval) {
  return [
    'terminal',
    getMetaInfo(this, grammarInterval),
    this.obj
  ];
};

pexprs.Range.prototype.outputRecipe = function(formals, grammarInterval) {
  return [
    'range',
    getMetaInfo(this, grammarInterval),
    this.from,
    this.to
  ];
};

pexprs.Param.prototype.outputRecipe = function(formals, grammarInterval) {
  return [
    'param',
    getMetaInfo(this, grammarInterval),
    this.index
  ];
};

pexprs.Alt.prototype.outputRecipe = function(formals, grammarInterval) {
  return [
    'alt',
    getMetaInfo(this, grammarInterval)
  ].concat(this.terms.map(function(term) {
    return term.outputRecipe(formals, grammarInterval);
  }));
};

pexprs.Extend.prototype.outputRecipe = function(formals, grammarInterval) {
  var extension = this.terms[0]; // [extension, orginal]
  return extension.outputRecipe(formals, grammarInterval);
};

pexprs.Seq.prototype.outputRecipe = function(formals, grammarInterval) {
  return [
    'seq',
    getMetaInfo(this, grammarInterval)
  ].concat(this.factors.map(function(factor) {
    return factor.outputRecipe(formals, grammarInterval);
  }));
};

pexprs.Star.prototype.outputRecipe =
pexprs.Plus.prototype.outputRecipe =
pexprs.Opt.prototype.outputRecipe =
pexprs.Not.prototype.outputRecipe =
pexprs.Lookahead.prototype.outputRecipe =
pexprs.Lex.prototype.outputRecipe = function(formals, grammarInterval) {
  return [
    this.constructor.name.toLowerCase(),
    getMetaInfo(this, grammarInterval),
    this.expr.outputRecipe(formals, grammarInterval)
  ];
};

pexprs.Apply.prototype.outputRecipe = function(formals, grammarInterval) {
  return [
    'app',
    getMetaInfo(this, grammarInterval),
    this.ruleName,
    this.args.map(function(arg) {
      return arg.outputRecipe(formals, grammarInterval);
    })
  ];
};

pexprs.UnicodeChar.prototype.outputRecipe = function(formals, grammarInterval) {
  return [
    'unicodeChar',
    getMetaInfo(this, grammarInterval),
    this.category
  ];
};

},{"./common":39,"./pexprs":59}],54:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

/*
  Returns a PExpr that results from recursively replacing every formal parameter (i.e., instance
  of `Param`) inside this PExpr with its actual value from `actuals` (an Array).

  The receiver must not be modified; a new PExpr must be returned if any replacement is necessary.
*/
// function(actuals) { ... }
pexprs.PExpr.prototype.substituteParams = common.abstract('substituteParams');

pexprs.any.substituteParams =
pexprs.end.substituteParams =
pexprs.Terminal.prototype.substituteParams =
pexprs.Range.prototype.substituteParams =
pexprs.Terminal.prototype.substituteParams =
pexprs.UnicodeChar.prototype.substituteParams = function(actuals) {
  return this;
};

pexprs.Param.prototype.substituteParams = function(actuals) {
  return actuals[this.index];
};

pexprs.Alt.prototype.substituteParams = function(actuals) {
  return new pexprs.Alt(
      this.terms.map(function(term) { return term.substituteParams(actuals); }));
};

pexprs.Seq.prototype.substituteParams = function(actuals) {
  return new pexprs.Seq(
      this.factors.map(function(factor) { return factor.substituteParams(actuals); }));
};

pexprs.Iter.prototype.substituteParams =
pexprs.Not.prototype.substituteParams =
pexprs.Lookahead.prototype.substituteParams =
pexprs.Lex.prototype.substituteParams = function(actuals) {
  return new this.constructor(this.expr.substituteParams(actuals));
};

pexprs.Apply.prototype.substituteParams = function(actuals) {
  if (this.args.length === 0) {
    // Avoid making a copy of this application, as an optimization
    return this;
  } else {
    var args = this.args.map(function(arg) { return arg.substituteParams(actuals); });
    return new pexprs.Apply(this.ruleName, args);
  }
};

},{"./common":39,"./pexprs":59}],55:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var pexprs = require('./pexprs');

var copyWithoutDuplicates = common.copyWithoutDuplicates;

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function isRestrictedJSIdentifier(str) {
  return /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(str);
}

function resolveDuplicatedNames(argumentNameList) {
  // `count` is used to record the number of times each argument name occurs in the list,
  // this is useful for checking duplicated argument name. It maps argument names to ints.
  var count = Object.create(null);
  argumentNameList.forEach(function(argName) {
    count[argName] = (count[argName] || 0) + 1;
  });

  // Append subscripts ('_1', '_2', ...) to duplicate argument names.
  Object.keys(count).forEach(function(dupArgName) {
    if (count[dupArgName] <= 1) {
      return;
    }

    // This name shows up more than once, so add subscripts.
    var subscript = 1;
    argumentNameList.forEach(function(argName, idx) {
      if (argName === dupArgName) {
        argumentNameList[idx] = argName + '_' + subscript++;
      }
    });
  });
}

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

/*
  Returns a list of strings that will be used as the default argument names for its receiver
  (a pexpr) in a semantic action. This is used exclusively by the Semantics Editor.

  `firstArgIndex` is the 1-based index of the first argument name that will be generated for this
  pexpr. It enables us to name arguments positionally, e.g., if the second argument is a
  non-alphanumeric terminal like "+", it will be named '$2'.

  `noDupCheck` is true if the caller of `toArgumentNameList` is not a top level caller. It enables
  us to avoid nested duplication subscripts appending, e.g., '_1_1', '_1_2', by only checking
  duplicates at the top level.

  Here is a more elaborate example that illustrates how this method works:
  `(a "+" b).toArgumentNameList(1)` evaluates to `['a', '$2', 'b']` with the following recursive
  calls:

    (a).toArgumentNameList(1) -> ['a'],
    ("+").toArgumentNameList(2) -> ['$2'],
    (b).toArgumentNameList(3) -> ['b']

  Notes:
  * This method must only be called on well-formed expressions, e.g., the receiver must
    not have any Alt sub-expressions with inconsistent arities.
  * e.getArity() === e.toArgumentNameList(1).length
*/
// function(firstArgIndex, noDupCheck) { ... }
pexprs.PExpr.prototype.toArgumentNameList = common.abstract('toArgumentNameList');

pexprs.any.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  return ['any'];
};

pexprs.end.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  return ['end'];
};

pexprs.Terminal.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  if (typeof this.obj === 'string' && /^[_a-zA-Z0-9]+$/.test(this.obj)) {
    // If this terminal is a valid suffix for a JS identifier, just prepend it with '_'
    return ['_' + this.obj];
  } else {
    // Otherwise, name it positionally.
    return ['$' + firstArgIndex];
  }
};

pexprs.Range.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  var argName = this.from + '_to_' + this.to;
  // If the `argName` is not valid then try to prepend a `_`.
  if (!isRestrictedJSIdentifier(argName)) {
    argName = '_' + argName;
  }
  // If the `argName` still not valid after prepending a `_`, then name it positionally.
  if (!isRestrictedJSIdentifier(argName)) {
    argName = '$' + firstArgIndex;
  }
  return [argName];
};

pexprs.Alt.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  // `termArgNameLists` is an array of arrays where each row is the
  // argument name list that corresponds to a term in this alternation.
  var termArgNameLists = this.terms.map(function(term) {
    return term.toArgumentNameList(firstArgIndex, true);
  });

  var argumentNameList = [];
  var numArgs = termArgNameLists[0].length;
  for (var colIdx = 0; colIdx < numArgs; colIdx++) {
    var col = [];
    for (var rowIdx = 0; rowIdx < this.terms.length; rowIdx++) {
      col.push(termArgNameLists[rowIdx][colIdx]);
    }
    var uniqueNames = copyWithoutDuplicates(col);
    argumentNameList.push(uniqueNames.join('_or_'));
  }

  if (!noDupCheck) {
    resolveDuplicatedNames(argumentNameList);
  }
  return argumentNameList;
};

pexprs.Seq.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  // Generate the argument name list, without worrying about duplicates.
  var argumentNameList = [];
  this.factors.forEach(function(factor) {
    var factorArgumentNameList = factor.toArgumentNameList(firstArgIndex, true);
    argumentNameList = argumentNameList.concat(factorArgumentNameList);

    // Shift the firstArgIndex to take this factor's argument names into account.
    firstArgIndex += factorArgumentNameList.length;
  });
  if (!noDupCheck) {
    resolveDuplicatedNames(argumentNameList);
  }
  return argumentNameList;
};

pexprs.Iter.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  var argumentNameList = this.expr.toArgumentNameList(firstArgIndex, noDupCheck)
    .map(function(exprArgumentString) {
      return exprArgumentString[exprArgumentString.length - 1] === 's' ?
          exprArgumentString + 'es' :
          exprArgumentString + 's';
    });
  if (!noDupCheck) {
    resolveDuplicatedNames(argumentNameList);
  }
  return argumentNameList;
};

pexprs.Opt.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  return this.expr.toArgumentNameList(firstArgIndex, noDupCheck).map(function(argName) {
    return 'opt' + argName[0].toUpperCase() + argName.slice(1);
  });
};

pexprs.Not.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  return [];
};

pexprs.Lookahead.prototype.toArgumentNameList =
pexprs.Lex.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  return this.expr.toArgumentNameList(firstArgIndex, noDupCheck);
};

pexprs.Apply.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  return [this.ruleName];
};

pexprs.UnicodeChar.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  return ['$' + firstArgIndex];
};

pexprs.Param.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  return ['param' + this.index];
};

// "Value pexprs" (Value, Str, Arr, Obj) are going away soon, so we don't worry about them here.

},{"./common":39,"./pexprs":59}],56:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

// Returns a string representing the PExpr, for use as a UI label, etc.
pexprs.PExpr.prototype.toDisplayString = common.abstract('toDisplayString');

pexprs.Alt.prototype.toDisplayString =
pexprs.Seq.prototype.toDisplayString =
pexprs.Iter.prototype.toDisplayString =
pexprs.Not.prototype.toDisplayString =
pexprs.Lookahead.prototype.toDisplayString =
pexprs.Lex.prototype.toDisplayString = function() {
  if (this.source) {
    return this.source.trimmed().contents;
  }
  return '[' + this.constructor.name + ']';
};

pexprs.any.toDisplayString = function() {
  return 'any';
};

pexprs.end.toDisplayString = function() {
  return 'end';
};

pexprs.Terminal.prototype.toDisplayString = function() {
  return JSON.stringify(this.obj);
};

pexprs.Range.prototype.toDisplayString = function() {
  return JSON.stringify(this.from) + '..' + JSON.stringify(this.to);
};

pexprs.Param.prototype.toDisplayString = function() {
  return '#' + this.index;
};

pexprs.Apply.prototype.toDisplayString = function() {
  return this.toString();
};

pexprs.UnicodeChar.prototype.toDisplayString = function() {
  return 'Unicode {' + this.category + '} character';
};

},{"./common":39,"./pexprs":59}],57:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var Failure = require('./Failure');
var common = require('./common');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.toFailure = common.abstract('toFailure');

pexprs.any.toFailure = function(grammar) {
  return new Failure(this, 'any object', 'description');
};

pexprs.end.toFailure = function(grammar) {
  return new Failure(this, 'end of input', 'description');
};

pexprs.Terminal.prototype.toFailure = function(grammar) {
  return new Failure(this, this.obj, 'string');
};

pexprs.Range.prototype.toFailure = function(grammar) {
  // TODO: come up with something better
  return new Failure(this, JSON.stringify(this.from) + '..' + JSON.stringify(this.to), 'code');
};

pexprs.Not.prototype.toFailure = function(grammar) {
  var description = this.expr === pexprs.any ?
      'nothing' :
      'not ' + this.expr.toFailure(grammar);
  return new Failure(this, description, 'description');
};

pexprs.Lookahead.prototype.toFailure = function(grammar) {
  return this.expr.toFailure(grammar);
};

pexprs.Apply.prototype.toFailure = function(grammar) {
  var description = grammar.rules[this.ruleName].description;
  if (!description) {
    var article = (/^[aeiouAEIOU]/.test(this.ruleName) ? 'an' : 'a');
    description = article + ' ' + this.ruleName;
  }
  return new Failure(this, description, 'description');
};

pexprs.UnicodeChar.prototype.toFailure = function(grammar) {
  return new Failure(this, this.toDisplayString(), 'description');
};

pexprs.Alt.prototype.toFailure = function(grammar) {
  var fs = this.terms.map(function(t) { return t.toFailure(); });
  var description = '(' + fs.join(' or ') + ')';
  return new Failure(this, description, 'description');
};

pexprs.Seq.prototype.toFailure = function(grammar) {
  var fs = this.factors.map(function(f) { return f.toFailure(); });
  var description = '(' + fs.join(' ') + ')';
  return new Failure(this, description, 'description');
};

pexprs.Iter.prototype.toFailure = function(grammar) {
  var description = '(' + this.expr.toFailure() + this.operator + ')';
  return new Failure(this, description, 'description');
};

},{"./Failure":28,"./common":39,"./pexprs":59}],58:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

/*
  e1.toString() === e2.toString() ==> e1 and e2 are semantically equivalent.
  Note that this is not an iff (<==>): e.g.,
  (~"b" "a").toString() !== ("a").toString(), even though
  ~"b" "a" and "a" are interchangeable in any grammar,
  both in terms of the languages they accept and their arities.
*/
pexprs.PExpr.prototype.toString = common.abstract('toString');

pexprs.any.toString = function() {
  return 'any';
};

pexprs.end.toString = function() {
  return 'end';
};

pexprs.Terminal.prototype.toString = function() {
  return JSON.stringify(this.obj);
};

pexprs.Range.prototype.toString = function() {
  return JSON.stringify(this.from) + '..' + JSON.stringify(this.to);
};

pexprs.Param.prototype.toString = function() {
  return '$' + this.index;
};

pexprs.Lex.prototype.toString = function() {
  return '#(' + this.expr.toString() + ')';
};

pexprs.Alt.prototype.toString = function() {
  return this.terms.length === 1 ?
    this.terms[0].toString() :
    '(' + this.terms.map(function(term) { return term.toString(); }).join(' | ') + ')';
};

pexprs.Seq.prototype.toString = function() {
  return this.factors.length === 1 ?
    this.factors[0].toString() :
    '(' + this.factors.map(function(factor) { return factor.toString(); }).join(' ') + ')';
};

pexprs.Iter.prototype.toString = function() {
  return this.expr + this.operator;
};

pexprs.Not.prototype.toString = function() {
  return '~' + this.expr;
};

pexprs.Lookahead.prototype.toString = function() {
  return '&' + this.expr;
};

pexprs.Apply.prototype.toString = function() {
  if (this.args.length > 0) {
    var ps = this.args.map(function(arg) { return arg.toString(); });
    return this.ruleName + '<' + ps.join(',') + '>';
  } else {
    return this.ruleName;
  }
};

pexprs.UnicodeChar.prototype.toString = function() {
  return '\\p{' + this.category + '}';
};

},{"./common":39,"./pexprs":59}],59:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var UnicodeCategories = require('../third_party/UnicodeCategories');
var common = require('./common');
var errors = require('./errors');
var inherits = require('inherits');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

// General stuff

function PExpr() {
  throw new Error("PExpr cannot be instantiated -- it's abstract");
}

// Set the `source` property to the interval containing the source for this expression.
PExpr.prototype.withSource = function(interval) {
  if (interval) {
    this.source = interval.trimmed();
  }
  return this;
};

// Any

var any = Object.create(PExpr.prototype);

// End

var end = Object.create(PExpr.prototype);

// Terminals

function Terminal(obj) {
  this.obj = obj;
}
inherits(Terminal, PExpr);

// Ranges

function Range(from, to) {
  this.from = from;
  this.to = to;
}
inherits(Range, PExpr);

// Parameters

function Param(index) {
  this.index = index;
}
inherits(Param, PExpr);

// Alternation

function Alt(terms) {
  this.terms = terms;
}
inherits(Alt, PExpr);

// Extend is an implementation detail of rule extension

function Extend(superGrammar, name, body) {
  this.superGrammar = superGrammar;
  this.name = name;
  this.body = body;
  var origBody = superGrammar.rules[name].body;
  this.terms = [body, origBody];
}
inherits(Extend, Alt);

// Sequences

function Seq(factors) {
  this.factors = factors;
}
inherits(Seq, PExpr);

// Iterators and optionals

function Iter(expr) {
  this.expr = expr;
}
inherits(Iter, PExpr);

function Star(expr) {
  this.expr = expr;
}
inherits(Star, Iter);

function Plus(expr) {
  this.expr = expr;
}
inherits(Plus, Iter);

function Opt(expr) {
  this.expr = expr;
}
inherits(Opt, Iter);

Star.prototype.operator = '*';
Plus.prototype.operator = '+';
Opt.prototype.operator = '?';

Star.prototype.minNumMatches = 0;
Plus.prototype.minNumMatches = 1;
Opt.prototype.minNumMatches = 0;

Star.prototype.maxNumMatches = Number.POSITIVE_INFINITY;
Plus.prototype.maxNumMatches = Number.POSITIVE_INFINITY;
Opt.prototype.maxNumMatches = 1;

// Predicates

function Not(expr) {
  this.expr = expr;
}
inherits(Not, PExpr);

function Lookahead(expr) {
  this.expr = expr;
}
inherits(Lookahead, PExpr);

// "Lexification"

function Lex(expr) {
  this.expr = expr;
}
inherits(Lex, PExpr);

// Array decomposition

function Arr(expr) {
  this.expr = expr;
}
inherits(Arr, PExpr);

// String decomposition

function Str(expr) {
  this.expr = expr;
}
inherits(Str, PExpr);

// Object decomposition

function Obj(properties, isLenient) {
  var names = properties.map(function(property) { return property.name; });
  var duplicates = common.getDuplicates(names);
  if (duplicates.length > 0) {
    throw errors.duplicatePropertyNames(duplicates);
  } else {
    this.properties = properties;
    this.isLenient = isLenient;
  }
}
inherits(Obj, PExpr);

// Rule application

function Apply(ruleName, optArgs) {
  this.ruleName = ruleName;
  this.args = optArgs || [];
}
inherits(Apply, PExpr);

Apply.prototype.isSyntactic = function() {
  return common.isSyntactic(this.ruleName);
};

// This method just caches the result of `this.toString()` in a non-enumerable property.
Apply.prototype.toMemoKey = function() {
  if (!this._memoKey) {
    Object.defineProperty(this, '_memoKey', {value: this.toString()});
  }
  return this._memoKey;
};

// Unicode character

function UnicodeChar(category) {
  this.category = category;
  this.pattern = UnicodeCategories[category];
}
inherits(UnicodeChar, PExpr);

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

exports.PExpr = PExpr;
exports.any = any;
exports.end = end;
exports.Terminal = Terminal;
exports.Range = Range;
exports.Param = Param;
exports.Alt = Alt;
exports.Extend = Extend;
exports.Seq = Seq;
exports.Iter = Iter;
exports.Star = Star;
exports.Plus = Plus;
exports.Opt = Opt;
exports.Not = Not;
exports.Lookahead = Lookahead;
exports.Lex = Lex;
exports.Arr = Arr;
exports.Str = Str;
exports.Obj = Obj;
exports.Apply = Apply;
exports.UnicodeChar = UnicodeChar;

// --------------------------------------------------------------------
// Extensions
// --------------------------------------------------------------------

require('./pexprs-allowsSkippingPrecedingSpace');
require('./pexprs-assertAllApplicationsAreValid');
require('./pexprs-assertChoicesHaveUniformArity');
require('./pexprs-assertIteratedExprsAreNotNullable');
require('./pexprs-check');
require('./pexprs-eval');
require('./pexprs-getArity');
require('./pexprs-generateExample');
require('./pexprs-outputRecipe');
require('./pexprs-introduceParams');
require('./pexprs-isNullable');
require('./pexprs-substituteParams');
require('./pexprs-toDisplayString');
require('./pexprs-toArgumentNameList');
require('./pexprs-toFailure');
require('./pexprs-toString');

},{"../third_party/UnicodeCategories":61,"./common":39,"./errors":40,"./pexprs-allowsSkippingPrecedingSpace":43,"./pexprs-assertAllApplicationsAreValid":44,"./pexprs-assertChoicesHaveUniformArity":45,"./pexprs-assertIteratedExprsAreNotNullable":46,"./pexprs-check":47,"./pexprs-eval":48,"./pexprs-generateExample":49,"./pexprs-getArity":50,"./pexprs-introduceParams":51,"./pexprs-isNullable":52,"./pexprs-outputRecipe":53,"./pexprs-substituteParams":54,"./pexprs-toArgumentNameList":55,"./pexprs-toDisplayString":56,"./pexprs-toFailure":57,"./pexprs-toString":58,"inherits":24}],60:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

// Given an array of numbers `arr`, return an array of the numbers as strings,
// right-justified and padded to the same length.
function padNumbersToEqualLength(arr) {
  var maxLen = 0;
  var strings = arr.map(function(n) {
    var str = n.toString();
    maxLen = Math.max(maxLen, str.length);
    return str;
  });
  return strings.map(function(s) { return common.padLeft(s, maxLen); });
}

// Produce a new string that would be the result of copying the contents
// of the string `src` onto `dest` at offset `offest`.
function strcpy(dest, src, offset) {
  var origDestLen = dest.length;
  var start = dest.slice(0, offset);
  var end = dest.slice(offset + src.length);
  return (start + src + end).substr(0, origDestLen);
}

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

// Return an object with the line and column information for the given
// offset in `str`.
exports.getLineAndColumn = function(str, offset) {
  var lineNum = 1;
  var colNum = 1;

  var currOffset = 0;
  var lineStartOffset = 0;

  var nextLine = null;
  var prevLine = null;
  var prevLineStartOffset = -1;

  while (currOffset < offset) {
    var c = str.charAt(currOffset++);
    if (c === '\n') {
      lineNum++;
      colNum = 1;
      prevLineStartOffset = lineStartOffset;
      lineStartOffset = currOffset;
    } else if (c !== '\r') {
      colNum++;
    }
  }

  // Find the end of the target line.
  var lineEndOffset = str.indexOf('\n', lineStartOffset);
  if (lineEndOffset === -1) {
    lineEndOffset = str.length;
  } else {
    // Get the next line.
    var nextLineEndOffset = str.indexOf('\n', lineEndOffset + 1);
    nextLine = nextLineEndOffset === -1 ? str.slice(lineEndOffset)
                                        : str.slice(lineEndOffset, nextLineEndOffset);
    // Strip leading and trailing EOL char(s).
    nextLine = nextLine.replace(/^\r?\n/, '').replace(/\r$/, '');
  }

  // Get the previous line.
  if (prevLineStartOffset >= 0) {
    prevLine = str.slice(prevLineStartOffset, lineStartOffset)
                  .replace(/\r?\n$/, '');  // Strip trailing EOL char(s).
  }

  // Get the target line, stripping a trailing carriage return if necessary.
  var line = str.slice(lineStartOffset, lineEndOffset).replace(/\r$/, '');

  return {
    lineNum: lineNum,
    colNum: colNum,
    line: line,
    prevLine: prevLine,
    nextLine: nextLine
  };
};

// Return a nicely-formatted string describing the line and column for the
// given offset in `str`.
exports.getLineAndColumnMessage = function(str, offset /* ...ranges */) {
  var repeatStr = common.repeatStr;

  var lineAndCol = exports.getLineAndColumn(str, offset);
  var sb = new common.StringBuffer();
  sb.append('Line ' + lineAndCol.lineNum + ', col ' + lineAndCol.colNum + ':\n');

  // An array of the previous, current, and next line numbers as strings of equal length.
  var lineNumbers = padNumbersToEqualLength([
    lineAndCol.prevLine == null ? 0 : lineAndCol.lineNum - 1,
    lineAndCol.lineNum,
    lineAndCol.nextLine == null ? 0 : lineAndCol.lineNum + 1
  ]);

  // Helper for appending formatting input lines to the buffer.
  function appendLine(num, content, prefix) {
    sb.append(prefix + lineNumbers[num] + ' | ' + content + '\n');
  }

  // Include the previous line for context if possible.
  if (lineAndCol.prevLine != null) {
    appendLine(0, lineAndCol.prevLine, '  ');
  }
  // Line that the error occurred on.
  appendLine(1, lineAndCol.line, '> ');

  // Build up the line that points to the offset and possible indicates one or more ranges.
  // Start with a blank line, and indicate each range by overlaying a string of `~` chars.
  var lineLen = lineAndCol.line.length;
  var indicationLine = repeatStr(' ', lineLen + 1);
  var ranges = Array.prototype.slice.call(arguments, 2);
  for (var i = 0; i < ranges.length; ++i) {
    var startIdx = ranges[i][0];
    var endIdx = ranges[i][1];
    common.assert(startIdx >= 0 && startIdx <= endIdx, 'range start must be >= 0 and <= end');

    var lineStartOffset = offset - lineAndCol.colNum + 1;
    startIdx = Math.max(0, startIdx - lineStartOffset);
    endIdx = Math.min(endIdx - lineStartOffset, lineLen);

    indicationLine = strcpy(indicationLine, repeatStr('~', endIdx - startIdx), startIdx);
  }
  var gutterWidth = 2 + lineNumbers[1].length + 3;
  sb.append(repeatStr(' ', gutterWidth));
  indicationLine = strcpy(indicationLine, '^', lineAndCol.colNum - 1);
  sb.append(indicationLine.replace(/ +$/, '') + '\n');

  // Include the next line for context if possible.
  if (lineAndCol.nextLine != null) {
    appendLine(2, lineAndCol.nextLine, '  ');
  }
  return sb.contents();
};

},{"./common":39}],61:[function(require,module,exports){
// Based on https://github.com/tvcutsem/es-lab/blob/master/src/parser/unicode.js.
// These are just categories that are used in ES5.
// The full list of Unicode categories is here: http://www.fileformat.info/info/unicode/category/index.htm.
module.exports = {
  // Letters
  Lu: /[\u0041-\u005A]|[\u00C0-\u00D6]|[\u00D8-\u00DE]|[\u0100-\u0100]|[\u0102-\u0102]|[\u0104-\u0104]|[\u0106-\u0106]|[\u0108-\u0108]|[\u010A-\u010A]|[\u010C-\u010C]|[\u010E-\u010E]|[\u0110-\u0110]|[\u0112-\u0112]|[\u0114-\u0114]|[\u0116-\u0116]|[\u0118-\u0118]|[\u011A-\u011A]|[\u011C-\u011C]|[\u011E-\u011E]|[\u0120-\u0120]|[\u0122-\u0122]|[\u0124-\u0124]|[\u0126-\u0126]|[\u0128-\u0128]|[\u012A-\u012A]|[\u012C-\u012C]|[\u012E-\u012E]|[\u0130-\u0130]|[\u0132-\u0132]|[\u0134-\u0134]|[\u0136-\u0136]|[\u0139-\u0139]|[\u013B-\u013B]|[\u013D-\u013D]|[\u013F-\u013F]|[\u0141-\u0141]|[\u0143-\u0143]|[\u0145-\u0145]|[\u0147-\u0147]|[\u014A-\u014A]|[\u014C-\u014C]|[\u014E-\u014E]|[\u0150-\u0150]|[\u0152-\u0152]|[\u0154-\u0154]|[\u0156-\u0156]|[\u0158-\u0158]|[\u015A-\u015A]|[\u015C-\u015C]|[\u015E-\u015E]|[\u0160-\u0160]|[\u0162-\u0162]|[\u0164-\u0164]|[\u0166-\u0166]|[\u0168-\u0168]|[\u016A-\u016A]|[\u016C-\u016C]|[\u016E-\u016E]|[\u0170-\u0170]|[\u0172-\u0172]|[\u0174-\u0174]|[\u0176-\u0176]|[\u0178-\u0179]|[\u017B-\u017B]|[\u017D-\u017D]|[\u0181-\u0182]|[\u0184-\u0184]|[\u0186-\u0187]|[\u0189-\u018B]|[\u018E-\u0191]|[\u0193-\u0194]|[\u0196-\u0198]|[\u019C-\u019D]|[\u019F-\u01A0]|[\u01A2-\u01A2]|[\u01A4-\u01A4]|[\u01A6-\u01A7]|[\u01A9-\u01A9]|[\u01AC-\u01AC]|[\u01AE-\u01AF]|[\u01B1-\u01B3]|[\u01B5-\u01B5]|[\u01B7-\u01B8]|[\u01BC-\u01BC]|[\u01C4-\u01C4]|[\u01C7-\u01C7]|[\u01CA-\u01CA]|[\u01CD-\u01CD]|[\u01CF-\u01CF]|[\u01D1-\u01D1]|[\u01D3-\u01D3]|[\u01D5-\u01D5]|[\u01D7-\u01D7]|[\u01D9-\u01D9]|[\u01DB-\u01DB]|[\u01DE-\u01DE]|[\u01E0-\u01E0]|[\u01E2-\u01E2]|[\u01E4-\u01E4]|[\u01E6-\u01E6]|[\u01E8-\u01E8]|[\u01EA-\u01EA]|[\u01EC-\u01EC]|[\u01EE-\u01EE]|[\u01F1-\u01F1]|[\u01F4-\u01F4]|[\u01FA-\u01FA]|[\u01FC-\u01FC]|[\u01FE-\u01FE]|[\u0200-\u0200]|[\u0202-\u0202]|[\u0204-\u0204]|[\u0206-\u0206]|[\u0208-\u0208]|[\u020A-\u020A]|[\u020C-\u020C]|[\u020E-\u020E]|[\u0210-\u0210]|[\u0212-\u0212]|[\u0214-\u0214]|[\u0216-\u0216]|[\u0386-\u0386]|[\u0388-\u038A]|[\u038C-\u038C]|[\u038E-\u038F]|[\u0391-\u03A1]|[\u03A3-\u03AB]|[\u03D2-\u03D4]|[\u03DA-\u03DA]|[\u03DC-\u03DC]|[\u03DE-\u03DE]|[\u03E0-\u03E0]|[\u03E2-\u03E2]|[\u03E4-\u03E4]|[\u03E6-\u03E6]|[\u03E8-\u03E8]|[\u03EA-\u03EA]|[\u03EC-\u03EC]|[\u03EE-\u03EE]|[\u0401-\u040C]|[\u040E-\u042F]|[\u0460-\u0460]|[\u0462-\u0462]|[\u0464-\u0464]|[\u0466-\u0466]|[\u0468-\u0468]|[\u046A-\u046A]|[\u046C-\u046C]|[\u046E-\u046E]|[\u0470-\u0470]|[\u0472-\u0472]|[\u0474-\u0474]|[\u0476-\u0476]|[\u0478-\u0478]|[\u047A-\u047A]|[\u047C-\u047C]|[\u047E-\u047E]|[\u0480-\u0480]|[\u0490-\u0490]|[\u0492-\u0492]|[\u0494-\u0494]|[\u0496-\u0496]|[\u0498-\u0498]|[\u049A-\u049A]|[\u049C-\u049C]|[\u049E-\u049E]|[\u04A0-\u04A0]|[\u04A2-\u04A2]|[\u04A4-\u04A4]|[\u04A6-\u04A6]|[\u04A8-\u04A8]|[\u04AA-\u04AA]|[\u04AC-\u04AC]|[\u04AE-\u04AE]|[\u04B0-\u04B0]|[\u04B2-\u04B2]|[\u04B4-\u04B4]|[\u04B6-\u04B6]|[\u04B8-\u04B8]|[\u04BA-\u04BA]|[\u04BC-\u04BC]|[\u04BE-\u04BE]|[\u04C1-\u04C1]|[\u04C3-\u04C3]|[\u04C7-\u04C7]|[\u04CB-\u04CB]|[\u04D0-\u04D0]|[\u04D2-\u04D2]|[\u04D4-\u04D4]|[\u04D6-\u04D6]|[\u04D8-\u04D8]|[\u04DA-\u04DA]|[\u04DC-\u04DC]|[\u04DE-\u04DE]|[\u04E0-\u04E0]|[\u04E2-\u04E2]|[\u04E4-\u04E4]|[\u04E6-\u04E6]|[\u04E8-\u04E8]|[\u04EA-\u04EA]|[\u04EE-\u04EE]|[\u04F0-\u04F0]|[\u04F2-\u04F2]|[\u04F4-\u04F4]|[\u04F8-\u04F8]|[\u0531-\u0556]|[\u10A0-\u10C5]|[\u1E00-\u1E00]|[\u1E02-\u1E02]|[\u1E04-\u1E04]|[\u1E06-\u1E06]|[\u1E08-\u1E08]|[\u1E0A-\u1E0A]|[\u1E0C-\u1E0C]|[\u1E0E-\u1E0E]|[\u1E10-\u1E10]|[\u1E12-\u1E12]|[\u1E14-\u1E14]|[\u1E16-\u1E16]|[\u1E18-\u1E18]|[\u1E1A-\u1E1A]|[\u1E1C-\u1E1C]|[\u1E1E-\u1E1E]|[\u1E20-\u1E20]|[\u1E22-\u1E22]|[\u1E24-\u1E24]|[\u1E26-\u1E26]|[\u1E28-\u1E28]|[\u1E2A-\u1E2A]|[\u1E2C-\u1E2C]|[\u1E2E-\u1E2E]|[\u1E30-\u1E30]|[\u1E32-\u1E32]|[\u1E34-\u1E34]|[\u1E36-\u1E36]|[\u1E38-\u1E38]|[\u1E3A-\u1E3A]|[\u1E3C-\u1E3C]|[\u1E3E-\u1E3E]|[\u1E40-\u1E40]|[\u1E42-\u1E42]|[\u1E44-\u1E44]|[\u1E46-\u1E46]|[\u1E48-\u1E48]|[\u1E4A-\u1E4A]|[\u1E4C-\u1E4C]|[\u1E4E-\u1E4E]|[\u1E50-\u1E50]|[\u1E52-\u1E52]|[\u1E54-\u1E54]|[\u1E56-\u1E56]|[\u1E58-\u1E58]|[\u1E5A-\u1E5A]|[\u1E5C-\u1E5C]|[\u1E5E-\u1E5E]|[\u1E60-\u1E60]|[\u1E62-\u1E62]|[\u1E64-\u1E64]|[\u1E66-\u1E66]|[\u1E68-\u1E68]|[\u1E6A-\u1E6A]|[\u1E6C-\u1E6C]|[\u1E6E-\u1E6E]|[\u1E70-\u1E70]|[\u1E72-\u1E72]|[\u1E74-\u1E74]|[\u1E76-\u1E76]|[\u1E78-\u1E78]|[\u1E7A-\u1E7A]|[\u1E7C-\u1E7C]|[\u1E7E-\u1E7E]|[\u1E80-\u1E80]|[\u1E82-\u1E82]|[\u1E84-\u1E84]|[\u1E86-\u1E86]|[\u1E88-\u1E88]|[\u1E8A-\u1E8A]|[\u1E8C-\u1E8C]|[\u1E8E-\u1E8E]|[\u1E90-\u1E90]|[\u1E92-\u1E92]|[\u1E94-\u1E94]|[\u1EA0-\u1EA0]|[\u1EA2-\u1EA2]|[\u1EA4-\u1EA4]|[\u1EA6-\u1EA6]|[\u1EA8-\u1EA8]|[\u1EAA-\u1EAA]|[\u1EAC-\u1EAC]|[\u1EAE-\u1EAE]|[\u1EB0-\u1EB0]|[\u1EB2-\u1EB2]|[\u1EB4-\u1EB4]|[\u1EB6-\u1EB6]|[\u1EB8-\u1EB8]|[\u1EBA-\u1EBA]|[\u1EBC-\u1EBC]|[\u1EBE-\u1EBE]|[\u1EC0-\u1EC0]|[\u1EC2-\u1EC2]|[\u1EC4-\u1EC4]|[\u1EC6-\u1EC6]|[\u1EC8-\u1EC8]|[\u1ECA-\u1ECA]|[\u1ECC-\u1ECC]|[\u1ECE-\u1ECE]|[\u1ED0-\u1ED0]|[\u1ED2-\u1ED2]|[\u1ED4-\u1ED4]|[\u1ED6-\u1ED6]|[\u1ED8-\u1ED8]|[\u1EDA-\u1EDA]|[\u1EDC-\u1EDC]|[\u1EDE-\u1EDE]|[\u1EE0-\u1EE0]|[\u1EE2-\u1EE2]|[\u1EE4-\u1EE4]|[\u1EE6-\u1EE6]|[\u1EE8-\u1EE8]|[\u1EEA-\u1EEA]|[\u1EEC-\u1EEC]|[\u1EEE-\u1EEE]|[\u1EF0-\u1EF0]|[\u1EF2-\u1EF2]|[\u1EF4-\u1EF4]|[\u1EF6-\u1EF6]|[\u1EF8-\u1EF8]|[\u1F08-\u1F0F]|[\u1F18-\u1F1D]|[\u1F28-\u1F2F]|[\u1F38-\u1F3F]|[\u1F48-\u1F4D]|[\u1F59-\u1F59]|[\u1F5B-\u1F5B]|[\u1F5D-\u1F5D]|[\u1F5F-\u1F5F]|[\u1F68-\u1F6F]|[\u1F88-\u1F8F]|[\u1F98-\u1F9F]|[\u1FA8-\u1FAF]|[\u1FB8-\u1FBC]|[\u1FC8-\u1FCC]|[\u1FD8-\u1FDB]|[\u1FE8-\u1FEC]|[\u1FF8-\u1FFC]|[\u2102-\u2102]|[\u2107-\u2107]|[\u210B-\u210D]|[\u2110-\u2112]|[\u2115-\u2115]|[\u2119-\u211D]|[\u2124-\u2124]|[\u2126-\u2126]|[\u2128-\u2128]|[\u212A-\u212D]|[\u2130-\u2131]|[\u2133-\u2133]|[\uFF21-\uFF3A]/,
  Ll: /[\u0061-\u007A]|[\u00AA-\u00AA]|[\u00B5-\u00B5]|[\u00BA-\u00BA]|[\u00DF-\u00F6]|[\u00F8-\u00FF]|[\u0101-\u0101]|[\u0103-\u0103]|[\u0105-\u0105]|[\u0107-\u0107]|[\u0109-\u0109]|[\u010B-\u010B]|[\u010D-\u010D]|[\u010F-\u010F]|[\u0111-\u0111]|[\u0113-\u0113]|[\u0115-\u0115]|[\u0117-\u0117]|[\u0119-\u0119]|[\u011B-\u011B]|[\u011D-\u011D]|[\u011F-\u011F]|[\u0121-\u0121]|[\u0123-\u0123]|[\u0125-\u0125]|[\u0127-\u0127]|[\u0129-\u0129]|[\u012B-\u012B]|[\u012D-\u012D]|[\u012F-\u012F]|[\u0131-\u0131]|[\u0133-\u0133]|[\u0135-\u0135]|[\u0137-\u0138]|[\u013A-\u013A]|[\u013C-\u013C]|[\u013E-\u013E]|[\u0140-\u0140]|[\u0142-\u0142]|[\u0144-\u0144]|[\u0146-\u0146]|[\u0148-\u0149]|[\u014B-\u014B]|[\u014D-\u014D]|[\u014F-\u014F]|[\u0151-\u0151]|[\u0153-\u0153]|[\u0155-\u0155]|[\u0157-\u0157]|[\u0159-\u0159]|[\u015B-\u015B]|[\u015D-\u015D]|[\u015F-\u015F]|[\u0161-\u0161]|[\u0163-\u0163]|[\u0165-\u0165]|[\u0167-\u0167]|[\u0169-\u0169]|[\u016B-\u016B]|[\u016D-\u016D]|[\u016F-\u016F]|[\u0171-\u0171]|[\u0173-\u0173]|[\u0175-\u0175]|[\u0177-\u0177]|[\u017A-\u017A]|[\u017C-\u017C]|[\u017E-\u0180]|[\u0183-\u0183]|[\u0185-\u0185]|[\u0188-\u0188]|[\u018C-\u018D]|[\u0192-\u0192]|[\u0195-\u0195]|[\u0199-\u019B]|[\u019E-\u019E]|[\u01A1-\u01A1]|[\u01A3-\u01A3]|[\u01A5-\u01A5]|[\u01A8-\u01A8]|[\u01AB-\u01AB]|[\u01AD-\u01AD]|[\u01B0-\u01B0]|[\u01B4-\u01B4]|[\u01B6-\u01B6]|[\u01B9-\u01BA]|[\u01BD-\u01BD]|[\u01C6-\u01C6]|[\u01C9-\u01C9]|[\u01CC-\u01CC]|[\u01CE-\u01CE]|[\u01D0-\u01D0]|[\u01D2-\u01D2]|[\u01D4-\u01D4]|[\u01D6-\u01D6]|[\u01D8-\u01D8]|[\u01DA-\u01DA]|[\u01DC-\u01DD]|[\u01DF-\u01DF]|[\u01E1-\u01E1]|[\u01E3-\u01E3]|[\u01E5-\u01E5]|[\u01E7-\u01E7]|[\u01E9-\u01E9]|[\u01EB-\u01EB]|[\u01ED-\u01ED]|[\u01EF-\u01F0]|[\u01F3-\u01F3]|[\u01F5-\u01F5]|[\u01FB-\u01FB]|[\u01FD-\u01FD]|[\u01FF-\u01FF]|[\u0201-\u0201]|[\u0203-\u0203]|[\u0205-\u0205]|[\u0207-\u0207]|[\u0209-\u0209]|[\u020B-\u020B]|[\u020D-\u020D]|[\u020F-\u020F]|[\u0211-\u0211]|[\u0213-\u0213]|[\u0215-\u0215]|[\u0217-\u0217]|[\u0250-\u02A8]|[\u0390-\u0390]|[\u03AC-\u03CE]|[\u03D0-\u03D1]|[\u03D5-\u03D6]|[\u03E3-\u03E3]|[\u03E5-\u03E5]|[\u03E7-\u03E7]|[\u03E9-\u03E9]|[\u03EB-\u03EB]|[\u03ED-\u03ED]|[\u03EF-\u03F2]|[\u0430-\u044F]|[\u0451-\u045C]|[\u045E-\u045F]|[\u0461-\u0461]|[\u0463-\u0463]|[\u0465-\u0465]|[\u0467-\u0467]|[\u0469-\u0469]|[\u046B-\u046B]|[\u046D-\u046D]|[\u046F-\u046F]|[\u0471-\u0471]|[\u0473-\u0473]|[\u0475-\u0475]|[\u0477-\u0477]|[\u0479-\u0479]|[\u047B-\u047B]|[\u047D-\u047D]|[\u047F-\u047F]|[\u0481-\u0481]|[\u0491-\u0491]|[\u0493-\u0493]|[\u0495-\u0495]|[\u0497-\u0497]|[\u0499-\u0499]|[\u049B-\u049B]|[\u049D-\u049D]|[\u049F-\u049F]|[\u04A1-\u04A1]|[\u04A3-\u04A3]|[\u04A5-\u04A5]|[\u04A7-\u04A7]|[\u04A9-\u04A9]|[\u04AB-\u04AB]|[\u04AD-\u04AD]|[\u04AF-\u04AF]|[\u04B1-\u04B1]|[\u04B3-\u04B3]|[\u04B5-\u04B5]|[\u04B7-\u04B7]|[\u04B9-\u04B9]|[\u04BB-\u04BB]|[\u04BD-\u04BD]|[\u04BF-\u04BF]|[\u04C2-\u04C2]|[\u04C4-\u04C4]|[\u04C8-\u04C8]|[\u04CC-\u04CC]|[\u04D1-\u04D1]|[\u04D3-\u04D3]|[\u04D5-\u04D5]|[\u04D7-\u04D7]|[\u04D9-\u04D9]|[\u04DB-\u04DB]|[\u04DD-\u04DD]|[\u04DF-\u04DF]|[\u04E1-\u04E1]|[\u04E3-\u04E3]|[\u04E5-\u04E5]|[\u04E7-\u04E7]|[\u04E9-\u04E9]|[\u04EB-\u04EB]|[\u04EF-\u04EF]|[\u04F1-\u04F1]|[\u04F3-\u04F3]|[\u04F5-\u04F5]|[\u04F9-\u04F9]|[\u0561-\u0587]|[\u10D0-\u10F6]|[\u1E01-\u1E01]|[\u1E03-\u1E03]|[\u1E05-\u1E05]|[\u1E07-\u1E07]|[\u1E09-\u1E09]|[\u1E0B-\u1E0B]|[\u1E0D-\u1E0D]|[\u1E0F-\u1E0F]|[\u1E11-\u1E11]|[\u1E13-\u1E13]|[\u1E15-\u1E15]|[\u1E17-\u1E17]|[\u1E19-\u1E19]|[\u1E1B-\u1E1B]|[\u1E1D-\u1E1D]|[\u1E1F-\u1E1F]|[\u1E21-\u1E21]|[\u1E23-\u1E23]|[\u1E25-\u1E25]|[\u1E27-\u1E27]|[\u1E29-\u1E29]|[\u1E2B-\u1E2B]|[\u1E2D-\u1E2D]|[\u1E2F-\u1E2F]|[\u1E31-\u1E31]|[\u1E33-\u1E33]|[\u1E35-\u1E35]|[\u1E37-\u1E37]|[\u1E39-\u1E39]|[\u1E3B-\u1E3B]|[\u1E3D-\u1E3D]|[\u1E3F-\u1E3F]|[\u1E41-\u1E41]|[\u1E43-\u1E43]|[\u1E45-\u1E45]|[\u1E47-\u1E47]|[\u1E49-\u1E49]|[\u1E4B-\u1E4B]|[\u1E4D-\u1E4D]|[\u1E4F-\u1E4F]|[\u1E51-\u1E51]|[\u1E53-\u1E53]|[\u1E55-\u1E55]|[\u1E57-\u1E57]|[\u1E59-\u1E59]|[\u1E5B-\u1E5B]|[\u1E5D-\u1E5D]|[\u1E5F-\u1E5F]|[\u1E61-\u1E61]|[\u1E63-\u1E63]|[\u1E65-\u1E65]|[\u1E67-\u1E67]|[\u1E69-\u1E69]|[\u1E6B-\u1E6B]|[\u1E6D-\u1E6D]|[\u1E6F-\u1E6F]|[\u1E71-\u1E71]|[\u1E73-\u1E73]|[\u1E75-\u1E75]|[\u1E77-\u1E77]|[\u1E79-\u1E79]|[\u1E7B-\u1E7B]|[\u1E7D-\u1E7D]|[\u1E7F-\u1E7F]|[\u1E81-\u1E81]|[\u1E83-\u1E83]|[\u1E85-\u1E85]|[\u1E87-\u1E87]|[\u1E89-\u1E89]|[\u1E8B-\u1E8B]|[\u1E8D-\u1E8D]|[\u1E8F-\u1E8F]|[\u1E91-\u1E91]|[\u1E93-\u1E93]|[\u1E95-\u1E9B]|[\u1EA1-\u1EA1]|[\u1EA3-\u1EA3]|[\u1EA5-\u1EA5]|[\u1EA7-\u1EA7]|[\u1EA9-\u1EA9]|[\u1EAB-\u1EAB]|[\u1EAD-\u1EAD]|[\u1EAF-\u1EAF]|[\u1EB1-\u1EB1]|[\u1EB3-\u1EB3]|[\u1EB5-\u1EB5]|[\u1EB7-\u1EB7]|[\u1EB9-\u1EB9]|[\u1EBB-\u1EBB]|[\u1EBD-\u1EBD]|[\u1EBF-\u1EBF]|[\u1EC1-\u1EC1]|[\u1EC3-\u1EC3]|[\u1EC5-\u1EC5]|[\u1EC7-\u1EC7]|[\u1EC9-\u1EC9]|[\u1ECB-\u1ECB]|[\u1ECD-\u1ECD]|[\u1ECF-\u1ECF]|[\u1ED1-\u1ED1]|[\u1ED3-\u1ED3]|[\u1ED5-\u1ED5]|[\u1ED7-\u1ED7]|[\u1ED9-\u1ED9]|[\u1EDB-\u1EDB]|[\u1EDD-\u1EDD]|[\u1EDF-\u1EDF]|[\u1EE1-\u1EE1]|[\u1EE3-\u1EE3]|[\u1EE5-\u1EE5]|[\u1EE7-\u1EE7]|[\u1EE9-\u1EE9]|[\u1EEB-\u1EEB]|[\u1EED-\u1EED]|[\u1EEF-\u1EEF]|[\u1EF1-\u1EF1]|[\u1EF3-\u1EF3]|[\u1EF5-\u1EF5]|[\u1EF7-\u1EF7]|[\u1EF9-\u1EF9]|[\u1F00-\u1F07]|[\u1F10-\u1F15]|[\u1F20-\u1F27]|[\u1F30-\u1F37]|[\u1F40-\u1F45]|[\u1F50-\u1F57]|[\u1F60-\u1F67]|[\u1F70-\u1F7D]|[\u1F80-\u1F87]|[\u1F90-\u1F97]|[\u1FA0-\u1FA7]|[\u1FB0-\u1FB4]|[\u1FB6-\u1FB7]|[\u1FBE-\u1FBE]|[\u1FC2-\u1FC4]|[\u1FC6-\u1FC7]|[\u1FD0-\u1FD3]|[\u1FD6-\u1FD7]|[\u1FE0-\u1FE7]|[\u1FF2-\u1FF4]|[\u1FF6-\u1FF7]|[\u207F-\u207F]|[\u210A-\u210A]|[\u210E-\u210F]|[\u2113-\u2113]|[\u2118-\u2118]|[\u212E-\u212F]|[\u2134-\u2134]|[\uFB00-\uFB06]|[\uFB13-\uFB17]|[\uFF41-\uFF5A]/,
  Lt: /[\u01C5-\u01C5]|[\u01C8-\u01C8]|[\u01CB-\u01CB]|[\u01F2-\u01F2]/,
  Lm: /[\u02B0-\u02B8]|[\u02BB-\u02C1]|[\u02D0-\u02D1]|[\u02E0-\u02E4]|[\u037A-\u037A]|[\u0559-\u0559]|[\u0640-\u0640]|[\u06E5-\u06E6]|[\u0E46-\u0E46]|[\u0EC6-\u0EC6]|[\u3005-\u3005]|[\u3031-\u3035]|[\u309D-\u309E]|[\u30FC-\u30FE]|[\uFF70-\uFF70]|[\uFF9E-\uFF9F]/,
  Lo: /[\u01AA-\u01AA]|[\u01BB-\u01BB]|[\u01BE-\u01C3]|[\u03F3-\u03F3]|[\u04C0-\u04C0]|[\u05D0-\u05EA]|[\u05F0-\u05F2]|[\u0621-\u063A]|[\u0641-\u064A]|[\u0671-\u06B7]|[\u06BA-\u06BE]|[\u06C0-\u06CE]|[\u06D0-\u06D3]|[\u06D5-\u06D5]|[\u0905-\u0939]|[\u093D-\u093D]|[\u0950-\u0950]|[\u0958-\u0961]|[\u0985-\u098C]|[\u098F-\u0990]|[\u0993-\u09A8]|[\u09AA-\u09B0]|[\u09B2-\u09B2]|[\u09B6-\u09B9]|[\u09DC-\u09DD]|[\u09DF-\u09E1]|[\u09F0-\u09F1]|[\u0A05-\u0A0A]|[\u0A0F-\u0A10]|[\u0A13-\u0A28]|[\u0A2A-\u0A30]|[\u0A32-\u0A33]|[\u0A35-\u0A36]|[\u0A38-\u0A39]|[\u0A59-\u0A5C]|[\u0A5E-\u0A5E]|[\u0A72-\u0A74]|[\u0A85-\u0A8B]|[\u0A8D-\u0A8D]|[\u0A8F-\u0A91]|[\u0A93-\u0AA8]|[\u0AAA-\u0AB0]|[\u0AB2-\u0AB3]|[\u0AB5-\u0AB9]|[\u0ABD-\u0ABD]|[\u0AD0-\u0AD0]|[\u0AE0-\u0AE0]|[\u0B05-\u0B0C]|[\u0B0F-\u0B10]|[\u0B13-\u0B28]|[\u0B2A-\u0B30]|[\u0B32-\u0B33]|[\u0B36-\u0B39]|[\u0B3D-\u0B3D]|[\u0B5C-\u0B5D]|[\u0B5F-\u0B61]|[\u0B85-\u0B8A]|[\u0B8E-\u0B90]|[\u0B92-\u0B95]|[\u0B99-\u0B9A]|[\u0B9C-\u0B9C]|[\u0B9E-\u0B9F]|[\u0BA3-\u0BA4]|[\u0BA8-\u0BAA]|[\u0BAE-\u0BB5]|[\u0BB7-\u0BB9]|[\u0C05-\u0C0C]|[\u0C0E-\u0C10]|[\u0C12-\u0C28]|[\u0C2A-\u0C33]|[\u0C35-\u0C39]|[\u0C60-\u0C61]|[\u0C85-\u0C8C]|[\u0C8E-\u0C90]|[\u0C92-\u0CA8]|[\u0CAA-\u0CB3]|[\u0CB5-\u0CB9]|[\u0CDE-\u0CDE]|[\u0CE0-\u0CE1]|[\u0D05-\u0D0C]|[\u0D0E-\u0D10]|[\u0D12-\u0D28]|[\u0D2A-\u0D39]|[\u0D60-\u0D61]|[\u0E01-\u0E30]|[\u0E32-\u0E33]|[\u0E40-\u0E45]|[\u0E81-\u0E82]|[\u0E84-\u0E84]|[\u0E87-\u0E88]|[\u0E8A-\u0E8A]|[\u0E8D-\u0E8D]|[\u0E94-\u0E97]|[\u0E99-\u0E9F]|[\u0EA1-\u0EA3]|[\u0EA5-\u0EA5]|[\u0EA7-\u0EA7]|[\u0EAA-\u0EAB]|[\u0EAD-\u0EB0]|[\u0EB2-\u0EB3]|[\u0EBD-\u0EBD]|[\u0EC0-\u0EC4]|[\u0EDC-\u0EDD]|[\u0F00-\u0F00]|[\u0F40-\u0F47]|[\u0F49-\u0F69]|[\u0F88-\u0F8B]|[\u1100-\u1159]|[\u115F-\u11A2]|[\u11A8-\u11F9]|[\u2135-\u2138]|[\u3006-\u3006]|[\u3041-\u3094]|[\u30A1-\u30FA]|[\u3105-\u312C]|[\u3131-\u318E]|[\u4E00-\u9FA5]|[\uAC00-\uD7A3]|[\uF900-\uFA2D]|[\uFB1F-\uFB28]|[\uFB2A-\uFB36]|[\uFB38-\uFB3C]|[\uFB3E-\uFB3E]|[\uFB40-\uFB41]|[\uFB43-\uFB44]|[\uFB46-\uFBB1]|[\uFBD3-\uFD3D]|[\uFD50-\uFD8F]|[\uFD92-\uFDC7]|[\uFDF0-\uFDFB]|[\uFE70-\uFE72]|[\uFE74-\uFE74]|[\uFE76-\uFEFC]|[\uFF66-\uFF6F]|[\uFF71-\uFF9D]|[\uFFA0-\uFFBE]|[\uFFC2-\uFFC7]|[\uFFCA-\uFFCF]|[\uFFD2-\uFFD7]|[\uFFDA-\uFFDC]/,

  // Numbers
  Nl: /[\u2160-\u2182]|[\u3007-\u3007]|[\u3021-\u3029]/,
  Nd: /[\u0030-\u0039]|[\u0660-\u0669]|[\u06F0-\u06F9]|[\u0966-\u096F]|[\u09E6-\u09EF]|[\u0A66-\u0A6F]|[\u0AE6-\u0AEF]|[\u0B66-\u0B6F]|[\u0BE7-\u0BEF]|[\u0C66-\u0C6F]|[\u0CE6-\u0CEF]|[\u0D66-\u0D6F]|[\u0E50-\u0E59]|[\u0ED0-\u0ED9]|[\u0F20-\u0F29]|[\uFF10-\uFF19]/,

  // Marks
  Mn: /[\u0300-\u0345]|[\u0360-\u0361]|[\u0483-\u0486]|[\u0591-\u05A1]|[\u05A3-\u05B9]|[\u05BB-\u05BD]|[\u05BF-\u05BF]|[\u05C1-\u05C2]|[\u05C4-\u05C4]|[\u064B-\u0652]|[\u0670-\u0670]|[\u06D6-\u06DC]|[\u06DF-\u06E4]|[\u06E7-\u06E8]|[\u06EA-\u06ED]|[\u0901-\u0902]|[\u093C-\u093C]|[\u0941-\u0948]|[\u094D-\u094D]|[\u0951-\u0954]|[\u0962-\u0963]|[\u0981-\u0981]|[\u09BC-\u09BC]|[\u09C1-\u09C4]|[\u09CD-\u09CD]|[\u09E2-\u09E3]|[\u0A02-\u0A02]|[\u0A3C-\u0A3C]|[\u0A41-\u0A42]|[\u0A47-\u0A48]|[\u0A4B-\u0A4D]|[\u0A70-\u0A71]|[\u0A81-\u0A82]|[\u0ABC-\u0ABC]|[\u0AC1-\u0AC5]|[\u0AC7-\u0AC8]|[\u0ACD-\u0ACD]|[\u0B01-\u0B01]|[\u0B3C-\u0B3C]|[\u0B3F-\u0B3F]|[\u0B41-\u0B43]|[\u0B4D-\u0B4D]|[\u0B56-\u0B56]|[\u0B82-\u0B82]|[\u0BC0-\u0BC0]|[\u0BCD-\u0BCD]|[\u0C3E-\u0C40]|[\u0C46-\u0C48]|[\u0C4A-\u0C4D]|[\u0C55-\u0C56]|[\u0CBF-\u0CBF]|[\u0CC6-\u0CC6]|[\u0CCC-\u0CCD]|[\u0D41-\u0D43]|[\u0D4D-\u0D4D]|[\u0E31-\u0E31]|[\u0E34-\u0E3A]|[\u0E47-\u0E4E]|[\u0EB1-\u0EB1]|[\u0EB4-\u0EB9]|[\u0EBB-\u0EBC]|[\u0EC8-\u0ECD]|[\u0F18-\u0F19]|[\u0F35-\u0F35]|[\u0F37-\u0F37]|[\u0F39-\u0F39]|[\u0F71-\u0F7E]|[\u0F80-\u0F84]|[\u0F86-\u0F87]|[\u0F90-\u0F95]|[\u0F97-\u0F97]|[\u0F99-\u0FAD]|[\u0FB1-\u0FB7]|[\u0FB9-\u0FB9]|[\u20D0-\u20DC]|[\u20E1-\u20E1]|[\u302A-\u302F]|[\u3099-\u309A]|[\uFB1E-\uFB1E]|[\uFE20-\uFE23]/,
  Mc: /[\u0903-\u0903]|[\u093E-\u0940]|[\u0949-\u094C]|[\u0982-\u0983]|[\u09BE-\u09C0]|[\u09C7-\u09C8]|[\u09CB-\u09CC]|[\u09D7-\u09D7]|[\u0A3E-\u0A40]|[\u0A83-\u0A83]|[\u0ABE-\u0AC0]|[\u0AC9-\u0AC9]|[\u0ACB-\u0ACC]|[\u0B02-\u0B03]|[\u0B3E-\u0B3E]|[\u0B40-\u0B40]|[\u0B47-\u0B48]|[\u0B4B-\u0B4C]|[\u0B57-\u0B57]|[\u0B83-\u0B83]|[\u0BBE-\u0BBF]|[\u0BC1-\u0BC2]|[\u0BC6-\u0BC8]|[\u0BCA-\u0BCC]|[\u0BD7-\u0BD7]|[\u0C01-\u0C03]|[\u0C41-\u0C44]|[\u0C82-\u0C83]|[\u0CBE-\u0CBE]|[\u0CC0-\u0CC4]|[\u0CC7-\u0CC8]|[\u0CCA-\u0CCB]|[\u0CD5-\u0CD6]|[\u0D02-\u0D03]|[\u0D3E-\u0D40]|[\u0D46-\u0D48]|[\u0D4A-\u0D4C]|[\u0D57-\u0D57]|[\u0F3E-\u0F3F]|[\u0F7F-\u0F7F]/,

  // Punctuation, Connector
  Pc: /[\u005F-\u005F]|[\u203F-\u2040]|[\u30FB-\u30FB]|[\uFE33-\uFE34]|[\uFE4D-\uFE4F]|[\uFF3F-\uFF3F]|[\uFF65-\uFF65]/,

  // Separator, Space
  Zs: /[\u2000-\u200B]|[\u3000-\u3000]/,

  // These two are not real Unicode categories, but our useful for Ohm.
  // L is a combination of all the letter categories.
  // Ltmo is a combination of Lt, Lm, and Lo.
  L: /[\u0041-\u005A]|[\u00C0-\u00D6]|[\u00D8-\u00DE]|[\u0100-\u0100]|[\u0102-\u0102]|[\u0104-\u0104]|[\u0106-\u0106]|[\u0108-\u0108]|[\u010A-\u010A]|[\u010C-\u010C]|[\u010E-\u010E]|[\u0110-\u0110]|[\u0112-\u0112]|[\u0114-\u0114]|[\u0116-\u0116]|[\u0118-\u0118]|[\u011A-\u011A]|[\u011C-\u011C]|[\u011E-\u011E]|[\u0120-\u0120]|[\u0122-\u0122]|[\u0124-\u0124]|[\u0126-\u0126]|[\u0128-\u0128]|[\u012A-\u012A]|[\u012C-\u012C]|[\u012E-\u012E]|[\u0130-\u0130]|[\u0132-\u0132]|[\u0134-\u0134]|[\u0136-\u0136]|[\u0139-\u0139]|[\u013B-\u013B]|[\u013D-\u013D]|[\u013F-\u013F]|[\u0141-\u0141]|[\u0143-\u0143]|[\u0145-\u0145]|[\u0147-\u0147]|[\u014A-\u014A]|[\u014C-\u014C]|[\u014E-\u014E]|[\u0150-\u0150]|[\u0152-\u0152]|[\u0154-\u0154]|[\u0156-\u0156]|[\u0158-\u0158]|[\u015A-\u015A]|[\u015C-\u015C]|[\u015E-\u015E]|[\u0160-\u0160]|[\u0162-\u0162]|[\u0164-\u0164]|[\u0166-\u0166]|[\u0168-\u0168]|[\u016A-\u016A]|[\u016C-\u016C]|[\u016E-\u016E]|[\u0170-\u0170]|[\u0172-\u0172]|[\u0174-\u0174]|[\u0176-\u0176]|[\u0178-\u0179]|[\u017B-\u017B]|[\u017D-\u017D]|[\u0181-\u0182]|[\u0184-\u0184]|[\u0186-\u0187]|[\u0189-\u018B]|[\u018E-\u0191]|[\u0193-\u0194]|[\u0196-\u0198]|[\u019C-\u019D]|[\u019F-\u01A0]|[\u01A2-\u01A2]|[\u01A4-\u01A4]|[\u01A6-\u01A7]|[\u01A9-\u01A9]|[\u01AC-\u01AC]|[\u01AE-\u01AF]|[\u01B1-\u01B3]|[\u01B5-\u01B5]|[\u01B7-\u01B8]|[\u01BC-\u01BC]|[\u01C4-\u01C4]|[\u01C7-\u01C7]|[\u01CA-\u01CA]|[\u01CD-\u01CD]|[\u01CF-\u01CF]|[\u01D1-\u01D1]|[\u01D3-\u01D3]|[\u01D5-\u01D5]|[\u01D7-\u01D7]|[\u01D9-\u01D9]|[\u01DB-\u01DB]|[\u01DE-\u01DE]|[\u01E0-\u01E0]|[\u01E2-\u01E2]|[\u01E4-\u01E4]|[\u01E6-\u01E6]|[\u01E8-\u01E8]|[\u01EA-\u01EA]|[\u01EC-\u01EC]|[\u01EE-\u01EE]|[\u01F1-\u01F1]|[\u01F4-\u01F4]|[\u01FA-\u01FA]|[\u01FC-\u01FC]|[\u01FE-\u01FE]|[\u0200-\u0200]|[\u0202-\u0202]|[\u0204-\u0204]|[\u0206-\u0206]|[\u0208-\u0208]|[\u020A-\u020A]|[\u020C-\u020C]|[\u020E-\u020E]|[\u0210-\u0210]|[\u0212-\u0212]|[\u0214-\u0214]|[\u0216-\u0216]|[\u0386-\u0386]|[\u0388-\u038A]|[\u038C-\u038C]|[\u038E-\u038F]|[\u0391-\u03A1]|[\u03A3-\u03AB]|[\u03D2-\u03D4]|[\u03DA-\u03DA]|[\u03DC-\u03DC]|[\u03DE-\u03DE]|[\u03E0-\u03E0]|[\u03E2-\u03E2]|[\u03E4-\u03E4]|[\u03E6-\u03E6]|[\u03E8-\u03E8]|[\u03EA-\u03EA]|[\u03EC-\u03EC]|[\u03EE-\u03EE]|[\u0401-\u040C]|[\u040E-\u042F]|[\u0460-\u0460]|[\u0462-\u0462]|[\u0464-\u0464]|[\u0466-\u0466]|[\u0468-\u0468]|[\u046A-\u046A]|[\u046C-\u046C]|[\u046E-\u046E]|[\u0470-\u0470]|[\u0472-\u0472]|[\u0474-\u0474]|[\u0476-\u0476]|[\u0478-\u0478]|[\u047A-\u047A]|[\u047C-\u047C]|[\u047E-\u047E]|[\u0480-\u0480]|[\u0490-\u0490]|[\u0492-\u0492]|[\u0494-\u0494]|[\u0496-\u0496]|[\u0498-\u0498]|[\u049A-\u049A]|[\u049C-\u049C]|[\u049E-\u049E]|[\u04A0-\u04A0]|[\u04A2-\u04A2]|[\u04A4-\u04A4]|[\u04A6-\u04A6]|[\u04A8-\u04A8]|[\u04AA-\u04AA]|[\u04AC-\u04AC]|[\u04AE-\u04AE]|[\u04B0-\u04B0]|[\u04B2-\u04B2]|[\u04B4-\u04B4]|[\u04B6-\u04B6]|[\u04B8-\u04B8]|[\u04BA-\u04BA]|[\u04BC-\u04BC]|[\u04BE-\u04BE]|[\u04C1-\u04C1]|[\u04C3-\u04C3]|[\u04C7-\u04C7]|[\u04CB-\u04CB]|[\u04D0-\u04D0]|[\u04D2-\u04D2]|[\u04D4-\u04D4]|[\u04D6-\u04D6]|[\u04D8-\u04D8]|[\u04DA-\u04DA]|[\u04DC-\u04DC]|[\u04DE-\u04DE]|[\u04E0-\u04E0]|[\u04E2-\u04E2]|[\u04E4-\u04E4]|[\u04E6-\u04E6]|[\u04E8-\u04E8]|[\u04EA-\u04EA]|[\u04EE-\u04EE]|[\u04F0-\u04F0]|[\u04F2-\u04F2]|[\u04F4-\u04F4]|[\u04F8-\u04F8]|[\u0531-\u0556]|[\u10A0-\u10C5]|[\u1E00-\u1E00]|[\u1E02-\u1E02]|[\u1E04-\u1E04]|[\u1E06-\u1E06]|[\u1E08-\u1E08]|[\u1E0A-\u1E0A]|[\u1E0C-\u1E0C]|[\u1E0E-\u1E0E]|[\u1E10-\u1E10]|[\u1E12-\u1E12]|[\u1E14-\u1E14]|[\u1E16-\u1E16]|[\u1E18-\u1E18]|[\u1E1A-\u1E1A]|[\u1E1C-\u1E1C]|[\u1E1E-\u1E1E]|[\u1E20-\u1E20]|[\u1E22-\u1E22]|[\u1E24-\u1E24]|[\u1E26-\u1E26]|[\u1E28-\u1E28]|[\u1E2A-\u1E2A]|[\u1E2C-\u1E2C]|[\u1E2E-\u1E2E]|[\u1E30-\u1E30]|[\u1E32-\u1E32]|[\u1E34-\u1E34]|[\u1E36-\u1E36]|[\u1E38-\u1E38]|[\u1E3A-\u1E3A]|[\u1E3C-\u1E3C]|[\u1E3E-\u1E3E]|[\u1E40-\u1E40]|[\u1E42-\u1E42]|[\u1E44-\u1E44]|[\u1E46-\u1E46]|[\u1E48-\u1E48]|[\u1E4A-\u1E4A]|[\u1E4C-\u1E4C]|[\u1E4E-\u1E4E]|[\u1E50-\u1E50]|[\u1E52-\u1E52]|[\u1E54-\u1E54]|[\u1E56-\u1E56]|[\u1E58-\u1E58]|[\u1E5A-\u1E5A]|[\u1E5C-\u1E5C]|[\u1E5E-\u1E5E]|[\u1E60-\u1E60]|[\u1E62-\u1E62]|[\u1E64-\u1E64]|[\u1E66-\u1E66]|[\u1E68-\u1E68]|[\u1E6A-\u1E6A]|[\u1E6C-\u1E6C]|[\u1E6E-\u1E6E]|[\u1E70-\u1E70]|[\u1E72-\u1E72]|[\u1E74-\u1E74]|[\u1E76-\u1E76]|[\u1E78-\u1E78]|[\u1E7A-\u1E7A]|[\u1E7C-\u1E7C]|[\u1E7E-\u1E7E]|[\u1E80-\u1E80]|[\u1E82-\u1E82]|[\u1E84-\u1E84]|[\u1E86-\u1E86]|[\u1E88-\u1E88]|[\u1E8A-\u1E8A]|[\u1E8C-\u1E8C]|[\u1E8E-\u1E8E]|[\u1E90-\u1E90]|[\u1E92-\u1E92]|[\u1E94-\u1E94]|[\u1EA0-\u1EA0]|[\u1EA2-\u1EA2]|[\u1EA4-\u1EA4]|[\u1EA6-\u1EA6]|[\u1EA8-\u1EA8]|[\u1EAA-\u1EAA]|[\u1EAC-\u1EAC]|[\u1EAE-\u1EAE]|[\u1EB0-\u1EB0]|[\u1EB2-\u1EB2]|[\u1EB4-\u1EB4]|[\u1EB6-\u1EB6]|[\u1EB8-\u1EB8]|[\u1EBA-\u1EBA]|[\u1EBC-\u1EBC]|[\u1EBE-\u1EBE]|[\u1EC0-\u1EC0]|[\u1EC2-\u1EC2]|[\u1EC4-\u1EC4]|[\u1EC6-\u1EC6]|[\u1EC8-\u1EC8]|[\u1ECA-\u1ECA]|[\u1ECC-\u1ECC]|[\u1ECE-\u1ECE]|[\u1ED0-\u1ED0]|[\u1ED2-\u1ED2]|[\u1ED4-\u1ED4]|[\u1ED6-\u1ED6]|[\u1ED8-\u1ED8]|[\u1EDA-\u1EDA]|[\u1EDC-\u1EDC]|[\u1EDE-\u1EDE]|[\u1EE0-\u1EE0]|[\u1EE2-\u1EE2]|[\u1EE4-\u1EE4]|[\u1EE6-\u1EE6]|[\u1EE8-\u1EE8]|[\u1EEA-\u1EEA]|[\u1EEC-\u1EEC]|[\u1EEE-\u1EEE]|[\u1EF0-\u1EF0]|[\u1EF2-\u1EF2]|[\u1EF4-\u1EF4]|[\u1EF6-\u1EF6]|[\u1EF8-\u1EF8]|[\u1F08-\u1F0F]|[\u1F18-\u1F1D]|[\u1F28-\u1F2F]|[\u1F38-\u1F3F]|[\u1F48-\u1F4D]|[\u1F59-\u1F59]|[\u1F5B-\u1F5B]|[\u1F5D-\u1F5D]|[\u1F5F-\u1F5F]|[\u1F68-\u1F6F]|[\u1F88-\u1F8F]|[\u1F98-\u1F9F]|[\u1FA8-\u1FAF]|[\u1FB8-\u1FBC]|[\u1FC8-\u1FCC]|[\u1FD8-\u1FDB]|[\u1FE8-\u1FEC]|[\u1FF8-\u1FFC]|[\u2102-\u2102]|[\u2107-\u2107]|[\u210B-\u210D]|[\u2110-\u2112]|[\u2115-\u2115]|[\u2119-\u211D]|[\u2124-\u2124]|[\u2126-\u2126]|[\u2128-\u2128]|[\u212A-\u212D]|[\u2130-\u2131]|[\u2133-\u2133]|[\uFF21-\uFF3A]|[\u0061-\u007A]|[\u00AA-\u00AA]|[\u00B5-\u00B5]|[\u00BA-\u00BA]|[\u00DF-\u00F6]|[\u00F8-\u00FF]|[\u0101-\u0101]|[\u0103-\u0103]|[\u0105-\u0105]|[\u0107-\u0107]|[\u0109-\u0109]|[\u010B-\u010B]|[\u010D-\u010D]|[\u010F-\u010F]|[\u0111-\u0111]|[\u0113-\u0113]|[\u0115-\u0115]|[\u0117-\u0117]|[\u0119-\u0119]|[\u011B-\u011B]|[\u011D-\u011D]|[\u011F-\u011F]|[\u0121-\u0121]|[\u0123-\u0123]|[\u0125-\u0125]|[\u0127-\u0127]|[\u0129-\u0129]|[\u012B-\u012B]|[\u012D-\u012D]|[\u012F-\u012F]|[\u0131-\u0131]|[\u0133-\u0133]|[\u0135-\u0135]|[\u0137-\u0138]|[\u013A-\u013A]|[\u013C-\u013C]|[\u013E-\u013E]|[\u0140-\u0140]|[\u0142-\u0142]|[\u0144-\u0144]|[\u0146-\u0146]|[\u0148-\u0149]|[\u014B-\u014B]|[\u014D-\u014D]|[\u014F-\u014F]|[\u0151-\u0151]|[\u0153-\u0153]|[\u0155-\u0155]|[\u0157-\u0157]|[\u0159-\u0159]|[\u015B-\u015B]|[\u015D-\u015D]|[\u015F-\u015F]|[\u0161-\u0161]|[\u0163-\u0163]|[\u0165-\u0165]|[\u0167-\u0167]|[\u0169-\u0169]|[\u016B-\u016B]|[\u016D-\u016D]|[\u016F-\u016F]|[\u0171-\u0171]|[\u0173-\u0173]|[\u0175-\u0175]|[\u0177-\u0177]|[\u017A-\u017A]|[\u017C-\u017C]|[\u017E-\u0180]|[\u0183-\u0183]|[\u0185-\u0185]|[\u0188-\u0188]|[\u018C-\u018D]|[\u0192-\u0192]|[\u0195-\u0195]|[\u0199-\u019B]|[\u019E-\u019E]|[\u01A1-\u01A1]|[\u01A3-\u01A3]|[\u01A5-\u01A5]|[\u01A8-\u01A8]|[\u01AB-\u01AB]|[\u01AD-\u01AD]|[\u01B0-\u01B0]|[\u01B4-\u01B4]|[\u01B6-\u01B6]|[\u01B9-\u01BA]|[\u01BD-\u01BD]|[\u01C6-\u01C6]|[\u01C9-\u01C9]|[\u01CC-\u01CC]|[\u01CE-\u01CE]|[\u01D0-\u01D0]|[\u01D2-\u01D2]|[\u01D4-\u01D4]|[\u01D6-\u01D6]|[\u01D8-\u01D8]|[\u01DA-\u01DA]|[\u01DC-\u01DD]|[\u01DF-\u01DF]|[\u01E1-\u01E1]|[\u01E3-\u01E3]|[\u01E5-\u01E5]|[\u01E7-\u01E7]|[\u01E9-\u01E9]|[\u01EB-\u01EB]|[\u01ED-\u01ED]|[\u01EF-\u01F0]|[\u01F3-\u01F3]|[\u01F5-\u01F5]|[\u01FB-\u01FB]|[\u01FD-\u01FD]|[\u01FF-\u01FF]|[\u0201-\u0201]|[\u0203-\u0203]|[\u0205-\u0205]|[\u0207-\u0207]|[\u0209-\u0209]|[\u020B-\u020B]|[\u020D-\u020D]|[\u020F-\u020F]|[\u0211-\u0211]|[\u0213-\u0213]|[\u0215-\u0215]|[\u0217-\u0217]|[\u0250-\u02A8]|[\u0390-\u0390]|[\u03AC-\u03CE]|[\u03D0-\u03D1]|[\u03D5-\u03D6]|[\u03E3-\u03E3]|[\u03E5-\u03E5]|[\u03E7-\u03E7]|[\u03E9-\u03E9]|[\u03EB-\u03EB]|[\u03ED-\u03ED]|[\u03EF-\u03F2]|[\u0430-\u044F]|[\u0451-\u045C]|[\u045E-\u045F]|[\u0461-\u0461]|[\u0463-\u0463]|[\u0465-\u0465]|[\u0467-\u0467]|[\u0469-\u0469]|[\u046B-\u046B]|[\u046D-\u046D]|[\u046F-\u046F]|[\u0471-\u0471]|[\u0473-\u0473]|[\u0475-\u0475]|[\u0477-\u0477]|[\u0479-\u0479]|[\u047B-\u047B]|[\u047D-\u047D]|[\u047F-\u047F]|[\u0481-\u0481]|[\u0491-\u0491]|[\u0493-\u0493]|[\u0495-\u0495]|[\u0497-\u0497]|[\u0499-\u0499]|[\u049B-\u049B]|[\u049D-\u049D]|[\u049F-\u049F]|[\u04A1-\u04A1]|[\u04A3-\u04A3]|[\u04A5-\u04A5]|[\u04A7-\u04A7]|[\u04A9-\u04A9]|[\u04AB-\u04AB]|[\u04AD-\u04AD]|[\u04AF-\u04AF]|[\u04B1-\u04B1]|[\u04B3-\u04B3]|[\u04B5-\u04B5]|[\u04B7-\u04B7]|[\u04B9-\u04B9]|[\u04BB-\u04BB]|[\u04BD-\u04BD]|[\u04BF-\u04BF]|[\u04C2-\u04C2]|[\u04C4-\u04C4]|[\u04C8-\u04C8]|[\u04CC-\u04CC]|[\u04D1-\u04D1]|[\u04D3-\u04D3]|[\u04D5-\u04D5]|[\u04D7-\u04D7]|[\u04D9-\u04D9]|[\u04DB-\u04DB]|[\u04DD-\u04DD]|[\u04DF-\u04DF]|[\u04E1-\u04E1]|[\u04E3-\u04E3]|[\u04E5-\u04E5]|[\u04E7-\u04E7]|[\u04E9-\u04E9]|[\u04EB-\u04EB]|[\u04EF-\u04EF]|[\u04F1-\u04F1]|[\u04F3-\u04F3]|[\u04F5-\u04F5]|[\u04F9-\u04F9]|[\u0561-\u0587]|[\u10D0-\u10F6]|[\u1E01-\u1E01]|[\u1E03-\u1E03]|[\u1E05-\u1E05]|[\u1E07-\u1E07]|[\u1E09-\u1E09]|[\u1E0B-\u1E0B]|[\u1E0D-\u1E0D]|[\u1E0F-\u1E0F]|[\u1E11-\u1E11]|[\u1E13-\u1E13]|[\u1E15-\u1E15]|[\u1E17-\u1E17]|[\u1E19-\u1E19]|[\u1E1B-\u1E1B]|[\u1E1D-\u1E1D]|[\u1E1F-\u1E1F]|[\u1E21-\u1E21]|[\u1E23-\u1E23]|[\u1E25-\u1E25]|[\u1E27-\u1E27]|[\u1E29-\u1E29]|[\u1E2B-\u1E2B]|[\u1E2D-\u1E2D]|[\u1E2F-\u1E2F]|[\u1E31-\u1E31]|[\u1E33-\u1E33]|[\u1E35-\u1E35]|[\u1E37-\u1E37]|[\u1E39-\u1E39]|[\u1E3B-\u1E3B]|[\u1E3D-\u1E3D]|[\u1E3F-\u1E3F]|[\u1E41-\u1E41]|[\u1E43-\u1E43]|[\u1E45-\u1E45]|[\u1E47-\u1E47]|[\u1E49-\u1E49]|[\u1E4B-\u1E4B]|[\u1E4D-\u1E4D]|[\u1E4F-\u1E4F]|[\u1E51-\u1E51]|[\u1E53-\u1E53]|[\u1E55-\u1E55]|[\u1E57-\u1E57]|[\u1E59-\u1E59]|[\u1E5B-\u1E5B]|[\u1E5D-\u1E5D]|[\u1E5F-\u1E5F]|[\u1E61-\u1E61]|[\u1E63-\u1E63]|[\u1E65-\u1E65]|[\u1E67-\u1E67]|[\u1E69-\u1E69]|[\u1E6B-\u1E6B]|[\u1E6D-\u1E6D]|[\u1E6F-\u1E6F]|[\u1E71-\u1E71]|[\u1E73-\u1E73]|[\u1E75-\u1E75]|[\u1E77-\u1E77]|[\u1E79-\u1E79]|[\u1E7B-\u1E7B]|[\u1E7D-\u1E7D]|[\u1E7F-\u1E7F]|[\u1E81-\u1E81]|[\u1E83-\u1E83]|[\u1E85-\u1E85]|[\u1E87-\u1E87]|[\u1E89-\u1E89]|[\u1E8B-\u1E8B]|[\u1E8D-\u1E8D]|[\u1E8F-\u1E8F]|[\u1E91-\u1E91]|[\u1E93-\u1E93]|[\u1E95-\u1E9B]|[\u1EA1-\u1EA1]|[\u1EA3-\u1EA3]|[\u1EA5-\u1EA5]|[\u1EA7-\u1EA7]|[\u1EA9-\u1EA9]|[\u1EAB-\u1EAB]|[\u1EAD-\u1EAD]|[\u1EAF-\u1EAF]|[\u1EB1-\u1EB1]|[\u1EB3-\u1EB3]|[\u1EB5-\u1EB5]|[\u1EB7-\u1EB7]|[\u1EB9-\u1EB9]|[\u1EBB-\u1EBB]|[\u1EBD-\u1EBD]|[\u1EBF-\u1EBF]|[\u1EC1-\u1EC1]|[\u1EC3-\u1EC3]|[\u1EC5-\u1EC5]|[\u1EC7-\u1EC7]|[\u1EC9-\u1EC9]|[\u1ECB-\u1ECB]|[\u1ECD-\u1ECD]|[\u1ECF-\u1ECF]|[\u1ED1-\u1ED1]|[\u1ED3-\u1ED3]|[\u1ED5-\u1ED5]|[\u1ED7-\u1ED7]|[\u1ED9-\u1ED9]|[\u1EDB-\u1EDB]|[\u1EDD-\u1EDD]|[\u1EDF-\u1EDF]|[\u1EE1-\u1EE1]|[\u1EE3-\u1EE3]|[\u1EE5-\u1EE5]|[\u1EE7-\u1EE7]|[\u1EE9-\u1EE9]|[\u1EEB-\u1EEB]|[\u1EED-\u1EED]|[\u1EEF-\u1EEF]|[\u1EF1-\u1EF1]|[\u1EF3-\u1EF3]|[\u1EF5-\u1EF5]|[\u1EF7-\u1EF7]|[\u1EF9-\u1EF9]|[\u1F00-\u1F07]|[\u1F10-\u1F15]|[\u1F20-\u1F27]|[\u1F30-\u1F37]|[\u1F40-\u1F45]|[\u1F50-\u1F57]|[\u1F60-\u1F67]|[\u1F70-\u1F7D]|[\u1F80-\u1F87]|[\u1F90-\u1F97]|[\u1FA0-\u1FA7]|[\u1FB0-\u1FB4]|[\u1FB6-\u1FB7]|[\u1FBE-\u1FBE]|[\u1FC2-\u1FC4]|[\u1FC6-\u1FC7]|[\u1FD0-\u1FD3]|[\u1FD6-\u1FD7]|[\u1FE0-\u1FE7]|[\u1FF2-\u1FF4]|[\u1FF6-\u1FF7]|[\u207F-\u207F]|[\u210A-\u210A]|[\u210E-\u210F]|[\u2113-\u2113]|[\u2118-\u2118]|[\u212E-\u212F]|[\u2134-\u2134]|[\uFB00-\uFB06]|[\uFB13-\uFB17]|[\uFF41-\uFF5A]|[\u01C5-\u01C5]|[\u01C8-\u01C8]|[\u01CB-\u01CB]|[\u01F2-\u01F2]|[\u02B0-\u02B8]|[\u02BB-\u02C1]|[\u02D0-\u02D1]|[\u02E0-\u02E4]|[\u037A-\u037A]|[\u0559-\u0559]|[\u0640-\u0640]|[\u06E5-\u06E6]|[\u0E46-\u0E46]|[\u0EC6-\u0EC6]|[\u3005-\u3005]|[\u3031-\u3035]|[\u309D-\u309E]|[\u30FC-\u30FE]|[\uFF70-\uFF70]|[\uFF9E-\uFF9F]|[\u01AA-\u01AA]|[\u01BB-\u01BB]|[\u01BE-\u01C3]|[\u03F3-\u03F3]|[\u04C0-\u04C0]|[\u05D0-\u05EA]|[\u05F0-\u05F2]|[\u0621-\u063A]|[\u0641-\u064A]|[\u0671-\u06B7]|[\u06BA-\u06BE]|[\u06C0-\u06CE]|[\u06D0-\u06D3]|[\u06D5-\u06D5]|[\u0905-\u0939]|[\u093D-\u093D]|[\u0950-\u0950]|[\u0958-\u0961]|[\u0985-\u098C]|[\u098F-\u0990]|[\u0993-\u09A8]|[\u09AA-\u09B0]|[\u09B2-\u09B2]|[\u09B6-\u09B9]|[\u09DC-\u09DD]|[\u09DF-\u09E1]|[\u09F0-\u09F1]|[\u0A05-\u0A0A]|[\u0A0F-\u0A10]|[\u0A13-\u0A28]|[\u0A2A-\u0A30]|[\u0A32-\u0A33]|[\u0A35-\u0A36]|[\u0A38-\u0A39]|[\u0A59-\u0A5C]|[\u0A5E-\u0A5E]|[\u0A72-\u0A74]|[\u0A85-\u0A8B]|[\u0A8D-\u0A8D]|[\u0A8F-\u0A91]|[\u0A93-\u0AA8]|[\u0AAA-\u0AB0]|[\u0AB2-\u0AB3]|[\u0AB5-\u0AB9]|[\u0ABD-\u0ABD]|[\u0AD0-\u0AD0]|[\u0AE0-\u0AE0]|[\u0B05-\u0B0C]|[\u0B0F-\u0B10]|[\u0B13-\u0B28]|[\u0B2A-\u0B30]|[\u0B32-\u0B33]|[\u0B36-\u0B39]|[\u0B3D-\u0B3D]|[\u0B5C-\u0B5D]|[\u0B5F-\u0B61]|[\u0B85-\u0B8A]|[\u0B8E-\u0B90]|[\u0B92-\u0B95]|[\u0B99-\u0B9A]|[\u0B9C-\u0B9C]|[\u0B9E-\u0B9F]|[\u0BA3-\u0BA4]|[\u0BA8-\u0BAA]|[\u0BAE-\u0BB5]|[\u0BB7-\u0BB9]|[\u0C05-\u0C0C]|[\u0C0E-\u0C10]|[\u0C12-\u0C28]|[\u0C2A-\u0C33]|[\u0C35-\u0C39]|[\u0C60-\u0C61]|[\u0C85-\u0C8C]|[\u0C8E-\u0C90]|[\u0C92-\u0CA8]|[\u0CAA-\u0CB3]|[\u0CB5-\u0CB9]|[\u0CDE-\u0CDE]|[\u0CE0-\u0CE1]|[\u0D05-\u0D0C]|[\u0D0E-\u0D10]|[\u0D12-\u0D28]|[\u0D2A-\u0D39]|[\u0D60-\u0D61]|[\u0E01-\u0E30]|[\u0E32-\u0E33]|[\u0E40-\u0E45]|[\u0E81-\u0E82]|[\u0E84-\u0E84]|[\u0E87-\u0E88]|[\u0E8A-\u0E8A]|[\u0E8D-\u0E8D]|[\u0E94-\u0E97]|[\u0E99-\u0E9F]|[\u0EA1-\u0EA3]|[\u0EA5-\u0EA5]|[\u0EA7-\u0EA7]|[\u0EAA-\u0EAB]|[\u0EAD-\u0EB0]|[\u0EB2-\u0EB3]|[\u0EBD-\u0EBD]|[\u0EC0-\u0EC4]|[\u0EDC-\u0EDD]|[\u0F00-\u0F00]|[\u0F40-\u0F47]|[\u0F49-\u0F69]|[\u0F88-\u0F8B]|[\u1100-\u1159]|[\u115F-\u11A2]|[\u11A8-\u11F9]|[\u2135-\u2138]|[\u3006-\u3006]|[\u3041-\u3094]|[\u30A1-\u30FA]|[\u3105-\u312C]|[\u3131-\u318E]|[\u4E00-\u9FA5]|[\uAC00-\uD7A3]|[\uF900-\uFA2D]|[\uFB1F-\uFB28]|[\uFB2A-\uFB36]|[\uFB38-\uFB3C]|[\uFB3E-\uFB3E]|[\uFB40-\uFB41]|[\uFB43-\uFB44]|[\uFB46-\uFBB1]|[\uFBD3-\uFD3D]|[\uFD50-\uFD8F]|[\uFD92-\uFDC7]|[\uFDF0-\uFDFB]|[\uFE70-\uFE72]|[\uFE74-\uFE74]|[\uFE76-\uFEFC]|[\uFF66-\uFF6F]|[\uFF71-\uFF9D]|[\uFFA0-\uFFBE]|[\uFFC2-\uFFC7]|[\uFFCA-\uFFCF]|[\uFFD2-\uFFD7]|[\uFFDA-\uFFDC]/,
  Ltmo: /[\u01C5-\u01C5]|[\u01C8-\u01C8]|[\u01CB-\u01CB]|[\u01F2-\u01F2][\u02B0-\u02B8]|[\u02BB-\u02C1]|[\u02D0-\u02D1]|[\u02E0-\u02E4]|[\u037A-\u037A]|[\u0559-\u0559]|[\u0640-\u0640]|[\u06E5-\u06E6]|[\u0E46-\u0E46]|[\u0EC6-\u0EC6]|[\u3005-\u3005]|[\u3031-\u3035]|[\u309D-\u309E]|[\u30FC-\u30FE]|[\uFF70-\uFF70]|[\uFF9E-\uFF9F][\u01AA-\u01AA]|[\u01BB-\u01BB]|[\u01BE-\u01C3]|[\u03F3-\u03F3]|[\u04C0-\u04C0]|[\u05D0-\u05EA]|[\u05F0-\u05F2]|[\u0621-\u063A]|[\u0641-\u064A]|[\u0671-\u06B7]|[\u06BA-\u06BE]|[\u06C0-\u06CE]|[\u06D0-\u06D3]|[\u06D5-\u06D5]|[\u0905-\u0939]|[\u093D-\u093D]|[\u0950-\u0950]|[\u0958-\u0961]|[\u0985-\u098C]|[\u098F-\u0990]|[\u0993-\u09A8]|[\u09AA-\u09B0]|[\u09B2-\u09B2]|[\u09B6-\u09B9]|[\u09DC-\u09DD]|[\u09DF-\u09E1]|[\u09F0-\u09F1]|[\u0A05-\u0A0A]|[\u0A0F-\u0A10]|[\u0A13-\u0A28]|[\u0A2A-\u0A30]|[\u0A32-\u0A33]|[\u0A35-\u0A36]|[\u0A38-\u0A39]|[\u0A59-\u0A5C]|[\u0A5E-\u0A5E]|[\u0A72-\u0A74]|[\u0A85-\u0A8B]|[\u0A8D-\u0A8D]|[\u0A8F-\u0A91]|[\u0A93-\u0AA8]|[\u0AAA-\u0AB0]|[\u0AB2-\u0AB3]|[\u0AB5-\u0AB9]|[\u0ABD-\u0ABD]|[\u0AD0-\u0AD0]|[\u0AE0-\u0AE0]|[\u0B05-\u0B0C]|[\u0B0F-\u0B10]|[\u0B13-\u0B28]|[\u0B2A-\u0B30]|[\u0B32-\u0B33]|[\u0B36-\u0B39]|[\u0B3D-\u0B3D]|[\u0B5C-\u0B5D]|[\u0B5F-\u0B61]|[\u0B85-\u0B8A]|[\u0B8E-\u0B90]|[\u0B92-\u0B95]|[\u0B99-\u0B9A]|[\u0B9C-\u0B9C]|[\u0B9E-\u0B9F]|[\u0BA3-\u0BA4]|[\u0BA8-\u0BAA]|[\u0BAE-\u0BB5]|[\u0BB7-\u0BB9]|[\u0C05-\u0C0C]|[\u0C0E-\u0C10]|[\u0C12-\u0C28]|[\u0C2A-\u0C33]|[\u0C35-\u0C39]|[\u0C60-\u0C61]|[\u0C85-\u0C8C]|[\u0C8E-\u0C90]|[\u0C92-\u0CA8]|[\u0CAA-\u0CB3]|[\u0CB5-\u0CB9]|[\u0CDE-\u0CDE]|[\u0CE0-\u0CE1]|[\u0D05-\u0D0C]|[\u0D0E-\u0D10]|[\u0D12-\u0D28]|[\u0D2A-\u0D39]|[\u0D60-\u0D61]|[\u0E01-\u0E30]|[\u0E32-\u0E33]|[\u0E40-\u0E45]|[\u0E81-\u0E82]|[\u0E84-\u0E84]|[\u0E87-\u0E88]|[\u0E8A-\u0E8A]|[\u0E8D-\u0E8D]|[\u0E94-\u0E97]|[\u0E99-\u0E9F]|[\u0EA1-\u0EA3]|[\u0EA5-\u0EA5]|[\u0EA7-\u0EA7]|[\u0EAA-\u0EAB]|[\u0EAD-\u0EB0]|[\u0EB2-\u0EB3]|[\u0EBD-\u0EBD]|[\u0EC0-\u0EC4]|[\u0EDC-\u0EDD]|[\u0F00-\u0F00]|[\u0F40-\u0F47]|[\u0F49-\u0F69]|[\u0F88-\u0F8B]|[\u1100-\u1159]|[\u115F-\u11A2]|[\u11A8-\u11F9]|[\u2135-\u2138]|[\u3006-\u3006]|[\u3041-\u3094]|[\u30A1-\u30FA]|[\u3105-\u312C]|[\u3131-\u318E]|[\u4E00-\u9FA5]|[\uAC00-\uD7A3]|[\uF900-\uFA2D]|[\uFB1F-\uFB28]|[\uFB2A-\uFB36]|[\uFB38-\uFB3C]|[\uFB3E-\uFB3E]|[\uFB40-\uFB41]|[\uFB43-\uFB44]|[\uFB46-\uFBB1]|[\uFBD3-\uFD3D]|[\uFD50-\uFD8F]|[\uFD92-\uFDC7]|[\uFDF0-\uFDFB]|[\uFE70-\uFE72]|[\uFE74-\uFE74]|[\uFE76-\uFEFC]|[\uFF66-\uFF6F]|[\uFF71-\uFF9D]|[\uFFA0-\uFFBE]|[\uFFC2-\uFFC7]|[\uFFCA-\uFFCF]|[\uFFD2-\uFFD7]|[\uFFDA-\uFFDC]/
};

},{}]},{},[41])(41)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkaXN0L2J1aWx0LWluLXJ1bGVzLmpzIiwiZGlzdC9vaG0tZ3JhbW1hci5qcyIsImRpc3Qvb3BlcmF0aW9ucy1hbmQtYXR0cmlidXRlcy5qcyIsImV4dHJhcy9pbmRleC5qcyIsImV4dHJhcy9zZW1hbnRpY3MtdG9BU1QuanMiLCJub2RlX21vZHVsZXMvZC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC9hc3NpZ24vaW5kZXguanMiLCJub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3QvYXNzaWduL2lzLWltcGxlbWVudGVkLmpzIiwibm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L2Fzc2lnbi9zaGltLmpzIiwibm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L2lzLWNhbGxhYmxlLmpzIiwibm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L2tleXMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3Qva2V5cy9pcy1pbXBsZW1lbnRlZC5qcyIsIm5vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC9rZXlzL3NoaW0uanMiLCJub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3Qvbm9ybWFsaXplLW9wdGlvbnMuanMiLCJub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3QvdmFsaWQtdmFsdWUuanMiLCJub2RlX21vZHVsZXMvZXM1LWV4dC9zdHJpbmcvIy9jb250YWlucy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9lczUtZXh0L3N0cmluZy8jL2NvbnRhaW5zL2lzLWltcGxlbWVudGVkLmpzIiwibm9kZV9tb2R1bGVzL2VzNS1leHQvc3RyaW5nLyMvY29udGFpbnMvc2hpbS5qcyIsIm5vZGVfbW9kdWxlcy9lczYtc3ltYm9sL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2VzNi1zeW1ib2wvaXMtaW1wbGVtZW50ZWQuanMiLCJub2RlX21vZHVsZXMvZXM2LXN5bWJvbC9pcy1zeW1ib2wuanMiLCJub2RlX21vZHVsZXMvZXM2LXN5bWJvbC9wb2x5ZmlsbC5qcyIsIm5vZGVfbW9kdWxlcy9lczYtc3ltYm9sL3ZhbGlkYXRlLXN5bWJvbC5qcyIsIm5vZGVfbW9kdWxlcy9pbmhlcml0cy9pbmhlcml0c19icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL2lzLWJ1ZmZlci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy91dGlsLWV4dGVuZC9leHRlbmQuanMiLCJzcmMvQnVpbGRlci5qcyIsInNyYy9GYWlsdXJlLmpzIiwic3JjL0dyYW1tYXIuanMiLCJzcmMvR3JhbW1hckRlY2wuanMiLCJzcmMvSW5wdXRTdHJlYW0uanMiLCJzcmMvSW50ZXJ2YWwuanMiLCJzcmMvTWF0Y2hSZXN1bHQuanMiLCJzcmMvTmFtZXNwYWNlLmpzIiwic3JjL1Bvc0luZm8uanMiLCJzcmMvU2VtYW50aWNzLmpzIiwic3JjL1N0YXRlLmpzIiwic3JjL1RyYWNlLmpzIiwic3JjL2NvbW1vbi5qcyIsInNyYy9lcnJvcnMuanMiLCJzcmMvbWFpbi5qcyIsInNyYy9ub2Rlcy5qcyIsInNyYy9wZXhwcnMtYWxsb3dzU2tpcHBpbmdQcmVjZWRpbmdTcGFjZS5qcyIsInNyYy9wZXhwcnMtYXNzZXJ0QWxsQXBwbGljYXRpb25zQXJlVmFsaWQuanMiLCJzcmMvcGV4cHJzLWFzc2VydENob2ljZXNIYXZlVW5pZm9ybUFyaXR5LmpzIiwic3JjL3BleHBycy1hc3NlcnRJdGVyYXRlZEV4cHJzQXJlTm90TnVsbGFibGUuanMiLCJzcmMvcGV4cHJzLWNoZWNrLmpzIiwic3JjL3BleHBycy1ldmFsLmpzIiwic3JjL3BleHBycy1nZW5lcmF0ZUV4YW1wbGUuanMiLCJzcmMvcGV4cHJzLWdldEFyaXR5LmpzIiwic3JjL3BleHBycy1pbnRyb2R1Y2VQYXJhbXMuanMiLCJzcmMvcGV4cHJzLWlzTnVsbGFibGUuanMiLCJzcmMvcGV4cHJzLW91dHB1dFJlY2lwZS5qcyIsInNyYy9wZXhwcnMtc3Vic3RpdHV0ZVBhcmFtcy5qcyIsInNyYy9wZXhwcnMtdG9Bcmd1bWVudE5hbWVMaXN0LmpzIiwic3JjL3BleHBycy10b0Rpc3BsYXlTdHJpbmcuanMiLCJzcmMvcGV4cHJzLXRvRmFpbHVyZS5qcyIsInNyYy9wZXhwcnMtdG9TdHJpbmcuanMiLCJzcmMvcGV4cHJzLmpzIiwic3JjL3V0aWwuanMiLCJ0aGlyZF9wYXJ0eS9Vbmljb2RlQ2F0ZWdvcmllcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25MQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9NQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4ckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaFdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN1dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNU5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgb2htID0gcmVxdWlyZSgnLi4nKTtcbm1vZHVsZS5leHBvcnRzID0gb2htLm1ha2VSZWNpcGUoW1wiZ3JhbW1hclwiLHtcInNvdXJjZVwiOlwiQnVpbHRJblJ1bGVzIHtcXG5cXG4gIGFsbnVtICAoYW4gYWxwaGEtbnVtZXJpYyBjaGFyYWN0ZXIpXFxuICAgID0gbGV0dGVyXFxuICAgIHwgZGlnaXRcXG5cXG4gIGxldHRlciAgKGEgbGV0dGVyKVxcbiAgICA9IGxvd2VyXFxuICAgIHwgdXBwZXJcXG4gICAgfCB1bmljb2RlTHRtb1xcblxcbiAgZGlnaXQgIChhIGRpZ2l0KVxcbiAgICA9IFxcXCIwXFxcIi4uXFxcIjlcXFwiXFxuXFxuICBoZXhEaWdpdCAgKGEgaGV4YWRlY2ltYWwgZGlnaXQpXFxuICAgID0gZGlnaXRcXG4gICAgfCBcXFwiYVxcXCIuLlxcXCJmXFxcIlxcbiAgICB8IFxcXCJBXFxcIi4uXFxcIkZcXFwiXFxuXFxuICBMaXN0T2Y8ZWxlbSwgc2VwPlxcbiAgICA9IE5vbmVtcHR5TGlzdE9mPGVsZW0sIHNlcD5cXG4gICAgfCBFbXB0eUxpc3RPZjxlbGVtLCBzZXA+XFxuXFxuICBOb25lbXB0eUxpc3RPZjxlbGVtLCBzZXA+XFxuICAgID0gZWxlbSAoc2VwIGVsZW0pKlxcblxcbiAgRW1wdHlMaXN0T2Y8ZWxlbSwgc2VwPlxcbiAgICA9IC8qIG5vdGhpbmcgKi9cXG5cXG4gIGxpc3RPZjxlbGVtLCBzZXA+XFxuICAgID0gbm9uZW1wdHlMaXN0T2Y8ZWxlbSwgc2VwPlxcbiAgICB8IGVtcHR5TGlzdE9mPGVsZW0sIHNlcD5cXG5cXG4gIG5vbmVtcHR5TGlzdE9mPGVsZW0sIHNlcD5cXG4gICAgPSBlbGVtIChzZXAgZWxlbSkqXFxuXFxuICBlbXB0eUxpc3RPZjxlbGVtLCBzZXA+XFxuICAgID0gLyogbm90aGluZyAqL1xcblxcbn1cIn0sXCJCdWlsdEluUnVsZXNcIixudWxsLG51bGwse1wiYWxudW1cIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxOCw3OF19LFwiYW4gYWxwaGEtbnVtZXJpYyBjaGFyYWN0ZXJcIixbXSxbXCJhbHRcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls2MCw3OF19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzYwLDY2XX0sXCJsZXR0ZXJcIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNzMsNzhdfSxcImRpZ2l0XCIsW11dXV0sXCJsZXR0ZXJcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls4MiwxNDJdfSxcImEgbGV0dGVyXCIsW10sW1wiYWx0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTA3LDE0Ml19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzEwNywxMTJdfSxcImxvd2VyXCIsW11dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzExOSwxMjRdfSxcInVwcGVyXCIsW11dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzEzMSwxNDJdfSxcInVuaWNvZGVMdG1vXCIsW11dXV0sXCJkaWdpdFwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzE0NiwxNzddfSxcImEgZGlnaXRcIixbXSxbXCJyYW5nZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzE2OSwxNzddfSxcIjBcIixcIjlcIl1dLFwiaGV4RGlnaXRcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxODEsMjU0XX0sXCJhIGhleGFkZWNpbWFsIGRpZ2l0XCIsW10sW1wiYWx0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjE5LDI1NF19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIxOSwyMjRdfSxcImRpZ2l0XCIsW11dLFtcInJhbmdlXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjMxLDIzOV19LFwiYVwiLFwiZlwiXSxbXCJyYW5nZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzI0NiwyNTRdfSxcIkFcIixcIkZcIl1dXSxcIkxpc3RPZlwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzI1OCwzMzZdfSxudWxsLFtcImVsZW1cIixcInNlcFwiXSxbXCJhbHRcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyODIsMzM2XX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjgyLDMwN119LFwiTm9uZW1wdHlMaXN0T2ZcIixbW1wicGFyYW1cIix7fSwwXSxbXCJwYXJhbVwiLHt9LDFdXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMzE0LDMzNl19LFwiRW1wdHlMaXN0T2ZcIixbW1wicGFyYW1cIix7fSwwXSxbXCJwYXJhbVwiLHt9LDFdXV1dXSxcIk5vbmVtcHR5TGlzdE9mXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMzQwLDM4OF19LG51bGwsW1wiZWxlbVwiLFwic2VwXCJdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzM3MiwzODhdfSxbXCJwYXJhbVwiLHt9LDBdLFtcInN0YXJcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlszNzcsMzg4XX0sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMzc4LDM4Nl19LFtcInBhcmFtXCIse30sMV0sW1wicGFyYW1cIix7fSwwXV1dXV0sXCJFbXB0eUxpc3RPZlwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzM5Miw0MzRdfSxudWxsLFtcImVsZW1cIixcInNlcFwiXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls0MzgsNDM4XX1dXSxcImxpc3RPZlwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzQzOCw1MTZdfSxudWxsLFtcImVsZW1cIixcInNlcFwiXSxbXCJhbHRcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls0NjIsNTE2XX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNDYyLDQ4N119LFwibm9uZW1wdHlMaXN0T2ZcIixbW1wicGFyYW1cIix7fSwwXSxbXCJwYXJhbVwiLHt9LDFdXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNDk0LDUxNl19LFwiZW1wdHlMaXN0T2ZcIixbW1wicGFyYW1cIix7fSwwXSxbXCJwYXJhbVwiLHt9LDFdXV1dXSxcIm5vbmVtcHR5TGlzdE9mXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNTIwLDU2OF19LG51bGwsW1wiZWxlbVwiLFwic2VwXCJdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzU1Miw1NjhdfSxbXCJwYXJhbVwiLHt9LDBdLFtcInN0YXJcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls1NTcsNTY4XX0sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNTU4LDU2Nl19LFtcInBhcmFtXCIse30sMV0sW1wicGFyYW1cIix7fSwwXV1dXV0sXCJlbXB0eUxpc3RPZlwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzU3Miw2MTRdfSxudWxsLFtcImVsZW1cIixcInNlcFwiXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls2MTYsNjE2XX1dXX1dKTtcbiIsInZhciBvaG0gPSByZXF1aXJlKCcuLicpO1xubW9kdWxlLmV4cG9ydHMgPSBvaG0ubWFrZVJlY2lwZShbXCJncmFtbWFyXCIse1wic291cmNlXCI6XCJPaG0ge1xcblxcbiAgR3JhbW1hcnNcXG4gICAgPSBHcmFtbWFyKlxcblxcbiAgR3JhbW1hclxcbiAgICA9IGlkZW50IFN1cGVyR3JhbW1hcj8gXFxcIntcXFwiIFJ1bGUqIFxcXCJ9XFxcIlxcblxcbiAgU3VwZXJHcmFtbWFyXFxuICAgID0gXFxcIjw6XFxcIiBpZGVudFxcblxcbiAgUnVsZVxcbiAgICA9IGlkZW50IEZvcm1hbHM/IHJ1bGVEZXNjcj8gXFxcIj1cXFwiICBSdWxlQm9keSAgLS0gZGVmaW5lXFxuICAgIHwgaWRlbnQgRm9ybWFscz8gICAgICAgICAgICBcXFwiOj1cXFwiIFJ1bGVCb2R5ICAtLSBvdmVycmlkZVxcbiAgICB8IGlkZW50IEZvcm1hbHM/ICAgICAgICAgICAgXFxcIis9XFxcIiBSdWxlQm9keSAgLS0gZXh0ZW5kXFxuXFxuICBSdWxlQm9keVxcbiAgICA9IFxcXCJ8XFxcIj8gTm9uZW1wdHlMaXN0T2Y8VG9wTGV2ZWxUZXJtLCBcXFwifFxcXCI+XFxuXFxuICBUb3BMZXZlbFRlcm1cXG4gICAgPSBTZXEgY2FzZU5hbWUgIC0tIGlubGluZVxcbiAgICB8IFNlcVxcblxcbiAgRm9ybWFsc1xcbiAgICA9IFxcXCI8XFxcIiBMaXN0T2Y8aWRlbnQsIFxcXCIsXFxcIj4gXFxcIj5cXFwiXFxuXFxuICBQYXJhbXNcXG4gICAgPSBcXFwiPFxcXCIgTGlzdE9mPFNlcSwgXFxcIixcXFwiPiBcXFwiPlxcXCJcXG5cXG4gIEFsdFxcbiAgICA9IE5vbmVtcHR5TGlzdE9mPFNlcSwgXFxcInxcXFwiPlxcblxcbiAgU2VxXFxuICAgID0gSXRlcipcXG5cXG4gIEl0ZXJcXG4gICAgPSBQcmVkIFxcXCIqXFxcIiAgLS0gc3RhclxcbiAgICB8IFByZWQgXFxcIitcXFwiICAtLSBwbHVzXFxuICAgIHwgUHJlZCBcXFwiP1xcXCIgIC0tIG9wdFxcbiAgICB8IFByZWRcXG5cXG4gIFByZWRcXG4gICAgPSBcXFwiflxcXCIgTGV4ICAtLSBub3RcXG4gICAgfCBcXFwiJlxcXCIgTGV4ICAtLSBsb29rYWhlYWRcXG4gICAgfCBMZXhcXG5cXG4gIExleFxcbiAgICA9IFxcXCIjXFxcIiBCYXNlICAtLSBsZXhcXG4gICAgfCBCYXNlXFxuXFxuICBCYXNlXFxuICAgID0gaWRlbnQgUGFyYW1zPyB+KHJ1bGVEZXNjcj8gXFxcIj1cXFwiIHwgXFxcIjo9XFxcIiB8IFxcXCIrPVxcXCIpICAtLSBhcHBsaWNhdGlvblxcbiAgICB8IHRlcm1pbmFsIFxcXCIuLlxcXCIgdGVybWluYWwgICAgICAgICAgICAgICAgICAgICAgICAgLS0gcmFuZ2VcXG4gICAgfCB0ZXJtaW5hbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0tIHRlcm1pbmFsXFxuICAgIHwgXFxcIihcXFwiIEFsdCBcXFwiKVxcXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtLSBwYXJlblxcblxcbiAgcnVsZURlc2NyICAoYSBydWxlIGRlc2NyaXB0aW9uKVxcbiAgICA9IFxcXCIoXFxcIiBydWxlRGVzY3JUZXh0IFxcXCIpXFxcIlxcblxcbiAgcnVsZURlc2NyVGV4dFxcbiAgICA9ICh+XFxcIilcXFwiIGFueSkqXFxuXFxuICBjYXNlTmFtZVxcbiAgICA9IFxcXCItLVxcXCIgKH5cXFwiXFxcXG5cXFwiIHNwYWNlKSogbmFtZSAoflxcXCJcXFxcblxcXCIgc3BhY2UpKiAoXFxcIlxcXFxuXFxcIiB8ICZcXFwifVxcXCIpXFxuXFxuICBuYW1lICAoYSBuYW1lKVxcbiAgICA9IG5hbWVGaXJzdCBuYW1lUmVzdCpcXG5cXG4gIG5hbWVGaXJzdFxcbiAgICA9IFxcXCJfXFxcIlxcbiAgICB8IGxldHRlclxcblxcbiAgbmFtZVJlc3RcXG4gICAgPSBcXFwiX1xcXCJcXG4gICAgfCBhbG51bVxcblxcbiAgaWRlbnQgIChhbiBpZGVudGlmaWVyKVxcbiAgICA9IG5hbWVcXG5cXG4gIHRlcm1pbmFsXFxuICAgID0gXFxcIlxcXFxcXFwiXFxcIiB0ZXJtaW5hbENoYXIqIFxcXCJcXFxcXFxcIlxcXCJcXG5cXG4gIHRlcm1pbmFsQ2hhclxcbiAgICA9IGVzY2FwZUNoYXJcXG4gICAgfCB+XFxcIlxcXFxcXFxcXFxcIiB+XFxcIlxcXFxcXFwiXFxcIiB+XFxcIlxcXFxuXFxcIiBhbnlcXG5cXG4gIGVzY2FwZUNoYXIgIChhbiBlc2NhcGUgc2VxdWVuY2UpXFxuICAgID0gXFxcIlxcXFxcXFxcXFxcXFxcXFxcXFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0tIGJhY2tzbGFzaFxcbiAgICB8IFxcXCJcXFxcXFxcXFxcXFxcXFwiXFxcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtLSBkb3VibGVRdW90ZVxcbiAgICB8IFxcXCJcXFxcXFxcXFxcXFwnXFxcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtLSBzaW5nbGVRdW90ZVxcbiAgICB8IFxcXCJcXFxcXFxcXGJcXFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtLSBiYWNrc3BhY2VcXG4gICAgfCBcXFwiXFxcXFxcXFxuXFxcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLS0gbGluZUZlZWRcXG4gICAgfCBcXFwiXFxcXFxcXFxyXFxcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLS0gY2FycmlhZ2VSZXR1cm5cXG4gICAgfCBcXFwiXFxcXFxcXFx0XFxcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLS0gdGFiXFxuICAgIHwgXFxcIlxcXFxcXFxcdVxcXCIgaGV4RGlnaXQgaGV4RGlnaXQgaGV4RGlnaXQgaGV4RGlnaXQgIC0tIHVuaWNvZGVFc2NhcGVcXG4gICAgfCBcXFwiXFxcXFxcXFx4XFxcIiBoZXhEaWdpdCBoZXhEaWdpdCAgICAgICAgICAgICAgICAgICAgLS0gaGV4RXNjYXBlXFxuXFxuICBzcGFjZVxcbiAgICs9IGNvbW1lbnRcXG5cXG4gIGNvbW1lbnRcXG4gICAgPSBcXFwiLy9cXFwiICh+XFxcIlxcXFxuXFxcIiBhbnkpKiBcXFwiXFxcXG5cXFwiICAtLSBzaW5nbGVMaW5lXFxuICAgIHwgXFxcIi8qXFxcIiAoflxcXCIqL1xcXCIgYW55KSogXFxcIiovXFxcIiAgLS0gbXVsdGlMaW5lXFxuXFxuICB0b2tlbnMgPSB0b2tlbipcXG5cXG4gIHRva2VuID0gY2FzZU5hbWUgfCBjb21tZW50IHwgaWRlbnQgfCBvcGVyYXRvciB8IHB1bmN0dWF0aW9uIHwgdGVybWluYWwgfCBhbnlcXG5cXG4gIG9wZXJhdG9yID0gXFxcIjw6XFxcIiB8IFxcXCI9XFxcIiB8IFxcXCI6PVxcXCIgfCBcXFwiKz1cXFwiIHwgXFxcIipcXFwiIHwgXFxcIitcXFwiIHwgXFxcIj9cXFwiIHwgXFxcIn5cXFwiIHwgXFxcIiZcXFwiXFxuXFxuICBwdW5jdHVhdGlvbiA9IFxcXCI8XFxcIiB8IFxcXCI+XFxcIiB8IFxcXCIsXFxcIiB8IFxcXCItLVxcXCJcXG59XCJ9LFwiT2htXCIsbnVsbCxcIkdyYW1tYXJzXCIse1wiR3JhbW1hcnNcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls5LDMyXX0sbnVsbCxbXSxbXCJzdGFyXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjQsMzJdfSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyNCwzMV19LFwiR3JhbW1hclwiLFtdXV1dLFwiR3JhbW1hclwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzM2LDgzXX0sbnVsbCxbXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls1MCw4M119LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzUwLDU1XX0sXCJpZGVudFwiLFtdXSxbXCJvcHRcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls1Niw2OV19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzU2LDY4XX0sXCJTdXBlckdyYW1tYXJcIixbXV1dLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNzAsNzNdfSxcIntcIl0sW1wic3RhclwiLHtcInNvdXJjZUludGVydmFsXCI6Wzc0LDc5XX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNzQsNzhdfSxcIlJ1bGVcIixbXV1dLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbODAsODNdfSxcIn1cIl1dXSxcIlN1cGVyR3JhbW1hclwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6Wzg3LDExNl19LG51bGwsW10sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTA2LDExNl19LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTA2LDExMF19LFwiPDpcIl0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTExLDExNl19LFwiaWRlbnRcIixbXV1dXSxcIlJ1bGVfZGVmaW5lXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTMxLDE4MV19LG51bGwsW10sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTMxLDE3MF19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzEzMSwxMzZdfSxcImlkZW50XCIsW11dLFtcIm9wdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzEzNywxNDVdfSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMzcsMTQ0XX0sXCJGb3JtYWxzXCIsW11dXSxbXCJvcHRcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNDYsMTU2XX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTQ2LDE1NV19LFwicnVsZURlc2NyXCIsW11dXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE1NywxNjBdfSxcIj1cIl0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTYyLDE3MF19LFwiUnVsZUJvZHlcIixbXV1dXSxcIlJ1bGVfb3ZlcnJpZGVcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxODgsMjQwXX0sbnVsbCxbXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxODgsMjI3XX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTg4LDE5M119LFwiaWRlbnRcIixbXV0sW1wib3B0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTk0LDIwMl19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE5NCwyMDFdfSxcIkZvcm1hbHNcIixbXV1dLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjE0LDIxOF19LFwiOj1cIl0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjE5LDIyN119LFwiUnVsZUJvZHlcIixbXV1dXSxcIlJ1bGVfZXh0ZW5kXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjQ3LDI5N119LG51bGwsW10sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjQ3LDI4Nl19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzI0NywyNTJdfSxcImlkZW50XCIsW11dLFtcIm9wdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzI1MywyNjFdfSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyNTMsMjYwXX0sXCJGb3JtYWxzXCIsW11dXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzI3MywyNzddfSxcIis9XCJdLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzI3OCwyODZdfSxcIlJ1bGVCb2R5XCIsW11dXV0sXCJSdWxlXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTIwLDI5N119LG51bGwsW10sW1wiYWx0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTMxLDI5N119LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzEzMSwxNzBdfSxcIlJ1bGVfZGVmaW5lXCIsW11dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE4OCwyMjddfSxcIlJ1bGVfb3ZlcnJpZGVcIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjQ3LDI4Nl19LFwiUnVsZV9leHRlbmRcIixbXV1dXSxcIlJ1bGVCb2R5XCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMzAxLDM1NF19LG51bGwsW10sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMzE2LDM1NF19LFtcIm9wdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzMxNiwzMjBdfSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzMxNiwzMTldfSxcInxcIl1dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzMyMSwzNTRdfSxcIk5vbmVtcHR5TGlzdE9mXCIsW1tcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzMzNiwzNDhdfSxcIlRvcExldmVsVGVybVwiLFtdXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzM1MCwzNTNdfSxcInxcIl1dXV1dLFwiVG9wTGV2ZWxUZXJtX2lubGluZVwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzM3Nyw0MDBdfSxudWxsLFtdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzM3NywzODldfSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlszNzcsMzgwXX0sXCJTZXFcIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMzgxLDM4OV19LFwiY2FzZU5hbWVcIixbXV1dXSxcIlRvcExldmVsVGVybVwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzM1OCw0MTBdfSxudWxsLFtdLFtcImFsdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzM3Nyw0MTBdfSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlszNzcsMzg5XX0sXCJUb3BMZXZlbFRlcm1faW5saW5lXCIsW11dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzQwNyw0MTBdfSxcIlNlcVwiLFtdXV1dLFwiRm9ybWFsc1wiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzQxNCw0NTRdfSxudWxsLFtdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzQyOCw0NTRdfSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzQyOCw0MzFdfSxcIjxcIl0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNDMyLDQ1MF19LFwiTGlzdE9mXCIsW1tcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzQzOSw0NDRdfSxcImlkZW50XCIsW11dLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNDQ2LDQ0OV19LFwiLFwiXV1dLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNDUxLDQ1NF19LFwiPlwiXV1dLFwiUGFyYW1zXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNDU4LDQ5NV19LG51bGwsW10sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNDcxLDQ5NV19LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNDcxLDQ3NF19LFwiPFwiXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls0NzUsNDkxXX0sXCJMaXN0T2ZcIixbW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNDgyLDQ4NV19LFwiU2VxXCIsW11dLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNDg3LDQ5MF19LFwiLFwiXV1dLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNDkyLDQ5NV19LFwiPlwiXV1dLFwiQWx0XCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNDk5LDUzM119LG51bGwsW10sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNTA5LDUzM119LFwiTm9uZW1wdHlMaXN0T2ZcIixbW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNTI0LDUyN119LFwiU2VxXCIsW11dLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNTI5LDUzMl19LFwifFwiXV1dXSxcIlNlcVwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzUzNyw1NTJdfSxudWxsLFtdLFtcInN0YXJcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls1NDcsNTUyXX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNTQ3LDU1MV19LFwiSXRlclwiLFtdXV1dLFwiSXRlcl9zdGFyXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNTY3LDU4NF19LG51bGwsW10sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNTY3LDU3NV19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzU2Nyw1NzFdfSxcIlByZWRcIixbXV0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls1NzIsNTc1XX0sXCIqXCJdXV0sXCJJdGVyX3BsdXNcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls1OTEsNjA4XX0sbnVsbCxbXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls1OTEsNTk5XX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNTkxLDU5NV19LFwiUHJlZFwiLFtdXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzU5Niw1OTldfSxcIitcIl1dXSxcIkl0ZXJfb3B0XCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNjE1LDYzMV19LG51bGwsW10sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNjE1LDYyM119LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzYxNSw2MTldfSxcIlByZWRcIixbXV0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls2MjAsNjIzXX0sXCI/XCJdXV0sXCJJdGVyXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNTU2LDY0Ml19LG51bGwsW10sW1wiYWx0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbNTY3LDY0Ml19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzU2Nyw1NzVdfSxcIkl0ZXJfc3RhclwiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls1OTEsNTk5XX0sXCJJdGVyX3BsdXNcIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNjE1LDYyM119LFwiSXRlcl9vcHRcIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNjM4LDY0Ml19LFwiUHJlZFwiLFtdXV1dLFwiUHJlZF9ub3RcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls2NTcsNjcyXX0sbnVsbCxbXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls2NTcsNjY0XX0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls2NTcsNjYwXX0sXCJ+XCJdLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzY2MSw2NjRdfSxcIkxleFwiLFtdXV1dLFwiUHJlZF9sb29rYWhlYWRcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls2NzksNzAwXX0sbnVsbCxbXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls2NzksNjg2XX0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls2NzksNjgyXX0sXCImXCJdLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzY4Myw2ODZdfSxcIkxleFwiLFtdXV1dLFwiUHJlZFwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzY0Niw3MTBdfSxudWxsLFtdLFtcImFsdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzY1Nyw3MTBdfSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls2NTcsNjY0XX0sXCJQcmVkX25vdFwiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls2NzksNjg2XX0sXCJQcmVkX2xvb2thaGVhZFwiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls3MDcsNzEwXX0sXCJMZXhcIixbXV1dXSxcIkxleF9sZXhcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls3MjQsNzQwXX0sbnVsbCxbXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls3MjQsNzMyXX0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls3MjQsNzI3XX0sXCIjXCJdLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzcyOCw3MzJdfSxcIkJhc2VcIixbXV1dXSxcIkxleFwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzcxNCw3NTFdfSxudWxsLFtdLFtcImFsdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzcyNCw3NTFdfSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls3MjQsNzMyXX0sXCJMZXhfbGV4XCIsW11dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6Wzc0Nyw3NTFdfSxcIkJhc2VcIixbXV1dXSxcIkJhc2VfYXBwbGljYXRpb25cIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls3NjYsODI3XX0sbnVsbCxbXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls3NjYsODExXX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNzY2LDc3MV19LFwiaWRlbnRcIixbXV0sW1wib3B0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbNzcyLDc3OV19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6Wzc3Miw3NzhdfSxcIlBhcmFtc1wiLFtdXV0sW1wibm90XCIse1wic291cmNlSW50ZXJ2YWxcIjpbNzgwLDgxMV19LFtcImFsdFwiLHtcInNvdXJjZUludGVydmFsXCI6Wzc4Miw4MTBdfSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls3ODIsNzk2XX0sW1wib3B0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbNzgyLDc5Ml19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6Wzc4Miw3OTFdfSxcInJ1bGVEZXNjclwiLFtdXV0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls3OTMsNzk2XX0sXCI9XCJdXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6Wzc5OSw4MDNdfSxcIjo9XCJdLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbODA2LDgxMF19LFwiKz1cIl1dXV1dLFwiQmFzZV9yYW5nZVwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzgzNCw4ODldfSxudWxsLFtdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzgzNCw4NTZdfSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls4MzQsODQyXX0sXCJ0ZXJtaW5hbFwiLFtdXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6Wzg0Myw4NDddfSxcIi4uXCJdLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6Wzg0OCw4NTZdfSxcInRlcm1pbmFsXCIsW11dXV0sXCJCYXNlX3Rlcm1pbmFsXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbODk2LDk1NF19LG51bGwsW10sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbODk2LDkwNF19LFwidGVybWluYWxcIixbXV1dLFwiQmFzZV9wYXJlblwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6Wzk2MSwxMDE2XX0sbnVsbCxbXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls5NjEsOTcyXX0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls5NjEsOTY0XX0sXCIoXCJdLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6Wzk2NSw5NjhdfSxcIkFsdFwiLFtdXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6Wzk2OSw5NzJdfSxcIilcIl1dXSxcIkJhc2VcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls3NTUsMTAxNl19LG51bGwsW10sW1wiYWx0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbNzY2LDEwMTZdfSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls3NjYsODExXX0sXCJCYXNlX2FwcGxpY2F0aW9uXCIsW11dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzgzNCw4NTZdfSxcIkJhc2VfcmFuZ2VcIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbODk2LDkwNF19LFwiQmFzZV90ZXJtaW5hbFwiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls5NjEsOTcyXX0sXCJCYXNlX3BhcmVuXCIsW11dXV0sXCJydWxlRGVzY3JcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMDIwLDEwNzldfSxcImEgcnVsZSBkZXNjcmlwdGlvblwiLFtdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzEwNTgsMTA3OV19LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTA1OCwxMDYxXX0sXCIoXCJdLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzEwNjIsMTA3NV19LFwicnVsZURlc2NyVGV4dFwiLFtdXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzEwNzYsMTA3OV19LFwiKVwiXV1dLFwicnVsZURlc2NyVGV4dFwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzEwODMsMTExNF19LG51bGwsW10sW1wic3RhclwiLHtcInNvdXJjZUludGVydmFsXCI6WzExMDMsMTExNF19LFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzExMDQsMTExMl19LFtcIm5vdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzExMDQsMTEwOF19LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTEwNSwxMTA4XX0sXCIpXCJdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMTA5LDExMTJdfSxcImFueVwiLFtdXV1dXSxcImNhc2VOYW1lXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTExOCwxMTg2XX0sbnVsbCxbXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMTMzLDExODZdfSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzExMzMsMTEzN119LFwiLS1cIl0sW1wic3RhclwiLHtcInNvdXJjZUludGVydmFsXCI6WzExMzgsMTE1Ml19LFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzExMzksMTE1MF19LFtcIm5vdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzExMzksMTE0NF19LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTE0MCwxMTQ0XX0sXCJcXG5cIl1dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzExNDUsMTE1MF19LFwic3BhY2VcIixbXV1dXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMTUzLDExNTddfSxcIm5hbWVcIixbXV0sW1wic3RhclwiLHtcInNvdXJjZUludGVydmFsXCI6WzExNTgsMTE3Ml19LFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzExNTksMTE3MF19LFtcIm5vdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzExNTksMTE2NF19LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTE2MCwxMTY0XX0sXCJcXG5cIl1dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzExNjUsMTE3MF19LFwic3BhY2VcIixbXV1dXSxbXCJhbHRcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMTc0LDExODVdfSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzExNzQsMTE3OF19LFwiXFxuXCJdLFtcImxvb2thaGVhZFwiLHtcInNvdXJjZUludGVydmFsXCI6WzExODEsMTE4NV19LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTE4MiwxMTg1XX0sXCJ9XCJdXV1dXSxcIm5hbWVcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMTkwLDEyMzBdfSxcImEgbmFtZVwiLFtdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzEyMTEsMTIzMF19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzEyMTEsMTIyMF19LFwibmFtZUZpcnN0XCIsW11dLFtcInN0YXJcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMjIxLDEyMzBdfSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMjIxLDEyMjldfSxcIm5hbWVSZXN0XCIsW11dXV1dLFwibmFtZUZpcnN0XCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTIzNCwxMjY2XX0sbnVsbCxbXSxbXCJhbHRcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMjUwLDEyNjZdfSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzEyNTAsMTI1M119LFwiX1wiXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMjYwLDEyNjZdfSxcImxldHRlclwiLFtdXV1dLFwibmFtZVJlc3RcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMjcwLDEzMDBdfSxudWxsLFtdLFtcImFsdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzEyODUsMTMwMF19LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTI4NSwxMjg4XX0sXCJfXCJdLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzEyOTUsMTMwMF19LFwiYWxudW1cIixbXV1dXSxcImlkZW50XCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTMwNCwxMzM3XX0sXCJhbiBpZGVudGlmaWVyXCIsW10sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTMzMywxMzM3XX0sXCJuYW1lXCIsW11dXSxcInRlcm1pbmFsXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTM0MSwxMzc5XX0sbnVsbCxbXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMzU2LDEzNzldfSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzEzNTYsMTM2MF19LFwiXFxcIlwiXSxbXCJzdGFyXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTM2MSwxMzc0XX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTM2MSwxMzczXX0sXCJ0ZXJtaW5hbENoYXJcIixbXV1dLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTM3NSwxMzc5XX0sXCJcXFwiXCJdXV0sXCJ0ZXJtaW5hbENoYXJcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMzgzLDE0NDBdfSxudWxsLFtdLFtcImFsdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE0MDIsMTQ0MF19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE0MDIsMTQxMl19LFwiZXNjYXBlQ2hhclwiLFtdXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNDE5LDE0NDBdfSxbXCJub3RcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNDE5LDE0MjRdfSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE0MjAsMTQyNF19LFwiXFxcXFwiXV0sW1wibm90XCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTQyNSwxNDMwXX0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNDI2LDE0MzBdfSxcIlxcXCJcIl1dLFtcIm5vdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE0MzEsMTQzNl19LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTQzMiwxNDM2XX0sXCJcXG5cIl1dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE0MzcsMTQ0MF19LFwiYW55XCIsW11dXV1dLFwiZXNjYXBlQ2hhcl9iYWNrc2xhc2hcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNDgzLDE1MzhdfSxudWxsLFtdLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTQ4MywxNDg5XX0sXCJcXFxcXFxcXFwiXV0sXCJlc2NhcGVDaGFyX2RvdWJsZVF1b3RlXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTU0NSwxNjAyXX0sbnVsbCxbXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE1NDUsMTU1MV19LFwiXFxcXFxcXCJcIl1dLFwiZXNjYXBlQ2hhcl9zaW5nbGVRdW90ZVwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzE2MDksMTY2Nl19LG51bGwsW10sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNjA5LDE2MTVdfSxcIlxcXFwnXCJdXSxcImVzY2FwZUNoYXJfYmFja3NwYWNlXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTY3MywxNzI4XX0sbnVsbCxbXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE2NzMsMTY3OF19LFwiXFxcXGJcIl1dLFwiZXNjYXBlQ2hhcl9saW5lRmVlZFwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzE3MzUsMTc4OV19LG51bGwsW10sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNzM1LDE3NDBdfSxcIlxcXFxuXCJdXSxcImVzY2FwZUNoYXJfY2FycmlhZ2VSZXR1cm5cIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNzk2LDE4NTZdfSxudWxsLFtdLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTc5NiwxODAxXX0sXCJcXFxcclwiXV0sXCJlc2NhcGVDaGFyX3RhYlwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzE4NjMsMTkxMl19LG51bGwsW10sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxODYzLDE4NjhdfSxcIlxcXFx0XCJdXSxcImVzY2FwZUNoYXJfdW5pY29kZUVzY2FwZVwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzE5MTksMTk3OF19LG51bGwsW10sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTkxOSwxOTYwXX0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxOTE5LDE5MjRdfSxcIlxcXFx1XCJdLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE5MjUsMTkzM119LFwiaGV4RGlnaXRcIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTkzNCwxOTQyXX0sXCJoZXhEaWdpdFwiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxOTQzLDE5NTFdfSxcImhleERpZ2l0XCIsW11dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE5NTIsMTk2MF19LFwiaGV4RGlnaXRcIixbXV1dXSxcImVzY2FwZUNoYXJfaGV4RXNjYXBlXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTk4NSwyMDQwXX0sbnVsbCxbXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxOTg1LDIwMDhdfSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE5ODUsMTk5MF19LFwiXFxcXHhcIl0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTk5MSwxOTk5XX0sXCJoZXhEaWdpdFwiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMDAwLDIwMDhdfSxcImhleERpZ2l0XCIsW11dXV0sXCJlc2NhcGVDaGFyXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTQ0NCwyMDQwXX0sXCJhbiBlc2NhcGUgc2VxdWVuY2VcIixbXSxbXCJhbHRcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNDgzLDIwNDBdfSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNDgzLDE0ODldfSxcImVzY2FwZUNoYXJfYmFja3NsYXNoXCIsW11dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE1NDUsMTU1MV19LFwiZXNjYXBlQ2hhcl9kb3VibGVRdW90ZVwiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNjA5LDE2MTVdfSxcImVzY2FwZUNoYXJfc2luZ2xlUXVvdGVcIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTY3MywxNjc4XX0sXCJlc2NhcGVDaGFyX2JhY2tzcGFjZVwiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNzM1LDE3NDBdfSxcImVzY2FwZUNoYXJfbGluZUZlZWRcIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTc5NiwxODAxXX0sXCJlc2NhcGVDaGFyX2NhcnJpYWdlUmV0dXJuXCIsW11dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE4NjMsMTg2OF19LFwiZXNjYXBlQ2hhcl90YWJcIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTkxOSwxOTYwXX0sXCJlc2NhcGVDaGFyX3VuaWNvZGVFc2NhcGVcIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTk4NSwyMDA4XX0sXCJlc2NhcGVDaGFyX2hleEVzY2FwZVwiLFtdXV1dLFwic3BhY2VcIjpbXCJleHRlbmRcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMDQ0LDIwNjNdfSxudWxsLFtdLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIwNTYsMjA2M119LFwiY29tbWVudFwiLFtdXV0sXCJjb21tZW50X3NpbmdsZUxpbmVcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMDgxLDIxMThdfSxudWxsLFtdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzIwODEsMjEwM119LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjA4MSwyMDg1XX0sXCIvL1wiXSxbXCJzdGFyXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjA4NiwyMDk4XX0sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjA4NywyMDk2XX0sW1wibm90XCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjA4NywyMDkyXX0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMDg4LDIwOTJdfSxcIlxcblwiXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjA5MywyMDk2XX0sXCJhbnlcIixbXV1dXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIwOTksMjEwM119LFwiXFxuXCJdXV0sXCJjb21tZW50X211bHRpTGluZVwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzIxMjUsMjE2MV19LG51bGwsW10sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjEyNSwyMTQ3XX0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMTI1LDIxMjldfSxcIi8qXCJdLFtcInN0YXJcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMTMwLDIxNDJdfSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMTMxLDIxNDBdfSxbXCJub3RcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMTMxLDIxMzZdfSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIxMzIsMjEzNl19LFwiKi9cIl1dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIxMzcsMjE0MF19LFwiYW55XCIsW11dXV0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMTQzLDIxNDddfSxcIiovXCJdXV0sXCJjb21tZW50XCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjA2NywyMTYxXX0sbnVsbCxbXSxbXCJhbHRcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMDgxLDIxNjFdfSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMDgxLDIxMDNdfSxcImNvbW1lbnRfc2luZ2xlTGluZVwiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMTI1LDIxNDddfSxcImNvbW1lbnRfbXVsdGlMaW5lXCIsW11dXV0sXCJ0b2tlbnNcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMTY1LDIxODBdfSxudWxsLFtdLFtcInN0YXJcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMTc0LDIxODBdfSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMTc0LDIxNzldfSxcInRva2VuXCIsW11dXV0sXCJ0b2tlblwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzIxODQsMjI2MF19LG51bGwsW10sW1wiYWx0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjE5MiwyMjYwXX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjE5MiwyMjAwXX0sXCJjYXNlTmFtZVwiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMjAzLDIyMTBdfSxcImNvbW1lbnRcIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjIxMywyMjE4XX0sXCJpZGVudFwiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMjIxLDIyMjldfSxcIm9wZXJhdG9yXCIsW11dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIyMzIsMjI0M119LFwicHVuY3R1YXRpb25cIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjI0NiwyMjU0XX0sXCJ0ZXJtaW5hbFwiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMjU3LDIyNjBdfSxcImFueVwiLFtdXV1dLFwib3BlcmF0b3JcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMjY0LDIzMjldfSxudWxsLFtdLFtcImFsdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIyNzUsMjMyOV19LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjI3NSwyMjc5XX0sXCI8OlwiXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIyODIsMjI4NV19LFwiPVwiXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIyODgsMjI5Ml19LFwiOj1cIl0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMjk1LDIyOTldfSxcIis9XCJdLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjMwMiwyMzA1XX0sXCIqXCJdLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjMwOCwyMzExXX0sXCIrXCJdLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjMxNCwyMzE3XX0sXCI/XCJdLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjMyMCwyMzIzXX0sXCJ+XCJdLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjMyNiwyMzI5XX0sXCImXCJdXV0sXCJwdW5jdHVhdGlvblwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzIzMzMsMjM2OV19LG51bGwsW10sW1wiYWx0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjM0NywyMzY5XX0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMzQ3LDIzNTBdfSxcIjxcIl0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMzUzLDIzNTZdfSxcIj5cIl0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMzU5LDIzNjJdfSxcIixcIl0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMzY1LDIzNjldfSxcIi0tXCJdXV19XSk7XG4iLCJ2YXIgb2htID0gcmVxdWlyZSgnLi4nKTtcbm1vZHVsZS5leHBvcnRzID0gb2htLm1ha2VSZWNpcGUoW1wiZ3JhbW1hclwiLHtcInNvdXJjZVwiOlwiT3BlcmF0aW9uc0FuZEF0dHJpYnV0ZXMge1xcblxcbiAgQXR0cmlidXRlU2lnbmF0dXJlID1cXG4gICAgbmFtZVxcblxcbiAgT3BlcmF0aW9uU2lnbmF0dXJlID1cXG4gICAgbmFtZSBGb3JtYWxzP1xcblxcbiAgRm9ybWFsc1xcbiAgICA9IFxcXCIoXFxcIiBMaXN0T2Y8bmFtZSwgXFxcIixcXFwiPiBcXFwiKVxcXCJcXG5cXG4gIG5hbWUgIChhIG5hbWUpXFxuICAgID0gbmFtZUZpcnN0IG5hbWVSZXN0KlxcblxcbiAgbmFtZUZpcnN0XFxuICAgID0gXFxcIl9cXFwiXFxuICAgIHwgbGV0dGVyXFxuXFxuICBuYW1lUmVzdFxcbiAgICA9IFxcXCJfXFxcIlxcbiAgICB8IGFsbnVtXFxuXFxufVwifSxcIk9wZXJhdGlvbnNBbmRBdHRyaWJ1dGVzXCIsbnVsbCxcIkF0dHJpYnV0ZVNpZ25hdHVyZVwiLHtcIkF0dHJpYnV0ZVNpZ25hdHVyZVwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzI5LDU4XX0sbnVsbCxbXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls1NCw1OF19LFwibmFtZVwiLFtdXV0sXCJPcGVyYXRpb25TaWduYXR1cmVcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls2MiwxMDBdfSxudWxsLFtdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6Wzg3LDEwMF19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6Wzg3LDkxXX0sXCJuYW1lXCIsW11dLFtcIm9wdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzkyLDEwMF19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzkyLDk5XX0sXCJGb3JtYWxzXCIsW11dXV1dLFwiRm9ybWFsc1wiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzEwNCwxNDNdfSxudWxsLFtdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzExOCwxNDNdfSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzExOCwxMjFdfSxcIihcIl0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTIyLDEzOV19LFwiTGlzdE9mXCIsW1tcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzEyOSwxMzNdfSxcIm5hbWVcIixbXV0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMzUsMTM4XX0sXCIsXCJdXV0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNDAsMTQzXX0sXCIpXCJdXV0sXCJuYW1lXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTQ3LDE4N119LFwiYSBuYW1lXCIsW10sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTY4LDE4N119LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE2OCwxNzddfSxcIm5hbWVGaXJzdFwiLFtdXSxbXCJzdGFyXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTc4LDE4N119LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE3OCwxODZdfSxcIm5hbWVSZXN0XCIsW11dXV1dLFwibmFtZUZpcnN0XCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTkxLDIyM119LG51bGwsW10sW1wiYWx0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjA3LDIyM119LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjA3LDIxMF19LFwiX1wiXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMTcsMjIzXX0sXCJsZXR0ZXJcIixbXV1dXSxcIm5hbWVSZXN0XCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjI3LDI1N119LG51bGwsW10sW1wiYWx0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjQyLDI1N119LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjQyLDI0NV19LFwiX1wiXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyNTIsMjU3XX0sXCJhbG51bVwiLFtdXV1dfV0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdG9BU1Q6IHJlcXVpcmUoJy4vc2VtYW50aWNzLXRvQVNUJykuaGVscGVyLFxuICBzZW1hbnRpY3NGb3JUb0FTVDogcmVxdWlyZSgnLi9zZW1hbnRpY3MtdG9BU1QnKS5zZW1hbnRpY3Ncbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgcGV4cHJzID0gcmVxdWlyZSgnLi4vc3JjL3BleHBycycpO1xudmFyIE1hdGNoUmVzdWx0ID0gcmVxdWlyZSgnLi4vc3JjL01hdGNoUmVzdWx0Jyk7XG52YXIgR3JhbW1hciA9IHJlcXVpcmUoJy4uL3NyYy9HcmFtbWFyJyk7XG52YXIgZXh0ZW5kID0gcmVxdWlyZSgndXRpbC1leHRlbmQnKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIE9wZXJhdGlvbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBkZWZhdWx0T3BlcmF0aW9uID0ge1xuICBfdGVybWluYWw6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnByaW1pdGl2ZVZhbHVlO1xuICB9LFxuXG4gIF9ub250ZXJtaW5hbDogZnVuY3Rpb24oY2hpbGRyZW4pIHtcbiAgICB2YXIgY3Rvck5hbWUgPSB0aGlzLl9ub2RlLmN0b3JOYW1lO1xuICAgIHZhciBtYXBwaW5nID0gdGhpcy5hcmdzLm1hcHBpbmc7XG5cbiAgICAvLyB3aXRob3V0IGN1c3RvbWl6YXRpb25cbiAgICBpZiAoIW1hcHBpbmcuaGFzT3duUHJvcGVydHkoY3Rvck5hbWUpKSB7XG4gICAgICAvLyBpbnRlcm1lZGlhdGUgbm9kZVxuICAgICAgaWYgKHRoaXMuX25vZGUgaW5zdGFuY2VvZiBwZXhwcnMuQWx0IHx8IHRoaXMuX25vZGUgaW5zdGFuY2VvZiBwZXhwcnMuQXBwbHkpIHtcbiAgICAgICAgcmV0dXJuIGNoaWxkcmVuWzBdLnRvQVNUKG1hcHBpbmcpO1xuICAgICAgfVxuXG4gICAgICAvLyBsZXhpY2FsIHJ1bGVcbiAgICAgIGlmICh0aGlzLmlzTGV4aWNhbCgpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNvdXJjZVN0cmluZztcbiAgICAgIH1cblxuICAgICAgLy8gc2luZ3VsYXIgbm9kZSAoZS5nLiBvbmx5IHN1cnJvdW5kZWQgYnkgbGl0ZXJhbHMgb3IgbG9va2FoZWFkcylcbiAgICAgIHZhciByZWFsQ2hpbGRyZW4gPSBjaGlsZHJlbi5maWx0ZXIoZnVuY3Rpb24oY2hpbGQpIHtcbiAgICAgICAgcmV0dXJuICFjaGlsZC5pc1Rlcm1pbmFsKCk7XG4gICAgICB9KTtcbiAgICAgIGlmIChyZWFsQ2hpbGRyZW4ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiByZWFsQ2hpbGRyZW5bMF0udG9BU1QobWFwcGluZyk7XG4gICAgICB9XG5cbiAgICAgIC8vIHJlc3Q6IHRlcm1zIHdpdGggbXVsdGlwbGUgY2hpbGRyZW5cbiAgICB9XG5cbiAgICAvLyBkaXJlY3QgZm9yd2FyZFxuICAgIGlmICh0eXBlb2YgbWFwcGluZ1tjdG9yTmFtZV0gPT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm4gY2hpbGRyZW5bbWFwcGluZ1tjdG9yTmFtZV1dLnRvQVNUKG1hcHBpbmcpO1xuICAgIH1cblxuICAgIC8vIG5hbWVkL21hcHBlZCBjaGlsZHJlbiBvciB1bm5hbWVkIGNoaWxkcmVuICgnMCcsICcxJywgJzInLCAuLi4pXG4gICAgdmFyIHByb3BNYXAgPSBtYXBwaW5nW2N0b3JOYW1lXSB8fCBjaGlsZHJlbjtcbiAgICB2YXIgbm9kZSA9IHtcbiAgICAgIHR5cGU6IGN0b3JOYW1lXG4gICAgfTtcbiAgICBmb3IgKHZhciBwcm9wIGluIHByb3BNYXApIHtcbiAgICAgIHZhciBtYXBwZWRQcm9wID0gbWFwcGluZ1tjdG9yTmFtZV0gJiYgbWFwcGluZ1tjdG9yTmFtZV1bcHJvcF07XG4gICAgICBpZiAodHlwZW9mIG1hcHBlZFByb3AgPT09ICdudW1iZXInKSB7XG4gICAgICAgIC8vIGRpcmVjdCBmb3J3YXJkXG4gICAgICAgIG5vZGVbcHJvcF0gPSBjaGlsZHJlblttYXBwZWRQcm9wXS50b0FTVChtYXBwaW5nKTtcbiAgICAgIH0gZWxzZSBpZiAoKHR5cGVvZiBtYXBwZWRQcm9wID09PSAnc3RyaW5nJykgfHwgKHR5cGVvZiBtYXBwZWRQcm9wID09PSAnYm9vbGVhbicpIHx8XG4gICAgICAgICAgKG1hcHBlZFByb3AgPT09IG51bGwpKSB7XG4gICAgICAgIC8vIHByaW1pdGl2ZSB2YWx1ZVxuICAgICAgICBub2RlW3Byb3BdID0gbWFwcGVkUHJvcDtcbiAgICAgIH0gZWxzZSBpZiAoKHR5cGVvZiBtYXBwZWRQcm9wID09PSAnb2JqZWN0JykgJiYgKG1hcHBlZFByb3AgaW5zdGFuY2VvZiBOdW1iZXIpKSB7XG4gICAgICAgIC8vIHByaW1pdGl2ZSBudW1iZXIgKG11c3QgYmUgdW5ib3hlZClcbiAgICAgICAgbm9kZVtwcm9wXSA9IE51bWJlcihtYXBwZWRQcm9wKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG1hcHBlZFByb3AgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gY29tcHV0ZWQgdmFsdWVcbiAgICAgICAgbm9kZVtwcm9wXSA9IG1hcHBlZFByb3AuY2FsbCh0aGlzLCBjaGlsZHJlbik7XG4gICAgICB9IGVsc2UgaWYgKG1hcHBlZFByb3AgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoY2hpbGRyZW5bcHJvcF0gJiYgIWNoaWxkcmVuW3Byb3BdLmlzVGVybWluYWwoKSkge1xuICAgICAgICAgIG5vZGVbcHJvcF0gPSBjaGlsZHJlbltwcm9wXS50b0FTVChtYXBwaW5nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBkZWxldGUgcHJlZGVmaW5lZCAndHlwZScgcHJvcGVydGllcywgbGlrZSAndHlwZScsIGlmIGV4cGxpY2l0ZWx5IHJlbW92ZWRcbiAgICAgICAgICBkZWxldGUgbm9kZVtwcm9wXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbm9kZTtcbiAgfSxcblxuICBfaXRlcjogZnVuY3Rpb24oY2hpbGRyZW4pIHtcbiAgICBpZiAodGhpcy5fbm9kZS5pc09wdGlvbmFsKCkpIHtcbiAgICAgIGlmICh0aGlzLm51bUNoaWxkcmVuID09PSAwKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGNoaWxkcmVuWzBdLnRvQVNUKHRoaXMuYXJncy5tYXBwaW5nKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY2hpbGRyZW4ubWFwKGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgICByZXR1cm4gY2hpbGQudG9BU1QodGhpcy5hcmdzLm1hcHBpbmcpO1xuICAgIH0sIHRoaXMpO1xuICB9LFxuXG4gIE5vbmVtcHR5TGlzdE9mOiBmdW5jdGlvbihmaXJzdCwgc2VwLCByZXN0KSB7XG4gICAgcmV0dXJuIFtmaXJzdC50b0FTVCh0aGlzLmFyZ3MubWFwcGluZyldLmNvbmNhdChyZXN0LnRvQVNUKHRoaXMuYXJncy5tYXBwaW5nKSk7XG4gIH0sXG5cbiAgRW1wdHlMaXN0T2Y6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxufTtcblxuLy8gUmV0dXJucyBhIHBsYWluIEphdmFTY3JpcHQgb2JqZWN0IHRoYXQgaW5jbHVkZXMgYW4gYWJzdHJhY3Qgc3ludGF4IHRyZWUgKEFTVClcbi8vIGZvciB0aGUgZ2l2ZW4gbWF0Y2ggcmVzdWx0IGByZXNgIGNvbnRhaW5nIGEgY29uY3JldGUgc3ludGF4IHRyZWUgKENTVCkgYW5kIGdyYW1tYXIuXG4vLyBUaGUgb3B0aW9uYWwgYG1hcHBpbmdgIHBhcmFtZXRlciBjYW4gYmUgdXNlZCB0byBjdXN0b21pemUgaG93IHRoZSBub2RlcyBvZiB0aGUgQ1NUXG4vLyBhcmUgbWFwcGVkIHRvIHRoZSBBU1QgKHNlZSAvZG9jL2V4dHJhcy5tZCN0b2FzdG1hdGNocmVzdWx0LW1hcHBpbmcpLlxuZnVuY3Rpb24gdG9BU1QocmVzLCBtYXBwaW5nKSB7XG4gIGlmICghKHJlcyBpbnN0YW5jZW9mIE1hdGNoUmVzdWx0KSB8fCByZXMuZmFpbGVkKCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3RvQVNUKCkgZXhwZWN0cyBhIHN1Y2Nlc2Z1bGwgTWF0Y2hSZXN1bHQgYXMgZmlyc3QgcGFyYW1ldGVyJyk7XG4gIH1cblxuICBtYXBwaW5nID0gZXh0ZW5kKHt9LCBtYXBwaW5nKTtcbiAgdmFyIG9wZXJhdGlvbiA9IGV4dGVuZCh7fSwgZGVmYXVsdE9wZXJhdGlvbik7XG4gIGZvciAodmFyIHRlcm1OYW1lIGluIG1hcHBpbmcpIHtcbiAgICBpZiAodHlwZW9mIG1hcHBpbmdbdGVybU5hbWVdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBvcGVyYXRpb25bdGVybU5hbWVdID0gbWFwcGluZ1t0ZXJtTmFtZV07XG4gICAgICBkZWxldGUgbWFwcGluZ1t0ZXJtTmFtZV07XG4gICAgfVxuICB9XG4gIHZhciBnID0gcmVzLl9jc3QuZ3JhbW1hcjtcbiAgdmFyIHMgPSBnLmNyZWF0ZVNlbWFudGljcygpLmFkZE9wZXJhdGlvbigndG9BU1QobWFwcGluZyknLCBvcGVyYXRpb24pO1xuICByZXR1cm4gcyhyZXMpLnRvQVNUKG1hcHBpbmcpO1xufVxuXG4vLyBSZXR1cm5zIGEgc2VtYW50aWNzIGNvbnRhaW5nIHRoZSB0b0FTVChtYXBwaW5nKSBvcGVyYXRpb24gZm9yIHRoZSBnaXZlbiBncmFtbWFyIGcuXG5mdW5jdGlvbiBzZW1hbnRpY3NGb3JUb0FTVChnKSB7XG4gIGlmICghKGcgaW5zdGFuY2VvZiBHcmFtbWFyKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2VtYW50aWNzVG9BU1QoKSBleHBlY3RzIGEgR3JhbW1hciBhcyBwYXJhbWV0ZXInKTtcbiAgfVxuXG4gIHJldHVybiBnLmNyZWF0ZVNlbWFudGljcygpLmFkZE9wZXJhdGlvbigndG9BU1QobWFwcGluZyknLCBkZWZhdWx0T3BlcmF0aW9uKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGhlbHBlcjogdG9BU1QsXG4gIHNlbWFudGljczogc2VtYW50aWNzRm9yVG9BU1Rcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBhc3NpZ24gICAgICAgID0gcmVxdWlyZSgnZXM1LWV4dC9vYmplY3QvYXNzaWduJylcbiAgLCBub3JtYWxpemVPcHRzID0gcmVxdWlyZSgnZXM1LWV4dC9vYmplY3Qvbm9ybWFsaXplLW9wdGlvbnMnKVxuICAsIGlzQ2FsbGFibGUgICAgPSByZXF1aXJlKCdlczUtZXh0L29iamVjdC9pcy1jYWxsYWJsZScpXG4gICwgY29udGFpbnMgICAgICA9IHJlcXVpcmUoJ2VzNS1leHQvc3RyaW5nLyMvY29udGFpbnMnKVxuXG4gICwgZDtcblxuZCA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGRzY3IsIHZhbHVlLyosIG9wdGlvbnMqLykge1xuXHR2YXIgYywgZSwgdywgb3B0aW9ucywgZGVzYztcblx0aWYgKChhcmd1bWVudHMubGVuZ3RoIDwgMikgfHwgKHR5cGVvZiBkc2NyICE9PSAnc3RyaW5nJykpIHtcblx0XHRvcHRpb25zID0gdmFsdWU7XG5cdFx0dmFsdWUgPSBkc2NyO1xuXHRcdGRzY3IgPSBudWxsO1xuXHR9IGVsc2Uge1xuXHRcdG9wdGlvbnMgPSBhcmd1bWVudHNbMl07XG5cdH1cblx0aWYgKGRzY3IgPT0gbnVsbCkge1xuXHRcdGMgPSB3ID0gdHJ1ZTtcblx0XHRlID0gZmFsc2U7XG5cdH0gZWxzZSB7XG5cdFx0YyA9IGNvbnRhaW5zLmNhbGwoZHNjciwgJ2MnKTtcblx0XHRlID0gY29udGFpbnMuY2FsbChkc2NyLCAnZScpO1xuXHRcdHcgPSBjb250YWlucy5jYWxsKGRzY3IsICd3Jyk7XG5cdH1cblxuXHRkZXNjID0geyB2YWx1ZTogdmFsdWUsIGNvbmZpZ3VyYWJsZTogYywgZW51bWVyYWJsZTogZSwgd3JpdGFibGU6IHcgfTtcblx0cmV0dXJuICFvcHRpb25zID8gZGVzYyA6IGFzc2lnbihub3JtYWxpemVPcHRzKG9wdGlvbnMpLCBkZXNjKTtcbn07XG5cbmQuZ3MgPSBmdW5jdGlvbiAoZHNjciwgZ2V0LCBzZXQvKiwgb3B0aW9ucyovKSB7XG5cdHZhciBjLCBlLCBvcHRpb25zLCBkZXNjO1xuXHRpZiAodHlwZW9mIGRzY3IgIT09ICdzdHJpbmcnKSB7XG5cdFx0b3B0aW9ucyA9IHNldDtcblx0XHRzZXQgPSBnZXQ7XG5cdFx0Z2V0ID0gZHNjcjtcblx0XHRkc2NyID0gbnVsbDtcblx0fSBlbHNlIHtcblx0XHRvcHRpb25zID0gYXJndW1lbnRzWzNdO1xuXHR9XG5cdGlmIChnZXQgPT0gbnVsbCkge1xuXHRcdGdldCA9IHVuZGVmaW5lZDtcblx0fSBlbHNlIGlmICghaXNDYWxsYWJsZShnZXQpKSB7XG5cdFx0b3B0aW9ucyA9IGdldDtcblx0XHRnZXQgPSBzZXQgPSB1bmRlZmluZWQ7XG5cdH0gZWxzZSBpZiAoc2V0ID09IG51bGwpIHtcblx0XHRzZXQgPSB1bmRlZmluZWQ7XG5cdH0gZWxzZSBpZiAoIWlzQ2FsbGFibGUoc2V0KSkge1xuXHRcdG9wdGlvbnMgPSBzZXQ7XG5cdFx0c2V0ID0gdW5kZWZpbmVkO1xuXHR9XG5cdGlmIChkc2NyID09IG51bGwpIHtcblx0XHRjID0gdHJ1ZTtcblx0XHRlID0gZmFsc2U7XG5cdH0gZWxzZSB7XG5cdFx0YyA9IGNvbnRhaW5zLmNhbGwoZHNjciwgJ2MnKTtcblx0XHRlID0gY29udGFpbnMuY2FsbChkc2NyLCAnZScpO1xuXHR9XG5cblx0ZGVzYyA9IHsgZ2V0OiBnZXQsIHNldDogc2V0LCBjb25maWd1cmFibGU6IGMsIGVudW1lcmFibGU6IGUgfTtcblx0cmV0dXJuICFvcHRpb25zID8gZGVzYyA6IGFzc2lnbihub3JtYWxpemVPcHRzKG9wdGlvbnMpLCBkZXNjKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9pcy1pbXBsZW1lbnRlZCcpKClcblx0PyBPYmplY3QuYXNzaWduXG5cdDogcmVxdWlyZSgnLi9zaGltJyk7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgYXNzaWduID0gT2JqZWN0LmFzc2lnbiwgb2JqO1xuXHRpZiAodHlwZW9mIGFzc2lnbiAhPT0gJ2Z1bmN0aW9uJykgcmV0dXJuIGZhbHNlO1xuXHRvYmogPSB7IGZvbzogJ3JheicgfTtcblx0YXNzaWduKG9iaiwgeyBiYXI6ICdkd2EnIH0sIHsgdHJ6eTogJ3RyenknIH0pO1xuXHRyZXR1cm4gKG9iai5mb28gKyBvYmouYmFyICsgb2JqLnRyenkpID09PSAncmF6ZHdhdHJ6eSc7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIga2V5cyAgPSByZXF1aXJlKCcuLi9rZXlzJylcbiAgLCB2YWx1ZSA9IHJlcXVpcmUoJy4uL3ZhbGlkLXZhbHVlJylcblxuICAsIG1heCA9IE1hdGgubWF4O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChkZXN0LCBzcmMvKiwg4oCmc3JjbiovKSB7XG5cdHZhciBlcnJvciwgaSwgbCA9IG1heChhcmd1bWVudHMubGVuZ3RoLCAyKSwgYXNzaWduO1xuXHRkZXN0ID0gT2JqZWN0KHZhbHVlKGRlc3QpKTtcblx0YXNzaWduID0gZnVuY3Rpb24gKGtleSkge1xuXHRcdHRyeSB7IGRlc3Rba2V5XSA9IHNyY1trZXldOyB9IGNhdGNoIChlKSB7XG5cdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGU7XG5cdFx0fVxuXHR9O1xuXHRmb3IgKGkgPSAxOyBpIDwgbDsgKytpKSB7XG5cdFx0c3JjID0gYXJndW1lbnRzW2ldO1xuXHRcdGtleXMoc3JjKS5mb3JFYWNoKGFzc2lnbik7XG5cdH1cblx0aWYgKGVycm9yICE9PSB1bmRlZmluZWQpIHRocm93IGVycm9yO1xuXHRyZXR1cm4gZGVzdDtcbn07XG4iLCIvLyBEZXByZWNhdGVkXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nOyB9O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vaXMtaW1wbGVtZW50ZWQnKSgpXG5cdD8gT2JqZWN0LmtleXNcblx0OiByZXF1aXJlKCcuL3NoaW0nKTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG5cdHRyeSB7XG5cdFx0T2JqZWN0LmtleXMoJ3ByaW1pdGl2ZScpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlKSB7IHJldHVybiBmYWxzZTsgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGtleXMgPSBPYmplY3Qua2V5cztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0KSB7XG5cdHJldHVybiBrZXlzKG9iamVjdCA9PSBudWxsID8gb2JqZWN0IDogT2JqZWN0KG9iamVjdCkpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGZvckVhY2ggPSBBcnJheS5wcm90b3R5cGUuZm9yRWFjaCwgY3JlYXRlID0gT2JqZWN0LmNyZWF0ZTtcblxudmFyIHByb2Nlc3MgPSBmdW5jdGlvbiAoc3JjLCBvYmopIHtcblx0dmFyIGtleTtcblx0Zm9yIChrZXkgaW4gc3JjKSBvYmpba2V5XSA9IHNyY1trZXldO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3B0aW9ucy8qLCDigKZvcHRpb25zKi8pIHtcblx0dmFyIHJlc3VsdCA9IGNyZWF0ZShudWxsKTtcblx0Zm9yRWFjaC5jYWxsKGFyZ3VtZW50cywgZnVuY3Rpb24gKG9wdGlvbnMpIHtcblx0XHRpZiAob3B0aW9ucyA9PSBudWxsKSByZXR1cm47XG5cdFx0cHJvY2VzcyhPYmplY3Qob3B0aW9ucyksIHJlc3VsdCk7XG5cdH0pO1xuXHRyZXR1cm4gcmVzdWx0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0aWYgKHZhbHVlID09IG51bGwpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgdXNlIG51bGwgb3IgdW5kZWZpbmVkXCIpO1xuXHRyZXR1cm4gdmFsdWU7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vaXMtaW1wbGVtZW50ZWQnKSgpXG5cdD8gU3RyaW5nLnByb3RvdHlwZS5jb250YWluc1xuXHQ6IHJlcXVpcmUoJy4vc2hpbScpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3RyID0gJ3JhemR3YXRyenknO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcblx0aWYgKHR5cGVvZiBzdHIuY29udGFpbnMgIT09ICdmdW5jdGlvbicpIHJldHVybiBmYWxzZTtcblx0cmV0dXJuICgoc3RyLmNvbnRhaW5zKCdkd2EnKSA9PT0gdHJ1ZSkgJiYgKHN0ci5jb250YWlucygnZm9vJykgPT09IGZhbHNlKSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW5kZXhPZiA9IFN0cmluZy5wcm90b3R5cGUuaW5kZXhPZjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc2VhcmNoU3RyaW5nLyosIHBvc2l0aW9uKi8pIHtcblx0cmV0dXJuIGluZGV4T2YuY2FsbCh0aGlzLCBzZWFyY2hTdHJpbmcsIGFyZ3VtZW50c1sxXSkgPiAtMTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9pcy1pbXBsZW1lbnRlZCcpKCkgPyBTeW1ib2wgOiByZXF1aXJlKCcuL3BvbHlmaWxsJyk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB2YWxpZFR5cGVzID0geyBvYmplY3Q6IHRydWUsIHN5bWJvbDogdHJ1ZSB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIHN5bWJvbDtcblx0aWYgKHR5cGVvZiBTeW1ib2wgIT09ICdmdW5jdGlvbicpIHJldHVybiBmYWxzZTtcblx0c3ltYm9sID0gU3ltYm9sKCd0ZXN0IHN5bWJvbCcpO1xuXHR0cnkgeyBTdHJpbmcoc3ltYm9sKTsgfSBjYXRjaCAoZSkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHQvLyBSZXR1cm4gJ3RydWUnIGFsc28gZm9yIHBvbHlmaWxsc1xuXHRpZiAoIXZhbGlkVHlwZXNbdHlwZW9mIFN5bWJvbC5pdGVyYXRvcl0pIHJldHVybiBmYWxzZTtcblx0aWYgKCF2YWxpZFR5cGVzW3R5cGVvZiBTeW1ib2wudG9QcmltaXRpdmVdKSByZXR1cm4gZmFsc2U7XG5cdGlmICghdmFsaWRUeXBlc1t0eXBlb2YgU3ltYm9sLnRvU3RyaW5nVGFnXSkgcmV0dXJuIGZhbHNlO1xuXG5cdHJldHVybiB0cnVlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoeCkge1xuXHRpZiAoIXgpIHJldHVybiBmYWxzZTtcblx0aWYgKHR5cGVvZiB4ID09PSAnc3ltYm9sJykgcmV0dXJuIHRydWU7XG5cdGlmICgheC5jb25zdHJ1Y3RvcikgcmV0dXJuIGZhbHNlO1xuXHRpZiAoeC5jb25zdHJ1Y3Rvci5uYW1lICE9PSAnU3ltYm9sJykgcmV0dXJuIGZhbHNlO1xuXHRyZXR1cm4gKHhbeC5jb25zdHJ1Y3Rvci50b1N0cmluZ1RhZ10gPT09ICdTeW1ib2wnKTtcbn07XG4iLCIvLyBFUzIwMTUgU3ltYm9sIHBvbHlmaWxsIGZvciBlbnZpcm9ubWVudHMgdGhhdCBkbyBub3Qgc3VwcG9ydCBpdCAob3IgcGFydGlhbGx5IHN1cHBvcnQgaXQpXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGQgICAgICAgICAgICAgID0gcmVxdWlyZSgnZCcpXG4gICwgdmFsaWRhdGVTeW1ib2wgPSByZXF1aXJlKCcuL3ZhbGlkYXRlLXN5bWJvbCcpXG5cbiAgLCBjcmVhdGUgPSBPYmplY3QuY3JlYXRlLCBkZWZpbmVQcm9wZXJ0aWVzID0gT2JqZWN0LmRlZmluZVByb3BlcnRpZXNcbiAgLCBkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSwgb2JqUHJvdG90eXBlID0gT2JqZWN0LnByb3RvdHlwZVxuICAsIE5hdGl2ZVN5bWJvbCwgU3ltYm9sUG9seWZpbGwsIEhpZGRlblN5bWJvbCwgZ2xvYmFsU3ltYm9scyA9IGNyZWF0ZShudWxsKVxuICAsIGlzTmF0aXZlU2FmZTtcblxuaWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicpIHtcblx0TmF0aXZlU3ltYm9sID0gU3ltYm9sO1xuXHR0cnkge1xuXHRcdFN0cmluZyhOYXRpdmVTeW1ib2woKSk7XG5cdFx0aXNOYXRpdmVTYWZlID0gdHJ1ZTtcblx0fSBjYXRjaCAoaWdub3JlKSB7fVxufVxuXG52YXIgZ2VuZXJhdGVOYW1lID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIGNyZWF0ZWQgPSBjcmVhdGUobnVsbCk7XG5cdHJldHVybiBmdW5jdGlvbiAoZGVzYykge1xuXHRcdHZhciBwb3N0Zml4ID0gMCwgbmFtZSwgaWUxMUJ1Z1dvcmthcm91bmQ7XG5cdFx0d2hpbGUgKGNyZWF0ZWRbZGVzYyArIChwb3N0Zml4IHx8ICcnKV0pICsrcG9zdGZpeDtcblx0XHRkZXNjICs9IChwb3N0Zml4IHx8ICcnKTtcblx0XHRjcmVhdGVkW2Rlc2NdID0gdHJ1ZTtcblx0XHRuYW1lID0gJ0BAJyArIGRlc2M7XG5cdFx0ZGVmaW5lUHJvcGVydHkob2JqUHJvdG90eXBlLCBuYW1lLCBkLmdzKG51bGwsIGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdFx0Ly8gRm9yIElFMTEgaXNzdWUgc2VlOlxuXHRcdFx0Ly8gaHR0cHM6Ly9jb25uZWN0Lm1pY3Jvc29mdC5jb20vSUUvZmVlZGJhY2tkZXRhaWwvdmlldy8xOTI4NTA4L1xuXHRcdFx0Ly8gICAgaWUxMS1icm9rZW4tZ2V0dGVycy1vbi1kb20tb2JqZWN0c1xuXHRcdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL21lZGlrb28vZXM2LXN5bWJvbC9pc3N1ZXMvMTJcblx0XHRcdGlmIChpZTExQnVnV29ya2Fyb3VuZCkgcmV0dXJuO1xuXHRcdFx0aWUxMUJ1Z1dvcmthcm91bmQgPSB0cnVlO1xuXHRcdFx0ZGVmaW5lUHJvcGVydHkodGhpcywgbmFtZSwgZCh2YWx1ZSkpO1xuXHRcdFx0aWUxMUJ1Z1dvcmthcm91bmQgPSBmYWxzZTtcblx0XHR9KSk7XG5cdFx0cmV0dXJuIG5hbWU7XG5cdH07XG59KCkpO1xuXG4vLyBJbnRlcm5hbCBjb25zdHJ1Y3RvciAobm90IG9uZSBleHBvc2VkKSBmb3IgY3JlYXRpbmcgU3ltYm9sIGluc3RhbmNlcy5cbi8vIFRoaXMgb25lIGlzIHVzZWQgdG8gZW5zdXJlIHRoYXQgYHNvbWVTeW1ib2wgaW5zdGFuY2VvZiBTeW1ib2xgIGFsd2F5cyByZXR1cm4gZmFsc2VcbkhpZGRlblN5bWJvbCA9IGZ1bmN0aW9uIFN5bWJvbChkZXNjcmlwdGlvbikge1xuXHRpZiAodGhpcyBpbnN0YW5jZW9mIEhpZGRlblN5bWJvbCkgdGhyb3cgbmV3IFR5cGVFcnJvcignVHlwZUVycm9yOiBTeW1ib2wgaXMgbm90IGEgY29uc3RydWN0b3InKTtcblx0cmV0dXJuIFN5bWJvbFBvbHlmaWxsKGRlc2NyaXB0aW9uKTtcbn07XG5cbi8vIEV4cG9zZWQgYFN5bWJvbGAgY29uc3RydWN0b3Jcbi8vIChyZXR1cm5zIGluc3RhbmNlcyBvZiBIaWRkZW5TeW1ib2wpXG5tb2R1bGUuZXhwb3J0cyA9IFN5bWJvbFBvbHlmaWxsID0gZnVuY3Rpb24gU3ltYm9sKGRlc2NyaXB0aW9uKSB7XG5cdHZhciBzeW1ib2w7XG5cdGlmICh0aGlzIGluc3RhbmNlb2YgU3ltYm9sKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdUeXBlRXJyb3I6IFN5bWJvbCBpcyBub3QgYSBjb25zdHJ1Y3RvcicpO1xuXHRpZiAoaXNOYXRpdmVTYWZlKSByZXR1cm4gTmF0aXZlU3ltYm9sKGRlc2NyaXB0aW9uKTtcblx0c3ltYm9sID0gY3JlYXRlKEhpZGRlblN5bWJvbC5wcm90b3R5cGUpO1xuXHRkZXNjcmlwdGlvbiA9IChkZXNjcmlwdGlvbiA9PT0gdW5kZWZpbmVkID8gJycgOiBTdHJpbmcoZGVzY3JpcHRpb24pKTtcblx0cmV0dXJuIGRlZmluZVByb3BlcnRpZXMoc3ltYm9sLCB7XG5cdFx0X19kZXNjcmlwdGlvbl9fOiBkKCcnLCBkZXNjcmlwdGlvbiksXG5cdFx0X19uYW1lX186IGQoJycsIGdlbmVyYXRlTmFtZShkZXNjcmlwdGlvbikpXG5cdH0pO1xufTtcbmRlZmluZVByb3BlcnRpZXMoU3ltYm9sUG9seWZpbGwsIHtcblx0Zm9yOiBkKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRpZiAoZ2xvYmFsU3ltYm9sc1trZXldKSByZXR1cm4gZ2xvYmFsU3ltYm9sc1trZXldO1xuXHRcdHJldHVybiAoZ2xvYmFsU3ltYm9sc1trZXldID0gU3ltYm9sUG9seWZpbGwoU3RyaW5nKGtleSkpKTtcblx0fSksXG5cdGtleUZvcjogZChmdW5jdGlvbiAocykge1xuXHRcdHZhciBrZXk7XG5cdFx0dmFsaWRhdGVTeW1ib2wocyk7XG5cdFx0Zm9yIChrZXkgaW4gZ2xvYmFsU3ltYm9scykgaWYgKGdsb2JhbFN5bWJvbHNba2V5XSA9PT0gcykgcmV0dXJuIGtleTtcblx0fSksXG5cblx0Ly8gSWYgdGhlcmUncyBuYXRpdmUgaW1wbGVtZW50YXRpb24gb2YgZ2l2ZW4gc3ltYm9sLCBsZXQncyBmYWxsYmFjayB0byBpdFxuXHQvLyB0byBlbnN1cmUgcHJvcGVyIGludGVyb3BlcmFiaWxpdHkgd2l0aCBvdGhlciBuYXRpdmUgZnVuY3Rpb25zIGUuZy4gQXJyYXkuZnJvbVxuXHRoYXNJbnN0YW5jZTogZCgnJywgKE5hdGl2ZVN5bWJvbCAmJiBOYXRpdmVTeW1ib2wuaGFzSW5zdGFuY2UpIHx8IFN5bWJvbFBvbHlmaWxsKCdoYXNJbnN0YW5jZScpKSxcblx0aXNDb25jYXRTcHJlYWRhYmxlOiBkKCcnLCAoTmF0aXZlU3ltYm9sICYmIE5hdGl2ZVN5bWJvbC5pc0NvbmNhdFNwcmVhZGFibGUpIHx8XG5cdFx0U3ltYm9sUG9seWZpbGwoJ2lzQ29uY2F0U3ByZWFkYWJsZScpKSxcblx0aXRlcmF0b3I6IGQoJycsIChOYXRpdmVTeW1ib2wgJiYgTmF0aXZlU3ltYm9sLml0ZXJhdG9yKSB8fCBTeW1ib2xQb2x5ZmlsbCgnaXRlcmF0b3InKSksXG5cdG1hdGNoOiBkKCcnLCAoTmF0aXZlU3ltYm9sICYmIE5hdGl2ZVN5bWJvbC5tYXRjaCkgfHwgU3ltYm9sUG9seWZpbGwoJ21hdGNoJykpLFxuXHRyZXBsYWNlOiBkKCcnLCAoTmF0aXZlU3ltYm9sICYmIE5hdGl2ZVN5bWJvbC5yZXBsYWNlKSB8fCBTeW1ib2xQb2x5ZmlsbCgncmVwbGFjZScpKSxcblx0c2VhcmNoOiBkKCcnLCAoTmF0aXZlU3ltYm9sICYmIE5hdGl2ZVN5bWJvbC5zZWFyY2gpIHx8IFN5bWJvbFBvbHlmaWxsKCdzZWFyY2gnKSksXG5cdHNwZWNpZXM6IGQoJycsIChOYXRpdmVTeW1ib2wgJiYgTmF0aXZlU3ltYm9sLnNwZWNpZXMpIHx8IFN5bWJvbFBvbHlmaWxsKCdzcGVjaWVzJykpLFxuXHRzcGxpdDogZCgnJywgKE5hdGl2ZVN5bWJvbCAmJiBOYXRpdmVTeW1ib2wuc3BsaXQpIHx8IFN5bWJvbFBvbHlmaWxsKCdzcGxpdCcpKSxcblx0dG9QcmltaXRpdmU6IGQoJycsIChOYXRpdmVTeW1ib2wgJiYgTmF0aXZlU3ltYm9sLnRvUHJpbWl0aXZlKSB8fCBTeW1ib2xQb2x5ZmlsbCgndG9QcmltaXRpdmUnKSksXG5cdHRvU3RyaW5nVGFnOiBkKCcnLCAoTmF0aXZlU3ltYm9sICYmIE5hdGl2ZVN5bWJvbC50b1N0cmluZ1RhZykgfHwgU3ltYm9sUG9seWZpbGwoJ3RvU3RyaW5nVGFnJykpLFxuXHR1bnNjb3BhYmxlczogZCgnJywgKE5hdGl2ZVN5bWJvbCAmJiBOYXRpdmVTeW1ib2wudW5zY29wYWJsZXMpIHx8IFN5bWJvbFBvbHlmaWxsKCd1bnNjb3BhYmxlcycpKVxufSk7XG5cbi8vIEludGVybmFsIHR3ZWFrcyBmb3IgcmVhbCBzeW1ib2wgcHJvZHVjZXJcbmRlZmluZVByb3BlcnRpZXMoSGlkZGVuU3ltYm9sLnByb3RvdHlwZSwge1xuXHRjb25zdHJ1Y3RvcjogZChTeW1ib2xQb2x5ZmlsbCksXG5cdHRvU3RyaW5nOiBkKCcnLCBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9fbmFtZV9fOyB9KVxufSk7XG5cbi8vIFByb3BlciBpbXBsZW1lbnRhdGlvbiBvZiBtZXRob2RzIGV4cG9zZWQgb24gU3ltYm9sLnByb3RvdHlwZVxuLy8gVGhleSB3b24ndCBiZSBhY2Nlc3NpYmxlIG9uIHByb2R1Y2VkIHN5bWJvbCBpbnN0YW5jZXMgYXMgdGhleSBkZXJpdmUgZnJvbSBIaWRkZW5TeW1ib2wucHJvdG90eXBlXG5kZWZpbmVQcm9wZXJ0aWVzKFN5bWJvbFBvbHlmaWxsLnByb3RvdHlwZSwge1xuXHR0b1N0cmluZzogZChmdW5jdGlvbiAoKSB7IHJldHVybiAnU3ltYm9sICgnICsgdmFsaWRhdGVTeW1ib2wodGhpcykuX19kZXNjcmlwdGlvbl9fICsgJyknOyB9KSxcblx0dmFsdWVPZjogZChmdW5jdGlvbiAoKSB7IHJldHVybiB2YWxpZGF0ZVN5bWJvbCh0aGlzKTsgfSlcbn0pO1xuZGVmaW5lUHJvcGVydHkoU3ltYm9sUG9seWZpbGwucHJvdG90eXBlLCBTeW1ib2xQb2x5ZmlsbC50b1ByaW1pdGl2ZSwgZCgnJywgZnVuY3Rpb24gKCkge1xuXHR2YXIgc3ltYm9sID0gdmFsaWRhdGVTeW1ib2wodGhpcyk7XG5cdGlmICh0eXBlb2Ygc3ltYm9sID09PSAnc3ltYm9sJykgcmV0dXJuIHN5bWJvbDtcblx0cmV0dXJuIHN5bWJvbC50b1N0cmluZygpO1xufSkpO1xuZGVmaW5lUHJvcGVydHkoU3ltYm9sUG9seWZpbGwucHJvdG90eXBlLCBTeW1ib2xQb2x5ZmlsbC50b1N0cmluZ1RhZywgZCgnYycsICdTeW1ib2wnKSk7XG5cbi8vIFByb3BlciBpbXBsZW1lbnRhdG9uIG9mIHRvUHJpbWl0aXZlIGFuZCB0b1N0cmluZ1RhZyBmb3IgcmV0dXJuZWQgc3ltYm9sIGluc3RhbmNlc1xuZGVmaW5lUHJvcGVydHkoSGlkZGVuU3ltYm9sLnByb3RvdHlwZSwgU3ltYm9sUG9seWZpbGwudG9TdHJpbmdUYWcsXG5cdGQoJ2MnLCBTeW1ib2xQb2x5ZmlsbC5wcm90b3R5cGVbU3ltYm9sUG9seWZpbGwudG9TdHJpbmdUYWddKSk7XG5cbi8vIE5vdGU6IEl0J3MgaW1wb3J0YW50IHRvIGRlZmluZSBgdG9QcmltaXRpdmVgIGFzIGxhc3Qgb25lLCBhcyBzb21lIGltcGxlbWVudGF0aW9uc1xuLy8gaW1wbGVtZW50IGB0b1ByaW1pdGl2ZWAgbmF0aXZlbHkgd2l0aG91dCBpbXBsZW1lbnRpbmcgYHRvU3RyaW5nVGFnYCAob3Igb3RoZXIgc3BlY2lmaWVkIHN5bWJvbHMpXG4vLyBBbmQgdGhhdCBtYXkgaW52b2tlIGVycm9yIGluIGRlZmluaXRpb24gZmxvdzpcbi8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL21lZGlrb28vZXM2LXN5bWJvbC9pc3N1ZXMvMTMjaXNzdWVjb21tZW50LTE2NDE0NjE0OVxuZGVmaW5lUHJvcGVydHkoSGlkZGVuU3ltYm9sLnByb3RvdHlwZSwgU3ltYm9sUG9seWZpbGwudG9QcmltaXRpdmUsXG5cdGQoJ2MnLCBTeW1ib2xQb2x5ZmlsbC5wcm90b3R5cGVbU3ltYm9sUG9seWZpbGwudG9QcmltaXRpdmVdKSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpc1N5bWJvbCA9IHJlcXVpcmUoJy4vaXMtc3ltYm9sJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdGlmICghaXNTeW1ib2wodmFsdWUpKSB0aHJvdyBuZXcgVHlwZUVycm9yKHZhbHVlICsgXCIgaXMgbm90IGEgc3ltYm9sXCIpO1xuXHRyZXR1cm4gdmFsdWU7XG59O1xuIiwiaWYgKHR5cGVvZiBPYmplY3QuY3JlYXRlID09PSAnZnVuY3Rpb24nKSB7XG4gIC8vIGltcGxlbWVudGF0aW9uIGZyb20gc3RhbmRhcmQgbm9kZS5qcyAndXRpbCcgbW9kdWxlXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5oZXJpdHMoY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3JcbiAgICBjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDdG9yLnByb3RvdHlwZSwge1xuICAgICAgY29uc3RydWN0b3I6IHtcbiAgICAgICAgdmFsdWU6IGN0b3IsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICB9XG4gICAgfSk7XG4gIH07XG59IGVsc2Uge1xuICAvLyBvbGQgc2Nob29sIHNoaW0gZm9yIG9sZCBicm93c2Vyc1xuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yXG4gICAgdmFyIFRlbXBDdG9yID0gZnVuY3Rpb24gKCkge31cbiAgICBUZW1wQ3Rvci5wcm90b3R5cGUgPSBzdXBlckN0b3IucHJvdG90eXBlXG4gICAgY3Rvci5wcm90b3R5cGUgPSBuZXcgVGVtcEN0b3IoKVxuICAgIGN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY3RvclxuICB9XG59XG4iLCIvKiFcbiAqIERldGVybWluZSBpZiBhbiBvYmplY3QgaXMgYSBCdWZmZXJcbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8ZmVyb3NzQGZlcm9zcy5vcmc+IDxodHRwOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuXG4vLyBUaGUgX2lzQnVmZmVyIGNoZWNrIGlzIGZvciBTYWZhcmkgNS03IHN1cHBvcnQsIGJlY2F1c2UgaXQncyBtaXNzaW5nXG4vLyBPYmplY3QucHJvdG90eXBlLmNvbnN0cnVjdG9yLiBSZW1vdmUgdGhpcyBldmVudHVhbGx5XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAhPSBudWxsICYmIChpc0J1ZmZlcihvYmopIHx8IGlzU2xvd0J1ZmZlcihvYmopIHx8ICEhb2JqLl9pc0J1ZmZlcilcbn1cblxuZnVuY3Rpb24gaXNCdWZmZXIgKG9iaikge1xuICByZXR1cm4gISFvYmouY29uc3RydWN0b3IgJiYgdHlwZW9mIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIob2JqKVxufVxuXG4vLyBGb3IgTm9kZSB2MC4xMCBzdXBwb3J0LiBSZW1vdmUgdGhpcyBldmVudHVhbGx5LlxuZnVuY3Rpb24gaXNTbG93QnVmZmVyIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmoucmVhZEZsb2F0TEUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIG9iai5zbGljZSA9PT0gJ2Z1bmN0aW9uJyAmJiBpc0J1ZmZlcihvYmouc2xpY2UoMCwgMCkpXG59XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxubW9kdWxlLmV4cG9ydHMgPSBleHRlbmQ7XG5mdW5jdGlvbiBleHRlbmQob3JpZ2luLCBhZGQpIHtcbiAgLy8gRG9uJ3QgZG8gYW55dGhpbmcgaWYgYWRkIGlzbid0IGFuIG9iamVjdFxuICBpZiAoIWFkZCB8fCB0eXBlb2YgYWRkICE9PSAnb2JqZWN0JykgcmV0dXJuIG9yaWdpbjtcblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGFkZCk7XG4gIHZhciBpID0ga2V5cy5sZW5ndGg7XG4gIHdoaWxlIChpLS0pIHtcbiAgICBvcmlnaW5ba2V5c1tpXV0gPSBhZGRba2V5c1tpXV07XG4gIH1cbiAgcmV0dXJuIG9yaWdpbjtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBHcmFtbWFyRGVjbCA9IHJlcXVpcmUoJy4vR3JhbW1hckRlY2wnKTtcbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUHJpdmF0ZSBzdHVmZlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gQnVpbGRlcigpIHt9XG5cbkJ1aWxkZXIucHJvdG90eXBlID0ge1xuICBjdXJyZW50RGVjbDogbnVsbCxcblxuICBuZXdHcmFtbWFyOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBHcmFtbWFyRGVjbChuYW1lKTtcbiAgfSxcblxuICBncmFtbWFyOiBmdW5jdGlvbihtZXRhSW5mbywgbmFtZSwgc3VwZXJHcmFtbWFyLCBkZWZhdWx0U3RhcnRSdWxlLCBydWxlcykge1xuICAgIHZhciBnRGVjbCA9IG5ldyBHcmFtbWFyRGVjbChuYW1lKTtcbiAgICBpZiAoc3VwZXJHcmFtbWFyKSB7XG4gICAgICBnRGVjbC53aXRoU3VwZXJHcmFtbWFyKHRoaXMuZnJvbVJlY2lwZShzdXBlckdyYW1tYXIpKTtcbiAgICB9XG4gICAgaWYgKGRlZmF1bHRTdGFydFJ1bGUpIHtcbiAgICAgIGdEZWNsLndpdGhEZWZhdWx0U3RhcnRSdWxlKGRlZmF1bHRTdGFydFJ1bGUpO1xuICAgIH1cbiAgICBpZiAobWV0YUluZm8gJiYgbWV0YUluZm8uc291cmNlKSB7XG4gICAgICBnRGVjbC53aXRoU291cmNlKG1ldGFJbmZvLnNvdXJjZSk7XG4gICAgfVxuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMuY3VycmVudERlY2wgPSBnRGVjbDtcbiAgICBPYmplY3Qua2V5cyhydWxlcykuZm9yRWFjaChmdW5jdGlvbihydWxlTmFtZSkge1xuICAgICAgdmFyIHJ1bGVSZWNpcGUgPSBydWxlc1tydWxlTmFtZV07XG5cbiAgICAgIHZhciBhY3Rpb24gPSBydWxlUmVjaXBlWzBdOyAvLyBkZWZpbmUvZXh0ZW5kL292ZXJyaWRlXG4gICAgICB2YXIgbWV0YUluZm8gPSBydWxlUmVjaXBlWzFdO1xuICAgICAgdmFyIGRlc2NyaXB0aW9uID0gcnVsZVJlY2lwZVsyXTtcbiAgICAgIHZhciBmb3JtYWxzID0gcnVsZVJlY2lwZVszXTtcbiAgICAgIHZhciBib2R5ID0gc2VsZi5mcm9tUmVjaXBlKHJ1bGVSZWNpcGVbNF0pO1xuXG4gICAgICB2YXIgc291cmNlO1xuICAgICAgaWYgKGdEZWNsLnNvdXJjZSAmJiBtZXRhSW5mbyAmJiBtZXRhSW5mby5zb3VyY2VJbnRlcnZhbCkge1xuICAgICAgICB2YXIgaW5wdXRTdHJlYW0gPSBnRGVjbC5zb3VyY2UuaW5wdXRTdHJlYW07XG4gICAgICAgIHNvdXJjZSA9IGlucHV0U3RyZWFtLmludGVydmFsLmFwcGx5KGlucHV0U3RyZWFtLCBtZXRhSW5mby5zb3VyY2VJbnRlcnZhbCk7XG4gICAgICB9XG4gICAgICBnRGVjbFthY3Rpb25dKHJ1bGVOYW1lLCBmb3JtYWxzLCBib2R5LCBkZXNjcmlwdGlvbiwgc291cmNlKTtcbiAgICB9KTtcbiAgICB0aGlzLmN1cnJlbnREZWNsID0gbnVsbDtcbiAgICByZXR1cm4gZ0RlY2wuYnVpbGQoKTtcbiAgfSxcblxuICB0ZXJtaW5hbDogZnVuY3Rpb24oeCkge1xuICAgIHJldHVybiBuZXcgcGV4cHJzLlRlcm1pbmFsKHgpO1xuICB9LFxuXG4gIHJhbmdlOiBmdW5jdGlvbihmcm9tLCB0bykge1xuICAgIHJldHVybiBuZXcgcGV4cHJzLlJhbmdlKGZyb20sIHRvKTtcbiAgfSxcblxuICBwYXJhbTogZnVuY3Rpb24oaW5kZXgpIHtcbiAgICByZXR1cm4gbmV3IHBleHBycy5QYXJhbShpbmRleCk7XG4gIH0sXG5cbiAgYWx0OiBmdW5jdGlvbigvKiB0ZXJtMSwgdGVybTEsIC4uLiAqLykge1xuICAgIHZhciB0ZXJtcyA9IFtdO1xuICAgIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IGFyZ3VtZW50cy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICB2YXIgYXJnID0gYXJndW1lbnRzW2lkeF07XG4gICAgICBpZiAoIShhcmcgaW5zdGFuY2VvZiBwZXhwcnMuUEV4cHIpKSB7XG4gICAgICAgIGFyZyA9IHRoaXMuZnJvbVJlY2lwZShhcmcpO1xuICAgICAgfVxuICAgICAgaWYgKGFyZyBpbnN0YW5jZW9mIHBleHBycy5BbHQpIHtcbiAgICAgICAgdGVybXMgPSB0ZXJtcy5jb25jYXQoYXJnLnRlcm1zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRlcm1zLnB1c2goYXJnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRlcm1zLmxlbmd0aCA9PT0gMSA/IHRlcm1zWzBdIDogbmV3IHBleHBycy5BbHQodGVybXMpO1xuICB9LFxuXG4gIHNlcTogZnVuY3Rpb24oLyogZmFjdG9yMSwgZmFjdG9yMiwgLi4uICovKSB7XG4gICAgdmFyIGZhY3RvcnMgPSBbXTtcbiAgICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCBhcmd1bWVudHMubGVuZ3RoOyBpZHgrKykge1xuICAgICAgdmFyIGFyZyA9IGFyZ3VtZW50c1tpZHhdO1xuICAgICAgaWYgKCEoYXJnIGluc3RhbmNlb2YgcGV4cHJzLlBFeHByKSkge1xuICAgICAgICBhcmcgPSB0aGlzLmZyb21SZWNpcGUoYXJnKTtcbiAgICAgIH1cbiAgICAgIGlmIChhcmcgaW5zdGFuY2VvZiBwZXhwcnMuU2VxKSB7XG4gICAgICAgIGZhY3RvcnMgPSBmYWN0b3JzLmNvbmNhdChhcmcuZmFjdG9ycyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmYWN0b3JzLnB1c2goYXJnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhY3RvcnMubGVuZ3RoID09PSAxID8gZmFjdG9yc1swXSA6IG5ldyBwZXhwcnMuU2VxKGZhY3RvcnMpO1xuICB9LFxuXG4gIHN0YXI6IGZ1bmN0aW9uKGV4cHIpIHtcbiAgICBpZiAoIShleHByIGluc3RhbmNlb2YgcGV4cHJzLlBFeHByKSkge1xuICAgICAgZXhwciA9IHRoaXMuZnJvbVJlY2lwZShleHByKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBwZXhwcnMuU3RhcihleHByKTtcbiAgfSxcblxuICBwbHVzOiBmdW5jdGlvbihleHByKSB7XG4gICAgaWYgKCEoZXhwciBpbnN0YW5jZW9mIHBleHBycy5QRXhwcikpIHtcbiAgICAgIGV4cHIgPSB0aGlzLmZyb21SZWNpcGUoZXhwcik7XG4gICAgfVxuICAgIHJldHVybiBuZXcgcGV4cHJzLlBsdXMoZXhwcik7XG4gIH0sXG5cbiAgb3B0OiBmdW5jdGlvbihleHByKSB7XG4gICAgaWYgKCEoZXhwciBpbnN0YW5jZW9mIHBleHBycy5QRXhwcikpIHtcbiAgICAgIGV4cHIgPSB0aGlzLmZyb21SZWNpcGUoZXhwcik7XG4gICAgfVxuICAgIHJldHVybiBuZXcgcGV4cHJzLk9wdChleHByKTtcbiAgfSxcblxuICBub3Q6IGZ1bmN0aW9uKGV4cHIpIHtcbiAgICBpZiAoIShleHByIGluc3RhbmNlb2YgcGV4cHJzLlBFeHByKSkge1xuICAgICAgZXhwciA9IHRoaXMuZnJvbVJlY2lwZShleHByKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBwZXhwcnMuTm90KGV4cHIpO1xuICB9LFxuXG4gIGxhOiBmdW5jdGlvbihleHByKSB7XG4gICAgLy8gVE9ETzogdGVtcG9yYXJ5IHRvIHN0aWxsIGJlIGFibGUgdG8gcmVhZCBvbGQgcmVjaXBlc1xuICAgIHJldHVybiB0aGlzLmxvb2thaGVhZChleHByKTtcbiAgfSxcblxuICBsb29rYWhlYWQ6IGZ1bmN0aW9uKGV4cHIpIHtcbiAgICBpZiAoIShleHByIGluc3RhbmNlb2YgcGV4cHJzLlBFeHByKSkge1xuICAgICAgZXhwciA9IHRoaXMuZnJvbVJlY2lwZShleHByKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBwZXhwcnMuTG9va2FoZWFkKGV4cHIpO1xuICB9LFxuXG4gIGxleDogZnVuY3Rpb24oZXhwcikge1xuICAgIGlmICghKGV4cHIgaW5zdGFuY2VvZiBwZXhwcnMuUEV4cHIpKSB7XG4gICAgICBleHByID0gdGhpcy5mcm9tUmVjaXBlKGV4cHIpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IHBleHBycy5MZXgoZXhwcik7XG4gIH0sXG5cbiAgYXBwOiBmdW5jdGlvbihydWxlTmFtZSwgb3B0UGFyYW1zKSB7XG4gICAgaWYgKG9wdFBhcmFtcyAmJiBvcHRQYXJhbXMubGVuZ3RoID4gMCkge1xuICAgICAgb3B0UGFyYW1zID0gb3B0UGFyYW1zLm1hcChmdW5jdGlvbihwYXJhbSkge1xuICAgICAgICByZXR1cm4gcGFyYW0gaW5zdGFuY2VvZiBwZXhwcnMuUEV4cHIgPyBwYXJhbSA6XG4gICAgICAgICAgdGhpcy5mcm9tUmVjaXBlKHBhcmFtKTtcbiAgICAgIH0sIHRoaXMpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IHBleHBycy5BcHBseShydWxlTmFtZSwgb3B0UGFyYW1zKTtcbiAgfSxcblxuICBmcm9tUmVjaXBlOiBmdW5jdGlvbihyZWNpcGUpIHtcbiAgICAvLyB0aGUgbWV0YS1pbmZvIG9mICdncmFtbWFyJyBpcyBwcm9jY2Vzc2VkIGluIEJ1aWxkZXIuZ3JhbW1hclxuICAgIHZhciByZXN1bHQgPSB0aGlzW3JlY2lwZVswXV0uYXBwbHkodGhpcyxcbiAgICAgIHJlY2lwZVswXSA9PT0gJ2dyYW1tYXInID8gcmVjaXBlLnNsaWNlKDEpIDogcmVjaXBlLnNsaWNlKDIpKTtcblxuICAgIHZhciBtZXRhSW5mbyA9IHJlY2lwZVsxXTtcbiAgICBpZiAobWV0YUluZm8pIHtcbiAgICAgIGlmIChtZXRhSW5mby5zb3VyY2VJbnRlcnZhbCAmJiB0aGlzLmN1cnJlbnREZWNsKSB7XG4gICAgICAgIHJlc3VsdC53aXRoU291cmNlKFxuICAgICAgICAgIHRoaXMuY3VycmVudERlY2wuc291cmNlSW50ZXJ2YWwuYXBwbHkodGhpcy5jdXJyZW50RGVjbCwgbWV0YUluZm8uc291cmNlSW50ZXJ2YWwpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJ1aWxkZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBQcml2YXRlIHN0dWZmXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vKlxuICBgRmFpbHVyZWBzIHJlcHJlc2VudCBleHByZXNzaW9ucyB0aGF0IHdlcmVuJ3QgbWF0Y2hlZCB3aGlsZSBwYXJzaW5nLiBUaGV5IGFyZSB1c2VkIHRvIGdlbmVyYXRlXG4gIGVycm9yIG1lc3NhZ2VzIGF1dG9tYXRpY2FsbHkuIFRoZSBpbnRlcmZhY2Ugb2YgYEZhaWx1cmVgcyBpbmNsdWRlcyB0aGUgY29sbG93aW5nIG1ldGhvZHM6XG5cbiAgLSBnZXRUZXh0KCkgOiBTdHJpbmdcbiAgLSBnZXRUeXBlKCkgOiBTdHJpbmcgIChvbmUgb2Yge1wiZGVzY3JpcHRpb25cIiwgXCJzdHJpbmdcIiwgXCJjb2RlXCJ9KVxuICAtIGlzRGVzY3JpcHRpb24oKSA6IGJvb2xcbiAgLSBpc1N0cmluZ1Rlcm1pbmFsKCkgOiBib29sXG4gIC0gaXNDb2RlKCkgOiBib29sXG4gIC0gaXNGbHVmZnkoKSA6IGJvb2xcbiAgLSBtYWtlRmx1ZmZ5KCkgOiB2b2lkXG4gIC0gc3Vic3VtZXMoRmFpbHVyZSkgOiBib29sXG4qL1xuXG5mdW5jdGlvbiBpc1ZhbGlkVHlwZSh0eXBlKSB7XG4gIHJldHVybiB0eXBlID09PSAnZGVzY3JpcHRpb24nIHx8IHR5cGUgPT09ICdzdHJpbmcnIHx8IHR5cGUgPT09ICdjb2RlJztcbn1cblxuZnVuY3Rpb24gRmFpbHVyZShwZXhwciwgdGV4dCwgdHlwZSkge1xuICBpZiAoIWlzVmFsaWRUeXBlKHR5cGUpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIEZhaWx1cmUgdHlwZTogJyArIHR5cGUpO1xuICB9XG4gIHRoaXMucGV4cHIgPSBwZXhwcjtcbiAgdGhpcy50ZXh0ID0gdGV4dDtcbiAgdGhpcy50eXBlID0gdHlwZTtcbiAgdGhpcy5mbHVmZnkgPSBmYWxzZTtcbn1cblxuRmFpbHVyZS5wcm90b3R5cGUuZ2V0UEV4cHIgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMucGV4cHI7XG59O1xuXG5GYWlsdXJlLnByb3RvdHlwZS5nZXRUZXh0ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnRleHQ7XG59O1xuXG5GYWlsdXJlLnByb3RvdHlwZS5nZXRUeXBlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnR5cGU7XG59O1xuXG5GYWlsdXJlLnByb3RvdHlwZS5pc0Rlc2NyaXB0aW9uID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnR5cGUgPT09ICdkZXNjcmlwdGlvbic7XG59O1xuXG5GYWlsdXJlLnByb3RvdHlwZS5pc1N0cmluZ1Rlcm1pbmFsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnR5cGUgPT09ICdzdHJpbmcnO1xufTtcblxuRmFpbHVyZS5wcm90b3R5cGUuaXNDb2RlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnR5cGUgPT09ICdjb2RlJztcbn07XG5cbkZhaWx1cmUucHJvdG90eXBlLmlzRmx1ZmZ5ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmZsdWZmeTtcbn07XG5cbkZhaWx1cmUucHJvdG90eXBlLm1ha2VGbHVmZnkgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5mbHVmZnkgPSB0cnVlO1xufTtcblxuRmFpbHVyZS5wcm90b3R5cGUuY2xlYXJGbHVmZnkgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5mbHVmZnkgPSBmYWxzZTtcbn07XG5cbkZhaWx1cmUucHJvdG90eXBlLnN1YnN1bWVzID0gZnVuY3Rpb24odGhhdCkge1xuICByZXR1cm4gdGhpcy5nZXRUZXh0KCkgPT09IHRoYXQuZ2V0VGV4dCgpICYmXG4gICAgICB0aGlzLnR5cGUgPT09IHRoYXQudHlwZSAmJlxuICAgICAgKCF0aGlzLmlzRmx1ZmZ5KCkgfHwgdGhpcy5pc0ZsdWZmeSgpICYmIHRoYXQuaXNGbHVmZnkoKSk7XG59O1xuXG5GYWlsdXJlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy50eXBlID09PSAnc3RyaW5nJyA/XG4gICAgSlNPTi5zdHJpbmdpZnkodGhpcy5nZXRUZXh0KCkpIDpcbiAgICB0aGlzLmdldFRleHQoKTtcbn07XG5cbkZhaWx1cmUucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gIHZhciBmYWlsdXJlID0gbmV3IEZhaWx1cmUodGhpcy5wZXhwciwgdGhpcy50ZXh0LCB0aGlzLnR5cGUpO1xuICBpZiAodGhpcy5pc0ZsdWZmeSgpKSB7XG4gICAgZmFpbHVyZS5tYWtlRmx1ZmZ5KCk7XG4gIH1cbiAgcmV0dXJuIGZhaWx1cmU7XG59O1xuXG5GYWlsdXJlLnByb3RvdHlwZS50b0tleSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy50b1N0cmluZygpICsgJyMnICsgdGhpcy50eXBlO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4cG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm1vZHVsZS5leHBvcnRzID0gRmFpbHVyZTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBNYXRjaFJlc3VsdCA9IHJlcXVpcmUoJy4vTWF0Y2hSZXN1bHQnKTtcbnZhciBTZW1hbnRpY3MgPSByZXF1aXJlKCcuL1NlbWFudGljcycpO1xudmFyIFN0YXRlID0gcmVxdWlyZSgnLi9TdGF0ZScpO1xudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uJyk7XG52YXIgZXJyb3JzID0gcmVxdWlyZSgnLi9lcnJvcnMnKTtcbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUHJpdmF0ZSBzdHVmZlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gR3JhbW1hcihcbiAgICBuYW1lLFxuICAgIHN1cGVyR3JhbW1hcixcbiAgICBydWxlcyxcbiAgICBvcHREZWZhdWx0U3RhcnRSdWxlKSB7XG4gIHRoaXMubmFtZSA9IG5hbWU7XG4gIHRoaXMuc3VwZXJHcmFtbWFyID0gc3VwZXJHcmFtbWFyO1xuICB0aGlzLnJ1bGVzID0gcnVsZXM7XG4gIGlmIChvcHREZWZhdWx0U3RhcnRSdWxlKSB7XG4gICAgaWYgKCEob3B0RGVmYXVsdFN0YXJ0UnVsZSBpbiBydWxlcykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgc3RhcnQgcnVsZTogJ1wiICsgb3B0RGVmYXVsdFN0YXJ0UnVsZSArXG4gICAgICAgICAgICAgICAgICAgICAgXCInIGlzIG5vdCBhIHJ1bGUgaW4gZ3JhbW1hciAnXCIgKyBuYW1lICsgXCInXCIpO1xuICAgIH1cbiAgICB0aGlzLmRlZmF1bHRTdGFydFJ1bGUgPSBvcHREZWZhdWx0U3RhcnRSdWxlO1xuICB9XG59XG5cbnZhciBvaG1HcmFtbWFyO1xudmFyIGJ1aWxkR3JhbW1hcjtcblxuLy8gVGhpcyBtZXRob2QgaXMgY2FsbGVkIGZyb20gbWFpbi5qcyBvbmNlIE9obSBoYXMgbG9hZGVkLlxuR3JhbW1hci5pbml0QXBwbGljYXRpb25QYXJzZXIgPSBmdW5jdGlvbihncmFtbWFyLCBidWlsZGVyRm4pIHtcbiAgb2htR3JhbW1hciA9IGdyYW1tYXI7XG4gIGJ1aWxkR3JhbW1hciA9IGJ1aWxkZXJGbjtcbn07XG5cbkdyYW1tYXIucHJvdG90eXBlID0ge1xuICAvLyBSZXR1cm4gdHJ1ZSBpZiB0aGUgZ3JhbW1hciBpcyBhIGJ1aWx0LWluIGdyYW1tYXIsIG90aGVyd2lzZSBmYWxzZS5cbiAgLy8gTk9URTogVGhpcyBtaWdodCBnaXZlIGFuIHVuZXhwZWN0ZWQgcmVzdWx0IGlmIGNhbGxlZCBiZWZvcmUgQnVpbHRJblJ1bGVzIGlzIGRlZmluZWQhXG4gIGlzQnVpbHRJbjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMgPT09IEdyYW1tYXIuUHJvdG9CdWlsdEluUnVsZXMgfHwgdGhpcyA9PT0gR3JhbW1hci5CdWlsdEluUnVsZXM7XG4gIH0sXG5cbiAgX21hdGNoOiBmdW5jdGlvbihpbnB1dCwgb3B0cykge1xuICAgIHZhciBzdGF0ZSA9IG5ldyBTdGF0ZSh0aGlzLCBpbnB1dCwgb3B0cyk7XG4gICAgc3RhdGUuZXZhbEZyb21TdGFydCgpO1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfSxcblxuICBtYXRjaDogZnVuY3Rpb24oaW5wdXQsIG9wdFN0YXJ0QXBwbGljYXRpb24pIHtcbiAgICB2YXIgc3RhdGUgPSB0aGlzLl9tYXRjaChpbnB1dCwge3N0YXJ0QXBwbGljYXRpb246IG9wdFN0YXJ0QXBwbGljYXRpb259KTtcbiAgICByZXR1cm4gTWF0Y2hSZXN1bHQubmV3Rm9yKHN0YXRlKTtcbiAgfSxcblxuICB0cmFjZTogZnVuY3Rpb24oaW5wdXQsIG9wdFN0YXJ0QXBwbGljYXRpb24pIHtcbiAgICB2YXIgc3RhdGUgPSB0aGlzLl9tYXRjaChpbnB1dCwge3N0YXJ0QXBwbGljYXRpb246IG9wdFN0YXJ0QXBwbGljYXRpb24sIHRyYWNlOiB0cnVlfSk7XG5cbiAgICAvLyBUaGUgdHJhY2Ugbm9kZSBmb3IgdGhlIHN0YXJ0IHJ1bGUgaXMgYWx3YXlzIHRoZSBsYXN0IGVudHJ5LiBJZiBpdCBpcyBhIHN5bnRhY3RpYyBydWxlLFxuICAgIC8vIHRoZSBmaXJzdCBlbnRyeSBpcyBmb3IgYW4gYXBwbGljYXRpb24gb2YgJ3NwYWNlcycuXG4gICAgLy8gVE9ETyhwZHVicm95KTogQ2xlYW4gdGhpcyB1cCBieSBpbnRyb2R1Y2luZyBhIHNwZWNpYWwgYE1hdGNoPHN0YXJ0QXBwbD5gIHJ1bGUsIHdoaWNoIHdpbGxcbiAgICAvLyBlbnN1cmUgdGhhdCB0aGVyZSBpcyBhbHdheXMgYSBzaW5nbGUgcm9vdCB0cmFjZSBub2RlLlxuICAgIHZhciByb290VHJhY2UgPSBzdGF0ZS50cmFjZVtzdGF0ZS50cmFjZS5sZW5ndGggLSAxXTtcbiAgICByb290VHJhY2Uuc3RhdGUgPSBzdGF0ZTtcbiAgICByb290VHJhY2UucmVzdWx0ID0gTWF0Y2hSZXN1bHQubmV3Rm9yKHN0YXRlKTtcbiAgICByZXR1cm4gcm9vdFRyYWNlO1xuICB9LFxuXG4gIHNlbWFudGljczogZnVuY3Rpb24oKSB7XG4gICAgLy8gVE9ETzogUmVtb3ZlIHRoaXMgZXZlbnR1YWxseSEgRGVwcmVjYXRlZCBpbiB2MC4xMi5cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NlbWFudGljcygpIGlzIGRlcHJlY2F0ZWQgLS0gdXNlIGNyZWF0ZVNlbWFudGljcygpIGluc3RlYWQuJyk7XG4gIH0sXG5cbiAgY3JlYXRlU2VtYW50aWNzOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gU2VtYW50aWNzLmNyZWF0ZVNlbWFudGljcyh0aGlzKTtcbiAgfSxcblxuICBleHRlbmRTZW1hbnRpY3M6IGZ1bmN0aW9uKHN1cGVyU2VtYW50aWNzKSB7XG4gICAgcmV0dXJuIFNlbWFudGljcy5jcmVhdGVTZW1hbnRpY3ModGhpcywgc3VwZXJTZW1hbnRpY3MuX2dldFNlbWFudGljcygpKTtcbiAgfSxcblxuICAvLyBDaGVjayB0aGF0IGV2ZXJ5IGtleSBpbiBgYWN0aW9uRGljdGAgY29ycmVzcG9uZHMgdG8gYSBzZW1hbnRpYyBhY3Rpb24sIGFuZCB0aGF0IGl0IG1hcHMgdG9cbiAgLy8gYSBmdW5jdGlvbiBvZiB0aGUgY29ycmVjdCBhcml0eS4gSWYgbm90LCB0aHJvdyBhbiBleGNlcHRpb24uXG4gIF9jaGVja1RvcERvd25BY3Rpb25EaWN0OiBmdW5jdGlvbih3aGF0LCBuYW1lLCBhY3Rpb25EaWN0KSB7XG4gICAgZnVuY3Rpb24gaXNTcGVjaWFsQWN0aW9uKGEpIHtcbiAgICAgIHJldHVybiBhID09PSAnX2l0ZXInIHx8IGEgPT09ICdfdGVybWluYWwnIHx8IGEgPT09ICdfbm9udGVybWluYWwnIHx8IGEgPT09ICdfZGVmYXVsdCc7XG4gICAgfVxuXG4gICAgdmFyIHByb2JsZW1zID0gW107XG4gICAgZm9yICh2YXIgayBpbiBhY3Rpb25EaWN0KSB7XG4gICAgICB2YXIgdiA9IGFjdGlvbkRpY3Rba107XG4gICAgICBpZiAoIWlzU3BlY2lhbEFjdGlvbihrKSAmJiAhKGsgaW4gdGhpcy5ydWxlcykpIHtcbiAgICAgICAgcHJvYmxlbXMucHVzaChcIidcIiArIGsgKyBcIicgaXMgbm90IGEgdmFsaWQgc2VtYW50aWMgYWN0aW9uIGZvciAnXCIgKyB0aGlzLm5hbWUgKyBcIidcIik7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHByb2JsZW1zLnB1c2goXG4gICAgICAgICAgICBcIidcIiArIGsgKyBcIicgbXVzdCBiZSBhIGZ1bmN0aW9uIGluIGFuIGFjdGlvbiBkaWN0aW9uYXJ5IGZvciAnXCIgKyB0aGlzLm5hbWUgKyBcIidcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgYWN0dWFsID0gdi5sZW5ndGg7XG4gICAgICAgIHZhciBleHBlY3RlZCA9IHRoaXMuX3RvcERvd25BY3Rpb25Bcml0eShrKTtcbiAgICAgICAgaWYgKGFjdHVhbCAhPT0gZXhwZWN0ZWQpIHtcbiAgICAgICAgICBwcm9ibGVtcy5wdXNoKFxuICAgICAgICAgICAgICBcIlNlbWFudGljIGFjdGlvbiAnXCIgKyBrICsgXCInIGhhcyB0aGUgd3JvbmcgYXJpdHk6IFwiICtcbiAgICAgICAgICAgICAgJ2V4cGVjdGVkICcgKyBleHBlY3RlZCArICcsIGdvdCAnICsgYWN0dWFsKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAocHJvYmxlbXMubGVuZ3RoID4gMCkge1xuICAgICAgdmFyIHByZXR0eVByb2JsZW1zID0gcHJvYmxlbXMubWFwKGZ1bmN0aW9uKHByb2JsZW0pIHsgcmV0dXJuICctICcgKyBwcm9ibGVtOyB9KTtcbiAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgICBcIkZvdW5kIGVycm9ycyBpbiB0aGUgYWN0aW9uIGRpY3Rpb25hcnkgb2YgdGhlICdcIiArIG5hbWUgKyBcIicgXCIgKyB3aGF0ICsgJzpcXG4nICtcbiAgICAgICAgICBwcmV0dHlQcm9ibGVtcy5qb2luKCdcXG4nKSk7XG4gICAgICBlcnJvci5wcm9ibGVtcyA9IHByb2JsZW1zO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9LFxuXG4gIC8vIFJldHVybiB0aGUgZXhwZWN0ZWQgYXJpdHkgZm9yIGEgc2VtYW50aWMgYWN0aW9uIG5hbWVkIGBhY3Rpb25OYW1lYCwgd2hpY2hcbiAgLy8gaXMgZWl0aGVyIGEgcnVsZSBuYW1lIG9yIGEgc3BlY2lhbCBhY3Rpb24gbmFtZSBsaWtlICdfbm9udGVybWluYWwnLlxuICBfdG9wRG93bkFjdGlvbkFyaXR5OiBmdW5jdGlvbihhY3Rpb25OYW1lKSB7XG4gICAgaWYgKGFjdGlvbk5hbWUgPT09ICdfaXRlcicgfHwgYWN0aW9uTmFtZSA9PT0gJ19ub250ZXJtaW5hbCcgfHwgYWN0aW9uTmFtZSA9PT0gJ19kZWZhdWx0Jykge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIGlmIChhY3Rpb25OYW1lID09PSAnX3Rlcm1pbmFsJykge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJ1bGVzW2FjdGlvbk5hbWVdLmJvZHkuZ2V0QXJpdHkoKTtcbiAgfSxcblxuICBfaW5oZXJpdHNGcm9tOiBmdW5jdGlvbihncmFtbWFyKSB7XG4gICAgdmFyIGcgPSB0aGlzLnN1cGVyR3JhbW1hcjtcbiAgICB3aGlsZSAoZykge1xuICAgICAgaWYgKGcgPT09IGdyYW1tYXIpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBnID0gZy5zdXBlckdyYW1tYXI7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcblxuICB0b1JlY2lwZTogZnVuY3Rpb24ob3B0VmFyTmFtZSkge1xuICAgIHZhciBtZXRhSW5mbyA9IHt9O1xuICAgIC8vIEluY2x1ZGUgdGhlIGdyYW1tYXIgc291cmNlIGlmIGl0IGlzIGF2YWlsYWJsZS5cbiAgICBpZiAodGhpcy5zb3VyY2UpIHtcbiAgICAgIG1ldGFJbmZvLnNvdXJjZSA9IHRoaXMuc291cmNlLmNvbnRlbnRzO1xuICAgIH1cblxuICAgIHZhciBzdXBlckdyYW1tYXIgPSBudWxsO1xuICAgIGlmICh0aGlzLnN1cGVyR3JhbW1hciAmJiAhdGhpcy5zdXBlckdyYW1tYXIuaXNCdWlsdEluKCkpIHtcbiAgICAgIHN1cGVyR3JhbW1hciA9IEpTT04ucGFyc2UodGhpcy5zdXBlckdyYW1tYXIudG9SZWNpcGUoKSk7XG4gICAgfVxuXG4gICAgdmFyIHN0YXJ0UnVsZSA9IG51bGw7XG4gICAgaWYgKHRoaXMuZGVmYXVsdFN0YXJ0UnVsZSkge1xuICAgICAgc3RhcnRSdWxlID0gdGhpcy5kZWZhdWx0U3RhcnRSdWxlO1xuICAgIH1cblxuICAgIHZhciBydWxlcyA9IHt9O1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBPYmplY3Qua2V5cyh0aGlzLnJ1bGVzKS5mb3JFYWNoKGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gICAgICB2YXIgcnVsZUluZm8gPSBzZWxmLnJ1bGVzW3J1bGVOYW1lXTtcbiAgICAgIHZhciBib2R5ID0gcnVsZUluZm8uYm9keTtcbiAgICAgIHZhciBpc0RlZmluaXRpb24gPSAhc2VsZi5zdXBlckdyYW1tYXIgfHwgIXNlbGYuc3VwZXJHcmFtbWFyLnJ1bGVzW3J1bGVOYW1lXTtcblxuICAgICAgdmFyIG9wZXJhdGlvbjtcbiAgICAgIGlmIChpc0RlZmluaXRpb24pIHtcbiAgICAgICAgb3BlcmF0aW9uID0gJ2RlZmluZSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcGVyYXRpb24gPSBib2R5IGluc3RhbmNlb2YgcGV4cHJzLkV4dGVuZCA/ICdleHRlbmQnIDogJ292ZXJyaWRlJztcbiAgICAgIH1cblxuICAgICAgdmFyIG1ldGFJbmZvID0ge307XG4gICAgICBpZiAocnVsZUluZm8uc291cmNlICYmIHNlbGYuc291cmNlKSB7XG4gICAgICAgIHZhciBhZGp1c3RlZCA9IHJ1bGVJbmZvLnNvdXJjZS5yZWxhdGl2ZVRvKHNlbGYuc291cmNlKTtcbiAgICAgICAgbWV0YUluZm8uc291cmNlSW50ZXJ2YWwgPSBbYWRqdXN0ZWQuc3RhcnRJZHgsIGFkanVzdGVkLmVuZElkeF07XG4gICAgICB9XG5cbiAgICAgIHZhciBkZXNjcmlwdGlvbiA9IGlzRGVmaW5pdGlvbiA/IHJ1bGVJbmZvLmRlc2NyaXB0aW9uIDogbnVsbDtcbiAgICAgIHZhciBib2R5UmVjaXBlID0gYm9keS5vdXRwdXRSZWNpcGUocnVsZUluZm8uZm9ybWFscywgc2VsZi5zb3VyY2UpO1xuXG4gICAgICBydWxlc1tydWxlTmFtZV0gPSBbXG4gICAgICAgIG9wZXJhdGlvbiwgLy8gXCJkZWZpbmVcIi9cImV4dGVuZFwiL1wib3ZlcnJpZGVcIlxuICAgICAgICBtZXRhSW5mbyxcbiAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgIHJ1bGVJbmZvLmZvcm1hbHMsXG4gICAgICAgIGJvZHlSZWNpcGVcbiAgICAgIF07XG4gICAgfSk7XG5cbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoW1xuICAgICAgJ2dyYW1tYXInLFxuICAgICAgbWV0YUluZm8sXG4gICAgICB0aGlzLm5hbWUsXG4gICAgICBzdXBlckdyYW1tYXIsXG4gICAgICBzdGFydFJ1bGUsXG4gICAgICBydWxlc1xuICAgIF0pO1xuICB9LFxuXG4gIC8vIFRPRE86IENvbWUgdXAgd2l0aCBiZXR0ZXIgbmFtZXMgZm9yIHRoZXNlIG1ldGhvZHMuXG4gIC8vIFRPRE86IFdyaXRlIHRoZSBhbmFsb2cgb2YgdGhlc2UgbWV0aG9kcyBmb3IgaW5oZXJpdGVkIGF0dHJpYnV0ZXMuXG4gIHRvT3BlcmF0aW9uQWN0aW9uRGljdGlvbmFyeVRlbXBsYXRlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fdG9PcGVyYXRpb25PckF0dHJpYnV0ZUFjdGlvbkRpY3Rpb25hcnlUZW1wbGF0ZSgpO1xuICB9LFxuICB0b0F0dHJpYnV0ZUFjdGlvbkRpY3Rpb25hcnlUZW1wbGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RvT3BlcmF0aW9uT3JBdHRyaWJ1dGVBY3Rpb25EaWN0aW9uYXJ5VGVtcGxhdGUoKTtcbiAgfSxcblxuICBfdG9PcGVyYXRpb25PckF0dHJpYnV0ZUFjdGlvbkRpY3Rpb25hcnlUZW1wbGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgLy8gVE9ETzogYWRkIHRoZSBzdXBlci1ncmFtbWFyJ3MgdGVtcGxhdGVzIGF0IHRoZSByaWdodCBwbGFjZSwgZS5nLiwgYSBjYXNlIGZvciBBZGRFeHByX3BsdXNcbiAgICAvLyBzaG91bGQgYXBwZWFyIG5leHQgdG8gb3RoZXIgY2FzZXMgb2YgQWRkRXhwci5cblxuICAgIHZhciBzYiA9IG5ldyBjb21tb24uU3RyaW5nQnVmZmVyKCk7XG4gICAgc2IuYXBwZW5kKCd7Jyk7XG5cbiAgICB2YXIgZmlyc3QgPSB0cnVlO1xuICAgIGZvciAodmFyIHJ1bGVOYW1lIGluIHRoaXMucnVsZXMpIHtcbiAgICAgIHZhciBib2R5ID0gdGhpcy5ydWxlc1tydWxlTmFtZV0uYm9keTtcbiAgICAgIGlmIChmaXJzdCkge1xuICAgICAgICBmaXJzdCA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2IuYXBwZW5kKCcsJyk7XG4gICAgICB9XG4gICAgICBzYi5hcHBlbmQoJ1xcbicpO1xuICAgICAgc2IuYXBwZW5kKCcgICcpO1xuICAgICAgdGhpcy5hZGRTZW1hbnRpY0FjdGlvblRlbXBsYXRlKHJ1bGVOYW1lLCBib2R5LCBzYik7XG4gICAgfVxuXG4gICAgc2IuYXBwZW5kKCdcXG59Jyk7XG4gICAgcmV0dXJuIHNiLmNvbnRlbnRzKCk7XG4gIH0sXG5cbiAgYWRkU2VtYW50aWNBY3Rpb25UZW1wbGF0ZTogZnVuY3Rpb24ocnVsZU5hbWUsIGJvZHksIHNiKSB7XG4gICAgc2IuYXBwZW5kKHJ1bGVOYW1lKTtcbiAgICBzYi5hcHBlbmQoJzogZnVuY3Rpb24oJyk7XG4gICAgdmFyIGFyaXR5ID0gdGhpcy5fdG9wRG93bkFjdGlvbkFyaXR5KHJ1bGVOYW1lKTtcbiAgICBzYi5hcHBlbmQoY29tbW9uLnJlcGVhdCgnXycsIGFyaXR5KS5qb2luKCcsICcpKTtcbiAgICBzYi5hcHBlbmQoJykge1xcbicpO1xuICAgIHNiLmFwcGVuZCgnICB9Jyk7XG4gIH0sXG5cbiAgLy8gUGFyc2UgYSBzdHJpbmcgd2hpY2ggZXhwcmVzc2VzIGEgcnVsZSBhcHBsaWNhdGlvbiBpbiB0aGlzIGdyYW1tYXIsIGFuZCByZXR1cm4gdGhlXG4gIC8vIHJlc3VsdGluZyBBcHBseSBub2RlLlxuICBwYXJzZUFwcGxpY2F0aW9uOiBmdW5jdGlvbihzdHIpIHtcbiAgICB2YXIgYXBwO1xuICAgIGlmIChzdHIuaW5kZXhPZignPCcpID09PSAtMSkge1xuICAgICAgLy8gc2ltcGxlIGFwcGxpY2F0aW9uXG4gICAgICBhcHAgPSBuZXcgcGV4cHJzLkFwcGx5KHN0cik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHBhcmFtZXRlcml6ZWQgYXBwbGljYXRpb25cbiAgICAgIHZhciBjc3QgPSBvaG1HcmFtbWFyLm1hdGNoKHN0ciwgJ0Jhc2VfYXBwbGljYXRpb24nKTtcbiAgICAgIGFwcCA9IGJ1aWxkR3JhbW1hcihjc3QsIHt9KTtcbiAgICB9XG5cbiAgICAvLyBFbnN1cmUgdGhhdCB0aGUgYXBwbGljYXRpb24gaXMgdmFsaWQuXG4gICAgaWYgKCEoYXBwLnJ1bGVOYW1lIGluIHRoaXMucnVsZXMpKSB7XG4gICAgICB0aHJvdyBlcnJvcnMudW5kZWNsYXJlZFJ1bGUoYXBwLnJ1bGVOYW1lLCB0aGlzLm5hbWUpO1xuICAgIH1cbiAgICB2YXIgZm9ybWFscyA9IHRoaXMucnVsZXNbYXBwLnJ1bGVOYW1lXS5mb3JtYWxzO1xuICAgIGlmIChmb3JtYWxzLmxlbmd0aCAhPT0gYXBwLmFyZ3MubGVuZ3RoKSB7XG4gICAgICB2YXIgc291cmNlID0gdGhpcy5ydWxlc1thcHAucnVsZU5hbWVdLnNvdXJjZTtcbiAgICAgIHRocm93IGVycm9ycy53cm9uZ051bWJlck9mUGFyYW1ldGVycyhhcHAucnVsZU5hbWUsIGZvcm1hbHMubGVuZ3RoLCBhcHAuYXJncy5sZW5ndGgsIHNvdXJjZSk7XG4gICAgfVxuICAgIHJldHVybiBhcHA7XG4gIH1cbn07XG5cbi8vIFRoZSBmb2xsb3dpbmcgZ3JhbW1hciBjb250YWlucyBhIGZldyBydWxlcyB0aGF0IGNvdWxkbid0IGJlIHdyaXR0ZW4gIGluIFwidXNlcmxhbmRcIi5cbi8vIEF0IHRoZSBib3R0b20gb2Ygc3JjL21haW4uanMsIHdlIGNyZWF0ZSBhIHN1Yi1ncmFtbWFyIG9mIHRoaXMgZ3JhbW1hciB0aGF0J3MgY2FsbGVkXG4vLyBgQnVpbHRJblJ1bGVzYC4gVGhhdCBncmFtbWFyIGNvbnRhaW5zIHNldmVyYWwgY29udmVuaWVuY2UgcnVsZXMsIGUuZy4sIGBsZXR0ZXJgIGFuZFxuLy8gYGRpZ2l0YCwgYW5kIGlzIGltcGxpY2l0bHkgdGhlIHN1cGVyLWdyYW1tYXIgb2YgYW55IGdyYW1tYXIgd2hvc2Ugc3VwZXItZ3JhbW1hclxuLy8gaXNuJ3Qgc3BlY2lmaWVkLlxuR3JhbW1hci5Qcm90b0J1aWx0SW5SdWxlcyA9IG5ldyBHcmFtbWFyKFxuICAnUHJvdG9CdWlsdEluUnVsZXMnLCAgLy8gbmFtZVxuICB1bmRlZmluZWQsICAvLyBzdXBlcmdyYW1tYXJcbiAge1xuICAgIC8vIFRoZSBmb2xsb3dpbmcgcnVsZXMgY2FuJ3QgYmUgd3JpdHRlbiBpbiB1c2VybGFuZCBiZWNhdXNlIHRoZXkgcmVmZXJlbmNlXG4gICAgLy8gYGFueWAgYW5kIGBlbmRgIGRpcmVjdGx5LlxuICAgIGFueToge2JvZHk6IHBleHBycy5hbnksIGZvcm1hbHM6IFtdLCBkZXNjcmlwdGlvbjogJ2FueSBvYmplY3QnfSxcbiAgICBlbmQ6IHtib2R5OiBwZXhwcnMuZW5kLCBmb3JtYWxzOiBbXSwgZGVzY3JpcHRpb246ICdlbmQgb2YgaW5wdXQnfSxcblxuICAgIC8vIFRoZSBmb2xsb3dpbmcgcnVsZSBpcyBpbnZva2VkIGltcGxpY2l0bHkgYnkgc3ludGFjdGljIHJ1bGVzIHRvIHNraXAgc3BhY2VzLlxuICAgIHNwYWNlczoge1xuICAgICAgYm9keTogbmV3IHBleHBycy5TdGFyKG5ldyBwZXhwcnMuQXBwbHkoJ3NwYWNlJykpLFxuICAgICAgZm9ybWFsczogW11cbiAgICB9LFxuXG4gICAgLy8gVGhlIGBzcGFjZWAgcnVsZSBtdXN0IGJlIGRlZmluZWQgaGVyZSBiZWNhdXNlIGl0J3MgcmVmZXJlbmNlZCBieSBgc3BhY2VzYC5cbiAgICBzcGFjZToge1xuICAgICAgYm9keTogbmV3IHBleHBycy5SYW5nZSgnXFx4MDAnLCAnICcpLFxuICAgICAgZm9ybWFsczogW10sXG4gICAgICBkZXNjcmlwdGlvbjogJ2Egc3BhY2UnXG4gICAgfSxcblxuICAgIC8vIFRoZXNlIHJ1bGVzIGFyZSBpbXBsZW1lbnRlZCBuYXRpdmVseSBiZWNhdXNlIHRoZXkgdXNlIFVuaWNvZGVDaGFyIGRpcmVjdGx5LCB3aGljaCBpc1xuICAgIC8vIG5vdCBwYXJ0IG9mIHRoZSBPaG0gZ3JhbW1hci5cbiAgICBsb3dlcjoge1xuICAgICAgYm9keTogbmV3IHBleHBycy5Vbmljb2RlQ2hhcignTGwnKSxcbiAgICAgIGZvcm1hbHM6IFtdLFxuICAgICAgZGVzY3JpcHRpb246ICdhIGxvd2VyY2FzZSBsZXR0ZXInXG4gICAgfSxcbiAgICB1cHBlcjoge1xuICAgICAgYm9keTogbmV3IHBleHBycy5Vbmljb2RlQ2hhcignTHUnKSxcbiAgICAgIGZvcm1hbHM6IFtdLFxuICAgICAgZGVzY3JpcHRpb246ICdhbiB1cHBlcmNhc2UgbGV0dGVyJ1xuICAgIH0sXG5cbiAgICAvLyBUaGUgdW5pb24gb2YgTHQgKHRpdGxlY2FzZSksIExtIChtb2RpZmllciksIGFuZCBMbyAob3RoZXIpLCBpLmUuIGFueSBsZXR0ZXIgbm90XG4gICAgLy8gaW4gTGwgb3IgTHUuXG4gICAgdW5pY29kZUx0bW86IHtcbiAgICAgIGJvZHk6IG5ldyBwZXhwcnMuVW5pY29kZUNoYXIoJ0x0bW8nKSxcbiAgICAgIGZvcm1hbHM6IFtdXG4gICAgfVxuICB9XG4pO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubW9kdWxlLmV4cG9ydHMgPSBHcmFtbWFyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIEdyYW1tYXIgPSByZXF1aXJlKCcuL0dyYW1tYXInKTtcbnZhciBJbnB1dFN0cmVhbSA9IHJlcXVpcmUoJy4vSW5wdXRTdHJlYW0nKTtcbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbicpO1xudmFyIGVycm9ycyA9IHJlcXVpcmUoJy4vZXJyb3JzJyk7XG52YXIgcGV4cHJzID0gcmVxdWlyZSgnLi9wZXhwcnMnKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFByaXZhdGUgU3R1ZmZcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIENvbnN0cnVjdG9yc1xuXG5mdW5jdGlvbiBHcmFtbWFyRGVjbChuYW1lKSB7XG4gIHRoaXMubmFtZSA9IG5hbWU7XG59XG5cbi8vIEhlbHBlcnNcblxuR3JhbW1hckRlY2wucHJvdG90eXBlLnNvdXJjZUludGVydmFsID0gZnVuY3Rpb24oc3RhcnRJZHgsIGVuZElkeCkge1xuICB2YXIgaW5wdXRTdHJlYW0gPSB0aGlzLnNvdXJjZS5pbnB1dFN0cmVhbTtcbiAgcmV0dXJuIGlucHV0U3RyZWFtLmludGVydmFsKHN0YXJ0SWR4LCBlbmRJZHgpO1xufTtcblxuR3JhbW1hckRlY2wucHJvdG90eXBlLmVuc3VyZVN1cGVyR3JhbW1hciA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIXRoaXMuc3VwZXJHcmFtbWFyKSB7XG4gICAgdGhpcy53aXRoU3VwZXJHcmFtbWFyKFxuICAgICAgICAvLyBUT0RPOiBUaGUgY29uZGl0aW9uYWwgZXhwcmVzc2lvbiBiZWxvdyBpcyBhbiB1Z2x5IGhhY2suIEl0J3Mga2luZCBvZiBvayBiZWNhdXNlXG4gICAgICAgIC8vIEkgZG91YnQgYW55b25lIHdpbGwgZXZlciB0cnkgdG8gZGVjbGFyZSBhIGdyYW1tYXIgY2FsbGVkIGBCdWlsdEluUnVsZXNgLiBTdGlsbCxcbiAgICAgICAgLy8gd2Ugc2hvdWxkIHRyeSB0byBmaW5kIGEgYmV0dGVyIHdheSB0byBkbyB0aGlzLlxuICAgICAgICB0aGlzLm5hbWUgPT09ICdCdWlsdEluUnVsZXMnID9cbiAgICAgICAgICAgIEdyYW1tYXIuUHJvdG9CdWlsdEluUnVsZXMgOlxuICAgICAgICAgICAgR3JhbW1hci5CdWlsdEluUnVsZXMpO1xuICB9XG4gIHJldHVybiB0aGlzLnN1cGVyR3JhbW1hcjtcbn07XG5cbkdyYW1tYXJEZWNsLnByb3RvdHlwZS5pbnN0YWxsT3ZlcnJpZGRlbk9yRXh0ZW5kZWRSdWxlID0gZnVuY3Rpb24obmFtZSwgZm9ybWFscywgYm9keSwgc291cmNlKSB7XG4gIHZhciBkdXBsaWNhdGVQYXJhbWV0ZXJOYW1lcyA9IGNvbW1vbi5nZXREdXBsaWNhdGVzKGZvcm1hbHMpO1xuICBpZiAoZHVwbGljYXRlUGFyYW1ldGVyTmFtZXMubGVuZ3RoID4gMCkge1xuICAgIHRocm93IGVycm9ycy5kdXBsaWNhdGVQYXJhbWV0ZXJOYW1lcyhuYW1lLCBkdXBsaWNhdGVQYXJhbWV0ZXJOYW1lcywgYm9keSwgc291cmNlKTtcbiAgfVxuICB2YXIgcnVsZUluZm8gPSB0aGlzLmVuc3VyZVN1cGVyR3JhbW1hcigpLnJ1bGVzW25hbWVdO1xuICB2YXIgZXhwZWN0ZWRGb3JtYWxzID0gcnVsZUluZm8uZm9ybWFscztcbiAgdmFyIGV4cGVjdGVkTnVtRm9ybWFscyA9IGV4cGVjdGVkRm9ybWFscyA/IGV4cGVjdGVkRm9ybWFscy5sZW5ndGggOiAwO1xuICBpZiAoZm9ybWFscy5sZW5ndGggIT09IGV4cGVjdGVkTnVtRm9ybWFscykge1xuICAgIHRocm93IGVycm9ycy53cm9uZ051bWJlck9mUGFyYW1ldGVycyhuYW1lLCBleHBlY3RlZE51bUZvcm1hbHMsIGZvcm1hbHMubGVuZ3RoLCBib2R5LCBzb3VyY2UpO1xuICB9XG4gIHJldHVybiB0aGlzLmluc3RhbGwobmFtZSwgZm9ybWFscywgYm9keSwgcnVsZUluZm8uZGVzY3JpcHRpb24sIHNvdXJjZSk7XG59O1xuXG5HcmFtbWFyRGVjbC5wcm90b3R5cGUuaW5zdGFsbCA9IGZ1bmN0aW9uKG5hbWUsIGZvcm1hbHMsIGJvZHksIGRlc2NyaXB0aW9uLCBzb3VyY2UpIHtcbiAgdGhpcy5ydWxlc1tuYW1lXSA9IHtcbiAgICBib2R5OiBib2R5LmludHJvZHVjZVBhcmFtcyhmb3JtYWxzKSxcbiAgICBmb3JtYWxzOiBmb3JtYWxzLFxuICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbixcbiAgICBzb3VyY2U6IHNvdXJjZVxuICB9O1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIFN0dWZmIHRoYXQgeW91IHNob3VsZCBvbmx5IGRvIG9uY2VcblxuR3JhbW1hckRlY2wucHJvdG90eXBlLndpdGhTdXBlckdyYW1tYXIgPSBmdW5jdGlvbihzdXBlckdyYW1tYXIpIHtcbiAgaWYgKHRoaXMuc3VwZXJHcmFtbWFyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd0aGUgc3VwZXIgZ3JhbW1hciBvZiBhIEdyYW1tYXJEZWNsIGNhbm5vdCBiZSBzZXQgbW9yZSB0aGFuIG9uY2UnKTtcbiAgfVxuICB0aGlzLnN1cGVyR3JhbW1hciA9IHN1cGVyR3JhbW1hcjtcbiAgdGhpcy5ydWxlcyA9IE9iamVjdC5jcmVhdGUoc3VwZXJHcmFtbWFyLnJ1bGVzKTtcblxuICAvLyBHcmFtbWFycyB3aXRoIGFuIGV4cGxpY2l0IHN1cGVyZ3JhbW1hciBpbmhlcml0IGEgZGVmYXVsdCBzdGFydCBydWxlLlxuICBpZiAoIXN1cGVyR3JhbW1hci5pc0J1aWx0SW4oKSkge1xuICAgIHRoaXMuZGVmYXVsdFN0YXJ0UnVsZSA9IHN1cGVyR3JhbW1hci5kZWZhdWx0U3RhcnRSdWxlO1xuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxuR3JhbW1hckRlY2wucHJvdG90eXBlLndpdGhEZWZhdWx0U3RhcnRSdWxlID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgdGhpcy5kZWZhdWx0U3RhcnRSdWxlID0gcnVsZU5hbWU7XG4gIHJldHVybiB0aGlzO1xufTtcblxuR3JhbW1hckRlY2wucHJvdG90eXBlLndpdGhTb3VyY2UgPSBmdW5jdGlvbihzb3VyY2UpIHtcbiAgdGhpcy5zb3VyY2UgPSBuZXcgSW5wdXRTdHJlYW0oc291cmNlKS5pbnRlcnZhbCgwLCBzb3VyY2UubGVuZ3RoKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBDcmVhdGVzIGEgR3JhbW1hciBpbnN0YW5jZSwgYW5kIGlmIGl0IHBhc3NlcyB0aGUgc2FuaXR5IGNoZWNrcywgcmV0dXJucyBpdC5cbkdyYW1tYXJEZWNsLnByb3RvdHlwZS5idWlsZCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgZ3JhbW1hciA9IG5ldyBHcmFtbWFyKFxuICAgICAgdGhpcy5uYW1lLFxuICAgICAgdGhpcy5lbnN1cmVTdXBlckdyYW1tYXIoKSxcbiAgICAgIHRoaXMucnVsZXMsXG4gICAgICB0aGlzLmRlZmF1bHRTdGFydFJ1bGUpO1xuXG4gIC8vIFRPRE86IGNoYW5nZSB0aGUgcGV4cHIucHJvdG90eXBlLmFzc2VydC4uLiBtZXRob2RzIHRvIG1ha2UgdGhlbSBhZGRcbiAgLy8gZXhjZXB0aW9ucyB0byBhbiBhcnJheSB0aGF0J3MgcHJvdmlkZWQgYXMgYW4gYXJnLiBUaGVuIHdlJ2xsIGJlIGFibGUgdG9cbiAgLy8gc2hvdyBtb3JlIHRoYW4gb25lIGVycm9yIG9mIHRoZSBzYW1lIHR5cGUgYXQgYSB0aW1lLlxuICAvLyBUT0RPOiBpbmNsdWRlIHRoZSBvZmZlbmRpbmcgcGV4cHIgaW4gdGhlIGVycm9ycywgdGhhdCB3YXkgd2UgY2FuIHNob3dcbiAgLy8gdGhlIHBhcnQgb2YgdGhlIHNvdXJjZSB0aGF0IGNhdXNlZCBpdC5cbiAgdmFyIGdyYW1tYXJFcnJvcnMgPSBbXTtcbiAgdmFyIGdyYW1tYXJIYXNJbnZhbGlkQXBwbGljYXRpb25zID0gZmFsc2U7XG4gIE9iamVjdC5rZXlzKGdyYW1tYXIucnVsZXMpLmZvckVhY2goZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgICB2YXIgYm9keSA9IGdyYW1tYXIucnVsZXNbcnVsZU5hbWVdLmJvZHk7XG4gICAgdHJ5IHtcbiAgICAgIGJvZHkuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQXJpdHkocnVsZU5hbWUpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGdyYW1tYXJFcnJvcnMucHVzaChlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIGJvZHkuYXNzZXJ0QWxsQXBwbGljYXRpb25zQXJlVmFsaWQocnVsZU5hbWUsIGdyYW1tYXIpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGdyYW1tYXJFcnJvcnMucHVzaChlKTtcbiAgICAgIGdyYW1tYXJIYXNJbnZhbGlkQXBwbGljYXRpb25zID0gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuICBpZiAoIWdyYW1tYXJIYXNJbnZhbGlkQXBwbGljYXRpb25zKSB7XG4gICAgLy8gVGhlIGZvbGxvd2luZyBjaGVjayBjYW4gb25seSBiZSBkb25lIGlmIHRoZSBncmFtbWFyIGhhcyBubyBpbnZhbGlkIGFwcGxpY2F0aW9ucy5cbiAgICBPYmplY3Qua2V5cyhncmFtbWFyLnJ1bGVzKS5mb3JFYWNoKGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gICAgICB2YXIgYm9keSA9IGdyYW1tYXIucnVsZXNbcnVsZU5hbWVdLmJvZHk7XG4gICAgICB0cnkge1xuICAgICAgICBib2R5LmFzc2VydEl0ZXJhdGVkRXhwcnNBcmVOb3ROdWxsYWJsZShncmFtbWFyLCBydWxlTmFtZSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGdyYW1tYXJFcnJvcnMucHVzaChlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBpZiAoZ3JhbW1hckVycm9ycy5sZW5ndGggPiAwKSB7XG4gICAgZXJyb3JzLnRocm93RXJyb3JzKGdyYW1tYXJFcnJvcnMpO1xuICB9XG4gIGlmICh0aGlzLnNvdXJjZSkge1xuICAgIGdyYW1tYXIuc291cmNlID0gdGhpcy5zb3VyY2U7XG4gIH1cblxuICByZXR1cm4gZ3JhbW1hcjtcbn07XG5cbi8vIFJ1bGUgZGVjbGFyYXRpb25zXG5cbkdyYW1tYXJEZWNsLnByb3RvdHlwZS5kZWZpbmUgPSBmdW5jdGlvbihuYW1lLCBmb3JtYWxzLCBib2R5LCBkZXNjcmlwdGlvbiwgc291cmNlKSB7XG4gIHRoaXMuZW5zdXJlU3VwZXJHcmFtbWFyKCk7XG4gIGlmICh0aGlzLnN1cGVyR3JhbW1hci5ydWxlc1tuYW1lXSkge1xuICAgIHRocm93IGVycm9ycy5kdXBsaWNhdGVSdWxlRGVjbGFyYXRpb24obmFtZSwgdGhpcy5uYW1lLCB0aGlzLnN1cGVyR3JhbW1hci5uYW1lLCBib2R5LCBzb3VyY2UpO1xuICB9IGVsc2UgaWYgKHRoaXMucnVsZXNbbmFtZV0pIHtcbiAgICB0aHJvdyBlcnJvcnMuZHVwbGljYXRlUnVsZURlY2xhcmF0aW9uKG5hbWUsIHRoaXMubmFtZSwgdGhpcy5uYW1lLCBib2R5LCBzb3VyY2UpO1xuICB9XG4gIHZhciBkdXBsaWNhdGVQYXJhbWV0ZXJOYW1lcyA9IGNvbW1vbi5nZXREdXBsaWNhdGVzKGZvcm1hbHMpO1xuICBpZiAoZHVwbGljYXRlUGFyYW1ldGVyTmFtZXMubGVuZ3RoID4gMCkge1xuICAgIHRocm93IGVycm9ycy5kdXBsaWNhdGVQYXJhbWV0ZXJOYW1lcyhuYW1lLCBkdXBsaWNhdGVQYXJhbWV0ZXJOYW1lcywgYm9keSwgc291cmNlKTtcbiAgfVxuICByZXR1cm4gdGhpcy5pbnN0YWxsKG5hbWUsIGZvcm1hbHMsIGJvZHksIGRlc2NyaXB0aW9uLCBzb3VyY2UpO1xufTtcblxuR3JhbW1hckRlY2wucHJvdG90eXBlLm92ZXJyaWRlID0gZnVuY3Rpb24obmFtZSwgZm9ybWFscywgYm9keSwgZGVzY0lnbm9yZWQsIHNvdXJjZSkge1xuICB2YXIgcnVsZUluZm8gPSB0aGlzLmVuc3VyZVN1cGVyR3JhbW1hcigpLnJ1bGVzW25hbWVdO1xuICBpZiAoIXJ1bGVJbmZvKSB7XG4gICAgdGhyb3cgZXJyb3JzLmNhbm5vdE92ZXJyaWRlVW5kZWNsYXJlZFJ1bGUobmFtZSwgdGhpcy5zdXBlckdyYW1tYXIubmFtZSwgYm9keSwgc291cmNlKTtcbiAgfVxuICB0aGlzLmluc3RhbGxPdmVycmlkZGVuT3JFeHRlbmRlZFJ1bGUobmFtZSwgZm9ybWFscywgYm9keSwgc291cmNlKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5HcmFtbWFyRGVjbC5wcm90b3R5cGUuZXh0ZW5kID0gZnVuY3Rpb24obmFtZSwgZm9ybWFscywgZnJhZ21lbnQsIGRlc2NJZ25vcmVkLCBzb3VyY2UpIHtcbiAgdmFyIHJ1bGVJbmZvID0gdGhpcy5lbnN1cmVTdXBlckdyYW1tYXIoKS5ydWxlc1tuYW1lXTtcbiAgaWYgKCFydWxlSW5mbykge1xuICAgIHRocm93IGVycm9ycy5jYW5ub3RFeHRlbmRVbmRlY2xhcmVkUnVsZShuYW1lLCB0aGlzLnN1cGVyR3JhbW1hci5uYW1lLCBmcmFnbWVudCwgc291cmNlKTtcbiAgfVxuICB2YXIgYm9keSA9IG5ldyBwZXhwcnMuRXh0ZW5kKHRoaXMuc3VwZXJHcmFtbWFyLCBuYW1lLCBmcmFnbWVudCk7XG4gIGJvZHkuc291cmNlID0gZnJhZ21lbnQuc291cmNlO1xuICB0aGlzLmluc3RhbGxPdmVycmlkZGVuT3JFeHRlbmRlZFJ1bGUobmFtZSwgZm9ybWFscywgYm9keSwgc291cmNlKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubW9kdWxlLmV4cG9ydHMgPSBHcmFtbWFyRGVjbDtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBJbnRlcnZhbCA9IHJlcXVpcmUoJy4vSW50ZXJ2YWwnKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFByaXZhdGUgc3R1ZmZcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIElucHV0U3RyZWFtKHNvdXJjZSkge1xuICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcbiAgdGhpcy5wb3MgPSAwO1xuICB0aGlzLnBvc0luZm9zID0gW107XG59XG5cbklucHV0U3RyZWFtLnByb3RvdHlwZSA9IHtcbiAgYXRFbmQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnBvcyA9PT0gdGhpcy5zb3VyY2UubGVuZ3RoO1xuICB9LFxuXG4gIG5leHQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnNvdXJjZVt0aGlzLnBvcysrXTtcbiAgfSxcblxuICBtYXRjaFN0cmluZzogZnVuY3Rpb24ocykge1xuICAgIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IHMubGVuZ3RoOyBpZHgrKykge1xuICAgICAgaWYgKHRoaXMubmV4dCgpICE9PSBzW2lkeF0pIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcblxuICBzb3VyY2VTbGljZTogZnVuY3Rpb24oc3RhcnRJZHgsIGVuZElkeCkge1xuICAgIHJldHVybiB0aGlzLnNvdXJjZS5zbGljZShzdGFydElkeCwgZW5kSWR4KTtcbiAgfSxcblxuICBpbnRlcnZhbDogZnVuY3Rpb24oc3RhcnRJZHgsIG9wdEVuZElkeCkge1xuICAgIHJldHVybiBuZXcgSW50ZXJ2YWwodGhpcywgc3RhcnRJZHgsIG9wdEVuZElkeCA/IG9wdEVuZElkeCA6IHRoaXMucG9zKTtcbiAgfVxufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4cG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm1vZHVsZS5leHBvcnRzID0gSW5wdXRTdHJlYW07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgYXNzZXJ0ID0gcmVxdWlyZSgnLi9jb21tb24nKS5hc3NlcnQ7XG52YXIgZXJyb3JzID0gcmVxdWlyZSgnLi9lcnJvcnMnKTtcbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBQcml2YXRlIHN0dWZmXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBJbnRlcnZhbChpbnB1dFN0cmVhbSwgc3RhcnRJZHgsIGVuZElkeCkge1xuICB0aGlzLmlucHV0U3RyZWFtID0gaW5wdXRTdHJlYW07XG4gIHRoaXMuc3RhcnRJZHggPSBzdGFydElkeDtcbiAgdGhpcy5lbmRJZHggPSBlbmRJZHg7XG59XG5cbkludGVydmFsLmNvdmVyYWdlID0gZnVuY3Rpb24oLyogaW50ZXJ2YWwxLCBpbnRlcnZhbDIsIC4uLiAqLykge1xuICB2YXIgaW5wdXRTdHJlYW0gPSBhcmd1bWVudHNbMF0uaW5wdXRTdHJlYW07XG4gIHZhciBzdGFydElkeCA9IGFyZ3VtZW50c1swXS5zdGFydElkeDtcbiAgdmFyIGVuZElkeCA9IGFyZ3VtZW50c1swXS5lbmRJZHg7XG4gIGZvciAodmFyIGlkeCA9IDE7IGlkeCA8IGFyZ3VtZW50cy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgdmFyIGludGVydmFsID0gYXJndW1lbnRzW2lkeF07XG4gICAgaWYgKGludGVydmFsLmlucHV0U3RyZWFtICE9PSBpbnB1dFN0cmVhbSkge1xuICAgICAgdGhyb3cgZXJyb3JzLmludGVydmFsU291cmNlc0RvbnRNYXRjaCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGFydElkeCA9IE1hdGgubWluKHN0YXJ0SWR4LCBhcmd1bWVudHNbaWR4XS5zdGFydElkeCk7XG4gICAgICBlbmRJZHggPSBNYXRoLm1heChlbmRJZHgsIGFyZ3VtZW50c1tpZHhdLmVuZElkeCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBuZXcgSW50ZXJ2YWwoaW5wdXRTdHJlYW0sIHN0YXJ0SWR4LCBlbmRJZHgpO1xufTtcblxuSW50ZXJ2YWwucHJvdG90eXBlID0ge1xuICBjb3ZlcmFnZVdpdGg6IGZ1bmN0aW9uKC8qIGludGVydmFsMSwgaW50ZXJ2YWwyLCAuLi4gKi8pIHtcbiAgICB2YXIgaW50ZXJ2YWxzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICBpbnRlcnZhbHMucHVzaCh0aGlzKTtcbiAgICByZXR1cm4gSW50ZXJ2YWwuY292ZXJhZ2UuYXBwbHkodW5kZWZpbmVkLCBpbnRlcnZhbHMpO1xuICB9LFxuXG4gIGNvbGxhcHNlZExlZnQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgSW50ZXJ2YWwodGhpcy5pbnB1dFN0cmVhbSwgdGhpcy5zdGFydElkeCwgdGhpcy5zdGFydElkeCk7XG4gIH0sXG5cbiAgY29sbGFwc2VkUmlnaHQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgSW50ZXJ2YWwodGhpcy5pbnB1dFN0cmVhbSwgdGhpcy5lbmRJZHgsIHRoaXMuZW5kSWR4KTtcbiAgfSxcblxuICBnZXRMaW5lQW5kQ29sdW1uTWVzc2FnZTogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJhbmdlID0gW3RoaXMuc3RhcnRJZHgsIHRoaXMuZW5kSWR4XTtcbiAgICByZXR1cm4gdXRpbC5nZXRMaW5lQW5kQ29sdW1uTWVzc2FnZSh0aGlzLmlucHV0U3RyZWFtLnNvdXJjZSwgdGhpcy5zdGFydElkeCwgcmFuZ2UpO1xuICB9LFxuXG4gIC8vIFJldHVybnMgYW4gYXJyYXkgb2YgMCwgMSwgb3IgMiBpbnRlcnZhbHMgdGhhdCByZXByZXNlbnRzIHRoZSByZXN1bHQgb2YgdGhlXG4gIC8vIGludGVydmFsIGRpZmZlcmVuY2Ugb3BlcmF0aW9uLlxuICBtaW51czogZnVuY3Rpb24odGhhdCkge1xuICAgIGlmICh0aGlzLmlucHV0U3RyZWFtICE9PSB0aGF0LmlucHV0U3RyZWFtKSB7XG4gICAgICB0aHJvdyBlcnJvcnMuaW50ZXJ2YWxTb3VyY2VzRG9udE1hdGNoKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnN0YXJ0SWR4ID09PSB0aGF0LnN0YXJ0SWR4ICYmIHRoaXMuZW5kSWR4ID09PSB0aGF0LmVuZElkeCkge1xuICAgICAgLy8gYHRoaXNgIGFuZCBgdGhhdGAgYXJlIHRoZSBzYW1lIGludGVydmFsIVxuICAgICAgcmV0dXJuIFtcbiAgICAgIF07XG4gICAgfSBlbHNlIGlmICh0aGlzLnN0YXJ0SWR4IDwgdGhhdC5zdGFydElkeCAmJiB0aGF0LmVuZElkeCA8IHRoaXMuZW5kSWR4KSB7XG4gICAgICAvLyBgdGhhdGAgc3BsaXRzIGB0aGlzYCBpbnRvIHR3byBpbnRlcnZhbHNcbiAgICAgIHJldHVybiBbXG4gICAgICAgIG5ldyBJbnRlcnZhbCh0aGlzLmlucHV0U3RyZWFtLCB0aGlzLnN0YXJ0SWR4LCB0aGF0LnN0YXJ0SWR4KSxcbiAgICAgICAgbmV3IEludGVydmFsKHRoaXMuaW5wdXRTdHJlYW0sIHRoYXQuZW5kSWR4LCB0aGlzLmVuZElkeClcbiAgICAgIF07XG4gICAgfSBlbHNlIGlmICh0aGlzLnN0YXJ0SWR4IDwgdGhhdC5lbmRJZHggJiYgdGhhdC5lbmRJZHggPCB0aGlzLmVuZElkeCkge1xuICAgICAgLy8gYHRoYXRgIGNvbnRhaW5zIGEgcHJlZml4IG9mIGB0aGlzYFxuICAgICAgcmV0dXJuIFtcbiAgICAgICAgbmV3IEludGVydmFsKHRoaXMuaW5wdXRTdHJlYW0sIHRoYXQuZW5kSWR4LCB0aGlzLmVuZElkeClcbiAgICAgIF07XG4gICAgfSBlbHNlIGlmICh0aGlzLnN0YXJ0SWR4IDwgdGhhdC5zdGFydElkeCAmJiB0aGF0LnN0YXJ0SWR4IDwgdGhpcy5lbmRJZHgpIHtcbiAgICAgIC8vIGB0aGF0YCBjb250YWlucyBhIHN1ZmZpeCBvZiBgdGhpc2BcbiAgICAgIHJldHVybiBbXG4gICAgICAgIG5ldyBJbnRlcnZhbCh0aGlzLmlucHV0U3RyZWFtLCB0aGlzLnN0YXJ0SWR4LCB0aGF0LnN0YXJ0SWR4KVxuICAgICAgXTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gYHRoYXRgIGFuZCBgdGhpc2AgZG8gbm90IG92ZXJsYXBcbiAgICAgIHJldHVybiBbXG4gICAgICAgIHRoaXNcbiAgICAgIF07XG4gICAgfVxuICB9LFxuXG4gIC8vIFJldHVybnMgYSBuZXcgSW50ZXJ2YWwgdGhhdCBoYXMgdGhlIHNhbWUgZXh0ZW50IGFzIHRoaXMgb25lLCBidXQgd2hpY2ggaXMgcmVsYXRpdmVcbiAgLy8gdG8gYHRoYXRgLCBhbiBJbnRlcnZhbCB0aGF0IGZ1bGx5IGNvdmVycyB0aGlzIG9uZS5cbiAgcmVsYXRpdmVUbzogZnVuY3Rpb24odGhhdCwgbmV3SW5wdXRTdHJlYW0pIHtcbiAgICBpZiAodGhpcy5pbnB1dFN0cmVhbSAhPT0gdGhhdC5pbnB1dFN0cmVhbSkge1xuICAgICAgdGhyb3cgZXJyb3JzLmludGVydmFsU291cmNlc0RvbnRNYXRjaCgpO1xuICAgIH1cbiAgICBhc3NlcnQodGhpcy5zdGFydElkeCA+PSB0aGF0LnN0YXJ0SWR4ICYmIHRoaXMuZW5kSWR4IDw9IHRoYXQuZW5kSWR4LFxuICAgICAgICAgICAnb3RoZXIgaW50ZXJ2YWwgZG9lcyBub3QgY292ZXIgdGhpcyBvbmUnKTtcbiAgICByZXR1cm4gbmV3IEludGVydmFsKG5ld0lucHV0U3RyZWFtLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydElkeCAtIHRoYXQuc3RhcnRJZHgsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZElkeCAtIHRoYXQuc3RhcnRJZHgpO1xuICB9LFxuXG4gIC8vIFJldHVybnMgYSBuZXcgSW50ZXJ2YWwgd2hpY2ggY29udGFpbnMgdGhlIHNhbWUgY29udGVudHMgYXMgdGhpcyBvbmUsXG4gIC8vIGJ1dCB3aXRoIHdoaXRlc3BhY2UgdHJpbW1lZCBmcm9tIGJvdGggZW5kcy4gKFRoaXMgb25seSBtYWtlcyBzZW5zZSB3aGVuXG4gIC8vIHRoZSBpbnB1dCBzdHJlYW0gaXMgYSBzdHJpbmcuKVxuICB0cmltbWVkOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgY29udGVudHMgPSB0aGlzLmNvbnRlbnRzO1xuICAgIHZhciBzdGFydElkeCA9IHRoaXMuc3RhcnRJZHggKyBjb250ZW50cy5tYXRjaCgvXlxccyovKVswXS5sZW5ndGg7XG4gICAgdmFyIGVuZElkeCA9IHRoaXMuZW5kSWR4IC0gY29udGVudHMubWF0Y2goL1xccyokLylbMF0ubGVuZ3RoO1xuICAgIHJldHVybiBuZXcgSW50ZXJ2YWwodGhpcy5pbnB1dFN0cmVhbSwgc3RhcnRJZHgsIGVuZElkeCk7XG4gIH1cbn07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKEludGVydmFsLnByb3RvdHlwZSwge1xuICBjb250ZW50czoge1xuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5fY29udGVudHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9jb250ZW50cyA9IHRoaXMuaW5wdXRTdHJlYW0uc291cmNlU2xpY2UodGhpcy5zdGFydElkeCwgdGhpcy5lbmRJZHgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuX2NvbnRlbnRzO1xuICAgIH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZVxuICB9LFxuICBsZW5ndGg6IHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5lbmRJZHggLSB0aGlzLnN0YXJ0SWR4OyB9LFxuICAgIGVudW1lcmFibGU6IHRydWVcbiAgfVxufSk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5tb2R1bGUuZXhwb3J0cyA9IEludGVydmFsO1xuXG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpO1xuXG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24nKTtcbnZhciBub2RlcyA9IHJlcXVpcmUoJy4vbm9kZXMnKTtcbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyk7XG52YXIgSW50ZXJ2YWwgPSByZXF1aXJlKCcuL0ludGVydmFsJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBQcml2YXRlIHN0dWZmXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyBDcmVhdGUgYSBzaG9ydCBlcnJvciBtZXNzYWdlIGZvciBhbiBlcnJvciB0aGF0IG9jY3VycmVkIGR1cmluZyBtYXRjaGluZy5cbmZ1bmN0aW9uIGdldFNob3J0TWF0Y2hFcnJvck1lc3NhZ2UocG9zLCBzb3VyY2UsIGRldGFpbCkge1xuICB2YXIgZXJyb3JJbmZvID0gdXRpbC5nZXRMaW5lQW5kQ29sdW1uKHNvdXJjZSwgcG9zKTtcbiAgcmV0dXJuICdMaW5lICcgKyBlcnJvckluZm8ubGluZU51bSArICcsIGNvbCAnICsgZXJyb3JJbmZvLmNvbE51bSArICc6ICcgKyBkZXRhaWw7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tIE1hdGNoRmFpbHVyZSAtLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBNYXRjaFJlc3VsdChzdGF0ZSkge1xuICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gIHRoaXMuX2NzdCA9IHN0YXRlLmJpbmRpbmdzWzBdO1xufVxuXG5NYXRjaFJlc3VsdC5uZXdGb3IgPSBmdW5jdGlvbihzdGF0ZSkge1xuICB2YXIgc3VjY2VlZGVkID0gc3RhdGUuYmluZGluZ3MubGVuZ3RoID4gMDtcbiAgcmV0dXJuIHN1Y2NlZWRlZCA/IG5ldyBNYXRjaFJlc3VsdChzdGF0ZSkgOiBuZXcgTWF0Y2hGYWlsdXJlKHN0YXRlKTtcbn07XG5cbk1hdGNoUmVzdWx0LnByb3RvdHlwZS5mYWlsZWQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuTWF0Y2hSZXN1bHQucHJvdG90eXBlLnN1Y2NlZWRlZCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gIXRoaXMuZmFpbGVkKCk7XG59O1xuXG4vLyBSZXR1cm5zIGEgYE1hdGNoUmVzdWx0YCB0aGF0IGNhbiBiZSBmZWQgaW50byBvcGVyYXRpb25zIG9yIGF0dHJpYnV0ZXMgdGhhdCBjYXJlXG4vLyBhYm91dCB0aGUgd2hpdGVzcGFjZSB0aGF0IHdhcyBpbXBsaWNpdGx5IHNraXBwZWQgb3ZlciBieSBzeW50YWN0aWMgcnVsZXMuIFRoaXNcbi8vIGlzIHVzZWZ1bCBmb3IgZG9pbmcgdGhpbmdzIHdpdGggY29tbWVudHMsIGUuZy4sIHN5bnRheCBoaWdobGlnaHRpbmcuXG5NYXRjaFJlc3VsdC5wcm90b3R5cGUuZ2V0RGlzY2FyZGVkU3BhY2VzID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLmZhaWxlZCgpKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgdmFyIHN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgdmFyIGdyYW1tYXIgPSBzdGF0ZS5ncmFtbWFyO1xuICB2YXIgaW5wdXRTdHJlYW0gPSBzdGF0ZS5pbnB1dFN0cmVhbTtcblxuICB2YXIgaW50ZXJ2YWxzID0gW25ldyBJbnRlcnZhbChpbnB1dFN0cmVhbSwgMCwgaW5wdXRTdHJlYW0uc291cmNlLmxlbmd0aCldO1xuXG4gIC8vIFN1YnRyYWN0IHRoZSBpbnRlcnZhbCBvZiBlYWNoIHRlcm1pbmFsIGZyb20gdGhlIHNldCBvZiBpbnRlcnZhbHMgYWJvdmUuXG4gIHZhciBzID0gZ3JhbW1hci5jcmVhdGVTZW1hbnRpY3MoKS5hZGRPcGVyYXRpb24oJ3N1YnRyYWN0VGVybWluYWxzJywge1xuICAgIF9ub250ZXJtaW5hbDogZnVuY3Rpb24oY2hpbGRyZW4pIHtcbiAgICAgIGNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24oY2hpbGQpIHtcbiAgICAgICAgY2hpbGQuc3VidHJhY3RUZXJtaW5hbHMoKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgX3Rlcm1pbmFsOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB0ID0gdGhpcztcbiAgICAgIGludGVydmFscyA9IGludGVydmFsc1xuICAgICAgICAgIC5tYXAoZnVuY3Rpb24oaW50ZXJ2YWwpIHsgcmV0dXJuIGludGVydmFsLm1pbnVzKHQuc291cmNlKTsgfSlcbiAgICAgICAgICAucmVkdWNlKGZ1bmN0aW9uKHhzLCB5cykgeyByZXR1cm4geHMuY29uY2F0KHlzKTsgfSwgW10pO1xuICAgIH1cbiAgfSk7XG4gIHModGhpcykuc3VidHJhY3RUZXJtaW5hbHMoKTtcblxuICAvLyBOb3cgYGludGVydmFsc2AgaG9sZHMgdGhlIGludGVydmFscyBvZiB0aGUgaW5wdXQgc3RyZWFtIHRoYXQgd2VyZSBza2lwcGVkIG92ZXIgYnkgc3ludGFjdGljXG4gIC8vIHJ1bGVzLCBiZWNhdXNlIHRoZXkgY29udGFpbmVkIHNwYWNlcy5cblxuICAvLyBOZXh0LCB3ZSB3YW50IHRvIG1hdGNoIHRoZSBjb250ZW50cyBvZiBlYWNoIG9mIHRob3NlIGludGVydmFscyB3aXRoIHRoZSBncmFtbWFyJ3MgYHNwYWNlc2BcbiAgLy8gcnVsZSwgdG8gcmVjb25zdHJ1Y3QgdGhlIENTVCBub2RlcyB0aGF0IHdlcmUgZGlzY2FyZGVkIGJ5IHN5bnRhY3RpYyBydWxlcy4gQnV0IGlmIHdlIHNpbXBseVxuICAvLyBwYXNzIGVhY2ggaW50ZXJ2YWwncyBgY29udGVudHNgIHRvIHRoZSBncmFtbWFyJ3MgYG1hdGNoYCBtZXRob2QsIHRoZSByZXN1bHRpbmcgbm9kZXMgYW5kXG4gIC8vIHRoZWlyIGNoaWxkcmVuIHdpbGwgaGF2ZSBpbnRlcnZhbHMgdGhhdCBhcmUgYXNzb2NpYXRlZCB3aXRoIGEgZGlmZmVyZW50IGlucHV0LCBpLmUuLCBhXG4gIC8vIHN1YnN0cmluZyBvZiB0aGUgb3JpZ2luYWwgaW5wdXQuIFRoZSBmb2xsb3dpbmcgb3BlcmF0aW9uIHdpbGwgZml4IHRoaXMgcHJvYmxlbSBmb3IgdXMuXG4gIHMuYWRkT3BlcmF0aW9uKCdmaXhJbnRlcnZhbHMoaWR4T2Zmc2V0KScsIHtcbiAgICBfZGVmYXVsdDogZnVuY3Rpb24oY2hpbGRyZW4pIHtcbiAgICAgIHZhciBpZHhPZmZzZXQgPSB0aGlzLmFyZ3MuaWR4T2Zmc2V0O1xuICAgICAgdGhpcy5zb3VyY2UuaW5wdXRTdHJlYW0gPSBpbnB1dFN0cmVhbTtcbiAgICAgIHRoaXMuc291cmNlLnN0YXJ0SWR4ICs9IGlkeE9mZnNldDtcbiAgICAgIHRoaXMuc291cmNlLmVuZElkeCArPSBpZHhPZmZzZXQ7XG4gICAgICBpZiAoIXRoaXMuaXNUZXJtaW5hbCgpKSB7XG4gICAgICAgIGNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24oY2hpbGQpIHtcbiAgICAgICAgICBjaGlsZC5maXhJbnRlcnZhbHMoaWR4T2Zmc2V0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICAvLyBOb3cgd2UncmUgZmluYWxseSByZWFkeSB0byByZWNvbnN0cnVjdCB0aGUgZGlzY2FyZGVkIENTVCBub2Rlcy5cbiAgdmFyIGRpc2NhcmRlZE5vZGVzID0gaW50ZXJ2YWxzLm1hcChmdW5jdGlvbihpbnRlcnZhbCkge1xuICAgIHZhciByID0gZ3JhbW1hci5tYXRjaChpbnRlcnZhbC5jb250ZW50cywgJ3NwYWNlcycpO1xuICAgIHMocikuZml4SW50ZXJ2YWxzKGludGVydmFsLnN0YXJ0SWR4KTtcbiAgICByZXR1cm4gci5fY3N0O1xuICB9KTtcblxuICAvLyBSYXRoZXIgdGhhbiByZXR1cm4gYSBidW5jaCBvZiBDU1Qgbm9kZXMgYW5kIG1ha2UgdGhlIGNhbGxlciBvZiB0aGlzIG1ldGhvZCBsb29wIG92ZXIgdGhlbSxcbiAgLy8gd2UgY2FuIGNvbnN0cnVjdCBhIHNpbmdsZSBDU1Qgbm9kZSB0aGF0IGlzIHRoZSBwYXJlbnQgb2YgYWxsIG9mIHRoZSBkaXNjYXJkZWQgbm9kZXMuIEFuXG4gIC8vIGBJdGVyYXRpb25Ob2RlYCBpcyB0aGUgb2J2aW91cyBjaG9pY2UgZm9yIHRoaXMuXG4gIGRpc2NhcmRlZE5vZGVzID0gbmV3IG5vZGVzLkl0ZXJhdGlvbk5vZGUoXG4gICAgICBncmFtbWFyLFxuICAgICAgZGlzY2FyZGVkTm9kZXMsXG4gICAgICBkaXNjYXJkZWROb2Rlcy5sZW5ndGggPT09IDAgP1xuICAgICAgICAgIG5ldyBJbnRlcnZhbChpbnB1dFN0cmVhbSwgMCwgMCkgOlxuICAgICAgICAgIG5ldyBJbnRlcnZhbChcbiAgICAgICAgICAgICAgaW5wdXRTdHJlYW0sXG4gICAgICAgICAgICAgIGRpc2NhcmRlZE5vZGVzWzBdLnNvdXJjZS5zdGFydElkeCxcbiAgICAgICAgICAgICAgZGlzY2FyZGVkTm9kZXNbZGlzY2FyZGVkTm9kZXMubGVuZ3RoIC0gMV0uc291cmNlLmVuZElkeCkpO1xuXG4gIC8vIEJ1dCByZW1lbWJlciB0aGF0IGEgQ1NUIG5vZGUgY2FuJ3QgYmUgdXNlZCBkaXJlY3RseSBieSBjbGllbnRzLiBXaGF0IHdlIHJlYWxseSBuZWVkIHRvIHJldHVyblxuICAvLyBmcm9tIHRoaXMgbWV0aG9kIGlzIGEgc3VjY2Vzc2Z1bCBgTWF0Y2hSZXN1bHRgIHRoYXQgY2FuIGJlIHVzZWQgd2l0aCB0aGUgY2xpZW50cycgc2VtYW50aWNzLlxuICAvLyBXZSBhbHJlYWR5IGhhdmUgb25lIC0tIGB0aGlzYCAtLSBidXQgaXQncyBnb3QgYSBkaWZmZXJlbnQgQ1NUIG5vZGUgaW5zaWRlLiBTbyB3ZSBjcmVhdGUgYSBuZXdcbiAgLy8gb2JqZWN0IHRoYXQgZGVsZWdhdGVzIHRvIGB0aGlzYCwgYW5kIG92ZXJyaWRlIGl0cyBgX2NzdGAgcHJvcGVydHkuXG4gIHZhciByID0gT2JqZWN0LmNyZWF0ZSh0aGlzKTtcbiAgci5fY3N0ID0gZGlzY2FyZGVkTm9kZXM7XG5cbiAgLy8gV2UgYWxzbyBvdmVycmlkZSBpdHMgYGdldERpc2NhcmRlZFNwYWNlc2AgbWV0aG9kLCBpbiBjYXNlIHNvbWVvbmUgZGVjaWRlcyB0byBjYWxsIGl0LlxuICByLmdldERpc2NhcmRlZFNwYWNlcyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gcjsgfTtcblxuICByZXR1cm4gcjtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tIE1hdGNoRmFpbHVyZSAtLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBNYXRjaEZhaWx1cmUoc3RhdGUpIHtcbiAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICBjb21tb24uZGVmaW5lTGF6eVByb3BlcnR5KHRoaXMsICdfZmFpbHVyZXMnLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5nZXRGYWlsdXJlcygpO1xuICB9KTtcbiAgY29tbW9uLmRlZmluZUxhenlQcm9wZXJ0eSh0aGlzLCAnbWVzc2FnZScsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzb3VyY2UgPSB0aGlzLnN0YXRlLmlucHV0U3RyZWFtLnNvdXJjZTtcbiAgICBpZiAodHlwZW9mIHNvdXJjZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiAnbWF0Y2ggZmFpbGVkIGF0IHBvc2l0aW9uICcgKyB0aGlzLmdldFJpZ2h0bW9zdEZhaWx1cmVQb3NpdGlvbigpO1xuICAgIH1cblxuICAgIHZhciBkZXRhaWwgPSAnRXhwZWN0ZWQgJyArIHRoaXMuZ2V0RXhwZWN0ZWRUZXh0KCk7XG4gICAgcmV0dXJuIHV0aWwuZ2V0TGluZUFuZENvbHVtbk1lc3NhZ2Uoc291cmNlLCB0aGlzLmdldFJpZ2h0bW9zdEZhaWx1cmVQb3NpdGlvbigpKSArIGRldGFpbDtcbiAgfSk7XG4gIGNvbW1vbi5kZWZpbmVMYXp5UHJvcGVydHkodGhpcywgJ3Nob3J0TWVzc2FnZScsIGZ1bmN0aW9uKCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5zdGF0ZS5pbnB1dFN0cmVhbS5zb3VyY2UgIT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gJ21hdGNoIGZhaWxlZCBhdCBwb3NpdGlvbiAnICsgdGhpcy5nZXRSaWdodG1vc3RGYWlsdXJlUG9zaXRpb24oKTtcbiAgICB9XG4gICAgdmFyIGRldGFpbCA9ICdleHBlY3RlZCAnICsgdGhpcy5nZXRFeHBlY3RlZFRleHQoKTtcbiAgICByZXR1cm4gZ2V0U2hvcnRNYXRjaEVycm9yTWVzc2FnZShcbiAgICAgICAgdGhpcy5nZXRSaWdodG1vc3RGYWlsdXJlUG9zaXRpb24oKSxcbiAgICAgICAgdGhpcy5zdGF0ZS5pbnB1dFN0cmVhbS5zb3VyY2UsXG4gICAgICAgIGRldGFpbCk7XG4gIH0pO1xufVxuaW5oZXJpdHMoTWF0Y2hGYWlsdXJlLCBNYXRjaFJlc3VsdCk7XG5cbk1hdGNoRmFpbHVyZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICdbTWF0Y2hGYWlsdXJlIGF0IHBvc2l0aW9uICcgKyB0aGlzLmdldFJpZ2h0bW9zdEZhaWx1cmVQb3NpdGlvbigpICsgJ10nO1xufTtcblxuTWF0Y2hGYWlsdXJlLnByb3RvdHlwZS5mYWlsZWQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5NYXRjaEZhaWx1cmUucHJvdG90eXBlLmdldFJpZ2h0bW9zdEZhaWx1cmVQb3NpdGlvbiA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5zdGF0ZS5nZXRSaWdodG1vc3RGYWlsdXJlUG9zaXRpb24oKTtcbn07XG5cbk1hdGNoRmFpbHVyZS5wcm90b3R5cGUuZ2V0UmlnaHRtb3N0RmFpbHVyZXMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuX2ZhaWx1cmVzO1xufTtcblxuLy8gUmV0dXJuIGEgc3RyaW5nIHN1bW1hcml6aW5nIHRoZSBleHBlY3RlZCBjb250ZW50cyBvZiB0aGUgaW5wdXQgc3RyZWFtIHdoZW5cbi8vIHRoZSBtYXRjaCBmYWlsdXJlIG9jY3VycmVkLlxuTWF0Y2hGYWlsdXJlLnByb3RvdHlwZS5nZXRFeHBlY3RlZFRleHQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHNiID0gbmV3IGNvbW1vbi5TdHJpbmdCdWZmZXIoKTtcbiAgdmFyIGZhaWx1cmVzID0gdGhpcy5nZXRSaWdodG1vc3RGYWlsdXJlcygpO1xuXG4gIC8vIEZpbHRlciBvdXQgdGhlIGZsdWZmeSBmYWlsdXJlcyB0byBtYWtlIHRoZSBkZWZhdWx0IGVycm9yIG1lc3NhZ2VzIG1vcmUgdXNlZnVsXG4gIGZhaWx1cmVzID0gZmFpbHVyZXMuZmlsdGVyKGZ1bmN0aW9uKGZhaWx1cmUpIHtcbiAgICByZXR1cm4gIWZhaWx1cmUuaXNGbHVmZnkoKTtcbiAgfSk7XG5cbiAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgZmFpbHVyZXMubGVuZ3RoOyBpZHgrKykge1xuICAgIGlmIChpZHggPiAwKSB7XG4gICAgICBpZiAoaWR4ID09PSBmYWlsdXJlcy5sZW5ndGggLSAxKSB7XG4gICAgICAgIHNiLmFwcGVuZCgoZmFpbHVyZXMubGVuZ3RoID4gMiA/ICcsIG9yICcgOiAnIG9yICcpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNiLmFwcGVuZCgnLCAnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgc2IuYXBwZW5kKGZhaWx1cmVzW2lkeF0udG9TdHJpbmcoKSk7XG4gIH1cbiAgcmV0dXJuIHNiLmNvbnRlbnRzKCk7XG59O1xuXG5NYXRjaEZhaWx1cmUucHJvdG90eXBlLmdldEludGVydmFsID0gZnVuY3Rpb24oKSB7XG4gIHZhciBwb3MgPSB0aGlzLnN0YXRlLmdldFJpZ2h0bW9zdEZhaWx1cmVQb3NpdGlvbigpO1xuICByZXR1cm4gbmV3IEludGVydmFsKHRoaXMuc3RhdGUuaW5wdXRTdHJlYW0sIHBvcywgcG9zKTtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5tb2R1bGUuZXhwb3J0cyA9IE1hdGNoUmVzdWx0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGV4dGVuZCA9IHJlcXVpcmUoJ3V0aWwtZXh0ZW5kJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBQcml2YXRlIHN0dWZmXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBOYW1lc3BhY2UoKSB7XG59XG5OYW1lc3BhY2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuTmFtZXNwYWNlLmFzTmFtZXNwYWNlID0gZnVuY3Rpb24ob2JqT3JOYW1lc3BhY2UpIHtcbiAgaWYgKG9iak9yTmFtZXNwYWNlIGluc3RhbmNlb2YgTmFtZXNwYWNlKSB7XG4gICAgcmV0dXJuIG9iak9yTmFtZXNwYWNlO1xuICB9XG4gIHJldHVybiBOYW1lc3BhY2UuY3JlYXRlTmFtZXNwYWNlKG9iak9yTmFtZXNwYWNlKTtcbn07XG5cbi8vIENyZWF0ZSBhIG5ldyBuYW1lc3BhY2UuIElmIGBvcHRQcm9wc2AgaXMgc3BlY2lmaWVkLCBhbGwgb2YgaXRzIHByb3BlcnRpZXNcbi8vIHdpbGwgYmUgY29waWVkIHRvIHRoZSBuZXcgbmFtZXNwYWNlLlxuTmFtZXNwYWNlLmNyZWF0ZU5hbWVzcGFjZSA9IGZ1bmN0aW9uKG9wdFByb3BzKSB7XG4gIHJldHVybiBOYW1lc3BhY2UuZXh0ZW5kKE5hbWVzcGFjZS5wcm90b3R5cGUsIG9wdFByb3BzKTtcbn07XG5cbi8vIENyZWF0ZSBhIG5ldyBuYW1lc3BhY2Ugd2hpY2ggZXh0ZW5kcyBhbm90aGVyIG5hbWVzcGFjZS4gSWYgYG9wdFByb3BzYCBpc1xuLy8gc3BlY2lmaWVkLCBhbGwgb2YgaXRzIHByb3BlcnRpZXMgd2lsbCBiZSBjb3BpZWQgdG8gdGhlIG5ldyBuYW1lc3BhY2UuXG5OYW1lc3BhY2UuZXh0ZW5kID0gZnVuY3Rpb24obmFtZXNwYWNlLCBvcHRQcm9wcykge1xuICBpZiAobmFtZXNwYWNlICE9PSBOYW1lc3BhY2UucHJvdG90eXBlICYmICEobmFtZXNwYWNlIGluc3RhbmNlb2YgTmFtZXNwYWNlKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ25vdCBhIE5hbWVzcGFjZSBvYmplY3Q6ICcgKyBuYW1lc3BhY2UpO1xuICB9XG4gIHZhciBucyA9IE9iamVjdC5jcmVhdGUobmFtZXNwYWNlLCB7XG4gICAgY29uc3RydWN0b3I6IHtcbiAgICAgIHZhbHVlOiBOYW1lc3BhY2UsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGV4dGVuZChucywgb3B0UHJvcHMpO1xufTtcblxuLy8gVE9ETzogU2hvdWxkIHRoaXMgYmUgYSByZWd1bGFyIG1ldGhvZD9cbk5hbWVzcGFjZS50b1N0cmluZyA9IGZ1bmN0aW9uKG5zKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobnMpO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4cG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm1vZHVsZS5leHBvcnRzID0gTmFtZXNwYWNlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUHJpdmF0ZSBzdHVmZlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gUG9zSW5mbyhzdGF0ZSkge1xuICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gIHRoaXMuYXBwbGljYXRpb25NZW1vS2V5U3RhY2sgPSBbXTsgIC8vIGEgc3RhY2sgb2YgXCJtZW1vIGtleXNcIiBvZiB0aGUgYWN0aXZlIGFwcGxpY2F0aW9uc1xuICB0aGlzLm1lbW8gPSB7fTtcbiAgdGhpcy5jdXJyZW50TGVmdFJlY3Vyc2lvbiA9IHVuZGVmaW5lZDtcbn1cblxuUG9zSW5mby5wcm90b3R5cGUgPSB7XG4gIGlzQWN0aXZlOiBmdW5jdGlvbihhcHBsaWNhdGlvbikge1xuICAgIHJldHVybiB0aGlzLmFwcGxpY2F0aW9uTWVtb0tleVN0YWNrLmluZGV4T2YoYXBwbGljYXRpb24udG9NZW1vS2V5KCkpID49IDA7XG4gIH0sXG5cbiAgZW50ZXI6IGZ1bmN0aW9uKGFwcGxpY2F0aW9uKSB7XG4gICAgdGhpcy5zdGF0ZS5lbnRlcihhcHBsaWNhdGlvbik7XG4gICAgdGhpcy5hcHBsaWNhdGlvbk1lbW9LZXlTdGFjay5wdXNoKGFwcGxpY2F0aW9uLnRvTWVtb0tleSgpKTtcbiAgfSxcblxuICBleGl0OiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnN0YXRlLmV4aXQoKTtcbiAgICB0aGlzLmFwcGxpY2F0aW9uTWVtb0tleVN0YWNrLnBvcCgpO1xuICB9LFxuXG4gIHN0YXJ0TGVmdFJlY3Vyc2lvbjogZnVuY3Rpb24oaGVhZEFwcGxpY2F0aW9uLCBtZW1vUmVjKSB7XG4gICAgbWVtb1JlYy5pc0xlZnRSZWN1cnNpb24gPSB0cnVlO1xuICAgIG1lbW9SZWMuaGVhZEFwcGxpY2F0aW9uID0gaGVhZEFwcGxpY2F0aW9uO1xuICAgIG1lbW9SZWMubmV4dExlZnRSZWN1cnNpb24gPSB0aGlzLmN1cnJlbnRMZWZ0UmVjdXJzaW9uO1xuICAgIHRoaXMuY3VycmVudExlZnRSZWN1cnNpb24gPSBtZW1vUmVjO1xuXG4gICAgdmFyIGFwcGxpY2F0aW9uTWVtb0tleVN0YWNrID0gdGhpcy5hcHBsaWNhdGlvbk1lbW9LZXlTdGFjaztcbiAgICB2YXIgaW5kZXhPZkZpcnN0SW52b2x2ZWRSdWxlID0gYXBwbGljYXRpb25NZW1vS2V5U3RhY2suaW5kZXhPZihoZWFkQXBwbGljYXRpb24udG9NZW1vS2V5KCkpICsgMTtcbiAgICB2YXIgaW52b2x2ZWRBcHBsaWNhdGlvbk1lbW9LZXlzID0gYXBwbGljYXRpb25NZW1vS2V5U3RhY2suc2xpY2UoaW5kZXhPZkZpcnN0SW52b2x2ZWRSdWxlKTtcblxuICAgIG1lbW9SZWMuaXNJbnZvbHZlZCA9IGZ1bmN0aW9uKGFwcGxpY2F0aW9uTWVtb0tleSkge1xuICAgICAgcmV0dXJuIGludm9sdmVkQXBwbGljYXRpb25NZW1vS2V5cy5pbmRleE9mKGFwcGxpY2F0aW9uTWVtb0tleSkgPj0gMDtcbiAgICB9O1xuXG4gICAgbWVtb1JlYy51cGRhdGVJbnZvbHZlZEFwcGxpY2F0aW9uTWVtb0tleXMgPSBmdW5jdGlvbigpIHtcbiAgICAgIGZvciAodmFyIGlkeCA9IGluZGV4T2ZGaXJzdEludm9sdmVkUnVsZTsgaWR4IDwgYXBwbGljYXRpb25NZW1vS2V5U3RhY2subGVuZ3RoOyBpZHgrKykge1xuICAgICAgICB2YXIgYXBwbGljYXRpb25NZW1vS2V5ID0gYXBwbGljYXRpb25NZW1vS2V5U3RhY2tbaWR4XTtcbiAgICAgICAgaWYgKCF0aGlzLmlzSW52b2x2ZWQoYXBwbGljYXRpb25NZW1vS2V5KSkge1xuICAgICAgICAgIGludm9sdmVkQXBwbGljYXRpb25NZW1vS2V5cy5wdXNoKGFwcGxpY2F0aW9uTWVtb0tleSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9LFxuXG4gIGVuZExlZnRSZWN1cnNpb246IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuY3VycmVudExlZnRSZWN1cnNpb24gPSB0aGlzLmN1cnJlbnRMZWZ0UmVjdXJzaW9uLm5leHRMZWZ0UmVjdXJzaW9uO1xuICB9LFxuXG4gIC8vIE5vdGU6IHRoaXMgbWV0aG9kIGRvZXNuJ3QgZ2V0IGNhbGxlZCBmb3IgdGhlIFwiaGVhZFwiIG9mIGEgbGVmdCByZWN1cnNpb24gLS0gZm9yIExSIGhlYWRzLFxuICAvLyB0aGUgbWVtb2l6ZWQgcmVzdWx0ICh3aGljaCBzdGFydHMgb3V0IGJlaW5nIGEgZmFpbHVyZSkgaXMgYWx3YXlzIHVzZWQuXG4gIHNob3VsZFVzZU1lbW9pemVkUmVzdWx0OiBmdW5jdGlvbihtZW1vUmVjKSB7XG4gICAgaWYgKCFtZW1vUmVjLmlzTGVmdFJlY3Vyc2lvbikge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHZhciBhcHBsaWNhdGlvbk1lbW9LZXlTdGFjayA9IHRoaXMuYXBwbGljYXRpb25NZW1vS2V5U3RhY2s7XG4gICAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgYXBwbGljYXRpb25NZW1vS2V5U3RhY2subGVuZ3RoOyBpZHgrKykge1xuICAgICAgdmFyIGFwcGxpY2F0aW9uTWVtb0tleSA9IGFwcGxpY2F0aW9uTWVtb0tleVN0YWNrW2lkeF07XG4gICAgICBpZiAobWVtb1JlYy5pc0ludm9sdmVkKGFwcGxpY2F0aW9uTWVtb0tleSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4cG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm1vZHVsZS5leHBvcnRzID0gUG9zSW5mbztcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBTeW1ib2wgPSByZXF1aXJlKCdlczYtc3ltYm9sJyk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpO1xuXG52YXIgTWF0Y2hSZXN1bHQgPSByZXF1aXJlKCcuL01hdGNoUmVzdWx0Jyk7XG52YXIgSXRlcmF0aW9uTm9kZSA9IHJlcXVpcmUoJy4vbm9kZXMnKS5JdGVyYXRpb25Ob2RlO1xudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBQcml2YXRlIHN0dWZmXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyBKU09OIGlzIG5vdCBhIHZhbGlkIHN1YnNldCBvZiBKYXZhU2NyaXB0IGJlY2F1c2UgdGhlcmUgYXJlIHR3byBwb3NzaWJsZSBsaW5lIHRlcm1pbmF0b3JzLFxuLy8gVSsyMDI4IChsaW5lIHNlcGFyYXRvcikgYW5kIFUrMjAyOSAocGFyYWdyYXBoIHNlcGFyYXRvcikgdGhhdCBhcmUgYWxsb3dlZCBpbiBKU09OIHN0cmluZ3Ncbi8vIGJ1dCBub3QgaW4gSmF2YVNjcmlwdCBzdHJpbmdzLlxuLy8ganNvblRvSlMoKSBwcm9wZXJseSBlbmNvZGVzIHRob3NlIHR3byBjaGFyYWN0ZXJzIGluIEpTT04gc28gdGhhdCBpdCBjYW4gc2VhbWxlc3NseSBiZVxuLy8gaW5zZXJ0ZWQgaW50byBKYXZhU2NyaXB0IGNvZGUgKHBsdXMgdGhlIGVuY29kZWQgdmVyc2lvbiBpcyBzdGlsbCB2YWxpZCBKU09OKVxuZnVuY3Rpb24ganNvblRvSlMoc3RyKSB7XG4gIHZhciBvdXRwdXQgPSBzdHIucmVwbGFjZSgvW1xcdTIwMjhcXHUyMDI5XS9nLCBmdW5jdGlvbihjaGFyLCBwb3MsIHN0cikge1xuICAgIHZhciBoZXggPSBjaGFyLmNvZGVQb2ludEF0KDApLnRvU3RyaW5nKDE2KTtcbiAgICByZXR1cm4gJ1xcXFx1JyArICcwMDAwJy5zbGljZShoZXgubGVuZ3RoKSArIGhleDtcbiAgfSk7XG4gIHJldHVybiBvdXRwdXQ7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tIFdyYXBwZXJzIC0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIFdyYXBwZXJzIGRlY29yYXRlIENTVCBub2RlcyB3aXRoIGFsbCBvZiB0aGUgZnVuY3Rpb25hbGl0eSAoaS5lLiwgb3BlcmF0aW9ucyBhbmQgYXR0cmlidXRlcylcbi8vIHByb3ZpZGVkIGJ5IGEgU2VtYW50aWNzIChzZWUgYmVsb3cpLiBgV3JhcHBlcmAgaXMgdGhlIGFic3RyYWN0IHN1cGVyY2xhc3Mgb2YgYWxsIHdyYXBwZXJzLiBBXG4vLyBgV3JhcHBlcmAgbXVzdCBoYXZlIGBfbm9kZWAgYW5kIGBfc2VtYW50aWNzYCBpbnN0YW5jZSB2YXJpYWJsZXMsIHdoaWNoIHJlZmVyIHRvIHRoZSBDU1Qgbm9kZSBhbmRcbi8vIFNlbWFudGljcyAocmVzcC4pIGZvciB3aGljaCBpdCB3YXMgY3JlYXRlZCwgYW5kIGEgYF9jaGlsZFdyYXBwZXJzYCBpbnN0YW5jZSB2YXJpYWJsZSB3aGljaCBpc1xuLy8gdXNlZCB0byBjYWNoZSB0aGUgd3JhcHBlciBpbnN0YW5jZXMgdGhhdCBhcmUgY3JlYXRlZCBmb3IgaXRzIGNoaWxkIG5vZGVzLiBTZXR0aW5nIHRoZXNlIGluc3RhbmNlXG4vLyB2YXJpYWJsZXMgaXMgdGhlIHJlc3BvbnNpYmlsaXR5IG9mIHRoZSBjb25zdHJ1Y3RvciBvZiBlYWNoIFNlbWFudGljcy1zcGVjaWZpYyBzdWJjbGFzcyBvZlxuLy8gYFdyYXBwZXJgLlxuZnVuY3Rpb24gV3JhcHBlcigpIHt9XG5cbldyYXBwZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAnW3NlbWFudGljcyB3cmFwcGVyIGZvciAnICsgdGhpcy5fbm9kZS5ncmFtbWFyLm5hbWUgKyAnXSc7XG59O1xuXG5XcmFwcGVyLnByb3RvdHlwZS5fZm9yZ2V0TWVtb2l6ZWRSZXN1bHRGb3IgPSBmdW5jdGlvbihhdHRyaWJ1dGVOYW1lKSB7XG4gIC8vIFJlbW92ZSB0aGUgbWVtb2l6ZWQgYXR0cmlidXRlIGZyb20gdGhlIGNzdE5vZGUgYW5kIGFsbCBpdHMgY2hpbGRyZW4uXG4gIGRlbGV0ZSB0aGlzLl9ub2RlW3RoaXMuX3NlbWFudGljcy5hdHRyaWJ1dGVLZXlzW2F0dHJpYnV0ZU5hbWVdXTtcbiAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgY2hpbGQuX2ZvcmdldE1lbW9pemVkUmVzdWx0Rm9yKGF0dHJpYnV0ZU5hbWUpO1xuICB9KTtcbn07XG5cbi8vIFJldHVybnMgdGhlIHdyYXBwZXIgb2YgdGhlIHNwZWNpZmllZCBjaGlsZCBub2RlLiBDaGlsZCB3cmFwcGVycyBhcmUgY3JlYXRlZCBsYXppbHkgYW5kIGNhY2hlZCBpblxuLy8gdGhlIHBhcmVudCB3cmFwcGVyJ3MgYF9jaGlsZFdyYXBwZXJzYCBpbnN0YW5jZSB2YXJpYWJsZS5cbldyYXBwZXIucHJvdG90eXBlLmNoaWxkID0gZnVuY3Rpb24oaWR4KSB7XG4gIGlmICghKDAgPD0gaWR4ICYmIGlkeCA8IHRoaXMuX25vZGUubnVtQ2hpbGRyZW4oKSkpIHtcbiAgICAvLyBUT0RPOiBDb25zaWRlciB0aHJvd2luZyBhbiBleGNlcHRpb24gaGVyZS5cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIHZhciBjaGlsZFdyYXBwZXIgPSB0aGlzLl9jaGlsZFdyYXBwZXJzW2lkeF07XG4gIGlmICghY2hpbGRXcmFwcGVyKSB7XG4gICAgY2hpbGRXcmFwcGVyID0gdGhpcy5fY2hpbGRXcmFwcGVyc1tpZHhdID0gdGhpcy5fc2VtYW50aWNzLndyYXAodGhpcy5fbm9kZS5jaGlsZEF0KGlkeCkpO1xuICB9XG4gIHJldHVybiBjaGlsZFdyYXBwZXI7XG59O1xuXG4vLyBSZXR1cm5zIGFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIHdyYXBwZXJzIG9mIGFsbCBvZiB0aGUgY2hpbGRyZW4gb2YgdGhlIG5vZGUgYXNzb2NpYXRlZCB3aXRoIHRoaXNcbi8vIHdyYXBwZXIuXG5XcmFwcGVyLnByb3RvdHlwZS5fY2hpbGRyZW4gPSBmdW5jdGlvbigpIHtcbiAgLy8gRm9yY2UgdGhlIGNyZWF0aW9uIG9mIGFsbCBjaGlsZCB3cmFwcGVyc1xuICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCB0aGlzLl9ub2RlLm51bUNoaWxkcmVuKCk7IGlkeCsrKSB7XG4gICAgdGhpcy5jaGlsZChpZHgpO1xuICB9XG4gIHJldHVybiB0aGlzLl9jaGlsZFdyYXBwZXJzO1xufTtcblxuLy8gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIENTVCBub2RlIGFzc29jaWF0ZWQgd2l0aCB0aGlzIHdyYXBwZXIgY29ycmVzcG9uZHMgdG8gYW4gaXRlcmF0aW9uXG4vLyBleHByZXNzaW9uLCBpLmUuLCBhIEtsZWVuZS0qLCBLbGVlbmUtKywgb3IgYW4gb3B0aW9uYWwuIFJldHVybnMgYGZhbHNlYCBvdGhlcndpc2UuXG5XcmFwcGVyLnByb3RvdHlwZS5pc0l0ZXJhdGlvbiA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5fbm9kZS5pc0l0ZXJhdGlvbigpO1xufTtcblxuLy8gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIENTVCBub2RlIGFzc29jaWF0ZWQgd2l0aCB0aGlzIHdyYXBwZXIgaXMgYSB0ZXJtaW5hbCBub2RlLCBgZmFsc2VgXG4vLyBvdGhlcndpc2UuXG5XcmFwcGVyLnByb3RvdHlwZS5pc1Rlcm1pbmFsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLl9ub2RlLmlzVGVybWluYWwoKTtcbn07XG5cbi8vIFJldHVybnMgYHRydWVgIGlmIHRoZSBDU1Qgbm9kZSBhc3NvY2lhdGVkIHdpdGggdGhpcyB3cmFwcGVyIGlzIGEgbm9udGVybWluYWwgbm9kZSwgYGZhbHNlYFxuLy8gb3RoZXJ3aXNlLlxuV3JhcHBlci5wcm90b3R5cGUuaXNOb250ZXJtaW5hbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5fbm9kZS5pc05vbnRlcm1pbmFsKCk7XG59O1xuXG4vLyBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgQ1NUIG5vZGUgYXNzb2NpYXRlZCB3aXRoIHRoaXMgd3JhcHBlciBpcyBhIG5vbnRlcm1pbmFsIG5vZGVcbi8vIGNvcnJlc3BvbmRpbmcgdG8gYSBzeW50YWN0aWMgcnVsZSwgYGZhbHNlYCBvdGhlcndpc2UuXG5XcmFwcGVyLnByb3RvdHlwZS5pc1N5bnRhY3RpYyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5pc05vbnRlcm1pbmFsKCkgJiYgdGhpcy5fbm9kZS5pc1N5bnRhY3RpYygpO1xufTtcblxuLy8gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIENTVCBub2RlIGFzc29jaWF0ZWQgd2l0aCB0aGlzIHdyYXBwZXIgaXMgYSBub250ZXJtaW5hbCBub2RlXG4vLyBjb3JyZXNwb25kaW5nIHRvIGEgbGV4aWNhbCBydWxlLCBgZmFsc2VgIG90aGVyd2lzZS5cbldyYXBwZXIucHJvdG90eXBlLmlzTGV4aWNhbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5pc05vbnRlcm1pbmFsKCkgJiYgdGhpcy5fbm9kZS5pc0xleGljYWwoKTtcbn07XG5cbi8vIFJldHVybnMgYHRydWVgIGlmIHRoZSBDU1Qgbm9kZSBhc3NvY2lhdGVkIHdpdGggdGhpcyB3cmFwcGVyIGlzIGFuIGl0ZXJhdG9yIG5vZGVcbi8vIGhhdmluZyBlaXRoZXIgb25lIG9yIG5vIGNoaWxkICg/IG9wZXJhdG9yKSwgYGZhbHNlYCBvdGhlcndpc2UuXG4vLyBPdGhlcndpc2UsIHRocm93cyBhbiBleGNlcHRpb24uXG5XcmFwcGVyLnByb3RvdHlwZS5pc09wdGlvbmFsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLl9ub2RlLmlzT3B0aW9uYWwoKTtcbn07XG5cbi8vIENyZWF0ZSBhIG5ldyBJdGVyYXRpb25Ob2RlIGluIHRoZSBzYW1lIHNlbWFudGljcyBhcyB0aGlzIHdyYXBwZXIuXG5XcmFwcGVyLnByb3RvdHlwZS5pdGVyYXRpb24gPSBmdW5jdGlvbihvcHRFbGVtZW50cykge1xuICB2YXIgaXRlciA9IG5ldyBJdGVyYXRpb25Ob2RlKHRoaXMuX25vZGUuZ3JhbW1hciwgb3B0RWxlbWVudHMgfHwgW10sIHRoaXMuc291cmNlLCBmYWxzZSk7XG4gIHJldHVybiB0aGlzLl9zZW1hbnRpY3Mud3JhcChpdGVyKTtcbn07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKFdyYXBwZXIucHJvdG90eXBlLCB7XG4gIC8vIFJldHVybnMgYW4gYXJyYXkgY29udGFpbmluZyB0aGUgY2hpbGRyZW4gb2YgdGhpcyBDU1Qgbm9kZS5cbiAgY2hpbGRyZW46IHtnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5fY2hpbGRyZW4oKTsgfX0sXG5cbiAgLy8gUmV0dXJucyB0aGUgbmFtZSBvZiBncmFtbWFyIHJ1bGUgdGhhdCBjcmVhdGVkIHRoaXMgQ1NUIG5vZGUuXG4gIGN0b3JOYW1lOiB7Z2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuX25vZGUuY3Rvck5hbWU7IH19LFxuXG4gIC8vIFRPRE86IFJlbW92ZSB0aGlzIGV2ZW50dWFsbHkgKGRlcHJlY2F0ZWQgaW4gdjAuMTIpLlxuICBpbnRlcnZhbDoge2dldDogZnVuY3Rpb24oKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgYGludGVydmFsYCBwcm9wZXJ0eSBpcyBkZXByZWNhdGVkIC0tIHVzZSBgc291cmNlYCBpbnN0ZWFkJyk7XG4gIH19LFxuXG4gIC8vIFJldHVybnMgdGhlIGludGVydmFsIGNvbnN1bWVkIGJ5IHRoZSBDU1Qgbm9kZSBhc3NvY2lhdGVkIHdpdGggdGhpcyB3cmFwcGVyLlxuICBzb3VyY2U6IHtnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5fbm9kZS5zb3VyY2U7IH19LFxuXG4gIC8vIFJldHVybnMgdGhlIG51bWJlciBvZiBjaGlsZHJlbiBvZiB0aGlzIENTVCBub2RlLlxuICBudW1DaGlsZHJlbjoge2dldDogZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLl9ub2RlLm51bUNoaWxkcmVuKCk7IH19LFxuXG4gIC8vIFJldHVybnMgdGhlIHByaW1pdGl2ZSB2YWx1ZSBvZiB0aGlzIENTVCBub2RlLCBpZiBpdCdzIGEgdGVybWluYWwgbm9kZS4gT3RoZXJ3aXNlLFxuICAvLyB0aHJvd3MgYW4gZXhjZXB0aW9uLlxuICBwcmltaXRpdmVWYWx1ZToge1xuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5pc1Rlcm1pbmFsKCkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25vZGUucHJpbWl0aXZlVmFsdWU7XG4gICAgICB9XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgIFwidHJpZWQgdG8gYWNjZXNzIHRoZSAncHJpbWl0aXZlVmFsdWUnIGF0dHJpYnV0ZSBvZiBhIG5vbi10ZXJtaW5hbCBDU1Qgbm9kZVwiKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gUmV0dXJucyB0aGUgY29udGVudHMgb2YgdGhlIGlucHV0IHN0cmVhbSBjb25zdW1lZCBieSB0aGlzIENTVCBub2RlLlxuICBzb3VyY2VTdHJpbmc6IHtnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5zb3VyY2UuY29udGVudHM7IH19XG59KTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0gU2VtYW50aWNzIC0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIEEgU2VtYW50aWNzIGlzIGEgY29udGFpbmVyIGZvciBhIGZhbWlseSBvZiBPcGVyYXRpb25zIGFuZCBBdHRyaWJ1dGVzIGZvciBhIGdpdmVuIGdyYW1tYXIuXG4vLyBTZW1hbnRpY3MgZW5hYmxlIG1vZHVsYXJpdHkgKGRpZmZlcmVudCBjbGllbnRzIG9mIGEgZ3JhbW1hciBjYW4gY3JlYXRlIHRoZWlyIHNldCBvZiBvcGVyYXRpb25zXG4vLyBhbmQgYXR0cmlidXRlcyBpbiBpc29sYXRpb24pIGFuZCBleHRlbnNpYmlsaXR5IGV2ZW4gd2hlbiBvcGVyYXRpb25zIGFuZCBhdHRyaWJ1dGVzIGFyZSBtdXR1YWxseS1cbi8vIHJlY3Vyc2l2ZS4gVGhpcyBjb25zdHJ1Y3RvciBzaG91bGQgbm90IGJlIGNhbGxlZCBkaXJlY3RseSBleGNlcHQgZnJvbVxuLy8gYFNlbWFudGljcy5jcmVhdGVTZW1hbnRpY3NgLiBUaGUgbm9ybWFsIHdheXMgdG8gY3JlYXRlIGEgU2VtYW50aWNzLCBnaXZlbiBhIGdyYW1tYXIgJ2cnLCBhcmVcbi8vIGBnLmNyZWF0ZVNlbWFudGljcygpYCBhbmQgYGcuZXh0ZW5kU2VtYW50aWNzKHBhcmVudFNlbWFudGljcylgLlxuZnVuY3Rpb24gU2VtYW50aWNzKGdyYW1tYXIsIHN1cGVyU2VtYW50aWNzKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdGhpcy5ncmFtbWFyID0gZ3JhbW1hcjtcbiAgdGhpcy5jaGVja2VkQWN0aW9uRGljdHMgPSBmYWxzZTtcblxuICAvLyBDb25zdHJ1Y3RvciBmb3Igd3JhcHBlciBpbnN0YW5jZXMsIHdoaWNoIGFyZSBwYXNzZWQgYXMgdGhlIGFyZ3VtZW50cyB0byB0aGUgc2VtYW50aWMgYWN0aW9uc1xuICAvLyBvZiBhbiBvcGVyYXRpb24gb3IgYXR0cmlidXRlLiBPcGVyYXRpb25zIGFuZCBhdHRyaWJ1dGVzIHJlcXVpcmUgZG91YmxlIGRpc3BhdGNoOiB0aGUgc2VtYW50aWNcbiAgLy8gYWN0aW9uIGlzIGNob3NlbiBiYXNlZCBvbiBib3RoIHRoZSBub2RlJ3MgdHlwZSBhbmQgdGhlIHNlbWFudGljcy4gV3JhcHBlcnMgZW5zdXJlIHRoYXRcbiAgLy8gdGhlIGBleGVjdXRlYCBtZXRob2QgaXMgY2FsbGVkIHdpdGggdGhlIGNvcnJlY3QgKG1vc3Qgc3BlY2lmaWMpIHNlbWFudGljcyBvYmplY3QgYXMgYW5cbiAgLy8gYXJndW1lbnQuXG4gIHRoaXMuV3JhcHBlciA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBzZWxmLmNoZWNrQWN0aW9uRGljdHNJZkhhdmVudEFscmVhZHkoKTtcbiAgICB0aGlzLl9zZW1hbnRpY3MgPSBzZWxmO1xuICAgIHRoaXMuX25vZGUgPSBub2RlO1xuICAgIHRoaXMuX2NoaWxkV3JhcHBlcnMgPSBbXTtcbiAgfTtcblxuICB0aGlzLnN1cGVyID0gc3VwZXJTZW1hbnRpY3M7XG4gIGlmIChzdXBlclNlbWFudGljcykge1xuICAgIGlmIChncmFtbWFyICE9PSB0aGlzLnN1cGVyLmdyYW1tYXIgJiYgIWdyYW1tYXIuX2luaGVyaXRzRnJvbSh0aGlzLnN1cGVyLmdyYW1tYXIpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgXCJDYW5ub3QgZXh0ZW5kIGEgc2VtYW50aWNzIGZvciBncmFtbWFyICdcIiArIHRoaXMuc3VwZXIuZ3JhbW1hci5uYW1lICtcbiAgICAgICAgICBcIicgZm9yIHVzZSB3aXRoIGdyYW1tYXIgJ1wiICsgZ3JhbW1hci5uYW1lICsgXCInIChub3QgYSBzdWItZ3JhbW1hcilcIik7XG4gICAgfVxuICAgIGluaGVyaXRzKHRoaXMuV3JhcHBlciwgdGhpcy5zdXBlci5XcmFwcGVyKTtcbiAgICB0aGlzLm9wZXJhdGlvbnMgPSBPYmplY3QuY3JlYXRlKHRoaXMuc3VwZXIub3BlcmF0aW9ucyk7XG4gICAgdGhpcy5hdHRyaWJ1dGVzID0gT2JqZWN0LmNyZWF0ZSh0aGlzLnN1cGVyLmF0dHJpYnV0ZXMpO1xuICAgIHRoaXMuYXR0cmlidXRlS2V5cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgICAvLyBBc3NpZ24gdW5pcXVlIHN5bWJvbHMgZm9yIGVhY2ggb2YgdGhlIGF0dHJpYnV0ZXMgaW5oZXJpdGVkIGZyb20gdGhlIHN1cGVyLXNlbWFudGljcyBzbyB0aGF0XG4gICAgLy8gdGhleSBhcmUgbWVtb2l6ZWQgaW5kZXBlbmRlbnRseS5cbiAgICBmb3IgKHZhciBhdHRyaWJ1dGVOYW1lIGluIHRoaXMuYXR0cmlidXRlcykge1xuICAgICAgdGhpcy5hdHRyaWJ1dGVLZXlzW2F0dHJpYnV0ZU5hbWVdID0gU3ltYm9sKCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGluaGVyaXRzKHRoaXMuV3JhcHBlciwgV3JhcHBlcik7XG4gICAgdGhpcy5vcGVyYXRpb25zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0aGlzLmF0dHJpYnV0ZXMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRoaXMuYXR0cmlidXRlS2V5cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIH1cbn1cblxuU2VtYW50aWNzLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gJ1tzZW1hbnRpY3MgZm9yICcgKyB0aGlzLmdyYW1tYXIubmFtZSArICddJztcbn07XG5cblNlbWFudGljcy5wcm90b3R5cGUuY2hlY2tBY3Rpb25EaWN0c0lmSGF2ZW50QWxyZWFkeSA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIXRoaXMuY2hlY2tlZEFjdGlvbkRpY3RzKSB7XG4gICAgdGhpcy5jaGVja0FjdGlvbkRpY3RzKCk7XG4gICAgdGhpcy5jaGVja2VkQWN0aW9uRGljdHMgPSB0cnVlO1xuICB9XG59O1xuXG4vLyBDaGVja3MgdGhhdCB0aGUgYWN0aW9uIGRpY3Rpb25hcmllcyBmb3IgYWxsIG9wZXJhdGlvbnMgYW5kIGF0dHJpYnV0ZXMgaW4gdGhpcyBzZW1hbnRpY3MsXG4vLyBpbmNsdWRpbmcgdGhlIG9uZXMgdGhhdCB3ZXJlIGluaGVyaXRlZCBmcm9tIHRoZSBzdXBlci1zZW1hbnRpY3MsIGFncmVlIHdpdGggdGhlIGdyYW1tYXIuXG4vLyBUaHJvd3MgYW4gZXhjZXB0aW9uIGlmIG9uZSBvciBtb3JlIG9mIHRoZW0gZG9lc24ndC5cblNlbWFudGljcy5wcm90b3R5cGUuY2hlY2tBY3Rpb25EaWN0cyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbmFtZTtcbiAgZm9yIChuYW1lIGluIHRoaXMub3BlcmF0aW9ucykge1xuICAgIHRoaXMub3BlcmF0aW9uc1tuYW1lXS5jaGVja0FjdGlvbkRpY3QodGhpcy5ncmFtbWFyKTtcbiAgfVxuICBmb3IgKG5hbWUgaW4gdGhpcy5hdHRyaWJ1dGVzKSB7XG4gICAgdGhpcy5hdHRyaWJ1dGVzW25hbWVdLmNoZWNrQWN0aW9uRGljdCh0aGlzLmdyYW1tYXIpO1xuICB9XG59O1xuXG5TZW1hbnRpY3MucHJvdG90eXBlLnRvUmVjaXBlID0gZnVuY3Rpb24oc2VtYW50aWNzT25seSkge1xuICBmdW5jdGlvbiBoYXNTdXBlclNlbWFudGljcyhzKSB7XG4gICAgcmV0dXJuIHMuc3VwZXIgIT09IFNlbWFudGljcy5CdWlsdEluU2VtYW50aWNzLl9nZXRTZW1hbnRpY3MoKTtcbiAgfVxuXG4gIHZhciBzdHIgPSAnKGZ1bmN0aW9uKGcpIHtcXG4nO1xuICBpZiAoaGFzU3VwZXJTZW1hbnRpY3ModGhpcykpIHtcbiAgICBzdHIgKz0gJyAgdmFyIHNlbWFudGljcyA9ICcgKyB0aGlzLnN1cGVyLnRvUmVjaXBlKHRydWUpICsgJyhnJztcblxuICAgIHZhciBzdXBlclNlbWFudGljc0dyYW1tYXIgPSB0aGlzLnN1cGVyLmdyYW1tYXI7XG4gICAgdmFyIHJlbGF0ZWRHcmFtbWFyID0gdGhpcy5ncmFtbWFyO1xuICAgIHdoaWxlIChyZWxhdGVkR3JhbW1hciAhPT0gc3VwZXJTZW1hbnRpY3NHcmFtbWFyKSB7XG4gICAgICBzdHIgKz0gJy5zdXBlckdyYW1tYXInO1xuICAgICAgcmVsYXRlZEdyYW1tYXIgPSByZWxhdGVkR3JhbW1hci5zdXBlckdyYW1tYXI7XG4gICAgfVxuXG4gICAgc3RyICs9ICcpO1xcbic7XG4gICAgc3RyICs9ICcgIHJldHVybiBnLmV4dGVuZFNlbWFudGljcyhzZW1hbnRpY3MpJztcbiAgfSBlbHNlIHtcbiAgICBzdHIgKz0gJyAgcmV0dXJuIGcuY3JlYXRlU2VtYW50aWNzKCknO1xuICB9XG4gIFsnT3BlcmF0aW9uJywgJ0F0dHJpYnV0ZSddLmZvckVhY2goZnVuY3Rpb24odHlwZSkge1xuICAgIHZhciBzZW1hbnRpY09wZXJhdGlvbnMgPSB0aGlzW3R5cGUudG9Mb3dlckNhc2UoKSArICdzJ107XG4gICAgT2JqZWN0LmtleXMoc2VtYW50aWNPcGVyYXRpb25zKS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHZhciBzaWduYXR1cmUgPSBuYW1lO1xuICAgICAgaWYgKHNlbWFudGljT3BlcmF0aW9uc1tuYW1lXS5mb3JtYWxzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgc2lnbmF0dXJlICs9ICcoJyArIHNlbWFudGljT3BlcmF0aW9uc1tuYW1lXS5mb3JtYWxzLmpvaW4oJywgJykgKyAnKSc7XG4gICAgICB9XG5cbiAgICAgIHZhciBtZXRob2Q7XG4gICAgICBpZiAoaGFzU3VwZXJTZW1hbnRpY3ModGhpcykgJiYgdGhpcy5zdXBlclt0eXBlLnRvTG93ZXJDYXNlKCkgKyAncyddW25hbWVdKSB7XG4gICAgICAgIG1ldGhvZCA9ICdleHRlbmQnICsgdHlwZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1ldGhvZCA9ICdhZGQnICsgdHlwZTtcbiAgICAgIH1cbiAgICAgIHN0ciArPSAnXFxuICAgIC4nICsgbWV0aG9kICsgJygnICsgSlNPTi5zdHJpbmdpZnkoc2lnbmF0dXJlKSArICcsIHsnO1xuXG4gICAgICB2YXIgYWN0aW9ucyA9IHNlbWFudGljT3BlcmF0aW9uc1tuYW1lXS5hY3Rpb25EaWN0O1xuICAgICAgdmFyIHNyY0FycmF5ID0gW107XG4gICAgICBPYmplY3Qua2V5cyhhY3Rpb25zKS5mb3JFYWNoKGZ1bmN0aW9uKGFjdGlvbk5hbWUpIHtcbiAgICAgICAgaWYgKHNlbWFudGljT3BlcmF0aW9uc1tuYW1lXS5idWlsdEluRGVmYXVsdCAhPT0gYWN0aW9uc1thY3Rpb25OYW1lXSkge1xuICAgICAgICAgIHNyY0FycmF5LnB1c2goJ1xcbiAgICAgICcgKyBKU09OLnN0cmluZ2lmeShhY3Rpb25OYW1lKSArICc6ICcgK1xuICAgICAgICAgICAgYWN0aW9uc1thY3Rpb25OYW1lXS50b1N0cmluZygpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBzdHIgKz0gc3JjQXJyYXkuam9pbignLCcpO1xuXG4gICAgICBzdHIgKz0gJ1xcbiAgICB9KSc7XG4gICAgfSwgdGhpcyk7XG4gIH0sIHRoaXMpO1xuICBzdHIgKz0gJztcXG4gIH0pJztcblxuICBpZiAoIXNlbWFudGljc09ubHkpIHtcbiAgICBzdHIgPVxuICAgICAgJyhmdW5jdGlvbigpIHtcXG4nICtcbiAgICAgICcgIHZhciBncmFtbWFyID0gdGhpcy5mcm9tUmVjaXBlKCcgKyBqc29uVG9KUyh0aGlzLmdyYW1tYXIudG9SZWNpcGUoKSkgKyAnKTtcXG4nICtcbiAgICAgICcgIHZhciBzZW1hbnRpY3MgPSAnICsgc3RyICsgJyhncmFtbWFyKTtcXG4nICtcbiAgICAgICcgIHJldHVybiBzZW1hbnRpY3M7XFxuJyArXG4gICAgICAnfSk7XFxuJztcbiAgfVxuXG4gIHJldHVybiBzdHI7XG59O1xuXG52YXIgcHJvdG90eXBlR3JhbW1hcjtcbnZhciBwcm90b3R5cGVHcmFtbWFyU2VtYW50aWNzO1xuXG4vLyBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgZnJvbSBtYWluLmpzIG9uY2UgT2htIGhhcyBsb2FkZWQuXG5TZW1hbnRpY3MuaW5pdFByb3RvdHlwZVBhcnNlciA9IGZ1bmN0aW9uKGdyYW1tYXIpIHtcbiAgcHJvdG90eXBlR3JhbW1hclNlbWFudGljcyA9IGdyYW1tYXIuY3JlYXRlU2VtYW50aWNzKCkuYWRkT3BlcmF0aW9uKCdwYXJzZScsIHtcbiAgICBBdHRyaWJ1dGVTaWduYXR1cmU6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IG5hbWUucGFyc2UoKSxcbiAgICAgICAgZm9ybWFsczogW11cbiAgICAgIH07XG4gICAgfSxcbiAgICBPcGVyYXRpb25TaWduYXR1cmU6IGZ1bmN0aW9uKG5hbWUsIG9wdEZvcm1hbHMpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IG5hbWUucGFyc2UoKSxcbiAgICAgICAgZm9ybWFsczogb3B0Rm9ybWFscy5wYXJzZSgpWzBdIHx8IFtdXG4gICAgICB9O1xuICAgIH0sXG4gICAgRm9ybWFsczogZnVuY3Rpb24ob3BhcmVuLCBmcywgY3BhcmVuKSB7XG4gICAgICByZXR1cm4gZnMuYXNJdGVyYXRpb24oKS5wYXJzZSgpO1xuICAgIH0sXG4gICAgbmFtZTogZnVuY3Rpb24oZmlyc3QsIHJlc3QpIHtcbiAgICAgIHJldHVybiB0aGlzLnNvdXJjZVN0cmluZztcbiAgICB9XG4gIH0pO1xuICBwcm90b3R5cGVHcmFtbWFyID0gZ3JhbW1hcjtcbn07XG5cbmZ1bmN0aW9uIHBhcnNlU2lnbmF0dXJlKHNpZ25hdHVyZSwgdHlwZSkge1xuICBpZiAoIXByb3RvdHlwZUdyYW1tYXIpIHtcbiAgICAvLyBUaGUgT3BlcmF0aW9ucyBhbmQgQXR0cmlidXRlcyBncmFtbWFyIHdvbid0IGJlIGF2YWlsYWJsZSB3aGlsZSBPaG0gaXMgbG9hZGluZyxcbiAgICAvLyBidXQgd2UgY2FuIGdldCBhd2F5IHRoZSBmb2xsb3dpbmcgc2ltcGxpZmljYXRpb24gYi9jIG5vbmUgb2YgdGhlIG9wZXJhdGlvbnNcbiAgICAvLyB0aGF0IGFyZSB1c2VkIHdoaWxlIGxvYWRpbmcgdGFrZSBhcmd1bWVudHMuXG4gICAgY29tbW9uLmFzc2VydChzaWduYXR1cmUuaW5kZXhPZignKCcpID09PSAtMSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IHNpZ25hdHVyZSxcbiAgICAgIGZvcm1hbHM6IFtdXG4gICAgfTtcbiAgfVxuXG4gIHZhciByID0gcHJvdG90eXBlR3JhbW1hci5tYXRjaChcbiAgICAgIHNpZ25hdHVyZSxcbiAgICAgIHR5cGUgPT09ICdvcGVyYXRpb24nID8gJ09wZXJhdGlvblNpZ25hdHVyZScgOiAnQXR0cmlidXRlU2lnbmF0dXJlJyk7XG4gIGlmIChyLmZhaWxlZCgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKHIubWVzc2FnZSk7XG4gIH1cblxuICByZXR1cm4gcHJvdG90eXBlR3JhbW1hclNlbWFudGljcyhyKS5wYXJzZSgpO1xufVxuXG5mdW5jdGlvbiBuZXdEZWZhdWx0QWN0aW9uKHR5cGUsIG5hbWUsIGRvSXQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGNoaWxkcmVuKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciB0aGlzVGhpbmcgPSB0aGlzLl9zZW1hbnRpY3Mub3BlcmF0aW9uc1tuYW1lXSB8fCB0aGlzLl9zZW1hbnRpY3MuYXR0cmlidXRlc1tuYW1lXTtcbiAgICB2YXIgYXJncyA9IHRoaXNUaGluZy5mb3JtYWxzLm1hcChmdW5jdGlvbihmb3JtYWwpIHtcbiAgICAgIHJldHVybiBzZWxmLmFyZ3NbZm9ybWFsXTtcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLmlzSXRlcmF0aW9uKCkpIHtcbiAgICAgIC8vIFRoaXMgQ1NUIG5vZGUgY29ycmVzcG9uZHMgdG8gYW4gaXRlcmF0aW9uIGV4cHJlc3Npb24gaW4gdGhlIGdyYW1tYXIgKCosICssIG9yID8pLiBUaGVcbiAgICAgIC8vIGRlZmF1bHQgYmVoYXZpb3IgaXMgdG8gbWFwIHRoaXMgb3BlcmF0aW9uIG9yIGF0dHJpYnV0ZSBvdmVyIGFsbCBvZiBpdHMgY2hpbGQgbm9kZXMuXG4gICAgICByZXR1cm4gY2hpbGRyZW4ubWFwKGZ1bmN0aW9uKGNoaWxkKSB7IHJldHVybiBkb0l0LmFwcGx5KGNoaWxkLCBhcmdzKTsgfSk7XG4gICAgfVxuXG4gICAgLy8gVGhpcyBDU1Qgbm9kZSBjb3JyZXNwb25kcyB0byBhIG5vbi10ZXJtaW5hbCBpbiB0aGUgZ3JhbW1hciAoZS5nLiwgQWRkRXhwcikuIFRoZSBmYWN0IHRoYXRcbiAgICAvLyB3ZSBnb3QgaGVyZSBtZWFucyB0aGF0IHRoaXMgYWN0aW9uIGRpY3Rpb25hcnkgZG9lc24ndCBoYXZlIGFuIGFjdGlvbiBmb3IgdGhpcyBwYXJ0aWN1bGFyXG4gICAgLy8gbm9uLXRlcm1pbmFsIG9yIGEgZ2VuZXJpYyBgX25vbnRlcm1pbmFsYCBhY3Rpb24uXG4gICAgaWYgKGNoaWxkcmVuLmxlbmd0aCA9PT0gMSkge1xuICAgICAgLy8gQXMgYSBjb252ZW5pZW5jZSwgaWYgdGhpcyBub2RlIG9ubHkgaGFzIG9uZSBjaGlsZCwgd2UganVzdCByZXR1cm4gdGhlIHJlc3VsdCBvZlxuICAgICAgLy8gYXBwbHlpbmcgdGhpcyBvcGVyYXRpb24gLyBhdHRyaWJ1dGUgdG8gdGhlIGNoaWxkIG5vZGUuXG4gICAgICByZXR1cm4gZG9JdC5hcHBseShjaGlsZHJlblswXSwgYXJncyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE90aGVyd2lzZSwgd2UgdGhyb3cgYW4gZXhjZXB0aW9uIHRvIGxldCB0aGUgcHJvZ3JhbW1lciBrbm93IHRoYXQgd2UgZG9uJ3Qga25vdyB3aGF0XG4gICAgICAvLyB0byBkbyB3aXRoIHRoaXMgbm9kZS5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnTWlzc2luZyBzZW1hbnRpYyBhY3Rpb24gZm9yICcgKyB0aGlzLmN0b3JOYW1lICsgJyBpbiAnICsgbmFtZSArICcgJyArIHR5cGUpO1xuICAgIH1cbiAgfTtcbn1cblxuU2VtYW50aWNzLnByb3RvdHlwZS5hZGRPcGVyYXRpb25PckF0dHJpYnV0ZSA9IGZ1bmN0aW9uKHR5cGUsIHNpZ25hdHVyZSwgYWN0aW9uRGljdCkge1xuICB2YXIgdHlwZVBsdXJhbCA9IHR5cGUgKyAncyc7XG5cbiAgdmFyIHBhcnNlZE5hbWVBbmRGb3JtYWxBcmdzID0gcGFyc2VTaWduYXR1cmUoc2lnbmF0dXJlLCB0eXBlKTtcbiAgdmFyIG5hbWUgPSBwYXJzZWROYW1lQW5kRm9ybWFsQXJncy5uYW1lO1xuICB2YXIgZm9ybWFscyA9IHBhcnNlZE5hbWVBbmRGb3JtYWxBcmdzLmZvcm1hbHM7XG5cbiAgLy8gVE9ETzogY2hlY2sgdGhhdCB0aGVyZSBhcmUgbm8gZHVwbGljYXRlIGZvcm1hbCBhcmd1bWVudHNcblxuICB0aGlzLmFzc2VydE5ld05hbWUobmFtZSwgdHlwZSk7XG5cbiAgLy8gQ3JlYXRlIHRoZSBhY3Rpb24gZGljdGlvbmFyeSBmb3IgdGhpcyBvcGVyYXRpb24gLyBhdHRyaWJ1dGUgdGhhdCBjb250YWlucyBhIGBfZGVmYXVsdGAgYWN0aW9uXG4gIC8vIHdoaWNoIGRlZmluZXMgdGhlIGRlZmF1bHQgYmVoYXZpb3Igb2YgaXRlcmF0aW9uLCB0ZXJtaW5hbCwgYW5kIG5vbi10ZXJtaW5hbCBub2Rlcy4uLlxuICB2YXIgYnVpbHRJbkRlZmF1bHQgPSBuZXdEZWZhdWx0QWN0aW9uKHR5cGUsIG5hbWUsIGRvSXQpO1xuICB2YXIgcmVhbEFjdGlvbkRpY3QgPSB7X2RlZmF1bHQ6IGJ1aWx0SW5EZWZhdWx0fTtcbiAgLy8gLi4uIGFuZCBhZGQgaW4gdGhlIGFjdGlvbnMgc3VwcGxpZWQgYnkgdGhlIHByb2dyYW1tZXIsIHdoaWNoIG1heSBvdmVycmlkZSBzb21lIG9yIGFsbCBvZiB0aGVcbiAgLy8gZGVmYXVsdCBvbmVzLlxuICBPYmplY3Qua2V5cyhhY3Rpb25EaWN0KS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZWFsQWN0aW9uRGljdFtuYW1lXSA9IGFjdGlvbkRpY3RbbmFtZV07XG4gIH0pO1xuXG4gIHZhciBlbnRyeSA9IHR5cGUgPT09ICdvcGVyYXRpb24nID9cbiAgICAgIG5ldyBPcGVyYXRpb24obmFtZSwgZm9ybWFscywgcmVhbEFjdGlvbkRpY3QsIGJ1aWx0SW5EZWZhdWx0KSA6XG4gICAgICBuZXcgQXR0cmlidXRlKG5hbWUsIHJlYWxBY3Rpb25EaWN0LCBidWlsdEluRGVmYXVsdCk7XG5cbiAgLy8gVGhlIGZvbGxvd2luZyBjaGVjayBpcyBub3Qgc3RyaWN0bHkgbmVjZXNzYXJ5IChpdCB3aWxsIGhhcHBlbiBsYXRlciBhbnl3YXkpIGJ1dCBpdCdzIGJldHRlciB0b1xuICAvLyBjYXRjaCBlcnJvcnMgZWFybHkuXG4gIGVudHJ5LmNoZWNrQWN0aW9uRGljdCh0aGlzLmdyYW1tYXIpO1xuXG4gIHRoaXNbdHlwZVBsdXJhbF1bbmFtZV0gPSBlbnRyeTtcblxuICBmdW5jdGlvbiBkb0l0KCkge1xuICAgIC8vIERpc3BhdGNoIHRvIG1vc3Qgc3BlY2lmaWMgdmVyc2lvbiBvZiB0aGlzIG9wZXJhdGlvbiAvIGF0dHJpYnV0ZSAtLSBpdCBtYXkgaGF2ZSBiZWVuXG4gICAgLy8gb3ZlcnJpZGRlbiBieSBhIHN1Yi1zZW1hbnRpY3MuXG4gICAgdmFyIHRoaXNUaGluZyA9IHRoaXMuX3NlbWFudGljc1t0eXBlUGx1cmFsXVtuYW1lXTtcblxuICAgIC8vIENoZWNrIHRoYXQgdGhlIGNhbGxlciBwYXNzZWQgdGhlIGNvcnJlY3QgbnVtYmVyIG9mIGFyZ3VtZW50cy5cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCAhPT0gdGhpc1RoaW5nLmZvcm1hbHMubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ0ludmFsaWQgbnVtYmVyIG9mIGFyZ3VtZW50cyBwYXNzZWQgdG8gJyArIG5hbWUgKyAnICcgKyB0eXBlICsgJyAoZXhwZWN0ZWQgJyArXG4gICAgICAgICAgdGhpc1RoaW5nLmZvcm1hbHMubGVuZ3RoICsgJywgZ290ICcgKyBhcmd1bWVudHMubGVuZ3RoICsgJyknKTtcbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgYW4gXCJhcmd1bWVudHMgb2JqZWN0XCIgZnJvbSB0aGUgYXJndW1lbnRzIHRoYXQgd2VyZSBwYXNzZWQgdG8gdGhpc1xuICAgIC8vIG9wZXJhdGlvbiAvIGF0dHJpYnV0ZS5cbiAgICB2YXIgYXJncyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgYXJndW1lbnRzLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgIHZhciBmb3JtYWwgPSB0aGlzVGhpbmcuZm9ybWFsc1tpZHhdO1xuICAgICAgYXJnc1tmb3JtYWxdID0gYXJndW1lbnRzW2lkeF07XG4gICAgfVxuXG4gICAgdmFyIG9sZEFyZ3MgPSB0aGlzLmFyZ3M7XG4gICAgdGhpcy5hcmdzID0gYXJncztcbiAgICB2YXIgYW5zID0gdGhpc1RoaW5nLmV4ZWN1dGUodGhpcy5fc2VtYW50aWNzLCB0aGlzKTtcbiAgICB0aGlzLmFyZ3MgPSBvbGRBcmdzO1xuICAgIHJldHVybiBhbnM7XG4gIH1cblxuICBpZiAodHlwZSA9PT0gJ29wZXJhdGlvbicpIHtcbiAgICB0aGlzLldyYXBwZXIucHJvdG90eXBlW25hbWVdID0gZG9JdDtcbiAgICB0aGlzLldyYXBwZXIucHJvdG90eXBlW25hbWVdLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gJ1snICsgbmFtZSArICcgb3BlcmF0aW9uXSc7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5XcmFwcGVyLnByb3RvdHlwZSwgbmFtZSwge1xuICAgICAgZ2V0OiBkb0l0LFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlICAvLyBTbyB0aGUgcHJvcGVydHkgY2FuIGJlIGRlbGV0ZWQuXG4gICAgfSk7XG4gICAgdGhpcy5hdHRyaWJ1dGVLZXlzW25hbWVdID0gU3ltYm9sKCk7XG4gIH1cbn07XG5cblNlbWFudGljcy5wcm90b3R5cGUuZXh0ZW5kT3BlcmF0aW9uT3JBdHRyaWJ1dGUgPSBmdW5jdGlvbih0eXBlLCBuYW1lLCBhY3Rpb25EaWN0KSB7XG4gIHZhciB0eXBlUGx1cmFsID0gdHlwZSArICdzJztcblxuICAvLyBNYWtlIHN1cmUgdGhhdCBgbmFtZWAgcmVhbGx5IGlzIGp1c3QgYSBuYW1lLCBpLmUuLCB0aGF0IGl0IGRvZXNuJ3QgYWxzbyBjb250YWluIGZvcm1hbHMuXG4gIHBhcnNlU2lnbmF0dXJlKG5hbWUsICdhdHRyaWJ1dGUnKTtcblxuICBpZiAoISh0aGlzLnN1cGVyICYmIG5hbWUgaW4gdGhpcy5zdXBlclt0eXBlUGx1cmFsXSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBleHRlbmQgJyArIHR5cGUgKyBcIiAnXCIgKyBuYW1lICtcbiAgICAgICAgXCInOiBkaWQgbm90IGluaGVyaXQgYW4gXCIgKyB0eXBlICsgJyB3aXRoIHRoYXQgbmFtZScpO1xuICB9XG4gIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGhpc1t0eXBlUGx1cmFsXSwgbmFtZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBleHRlbmQgJyArIHR5cGUgKyBcIiAnXCIgKyBuYW1lICsgXCInIGFnYWluXCIpO1xuICB9XG5cbiAgLy8gQ3JlYXRlIGEgbmV3IG9wZXJhdGlvbiAvIGF0dHJpYnV0ZSB3aG9zZSBhY3Rpb25EaWN0IGRlbGVnYXRlcyB0byB0aGUgc3VwZXIgb3BlcmF0aW9uIC9cbiAgLy8gYXR0cmlidXRlJ3MgYWN0aW9uRGljdCwgYW5kIHdoaWNoIGhhcyBhbGwgdGhlIGtleXMgZnJvbSBgaW5oZXJpdGVkQWN0aW9uRGljdGAuXG4gIHZhciBpbmhlcml0ZWRGb3JtYWxzID0gdGhpc1t0eXBlUGx1cmFsXVtuYW1lXS5mb3JtYWxzO1xuICB2YXIgaW5oZXJpdGVkQWN0aW9uRGljdCA9IHRoaXNbdHlwZVBsdXJhbF1bbmFtZV0uYWN0aW9uRGljdDtcbiAgdmFyIG5ld0FjdGlvbkRpY3QgPSBPYmplY3QuY3JlYXRlKGluaGVyaXRlZEFjdGlvbkRpY3QpO1xuICBPYmplY3Qua2V5cyhhY3Rpb25EaWN0KS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBuZXdBY3Rpb25EaWN0W25hbWVdID0gYWN0aW9uRGljdFtuYW1lXTtcbiAgfSk7XG5cbiAgdGhpc1t0eXBlUGx1cmFsXVtuYW1lXSA9IHR5cGUgPT09ICdvcGVyYXRpb24nID9cbiAgICAgIG5ldyBPcGVyYXRpb24obmFtZSwgaW5oZXJpdGVkRm9ybWFscywgbmV3QWN0aW9uRGljdCkgOlxuICAgICAgbmV3IEF0dHJpYnV0ZShuYW1lLCBuZXdBY3Rpb25EaWN0KTtcblxuICAvLyBUaGUgZm9sbG93aW5nIGNoZWNrIGlzIG5vdCBzdHJpY3RseSBuZWNlc3NhcnkgKGl0IHdpbGwgaGFwcGVuIGxhdGVyIGFueXdheSkgYnV0IGl0J3MgYmV0dGVyIHRvXG4gIC8vIGNhdGNoIGVycm9ycyBlYXJseS5cbiAgdGhpc1t0eXBlUGx1cmFsXVtuYW1lXS5jaGVja0FjdGlvbkRpY3QodGhpcy5ncmFtbWFyKTtcbn07XG5cblNlbWFudGljcy5wcm90b3R5cGUuYXNzZXJ0TmV3TmFtZSA9IGZ1bmN0aW9uKG5hbWUsIHR5cGUpIHtcbiAgaWYgKFdyYXBwZXIucHJvdG90eXBlLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnQ2Fubm90IGFkZCAnICsgdHlwZSArIFwiICdcIiArIG5hbWUgKyBcIic6IHRoYXQncyBhIHJlc2VydmVkIG5hbWVcIik7XG4gIH1cbiAgaWYgKG5hbWUgaW4gdGhpcy5vcGVyYXRpb25zKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnQ2Fubm90IGFkZCAnICsgdHlwZSArIFwiICdcIiArIG5hbWUgKyBcIic6IGFuIG9wZXJhdGlvbiB3aXRoIHRoYXQgbmFtZSBhbHJlYWR5IGV4aXN0c1wiKTtcbiAgfVxuICBpZiAobmFtZSBpbiB0aGlzLmF0dHJpYnV0ZXMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdDYW5ub3QgYWRkICcgKyB0eXBlICsgXCIgJ1wiICsgbmFtZSArIFwiJzogYW4gYXR0cmlidXRlIHdpdGggdGhhdCBuYW1lIGFscmVhZHkgZXhpc3RzXCIpO1xuICB9XG59O1xuXG4vLyBSZXR1cm5zIGEgd3JhcHBlciBmb3IgdGhlIGdpdmVuIENTVCBgbm9kZWAgaW4gdGhpcyBzZW1hbnRpY3MuXG4vLyBJZiBgbm9kZWAgaXMgYWxyZWFkeSBhIHdyYXBwZXIsIHJldHVybnMgYG5vZGVgIGl0c2VsZi4gIC8vIFRPRE86IHdoeSBpcyB0aGlzIG5lZWRlZD9cblNlbWFudGljcy5wcm90b3R5cGUud3JhcCA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgcmV0dXJuIG5vZGUgaW5zdGFuY2VvZiB0aGlzLldyYXBwZXIgPyBub2RlIDogbmV3IHRoaXMuV3JhcHBlcihub2RlKTtcbn07XG5cbi8vIENyZWF0ZXMgYSBuZXcgU2VtYW50aWNzIGluc3RhbmNlIGZvciBgZ3JhbW1hcmAsIGluaGVyaXRpbmcgb3BlcmF0aW9ucyBhbmQgYXR0cmlidXRlcyBmcm9tXG4vLyBgb3B0U3VwZXJTZW1hbnRpY3NgLCBpZiBpdCBpcyBzcGVjaWZpZWQuIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGFjdHMgYXMgYSBwcm94eSBmb3IgdGhlIG5ld1xuLy8gU2VtYW50aWNzIGluc3RhbmNlLiBXaGVuIHRoYXQgZnVuY3Rpb24gaXMgaW52b2tlZCB3aXRoIGEgQ1NUIG5vZGUgYXMgYW4gYXJndW1lbnQsIGl0IHJldHVybnNcbi8vIGEgd3JhcHBlciBmb3IgdGhhdCBub2RlIHdoaWNoIGdpdmVzIGFjY2VzcyB0byB0aGUgb3BlcmF0aW9ucyBhbmQgYXR0cmlidXRlcyBwcm92aWRlZCBieSB0aGlzXG4vLyBzZW1hbnRpY3MuXG5TZW1hbnRpY3MuY3JlYXRlU2VtYW50aWNzID0gZnVuY3Rpb24oZ3JhbW1hciwgb3B0U3VwZXJTZW1hbnRpY3MpIHtcbiAgdmFyIHMgPSBuZXcgU2VtYW50aWNzKFxuICAgICAgZ3JhbW1hcixcbiAgICAgIG9wdFN1cGVyU2VtYW50aWNzICE9PSB1bmRlZmluZWQgP1xuICAgICAgICAgIG9wdFN1cGVyU2VtYW50aWNzIDpcbiAgICAgICAgICBTZW1hbnRpY3MuQnVpbHRJblNlbWFudGljcy5fZ2V0U2VtYW50aWNzKCkpO1xuXG4gIC8vIFRvIGVuYWJsZSBjbGllbnRzIHRvIGludm9rZSBhIHNlbWFudGljcyBsaWtlIGEgZnVuY3Rpb24sIHJldHVybiBhIGZ1bmN0aW9uIHRoYXQgYWN0cyBhcyBhIHByb3h5XG4gIC8vIGZvciBgc2AsIHdoaWNoIGlzIHRoZSByZWFsIGBTZW1hbnRpY3NgIGluc3RhbmNlLlxuICB2YXIgcHJveHkgPSBmdW5jdGlvbiBBU2VtYW50aWNzKG1hdGNoUmVzdWx0KSB7XG4gICAgaWYgKCEobWF0Y2hSZXN1bHQgaW5zdGFuY2VvZiBNYXRjaFJlc3VsdCkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgJ1NlbWFudGljcyBleHBlY3RlZCBhIE1hdGNoUmVzdWx0LCBidXQgZ290ICcgKyBjb21tb24udW5leHBlY3RlZE9ialRvU3RyaW5nKG1hdGNoUmVzdWx0KSk7XG4gICAgfVxuICAgIGlmICghbWF0Y2hSZXN1bHQuc3VjY2VlZGVkKCkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgJ2Nhbm5vdCBhcHBseSBTZW1hbnRpY3MgdG8gJyArIG1hdGNoUmVzdWx0LnRvU3RyaW5nKCkpO1xuICAgIH1cblxuICAgIHZhciBjc3QgPSBtYXRjaFJlc3VsdC5fY3N0O1xuICAgIGlmIChjc3QuZ3JhbW1hciAhPT0gZ3JhbW1hcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIFwiQ2Fubm90IHVzZSBhIE1hdGNoUmVzdWx0IGZyb20gZ3JhbW1hciAnXCIgKyBjc3QuZ3JhbW1hci5uYW1lICtcbiAgICAgICAgICBcIicgd2l0aCBhIHNlbWFudGljcyBmb3IgJ1wiICsgZ3JhbW1hci5uYW1lICsgXCInXCIpO1xuICAgIH1cbiAgICByZXR1cm4gcy53cmFwKGNzdCk7XG4gIH07XG5cbiAgLy8gRm9yd2FyZCBwdWJsaWMgbWV0aG9kcyBmcm9tIHRoZSBwcm94eSB0byB0aGUgc2VtYW50aWNzIGluc3RhbmNlLlxuICBwcm94eS5hZGRPcGVyYXRpb24gPSBmdW5jdGlvbihzaWduYXR1cmUsIGFjdGlvbkRpY3QpIHtcbiAgICBzLmFkZE9wZXJhdGlvbk9yQXR0cmlidXRlKCdvcGVyYXRpb24nLCBzaWduYXR1cmUsIGFjdGlvbkRpY3QpO1xuICAgIHJldHVybiBwcm94eTtcbiAgfTtcbiAgcHJveHkuZXh0ZW5kT3BlcmF0aW9uID0gZnVuY3Rpb24obmFtZSwgYWN0aW9uRGljdCkge1xuICAgIHMuZXh0ZW5kT3BlcmF0aW9uT3JBdHRyaWJ1dGUoJ29wZXJhdGlvbicsIG5hbWUsIGFjdGlvbkRpY3QpO1xuICAgIHJldHVybiBwcm94eTtcbiAgfTtcbiAgcHJveHkuYWRkQXR0cmlidXRlID0gZnVuY3Rpb24obmFtZSwgYWN0aW9uRGljdCkge1xuICAgIHMuYWRkT3BlcmF0aW9uT3JBdHRyaWJ1dGUoJ2F0dHJpYnV0ZScsIG5hbWUsIGFjdGlvbkRpY3QpO1xuICAgIHJldHVybiBwcm94eTtcbiAgfTtcbiAgcHJveHkuZXh0ZW5kQXR0cmlidXRlID0gZnVuY3Rpb24obmFtZSwgYWN0aW9uRGljdCkge1xuICAgIHMuZXh0ZW5kT3BlcmF0aW9uT3JBdHRyaWJ1dGUoJ2F0dHJpYnV0ZScsIG5hbWUsIGFjdGlvbkRpY3QpO1xuICAgIHJldHVybiBwcm94eTtcbiAgfTtcbiAgcHJveHkuX2dldEFjdGlvbkRpY3QgPSBmdW5jdGlvbihvcGVyYXRpb25PckF0dHJpYnV0ZU5hbWUpIHtcbiAgICB2YXIgYWN0aW9uID0gcy5vcGVyYXRpb25zW29wZXJhdGlvbk9yQXR0cmlidXRlTmFtZV0gfHwgcy5hdHRyaWJ1dGVzW29wZXJhdGlvbk9yQXR0cmlidXRlTmFtZV07XG4gICAgaWYgKCFhY3Rpb24pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignXCInICsgb3BlcmF0aW9uT3JBdHRyaWJ1dGVOYW1lICsgJ1wiIGlzIG5vdCBhIHZhbGlkIG9wZXJhdGlvbiBvciBhdHRyaWJ1dGUgJyArXG4gICAgICAgICduYW1lIGluIHRoaXMgc2VtYW50aWNzIGZvciBcIicgKyBncmFtbWFyLm5hbWUgKyAnXCInKTtcbiAgICB9XG4gICAgcmV0dXJuIGFjdGlvbi5hY3Rpb25EaWN0O1xuICB9O1xuICBwcm94eS5fcmVtb3ZlID0gZnVuY3Rpb24ob3BlcmF0aW9uT3JBdHRyaWJ1dGVOYW1lKSB7XG4gICAgdmFyIHNlbWFudGljO1xuICAgIGlmIChvcGVyYXRpb25PckF0dHJpYnV0ZU5hbWUgaW4gcy5vcGVyYXRpb25zKSB7XG4gICAgICBzZW1hbnRpYyA9IHMub3BlcmF0aW9uc1tvcGVyYXRpb25PckF0dHJpYnV0ZU5hbWVdO1xuICAgICAgZGVsZXRlIHMub3BlcmF0aW9uc1tvcGVyYXRpb25PckF0dHJpYnV0ZU5hbWVdO1xuICAgIH0gZWxzZSBpZiAob3BlcmF0aW9uT3JBdHRyaWJ1dGVOYW1lIGluIHMuYXR0cmlidXRlcykge1xuICAgICAgc2VtYW50aWMgPSBzLmF0dHJpYnV0ZXNbb3BlcmF0aW9uT3JBdHRyaWJ1dGVOYW1lXTtcbiAgICAgIGRlbGV0ZSBzLmF0dHJpYnV0ZXNbb3BlcmF0aW9uT3JBdHRyaWJ1dGVOYW1lXTtcbiAgICB9XG4gICAgZGVsZXRlIHMuV3JhcHBlci5wcm90b3R5cGVbb3BlcmF0aW9uT3JBdHRyaWJ1dGVOYW1lXTtcbiAgICByZXR1cm4gc2VtYW50aWM7XG4gIH07XG4gIHByb3h5LmdldE9wZXJhdGlvbk5hbWVzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHMub3BlcmF0aW9ucyk7XG4gIH07XG4gIHByb3h5LmdldEF0dHJpYnV0ZU5hbWVzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHMuYXR0cmlidXRlcyk7XG4gIH07XG4gIHByb3h5LmdldEdyYW1tYXIgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gcy5ncmFtbWFyO1xuICB9O1xuICBwcm94eS50b1JlY2lwZSA9IGZ1bmN0aW9uKHNlbWFudGljc09ubHkpIHtcbiAgICByZXR1cm4gcy50b1JlY2lwZShzZW1hbnRpY3NPbmx5KTtcbiAgfTtcblxuICAvLyBNYWtlIHRoZSBwcm94eSdzIHRvU3RyaW5nKCkgd29yay5cbiAgcHJveHkudG9TdHJpbmcgPSBzLnRvU3RyaW5nLmJpbmQocyk7XG5cbiAgLy8gUmV0dXJucyB0aGUgc2VtYW50aWNzIGZvciB0aGUgcHJveHkuXG4gIHByb3h5Ll9nZXRTZW1hbnRpY3MgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gcztcbiAgfTtcblxuICByZXR1cm4gcHJveHk7XG59O1xuXG5TZW1hbnRpY3MuaW5pdEJ1aWx0SW5TZW1hbnRpY3MgPSBmdW5jdGlvbihidWlsdEluUnVsZXMpIHtcbiAgdmFyIGFjdGlvbnMgPSB7XG4gICAgZW1wdHk6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaXRlcmF0aW9uKCk7XG4gICAgfSxcbiAgICBub25FbXB0eTogZnVuY3Rpb24oZmlyc3QsIF8sIHJlc3QpIHtcbiAgICAgIHJldHVybiB0aGlzLml0ZXJhdGlvbihbZmlyc3RdLmNvbmNhdChyZXN0LmNoaWxkcmVuKSk7XG4gICAgfVxuICB9O1xuXG4gIFNlbWFudGljcy5CdWlsdEluU2VtYW50aWNzID0gU2VtYW50aWNzXG4gICAgICAuY3JlYXRlU2VtYW50aWNzKGJ1aWx0SW5SdWxlcywgbnVsbClcbiAgICAgIC5hZGRPcGVyYXRpb24oJ2FzSXRlcmF0aW9uJywge1xuICAgICAgICBlbXB0eUxpc3RPZjogYWN0aW9ucy5lbXB0eSxcbiAgICAgICAgbm9uZW1wdHlMaXN0T2Y6IGFjdGlvbnMubm9uRW1wdHksXG4gICAgICAgIEVtcHR5TGlzdE9mOiBhY3Rpb25zLmVtcHR5LFxuICAgICAgICBOb25lbXB0eUxpc3RPZjogYWN0aW9ucy5ub25FbXB0eVxuICAgICAgfSk7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLSBPcGVyYXRpb24gLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gQW4gT3BlcmF0aW9uIHJlcHJlc2VudHMgYSBmdW5jdGlvbiB0byBiZSBhcHBsaWVkIHRvIGEgY29uY3JldGUgc3ludGF4IHRyZWUgKENTVCkgLS0gaXQncyB2ZXJ5XG4vLyBzaW1pbGFyIHRvIGEgVmlzaXRvciAoaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9WaXNpdG9yX3BhdHRlcm4pLiBBbiBvcGVyYXRpb24gaXMgZXhlY3V0ZWQgYnlcbi8vIHJlY3Vyc2l2ZWx5IHdhbGtpbmcgdGhlIENTVCwgYW5kIGF0IGVhY2ggbm9kZSwgaW52b2tpbmcgdGhlIG1hdGNoaW5nIHNlbWFudGljIGFjdGlvbiBmcm9tXG4vLyBgYWN0aW9uRGljdGAuIFNlZSBgT3BlcmF0aW9uLnByb3RvdHlwZS5leGVjdXRlYCBmb3IgZGV0YWlscyBvZiBob3cgYSBDU1Qgbm9kZSdzIG1hdGNoaW5nIHNlbWFudGljXG4vLyBhY3Rpb24gaXMgZm91bmQuXG5mdW5jdGlvbiBPcGVyYXRpb24obmFtZSwgZm9ybWFscywgYWN0aW9uRGljdCwgYnVpbHRJbkRlZmF1bHQpIHtcbiAgdGhpcy5uYW1lID0gbmFtZTtcbiAgdGhpcy5mb3JtYWxzID0gZm9ybWFscztcbiAgdGhpcy5hY3Rpb25EaWN0ID0gYWN0aW9uRGljdDtcbiAgdGhpcy5idWlsdEluRGVmYXVsdCA9IGJ1aWx0SW5EZWZhdWx0O1xufVxuXG5PcGVyYXRpb24ucHJvdG90eXBlLnR5cGVOYW1lID0gJ29wZXJhdGlvbic7XG5cbk9wZXJhdGlvbi5wcm90b3R5cGUuY2hlY2tBY3Rpb25EaWN0ID0gZnVuY3Rpb24oZ3JhbW1hcikge1xuICBncmFtbWFyLl9jaGVja1RvcERvd25BY3Rpb25EaWN0KHRoaXMudHlwZU5hbWUsIHRoaXMubmFtZSwgdGhpcy5hY3Rpb25EaWN0KTtcbn07XG5cbi8vIEV4ZWN1dGUgdGhpcyBvcGVyYXRpb24gb24gdGhlIENTVCBub2RlIGFzc29jaWF0ZWQgd2l0aCBgbm9kZVdyYXBwZXJgIGluIHRoZSBjb250ZXh0IG9mIHRoZSBnaXZlblxuLy8gU2VtYW50aWNzIGluc3RhbmNlLlxuT3BlcmF0aW9uLnByb3RvdHlwZS5leGVjdXRlID0gZnVuY3Rpb24oc2VtYW50aWNzLCBub2RlV3JhcHBlcikge1xuICAvLyBMb29rIGZvciBhIHNlbWFudGljIGFjdGlvbiB3aG9zZSBuYW1lIG1hdGNoZXMgdGhlIG5vZGUncyBjb25zdHJ1Y3RvciBuYW1lLCB3aGljaCBpcyBlaXRoZXIgdGhlXG4gIC8vIG5hbWUgb2YgYSBydWxlIGluIHRoZSBncmFtbWFyLCBvciAnX3Rlcm1pbmFsJyAoZm9yIGEgdGVybWluYWwgbm9kZSksIG9yICdfaXRlcicgKGZvciBhblxuICAvLyBpdGVyYXRpb24gbm9kZSkuIEluIHRoZSBsYXR0ZXIgY2FzZSwgdGhlIGFjdGlvbiBmdW5jdGlvbiByZWNlaXZlcyBhIHNpbmdsZSBhcmd1bWVudCwgd2hpY2ggaXNcbiAgLy8gYW4gYXJyYXkgY29udGFpbmluZyBhbGwgb2YgdGhlIGNoaWxkcmVuIG9mIHRoZSBDU1Qgbm9kZS5cbiAgdmFyIGFjdGlvbkZuID0gdGhpcy5hY3Rpb25EaWN0W25vZGVXcmFwcGVyLl9ub2RlLmN0b3JOYW1lXTtcbiAgaWYgKGFjdGlvbkZuKSB7XG4gICAgcmV0dXJuIHRoaXMuZG9BY3Rpb24oc2VtYW50aWNzLCBub2RlV3JhcHBlciwgYWN0aW9uRm4sIG5vZGVXcmFwcGVyLmlzSXRlcmF0aW9uKCkpO1xuICB9XG5cbiAgLy8gVGhlIGFjdGlvbiBkaWN0aW9uYXJ5IGRvZXMgbm90IGNvbnRhaW4gYSBzZW1hbnRpYyBhY3Rpb24gZm9yIHRoaXMgc3BlY2lmaWMgdHlwZSBvZiBub2RlLlxuICAvLyBJZiB0aGlzIGlzIGEgbm9udGVybWluYWwgbm9kZSBhbmQgdGhlIHByb2dyYW1tZXIgaGFzIHByb3ZpZGVkIGEgYF9ub250ZXJtaW5hbGAgc2VtYW50aWNcbiAgLy8gYWN0aW9uLCB3ZSBpbnZva2UgaXQ6XG4gIGlmIChub2RlV3JhcHBlci5pc05vbnRlcm1pbmFsKCkpIHtcbiAgICBhY3Rpb25GbiA9IHRoaXMuYWN0aW9uRGljdC5fbm9udGVybWluYWw7XG4gICAgaWYgKGFjdGlvbkZuKSB7XG4gICAgICByZXR1cm4gdGhpcy5kb0FjdGlvbihzZW1hbnRpY3MsIG5vZGVXcmFwcGVyLCBhY3Rpb25GbiwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gT3RoZXJ3aXNlLCB3ZSBpbnZva2UgdGhlICdfZGVmYXVsdCcgc2VtYW50aWMgYWN0aW9uLlxuICByZXR1cm4gdGhpcy5kb0FjdGlvbihzZW1hbnRpY3MsIG5vZGVXcmFwcGVyLCB0aGlzLmFjdGlvbkRpY3QuX2RlZmF1bHQsIHRydWUpO1xufTtcblxuLy8gSW52b2tlIGBhY3Rpb25GbmAgb24gdGhlIENTVCBub2RlIHRoYXQgY29ycmVzcG9uZHMgdG8gYG5vZGVXcmFwcGVyYCwgaW4gdGhlIGNvbnRleHQgb2Zcbi8vIGBzZW1hbnRpY3NgLiBJZiBgb3B0UGFzc0NoaWxkcmVuQXNBcnJheWAgaXMgdHJ1dGh5LCBgYWN0aW9uRm5gIHdpbGwgYmUgY2FsbGVkIHdpdGggYSBzaW5nbGVcbi8vIGFyZ3VtZW50LCB3aGljaCBpcyBhbiBhcnJheSBvZiB3cmFwcGVycy4gT3RoZXJ3aXNlLCB0aGUgbnVtYmVyIG9mIGFyZ3VtZW50cyB0byBgYWN0aW9uRm5gIHdpbGxcbi8vIGJlIGVxdWFsIHRvIHRoZSBudW1iZXIgb2YgY2hpbGRyZW4gaW4gdGhlIENTVCBub2RlLlxuT3BlcmF0aW9uLnByb3RvdHlwZS5kb0FjdGlvbiA9IGZ1bmN0aW9uKHNlbWFudGljcywgbm9kZVdyYXBwZXIsIGFjdGlvbkZuLCBvcHRQYXNzQ2hpbGRyZW5Bc0FycmF5KSB7XG4gIHJldHVybiBvcHRQYXNzQ2hpbGRyZW5Bc0FycmF5ID9cbiAgICAgIGFjdGlvbkZuLmNhbGwobm9kZVdyYXBwZXIsIG5vZGVXcmFwcGVyLl9jaGlsZHJlbigpKSA6XG4gICAgICBhY3Rpb25Gbi5hcHBseShub2RlV3JhcHBlciwgbm9kZVdyYXBwZXIuX2NoaWxkcmVuKCkpO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0gQXR0cmlidXRlIC0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIEF0dHJpYnV0ZXMgYXJlIE9wZXJhdGlvbnMgd2hvc2UgcmVzdWx0cyBhcmUgbWVtb2l6ZWQuIFRoaXMgbWVhbnMgdGhhdCwgZm9yIGFueSBnaXZlbiBzZW1hbnRpY3MsXG4vLyB0aGUgc2VtYW50aWMgYWN0aW9uIGZvciBhIENTVCBub2RlIHdpbGwgYmUgaW52b2tlZCBubyBtb3JlIHRoYW4gb25jZS5cbmZ1bmN0aW9uIEF0dHJpYnV0ZShuYW1lLCBhY3Rpb25EaWN0LCBidWlsdEluRGVmYXVsdCkge1xuICB0aGlzLm5hbWUgPSBuYW1lO1xuICB0aGlzLmZvcm1hbHMgPSBbXTtcbiAgdGhpcy5hY3Rpb25EaWN0ID0gYWN0aW9uRGljdDtcbiAgdGhpcy5idWlsdEluRGVmYXVsdCA9IGJ1aWx0SW5EZWZhdWx0O1xufVxuaW5oZXJpdHMoQXR0cmlidXRlLCBPcGVyYXRpb24pO1xuXG5BdHRyaWJ1dGUucHJvdG90eXBlLnR5cGVOYW1lID0gJ2F0dHJpYnV0ZSc7XG5cbkF0dHJpYnV0ZS5wcm90b3R5cGUuZXhlY3V0ZSA9IGZ1bmN0aW9uKHNlbWFudGljcywgbm9kZVdyYXBwZXIpIHtcbiAgdmFyIG5vZGUgPSBub2RlV3JhcHBlci5fbm9kZTtcbiAgdmFyIGtleSA9IHNlbWFudGljcy5hdHRyaWJ1dGVLZXlzW3RoaXMubmFtZV07XG4gIGlmICghbm9kZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgLy8gVGhlIGZvbGxvd2luZyBpcyBhIHN1cGVyLXNlbmQgLS0gaXNuJ3QgSlMgYmVhdXRpZnVsPyA6L1xuICAgIG5vZGVba2V5XSA9IE9wZXJhdGlvbi5wcm90b3R5cGUuZXhlY3V0ZS5jYWxsKHRoaXMsIHNlbWFudGljcywgbm9kZVdyYXBwZXIpO1xuICB9XG4gIHJldHVybiBub2RlW2tleV07XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubW9kdWxlLmV4cG9ydHMgPSBTZW1hbnRpY3M7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgSW5wdXRTdHJlYW0gPSByZXF1aXJlKCcuL0lucHV0U3RyZWFtJyk7XG52YXIgUG9zSW5mbyA9IHJlcXVpcmUoJy4vUG9zSW5mbycpO1xudmFyIFRyYWNlID0gcmVxdWlyZSgnLi9UcmFjZScpO1xudmFyIHBleHBycyA9IHJlcXVpcmUoJy4vcGV4cHJzJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBQcml2YXRlIHN0dWZmXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgUk1fUklHSFRNT1NUX0ZBSUxVUkVfUE9TSVRJT04gPSAwO1xudmFyIFJNX1JJR0hUTU9TVF9GQUlMVVJFUyA9IDE7XG5cbnZhciBhcHBseVNwYWNlcyA9IG5ldyBwZXhwcnMuQXBwbHkoJ3NwYWNlcycpO1xuXG5mdW5jdGlvbiBTdGF0ZShncmFtbWFyLCBpbnB1dCwgb3B0cykge1xuICB0aGlzLmdyYW1tYXIgPSBncmFtbWFyO1xuICB0aGlzLnN0YXJ0RXhwciA9IHRoaXMuX2dldFN0YXJ0RXhwcihncmFtbWFyLCBvcHRzLnN0YXJ0QXBwbGljYXRpb24pO1xuICB0aGlzLmlucHV0U3RyZWFtID0gbmV3IElucHV0U3RyZWFtKGlucHV0KTtcbiAgdGhpcy50cmFjaW5nRW5hYmxlZCA9IG9wdHMudHJhY2UgfHwgZmFsc2U7XG4gIHRoaXMuaW5pdChSTV9SSUdIVE1PU1RfRkFJTFVSRV9QT1NJVElPTik7XG59XG5cblN0YXRlLnByb3RvdHlwZSA9IHtcbiAgaW5pdDogZnVuY3Rpb24ocmVjb3JkaW5nTW9kZSkge1xuICAgIHRoaXMucG9zSW5mb3MgPSBbXTtcbiAgICB0aGlzLmJpbmRpbmdzID0gW107XG4gICAgdGhpcy5hcHBsaWNhdGlvblN0YWNrID0gW107XG4gICAgdGhpcy5pbkxleGlmaWVkQ29udGV4dFN0YWNrID0gW2ZhbHNlXTtcblxuICAgIHRoaXMucmVjb3JkaW5nTW9kZSA9IHJlY29yZGluZ01vZGU7XG4gICAgaWYgKHJlY29yZGluZ01vZGUgPT09IFJNX1JJR0hUTU9TVF9GQUlMVVJFX1BPU0lUSU9OKSB7XG4gICAgICB0aGlzLnJpZ2h0bW9zdEZhaWx1cmVQb3NpdGlvbiA9IC0xO1xuICAgIH0gZWxzZSBpZiAocmVjb3JkaW5nTW9kZSA9PT0gUk1fUklHSFRNT1NUX0ZBSUxVUkVTKSB7XG4gICAgICAvLyBXZSBhbHdheXMgcnVuIGluICpyaWdodG1vc3QgZmFpbHVyZSBwb3NpdGlvbiogcmVjb3JkaW5nIG1vZGUgYmVmb3JlIHJ1bm5pbmcgaW5cbiAgICAgIC8vICpyaWdodG1vc3QgZmFpbHVyZXMqIHJlY29yZGluZyBtb2RlLiBBbmQgc2luY2UgdGhlIHRyYWNlcyBnZW5lcmF0ZWQgYnkgZWFjaCBvZlxuICAgICAgLy8gdGhlc2UgcGFzc2VzIHdvdWxkIGJlIGlkZW50aWNhbCwgdGhlcmUncyBubyBuZWVkIHRvIHJlY29yZCBpdCBub3cgaWYgd2UgaGF2ZVxuICAgICAgLy8gYWxyZWFkeSByZWNvcmRlZCBpdCBpbiB0aGUgZmlyc3QgcGFzcy5cbiAgICAgIHRoaXMudHJhY2luZ0VuYWJsZWQgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIHJlY29yZGluZyBtb2RlOiAnICsgcmVjb3JkaW5nTW9kZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNUcmFjaW5nKCkpIHtcbiAgICAgIHRoaXMudHJhY2UgPSBbXTtcbiAgICB9XG4gIH0sXG5cbiAgZW50ZXI6IGZ1bmN0aW9uKGFwcCkge1xuICAgIHRoaXMuYXBwbGljYXRpb25TdGFjay5wdXNoKGFwcCk7XG4gICAgdGhpcy5pbkxleGlmaWVkQ29udGV4dFN0YWNrLnB1c2goZmFsc2UpO1xuICB9LFxuXG4gIGV4aXQ6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuYXBwbGljYXRpb25TdGFjay5wb3AoKTtcbiAgICB0aGlzLmluTGV4aWZpZWRDb250ZXh0U3RhY2sucG9wKCk7XG4gIH0sXG5cbiAgZW50ZXJMZXhpZmllZENvbnRleHQ6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuaW5MZXhpZmllZENvbnRleHRTdGFjay5wdXNoKHRydWUpO1xuICB9LFxuXG4gIGV4aXRMZXhpZmllZENvbnRleHQ6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuaW5MZXhpZmllZENvbnRleHRTdGFjay5wb3AoKTtcbiAgfSxcblxuICBjdXJyZW50QXBwbGljYXRpb246IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmFwcGxpY2F0aW9uU3RhY2tbdGhpcy5hcHBsaWNhdGlvblN0YWNrLmxlbmd0aCAtIDFdO1xuICB9LFxuXG4gIGluU3ludGFjdGljQ29udGV4dDogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLmlucHV0U3RyZWFtLnNvdXJjZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIGN1cnJlbnRBcHBsaWNhdGlvbiA9IHRoaXMuY3VycmVudEFwcGxpY2F0aW9uKCk7XG4gICAgaWYgKGN1cnJlbnRBcHBsaWNhdGlvbikge1xuICAgICAgcmV0dXJuIGN1cnJlbnRBcHBsaWNhdGlvbi5pc1N5bnRhY3RpYygpICYmICF0aGlzLmluTGV4aWZpZWRDb250ZXh0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRoZSB0b3AtbGV2ZWwgY29udGV4dCBpcyBzeW50YWN0aWMgaWYgdGhlIHN0YXJ0IGFwcGxpY2F0aW9uIGlzLlxuICAgICAgcmV0dXJuIHRoaXMuc3RhcnRFeHByLmZhY3RvcnNbMF0uaXNTeW50YWN0aWMoKTtcbiAgICB9XG4gIH0sXG5cbiAgaW5MZXhpZmllZENvbnRleHQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmluTGV4aWZpZWRDb250ZXh0U3RhY2tbdGhpcy5pbkxleGlmaWVkQ29udGV4dFN0YWNrLmxlbmd0aCAtIDFdO1xuICB9LFxuXG4gIHNraXBTcGFjZXM6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvcmlnRmFpbHVyZXNJbmZvID0gdGhpcy5nZXRGYWlsdXJlc0luZm8oKTtcbiAgICB0aGlzLmV2YWwoYXBwbHlTcGFjZXMpO1xuICAgIHRoaXMuYmluZGluZ3MucG9wKCk7XG4gICAgdGhpcy5yZXN0b3JlRmFpbHVyZXNJbmZvKG9yaWdGYWlsdXJlc0luZm8pO1xuICAgIHJldHVybiB0aGlzLmlucHV0U3RyZWFtLnBvcztcbiAgfSxcblxuICBza2lwU3BhY2VzSWZJblN5bnRhY3RpY0NvbnRleHQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmluU3ludGFjdGljQ29udGV4dCgpID9cbiAgICAgICAgdGhpcy5za2lwU3BhY2VzKCkgOlxuICAgICAgICB0aGlzLmlucHV0U3RyZWFtLnBvcztcbiAgfSxcblxuICBtYXliZVNraXBTcGFjZXNCZWZvcmU6IGZ1bmN0aW9uKGV4cHIpIHtcbiAgICBpZiAoZXhwciBpbnN0YW5jZW9mIHBleHBycy5BcHBseSAmJiBleHByLmlzU3ludGFjdGljKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLnNraXBTcGFjZXMoKTtcbiAgICB9IGVsc2UgaWYgKGV4cHIuYWxsb3dzU2tpcHBpbmdQcmVjZWRpbmdTcGFjZSgpICYmIGV4cHIgIT09IGFwcGx5U3BhY2VzKSB7XG4gICAgICByZXR1cm4gdGhpcy5za2lwU3BhY2VzSWZJblN5bnRhY3RpY0NvbnRleHQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuaW5wdXRTdHJlYW0ucG9zO1xuICAgIH1cbiAgfSxcblxuICB0cnVuY2F0ZUJpbmRpbmdzOiBmdW5jdGlvbihuZXdMZW5ndGgpIHtcbiAgICAvLyBZZXMsIHRoaXMgaXMgdGhpcyByZWFsbHkgZmFzdGVyIHRoYW4gc2V0dGluZyB0aGUgYGxlbmd0aGAgcHJvcGVydHkgKHRlc3RlZCB3aXRoXG4gICAgLy8gYmluL2VzNWJlbmNoIG9uIE5vZGUgdjYuMS4wKS5cbiAgICB3aGlsZSAodGhpcy5iaW5kaW5ncy5sZW5ndGggPiBuZXdMZW5ndGgpIHtcbiAgICAgIHRoaXMuYmluZGluZ3MucG9wKCk7XG4gICAgfVxuICB9LFxuXG4gIGdldEN1cnJlbnRQb3NJbmZvOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRQb3NJbmZvKHRoaXMuaW5wdXRTdHJlYW0ucG9zKTtcbiAgfSxcblxuICBnZXRQb3NJbmZvOiBmdW5jdGlvbihwb3MpIHtcbiAgICB2YXIgcG9zSW5mbyA9IHRoaXMucG9zSW5mb3NbcG9zXTtcbiAgICBpZiAoIXBvc0luZm8pIHtcbiAgICAgIHBvc0luZm8gPSB0aGlzLnBvc0luZm9zW3Bvc10gPSBuZXcgUG9zSW5mbyh0aGlzKTtcbiAgICB9XG4gICAgcmV0dXJuIHBvc0luZm87XG4gIH0sXG5cbiAgcHJvY2Vzc0ZhaWx1cmU6IGZ1bmN0aW9uKHBvcywgZXhwcikge1xuICAgIGlmICh0aGlzLnJlY29yZGluZ01vZGUgPT09IFJNX1JJR0hUTU9TVF9GQUlMVVJFX1BPU0lUSU9OKSB7XG4gICAgICBpZiAocG9zID4gdGhpcy5yaWdodG1vc3RGYWlsdXJlUG9zaXRpb24pIHtcbiAgICAgICAgdGhpcy5yaWdodG1vc3RGYWlsdXJlUG9zaXRpb24gPSBwb3M7XG4gICAgICB9XG4gICAgfSBlbHNlIC8qIGlmICh0aGlzLnJlY29yZGluZ01vZGUgPT09IFJNX1JJR0hUTU9TVF9GQUlMVVJFUykgKi9cbiAgICAgICAgaWYgKHBvcyA9PT0gdGhpcy5yaWdodG1vc3RGYWlsdXJlUG9zaXRpb24pIHtcbiAgICAgICAgICAvLyBXZSdyZSBvbmx5IGludGVyZXN0ZWQgaW4gZmFpbHVyZXMgYXQgdGhlIHJpZ2h0bW9zdCBmYWlsdXJlIHBvc2l0aW9uIHRoYXQgaGF2ZW4ndFxuICAgICAgICAgIC8vIGFscmVhZHkgYmVlbiByZWNvcmRlZC5cblxuICAgICAgICAgIHZhciBhcHAgPSB0aGlzLmN1cnJlbnRBcHBsaWNhdGlvbigpO1xuICAgICAgICAgIGlmIChhcHApIHtcbiAgICAgICAgICAgIC8vIFN1YnN0aXR1dGUgcGFyYW1ldGVycyB3aXRoIHRoZSBhY3R1YWwgcGV4cHJzIHRoYXQgd2VyZSBwYXNzZWQgdG9cbiAgICAgICAgICAgIC8vIHRoZSBjdXJyZW50IHJ1bGUuXG4gICAgICAgICAgICBleHByID0gZXhwci5zdWJzdGl0dXRlUGFyYW1zKGFwcC5hcmdzKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gVGhpcyBicmFuY2ggaXMgb25seSByZWFjaGVkIGZvciB0aGUgXCJlbmQtY2hlY2tcIiB0aGF0IGlzXG4gICAgICAgICAgICAvLyBwZXJmb3JtZWQgYWZ0ZXIgdGhlIHRvcC1sZXZlbCBhcHBsaWNhdGlvbi4gSW4gdGhhdCBjYXNlLFxuICAgICAgICAgICAgLy8gZXhwciA9PT0gcGV4cHJzLmVuZCBzbyB0aGVyZSBpcyBubyBuZWVkIHRvIHN1YnN0aXR1dGVcbiAgICAgICAgICAgIC8vIHBhcmFtZXRlcnMuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5hZGRSaWdodG1vc3RGYWlsdXJlKGV4cHIudG9GYWlsdXJlKHRoaXMuZ3JhbW1hciksIGZhbHNlKTtcbiAgICAgICAgfVxuICB9LFxuXG4gIGVuc3VyZVJpZ2h0bW9zdEZhaWx1cmVzOiBmdW5jdGlvbigpIHtcbiAgICBpZiAoIXRoaXMucmlnaHRtb3N0RmFpbHVyZXMpIHtcbiAgICAgIHRoaXMucmlnaHRtb3N0RmFpbHVyZXMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIH1cbiAgfSxcblxuICBhZGRSaWdodG1vc3RGYWlsdXJlOiBmdW5jdGlvbihmYWlsdXJlLCBzaG91bGRDbG9uZUlmTmV3KSB7XG4gICAgdGhpcy5lbnN1cmVSaWdodG1vc3RGYWlsdXJlcygpO1xuICAgIHZhciBrZXkgPSBmYWlsdXJlLnRvS2V5KCk7XG4gICAgaWYgKCF0aGlzLnJpZ2h0bW9zdEZhaWx1cmVzW2tleV0pIHtcbiAgICAgIHRoaXMucmlnaHRtb3N0RmFpbHVyZXNba2V5XSA9IHNob3VsZENsb25lSWZOZXcgPyBmYWlsdXJlLmNsb25lKCkgOiBmYWlsdXJlO1xuICAgIH0gZWxzZSBpZiAodGhpcy5yaWdodG1vc3RGYWlsdXJlc1trZXldLmlzRmx1ZmZ5KCkgJiYgIWZhaWx1cmUuaXNGbHVmZnkoKSkge1xuICAgICAgdGhpcy5yaWdodG1vc3RGYWlsdXJlc1trZXldLmNsZWFyRmx1ZmZ5KCk7XG4gICAgfVxuICB9LFxuXG4gIGFkZFJpZ2h0bW9zdEZhaWx1cmVzOiBmdW5jdGlvbihmYWlsdXJlcywgc2hvdWxkQ2xvbmVJZk5ldykge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBPYmplY3Qua2V5cyhmYWlsdXJlcykuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICAgIHNlbGYuYWRkUmlnaHRtb3N0RmFpbHVyZShmYWlsdXJlc1trZXldLCBzaG91bGRDbG9uZUlmTmV3KTtcbiAgICB9KTtcbiAgfSxcblxuICBjbG9uZVJpZ2h0bW9zdEZhaWx1cmVzOiBmdW5jdGlvbigpIHtcbiAgICBpZiAoIXRoaXMucmlnaHRtb3N0RmFpbHVyZXMpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgdmFyIGFucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIE9iamVjdC5rZXlzKHRoaXMucmlnaHRtb3N0RmFpbHVyZXMpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICBhbnNba2V5XSA9IHNlbGYucmlnaHRtb3N0RmFpbHVyZXNba2V5XS5jbG9uZSgpO1xuICAgIH0pO1xuICAgIHJldHVybiBhbnM7XG4gIH0sXG5cbiAgZ2V0UmlnaHRtb3N0RmFpbHVyZVBvc2l0aW9uOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5yaWdodG1vc3RGYWlsdXJlUG9zaXRpb247XG4gIH0sXG5cbiAgZ2V0RmFpbHVyZXM6IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLnJlY29yZGluZ01vZGUgPT09IFJNX1JJR0hUTU9TVF9GQUlMVVJFX1BPU0lUSU9OKSB7XG4gICAgICAvLyBSZXdpbmQsIHRoZW4gdHJ5IHRvIG1hdGNoIHRoZSBpbnB1dCBhZ2FpbiwgcmVjb3JkaW5nIGZhaWx1cmVzLlxuICAgICAgdGhpcy5pbml0KFJNX1JJR0hUTU9TVF9GQUlMVVJFUyk7XG4gICAgICB0aGlzLmV2YWxGcm9tU3RhcnQoKTtcbiAgICB9XG5cbiAgICB0aGlzLmVuc3VyZVJpZ2h0bW9zdEZhaWx1cmVzKCk7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLnJpZ2h0bW9zdEZhaWx1cmVzKS5tYXAoZnVuY3Rpb24oa2V5KSB7XG4gICAgICByZXR1cm4gc2VsZi5yaWdodG1vc3RGYWlsdXJlc1trZXldO1xuICAgIH0pO1xuICB9LFxuXG4gIC8vIFJldHVybnMgdGhlIG1lbW9pemVkIHRyYWNlIGVudHJ5IGZvciBgZXhwcmAgYXQgYHBvc2AsIGlmIG9uZSBleGlzdHMsIGBudWxsYCBvdGhlcndpc2UuXG4gIGdldE1lbW9pemVkVHJhY2VFbnRyeTogZnVuY3Rpb24ocG9zLCBleHByKSB7XG4gICAgdmFyIHBvc0luZm8gPSB0aGlzLnBvc0luZm9zW3Bvc107XG4gICAgaWYgKHBvc0luZm8gJiYgZXhwci5ydWxlTmFtZSkge1xuICAgICAgdmFyIG1lbW9SZWMgPSBwb3NJbmZvLm1lbW9bZXhwci50b01lbW9LZXkoKV07XG4gICAgICBpZiAobWVtb1JlYyAmJiBtZW1vUmVjLnRyYWNlRW50cnkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gbWVtb1JlYy50cmFjZUVudHJ5LmNsb25lV2l0aEV4cHIoZXhwcik7XG4gICAgICAgIGVudHJ5LmlzTWVtb2l6ZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gZW50cnk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9LFxuXG4gIC8vIFJldHVybnMgYSBuZXcgdHJhY2UgZW50cnksIHdpdGggdGhlIGN1cnJlbnRseSBhY3RpdmUgdHJhY2UgYXJyYXkgYXMgaXRzIGNoaWxkcmVuLlxuICBnZXRUcmFjZUVudHJ5OiBmdW5jdGlvbihwb3MsIGV4cHIsIHN1Y2NlZWRlZCwgYmluZGluZ3MpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRNZW1vaXplZFRyYWNlRW50cnkocG9zLCBleHByKSB8fFxuICAgICAgICAgICBuZXcgVHJhY2UodGhpcy5pbnB1dFN0cmVhbSwgcG9zLCBleHByLCBzdWNjZWVkZWQsIGJpbmRpbmdzLCB0aGlzLnRyYWNlKTtcbiAgfSxcblxuICBpc1RyYWNpbmc6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnRyYWNpbmdFbmFibGVkO1xuICB9LFxuXG4gIHVzZU1lbW9pemVkUmVzdWx0OiBmdW5jdGlvbihtZW1vUmVjKSB7XG4gICAgaWYgKHRoaXMuaXNUcmFjaW5nKCkpIHtcbiAgICAgIHRoaXMudHJhY2UucHVzaChtZW1vUmVjLnRyYWNlRW50cnkpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnJlY29yZGluZ01vZGUgPT09IFJNX1JJR0hUTU9TVF9GQUlMVVJFUyAmJiBtZW1vUmVjLmZhaWx1cmVzQXRSaWdodG1vc3RQb3NpdGlvbikge1xuICAgICAgdGhpcy5hZGRSaWdodG1vc3RGYWlsdXJlcyhtZW1vUmVjLmZhaWx1cmVzQXRSaWdodG1vc3RQb3NpdGlvbiwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaWYgKG1lbW9SZWMudmFsdWUpIHtcbiAgICAgIHRoaXMuaW5wdXRTdHJlYW0ucG9zID0gbWVtb1JlYy5wb3M7XG4gICAgICB0aGlzLmJpbmRpbmdzLnB1c2gobWVtb1JlYy52YWx1ZSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuXG4gIC8vIEV2YWx1YXRlIGBleHByYCBhbmQgcmV0dXJuIGB0cnVlYCBpZiBpdCBzdWNjZWVkZWQsIGBmYWxzZWAgb3RoZXJ3aXNlLiBPbiBzdWNjZXNzLCBgYmluZGluZ3NgXG4gIC8vIHdpbGwgaGF2ZSBgZXhwci5nZXRBcml0eSgpYCBtb3JlIGVsZW1lbnRzIHRoYW4gYmVmb3JlLCBhbmQgdGhlIGlucHV0IHN0cmVhbSdzIHBvc2l0aW9uIG1heVxuICAvLyBoYXZlIGluY3JlYXNlZC4gT24gZmFpbHVyZSwgYGJpbmRpbmdzYCBhbmQgcG9zaXRpb24gd2lsbCBiZSB1bmNoYW5nZWQuXG4gIGV2YWw6IGZ1bmN0aW9uKGV4cHIpIHtcbiAgICB2YXIgaW5wdXRTdHJlYW0gPSB0aGlzLmlucHV0U3RyZWFtO1xuICAgIHZhciBvcmlnTnVtQmluZGluZ3MgPSB0aGlzLmJpbmRpbmdzLmxlbmd0aDtcblxuICAgIHZhciBvcmlnRmFpbHVyZXM7XG4gICAgaWYgKHRoaXMucmVjb3JkaW5nTW9kZSA9PT0gUk1fUklHSFRNT1NUX0ZBSUxVUkVTKSB7XG4gICAgICBvcmlnRmFpbHVyZXMgPSB0aGlzLnJpZ2h0bW9zdEZhaWx1cmVzO1xuICAgICAgdGhpcy5yaWdodG1vc3RGYWlsdXJlcyA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICB2YXIgb3JpZ1BvcyA9IGlucHV0U3RyZWFtLnBvcztcbiAgICB2YXIgbWVtb1BvcyA9IHRoaXMubWF5YmVTa2lwU3BhY2VzQmVmb3JlKGV4cHIpO1xuXG4gICAgdmFyIG9yaWdUcmFjZTtcbiAgICBpZiAodGhpcy5pc1RyYWNpbmcoKSkge1xuICAgICAgb3JpZ1RyYWNlID0gdGhpcy50cmFjZTtcbiAgICAgIHRoaXMudHJhY2UgPSBbXTtcbiAgICB9XG5cbiAgICAvLyBEbyB0aGUgYWN0dWFsIGV2YWx1YXRpb24uXG4gICAgdmFyIGFucyA9IGV4cHIuZXZhbCh0aGlzKTtcblxuICAgIGlmICh0aGlzLmlzVHJhY2luZygpKSB7XG4gICAgICB2YXIgYmluZGluZ3MgPSB0aGlzLmJpbmRpbmdzLnNsaWNlKG9yaWdOdW1CaW5kaW5ncyk7XG4gICAgICB2YXIgdHJhY2VFbnRyeSA9IHRoaXMuZ2V0VHJhY2VFbnRyeShtZW1vUG9zLCBleHByLCBhbnMsIGJpbmRpbmdzKTtcbiAgICAgIHRyYWNlRW50cnkuaXNJbXBsaWNpdFNwYWNlcyA9IGV4cHIgPT09IGFwcGx5U3BhY2VzO1xuICAgICAgdHJhY2VFbnRyeS5pc1Jvb3ROb2RlID0gZXhwciA9PT0gdGhpcy5zdGFydEV4cHI7XG4gICAgICBvcmlnVHJhY2UucHVzaCh0cmFjZUVudHJ5KTtcbiAgICAgIHRoaXMudHJhY2UgPSBvcmlnVHJhY2U7XG4gICAgfVxuXG4gICAgaWYgKGFucykge1xuICAgICAgaWYgKHRoaXMucmlnaHRtb3N0RmFpbHVyZXMgJiZcbiAgICAgICAgKGlucHV0U3RyZWFtLnBvcyA9PT0gdGhpcy5yaWdodG1vc3RGYWlsdXJlUG9zaXRpb24gfHxcbiAgICAgICAgIHRoaXMuc2tpcFNwYWNlc0lmSW5TeW50YWN0aWNDb250ZXh0KCkgPT09IHRoaXMucmlnaHRtb3N0RmFpbHVyZVBvc2l0aW9uKSkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMucmlnaHRtb3N0RmFpbHVyZXMpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgc2VsZi5yaWdodG1vc3RGYWlsdXJlc1trZXldLm1ha2VGbHVmZnkoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlc2V0IHRoZSBwb3NpdGlvbiBhbmQgdGhlIGJpbmRpbmdzLlxuICAgICAgaW5wdXRTdHJlYW0ucG9zID0gb3JpZ1BvcztcbiAgICAgIHRoaXMudHJ1bmNhdGVCaW5kaW5ncyhvcmlnTnVtQmluZGluZ3MpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnJlY29yZGluZ01vZGUgPT09IFJNX1JJR0hUTU9TVF9GQUlMVVJFUyAmJiBvcmlnRmFpbHVyZXMpIHtcbiAgICAgIHRoaXMuYWRkUmlnaHRtb3N0RmFpbHVyZXMob3JpZ0ZhaWx1cmVzLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFucztcbiAgfSxcblxuICAvLyBSZXR1cm4gdGhlIHN0YXJ0aW5nIGV4cHJlc3Npb24gZm9yIHRoaXMgZ3JhbW1hci4gSWYgYG9wdFN0YXJ0QXBwbGljYXRpb25gIGlzIHNwZWNpZmllZCwgaXRcbiAgLy8gaXMgYSBzdHJpbmcgZXhwcmVzc2luZyBhIHJ1bGUgYXBwbGljYXRpb24gaW4gdGhlIGdyYW1tYXIuIElmIG5vdCBzcGVjaWZpZWQsIHRoZSBncmFtbWFyJ3NcbiAgLy8gZGVmYXVsdCBzdGFydCBydWxlIHdpbGwgYmUgdXNlZC5cbiAgX2dldFN0YXJ0RXhwcjogZnVuY3Rpb24oZ3JhbW1hciwgb3B0U3RhcnRBcHBsaWNhdGlvbikge1xuICAgIHZhciBhcHBsaWNhdGlvblN0ciA9IG9wdFN0YXJ0QXBwbGljYXRpb24gfHwgZ3JhbW1hci5kZWZhdWx0U3RhcnRSdWxlO1xuICAgIGlmICghYXBwbGljYXRpb25TdHIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBzdGFydCBydWxlIGFyZ3VtZW50IC0tIHRoZSBncmFtbWFyIGhhcyBubyBkZWZhdWx0IHN0YXJ0IHJ1bGUuJyk7XG4gICAgfVxuXG4gICAgdmFyIHN0YXJ0QXBwID0gZ3JhbW1hci5wYXJzZUFwcGxpY2F0aW9uKGFwcGxpY2F0aW9uU3RyKTtcbiAgICByZXR1cm4gbmV3IHBleHBycy5TZXEoW3N0YXJ0QXBwLCBwZXhwcnMuZW5kXSk7XG4gIH0sXG5cbiAgZXZhbEZyb21TdGFydDogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5ldmFsKHRoaXMuc3RhcnRFeHByKTtcbiAgfSxcblxuICBnZXRGYWlsdXJlc0luZm86IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLnJlY29yZGluZ01vZGUgPT09IFJNX1JJR0hUTU9TVF9GQUlMVVJFX1BPU0lUSU9OKSB7XG4gICAgICByZXR1cm4gdGhpcy5yaWdodG1vc3RGYWlsdXJlUG9zaXRpb247XG4gICAgfSBlbHNlIC8qIGlmICh0aGlzLnJlY29yZGluZ01vZGUgPT09IFJNX1JJR0hUTU9TVF9GQUlMVVJFUykgKi8ge1xuICAgICAgcmV0dXJuIHRoaXMucmlnaHRtb3N0RmFpbHVyZXM7XG4gICAgfVxuICB9LFxuXG4gIHJlc3RvcmVGYWlsdXJlc0luZm86IGZ1bmN0aW9uKGZhaWx1cmVzSW5mbykge1xuICAgIGlmICh0aGlzLnJlY29yZGluZ01vZGUgPT09IFJNX1JJR0hUTU9TVF9GQUlMVVJFX1BPU0lUSU9OKSB7XG4gICAgICB0aGlzLnJpZ2h0bW9zdEZhaWx1cmVQb3NpdGlvbiA9IGZhaWx1cmVzSW5mbztcbiAgICB9IGVsc2UgLyogaWYgKHRoaXMucmVjb3JkaW5nTW9kZSA9PT0gUk1fUklHSFRNT1NUX0ZBSUxVUkVTKSAqLyB7XG4gICAgICB0aGlzLnJpZ2h0bW9zdEZhaWx1cmVzID0gZmFpbHVyZXNJbmZvO1xuICAgIH1cbiAgfVxufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4cG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm1vZHVsZS5leHBvcnRzID0gU3RhdGU7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgSW50ZXJ2YWwgPSByZXF1aXJlKCcuL0ludGVydmFsJyk7XG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24nKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFByaXZhdGUgc3R1ZmZcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIFVuaWNvZGUgY2hhcmFjdGVycyB0aGF0IGFyZSB1c2VkIGluIHRoZSBgdG9TdHJpbmdgIG91dHB1dC5cbnZhciBCQUxMT1RfWCA9ICdcXHUyNzE3JztcbnZhciBDSEVDS19NQVJLID0gJ1xcdTI3MTMnO1xudmFyIERPVF9PUEVSQVRPUiA9ICdcXHUyMkM1JztcbnZhciBSSUdIVFdBUkRTX0RPVUJMRV9BUlJPVyA9ICdcXHUyMUQyJztcbnZhciBTWU1CT0xfRk9SX0hPUklaT05UQUxfVEFCVUxBVElPTiA9ICdcXHUyNDA5JztcbnZhciBTWU1CT0xfRk9SX0xJTkVfRkVFRCA9ICdcXHUyNDBBJztcbnZhciBTWU1CT0xfRk9SX0NBUlJJQUdFX1JFVFVSTiA9ICdcXHUyNDBEJztcblxuZnVuY3Rpb24gc3BhY2VzKG4pIHtcbiAgcmV0dXJuIGNvbW1vbi5yZXBlYXQoJyAnLCBuKS5qb2luKCcnKTtcbn1cblxuLy8gUmV0dXJuIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgcG9ydGlvbiBvZiBgaW5wdXRTdHJlYW1gIGF0IG9mZnNldCBgcG9zYC5cbi8vIFRoZSByZXN1bHQgd2lsbCBjb250YWluIGV4YWN0bHkgYGxlbmAgY2hhcmFjdGVycy5cbmZ1bmN0aW9uIGdldElucHV0RXhjZXJwdChpbnB1dFN0cmVhbSwgcG9zLCBsZW4pIHtcbiAgdmFyIGV4Y2VycHQgPSBhc0VzY2FwZWRTdHJpbmcoaW5wdXRTdHJlYW0uc291cmNlU2xpY2UocG9zLCBwb3MgKyBsZW4pKTtcblxuICAvLyBQYWQgdGhlIG91dHB1dCBpZiBuZWNlc3NhcnkuXG4gIGlmIChleGNlcnB0Lmxlbmd0aCA8IGxlbikge1xuICAgIHJldHVybiBleGNlcnB0ICsgY29tbW9uLnJlcGVhdCgnICcsIGxlbiAtIGV4Y2VycHQubGVuZ3RoKS5qb2luKCcnKTtcbiAgfVxuICByZXR1cm4gZXhjZXJwdDtcbn1cblxuZnVuY3Rpb24gYXNFc2NhcGVkU3RyaW5nKG9iaikge1xuICBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycpIHtcbiAgICAvLyBSZXBsYWNlIG5vbi1wcmludGFibGUgY2hhcmFjdGVycyB3aXRoIHZpc2libGUgc3ltYm9scy5cbiAgICByZXR1cm4gb2JqXG4gICAgICAgIC5yZXBsYWNlKC8gL2csIERPVF9PUEVSQVRPUilcbiAgICAgICAgLnJlcGxhY2UoL1xcdC9nLCBTWU1CT0xfRk9SX0hPUklaT05UQUxfVEFCVUxBVElPTilcbiAgICAgICAgLnJlcGxhY2UoL1xcbi9nLCBTWU1CT0xfRk9SX0xJTkVfRkVFRClcbiAgICAgICAgLnJlcGxhY2UoL1xcci9nLCBTWU1CT0xfRk9SX0NBUlJJQUdFX1JFVFVSTik7XG4gIH1cbiAgcmV0dXJuIFN0cmluZyhvYmopO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLSBUcmFjZSAtLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBUcmFjZShpbnB1dFN0cmVhbSwgcG9zLCBleHByLCBzdWNjZWVkZWQsIGJpbmRpbmdzLCBvcHRDaGlsZHJlbikge1xuICB0aGlzLmlucHV0U3RyZWFtID0gaW5wdXRTdHJlYW07XG4gIHRoaXMucG9zID0gcG9zO1xuICB0aGlzLnNvdXJjZSA9IG5ldyBJbnRlcnZhbChpbnB1dFN0cmVhbSwgcG9zLCBpbnB1dFN0cmVhbS5wb3MpO1xuICB0aGlzLmV4cHIgPSBleHByO1xuICB0aGlzLnN1Y2NlZWRlZCA9IHN1Y2NlZWRlZDtcbiAgdGhpcy5iaW5kaW5ncyA9IGJpbmRpbmdzO1xuICB0aGlzLmNoaWxkcmVuID0gb3B0Q2hpbGRyZW4gfHwgW107XG5cbiAgdGhpcy5pc0hlYWRPZkxlZnRSZWN1cnNpb24gPSBmYWxzZTsgIC8vIElzIHRoaXMgdGhlIG91dGVybW9zdCBMUiBhcHBsaWNhdGlvbj9cbiAgdGhpcy5pc0ltcGxpY2l0U3BhY2VzID0gZmFsc2U7XG4gIHRoaXMuaXNNZW1vaXplZCA9IGZhbHNlO1xuICB0aGlzLmlzUm9vdE5vZGUgPSBmYWxzZTtcbiAgdGhpcy50ZXJtaW5hdGVzTFIgPSBmYWxzZTtcbiAgdGhpcy50ZXJtaW5hdGluZ0xSRW50cnkgPSBudWxsO1xufVxuXG4vLyBBIHZhbHVlIHRoYXQgY2FuIGJlIHJldHVybmVkIGZyb20gdmlzaXRvciBmdW5jdGlvbnMgdG8gaW5kaWNhdGUgdGhhdCBhXG4vLyBub2RlIHNob3VsZCBub3QgYmUgcmVjdXJzZWQgaW50by5cblRyYWNlLnByb3RvdHlwZS5TS0lQID0ge307XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUcmFjZS5wcm90b3R5cGUsICdkaXNwbGF5U3RyaW5nJywge1xuICBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5leHByLnRvRGlzcGxheVN0cmluZygpOyB9XG59KTtcblxuVHJhY2UucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmNsb25lV2l0aEV4cHIodGhpcy5leHByKTtcbn07XG5cblRyYWNlLnByb3RvdHlwZS5jbG9uZVdpdGhFeHByID0gZnVuY3Rpb24oZXhwcikge1xuICB2YXIgYW5zID0gbmV3IFRyYWNlKFxuICAgICAgdGhpcy5pbnB1dFN0cmVhbSwgdGhpcy5wb3MsIGV4cHIsIHRoaXMuc3VjY2VlZGVkLCB0aGlzLmJpbmRpbmdzLCB0aGlzLmNoaWxkcmVuKTtcblxuICBhbnMuaXNIZWFkT2ZMZWZ0UmVjdXJzaW9uID0gdGhpcy5pc0hlYWRPZkxlZnRSZWN1cnNpb247XG4gIGFucy5pc0ltcGxpY2l0U3BhY2VzID0gdGhpcy5pc0ltcGxpY2l0U3BhY2VzO1xuICBhbnMuaXNNZW1vaXplZCA9IHRoaXMuaXNNZW1vaXplZDtcbiAgYW5zLmlzUm9vdE5vZGUgPSB0aGlzLmlzUm9vdE5vZGU7XG4gIGFucy50ZXJtaW5hdGVzTFIgPSB0aGlzLnRlcm1pbmF0ZXNMUjtcbiAgYW5zLnRlcm1pbmF0aW5nTFJFbnRyeSA9IHRoaXMudGVybWluYXRpbmdMUkVudHJ5O1xuICByZXR1cm4gYW5zO1xufTtcblxuLy8gUmVjb3JkIHRoZSB0cmFjZSBpbmZvcm1hdGlvbiBmb3IgdGhlIHRlcm1pbmF0aW5nIGNvbmRpdGlvbiBvZiB0aGUgTFIgbG9vcC5cblRyYWNlLnByb3RvdHlwZS5yZWNvcmRMUlRlcm1pbmF0aW9uID0gZnVuY3Rpb24ocnVsZUJvZHlUcmFjZSwgdmFsdWUpIHtcbiAgdGhpcy50ZXJtaW5hdGluZ0xSRW50cnkgPVxuICAgICAgbmV3IFRyYWNlKHRoaXMuaW5wdXRTdHJlYW0sIHRoaXMucG9zLCB0aGlzLmV4cHIsIGZhbHNlLCBbdmFsdWVdLCBbcnVsZUJvZHlUcmFjZV0pO1xuICB0aGlzLnRlcm1pbmF0aW5nTFJFbnRyeS50ZXJtaW5hdGVzTFIgPSB0cnVlO1xufTtcblxuLy8gUmVjdXJzaXZlbHkgdHJhdmVyc2UgdGhpcyB0cmFjZSBub2RlIGFuZCBhbGwgaXRzIGRlc2NlbmRlbnRzLCBjYWxsaW5nIGEgdmlzaXRvciBmdW5jdGlvblxuLy8gZm9yIGVhY2ggbm9kZSB0aGF0IGlzIHZpc2l0ZWQuIElmIGB2aXN0b3JPYmpPckZuYCBpcyBhbiBvYmplY3QsIHRoZW4gaXRzICdlbnRlcicgcHJvcGVydHlcbi8vIGlzIGEgZnVuY3Rpb24gdG8gY2FsbCBiZWZvcmUgdmlzaXRpbmcgdGhlIGNoaWxkcmVuIG9mIGEgbm9kZSwgYW5kIGl0cyAnZXhpdCcgcHJvcGVydHkgaXNcbi8vIGEgZnVuY3Rpb24gdG8gY2FsbCBhZnRlcndhcmRzLiBJZiBgdmlzaXRvck9iak9yRm5gIGlzIGEgZnVuY3Rpb24sIGl0IHJlcHJlc2VudHMgdGhlICdlbnRlcidcbi8vIGZ1bmN0aW9uLlxuLy9cbi8vIFRoZSBmdW5jdGlvbnMgYXJlIGNhbGxlZCB3aXRoIHRocmVlIGFyZ3VtZW50czogdGhlIFRyYWNlIG5vZGUsIGl0cyBwYXJlbnQgVHJhY2UsIGFuZCBhIG51bWJlclxuLy8gcmVwcmVzZW50aW5nIHRoZSBkZXB0aCBvZiB0aGUgbm9kZSBpbiB0aGUgdHJlZS4gKFRoZSByb290IG5vZGUgaGFzIGRlcHRoIDAuKSBgb3B0VGhpc0FyZ2AsIGlmXG4vLyBzcGVjaWZpZWQsIGlzIHRoZSB2YWx1ZSB0byB1c2UgZm9yIGB0aGlzYCB3aGVuIGV4ZWN1dGluZyB0aGUgdmlzaXRvciBmdW5jdGlvbnMuXG5UcmFjZS5wcm90b3R5cGUud2FsayA9IGZ1bmN0aW9uKHZpc2l0b3JPYmpPckZuLCBvcHRUaGlzQXJnKSB7XG4gIHZhciB2aXNpdG9yID0gdmlzaXRvck9iak9yRm47XG4gIGlmICh0eXBlb2YgdmlzaXRvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHZpc2l0b3IgPSB7ZW50ZXI6IHZpc2l0b3J9O1xuICB9XG5cbiAgZnVuY3Rpb24gX3dhbGsobm9kZSwgcGFyZW50LCBkZXB0aCkge1xuICAgIHZhciByZWN1cnNlID0gdHJ1ZTtcbiAgICBpZiAodmlzaXRvci5lbnRlcikge1xuICAgICAgaWYgKHZpc2l0b3IuZW50ZXIuY2FsbChvcHRUaGlzQXJnLCBub2RlLCBwYXJlbnQsIGRlcHRoKSA9PT0gVHJhY2UucHJvdG90eXBlLlNLSVApIHtcbiAgICAgICAgcmVjdXJzZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocmVjdXJzZSkge1xuICAgICAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgICAgIF93YWxrKGNoaWxkLCBub2RlLCBkZXB0aCArIDEpO1xuICAgICAgfSk7XG4gICAgICBpZiAodmlzaXRvci5leGl0KSB7XG4gICAgICAgIHZpc2l0b3IuZXhpdC5jYWxsKG9wdFRoaXNBcmcsIG5vZGUsIHBhcmVudCwgZGVwdGgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAodGhpcy5pc1Jvb3ROb2RlKSB7XG4gICAgLy8gRG9uJ3QgdmlzaXQgdGhlIHJvb3Qgbm9kZSBpdHNlbGYsIG9ubHkgaXRzIGNoaWxkcmVuLlxuICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbihjKSB7IF93YWxrKGMsIG51bGwsIDApOyB9KTtcbiAgfSBlbHNlIHtcbiAgICBfd2Fsayh0aGlzLCBudWxsLCAwKTtcbiAgfVxufTtcblxuLy8gUmV0dXJuIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB0cmFjZS5cbi8vIFNhbXBsZTpcbi8vICAgICAxMuKLhSvii4Uy4ouFKuKLhTMg4pyTIGV4cCDih5IgIFwiMTJcIlxuLy8gICAgIDEy4ouFK+KLhTLii4Uq4ouFMyAgIOKckyBhZGRFeHAgKExSKSDih5IgIFwiMTJcIlxuLy8gICAgIDEy4ouFK+KLhTLii4Uq4ouFMyAgICAgICDinJcgYWRkRXhwX3BsdXNcblRyYWNlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgc2IgPSBuZXcgY29tbW9uLlN0cmluZ0J1ZmZlcigpO1xuICB0aGlzLndhbGsoZnVuY3Rpb24obm9kZSwgcGFyZW50LCBkZXB0aCkge1xuICAgIGlmICghbm9kZSkge1xuICAgICAgcmV0dXJuIHRoaXMuU0tJUDtcbiAgICB9XG4gICAgdmFyIGN0b3JOYW1lID0gbm9kZS5leHByLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgLy8gRG9uJ3QgcHJpbnQgYW55dGhpbmcgZm9yIEFsdCBub2Rlcy5cbiAgICBpZiAoY3Rvck5hbWUgPT09ICdBbHQnKSB7XG4gICAgICByZXR1cm47ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gICAgfVxuICAgIHNiLmFwcGVuZChnZXRJbnB1dEV4Y2VycHQobm9kZS5pbnB1dFN0cmVhbSwgbm9kZS5wb3MsIDEwKSArIHNwYWNlcyhkZXB0aCAqIDIgKyAxKSk7XG4gICAgc2IuYXBwZW5kKChub2RlLnN1Y2NlZWRlZCA/IENIRUNLX01BUksgOiBCQUxMT1RfWCkgKyAnICcgKyBub2RlLmRpc3BsYXlTdHJpbmcpO1xuICAgIGlmIChub2RlLmlzSGVhZE9mTGVmdFJlY3Vyc2lvbikge1xuICAgICAgc2IuYXBwZW5kKCcgKExSKScpO1xuICAgIH1cbiAgICBpZiAobm9kZS5zdWNjZWVkZWQpIHtcbiAgICAgIHZhciBjb250ZW50cyA9IGFzRXNjYXBlZFN0cmluZyhub2RlLnNvdXJjZS5jb250ZW50cyk7XG4gICAgICBzYi5hcHBlbmQoJyAnICsgUklHSFRXQVJEU19ET1VCTEVfQVJST1cgKyAnICAnKTtcbiAgICAgIHNiLmFwcGVuZCh0eXBlb2YgY29udGVudHMgPT09ICdzdHJpbmcnID8gJ1wiJyArIGNvbnRlbnRzICsgJ1wiJyA6IGNvbnRlbnRzKTtcbiAgICB9XG4gICAgc2IuYXBwZW5kKCdcXG4nKTtcbiAgfS5iaW5kKHRoaXMpKTtcbiAgcmV0dXJuIHNiLmNvbnRlbnRzKCk7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubW9kdWxlLmV4cG9ydHMgPSBUcmFjZTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBleHRlbmQgPSByZXF1aXJlKCd1dGlsLWV4dGVuZCcpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUHJpdmF0ZSBTdHVmZlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gSGVscGVyc1xuXG52YXIgZXNjYXBlU3RyaW5nRm9yID0ge307XG5mb3IgKHZhciBjID0gMDsgYyA8IDEyODsgYysrKSB7XG4gIGVzY2FwZVN0cmluZ0ZvcltjXSA9IFN0cmluZy5mcm9tQ2hhckNvZGUoYyk7XG59XG5lc2NhcGVTdHJpbmdGb3JbXCInXCIuY2hhckNvZGVBdCgwKV0gPSBcIlxcXFwnXCI7XG5lc2NhcGVTdHJpbmdGb3JbJ1wiJy5jaGFyQ29kZUF0KDApXSA9ICdcXFxcXCInO1xuZXNjYXBlU3RyaW5nRm9yWydcXFxcJy5jaGFyQ29kZUF0KDApXSA9ICdcXFxcXFxcXCc7XG5lc2NhcGVTdHJpbmdGb3JbJ1xcYicuY2hhckNvZGVBdCgwKV0gPSAnXFxcXGInO1xuZXNjYXBlU3RyaW5nRm9yWydcXGYnLmNoYXJDb2RlQXQoMCldID0gJ1xcXFxmJztcbmVzY2FwZVN0cmluZ0ZvclsnXFxuJy5jaGFyQ29kZUF0KDApXSA9ICdcXFxcbic7XG5lc2NhcGVTdHJpbmdGb3JbJ1xccicuY2hhckNvZGVBdCgwKV0gPSAnXFxcXHInO1xuZXNjYXBlU3RyaW5nRm9yWydcXHQnLmNoYXJDb2RlQXQoMCldID0gJ1xcXFx0JztcbmVzY2FwZVN0cmluZ0ZvclsnXFx1MDAwYicuY2hhckNvZGVBdCgwKV0gPSAnXFxcXHYnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZXhwb3J0cy5hYnN0cmFjdCA9IGZ1bmN0aW9uKG9wdE1ldGhvZE5hbWUpIHtcbiAgdmFyIG1ldGhvZE5hbWUgPSBvcHRNZXRob2ROYW1lIHx8ICcnO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ3RoaXMgbWV0aG9kICcgKyBtZXRob2ROYW1lICsgJyBpcyBhYnN0cmFjdCEgJyArXG4gICAgICAnKGl0IGhhcyBubyBpbXBsZW1lbnRhdGlvbiBpbiBjbGFzcyAnICsgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lICsgJyknKTtcbiAgfTtcbn07XG5cbmV4cG9ydHMuYXNzZXJ0ID0gZnVuY3Rpb24oY29uZCwgbWVzc2FnZSkge1xuICBpZiAoIWNvbmQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIH1cbn07XG5cbi8vIERlZmluZSBhIGxhemlseS1jb21wdXRlZCwgbm9uLWVudW1lcmFibGUgcHJvcGVydHkgbmFtZWQgYHByb3BOYW1lYFxuLy8gb24gdGhlIG9iamVjdCBgb2JqYC4gYGdldHRlckZuYCB3aWxsIGJlIGNhbGxlZCB0byBjb21wdXRlIHRoZSB2YWx1ZSB0aGVcbi8vIGZpcnN0IHRpbWUgdGhlIHByb3BlcnR5IGlzIGFjY2Vzc2VkLlxuZXhwb3J0cy5kZWZpbmVMYXp5UHJvcGVydHkgPSBmdW5jdGlvbihvYmosIHByb3BOYW1lLCBnZXR0ZXJGbikge1xuICB2YXIgbWVtbztcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgcHJvcE5hbWUsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCFtZW1vKSB7XG4gICAgICAgIG1lbW8gPSBnZXR0ZXJGbi5jYWxsKHRoaXMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG1lbW87XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydHMuY2xvbmUgPSBmdW5jdGlvbihvYmopIHtcbiAgaWYgKG9iaikge1xuICAgIHJldHVybiBleHRlbmQoe30sIG9iaik7XG4gIH1cbiAgcmV0dXJuIG9iajtcbn07XG5cbmV4cG9ydHMuZXh0ZW5kID0gZXh0ZW5kO1xuXG5leHBvcnRzLnJlcGVhdEZuID0gZnVuY3Rpb24oZm4sIG4pIHtcbiAgdmFyIGFyciA9IFtdO1xuICB3aGlsZSAobi0tID4gMCkge1xuICAgIGFyci5wdXNoKGZuKCkpO1xuICB9XG4gIHJldHVybiBhcnI7XG59O1xuXG5leHBvcnRzLnJlcGVhdFN0ciA9IGZ1bmN0aW9uKHN0ciwgbikge1xuICByZXR1cm4gbmV3IEFycmF5KG4gKyAxKS5qb2luKHN0cik7XG59O1xuXG5leHBvcnRzLnJlcGVhdCA9IGZ1bmN0aW9uKHgsIG4pIHtcbiAgcmV0dXJuIGV4cG9ydHMucmVwZWF0Rm4oZnVuY3Rpb24oKSB7IHJldHVybiB4OyB9LCBuKTtcbn07XG5cbmV4cG9ydHMuZ2V0RHVwbGljYXRlcyA9IGZ1bmN0aW9uKGFycmF5KSB7XG4gIHZhciBkdXBsaWNhdGVzID0gW107XG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IGFycmF5Lmxlbmd0aDsgaWR4KyspIHtcbiAgICB2YXIgeCA9IGFycmF5W2lkeF07XG4gICAgaWYgKGFycmF5Lmxhc3RJbmRleE9mKHgpICE9PSBpZHggJiYgZHVwbGljYXRlcy5pbmRleE9mKHgpIDwgMCkge1xuICAgICAgZHVwbGljYXRlcy5wdXNoKHgpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZHVwbGljYXRlcztcbn07XG5cbmV4cG9ydHMuY29weVdpdGhvdXREdXBsaWNhdGVzID0gZnVuY3Rpb24oYXJyYXkpIHtcbiAgdmFyIG5vRHVwbGljYXRlcyA9IFtdO1xuICBhcnJheS5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgaWYgKG5vRHVwbGljYXRlcy5pbmRleE9mKGVudHJ5KSA8IDApIHtcbiAgICAgIG5vRHVwbGljYXRlcy5wdXNoKGVudHJ5KTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gbm9EdXBsaWNhdGVzO1xufTtcblxuZXhwb3J0cy5pc1N5bnRhY3RpYyA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIHZhciBmaXJzdENoYXIgPSBydWxlTmFtZVswXTtcbiAgcmV0dXJuIGZpcnN0Q2hhciA9PT0gZmlyc3RDaGFyLnRvVXBwZXJDYXNlKCk7XG59O1xuXG5leHBvcnRzLmlzTGV4aWNhbCA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIHJldHVybiAhZXhwb3J0cy5pc1N5bnRhY3RpYyhydWxlTmFtZSk7XG59O1xuXG5leHBvcnRzLnBhZExlZnQgPSBmdW5jdGlvbihzdHIsIGxlbiwgb3B0Q2hhcikge1xuICB2YXIgY2ggPSBvcHRDaGFyIHx8ICcgJztcbiAgaWYgKHN0ci5sZW5ndGggPCBsZW4pIHtcbiAgICByZXR1cm4gZXhwb3J0cy5yZXBlYXRTdHIoY2gsIGxlbiAtIHN0ci5sZW5ndGgpICsgc3RyO1xuICB9XG4gIHJldHVybiBzdHI7XG59O1xuXG4vLyBTdHJpbmdCdWZmZXJcblxuZXhwb3J0cy5TdHJpbmdCdWZmZXIgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5zdHJpbmdzID0gW107XG59O1xuXG5leHBvcnRzLlN0cmluZ0J1ZmZlci5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24oc3RyKSB7XG4gIHRoaXMuc3RyaW5ncy5wdXNoKHN0cik7XG59O1xuXG5leHBvcnRzLlN0cmluZ0J1ZmZlci5wcm90b3R5cGUuY29udGVudHMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuc3RyaW5ncy5qb2luKCcnKTtcbn07XG5cbi8vIENoYXJhY3RlciBlc2NhcGluZyBhbmQgdW5lc2NhcGluZ1xuXG5leHBvcnRzLmVzY2FwZUNoYXIgPSBmdW5jdGlvbihjLCBvcHREZWxpbSkge1xuICB2YXIgY2hhckNvZGUgPSBjLmNoYXJDb2RlQXQoMCk7XG4gIGlmICgoYyA9PT0gJ1wiJyB8fCBjID09PSBcIidcIikgJiYgb3B0RGVsaW0gJiYgYyAhPT0gb3B0RGVsaW0pIHtcbiAgICByZXR1cm4gYztcbiAgfSBlbHNlIGlmIChjaGFyQ29kZSA8IDEyOCkge1xuICAgIHJldHVybiBlc2NhcGVTdHJpbmdGb3JbY2hhckNvZGVdO1xuICB9IGVsc2UgaWYgKDEyOCA8PSBjaGFyQ29kZSAmJiBjaGFyQ29kZSA8IDI1Nikge1xuICAgIHJldHVybiAnXFxcXHgnICsgZXhwb3J0cy5wYWRMZWZ0KGNoYXJDb2RlLnRvU3RyaW5nKDE2KSwgMiwgJzAnKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJ1xcXFx1JyArIGV4cG9ydHMucGFkTGVmdChjaGFyQ29kZS50b1N0cmluZygxNiksIDQsICcwJyk7XG4gIH1cbn07XG5cbmV4cG9ydHMudW5lc2NhcGVDaGFyID0gZnVuY3Rpb24ocykge1xuICBpZiAocy5jaGFyQXQoMCkgPT09ICdcXFxcJykge1xuICAgIHN3aXRjaCAocy5jaGFyQXQoMSkpIHtcbiAgICAgIGNhc2UgJ2InOiByZXR1cm4gJ1xcYic7XG4gICAgICBjYXNlICdmJzogcmV0dXJuICdcXGYnO1xuICAgICAgY2FzZSAnbic6IHJldHVybiAnXFxuJztcbiAgICAgIGNhc2UgJ3InOiByZXR1cm4gJ1xccic7XG4gICAgICBjYXNlICd0JzogcmV0dXJuICdcXHQnO1xuICAgICAgY2FzZSAndic6IHJldHVybiAnXFx2JztcbiAgICAgIGNhc2UgJ3gnOiByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShwYXJzZUludChzLnN1YnN0cmluZygyLCA0KSwgMTYpKTtcbiAgICAgIGNhc2UgJ3UnOiByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShwYXJzZUludChzLnN1YnN0cmluZygyLCA2KSwgMTYpKTtcbiAgICAgIGRlZmF1bHQ6IHJldHVybiBzLmNoYXJBdCgxKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHM7XG4gIH1cbn07XG5cbi8vIEhlbHBlciBmb3IgcHJvZHVjaW5nIGEgZGVzY3JpcHRpb24gb2YgYW4gdW5rbm93biBvYmplY3QgaW4gYSBzYWZlIHdheS5cbi8vIEVzcGVjaWFsbHkgdXNlZnVsIGZvciBlcnJvciBtZXNzYWdlcyB3aGVyZSBhbiB1bmV4cGVjdGVkIHR5cGUgb2Ygb2JqZWN0IHdhcyBlbmNvdW50ZXJlZC5cbmV4cG9ydHMudW5leHBlY3RlZE9ialRvU3RyaW5nID0gZnVuY3Rpb24ob2JqKSB7XG4gIGlmIChvYmogPT0gbnVsbCkge1xuICAgIHJldHVybiBTdHJpbmcob2JqKTtcbiAgfVxuICB2YXIgYmFzZVRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaik7XG4gIHRyeSB7XG4gICAgdmFyIHR5cGVOYW1lO1xuICAgIGlmIChvYmouY29uc3RydWN0b3IgJiYgb2JqLmNvbnN0cnVjdG9yLm5hbWUpIHtcbiAgICAgIHR5cGVOYW1lID0gb2JqLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgfSBlbHNlIGlmIChiYXNlVG9TdHJpbmcuaW5kZXhPZignW29iamVjdCAnKSA9PT0gMCkge1xuICAgICAgdHlwZU5hbWUgPSBiYXNlVG9TdHJpbmcuc2xpY2UoOCwgLTEpOyAgLy8gRXh0cmFjdCBlLmcuIFwiQXJyYXlcIiBmcm9tIFwiW29iamVjdCBBcnJheV1cIi5cbiAgICB9IGVsc2Uge1xuICAgICAgdHlwZU5hbWUgPSB0eXBlb2Ygb2JqO1xuICAgIH1cbiAgICByZXR1cm4gdHlwZU5hbWUgKyAnOiAnICsgSlNPTi5zdHJpbmdpZnkoU3RyaW5nKG9iaikpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGJhc2VUb1N0cmluZztcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBOYW1lc3BhY2UgPSByZXF1aXJlKCcuL05hbWVzcGFjZScpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUHJpdmF0ZSBzdHVmZlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gY3JlYXRlRXJyb3IobWVzc2FnZSwgb3B0SW50ZXJ2YWwpIHtcbiAgdmFyIGU7XG4gIGlmIChvcHRJbnRlcnZhbCkge1xuICAgIGUgPSBuZXcgRXJyb3Iob3B0SW50ZXJ2YWwuZ2V0TGluZUFuZENvbHVtbk1lc3NhZ2UoKSArIG1lc3NhZ2UpO1xuICAgIGUuc2hvcnRNZXNzYWdlID0gbWVzc2FnZTtcbiAgICBlLmludGVydmFsID0gb3B0SW50ZXJ2YWw7XG4gIH0gZWxzZSB7XG4gICAgZSA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgfVxuICByZXR1cm4gZTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0gZXJyb3JzIGFib3V0IGludGVydmFscyAtLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBpbnRlcnZhbFNvdXJjZXNEb250TWF0Y2goKSB7XG4gIHJldHVybiBjcmVhdGVFcnJvcihcIkludGVydmFsIHNvdXJjZXMgZG9uJ3QgbWF0Y2hcIik7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tIGVycm9ycyBhYm91dCBncmFtbWFycyAtLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyBHcmFtbWFyIHN5bnRheCBlcnJvclxuXG5mdW5jdGlvbiBncmFtbWFyU3ludGF4RXJyb3IobWF0Y2hGYWlsdXJlKSB7XG4gIHZhciBlID0gbmV3IEVycm9yKCk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCAnbWVzc2FnZScsIHtnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbWF0Y2hGYWlsdXJlLm1lc3NhZ2U7IH19KTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsICdzaG9ydE1lc3NhZ2UnLCB7Z2V0OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gJ0V4cGVjdGVkICcgKyBtYXRjaEZhaWx1cmUuZ2V0RXhwZWN0ZWRUZXh0KCk7XG4gIH19KTtcbiAgZS5pbnRlcnZhbCA9IG1hdGNoRmFpbHVyZS5nZXRJbnRlcnZhbCgpO1xuICByZXR1cm4gZTtcbn1cblxuLy8gVW5kZWNsYXJlZCBncmFtbWFyXG5cbmZ1bmN0aW9uIHVuZGVjbGFyZWRHcmFtbWFyKGdyYW1tYXJOYW1lLCBuYW1lc3BhY2UsIGludGVydmFsKSB7XG4gIHZhciBtZXNzYWdlID0gbmFtZXNwYWNlID9cbiAgICAgICdHcmFtbWFyICcgKyBncmFtbWFyTmFtZSArICcgaXMgbm90IGRlY2xhcmVkIGluIG5hbWVzcGFjZSAnICsgTmFtZXNwYWNlLnRvU3RyaW5nKG5hbWVzcGFjZSkgOlxuICAgICAgJ1VuZGVjbGFyZWQgZ3JhbW1hciAnICsgZ3JhbW1hck5hbWU7XG4gIHJldHVybiBjcmVhdGVFcnJvcihtZXNzYWdlLCBpbnRlcnZhbCk7XG59XG5cbi8vIER1cGxpY2F0ZSBncmFtbWFyIGRlY2xhcmF0aW9uXG5cbmZ1bmN0aW9uIGR1cGxpY2F0ZUdyYW1tYXJEZWNsYXJhdGlvbihncmFtbWFyLCBuYW1lc3BhY2UpIHtcbiAgcmV0dXJuIGNyZWF0ZUVycm9yKCdHcmFtbWFyICcgKyBncmFtbWFyLm5hbWUgKyAnIGlzIGFscmVhZHkgZGVjbGFyZWQgaW4gdGhpcyBuYW1lc3BhY2UnKTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0gcnVsZXMgLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gVW5kZWNsYXJlZCBydWxlXG5cbmZ1bmN0aW9uIHVuZGVjbGFyZWRSdWxlKHJ1bGVOYW1lLCBncmFtbWFyTmFtZSwgb3B0SW50ZXJ2YWwpIHtcbiAgcmV0dXJuIGNyZWF0ZUVycm9yKFxuICAgICAgJ1J1bGUgJyArIHJ1bGVOYW1lICsgJyBpcyBub3QgZGVjbGFyZWQgaW4gZ3JhbW1hciAnICsgZ3JhbW1hck5hbWUsXG4gICAgICBvcHRJbnRlcnZhbCk7XG59XG5cbi8vIENhbm5vdCBvdmVycmlkZSB1bmRlY2xhcmVkIHJ1bGVcblxuZnVuY3Rpb24gY2Fubm90T3ZlcnJpZGVVbmRlY2xhcmVkUnVsZShydWxlTmFtZSwgZ3JhbW1hck5hbWUsIG9wdFNvdXJjZSkge1xuICByZXR1cm4gY3JlYXRlRXJyb3IoXG4gICAgICAnQ2Fubm90IG92ZXJyaWRlIHJ1bGUgJyArIHJ1bGVOYW1lICsgJyBiZWNhdXNlIGl0IGlzIG5vdCBkZWNsYXJlZCBpbiAnICsgZ3JhbW1hck5hbWUsXG4gICAgICBvcHRTb3VyY2UpO1xufVxuXG4vLyBDYW5ub3QgZXh0ZW5kIHVuZGVjbGFyZWQgcnVsZVxuXG5mdW5jdGlvbiBjYW5ub3RFeHRlbmRVbmRlY2xhcmVkUnVsZShydWxlTmFtZSwgZ3JhbW1hck5hbWUsIG9wdFNvdXJjZSkge1xuICByZXR1cm4gY3JlYXRlRXJyb3IoXG4gICAgICAnQ2Fubm90IGV4dGVuZCBydWxlICcgKyBydWxlTmFtZSArICcgYmVjYXVzZSBpdCBpcyBub3QgZGVjbGFyZWQgaW4gJyArIGdyYW1tYXJOYW1lLFxuICAgICAgb3B0U291cmNlKTtcbn1cblxuLy8gRHVwbGljYXRlIHJ1bGUgZGVjbGFyYXRpb25cblxuZnVuY3Rpb24gZHVwbGljYXRlUnVsZURlY2xhcmF0aW9uKHJ1bGVOYW1lLCBncmFtbWFyTmFtZSwgZGVjbEdyYW1tYXJOYW1lLCBib2R5LCBvcHRTb3VyY2UpIHtcbiAgdmFyIG1lc3NhZ2UgPSBcIkR1cGxpY2F0ZSBkZWNsYXJhdGlvbiBmb3IgcnVsZSAnXCIgKyBydWxlTmFtZSArXG4gICAgICBcIicgaW4gZ3JhbW1hciAnXCIgKyBncmFtbWFyTmFtZSArIFwiJ1wiO1xuICBpZiAoZ3JhbW1hck5hbWUgIT09IGRlY2xHcmFtbWFyTmFtZSkge1xuICAgIG1lc3NhZ2UgKz0gXCIgKG9yaWdpbmFsbHkgZGVjbGFyZWQgaW4gJ1wiICsgZGVjbEdyYW1tYXJOYW1lICsgXCInKVwiO1xuICB9XG4gIHJldHVybiBjcmVhdGVFcnJvcihtZXNzYWdlLCBvcHRTb3VyY2UpO1xufVxuXG4vLyBXcm9uZyBudW1iZXIgb2YgcGFyYW1ldGVyc1xuXG5mdW5jdGlvbiB3cm9uZ051bWJlck9mUGFyYW1ldGVycyhydWxlTmFtZSwgZXhwZWN0ZWQsIGFjdHVhbCwgYm9keSwgc291cmNlKSB7XG4gIHJldHVybiBjcmVhdGVFcnJvcihcbiAgICAgICdXcm9uZyBudW1iZXIgb2YgcGFyYW1ldGVycyBmb3IgcnVsZSAnICsgcnVsZU5hbWUgK1xuICAgICAgICAgICcgKGV4cGVjdGVkICcgKyBleHBlY3RlZCArICcsIGdvdCAnICsgYWN0dWFsICsgJyknLFxuICAgICAgc291cmNlKTtcbn1cblxuLy8gV3JvbmcgbnVtYmVyIG9mIGFyZ3VtZW50c1xuXG5mdW5jdGlvbiB3cm9uZ051bWJlck9mQXJndW1lbnRzKHJ1bGVOYW1lLCBleHBlY3RlZCwgYWN0dWFsLCBleHByKSB7XG4gIHJldHVybiBjcmVhdGVFcnJvcihcbiAgICAgICdXcm9uZyBudW1iZXIgb2YgYXJndW1lbnRzIGZvciBydWxlICcgKyBydWxlTmFtZSArXG4gICAgICAgICAgJyAoZXhwZWN0ZWQgJyArIGV4cGVjdGVkICsgJywgZ290ICcgKyBhY3R1YWwgKyAnKScsXG4gICAgICBleHByLnNvdXJjZSk7XG59XG5cbi8vIER1cGxpY2F0ZSBwYXJhbWV0ZXIgbmFtZXNcblxuZnVuY3Rpb24gZHVwbGljYXRlUGFyYW1ldGVyTmFtZXMocnVsZU5hbWUsIGR1cGxpY2F0ZXMsIGJvZHksIHNvdXJjZSkge1xuICByZXR1cm4gY3JlYXRlRXJyb3IoXG4gICAgICAnRHVwbGljYXRlIHBhcmFtZXRlciBuYW1lcyBpbiBydWxlICcgKyBydWxlTmFtZSArICc6ICcgKyBkdXBsaWNhdGVzLmpvaW4oJywnKSxcbiAgICAgIHNvdXJjZSk7XG59XG5cbi8vIEludmFsaWQgcGFyYW1ldGVyIGV4cHJlc3Npb25cblxuZnVuY3Rpb24gaW52YWxpZFBhcmFtZXRlcihydWxlTmFtZSwgZXhwcikge1xuICByZXR1cm4gY3JlYXRlRXJyb3IoXG4gICAgICAnSW52YWxpZCBwYXJhbWV0ZXIgdG8gcnVsZSAnICsgcnVsZU5hbWUgKyAnOiAnICsgZXhwciArICcgaGFzIGFyaXR5ICcgKyBleHByLmdldEFyaXR5KCkgK1xuICAgICAgICAgJywgYnV0IHBhcmFtZXRlciBleHByZXNzaW9ucyBtdXN0IGhhdmUgYXJpdHkgMScsXG4gICAgICBleHByLnNvdXJjZSk7XG59XG5cbi8vIEFwcGxpY2F0aW9uIG9mIHN5bnRhY3RpYyBydWxlIGZyb20gbGV4aWNhbCBydWxlXG5cbmZ1bmN0aW9uIGFwcGxpY2F0aW9uT2ZTeW50YWN0aWNSdWxlRnJvbUxleGljYWxDb250ZXh0KHJ1bGVOYW1lLCBhcHBseUV4cHIpIHtcbiAgcmV0dXJuIGNyZWF0ZUVycm9yKFxuICAgICAgJ0Nhbm5vdCBhcHBseSBzeW50YWN0aWMgcnVsZSAnICsgcnVsZU5hbWUgKyAnIGZyb20gaGVyZSAoaW5zaWRlIGEgbGV4aWNhbCBjb250ZXh0KScsXG4gICAgICBhcHBseUV4cHIuc291cmNlKTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0gS2xlZW5lIG9wZXJhdG9ycyAtLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBrbGVlbmVFeHBySGFzTnVsbGFibGVPcGVyYW5kKGtsZWVuZUV4cHIpIHtcbiAgcmV0dXJuIGNyZWF0ZUVycm9yKFxuICAgICAgJ051bGxhYmxlIGV4cHJlc3Npb24gJyArIGtsZWVuZUV4cHIuZXhwci5zb3VyY2UuY29udGVudHMgKyBcIiBpcyBub3QgYWxsb3dlZCBpbnNpZGUgJ1wiICtcbiAgICAgICAgICBrbGVlbmVFeHByLm9wZXJhdG9yICsgXCInIChwb3NzaWJsZSBpbmZpbml0ZSBsb29wKVwiLFxuICAgICAga2xlZW5lRXhwci5leHByLnNvdXJjZSk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tIGFyaXR5IC0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIGluY29uc2lzdGVudEFyaXR5KHJ1bGVOYW1lLCBleHBlY3RlZCwgYWN0dWFsLCBleHByKSB7XG4gIHJldHVybiBjcmVhdGVFcnJvcihcbiAgICAgICdSdWxlICcgKyBydWxlTmFtZSArICcgaW52b2x2ZXMgYW4gYWx0ZXJuYXRpb24gd2hpY2ggaGFzIGluY29uc2lzdGVudCBhcml0eSAnICtcbiAgICAgICAgICAnKGV4cGVjdGVkICcgKyBleHBlY3RlZCArICcsIGdvdCAnICsgYWN0dWFsICsgJyknLFxuICAgICAgZXhwci5zb3VyY2UpO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLSBwcm9wZXJ0aWVzIC0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIGR1cGxpY2F0ZVByb3BlcnR5TmFtZXMoZHVwbGljYXRlcykge1xuICByZXR1cm4gY3JlYXRlRXJyb3IoJ09iamVjdCBwYXR0ZXJuIGhhcyBkdXBsaWNhdGUgcHJvcGVydHkgbmFtZXM6ICcgKyBkdXBsaWNhdGVzLmpvaW4oJywgJykpO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLSBjb25zdHJ1Y3RvcnMgLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gaW52YWxpZENvbnN0cnVjdG9yQ2FsbChncmFtbWFyLCBjdG9yTmFtZSwgY2hpbGRyZW4pIHtcbiAgcmV0dXJuIGNyZWF0ZUVycm9yKFxuICAgICAgJ0F0dGVtcHQgdG8gaW52b2tlIGNvbnN0cnVjdG9yICcgKyBjdG9yTmFtZSArICcgd2l0aCBpbnZhbGlkIG9yIHVuZXhwZWN0ZWQgYXJndW1lbnRzJyk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tIGNvbnZlbmllbmNlIC0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIG11bHRpcGxlRXJyb3JzKGVycm9ycykge1xuICB2YXIgbWVzc2FnZXMgPSBlcnJvcnMubWFwKGZ1bmN0aW9uKGUpIHsgcmV0dXJuIGUubWVzc2FnZTsgfSk7XG4gIHJldHVybiBjcmVhdGVFcnJvcihcbiAgICAgIFsnRXJyb3JzOiddLmNvbmNhdChtZXNzYWdlcykuam9pbignXFxuLSAnKSxcbiAgICAgIGVycm9yc1swXS5pbnRlcnZhbCk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYXBwbGljYXRpb25PZlN5bnRhY3RpY1J1bGVGcm9tTGV4aWNhbENvbnRleHQ6IGFwcGxpY2F0aW9uT2ZTeW50YWN0aWNSdWxlRnJvbUxleGljYWxDb250ZXh0LFxuICBjYW5ub3RFeHRlbmRVbmRlY2xhcmVkUnVsZTogY2Fubm90RXh0ZW5kVW5kZWNsYXJlZFJ1bGUsXG4gIGNhbm5vdE92ZXJyaWRlVW5kZWNsYXJlZFJ1bGU6IGNhbm5vdE92ZXJyaWRlVW5kZWNsYXJlZFJ1bGUsXG4gIGR1cGxpY2F0ZUdyYW1tYXJEZWNsYXJhdGlvbjogZHVwbGljYXRlR3JhbW1hckRlY2xhcmF0aW9uLFxuICBkdXBsaWNhdGVQYXJhbWV0ZXJOYW1lczogZHVwbGljYXRlUGFyYW1ldGVyTmFtZXMsXG4gIGR1cGxpY2F0ZVByb3BlcnR5TmFtZXM6IGR1cGxpY2F0ZVByb3BlcnR5TmFtZXMsXG4gIGR1cGxpY2F0ZVJ1bGVEZWNsYXJhdGlvbjogZHVwbGljYXRlUnVsZURlY2xhcmF0aW9uLFxuICBpbmNvbnNpc3RlbnRBcml0eTogaW5jb25zaXN0ZW50QXJpdHksXG4gIGludGVydmFsU291cmNlc0RvbnRNYXRjaDogaW50ZXJ2YWxTb3VyY2VzRG9udE1hdGNoLFxuICBpbnZhbGlkQ29uc3RydWN0b3JDYWxsOiBpbnZhbGlkQ29uc3RydWN0b3JDYWxsLFxuICBpbnZhbGlkUGFyYW1ldGVyOiBpbnZhbGlkUGFyYW1ldGVyLFxuICBncmFtbWFyU3ludGF4RXJyb3I6IGdyYW1tYXJTeW50YXhFcnJvcixcbiAga2xlZW5lRXhwckhhc051bGxhYmxlT3BlcmFuZDoga2xlZW5lRXhwckhhc051bGxhYmxlT3BlcmFuZCxcbiAgdW5kZWNsYXJlZEdyYW1tYXI6IHVuZGVjbGFyZWRHcmFtbWFyLFxuICB1bmRlY2xhcmVkUnVsZTogdW5kZWNsYXJlZFJ1bGUsXG4gIHdyb25nTnVtYmVyT2ZBcmd1bWVudHM6IHdyb25nTnVtYmVyT2ZBcmd1bWVudHMsXG4gIHdyb25nTnVtYmVyT2ZQYXJhbWV0ZXJzOiB3cm9uZ051bWJlck9mUGFyYW1ldGVycyxcblxuICB0aHJvd0Vycm9yczogZnVuY3Rpb24oZXJyb3JzKSB7XG4gICAgaWYgKGVycm9ycy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHRocm93IGVycm9yc1swXTtcbiAgICB9XG4gICAgaWYgKGVycm9ycy5sZW5ndGggPiAxKSB7XG4gICAgICB0aHJvdyBtdWx0aXBsZUVycm9ycyhlcnJvcnMpO1xuICAgIH1cbiAgfVxufTtcbiIsIi8qIGdsb2JhbCBkb2N1bWVudCwgWE1MSHR0cFJlcXVlc3QgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIEJ1aWxkZXIgPSByZXF1aXJlKCcuL0J1aWxkZXInKTtcbnZhciBHcmFtbWFyID0gcmVxdWlyZSgnLi9HcmFtbWFyJyk7XG52YXIgTmFtZXNwYWNlID0gcmVxdWlyZSgnLi9OYW1lc3BhY2UnKTtcbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbicpO1xudmFyIGVycm9ycyA9IHJlcXVpcmUoJy4vZXJyb3JzJyk7XG52YXIgcGV4cHJzID0gcmVxdWlyZSgnLi9wZXhwcnMnKTtcbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyk7XG5cbnZhciBpc0J1ZmZlciA9IHJlcXVpcmUoJ2lzLWJ1ZmZlcicpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUHJpdmF0ZSBzdHVmZlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gVGhlIG1ldGFncmFtbWFyLCBpLmUuIHRoZSBncmFtbWFyIGZvciBPaG0gZ3JhbW1hcnMuIEluaXRpYWxpemVkIGF0IHRoZVxuLy8gYm90dG9tIG9mIHRoaXMgZmlsZSBiZWNhdXNlIGxvYWRpbmcgdGhlIGdyYW1tYXIgcmVxdWlyZXMgT2htIGl0c2VsZi5cbnZhciBvaG1HcmFtbWFyO1xuXG4vLyBBbiBvYmplY3Qgd2hpY2ggbWFrZXMgaXQgcG9zc2libGUgdG8gc3R1YiBvdXQgdGhlIGRvY3VtZW50IEFQSSBmb3IgdGVzdGluZy5cbnZhciBkb2N1bWVudEludGVyZmFjZSA9IHtcbiAgcXVlcnlTZWxlY3RvcjogZnVuY3Rpb24oc2VsKSB7IHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbCk7IH0sXG4gIHF1ZXJ5U2VsZWN0b3JBbGw6IGZ1bmN0aW9uKHNlbCkgeyByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWwpOyB9XG59O1xuXG4vLyBDaGVjayBpZiBgb2JqYCBpcyBhIERPTSBlbGVtZW50LlxuZnVuY3Rpb24gaXNFbGVtZW50KG9iaikge1xuICByZXR1cm4gISEob2JqICYmIG9iai5ub2RlVHlwZSA9PT0gMSk7XG59XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKG9iaikge1xuICByZXR1cm4gb2JqID09PSB2b2lkIDA7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXZvaWRcbn1cblxudmFyIE1BWF9BUlJBWV9JTkRFWCA9IE1hdGgucG93KDIsIDUzKSAtIDE7XG5cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKG9iaikge1xuICBpZiAob2JqID09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGxlbmd0aCA9IG9iai5sZW5ndGg7XG4gIHJldHVybiB0eXBlb2YgbGVuZ3RoID09PSAnbnVtYmVyJyAmJiBsZW5ndGggPj0gMCAmJiBsZW5ndGggPD0gTUFYX0FSUkFZX0lOREVYO1xufVxuXG4vLyBUT0RPOiBqdXN0IHVzZSB0aGUgalF1ZXJ5IHRoaW5nXG5mdW5jdGlvbiBsb2FkKHVybCkge1xuICB2YXIgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gIHJlcS5vcGVuKCdHRVQnLCB1cmwsIGZhbHNlKTtcbiAgdHJ5IHtcbiAgICByZXEuc2VuZCgpO1xuICAgIGlmIChyZXEuc3RhdHVzID09PSAwIHx8IHJlcS5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgcmV0dXJuIHJlcS5yZXNwb25zZVRleHQ7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7fVxuICB0aHJvdyBuZXcgRXJyb3IoJ3VuYWJsZSB0byBsb2FkIHVybCAnICsgdXJsKTtcbn1cblxuLy8gUmV0dXJucyBhIEdyYW1tYXIgaW5zdGFuY2UgKGkuZS4sIGFuIG9iamVjdCB3aXRoIGEgYG1hdGNoYCBtZXRob2QpIGZvclxuLy8gYHRyZWVgLCB3aGljaCBpcyB0aGUgY29uY3JldGUgc3ludGF4IHRyZWUgb2YgYSB1c2VyLXdyaXR0ZW4gZ3JhbW1hci5cbi8vIFRoZSBncmFtbWFyIHdpbGwgYmUgYXNzaWduZWQgaW50byBgbmFtZXNwYWNlYCB1bmRlciB0aGUgbmFtZSBvZiB0aGUgZ3JhbW1hclxuLy8gYXMgc3BlY2lmaWVkIGluIHRoZSBzb3VyY2UuXG5mdW5jdGlvbiBidWlsZEdyYW1tYXIobWF0Y2gsIG5hbWVzcGFjZSwgb3B0T2htR3JhbW1hckZvclRlc3RpbmcpIHtcbiAgdmFyIGJ1aWxkZXIgPSBuZXcgQnVpbGRlcigpO1xuICB2YXIgZGVjbDtcbiAgdmFyIGN1cnJlbnRSdWxlTmFtZTtcbiAgdmFyIGN1cnJlbnRSdWxlRm9ybWFscztcbiAgdmFyIG92ZXJyaWRpbmcgPSBmYWxzZTtcbiAgdmFyIG1ldGFHcmFtbWFyID0gb3B0T2htR3JhbW1hckZvclRlc3RpbmcgfHwgb2htR3JhbW1hcjtcblxuICAvLyBBIHZpc2l0b3IgdGhhdCBwcm9kdWNlcyBhIEdyYW1tYXIgaW5zdGFuY2UgZnJvbSB0aGUgQ1NULlxuICB2YXIgaGVscGVycyA9IG1ldGFHcmFtbWFyLmNyZWF0ZVNlbWFudGljcygpLmFkZE9wZXJhdGlvbigndmlzaXQnLCB7XG4gICAgR3JhbW1hcjogZnVuY3Rpb24obiwgcywgb3BlbiwgcnMsIGNsb3NlKSB7XG4gICAgICB2YXIgZ3JhbW1hck5hbWUgPSBuLnZpc2l0KCk7XG4gICAgICBkZWNsID0gYnVpbGRlci5uZXdHcmFtbWFyKGdyYW1tYXJOYW1lLCBuYW1lc3BhY2UpO1xuICAgICAgcy52aXNpdCgpO1xuICAgICAgcnMudmlzaXQoKTtcbiAgICAgIHZhciBnID0gZGVjbC5idWlsZCgpO1xuICAgICAgZy5zb3VyY2UgPSB0aGlzLnNvdXJjZS50cmltbWVkKCk7XG4gICAgICBpZiAoZ3JhbW1hck5hbWUgaW4gbmFtZXNwYWNlKSB7XG4gICAgICAgIHRocm93IGVycm9ycy5kdXBsaWNhdGVHcmFtbWFyRGVjbGFyYXRpb24oZywgbmFtZXNwYWNlKTtcbiAgICAgIH1cbiAgICAgIG5hbWVzcGFjZVtncmFtbWFyTmFtZV0gPSBnO1xuICAgICAgcmV0dXJuIGc7XG4gICAgfSxcblxuICAgIFN1cGVyR3JhbW1hcjogZnVuY3Rpb24oXywgbikge1xuICAgICAgdmFyIHN1cGVyR3JhbW1hck5hbWUgPSBuLnZpc2l0KCk7XG4gICAgICBpZiAoc3VwZXJHcmFtbWFyTmFtZSA9PT0gJ251bGwnKSB7XG4gICAgICAgIGRlY2wud2l0aFN1cGVyR3JhbW1hcihudWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghbmFtZXNwYWNlIHx8ICEoc3VwZXJHcmFtbWFyTmFtZSBpbiBuYW1lc3BhY2UpKSB7XG4gICAgICAgICAgdGhyb3cgZXJyb3JzLnVuZGVjbGFyZWRHcmFtbWFyKHN1cGVyR3JhbW1hck5hbWUsIG5hbWVzcGFjZSwgbi5zb3VyY2UpO1xuICAgICAgICB9XG4gICAgICAgIGRlY2wud2l0aFN1cGVyR3JhbW1hcihuYW1lc3BhY2Vbc3VwZXJHcmFtbWFyTmFtZV0pO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBSdWxlX2RlZmluZTogZnVuY3Rpb24obiwgZnMsIGQsIF8sIGIpIHtcbiAgICAgIGN1cnJlbnRSdWxlTmFtZSA9IG4udmlzaXQoKTtcbiAgICAgIGN1cnJlbnRSdWxlRm9ybWFscyA9IGZzLnZpc2l0KClbMF0gfHwgW107XG4gICAgICAvLyBJZiB0aGVyZSBpcyBubyBkZWZhdWx0IHN0YXJ0IHJ1bGUgeWV0LCBzZXQgaXQgbm93LiBUaGlzIG11c3QgYmUgZG9uZSBiZWZvcmUgdmlzaXRpbmdcbiAgICAgIC8vIHRoZSBib2R5LCBiZWNhdXNlIGl0IG1pZ2h0IGNvbnRhaW4gYW4gaW5saW5lIHJ1bGUgZGVmaW5pdGlvbi5cbiAgICAgIGlmICghZGVjbC5kZWZhdWx0U3RhcnRSdWxlICYmIGRlY2wuZW5zdXJlU3VwZXJHcmFtbWFyKCkgIT09IEdyYW1tYXIuUHJvdG9CdWlsdEluUnVsZXMpIHtcbiAgICAgICAgZGVjbC53aXRoRGVmYXVsdFN0YXJ0UnVsZShjdXJyZW50UnVsZU5hbWUpO1xuICAgICAgfVxuICAgICAgdmFyIGJvZHkgPSBiLnZpc2l0KCk7XG4gICAgICB2YXIgZGVzY3JpcHRpb24gPSBkLnZpc2l0KClbMF07XG4gICAgICB2YXIgc291cmNlID0gdGhpcy5zb3VyY2UudHJpbW1lZCgpO1xuICAgICAgcmV0dXJuIGRlY2wuZGVmaW5lKGN1cnJlbnRSdWxlTmFtZSwgY3VycmVudFJ1bGVGb3JtYWxzLCBib2R5LCBkZXNjcmlwdGlvbiwgc291cmNlKTtcbiAgICB9LFxuICAgIFJ1bGVfb3ZlcnJpZGU6IGZ1bmN0aW9uKG4sIGZzLCBfLCBiKSB7XG4gICAgICBjdXJyZW50UnVsZU5hbWUgPSBuLnZpc2l0KCk7XG4gICAgICBjdXJyZW50UnVsZUZvcm1hbHMgPSBmcy52aXNpdCgpWzBdIHx8IFtdO1xuICAgICAgb3ZlcnJpZGluZyA9IHRydWU7XG4gICAgICB2YXIgYm9keSA9IGIudmlzaXQoKTtcbiAgICAgIHZhciBzb3VyY2UgPSB0aGlzLnNvdXJjZS50cmltbWVkKCk7XG4gICAgICB2YXIgYW5zID0gZGVjbC5vdmVycmlkZShjdXJyZW50UnVsZU5hbWUsIGN1cnJlbnRSdWxlRm9ybWFscywgYm9keSwgbnVsbCwgc291cmNlKTtcbiAgICAgIG92ZXJyaWRpbmcgPSBmYWxzZTtcbiAgICAgIHJldHVybiBhbnM7XG4gICAgfSxcbiAgICBSdWxlX2V4dGVuZDogZnVuY3Rpb24obiwgZnMsIF8sIGIpIHtcbiAgICAgIGN1cnJlbnRSdWxlTmFtZSA9IG4udmlzaXQoKTtcbiAgICAgIGN1cnJlbnRSdWxlRm9ybWFscyA9IGZzLnZpc2l0KClbMF0gfHwgW107XG4gICAgICB2YXIgYm9keSA9IGIudmlzaXQoKTtcbiAgICAgIHZhciBzb3VyY2UgPSB0aGlzLnNvdXJjZS50cmltbWVkKCk7XG4gICAgICB2YXIgYW5zID0gZGVjbC5leHRlbmQoY3VycmVudFJ1bGVOYW1lLCBjdXJyZW50UnVsZUZvcm1hbHMsIGJvZHksIG51bGwsIHNvdXJjZSk7XG4gICAgICByZXR1cm4gYW5zO1xuICAgIH0sXG4gICAgUnVsZUJvZHk6IGZ1bmN0aW9uKF8sIHRlcm1zKSB7XG4gICAgICB2YXIgYXJncyA9IHRlcm1zLnZpc2l0KCk7XG4gICAgICByZXR1cm4gYnVpbGRlci5hbHQuYXBwbHkoYnVpbGRlciwgYXJncykud2l0aFNvdXJjZSh0aGlzLnNvdXJjZSk7XG4gICAgfSxcblxuICAgIEZvcm1hbHM6IGZ1bmN0aW9uKG9wb2ludHksIGZzLCBjcG9pbnR5KSB7XG4gICAgICByZXR1cm4gZnMudmlzaXQoKTtcbiAgICB9LFxuXG4gICAgUGFyYW1zOiBmdW5jdGlvbihvcG9pbnR5LCBwcywgY3BvaW50eSkge1xuICAgICAgcmV0dXJuIHBzLnZpc2l0KCk7XG4gICAgfSxcblxuICAgIEFsdDogZnVuY3Rpb24oc2Vxcykge1xuICAgICAgdmFyIGFyZ3MgPSBzZXFzLnZpc2l0KCk7XG4gICAgICByZXR1cm4gYnVpbGRlci5hbHQuYXBwbHkoYnVpbGRlciwgYXJncykud2l0aFNvdXJjZSh0aGlzLnNvdXJjZSk7XG4gICAgfSxcblxuICAgIFRvcExldmVsVGVybV9pbmxpbmU6IGZ1bmN0aW9uKGIsIG4pIHtcbiAgICAgIHZhciBpbmxpbmVSdWxlTmFtZSA9IGN1cnJlbnRSdWxlTmFtZSArICdfJyArIG4udmlzaXQoKTtcbiAgICAgIHZhciBib2R5ID0gYi52aXNpdCgpO1xuICAgICAgdmFyIHNvdXJjZSA9IHRoaXMuc291cmNlLnRyaW1tZWQoKTtcbiAgICAgIHZhciBpc05ld1J1bGVEZWNsYXJhdGlvbiA9XG4gICAgICAgICAgIShkZWNsLnN1cGVyR3JhbW1hciAmJiBkZWNsLnN1cGVyR3JhbW1hci5ydWxlc1tpbmxpbmVSdWxlTmFtZV0pO1xuICAgICAgaWYgKG92ZXJyaWRpbmcgJiYgIWlzTmV3UnVsZURlY2xhcmF0aW9uKSB7XG4gICAgICAgIGRlY2wub3ZlcnJpZGUoaW5saW5lUnVsZU5hbWUsIGN1cnJlbnRSdWxlRm9ybWFscywgYm9keSwgbnVsbCwgc291cmNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlY2wuZGVmaW5lKGlubGluZVJ1bGVOYW1lLCBjdXJyZW50UnVsZUZvcm1hbHMsIGJvZHksIG51bGwsIHNvdXJjZSk7XG4gICAgICB9XG4gICAgICB2YXIgcGFyYW1zID0gY3VycmVudFJ1bGVGb3JtYWxzLm1hcChmdW5jdGlvbihmb3JtYWwpIHsgcmV0dXJuIGJ1aWxkZXIuYXBwKGZvcm1hbCk7IH0pO1xuICAgICAgcmV0dXJuIGJ1aWxkZXIuYXBwKGlubGluZVJ1bGVOYW1lLCBwYXJhbXMpLndpdGhTb3VyY2UoYm9keS5zb3VyY2UpO1xuICAgIH0sXG5cbiAgICBTZXE6IGZ1bmN0aW9uKGV4cHIpIHtcbiAgICAgIHJldHVybiBidWlsZGVyLnNlcS5hcHBseShidWlsZGVyLCBleHByLnZpc2l0KCkpLndpdGhTb3VyY2UodGhpcy5zb3VyY2UpO1xuICAgIH0sXG5cbiAgICBJdGVyX3N0YXI6IGZ1bmN0aW9uKHgsIF8pIHtcbiAgICAgIHJldHVybiBidWlsZGVyLnN0YXIoeC52aXNpdCgpKS53aXRoU291cmNlKHRoaXMuc291cmNlKTtcbiAgICB9LFxuICAgIEl0ZXJfcGx1czogZnVuY3Rpb24oeCwgXykge1xuICAgICAgcmV0dXJuIGJ1aWxkZXIucGx1cyh4LnZpc2l0KCkpLndpdGhTb3VyY2UodGhpcy5zb3VyY2UpO1xuICAgIH0sXG4gICAgSXRlcl9vcHQ6IGZ1bmN0aW9uKHgsIF8pIHtcbiAgICAgIHJldHVybiBidWlsZGVyLm9wdCh4LnZpc2l0KCkpLndpdGhTb3VyY2UodGhpcy5zb3VyY2UpO1xuICAgIH0sXG5cbiAgICBQcmVkX25vdDogZnVuY3Rpb24oXywgeCkge1xuICAgICAgcmV0dXJuIGJ1aWxkZXIubm90KHgudmlzaXQoKSkud2l0aFNvdXJjZSh0aGlzLnNvdXJjZSk7XG4gICAgfSxcbiAgICBQcmVkX2xvb2thaGVhZDogZnVuY3Rpb24oXywgeCkge1xuICAgICAgcmV0dXJuIGJ1aWxkZXIubG9va2FoZWFkKHgudmlzaXQoKSkud2l0aFNvdXJjZSh0aGlzLnNvdXJjZSk7XG4gICAgfSxcblxuICAgIExleF9sZXg6IGZ1bmN0aW9uKF8sIHgpIHtcbiAgICAgIHJldHVybiBidWlsZGVyLmxleCh4LnZpc2l0KCkpLndpdGhTb3VyY2UodGhpcy5zb3VyY2UpO1xuICAgIH0sXG5cbiAgICBCYXNlX2FwcGxpY2F0aW9uOiBmdW5jdGlvbihydWxlLCBwcykge1xuICAgICAgcmV0dXJuIGJ1aWxkZXIuYXBwKHJ1bGUudmlzaXQoKSwgcHMudmlzaXQoKVswXSB8fCBbXSkud2l0aFNvdXJjZSh0aGlzLnNvdXJjZSk7XG4gICAgfSxcbiAgICBCYXNlX3JhbmdlOiBmdW5jdGlvbihmcm9tLCBfLCB0bykge1xuICAgICAgcmV0dXJuIGJ1aWxkZXIucmFuZ2UoZnJvbS52aXNpdCgpLCB0by52aXNpdCgpKS53aXRoU291cmNlKHRoaXMuc291cmNlKTtcbiAgICB9LFxuICAgIEJhc2VfdGVybWluYWw6IGZ1bmN0aW9uKGV4cHIpIHtcbiAgICAgIHJldHVybiBidWlsZGVyLnRlcm1pbmFsKGV4cHIudmlzaXQoKSkud2l0aFNvdXJjZSh0aGlzLnNvdXJjZSk7XG4gICAgfSxcbiAgICBCYXNlX3BhcmVuOiBmdW5jdGlvbihvcGVuLCB4LCBjbG9zZSkge1xuICAgICAgcmV0dXJuIHgudmlzaXQoKTtcbiAgICB9LFxuXG4gICAgcnVsZURlc2NyOiBmdW5jdGlvbihvcGVuLCB0LCBjbG9zZSkge1xuICAgICAgcmV0dXJuIHQudmlzaXQoKTtcbiAgICB9LFxuICAgIHJ1bGVEZXNjclRleHQ6IGZ1bmN0aW9uKF8pIHtcbiAgICAgIHJldHVybiB0aGlzLnNvdXJjZVN0cmluZy50cmltKCk7XG4gICAgfSxcblxuICAgIGNhc2VOYW1lOiBmdW5jdGlvbihfLCBzcGFjZTEsIG4sIHNwYWNlMiwgZW5kKSB7XG4gICAgICByZXR1cm4gbi52aXNpdCgpO1xuICAgIH0sXG5cbiAgICBuYW1lOiBmdW5jdGlvbihmaXJzdCwgcmVzdCkge1xuICAgICAgcmV0dXJuIHRoaXMuc291cmNlU3RyaW5nO1xuICAgIH0sXG4gICAgbmFtZUZpcnN0OiBmdW5jdGlvbihleHByKSB7fSxcbiAgICBuYW1lUmVzdDogZnVuY3Rpb24oZXhwcikge30sXG5cbiAgICB0ZXJtaW5hbDogZnVuY3Rpb24ob3BlbiwgY3MsIGNsb3NlKSB7XG4gICAgICByZXR1cm4gY3MudmlzaXQoKS5tYXAoZnVuY3Rpb24oYykgeyByZXR1cm4gY29tbW9uLnVuZXNjYXBlQ2hhcihjKTsgfSkuam9pbignJyk7XG4gICAgfSxcblxuICAgIHRlcm1pbmFsQ2hhcjogZnVuY3Rpb24oXykge1xuICAgICAgcmV0dXJuIHRoaXMuc291cmNlU3RyaW5nO1xuICAgIH0sXG5cbiAgICBlc2NhcGVDaGFyOiBmdW5jdGlvbihfKSB7XG4gICAgICByZXR1cm4gdGhpcy5zb3VyY2VTdHJpbmc7XG4gICAgfSxcblxuICAgIE5vbmVtcHR5TGlzdE9mOiBmdW5jdGlvbih4LCBfLCB4cykge1xuICAgICAgcmV0dXJuIFt4LnZpc2l0KCldLmNvbmNhdCh4cy52aXNpdCgpKTtcbiAgICB9LFxuICAgIEVtcHR5TGlzdE9mOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9LFxuXG4gICAgX3Rlcm1pbmFsOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnByaW1pdGl2ZVZhbHVlO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBoZWxwZXJzKG1hdGNoKS52aXNpdCgpO1xufVxuXG5mdW5jdGlvbiBjb21waWxlQW5kTG9hZChzb3VyY2UsIG5hbWVzcGFjZSkge1xuICB2YXIgbSA9IG9obUdyYW1tYXIubWF0Y2goc291cmNlLCAnR3JhbW1hcnMnKTtcbiAgaWYgKG0uZmFpbGVkKCkpIHtcbiAgICB0aHJvdyBlcnJvcnMuZ3JhbW1hclN5bnRheEVycm9yKG0pO1xuICB9XG4gIHJldHVybiBidWlsZEdyYW1tYXIobSwgbmFtZXNwYWNlKTtcbn1cblxuLy8gUmV0dXJuIHRoZSBjb250ZW50cyBvZiBhIHNjcmlwdCBlbGVtZW50LCBmZXRjaGluZyBpdCB2aWEgWEhSIGlmIG5lY2Vzc2FyeS5cbmZ1bmN0aW9uIGdldFNjcmlwdEVsZW1lbnRDb250ZW50cyhlbCkge1xuICBpZiAoIWlzRWxlbWVudChlbCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBhIERPTSBOb2RlLCBnb3QgJyArIGNvbW1vbi51bmV4cGVjdGVkT2JqVG9TdHJpbmcoZWwpKTtcbiAgfVxuICBpZiAoZWwudHlwZSAhPT0gJ3RleHQvb2htLWpzJykge1xuICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgYSBzY3JpcHQgdGFnIHdpdGggdHlwZT1cInRleHQvb2htLWpzXCIsIGdvdCAnICsgZWwpO1xuICB9XG4gIHJldHVybiBlbC5nZXRBdHRyaWJ1dGUoJ3NyYycpID8gbG9hZChlbC5nZXRBdHRyaWJ1dGUoJ3NyYycpKSA6IGVsLmlubmVySFRNTDtcbn1cblxuZnVuY3Rpb24gZ3JhbW1hcihzb3VyY2UsIG9wdE5hbWVzcGFjZSkge1xuICB2YXIgbnMgPSBncmFtbWFycyhzb3VyY2UsIG9wdE5hbWVzcGFjZSk7XG5cbiAgLy8gRW5zdXJlIHRoYXQgdGhlIHNvdXJjZSBjb250YWluZWQgbm8gbW9yZSB0aGFuIG9uZSBncmFtbWFyIGRlZmluaXRpb24uXG4gIHZhciBncmFtbWFyTmFtZXMgPSBPYmplY3Qua2V5cyhucyk7XG4gIGlmIChncmFtbWFyTmFtZXMubGVuZ3RoID09PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGdyYW1tYXIgZGVmaW5pdGlvbicpO1xuICB9IGVsc2UgaWYgKGdyYW1tYXJOYW1lcy5sZW5ndGggPiAxKSB7XG4gICAgdmFyIHNlY29uZEdyYW1tYXIgPSBuc1tncmFtbWFyTmFtZXNbMV1dO1xuICAgIHZhciBpbnRlcnZhbCA9IHNlY29uZEdyYW1tYXIuc291cmNlO1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgdXRpbC5nZXRMaW5lQW5kQ29sdW1uTWVzc2FnZShpbnRlcnZhbC5pbnB1dFN0cmVhbS5zb3VyY2UsIGludGVydmFsLnN0YXJ0SWR4KSArXG4gICAgICAgICdGb3VuZCBtb3JlIHRoYW4gb25lIGdyYW1tYXIgZGVmaW5pdGlvbiAtLSB1c2Ugb2htLmdyYW1tYXJzKCkgaW5zdGVhZC4nKTtcbiAgfVxuICByZXR1cm4gbnNbZ3JhbW1hck5hbWVzWzBdXTsgIC8vIFJldHVybiB0aGUgb25lIGFuZCBvbmx5IGdyYW1tYXIuXG59XG5cbmZ1bmN0aW9uIGdyYW1tYXJzKHNvdXJjZSwgb3B0TmFtZXNwYWNlKSB7XG4gIHZhciBucyA9IE5hbWVzcGFjZS5leHRlbmQoTmFtZXNwYWNlLmFzTmFtZXNwYWNlKG9wdE5hbWVzcGFjZSkpO1xuICBpZiAodHlwZW9mIHNvdXJjZSAhPT0gJ3N0cmluZycpIHtcbiAgICAvLyBGb3IgY29udmVuaWVuY2UsIGRldGVjdCBOb2RlLmpzIEJ1ZmZlciBvYmplY3RzIGFuZCBhdXRvbWF0aWNhbGx5IGNhbGwgdG9TdHJpbmcoKS5cbiAgICBpZiAoaXNCdWZmZXIoc291cmNlKSkge1xuICAgICAgc291cmNlID0gc291cmNlLnRvU3RyaW5nKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgJ0V4cGVjdGVkIHN0cmluZyBhcyBmaXJzdCBhcmd1bWVudCwgZ290ICcgKyBjb21tb24udW5leHBlY3RlZE9ialRvU3RyaW5nKHNvdXJjZSkpO1xuICAgIH1cbiAgfVxuICBjb21waWxlQW5kTG9hZChzb3VyY2UsIG5zKTtcbiAgcmV0dXJuIG5zO1xufVxuXG5mdW5jdGlvbiBncmFtbWFyRnJvbVNjcmlwdEVsZW1lbnQob3B0Tm9kZSkge1xuICB2YXIgbm9kZSA9IG9wdE5vZGU7XG4gIGlmIChpc1VuZGVmaW5lZChub2RlKSkge1xuICAgIHZhciBub2RlTGlzdCA9IGRvY3VtZW50SW50ZXJmYWNlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3NjcmlwdFt0eXBlPVwidGV4dC9vaG0tanNcIl0nKTtcbiAgICBpZiAobm9kZUxpc3QubGVuZ3RoICE9PSAxKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ0V4cGVjdGVkIGV4YWN0bHkgb25lIHNjcmlwdCB0YWcgd2l0aCB0eXBlPVwidGV4dC9vaG0tanNcIiwgZm91bmQgJyArIG5vZGVMaXN0Lmxlbmd0aCk7XG4gICAgfVxuICAgIG5vZGUgPSBub2RlTGlzdFswXTtcbiAgfVxuICByZXR1cm4gZ3JhbW1hcihnZXRTY3JpcHRFbGVtZW50Q29udGVudHMobm9kZSkpO1xufVxuXG5mdW5jdGlvbiBncmFtbWFyc0Zyb21TY3JpcHRFbGVtZW50cyhvcHROb2RlT3JOb2RlTGlzdCkge1xuICAvLyBTaW1wbGUgY2FzZTogdGhlIGFyZ3VtZW50IGlzIGEgRE9NIG5vZGUuXG4gIGlmIChpc0VsZW1lbnQob3B0Tm9kZU9yTm9kZUxpc3QpKSB7XG4gICAgcmV0dXJuIGdyYW1tYXJzKG9wdE5vZGVPck5vZGVMaXN0KTtcbiAgfVxuICAvLyBPdGhlcndpc2UsIGl0IG11c3QgYmUgZWl0aGVyIHVuZGVmaW5lZCBvciBhIE5vZGVMaXN0LlxuICB2YXIgbm9kZUxpc3QgPSBvcHROb2RlT3JOb2RlTGlzdDtcbiAgaWYgKGlzVW5kZWZpbmVkKG5vZGVMaXN0KSkge1xuICAgIC8vIEZpbmQgYWxsIHNjcmlwdCBlbGVtZW50cyB3aXRoIHR5cGU9XCJ0ZXh0L29obS1qc1wiLlxuICAgIG5vZGVMaXN0ID0gZG9jdW1lbnRJbnRlcmZhY2UucXVlcnlTZWxlY3RvckFsbCgnc2NyaXB0W3R5cGU9XCJ0ZXh0L29obS1qc1wiXScpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBub2RlTGlzdCA9PT0gJ3N0cmluZycgfHwgKCFpc0VsZW1lbnQobm9kZUxpc3QpICYmICFpc0FycmF5TGlrZShub2RlTGlzdCkpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYSBOb2RlLCBOb2RlTGlzdCwgb3IgQXJyYXksIGJ1dCBnb3QgJyArIG5vZGVMaXN0KTtcbiAgfVxuICB2YXIgbnMgPSBOYW1lc3BhY2UuY3JlYXRlTmFtZXNwYWNlKCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZUxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICAvLyBDb3B5IHRoZSBuZXcgZ3JhbW1hcnMgaW50byBgbnNgIHRvIGtlZXAgdGhlIG5hbWVzcGFjZSBmbGF0LlxuICAgIGNvbW1vbi5leHRlbmQobnMsIGdyYW1tYXJzKGdldFNjcmlwdEVsZW1lbnRDb250ZW50cyhub2RlTGlzdFtpXSksIG5zKSk7XG4gIH1cbiAgcmV0dXJuIG5zO1xufVxuXG5mdW5jdGlvbiBtYWtlUmVjaXBlKHJlY2lwZSkge1xuICBpZiAodHlwZW9mIHJlY2lwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiByZWNpcGUuY2FsbChuZXcgQnVpbGRlcigpKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mIHJlY2lwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIHN0cmluZ2lmaWVkIEpTT04gcmVjaXBlXG4gICAgICByZWNpcGUgPSBKU09OLnBhcnNlKHJlY2lwZSk7XG4gICAgfVxuICAgIHJldHVybiAobmV3IEJ1aWxkZXIoKSkuZnJvbVJlY2lwZShyZWNpcGUpO1xuICB9XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyBTdHVmZiB0aGF0IHVzZXJzIHNob3VsZCBrbm93IGFib3V0XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY3JlYXRlTmFtZXNwYWNlOiBOYW1lc3BhY2UuY3JlYXRlTmFtZXNwYWNlLFxuICBncmFtbWFyOiBncmFtbWFyLFxuICBncmFtbWFyczogZ3JhbW1hcnMsXG4gIGdyYW1tYXJGcm9tU2NyaXB0RWxlbWVudDogZ3JhbW1hckZyb21TY3JpcHRFbGVtZW50LFxuICBncmFtbWFyc0Zyb21TY3JpcHRFbGVtZW50czogZ3JhbW1hcnNGcm9tU2NyaXB0RWxlbWVudHMsXG4gIG1ha2VSZWNpcGU6IG1ha2VSZWNpcGUsXG4gIG9obUdyYW1tYXI6IG51bGwsICAvLyBJbml0aWFsaXplZCBiZWxvdywgYWZ0ZXIgR3JhbW1hci5CdWlsdEluUnVsZXMuXG4gIHBleHByczogcGV4cHJzLFxuICB1dGlsOiB1dGlsLFxuICBleHRyYXM6IHJlcXVpcmUoJy4uL2V4dHJhcycpXG59O1xuXG4vLyBTdHVmZiBmb3IgdGVzdGluZywgZXRjLlxubW9kdWxlLmV4cG9ydHMuX2J1aWxkR3JhbW1hciA9IGJ1aWxkR3JhbW1hcjtcbm1vZHVsZS5leHBvcnRzLl9zZXREb2N1bWVudEludGVyZmFjZUZvclRlc3RpbmcgPSBmdW5jdGlvbihkb2MpIHsgZG9jdW1lbnRJbnRlcmZhY2UgPSBkb2M7IH07XG5cbi8vIExhdGUgaW5pdGlhbGl6YXRpb24gZm9yIHN0dWZmIHRoYXQgaXMgYm9vdHN0cmFwcGVkLlxuXG5HcmFtbWFyLkJ1aWx0SW5SdWxlcyA9IHJlcXVpcmUoJy4uL2Rpc3QvYnVpbHQtaW4tcnVsZXMnKTtcblxudmFyIFNlbWFudGljcyA9IHJlcXVpcmUoJy4vU2VtYW50aWNzJyk7XG52YXIgb3BlcmF0aW9uc0FuZEF0dHJpYnV0ZXNHcmFtbWFyID0gcmVxdWlyZSgnLi4vZGlzdC9vcGVyYXRpb25zLWFuZC1hdHRyaWJ1dGVzJyk7XG5TZW1hbnRpY3MuaW5pdEJ1aWx0SW5TZW1hbnRpY3MoR3JhbW1hci5CdWlsdEluUnVsZXMpO1xuU2VtYW50aWNzLmluaXRQcm90b3R5cGVQYXJzZXIob3BlcmF0aW9uc0FuZEF0dHJpYnV0ZXNHcmFtbWFyKTsgIC8vIHJlcXVpcmVzIEJ1aWx0SW5TZW1hbnRpY3NcblxubW9kdWxlLmV4cG9ydHMub2htR3JhbW1hciA9IG9obUdyYW1tYXIgPSByZXF1aXJlKCcuLi9kaXN0L29obS1ncmFtbWFyJyk7XG5HcmFtbWFyLmluaXRBcHBsaWNhdGlvblBhcnNlcihvaG1HcmFtbWFyLCBidWlsZEdyYW1tYXIpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpO1xuXG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24nKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFByaXZhdGUgc3R1ZmZcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIE5vZGUoZ3JhbW1hciwgY3Rvck5hbWUsIGNoaWxkcmVuLCBzb3VyY2UpIHtcbiAgdGhpcy5ncmFtbWFyID0gZ3JhbW1hcjtcbiAgdGhpcy5jdG9yTmFtZSA9IGN0b3JOYW1lO1xuICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gIHRoaXMuc291cmNlID0gc291cmNlO1xufVxuXG5Ob2RlLnByb3RvdHlwZS5udW1DaGlsZHJlbiA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5jaGlsZHJlbi5sZW5ndGg7XG59O1xuXG5Ob2RlLnByb3RvdHlwZS5jaGlsZEF0ID0gZnVuY3Rpb24oaWR4KSB7XG4gIHJldHVybiB0aGlzLmNoaWxkcmVuW2lkeF07XG59O1xuXG5Ob2RlLnByb3RvdHlwZS5pbmRleE9mQ2hpbGQgPSBmdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHRoaXMuY2hpbGRyZW4uaW5kZXhPZihhcmcpO1xufTtcblxuTm9kZS5wcm90b3R5cGUuaGFzQ2hpbGRyZW4gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMDtcbn07XG5cbk5vZGUucHJvdG90eXBlLmhhc05vQ2hpbGRyZW4gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICF0aGlzLmhhc0NoaWxkcmVuKCk7XG59O1xuXG5Ob2RlLnByb3RvdHlwZS5vbmx5Q2hpbGQgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoICE9PSAxKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnY2Fubm90IGdldCBvbmx5IGNoaWxkIG9mIGEgbm9kZSBvZiB0eXBlICcgKyB0aGlzLmN0b3JOYW1lICtcbiAgICAgICAgJyAoaXQgaGFzICcgKyB0aGlzLm51bUNoaWxkcmVuKCkgKyAnIGNoaWxkcmVuKScpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0aGlzLmZpcnN0Q2hpbGQoKTtcbiAgfVxufTtcblxuTm9kZS5wcm90b3R5cGUuZmlyc3RDaGlsZCA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5oYXNOb0NoaWxkcmVuKCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdjYW5ub3QgZ2V0IGZpcnN0IGNoaWxkIG9mIGEgJyArIHRoaXMuY3Rvck5hbWUgKyAnIG5vZGUsIHdoaWNoIGhhcyBubyBjaGlsZHJlbicpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0aGlzLmNoaWxkQXQoMCk7XG4gIH1cbn07XG5cbk5vZGUucHJvdG90eXBlLmxhc3RDaGlsZCA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5oYXNOb0NoaWxkcmVuKCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdjYW5ub3QgZ2V0IGxhc3QgY2hpbGQgb2YgYSAnICsgdGhpcy5jdG9yTmFtZSArICcgbm9kZSwgd2hpY2ggaGFzIG5vIGNoaWxkcmVuJyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRoaXMuY2hpbGRBdCh0aGlzLm51bUNoaWxkcmVuKCkgLSAxKTtcbiAgfVxufTtcblxuTm9kZS5wcm90b3R5cGUuY2hpbGRCZWZvcmUgPSBmdW5jdGlvbihjaGlsZCkge1xuICB2YXIgY2hpbGRJZHggPSB0aGlzLmluZGV4T2ZDaGlsZChjaGlsZCk7XG4gIGlmIChjaGlsZElkeCA8IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vZGUuY2hpbGRCZWZvcmUoKSBjYWxsZWQgdy8gYW4gYXJndW1lbnQgdGhhdCBpcyBub3QgYSBjaGlsZCcpO1xuICB9IGVsc2UgaWYgKGNoaWxkSWR4ID09PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjYW5ub3QgZ2V0IGNoaWxkIGJlZm9yZSBmaXJzdCBjaGlsZCcpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0aGlzLmNoaWxkQXQoY2hpbGRJZHggLSAxKTtcbiAgfVxufTtcblxuTm9kZS5wcm90b3R5cGUuY2hpbGRBZnRlciA9IGZ1bmN0aW9uKGNoaWxkKSB7XG4gIHZhciBjaGlsZElkeCA9IHRoaXMuaW5kZXhPZkNoaWxkKGNoaWxkKTtcbiAgaWYgKGNoaWxkSWR4IDwgMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTm9kZS5jaGlsZEFmdGVyKCkgY2FsbGVkIHcvIGFuIGFyZ3VtZW50IHRoYXQgaXMgbm90IGEgY2hpbGQnKTtcbiAgfSBlbHNlIGlmIChjaGlsZElkeCA9PT0gdGhpcy5udW1DaGlsZHJlbigpIC0gMSkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2Fubm90IGdldCBjaGlsZCBhZnRlciBsYXN0IGNoaWxkJyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRoaXMuY2hpbGRBdChjaGlsZElkeCArIDEpO1xuICB9XG59O1xuXG5Ob2RlLnByb3RvdHlwZS5pc1Rlcm1pbmFsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbk5vZGUucHJvdG90eXBlLmlzTm9udGVybWluYWwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuTm9kZS5wcm90b3R5cGUuaXNJdGVyYXRpb24gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuTm9kZS5wcm90b3R5cGUuaXNPcHRpb25hbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gZmFsc2U7XG59O1xuXG5Ob2RlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbigpIHtcbiAgdmFyIHIgPSB7fTtcbiAgclt0aGlzLmN0b3JOYW1lXSA9IHRoaXMuY2hpbGRyZW47XG4gIHJldHVybiByO1xufTtcblxuLy8gVGVybWluYWxzXG5cbmZ1bmN0aW9uIFRlcm1pbmFsTm9kZShncmFtbWFyLCB2YWx1ZSwgc291cmNlKSB7XG4gIE5vZGUuY2FsbCh0aGlzLCBncmFtbWFyLCAnX3Rlcm1pbmFsJywgW10sIHNvdXJjZSk7XG4gIHRoaXMucHJpbWl0aXZlVmFsdWUgPSB2YWx1ZTtcbn1cbmluaGVyaXRzKFRlcm1pbmFsTm9kZSwgTm9kZSk7XG5cblRlcm1pbmFsTm9kZS5wcm90b3R5cGUuaXNUZXJtaW5hbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8vIE5vbnRlcm1pbmFsc1xuXG5mdW5jdGlvbiBOb250ZXJtaW5hbE5vZGUoZ3JhbW1hciwgcnVsZU5hbWUsIGNoaWxkcmVuLCBzb3VyY2UpIHtcbiAgTm9kZS5jYWxsKHRoaXMsIGdyYW1tYXIsIHJ1bGVOYW1lLCBjaGlsZHJlbiwgc291cmNlKTtcbn1cbmluaGVyaXRzKE5vbnRlcm1pbmFsTm9kZSwgTm9kZSk7XG5cbk5vbnRlcm1pbmFsTm9kZS5wcm90b3R5cGUuaXNOb250ZXJtaW5hbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cbk5vbnRlcm1pbmFsTm9kZS5wcm90b3R5cGUuaXNMZXhpY2FsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBjb21tb24uaXNMZXhpY2FsKHRoaXMuY3Rvck5hbWUpO1xufTtcblxuTm9udGVybWluYWxOb2RlLnByb3RvdHlwZS5pc1N5bnRhY3RpYyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gY29tbW9uLmlzU3ludGFjdGljKHRoaXMuY3Rvck5hbWUpO1xufTtcblxuLy8gSXRlcmF0aW9uc1xuXG5mdW5jdGlvbiBJdGVyYXRpb25Ob2RlKGdyYW1tYXIsIGNoaWxkcmVuLCBzb3VyY2UsIG9wdGlvbmFsKSB7XG4gIE5vZGUuY2FsbCh0aGlzLCBncmFtbWFyLCAnX2l0ZXInLCBjaGlsZHJlbiwgc291cmNlKTtcbiAgdGhpcy5vcHRpb25hbCA9IG9wdGlvbmFsO1xufVxuaW5oZXJpdHMoSXRlcmF0aW9uTm9kZSwgTm9kZSk7XG5cbkl0ZXJhdGlvbk5vZGUucHJvdG90eXBlLmlzSXRlcmF0aW9uID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0cnVlO1xufTtcblxuSXRlcmF0aW9uTm9kZS5wcm90b3R5cGUuaXNPcHRpb25hbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5vcHRpb25hbDtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgTm9kZTogTm9kZSxcbiAgVGVybWluYWxOb2RlOiBUZXJtaW5hbE5vZGUsXG4gIE5vbnRlcm1pbmFsTm9kZTogTm9udGVybWluYWxOb2RlLFxuICBJdGVyYXRpb25Ob2RlOiBJdGVyYXRpb25Ob2RlXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uJyk7XG52YXIgcGV4cHJzID0gcmVxdWlyZSgnLi9wZXhwcnMnKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIE9wZXJhdGlvbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8qXG4gIFJldHVybiB0cnVlIGlmIHdlIHNob3VsZCBza2lwIHNwYWNlcyBwcmVjZWRpbmcgdGhpcyBleHByZXNzaW9uIGluIGEgc3ludGFjdGljIGNvbnRleHQuXG4qL1xucGV4cHJzLlBFeHByLnByb3RvdHlwZS5hbGxvd3NTa2lwcGluZ1ByZWNlZGluZ1NwYWNlID0gY29tbW9uLmFic3RyYWN0KFxuICAnYWxsb3dzU2tpcHBpbmdQcmVjZWRpbmdTcGFjZSdcbik7XG5cbi8qXG4gIEdlbmVyYWxseSwgdGhlc2UgYXJlIGFsbCBmaXJzdC1vcmRlciBleHByZXNzaW9ucyBhbmQgKHdpdGggdGhlIGV4Y2VwdGlvbiBvZiBBcHBseSlcbiAgZGlyZWN0bHkgcmVhZCBmcm9tIHRoZSBpbnB1dCBzdHJlYW0uXG4qL1xucGV4cHJzLmFueS5hbGxvd3NTa2lwcGluZ1ByZWNlZGluZ1NwYWNlID1cbnBleHBycy5lbmQuYWxsb3dzU2tpcHBpbmdQcmVjZWRpbmdTcGFjZSA9XG5wZXhwcnMuQXBwbHkucHJvdG90eXBlLmFsbG93c1NraXBwaW5nUHJlY2VkaW5nU3BhY2UgPVxucGV4cHJzLlRlcm1pbmFsLnByb3RvdHlwZS5hbGxvd3NTa2lwcGluZ1ByZWNlZGluZ1NwYWNlID1cbnBleHBycy5SYW5nZS5wcm90b3R5cGUuYWxsb3dzU2tpcHBpbmdQcmVjZWRpbmdTcGFjZSA9XG5wZXhwcnMuVW5pY29kZUNoYXIucHJvdG90eXBlLmFsbG93c1NraXBwaW5nUHJlY2VkaW5nU3BhY2UgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG4vKlxuICBIaWdoZXItb3JkZXIgZXhwcmVzc2lvbnMgdGhhdCBkb24ndCBkaXJlY3RseSBjb25zdW1lIGlucHV0LlxuKi9cbnBleHBycy5BbHQucHJvdG90eXBlLmFsbG93c1NraXBwaW5nUHJlY2VkaW5nU3BhY2UgPVxucGV4cHJzLkl0ZXIucHJvdG90eXBlLmFsbG93c1NraXBwaW5nUHJlY2VkaW5nU3BhY2UgPVxucGV4cHJzLkxleC5wcm90b3R5cGUuYWxsb3dzU2tpcHBpbmdQcmVjZWRpbmdTcGFjZSA9XG5wZXhwcnMuTG9va2FoZWFkLnByb3RvdHlwZS5hbGxvd3NTa2lwcGluZ1ByZWNlZGluZ1NwYWNlID1cbnBleHBycy5Ob3QucHJvdG90eXBlLmFsbG93c1NraXBwaW5nUHJlY2VkaW5nU3BhY2UgPVxucGV4cHJzLlBhcmFtLnByb3RvdHlwZS5hbGxvd3NTa2lwcGluZ1ByZWNlZGluZ1NwYWNlID1cbnBleHBycy5TZXEucHJvdG90eXBlLmFsbG93c1NraXBwaW5nUHJlY2VkaW5nU3BhY2UgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIGZhbHNlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbicpO1xudmFyIGVycm9ycyA9IHJlcXVpcmUoJy4vZXJyb3JzJyk7XG52YXIgcGV4cHJzID0gcmVxdWlyZSgnLi9wZXhwcnMnKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIE9wZXJhdGlvbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBsZXhpZnlDb3VudDtcblxucGV4cHJzLlBFeHByLnByb3RvdHlwZS5hc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZCA9IGZ1bmN0aW9uKHJ1bGVOYW1lLCBncmFtbWFyKSB7XG4gIGxleGlmeUNvdW50ID0gMDtcbiAgdGhpcy5fYXNzZXJ0QWxsQXBwbGljYXRpb25zQXJlVmFsaWQocnVsZU5hbWUsIGdyYW1tYXIpO1xufTtcblxucGV4cHJzLlBFeHByLnByb3RvdHlwZS5fYXNzZXJ0QWxsQXBwbGljYXRpb25zQXJlVmFsaWQgPSBjb21tb24uYWJzdHJhY3QoXG4gICdfYXNzZXJ0QWxsQXBwbGljYXRpb25zQXJlVmFsaWQnXG4pO1xuXG5wZXhwcnMuYW55Ll9hc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZCA9XG5wZXhwcnMuZW5kLl9hc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZCA9XG5wZXhwcnMuVGVybWluYWwucHJvdG90eXBlLl9hc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZCA9XG5wZXhwcnMuUmFuZ2UucHJvdG90eXBlLl9hc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZCA9XG5wZXhwcnMuUGFyYW0ucHJvdG90eXBlLl9hc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZCA9XG5wZXhwcnMuVW5pY29kZUNoYXIucHJvdG90eXBlLl9hc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZCA9IGZ1bmN0aW9uKHJ1bGVOYW1lLCBncmFtbWFyKSB7XG4gIC8vIG5vLW9wXG59O1xuXG5wZXhwcnMuTGV4LnByb3RvdHlwZS5fYXNzZXJ0QWxsQXBwbGljYXRpb25zQXJlVmFsaWQgPSBmdW5jdGlvbihydWxlTmFtZSwgZ3JhbW1hcikge1xuICBsZXhpZnlDb3VudCsrO1xuICB0aGlzLmV4cHIuX2Fzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkKHJ1bGVOYW1lLCBncmFtbWFyKTtcbiAgbGV4aWZ5Q291bnQtLTtcbn07XG5cbnBleHBycy5BbHQucHJvdG90eXBlLl9hc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZCA9IGZ1bmN0aW9uKHJ1bGVOYW1lLCBncmFtbWFyKSB7XG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IHRoaXMudGVybXMubGVuZ3RoOyBpZHgrKykge1xuICAgIHRoaXMudGVybXNbaWR4XS5fYXNzZXJ0QWxsQXBwbGljYXRpb25zQXJlVmFsaWQocnVsZU5hbWUsIGdyYW1tYXIpO1xuICB9XG59O1xuXG5wZXhwcnMuU2VxLnByb3RvdHlwZS5fYXNzZXJ0QWxsQXBwbGljYXRpb25zQXJlVmFsaWQgPSBmdW5jdGlvbihydWxlTmFtZSwgZ3JhbW1hcikge1xuICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCB0aGlzLmZhY3RvcnMubGVuZ3RoOyBpZHgrKykge1xuICAgIHRoaXMuZmFjdG9yc1tpZHhdLl9hc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZChydWxlTmFtZSwgZ3JhbW1hcik7XG4gIH1cbn07XG5cbnBleHBycy5JdGVyLnByb3RvdHlwZS5fYXNzZXJ0QWxsQXBwbGljYXRpb25zQXJlVmFsaWQgPVxucGV4cHJzLk5vdC5wcm90b3R5cGUuX2Fzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkID1cbnBleHBycy5Mb29rYWhlYWQucHJvdG90eXBlLl9hc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZCA9IGZ1bmN0aW9uKHJ1bGVOYW1lLCBncmFtbWFyKSB7XG4gIHRoaXMuZXhwci5fYXNzZXJ0QWxsQXBwbGljYXRpb25zQXJlVmFsaWQocnVsZU5hbWUsIGdyYW1tYXIpO1xufTtcblxucGV4cHJzLkFwcGx5LnByb3RvdHlwZS5fYXNzZXJ0QWxsQXBwbGljYXRpb25zQXJlVmFsaWQgPSBmdW5jdGlvbihydWxlTmFtZSwgZ3JhbW1hcikge1xuICB2YXIgcnVsZUluZm8gPSBncmFtbWFyLnJ1bGVzW3RoaXMucnVsZU5hbWVdO1xuXG4gIC8vIE1ha2Ugc3VyZSB0aGF0IHRoZSBydWxlIGV4aXN0cy4uLlxuICBpZiAoIXJ1bGVJbmZvKSB7XG4gICAgdGhyb3cgZXJyb3JzLnVuZGVjbGFyZWRSdWxlKHRoaXMucnVsZU5hbWUsIGdyYW1tYXIubmFtZSwgdGhpcy5zb3VyY2UpO1xuICB9XG5cbiAgLy8gLi4uYW5kIHRoYXQgdGhpcyBhcHBsaWNhdGlvbiBpcyBhbGxvd2VkXG4gIGlmIChjb21tb24uaXNTeW50YWN0aWModGhpcy5ydWxlTmFtZSkgJiYgKCFjb21tb24uaXNTeW50YWN0aWMocnVsZU5hbWUpIHx8IGxleGlmeUNvdW50ID4gMCkpIHtcbiAgICB0aHJvdyBlcnJvcnMuYXBwbGljYXRpb25PZlN5bnRhY3RpY1J1bGVGcm9tTGV4aWNhbENvbnRleHQodGhpcy5ydWxlTmFtZSwgdGhpcyk7XG4gIH1cblxuICAvLyAuLi5hbmQgdGhhdCB0aGlzIGFwcGxpY2F0aW9uIGhhcyB0aGUgY29ycmVjdCBudW1iZXIgb2YgYXJndW1lbnRzXG4gIHZhciBhY3R1YWwgPSB0aGlzLmFyZ3MubGVuZ3RoO1xuICB2YXIgZXhwZWN0ZWQgPSBydWxlSW5mby5mb3JtYWxzLmxlbmd0aDtcbiAgaWYgKGFjdHVhbCAhPT0gZXhwZWN0ZWQpIHtcbiAgICB0aHJvdyBlcnJvcnMud3JvbmdOdW1iZXJPZkFyZ3VtZW50cyh0aGlzLnJ1bGVOYW1lLCBleHBlY3RlZCwgYWN0dWFsLCB0aGlzKTtcbiAgfVxuXG4gIC8vIC4uLmFuZCB0aGF0IGFsbCBvZiB0aGUgYXJndW1lbnQgZXhwcmVzc2lvbnMgb25seSBoYXZlIHZhbGlkIGFwcGxpY2F0aW9ucyBhbmQgaGF2ZSBhcml0eSAxLlxuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHRoaXMuYXJncy5mb3JFYWNoKGZ1bmN0aW9uKGFyZykge1xuICAgIGFyZy5fYXNzZXJ0QWxsQXBwbGljYXRpb25zQXJlVmFsaWQocnVsZU5hbWUsIGdyYW1tYXIpO1xuICAgIGlmIChhcmcuZ2V0QXJpdHkoKSAhPT0gMSkge1xuICAgICAgdGhyb3cgZXJyb3JzLmludmFsaWRQYXJhbWV0ZXIoc2VsZi5ydWxlTmFtZSwgYXJnKTtcbiAgICB9XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbicpO1xudmFyIGVycm9ycyA9IHJlcXVpcmUoJy4vZXJyb3JzJyk7XG52YXIgcGV4cHJzID0gcmVxdWlyZSgnLi9wZXhwcnMnKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIE9wZXJhdGlvbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnBleHBycy5QRXhwci5wcm90b3R5cGUuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQXJpdHkgPSBjb21tb24uYWJzdHJhY3QoXG4gICdhc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1Bcml0eSdcbik7XG5cbnBleHBycy5hbnkuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQXJpdHkgPVxucGV4cHJzLmVuZC5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1Bcml0eSA9XG5wZXhwcnMuVGVybWluYWwucHJvdG90eXBlLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUFyaXR5ID1cbnBleHBycy5SYW5nZS5wcm90b3R5cGUuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQXJpdHkgPVxucGV4cHJzLlBhcmFtLnByb3RvdHlwZS5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1Bcml0eSA9XG5wZXhwcnMuTGV4LnByb3RvdHlwZS5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1Bcml0eSA9XG5wZXhwcnMuVW5pY29kZUNoYXIucHJvdG90eXBlLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUFyaXR5ID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgLy8gbm8tb3Bcbn07XG5cbnBleHBycy5BbHQucHJvdG90eXBlLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUFyaXR5ID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgaWYgKHRoaXMudGVybXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBhcml0eSA9IHRoaXMudGVybXNbMF0uZ2V0QXJpdHkoKTtcbiAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgdGhpcy50ZXJtcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgdmFyIHRlcm0gPSB0aGlzLnRlcm1zW2lkeF07XG4gICAgdGVybS5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1Bcml0eSgpO1xuICAgIHZhciBvdGhlckFyaXR5ID0gdGVybS5nZXRBcml0eSgpO1xuICAgIGlmIChhcml0eSAhPT0gb3RoZXJBcml0eSkge1xuICAgICAgdGhyb3cgZXJyb3JzLmluY29uc2lzdGVudEFyaXR5KHJ1bGVOYW1lLCBhcml0eSwgb3RoZXJBcml0eSwgdGVybSk7XG4gICAgfVxuICB9XG59O1xuXG5wZXhwcnMuRXh0ZW5kLnByb3RvdHlwZS5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1Bcml0eSA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIC8vIEV4dGVuZCBpcyBhIHNwZWNpYWwgY2FzZSBvZiBBbHQgdGhhdCdzIGd1YXJhbnRlZWQgdG8gaGF2ZSBleGFjdGx5IHR3b1xuICAvLyBjYXNlczogW2V4dGVuc2lvbnMsIG9yaWdCb2R5XS5cbiAgdmFyIGFjdHVhbEFyaXR5ID0gdGhpcy50ZXJtc1swXS5nZXRBcml0eSgpO1xuICB2YXIgZXhwZWN0ZWRBcml0eSA9IHRoaXMudGVybXNbMV0uZ2V0QXJpdHkoKTtcbiAgaWYgKGFjdHVhbEFyaXR5ICE9PSBleHBlY3RlZEFyaXR5KSB7XG4gICAgdGhyb3cgZXJyb3JzLmluY29uc2lzdGVudEFyaXR5KHJ1bGVOYW1lLCBleHBlY3RlZEFyaXR5LCBhY3R1YWxBcml0eSwgdGhpcy50ZXJtc1swXSk7XG4gIH1cbn07XG5cbnBleHBycy5TZXEucHJvdG90eXBlLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUFyaXR5ID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgdGhpcy5mYWN0b3JzLmxlbmd0aDsgaWR4KyspIHtcbiAgICB0aGlzLmZhY3RvcnNbaWR4XS5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1Bcml0eShydWxlTmFtZSk7XG4gIH1cbn07XG5cbnBleHBycy5JdGVyLnByb3RvdHlwZS5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1Bcml0eSA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIHRoaXMuZXhwci5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1Bcml0eShydWxlTmFtZSk7XG59O1xuXG5wZXhwcnMuTm90LnByb3RvdHlwZS5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1Bcml0eSA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIC8vIG5vLW9wIChub3QgcmVxdWlyZWQgYi9jIHRoZSBuZXN0ZWQgZXhwciBkb2Vzbid0IHNob3cgdXAgaW4gdGhlIENTVClcbn07XG5cbnBleHBycy5Mb29rYWhlYWQucHJvdG90eXBlLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUFyaXR5ID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgdGhpcy5leHByLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUFyaXR5KHJ1bGVOYW1lKTtcbn07XG5cbnBleHBycy5BcHBseS5wcm90b3R5cGUuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQXJpdHkgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICAvLyBUaGUgYXJpdGllcyBvZiB0aGUgcGFyYW1ldGVyIGV4cHJlc3Npb25zIGlzIHJlcXVpcmVkIHRvIGJlIDEgYnlcbiAgLy8gYGFzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkKClgLlxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbicpO1xudmFyIGVycm9ycyA9IHJlcXVpcmUoJy4vZXJyb3JzJyk7XG52YXIgcGV4cHJzID0gcmVxdWlyZSgnLi9wZXhwcnMnKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIE9wZXJhdGlvbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnBleHBycy5QRXhwci5wcm90b3R5cGUuYXNzZXJ0SXRlcmF0ZWRFeHByc0FyZU5vdE51bGxhYmxlID0gY29tbW9uLmFic3RyYWN0KFxuICAnYXNzZXJ0SXRlcmF0ZWRFeHByc0FyZU5vdE51bGxhYmxlJ1xuKTtcblxucGV4cHJzLmFueS5hc3NlcnRJdGVyYXRlZEV4cHJzQXJlTm90TnVsbGFibGUgPVxucGV4cHJzLmVuZC5hc3NlcnRJdGVyYXRlZEV4cHJzQXJlTm90TnVsbGFibGUgPVxucGV4cHJzLlRlcm1pbmFsLnByb3RvdHlwZS5hc3NlcnRJdGVyYXRlZEV4cHJzQXJlTm90TnVsbGFibGUgPVxucGV4cHJzLlJhbmdlLnByb3RvdHlwZS5hc3NlcnRJdGVyYXRlZEV4cHJzQXJlTm90TnVsbGFibGUgPVxucGV4cHJzLlBhcmFtLnByb3RvdHlwZS5hc3NlcnRJdGVyYXRlZEV4cHJzQXJlTm90TnVsbGFibGUgPVxucGV4cHJzLlVuaWNvZGVDaGFyLnByb3RvdHlwZS5hc3NlcnRJdGVyYXRlZEV4cHJzQXJlTm90TnVsbGFibGUgPSBmdW5jdGlvbihncmFtbWFyLCBydWxlTmFtZSkge1xuICAvLyBuby1vcFxufTtcblxucGV4cHJzLkFsdC5wcm90b3R5cGUuYXNzZXJ0SXRlcmF0ZWRFeHByc0FyZU5vdE51bGxhYmxlID0gZnVuY3Rpb24oZ3JhbW1hciwgcnVsZU5hbWUpIHtcbiAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgdGhpcy50ZXJtcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgdGhpcy50ZXJtc1tpZHhdLmFzc2VydEl0ZXJhdGVkRXhwcnNBcmVOb3ROdWxsYWJsZShncmFtbWFyLCBydWxlTmFtZSk7XG4gIH1cbn07XG5cbnBleHBycy5TZXEucHJvdG90eXBlLmFzc2VydEl0ZXJhdGVkRXhwcnNBcmVOb3ROdWxsYWJsZSA9IGZ1bmN0aW9uKGdyYW1tYXIsIHJ1bGVOYW1lKSB7XG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IHRoaXMuZmFjdG9ycy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgdGhpcy5mYWN0b3JzW2lkeF0uYXNzZXJ0SXRlcmF0ZWRFeHByc0FyZU5vdE51bGxhYmxlKGdyYW1tYXIsIHJ1bGVOYW1lKTtcbiAgfVxufTtcblxucGV4cHJzLkl0ZXIucHJvdG90eXBlLmFzc2VydEl0ZXJhdGVkRXhwcnNBcmVOb3ROdWxsYWJsZSA9IGZ1bmN0aW9uKGdyYW1tYXIsIHJ1bGVOYW1lKSB7XG4gIC8vIE5vdGU6IHRoaXMgaXMgdGhlIGltcGxlbWVudGF0aW9uIG9mIHRoaXMgbWV0aG9kIGZvciBgU3RhcmAgYW5kIGBQbHVzYCBleHByZXNzaW9ucy5cbiAgLy8gSXQgaXMgb3ZlcnJpZGRlbiBmb3IgYE9wdGAgYmVsb3cuXG4gIHRoaXMuZXhwci5hc3NlcnRJdGVyYXRlZEV4cHJzQXJlTm90TnVsbGFibGUoZ3JhbW1hciwgcnVsZU5hbWUpO1xuICBpZiAodGhpcy5leHByLmlzTnVsbGFibGUoZ3JhbW1hcikpIHtcbiAgICB0aHJvdyBlcnJvcnMua2xlZW5lRXhwckhhc051bGxhYmxlT3BlcmFuZCh0aGlzLCBydWxlTmFtZSk7XG4gIH1cbn07XG5cbnBleHBycy5PcHQucHJvdG90eXBlLmFzc2VydEl0ZXJhdGVkRXhwcnNBcmVOb3ROdWxsYWJsZSA9XG5wZXhwcnMuTm90LnByb3RvdHlwZS5hc3NlcnRJdGVyYXRlZEV4cHJzQXJlTm90TnVsbGFibGUgPVxucGV4cHJzLkxvb2thaGVhZC5wcm90b3R5cGUuYXNzZXJ0SXRlcmF0ZWRFeHByc0FyZU5vdE51bGxhYmxlID1cbnBleHBycy5MZXgucHJvdG90eXBlLmFzc2VydEl0ZXJhdGVkRXhwcnNBcmVOb3ROdWxsYWJsZSA9IGZ1bmN0aW9uKGdyYW1tYXIsIHJ1bGVOYW1lKSB7XG4gIHRoaXMuZXhwci5hc3NlcnRJdGVyYXRlZEV4cHJzQXJlTm90TnVsbGFibGUoZ3JhbW1hciwgcnVsZU5hbWUpO1xufTtcblxucGV4cHJzLkFwcGx5LnByb3RvdHlwZS5hc3NlcnRJdGVyYXRlZEV4cHJzQXJlTm90TnVsbGFibGUgPSBmdW5jdGlvbihncmFtbWFyLCBydWxlTmFtZSkge1xuICB0aGlzLmFyZ3MuZm9yRWFjaChmdW5jdGlvbihhcmcpIHtcbiAgICBhcmcuYXNzZXJ0SXRlcmF0ZWRFeHByc0FyZU5vdE51bGxhYmxlKGdyYW1tYXIsIHJ1bGVOYW1lKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uJyk7XG52YXIgbm9kZXMgPSByZXF1aXJlKCcuL25vZGVzJyk7XG52YXIgcGV4cHJzID0gcmVxdWlyZSgnLi9wZXhwcnMnKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIE9wZXJhdGlvbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnBleHBycy5QRXhwci5wcm90b3R5cGUuY2hlY2sgPSBjb21tb24uYWJzdHJhY3QoJ2NoZWNrJyk7XG5cbnBleHBycy5hbnkuY2hlY2sgPSBmdW5jdGlvbihncmFtbWFyLCB2YWxzKSB7XG4gIHJldHVybiB2YWxzLmxlbmd0aCA+PSAxO1xufTtcblxucGV4cHJzLmVuZC5jaGVjayA9IGZ1bmN0aW9uKGdyYW1tYXIsIHZhbHMpIHtcbiAgcmV0dXJuIHZhbHNbMF0gaW5zdGFuY2VvZiBub2Rlcy5Ob2RlICYmXG4gICAgICAgICB2YWxzWzBdLmlzVGVybWluYWwoKSAmJlxuICAgICAgICAgdmFsc1swXS5wcmltaXRpdmVWYWx1ZSA9PT0gdW5kZWZpbmVkO1xufTtcblxucGV4cHJzLlRlcm1pbmFsLnByb3RvdHlwZS5jaGVjayA9IGZ1bmN0aW9uKGdyYW1tYXIsIHZhbHMpIHtcbiAgcmV0dXJuIHZhbHNbMF0gaW5zdGFuY2VvZiBub2Rlcy5Ob2RlICYmXG4gICAgICAgICB2YWxzWzBdLmlzVGVybWluYWwoKSAmJlxuICAgICAgICAgdmFsc1swXS5wcmltaXRpdmVWYWx1ZSA9PT0gdGhpcy5vYmo7XG59O1xuXG5wZXhwcnMuUmFuZ2UucHJvdG90eXBlLmNoZWNrID0gZnVuY3Rpb24oZ3JhbW1hciwgdmFscykge1xuICByZXR1cm4gdmFsc1swXSBpbnN0YW5jZW9mIG5vZGVzLk5vZGUgJiZcbiAgICAgICAgIHZhbHNbMF0uaXNUZXJtaW5hbCgpICYmXG4gICAgICAgICB0eXBlb2YgdmFsc1swXS5wcmltaXRpdmVWYWx1ZSA9PT0gdHlwZW9mIHRoaXMuZnJvbTtcbn07XG5cbnBleHBycy5QYXJhbS5wcm90b3R5cGUuY2hlY2sgPSBmdW5jdGlvbihncmFtbWFyLCB2YWxzKSB7XG4gIHJldHVybiB2YWxzLmxlbmd0aCA+PSAxO1xufTtcblxucGV4cHJzLkFsdC5wcm90b3R5cGUuY2hlY2sgPSBmdW5jdGlvbihncmFtbWFyLCB2YWxzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy50ZXJtcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciB0ZXJtID0gdGhpcy50ZXJtc1tpXTtcbiAgICBpZiAodGVybS5jaGVjayhncmFtbWFyLCB2YWxzKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbnBleHBycy5TZXEucHJvdG90eXBlLmNoZWNrID0gZnVuY3Rpb24oZ3JhbW1hciwgdmFscykge1xuICB2YXIgcG9zID0gMDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmZhY3RvcnMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZmFjdG9yID0gdGhpcy5mYWN0b3JzW2ldO1xuICAgIGlmIChmYWN0b3IuY2hlY2soZ3JhbW1hciwgdmFscy5zbGljZShwb3MpKSkge1xuICAgICAgcG9zICs9IGZhY3Rvci5nZXRBcml0eSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufTtcblxucGV4cHJzLkl0ZXIucHJvdG90eXBlLmNoZWNrID0gZnVuY3Rpb24oZ3JhbW1hciwgdmFscykge1xuICB2YXIgYXJpdHkgPSB0aGlzLmdldEFyaXR5KCk7XG4gIHZhciBjb2x1bW5zID0gdmFscy5zbGljZSgwLCBhcml0eSk7XG4gIGlmIChjb2x1bW5zLmxlbmd0aCAhPT0gYXJpdHkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHJvd0NvdW50ID0gY29sdW1uc1swXS5sZW5ndGg7XG4gIHZhciBpO1xuICBmb3IgKGkgPSAxOyBpIDwgYXJpdHk7IGkrKykge1xuICAgIGlmIChjb2x1bW5zW2ldLmxlbmd0aCAhPT0gcm93Q291bnQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmb3IgKGkgPSAwOyBpIDwgcm93Q291bnQ7IGkrKykge1xuICAgIHZhciByb3cgPSBbXTtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IGFyaXR5OyBqKyspIHtcbiAgICAgIHJvdy5wdXNoKGNvbHVtbnNbal1baV0pO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuZXhwci5jaGVjayhncmFtbWFyLCByb3cpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5wZXhwcnMuTm90LnByb3RvdHlwZS5jaGVjayA9IGZ1bmN0aW9uKGdyYW1tYXIsIHZhbHMpIHtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5wZXhwcnMuTG9va2FoZWFkLnByb3RvdHlwZS5jaGVjayA9XG5wZXhwcnMuTGV4LnByb3RvdHlwZS5jaGVjayA9IGZ1bmN0aW9uKGdyYW1tYXIsIHZhbHMpIHtcbiAgcmV0dXJuIHRoaXMuZXhwci5jaGVjayhncmFtbWFyLCB2YWxzKTtcbn07XG5cbnBleHBycy5BcHBseS5wcm90b3R5cGUuY2hlY2sgPSBmdW5jdGlvbihncmFtbWFyLCB2YWxzKSB7XG4gIGlmICghKHZhbHNbMF0gaW5zdGFuY2VvZiBub2Rlcy5Ob2RlICYmXG4gICAgICAgIHZhbHNbMF0uZ3JhbW1hciA9PT0gZ3JhbW1hciAmJlxuICAgICAgICB2YWxzWzBdLmN0b3JOYW1lID09PSB0aGlzLnJ1bGVOYW1lKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIFRPRE86IHRoaW5rIGFib3V0ICpub3QqIGRvaW5nIHRoZSBmb2xsb3dpbmcgY2hlY2tzLCBpLmUuLCB0cnVzdGluZyB0aGF0IHRoZSBydWxlXG4gIC8vIHdhcyBjb3JyZWN0bHkgY29uc3RydWN0ZWQuXG4gIHZhciBydWxlTm9kZSA9IHZhbHNbMF07XG4gIHZhciBib2R5ID0gZ3JhbW1hci5ydWxlc1t0aGlzLnJ1bGVOYW1lXS5ib2R5O1xuICByZXR1cm4gYm9keS5jaGVjayhncmFtbWFyLCBydWxlTm9kZS5jaGlsZHJlbikgJiYgcnVsZU5vZGUubnVtQ2hpbGRyZW4oKSA9PT0gYm9keS5nZXRBcml0eSgpO1xufTtcblxucGV4cHJzLlVuaWNvZGVDaGFyLnByb3RvdHlwZS5jaGVjayA9IGZ1bmN0aW9uKGdyYW1tYXIsIHZhbHMpIHtcbiAgcmV0dXJuIHZhbHNbMF0gaW5zdGFuY2VvZiBub2Rlcy5Ob2RlICYmXG4gICAgICAgICB2YWxzWzBdLmlzVGVybWluYWwoKSAmJlxuICAgICAgICAgdHlwZW9mIHZhbHNbMF0ucHJpbWl0aXZlVmFsdWUgPT09ICdzdHJpbmcnO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBUcmFjZSA9IHJlcXVpcmUoJy4vVHJhY2UnKTtcbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbicpO1xudmFyIG5vZGVzID0gcmVxdWlyZSgnLi9ub2RlcycpO1xudmFyIHBleHBycyA9IHJlcXVpcmUoJy4vcGV4cHJzJyk7XG5cbnZhciBUZXJtaW5hbE5vZGUgPSBub2Rlcy5UZXJtaW5hbE5vZGU7XG52YXIgTm9udGVybWluYWxOb2RlID0gbm9kZXMuTm9udGVybWluYWxOb2RlO1xudmFyIEl0ZXJhdGlvbk5vZGUgPSBub2Rlcy5JdGVyYXRpb25Ob2RlO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gT3BlcmF0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLypcbiAgRXZhbHVhdGUgdGhlIGV4cHJlc3Npb24gYW5kIHJldHVybiBgdHJ1ZWAgaWYgaXQgc3VjY2VlZHMsIGBmYWxzZWAgb3RoZXJ3aXNlLiBUaGlzIG1ldGhvZCBzaG91bGRcbiAgb25seSBiZSBjYWxsZWQgZGlyZWN0bHkgYnkgYFN0YXRlLnByb3RvdHlwZS5ldmFsKGV4cHIpYCwgd2hpY2ggYWxzbyB1cGRhdGVzIHRoZSBkYXRhIHN0cnVjdHVyZXNcbiAgdGhhdCBhcmUgdXNlZCBmb3IgdHJhY2luZy4gKE1ha2luZyB0aG9zZSB1cGRhdGVzIGluIGEgbWV0aG9kIG9mIGBTdGF0ZWAgZW5hYmxlcyB0aGUgdHJhY2Utc3BlY2lmaWNcbiAgZGF0YSBzdHJ1Y3R1cmVzIHRvIGJlIFwic2VjcmV0c1wiIG9mIHRoYXQgY2xhc3MsIHdoaWNoIGlzIGdvb2QgZm9yIG1vZHVsYXJpdHkuKVxuXG4gIFRoZSBjb250cmFjdCBvZiB0aGlzIG1ldGhvZCBpcyBhcyBmb2xsb3dzOlxuICAqIFdoZW4gdGhlIHJldHVybiB2YWx1ZSBpcyBgdHJ1ZWAsXG4gICAgLSB0aGUgc3RhdGUgb2JqZWN0IHdpbGwgaGF2ZSBgZXhwci5nZXRBcml0eSgpYCBtb3JlIGJpbmRpbmdzIHRoYW4gaXQgZGlkIGJlZm9yZSB0aGUgY2FsbC5cbiAgKiBXaGVuIHRoZSByZXR1cm4gdmFsdWUgaXMgYGZhbHNlYCxcbiAgICAtIHRoZSBzdGF0ZSBvYmplY3QgbWF5IGhhdmUgbW9yZSBiaW5kaW5ncyB0aGFuIGl0IGRpZCBiZWZvcmUgdGhlIGNhbGwsIGFuZFxuICAgIC0gaXRzIGlucHV0IHN0cmVhbSdzIHBvc2l0aW9uIG1heSBiZSBhbnl3aGVyZS5cblxuICBOb3RlIHRoYXQgYFN0YXRlLnByb3RvdHlwZS5ldmFsKGV4cHIpYCwgdW5saWtlIHRoaXMgbWV0aG9kLCBndWFyYW50ZWVzIHRoYXQgbmVpdGhlciB0aGUgc3RhdGVcbiAgb2JqZWN0J3MgYmluZGluZ3Mgbm9yIGl0cyBpbnB1dCBzdHJlYW0ncyBwb3NpdGlvbiB3aWxsIGNoYW5nZSBpZiB0aGUgZXhwcmVzc2lvbiBmYWlscyB0byBtYXRjaC5cbiovXG5wZXhwcnMuUEV4cHIucHJvdG90eXBlLmV2YWwgPSBjb21tb24uYWJzdHJhY3QoJ2V2YWwnKTsgIC8vIGZ1bmN0aW9uKHN0YXRlKSB7IC4uLiB9XG5cbnBleHBycy5hbnkuZXZhbCA9IGZ1bmN0aW9uKHN0YXRlKSB7XG4gIHZhciBpbnB1dFN0cmVhbSA9IHN0YXRlLmlucHV0U3RyZWFtO1xuICB2YXIgb3JpZ1BvcyA9IGlucHV0U3RyZWFtLnBvcztcbiAgdmFyIGNoID0gaW5wdXRTdHJlYW0ubmV4dCgpO1xuICBpZiAoY2gpIHtcbiAgICB2YXIgc291cmNlID0gaW5wdXRTdHJlYW0uaW50ZXJ2YWwob3JpZ1Bvcyk7XG4gICAgc3RhdGUuYmluZGluZ3MucHVzaChuZXcgVGVybWluYWxOb2RlKHN0YXRlLmdyYW1tYXIsIGNoLCBzb3VyY2UpKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBzdGF0ZS5wcm9jZXNzRmFpbHVyZShvcmlnUG9zLCB0aGlzKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbnBleHBycy5lbmQuZXZhbCA9IGZ1bmN0aW9uKHN0YXRlKSB7XG4gIHZhciBpbnB1dFN0cmVhbSA9IHN0YXRlLmlucHV0U3RyZWFtO1xuICB2YXIgb3JpZ1BvcyA9IGlucHV0U3RyZWFtLnBvcztcbiAgaWYgKGlucHV0U3RyZWFtLmF0RW5kKCkpIHtcbiAgICB2YXIgc291cmNlID0gaW5wdXRTdHJlYW0uaW50ZXJ2YWwoaW5wdXRTdHJlYW0ucG9zKTtcbiAgICBzdGF0ZS5iaW5kaW5ncy5wdXNoKG5ldyBUZXJtaW5hbE5vZGUoc3RhdGUuZ3JhbW1hciwgdW5kZWZpbmVkLCBzb3VyY2UpKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBzdGF0ZS5wcm9jZXNzRmFpbHVyZShvcmlnUG9zLCB0aGlzKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbnBleHBycy5UZXJtaW5hbC5wcm90b3R5cGUuZXZhbCA9IGZ1bmN0aW9uKHN0YXRlKSB7XG4gIHZhciBpbnB1dFN0cmVhbSA9IHN0YXRlLmlucHV0U3RyZWFtO1xuICB2YXIgb3JpZ1BvcyA9IGlucHV0U3RyZWFtLnBvcztcbiAgaWYgKCFpbnB1dFN0cmVhbS5tYXRjaFN0cmluZyh0aGlzLm9iaikpIHtcbiAgICBzdGF0ZS5wcm9jZXNzRmFpbHVyZShvcmlnUG9zLCB0aGlzKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHNvdXJjZSA9IGlucHV0U3RyZWFtLmludGVydmFsKG9yaWdQb3MpO1xuICAgIHZhciBwcmltaXRpdmVWYWx1ZSA9IHRoaXMub2JqO1xuICAgIHN0YXRlLmJpbmRpbmdzLnB1c2gobmV3IFRlcm1pbmFsTm9kZShzdGF0ZS5ncmFtbWFyLCBwcmltaXRpdmVWYWx1ZSwgc291cmNlKSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cbnBleHBycy5SYW5nZS5wcm90b3R5cGUuZXZhbCA9IGZ1bmN0aW9uKHN0YXRlKSB7XG4gIHZhciBpbnB1dFN0cmVhbSA9IHN0YXRlLmlucHV0U3RyZWFtO1xuICB2YXIgb3JpZ1BvcyA9IGlucHV0U3RyZWFtLnBvcztcbiAgdmFyIGNoID0gaW5wdXRTdHJlYW0ubmV4dCgpO1xuICBpZiAoY2ggJiYgdGhpcy5mcm9tIDw9IGNoICYmIGNoIDw9IHRoaXMudG8pIHtcbiAgICB2YXIgc291cmNlID0gaW5wdXRTdHJlYW0uaW50ZXJ2YWwob3JpZ1Bvcyk7XG4gICAgc3RhdGUuYmluZGluZ3MucHVzaChuZXcgVGVybWluYWxOb2RlKHN0YXRlLmdyYW1tYXIsIGNoLCBzb3VyY2UpKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBzdGF0ZS5wcm9jZXNzRmFpbHVyZShvcmlnUG9zLCB0aGlzKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbnBleHBycy5QYXJhbS5wcm90b3R5cGUuZXZhbCA9IGZ1bmN0aW9uKHN0YXRlKSB7XG4gIHJldHVybiBzdGF0ZS5ldmFsKHN0YXRlLmN1cnJlbnRBcHBsaWNhdGlvbigpLmFyZ3NbdGhpcy5pbmRleF0pO1xufTtcblxucGV4cHJzLkxleC5wcm90b3R5cGUuZXZhbCA9IGZ1bmN0aW9uKHN0YXRlKSB7XG4gIHN0YXRlLmVudGVyTGV4aWZpZWRDb250ZXh0KCk7XG4gIHZhciBhbnMgPSBzdGF0ZS5ldmFsKHRoaXMuZXhwcik7XG4gIHN0YXRlLmV4aXRMZXhpZmllZENvbnRleHQoKTtcbiAgcmV0dXJuIGFucztcbn07XG5cbnBleHBycy5BbHQucHJvdG90eXBlLmV2YWwgPSBmdW5jdGlvbihzdGF0ZSkge1xuICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCB0aGlzLnRlcm1zLmxlbmd0aDsgaWR4KyspIHtcbiAgICBpZiAoc3RhdGUuZXZhbCh0aGlzLnRlcm1zW2lkeF0pKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxucGV4cHJzLlNlcS5wcm90b3R5cGUuZXZhbCA9IGZ1bmN0aW9uKHN0YXRlKSB7XG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IHRoaXMuZmFjdG9ycy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgdmFyIGZhY3RvciA9IHRoaXMuZmFjdG9yc1tpZHhdO1xuICAgIGlmICghc3RhdGUuZXZhbChmYWN0b3IpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufTtcblxucGV4cHJzLkl0ZXIucHJvdG90eXBlLmV2YWwgPSBmdW5jdGlvbihzdGF0ZSkge1xuICB2YXIgaW5wdXRTdHJlYW0gPSBzdGF0ZS5pbnB1dFN0cmVhbTtcbiAgdmFyIG9yaWdQb3MgPSBpbnB1dFN0cmVhbS5wb3M7XG4gIHZhciBhcml0eSA9IHRoaXMuZ2V0QXJpdHkoKTtcbiAgdmFyIGNvbHMgPSBbXTtcbiAgd2hpbGUgKGNvbHMubGVuZ3RoIDwgYXJpdHkpIHtcbiAgICBjb2xzLnB1c2goW10pO1xuICB9XG4gIHZhciBudW1NYXRjaGVzID0gMDtcbiAgdmFyIGlkeDtcbiAgd2hpbGUgKG51bU1hdGNoZXMgPCB0aGlzLm1heE51bU1hdGNoZXMgJiYgc3RhdGUuZXZhbCh0aGlzLmV4cHIpKSB7XG4gICAgbnVtTWF0Y2hlcysrO1xuICAgIHZhciByb3cgPSBzdGF0ZS5iaW5kaW5ncy5zcGxpY2Uoc3RhdGUuYmluZGluZ3MubGVuZ3RoIC0gYXJpdHksIGFyaXR5KTtcbiAgICBmb3IgKGlkeCA9IDA7IGlkeCA8IHJvdy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICBjb2xzW2lkeF0ucHVzaChyb3dbaWR4XSk7XG4gICAgfVxuICB9XG4gIGlmIChudW1NYXRjaGVzIDwgdGhpcy5taW5OdW1NYXRjaGVzKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBzb3VyY2U7XG4gIGlmIChudW1NYXRjaGVzID09PSAwKSB7XG4gICAgc291cmNlID0gaW5wdXRTdHJlYW0uaW50ZXJ2YWwob3JpZ1Bvcywgb3JpZ1Bvcyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGZpcnN0Q29sID0gY29sc1swXTtcbiAgICB2YXIgbGFzdENvbCA9IGNvbHNbY29scy5sZW5ndGggLSAxXTtcbiAgICBzb3VyY2UgPSBpbnB1dFN0cmVhbS5pbnRlcnZhbChcbiAgICAgICAgZmlyc3RDb2xbMF0uc291cmNlLnN0YXJ0SWR4LFxuICAgICAgICBsYXN0Q29sW2xhc3RDb2wubGVuZ3RoIC0gMV0uc291cmNlLmVuZElkeCk7XG4gIH1cbiAgZm9yIChpZHggPSAwOyBpZHggPCBjb2xzLmxlbmd0aDsgaWR4KyspIHtcbiAgICBzdGF0ZS5iaW5kaW5ncy5wdXNoKG5ldyBJdGVyYXRpb25Ob2RlKHN0YXRlLmdyYW1tYXIsIGNvbHNbaWR4XSwgc291cmNlLFxuICAgICAgdGhpcyBpbnN0YW5jZW9mIHBleHBycy5PcHQpKTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbnBleHBycy5Ob3QucHJvdG90eXBlLmV2YWwgPSBmdW5jdGlvbihzdGF0ZSkge1xuICAvKlxuICAgIFRPRE86XG4gICAgLSBSaWdodCBub3cgd2UncmUganVzdCB0aHJvd2luZyBhd2F5IGFsbCBvZiB0aGUgZmFpbHVyZXMgdGhhdCBoYXBwZW4gaW5zaWRlIGEgYG5vdGAsIGFuZFxuICAgICAgcmVjb3JkaW5nIGB0aGlzYCBhcyBhIGZhaWxlZCBleHByZXNzaW9uLlxuICAgIC0gRG91YmxlIG5lZ2F0aW9uIHNob3VsZCBiZSBlcXVpdmFsZW50IHRvIGxvb2thaGVhZCwgYnV0IHRoYXQncyBub3QgdGhlIGNhc2UgcmlnaHQgbm93IHdydFxuICAgICAgZmFpbHVyZXMuIEUuZy4sIH5+J2ZvbycgcHJvZHVjZXMgYSBmYWlsdXJlIGZvciB+fidmb28nLCBidXQgbWF5YmUgaXQgc2hvdWxkIHByb2R1Y2VcbiAgICAgIGEgZmFpbHVyZSBmb3IgJ2ZvbycgaW5zdGVhZC5cbiAgKi9cblxuICB2YXIgaW5wdXRTdHJlYW0gPSBzdGF0ZS5pbnB1dFN0cmVhbTtcbiAgdmFyIG9yaWdQb3MgPSBpbnB1dFN0cmVhbS5wb3M7XG4gIHZhciBmYWlsdXJlc0luZm8gPSBzdGF0ZS5nZXRGYWlsdXJlc0luZm8oKTtcblxuICB2YXIgYW5zID0gc3RhdGUuZXZhbCh0aGlzLmV4cHIpO1xuXG4gIHN0YXRlLnJlc3RvcmVGYWlsdXJlc0luZm8oZmFpbHVyZXNJbmZvKTtcbiAgaWYgKGFucykge1xuICAgIHN0YXRlLnByb2Nlc3NGYWlsdXJlKG9yaWdQb3MsIHRoaXMpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlucHV0U3RyZWFtLnBvcyA9IG9yaWdQb3M7XG4gIHJldHVybiB0cnVlO1xufTtcblxucGV4cHJzLkxvb2thaGVhZC5wcm90b3R5cGUuZXZhbCA9IGZ1bmN0aW9uKHN0YXRlKSB7XG4gIHZhciBpbnB1dFN0cmVhbSA9IHN0YXRlLmlucHV0U3RyZWFtO1xuICB2YXIgb3JpZ1BvcyA9IGlucHV0U3RyZWFtLnBvcztcbiAgaWYgKHN0YXRlLmV2YWwodGhpcy5leHByKSkge1xuICAgIGlucHV0U3RyZWFtLnBvcyA9IG9yaWdQb3M7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5wZXhwcnMuQXBwbHkucHJvdG90eXBlLmV2YWwgPSBmdW5jdGlvbihzdGF0ZSkge1xuICB2YXIgY2FsbGVyID0gc3RhdGUuY3VycmVudEFwcGxpY2F0aW9uKCk7XG4gIHZhciBhY3R1YWxzID0gY2FsbGVyID8gY2FsbGVyLmFyZ3MgOiBbXTtcbiAgdmFyIGFwcCA9IHRoaXMuc3Vic3RpdHV0ZVBhcmFtcyhhY3R1YWxzKTtcblxuICB2YXIgcG9zSW5mbyA9IHN0YXRlLmdldEN1cnJlbnRQb3NJbmZvKCk7XG4gIGlmIChwb3NJbmZvLmlzQWN0aXZlKGFwcCkpIHtcbiAgICAvLyBUaGlzIHJ1bGUgaXMgYWxyZWFkeSBhY3RpdmUgYXQgdGhpcyBwb3NpdGlvbiwgaS5lLiwgaXQgaXMgbGVmdC1yZWN1cnNpdmUuXG4gICAgcmV0dXJuIGFwcC5oYW5kbGVDeWNsZShzdGF0ZSk7XG4gIH1cblxuICB2YXIgbWVtb0tleSA9IGFwcC50b01lbW9LZXkoKTtcbiAgdmFyIG1lbW9SZWMgPSBwb3NJbmZvLm1lbW9bbWVtb0tleV07XG4gIHJldHVybiBtZW1vUmVjICYmIHBvc0luZm8uc2hvdWxkVXNlTWVtb2l6ZWRSZXN1bHQobWVtb1JlYykgP1xuICAgICAgc3RhdGUudXNlTWVtb2l6ZWRSZXN1bHQobWVtb1JlYykgOlxuICAgICAgYXBwLnJlYWxseUV2YWwoc3RhdGUpO1xufTtcblxucGV4cHJzLkFwcGx5LnByb3RvdHlwZS5oYW5kbGVDeWNsZSA9IGZ1bmN0aW9uKHN0YXRlKSB7XG4gIHZhciBwb3NJbmZvID0gc3RhdGUuZ2V0Q3VycmVudFBvc0luZm8oKTtcbiAgdmFyIGN1cnJlbnRMZWZ0UmVjdXJzaW9uID0gcG9zSW5mby5jdXJyZW50TGVmdFJlY3Vyc2lvbjtcbiAgdmFyIG1lbW9LZXkgPSB0aGlzLnRvTWVtb0tleSgpO1xuICB2YXIgbWVtb1JlYyA9IHBvc0luZm8ubWVtb1ttZW1vS2V5XTtcblxuICBpZiAoY3VycmVudExlZnRSZWN1cnNpb24gJiYgY3VycmVudExlZnRSZWN1cnNpb24uaGVhZEFwcGxpY2F0aW9uLnRvTWVtb0tleSgpID09PSBtZW1vS2V5KSB7XG4gICAgLy8gV2UgYWxyZWFkeSBrbm93IGFib3V0IHRoaXMgbGVmdCByZWN1cnNpb24sIGJ1dCBpdCdzIHBvc3NpYmxlIHRoZXJlIGFyZSBcImludm9sdmVkXG4gICAgLy8gYXBwbGljYXRpb25zXCIgdGhhdCB3ZSBkb24ndCBhbHJlYWR5IGtub3cgYWJvdXQsIHNvLi4uXG4gICAgbWVtb1JlYy51cGRhdGVJbnZvbHZlZEFwcGxpY2F0aW9uTWVtb0tleXMoKTtcbiAgfSBlbHNlIGlmICghbWVtb1JlYykge1xuICAgIC8vIE5ldyBsZWZ0IHJlY3Vyc2lvbiBkZXRlY3RlZCEgTWVtb2l6ZSBhIGZhaWx1cmUgdG8gdHJ5IHRvIGdldCBhIHNlZWQgcGFyc2UuXG4gICAgbWVtb1JlYyA9IHBvc0luZm8ubWVtb1ttZW1vS2V5XSA9IHtwb3M6IC0xLCB2YWx1ZTogZmFsc2V9O1xuICAgIHBvc0luZm8uc3RhcnRMZWZ0UmVjdXJzaW9uKHRoaXMsIG1lbW9SZWMpO1xuICB9XG4gIHJldHVybiBzdGF0ZS51c2VNZW1vaXplZFJlc3VsdChtZW1vUmVjKTtcbn07XG5cbnBleHBycy5BcHBseS5wcm90b3R5cGUucmVhbGx5RXZhbCA9IGZ1bmN0aW9uKHN0YXRlKSB7XG4gIHZhciBpbnB1dFN0cmVhbSA9IHN0YXRlLmlucHV0U3RyZWFtO1xuICB2YXIgb3JpZ1BvcyA9IGlucHV0U3RyZWFtLnBvcztcbiAgdmFyIG9yaWdQb3NJbmZvID0gc3RhdGUuZ2V0Q3VycmVudFBvc0luZm8oKTtcbiAgdmFyIHJ1bGVJbmZvID0gc3RhdGUuZ3JhbW1hci5ydWxlc1t0aGlzLnJ1bGVOYW1lXTtcbiAgdmFyIGJvZHkgPSBydWxlSW5mby5ib2R5O1xuICB2YXIgZGVzY3JpcHRpb24gPSBydWxlSW5mby5kZXNjcmlwdGlvbjtcblxuICBvcmlnUG9zSW5mby5lbnRlcih0aGlzKTtcblxuICB2YXIgb3JpZ0ZhaWx1cmVzSW5mbztcbiAgaWYgKGRlc2NyaXB0aW9uKSB7XG4gICAgb3JpZ0ZhaWx1cmVzSW5mbyA9IHN0YXRlLmdldEZhaWx1cmVzSW5mbygpO1xuICB9XG5cbiAgdmFyIHZhbHVlID0gdGhpcy5ldmFsT25jZShib2R5LCBzdGF0ZSk7XG4gIHZhciBjdXJyZW50TFIgPSBvcmlnUG9zSW5mby5jdXJyZW50TGVmdFJlY3Vyc2lvbjtcbiAgdmFyIG1lbW9LZXkgPSB0aGlzLnRvTWVtb0tleSgpO1xuICB2YXIgaXNIZWFkT2ZMZWZ0UmVjdXJzaW9uID0gISFjdXJyZW50TFIgJiYgY3VycmVudExSLmhlYWRBcHBsaWNhdGlvbi50b01lbW9LZXkoKSA9PT0gbWVtb0tleTtcbiAgdmFyIG1lbW9pemVkID0gdHJ1ZTtcblxuICBpZiAoaXNIZWFkT2ZMZWZ0UmVjdXJzaW9uKSB7XG4gICAgdmFsdWUgPSB0aGlzLmdyb3dTZWVkUmVzdWx0KGJvZHksIHN0YXRlLCBvcmlnUG9zLCBjdXJyZW50TFIsIHZhbHVlKTtcbiAgICBvcmlnUG9zSW5mby5lbmRMZWZ0UmVjdXJzaW9uKCk7XG4gIH0gZWxzZSBpZiAoY3VycmVudExSICYmIGN1cnJlbnRMUi5pc0ludm9sdmVkKG1lbW9LZXkpKSB7XG4gICAgLy8gRG9uJ3QgbWVtb2l6ZSB0aGUgcmVzdWx0XG4gICAgbWVtb2l6ZWQgPSBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICBvcmlnUG9zSW5mby5tZW1vW21lbW9LZXldID0ge1xuICAgICAgcG9zOiBpbnB1dFN0cmVhbS5wb3MsXG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBmYWlsdXJlc0F0UmlnaHRtb3N0UG9zaXRpb246IHN0YXRlLmNsb25lUmlnaHRtb3N0RmFpbHVyZXMoKVxuICAgIH07XG4gIH1cblxuICBpZiAoZGVzY3JpcHRpb24pIHtcbiAgICBzdGF0ZS5yZXN0b3JlRmFpbHVyZXNJbmZvKG9yaWdGYWlsdXJlc0luZm8pO1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHN0YXRlLnByb2Nlc3NGYWlsdXJlKG9yaWdQb3MsIHRoaXMpO1xuICAgIH1cblxuICAgIGlmIChtZW1vaXplZCkge1xuICAgICAgb3JpZ1Bvc0luZm8ubWVtb1ttZW1vS2V5XS5mYWlsdXJlc0F0UmlnaHRtb3N0UG9zaXRpb24gPSBzdGF0ZS5jbG9uZVJpZ2h0bW9zdEZhaWx1cmVzKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gUmVjb3JkIHRyYWNlIGluZm9ybWF0aW9uIGluIHRoZSBtZW1vIHRhYmxlLCBzbyB0aGF0IGl0IGlzIGF2YWlsYWJsZSBpZiB0aGUgbWVtb2l6ZWQgcmVzdWx0XG4gIC8vIGlzIHVzZWQgbGF0ZXIuXG4gIGlmIChzdGF0ZS5pc1RyYWNpbmcoKSAmJiBvcmlnUG9zSW5mby5tZW1vW21lbW9LZXldKSB7XG4gICAgdmFyIHN1Y2NlZWRlZCA9ICEhdmFsdWU7XG4gICAgdmFyIGVudHJ5ID0gc3RhdGUuZ2V0VHJhY2VFbnRyeShvcmlnUG9zLCB0aGlzLCBzdWNjZWVkZWQsIHN1Y2NlZWRlZCA/IFt2YWx1ZV0gOiBbXSk7XG4gICAgaWYgKGlzSGVhZE9mTGVmdFJlY3Vyc2lvbikge1xuICAgICAgY29tbW9uLmFzc2VydChlbnRyeS50ZXJtaW5hdGluZ0xSRW50cnkgIT0gbnVsbCB8fCAhc3VjY2VlZGVkKTtcbiAgICAgIGVudHJ5LmlzSGVhZE9mTGVmdFJlY3Vyc2lvbiA9IHRydWU7XG4gICAgfVxuICAgIG9yaWdQb3NJbmZvLm1lbW9bbWVtb0tleV0udHJhY2VFbnRyeSA9IGVudHJ5O1xuICB9XG5cbiAgb3JpZ1Bvc0luZm8uZXhpdCgpO1xuXG4gIGlmICh2YWx1ZSkge1xuICAgIHN0YXRlLmJpbmRpbmdzLnB1c2godmFsdWUpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxucGV4cHJzLkFwcGx5LnByb3RvdHlwZS5ldmFsT25jZSA9IGZ1bmN0aW9uKGV4cHIsIHN0YXRlKSB7XG4gIHZhciBpbnB1dFN0cmVhbSA9IHN0YXRlLmlucHV0U3RyZWFtO1xuICB2YXIgb3JpZ1BvcyA9IGlucHV0U3RyZWFtLnBvcztcblxuICBpZiAoc3RhdGUuZXZhbChleHByKSkge1xuICAgIHZhciBhcml0eSA9IGV4cHIuZ2V0QXJpdHkoKTtcbiAgICB2YXIgYmluZGluZ3MgPSBzdGF0ZS5iaW5kaW5ncy5zcGxpY2Uoc3RhdGUuYmluZGluZ3MubGVuZ3RoIC0gYXJpdHksIGFyaXR5KTtcbiAgICB2YXIgYW5zID1cbiAgICAgICAgbmV3IE5vbnRlcm1pbmFsTm9kZShzdGF0ZS5ncmFtbWFyLCB0aGlzLnJ1bGVOYW1lLCBiaW5kaW5ncywgaW5wdXRTdHJlYW0uaW50ZXJ2YWwob3JpZ1BvcykpO1xuICAgIHJldHVybiBhbnM7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5wZXhwcnMuQXBwbHkucHJvdG90eXBlLmdyb3dTZWVkUmVzdWx0ID0gZnVuY3Rpb24oYm9keSwgc3RhdGUsIG9yaWdQb3MsIGxyTWVtb1JlYywgbmV3VmFsdWUpIHtcbiAgaWYgKCFuZXdWYWx1ZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBpbnB1dFN0cmVhbSA9IHN0YXRlLmlucHV0U3RyZWFtO1xuXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgbHJNZW1vUmVjLnBvcyA9IGlucHV0U3RyZWFtLnBvcztcbiAgICBsck1lbW9SZWMudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICBsck1lbW9SZWMuZmFpbHVyZXNBdFJpZ2h0bW9zdFBvc2l0aW9uID0gc3RhdGUuY2xvbmVSaWdodG1vc3RGYWlsdXJlcygpO1xuXG4gICAgaWYgKHN0YXRlLmlzVHJhY2luZygpKSB7XG4gICAgICAvLyBCZWZvcmUgZXZhbHVhdGluZyB0aGUgYm9keSBhZ2FpbiwgYWRkIGEgdHJhY2Ugbm9kZSBmb3IgdGhpcyBhcHBsaWNhdGlvbiB0byB0aGUgbWVtbyBlbnRyeS5cbiAgICAgIC8vIEl0cyBvbmx5IGNoaWxkIGlzIGEgY29weSBvZiB0aGUgdHJhY2Ugbm9kZSBmcm9tIGBuZXdWYWx1ZWAsIHdoaWNoIHdpbGwgYWx3YXlzIGJlIHRoZSBsYXN0XG4gICAgICAvLyBlbGVtZW50IGluIGBzdGF0ZS50cmFjZWAuXG4gICAgICB2YXIgc2VlZFRyYWNlID0gc3RhdGUudHJhY2Vbc3RhdGUudHJhY2UubGVuZ3RoIC0gMV07XG4gICAgICBsck1lbW9SZWMudHJhY2VFbnRyeSA9IG5ldyBUcmFjZShcbiAgICAgICAgICBzdGF0ZS5pbnB1dFN0cmVhbSwgb3JpZ1BvcywgdGhpcywgdHJ1ZSwgW25ld1ZhbHVlXSwgW3NlZWRUcmFjZS5jbG9uZSgpXSk7XG4gICAgfVxuICAgIGlucHV0U3RyZWFtLnBvcyA9IG9yaWdQb3M7XG4gICAgbmV3VmFsdWUgPSB0aGlzLmV2YWxPbmNlKGJvZHksIHN0YXRlKTtcbiAgICBpZiAoaW5wdXRTdHJlYW0ucG9zIDw9IGxyTWVtb1JlYy5wb3MpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAoc3RhdGUuaXNUcmFjaW5nKCkpIHtcbiAgICAgIHN0YXRlLnRyYWNlLnNwbGljZSgtMiwgMSk7ICAvLyBEcm9wIHRoZSB0cmFjZSBmb3IgdGhlIG9sZCBzZWVkLlxuICAgIH1cbiAgfVxuICBpZiAoc3RhdGUuaXNUcmFjaW5nKCkpIHtcbiAgICAvLyBUaGUgbGFzdCBlbnRyeSBpcyBmb3IgYW4gdW51c2VkIHJlc3VsdCAtLSBwb3AgaXQgYW5kIHNhdmUgaXQgaW4gdGhlIFwicmVhbFwiIGVudHJ5LlxuICAgIGxyTWVtb1JlYy50cmFjZUVudHJ5LnJlY29yZExSVGVybWluYXRpb24oc3RhdGUudHJhY2UucG9wKCksIG5ld1ZhbHVlKTtcbiAgfVxuICBpbnB1dFN0cmVhbS5wb3MgPSBsck1lbW9SZWMucG9zO1xuICByZXR1cm4gbHJNZW1vUmVjLnZhbHVlO1xufTtcblxucGV4cHJzLlVuaWNvZGVDaGFyLnByb3RvdHlwZS5ldmFsID0gZnVuY3Rpb24oc3RhdGUpIHtcbiAgdmFyIGlucHV0U3RyZWFtID0gc3RhdGUuaW5wdXRTdHJlYW07XG4gIHZhciBvcmlnUG9zID0gaW5wdXRTdHJlYW0ucG9zO1xuICB2YXIgY2ggPSBpbnB1dFN0cmVhbS5uZXh0KCk7XG4gIGlmIChjaCAmJiB0aGlzLnBhdHRlcm4udGVzdChjaCkpIHtcbiAgICB2YXIgc291cmNlID0gaW5wdXRTdHJlYW0uaW50ZXJ2YWwob3JpZ1Bvcyk7XG4gICAgc3RhdGUuYmluZGluZ3MucHVzaChuZXcgVGVybWluYWxOb2RlKHN0YXRlLmdyYW1tYXIsIGNoLCBzb3VyY2UpKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBzdGF0ZS5wcm9jZXNzRmFpbHVyZShvcmlnUG9zLCB0aGlzKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24nKTtcbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSGVscGVyc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gZmxhdHRlbihsaXN0T2ZMaXN0cykge1xuICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmNvbmNhdC5hcHBseShbXSwgbGlzdE9mTGlzdHMpO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gT3BlcmF0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxucGV4cHJzLlBFeHByLnByb3RvdHlwZS5nZW5lcmF0ZUV4YW1wbGUgPSBjb21tb24uYWJzdHJhY3QoJ2dlbmVyYXRlRXhhbXBsZScpO1xuXG5wZXhwcnMuYW55LmdlbmVyYXRlRXhhbXBsZSA9IGZ1bmN0aW9uKGdyYW1tYXIsIGV4YW1wbGVzLCBpblN5bnRhY3RpY0NvbnRleHQsIGFjdHVhbHMpIHtcbiAgcmV0dXJuIHt2YWx1ZTogU3RyaW5nLmZyb21DaGFyQ29kZShNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTUpKX07XG59O1xuXG5mdW5jdGlvbiBjYXRlZ29yaXplRXhhbXBsZXMoZXhhbXBsZXMpIHtcbiAgLy8gQSBsaXN0IG9mIHJ1bGVzIHRoYXQgdGhlIHN5c3RlbSBuZWVkcyBleGFtcGxlcyBvZiwgaW4gb3JkZXIgdG8gZ2VuZXJhdGUgYW4gZXhhbXBsZVxuICAvLyAgIGZvciB0aGUgY3VycmVudCBydWxlXG4gIHZhciBleGFtcGxlc05lZWRlZCA9IGV4YW1wbGVzLmZpbHRlcihmdW5jdGlvbihleGFtcGxlKSB7XG4gICAgcmV0dXJuIGV4YW1wbGUuaGFzT3duUHJvcGVydHkoJ2V4YW1wbGVzTmVlZGVkJyk7XG4gIH0pXG4gIC5tYXAoZnVuY3Rpb24oZXhhbXBsZSkgeyByZXR1cm4gZXhhbXBsZS5leGFtcGxlc05lZWRlZDsgfSk7XG5cbiAgZXhhbXBsZXNOZWVkZWQgPSBmbGF0dGVuKGV4YW1wbGVzTmVlZGVkKTtcblxuICB2YXIgdW5pcXVlRXhhbXBsZXNOZWVkZWQgPSB7fTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBleGFtcGxlc05lZWRlZC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBjdXJyZW50RXhhbXBsZU5lZWRlZCA9IGV4YW1wbGVzTmVlZGVkW2ldO1xuICAgIHVuaXF1ZUV4YW1wbGVzTmVlZGVkW2N1cnJlbnRFeGFtcGxlTmVlZGVkXSA9IHRydWU7XG4gIH1cbiAgZXhhbXBsZXNOZWVkZWQgPSBPYmplY3Qua2V5cyh1bmlxdWVFeGFtcGxlc05lZWRlZCk7XG5cbiAgLy8gQSBsaXN0IG9mIHN1Y2Nlc3NmdWxseSBnZW5lcmF0ZWQgZXhhbXBsZXNcbiAgdmFyIHN1Y2Nlc3NmdWxFeGFtcGxlcyA9IGV4YW1wbGVzLmZpbHRlcihmdW5jdGlvbihleGFtcGxlKSB7XG4gICAgcmV0dXJuIGV4YW1wbGUuaGFzT3duUHJvcGVydHkoJ3ZhbHVlJyk7XG4gIH0pXG4gIC5tYXAoZnVuY3Rpb24oaXRlbSkgeyByZXR1cm4gaXRlbS52YWx1ZTsgfSk7XG5cbiAgLy8gVGhpcyBmbGFnIHJldHVybnMgdHJ1ZSBpZiB0aGUgc3lzdGVtIGNhbm5vdCBnZW5lcmF0ZSB0aGUgcnVsZSBpdCBpcyBjdXJyZW50bHlcbiAgLy8gICBhdHRlbXB0aW5nIHRvIGdlbmVyYXRlLCByZWdhcmRsZXNzIG9mIHdoZXRoZXIgb3Igbm90IGl0IGhhcyB0aGUgZXhhbXBsZXMgaXQgbmVlZHMuXG4gIC8vICAgQ3VycmVudGx5LCB0aGlzIGlzIG9ubHkgdXNlZCBpbiBvdmVycmlkaW5nIGdlbmVyYXRvcnMgdG8gcHJldmVudCB0aGUgc3lzdGVtIGZyb21cbiAgLy8gICBnZW5lcmF0aW5nIGV4YW1wbGVzIGZvciBjZXJ0YWluIHJ1bGVzIChlLmcuICdpZGVudCcpLlxuICB2YXIgbmVlZEhlbHAgPSBleGFtcGxlcy5zb21lKGZ1bmN0aW9uKGl0ZW0pIHsgcmV0dXJuIGl0ZW0ubmVlZEhlbHA7IH0pO1xuXG4gIHJldHVybiB7XG4gICAgZXhhbXBsZXNOZWVkZWQ6IGV4YW1wbGVzTmVlZGVkLFxuICAgIHN1Y2Nlc3NmdWxFeGFtcGxlczogc3VjY2Vzc2Z1bEV4YW1wbGVzLFxuICAgIG5lZWRIZWxwOiBuZWVkSGVscFxuICB9O1xufVxuXG5wZXhwcnMuQWx0LnByb3RvdHlwZS5nZW5lcmF0ZUV4YW1wbGUgPSBmdW5jdGlvbihncmFtbWFyLCBleGFtcGxlcywgaW5TeW50YWN0aWNDb250ZXh0LCBhY3R1YWxzKSB7XG4gIC8vIGl0ZW1zIC0+IHRlcm1FeGFtcGxlc1xuICB2YXIgdGVybUV4YW1wbGVzID0gdGhpcy50ZXJtcy5tYXAoZnVuY3Rpb24odGVybSkge1xuICAgIHJldHVybiB0ZXJtLmdlbmVyYXRlRXhhbXBsZShncmFtbWFyLCBleGFtcGxlcywgaW5TeW50YWN0aWNDb250ZXh0LCBhY3R1YWxzKTtcbiAgfSk7XG5cbiAgdmFyIGNhdGVnb3JpemVkRXhhbXBsZXMgPSBjYXRlZ29yaXplRXhhbXBsZXModGVybUV4YW1wbGVzKTtcblxuICB2YXIgZXhhbXBsZXNOZWVkZWQgPSBjYXRlZ29yaXplZEV4YW1wbGVzLmV4YW1wbGVzTmVlZGVkO1xuICB2YXIgc3VjY2Vzc2Z1bEV4YW1wbGVzID0gY2F0ZWdvcml6ZWRFeGFtcGxlcy5zdWNjZXNzZnVsRXhhbXBsZXM7XG4gIHZhciBuZWVkSGVscCA9IGNhdGVnb3JpemVkRXhhbXBsZXMubmVlZEhlbHA7XG5cbiAgdmFyIGFucyA9IHt9O1xuXG4gIC8vIEFsdCBjYW4gY29udGFpbiBib3RoIGFuIGV4YW1wbGUgYW5kIGEgcmVxdWVzdCBmb3IgZXhhbXBsZXNcbiAgaWYgKHN1Y2Nlc3NmdWxFeGFtcGxlcy5sZW5ndGggPiAwKSB7XG4gICAgdmFyIGkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzdWNjZXNzZnVsRXhhbXBsZXMubGVuZ3RoKTtcbiAgICBhbnMudmFsdWUgPSBzdWNjZXNzZnVsRXhhbXBsZXNbaV07XG4gIH1cbiAgaWYgKGV4YW1wbGVzTmVlZGVkLmxlbmd0aCA+IDApIHtcbiAgICBhbnMuZXhhbXBsZXNOZWVkZWQgPSBleGFtcGxlc05lZWRlZDtcbiAgfVxuICBhbnMubmVlZEhlbHAgPSBuZWVkSGVscDtcblxuICByZXR1cm4gYW5zO1xufTtcblxucGV4cHJzLlNlcS5wcm90b3R5cGUuZ2VuZXJhdGVFeGFtcGxlID0gZnVuY3Rpb24oZ3JhbW1hciwgZXhhbXBsZXMsIGluU3ludGFjdGljQ29udGV4dCwgYWN0dWFscykge1xuICB2YXIgZmFjdG9yRXhhbXBsZXMgPSB0aGlzLmZhY3RvcnMubWFwKGZ1bmN0aW9uKGZhY3Rvcikge1xuICAgIHJldHVybiBmYWN0b3IuZ2VuZXJhdGVFeGFtcGxlKGdyYW1tYXIsIGV4YW1wbGVzLCBpblN5bnRhY3RpY0NvbnRleHQsIGFjdHVhbHMpO1xuICB9KTtcbiAgdmFyIGNhdGVnb3JpemVkRXhhbXBsZXMgPSBjYXRlZ29yaXplRXhhbXBsZXMoZmFjdG9yRXhhbXBsZXMpO1xuXG4gIHZhciBleGFtcGxlc05lZWRlZCA9IGNhdGVnb3JpemVkRXhhbXBsZXMuZXhhbXBsZXNOZWVkZWQ7XG4gIHZhciBzdWNjZXNzZnVsRXhhbXBsZXMgPSBjYXRlZ29yaXplZEV4YW1wbGVzLnN1Y2Nlc3NmdWxFeGFtcGxlcztcbiAgdmFyIG5lZWRIZWxwID0gY2F0ZWdvcml6ZWRFeGFtcGxlcy5uZWVkSGVscDtcblxuICB2YXIgYW5zID0ge307XG5cbiAgLy8gSW4gYSBTZXEsIGFsbCBwaWVjZXMgbXVzdCBzdWNjZWVkIGluIG9yZGVyIHRvIGhhdmUgYSBzdWNjZXNzZnVsIGV4YW1wbGUuXG4gIGlmIChleGFtcGxlc05lZWRlZC5sZW5ndGggPiAwIHx8IG5lZWRIZWxwKSB7XG4gICAgYW5zLmV4YW1wbGVzTmVlZGVkID0gZXhhbXBsZXNOZWVkZWQ7XG4gICAgYW5zLm5lZWRIZWxwID0gbmVlZEhlbHA7XG4gIH0gZWxzZSB7XG4gICAgYW5zLnZhbHVlID0gc3VjY2Vzc2Z1bEV4YW1wbGVzLmpvaW4oaW5TeW50YWN0aWNDb250ZXh0ID8gJyAnIDogJycpO1xuICB9XG5cbiAgcmV0dXJuIGFucztcbn07XG5cbnBleHBycy5BcHBseS5wcm90b3R5cGUuZ2VuZXJhdGVFeGFtcGxlID0gZnVuY3Rpb24oZ3JhbW1hciwgZXhhbXBsZXMsIGluU3ludGFjdGljQ29udGV4dCwgYWN0dWFscykge1xuICB2YXIgYW5zID0ge307XG5cbiAgdmFyIHJ1bGVOYW1lID0gdGhpcy5zdWJzdGl0dXRlUGFyYW1zKGFjdHVhbHMpLnRvU3RyaW5nKCk7XG5cbiAgaWYgKCFleGFtcGxlcy5oYXNPd25Qcm9wZXJ0eShydWxlTmFtZSkpIHtcbiAgICBhbnMuZXhhbXBsZXNOZWVkZWQgPSBbcnVsZU5hbWVdO1xuICB9IGVsc2Uge1xuICAgIHZhciByZWxldmFudEV4YW1wbGVzID0gZXhhbXBsZXNbcnVsZU5hbWVdO1xuICAgIHZhciBpID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcmVsZXZhbnRFeGFtcGxlcy5sZW5ndGgpO1xuICAgIGFucy52YWx1ZSA9IHJlbGV2YW50RXhhbXBsZXNbaV07XG4gIH1cblxuICByZXR1cm4gYW5zO1xufTtcblxuLy8gQXNzdW1lcyB0aGF0IHRlcm1pbmFsJ3Mgb2JqZWN0IGlzIGFsd2F5cyBhIHN0cmluZ1xucGV4cHJzLlRlcm1pbmFsLnByb3RvdHlwZS5nZW5lcmF0ZUV4YW1wbGUgPSBmdW5jdGlvbihncmFtbWFyLCBleGFtcGxlcywgaW5TeW50YWN0aWNDb250ZXh0KSB7XG4gIHJldHVybiB7dmFsdWU6IHRoaXMub2JqfTtcbn07XG5cbnBleHBycy5SYW5nZS5wcm90b3R5cGUuZ2VuZXJhdGVFeGFtcGxlID0gZnVuY3Rpb24oZ3JhbW1hciwgZXhhbXBsZXMsIGluU3ludGFjdGljQ29udGV4dCkge1xuICB2YXIgcmFuZ2VTaXplID0gdGhpcy50by5jaGFyQ29kZUF0KDApIC0gdGhpcy5mcm9tLmNoYXJDb2RlQXQoMCk7XG4gIHJldHVybiB7dmFsdWU6IFN0cmluZy5mcm9tQ2hhckNvZGUoXG4gICAgdGhpcy5mcm9tLmNoYXJDb2RlQXQoMCkgKyBNYXRoLmZsb29yKHJhbmdlU2l6ZSAqIE1hdGgucmFuZG9tKCkpXG4gICl9O1xufTtcblxuLy8gVE9ETzogbWFrZSAnTm90JyBhbmQgJ0xvb2thaGVhZCcgYmVoYXZpb3VyIHNtYXJ0ZXJcbi8vIFJpZ2h0IG5vdywgJ05vdCcgYW5kICdMb29rYWhlYWQnIGdlbmVyYXRlIG5vdGhpbmcgYW5kIGFzc3VtZSB0aGF0IHdoYXRldmVyIGZvbGxvd3Mgd2lsbFxuLy8gICB3b3JrIGFjY29yZGluZyB0byB0aGUgZW5jb2RlZCBjb25zdHJhaW50cy5cbnBleHBycy5Ob3QucHJvdG90eXBlLmdlbmVyYXRlRXhhbXBsZSA9IGZ1bmN0aW9uKGdyYW1tYXIsIGV4YW1wbGVzLCBpblN5bnRhY3RpY0NvbnRleHQpIHtcbiAgcmV0dXJuIHt2YWx1ZTogJyd9O1xufTtcblxucGV4cHJzLkxvb2thaGVhZC5wcm90b3R5cGUuZ2VuZXJhdGVFeGFtcGxlID0gZnVuY3Rpb24oZ3JhbW1hciwgZXhhbXBsZXMsIGluU3ludGFjdGljQ29udGV4dCkge1xuICByZXR1cm4ge3ZhbHVlOiAnJ307XG59O1xuXG5wZXhwcnMuUGFyYW0ucHJvdG90eXBlLmdlbmVyYXRlRXhhbXBsZSA9IGZ1bmN0aW9uKGdyYW1tYXIsIGV4YW1wbGVzLCBpblN5bnRhY3RpY0NvbnRleHQsIGFjdHVhbHMpIHtcbiAgcmV0dXJuIGFjdHVhbHNbdGhpcy5pbmRleF0uZ2VuZXJhdGVFeGFtcGxlKGdyYW1tYXIsIGV4YW1wbGVzLCBpblN5bnRhY3RpY0NvbnRleHQsIGFjdHVhbHMpO1xufTtcblxuZnVuY3Rpb24gZ2VuZXJhdGVORXhhbXBsZXMocGV4cHIsIGdyYW1tYXIsIGV4YW1wbGVzLCBpblN5bnRhY3RpY0NvbnRleHQsIGFjdHVhbHMsIG51bVRpbWVzKSB7XG4gIHZhciBpdGVtcyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtVGltZXM7IGkrKykge1xuICAgIGl0ZW1zLnB1c2gocGV4cHIuZXhwci5nZW5lcmF0ZUV4YW1wbGUoZ3JhbW1hciwgZXhhbXBsZXMsIGluU3ludGFjdGljQ29udGV4dCwgYWN0dWFscykpO1xuICB9XG5cbiAgdmFyIGNhdGVnb3JpemVkRXhhbXBsZXMgPSBjYXRlZ29yaXplRXhhbXBsZXMoaXRlbXMpO1xuXG4gIHZhciBleGFtcGxlc05lZWRlZCA9IGNhdGVnb3JpemVkRXhhbXBsZXMuZXhhbXBsZXNOZWVkZWQ7XG4gIHZhciBzdWNjZXNzZnVsRXhhbXBsZXMgPSBjYXRlZ29yaXplZEV4YW1wbGVzLnN1Y2Nlc3NmdWxFeGFtcGxlcztcblxuICB2YXIgYW5zID0ge307XG5cbiAgLy8gSXQncyBhbHdheXMgZWl0aGVyIG9uZSBvciB0aGUgb3RoZXIuXG4gIC8vIFRPRE86IGluc3RlYWQgb2YgJyAnLCBjYWxsICdzcGFjZXMuZ2VuZXJhdGVFeGFtcGxlKCknXG4gIGFucy52YWx1ZSA9IHN1Y2Nlc3NmdWxFeGFtcGxlcy5qb2luKGluU3ludGFjdGljQ29udGV4dCA/ICcgJyA6ICcnKTtcbiAgaWYgKGV4YW1wbGVzTmVlZGVkLmxlbmd0aCA+IDApIHtcbiAgICBhbnMuZXhhbXBsZXNOZWVkZWQgPSBleGFtcGxlc05lZWRlZDtcbiAgfVxuXG4gIHJldHVybiBhbnM7XG59XG5cbnBleHBycy5TdGFyLnByb3RvdHlwZS5nZW5lcmF0ZUV4YW1wbGUgPSBmdW5jdGlvbihncmFtbWFyLCBleGFtcGxlcywgaW5TeW50YWN0aWNDb250ZXh0LCBhY3R1YWxzKSB7XG4gIHJldHVybiBnZW5lcmF0ZU5FeGFtcGxlcyh0aGlzLCBncmFtbWFyLCBleGFtcGxlcywgaW5TeW50YWN0aWNDb250ZXh0LCBhY3R1YWxzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNCkpO1xufTtcblxucGV4cHJzLlBsdXMucHJvdG90eXBlLmdlbmVyYXRlRXhhbXBsZSA9IGZ1bmN0aW9uKGdyYW1tYXIsIGV4YW1wbGVzLCBpblN5bnRhY3RpY0NvbnRleHQsIGFjdHVhbHMpIHtcbiAgcmV0dXJuIGdlbmVyYXRlTkV4YW1wbGVzKHRoaXMsIGdyYW1tYXIsIGV4YW1wbGVzLCBpblN5bnRhY3RpY0NvbnRleHQsIGFjdHVhbHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAzICsgMSkpO1xufTtcblxucGV4cHJzLk9wdC5wcm90b3R5cGUuZ2VuZXJhdGVFeGFtcGxlID0gZnVuY3Rpb24oZ3JhbW1hciwgZXhhbXBsZXMsIGluU3ludGFjdGljQ29udGV4dCwgYWN0dWFscykge1xuICByZXR1cm4gZ2VuZXJhdGVORXhhbXBsZXModGhpcywgZ3JhbW1hciwgZXhhbXBsZXMsIGluU3ludGFjdGljQ29udGV4dCwgYWN0dWFscyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpKTtcbn07XG5cbnBleHBycy5Vbmljb2RlQ2hhci5wcm90b3R5cGUuZ2VuZXJhdGVFeGFtcGxlID0gZnVuY3Rpb24oXG4gICAgZ3JhbW1hciwgZXhhbXBsZXMsIGluU3ludGFjdGljQ29udGV4dCwgYWN0dWFscykge1xuICB2YXIgY2hhcjtcbiAgc3dpdGNoICh0aGlzLmNhdGVnb3J5KSB7XG4gICAgY2FzZSAnTHUnOiBjaGFyID0gJ8OBJzsgYnJlYWs7XG4gICAgY2FzZSAnTGwnOiBjaGFyID0gJ8WPJzsgYnJlYWs7XG4gICAgY2FzZSAnTHQnOiBjaGFyID0gJ8eFJzsgYnJlYWs7XG4gICAgY2FzZSAnTG0nOiBjaGFyID0gJ8uuJzsgYnJlYWs7XG4gICAgY2FzZSAnTG8nOiBjaGFyID0gJ8a7JzsgYnJlYWs7XG5cbiAgICBjYXNlICdObCc6IGNoYXIgPSAn4oaCJzsgYnJlYWs7XG4gICAgY2FzZSAnTmQnOiBjaGFyID0gJ8K9JzsgYnJlYWs7XG5cbiAgICBjYXNlICdNbic6IGNoYXIgPSAnXFx1MDQ4Nyc7IGJyZWFrO1xuICAgIGNhc2UgJ01jJzogY2hhciA9ICfgpL8nOyBicmVhaztcblxuICAgIGNhc2UgJ1BjJzogY2hhciA9ICfigYAnOyBicmVhaztcblxuICAgIGNhc2UgJ1pzJzogY2hhciA9ICdcXHUyMDAxJzsgYnJlYWs7XG5cbiAgICBjYXNlICdMJzogY2hhciA9ICfDgSc7IGJyZWFrO1xuICAgIGNhc2UgJ0x0bW8nOiBjaGFyID0gJ8eFJzsgYnJlYWs7XG4gIH1cbiAgcmV0dXJuIHt2YWx1ZTogY2hhcn07IC8vIPCfkqlcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24nKTtcbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gT3BlcmF0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxucGV4cHJzLlBFeHByLnByb3RvdHlwZS5nZXRBcml0eSA9IGNvbW1vbi5hYnN0cmFjdCgnZ2V0QXJpdHknKTtcblxucGV4cHJzLmFueS5nZXRBcml0eSA9XG5wZXhwcnMuZW5kLmdldEFyaXR5ID1cbnBleHBycy5UZXJtaW5hbC5wcm90b3R5cGUuZ2V0QXJpdHkgPVxucGV4cHJzLlJhbmdlLnByb3RvdHlwZS5nZXRBcml0eSA9XG5wZXhwcnMuUGFyYW0ucHJvdG90eXBlLmdldEFyaXR5ID1cbnBleHBycy5BcHBseS5wcm90b3R5cGUuZ2V0QXJpdHkgPVxucGV4cHJzLlVuaWNvZGVDaGFyLnByb3RvdHlwZS5nZXRBcml0eSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gMTtcbn07XG5cbnBleHBycy5BbHQucHJvdG90eXBlLmdldEFyaXR5ID0gZnVuY3Rpb24oKSB7XG4gIC8vIFRoaXMgaXMgb2sgYi9jIGFsbCB0ZXJtcyBtdXN0IGhhdmUgdGhlIHNhbWUgYXJpdHkgLS0gdGhpcyBwcm9wZXJ0eSBpc1xuICAvLyBjaGVja2VkIGJ5IHRoZSBHcmFtbWFyIGNvbnN0cnVjdG9yLlxuICByZXR1cm4gdGhpcy50ZXJtcy5sZW5ndGggPT09IDAgPyAwIDogdGhpcy50ZXJtc1swXS5nZXRBcml0eSgpO1xufTtcblxucGV4cHJzLlNlcS5wcm90b3R5cGUuZ2V0QXJpdHkgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGFyaXR5ID0gMDtcbiAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgdGhpcy5mYWN0b3JzLmxlbmd0aDsgaWR4KyspIHtcbiAgICBhcml0eSArPSB0aGlzLmZhY3RvcnNbaWR4XS5nZXRBcml0eSgpO1xuICB9XG4gIHJldHVybiBhcml0eTtcbn07XG5cbnBleHBycy5JdGVyLnByb3RvdHlwZS5nZXRBcml0eSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5leHByLmdldEFyaXR5KCk7XG59O1xuXG5wZXhwcnMuTm90LnByb3RvdHlwZS5nZXRBcml0eSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gMDtcbn07XG5cbnBleHBycy5Mb29rYWhlYWQucHJvdG90eXBlLmdldEFyaXR5ID1cbnBleHBycy5MZXgucHJvdG90eXBlLmdldEFyaXR5ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmV4cHIuZ2V0QXJpdHkoKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24nKTtcbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gT3BlcmF0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLypcbiAgQ2FsbGVkIGF0IGdyYW1tYXIgY3JlYXRpb24gdGltZSB0byByZXdyaXRlIGEgcnVsZSBib2R5LCByZXBsYWNpbmcgZWFjaCByZWZlcmVuY2UgdG8gYSBmb3JtYWxcbiAgcGFyYW1ldGVyIHdpdGggYSBgUGFyYW1gIG5vZGUuIFJldHVybnMgYSBQRXhwciAtLSBlaXRoZXIgYSBuZXcgb25lLCBvciB0aGUgb3JpZ2luYWwgb25lIGlmXG4gIGl0IHdhcyBtb2RpZmllZCBpbiBwbGFjZS5cbiovXG5wZXhwcnMuUEV4cHIucHJvdG90eXBlLmludHJvZHVjZVBhcmFtcyA9IGNvbW1vbi5hYnN0cmFjdCgnaW50cm9kdWNlUGFyYW1zJyk7XG5cbnBleHBycy5hbnkuaW50cm9kdWNlUGFyYW1zID1cbnBleHBycy5lbmQuaW50cm9kdWNlUGFyYW1zID1cbnBleHBycy5UZXJtaW5hbC5wcm90b3R5cGUuaW50cm9kdWNlUGFyYW1zID1cbnBleHBycy5SYW5nZS5wcm90b3R5cGUuaW50cm9kdWNlUGFyYW1zID1cbnBleHBycy5QYXJhbS5wcm90b3R5cGUuaW50cm9kdWNlUGFyYW1zID1cbnBleHBycy5Vbmljb2RlQ2hhci5wcm90b3R5cGUuaW50cm9kdWNlUGFyYW1zID0gZnVuY3Rpb24oZm9ybWFscykge1xuICByZXR1cm4gdGhpcztcbn07XG5cbnBleHBycy5BbHQucHJvdG90eXBlLmludHJvZHVjZVBhcmFtcyA9IGZ1bmN0aW9uKGZvcm1hbHMpIHtcbiAgdGhpcy50ZXJtcy5mb3JFYWNoKGZ1bmN0aW9uKHRlcm0sIGlkeCwgdGVybXMpIHtcbiAgICB0ZXJtc1tpZHhdID0gdGVybS5pbnRyb2R1Y2VQYXJhbXMoZm9ybWFscyk7XG4gIH0pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbnBleHBycy5TZXEucHJvdG90eXBlLmludHJvZHVjZVBhcmFtcyA9IGZ1bmN0aW9uKGZvcm1hbHMpIHtcbiAgdGhpcy5mYWN0b3JzLmZvckVhY2goZnVuY3Rpb24oZmFjdG9yLCBpZHgsIGZhY3RvcnMpIHtcbiAgICBmYWN0b3JzW2lkeF0gPSBmYWN0b3IuaW50cm9kdWNlUGFyYW1zKGZvcm1hbHMpO1xuICB9KTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5wZXhwcnMuSXRlci5wcm90b3R5cGUuaW50cm9kdWNlUGFyYW1zID1cbnBleHBycy5Ob3QucHJvdG90eXBlLmludHJvZHVjZVBhcmFtcyA9XG5wZXhwcnMuTG9va2FoZWFkLnByb3RvdHlwZS5pbnRyb2R1Y2VQYXJhbXMgPVxucGV4cHJzLkxleC5wcm90b3R5cGUuaW50cm9kdWNlUGFyYW1zID0gZnVuY3Rpb24oZm9ybWFscykge1xuICB0aGlzLmV4cHIgPSB0aGlzLmV4cHIuaW50cm9kdWNlUGFyYW1zKGZvcm1hbHMpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbnBleHBycy5BcHBseS5wcm90b3R5cGUuaW50cm9kdWNlUGFyYW1zID0gZnVuY3Rpb24oZm9ybWFscykge1xuICB2YXIgaW5kZXggPSBmb3JtYWxzLmluZGV4T2YodGhpcy5ydWxlTmFtZSk7XG4gIGlmIChpbmRleCA+PSAwKSB7XG4gICAgaWYgKHRoaXMuYXJncy5sZW5ndGggPiAwKSB7XG4gICAgICAvLyBUT0RPOiBTaG91bGQgdGhpcyBiZSBzdXBwb3J0ZWQ/IFNlZSBpc3N1ZSAjNjQuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhcmFtZXRlcml6ZWQgcnVsZXMgY2Fubm90IGJlIHBhc3NlZCBhcyBhcmd1bWVudHMgdG8gYW5vdGhlciBydWxlLicpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IHBleHBycy5QYXJhbShpbmRleCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5hcmdzLmZvckVhY2goZnVuY3Rpb24oYXJnLCBpZHgsIGFyZ3MpIHtcbiAgICAgIGFyZ3NbaWR4XSA9IGFyZy5pbnRyb2R1Y2VQYXJhbXMoZm9ybWFscyk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24nKTtcbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gT3BlcmF0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gUmV0dXJucyBgdHJ1ZWAgaWYgdGhpcyBwYXJzaW5nIGV4cHJlc3Npb24gbWF5IGFjY2VwdCB3aXRob3V0IGNvbnN1bWluZyBhbnkgaW5wdXQuXG5wZXhwcnMuUEV4cHIucHJvdG90eXBlLmlzTnVsbGFibGUgPSBmdW5jdGlvbihncmFtbWFyKSB7XG4gIHJldHVybiB0aGlzLl9pc051bGxhYmxlKGdyYW1tYXIsIE9iamVjdC5jcmVhdGUobnVsbCkpO1xufTtcblxucGV4cHJzLlBFeHByLnByb3RvdHlwZS5faXNOdWxsYWJsZSA9IGNvbW1vbi5hYnN0cmFjdCgnX2lzTnVsbGFibGUnKTtcblxucGV4cHJzLmFueS5faXNOdWxsYWJsZSA9XG5wZXhwcnMuUmFuZ2UucHJvdG90eXBlLl9pc051bGxhYmxlID1cbnBleHBycy5QYXJhbS5wcm90b3R5cGUuX2lzTnVsbGFibGUgPVxucGV4cHJzLlBsdXMucHJvdG90eXBlLl9pc051bGxhYmxlID1cbnBleHBycy5Vbmljb2RlQ2hhci5wcm90b3R5cGUuX2lzTnVsbGFibGUgPSBmdW5jdGlvbihncmFtbWFyLCBtZW1vKSB7XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbnBleHBycy5lbmQuX2lzTnVsbGFibGUgPSBmdW5jdGlvbihncmFtbWFyLCBtZW1vKSB7XG4gIHJldHVybiB0cnVlO1xufTtcblxucGV4cHJzLlRlcm1pbmFsLnByb3RvdHlwZS5faXNOdWxsYWJsZSA9IGZ1bmN0aW9uKGdyYW1tYXIsIG1lbW8pIHtcbiAgaWYgKHR5cGVvZiB0aGlzLm9iaiA9PT0gJ3N0cmluZycpIHtcbiAgICAvLyBUaGlzIGlzIGFuIG92ZXItc2ltcGxpZmljYXRpb246IGl0J3Mgb25seSBjb3JyZWN0IGlmIHRoZSBpbnB1dCBpcyBhIHN0cmluZy4gSWYgaXQncyBhbiBhcnJheVxuICAgIC8vIG9yIGFuIG9iamVjdCwgdGhlbiB0aGUgZW1wdHkgc3RyaW5nIHBhcnNpbmcgZXhwcmVzc2lvbiBpcyBub3QgbnVsbGFibGUuXG4gICAgcmV0dXJuIHRoaXMub2JqID09PSAnJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbnBleHBycy5BbHQucHJvdG90eXBlLl9pc051bGxhYmxlID0gZnVuY3Rpb24oZ3JhbW1hciwgbWVtbykge1xuICByZXR1cm4gdGhpcy50ZXJtcy5sZW5ndGggPT09IDAgfHxcbiAgICAgIHRoaXMudGVybXMuc29tZShmdW5jdGlvbih0ZXJtKSB7IHJldHVybiB0ZXJtLl9pc051bGxhYmxlKGdyYW1tYXIsIG1lbW8pOyB9KTtcbn07XG5cbnBleHBycy5TZXEucHJvdG90eXBlLl9pc051bGxhYmxlID0gZnVuY3Rpb24oZ3JhbW1hciwgbWVtbykge1xuICByZXR1cm4gdGhpcy5mYWN0b3JzLmV2ZXJ5KGZ1bmN0aW9uKGZhY3RvcikgeyByZXR1cm4gZmFjdG9yLl9pc051bGxhYmxlKGdyYW1tYXIsIG1lbW8pOyB9KTtcbn07XG5cbnBleHBycy5TdGFyLnByb3RvdHlwZS5faXNOdWxsYWJsZSA9XG5wZXhwcnMuT3B0LnByb3RvdHlwZS5faXNOdWxsYWJsZSA9XG5wZXhwcnMuTm90LnByb3RvdHlwZS5faXNOdWxsYWJsZSA9XG5wZXhwcnMuTG9va2FoZWFkLnByb3RvdHlwZS5faXNOdWxsYWJsZSA9IGZ1bmN0aW9uKGdyYW1tYXIsIG1lbW8pIHtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5wZXhwcnMuTGV4LnByb3RvdHlwZS5faXNOdWxsYWJsZSA9IGZ1bmN0aW9uKGdyYW1tYXIsIG1lbW8pIHtcbiAgcmV0dXJuIHRoaXMuZXhwci5faXNOdWxsYWJsZShncmFtbWFyLCBtZW1vKTtcbn07XG5cbnBleHBycy5BcHBseS5wcm90b3R5cGUuX2lzTnVsbGFibGUgPSBmdW5jdGlvbihncmFtbWFyLCBtZW1vKSB7XG4gIHZhciBrZXkgPSB0aGlzLnRvTWVtb0tleSgpO1xuICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtZW1vLCBrZXkpKSB7XG4gICAgdmFyIGJvZHkgPSBncmFtbWFyLnJ1bGVzW3RoaXMucnVsZU5hbWVdLmJvZHk7XG4gICAgdmFyIGlubGluZWQgPSBib2R5LnN1YnN0aXR1dGVQYXJhbXModGhpcy5hcmdzKTtcbiAgICBtZW1vW2tleV0gPSBmYWxzZTsgIC8vIFByZXZlbnQgaW5maW5pdGUgcmVjdXJzaW9uIGZvciByZWN1cnNpdmUgcnVsZXMuXG4gICAgbWVtb1trZXldID0gaW5saW5lZC5faXNOdWxsYWJsZShncmFtbWFyLCBtZW1vKTtcbiAgfVxuICByZXR1cm4gbWVtb1trZXldO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbicpO1xudmFyIHBleHBycyA9IHJlcXVpcmUoJy4vcGV4cHJzJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBQcml2YXRlIHN0dWZmXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBnZXRNZXRhSW5mbyhleHByLCBncmFtbWFySW50ZXJ2YWwpIHtcbiAgdmFyIG1ldGFJbmZvID0ge307XG4gIGlmIChleHByLnNvdXJjZSAmJiBncmFtbWFySW50ZXJ2YWwpIHtcbiAgICB2YXIgYWRqdXN0ZWQgPSBleHByLnNvdXJjZS5yZWxhdGl2ZVRvKGdyYW1tYXJJbnRlcnZhbCk7XG4gICAgbWV0YUluZm8uc291cmNlSW50ZXJ2YWwgPSBbYWRqdXN0ZWQuc3RhcnRJZHgsIGFkanVzdGVkLmVuZElkeF07XG4gIH1cbiAgcmV0dXJuIG1ldGFJbmZvO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gT3BlcmF0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxucGV4cHJzLlBFeHByLnByb3RvdHlwZS5vdXRwdXRSZWNpcGUgPSBjb21tb24uYWJzdHJhY3QoJ291dHB1dFJlY2lwZScpO1xuXG5wZXhwcnMuYW55Lm91dHB1dFJlY2lwZSA9IGZ1bmN0aW9uKGZvcm1hbHMsIGdyYW1tYXJJbnRlcnZhbCkge1xuICByZXR1cm4gWydhbnknLCBnZXRNZXRhSW5mbyh0aGlzLCBncmFtbWFySW50ZXJ2YWwpXTtcbn07XG5cbnBleHBycy5lbmQub3V0cHV0UmVjaXBlID0gZnVuY3Rpb24oZm9ybWFscywgZ3JhbW1hckludGVydmFsKSB7XG4gIHJldHVybiBbJ2VuZCcsIGdldE1ldGFJbmZvKHRoaXMsIGdyYW1tYXJJbnRlcnZhbCldO1xufTtcblxucGV4cHJzLlRlcm1pbmFsLnByb3RvdHlwZS5vdXRwdXRSZWNpcGUgPSBmdW5jdGlvbihmb3JtYWxzLCBncmFtbWFySW50ZXJ2YWwpIHtcbiAgcmV0dXJuIFtcbiAgICAndGVybWluYWwnLFxuICAgIGdldE1ldGFJbmZvKHRoaXMsIGdyYW1tYXJJbnRlcnZhbCksXG4gICAgdGhpcy5vYmpcbiAgXTtcbn07XG5cbnBleHBycy5SYW5nZS5wcm90b3R5cGUub3V0cHV0UmVjaXBlID0gZnVuY3Rpb24oZm9ybWFscywgZ3JhbW1hckludGVydmFsKSB7XG4gIHJldHVybiBbXG4gICAgJ3JhbmdlJyxcbiAgICBnZXRNZXRhSW5mbyh0aGlzLCBncmFtbWFySW50ZXJ2YWwpLFxuICAgIHRoaXMuZnJvbSxcbiAgICB0aGlzLnRvXG4gIF07XG59O1xuXG5wZXhwcnMuUGFyYW0ucHJvdG90eXBlLm91dHB1dFJlY2lwZSA9IGZ1bmN0aW9uKGZvcm1hbHMsIGdyYW1tYXJJbnRlcnZhbCkge1xuICByZXR1cm4gW1xuICAgICdwYXJhbScsXG4gICAgZ2V0TWV0YUluZm8odGhpcywgZ3JhbW1hckludGVydmFsKSxcbiAgICB0aGlzLmluZGV4XG4gIF07XG59O1xuXG5wZXhwcnMuQWx0LnByb3RvdHlwZS5vdXRwdXRSZWNpcGUgPSBmdW5jdGlvbihmb3JtYWxzLCBncmFtbWFySW50ZXJ2YWwpIHtcbiAgcmV0dXJuIFtcbiAgICAnYWx0JyxcbiAgICBnZXRNZXRhSW5mbyh0aGlzLCBncmFtbWFySW50ZXJ2YWwpXG4gIF0uY29uY2F0KHRoaXMudGVybXMubWFwKGZ1bmN0aW9uKHRlcm0pIHtcbiAgICByZXR1cm4gdGVybS5vdXRwdXRSZWNpcGUoZm9ybWFscywgZ3JhbW1hckludGVydmFsKTtcbiAgfSkpO1xufTtcblxucGV4cHJzLkV4dGVuZC5wcm90b3R5cGUub3V0cHV0UmVjaXBlID0gZnVuY3Rpb24oZm9ybWFscywgZ3JhbW1hckludGVydmFsKSB7XG4gIHZhciBleHRlbnNpb24gPSB0aGlzLnRlcm1zWzBdOyAvLyBbZXh0ZW5zaW9uLCBvcmdpbmFsXVxuICByZXR1cm4gZXh0ZW5zaW9uLm91dHB1dFJlY2lwZShmb3JtYWxzLCBncmFtbWFySW50ZXJ2YWwpO1xufTtcblxucGV4cHJzLlNlcS5wcm90b3R5cGUub3V0cHV0UmVjaXBlID0gZnVuY3Rpb24oZm9ybWFscywgZ3JhbW1hckludGVydmFsKSB7XG4gIHJldHVybiBbXG4gICAgJ3NlcScsXG4gICAgZ2V0TWV0YUluZm8odGhpcywgZ3JhbW1hckludGVydmFsKVxuICBdLmNvbmNhdCh0aGlzLmZhY3RvcnMubWFwKGZ1bmN0aW9uKGZhY3Rvcikge1xuICAgIHJldHVybiBmYWN0b3Iub3V0cHV0UmVjaXBlKGZvcm1hbHMsIGdyYW1tYXJJbnRlcnZhbCk7XG4gIH0pKTtcbn07XG5cbnBleHBycy5TdGFyLnByb3RvdHlwZS5vdXRwdXRSZWNpcGUgPVxucGV4cHJzLlBsdXMucHJvdG90eXBlLm91dHB1dFJlY2lwZSA9XG5wZXhwcnMuT3B0LnByb3RvdHlwZS5vdXRwdXRSZWNpcGUgPVxucGV4cHJzLk5vdC5wcm90b3R5cGUub3V0cHV0UmVjaXBlID1cbnBleHBycy5Mb29rYWhlYWQucHJvdG90eXBlLm91dHB1dFJlY2lwZSA9XG5wZXhwcnMuTGV4LnByb3RvdHlwZS5vdXRwdXRSZWNpcGUgPSBmdW5jdGlvbihmb3JtYWxzLCBncmFtbWFySW50ZXJ2YWwpIHtcbiAgcmV0dXJuIFtcbiAgICB0aGlzLmNvbnN0cnVjdG9yLm5hbWUudG9Mb3dlckNhc2UoKSxcbiAgICBnZXRNZXRhSW5mbyh0aGlzLCBncmFtbWFySW50ZXJ2YWwpLFxuICAgIHRoaXMuZXhwci5vdXRwdXRSZWNpcGUoZm9ybWFscywgZ3JhbW1hckludGVydmFsKVxuICBdO1xufTtcblxucGV4cHJzLkFwcGx5LnByb3RvdHlwZS5vdXRwdXRSZWNpcGUgPSBmdW5jdGlvbihmb3JtYWxzLCBncmFtbWFySW50ZXJ2YWwpIHtcbiAgcmV0dXJuIFtcbiAgICAnYXBwJyxcbiAgICBnZXRNZXRhSW5mbyh0aGlzLCBncmFtbWFySW50ZXJ2YWwpLFxuICAgIHRoaXMucnVsZU5hbWUsXG4gICAgdGhpcy5hcmdzLm1hcChmdW5jdGlvbihhcmcpIHtcbiAgICAgIHJldHVybiBhcmcub3V0cHV0UmVjaXBlKGZvcm1hbHMsIGdyYW1tYXJJbnRlcnZhbCk7XG4gICAgfSlcbiAgXTtcbn07XG5cbnBleHBycy5Vbmljb2RlQ2hhci5wcm90b3R5cGUub3V0cHV0UmVjaXBlID0gZnVuY3Rpb24oZm9ybWFscywgZ3JhbW1hckludGVydmFsKSB7XG4gIHJldHVybiBbXG4gICAgJ3VuaWNvZGVDaGFyJyxcbiAgICBnZXRNZXRhSW5mbyh0aGlzLCBncmFtbWFySW50ZXJ2YWwpLFxuICAgIHRoaXMuY2F0ZWdvcnlcbiAgXTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24nKTtcbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gT3BlcmF0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLypcbiAgUmV0dXJucyBhIFBFeHByIHRoYXQgcmVzdWx0cyBmcm9tIHJlY3Vyc2l2ZWx5IHJlcGxhY2luZyBldmVyeSBmb3JtYWwgcGFyYW1ldGVyIChpLmUuLCBpbnN0YW5jZVxuICBvZiBgUGFyYW1gKSBpbnNpZGUgdGhpcyBQRXhwciB3aXRoIGl0cyBhY3R1YWwgdmFsdWUgZnJvbSBgYWN0dWFsc2AgKGFuIEFycmF5KS5cblxuICBUaGUgcmVjZWl2ZXIgbXVzdCBub3QgYmUgbW9kaWZpZWQ7IGEgbmV3IFBFeHByIG11c3QgYmUgcmV0dXJuZWQgaWYgYW55IHJlcGxhY2VtZW50IGlzIG5lY2Vzc2FyeS5cbiovXG4vLyBmdW5jdGlvbihhY3R1YWxzKSB7IC4uLiB9XG5wZXhwcnMuUEV4cHIucHJvdG90eXBlLnN1YnN0aXR1dGVQYXJhbXMgPSBjb21tb24uYWJzdHJhY3QoJ3N1YnN0aXR1dGVQYXJhbXMnKTtcblxucGV4cHJzLmFueS5zdWJzdGl0dXRlUGFyYW1zID1cbnBleHBycy5lbmQuc3Vic3RpdHV0ZVBhcmFtcyA9XG5wZXhwcnMuVGVybWluYWwucHJvdG90eXBlLnN1YnN0aXR1dGVQYXJhbXMgPVxucGV4cHJzLlJhbmdlLnByb3RvdHlwZS5zdWJzdGl0dXRlUGFyYW1zID1cbnBleHBycy5UZXJtaW5hbC5wcm90b3R5cGUuc3Vic3RpdHV0ZVBhcmFtcyA9XG5wZXhwcnMuVW5pY29kZUNoYXIucHJvdG90eXBlLnN1YnN0aXR1dGVQYXJhbXMgPSBmdW5jdGlvbihhY3R1YWxzKSB7XG4gIHJldHVybiB0aGlzO1xufTtcblxucGV4cHJzLlBhcmFtLnByb3RvdHlwZS5zdWJzdGl0dXRlUGFyYW1zID0gZnVuY3Rpb24oYWN0dWFscykge1xuICByZXR1cm4gYWN0dWFsc1t0aGlzLmluZGV4XTtcbn07XG5cbnBleHBycy5BbHQucHJvdG90eXBlLnN1YnN0aXR1dGVQYXJhbXMgPSBmdW5jdGlvbihhY3R1YWxzKSB7XG4gIHJldHVybiBuZXcgcGV4cHJzLkFsdChcbiAgICAgIHRoaXMudGVybXMubWFwKGZ1bmN0aW9uKHRlcm0pIHsgcmV0dXJuIHRlcm0uc3Vic3RpdHV0ZVBhcmFtcyhhY3R1YWxzKTsgfSkpO1xufTtcblxucGV4cHJzLlNlcS5wcm90b3R5cGUuc3Vic3RpdHV0ZVBhcmFtcyA9IGZ1bmN0aW9uKGFjdHVhbHMpIHtcbiAgcmV0dXJuIG5ldyBwZXhwcnMuU2VxKFxuICAgICAgdGhpcy5mYWN0b3JzLm1hcChmdW5jdGlvbihmYWN0b3IpIHsgcmV0dXJuIGZhY3Rvci5zdWJzdGl0dXRlUGFyYW1zKGFjdHVhbHMpOyB9KSk7XG59O1xuXG5wZXhwcnMuSXRlci5wcm90b3R5cGUuc3Vic3RpdHV0ZVBhcmFtcyA9XG5wZXhwcnMuTm90LnByb3RvdHlwZS5zdWJzdGl0dXRlUGFyYW1zID1cbnBleHBycy5Mb29rYWhlYWQucHJvdG90eXBlLnN1YnN0aXR1dGVQYXJhbXMgPVxucGV4cHJzLkxleC5wcm90b3R5cGUuc3Vic3RpdHV0ZVBhcmFtcyA9IGZ1bmN0aW9uKGFjdHVhbHMpIHtcbiAgcmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yKHRoaXMuZXhwci5zdWJzdGl0dXRlUGFyYW1zKGFjdHVhbHMpKTtcbn07XG5cbnBleHBycy5BcHBseS5wcm90b3R5cGUuc3Vic3RpdHV0ZVBhcmFtcyA9IGZ1bmN0aW9uKGFjdHVhbHMpIHtcbiAgaWYgKHRoaXMuYXJncy5sZW5ndGggPT09IDApIHtcbiAgICAvLyBBdm9pZCBtYWtpbmcgYSBjb3B5IG9mIHRoaXMgYXBwbGljYXRpb24sIGFzIGFuIG9wdGltaXphdGlvblxuICAgIHJldHVybiB0aGlzO1xuICB9IGVsc2Uge1xuICAgIHZhciBhcmdzID0gdGhpcy5hcmdzLm1hcChmdW5jdGlvbihhcmcpIHsgcmV0dXJuIGFyZy5zdWJzdGl0dXRlUGFyYW1zKGFjdHVhbHMpOyB9KTtcbiAgICByZXR1cm4gbmV3IHBleHBycy5BcHBseSh0aGlzLnJ1bGVOYW1lLCBhcmdzKTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbicpO1xudmFyIHBleHBycyA9IHJlcXVpcmUoJy4vcGV4cHJzJyk7XG5cbnZhciBjb3B5V2l0aG91dER1cGxpY2F0ZXMgPSBjb21tb24uY29weVdpdGhvdXREdXBsaWNhdGVzO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUHJpdmF0ZSBzdHVmZlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gaXNSZXN0cmljdGVkSlNJZGVudGlmaWVyKHN0cikge1xuICByZXR1cm4gL15bYS16QS1aXyRdWzAtOWEtekEtWl8kXSokLy50ZXN0KHN0cik7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVEdXBsaWNhdGVkTmFtZXMoYXJndW1lbnROYW1lTGlzdCkge1xuICAvLyBgY291bnRgIGlzIHVzZWQgdG8gcmVjb3JkIHRoZSBudW1iZXIgb2YgdGltZXMgZWFjaCBhcmd1bWVudCBuYW1lIG9jY3VycyBpbiB0aGUgbGlzdCxcbiAgLy8gdGhpcyBpcyB1c2VmdWwgZm9yIGNoZWNraW5nIGR1cGxpY2F0ZWQgYXJndW1lbnQgbmFtZS4gSXQgbWFwcyBhcmd1bWVudCBuYW1lcyB0byBpbnRzLlxuICB2YXIgY291bnQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBhcmd1bWVudE5hbWVMaXN0LmZvckVhY2goZnVuY3Rpb24oYXJnTmFtZSkge1xuICAgIGNvdW50W2FyZ05hbWVdID0gKGNvdW50W2FyZ05hbWVdIHx8IDApICsgMTtcbiAgfSk7XG5cbiAgLy8gQXBwZW5kIHN1YnNjcmlwdHMgKCdfMScsICdfMicsIC4uLikgdG8gZHVwbGljYXRlIGFyZ3VtZW50IG5hbWVzLlxuICBPYmplY3Qua2V5cyhjb3VudCkuZm9yRWFjaChmdW5jdGlvbihkdXBBcmdOYW1lKSB7XG4gICAgaWYgKGNvdW50W2R1cEFyZ05hbWVdIDw9IDEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBUaGlzIG5hbWUgc2hvd3MgdXAgbW9yZSB0aGFuIG9uY2UsIHNvIGFkZCBzdWJzY3JpcHRzLlxuICAgIHZhciBzdWJzY3JpcHQgPSAxO1xuICAgIGFyZ3VtZW50TmFtZUxpc3QuZm9yRWFjaChmdW5jdGlvbihhcmdOYW1lLCBpZHgpIHtcbiAgICAgIGlmIChhcmdOYW1lID09PSBkdXBBcmdOYW1lKSB7XG4gICAgICAgIGFyZ3VtZW50TmFtZUxpc3RbaWR4XSA9IGFyZ05hbWUgKyAnXycgKyBzdWJzY3JpcHQrKztcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBPcGVyYXRpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vKlxuICBSZXR1cm5zIGEgbGlzdCBvZiBzdHJpbmdzIHRoYXQgd2lsbCBiZSB1c2VkIGFzIHRoZSBkZWZhdWx0IGFyZ3VtZW50IG5hbWVzIGZvciBpdHMgcmVjZWl2ZXJcbiAgKGEgcGV4cHIpIGluIGEgc2VtYW50aWMgYWN0aW9uLiBUaGlzIGlzIHVzZWQgZXhjbHVzaXZlbHkgYnkgdGhlIFNlbWFudGljcyBFZGl0b3IuXG5cbiAgYGZpcnN0QXJnSW5kZXhgIGlzIHRoZSAxLWJhc2VkIGluZGV4IG9mIHRoZSBmaXJzdCBhcmd1bWVudCBuYW1lIHRoYXQgd2lsbCBiZSBnZW5lcmF0ZWQgZm9yIHRoaXNcbiAgcGV4cHIuIEl0IGVuYWJsZXMgdXMgdG8gbmFtZSBhcmd1bWVudHMgcG9zaXRpb25hbGx5LCBlLmcuLCBpZiB0aGUgc2Vjb25kIGFyZ3VtZW50IGlzIGFcbiAgbm9uLWFscGhhbnVtZXJpYyB0ZXJtaW5hbCBsaWtlIFwiK1wiLCBpdCB3aWxsIGJlIG5hbWVkICckMicuXG5cbiAgYG5vRHVwQ2hlY2tgIGlzIHRydWUgaWYgdGhlIGNhbGxlciBvZiBgdG9Bcmd1bWVudE5hbWVMaXN0YCBpcyBub3QgYSB0b3AgbGV2ZWwgY2FsbGVyLiBJdCBlbmFibGVzXG4gIHVzIHRvIGF2b2lkIG5lc3RlZCBkdXBsaWNhdGlvbiBzdWJzY3JpcHRzIGFwcGVuZGluZywgZS5nLiwgJ18xXzEnLCAnXzFfMicsIGJ5IG9ubHkgY2hlY2tpbmdcbiAgZHVwbGljYXRlcyBhdCB0aGUgdG9wIGxldmVsLlxuXG4gIEhlcmUgaXMgYSBtb3JlIGVsYWJvcmF0ZSBleGFtcGxlIHRoYXQgaWxsdXN0cmF0ZXMgaG93IHRoaXMgbWV0aG9kIHdvcmtzOlxuICBgKGEgXCIrXCIgYikudG9Bcmd1bWVudE5hbWVMaXN0KDEpYCBldmFsdWF0ZXMgdG8gYFsnYScsICckMicsICdiJ11gIHdpdGggdGhlIGZvbGxvd2luZyByZWN1cnNpdmVcbiAgY2FsbHM6XG5cbiAgICAoYSkudG9Bcmd1bWVudE5hbWVMaXN0KDEpIC0+IFsnYSddLFxuICAgIChcIitcIikudG9Bcmd1bWVudE5hbWVMaXN0KDIpIC0+IFsnJDInXSxcbiAgICAoYikudG9Bcmd1bWVudE5hbWVMaXN0KDMpIC0+IFsnYiddXG5cbiAgTm90ZXM6XG4gICogVGhpcyBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCBvbiB3ZWxsLWZvcm1lZCBleHByZXNzaW9ucywgZS5nLiwgdGhlIHJlY2VpdmVyIG11c3RcbiAgICBub3QgaGF2ZSBhbnkgQWx0IHN1Yi1leHByZXNzaW9ucyB3aXRoIGluY29uc2lzdGVudCBhcml0aWVzLlxuICAqIGUuZ2V0QXJpdHkoKSA9PT0gZS50b0FyZ3VtZW50TmFtZUxpc3QoMSkubGVuZ3RoXG4qL1xuLy8gZnVuY3Rpb24oZmlyc3RBcmdJbmRleCwgbm9EdXBDaGVjaykgeyAuLi4gfVxucGV4cHJzLlBFeHByLnByb3RvdHlwZS50b0FyZ3VtZW50TmFtZUxpc3QgPSBjb21tb24uYWJzdHJhY3QoJ3RvQXJndW1lbnROYW1lTGlzdCcpO1xuXG5wZXhwcnMuYW55LnRvQXJndW1lbnROYW1lTGlzdCA9IGZ1bmN0aW9uKGZpcnN0QXJnSW5kZXgsIG5vRHVwQ2hlY2spIHtcbiAgcmV0dXJuIFsnYW55J107XG59O1xuXG5wZXhwcnMuZW5kLnRvQXJndW1lbnROYW1lTGlzdCA9IGZ1bmN0aW9uKGZpcnN0QXJnSW5kZXgsIG5vRHVwQ2hlY2spIHtcbiAgcmV0dXJuIFsnZW5kJ107XG59O1xuXG5wZXhwcnMuVGVybWluYWwucHJvdG90eXBlLnRvQXJndW1lbnROYW1lTGlzdCA9IGZ1bmN0aW9uKGZpcnN0QXJnSW5kZXgsIG5vRHVwQ2hlY2spIHtcbiAgaWYgKHR5cGVvZiB0aGlzLm9iaiA9PT0gJ3N0cmluZycgJiYgL15bX2EtekEtWjAtOV0rJC8udGVzdCh0aGlzLm9iaikpIHtcbiAgICAvLyBJZiB0aGlzIHRlcm1pbmFsIGlzIGEgdmFsaWQgc3VmZml4IGZvciBhIEpTIGlkZW50aWZpZXIsIGp1c3QgcHJlcGVuZCBpdCB3aXRoICdfJ1xuICAgIHJldHVybiBbJ18nICsgdGhpcy5vYmpdO1xuICB9IGVsc2Uge1xuICAgIC8vIE90aGVyd2lzZSwgbmFtZSBpdCBwb3NpdGlvbmFsbHkuXG4gICAgcmV0dXJuIFsnJCcgKyBmaXJzdEFyZ0luZGV4XTtcbiAgfVxufTtcblxucGV4cHJzLlJhbmdlLnByb3RvdHlwZS50b0FyZ3VtZW50TmFtZUxpc3QgPSBmdW5jdGlvbihmaXJzdEFyZ0luZGV4LCBub0R1cENoZWNrKSB7XG4gIHZhciBhcmdOYW1lID0gdGhpcy5mcm9tICsgJ190b18nICsgdGhpcy50bztcbiAgLy8gSWYgdGhlIGBhcmdOYW1lYCBpcyBub3QgdmFsaWQgdGhlbiB0cnkgdG8gcHJlcGVuZCBhIGBfYC5cbiAgaWYgKCFpc1Jlc3RyaWN0ZWRKU0lkZW50aWZpZXIoYXJnTmFtZSkpIHtcbiAgICBhcmdOYW1lID0gJ18nICsgYXJnTmFtZTtcbiAgfVxuICAvLyBJZiB0aGUgYGFyZ05hbWVgIHN0aWxsIG5vdCB2YWxpZCBhZnRlciBwcmVwZW5kaW5nIGEgYF9gLCB0aGVuIG5hbWUgaXQgcG9zaXRpb25hbGx5LlxuICBpZiAoIWlzUmVzdHJpY3RlZEpTSWRlbnRpZmllcihhcmdOYW1lKSkge1xuICAgIGFyZ05hbWUgPSAnJCcgKyBmaXJzdEFyZ0luZGV4O1xuICB9XG4gIHJldHVybiBbYXJnTmFtZV07XG59O1xuXG5wZXhwcnMuQWx0LnByb3RvdHlwZS50b0FyZ3VtZW50TmFtZUxpc3QgPSBmdW5jdGlvbihmaXJzdEFyZ0luZGV4LCBub0R1cENoZWNrKSB7XG4gIC8vIGB0ZXJtQXJnTmFtZUxpc3RzYCBpcyBhbiBhcnJheSBvZiBhcnJheXMgd2hlcmUgZWFjaCByb3cgaXMgdGhlXG4gIC8vIGFyZ3VtZW50IG5hbWUgbGlzdCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEgdGVybSBpbiB0aGlzIGFsdGVybmF0aW9uLlxuICB2YXIgdGVybUFyZ05hbWVMaXN0cyA9IHRoaXMudGVybXMubWFwKGZ1bmN0aW9uKHRlcm0pIHtcbiAgICByZXR1cm4gdGVybS50b0FyZ3VtZW50TmFtZUxpc3QoZmlyc3RBcmdJbmRleCwgdHJ1ZSk7XG4gIH0pO1xuXG4gIHZhciBhcmd1bWVudE5hbWVMaXN0ID0gW107XG4gIHZhciBudW1BcmdzID0gdGVybUFyZ05hbWVMaXN0c1swXS5sZW5ndGg7XG4gIGZvciAodmFyIGNvbElkeCA9IDA7IGNvbElkeCA8IG51bUFyZ3M7IGNvbElkeCsrKSB7XG4gICAgdmFyIGNvbCA9IFtdO1xuICAgIGZvciAodmFyIHJvd0lkeCA9IDA7IHJvd0lkeCA8IHRoaXMudGVybXMubGVuZ3RoOyByb3dJZHgrKykge1xuICAgICAgY29sLnB1c2godGVybUFyZ05hbWVMaXN0c1tyb3dJZHhdW2NvbElkeF0pO1xuICAgIH1cbiAgICB2YXIgdW5pcXVlTmFtZXMgPSBjb3B5V2l0aG91dER1cGxpY2F0ZXMoY29sKTtcbiAgICBhcmd1bWVudE5hbWVMaXN0LnB1c2godW5pcXVlTmFtZXMuam9pbignX29yXycpKTtcbiAgfVxuXG4gIGlmICghbm9EdXBDaGVjaykge1xuICAgIHJlc29sdmVEdXBsaWNhdGVkTmFtZXMoYXJndW1lbnROYW1lTGlzdCk7XG4gIH1cbiAgcmV0dXJuIGFyZ3VtZW50TmFtZUxpc3Q7XG59O1xuXG5wZXhwcnMuU2VxLnByb3RvdHlwZS50b0FyZ3VtZW50TmFtZUxpc3QgPSBmdW5jdGlvbihmaXJzdEFyZ0luZGV4LCBub0R1cENoZWNrKSB7XG4gIC8vIEdlbmVyYXRlIHRoZSBhcmd1bWVudCBuYW1lIGxpc3QsIHdpdGhvdXQgd29ycnlpbmcgYWJvdXQgZHVwbGljYXRlcy5cbiAgdmFyIGFyZ3VtZW50TmFtZUxpc3QgPSBbXTtcbiAgdGhpcy5mYWN0b3JzLmZvckVhY2goZnVuY3Rpb24oZmFjdG9yKSB7XG4gICAgdmFyIGZhY3RvckFyZ3VtZW50TmFtZUxpc3QgPSBmYWN0b3IudG9Bcmd1bWVudE5hbWVMaXN0KGZpcnN0QXJnSW5kZXgsIHRydWUpO1xuICAgIGFyZ3VtZW50TmFtZUxpc3QgPSBhcmd1bWVudE5hbWVMaXN0LmNvbmNhdChmYWN0b3JBcmd1bWVudE5hbWVMaXN0KTtcblxuICAgIC8vIFNoaWZ0IHRoZSBmaXJzdEFyZ0luZGV4IHRvIHRha2UgdGhpcyBmYWN0b3IncyBhcmd1bWVudCBuYW1lcyBpbnRvIGFjY291bnQuXG4gICAgZmlyc3RBcmdJbmRleCArPSBmYWN0b3JBcmd1bWVudE5hbWVMaXN0Lmxlbmd0aDtcbiAgfSk7XG4gIGlmICghbm9EdXBDaGVjaykge1xuICAgIHJlc29sdmVEdXBsaWNhdGVkTmFtZXMoYXJndW1lbnROYW1lTGlzdCk7XG4gIH1cbiAgcmV0dXJuIGFyZ3VtZW50TmFtZUxpc3Q7XG59O1xuXG5wZXhwcnMuSXRlci5wcm90b3R5cGUudG9Bcmd1bWVudE5hbWVMaXN0ID0gZnVuY3Rpb24oZmlyc3RBcmdJbmRleCwgbm9EdXBDaGVjaykge1xuICB2YXIgYXJndW1lbnROYW1lTGlzdCA9IHRoaXMuZXhwci50b0FyZ3VtZW50TmFtZUxpc3QoZmlyc3RBcmdJbmRleCwgbm9EdXBDaGVjaylcbiAgICAubWFwKGZ1bmN0aW9uKGV4cHJBcmd1bWVudFN0cmluZykge1xuICAgICAgcmV0dXJuIGV4cHJBcmd1bWVudFN0cmluZ1tleHByQXJndW1lbnRTdHJpbmcubGVuZ3RoIC0gMV0gPT09ICdzJyA/XG4gICAgICAgICAgZXhwckFyZ3VtZW50U3RyaW5nICsgJ2VzJyA6XG4gICAgICAgICAgZXhwckFyZ3VtZW50U3RyaW5nICsgJ3MnO1xuICAgIH0pO1xuICBpZiAoIW5vRHVwQ2hlY2spIHtcbiAgICByZXNvbHZlRHVwbGljYXRlZE5hbWVzKGFyZ3VtZW50TmFtZUxpc3QpO1xuICB9XG4gIHJldHVybiBhcmd1bWVudE5hbWVMaXN0O1xufTtcblxucGV4cHJzLk9wdC5wcm90b3R5cGUudG9Bcmd1bWVudE5hbWVMaXN0ID0gZnVuY3Rpb24oZmlyc3RBcmdJbmRleCwgbm9EdXBDaGVjaykge1xuICByZXR1cm4gdGhpcy5leHByLnRvQXJndW1lbnROYW1lTGlzdChmaXJzdEFyZ0luZGV4LCBub0R1cENoZWNrKS5tYXAoZnVuY3Rpb24oYXJnTmFtZSkge1xuICAgIHJldHVybiAnb3B0JyArIGFyZ05hbWVbMF0udG9VcHBlckNhc2UoKSArIGFyZ05hbWUuc2xpY2UoMSk7XG4gIH0pO1xufTtcblxucGV4cHJzLk5vdC5wcm90b3R5cGUudG9Bcmd1bWVudE5hbWVMaXN0ID0gZnVuY3Rpb24oZmlyc3RBcmdJbmRleCwgbm9EdXBDaGVjaykge1xuICByZXR1cm4gW107XG59O1xuXG5wZXhwcnMuTG9va2FoZWFkLnByb3RvdHlwZS50b0FyZ3VtZW50TmFtZUxpc3QgPVxucGV4cHJzLkxleC5wcm90b3R5cGUudG9Bcmd1bWVudE5hbWVMaXN0ID0gZnVuY3Rpb24oZmlyc3RBcmdJbmRleCwgbm9EdXBDaGVjaykge1xuICByZXR1cm4gdGhpcy5leHByLnRvQXJndW1lbnROYW1lTGlzdChmaXJzdEFyZ0luZGV4LCBub0R1cENoZWNrKTtcbn07XG5cbnBleHBycy5BcHBseS5wcm90b3R5cGUudG9Bcmd1bWVudE5hbWVMaXN0ID0gZnVuY3Rpb24oZmlyc3RBcmdJbmRleCwgbm9EdXBDaGVjaykge1xuICByZXR1cm4gW3RoaXMucnVsZU5hbWVdO1xufTtcblxucGV4cHJzLlVuaWNvZGVDaGFyLnByb3RvdHlwZS50b0FyZ3VtZW50TmFtZUxpc3QgPSBmdW5jdGlvbihmaXJzdEFyZ0luZGV4LCBub0R1cENoZWNrKSB7XG4gIHJldHVybiBbJyQnICsgZmlyc3RBcmdJbmRleF07XG59O1xuXG5wZXhwcnMuUGFyYW0ucHJvdG90eXBlLnRvQXJndW1lbnROYW1lTGlzdCA9IGZ1bmN0aW9uKGZpcnN0QXJnSW5kZXgsIG5vRHVwQ2hlY2spIHtcbiAgcmV0dXJuIFsncGFyYW0nICsgdGhpcy5pbmRleF07XG59O1xuXG4vLyBcIlZhbHVlIHBleHByc1wiIChWYWx1ZSwgU3RyLCBBcnIsIE9iaikgYXJlIGdvaW5nIGF3YXkgc29vbiwgc28gd2UgZG9uJ3Qgd29ycnkgYWJvdXQgdGhlbSBoZXJlLlxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uJyk7XG52YXIgcGV4cHJzID0gcmVxdWlyZSgnLi9wZXhwcnMnKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIE9wZXJhdGlvbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBQRXhwciwgZm9yIHVzZSBhcyBhIFVJIGxhYmVsLCBldGMuXG5wZXhwcnMuUEV4cHIucHJvdG90eXBlLnRvRGlzcGxheVN0cmluZyA9IGNvbW1vbi5hYnN0cmFjdCgndG9EaXNwbGF5U3RyaW5nJyk7XG5cbnBleHBycy5BbHQucHJvdG90eXBlLnRvRGlzcGxheVN0cmluZyA9XG5wZXhwcnMuU2VxLnByb3RvdHlwZS50b0Rpc3BsYXlTdHJpbmcgPVxucGV4cHJzLkl0ZXIucHJvdG90eXBlLnRvRGlzcGxheVN0cmluZyA9XG5wZXhwcnMuTm90LnByb3RvdHlwZS50b0Rpc3BsYXlTdHJpbmcgPVxucGV4cHJzLkxvb2thaGVhZC5wcm90b3R5cGUudG9EaXNwbGF5U3RyaW5nID1cbnBleHBycy5MZXgucHJvdG90eXBlLnRvRGlzcGxheVN0cmluZyA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5zb3VyY2UpIHtcbiAgICByZXR1cm4gdGhpcy5zb3VyY2UudHJpbW1lZCgpLmNvbnRlbnRzO1xuICB9XG4gIHJldHVybiAnWycgKyB0aGlzLmNvbnN0cnVjdG9yLm5hbWUgKyAnXSc7XG59O1xuXG5wZXhwcnMuYW55LnRvRGlzcGxheVN0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gJ2FueSc7XG59O1xuXG5wZXhwcnMuZW5kLnRvRGlzcGxheVN0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gJ2VuZCc7XG59O1xuXG5wZXhwcnMuVGVybWluYWwucHJvdG90eXBlLnRvRGlzcGxheVN0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5vYmopO1xufTtcblxucGV4cHJzLlJhbmdlLnByb3RvdHlwZS50b0Rpc3BsYXlTdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMuZnJvbSkgKyAnLi4nICsgSlNPTi5zdHJpbmdpZnkodGhpcy50byk7XG59O1xuXG5wZXhwcnMuUGFyYW0ucHJvdG90eXBlLnRvRGlzcGxheVN0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gJyMnICsgdGhpcy5pbmRleDtcbn07XG5cbnBleHBycy5BcHBseS5wcm90b3R5cGUudG9EaXNwbGF5U3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnRvU3RyaW5nKCk7XG59O1xuXG5wZXhwcnMuVW5pY29kZUNoYXIucHJvdG90eXBlLnRvRGlzcGxheVN0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gJ1VuaWNvZGUgeycgKyB0aGlzLmNhdGVnb3J5ICsgJ30gY2hhcmFjdGVyJztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgRmFpbHVyZSA9IHJlcXVpcmUoJy4vRmFpbHVyZScpO1xudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uJyk7XG52YXIgcGV4cHJzID0gcmVxdWlyZSgnLi9wZXhwcnMnKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIE9wZXJhdGlvbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnBleHBycy5QRXhwci5wcm90b3R5cGUudG9GYWlsdXJlID0gY29tbW9uLmFic3RyYWN0KCd0b0ZhaWx1cmUnKTtcblxucGV4cHJzLmFueS50b0ZhaWx1cmUgPSBmdW5jdGlvbihncmFtbWFyKSB7XG4gIHJldHVybiBuZXcgRmFpbHVyZSh0aGlzLCAnYW55IG9iamVjdCcsICdkZXNjcmlwdGlvbicpO1xufTtcblxucGV4cHJzLmVuZC50b0ZhaWx1cmUgPSBmdW5jdGlvbihncmFtbWFyKSB7XG4gIHJldHVybiBuZXcgRmFpbHVyZSh0aGlzLCAnZW5kIG9mIGlucHV0JywgJ2Rlc2NyaXB0aW9uJyk7XG59O1xuXG5wZXhwcnMuVGVybWluYWwucHJvdG90eXBlLnRvRmFpbHVyZSA9IGZ1bmN0aW9uKGdyYW1tYXIpIHtcbiAgcmV0dXJuIG5ldyBGYWlsdXJlKHRoaXMsIHRoaXMub2JqLCAnc3RyaW5nJyk7XG59O1xuXG5wZXhwcnMuUmFuZ2UucHJvdG90eXBlLnRvRmFpbHVyZSA9IGZ1bmN0aW9uKGdyYW1tYXIpIHtcbiAgLy8gVE9ETzogY29tZSB1cCB3aXRoIHNvbWV0aGluZyBiZXR0ZXJcbiAgcmV0dXJuIG5ldyBGYWlsdXJlKHRoaXMsIEpTT04uc3RyaW5naWZ5KHRoaXMuZnJvbSkgKyAnLi4nICsgSlNPTi5zdHJpbmdpZnkodGhpcy50byksICdjb2RlJyk7XG59O1xuXG5wZXhwcnMuTm90LnByb3RvdHlwZS50b0ZhaWx1cmUgPSBmdW5jdGlvbihncmFtbWFyKSB7XG4gIHZhciBkZXNjcmlwdGlvbiA9IHRoaXMuZXhwciA9PT0gcGV4cHJzLmFueSA/XG4gICAgICAnbm90aGluZycgOlxuICAgICAgJ25vdCAnICsgdGhpcy5leHByLnRvRmFpbHVyZShncmFtbWFyKTtcbiAgcmV0dXJuIG5ldyBGYWlsdXJlKHRoaXMsIGRlc2NyaXB0aW9uLCAnZGVzY3JpcHRpb24nKTtcbn07XG5cbnBleHBycy5Mb29rYWhlYWQucHJvdG90eXBlLnRvRmFpbHVyZSA9IGZ1bmN0aW9uKGdyYW1tYXIpIHtcbiAgcmV0dXJuIHRoaXMuZXhwci50b0ZhaWx1cmUoZ3JhbW1hcik7XG59O1xuXG5wZXhwcnMuQXBwbHkucHJvdG90eXBlLnRvRmFpbHVyZSA9IGZ1bmN0aW9uKGdyYW1tYXIpIHtcbiAgdmFyIGRlc2NyaXB0aW9uID0gZ3JhbW1hci5ydWxlc1t0aGlzLnJ1bGVOYW1lXS5kZXNjcmlwdGlvbjtcbiAgaWYgKCFkZXNjcmlwdGlvbikge1xuICAgIHZhciBhcnRpY2xlID0gKC9eW2FlaW91QUVJT1VdLy50ZXN0KHRoaXMucnVsZU5hbWUpID8gJ2FuJyA6ICdhJyk7XG4gICAgZGVzY3JpcHRpb24gPSBhcnRpY2xlICsgJyAnICsgdGhpcy5ydWxlTmFtZTtcbiAgfVxuICByZXR1cm4gbmV3IEZhaWx1cmUodGhpcywgZGVzY3JpcHRpb24sICdkZXNjcmlwdGlvbicpO1xufTtcblxucGV4cHJzLlVuaWNvZGVDaGFyLnByb3RvdHlwZS50b0ZhaWx1cmUgPSBmdW5jdGlvbihncmFtbWFyKSB7XG4gIHJldHVybiBuZXcgRmFpbHVyZSh0aGlzLCB0aGlzLnRvRGlzcGxheVN0cmluZygpLCAnZGVzY3JpcHRpb24nKTtcbn07XG5cbnBleHBycy5BbHQucHJvdG90eXBlLnRvRmFpbHVyZSA9IGZ1bmN0aW9uKGdyYW1tYXIpIHtcbiAgdmFyIGZzID0gdGhpcy50ZXJtcy5tYXAoZnVuY3Rpb24odCkgeyByZXR1cm4gdC50b0ZhaWx1cmUoKTsgfSk7XG4gIHZhciBkZXNjcmlwdGlvbiA9ICcoJyArIGZzLmpvaW4oJyBvciAnKSArICcpJztcbiAgcmV0dXJuIG5ldyBGYWlsdXJlKHRoaXMsIGRlc2NyaXB0aW9uLCAnZGVzY3JpcHRpb24nKTtcbn07XG5cbnBleHBycy5TZXEucHJvdG90eXBlLnRvRmFpbHVyZSA9IGZ1bmN0aW9uKGdyYW1tYXIpIHtcbiAgdmFyIGZzID0gdGhpcy5mYWN0b3JzLm1hcChmdW5jdGlvbihmKSB7IHJldHVybiBmLnRvRmFpbHVyZSgpOyB9KTtcbiAgdmFyIGRlc2NyaXB0aW9uID0gJygnICsgZnMuam9pbignICcpICsgJyknO1xuICByZXR1cm4gbmV3IEZhaWx1cmUodGhpcywgZGVzY3JpcHRpb24sICdkZXNjcmlwdGlvbicpO1xufTtcblxucGV4cHJzLkl0ZXIucHJvdG90eXBlLnRvRmFpbHVyZSA9IGZ1bmN0aW9uKGdyYW1tYXIpIHtcbiAgdmFyIGRlc2NyaXB0aW9uID0gJygnICsgdGhpcy5leHByLnRvRmFpbHVyZSgpICsgdGhpcy5vcGVyYXRvciArICcpJztcbiAgcmV0dXJuIG5ldyBGYWlsdXJlKHRoaXMsIGRlc2NyaXB0aW9uLCAnZGVzY3JpcHRpb24nKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24nKTtcbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gT3BlcmF0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLypcbiAgZTEudG9TdHJpbmcoKSA9PT0gZTIudG9TdHJpbmcoKSA9PT4gZTEgYW5kIGUyIGFyZSBzZW1hbnRpY2FsbHkgZXF1aXZhbGVudC5cbiAgTm90ZSB0aGF0IHRoaXMgaXMgbm90IGFuIGlmZiAoPD09Pik6IGUuZy4sXG4gICh+XCJiXCIgXCJhXCIpLnRvU3RyaW5nKCkgIT09IChcImFcIikudG9TdHJpbmcoKSwgZXZlbiB0aG91Z2hcbiAgflwiYlwiIFwiYVwiIGFuZCBcImFcIiBhcmUgaW50ZXJjaGFuZ2VhYmxlIGluIGFueSBncmFtbWFyLFxuICBib3RoIGluIHRlcm1zIG9mIHRoZSBsYW5ndWFnZXMgdGhleSBhY2NlcHQgYW5kIHRoZWlyIGFyaXRpZXMuXG4qL1xucGV4cHJzLlBFeHByLnByb3RvdHlwZS50b1N0cmluZyA9IGNvbW1vbi5hYnN0cmFjdCgndG9TdHJpbmcnKTtcblxucGV4cHJzLmFueS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gJ2FueSc7XG59O1xuXG5wZXhwcnMuZW5kLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAnZW5kJztcbn07XG5cbnBleHBycy5UZXJtaW5hbC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMub2JqKTtcbn07XG5cbnBleHBycy5SYW5nZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMuZnJvbSkgKyAnLi4nICsgSlNPTi5zdHJpbmdpZnkodGhpcy50byk7XG59O1xuXG5wZXhwcnMuUGFyYW0ucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAnJCcgKyB0aGlzLmluZGV4O1xufTtcblxucGV4cHJzLkxleC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICcjKCcgKyB0aGlzLmV4cHIudG9TdHJpbmcoKSArICcpJztcbn07XG5cbnBleHBycy5BbHQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnRlcm1zLmxlbmd0aCA9PT0gMSA/XG4gICAgdGhpcy50ZXJtc1swXS50b1N0cmluZygpIDpcbiAgICAnKCcgKyB0aGlzLnRlcm1zLm1hcChmdW5jdGlvbih0ZXJtKSB7IHJldHVybiB0ZXJtLnRvU3RyaW5nKCk7IH0pLmpvaW4oJyB8ICcpICsgJyknO1xufTtcblxucGV4cHJzLlNlcS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuZmFjdG9ycy5sZW5ndGggPT09IDEgP1xuICAgIHRoaXMuZmFjdG9yc1swXS50b1N0cmluZygpIDpcbiAgICAnKCcgKyB0aGlzLmZhY3RvcnMubWFwKGZ1bmN0aW9uKGZhY3RvcikgeyByZXR1cm4gZmFjdG9yLnRvU3RyaW5nKCk7IH0pLmpvaW4oJyAnKSArICcpJztcbn07XG5cbnBleHBycy5JdGVyLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5leHByICsgdGhpcy5vcGVyYXRvcjtcbn07XG5cbnBleHBycy5Ob3QucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAnficgKyB0aGlzLmV4cHI7XG59O1xuXG5wZXhwcnMuTG9va2FoZWFkLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gJyYnICsgdGhpcy5leHByO1xufTtcblxucGV4cHJzLkFwcGx5LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5hcmdzLmxlbmd0aCA+IDApIHtcbiAgICB2YXIgcHMgPSB0aGlzLmFyZ3MubWFwKGZ1bmN0aW9uKGFyZykgeyByZXR1cm4gYXJnLnRvU3RyaW5nKCk7IH0pO1xuICAgIHJldHVybiB0aGlzLnJ1bGVOYW1lICsgJzwnICsgcHMuam9pbignLCcpICsgJz4nO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0aGlzLnJ1bGVOYW1lO1xuICB9XG59O1xuXG5wZXhwcnMuVW5pY29kZUNoYXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAnXFxcXHB7JyArIHRoaXMuY2F0ZWdvcnkgKyAnfSc7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIFVuaWNvZGVDYXRlZ29yaWVzID0gcmVxdWlyZSgnLi4vdGhpcmRfcGFydHkvVW5pY29kZUNhdGVnb3JpZXMnKTtcbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbicpO1xudmFyIGVycm9ycyA9IHJlcXVpcmUoJy4vZXJyb3JzJyk7XG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUHJpdmF0ZSBzdHVmZlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gR2VuZXJhbCBzdHVmZlxuXG5mdW5jdGlvbiBQRXhwcigpIHtcbiAgdGhyb3cgbmV3IEVycm9yKFwiUEV4cHIgY2Fubm90IGJlIGluc3RhbnRpYXRlZCAtLSBpdCdzIGFic3RyYWN0XCIpO1xufVxuXG4vLyBTZXQgdGhlIGBzb3VyY2VgIHByb3BlcnR5IHRvIHRoZSBpbnRlcnZhbCBjb250YWluaW5nIHRoZSBzb3VyY2UgZm9yIHRoaXMgZXhwcmVzc2lvbi5cblBFeHByLnByb3RvdHlwZS53aXRoU291cmNlID0gZnVuY3Rpb24oaW50ZXJ2YWwpIHtcbiAgaWYgKGludGVydmFsKSB7XG4gICAgdGhpcy5zb3VyY2UgPSBpbnRlcnZhbC50cmltbWVkKCk7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBBbnlcblxudmFyIGFueSA9IE9iamVjdC5jcmVhdGUoUEV4cHIucHJvdG90eXBlKTtcblxuLy8gRW5kXG5cbnZhciBlbmQgPSBPYmplY3QuY3JlYXRlKFBFeHByLnByb3RvdHlwZSk7XG5cbi8vIFRlcm1pbmFsc1xuXG5mdW5jdGlvbiBUZXJtaW5hbChvYmopIHtcbiAgdGhpcy5vYmogPSBvYmo7XG59XG5pbmhlcml0cyhUZXJtaW5hbCwgUEV4cHIpO1xuXG4vLyBSYW5nZXNcblxuZnVuY3Rpb24gUmFuZ2UoZnJvbSwgdG8pIHtcbiAgdGhpcy5mcm9tID0gZnJvbTtcbiAgdGhpcy50byA9IHRvO1xufVxuaW5oZXJpdHMoUmFuZ2UsIFBFeHByKTtcblxuLy8gUGFyYW1ldGVyc1xuXG5mdW5jdGlvbiBQYXJhbShpbmRleCkge1xuICB0aGlzLmluZGV4ID0gaW5kZXg7XG59XG5pbmhlcml0cyhQYXJhbSwgUEV4cHIpO1xuXG4vLyBBbHRlcm5hdGlvblxuXG5mdW5jdGlvbiBBbHQodGVybXMpIHtcbiAgdGhpcy50ZXJtcyA9IHRlcm1zO1xufVxuaW5oZXJpdHMoQWx0LCBQRXhwcik7XG5cbi8vIEV4dGVuZCBpcyBhbiBpbXBsZW1lbnRhdGlvbiBkZXRhaWwgb2YgcnVsZSBleHRlbnNpb25cblxuZnVuY3Rpb24gRXh0ZW5kKHN1cGVyR3JhbW1hciwgbmFtZSwgYm9keSkge1xuICB0aGlzLnN1cGVyR3JhbW1hciA9IHN1cGVyR3JhbW1hcjtcbiAgdGhpcy5uYW1lID0gbmFtZTtcbiAgdGhpcy5ib2R5ID0gYm9keTtcbiAgdmFyIG9yaWdCb2R5ID0gc3VwZXJHcmFtbWFyLnJ1bGVzW25hbWVdLmJvZHk7XG4gIHRoaXMudGVybXMgPSBbYm9keSwgb3JpZ0JvZHldO1xufVxuaW5oZXJpdHMoRXh0ZW5kLCBBbHQpO1xuXG4vLyBTZXF1ZW5jZXNcblxuZnVuY3Rpb24gU2VxKGZhY3RvcnMpIHtcbiAgdGhpcy5mYWN0b3JzID0gZmFjdG9ycztcbn1cbmluaGVyaXRzKFNlcSwgUEV4cHIpO1xuXG4vLyBJdGVyYXRvcnMgYW5kIG9wdGlvbmFsc1xuXG5mdW5jdGlvbiBJdGVyKGV4cHIpIHtcbiAgdGhpcy5leHByID0gZXhwcjtcbn1cbmluaGVyaXRzKEl0ZXIsIFBFeHByKTtcblxuZnVuY3Rpb24gU3RhcihleHByKSB7XG4gIHRoaXMuZXhwciA9IGV4cHI7XG59XG5pbmhlcml0cyhTdGFyLCBJdGVyKTtcblxuZnVuY3Rpb24gUGx1cyhleHByKSB7XG4gIHRoaXMuZXhwciA9IGV4cHI7XG59XG5pbmhlcml0cyhQbHVzLCBJdGVyKTtcblxuZnVuY3Rpb24gT3B0KGV4cHIpIHtcbiAgdGhpcy5leHByID0gZXhwcjtcbn1cbmluaGVyaXRzKE9wdCwgSXRlcik7XG5cblN0YXIucHJvdG90eXBlLm9wZXJhdG9yID0gJyonO1xuUGx1cy5wcm90b3R5cGUub3BlcmF0b3IgPSAnKyc7XG5PcHQucHJvdG90eXBlLm9wZXJhdG9yID0gJz8nO1xuXG5TdGFyLnByb3RvdHlwZS5taW5OdW1NYXRjaGVzID0gMDtcblBsdXMucHJvdG90eXBlLm1pbk51bU1hdGNoZXMgPSAxO1xuT3B0LnByb3RvdHlwZS5taW5OdW1NYXRjaGVzID0gMDtcblxuU3Rhci5wcm90b3R5cGUubWF4TnVtTWF0Y2hlcyA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcblBsdXMucHJvdG90eXBlLm1heE51bU1hdGNoZXMgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG5PcHQucHJvdG90eXBlLm1heE51bU1hdGNoZXMgPSAxO1xuXG4vLyBQcmVkaWNhdGVzXG5cbmZ1bmN0aW9uIE5vdChleHByKSB7XG4gIHRoaXMuZXhwciA9IGV4cHI7XG59XG5pbmhlcml0cyhOb3QsIFBFeHByKTtcblxuZnVuY3Rpb24gTG9va2FoZWFkKGV4cHIpIHtcbiAgdGhpcy5leHByID0gZXhwcjtcbn1cbmluaGVyaXRzKExvb2thaGVhZCwgUEV4cHIpO1xuXG4vLyBcIkxleGlmaWNhdGlvblwiXG5cbmZ1bmN0aW9uIExleChleHByKSB7XG4gIHRoaXMuZXhwciA9IGV4cHI7XG59XG5pbmhlcml0cyhMZXgsIFBFeHByKTtcblxuLy8gQXJyYXkgZGVjb21wb3NpdGlvblxuXG5mdW5jdGlvbiBBcnIoZXhwcikge1xuICB0aGlzLmV4cHIgPSBleHByO1xufVxuaW5oZXJpdHMoQXJyLCBQRXhwcik7XG5cbi8vIFN0cmluZyBkZWNvbXBvc2l0aW9uXG5cbmZ1bmN0aW9uIFN0cihleHByKSB7XG4gIHRoaXMuZXhwciA9IGV4cHI7XG59XG5pbmhlcml0cyhTdHIsIFBFeHByKTtcblxuLy8gT2JqZWN0IGRlY29tcG9zaXRpb25cblxuZnVuY3Rpb24gT2JqKHByb3BlcnRpZXMsIGlzTGVuaWVudCkge1xuICB2YXIgbmFtZXMgPSBwcm9wZXJ0aWVzLm1hcChmdW5jdGlvbihwcm9wZXJ0eSkgeyByZXR1cm4gcHJvcGVydHkubmFtZTsgfSk7XG4gIHZhciBkdXBsaWNhdGVzID0gY29tbW9uLmdldER1cGxpY2F0ZXMobmFtZXMpO1xuICBpZiAoZHVwbGljYXRlcy5sZW5ndGggPiAwKSB7XG4gICAgdGhyb3cgZXJyb3JzLmR1cGxpY2F0ZVByb3BlcnR5TmFtZXMoZHVwbGljYXRlcyk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5wcm9wZXJ0aWVzID0gcHJvcGVydGllcztcbiAgICB0aGlzLmlzTGVuaWVudCA9IGlzTGVuaWVudDtcbiAgfVxufVxuaW5oZXJpdHMoT2JqLCBQRXhwcik7XG5cbi8vIFJ1bGUgYXBwbGljYXRpb25cblxuZnVuY3Rpb24gQXBwbHkocnVsZU5hbWUsIG9wdEFyZ3MpIHtcbiAgdGhpcy5ydWxlTmFtZSA9IHJ1bGVOYW1lO1xuICB0aGlzLmFyZ3MgPSBvcHRBcmdzIHx8IFtdO1xufVxuaW5oZXJpdHMoQXBwbHksIFBFeHByKTtcblxuQXBwbHkucHJvdG90eXBlLmlzU3ludGFjdGljID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBjb21tb24uaXNTeW50YWN0aWModGhpcy5ydWxlTmFtZSk7XG59O1xuXG4vLyBUaGlzIG1ldGhvZCBqdXN0IGNhY2hlcyB0aGUgcmVzdWx0IG9mIGB0aGlzLnRvU3RyaW5nKClgIGluIGEgbm9uLWVudW1lcmFibGUgcHJvcGVydHkuXG5BcHBseS5wcm90b3R5cGUudG9NZW1vS2V5ID0gZnVuY3Rpb24oKSB7XG4gIGlmICghdGhpcy5fbWVtb0tleSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnX21lbW9LZXknLCB7dmFsdWU6IHRoaXMudG9TdHJpbmcoKX0pO1xuICB9XG4gIHJldHVybiB0aGlzLl9tZW1vS2V5O1xufTtcblxuLy8gVW5pY29kZSBjaGFyYWN0ZXJcblxuZnVuY3Rpb24gVW5pY29kZUNoYXIoY2F0ZWdvcnkpIHtcbiAgdGhpcy5jYXRlZ29yeSA9IGNhdGVnb3J5O1xuICB0aGlzLnBhdHRlcm4gPSBVbmljb2RlQ2F0ZWdvcmllc1tjYXRlZ29yeV07XG59XG5pbmhlcml0cyhVbmljb2RlQ2hhciwgUEV4cHIpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZXhwb3J0cy5QRXhwciA9IFBFeHByO1xuZXhwb3J0cy5hbnkgPSBhbnk7XG5leHBvcnRzLmVuZCA9IGVuZDtcbmV4cG9ydHMuVGVybWluYWwgPSBUZXJtaW5hbDtcbmV4cG9ydHMuUmFuZ2UgPSBSYW5nZTtcbmV4cG9ydHMuUGFyYW0gPSBQYXJhbTtcbmV4cG9ydHMuQWx0ID0gQWx0O1xuZXhwb3J0cy5FeHRlbmQgPSBFeHRlbmQ7XG5leHBvcnRzLlNlcSA9IFNlcTtcbmV4cG9ydHMuSXRlciA9IEl0ZXI7XG5leHBvcnRzLlN0YXIgPSBTdGFyO1xuZXhwb3J0cy5QbHVzID0gUGx1cztcbmV4cG9ydHMuT3B0ID0gT3B0O1xuZXhwb3J0cy5Ob3QgPSBOb3Q7XG5leHBvcnRzLkxvb2thaGVhZCA9IExvb2thaGVhZDtcbmV4cG9ydHMuTGV4ID0gTGV4O1xuZXhwb3J0cy5BcnIgPSBBcnI7XG5leHBvcnRzLlN0ciA9IFN0cjtcbmV4cG9ydHMuT2JqID0gT2JqO1xuZXhwb3J0cy5BcHBseSA9IEFwcGx5O1xuZXhwb3J0cy5Vbmljb2RlQ2hhciA9IFVuaWNvZGVDaGFyO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXh0ZW5zaW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxucmVxdWlyZSgnLi9wZXhwcnMtYWxsb3dzU2tpcHBpbmdQcmVjZWRpbmdTcGFjZScpO1xucmVxdWlyZSgnLi9wZXhwcnMtYXNzZXJ0QWxsQXBwbGljYXRpb25zQXJlVmFsaWQnKTtcbnJlcXVpcmUoJy4vcGV4cHJzLWFzc2VydENob2ljZXNIYXZlVW5pZm9ybUFyaXR5Jyk7XG5yZXF1aXJlKCcuL3BleHBycy1hc3NlcnRJdGVyYXRlZEV4cHJzQXJlTm90TnVsbGFibGUnKTtcbnJlcXVpcmUoJy4vcGV4cHJzLWNoZWNrJyk7XG5yZXF1aXJlKCcuL3BleHBycy1ldmFsJyk7XG5yZXF1aXJlKCcuL3BleHBycy1nZXRBcml0eScpO1xucmVxdWlyZSgnLi9wZXhwcnMtZ2VuZXJhdGVFeGFtcGxlJyk7XG5yZXF1aXJlKCcuL3BleHBycy1vdXRwdXRSZWNpcGUnKTtcbnJlcXVpcmUoJy4vcGV4cHJzLWludHJvZHVjZVBhcmFtcycpO1xucmVxdWlyZSgnLi9wZXhwcnMtaXNOdWxsYWJsZScpO1xucmVxdWlyZSgnLi9wZXhwcnMtc3Vic3RpdHV0ZVBhcmFtcycpO1xucmVxdWlyZSgnLi9wZXhwcnMtdG9EaXNwbGF5U3RyaW5nJyk7XG5yZXF1aXJlKCcuL3BleHBycy10b0FyZ3VtZW50TmFtZUxpc3QnKTtcbnJlcXVpcmUoJy4vcGV4cHJzLXRvRmFpbHVyZScpO1xucmVxdWlyZSgnLi9wZXhwcnMtdG9TdHJpbmcnKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbicpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUHJpdmF0ZSBzdHVmZlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gR2l2ZW4gYW4gYXJyYXkgb2YgbnVtYmVycyBgYXJyYCwgcmV0dXJuIGFuIGFycmF5IG9mIHRoZSBudW1iZXJzIGFzIHN0cmluZ3MsXG4vLyByaWdodC1qdXN0aWZpZWQgYW5kIHBhZGRlZCB0byB0aGUgc2FtZSBsZW5ndGguXG5mdW5jdGlvbiBwYWROdW1iZXJzVG9FcXVhbExlbmd0aChhcnIpIHtcbiAgdmFyIG1heExlbiA9IDA7XG4gIHZhciBzdHJpbmdzID0gYXJyLm1hcChmdW5jdGlvbihuKSB7XG4gICAgdmFyIHN0ciA9IG4udG9TdHJpbmcoKTtcbiAgICBtYXhMZW4gPSBNYXRoLm1heChtYXhMZW4sIHN0ci5sZW5ndGgpO1xuICAgIHJldHVybiBzdHI7XG4gIH0pO1xuICByZXR1cm4gc3RyaW5ncy5tYXAoZnVuY3Rpb24ocykgeyByZXR1cm4gY29tbW9uLnBhZExlZnQocywgbWF4TGVuKTsgfSk7XG59XG5cbi8vIFByb2R1Y2UgYSBuZXcgc3RyaW5nIHRoYXQgd291bGQgYmUgdGhlIHJlc3VsdCBvZiBjb3B5aW5nIHRoZSBjb250ZW50c1xuLy8gb2YgdGhlIHN0cmluZyBgc3JjYCBvbnRvIGBkZXN0YCBhdCBvZmZzZXQgYG9mZmVzdGAuXG5mdW5jdGlvbiBzdHJjcHkoZGVzdCwgc3JjLCBvZmZzZXQpIHtcbiAgdmFyIG9yaWdEZXN0TGVuID0gZGVzdC5sZW5ndGg7XG4gIHZhciBzdGFydCA9IGRlc3Quc2xpY2UoMCwgb2Zmc2V0KTtcbiAgdmFyIGVuZCA9IGRlc3Quc2xpY2Uob2Zmc2V0ICsgc3JjLmxlbmd0aCk7XG4gIHJldHVybiAoc3RhcnQgKyBzcmMgKyBlbmQpLnN1YnN0cigwLCBvcmlnRGVzdExlbik7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyBSZXR1cm4gYW4gb2JqZWN0IHdpdGggdGhlIGxpbmUgYW5kIGNvbHVtbiBpbmZvcm1hdGlvbiBmb3IgdGhlIGdpdmVuXG4vLyBvZmZzZXQgaW4gYHN0cmAuXG5leHBvcnRzLmdldExpbmVBbmRDb2x1bW4gPSBmdW5jdGlvbihzdHIsIG9mZnNldCkge1xuICB2YXIgbGluZU51bSA9IDE7XG4gIHZhciBjb2xOdW0gPSAxO1xuXG4gIHZhciBjdXJyT2Zmc2V0ID0gMDtcbiAgdmFyIGxpbmVTdGFydE9mZnNldCA9IDA7XG5cbiAgdmFyIG5leHRMaW5lID0gbnVsbDtcbiAgdmFyIHByZXZMaW5lID0gbnVsbDtcbiAgdmFyIHByZXZMaW5lU3RhcnRPZmZzZXQgPSAtMTtcblxuICB3aGlsZSAoY3Vyck9mZnNldCA8IG9mZnNldCkge1xuICAgIHZhciBjID0gc3RyLmNoYXJBdChjdXJyT2Zmc2V0KyspO1xuICAgIGlmIChjID09PSAnXFxuJykge1xuICAgICAgbGluZU51bSsrO1xuICAgICAgY29sTnVtID0gMTtcbiAgICAgIHByZXZMaW5lU3RhcnRPZmZzZXQgPSBsaW5lU3RhcnRPZmZzZXQ7XG4gICAgICBsaW5lU3RhcnRPZmZzZXQgPSBjdXJyT2Zmc2V0O1xuICAgIH0gZWxzZSBpZiAoYyAhPT0gJ1xccicpIHtcbiAgICAgIGNvbE51bSsrO1xuICAgIH1cbiAgfVxuXG4gIC8vIEZpbmQgdGhlIGVuZCBvZiB0aGUgdGFyZ2V0IGxpbmUuXG4gIHZhciBsaW5lRW5kT2Zmc2V0ID0gc3RyLmluZGV4T2YoJ1xcbicsIGxpbmVTdGFydE9mZnNldCk7XG4gIGlmIChsaW5lRW5kT2Zmc2V0ID09PSAtMSkge1xuICAgIGxpbmVFbmRPZmZzZXQgPSBzdHIubGVuZ3RoO1xuICB9IGVsc2Uge1xuICAgIC8vIEdldCB0aGUgbmV4dCBsaW5lLlxuICAgIHZhciBuZXh0TGluZUVuZE9mZnNldCA9IHN0ci5pbmRleE9mKCdcXG4nLCBsaW5lRW5kT2Zmc2V0ICsgMSk7XG4gICAgbmV4dExpbmUgPSBuZXh0TGluZUVuZE9mZnNldCA9PT0gLTEgPyBzdHIuc2xpY2UobGluZUVuZE9mZnNldClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHN0ci5zbGljZShsaW5lRW5kT2Zmc2V0LCBuZXh0TGluZUVuZE9mZnNldCk7XG4gICAgLy8gU3RyaXAgbGVhZGluZyBhbmQgdHJhaWxpbmcgRU9MIGNoYXIocykuXG4gICAgbmV4dExpbmUgPSBuZXh0TGluZS5yZXBsYWNlKC9eXFxyP1xcbi8sICcnKS5yZXBsYWNlKC9cXHIkLywgJycpO1xuICB9XG5cbiAgLy8gR2V0IHRoZSBwcmV2aW91cyBsaW5lLlxuICBpZiAocHJldkxpbmVTdGFydE9mZnNldCA+PSAwKSB7XG4gICAgcHJldkxpbmUgPSBzdHIuc2xpY2UocHJldkxpbmVTdGFydE9mZnNldCwgbGluZVN0YXJ0T2Zmc2V0KVxuICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xccj9cXG4kLywgJycpOyAgLy8gU3RyaXAgdHJhaWxpbmcgRU9MIGNoYXIocykuXG4gIH1cblxuICAvLyBHZXQgdGhlIHRhcmdldCBsaW5lLCBzdHJpcHBpbmcgYSB0cmFpbGluZyBjYXJyaWFnZSByZXR1cm4gaWYgbmVjZXNzYXJ5LlxuICB2YXIgbGluZSA9IHN0ci5zbGljZShsaW5lU3RhcnRPZmZzZXQsIGxpbmVFbmRPZmZzZXQpLnJlcGxhY2UoL1xcciQvLCAnJyk7XG5cbiAgcmV0dXJuIHtcbiAgICBsaW5lTnVtOiBsaW5lTnVtLFxuICAgIGNvbE51bTogY29sTnVtLFxuICAgIGxpbmU6IGxpbmUsXG4gICAgcHJldkxpbmU6IHByZXZMaW5lLFxuICAgIG5leHRMaW5lOiBuZXh0TGluZVxuICB9O1xufTtcblxuLy8gUmV0dXJuIGEgbmljZWx5LWZvcm1hdHRlZCBzdHJpbmcgZGVzY3JpYmluZyB0aGUgbGluZSBhbmQgY29sdW1uIGZvciB0aGVcbi8vIGdpdmVuIG9mZnNldCBpbiBgc3RyYC5cbmV4cG9ydHMuZ2V0TGluZUFuZENvbHVtbk1lc3NhZ2UgPSBmdW5jdGlvbihzdHIsIG9mZnNldCAvKiAuLi5yYW5nZXMgKi8pIHtcbiAgdmFyIHJlcGVhdFN0ciA9IGNvbW1vbi5yZXBlYXRTdHI7XG5cbiAgdmFyIGxpbmVBbmRDb2wgPSBleHBvcnRzLmdldExpbmVBbmRDb2x1bW4oc3RyLCBvZmZzZXQpO1xuICB2YXIgc2IgPSBuZXcgY29tbW9uLlN0cmluZ0J1ZmZlcigpO1xuICBzYi5hcHBlbmQoJ0xpbmUgJyArIGxpbmVBbmRDb2wubGluZU51bSArICcsIGNvbCAnICsgbGluZUFuZENvbC5jb2xOdW0gKyAnOlxcbicpO1xuXG4gIC8vIEFuIGFycmF5IG9mIHRoZSBwcmV2aW91cywgY3VycmVudCwgYW5kIG5leHQgbGluZSBudW1iZXJzIGFzIHN0cmluZ3Mgb2YgZXF1YWwgbGVuZ3RoLlxuICB2YXIgbGluZU51bWJlcnMgPSBwYWROdW1iZXJzVG9FcXVhbExlbmd0aChbXG4gICAgbGluZUFuZENvbC5wcmV2TGluZSA9PSBudWxsID8gMCA6IGxpbmVBbmRDb2wubGluZU51bSAtIDEsXG4gICAgbGluZUFuZENvbC5saW5lTnVtLFxuICAgIGxpbmVBbmRDb2wubmV4dExpbmUgPT0gbnVsbCA/IDAgOiBsaW5lQW5kQ29sLmxpbmVOdW0gKyAxXG4gIF0pO1xuXG4gIC8vIEhlbHBlciBmb3IgYXBwZW5kaW5nIGZvcm1hdHRpbmcgaW5wdXQgbGluZXMgdG8gdGhlIGJ1ZmZlci5cbiAgZnVuY3Rpb24gYXBwZW5kTGluZShudW0sIGNvbnRlbnQsIHByZWZpeCkge1xuICAgIHNiLmFwcGVuZChwcmVmaXggKyBsaW5lTnVtYmVyc1tudW1dICsgJyB8ICcgKyBjb250ZW50ICsgJ1xcbicpO1xuICB9XG5cbiAgLy8gSW5jbHVkZSB0aGUgcHJldmlvdXMgbGluZSBmb3IgY29udGV4dCBpZiBwb3NzaWJsZS5cbiAgaWYgKGxpbmVBbmRDb2wucHJldkxpbmUgIT0gbnVsbCkge1xuICAgIGFwcGVuZExpbmUoMCwgbGluZUFuZENvbC5wcmV2TGluZSwgJyAgJyk7XG4gIH1cbiAgLy8gTGluZSB0aGF0IHRoZSBlcnJvciBvY2N1cnJlZCBvbi5cbiAgYXBwZW5kTGluZSgxLCBsaW5lQW5kQ29sLmxpbmUsICc+ICcpO1xuXG4gIC8vIEJ1aWxkIHVwIHRoZSBsaW5lIHRoYXQgcG9pbnRzIHRvIHRoZSBvZmZzZXQgYW5kIHBvc3NpYmxlIGluZGljYXRlcyBvbmUgb3IgbW9yZSByYW5nZXMuXG4gIC8vIFN0YXJ0IHdpdGggYSBibGFuayBsaW5lLCBhbmQgaW5kaWNhdGUgZWFjaCByYW5nZSBieSBvdmVybGF5aW5nIGEgc3RyaW5nIG9mIGB+YCBjaGFycy5cbiAgdmFyIGxpbmVMZW4gPSBsaW5lQW5kQ29sLmxpbmUubGVuZ3RoO1xuICB2YXIgaW5kaWNhdGlvbkxpbmUgPSByZXBlYXRTdHIoJyAnLCBsaW5lTGVuICsgMSk7XG4gIHZhciByYW5nZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJhbmdlcy5sZW5ndGg7ICsraSkge1xuICAgIHZhciBzdGFydElkeCA9IHJhbmdlc1tpXVswXTtcbiAgICB2YXIgZW5kSWR4ID0gcmFuZ2VzW2ldWzFdO1xuICAgIGNvbW1vbi5hc3NlcnQoc3RhcnRJZHggPj0gMCAmJiBzdGFydElkeCA8PSBlbmRJZHgsICdyYW5nZSBzdGFydCBtdXN0IGJlID49IDAgYW5kIDw9IGVuZCcpO1xuXG4gICAgdmFyIGxpbmVTdGFydE9mZnNldCA9IG9mZnNldCAtIGxpbmVBbmRDb2wuY29sTnVtICsgMTtcbiAgICBzdGFydElkeCA9IE1hdGgubWF4KDAsIHN0YXJ0SWR4IC0gbGluZVN0YXJ0T2Zmc2V0KTtcbiAgICBlbmRJZHggPSBNYXRoLm1pbihlbmRJZHggLSBsaW5lU3RhcnRPZmZzZXQsIGxpbmVMZW4pO1xuXG4gICAgaW5kaWNhdGlvbkxpbmUgPSBzdHJjcHkoaW5kaWNhdGlvbkxpbmUsIHJlcGVhdFN0cignficsIGVuZElkeCAtIHN0YXJ0SWR4KSwgc3RhcnRJZHgpO1xuICB9XG4gIHZhciBndXR0ZXJXaWR0aCA9IDIgKyBsaW5lTnVtYmVyc1sxXS5sZW5ndGggKyAzO1xuICBzYi5hcHBlbmQocmVwZWF0U3RyKCcgJywgZ3V0dGVyV2lkdGgpKTtcbiAgaW5kaWNhdGlvbkxpbmUgPSBzdHJjcHkoaW5kaWNhdGlvbkxpbmUsICdeJywgbGluZUFuZENvbC5jb2xOdW0gLSAxKTtcbiAgc2IuYXBwZW5kKGluZGljYXRpb25MaW5lLnJlcGxhY2UoLyArJC8sICcnKSArICdcXG4nKTtcblxuICAvLyBJbmNsdWRlIHRoZSBuZXh0IGxpbmUgZm9yIGNvbnRleHQgaWYgcG9zc2libGUuXG4gIGlmIChsaW5lQW5kQ29sLm5leHRMaW5lICE9IG51bGwpIHtcbiAgICBhcHBlbmRMaW5lKDIsIGxpbmVBbmRDb2wubmV4dExpbmUsICcgICcpO1xuICB9XG4gIHJldHVybiBzYi5jb250ZW50cygpO1xufTtcbiIsIi8vIEJhc2VkIG9uIGh0dHBzOi8vZ2l0aHViLmNvbS90dmN1dHNlbS9lcy1sYWIvYmxvYi9tYXN0ZXIvc3JjL3BhcnNlci91bmljb2RlLmpzLlxuLy8gVGhlc2UgYXJlIGp1c3QgY2F0ZWdvcmllcyB0aGF0IGFyZSB1c2VkIGluIEVTNS5cbi8vIFRoZSBmdWxsIGxpc3Qgb2YgVW5pY29kZSBjYXRlZ29yaWVzIGlzIGhlcmU6IGh0dHA6Ly93d3cuZmlsZWZvcm1hdC5pbmZvL2luZm8vdW5pY29kZS9jYXRlZ29yeS9pbmRleC5odG0uXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gTGV0dGVyc1xuICBMdTogL1tcXHUwMDQxLVxcdTAwNUFdfFtcXHUwMEMwLVxcdTAwRDZdfFtcXHUwMEQ4LVxcdTAwREVdfFtcXHUwMTAwLVxcdTAxMDBdfFtcXHUwMTAyLVxcdTAxMDJdfFtcXHUwMTA0LVxcdTAxMDRdfFtcXHUwMTA2LVxcdTAxMDZdfFtcXHUwMTA4LVxcdTAxMDhdfFtcXHUwMTBBLVxcdTAxMEFdfFtcXHUwMTBDLVxcdTAxMENdfFtcXHUwMTBFLVxcdTAxMEVdfFtcXHUwMTEwLVxcdTAxMTBdfFtcXHUwMTEyLVxcdTAxMTJdfFtcXHUwMTE0LVxcdTAxMTRdfFtcXHUwMTE2LVxcdTAxMTZdfFtcXHUwMTE4LVxcdTAxMThdfFtcXHUwMTFBLVxcdTAxMUFdfFtcXHUwMTFDLVxcdTAxMUNdfFtcXHUwMTFFLVxcdTAxMUVdfFtcXHUwMTIwLVxcdTAxMjBdfFtcXHUwMTIyLVxcdTAxMjJdfFtcXHUwMTI0LVxcdTAxMjRdfFtcXHUwMTI2LVxcdTAxMjZdfFtcXHUwMTI4LVxcdTAxMjhdfFtcXHUwMTJBLVxcdTAxMkFdfFtcXHUwMTJDLVxcdTAxMkNdfFtcXHUwMTJFLVxcdTAxMkVdfFtcXHUwMTMwLVxcdTAxMzBdfFtcXHUwMTMyLVxcdTAxMzJdfFtcXHUwMTM0LVxcdTAxMzRdfFtcXHUwMTM2LVxcdTAxMzZdfFtcXHUwMTM5LVxcdTAxMzldfFtcXHUwMTNCLVxcdTAxM0JdfFtcXHUwMTNELVxcdTAxM0RdfFtcXHUwMTNGLVxcdTAxM0ZdfFtcXHUwMTQxLVxcdTAxNDFdfFtcXHUwMTQzLVxcdTAxNDNdfFtcXHUwMTQ1LVxcdTAxNDVdfFtcXHUwMTQ3LVxcdTAxNDddfFtcXHUwMTRBLVxcdTAxNEFdfFtcXHUwMTRDLVxcdTAxNENdfFtcXHUwMTRFLVxcdTAxNEVdfFtcXHUwMTUwLVxcdTAxNTBdfFtcXHUwMTUyLVxcdTAxNTJdfFtcXHUwMTU0LVxcdTAxNTRdfFtcXHUwMTU2LVxcdTAxNTZdfFtcXHUwMTU4LVxcdTAxNThdfFtcXHUwMTVBLVxcdTAxNUFdfFtcXHUwMTVDLVxcdTAxNUNdfFtcXHUwMTVFLVxcdTAxNUVdfFtcXHUwMTYwLVxcdTAxNjBdfFtcXHUwMTYyLVxcdTAxNjJdfFtcXHUwMTY0LVxcdTAxNjRdfFtcXHUwMTY2LVxcdTAxNjZdfFtcXHUwMTY4LVxcdTAxNjhdfFtcXHUwMTZBLVxcdTAxNkFdfFtcXHUwMTZDLVxcdTAxNkNdfFtcXHUwMTZFLVxcdTAxNkVdfFtcXHUwMTcwLVxcdTAxNzBdfFtcXHUwMTcyLVxcdTAxNzJdfFtcXHUwMTc0LVxcdTAxNzRdfFtcXHUwMTc2LVxcdTAxNzZdfFtcXHUwMTc4LVxcdTAxNzldfFtcXHUwMTdCLVxcdTAxN0JdfFtcXHUwMTdELVxcdTAxN0RdfFtcXHUwMTgxLVxcdTAxODJdfFtcXHUwMTg0LVxcdTAxODRdfFtcXHUwMTg2LVxcdTAxODddfFtcXHUwMTg5LVxcdTAxOEJdfFtcXHUwMThFLVxcdTAxOTFdfFtcXHUwMTkzLVxcdTAxOTRdfFtcXHUwMTk2LVxcdTAxOThdfFtcXHUwMTlDLVxcdTAxOURdfFtcXHUwMTlGLVxcdTAxQTBdfFtcXHUwMUEyLVxcdTAxQTJdfFtcXHUwMUE0LVxcdTAxQTRdfFtcXHUwMUE2LVxcdTAxQTddfFtcXHUwMUE5LVxcdTAxQTldfFtcXHUwMUFDLVxcdTAxQUNdfFtcXHUwMUFFLVxcdTAxQUZdfFtcXHUwMUIxLVxcdTAxQjNdfFtcXHUwMUI1LVxcdTAxQjVdfFtcXHUwMUI3LVxcdTAxQjhdfFtcXHUwMUJDLVxcdTAxQkNdfFtcXHUwMUM0LVxcdTAxQzRdfFtcXHUwMUM3LVxcdTAxQzddfFtcXHUwMUNBLVxcdTAxQ0FdfFtcXHUwMUNELVxcdTAxQ0RdfFtcXHUwMUNGLVxcdTAxQ0ZdfFtcXHUwMUQxLVxcdTAxRDFdfFtcXHUwMUQzLVxcdTAxRDNdfFtcXHUwMUQ1LVxcdTAxRDVdfFtcXHUwMUQ3LVxcdTAxRDddfFtcXHUwMUQ5LVxcdTAxRDldfFtcXHUwMURCLVxcdTAxREJdfFtcXHUwMURFLVxcdTAxREVdfFtcXHUwMUUwLVxcdTAxRTBdfFtcXHUwMUUyLVxcdTAxRTJdfFtcXHUwMUU0LVxcdTAxRTRdfFtcXHUwMUU2LVxcdTAxRTZdfFtcXHUwMUU4LVxcdTAxRThdfFtcXHUwMUVBLVxcdTAxRUFdfFtcXHUwMUVDLVxcdTAxRUNdfFtcXHUwMUVFLVxcdTAxRUVdfFtcXHUwMUYxLVxcdTAxRjFdfFtcXHUwMUY0LVxcdTAxRjRdfFtcXHUwMUZBLVxcdTAxRkFdfFtcXHUwMUZDLVxcdTAxRkNdfFtcXHUwMUZFLVxcdTAxRkVdfFtcXHUwMjAwLVxcdTAyMDBdfFtcXHUwMjAyLVxcdTAyMDJdfFtcXHUwMjA0LVxcdTAyMDRdfFtcXHUwMjA2LVxcdTAyMDZdfFtcXHUwMjA4LVxcdTAyMDhdfFtcXHUwMjBBLVxcdTAyMEFdfFtcXHUwMjBDLVxcdTAyMENdfFtcXHUwMjBFLVxcdTAyMEVdfFtcXHUwMjEwLVxcdTAyMTBdfFtcXHUwMjEyLVxcdTAyMTJdfFtcXHUwMjE0LVxcdTAyMTRdfFtcXHUwMjE2LVxcdTAyMTZdfFtcXHUwMzg2LVxcdTAzODZdfFtcXHUwMzg4LVxcdTAzOEFdfFtcXHUwMzhDLVxcdTAzOENdfFtcXHUwMzhFLVxcdTAzOEZdfFtcXHUwMzkxLVxcdTAzQTFdfFtcXHUwM0EzLVxcdTAzQUJdfFtcXHUwM0QyLVxcdTAzRDRdfFtcXHUwM0RBLVxcdTAzREFdfFtcXHUwM0RDLVxcdTAzRENdfFtcXHUwM0RFLVxcdTAzREVdfFtcXHUwM0UwLVxcdTAzRTBdfFtcXHUwM0UyLVxcdTAzRTJdfFtcXHUwM0U0LVxcdTAzRTRdfFtcXHUwM0U2LVxcdTAzRTZdfFtcXHUwM0U4LVxcdTAzRThdfFtcXHUwM0VBLVxcdTAzRUFdfFtcXHUwM0VDLVxcdTAzRUNdfFtcXHUwM0VFLVxcdTAzRUVdfFtcXHUwNDAxLVxcdTA0MENdfFtcXHUwNDBFLVxcdTA0MkZdfFtcXHUwNDYwLVxcdTA0NjBdfFtcXHUwNDYyLVxcdTA0NjJdfFtcXHUwNDY0LVxcdTA0NjRdfFtcXHUwNDY2LVxcdTA0NjZdfFtcXHUwNDY4LVxcdTA0NjhdfFtcXHUwNDZBLVxcdTA0NkFdfFtcXHUwNDZDLVxcdTA0NkNdfFtcXHUwNDZFLVxcdTA0NkVdfFtcXHUwNDcwLVxcdTA0NzBdfFtcXHUwNDcyLVxcdTA0NzJdfFtcXHUwNDc0LVxcdTA0NzRdfFtcXHUwNDc2LVxcdTA0NzZdfFtcXHUwNDc4LVxcdTA0NzhdfFtcXHUwNDdBLVxcdTA0N0FdfFtcXHUwNDdDLVxcdTA0N0NdfFtcXHUwNDdFLVxcdTA0N0VdfFtcXHUwNDgwLVxcdTA0ODBdfFtcXHUwNDkwLVxcdTA0OTBdfFtcXHUwNDkyLVxcdTA0OTJdfFtcXHUwNDk0LVxcdTA0OTRdfFtcXHUwNDk2LVxcdTA0OTZdfFtcXHUwNDk4LVxcdTA0OThdfFtcXHUwNDlBLVxcdTA0OUFdfFtcXHUwNDlDLVxcdTA0OUNdfFtcXHUwNDlFLVxcdTA0OUVdfFtcXHUwNEEwLVxcdTA0QTBdfFtcXHUwNEEyLVxcdTA0QTJdfFtcXHUwNEE0LVxcdTA0QTRdfFtcXHUwNEE2LVxcdTA0QTZdfFtcXHUwNEE4LVxcdTA0QThdfFtcXHUwNEFBLVxcdTA0QUFdfFtcXHUwNEFDLVxcdTA0QUNdfFtcXHUwNEFFLVxcdTA0QUVdfFtcXHUwNEIwLVxcdTA0QjBdfFtcXHUwNEIyLVxcdTA0QjJdfFtcXHUwNEI0LVxcdTA0QjRdfFtcXHUwNEI2LVxcdTA0QjZdfFtcXHUwNEI4LVxcdTA0QjhdfFtcXHUwNEJBLVxcdTA0QkFdfFtcXHUwNEJDLVxcdTA0QkNdfFtcXHUwNEJFLVxcdTA0QkVdfFtcXHUwNEMxLVxcdTA0QzFdfFtcXHUwNEMzLVxcdTA0QzNdfFtcXHUwNEM3LVxcdTA0QzddfFtcXHUwNENCLVxcdTA0Q0JdfFtcXHUwNEQwLVxcdTA0RDBdfFtcXHUwNEQyLVxcdTA0RDJdfFtcXHUwNEQ0LVxcdTA0RDRdfFtcXHUwNEQ2LVxcdTA0RDZdfFtcXHUwNEQ4LVxcdTA0RDhdfFtcXHUwNERBLVxcdTA0REFdfFtcXHUwNERDLVxcdTA0RENdfFtcXHUwNERFLVxcdTA0REVdfFtcXHUwNEUwLVxcdTA0RTBdfFtcXHUwNEUyLVxcdTA0RTJdfFtcXHUwNEU0LVxcdTA0RTRdfFtcXHUwNEU2LVxcdTA0RTZdfFtcXHUwNEU4LVxcdTA0RThdfFtcXHUwNEVBLVxcdTA0RUFdfFtcXHUwNEVFLVxcdTA0RUVdfFtcXHUwNEYwLVxcdTA0RjBdfFtcXHUwNEYyLVxcdTA0RjJdfFtcXHUwNEY0LVxcdTA0RjRdfFtcXHUwNEY4LVxcdTA0RjhdfFtcXHUwNTMxLVxcdTA1NTZdfFtcXHUxMEEwLVxcdTEwQzVdfFtcXHUxRTAwLVxcdTFFMDBdfFtcXHUxRTAyLVxcdTFFMDJdfFtcXHUxRTA0LVxcdTFFMDRdfFtcXHUxRTA2LVxcdTFFMDZdfFtcXHUxRTA4LVxcdTFFMDhdfFtcXHUxRTBBLVxcdTFFMEFdfFtcXHUxRTBDLVxcdTFFMENdfFtcXHUxRTBFLVxcdTFFMEVdfFtcXHUxRTEwLVxcdTFFMTBdfFtcXHUxRTEyLVxcdTFFMTJdfFtcXHUxRTE0LVxcdTFFMTRdfFtcXHUxRTE2LVxcdTFFMTZdfFtcXHUxRTE4LVxcdTFFMThdfFtcXHUxRTFBLVxcdTFFMUFdfFtcXHUxRTFDLVxcdTFFMUNdfFtcXHUxRTFFLVxcdTFFMUVdfFtcXHUxRTIwLVxcdTFFMjBdfFtcXHUxRTIyLVxcdTFFMjJdfFtcXHUxRTI0LVxcdTFFMjRdfFtcXHUxRTI2LVxcdTFFMjZdfFtcXHUxRTI4LVxcdTFFMjhdfFtcXHUxRTJBLVxcdTFFMkFdfFtcXHUxRTJDLVxcdTFFMkNdfFtcXHUxRTJFLVxcdTFFMkVdfFtcXHUxRTMwLVxcdTFFMzBdfFtcXHUxRTMyLVxcdTFFMzJdfFtcXHUxRTM0LVxcdTFFMzRdfFtcXHUxRTM2LVxcdTFFMzZdfFtcXHUxRTM4LVxcdTFFMzhdfFtcXHUxRTNBLVxcdTFFM0FdfFtcXHUxRTNDLVxcdTFFM0NdfFtcXHUxRTNFLVxcdTFFM0VdfFtcXHUxRTQwLVxcdTFFNDBdfFtcXHUxRTQyLVxcdTFFNDJdfFtcXHUxRTQ0LVxcdTFFNDRdfFtcXHUxRTQ2LVxcdTFFNDZdfFtcXHUxRTQ4LVxcdTFFNDhdfFtcXHUxRTRBLVxcdTFFNEFdfFtcXHUxRTRDLVxcdTFFNENdfFtcXHUxRTRFLVxcdTFFNEVdfFtcXHUxRTUwLVxcdTFFNTBdfFtcXHUxRTUyLVxcdTFFNTJdfFtcXHUxRTU0LVxcdTFFNTRdfFtcXHUxRTU2LVxcdTFFNTZdfFtcXHUxRTU4LVxcdTFFNThdfFtcXHUxRTVBLVxcdTFFNUFdfFtcXHUxRTVDLVxcdTFFNUNdfFtcXHUxRTVFLVxcdTFFNUVdfFtcXHUxRTYwLVxcdTFFNjBdfFtcXHUxRTYyLVxcdTFFNjJdfFtcXHUxRTY0LVxcdTFFNjRdfFtcXHUxRTY2LVxcdTFFNjZdfFtcXHUxRTY4LVxcdTFFNjhdfFtcXHUxRTZBLVxcdTFFNkFdfFtcXHUxRTZDLVxcdTFFNkNdfFtcXHUxRTZFLVxcdTFFNkVdfFtcXHUxRTcwLVxcdTFFNzBdfFtcXHUxRTcyLVxcdTFFNzJdfFtcXHUxRTc0LVxcdTFFNzRdfFtcXHUxRTc2LVxcdTFFNzZdfFtcXHUxRTc4LVxcdTFFNzhdfFtcXHUxRTdBLVxcdTFFN0FdfFtcXHUxRTdDLVxcdTFFN0NdfFtcXHUxRTdFLVxcdTFFN0VdfFtcXHUxRTgwLVxcdTFFODBdfFtcXHUxRTgyLVxcdTFFODJdfFtcXHUxRTg0LVxcdTFFODRdfFtcXHUxRTg2LVxcdTFFODZdfFtcXHUxRTg4LVxcdTFFODhdfFtcXHUxRThBLVxcdTFFOEFdfFtcXHUxRThDLVxcdTFFOENdfFtcXHUxRThFLVxcdTFFOEVdfFtcXHUxRTkwLVxcdTFFOTBdfFtcXHUxRTkyLVxcdTFFOTJdfFtcXHUxRTk0LVxcdTFFOTRdfFtcXHUxRUEwLVxcdTFFQTBdfFtcXHUxRUEyLVxcdTFFQTJdfFtcXHUxRUE0LVxcdTFFQTRdfFtcXHUxRUE2LVxcdTFFQTZdfFtcXHUxRUE4LVxcdTFFQThdfFtcXHUxRUFBLVxcdTFFQUFdfFtcXHUxRUFDLVxcdTFFQUNdfFtcXHUxRUFFLVxcdTFFQUVdfFtcXHUxRUIwLVxcdTFFQjBdfFtcXHUxRUIyLVxcdTFFQjJdfFtcXHUxRUI0LVxcdTFFQjRdfFtcXHUxRUI2LVxcdTFFQjZdfFtcXHUxRUI4LVxcdTFFQjhdfFtcXHUxRUJBLVxcdTFFQkFdfFtcXHUxRUJDLVxcdTFFQkNdfFtcXHUxRUJFLVxcdTFFQkVdfFtcXHUxRUMwLVxcdTFFQzBdfFtcXHUxRUMyLVxcdTFFQzJdfFtcXHUxRUM0LVxcdTFFQzRdfFtcXHUxRUM2LVxcdTFFQzZdfFtcXHUxRUM4LVxcdTFFQzhdfFtcXHUxRUNBLVxcdTFFQ0FdfFtcXHUxRUNDLVxcdTFFQ0NdfFtcXHUxRUNFLVxcdTFFQ0VdfFtcXHUxRUQwLVxcdTFFRDBdfFtcXHUxRUQyLVxcdTFFRDJdfFtcXHUxRUQ0LVxcdTFFRDRdfFtcXHUxRUQ2LVxcdTFFRDZdfFtcXHUxRUQ4LVxcdTFFRDhdfFtcXHUxRURBLVxcdTFFREFdfFtcXHUxRURDLVxcdTFFRENdfFtcXHUxRURFLVxcdTFFREVdfFtcXHUxRUUwLVxcdTFFRTBdfFtcXHUxRUUyLVxcdTFFRTJdfFtcXHUxRUU0LVxcdTFFRTRdfFtcXHUxRUU2LVxcdTFFRTZdfFtcXHUxRUU4LVxcdTFFRThdfFtcXHUxRUVBLVxcdTFFRUFdfFtcXHUxRUVDLVxcdTFFRUNdfFtcXHUxRUVFLVxcdTFFRUVdfFtcXHUxRUYwLVxcdTFFRjBdfFtcXHUxRUYyLVxcdTFFRjJdfFtcXHUxRUY0LVxcdTFFRjRdfFtcXHUxRUY2LVxcdTFFRjZdfFtcXHUxRUY4LVxcdTFFRjhdfFtcXHUxRjA4LVxcdTFGMEZdfFtcXHUxRjE4LVxcdTFGMURdfFtcXHUxRjI4LVxcdTFGMkZdfFtcXHUxRjM4LVxcdTFGM0ZdfFtcXHUxRjQ4LVxcdTFGNERdfFtcXHUxRjU5LVxcdTFGNTldfFtcXHUxRjVCLVxcdTFGNUJdfFtcXHUxRjVELVxcdTFGNURdfFtcXHUxRjVGLVxcdTFGNUZdfFtcXHUxRjY4LVxcdTFGNkZdfFtcXHUxRjg4LVxcdTFGOEZdfFtcXHUxRjk4LVxcdTFGOUZdfFtcXHUxRkE4LVxcdTFGQUZdfFtcXHUxRkI4LVxcdTFGQkNdfFtcXHUxRkM4LVxcdTFGQ0NdfFtcXHUxRkQ4LVxcdTFGREJdfFtcXHUxRkU4LVxcdTFGRUNdfFtcXHUxRkY4LVxcdTFGRkNdfFtcXHUyMTAyLVxcdTIxMDJdfFtcXHUyMTA3LVxcdTIxMDddfFtcXHUyMTBCLVxcdTIxMERdfFtcXHUyMTEwLVxcdTIxMTJdfFtcXHUyMTE1LVxcdTIxMTVdfFtcXHUyMTE5LVxcdTIxMURdfFtcXHUyMTI0LVxcdTIxMjRdfFtcXHUyMTI2LVxcdTIxMjZdfFtcXHUyMTI4LVxcdTIxMjhdfFtcXHUyMTJBLVxcdTIxMkRdfFtcXHUyMTMwLVxcdTIxMzFdfFtcXHUyMTMzLVxcdTIxMzNdfFtcXHVGRjIxLVxcdUZGM0FdLyxcbiAgTGw6IC9bXFx1MDA2MS1cXHUwMDdBXXxbXFx1MDBBQS1cXHUwMEFBXXxbXFx1MDBCNS1cXHUwMEI1XXxbXFx1MDBCQS1cXHUwMEJBXXxbXFx1MDBERi1cXHUwMEY2XXxbXFx1MDBGOC1cXHUwMEZGXXxbXFx1MDEwMS1cXHUwMTAxXXxbXFx1MDEwMy1cXHUwMTAzXXxbXFx1MDEwNS1cXHUwMTA1XXxbXFx1MDEwNy1cXHUwMTA3XXxbXFx1MDEwOS1cXHUwMTA5XXxbXFx1MDEwQi1cXHUwMTBCXXxbXFx1MDEwRC1cXHUwMTBEXXxbXFx1MDEwRi1cXHUwMTBGXXxbXFx1MDExMS1cXHUwMTExXXxbXFx1MDExMy1cXHUwMTEzXXxbXFx1MDExNS1cXHUwMTE1XXxbXFx1MDExNy1cXHUwMTE3XXxbXFx1MDExOS1cXHUwMTE5XXxbXFx1MDExQi1cXHUwMTFCXXxbXFx1MDExRC1cXHUwMTFEXXxbXFx1MDExRi1cXHUwMTFGXXxbXFx1MDEyMS1cXHUwMTIxXXxbXFx1MDEyMy1cXHUwMTIzXXxbXFx1MDEyNS1cXHUwMTI1XXxbXFx1MDEyNy1cXHUwMTI3XXxbXFx1MDEyOS1cXHUwMTI5XXxbXFx1MDEyQi1cXHUwMTJCXXxbXFx1MDEyRC1cXHUwMTJEXXxbXFx1MDEyRi1cXHUwMTJGXXxbXFx1MDEzMS1cXHUwMTMxXXxbXFx1MDEzMy1cXHUwMTMzXXxbXFx1MDEzNS1cXHUwMTM1XXxbXFx1MDEzNy1cXHUwMTM4XXxbXFx1MDEzQS1cXHUwMTNBXXxbXFx1MDEzQy1cXHUwMTNDXXxbXFx1MDEzRS1cXHUwMTNFXXxbXFx1MDE0MC1cXHUwMTQwXXxbXFx1MDE0Mi1cXHUwMTQyXXxbXFx1MDE0NC1cXHUwMTQ0XXxbXFx1MDE0Ni1cXHUwMTQ2XXxbXFx1MDE0OC1cXHUwMTQ5XXxbXFx1MDE0Qi1cXHUwMTRCXXxbXFx1MDE0RC1cXHUwMTREXXxbXFx1MDE0Ri1cXHUwMTRGXXxbXFx1MDE1MS1cXHUwMTUxXXxbXFx1MDE1My1cXHUwMTUzXXxbXFx1MDE1NS1cXHUwMTU1XXxbXFx1MDE1Ny1cXHUwMTU3XXxbXFx1MDE1OS1cXHUwMTU5XXxbXFx1MDE1Qi1cXHUwMTVCXXxbXFx1MDE1RC1cXHUwMTVEXXxbXFx1MDE1Ri1cXHUwMTVGXXxbXFx1MDE2MS1cXHUwMTYxXXxbXFx1MDE2My1cXHUwMTYzXXxbXFx1MDE2NS1cXHUwMTY1XXxbXFx1MDE2Ny1cXHUwMTY3XXxbXFx1MDE2OS1cXHUwMTY5XXxbXFx1MDE2Qi1cXHUwMTZCXXxbXFx1MDE2RC1cXHUwMTZEXXxbXFx1MDE2Ri1cXHUwMTZGXXxbXFx1MDE3MS1cXHUwMTcxXXxbXFx1MDE3My1cXHUwMTczXXxbXFx1MDE3NS1cXHUwMTc1XXxbXFx1MDE3Ny1cXHUwMTc3XXxbXFx1MDE3QS1cXHUwMTdBXXxbXFx1MDE3Qy1cXHUwMTdDXXxbXFx1MDE3RS1cXHUwMTgwXXxbXFx1MDE4My1cXHUwMTgzXXxbXFx1MDE4NS1cXHUwMTg1XXxbXFx1MDE4OC1cXHUwMTg4XXxbXFx1MDE4Qy1cXHUwMThEXXxbXFx1MDE5Mi1cXHUwMTkyXXxbXFx1MDE5NS1cXHUwMTk1XXxbXFx1MDE5OS1cXHUwMTlCXXxbXFx1MDE5RS1cXHUwMTlFXXxbXFx1MDFBMS1cXHUwMUExXXxbXFx1MDFBMy1cXHUwMUEzXXxbXFx1MDFBNS1cXHUwMUE1XXxbXFx1MDFBOC1cXHUwMUE4XXxbXFx1MDFBQi1cXHUwMUFCXXxbXFx1MDFBRC1cXHUwMUFEXXxbXFx1MDFCMC1cXHUwMUIwXXxbXFx1MDFCNC1cXHUwMUI0XXxbXFx1MDFCNi1cXHUwMUI2XXxbXFx1MDFCOS1cXHUwMUJBXXxbXFx1MDFCRC1cXHUwMUJEXXxbXFx1MDFDNi1cXHUwMUM2XXxbXFx1MDFDOS1cXHUwMUM5XXxbXFx1MDFDQy1cXHUwMUNDXXxbXFx1MDFDRS1cXHUwMUNFXXxbXFx1MDFEMC1cXHUwMUQwXXxbXFx1MDFEMi1cXHUwMUQyXXxbXFx1MDFENC1cXHUwMUQ0XXxbXFx1MDFENi1cXHUwMUQ2XXxbXFx1MDFEOC1cXHUwMUQ4XXxbXFx1MDFEQS1cXHUwMURBXXxbXFx1MDFEQy1cXHUwMUREXXxbXFx1MDFERi1cXHUwMURGXXxbXFx1MDFFMS1cXHUwMUUxXXxbXFx1MDFFMy1cXHUwMUUzXXxbXFx1MDFFNS1cXHUwMUU1XXxbXFx1MDFFNy1cXHUwMUU3XXxbXFx1MDFFOS1cXHUwMUU5XXxbXFx1MDFFQi1cXHUwMUVCXXxbXFx1MDFFRC1cXHUwMUVEXXxbXFx1MDFFRi1cXHUwMUYwXXxbXFx1MDFGMy1cXHUwMUYzXXxbXFx1MDFGNS1cXHUwMUY1XXxbXFx1MDFGQi1cXHUwMUZCXXxbXFx1MDFGRC1cXHUwMUZEXXxbXFx1MDFGRi1cXHUwMUZGXXxbXFx1MDIwMS1cXHUwMjAxXXxbXFx1MDIwMy1cXHUwMjAzXXxbXFx1MDIwNS1cXHUwMjA1XXxbXFx1MDIwNy1cXHUwMjA3XXxbXFx1MDIwOS1cXHUwMjA5XXxbXFx1MDIwQi1cXHUwMjBCXXxbXFx1MDIwRC1cXHUwMjBEXXxbXFx1MDIwRi1cXHUwMjBGXXxbXFx1MDIxMS1cXHUwMjExXXxbXFx1MDIxMy1cXHUwMjEzXXxbXFx1MDIxNS1cXHUwMjE1XXxbXFx1MDIxNy1cXHUwMjE3XXxbXFx1MDI1MC1cXHUwMkE4XXxbXFx1MDM5MC1cXHUwMzkwXXxbXFx1MDNBQy1cXHUwM0NFXXxbXFx1MDNEMC1cXHUwM0QxXXxbXFx1MDNENS1cXHUwM0Q2XXxbXFx1MDNFMy1cXHUwM0UzXXxbXFx1MDNFNS1cXHUwM0U1XXxbXFx1MDNFNy1cXHUwM0U3XXxbXFx1MDNFOS1cXHUwM0U5XXxbXFx1MDNFQi1cXHUwM0VCXXxbXFx1MDNFRC1cXHUwM0VEXXxbXFx1MDNFRi1cXHUwM0YyXXxbXFx1MDQzMC1cXHUwNDRGXXxbXFx1MDQ1MS1cXHUwNDVDXXxbXFx1MDQ1RS1cXHUwNDVGXXxbXFx1MDQ2MS1cXHUwNDYxXXxbXFx1MDQ2My1cXHUwNDYzXXxbXFx1MDQ2NS1cXHUwNDY1XXxbXFx1MDQ2Ny1cXHUwNDY3XXxbXFx1MDQ2OS1cXHUwNDY5XXxbXFx1MDQ2Qi1cXHUwNDZCXXxbXFx1MDQ2RC1cXHUwNDZEXXxbXFx1MDQ2Ri1cXHUwNDZGXXxbXFx1MDQ3MS1cXHUwNDcxXXxbXFx1MDQ3My1cXHUwNDczXXxbXFx1MDQ3NS1cXHUwNDc1XXxbXFx1MDQ3Ny1cXHUwNDc3XXxbXFx1MDQ3OS1cXHUwNDc5XXxbXFx1MDQ3Qi1cXHUwNDdCXXxbXFx1MDQ3RC1cXHUwNDdEXXxbXFx1MDQ3Ri1cXHUwNDdGXXxbXFx1MDQ4MS1cXHUwNDgxXXxbXFx1MDQ5MS1cXHUwNDkxXXxbXFx1MDQ5My1cXHUwNDkzXXxbXFx1MDQ5NS1cXHUwNDk1XXxbXFx1MDQ5Ny1cXHUwNDk3XXxbXFx1MDQ5OS1cXHUwNDk5XXxbXFx1MDQ5Qi1cXHUwNDlCXXxbXFx1MDQ5RC1cXHUwNDlEXXxbXFx1MDQ5Ri1cXHUwNDlGXXxbXFx1MDRBMS1cXHUwNEExXXxbXFx1MDRBMy1cXHUwNEEzXXxbXFx1MDRBNS1cXHUwNEE1XXxbXFx1MDRBNy1cXHUwNEE3XXxbXFx1MDRBOS1cXHUwNEE5XXxbXFx1MDRBQi1cXHUwNEFCXXxbXFx1MDRBRC1cXHUwNEFEXXxbXFx1MDRBRi1cXHUwNEFGXXxbXFx1MDRCMS1cXHUwNEIxXXxbXFx1MDRCMy1cXHUwNEIzXXxbXFx1MDRCNS1cXHUwNEI1XXxbXFx1MDRCNy1cXHUwNEI3XXxbXFx1MDRCOS1cXHUwNEI5XXxbXFx1MDRCQi1cXHUwNEJCXXxbXFx1MDRCRC1cXHUwNEJEXXxbXFx1MDRCRi1cXHUwNEJGXXxbXFx1MDRDMi1cXHUwNEMyXXxbXFx1MDRDNC1cXHUwNEM0XXxbXFx1MDRDOC1cXHUwNEM4XXxbXFx1MDRDQy1cXHUwNENDXXxbXFx1MDREMS1cXHUwNEQxXXxbXFx1MDREMy1cXHUwNEQzXXxbXFx1MDRENS1cXHUwNEQ1XXxbXFx1MDRENy1cXHUwNEQ3XXxbXFx1MDREOS1cXHUwNEQ5XXxbXFx1MDREQi1cXHUwNERCXXxbXFx1MDRERC1cXHUwNEREXXxbXFx1MDRERi1cXHUwNERGXXxbXFx1MDRFMS1cXHUwNEUxXXxbXFx1MDRFMy1cXHUwNEUzXXxbXFx1MDRFNS1cXHUwNEU1XXxbXFx1MDRFNy1cXHUwNEU3XXxbXFx1MDRFOS1cXHUwNEU5XXxbXFx1MDRFQi1cXHUwNEVCXXxbXFx1MDRFRi1cXHUwNEVGXXxbXFx1MDRGMS1cXHUwNEYxXXxbXFx1MDRGMy1cXHUwNEYzXXxbXFx1MDRGNS1cXHUwNEY1XXxbXFx1MDRGOS1cXHUwNEY5XXxbXFx1MDU2MS1cXHUwNTg3XXxbXFx1MTBEMC1cXHUxMEY2XXxbXFx1MUUwMS1cXHUxRTAxXXxbXFx1MUUwMy1cXHUxRTAzXXxbXFx1MUUwNS1cXHUxRTA1XXxbXFx1MUUwNy1cXHUxRTA3XXxbXFx1MUUwOS1cXHUxRTA5XXxbXFx1MUUwQi1cXHUxRTBCXXxbXFx1MUUwRC1cXHUxRTBEXXxbXFx1MUUwRi1cXHUxRTBGXXxbXFx1MUUxMS1cXHUxRTExXXxbXFx1MUUxMy1cXHUxRTEzXXxbXFx1MUUxNS1cXHUxRTE1XXxbXFx1MUUxNy1cXHUxRTE3XXxbXFx1MUUxOS1cXHUxRTE5XXxbXFx1MUUxQi1cXHUxRTFCXXxbXFx1MUUxRC1cXHUxRTFEXXxbXFx1MUUxRi1cXHUxRTFGXXxbXFx1MUUyMS1cXHUxRTIxXXxbXFx1MUUyMy1cXHUxRTIzXXxbXFx1MUUyNS1cXHUxRTI1XXxbXFx1MUUyNy1cXHUxRTI3XXxbXFx1MUUyOS1cXHUxRTI5XXxbXFx1MUUyQi1cXHUxRTJCXXxbXFx1MUUyRC1cXHUxRTJEXXxbXFx1MUUyRi1cXHUxRTJGXXxbXFx1MUUzMS1cXHUxRTMxXXxbXFx1MUUzMy1cXHUxRTMzXXxbXFx1MUUzNS1cXHUxRTM1XXxbXFx1MUUzNy1cXHUxRTM3XXxbXFx1MUUzOS1cXHUxRTM5XXxbXFx1MUUzQi1cXHUxRTNCXXxbXFx1MUUzRC1cXHUxRTNEXXxbXFx1MUUzRi1cXHUxRTNGXXxbXFx1MUU0MS1cXHUxRTQxXXxbXFx1MUU0My1cXHUxRTQzXXxbXFx1MUU0NS1cXHUxRTQ1XXxbXFx1MUU0Ny1cXHUxRTQ3XXxbXFx1MUU0OS1cXHUxRTQ5XXxbXFx1MUU0Qi1cXHUxRTRCXXxbXFx1MUU0RC1cXHUxRTREXXxbXFx1MUU0Ri1cXHUxRTRGXXxbXFx1MUU1MS1cXHUxRTUxXXxbXFx1MUU1My1cXHUxRTUzXXxbXFx1MUU1NS1cXHUxRTU1XXxbXFx1MUU1Ny1cXHUxRTU3XXxbXFx1MUU1OS1cXHUxRTU5XXxbXFx1MUU1Qi1cXHUxRTVCXXxbXFx1MUU1RC1cXHUxRTVEXXxbXFx1MUU1Ri1cXHUxRTVGXXxbXFx1MUU2MS1cXHUxRTYxXXxbXFx1MUU2My1cXHUxRTYzXXxbXFx1MUU2NS1cXHUxRTY1XXxbXFx1MUU2Ny1cXHUxRTY3XXxbXFx1MUU2OS1cXHUxRTY5XXxbXFx1MUU2Qi1cXHUxRTZCXXxbXFx1MUU2RC1cXHUxRTZEXXxbXFx1MUU2Ri1cXHUxRTZGXXxbXFx1MUU3MS1cXHUxRTcxXXxbXFx1MUU3My1cXHUxRTczXXxbXFx1MUU3NS1cXHUxRTc1XXxbXFx1MUU3Ny1cXHUxRTc3XXxbXFx1MUU3OS1cXHUxRTc5XXxbXFx1MUU3Qi1cXHUxRTdCXXxbXFx1MUU3RC1cXHUxRTdEXXxbXFx1MUU3Ri1cXHUxRTdGXXxbXFx1MUU4MS1cXHUxRTgxXXxbXFx1MUU4My1cXHUxRTgzXXxbXFx1MUU4NS1cXHUxRTg1XXxbXFx1MUU4Ny1cXHUxRTg3XXxbXFx1MUU4OS1cXHUxRTg5XXxbXFx1MUU4Qi1cXHUxRThCXXxbXFx1MUU4RC1cXHUxRThEXXxbXFx1MUU4Ri1cXHUxRThGXXxbXFx1MUU5MS1cXHUxRTkxXXxbXFx1MUU5My1cXHUxRTkzXXxbXFx1MUU5NS1cXHUxRTlCXXxbXFx1MUVBMS1cXHUxRUExXXxbXFx1MUVBMy1cXHUxRUEzXXxbXFx1MUVBNS1cXHUxRUE1XXxbXFx1MUVBNy1cXHUxRUE3XXxbXFx1MUVBOS1cXHUxRUE5XXxbXFx1MUVBQi1cXHUxRUFCXXxbXFx1MUVBRC1cXHUxRUFEXXxbXFx1MUVBRi1cXHUxRUFGXXxbXFx1MUVCMS1cXHUxRUIxXXxbXFx1MUVCMy1cXHUxRUIzXXxbXFx1MUVCNS1cXHUxRUI1XXxbXFx1MUVCNy1cXHUxRUI3XXxbXFx1MUVCOS1cXHUxRUI5XXxbXFx1MUVCQi1cXHUxRUJCXXxbXFx1MUVCRC1cXHUxRUJEXXxbXFx1MUVCRi1cXHUxRUJGXXxbXFx1MUVDMS1cXHUxRUMxXXxbXFx1MUVDMy1cXHUxRUMzXXxbXFx1MUVDNS1cXHUxRUM1XXxbXFx1MUVDNy1cXHUxRUM3XXxbXFx1MUVDOS1cXHUxRUM5XXxbXFx1MUVDQi1cXHUxRUNCXXxbXFx1MUVDRC1cXHUxRUNEXXxbXFx1MUVDRi1cXHUxRUNGXXxbXFx1MUVEMS1cXHUxRUQxXXxbXFx1MUVEMy1cXHUxRUQzXXxbXFx1MUVENS1cXHUxRUQ1XXxbXFx1MUVENy1cXHUxRUQ3XXxbXFx1MUVEOS1cXHUxRUQ5XXxbXFx1MUVEQi1cXHUxRURCXXxbXFx1MUVERC1cXHUxRUREXXxbXFx1MUVERi1cXHUxRURGXXxbXFx1MUVFMS1cXHUxRUUxXXxbXFx1MUVFMy1cXHUxRUUzXXxbXFx1MUVFNS1cXHUxRUU1XXxbXFx1MUVFNy1cXHUxRUU3XXxbXFx1MUVFOS1cXHUxRUU5XXxbXFx1MUVFQi1cXHUxRUVCXXxbXFx1MUVFRC1cXHUxRUVEXXxbXFx1MUVFRi1cXHUxRUVGXXxbXFx1MUVGMS1cXHUxRUYxXXxbXFx1MUVGMy1cXHUxRUYzXXxbXFx1MUVGNS1cXHUxRUY1XXxbXFx1MUVGNy1cXHUxRUY3XXxbXFx1MUVGOS1cXHUxRUY5XXxbXFx1MUYwMC1cXHUxRjA3XXxbXFx1MUYxMC1cXHUxRjE1XXxbXFx1MUYyMC1cXHUxRjI3XXxbXFx1MUYzMC1cXHUxRjM3XXxbXFx1MUY0MC1cXHUxRjQ1XXxbXFx1MUY1MC1cXHUxRjU3XXxbXFx1MUY2MC1cXHUxRjY3XXxbXFx1MUY3MC1cXHUxRjdEXXxbXFx1MUY4MC1cXHUxRjg3XXxbXFx1MUY5MC1cXHUxRjk3XXxbXFx1MUZBMC1cXHUxRkE3XXxbXFx1MUZCMC1cXHUxRkI0XXxbXFx1MUZCNi1cXHUxRkI3XXxbXFx1MUZCRS1cXHUxRkJFXXxbXFx1MUZDMi1cXHUxRkM0XXxbXFx1MUZDNi1cXHUxRkM3XXxbXFx1MUZEMC1cXHUxRkQzXXxbXFx1MUZENi1cXHUxRkQ3XXxbXFx1MUZFMC1cXHUxRkU3XXxbXFx1MUZGMi1cXHUxRkY0XXxbXFx1MUZGNi1cXHUxRkY3XXxbXFx1MjA3Ri1cXHUyMDdGXXxbXFx1MjEwQS1cXHUyMTBBXXxbXFx1MjEwRS1cXHUyMTBGXXxbXFx1MjExMy1cXHUyMTEzXXxbXFx1MjExOC1cXHUyMTE4XXxbXFx1MjEyRS1cXHUyMTJGXXxbXFx1MjEzNC1cXHUyMTM0XXxbXFx1RkIwMC1cXHVGQjA2XXxbXFx1RkIxMy1cXHVGQjE3XXxbXFx1RkY0MS1cXHVGRjVBXS8sXG4gIEx0OiAvW1xcdTAxQzUtXFx1MDFDNV18W1xcdTAxQzgtXFx1MDFDOF18W1xcdTAxQ0ItXFx1MDFDQl18W1xcdTAxRjItXFx1MDFGMl0vLFxuICBMbTogL1tcXHUwMkIwLVxcdTAyQjhdfFtcXHUwMkJCLVxcdTAyQzFdfFtcXHUwMkQwLVxcdTAyRDFdfFtcXHUwMkUwLVxcdTAyRTRdfFtcXHUwMzdBLVxcdTAzN0FdfFtcXHUwNTU5LVxcdTA1NTldfFtcXHUwNjQwLVxcdTA2NDBdfFtcXHUwNkU1LVxcdTA2RTZdfFtcXHUwRTQ2LVxcdTBFNDZdfFtcXHUwRUM2LVxcdTBFQzZdfFtcXHUzMDA1LVxcdTMwMDVdfFtcXHUzMDMxLVxcdTMwMzVdfFtcXHUzMDlELVxcdTMwOUVdfFtcXHUzMEZDLVxcdTMwRkVdfFtcXHVGRjcwLVxcdUZGNzBdfFtcXHVGRjlFLVxcdUZGOUZdLyxcbiAgTG86IC9bXFx1MDFBQS1cXHUwMUFBXXxbXFx1MDFCQi1cXHUwMUJCXXxbXFx1MDFCRS1cXHUwMUMzXXxbXFx1MDNGMy1cXHUwM0YzXXxbXFx1MDRDMC1cXHUwNEMwXXxbXFx1MDVEMC1cXHUwNUVBXXxbXFx1MDVGMC1cXHUwNUYyXXxbXFx1MDYyMS1cXHUwNjNBXXxbXFx1MDY0MS1cXHUwNjRBXXxbXFx1MDY3MS1cXHUwNkI3XXxbXFx1MDZCQS1cXHUwNkJFXXxbXFx1MDZDMC1cXHUwNkNFXXxbXFx1MDZEMC1cXHUwNkQzXXxbXFx1MDZENS1cXHUwNkQ1XXxbXFx1MDkwNS1cXHUwOTM5XXxbXFx1MDkzRC1cXHUwOTNEXXxbXFx1MDk1MC1cXHUwOTUwXXxbXFx1MDk1OC1cXHUwOTYxXXxbXFx1MDk4NS1cXHUwOThDXXxbXFx1MDk4Ri1cXHUwOTkwXXxbXFx1MDk5My1cXHUwOUE4XXxbXFx1MDlBQS1cXHUwOUIwXXxbXFx1MDlCMi1cXHUwOUIyXXxbXFx1MDlCNi1cXHUwOUI5XXxbXFx1MDlEQy1cXHUwOUREXXxbXFx1MDlERi1cXHUwOUUxXXxbXFx1MDlGMC1cXHUwOUYxXXxbXFx1MEEwNS1cXHUwQTBBXXxbXFx1MEEwRi1cXHUwQTEwXXxbXFx1MEExMy1cXHUwQTI4XXxbXFx1MEEyQS1cXHUwQTMwXXxbXFx1MEEzMi1cXHUwQTMzXXxbXFx1MEEzNS1cXHUwQTM2XXxbXFx1MEEzOC1cXHUwQTM5XXxbXFx1MEE1OS1cXHUwQTVDXXxbXFx1MEE1RS1cXHUwQTVFXXxbXFx1MEE3Mi1cXHUwQTc0XXxbXFx1MEE4NS1cXHUwQThCXXxbXFx1MEE4RC1cXHUwQThEXXxbXFx1MEE4Ri1cXHUwQTkxXXxbXFx1MEE5My1cXHUwQUE4XXxbXFx1MEFBQS1cXHUwQUIwXXxbXFx1MEFCMi1cXHUwQUIzXXxbXFx1MEFCNS1cXHUwQUI5XXxbXFx1MEFCRC1cXHUwQUJEXXxbXFx1MEFEMC1cXHUwQUQwXXxbXFx1MEFFMC1cXHUwQUUwXXxbXFx1MEIwNS1cXHUwQjBDXXxbXFx1MEIwRi1cXHUwQjEwXXxbXFx1MEIxMy1cXHUwQjI4XXxbXFx1MEIyQS1cXHUwQjMwXXxbXFx1MEIzMi1cXHUwQjMzXXxbXFx1MEIzNi1cXHUwQjM5XXxbXFx1MEIzRC1cXHUwQjNEXXxbXFx1MEI1Qy1cXHUwQjVEXXxbXFx1MEI1Ri1cXHUwQjYxXXxbXFx1MEI4NS1cXHUwQjhBXXxbXFx1MEI4RS1cXHUwQjkwXXxbXFx1MEI5Mi1cXHUwQjk1XXxbXFx1MEI5OS1cXHUwQjlBXXxbXFx1MEI5Qy1cXHUwQjlDXXxbXFx1MEI5RS1cXHUwQjlGXXxbXFx1MEJBMy1cXHUwQkE0XXxbXFx1MEJBOC1cXHUwQkFBXXxbXFx1MEJBRS1cXHUwQkI1XXxbXFx1MEJCNy1cXHUwQkI5XXxbXFx1MEMwNS1cXHUwQzBDXXxbXFx1MEMwRS1cXHUwQzEwXXxbXFx1MEMxMi1cXHUwQzI4XXxbXFx1MEMyQS1cXHUwQzMzXXxbXFx1MEMzNS1cXHUwQzM5XXxbXFx1MEM2MC1cXHUwQzYxXXxbXFx1MEM4NS1cXHUwQzhDXXxbXFx1MEM4RS1cXHUwQzkwXXxbXFx1MEM5Mi1cXHUwQ0E4XXxbXFx1MENBQS1cXHUwQ0IzXXxbXFx1MENCNS1cXHUwQ0I5XXxbXFx1MENERS1cXHUwQ0RFXXxbXFx1MENFMC1cXHUwQ0UxXXxbXFx1MEQwNS1cXHUwRDBDXXxbXFx1MEQwRS1cXHUwRDEwXXxbXFx1MEQxMi1cXHUwRDI4XXxbXFx1MEQyQS1cXHUwRDM5XXxbXFx1MEQ2MC1cXHUwRDYxXXxbXFx1MEUwMS1cXHUwRTMwXXxbXFx1MEUzMi1cXHUwRTMzXXxbXFx1MEU0MC1cXHUwRTQ1XXxbXFx1MEU4MS1cXHUwRTgyXXxbXFx1MEU4NC1cXHUwRTg0XXxbXFx1MEU4Ny1cXHUwRTg4XXxbXFx1MEU4QS1cXHUwRThBXXxbXFx1MEU4RC1cXHUwRThEXXxbXFx1MEU5NC1cXHUwRTk3XXxbXFx1MEU5OS1cXHUwRTlGXXxbXFx1MEVBMS1cXHUwRUEzXXxbXFx1MEVBNS1cXHUwRUE1XXxbXFx1MEVBNy1cXHUwRUE3XXxbXFx1MEVBQS1cXHUwRUFCXXxbXFx1MEVBRC1cXHUwRUIwXXxbXFx1MEVCMi1cXHUwRUIzXXxbXFx1MEVCRC1cXHUwRUJEXXxbXFx1MEVDMC1cXHUwRUM0XXxbXFx1MEVEQy1cXHUwRUREXXxbXFx1MEYwMC1cXHUwRjAwXXxbXFx1MEY0MC1cXHUwRjQ3XXxbXFx1MEY0OS1cXHUwRjY5XXxbXFx1MEY4OC1cXHUwRjhCXXxbXFx1MTEwMC1cXHUxMTU5XXxbXFx1MTE1Ri1cXHUxMUEyXXxbXFx1MTFBOC1cXHUxMUY5XXxbXFx1MjEzNS1cXHUyMTM4XXxbXFx1MzAwNi1cXHUzMDA2XXxbXFx1MzA0MS1cXHUzMDk0XXxbXFx1MzBBMS1cXHUzMEZBXXxbXFx1MzEwNS1cXHUzMTJDXXxbXFx1MzEzMS1cXHUzMThFXXxbXFx1NEUwMC1cXHU5RkE1XXxbXFx1QUMwMC1cXHVEN0EzXXxbXFx1RjkwMC1cXHVGQTJEXXxbXFx1RkIxRi1cXHVGQjI4XXxbXFx1RkIyQS1cXHVGQjM2XXxbXFx1RkIzOC1cXHVGQjNDXXxbXFx1RkIzRS1cXHVGQjNFXXxbXFx1RkI0MC1cXHVGQjQxXXxbXFx1RkI0My1cXHVGQjQ0XXxbXFx1RkI0Ni1cXHVGQkIxXXxbXFx1RkJEMy1cXHVGRDNEXXxbXFx1RkQ1MC1cXHVGRDhGXXxbXFx1RkQ5Mi1cXHVGREM3XXxbXFx1RkRGMC1cXHVGREZCXXxbXFx1RkU3MC1cXHVGRTcyXXxbXFx1RkU3NC1cXHVGRTc0XXxbXFx1RkU3Ni1cXHVGRUZDXXxbXFx1RkY2Ni1cXHVGRjZGXXxbXFx1RkY3MS1cXHVGRjlEXXxbXFx1RkZBMC1cXHVGRkJFXXxbXFx1RkZDMi1cXHVGRkM3XXxbXFx1RkZDQS1cXHVGRkNGXXxbXFx1RkZEMi1cXHVGRkQ3XXxbXFx1RkZEQS1cXHVGRkRDXS8sXG5cbiAgLy8gTnVtYmVyc1xuICBObDogL1tcXHUyMTYwLVxcdTIxODJdfFtcXHUzMDA3LVxcdTMwMDddfFtcXHUzMDIxLVxcdTMwMjldLyxcbiAgTmQ6IC9bXFx1MDAzMC1cXHUwMDM5XXxbXFx1MDY2MC1cXHUwNjY5XXxbXFx1MDZGMC1cXHUwNkY5XXxbXFx1MDk2Ni1cXHUwOTZGXXxbXFx1MDlFNi1cXHUwOUVGXXxbXFx1MEE2Ni1cXHUwQTZGXXxbXFx1MEFFNi1cXHUwQUVGXXxbXFx1MEI2Ni1cXHUwQjZGXXxbXFx1MEJFNy1cXHUwQkVGXXxbXFx1MEM2Ni1cXHUwQzZGXXxbXFx1MENFNi1cXHUwQ0VGXXxbXFx1MEQ2Ni1cXHUwRDZGXXxbXFx1MEU1MC1cXHUwRTU5XXxbXFx1MEVEMC1cXHUwRUQ5XXxbXFx1MEYyMC1cXHUwRjI5XXxbXFx1RkYxMC1cXHVGRjE5XS8sXG5cbiAgLy8gTWFya3NcbiAgTW46IC9bXFx1MDMwMC1cXHUwMzQ1XXxbXFx1MDM2MC1cXHUwMzYxXXxbXFx1MDQ4My1cXHUwNDg2XXxbXFx1MDU5MS1cXHUwNUExXXxbXFx1MDVBMy1cXHUwNUI5XXxbXFx1MDVCQi1cXHUwNUJEXXxbXFx1MDVCRi1cXHUwNUJGXXxbXFx1MDVDMS1cXHUwNUMyXXxbXFx1MDVDNC1cXHUwNUM0XXxbXFx1MDY0Qi1cXHUwNjUyXXxbXFx1MDY3MC1cXHUwNjcwXXxbXFx1MDZENi1cXHUwNkRDXXxbXFx1MDZERi1cXHUwNkU0XXxbXFx1MDZFNy1cXHUwNkU4XXxbXFx1MDZFQS1cXHUwNkVEXXxbXFx1MDkwMS1cXHUwOTAyXXxbXFx1MDkzQy1cXHUwOTNDXXxbXFx1MDk0MS1cXHUwOTQ4XXxbXFx1MDk0RC1cXHUwOTREXXxbXFx1MDk1MS1cXHUwOTU0XXxbXFx1MDk2Mi1cXHUwOTYzXXxbXFx1MDk4MS1cXHUwOTgxXXxbXFx1MDlCQy1cXHUwOUJDXXxbXFx1MDlDMS1cXHUwOUM0XXxbXFx1MDlDRC1cXHUwOUNEXXxbXFx1MDlFMi1cXHUwOUUzXXxbXFx1MEEwMi1cXHUwQTAyXXxbXFx1MEEzQy1cXHUwQTNDXXxbXFx1MEE0MS1cXHUwQTQyXXxbXFx1MEE0Ny1cXHUwQTQ4XXxbXFx1MEE0Qi1cXHUwQTREXXxbXFx1MEE3MC1cXHUwQTcxXXxbXFx1MEE4MS1cXHUwQTgyXXxbXFx1MEFCQy1cXHUwQUJDXXxbXFx1MEFDMS1cXHUwQUM1XXxbXFx1MEFDNy1cXHUwQUM4XXxbXFx1MEFDRC1cXHUwQUNEXXxbXFx1MEIwMS1cXHUwQjAxXXxbXFx1MEIzQy1cXHUwQjNDXXxbXFx1MEIzRi1cXHUwQjNGXXxbXFx1MEI0MS1cXHUwQjQzXXxbXFx1MEI0RC1cXHUwQjREXXxbXFx1MEI1Ni1cXHUwQjU2XXxbXFx1MEI4Mi1cXHUwQjgyXXxbXFx1MEJDMC1cXHUwQkMwXXxbXFx1MEJDRC1cXHUwQkNEXXxbXFx1MEMzRS1cXHUwQzQwXXxbXFx1MEM0Ni1cXHUwQzQ4XXxbXFx1MEM0QS1cXHUwQzREXXxbXFx1MEM1NS1cXHUwQzU2XXxbXFx1MENCRi1cXHUwQ0JGXXxbXFx1MENDNi1cXHUwQ0M2XXxbXFx1MENDQy1cXHUwQ0NEXXxbXFx1MEQ0MS1cXHUwRDQzXXxbXFx1MEQ0RC1cXHUwRDREXXxbXFx1MEUzMS1cXHUwRTMxXXxbXFx1MEUzNC1cXHUwRTNBXXxbXFx1MEU0Ny1cXHUwRTRFXXxbXFx1MEVCMS1cXHUwRUIxXXxbXFx1MEVCNC1cXHUwRUI5XXxbXFx1MEVCQi1cXHUwRUJDXXxbXFx1MEVDOC1cXHUwRUNEXXxbXFx1MEYxOC1cXHUwRjE5XXxbXFx1MEYzNS1cXHUwRjM1XXxbXFx1MEYzNy1cXHUwRjM3XXxbXFx1MEYzOS1cXHUwRjM5XXxbXFx1MEY3MS1cXHUwRjdFXXxbXFx1MEY4MC1cXHUwRjg0XXxbXFx1MEY4Ni1cXHUwRjg3XXxbXFx1MEY5MC1cXHUwRjk1XXxbXFx1MEY5Ny1cXHUwRjk3XXxbXFx1MEY5OS1cXHUwRkFEXXxbXFx1MEZCMS1cXHUwRkI3XXxbXFx1MEZCOS1cXHUwRkI5XXxbXFx1MjBEMC1cXHUyMERDXXxbXFx1MjBFMS1cXHUyMEUxXXxbXFx1MzAyQS1cXHUzMDJGXXxbXFx1MzA5OS1cXHUzMDlBXXxbXFx1RkIxRS1cXHVGQjFFXXxbXFx1RkUyMC1cXHVGRTIzXS8sXG4gIE1jOiAvW1xcdTA5MDMtXFx1MDkwM118W1xcdTA5M0UtXFx1MDk0MF18W1xcdTA5NDktXFx1MDk0Q118W1xcdTA5ODItXFx1MDk4M118W1xcdTA5QkUtXFx1MDlDMF18W1xcdTA5QzctXFx1MDlDOF18W1xcdTA5Q0ItXFx1MDlDQ118W1xcdTA5RDctXFx1MDlEN118W1xcdTBBM0UtXFx1MEE0MF18W1xcdTBBODMtXFx1MEE4M118W1xcdTBBQkUtXFx1MEFDMF18W1xcdTBBQzktXFx1MEFDOV18W1xcdTBBQ0ItXFx1MEFDQ118W1xcdTBCMDItXFx1MEIwM118W1xcdTBCM0UtXFx1MEIzRV18W1xcdTBCNDAtXFx1MEI0MF18W1xcdTBCNDctXFx1MEI0OF18W1xcdTBCNEItXFx1MEI0Q118W1xcdTBCNTctXFx1MEI1N118W1xcdTBCODMtXFx1MEI4M118W1xcdTBCQkUtXFx1MEJCRl18W1xcdTBCQzEtXFx1MEJDMl18W1xcdTBCQzYtXFx1MEJDOF18W1xcdTBCQ0EtXFx1MEJDQ118W1xcdTBCRDctXFx1MEJEN118W1xcdTBDMDEtXFx1MEMwM118W1xcdTBDNDEtXFx1MEM0NF18W1xcdTBDODItXFx1MEM4M118W1xcdTBDQkUtXFx1MENCRV18W1xcdTBDQzAtXFx1MENDNF18W1xcdTBDQzctXFx1MENDOF18W1xcdTBDQ0EtXFx1MENDQl18W1xcdTBDRDUtXFx1MENENl18W1xcdTBEMDItXFx1MEQwM118W1xcdTBEM0UtXFx1MEQ0MF18W1xcdTBENDYtXFx1MEQ0OF18W1xcdTBENEEtXFx1MEQ0Q118W1xcdTBENTctXFx1MEQ1N118W1xcdTBGM0UtXFx1MEYzRl18W1xcdTBGN0YtXFx1MEY3Rl0vLFxuXG4gIC8vIFB1bmN0dWF0aW9uLCBDb25uZWN0b3JcbiAgUGM6IC9bXFx1MDA1Ri1cXHUwMDVGXXxbXFx1MjAzRi1cXHUyMDQwXXxbXFx1MzBGQi1cXHUzMEZCXXxbXFx1RkUzMy1cXHVGRTM0XXxbXFx1RkU0RC1cXHVGRTRGXXxbXFx1RkYzRi1cXHVGRjNGXXxbXFx1RkY2NS1cXHVGRjY1XS8sXG5cbiAgLy8gU2VwYXJhdG9yLCBTcGFjZVxuICBaczogL1tcXHUyMDAwLVxcdTIwMEJdfFtcXHUzMDAwLVxcdTMwMDBdLyxcblxuICAvLyBUaGVzZSB0d28gYXJlIG5vdCByZWFsIFVuaWNvZGUgY2F0ZWdvcmllcywgYnV0IG91ciB1c2VmdWwgZm9yIE9obS5cbiAgLy8gTCBpcyBhIGNvbWJpbmF0aW9uIG9mIGFsbCB0aGUgbGV0dGVyIGNhdGVnb3JpZXMuXG4gIC8vIEx0bW8gaXMgYSBjb21iaW5hdGlvbiBvZiBMdCwgTG0sIGFuZCBMby5cbiAgTDogL1tcXHUwMDQxLVxcdTAwNUFdfFtcXHUwMEMwLVxcdTAwRDZdfFtcXHUwMEQ4LVxcdTAwREVdfFtcXHUwMTAwLVxcdTAxMDBdfFtcXHUwMTAyLVxcdTAxMDJdfFtcXHUwMTA0LVxcdTAxMDRdfFtcXHUwMTA2LVxcdTAxMDZdfFtcXHUwMTA4LVxcdTAxMDhdfFtcXHUwMTBBLVxcdTAxMEFdfFtcXHUwMTBDLVxcdTAxMENdfFtcXHUwMTBFLVxcdTAxMEVdfFtcXHUwMTEwLVxcdTAxMTBdfFtcXHUwMTEyLVxcdTAxMTJdfFtcXHUwMTE0LVxcdTAxMTRdfFtcXHUwMTE2LVxcdTAxMTZdfFtcXHUwMTE4LVxcdTAxMThdfFtcXHUwMTFBLVxcdTAxMUFdfFtcXHUwMTFDLVxcdTAxMUNdfFtcXHUwMTFFLVxcdTAxMUVdfFtcXHUwMTIwLVxcdTAxMjBdfFtcXHUwMTIyLVxcdTAxMjJdfFtcXHUwMTI0LVxcdTAxMjRdfFtcXHUwMTI2LVxcdTAxMjZdfFtcXHUwMTI4LVxcdTAxMjhdfFtcXHUwMTJBLVxcdTAxMkFdfFtcXHUwMTJDLVxcdTAxMkNdfFtcXHUwMTJFLVxcdTAxMkVdfFtcXHUwMTMwLVxcdTAxMzBdfFtcXHUwMTMyLVxcdTAxMzJdfFtcXHUwMTM0LVxcdTAxMzRdfFtcXHUwMTM2LVxcdTAxMzZdfFtcXHUwMTM5LVxcdTAxMzldfFtcXHUwMTNCLVxcdTAxM0JdfFtcXHUwMTNELVxcdTAxM0RdfFtcXHUwMTNGLVxcdTAxM0ZdfFtcXHUwMTQxLVxcdTAxNDFdfFtcXHUwMTQzLVxcdTAxNDNdfFtcXHUwMTQ1LVxcdTAxNDVdfFtcXHUwMTQ3LVxcdTAxNDddfFtcXHUwMTRBLVxcdTAxNEFdfFtcXHUwMTRDLVxcdTAxNENdfFtcXHUwMTRFLVxcdTAxNEVdfFtcXHUwMTUwLVxcdTAxNTBdfFtcXHUwMTUyLVxcdTAxNTJdfFtcXHUwMTU0LVxcdTAxNTRdfFtcXHUwMTU2LVxcdTAxNTZdfFtcXHUwMTU4LVxcdTAxNThdfFtcXHUwMTVBLVxcdTAxNUFdfFtcXHUwMTVDLVxcdTAxNUNdfFtcXHUwMTVFLVxcdTAxNUVdfFtcXHUwMTYwLVxcdTAxNjBdfFtcXHUwMTYyLVxcdTAxNjJdfFtcXHUwMTY0LVxcdTAxNjRdfFtcXHUwMTY2LVxcdTAxNjZdfFtcXHUwMTY4LVxcdTAxNjhdfFtcXHUwMTZBLVxcdTAxNkFdfFtcXHUwMTZDLVxcdTAxNkNdfFtcXHUwMTZFLVxcdTAxNkVdfFtcXHUwMTcwLVxcdTAxNzBdfFtcXHUwMTcyLVxcdTAxNzJdfFtcXHUwMTc0LVxcdTAxNzRdfFtcXHUwMTc2LVxcdTAxNzZdfFtcXHUwMTc4LVxcdTAxNzldfFtcXHUwMTdCLVxcdTAxN0JdfFtcXHUwMTdELVxcdTAxN0RdfFtcXHUwMTgxLVxcdTAxODJdfFtcXHUwMTg0LVxcdTAxODRdfFtcXHUwMTg2LVxcdTAxODddfFtcXHUwMTg5LVxcdTAxOEJdfFtcXHUwMThFLVxcdTAxOTFdfFtcXHUwMTkzLVxcdTAxOTRdfFtcXHUwMTk2LVxcdTAxOThdfFtcXHUwMTlDLVxcdTAxOURdfFtcXHUwMTlGLVxcdTAxQTBdfFtcXHUwMUEyLVxcdTAxQTJdfFtcXHUwMUE0LVxcdTAxQTRdfFtcXHUwMUE2LVxcdTAxQTddfFtcXHUwMUE5LVxcdTAxQTldfFtcXHUwMUFDLVxcdTAxQUNdfFtcXHUwMUFFLVxcdTAxQUZdfFtcXHUwMUIxLVxcdTAxQjNdfFtcXHUwMUI1LVxcdTAxQjVdfFtcXHUwMUI3LVxcdTAxQjhdfFtcXHUwMUJDLVxcdTAxQkNdfFtcXHUwMUM0LVxcdTAxQzRdfFtcXHUwMUM3LVxcdTAxQzddfFtcXHUwMUNBLVxcdTAxQ0FdfFtcXHUwMUNELVxcdTAxQ0RdfFtcXHUwMUNGLVxcdTAxQ0ZdfFtcXHUwMUQxLVxcdTAxRDFdfFtcXHUwMUQzLVxcdTAxRDNdfFtcXHUwMUQ1LVxcdTAxRDVdfFtcXHUwMUQ3LVxcdTAxRDddfFtcXHUwMUQ5LVxcdTAxRDldfFtcXHUwMURCLVxcdTAxREJdfFtcXHUwMURFLVxcdTAxREVdfFtcXHUwMUUwLVxcdTAxRTBdfFtcXHUwMUUyLVxcdTAxRTJdfFtcXHUwMUU0LVxcdTAxRTRdfFtcXHUwMUU2LVxcdTAxRTZdfFtcXHUwMUU4LVxcdTAxRThdfFtcXHUwMUVBLVxcdTAxRUFdfFtcXHUwMUVDLVxcdTAxRUNdfFtcXHUwMUVFLVxcdTAxRUVdfFtcXHUwMUYxLVxcdTAxRjFdfFtcXHUwMUY0LVxcdTAxRjRdfFtcXHUwMUZBLVxcdTAxRkFdfFtcXHUwMUZDLVxcdTAxRkNdfFtcXHUwMUZFLVxcdTAxRkVdfFtcXHUwMjAwLVxcdTAyMDBdfFtcXHUwMjAyLVxcdTAyMDJdfFtcXHUwMjA0LVxcdTAyMDRdfFtcXHUwMjA2LVxcdTAyMDZdfFtcXHUwMjA4LVxcdTAyMDhdfFtcXHUwMjBBLVxcdTAyMEFdfFtcXHUwMjBDLVxcdTAyMENdfFtcXHUwMjBFLVxcdTAyMEVdfFtcXHUwMjEwLVxcdTAyMTBdfFtcXHUwMjEyLVxcdTAyMTJdfFtcXHUwMjE0LVxcdTAyMTRdfFtcXHUwMjE2LVxcdTAyMTZdfFtcXHUwMzg2LVxcdTAzODZdfFtcXHUwMzg4LVxcdTAzOEFdfFtcXHUwMzhDLVxcdTAzOENdfFtcXHUwMzhFLVxcdTAzOEZdfFtcXHUwMzkxLVxcdTAzQTFdfFtcXHUwM0EzLVxcdTAzQUJdfFtcXHUwM0QyLVxcdTAzRDRdfFtcXHUwM0RBLVxcdTAzREFdfFtcXHUwM0RDLVxcdTAzRENdfFtcXHUwM0RFLVxcdTAzREVdfFtcXHUwM0UwLVxcdTAzRTBdfFtcXHUwM0UyLVxcdTAzRTJdfFtcXHUwM0U0LVxcdTAzRTRdfFtcXHUwM0U2LVxcdTAzRTZdfFtcXHUwM0U4LVxcdTAzRThdfFtcXHUwM0VBLVxcdTAzRUFdfFtcXHUwM0VDLVxcdTAzRUNdfFtcXHUwM0VFLVxcdTAzRUVdfFtcXHUwNDAxLVxcdTA0MENdfFtcXHUwNDBFLVxcdTA0MkZdfFtcXHUwNDYwLVxcdTA0NjBdfFtcXHUwNDYyLVxcdTA0NjJdfFtcXHUwNDY0LVxcdTA0NjRdfFtcXHUwNDY2LVxcdTA0NjZdfFtcXHUwNDY4LVxcdTA0NjhdfFtcXHUwNDZBLVxcdTA0NkFdfFtcXHUwNDZDLVxcdTA0NkNdfFtcXHUwNDZFLVxcdTA0NkVdfFtcXHUwNDcwLVxcdTA0NzBdfFtcXHUwNDcyLVxcdTA0NzJdfFtcXHUwNDc0LVxcdTA0NzRdfFtcXHUwNDc2LVxcdTA0NzZdfFtcXHUwNDc4LVxcdTA0NzhdfFtcXHUwNDdBLVxcdTA0N0FdfFtcXHUwNDdDLVxcdTA0N0NdfFtcXHUwNDdFLVxcdTA0N0VdfFtcXHUwNDgwLVxcdTA0ODBdfFtcXHUwNDkwLVxcdTA0OTBdfFtcXHUwNDkyLVxcdTA0OTJdfFtcXHUwNDk0LVxcdTA0OTRdfFtcXHUwNDk2LVxcdTA0OTZdfFtcXHUwNDk4LVxcdTA0OThdfFtcXHUwNDlBLVxcdTA0OUFdfFtcXHUwNDlDLVxcdTA0OUNdfFtcXHUwNDlFLVxcdTA0OUVdfFtcXHUwNEEwLVxcdTA0QTBdfFtcXHUwNEEyLVxcdTA0QTJdfFtcXHUwNEE0LVxcdTA0QTRdfFtcXHUwNEE2LVxcdTA0QTZdfFtcXHUwNEE4LVxcdTA0QThdfFtcXHUwNEFBLVxcdTA0QUFdfFtcXHUwNEFDLVxcdTA0QUNdfFtcXHUwNEFFLVxcdTA0QUVdfFtcXHUwNEIwLVxcdTA0QjBdfFtcXHUwNEIyLVxcdTA0QjJdfFtcXHUwNEI0LVxcdTA0QjRdfFtcXHUwNEI2LVxcdTA0QjZdfFtcXHUwNEI4LVxcdTA0QjhdfFtcXHUwNEJBLVxcdTA0QkFdfFtcXHUwNEJDLVxcdTA0QkNdfFtcXHUwNEJFLVxcdTA0QkVdfFtcXHUwNEMxLVxcdTA0QzFdfFtcXHUwNEMzLVxcdTA0QzNdfFtcXHUwNEM3LVxcdTA0QzddfFtcXHUwNENCLVxcdTA0Q0JdfFtcXHUwNEQwLVxcdTA0RDBdfFtcXHUwNEQyLVxcdTA0RDJdfFtcXHUwNEQ0LVxcdTA0RDRdfFtcXHUwNEQ2LVxcdTA0RDZdfFtcXHUwNEQ4LVxcdTA0RDhdfFtcXHUwNERBLVxcdTA0REFdfFtcXHUwNERDLVxcdTA0RENdfFtcXHUwNERFLVxcdTA0REVdfFtcXHUwNEUwLVxcdTA0RTBdfFtcXHUwNEUyLVxcdTA0RTJdfFtcXHUwNEU0LVxcdTA0RTRdfFtcXHUwNEU2LVxcdTA0RTZdfFtcXHUwNEU4LVxcdTA0RThdfFtcXHUwNEVBLVxcdTA0RUFdfFtcXHUwNEVFLVxcdTA0RUVdfFtcXHUwNEYwLVxcdTA0RjBdfFtcXHUwNEYyLVxcdTA0RjJdfFtcXHUwNEY0LVxcdTA0RjRdfFtcXHUwNEY4LVxcdTA0RjhdfFtcXHUwNTMxLVxcdTA1NTZdfFtcXHUxMEEwLVxcdTEwQzVdfFtcXHUxRTAwLVxcdTFFMDBdfFtcXHUxRTAyLVxcdTFFMDJdfFtcXHUxRTA0LVxcdTFFMDRdfFtcXHUxRTA2LVxcdTFFMDZdfFtcXHUxRTA4LVxcdTFFMDhdfFtcXHUxRTBBLVxcdTFFMEFdfFtcXHUxRTBDLVxcdTFFMENdfFtcXHUxRTBFLVxcdTFFMEVdfFtcXHUxRTEwLVxcdTFFMTBdfFtcXHUxRTEyLVxcdTFFMTJdfFtcXHUxRTE0LVxcdTFFMTRdfFtcXHUxRTE2LVxcdTFFMTZdfFtcXHUxRTE4LVxcdTFFMThdfFtcXHUxRTFBLVxcdTFFMUFdfFtcXHUxRTFDLVxcdTFFMUNdfFtcXHUxRTFFLVxcdTFFMUVdfFtcXHUxRTIwLVxcdTFFMjBdfFtcXHUxRTIyLVxcdTFFMjJdfFtcXHUxRTI0LVxcdTFFMjRdfFtcXHUxRTI2LVxcdTFFMjZdfFtcXHUxRTI4LVxcdTFFMjhdfFtcXHUxRTJBLVxcdTFFMkFdfFtcXHUxRTJDLVxcdTFFMkNdfFtcXHUxRTJFLVxcdTFFMkVdfFtcXHUxRTMwLVxcdTFFMzBdfFtcXHUxRTMyLVxcdTFFMzJdfFtcXHUxRTM0LVxcdTFFMzRdfFtcXHUxRTM2LVxcdTFFMzZdfFtcXHUxRTM4LVxcdTFFMzhdfFtcXHUxRTNBLVxcdTFFM0FdfFtcXHUxRTNDLVxcdTFFM0NdfFtcXHUxRTNFLVxcdTFFM0VdfFtcXHUxRTQwLVxcdTFFNDBdfFtcXHUxRTQyLVxcdTFFNDJdfFtcXHUxRTQ0LVxcdTFFNDRdfFtcXHUxRTQ2LVxcdTFFNDZdfFtcXHUxRTQ4LVxcdTFFNDhdfFtcXHUxRTRBLVxcdTFFNEFdfFtcXHUxRTRDLVxcdTFFNENdfFtcXHUxRTRFLVxcdTFFNEVdfFtcXHUxRTUwLVxcdTFFNTBdfFtcXHUxRTUyLVxcdTFFNTJdfFtcXHUxRTU0LVxcdTFFNTRdfFtcXHUxRTU2LVxcdTFFNTZdfFtcXHUxRTU4LVxcdTFFNThdfFtcXHUxRTVBLVxcdTFFNUFdfFtcXHUxRTVDLVxcdTFFNUNdfFtcXHUxRTVFLVxcdTFFNUVdfFtcXHUxRTYwLVxcdTFFNjBdfFtcXHUxRTYyLVxcdTFFNjJdfFtcXHUxRTY0LVxcdTFFNjRdfFtcXHUxRTY2LVxcdTFFNjZdfFtcXHUxRTY4LVxcdTFFNjhdfFtcXHUxRTZBLVxcdTFFNkFdfFtcXHUxRTZDLVxcdTFFNkNdfFtcXHUxRTZFLVxcdTFFNkVdfFtcXHUxRTcwLVxcdTFFNzBdfFtcXHUxRTcyLVxcdTFFNzJdfFtcXHUxRTc0LVxcdTFFNzRdfFtcXHUxRTc2LVxcdTFFNzZdfFtcXHUxRTc4LVxcdTFFNzhdfFtcXHUxRTdBLVxcdTFFN0FdfFtcXHUxRTdDLVxcdTFFN0NdfFtcXHUxRTdFLVxcdTFFN0VdfFtcXHUxRTgwLVxcdTFFODBdfFtcXHUxRTgyLVxcdTFFODJdfFtcXHUxRTg0LVxcdTFFODRdfFtcXHUxRTg2LVxcdTFFODZdfFtcXHUxRTg4LVxcdTFFODhdfFtcXHUxRThBLVxcdTFFOEFdfFtcXHUxRThDLVxcdTFFOENdfFtcXHUxRThFLVxcdTFFOEVdfFtcXHUxRTkwLVxcdTFFOTBdfFtcXHUxRTkyLVxcdTFFOTJdfFtcXHUxRTk0LVxcdTFFOTRdfFtcXHUxRUEwLVxcdTFFQTBdfFtcXHUxRUEyLVxcdTFFQTJdfFtcXHUxRUE0LVxcdTFFQTRdfFtcXHUxRUE2LVxcdTFFQTZdfFtcXHUxRUE4LVxcdTFFQThdfFtcXHUxRUFBLVxcdTFFQUFdfFtcXHUxRUFDLVxcdTFFQUNdfFtcXHUxRUFFLVxcdTFFQUVdfFtcXHUxRUIwLVxcdTFFQjBdfFtcXHUxRUIyLVxcdTFFQjJdfFtcXHUxRUI0LVxcdTFFQjRdfFtcXHUxRUI2LVxcdTFFQjZdfFtcXHUxRUI4LVxcdTFFQjhdfFtcXHUxRUJBLVxcdTFFQkFdfFtcXHUxRUJDLVxcdTFFQkNdfFtcXHUxRUJFLVxcdTFFQkVdfFtcXHUxRUMwLVxcdTFFQzBdfFtcXHUxRUMyLVxcdTFFQzJdfFtcXHUxRUM0LVxcdTFFQzRdfFtcXHUxRUM2LVxcdTFFQzZdfFtcXHUxRUM4LVxcdTFFQzhdfFtcXHUxRUNBLVxcdTFFQ0FdfFtcXHUxRUNDLVxcdTFFQ0NdfFtcXHUxRUNFLVxcdTFFQ0VdfFtcXHUxRUQwLVxcdTFFRDBdfFtcXHUxRUQyLVxcdTFFRDJdfFtcXHUxRUQ0LVxcdTFFRDRdfFtcXHUxRUQ2LVxcdTFFRDZdfFtcXHUxRUQ4LVxcdTFFRDhdfFtcXHUxRURBLVxcdTFFREFdfFtcXHUxRURDLVxcdTFFRENdfFtcXHUxRURFLVxcdTFFREVdfFtcXHUxRUUwLVxcdTFFRTBdfFtcXHUxRUUyLVxcdTFFRTJdfFtcXHUxRUU0LVxcdTFFRTRdfFtcXHUxRUU2LVxcdTFFRTZdfFtcXHUxRUU4LVxcdTFFRThdfFtcXHUxRUVBLVxcdTFFRUFdfFtcXHUxRUVDLVxcdTFFRUNdfFtcXHUxRUVFLVxcdTFFRUVdfFtcXHUxRUYwLVxcdTFFRjBdfFtcXHUxRUYyLVxcdTFFRjJdfFtcXHUxRUY0LVxcdTFFRjRdfFtcXHUxRUY2LVxcdTFFRjZdfFtcXHUxRUY4LVxcdTFFRjhdfFtcXHUxRjA4LVxcdTFGMEZdfFtcXHUxRjE4LVxcdTFGMURdfFtcXHUxRjI4LVxcdTFGMkZdfFtcXHUxRjM4LVxcdTFGM0ZdfFtcXHUxRjQ4LVxcdTFGNERdfFtcXHUxRjU5LVxcdTFGNTldfFtcXHUxRjVCLVxcdTFGNUJdfFtcXHUxRjVELVxcdTFGNURdfFtcXHUxRjVGLVxcdTFGNUZdfFtcXHUxRjY4LVxcdTFGNkZdfFtcXHUxRjg4LVxcdTFGOEZdfFtcXHUxRjk4LVxcdTFGOUZdfFtcXHUxRkE4LVxcdTFGQUZdfFtcXHUxRkI4LVxcdTFGQkNdfFtcXHUxRkM4LVxcdTFGQ0NdfFtcXHUxRkQ4LVxcdTFGREJdfFtcXHUxRkU4LVxcdTFGRUNdfFtcXHUxRkY4LVxcdTFGRkNdfFtcXHUyMTAyLVxcdTIxMDJdfFtcXHUyMTA3LVxcdTIxMDddfFtcXHUyMTBCLVxcdTIxMERdfFtcXHUyMTEwLVxcdTIxMTJdfFtcXHUyMTE1LVxcdTIxMTVdfFtcXHUyMTE5LVxcdTIxMURdfFtcXHUyMTI0LVxcdTIxMjRdfFtcXHUyMTI2LVxcdTIxMjZdfFtcXHUyMTI4LVxcdTIxMjhdfFtcXHUyMTJBLVxcdTIxMkRdfFtcXHUyMTMwLVxcdTIxMzFdfFtcXHUyMTMzLVxcdTIxMzNdfFtcXHVGRjIxLVxcdUZGM0FdfFtcXHUwMDYxLVxcdTAwN0FdfFtcXHUwMEFBLVxcdTAwQUFdfFtcXHUwMEI1LVxcdTAwQjVdfFtcXHUwMEJBLVxcdTAwQkFdfFtcXHUwMERGLVxcdTAwRjZdfFtcXHUwMEY4LVxcdTAwRkZdfFtcXHUwMTAxLVxcdTAxMDFdfFtcXHUwMTAzLVxcdTAxMDNdfFtcXHUwMTA1LVxcdTAxMDVdfFtcXHUwMTA3LVxcdTAxMDddfFtcXHUwMTA5LVxcdTAxMDldfFtcXHUwMTBCLVxcdTAxMEJdfFtcXHUwMTBELVxcdTAxMERdfFtcXHUwMTBGLVxcdTAxMEZdfFtcXHUwMTExLVxcdTAxMTFdfFtcXHUwMTEzLVxcdTAxMTNdfFtcXHUwMTE1LVxcdTAxMTVdfFtcXHUwMTE3LVxcdTAxMTddfFtcXHUwMTE5LVxcdTAxMTldfFtcXHUwMTFCLVxcdTAxMUJdfFtcXHUwMTFELVxcdTAxMURdfFtcXHUwMTFGLVxcdTAxMUZdfFtcXHUwMTIxLVxcdTAxMjFdfFtcXHUwMTIzLVxcdTAxMjNdfFtcXHUwMTI1LVxcdTAxMjVdfFtcXHUwMTI3LVxcdTAxMjddfFtcXHUwMTI5LVxcdTAxMjldfFtcXHUwMTJCLVxcdTAxMkJdfFtcXHUwMTJELVxcdTAxMkRdfFtcXHUwMTJGLVxcdTAxMkZdfFtcXHUwMTMxLVxcdTAxMzFdfFtcXHUwMTMzLVxcdTAxMzNdfFtcXHUwMTM1LVxcdTAxMzVdfFtcXHUwMTM3LVxcdTAxMzhdfFtcXHUwMTNBLVxcdTAxM0FdfFtcXHUwMTNDLVxcdTAxM0NdfFtcXHUwMTNFLVxcdTAxM0VdfFtcXHUwMTQwLVxcdTAxNDBdfFtcXHUwMTQyLVxcdTAxNDJdfFtcXHUwMTQ0LVxcdTAxNDRdfFtcXHUwMTQ2LVxcdTAxNDZdfFtcXHUwMTQ4LVxcdTAxNDldfFtcXHUwMTRCLVxcdTAxNEJdfFtcXHUwMTRELVxcdTAxNERdfFtcXHUwMTRGLVxcdTAxNEZdfFtcXHUwMTUxLVxcdTAxNTFdfFtcXHUwMTUzLVxcdTAxNTNdfFtcXHUwMTU1LVxcdTAxNTVdfFtcXHUwMTU3LVxcdTAxNTddfFtcXHUwMTU5LVxcdTAxNTldfFtcXHUwMTVCLVxcdTAxNUJdfFtcXHUwMTVELVxcdTAxNURdfFtcXHUwMTVGLVxcdTAxNUZdfFtcXHUwMTYxLVxcdTAxNjFdfFtcXHUwMTYzLVxcdTAxNjNdfFtcXHUwMTY1LVxcdTAxNjVdfFtcXHUwMTY3LVxcdTAxNjddfFtcXHUwMTY5LVxcdTAxNjldfFtcXHUwMTZCLVxcdTAxNkJdfFtcXHUwMTZELVxcdTAxNkRdfFtcXHUwMTZGLVxcdTAxNkZdfFtcXHUwMTcxLVxcdTAxNzFdfFtcXHUwMTczLVxcdTAxNzNdfFtcXHUwMTc1LVxcdTAxNzVdfFtcXHUwMTc3LVxcdTAxNzddfFtcXHUwMTdBLVxcdTAxN0FdfFtcXHUwMTdDLVxcdTAxN0NdfFtcXHUwMTdFLVxcdTAxODBdfFtcXHUwMTgzLVxcdTAxODNdfFtcXHUwMTg1LVxcdTAxODVdfFtcXHUwMTg4LVxcdTAxODhdfFtcXHUwMThDLVxcdTAxOERdfFtcXHUwMTkyLVxcdTAxOTJdfFtcXHUwMTk1LVxcdTAxOTVdfFtcXHUwMTk5LVxcdTAxOUJdfFtcXHUwMTlFLVxcdTAxOUVdfFtcXHUwMUExLVxcdTAxQTFdfFtcXHUwMUEzLVxcdTAxQTNdfFtcXHUwMUE1LVxcdTAxQTVdfFtcXHUwMUE4LVxcdTAxQThdfFtcXHUwMUFCLVxcdTAxQUJdfFtcXHUwMUFELVxcdTAxQURdfFtcXHUwMUIwLVxcdTAxQjBdfFtcXHUwMUI0LVxcdTAxQjRdfFtcXHUwMUI2LVxcdTAxQjZdfFtcXHUwMUI5LVxcdTAxQkFdfFtcXHUwMUJELVxcdTAxQkRdfFtcXHUwMUM2LVxcdTAxQzZdfFtcXHUwMUM5LVxcdTAxQzldfFtcXHUwMUNDLVxcdTAxQ0NdfFtcXHUwMUNFLVxcdTAxQ0VdfFtcXHUwMUQwLVxcdTAxRDBdfFtcXHUwMUQyLVxcdTAxRDJdfFtcXHUwMUQ0LVxcdTAxRDRdfFtcXHUwMUQ2LVxcdTAxRDZdfFtcXHUwMUQ4LVxcdTAxRDhdfFtcXHUwMURBLVxcdTAxREFdfFtcXHUwMURDLVxcdTAxRERdfFtcXHUwMURGLVxcdTAxREZdfFtcXHUwMUUxLVxcdTAxRTFdfFtcXHUwMUUzLVxcdTAxRTNdfFtcXHUwMUU1LVxcdTAxRTVdfFtcXHUwMUU3LVxcdTAxRTddfFtcXHUwMUU5LVxcdTAxRTldfFtcXHUwMUVCLVxcdTAxRUJdfFtcXHUwMUVELVxcdTAxRURdfFtcXHUwMUVGLVxcdTAxRjBdfFtcXHUwMUYzLVxcdTAxRjNdfFtcXHUwMUY1LVxcdTAxRjVdfFtcXHUwMUZCLVxcdTAxRkJdfFtcXHUwMUZELVxcdTAxRkRdfFtcXHUwMUZGLVxcdTAxRkZdfFtcXHUwMjAxLVxcdTAyMDFdfFtcXHUwMjAzLVxcdTAyMDNdfFtcXHUwMjA1LVxcdTAyMDVdfFtcXHUwMjA3LVxcdTAyMDddfFtcXHUwMjA5LVxcdTAyMDldfFtcXHUwMjBCLVxcdTAyMEJdfFtcXHUwMjBELVxcdTAyMERdfFtcXHUwMjBGLVxcdTAyMEZdfFtcXHUwMjExLVxcdTAyMTFdfFtcXHUwMjEzLVxcdTAyMTNdfFtcXHUwMjE1LVxcdTAyMTVdfFtcXHUwMjE3LVxcdTAyMTddfFtcXHUwMjUwLVxcdTAyQThdfFtcXHUwMzkwLVxcdTAzOTBdfFtcXHUwM0FDLVxcdTAzQ0VdfFtcXHUwM0QwLVxcdTAzRDFdfFtcXHUwM0Q1LVxcdTAzRDZdfFtcXHUwM0UzLVxcdTAzRTNdfFtcXHUwM0U1LVxcdTAzRTVdfFtcXHUwM0U3LVxcdTAzRTddfFtcXHUwM0U5LVxcdTAzRTldfFtcXHUwM0VCLVxcdTAzRUJdfFtcXHUwM0VELVxcdTAzRURdfFtcXHUwM0VGLVxcdTAzRjJdfFtcXHUwNDMwLVxcdTA0NEZdfFtcXHUwNDUxLVxcdTA0NUNdfFtcXHUwNDVFLVxcdTA0NUZdfFtcXHUwNDYxLVxcdTA0NjFdfFtcXHUwNDYzLVxcdTA0NjNdfFtcXHUwNDY1LVxcdTA0NjVdfFtcXHUwNDY3LVxcdTA0NjddfFtcXHUwNDY5LVxcdTA0NjldfFtcXHUwNDZCLVxcdTA0NkJdfFtcXHUwNDZELVxcdTA0NkRdfFtcXHUwNDZGLVxcdTA0NkZdfFtcXHUwNDcxLVxcdTA0NzFdfFtcXHUwNDczLVxcdTA0NzNdfFtcXHUwNDc1LVxcdTA0NzVdfFtcXHUwNDc3LVxcdTA0NzddfFtcXHUwNDc5LVxcdTA0NzldfFtcXHUwNDdCLVxcdTA0N0JdfFtcXHUwNDdELVxcdTA0N0RdfFtcXHUwNDdGLVxcdTA0N0ZdfFtcXHUwNDgxLVxcdTA0ODFdfFtcXHUwNDkxLVxcdTA0OTFdfFtcXHUwNDkzLVxcdTA0OTNdfFtcXHUwNDk1LVxcdTA0OTVdfFtcXHUwNDk3LVxcdTA0OTddfFtcXHUwNDk5LVxcdTA0OTldfFtcXHUwNDlCLVxcdTA0OUJdfFtcXHUwNDlELVxcdTA0OURdfFtcXHUwNDlGLVxcdTA0OUZdfFtcXHUwNEExLVxcdTA0QTFdfFtcXHUwNEEzLVxcdTA0QTNdfFtcXHUwNEE1LVxcdTA0QTVdfFtcXHUwNEE3LVxcdTA0QTddfFtcXHUwNEE5LVxcdTA0QTldfFtcXHUwNEFCLVxcdTA0QUJdfFtcXHUwNEFELVxcdTA0QURdfFtcXHUwNEFGLVxcdTA0QUZdfFtcXHUwNEIxLVxcdTA0QjFdfFtcXHUwNEIzLVxcdTA0QjNdfFtcXHUwNEI1LVxcdTA0QjVdfFtcXHUwNEI3LVxcdTA0QjddfFtcXHUwNEI5LVxcdTA0QjldfFtcXHUwNEJCLVxcdTA0QkJdfFtcXHUwNEJELVxcdTA0QkRdfFtcXHUwNEJGLVxcdTA0QkZdfFtcXHUwNEMyLVxcdTA0QzJdfFtcXHUwNEM0LVxcdTA0QzRdfFtcXHUwNEM4LVxcdTA0QzhdfFtcXHUwNENDLVxcdTA0Q0NdfFtcXHUwNEQxLVxcdTA0RDFdfFtcXHUwNEQzLVxcdTA0RDNdfFtcXHUwNEQ1LVxcdTA0RDVdfFtcXHUwNEQ3LVxcdTA0RDddfFtcXHUwNEQ5LVxcdTA0RDldfFtcXHUwNERCLVxcdTA0REJdfFtcXHUwNERELVxcdTA0RERdfFtcXHUwNERGLVxcdTA0REZdfFtcXHUwNEUxLVxcdTA0RTFdfFtcXHUwNEUzLVxcdTA0RTNdfFtcXHUwNEU1LVxcdTA0RTVdfFtcXHUwNEU3LVxcdTA0RTddfFtcXHUwNEU5LVxcdTA0RTldfFtcXHUwNEVCLVxcdTA0RUJdfFtcXHUwNEVGLVxcdTA0RUZdfFtcXHUwNEYxLVxcdTA0RjFdfFtcXHUwNEYzLVxcdTA0RjNdfFtcXHUwNEY1LVxcdTA0RjVdfFtcXHUwNEY5LVxcdTA0RjldfFtcXHUwNTYxLVxcdTA1ODddfFtcXHUxMEQwLVxcdTEwRjZdfFtcXHUxRTAxLVxcdTFFMDFdfFtcXHUxRTAzLVxcdTFFMDNdfFtcXHUxRTA1LVxcdTFFMDVdfFtcXHUxRTA3LVxcdTFFMDddfFtcXHUxRTA5LVxcdTFFMDldfFtcXHUxRTBCLVxcdTFFMEJdfFtcXHUxRTBELVxcdTFFMERdfFtcXHUxRTBGLVxcdTFFMEZdfFtcXHUxRTExLVxcdTFFMTFdfFtcXHUxRTEzLVxcdTFFMTNdfFtcXHUxRTE1LVxcdTFFMTVdfFtcXHUxRTE3LVxcdTFFMTddfFtcXHUxRTE5LVxcdTFFMTldfFtcXHUxRTFCLVxcdTFFMUJdfFtcXHUxRTFELVxcdTFFMURdfFtcXHUxRTFGLVxcdTFFMUZdfFtcXHUxRTIxLVxcdTFFMjFdfFtcXHUxRTIzLVxcdTFFMjNdfFtcXHUxRTI1LVxcdTFFMjVdfFtcXHUxRTI3LVxcdTFFMjddfFtcXHUxRTI5LVxcdTFFMjldfFtcXHUxRTJCLVxcdTFFMkJdfFtcXHUxRTJELVxcdTFFMkRdfFtcXHUxRTJGLVxcdTFFMkZdfFtcXHUxRTMxLVxcdTFFMzFdfFtcXHUxRTMzLVxcdTFFMzNdfFtcXHUxRTM1LVxcdTFFMzVdfFtcXHUxRTM3LVxcdTFFMzddfFtcXHUxRTM5LVxcdTFFMzldfFtcXHUxRTNCLVxcdTFFM0JdfFtcXHUxRTNELVxcdTFFM0RdfFtcXHUxRTNGLVxcdTFFM0ZdfFtcXHUxRTQxLVxcdTFFNDFdfFtcXHUxRTQzLVxcdTFFNDNdfFtcXHUxRTQ1LVxcdTFFNDVdfFtcXHUxRTQ3LVxcdTFFNDddfFtcXHUxRTQ5LVxcdTFFNDldfFtcXHUxRTRCLVxcdTFFNEJdfFtcXHUxRTRELVxcdTFFNERdfFtcXHUxRTRGLVxcdTFFNEZdfFtcXHUxRTUxLVxcdTFFNTFdfFtcXHUxRTUzLVxcdTFFNTNdfFtcXHUxRTU1LVxcdTFFNTVdfFtcXHUxRTU3LVxcdTFFNTddfFtcXHUxRTU5LVxcdTFFNTldfFtcXHUxRTVCLVxcdTFFNUJdfFtcXHUxRTVELVxcdTFFNURdfFtcXHUxRTVGLVxcdTFFNUZdfFtcXHUxRTYxLVxcdTFFNjFdfFtcXHUxRTYzLVxcdTFFNjNdfFtcXHUxRTY1LVxcdTFFNjVdfFtcXHUxRTY3LVxcdTFFNjddfFtcXHUxRTY5LVxcdTFFNjldfFtcXHUxRTZCLVxcdTFFNkJdfFtcXHUxRTZELVxcdTFFNkRdfFtcXHUxRTZGLVxcdTFFNkZdfFtcXHUxRTcxLVxcdTFFNzFdfFtcXHUxRTczLVxcdTFFNzNdfFtcXHUxRTc1LVxcdTFFNzVdfFtcXHUxRTc3LVxcdTFFNzddfFtcXHUxRTc5LVxcdTFFNzldfFtcXHUxRTdCLVxcdTFFN0JdfFtcXHUxRTdELVxcdTFFN0RdfFtcXHUxRTdGLVxcdTFFN0ZdfFtcXHUxRTgxLVxcdTFFODFdfFtcXHUxRTgzLVxcdTFFODNdfFtcXHUxRTg1LVxcdTFFODVdfFtcXHUxRTg3LVxcdTFFODddfFtcXHUxRTg5LVxcdTFFODldfFtcXHUxRThCLVxcdTFFOEJdfFtcXHUxRThELVxcdTFFOERdfFtcXHUxRThGLVxcdTFFOEZdfFtcXHUxRTkxLVxcdTFFOTFdfFtcXHUxRTkzLVxcdTFFOTNdfFtcXHUxRTk1LVxcdTFFOUJdfFtcXHUxRUExLVxcdTFFQTFdfFtcXHUxRUEzLVxcdTFFQTNdfFtcXHUxRUE1LVxcdTFFQTVdfFtcXHUxRUE3LVxcdTFFQTddfFtcXHUxRUE5LVxcdTFFQTldfFtcXHUxRUFCLVxcdTFFQUJdfFtcXHUxRUFELVxcdTFFQURdfFtcXHUxRUFGLVxcdTFFQUZdfFtcXHUxRUIxLVxcdTFFQjFdfFtcXHUxRUIzLVxcdTFFQjNdfFtcXHUxRUI1LVxcdTFFQjVdfFtcXHUxRUI3LVxcdTFFQjddfFtcXHUxRUI5LVxcdTFFQjldfFtcXHUxRUJCLVxcdTFFQkJdfFtcXHUxRUJELVxcdTFFQkRdfFtcXHUxRUJGLVxcdTFFQkZdfFtcXHUxRUMxLVxcdTFFQzFdfFtcXHUxRUMzLVxcdTFFQzNdfFtcXHUxRUM1LVxcdTFFQzVdfFtcXHUxRUM3LVxcdTFFQzddfFtcXHUxRUM5LVxcdTFFQzldfFtcXHUxRUNCLVxcdTFFQ0JdfFtcXHUxRUNELVxcdTFFQ0RdfFtcXHUxRUNGLVxcdTFFQ0ZdfFtcXHUxRUQxLVxcdTFFRDFdfFtcXHUxRUQzLVxcdTFFRDNdfFtcXHUxRUQ1LVxcdTFFRDVdfFtcXHUxRUQ3LVxcdTFFRDddfFtcXHUxRUQ5LVxcdTFFRDldfFtcXHUxRURCLVxcdTFFREJdfFtcXHUxRURELVxcdTFFRERdfFtcXHUxRURGLVxcdTFFREZdfFtcXHUxRUUxLVxcdTFFRTFdfFtcXHUxRUUzLVxcdTFFRTNdfFtcXHUxRUU1LVxcdTFFRTVdfFtcXHUxRUU3LVxcdTFFRTddfFtcXHUxRUU5LVxcdTFFRTldfFtcXHUxRUVCLVxcdTFFRUJdfFtcXHUxRUVELVxcdTFFRURdfFtcXHUxRUVGLVxcdTFFRUZdfFtcXHUxRUYxLVxcdTFFRjFdfFtcXHUxRUYzLVxcdTFFRjNdfFtcXHUxRUY1LVxcdTFFRjVdfFtcXHUxRUY3LVxcdTFFRjddfFtcXHUxRUY5LVxcdTFFRjldfFtcXHUxRjAwLVxcdTFGMDddfFtcXHUxRjEwLVxcdTFGMTVdfFtcXHUxRjIwLVxcdTFGMjddfFtcXHUxRjMwLVxcdTFGMzddfFtcXHUxRjQwLVxcdTFGNDVdfFtcXHUxRjUwLVxcdTFGNTddfFtcXHUxRjYwLVxcdTFGNjddfFtcXHUxRjcwLVxcdTFGN0RdfFtcXHUxRjgwLVxcdTFGODddfFtcXHUxRjkwLVxcdTFGOTddfFtcXHUxRkEwLVxcdTFGQTddfFtcXHUxRkIwLVxcdTFGQjRdfFtcXHUxRkI2LVxcdTFGQjddfFtcXHUxRkJFLVxcdTFGQkVdfFtcXHUxRkMyLVxcdTFGQzRdfFtcXHUxRkM2LVxcdTFGQzddfFtcXHUxRkQwLVxcdTFGRDNdfFtcXHUxRkQ2LVxcdTFGRDddfFtcXHUxRkUwLVxcdTFGRTddfFtcXHUxRkYyLVxcdTFGRjRdfFtcXHUxRkY2LVxcdTFGRjddfFtcXHUyMDdGLVxcdTIwN0ZdfFtcXHUyMTBBLVxcdTIxMEFdfFtcXHUyMTBFLVxcdTIxMEZdfFtcXHUyMTEzLVxcdTIxMTNdfFtcXHUyMTE4LVxcdTIxMThdfFtcXHUyMTJFLVxcdTIxMkZdfFtcXHUyMTM0LVxcdTIxMzRdfFtcXHVGQjAwLVxcdUZCMDZdfFtcXHVGQjEzLVxcdUZCMTddfFtcXHVGRjQxLVxcdUZGNUFdfFtcXHUwMUM1LVxcdTAxQzVdfFtcXHUwMUM4LVxcdTAxQzhdfFtcXHUwMUNCLVxcdTAxQ0JdfFtcXHUwMUYyLVxcdTAxRjJdfFtcXHUwMkIwLVxcdTAyQjhdfFtcXHUwMkJCLVxcdTAyQzFdfFtcXHUwMkQwLVxcdTAyRDFdfFtcXHUwMkUwLVxcdTAyRTRdfFtcXHUwMzdBLVxcdTAzN0FdfFtcXHUwNTU5LVxcdTA1NTldfFtcXHUwNjQwLVxcdTA2NDBdfFtcXHUwNkU1LVxcdTA2RTZdfFtcXHUwRTQ2LVxcdTBFNDZdfFtcXHUwRUM2LVxcdTBFQzZdfFtcXHUzMDA1LVxcdTMwMDVdfFtcXHUzMDMxLVxcdTMwMzVdfFtcXHUzMDlELVxcdTMwOUVdfFtcXHUzMEZDLVxcdTMwRkVdfFtcXHVGRjcwLVxcdUZGNzBdfFtcXHVGRjlFLVxcdUZGOUZdfFtcXHUwMUFBLVxcdTAxQUFdfFtcXHUwMUJCLVxcdTAxQkJdfFtcXHUwMUJFLVxcdTAxQzNdfFtcXHUwM0YzLVxcdTAzRjNdfFtcXHUwNEMwLVxcdTA0QzBdfFtcXHUwNUQwLVxcdTA1RUFdfFtcXHUwNUYwLVxcdTA1RjJdfFtcXHUwNjIxLVxcdTA2M0FdfFtcXHUwNjQxLVxcdTA2NEFdfFtcXHUwNjcxLVxcdTA2QjddfFtcXHUwNkJBLVxcdTA2QkVdfFtcXHUwNkMwLVxcdTA2Q0VdfFtcXHUwNkQwLVxcdTA2RDNdfFtcXHUwNkQ1LVxcdTA2RDVdfFtcXHUwOTA1LVxcdTA5MzldfFtcXHUwOTNELVxcdTA5M0RdfFtcXHUwOTUwLVxcdTA5NTBdfFtcXHUwOTU4LVxcdTA5NjFdfFtcXHUwOTg1LVxcdTA5OENdfFtcXHUwOThGLVxcdTA5OTBdfFtcXHUwOTkzLVxcdTA5QThdfFtcXHUwOUFBLVxcdTA5QjBdfFtcXHUwOUIyLVxcdTA5QjJdfFtcXHUwOUI2LVxcdTA5QjldfFtcXHUwOURDLVxcdTA5RERdfFtcXHUwOURGLVxcdTA5RTFdfFtcXHUwOUYwLVxcdTA5RjFdfFtcXHUwQTA1LVxcdTBBMEFdfFtcXHUwQTBGLVxcdTBBMTBdfFtcXHUwQTEzLVxcdTBBMjhdfFtcXHUwQTJBLVxcdTBBMzBdfFtcXHUwQTMyLVxcdTBBMzNdfFtcXHUwQTM1LVxcdTBBMzZdfFtcXHUwQTM4LVxcdTBBMzldfFtcXHUwQTU5LVxcdTBBNUNdfFtcXHUwQTVFLVxcdTBBNUVdfFtcXHUwQTcyLVxcdTBBNzRdfFtcXHUwQTg1LVxcdTBBOEJdfFtcXHUwQThELVxcdTBBOERdfFtcXHUwQThGLVxcdTBBOTFdfFtcXHUwQTkzLVxcdTBBQThdfFtcXHUwQUFBLVxcdTBBQjBdfFtcXHUwQUIyLVxcdTBBQjNdfFtcXHUwQUI1LVxcdTBBQjldfFtcXHUwQUJELVxcdTBBQkRdfFtcXHUwQUQwLVxcdTBBRDBdfFtcXHUwQUUwLVxcdTBBRTBdfFtcXHUwQjA1LVxcdTBCMENdfFtcXHUwQjBGLVxcdTBCMTBdfFtcXHUwQjEzLVxcdTBCMjhdfFtcXHUwQjJBLVxcdTBCMzBdfFtcXHUwQjMyLVxcdTBCMzNdfFtcXHUwQjM2LVxcdTBCMzldfFtcXHUwQjNELVxcdTBCM0RdfFtcXHUwQjVDLVxcdTBCNURdfFtcXHUwQjVGLVxcdTBCNjFdfFtcXHUwQjg1LVxcdTBCOEFdfFtcXHUwQjhFLVxcdTBCOTBdfFtcXHUwQjkyLVxcdTBCOTVdfFtcXHUwQjk5LVxcdTBCOUFdfFtcXHUwQjlDLVxcdTBCOUNdfFtcXHUwQjlFLVxcdTBCOUZdfFtcXHUwQkEzLVxcdTBCQTRdfFtcXHUwQkE4LVxcdTBCQUFdfFtcXHUwQkFFLVxcdTBCQjVdfFtcXHUwQkI3LVxcdTBCQjldfFtcXHUwQzA1LVxcdTBDMENdfFtcXHUwQzBFLVxcdTBDMTBdfFtcXHUwQzEyLVxcdTBDMjhdfFtcXHUwQzJBLVxcdTBDMzNdfFtcXHUwQzM1LVxcdTBDMzldfFtcXHUwQzYwLVxcdTBDNjFdfFtcXHUwQzg1LVxcdTBDOENdfFtcXHUwQzhFLVxcdTBDOTBdfFtcXHUwQzkyLVxcdTBDQThdfFtcXHUwQ0FBLVxcdTBDQjNdfFtcXHUwQ0I1LVxcdTBDQjldfFtcXHUwQ0RFLVxcdTBDREVdfFtcXHUwQ0UwLVxcdTBDRTFdfFtcXHUwRDA1LVxcdTBEMENdfFtcXHUwRDBFLVxcdTBEMTBdfFtcXHUwRDEyLVxcdTBEMjhdfFtcXHUwRDJBLVxcdTBEMzldfFtcXHUwRDYwLVxcdTBENjFdfFtcXHUwRTAxLVxcdTBFMzBdfFtcXHUwRTMyLVxcdTBFMzNdfFtcXHUwRTQwLVxcdTBFNDVdfFtcXHUwRTgxLVxcdTBFODJdfFtcXHUwRTg0LVxcdTBFODRdfFtcXHUwRTg3LVxcdTBFODhdfFtcXHUwRThBLVxcdTBFOEFdfFtcXHUwRThELVxcdTBFOERdfFtcXHUwRTk0LVxcdTBFOTddfFtcXHUwRTk5LVxcdTBFOUZdfFtcXHUwRUExLVxcdTBFQTNdfFtcXHUwRUE1LVxcdTBFQTVdfFtcXHUwRUE3LVxcdTBFQTddfFtcXHUwRUFBLVxcdTBFQUJdfFtcXHUwRUFELVxcdTBFQjBdfFtcXHUwRUIyLVxcdTBFQjNdfFtcXHUwRUJELVxcdTBFQkRdfFtcXHUwRUMwLVxcdTBFQzRdfFtcXHUwRURDLVxcdTBFRERdfFtcXHUwRjAwLVxcdTBGMDBdfFtcXHUwRjQwLVxcdTBGNDddfFtcXHUwRjQ5LVxcdTBGNjldfFtcXHUwRjg4LVxcdTBGOEJdfFtcXHUxMTAwLVxcdTExNTldfFtcXHUxMTVGLVxcdTExQTJdfFtcXHUxMUE4LVxcdTExRjldfFtcXHUyMTM1LVxcdTIxMzhdfFtcXHUzMDA2LVxcdTMwMDZdfFtcXHUzMDQxLVxcdTMwOTRdfFtcXHUzMEExLVxcdTMwRkFdfFtcXHUzMTA1LVxcdTMxMkNdfFtcXHUzMTMxLVxcdTMxOEVdfFtcXHU0RTAwLVxcdTlGQTVdfFtcXHVBQzAwLVxcdUQ3QTNdfFtcXHVGOTAwLVxcdUZBMkRdfFtcXHVGQjFGLVxcdUZCMjhdfFtcXHVGQjJBLVxcdUZCMzZdfFtcXHVGQjM4LVxcdUZCM0NdfFtcXHVGQjNFLVxcdUZCM0VdfFtcXHVGQjQwLVxcdUZCNDFdfFtcXHVGQjQzLVxcdUZCNDRdfFtcXHVGQjQ2LVxcdUZCQjFdfFtcXHVGQkQzLVxcdUZEM0RdfFtcXHVGRDUwLVxcdUZEOEZdfFtcXHVGRDkyLVxcdUZEQzddfFtcXHVGREYwLVxcdUZERkJdfFtcXHVGRTcwLVxcdUZFNzJdfFtcXHVGRTc0LVxcdUZFNzRdfFtcXHVGRTc2LVxcdUZFRkNdfFtcXHVGRjY2LVxcdUZGNkZdfFtcXHVGRjcxLVxcdUZGOURdfFtcXHVGRkEwLVxcdUZGQkVdfFtcXHVGRkMyLVxcdUZGQzddfFtcXHVGRkNBLVxcdUZGQ0ZdfFtcXHVGRkQyLVxcdUZGRDddfFtcXHVGRkRBLVxcdUZGRENdLyxcbiAgTHRtbzogL1tcXHUwMUM1LVxcdTAxQzVdfFtcXHUwMUM4LVxcdTAxQzhdfFtcXHUwMUNCLVxcdTAxQ0JdfFtcXHUwMUYyLVxcdTAxRjJdW1xcdTAyQjAtXFx1MDJCOF18W1xcdTAyQkItXFx1MDJDMV18W1xcdTAyRDAtXFx1MDJEMV18W1xcdTAyRTAtXFx1MDJFNF18W1xcdTAzN0EtXFx1MDM3QV18W1xcdTA1NTktXFx1MDU1OV18W1xcdTA2NDAtXFx1MDY0MF18W1xcdTA2RTUtXFx1MDZFNl18W1xcdTBFNDYtXFx1MEU0Nl18W1xcdTBFQzYtXFx1MEVDNl18W1xcdTMwMDUtXFx1MzAwNV18W1xcdTMwMzEtXFx1MzAzNV18W1xcdTMwOUQtXFx1MzA5RV18W1xcdTMwRkMtXFx1MzBGRV18W1xcdUZGNzAtXFx1RkY3MF18W1xcdUZGOUUtXFx1RkY5Rl1bXFx1MDFBQS1cXHUwMUFBXXxbXFx1MDFCQi1cXHUwMUJCXXxbXFx1MDFCRS1cXHUwMUMzXXxbXFx1MDNGMy1cXHUwM0YzXXxbXFx1MDRDMC1cXHUwNEMwXXxbXFx1MDVEMC1cXHUwNUVBXXxbXFx1MDVGMC1cXHUwNUYyXXxbXFx1MDYyMS1cXHUwNjNBXXxbXFx1MDY0MS1cXHUwNjRBXXxbXFx1MDY3MS1cXHUwNkI3XXxbXFx1MDZCQS1cXHUwNkJFXXxbXFx1MDZDMC1cXHUwNkNFXXxbXFx1MDZEMC1cXHUwNkQzXXxbXFx1MDZENS1cXHUwNkQ1XXxbXFx1MDkwNS1cXHUwOTM5XXxbXFx1MDkzRC1cXHUwOTNEXXxbXFx1MDk1MC1cXHUwOTUwXXxbXFx1MDk1OC1cXHUwOTYxXXxbXFx1MDk4NS1cXHUwOThDXXxbXFx1MDk4Ri1cXHUwOTkwXXxbXFx1MDk5My1cXHUwOUE4XXxbXFx1MDlBQS1cXHUwOUIwXXxbXFx1MDlCMi1cXHUwOUIyXXxbXFx1MDlCNi1cXHUwOUI5XXxbXFx1MDlEQy1cXHUwOUREXXxbXFx1MDlERi1cXHUwOUUxXXxbXFx1MDlGMC1cXHUwOUYxXXxbXFx1MEEwNS1cXHUwQTBBXXxbXFx1MEEwRi1cXHUwQTEwXXxbXFx1MEExMy1cXHUwQTI4XXxbXFx1MEEyQS1cXHUwQTMwXXxbXFx1MEEzMi1cXHUwQTMzXXxbXFx1MEEzNS1cXHUwQTM2XXxbXFx1MEEzOC1cXHUwQTM5XXxbXFx1MEE1OS1cXHUwQTVDXXxbXFx1MEE1RS1cXHUwQTVFXXxbXFx1MEE3Mi1cXHUwQTc0XXxbXFx1MEE4NS1cXHUwQThCXXxbXFx1MEE4RC1cXHUwQThEXXxbXFx1MEE4Ri1cXHUwQTkxXXxbXFx1MEE5My1cXHUwQUE4XXxbXFx1MEFBQS1cXHUwQUIwXXxbXFx1MEFCMi1cXHUwQUIzXXxbXFx1MEFCNS1cXHUwQUI5XXxbXFx1MEFCRC1cXHUwQUJEXXxbXFx1MEFEMC1cXHUwQUQwXXxbXFx1MEFFMC1cXHUwQUUwXXxbXFx1MEIwNS1cXHUwQjBDXXxbXFx1MEIwRi1cXHUwQjEwXXxbXFx1MEIxMy1cXHUwQjI4XXxbXFx1MEIyQS1cXHUwQjMwXXxbXFx1MEIzMi1cXHUwQjMzXXxbXFx1MEIzNi1cXHUwQjM5XXxbXFx1MEIzRC1cXHUwQjNEXXxbXFx1MEI1Qy1cXHUwQjVEXXxbXFx1MEI1Ri1cXHUwQjYxXXxbXFx1MEI4NS1cXHUwQjhBXXxbXFx1MEI4RS1cXHUwQjkwXXxbXFx1MEI5Mi1cXHUwQjk1XXxbXFx1MEI5OS1cXHUwQjlBXXxbXFx1MEI5Qy1cXHUwQjlDXXxbXFx1MEI5RS1cXHUwQjlGXXxbXFx1MEJBMy1cXHUwQkE0XXxbXFx1MEJBOC1cXHUwQkFBXXxbXFx1MEJBRS1cXHUwQkI1XXxbXFx1MEJCNy1cXHUwQkI5XXxbXFx1MEMwNS1cXHUwQzBDXXxbXFx1MEMwRS1cXHUwQzEwXXxbXFx1MEMxMi1cXHUwQzI4XXxbXFx1MEMyQS1cXHUwQzMzXXxbXFx1MEMzNS1cXHUwQzM5XXxbXFx1MEM2MC1cXHUwQzYxXXxbXFx1MEM4NS1cXHUwQzhDXXxbXFx1MEM4RS1cXHUwQzkwXXxbXFx1MEM5Mi1cXHUwQ0E4XXxbXFx1MENBQS1cXHUwQ0IzXXxbXFx1MENCNS1cXHUwQ0I5XXxbXFx1MENERS1cXHUwQ0RFXXxbXFx1MENFMC1cXHUwQ0UxXXxbXFx1MEQwNS1cXHUwRDBDXXxbXFx1MEQwRS1cXHUwRDEwXXxbXFx1MEQxMi1cXHUwRDI4XXxbXFx1MEQyQS1cXHUwRDM5XXxbXFx1MEQ2MC1cXHUwRDYxXXxbXFx1MEUwMS1cXHUwRTMwXXxbXFx1MEUzMi1cXHUwRTMzXXxbXFx1MEU0MC1cXHUwRTQ1XXxbXFx1MEU4MS1cXHUwRTgyXXxbXFx1MEU4NC1cXHUwRTg0XXxbXFx1MEU4Ny1cXHUwRTg4XXxbXFx1MEU4QS1cXHUwRThBXXxbXFx1MEU4RC1cXHUwRThEXXxbXFx1MEU5NC1cXHUwRTk3XXxbXFx1MEU5OS1cXHUwRTlGXXxbXFx1MEVBMS1cXHUwRUEzXXxbXFx1MEVBNS1cXHUwRUE1XXxbXFx1MEVBNy1cXHUwRUE3XXxbXFx1MEVBQS1cXHUwRUFCXXxbXFx1MEVBRC1cXHUwRUIwXXxbXFx1MEVCMi1cXHUwRUIzXXxbXFx1MEVCRC1cXHUwRUJEXXxbXFx1MEVDMC1cXHUwRUM0XXxbXFx1MEVEQy1cXHUwRUREXXxbXFx1MEYwMC1cXHUwRjAwXXxbXFx1MEY0MC1cXHUwRjQ3XXxbXFx1MEY0OS1cXHUwRjY5XXxbXFx1MEY4OC1cXHUwRjhCXXxbXFx1MTEwMC1cXHUxMTU5XXxbXFx1MTE1Ri1cXHUxMUEyXXxbXFx1MTFBOC1cXHUxMUY5XXxbXFx1MjEzNS1cXHUyMTM4XXxbXFx1MzAwNi1cXHUzMDA2XXxbXFx1MzA0MS1cXHUzMDk0XXxbXFx1MzBBMS1cXHUzMEZBXXxbXFx1MzEwNS1cXHUzMTJDXXxbXFx1MzEzMS1cXHUzMThFXXxbXFx1NEUwMC1cXHU5RkE1XXxbXFx1QUMwMC1cXHVEN0EzXXxbXFx1RjkwMC1cXHVGQTJEXXxbXFx1RkIxRi1cXHVGQjI4XXxbXFx1RkIyQS1cXHVGQjM2XXxbXFx1RkIzOC1cXHVGQjNDXXxbXFx1RkIzRS1cXHVGQjNFXXxbXFx1RkI0MC1cXHVGQjQxXXxbXFx1RkI0My1cXHVGQjQ0XXxbXFx1RkI0Ni1cXHVGQkIxXXxbXFx1RkJEMy1cXHVGRDNEXXxbXFx1RkQ1MC1cXHVGRDhGXXxbXFx1RkQ5Mi1cXHVGREM3XXxbXFx1RkRGMC1cXHVGREZCXXxbXFx1RkU3MC1cXHVGRTcyXXxbXFx1RkU3NC1cXHVGRTc0XXxbXFx1RkU3Ni1cXHVGRUZDXXxbXFx1RkY2Ni1cXHVGRjZGXXxbXFx1RkY3MS1cXHVGRjlEXXxbXFx1RkZBMC1cXHVGRkJFXXxbXFx1RkZDMi1cXHVGRkM3XXxbXFx1RkZDQS1cXHVGRkNGXXxbXFx1RkZEMi1cXHVGRkQ3XXxbXFx1RkZEQS1cXHVGRkRDXS9cbn07XG4iXX0=
