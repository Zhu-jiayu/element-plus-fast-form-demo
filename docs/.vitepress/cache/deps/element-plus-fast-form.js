import {
  EMPTY_OBJ,
  NO,
  NOOP,
  PatchFlagNames,
  camelize,
  capitalize,
  extend,
  generateCodeFrame,
  init_runtime_dom_esm_bundler,
  init_shared_esm_bundler,
  init_vue_runtime_esm_bundler,
  isArray,
  isBuiltInDirective,
  isHTMLTag,
  isMathMLTag,
  isObject,
  isOn,
  isReservedProp,
  isSVGTag,
  isString,
  isSymbol,
  isVoidTag,
  makeMap,
  parseStringStyle,
  runtime_dom_esm_bundler_exports,
  shared_esm_bundler_exports,
  slotFlagsText,
  toHandlerKey,
  vue_runtime_esm_bundler_exports
} from "./chunk-R3API4AM.js";
import {
  __commonJS,
  __esm,
  __export,
  __toCommonJS
} from "./chunk-V4OQ3NZ2.js";

// node_modules/.pnpm/@vue+compiler-core@3.5.16/node_modules/@vue/compiler-core/dist/compiler-core.esm-bundler.js
function registerRuntimeHelpers(helpers) {
  Object.getOwnPropertySymbols(helpers).forEach((s) => {
    helperNameMap[s] = helpers[s];
  });
}
function createRoot(children, source = "") {
  return {
    type: 0,
    source,
    children,
    helpers: /* @__PURE__ */ new Set(),
    components: [],
    directives: [],
    hoists: [],
    imports: [],
    cached: [],
    temps: 0,
    codegenNode: void 0,
    loc: locStub
  };
}
function createVNodeCall(context, tag, props, children, patchFlag, dynamicProps, directives, isBlock = false, disableTracking = false, isComponent2 = false, loc = locStub) {
  if (context) {
    if (isBlock) {
      context.helper(OPEN_BLOCK);
      context.helper(getVNodeBlockHelper(context.inSSR, isComponent2));
    } else {
      context.helper(getVNodeHelper(context.inSSR, isComponent2));
    }
    if (directives) {
      context.helper(WITH_DIRECTIVES);
    }
  }
  return {
    type: 13,
    tag,
    props,
    children,
    patchFlag,
    dynamicProps,
    directives,
    isBlock,
    disableTracking,
    isComponent: isComponent2,
    loc
  };
}
function createArrayExpression(elements, loc = locStub) {
  return {
    type: 17,
    loc,
    elements
  };
}
function createObjectExpression(properties, loc = locStub) {
  return {
    type: 15,
    loc,
    properties
  };
}
function createObjectProperty(key, value) {
  return {
    type: 16,
    loc: locStub,
    key: isString(key) ? createSimpleExpression(key, true) : key,
    value
  };
}
function createSimpleExpression(content, isStatic = false, loc = locStub, constType = 0) {
  return {
    type: 4,
    loc,
    content,
    isStatic,
    constType: isStatic ? 3 : constType
  };
}
function createInterpolation(content, loc) {
  return {
    type: 5,
    loc,
    content: isString(content) ? createSimpleExpression(content, false, loc) : content
  };
}
function createCompoundExpression(children, loc = locStub) {
  return {
    type: 8,
    loc,
    children
  };
}
function createCallExpression(callee, args = [], loc = locStub) {
  return {
    type: 14,
    loc,
    callee,
    arguments: args
  };
}
function createFunctionExpression(params, returns = void 0, newline = false, isSlot = false, loc = locStub) {
  return {
    type: 18,
    params,
    returns,
    newline,
    isSlot,
    loc
  };
}
function createConditionalExpression(test, consequent, alternate, newline = true) {
  return {
    type: 19,
    test,
    consequent,
    alternate,
    newline,
    loc: locStub
  };
}
function createCacheExpression(index, value, needPauseTracking = false, inVOnce = false) {
  return {
    type: 20,
    index,
    value,
    needPauseTracking,
    inVOnce,
    needArraySpread: false,
    loc: locStub
  };
}
function createBlockStatement(body) {
  return {
    type: 21,
    body,
    loc: locStub
  };
}
function createTemplateLiteral(elements) {
  return {
    type: 22,
    elements,
    loc: locStub
  };
}
function createIfStatement(test, consequent, alternate) {
  return {
    type: 23,
    test,
    consequent,
    alternate,
    loc: locStub
  };
}
function createAssignmentExpression(left, right) {
  return {
    type: 24,
    left,
    right,
    loc: locStub
  };
}
function createSequenceExpression(expressions) {
  return {
    type: 25,
    expressions,
    loc: locStub
  };
}
function createReturnStatement(returns) {
  return {
    type: 26,
    returns,
    loc: locStub
  };
}
function getVNodeHelper(ssr, isComponent2) {
  return ssr || isComponent2 ? CREATE_VNODE : CREATE_ELEMENT_VNODE;
}
function getVNodeBlockHelper(ssr, isComponent2) {
  return ssr || isComponent2 ? CREATE_BLOCK : CREATE_ELEMENT_BLOCK;
}
function convertToBlock(node, { helper, removeHelper, inSSR }) {
  if (!node.isBlock) {
    node.isBlock = true;
    removeHelper(getVNodeHelper(inSSR, node.isComponent));
    helper(OPEN_BLOCK);
    helper(getVNodeBlockHelper(inSSR, node.isComponent));
  }
}
function isTagStartChar(c) {
  return c >= 97 && c <= 122 || c >= 65 && c <= 90;
}
function isWhitespace(c) {
  return c === 32 || c === 10 || c === 9 || c === 12 || c === 13;
}
function isEndOfTagSection(c) {
  return c === 47 || c === 62 || isWhitespace(c);
}
function toCharCodes(str) {
  const ret = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    ret[i] = str.charCodeAt(i);
  }
  return ret;
}
function getCompatValue(key, { compatConfig }) {
  const value = compatConfig && compatConfig[key];
  if (key === "MODE") {
    return value || 3;
  } else {
    return value;
  }
}
function isCompatEnabled(key, context) {
  const mode = getCompatValue("MODE", context);
  const value = getCompatValue(key, context);
  return mode === 3 ? value === true : value !== false;
}
function checkCompatEnabled(key, context, loc, ...args) {
  const enabled = isCompatEnabled(key, context);
  if (enabled) {
    warnDeprecation(key, context, loc, ...args);
  }
  return enabled;
}
function warnDeprecation(key, context, loc, ...args) {
  const val = getCompatValue(key, context);
  if (val === "suppress-warning") {
    return;
  }
  const { message, link } = deprecationData[key];
  const msg = `(deprecation ${key}) ${typeof message === "function" ? message(...args) : message}${link ? `
  Details: ${link}` : ``}`;
  const err = new SyntaxError(msg);
  err.code = key;
  if (loc) err.loc = loc;
  context.onWarn(err);
}
function defaultOnError(error) {
  throw error;
}
function defaultOnWarn(msg) {
  console.warn(`[Vue warn] ${msg.message}`);
}
function createCompilerError(code, loc, messages, additionalMessage) {
  const msg = true ? (messages || errorMessages)[code] + (additionalMessage || ``) : `https://vuejs.org/error-reference/#compiler-${code}`;
  const error = new SyntaxError(String(msg));
  error.code = code;
  error.loc = loc;
  return error;
}
function walkIdentifiers(root, onIdentifier, includeAll = false, parentStack = [], knownIds = /* @__PURE__ */ Object.create(null)) {
  {
    return;
  }
}
function isReferencedIdentifier(id, parent, parentStack) {
  {
    return false;
  }
}
function isInDestructureAssignment(parent, parentStack) {
  if (parent && (parent.type === "ObjectProperty" || parent.type === "ArrayPattern")) {
    let i = parentStack.length;
    while (i--) {
      const p = parentStack[i];
      if (p.type === "AssignmentExpression") {
        return true;
      } else if (p.type !== "ObjectProperty" && !p.type.endsWith("Pattern")) {
        break;
      }
    }
  }
  return false;
}
function isInNewExpression(parentStack) {
  let i = parentStack.length;
  while (i--) {
    const p = parentStack[i];
    if (p.type === "NewExpression") {
      return true;
    } else if (p.type !== "MemberExpression") {
      break;
    }
  }
  return false;
}
function walkFunctionParams(node, onIdent) {
  for (const p of node.params) {
    for (const id of extractIdentifiers(p)) {
      onIdent(id);
    }
  }
}
function walkBlockDeclarations(block, onIdent) {
  for (const stmt of block.body) {
    if (stmt.type === "VariableDeclaration") {
      if (stmt.declare) continue;
      for (const decl of stmt.declarations) {
        for (const id of extractIdentifiers(decl.id)) {
          onIdent(id);
        }
      }
    } else if (stmt.type === "FunctionDeclaration" || stmt.type === "ClassDeclaration") {
      if (stmt.declare || !stmt.id) continue;
      onIdent(stmt.id);
    } else if (isForStatement(stmt)) {
      walkForStatement(stmt, true, onIdent);
    }
  }
}
function isForStatement(stmt) {
  return stmt.type === "ForOfStatement" || stmt.type === "ForInStatement" || stmt.type === "ForStatement";
}
function walkForStatement(stmt, isVar, onIdent) {
  const variable = stmt.type === "ForStatement" ? stmt.init : stmt.left;
  if (variable && variable.type === "VariableDeclaration" && (variable.kind === "var" ? isVar : false)) {
    for (const decl of variable.declarations) {
      for (const id of extractIdentifiers(decl.id)) {
        onIdent(id);
      }
    }
  }
}
function extractIdentifiers(param, nodes = []) {
  switch (param.type) {
    case "Identifier":
      nodes.push(param);
      break;
    case "MemberExpression":
      let object = param;
      while (object.type === "MemberExpression") {
        object = object.object;
      }
      nodes.push(object);
      break;
    case "ObjectPattern":
      for (const prop of param.properties) {
        if (prop.type === "RestElement") {
          extractIdentifiers(prop.argument, nodes);
        } else {
          extractIdentifiers(prop.value, nodes);
        }
      }
      break;
    case "ArrayPattern":
      param.elements.forEach((element) => {
        if (element) extractIdentifiers(element, nodes);
      });
      break;
    case "RestElement":
      extractIdentifiers(param.argument, nodes);
      break;
    case "AssignmentPattern":
      extractIdentifiers(param.left, nodes);
      break;
  }
  return nodes;
}
function unwrapTSNode(node) {
  if (TS_NODE_TYPES.includes(node.type)) {
    return unwrapTSNode(node.expression);
  } else {
    return node;
  }
}
function isCoreComponent(tag) {
  switch (tag) {
    case "Teleport":
    case "teleport":
      return TELEPORT;
    case "Suspense":
    case "suspense":
      return SUSPENSE;
    case "KeepAlive":
    case "keep-alive":
      return KEEP_ALIVE;
    case "BaseTransition":
    case "base-transition":
      return BASE_TRANSITION;
  }
}
function advancePositionWithClone(pos, source, numberOfCharacters = source.length) {
  return advancePositionWithMutation(
    {
      offset: pos.offset,
      line: pos.line,
      column: pos.column
    },
    source,
    numberOfCharacters
  );
}
function advancePositionWithMutation(pos, source, numberOfCharacters = source.length) {
  let linesCount = 0;
  let lastNewLinePos = -1;
  for (let i = 0; i < numberOfCharacters; i++) {
    if (source.charCodeAt(i) === 10) {
      linesCount++;
      lastNewLinePos = i;
    }
  }
  pos.offset += numberOfCharacters;
  pos.line += linesCount;
  pos.column = lastNewLinePos === -1 ? pos.column + numberOfCharacters : numberOfCharacters - lastNewLinePos;
  return pos;
}
function assert(condition, msg) {
  if (!condition) {
    throw new Error(msg || `unexpected compiler condition`);
  }
}
function findDir(node, name, allowEmpty = false) {
  for (let i = 0; i < node.props.length; i++) {
    const p = node.props[i];
    if (p.type === 7 && (allowEmpty || p.exp) && (isString(name) ? p.name === name : name.test(p.name))) {
      return p;
    }
  }
}
function findProp(node, name, dynamicOnly = false, allowEmpty = false) {
  for (let i = 0; i < node.props.length; i++) {
    const p = node.props[i];
    if (p.type === 6) {
      if (dynamicOnly) continue;
      if (p.name === name && (p.value || allowEmpty)) {
        return p;
      }
    } else if (p.name === "bind" && (p.exp || allowEmpty) && isStaticArgOf(p.arg, name)) {
      return p;
    }
  }
}
function isStaticArgOf(arg, name) {
  return !!(arg && isStaticExp(arg) && arg.content === name);
}
function hasDynamicKeyVBind(node) {
  return node.props.some(
    (p) => p.type === 7 && p.name === "bind" && (!p.arg || // v-bind="obj"
    p.arg.type !== 4 || // v-bind:[_ctx.foo]
    !p.arg.isStatic)
    // v-bind:[foo]
  );
}
function isText$1(node) {
  return node.type === 5 || node.type === 2;
}
function isVSlot(p) {
  return p.type === 7 && p.name === "slot";
}
function isTemplateNode(node) {
  return node.type === 1 && node.tagType === 3;
}
function isSlotOutlet(node) {
  return node.type === 1 && node.tagType === 2;
}
function getUnnormalizedProps(props, callPath = []) {
  if (props && !isString(props) && props.type === 14) {
    const callee = props.callee;
    if (!isString(callee) && propsHelperSet.has(callee)) {
      return getUnnormalizedProps(
        props.arguments[0],
        callPath.concat(props)
      );
    }
  }
  return [props, callPath];
}
function injectProp(node, prop, context) {
  let propsWithInjection;
  let props = node.type === 13 ? node.props : node.arguments[2];
  let callPath = [];
  let parentCall;
  if (props && !isString(props) && props.type === 14) {
    const ret = getUnnormalizedProps(props);
    props = ret[0];
    callPath = ret[1];
    parentCall = callPath[callPath.length - 1];
  }
  if (props == null || isString(props)) {
    propsWithInjection = createObjectExpression([prop]);
  } else if (props.type === 14) {
    const first = props.arguments[0];
    if (!isString(first) && first.type === 15) {
      if (!hasProp(prop, first)) {
        first.properties.unshift(prop);
      }
    } else {
      if (props.callee === TO_HANDLERS) {
        propsWithInjection = createCallExpression(context.helper(MERGE_PROPS), [
          createObjectExpression([prop]),
          props
        ]);
      } else {
        props.arguments.unshift(createObjectExpression([prop]));
      }
    }
    !propsWithInjection && (propsWithInjection = props);
  } else if (props.type === 15) {
    if (!hasProp(prop, props)) {
      props.properties.unshift(prop);
    }
    propsWithInjection = props;
  } else {
    propsWithInjection = createCallExpression(context.helper(MERGE_PROPS), [
      createObjectExpression([prop]),
      props
    ]);
    if (parentCall && parentCall.callee === GUARD_REACTIVE_PROPS) {
      parentCall = callPath[callPath.length - 2];
    }
  }
  if (node.type === 13) {
    if (parentCall) {
      parentCall.arguments[0] = propsWithInjection;
    } else {
      node.props = propsWithInjection;
    }
  } else {
    if (parentCall) {
      parentCall.arguments[0] = propsWithInjection;
    } else {
      node.arguments[2] = propsWithInjection;
    }
  }
}
function hasProp(prop, props) {
  let result = false;
  if (prop.key.type === 4) {
    const propKeyName = prop.key.content;
    result = props.properties.some(
      (p) => p.key.type === 4 && p.key.content === propKeyName
    );
  }
  return result;
}
function toValidAssetId(name, type) {
  return `_${type}_${name.replace(/[^\w]/g, (searchValue, replaceValue) => {
    return searchValue === "-" ? "_" : name.charCodeAt(replaceValue).toString();
  })}`;
}
function hasScopeRef(node, ids) {
  if (!node || Object.keys(ids).length === 0) {
    return false;
  }
  switch (node.type) {
    case 1:
      for (let i = 0; i < node.props.length; i++) {
        const p = node.props[i];
        if (p.type === 7 && (hasScopeRef(p.arg, ids) || hasScopeRef(p.exp, ids))) {
          return true;
        }
      }
      return node.children.some((c) => hasScopeRef(c, ids));
    case 11:
      if (hasScopeRef(node.source, ids)) {
        return true;
      }
      return node.children.some((c) => hasScopeRef(c, ids));
    case 9:
      return node.branches.some((b) => hasScopeRef(b, ids));
    case 10:
      if (hasScopeRef(node.condition, ids)) {
        return true;
      }
      return node.children.some((c) => hasScopeRef(c, ids));
    case 4:
      return !node.isStatic && isSimpleIdentifier(node.content) && !!ids[node.content];
    case 8:
      return node.children.some((c) => isObject(c) && hasScopeRef(c, ids));
    case 5:
    case 12:
      return hasScopeRef(node.content, ids);
    case 2:
    case 3:
    case 20:
      return false;
    default:
      if (true) ;
      return false;
  }
}
function getMemoedVNodeCall(node) {
  if (node.type === 14 && node.callee === WITH_MEMO) {
    return node.arguments[1].returns;
  } else {
    return node;
  }
}
function parseForExpression(input) {
  const loc = input.loc;
  const exp = input.content;
  const inMatch = exp.match(forAliasRE);
  if (!inMatch) return;
  const [, LHS, RHS] = inMatch;
  const createAliasExpression = (content, offset, asParam = false) => {
    const start = loc.start.offset + offset;
    const end = start + content.length;
    return createExp(
      content,
      false,
      getLoc(start, end),
      0,
      asParam ? 1 : 0
      /* Normal */
    );
  };
  const result = {
    source: createAliasExpression(RHS.trim(), exp.indexOf(RHS, LHS.length)),
    value: void 0,
    key: void 0,
    index: void 0,
    finalized: false
  };
  let valueContent = LHS.trim().replace(stripParensRE, "").trim();
  const trimmedOffset = LHS.indexOf(valueContent);
  const iteratorMatch = valueContent.match(forIteratorRE);
  if (iteratorMatch) {
    valueContent = valueContent.replace(forIteratorRE, "").trim();
    const keyContent = iteratorMatch[1].trim();
    let keyOffset;
    if (keyContent) {
      keyOffset = exp.indexOf(keyContent, trimmedOffset + valueContent.length);
      result.key = createAliasExpression(keyContent, keyOffset, true);
    }
    if (iteratorMatch[2]) {
      const indexContent = iteratorMatch[2].trim();
      if (indexContent) {
        result.index = createAliasExpression(
          indexContent,
          exp.indexOf(
            indexContent,
            result.key ? keyOffset + keyContent.length : trimmedOffset + valueContent.length
          ),
          true
        );
      }
    }
  }
  if (valueContent) {
    result.value = createAliasExpression(valueContent, trimmedOffset, true);
  }
  return result;
}
function getSlice(start, end) {
  return currentInput.slice(start, end);
}
function endOpenTag(end) {
  if (tokenizer.inSFCRoot) {
    currentOpenTag.innerLoc = getLoc(end + 1, end + 1);
  }
  addNode(currentOpenTag);
  const { tag, ns } = currentOpenTag;
  if (ns === 0 && currentOptions.isPreTag(tag)) {
    inPre++;
  }
  if (currentOptions.isVoidTag(tag)) {
    onCloseTag(currentOpenTag, end);
  } else {
    stack.unshift(currentOpenTag);
    if (ns === 1 || ns === 2) {
      tokenizer.inXML = true;
    }
  }
  currentOpenTag = null;
}
function onText(content, start, end) {
  {
    const tag = stack[0] && stack[0].tag;
    if (tag !== "script" && tag !== "style" && content.includes("&")) {
      content = currentOptions.decodeEntities(content, false);
    }
  }
  const parent = stack[0] || currentRoot;
  const lastNode = parent.children[parent.children.length - 1];
  if (lastNode && lastNode.type === 2) {
    lastNode.content += content;
    setLocEnd(lastNode.loc, end);
  } else {
    parent.children.push({
      type: 2,
      content,
      loc: getLoc(start, end)
    });
  }
}
function onCloseTag(el, end, isImplied = false) {
  if (isImplied) {
    setLocEnd(el.loc, backTrack(end, 60));
  } else {
    setLocEnd(el.loc, lookAhead(end, 62) + 1);
  }
  if (tokenizer.inSFCRoot) {
    if (el.children.length) {
      el.innerLoc.end = extend({}, el.children[el.children.length - 1].loc.end);
    } else {
      el.innerLoc.end = extend({}, el.innerLoc.start);
    }
    el.innerLoc.source = getSlice(
      el.innerLoc.start.offset,
      el.innerLoc.end.offset
    );
  }
  const { tag, ns, children } = el;
  if (!inVPre) {
    if (tag === "slot") {
      el.tagType = 2;
    } else if (isFragmentTemplate(el)) {
      el.tagType = 3;
    } else if (isComponent(el)) {
      el.tagType = 1;
    }
  }
  if (!tokenizer.inRCDATA) {
    el.children = condenseWhitespace(children);
  }
  if (ns === 0 && currentOptions.isIgnoreNewlineTag(tag)) {
    const first = children[0];
    if (first && first.type === 2) {
      first.content = first.content.replace(/^\r?\n/, "");
    }
  }
  if (ns === 0 && currentOptions.isPreTag(tag)) {
    inPre--;
  }
  if (currentVPreBoundary === el) {
    inVPre = tokenizer.inVPre = false;
    currentVPreBoundary = null;
  }
  if (tokenizer.inXML && (stack[0] ? stack[0].ns : currentOptions.ns) === 0) {
    tokenizer.inXML = false;
  }
  {
    const props = el.props;
    if (isCompatEnabled(
      "COMPILER_V_IF_V_FOR_PRECEDENCE",
      currentOptions
    )) {
      let hasIf = false;
      let hasFor = false;
      for (let i = 0; i < props.length; i++) {
        const p = props[i];
        if (p.type === 7) {
          if (p.name === "if") {
            hasIf = true;
          } else if (p.name === "for") {
            hasFor = true;
          }
        }
        if (hasIf && hasFor) {
          warnDeprecation(
            "COMPILER_V_IF_V_FOR_PRECEDENCE",
            currentOptions,
            el.loc
          );
          break;
        }
      }
    }
    if (!tokenizer.inSFCRoot && isCompatEnabled(
      "COMPILER_NATIVE_TEMPLATE",
      currentOptions
    ) && el.tag === "template" && !isFragmentTemplate(el)) {
      warnDeprecation(
        "COMPILER_NATIVE_TEMPLATE",
        currentOptions,
        el.loc
      );
      const parent = stack[0] || currentRoot;
      const index = parent.children.indexOf(el);
      parent.children.splice(index, 1, ...el.children);
    }
    const inlineTemplateProp = props.find(
      (p) => p.type === 6 && p.name === "inline-template"
    );
    if (inlineTemplateProp && checkCompatEnabled(
      "COMPILER_INLINE_TEMPLATE",
      currentOptions,
      inlineTemplateProp.loc
    ) && el.children.length) {
      inlineTemplateProp.value = {
        type: 2,
        content: getSlice(
          el.children[0].loc.start.offset,
          el.children[el.children.length - 1].loc.end.offset
        ),
        loc: inlineTemplateProp.loc
      };
    }
  }
}
function lookAhead(index, c) {
  let i = index;
  while (currentInput.charCodeAt(i) !== c && i < currentInput.length - 1) i++;
  return i;
}
function backTrack(index, c) {
  let i = index;
  while (currentInput.charCodeAt(i) !== c && i >= 0) i--;
  return i;
}
function isFragmentTemplate({ tag, props }) {
  if (tag === "template") {
    for (let i = 0; i < props.length; i++) {
      if (props[i].type === 7 && specialTemplateDir.has(props[i].name)) {
        return true;
      }
    }
  }
  return false;
}
function isComponent({ tag, props }) {
  if (currentOptions.isCustomElement(tag)) {
    return false;
  }
  if (tag === "component" || isUpperCase(tag.charCodeAt(0)) || isCoreComponent(tag) || currentOptions.isBuiltInComponent && currentOptions.isBuiltInComponent(tag) || currentOptions.isNativeTag && !currentOptions.isNativeTag(tag)) {
    return true;
  }
  for (let i = 0; i < props.length; i++) {
    const p = props[i];
    if (p.type === 6) {
      if (p.name === "is" && p.value) {
        if (p.value.content.startsWith("vue:")) {
          return true;
        } else if (checkCompatEnabled(
          "COMPILER_IS_ON_ELEMENT",
          currentOptions,
          p.loc
        )) {
          return true;
        }
      }
    } else if (
      // :is on plain element - only treat as component in compat mode
      p.name === "bind" && isStaticArgOf(p.arg, "is") && checkCompatEnabled(
        "COMPILER_IS_ON_ELEMENT",
        currentOptions,
        p.loc
      )
    ) {
      return true;
    }
  }
  return false;
}
function isUpperCase(c) {
  return c > 64 && c < 91;
}
function condenseWhitespace(nodes, tag) {
  const shouldCondense = currentOptions.whitespace !== "preserve";
  let removedWhitespace = false;
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.type === 2) {
      if (!inPre) {
        if (isAllWhitespace(node.content)) {
          const prev = nodes[i - 1] && nodes[i - 1].type;
          const next = nodes[i + 1] && nodes[i + 1].type;
          if (!prev || !next || shouldCondense && (prev === 3 && (next === 3 || next === 1) || prev === 1 && (next === 3 || next === 1 && hasNewlineChar(node.content)))) {
            removedWhitespace = true;
            nodes[i] = null;
          } else {
            node.content = " ";
          }
        } else if (shouldCondense) {
          node.content = condense(node.content);
        }
      } else {
        node.content = node.content.replace(windowsNewlineRE, "\n");
      }
    }
  }
  return removedWhitespace ? nodes.filter(Boolean) : nodes;
}
function isAllWhitespace(str) {
  for (let i = 0; i < str.length; i++) {
    if (!isWhitespace(str.charCodeAt(i))) {
      return false;
    }
  }
  return true;
}
function hasNewlineChar(str) {
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    if (c === 10 || c === 13) {
      return true;
    }
  }
  return false;
}
function condense(str) {
  let ret = "";
  let prevCharIsWhitespace = false;
  for (let i = 0; i < str.length; i++) {
    if (isWhitespace(str.charCodeAt(i))) {
      if (!prevCharIsWhitespace) {
        ret += " ";
        prevCharIsWhitespace = true;
      }
    } else {
      ret += str[i];
      prevCharIsWhitespace = false;
    }
  }
  return ret;
}
function addNode(node) {
  (stack[0] || currentRoot).children.push(node);
}
function getLoc(start, end) {
  return {
    start: tokenizer.getPos(start),
    // @ts-expect-error allow late attachment
    end: end == null ? end : tokenizer.getPos(end),
    // @ts-expect-error allow late attachment
    source: end == null ? end : getSlice(start, end)
  };
}
function cloneLoc(loc) {
  return getLoc(loc.start.offset, loc.end.offset);
}
function setLocEnd(loc, end) {
  loc.end = tokenizer.getPos(end);
  loc.source = getSlice(loc.start.offset, end);
}
function dirToAttr(dir) {
  const attr = {
    type: 6,
    name: dir.rawName,
    nameLoc: getLoc(
      dir.loc.start.offset,
      dir.loc.start.offset + dir.rawName.length
    ),
    value: void 0,
    loc: dir.loc
  };
  if (dir.exp) {
    const loc = dir.exp.loc;
    if (loc.end.offset < dir.loc.end.offset) {
      loc.start.offset--;
      loc.start.column--;
      loc.end.offset++;
      loc.end.column++;
    }
    attr.value = {
      type: 2,
      content: dir.exp.content,
      loc
    };
  }
  return attr;
}
function createExp(content, isStatic = false, loc, constType = 0, parseMode = 0) {
  const exp = createSimpleExpression(content, isStatic, loc, constType);
  return exp;
}
function emitError(code, index, message) {
  currentOptions.onError(
    createCompilerError(code, getLoc(index, index), void 0, message)
  );
}
function reset() {
  tokenizer.reset();
  currentOpenTag = null;
  currentProp = null;
  currentAttrValue = "";
  currentAttrStartIndex = -1;
  currentAttrEndIndex = -1;
  stack.length = 0;
}
function baseParse(input, options) {
  reset();
  currentInput = input;
  currentOptions = extend({}, defaultParserOptions);
  if (options) {
    let key;
    for (key in options) {
      if (options[key] != null) {
        currentOptions[key] = options[key];
      }
    }
  }
  if (true) {
    if (!currentOptions.decodeEntities) {
      throw new Error(
        `[@vue/compiler-core] decodeEntities option is required in browser builds.`
      );
    }
  }
  tokenizer.mode = currentOptions.parseMode === "html" ? 1 : currentOptions.parseMode === "sfc" ? 2 : 0;
  tokenizer.inXML = currentOptions.ns === 1 || currentOptions.ns === 2;
  const delimiters = options && options.delimiters;
  if (delimiters) {
    tokenizer.delimiterOpen = toCharCodes(delimiters[0]);
    tokenizer.delimiterClose = toCharCodes(delimiters[1]);
  }
  const root = currentRoot = createRoot([], input);
  tokenizer.parse(currentInput);
  root.loc = getLoc(0, input.length);
  root.children = condenseWhitespace(root.children);
  currentRoot = null;
  return root;
}
function cacheStatic(root, context) {
  walk(
    root,
    void 0,
    context,
    // Root node is unfortunately non-hoistable due to potential parent
    // fallthrough attributes.
    isSingleElementRoot(root, root.children[0])
  );
}
function isSingleElementRoot(root, child) {
  const { children } = root;
  return children.length === 1 && child.type === 1 && !isSlotOutlet(child);
}
function walk(node, parent, context, doNotHoistNode = false, inFor = false) {
  const { children } = node;
  const toCache = [];
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (child.type === 1 && child.tagType === 0) {
      const constantType = doNotHoistNode ? 0 : getConstantType(child, context);
      if (constantType > 0) {
        if (constantType >= 2) {
          child.codegenNode.patchFlag = -1;
          toCache.push(child);
          continue;
        }
      } else {
        const codegenNode = child.codegenNode;
        if (codegenNode.type === 13) {
          const flag = codegenNode.patchFlag;
          if ((flag === void 0 || flag === 512 || flag === 1) && getGeneratedPropsConstantType(child, context) >= 2) {
            const props = getNodeProps(child);
            if (props) {
              codegenNode.props = context.hoist(props);
            }
          }
          if (codegenNode.dynamicProps) {
            codegenNode.dynamicProps = context.hoist(codegenNode.dynamicProps);
          }
        }
      }
    } else if (child.type === 12) {
      const constantType = doNotHoistNode ? 0 : getConstantType(child, context);
      if (constantType >= 2) {
        toCache.push(child);
        continue;
      }
    }
    if (child.type === 1) {
      const isComponent2 = child.tagType === 1;
      if (isComponent2) {
        context.scopes.vSlot++;
      }
      walk(child, node, context, false, inFor);
      if (isComponent2) {
        context.scopes.vSlot--;
      }
    } else if (child.type === 11) {
      walk(child, node, context, child.children.length === 1, true);
    } else if (child.type === 9) {
      for (let i2 = 0; i2 < child.branches.length; i2++) {
        walk(
          child.branches[i2],
          node,
          context,
          child.branches[i2].children.length === 1,
          inFor
        );
      }
    }
  }
  let cachedAsArray = false;
  const slotCacheKeys = [];
  if (toCache.length === children.length && node.type === 1) {
    if (node.tagType === 0 && node.codegenNode && node.codegenNode.type === 13 && isArray(node.codegenNode.children)) {
      node.codegenNode.children = getCacheExpression(
        createArrayExpression(node.codegenNode.children)
      );
      cachedAsArray = true;
    } else if (node.tagType === 1 && node.codegenNode && node.codegenNode.type === 13 && node.codegenNode.children && !isArray(node.codegenNode.children) && node.codegenNode.children.type === 15) {
      const slot = getSlotNode(node.codegenNode, "default");
      if (slot) {
        slotCacheKeys.push(context.cached.length);
        slot.returns = getCacheExpression(
          createArrayExpression(slot.returns)
        );
        cachedAsArray = true;
      }
    } else if (node.tagType === 3 && parent && parent.type === 1 && parent.tagType === 1 && parent.codegenNode && parent.codegenNode.type === 13 && parent.codegenNode.children && !isArray(parent.codegenNode.children) && parent.codegenNode.children.type === 15) {
      const slotName = findDir(node, "slot", true);
      const slot = slotName && slotName.arg && getSlotNode(parent.codegenNode, slotName.arg);
      if (slot) {
        slotCacheKeys.push(context.cached.length);
        slot.returns = getCacheExpression(
          createArrayExpression(slot.returns)
        );
        cachedAsArray = true;
      }
    }
  }
  if (!cachedAsArray) {
    for (const child of toCache) {
      slotCacheKeys.push(context.cached.length);
      child.codegenNode = context.cache(child.codegenNode);
    }
  }
  if (slotCacheKeys.length && node.type === 1 && node.tagType === 1 && node.codegenNode && node.codegenNode.type === 13 && node.codegenNode.children && !isArray(node.codegenNode.children) && node.codegenNode.children.type === 15) {
    node.codegenNode.children.properties.push(
      createObjectProperty(
        `__`,
        createSimpleExpression(JSON.stringify(slotCacheKeys), false)
      )
    );
  }
  function getCacheExpression(value) {
    const exp = context.cache(value);
    if (inFor && context.hmr) {
      exp.needArraySpread = true;
    }
    return exp;
  }
  function getSlotNode(node2, name) {
    if (node2.children && !isArray(node2.children) && node2.children.type === 15) {
      const slot = node2.children.properties.find(
        (p) => p.key === name || p.key.content === name
      );
      return slot && slot.value;
    }
  }
  if (toCache.length && context.transformHoist) {
    context.transformHoist(children, context, node);
  }
}
function getConstantType(node, context) {
  const { constantCache } = context;
  switch (node.type) {
    case 1:
      if (node.tagType !== 0) {
        return 0;
      }
      const cached = constantCache.get(node);
      if (cached !== void 0) {
        return cached;
      }
      const codegenNode = node.codegenNode;
      if (codegenNode.type !== 13) {
        return 0;
      }
      if (codegenNode.isBlock && node.tag !== "svg" && node.tag !== "foreignObject" && node.tag !== "math") {
        return 0;
      }
      if (codegenNode.patchFlag === void 0) {
        let returnType2 = 3;
        const generatedPropsType = getGeneratedPropsConstantType(node, context);
        if (generatedPropsType === 0) {
          constantCache.set(node, 0);
          return 0;
        }
        if (generatedPropsType < returnType2) {
          returnType2 = generatedPropsType;
        }
        for (let i = 0; i < node.children.length; i++) {
          const childType = getConstantType(node.children[i], context);
          if (childType === 0) {
            constantCache.set(node, 0);
            return 0;
          }
          if (childType < returnType2) {
            returnType2 = childType;
          }
        }
        if (returnType2 > 1) {
          for (let i = 0; i < node.props.length; i++) {
            const p = node.props[i];
            if (p.type === 7 && p.name === "bind" && p.exp) {
              const expType = getConstantType(p.exp, context);
              if (expType === 0) {
                constantCache.set(node, 0);
                return 0;
              }
              if (expType < returnType2) {
                returnType2 = expType;
              }
            }
          }
        }
        if (codegenNode.isBlock) {
          for (let i = 0; i < node.props.length; i++) {
            const p = node.props[i];
            if (p.type === 7) {
              constantCache.set(node, 0);
              return 0;
            }
          }
          context.removeHelper(OPEN_BLOCK);
          context.removeHelper(
            getVNodeBlockHelper(context.inSSR, codegenNode.isComponent)
          );
          codegenNode.isBlock = false;
          context.helper(getVNodeHelper(context.inSSR, codegenNode.isComponent));
        }
        constantCache.set(node, returnType2);
        return returnType2;
      } else {
        constantCache.set(node, 0);
        return 0;
      }
    case 2:
    case 3:
      return 3;
    case 9:
    case 11:
    case 10:
      return 0;
    case 5:
    case 12:
      return getConstantType(node.content, context);
    case 4:
      return node.constType;
    case 8:
      let returnType = 3;
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        if (isString(child) || isSymbol(child)) {
          continue;
        }
        const childType = getConstantType(child, context);
        if (childType === 0) {
          return 0;
        } else if (childType < returnType) {
          returnType = childType;
        }
      }
      return returnType;
    case 20:
      return 2;
    default:
      if (true) ;
      return 0;
  }
}
function getConstantTypeOfHelperCall(value, context) {
  if (value.type === 14 && !isString(value.callee) && allowHoistedHelperSet.has(value.callee)) {
    const arg = value.arguments[0];
    if (arg.type === 4) {
      return getConstantType(arg, context);
    } else if (arg.type === 14) {
      return getConstantTypeOfHelperCall(arg, context);
    }
  }
  return 0;
}
function getGeneratedPropsConstantType(node, context) {
  let returnType = 3;
  const props = getNodeProps(node);
  if (props && props.type === 15) {
    const { properties } = props;
    for (let i = 0; i < properties.length; i++) {
      const { key, value } = properties[i];
      const keyType = getConstantType(key, context);
      if (keyType === 0) {
        return keyType;
      }
      if (keyType < returnType) {
        returnType = keyType;
      }
      let valueType;
      if (value.type === 4) {
        valueType = getConstantType(value, context);
      } else if (value.type === 14) {
        valueType = getConstantTypeOfHelperCall(value, context);
      } else {
        valueType = 0;
      }
      if (valueType === 0) {
        return valueType;
      }
      if (valueType < returnType) {
        returnType = valueType;
      }
    }
  }
  return returnType;
}
function getNodeProps(node) {
  const codegenNode = node.codegenNode;
  if (codegenNode.type === 13) {
    return codegenNode.props;
  }
}
function createTransformContext(root, {
  filename = "",
  prefixIdentifiers = false,
  hoistStatic = false,
  hmr = false,
  cacheHandlers = false,
  nodeTransforms = [],
  directiveTransforms = {},
  transformHoist = null,
  isBuiltInComponent = NOOP,
  isCustomElement = NOOP,
  expressionPlugins = [],
  scopeId = null,
  slotted = true,
  ssr = false,
  inSSR = false,
  ssrCssVars = ``,
  bindingMetadata = EMPTY_OBJ,
  inline = false,
  isTS = false,
  onError = defaultOnError,
  onWarn = defaultOnWarn,
  compatConfig
}) {
  const nameMatch = filename.replace(/\?.*$/, "").match(/([^/\\]+)\.\w+$/);
  const context = {
    // options
    filename,
    selfName: nameMatch && capitalize(camelize(nameMatch[1])),
    prefixIdentifiers,
    hoistStatic,
    hmr,
    cacheHandlers,
    nodeTransforms,
    directiveTransforms,
    transformHoist,
    isBuiltInComponent,
    isCustomElement,
    expressionPlugins,
    scopeId,
    slotted,
    ssr,
    inSSR,
    ssrCssVars,
    bindingMetadata,
    inline,
    isTS,
    onError,
    onWarn,
    compatConfig,
    // state
    root,
    helpers: /* @__PURE__ */ new Map(),
    components: /* @__PURE__ */ new Set(),
    directives: /* @__PURE__ */ new Set(),
    hoists: [],
    imports: [],
    cached: [],
    constantCache: /* @__PURE__ */ new WeakMap(),
    temps: 0,
    identifiers: /* @__PURE__ */ Object.create(null),
    scopes: {
      vFor: 0,
      vSlot: 0,
      vPre: 0,
      vOnce: 0
    },
    parent: null,
    grandParent: null,
    currentNode: root,
    childIndex: 0,
    inVOnce: false,
    // methods
    helper(name) {
      const count = context.helpers.get(name) || 0;
      context.helpers.set(name, count + 1);
      return name;
    },
    removeHelper(name) {
      const count = context.helpers.get(name);
      if (count) {
        const currentCount = count - 1;
        if (!currentCount) {
          context.helpers.delete(name);
        } else {
          context.helpers.set(name, currentCount);
        }
      }
    },
    helperString(name) {
      return `_${helperNameMap[context.helper(name)]}`;
    },
    replaceNode(node) {
      if (true) {
        if (!context.currentNode) {
          throw new Error(`Node being replaced is already removed.`);
        }
        if (!context.parent) {
          throw new Error(`Cannot replace root node.`);
        }
      }
      context.parent.children[context.childIndex] = context.currentNode = node;
    },
    removeNode(node) {
      if (!context.parent) {
        throw new Error(`Cannot remove root node.`);
      }
      const list = context.parent.children;
      const removalIndex = node ? list.indexOf(node) : context.currentNode ? context.childIndex : -1;
      if (removalIndex < 0) {
        throw new Error(`node being removed is not a child of current parent`);
      }
      if (!node || node === context.currentNode) {
        context.currentNode = null;
        context.onNodeRemoved();
      } else {
        if (context.childIndex > removalIndex) {
          context.childIndex--;
          context.onNodeRemoved();
        }
      }
      context.parent.children.splice(removalIndex, 1);
    },
    onNodeRemoved: NOOP,
    addIdentifiers(exp) {
    },
    removeIdentifiers(exp) {
    },
    hoist(exp) {
      if (isString(exp)) exp = createSimpleExpression(exp);
      context.hoists.push(exp);
      const identifier = createSimpleExpression(
        `_hoisted_${context.hoists.length}`,
        false,
        exp.loc,
        2
      );
      identifier.hoisted = exp;
      return identifier;
    },
    cache(exp, isVNode = false, inVOnce = false) {
      const cacheExp = createCacheExpression(
        context.cached.length,
        exp,
        isVNode,
        inVOnce
      );
      context.cached.push(cacheExp);
      return cacheExp;
    }
  };
  {
    context.filters = /* @__PURE__ */ new Set();
  }
  return context;
}
function transform(root, options) {
  const context = createTransformContext(root, options);
  traverseNode(root, context);
  if (options.hoistStatic) {
    cacheStatic(root, context);
  }
  if (!options.ssr) {
    createRootCodegen(root, context);
  }
  root.helpers = /* @__PURE__ */ new Set([...context.helpers.keys()]);
  root.components = [...context.components];
  root.directives = [...context.directives];
  root.imports = context.imports;
  root.hoists = context.hoists;
  root.temps = context.temps;
  root.cached = context.cached;
  root.transformed = true;
  {
    root.filters = [...context.filters];
  }
}
function createRootCodegen(root, context) {
  const { helper } = context;
  const { children } = root;
  if (children.length === 1) {
    const child = children[0];
    if (isSingleElementRoot(root, child) && child.codegenNode) {
      const codegenNode = child.codegenNode;
      if (codegenNode.type === 13) {
        convertToBlock(codegenNode, context);
      }
      root.codegenNode = codegenNode;
    } else {
      root.codegenNode = child;
    }
  } else if (children.length > 1) {
    let patchFlag = 64;
    if (children.filter((c) => c.type !== 3).length === 1) {
      patchFlag |= 2048;
    }
    root.codegenNode = createVNodeCall(
      context,
      helper(FRAGMENT),
      void 0,
      root.children,
      patchFlag,
      void 0,
      void 0,
      true,
      void 0,
      false
    );
  } else ;
}
function traverseChildren(parent, context) {
  let i = 0;
  const nodeRemoved = () => {
    i--;
  };
  for (; i < parent.children.length; i++) {
    const child = parent.children[i];
    if (isString(child)) continue;
    context.grandParent = context.parent;
    context.parent = parent;
    context.childIndex = i;
    context.onNodeRemoved = nodeRemoved;
    traverseNode(child, context);
  }
}
function traverseNode(node, context) {
  context.currentNode = node;
  const { nodeTransforms } = context;
  const exitFns = [];
  for (let i2 = 0; i2 < nodeTransforms.length; i2++) {
    const onExit = nodeTransforms[i2](node, context);
    if (onExit) {
      if (isArray(onExit)) {
        exitFns.push(...onExit);
      } else {
        exitFns.push(onExit);
      }
    }
    if (!context.currentNode) {
      return;
    } else {
      node = context.currentNode;
    }
  }
  switch (node.type) {
    case 3:
      if (!context.ssr) {
        context.helper(CREATE_COMMENT);
      }
      break;
    case 5:
      if (!context.ssr) {
        context.helper(TO_DISPLAY_STRING);
      }
      break;
    case 9:
      for (let i2 = 0; i2 < node.branches.length; i2++) {
        traverseNode(node.branches[i2], context);
      }
      break;
    case 10:
    case 11:
    case 1:
    case 0:
      traverseChildren(node, context);
      break;
  }
  context.currentNode = node;
  let i = exitFns.length;
  while (i--) {
    exitFns[i]();
  }
}
function createStructuralDirectiveTransform(name, fn) {
  const matches = isString(name) ? (n) => n === name : (n) => name.test(n);
  return (node, context) => {
    if (node.type === 1) {
      const { props } = node;
      if (node.tagType === 3 && props.some(isVSlot)) {
        return;
      }
      const exitFns = [];
      for (let i = 0; i < props.length; i++) {
        const prop = props[i];
        if (prop.type === 7 && matches(prop.name)) {
          props.splice(i, 1);
          i--;
          const onExit = fn(node, prop, context);
          if (onExit) exitFns.push(onExit);
        }
      }
      return exitFns;
    }
  };
}
function createCodegenContext(ast, {
  mode = "function",
  prefixIdentifiers = mode === "module",
  sourceMap = false,
  filename = `template.vue.html`,
  scopeId = null,
  optimizeImports = false,
  runtimeGlobalName = `Vue`,
  runtimeModuleName = `vue`,
  ssrRuntimeModuleName = "vue/server-renderer",
  ssr = false,
  isTS = false,
  inSSR = false
}) {
  const context = {
    mode,
    prefixIdentifiers,
    sourceMap,
    filename,
    scopeId,
    optimizeImports,
    runtimeGlobalName,
    runtimeModuleName,
    ssrRuntimeModuleName,
    ssr,
    isTS,
    inSSR,
    source: ast.source,
    code: ``,
    column: 1,
    line: 1,
    offset: 0,
    indentLevel: 0,
    pure: false,
    map: void 0,
    helper(key) {
      return `_${helperNameMap[key]}`;
    },
    push(code, newlineIndex = -2, node) {
      context.code += code;
    },
    indent() {
      newline(++context.indentLevel);
    },
    deindent(withoutNewLine = false) {
      if (withoutNewLine) {
        --context.indentLevel;
      } else {
        newline(--context.indentLevel);
      }
    },
    newline() {
      newline(context.indentLevel);
    }
  };
  function newline(n) {
    context.push(
      "\n" + `  `.repeat(n),
      0
      /* Start */
    );
  }
  return context;
}
function generate(ast, options = {}) {
  const context = createCodegenContext(ast, options);
  if (options.onContextCreated) options.onContextCreated(context);
  const {
    mode,
    push,
    prefixIdentifiers,
    indent,
    deindent,
    newline,
    scopeId,
    ssr
  } = context;
  const helpers = Array.from(ast.helpers);
  const hasHelpers = helpers.length > 0;
  const useWithBlock = !prefixIdentifiers && mode !== "module";
  const preambleContext = context;
  {
    genFunctionPreamble(ast, preambleContext);
  }
  const functionName = ssr ? `ssrRender` : `render`;
  const args = ssr ? ["_ctx", "_push", "_parent", "_attrs"] : ["_ctx", "_cache"];
  const signature = args.join(", ");
  {
    push(`function ${functionName}(${signature}) {`);
  }
  indent();
  if (useWithBlock) {
    push(`with (_ctx) {`);
    indent();
    if (hasHelpers) {
      push(
        `const { ${helpers.map(aliasHelper).join(", ")} } = _Vue
`,
        -1
        /* End */
      );
      newline();
    }
  }
  if (ast.components.length) {
    genAssets(ast.components, "component", context);
    if (ast.directives.length || ast.temps > 0) {
      newline();
    }
  }
  if (ast.directives.length) {
    genAssets(ast.directives, "directive", context);
    if (ast.temps > 0) {
      newline();
    }
  }
  if (ast.filters && ast.filters.length) {
    newline();
    genAssets(ast.filters, "filter", context);
    newline();
  }
  if (ast.temps > 0) {
    push(`let `);
    for (let i = 0; i < ast.temps; i++) {
      push(`${i > 0 ? `, ` : ``}_temp${i}`);
    }
  }
  if (ast.components.length || ast.directives.length || ast.temps) {
    push(
      `
`,
      0
      /* Start */
    );
    newline();
  }
  if (!ssr) {
    push(`return `);
  }
  if (ast.codegenNode) {
    genNode(ast.codegenNode, context);
  } else {
    push(`null`);
  }
  if (useWithBlock) {
    deindent();
    push(`}`);
  }
  deindent();
  push(`}`);
  return {
    ast,
    code: context.code,
    preamble: ``,
    map: context.map ? context.map.toJSON() : void 0
  };
}
function genFunctionPreamble(ast, context) {
  const {
    ssr,
    prefixIdentifiers,
    push,
    newline,
    runtimeModuleName,
    runtimeGlobalName,
    ssrRuntimeModuleName
  } = context;
  const VueBinding = runtimeGlobalName;
  const helpers = Array.from(ast.helpers);
  if (helpers.length > 0) {
    {
      push(
        `const _Vue = ${VueBinding}
`,
        -1
        /* End */
      );
      if (ast.hoists.length) {
        const staticHelpers = [
          CREATE_VNODE,
          CREATE_ELEMENT_VNODE,
          CREATE_COMMENT,
          CREATE_TEXT,
          CREATE_STATIC
        ].filter((helper) => helpers.includes(helper)).map(aliasHelper).join(", ");
        push(
          `const { ${staticHelpers} } = _Vue
`,
          -1
          /* End */
        );
      }
    }
  }
  genHoists(ast.hoists, context);
  newline();
  push(`return `);
}
function genAssets(assets, type, { helper, push, newline, isTS }) {
  const resolver = helper(
    type === "filter" ? RESOLVE_FILTER : type === "component" ? RESOLVE_COMPONENT : RESOLVE_DIRECTIVE
  );
  for (let i = 0; i < assets.length; i++) {
    let id = assets[i];
    const maybeSelfReference = id.endsWith("__self");
    if (maybeSelfReference) {
      id = id.slice(0, -6);
    }
    push(
      `const ${toValidAssetId(id, type)} = ${resolver}(${JSON.stringify(id)}${maybeSelfReference ? `, true` : ``})${isTS ? `!` : ``}`
    );
    if (i < assets.length - 1) {
      newline();
    }
  }
}
function genHoists(hoists, context) {
  if (!hoists.length) {
    return;
  }
  context.pure = true;
  const { push, newline } = context;
  newline();
  for (let i = 0; i < hoists.length; i++) {
    const exp = hoists[i];
    if (exp) {
      push(`const _hoisted_${i + 1} = `);
      genNode(exp, context);
      newline();
    }
  }
  context.pure = false;
}
function isText(n) {
  return isString(n) || n.type === 4 || n.type === 2 || n.type === 5 || n.type === 8;
}
function genNodeListAsArray(nodes, context) {
  const multilines = nodes.length > 3 || nodes.some((n) => isArray(n) || !isText(n));
  context.push(`[`);
  multilines && context.indent();
  genNodeList(nodes, context, multilines);
  multilines && context.deindent();
  context.push(`]`);
}
function genNodeList(nodes, context, multilines = false, comma = true) {
  const { push, newline } = context;
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (isString(node)) {
      push(
        node,
        -3
        /* Unknown */
      );
    } else if (isArray(node)) {
      genNodeListAsArray(node, context);
    } else {
      genNode(node, context);
    }
    if (i < nodes.length - 1) {
      if (multilines) {
        comma && push(",");
        newline();
      } else {
        comma && push(", ");
      }
    }
  }
}
function genNode(node, context) {
  if (isString(node)) {
    context.push(
      node,
      -3
      /* Unknown */
    );
    return;
  }
  if (isSymbol(node)) {
    context.push(context.helper(node));
    return;
  }
  switch (node.type) {
    case 1:
    case 9:
    case 11:
      assert(
        node.codegenNode != null,
        `Codegen node is missing for element/if/for node. Apply appropriate transforms first.`
      );
      genNode(node.codegenNode, context);
      break;
    case 2:
      genText(node, context);
      break;
    case 4:
      genExpression(node, context);
      break;
    case 5:
      genInterpolation(node, context);
      break;
    case 12:
      genNode(node.codegenNode, context);
      break;
    case 8:
      genCompoundExpression(node, context);
      break;
    case 3:
      genComment(node, context);
      break;
    case 13:
      genVNodeCall(node, context);
      break;
    case 14:
      genCallExpression(node, context);
      break;
    case 15:
      genObjectExpression(node, context);
      break;
    case 17:
      genArrayExpression(node, context);
      break;
    case 18:
      genFunctionExpression(node, context);
      break;
    case 19:
      genConditionalExpression(node, context);
      break;
    case 20:
      genCacheExpression(node, context);
      break;
    case 21:
      genNodeList(node.body, context, true, false);
      break;
    case 22:
      break;
    case 23:
      break;
    case 24:
      break;
    case 25:
      break;
    case 26:
      break;
    case 10:
      break;
    default:
      if (true) {
        assert(false, `unhandled codegen node type: ${node.type}`);
        const exhaustiveCheck = node;
        return exhaustiveCheck;
      }
  }
}
function genText(node, context) {
  context.push(JSON.stringify(node.content), -3, node);
}
function genExpression(node, context) {
  const { content, isStatic } = node;
  context.push(
    isStatic ? JSON.stringify(content) : content,
    -3,
    node
  );
}
function genInterpolation(node, context) {
  const { push, helper, pure } = context;
  if (pure) push(PURE_ANNOTATION);
  push(`${helper(TO_DISPLAY_STRING)}(`);
  genNode(node.content, context);
  push(`)`);
}
function genCompoundExpression(node, context) {
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];
    if (isString(child)) {
      context.push(
        child,
        -3
        /* Unknown */
      );
    } else {
      genNode(child, context);
    }
  }
}
function genExpressionAsPropertyKey(node, context) {
  const { push } = context;
  if (node.type === 8) {
    push(`[`);
    genCompoundExpression(node, context);
    push(`]`);
  } else if (node.isStatic) {
    const text = isSimpleIdentifier(node.content) ? node.content : JSON.stringify(node.content);
    push(text, -2, node);
  } else {
    push(`[${node.content}]`, -3, node);
  }
}
function genComment(node, context) {
  const { push, helper, pure } = context;
  if (pure) {
    push(PURE_ANNOTATION);
  }
  push(
    `${helper(CREATE_COMMENT)}(${JSON.stringify(node.content)})`,
    -3,
    node
  );
}
function genVNodeCall(node, context) {
  const { push, helper, pure } = context;
  const {
    tag,
    props,
    children,
    patchFlag,
    dynamicProps,
    directives,
    isBlock,
    disableTracking,
    isComponent: isComponent2
  } = node;
  let patchFlagString;
  if (patchFlag) {
    if (true) {
      if (patchFlag < 0) {
        patchFlagString = patchFlag + ` /* ${PatchFlagNames[patchFlag]} */`;
      } else {
        const flagNames = Object.keys(PatchFlagNames).map(Number).filter((n) => n > 0 && patchFlag & n).map((n) => PatchFlagNames[n]).join(`, `);
        patchFlagString = patchFlag + ` /* ${flagNames} */`;
      }
    } else {
      patchFlagString = String(patchFlag);
    }
  }
  if (directives) {
    push(helper(WITH_DIRECTIVES) + `(`);
  }
  if (isBlock) {
    push(`(${helper(OPEN_BLOCK)}(${disableTracking ? `true` : ``}), `);
  }
  if (pure) {
    push(PURE_ANNOTATION);
  }
  const callHelper = isBlock ? getVNodeBlockHelper(context.inSSR, isComponent2) : getVNodeHelper(context.inSSR, isComponent2);
  push(helper(callHelper) + `(`, -2, node);
  genNodeList(
    genNullableArgs([tag, props, children, patchFlagString, dynamicProps]),
    context
  );
  push(`)`);
  if (isBlock) {
    push(`)`);
  }
  if (directives) {
    push(`, `);
    genNode(directives, context);
    push(`)`);
  }
}
function genNullableArgs(args) {
  let i = args.length;
  while (i--) {
    if (args[i] != null) break;
  }
  return args.slice(0, i + 1).map((arg) => arg || `null`);
}
function genCallExpression(node, context) {
  const { push, helper, pure } = context;
  const callee = isString(node.callee) ? node.callee : helper(node.callee);
  if (pure) {
    push(PURE_ANNOTATION);
  }
  push(callee + `(`, -2, node);
  genNodeList(node.arguments, context);
  push(`)`);
}
function genObjectExpression(node, context) {
  const { push, indent, deindent, newline } = context;
  const { properties } = node;
  if (!properties.length) {
    push(`{}`, -2, node);
    return;
  }
  const multilines = properties.length > 1 || properties.some((p) => p.value.type !== 4);
  push(multilines ? `{` : `{ `);
  multilines && indent();
  for (let i = 0; i < properties.length; i++) {
    const { key, value } = properties[i];
    genExpressionAsPropertyKey(key, context);
    push(`: `);
    genNode(value, context);
    if (i < properties.length - 1) {
      push(`,`);
      newline();
    }
  }
  multilines && deindent();
  push(multilines ? `}` : ` }`);
}
function genArrayExpression(node, context) {
  genNodeListAsArray(node.elements, context);
}
function genFunctionExpression(node, context) {
  const { push, indent, deindent } = context;
  const { params, returns, body, newline, isSlot } = node;
  if (isSlot) {
    push(`_${helperNameMap[WITH_CTX]}(`);
  }
  push(`(`, -2, node);
  if (isArray(params)) {
    genNodeList(params, context);
  } else if (params) {
    genNode(params, context);
  }
  push(`) => `);
  if (newline || body) {
    push(`{`);
    indent();
  }
  if (returns) {
    if (newline) {
      push(`return `);
    }
    if (isArray(returns)) {
      genNodeListAsArray(returns, context);
    } else {
      genNode(returns, context);
    }
  } else if (body) {
    genNode(body, context);
  }
  if (newline || body) {
    deindent();
    push(`}`);
  }
  if (isSlot) {
    if (node.isNonScopedSlot) {
      push(`, undefined, true`);
    }
    push(`)`);
  }
}
function genConditionalExpression(node, context) {
  const { test, consequent, alternate, newline: needNewline } = node;
  const { push, indent, deindent, newline } = context;
  if (test.type === 4) {
    const needsParens = !isSimpleIdentifier(test.content);
    needsParens && push(`(`);
    genExpression(test, context);
    needsParens && push(`)`);
  } else {
    push(`(`);
    genNode(test, context);
    push(`)`);
  }
  needNewline && indent();
  context.indentLevel++;
  needNewline || push(` `);
  push(`? `);
  genNode(consequent, context);
  context.indentLevel--;
  needNewline && newline();
  needNewline || push(` `);
  push(`: `);
  const isNested = alternate.type === 19;
  if (!isNested) {
    context.indentLevel++;
  }
  genNode(alternate, context);
  if (!isNested) {
    context.indentLevel--;
  }
  needNewline && deindent(
    true
    /* without newline */
  );
}
function genCacheExpression(node, context) {
  const { push, helper, indent, deindent, newline } = context;
  const { needPauseTracking, needArraySpread } = node;
  if (needArraySpread) {
    push(`[...(`);
  }
  push(`_cache[${node.index}] || (`);
  if (needPauseTracking) {
    indent();
    push(`${helper(SET_BLOCK_TRACKING)}(-1`);
    if (node.inVOnce) push(`, true`);
    push(`),`);
    newline();
    push(`(`);
  }
  push(`_cache[${node.index}] = `);
  genNode(node.value, context);
  if (needPauseTracking) {
    push(`).cacheIndex = ${node.index},`);
    newline();
    push(`${helper(SET_BLOCK_TRACKING)}(1),`);
    newline();
    push(`_cache[${node.index}]`);
    deindent();
  }
  push(`)`);
  if (needArraySpread) {
    push(`)]`);
  }
}
function validateBrowserExpression(node, context, asParams = false, asRawStatements = false) {
  const exp = node.content;
  if (!exp.trim()) {
    return;
  }
  try {
    new Function(
      asRawStatements ? ` ${exp} ` : `return ${asParams ? `(${exp}) => {}` : `(${exp})`}`
    );
  } catch (e) {
    let message = e.message;
    const keywordMatch = exp.replace(stripStringRE, "").match(prohibitedKeywordRE);
    if (keywordMatch) {
      message = `avoid using JavaScript keyword as property name: "${keywordMatch[0]}"`;
    }
    context.onError(
      createCompilerError(
        45,
        node.loc,
        void 0,
        message
      )
    );
  }
}
function processExpression(node, context, asParams = false, asRawStatements = false, localVars = Object.create(context.identifiers)) {
  {
    if (true) {
      validateBrowserExpression(node, context, asParams, asRawStatements);
    }
    return node;
  }
}
function stringifyExpression(exp) {
  if (isString(exp)) {
    return exp;
  } else if (exp.type === 4) {
    return exp.content;
  } else {
    return exp.children.map(stringifyExpression).join("");
  }
}
function processIf(node, dir, context, processCodegen) {
  if (dir.name !== "else" && (!dir.exp || !dir.exp.content.trim())) {
    const loc = dir.exp ? dir.exp.loc : node.loc;
    context.onError(
      createCompilerError(28, dir.loc)
    );
    dir.exp = createSimpleExpression(`true`, false, loc);
  }
  if (dir.exp) {
    validateBrowserExpression(dir.exp, context);
  }
  if (dir.name === "if") {
    const branch = createIfBranch(node, dir);
    const ifNode = {
      type: 9,
      loc: cloneLoc(node.loc),
      branches: [branch]
    };
    context.replaceNode(ifNode);
    if (processCodegen) {
      return processCodegen(ifNode, branch, true);
    }
  } else {
    const siblings = context.parent.children;
    const comments = [];
    let i = siblings.indexOf(node);
    while (i-- >= -1) {
      const sibling = siblings[i];
      if (sibling && sibling.type === 3) {
        context.removeNode(sibling);
        comments.unshift(sibling);
        continue;
      }
      if (sibling && sibling.type === 2 && !sibling.content.trim().length) {
        context.removeNode(sibling);
        continue;
      }
      if (sibling && sibling.type === 9) {
        if (dir.name === "else-if" && sibling.branches[sibling.branches.length - 1].condition === void 0) {
          context.onError(
            createCompilerError(30, node.loc)
          );
        }
        context.removeNode();
        const branch = createIfBranch(node, dir);
        if (comments.length && // #3619 ignore comments if the v-if is direct child of <transition>
        !(context.parent && context.parent.type === 1 && (context.parent.tag === "transition" || context.parent.tag === "Transition"))) {
          branch.children = [...comments, ...branch.children];
        }
        if (true) {
          const key = branch.userKey;
          if (key) {
            sibling.branches.forEach(({ userKey }) => {
              if (isSameKey(userKey, key)) {
                context.onError(
                  createCompilerError(
                    29,
                    branch.userKey.loc
                  )
                );
              }
            });
          }
        }
        sibling.branches.push(branch);
        const onExit = processCodegen && processCodegen(sibling, branch, false);
        traverseNode(branch, context);
        if (onExit) onExit();
        context.currentNode = null;
      } else {
        context.onError(
          createCompilerError(30, node.loc)
        );
      }
      break;
    }
  }
}
function createIfBranch(node, dir) {
  const isTemplateIf = node.tagType === 3;
  return {
    type: 10,
    loc: node.loc,
    condition: dir.name === "else" ? void 0 : dir.exp,
    children: isTemplateIf && !findDir(node, "for") ? node.children : [node],
    userKey: findProp(node, `key`),
    isTemplateIf
  };
}
function createCodegenNodeForBranch(branch, keyIndex, context) {
  if (branch.condition) {
    return createConditionalExpression(
      branch.condition,
      createChildrenCodegenNode(branch, keyIndex, context),
      // make sure to pass in asBlock: true so that the comment node call
      // closes the current block.
      createCallExpression(context.helper(CREATE_COMMENT), [
        true ? '"v-if"' : '""',
        "true"
      ])
    );
  } else {
    return createChildrenCodegenNode(branch, keyIndex, context);
  }
}
function createChildrenCodegenNode(branch, keyIndex, context) {
  const { helper } = context;
  const keyProperty = createObjectProperty(
    `key`,
    createSimpleExpression(
      `${keyIndex}`,
      false,
      locStub,
      2
    )
  );
  const { children } = branch;
  const firstChild = children[0];
  const needFragmentWrapper = children.length !== 1 || firstChild.type !== 1;
  if (needFragmentWrapper) {
    if (children.length === 1 && firstChild.type === 11) {
      const vnodeCall = firstChild.codegenNode;
      injectProp(vnodeCall, keyProperty, context);
      return vnodeCall;
    } else {
      let patchFlag = 64;
      if (!branch.isTemplateIf && children.filter((c) => c.type !== 3).length === 1) {
        patchFlag |= 2048;
      }
      return createVNodeCall(
        context,
        helper(FRAGMENT),
        createObjectExpression([keyProperty]),
        children,
        patchFlag,
        void 0,
        void 0,
        true,
        false,
        false,
        branch.loc
      );
    }
  } else {
    const ret = firstChild.codegenNode;
    const vnodeCall = getMemoedVNodeCall(ret);
    if (vnodeCall.type === 13) {
      convertToBlock(vnodeCall, context);
    }
    injectProp(vnodeCall, keyProperty, context);
    return ret;
  }
}
function isSameKey(a, b) {
  if (!a || a.type !== b.type) {
    return false;
  }
  if (a.type === 6) {
    if (a.value.content !== b.value.content) {
      return false;
    }
  } else {
    const exp = a.exp;
    const branchExp = b.exp;
    if (exp.type !== branchExp.type) {
      return false;
    }
    if (exp.type !== 4 || exp.isStatic !== branchExp.isStatic || exp.content !== branchExp.content) {
      return false;
    }
  }
  return true;
}
function getParentCondition(node) {
  while (true) {
    if (node.type === 19) {
      if (node.alternate.type === 19) {
        node = node.alternate;
      } else {
        return node;
      }
    } else if (node.type === 20) {
      node = node.value;
    }
  }
}
function processFor(node, dir, context, processCodegen) {
  if (!dir.exp) {
    context.onError(
      createCompilerError(31, dir.loc)
    );
    return;
  }
  const parseResult = dir.forParseResult;
  if (!parseResult) {
    context.onError(
      createCompilerError(32, dir.loc)
    );
    return;
  }
  finalizeForParseResult(parseResult, context);
  const { addIdentifiers, removeIdentifiers, scopes } = context;
  const { source, value, key, index } = parseResult;
  const forNode = {
    type: 11,
    loc: dir.loc,
    source,
    valueAlias: value,
    keyAlias: key,
    objectIndexAlias: index,
    parseResult,
    children: isTemplateNode(node) ? node.children : [node]
  };
  context.replaceNode(forNode);
  scopes.vFor++;
  const onExit = processCodegen && processCodegen(forNode);
  return () => {
    scopes.vFor--;
    if (onExit) onExit();
  };
}
function finalizeForParseResult(result, context) {
  if (result.finalized) return;
  if (true) {
    validateBrowserExpression(result.source, context);
    if (result.key) {
      validateBrowserExpression(
        result.key,
        context,
        true
      );
    }
    if (result.index) {
      validateBrowserExpression(
        result.index,
        context,
        true
      );
    }
    if (result.value) {
      validateBrowserExpression(
        result.value,
        context,
        true
      );
    }
  }
  result.finalized = true;
}
function createForLoopParams({ value, key, index }, memoArgs = []) {
  return createParamsList([value, key, index, ...memoArgs]);
}
function createParamsList(args) {
  let i = args.length;
  while (i--) {
    if (args[i]) break;
  }
  return args.slice(0, i + 1).map((arg, i2) => arg || createSimpleExpression(`_`.repeat(i2 + 1), false));
}
function buildSlots(node, context, buildSlotFn = buildClientSlotFn) {
  context.helper(WITH_CTX);
  const { children, loc } = node;
  const slotsProperties = [];
  const dynamicSlots = [];
  let hasDynamicSlots = context.scopes.vSlot > 0 || context.scopes.vFor > 0;
  const onComponentSlot = findDir(node, "slot", true);
  if (onComponentSlot) {
    const { arg, exp } = onComponentSlot;
    if (arg && !isStaticExp(arg)) {
      hasDynamicSlots = true;
    }
    slotsProperties.push(
      createObjectProperty(
        arg || createSimpleExpression("default", true),
        buildSlotFn(exp, void 0, children, loc)
      )
    );
  }
  let hasTemplateSlots = false;
  let hasNamedDefaultSlot = false;
  const implicitDefaultChildren = [];
  const seenSlotNames = /* @__PURE__ */ new Set();
  let conditionalBranchIndex = 0;
  for (let i = 0; i < children.length; i++) {
    const slotElement = children[i];
    let slotDir;
    if (!isTemplateNode(slotElement) || !(slotDir = findDir(slotElement, "slot", true))) {
      if (slotElement.type !== 3) {
        implicitDefaultChildren.push(slotElement);
      }
      continue;
    }
    if (onComponentSlot) {
      context.onError(
        createCompilerError(37, slotDir.loc)
      );
      break;
    }
    hasTemplateSlots = true;
    const { children: slotChildren, loc: slotLoc } = slotElement;
    const {
      arg: slotName = createSimpleExpression(`default`, true),
      exp: slotProps,
      loc: dirLoc
    } = slotDir;
    let staticSlotName;
    if (isStaticExp(slotName)) {
      staticSlotName = slotName ? slotName.content : `default`;
    } else {
      hasDynamicSlots = true;
    }
    const vFor = findDir(slotElement, "for");
    const slotFunction = buildSlotFn(slotProps, vFor, slotChildren, slotLoc);
    let vIf;
    let vElse;
    if (vIf = findDir(slotElement, "if")) {
      hasDynamicSlots = true;
      dynamicSlots.push(
        createConditionalExpression(
          vIf.exp,
          buildDynamicSlot(slotName, slotFunction, conditionalBranchIndex++),
          defaultFallback
        )
      );
    } else if (vElse = findDir(
      slotElement,
      /^else(-if)?$/,
      true
      /* allowEmpty */
    )) {
      let j = i;
      let prev;
      while (j--) {
        prev = children[j];
        if (prev.type !== 3) {
          break;
        }
      }
      if (prev && isTemplateNode(prev) && findDir(prev, /^(else-)?if$/)) {
        let conditional = dynamicSlots[dynamicSlots.length - 1];
        while (conditional.alternate.type === 19) {
          conditional = conditional.alternate;
        }
        conditional.alternate = vElse.exp ? createConditionalExpression(
          vElse.exp,
          buildDynamicSlot(
            slotName,
            slotFunction,
            conditionalBranchIndex++
          ),
          defaultFallback
        ) : buildDynamicSlot(slotName, slotFunction, conditionalBranchIndex++);
      } else {
        context.onError(
          createCompilerError(30, vElse.loc)
        );
      }
    } else if (vFor) {
      hasDynamicSlots = true;
      const parseResult = vFor.forParseResult;
      if (parseResult) {
        finalizeForParseResult(parseResult, context);
        dynamicSlots.push(
          createCallExpression(context.helper(RENDER_LIST), [
            parseResult.source,
            createFunctionExpression(
              createForLoopParams(parseResult),
              buildDynamicSlot(slotName, slotFunction),
              true
            )
          ])
        );
      } else {
        context.onError(
          createCompilerError(
            32,
            vFor.loc
          )
        );
      }
    } else {
      if (staticSlotName) {
        if (seenSlotNames.has(staticSlotName)) {
          context.onError(
            createCompilerError(
              38,
              dirLoc
            )
          );
          continue;
        }
        seenSlotNames.add(staticSlotName);
        if (staticSlotName === "default") {
          hasNamedDefaultSlot = true;
        }
      }
      slotsProperties.push(createObjectProperty(slotName, slotFunction));
    }
  }
  if (!onComponentSlot) {
    const buildDefaultSlotProperty = (props, children2) => {
      const fn = buildSlotFn(props, void 0, children2, loc);
      if (context.compatConfig) {
        fn.isNonScopedSlot = true;
      }
      return createObjectProperty(`default`, fn);
    };
    if (!hasTemplateSlots) {
      slotsProperties.push(buildDefaultSlotProperty(void 0, children));
    } else if (implicitDefaultChildren.length && // #3766
    // with whitespace: 'preserve', whitespaces between slots will end up in
    // implicitDefaultChildren. Ignore if all implicit children are whitespaces.
    implicitDefaultChildren.some((node2) => isNonWhitespaceContent(node2))) {
      if (hasNamedDefaultSlot) {
        context.onError(
          createCompilerError(
            39,
            implicitDefaultChildren[0].loc
          )
        );
      } else {
        slotsProperties.push(
          buildDefaultSlotProperty(void 0, implicitDefaultChildren)
        );
      }
    }
  }
  const slotFlag = hasDynamicSlots ? 2 : hasForwardedSlots(node.children) ? 3 : 1;
  let slots = createObjectExpression(
    slotsProperties.concat(
      createObjectProperty(
        `_`,
        // 2 = compiled but dynamic = can skip normalization, but must run diff
        // 1 = compiled and static = can skip normalization AND diff as optimized
        createSimpleExpression(
          slotFlag + (true ? ` /* ${slotFlagsText[slotFlag]} */` : ``),
          false
        )
      )
    ),
    loc
  );
  if (dynamicSlots.length) {
    slots = createCallExpression(context.helper(CREATE_SLOTS), [
      slots,
      createArrayExpression(dynamicSlots)
    ]);
  }
  return {
    slots,
    hasDynamicSlots
  };
}
function buildDynamicSlot(name, fn, index) {
  const props = [
    createObjectProperty(`name`, name),
    createObjectProperty(`fn`, fn)
  ];
  if (index != null) {
    props.push(
      createObjectProperty(`key`, createSimpleExpression(String(index), true))
    );
  }
  return createObjectExpression(props);
}
function hasForwardedSlots(children) {
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    switch (child.type) {
      case 1:
        if (child.tagType === 2 || hasForwardedSlots(child.children)) {
          return true;
        }
        break;
      case 9:
        if (hasForwardedSlots(child.branches)) return true;
        break;
      case 10:
      case 11:
        if (hasForwardedSlots(child.children)) return true;
        break;
    }
  }
  return false;
}
function isNonWhitespaceContent(node) {
  if (node.type !== 2 && node.type !== 12)
    return true;
  return node.type === 2 ? !!node.content.trim() : isNonWhitespaceContent(node.content);
}
function resolveComponentType(node, context, ssr = false) {
  let { tag } = node;
  const isExplicitDynamic = isComponentTag(tag);
  const isProp = findProp(
    node,
    "is",
    false,
    true
    /* allow empty */
  );
  if (isProp) {
    if (isExplicitDynamic || isCompatEnabled(
      "COMPILER_IS_ON_ELEMENT",
      context
    )) {
      let exp;
      if (isProp.type === 6) {
        exp = isProp.value && createSimpleExpression(isProp.value.content, true);
      } else {
        exp = isProp.exp;
        if (!exp) {
          exp = createSimpleExpression(`is`, false, isProp.arg.loc);
        }
      }
      if (exp) {
        return createCallExpression(context.helper(RESOLVE_DYNAMIC_COMPONENT), [
          exp
        ]);
      }
    } else if (isProp.type === 6 && isProp.value.content.startsWith("vue:")) {
      tag = isProp.value.content.slice(4);
    }
  }
  const builtIn = isCoreComponent(tag) || context.isBuiltInComponent(tag);
  if (builtIn) {
    if (!ssr) context.helper(builtIn);
    return builtIn;
  }
  context.helper(RESOLVE_COMPONENT);
  context.components.add(tag);
  return toValidAssetId(tag, `component`);
}
function buildProps(node, context, props = node.props, isComponent2, isDynamicComponent, ssr = false) {
  const { tag, loc: elementLoc, children } = node;
  let properties = [];
  const mergeArgs = [];
  const runtimeDirectives = [];
  const hasChildren = children.length > 0;
  let shouldUseBlock = false;
  let patchFlag = 0;
  let hasRef = false;
  let hasClassBinding = false;
  let hasStyleBinding = false;
  let hasHydrationEventBinding = false;
  let hasDynamicKeys = false;
  let hasVnodeHook = false;
  const dynamicPropNames = [];
  const pushMergeArg = (arg) => {
    if (properties.length) {
      mergeArgs.push(
        createObjectExpression(dedupeProperties(properties), elementLoc)
      );
      properties = [];
    }
    if (arg) mergeArgs.push(arg);
  };
  const pushRefVForMarker = () => {
    if (context.scopes.vFor > 0) {
      properties.push(
        createObjectProperty(
          createSimpleExpression("ref_for", true),
          createSimpleExpression("true")
        )
      );
    }
  };
  const analyzePatchFlag = ({ key, value }) => {
    if (isStaticExp(key)) {
      const name = key.content;
      const isEventHandler = isOn(name);
      if (isEventHandler && (!isComponent2 || isDynamicComponent) && // omit the flag for click handlers because hydration gives click
      // dedicated fast path.
      name.toLowerCase() !== "onclick" && // omit v-model handlers
      name !== "onUpdate:modelValue" && // omit onVnodeXXX hooks
      !isReservedProp(name)) {
        hasHydrationEventBinding = true;
      }
      if (isEventHandler && isReservedProp(name)) {
        hasVnodeHook = true;
      }
      if (isEventHandler && value.type === 14) {
        value = value.arguments[0];
      }
      if (value.type === 20 || (value.type === 4 || value.type === 8) && getConstantType(value, context) > 0) {
        return;
      }
      if (name === "ref") {
        hasRef = true;
      } else if (name === "class") {
        hasClassBinding = true;
      } else if (name === "style") {
        hasStyleBinding = true;
      } else if (name !== "key" && !dynamicPropNames.includes(name)) {
        dynamicPropNames.push(name);
      }
      if (isComponent2 && (name === "class" || name === "style") && !dynamicPropNames.includes(name)) {
        dynamicPropNames.push(name);
      }
    } else {
      hasDynamicKeys = true;
    }
  };
  for (let i = 0; i < props.length; i++) {
    const prop = props[i];
    if (prop.type === 6) {
      const { loc, name, nameLoc, value } = prop;
      let isStatic = true;
      if (name === "ref") {
        hasRef = true;
        pushRefVForMarker();
      }
      if (name === "is" && (isComponentTag(tag) || value && value.content.startsWith("vue:") || isCompatEnabled(
        "COMPILER_IS_ON_ELEMENT",
        context
      ))) {
        continue;
      }
      properties.push(
        createObjectProperty(
          createSimpleExpression(name, true, nameLoc),
          createSimpleExpression(
            value ? value.content : "",
            isStatic,
            value ? value.loc : loc
          )
        )
      );
    } else {
      const { name, arg, exp, loc, modifiers } = prop;
      const isVBind = name === "bind";
      const isVOn = name === "on";
      if (name === "slot") {
        if (!isComponent2) {
          context.onError(
            createCompilerError(40, loc)
          );
        }
        continue;
      }
      if (name === "once" || name === "memo") {
        continue;
      }
      if (name === "is" || isVBind && isStaticArgOf(arg, "is") && (isComponentTag(tag) || isCompatEnabled(
        "COMPILER_IS_ON_ELEMENT",
        context
      ))) {
        continue;
      }
      if (isVOn && ssr) {
        continue;
      }
      if (
        // #938: elements with dynamic keys should be forced into blocks
        isVBind && isStaticArgOf(arg, "key") || // inline before-update hooks need to force block so that it is invoked
        // before children
        isVOn && hasChildren && isStaticArgOf(arg, "vue:before-update")
      ) {
        shouldUseBlock = true;
      }
      if (isVBind && isStaticArgOf(arg, "ref")) {
        pushRefVForMarker();
      }
      if (!arg && (isVBind || isVOn)) {
        hasDynamicKeys = true;
        if (exp) {
          if (isVBind) {
            {
              pushMergeArg();
              if (true) {
                const hasOverridableKeys = mergeArgs.some((arg2) => {
                  if (arg2.type === 15) {
                    return arg2.properties.some(({ key }) => {
                      if (key.type !== 4 || !key.isStatic) {
                        return true;
                      }
                      return key.content !== "class" && key.content !== "style" && !isOn(key.content);
                    });
                  } else {
                    return true;
                  }
                });
                if (hasOverridableKeys) {
                  checkCompatEnabled(
                    "COMPILER_V_BIND_OBJECT_ORDER",
                    context,
                    loc
                  );
                }
              }
              if (isCompatEnabled(
                "COMPILER_V_BIND_OBJECT_ORDER",
                context
              )) {
                mergeArgs.unshift(exp);
                continue;
              }
            }
            pushRefVForMarker();
            pushMergeArg();
            mergeArgs.push(exp);
          } else {
            pushMergeArg({
              type: 14,
              loc,
              callee: context.helper(TO_HANDLERS),
              arguments: isComponent2 ? [exp] : [exp, `true`]
            });
          }
        } else {
          context.onError(
            createCompilerError(
              isVBind ? 34 : 35,
              loc
            )
          );
        }
        continue;
      }
      if (isVBind && modifiers.some((mod) => mod.content === "prop")) {
        patchFlag |= 32;
      }
      const directiveTransform = context.directiveTransforms[name];
      if (directiveTransform) {
        const { props: props2, needRuntime } = directiveTransform(prop, node, context);
        !ssr && props2.forEach(analyzePatchFlag);
        if (isVOn && arg && !isStaticExp(arg)) {
          pushMergeArg(createObjectExpression(props2, elementLoc));
        } else {
          properties.push(...props2);
        }
        if (needRuntime) {
          runtimeDirectives.push(prop);
          if (isSymbol(needRuntime)) {
            directiveImportMap.set(prop, needRuntime);
          }
        }
      } else if (!isBuiltInDirective(name)) {
        runtimeDirectives.push(prop);
        if (hasChildren) {
          shouldUseBlock = true;
        }
      }
    }
  }
  let propsExpression = void 0;
  if (mergeArgs.length) {
    pushMergeArg();
    if (mergeArgs.length > 1) {
      propsExpression = createCallExpression(
        context.helper(MERGE_PROPS),
        mergeArgs,
        elementLoc
      );
    } else {
      propsExpression = mergeArgs[0];
    }
  } else if (properties.length) {
    propsExpression = createObjectExpression(
      dedupeProperties(properties),
      elementLoc
    );
  }
  if (hasDynamicKeys) {
    patchFlag |= 16;
  } else {
    if (hasClassBinding && !isComponent2) {
      patchFlag |= 2;
    }
    if (hasStyleBinding && !isComponent2) {
      patchFlag |= 4;
    }
    if (dynamicPropNames.length) {
      patchFlag |= 8;
    }
    if (hasHydrationEventBinding) {
      patchFlag |= 32;
    }
  }
  if (!shouldUseBlock && (patchFlag === 0 || patchFlag === 32) && (hasRef || hasVnodeHook || runtimeDirectives.length > 0)) {
    patchFlag |= 512;
  }
  if (!context.inSSR && propsExpression) {
    switch (propsExpression.type) {
      case 15:
        let classKeyIndex = -1;
        let styleKeyIndex = -1;
        let hasDynamicKey = false;
        for (let i = 0; i < propsExpression.properties.length; i++) {
          const key = propsExpression.properties[i].key;
          if (isStaticExp(key)) {
            if (key.content === "class") {
              classKeyIndex = i;
            } else if (key.content === "style") {
              styleKeyIndex = i;
            }
          } else if (!key.isHandlerKey) {
            hasDynamicKey = true;
          }
        }
        const classProp = propsExpression.properties[classKeyIndex];
        const styleProp = propsExpression.properties[styleKeyIndex];
        if (!hasDynamicKey) {
          if (classProp && !isStaticExp(classProp.value)) {
            classProp.value = createCallExpression(
              context.helper(NORMALIZE_CLASS),
              [classProp.value]
            );
          }
          if (styleProp && // the static style is compiled into an object,
          // so use `hasStyleBinding` to ensure that it is a dynamic style binding
          (hasStyleBinding || styleProp.value.type === 4 && styleProp.value.content.trim()[0] === `[` || // v-bind:style and style both exist,
          // v-bind:style with static literal object
          styleProp.value.type === 17)) {
            styleProp.value = createCallExpression(
              context.helper(NORMALIZE_STYLE),
              [styleProp.value]
            );
          }
        } else {
          propsExpression = createCallExpression(
            context.helper(NORMALIZE_PROPS),
            [propsExpression]
          );
        }
        break;
      case 14:
        break;
      default:
        propsExpression = createCallExpression(
          context.helper(NORMALIZE_PROPS),
          [
            createCallExpression(context.helper(GUARD_REACTIVE_PROPS), [
              propsExpression
            ])
          ]
        );
        break;
    }
  }
  return {
    props: propsExpression,
    directives: runtimeDirectives,
    patchFlag,
    dynamicPropNames,
    shouldUseBlock
  };
}
function dedupeProperties(properties) {
  const knownProps = /* @__PURE__ */ new Map();
  const deduped = [];
  for (let i = 0; i < properties.length; i++) {
    const prop = properties[i];
    if (prop.key.type === 8 || !prop.key.isStatic) {
      deduped.push(prop);
      continue;
    }
    const name = prop.key.content;
    const existing = knownProps.get(name);
    if (existing) {
      if (name === "style" || name === "class" || isOn(name)) {
        mergeAsArray(existing, prop);
      }
    } else {
      knownProps.set(name, prop);
      deduped.push(prop);
    }
  }
  return deduped;
}
function mergeAsArray(existing, incoming) {
  if (existing.value.type === 17) {
    existing.value.elements.push(incoming.value);
  } else {
    existing.value = createArrayExpression(
      [existing.value, incoming.value],
      existing.loc
    );
  }
}
function buildDirectiveArgs(dir, context) {
  const dirArgs = [];
  const runtime = directiveImportMap.get(dir);
  if (runtime) {
    dirArgs.push(context.helperString(runtime));
  } else {
    {
      context.helper(RESOLVE_DIRECTIVE);
      context.directives.add(dir.name);
      dirArgs.push(toValidAssetId(dir.name, `directive`));
    }
  }
  const { loc } = dir;
  if (dir.exp) dirArgs.push(dir.exp);
  if (dir.arg) {
    if (!dir.exp) {
      dirArgs.push(`void 0`);
    }
    dirArgs.push(dir.arg);
  }
  if (Object.keys(dir.modifiers).length) {
    if (!dir.arg) {
      if (!dir.exp) {
        dirArgs.push(`void 0`);
      }
      dirArgs.push(`void 0`);
    }
    const trueExpression = createSimpleExpression(`true`, false, loc);
    dirArgs.push(
      createObjectExpression(
        dir.modifiers.map(
          (modifier) => createObjectProperty(modifier, trueExpression)
        ),
        loc
      )
    );
  }
  return createArrayExpression(dirArgs, dir.loc);
}
function stringifyDynamicPropNames(props) {
  let propsNamesString = `[`;
  for (let i = 0, l = props.length; i < l; i++) {
    propsNamesString += JSON.stringify(props[i]);
    if (i < l - 1) propsNamesString += ", ";
  }
  return propsNamesString + `]`;
}
function isComponentTag(tag) {
  return tag === "component" || tag === "Component";
}
function processSlotOutlet(node, context) {
  let slotName = `"default"`;
  let slotProps = void 0;
  const nonNameProps = [];
  for (let i = 0; i < node.props.length; i++) {
    const p = node.props[i];
    if (p.type === 6) {
      if (p.value) {
        if (p.name === "name") {
          slotName = JSON.stringify(p.value.content);
        } else {
          p.name = camelize(p.name);
          nonNameProps.push(p);
        }
      }
    } else {
      if (p.name === "bind" && isStaticArgOf(p.arg, "name")) {
        if (p.exp) {
          slotName = p.exp;
        } else if (p.arg && p.arg.type === 4) {
          const name = camelize(p.arg.content);
          slotName = p.exp = createSimpleExpression(name, false, p.arg.loc);
        }
      } else {
        if (p.name === "bind" && p.arg && isStaticExp(p.arg)) {
          p.arg.content = camelize(p.arg.content);
        }
        nonNameProps.push(p);
      }
    }
  }
  if (nonNameProps.length > 0) {
    const { props, directives } = buildProps(
      node,
      context,
      nonNameProps,
      false,
      false
    );
    slotProps = props;
    if (directives.length) {
      context.onError(
        createCompilerError(
          36,
          directives[0].loc
        )
      );
    }
  }
  return {
    slotName,
    slotProps
  };
}
function createTransformProps(props = []) {
  return { props };
}
function rewriteFilter(node, context) {
  if (node.type === 4) {
    parseFilter(node, context);
  } else {
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      if (typeof child !== "object") continue;
      if (child.type === 4) {
        parseFilter(child, context);
      } else if (child.type === 8) {
        rewriteFilter(node, context);
      } else if (child.type === 5) {
        rewriteFilter(child.content, context);
      }
    }
  }
}
function parseFilter(node, context) {
  const exp = node.content;
  let inSingle = false;
  let inDouble = false;
  let inTemplateString = false;
  let inRegex = false;
  let curly = 0;
  let square = 0;
  let paren = 0;
  let lastFilterIndex = 0;
  let c, prev, i, expression, filters = [];
  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 39 && prev !== 92) inSingle = false;
    } else if (inDouble) {
      if (c === 34 && prev !== 92) inDouble = false;
    } else if (inTemplateString) {
      if (c === 96 && prev !== 92) inTemplateString = false;
    } else if (inRegex) {
      if (c === 47 && prev !== 92) inRegex = false;
    } else if (c === 124 && // pipe
    exp.charCodeAt(i + 1) !== 124 && exp.charCodeAt(i - 1) !== 124 && !curly && !square && !paren) {
      if (expression === void 0) {
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 34:
          inDouble = true;
          break;
        case 39:
          inSingle = true;
          break;
        case 96:
          inTemplateString = true;
          break;
        case 40:
          paren++;
          break;
        case 41:
          paren--;
          break;
        case 91:
          square++;
          break;
        case 93:
          square--;
          break;
        case 123:
          curly++;
          break;
        case 125:
          curly--;
          break;
      }
      if (c === 47) {
        let j = i - 1;
        let p;
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== " ") break;
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }
  if (expression === void 0) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }
  function pushFilter() {
    filters.push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }
  if (filters.length) {
    warnDeprecation(
      "COMPILER_FILTERS",
      context,
      node.loc
    );
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i], context);
    }
    node.content = expression;
    node.ast = void 0;
  }
}
function wrapFilter(exp, filter, context) {
  context.helper(RESOLVE_FILTER);
  const i = filter.indexOf("(");
  if (i < 0) {
    context.filters.add(filter);
    return `${toValidAssetId(filter, "filter")}(${exp})`;
  } else {
    const name = filter.slice(0, i);
    const args = filter.slice(i + 1);
    context.filters.add(name);
    return `${toValidAssetId(name, "filter")}(${exp}${args !== ")" ? "," + args : args}`;
  }
}
function getBaseTransformPreset(prefixIdentifiers) {
  return [
    [
      transformOnce,
      transformIf,
      transformMemo,
      transformFor,
      ...[transformFilter],
      ...true ? [transformExpression] : [],
      transformSlotOutlet,
      transformElement,
      trackSlotScopes,
      transformText
    ],
    {
      on: transformOn,
      bind: transformBind,
      model: transformModel
    }
  ];
}
function baseCompile(source, options = {}) {
  const onError = options.onError || defaultOnError;
  const isModuleMode = options.mode === "module";
  {
    if (options.prefixIdentifiers === true) {
      onError(createCompilerError(47));
    } else if (isModuleMode) {
      onError(createCompilerError(48));
    }
  }
  const prefixIdentifiers = false;
  if (options.cacheHandlers) {
    onError(createCompilerError(49));
  }
  if (options.scopeId && !isModuleMode) {
    onError(createCompilerError(50));
  }
  const resolvedOptions = extend({}, options, {
    prefixIdentifiers
  });
  const ast = isString(source) ? baseParse(source, resolvedOptions) : source;
  const [nodeTransforms, directiveTransforms] = getBaseTransformPreset();
  transform(
    ast,
    extend({}, resolvedOptions, {
      nodeTransforms: [
        ...nodeTransforms,
        ...options.nodeTransforms || []
        // user transforms
      ],
      directiveTransforms: extend(
        {},
        directiveTransforms,
        options.directiveTransforms || {}
        // user transforms
      )
    })
  );
  return generate(ast, resolvedOptions);
}
var FRAGMENT, TELEPORT, SUSPENSE, KEEP_ALIVE, BASE_TRANSITION, OPEN_BLOCK, CREATE_BLOCK, CREATE_ELEMENT_BLOCK, CREATE_VNODE, CREATE_ELEMENT_VNODE, CREATE_COMMENT, CREATE_TEXT, CREATE_STATIC, RESOLVE_COMPONENT, RESOLVE_DYNAMIC_COMPONENT, RESOLVE_DIRECTIVE, RESOLVE_FILTER, WITH_DIRECTIVES, RENDER_LIST, RENDER_SLOT, CREATE_SLOTS, TO_DISPLAY_STRING, MERGE_PROPS, NORMALIZE_CLASS, NORMALIZE_STYLE, NORMALIZE_PROPS, GUARD_REACTIVE_PROPS, TO_HANDLERS, CAMELIZE, CAPITALIZE, TO_HANDLER_KEY, SET_BLOCK_TRACKING, PUSH_SCOPE_ID, POP_SCOPE_ID, WITH_CTX, UNREF, IS_REF, WITH_MEMO, IS_MEMO_SAME, helperNameMap, Namespaces, NodeTypes, ElementTypes, ConstantTypes, locStub, defaultDelimitersOpen, defaultDelimitersClose, Sequences, Tokenizer, CompilerDeprecationTypes, deprecationData, ErrorCodes, errorMessages, isFunctionType, isStaticProperty, isStaticPropertyKey, TS_NODE_TYPES, isStaticExp, nonIdentifierRE, isSimpleIdentifier, validFirstIdentCharRE, validIdentCharRE, whitespaceRE, getExpSource, isMemberExpressionBrowser, isMemberExpressionNode, isMemberExpression, fnExpRE, isFnExpressionBrowser, isFnExpressionNode, isFnExpression, propsHelperSet, forAliasRE, defaultParserOptions, currentOptions, currentRoot, currentInput, currentOpenTag, currentProp, currentAttrValue, currentAttrStartIndex, currentAttrEndIndex, inPre, inVPre, currentVPreBoundary, stack, tokenizer, forIteratorRE, stripParensRE, specialTemplateDir, windowsNewlineRE, allowHoistedHelperSet, PURE_ANNOTATION, aliasHelper, prohibitedKeywordRE, stripStringRE, transformExpression, transformIf, transformBind, transformBindShorthand, injectPrefix, transformFor, defaultFallback, trackSlotScopes, trackVForSlotScopes, buildClientSlotFn, directiveImportMap, transformElement, transformSlotOutlet, transformOn, transformText, seen$1, transformOnce, transformModel, validDivisionCharRE, transformFilter, seen, transformMemo, BindingTypes, noopDirectiveTransform;
var init_compiler_core_esm_bundler = __esm({
  "node_modules/.pnpm/@vue+compiler-core@3.5.16/node_modules/@vue/compiler-core/dist/compiler-core.esm-bundler.js"() {
    init_shared_esm_bundler();
    init_shared_esm_bundler();
    FRAGMENT = Symbol(true ? `Fragment` : ``);
    TELEPORT = Symbol(true ? `Teleport` : ``);
    SUSPENSE = Symbol(true ? `Suspense` : ``);
    KEEP_ALIVE = Symbol(true ? `KeepAlive` : ``);
    BASE_TRANSITION = Symbol(
      true ? `BaseTransition` : ``
    );
    OPEN_BLOCK = Symbol(true ? `openBlock` : ``);
    CREATE_BLOCK = Symbol(true ? `createBlock` : ``);
    CREATE_ELEMENT_BLOCK = Symbol(
      true ? `createElementBlock` : ``
    );
    CREATE_VNODE = Symbol(true ? `createVNode` : ``);
    CREATE_ELEMENT_VNODE = Symbol(
      true ? `createElementVNode` : ``
    );
    CREATE_COMMENT = Symbol(
      true ? `createCommentVNode` : ``
    );
    CREATE_TEXT = Symbol(
      true ? `createTextVNode` : ``
    );
    CREATE_STATIC = Symbol(
      true ? `createStaticVNode` : ``
    );
    RESOLVE_COMPONENT = Symbol(
      true ? `resolveComponent` : ``
    );
    RESOLVE_DYNAMIC_COMPONENT = Symbol(
      true ? `resolveDynamicComponent` : ``
    );
    RESOLVE_DIRECTIVE = Symbol(
      true ? `resolveDirective` : ``
    );
    RESOLVE_FILTER = Symbol(
      true ? `resolveFilter` : ``
    );
    WITH_DIRECTIVES = Symbol(
      true ? `withDirectives` : ``
    );
    RENDER_LIST = Symbol(true ? `renderList` : ``);
    RENDER_SLOT = Symbol(true ? `renderSlot` : ``);
    CREATE_SLOTS = Symbol(true ? `createSlots` : ``);
    TO_DISPLAY_STRING = Symbol(
      true ? `toDisplayString` : ``
    );
    MERGE_PROPS = Symbol(true ? `mergeProps` : ``);
    NORMALIZE_CLASS = Symbol(
      true ? `normalizeClass` : ``
    );
    NORMALIZE_STYLE = Symbol(
      true ? `normalizeStyle` : ``
    );
    NORMALIZE_PROPS = Symbol(
      true ? `normalizeProps` : ``
    );
    GUARD_REACTIVE_PROPS = Symbol(
      true ? `guardReactiveProps` : ``
    );
    TO_HANDLERS = Symbol(true ? `toHandlers` : ``);
    CAMELIZE = Symbol(true ? `camelize` : ``);
    CAPITALIZE = Symbol(true ? `capitalize` : ``);
    TO_HANDLER_KEY = Symbol(
      true ? `toHandlerKey` : ``
    );
    SET_BLOCK_TRACKING = Symbol(
      true ? `setBlockTracking` : ``
    );
    PUSH_SCOPE_ID = Symbol(true ? `pushScopeId` : ``);
    POP_SCOPE_ID = Symbol(true ? `popScopeId` : ``);
    WITH_CTX = Symbol(true ? `withCtx` : ``);
    UNREF = Symbol(true ? `unref` : ``);
    IS_REF = Symbol(true ? `isRef` : ``);
    WITH_MEMO = Symbol(true ? `withMemo` : ``);
    IS_MEMO_SAME = Symbol(true ? `isMemoSame` : ``);
    helperNameMap = {
      [FRAGMENT]: `Fragment`,
      [TELEPORT]: `Teleport`,
      [SUSPENSE]: `Suspense`,
      [KEEP_ALIVE]: `KeepAlive`,
      [BASE_TRANSITION]: `BaseTransition`,
      [OPEN_BLOCK]: `openBlock`,
      [CREATE_BLOCK]: `createBlock`,
      [CREATE_ELEMENT_BLOCK]: `createElementBlock`,
      [CREATE_VNODE]: `createVNode`,
      [CREATE_ELEMENT_VNODE]: `createElementVNode`,
      [CREATE_COMMENT]: `createCommentVNode`,
      [CREATE_TEXT]: `createTextVNode`,
      [CREATE_STATIC]: `createStaticVNode`,
      [RESOLVE_COMPONENT]: `resolveComponent`,
      [RESOLVE_DYNAMIC_COMPONENT]: `resolveDynamicComponent`,
      [RESOLVE_DIRECTIVE]: `resolveDirective`,
      [RESOLVE_FILTER]: `resolveFilter`,
      [WITH_DIRECTIVES]: `withDirectives`,
      [RENDER_LIST]: `renderList`,
      [RENDER_SLOT]: `renderSlot`,
      [CREATE_SLOTS]: `createSlots`,
      [TO_DISPLAY_STRING]: `toDisplayString`,
      [MERGE_PROPS]: `mergeProps`,
      [NORMALIZE_CLASS]: `normalizeClass`,
      [NORMALIZE_STYLE]: `normalizeStyle`,
      [NORMALIZE_PROPS]: `normalizeProps`,
      [GUARD_REACTIVE_PROPS]: `guardReactiveProps`,
      [TO_HANDLERS]: `toHandlers`,
      [CAMELIZE]: `camelize`,
      [CAPITALIZE]: `capitalize`,
      [TO_HANDLER_KEY]: `toHandlerKey`,
      [SET_BLOCK_TRACKING]: `setBlockTracking`,
      [PUSH_SCOPE_ID]: `pushScopeId`,
      [POP_SCOPE_ID]: `popScopeId`,
      [WITH_CTX]: `withCtx`,
      [UNREF]: `unref`,
      [IS_REF]: `isRef`,
      [WITH_MEMO]: `withMemo`,
      [IS_MEMO_SAME]: `isMemoSame`
    };
    Namespaces = {
      "HTML": 0,
      "0": "HTML",
      "SVG": 1,
      "1": "SVG",
      "MATH_ML": 2,
      "2": "MATH_ML"
    };
    NodeTypes = {
      "ROOT": 0,
      "0": "ROOT",
      "ELEMENT": 1,
      "1": "ELEMENT",
      "TEXT": 2,
      "2": "TEXT",
      "COMMENT": 3,
      "3": "COMMENT",
      "SIMPLE_EXPRESSION": 4,
      "4": "SIMPLE_EXPRESSION",
      "INTERPOLATION": 5,
      "5": "INTERPOLATION",
      "ATTRIBUTE": 6,
      "6": "ATTRIBUTE",
      "DIRECTIVE": 7,
      "7": "DIRECTIVE",
      "COMPOUND_EXPRESSION": 8,
      "8": "COMPOUND_EXPRESSION",
      "IF": 9,
      "9": "IF",
      "IF_BRANCH": 10,
      "10": "IF_BRANCH",
      "FOR": 11,
      "11": "FOR",
      "TEXT_CALL": 12,
      "12": "TEXT_CALL",
      "VNODE_CALL": 13,
      "13": "VNODE_CALL",
      "JS_CALL_EXPRESSION": 14,
      "14": "JS_CALL_EXPRESSION",
      "JS_OBJECT_EXPRESSION": 15,
      "15": "JS_OBJECT_EXPRESSION",
      "JS_PROPERTY": 16,
      "16": "JS_PROPERTY",
      "JS_ARRAY_EXPRESSION": 17,
      "17": "JS_ARRAY_EXPRESSION",
      "JS_FUNCTION_EXPRESSION": 18,
      "18": "JS_FUNCTION_EXPRESSION",
      "JS_CONDITIONAL_EXPRESSION": 19,
      "19": "JS_CONDITIONAL_EXPRESSION",
      "JS_CACHE_EXPRESSION": 20,
      "20": "JS_CACHE_EXPRESSION",
      "JS_BLOCK_STATEMENT": 21,
      "21": "JS_BLOCK_STATEMENT",
      "JS_TEMPLATE_LITERAL": 22,
      "22": "JS_TEMPLATE_LITERAL",
      "JS_IF_STATEMENT": 23,
      "23": "JS_IF_STATEMENT",
      "JS_ASSIGNMENT_EXPRESSION": 24,
      "24": "JS_ASSIGNMENT_EXPRESSION",
      "JS_SEQUENCE_EXPRESSION": 25,
      "25": "JS_SEQUENCE_EXPRESSION",
      "JS_RETURN_STATEMENT": 26,
      "26": "JS_RETURN_STATEMENT"
    };
    ElementTypes = {
      "ELEMENT": 0,
      "0": "ELEMENT",
      "COMPONENT": 1,
      "1": "COMPONENT",
      "SLOT": 2,
      "2": "SLOT",
      "TEMPLATE": 3,
      "3": "TEMPLATE"
    };
    ConstantTypes = {
      "NOT_CONSTANT": 0,
      "0": "NOT_CONSTANT",
      "CAN_SKIP_PATCH": 1,
      "1": "CAN_SKIP_PATCH",
      "CAN_CACHE": 2,
      "2": "CAN_CACHE",
      "CAN_STRINGIFY": 3,
      "3": "CAN_STRINGIFY"
    };
    locStub = {
      start: { line: 1, column: 1, offset: 0 },
      end: { line: 1, column: 1, offset: 0 },
      source: ""
    };
    defaultDelimitersOpen = new Uint8Array([123, 123]);
    defaultDelimitersClose = new Uint8Array([125, 125]);
    Sequences = {
      Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]),
      // CDATA[
      CdataEnd: new Uint8Array([93, 93, 62]),
      // ]]>
      CommentEnd: new Uint8Array([45, 45, 62]),
      // `-->`
      ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]),
      // `<\/script`
      StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]),
      // `</style`
      TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101]),
      // `</title`
      TextareaEnd: new Uint8Array([
        60,
        47,
        116,
        101,
        120,
        116,
        97,
        114,
        101,
        97
      ])
      // `</textarea
    };
    Tokenizer = class {
      constructor(stack2, cbs) {
        this.stack = stack2;
        this.cbs = cbs;
        this.state = 1;
        this.buffer = "";
        this.sectionStart = 0;
        this.index = 0;
        this.entityStart = 0;
        this.baseState = 1;
        this.inRCDATA = false;
        this.inXML = false;
        this.inVPre = false;
        this.newlines = [];
        this.mode = 0;
        this.delimiterOpen = defaultDelimitersOpen;
        this.delimiterClose = defaultDelimitersClose;
        this.delimiterIndex = -1;
        this.currentSequence = void 0;
        this.sequenceIndex = 0;
      }
      get inSFCRoot() {
        return this.mode === 2 && this.stack.length === 0;
      }
      reset() {
        this.state = 1;
        this.mode = 0;
        this.buffer = "";
        this.sectionStart = 0;
        this.index = 0;
        this.baseState = 1;
        this.inRCDATA = false;
        this.currentSequence = void 0;
        this.newlines.length = 0;
        this.delimiterOpen = defaultDelimitersOpen;
        this.delimiterClose = defaultDelimitersClose;
      }
      /**
       * Generate Position object with line / column information using recorded
       * newline positions. We know the index is always going to be an already
       * processed index, so all the newlines up to this index should have been
       * recorded.
       */
      getPos(index) {
        let line = 1;
        let column = index + 1;
        for (let i = this.newlines.length - 1; i >= 0; i--) {
          const newlineIndex = this.newlines[i];
          if (index > newlineIndex) {
            line = i + 2;
            column = index - newlineIndex;
            break;
          }
        }
        return {
          column,
          line,
          offset: index
        };
      }
      peek() {
        return this.buffer.charCodeAt(this.index + 1);
      }
      stateText(c) {
        if (c === 60) {
          if (this.index > this.sectionStart) {
            this.cbs.ontext(this.sectionStart, this.index);
          }
          this.state = 5;
          this.sectionStart = this.index;
        } else if (!this.inVPre && c === this.delimiterOpen[0]) {
          this.state = 2;
          this.delimiterIndex = 0;
          this.stateInterpolationOpen(c);
        }
      }
      stateInterpolationOpen(c) {
        if (c === this.delimiterOpen[this.delimiterIndex]) {
          if (this.delimiterIndex === this.delimiterOpen.length - 1) {
            const start = this.index + 1 - this.delimiterOpen.length;
            if (start > this.sectionStart) {
              this.cbs.ontext(this.sectionStart, start);
            }
            this.state = 3;
            this.sectionStart = start;
          } else {
            this.delimiterIndex++;
          }
        } else if (this.inRCDATA) {
          this.state = 32;
          this.stateInRCDATA(c);
        } else {
          this.state = 1;
          this.stateText(c);
        }
      }
      stateInterpolation(c) {
        if (c === this.delimiterClose[0]) {
          this.state = 4;
          this.delimiterIndex = 0;
          this.stateInterpolationClose(c);
        }
      }
      stateInterpolationClose(c) {
        if (c === this.delimiterClose[this.delimiterIndex]) {
          if (this.delimiterIndex === this.delimiterClose.length - 1) {
            this.cbs.oninterpolation(this.sectionStart, this.index + 1);
            if (this.inRCDATA) {
              this.state = 32;
            } else {
              this.state = 1;
            }
            this.sectionStart = this.index + 1;
          } else {
            this.delimiterIndex++;
          }
        } else {
          this.state = 3;
          this.stateInterpolation(c);
        }
      }
      stateSpecialStartSequence(c) {
        const isEnd = this.sequenceIndex === this.currentSequence.length;
        const isMatch = isEnd ? (
          // If we are at the end of the sequence, make sure the tag name has ended
          isEndOfTagSection(c)
        ) : (
          // Otherwise, do a case-insensitive comparison
          (c | 32) === this.currentSequence[this.sequenceIndex]
        );
        if (!isMatch) {
          this.inRCDATA = false;
        } else if (!isEnd) {
          this.sequenceIndex++;
          return;
        }
        this.sequenceIndex = 0;
        this.state = 6;
        this.stateInTagName(c);
      }
      /** Look for an end tag. For <title> and <textarea>, also decode entities. */
      stateInRCDATA(c) {
        if (this.sequenceIndex === this.currentSequence.length) {
          if (c === 62 || isWhitespace(c)) {
            const endOfText = this.index - this.currentSequence.length;
            if (this.sectionStart < endOfText) {
              const actualIndex = this.index;
              this.index = endOfText;
              this.cbs.ontext(this.sectionStart, endOfText);
              this.index = actualIndex;
            }
            this.sectionStart = endOfText + 2;
            this.stateInClosingTagName(c);
            this.inRCDATA = false;
            return;
          }
          this.sequenceIndex = 0;
        }
        if ((c | 32) === this.currentSequence[this.sequenceIndex]) {
          this.sequenceIndex += 1;
        } else if (this.sequenceIndex === 0) {
          if (this.currentSequence === Sequences.TitleEnd || this.currentSequence === Sequences.TextareaEnd && !this.inSFCRoot) {
            if (!this.inVPre && c === this.delimiterOpen[0]) {
              this.state = 2;
              this.delimiterIndex = 0;
              this.stateInterpolationOpen(c);
            }
          } else if (this.fastForwardTo(60)) {
            this.sequenceIndex = 1;
          }
        } else {
          this.sequenceIndex = Number(c === 60);
        }
      }
      stateCDATASequence(c) {
        if (c === Sequences.Cdata[this.sequenceIndex]) {
          if (++this.sequenceIndex === Sequences.Cdata.length) {
            this.state = 28;
            this.currentSequence = Sequences.CdataEnd;
            this.sequenceIndex = 0;
            this.sectionStart = this.index + 1;
          }
        } else {
          this.sequenceIndex = 0;
          this.state = 23;
          this.stateInDeclaration(c);
        }
      }
      /**
       * When we wait for one specific character, we can speed things up
       * by skipping through the buffer until we find it.
       *
       * @returns Whether the character was found.
       */
      fastForwardTo(c) {
        while (++this.index < this.buffer.length) {
          const cc = this.buffer.charCodeAt(this.index);
          if (cc === 10) {
            this.newlines.push(this.index);
          }
          if (cc === c) {
            return true;
          }
        }
        this.index = this.buffer.length - 1;
        return false;
      }
      /**
       * Comments and CDATA end with `-->` and `]]>`.
       *
       * Their common qualities are:
       * - Their end sequences have a distinct character they start with.
       * - That character is then repeated, so we have to check multiple repeats.
       * - All characters but the start character of the sequence can be skipped.
       */
      stateInCommentLike(c) {
        if (c === this.currentSequence[this.sequenceIndex]) {
          if (++this.sequenceIndex === this.currentSequence.length) {
            if (this.currentSequence === Sequences.CdataEnd) {
              this.cbs.oncdata(this.sectionStart, this.index - 2);
            } else {
              this.cbs.oncomment(this.sectionStart, this.index - 2);
            }
            this.sequenceIndex = 0;
            this.sectionStart = this.index + 1;
            this.state = 1;
          }
        } else if (this.sequenceIndex === 0) {
          if (this.fastForwardTo(this.currentSequence[0])) {
            this.sequenceIndex = 1;
          }
        } else if (c !== this.currentSequence[this.sequenceIndex - 1]) {
          this.sequenceIndex = 0;
        }
      }
      startSpecial(sequence, offset) {
        this.enterRCDATA(sequence, offset);
        this.state = 31;
      }
      enterRCDATA(sequence, offset) {
        this.inRCDATA = true;
        this.currentSequence = sequence;
        this.sequenceIndex = offset;
      }
      stateBeforeTagName(c) {
        if (c === 33) {
          this.state = 22;
          this.sectionStart = this.index + 1;
        } else if (c === 63) {
          this.state = 24;
          this.sectionStart = this.index + 1;
        } else if (isTagStartChar(c)) {
          this.sectionStart = this.index;
          if (this.mode === 0) {
            this.state = 6;
          } else if (this.inSFCRoot) {
            this.state = 34;
          } else if (!this.inXML) {
            if (c === 116) {
              this.state = 30;
            } else {
              this.state = c === 115 ? 29 : 6;
            }
          } else {
            this.state = 6;
          }
        } else if (c === 47) {
          this.state = 8;
        } else {
          this.state = 1;
          this.stateText(c);
        }
      }
      stateInTagName(c) {
        if (isEndOfTagSection(c)) {
          this.handleTagName(c);
        }
      }
      stateInSFCRootTagName(c) {
        if (isEndOfTagSection(c)) {
          const tag = this.buffer.slice(this.sectionStart, this.index);
          if (tag !== "template") {
            this.enterRCDATA(toCharCodes(`</` + tag), 0);
          }
          this.handleTagName(c);
        }
      }
      handleTagName(c) {
        this.cbs.onopentagname(this.sectionStart, this.index);
        this.sectionStart = -1;
        this.state = 11;
        this.stateBeforeAttrName(c);
      }
      stateBeforeClosingTagName(c) {
        if (isWhitespace(c)) ;
        else if (c === 62) {
          if (true) {
            this.cbs.onerr(14, this.index);
          }
          this.state = 1;
          this.sectionStart = this.index + 1;
        } else {
          this.state = isTagStartChar(c) ? 9 : 27;
          this.sectionStart = this.index;
        }
      }
      stateInClosingTagName(c) {
        if (c === 62 || isWhitespace(c)) {
          this.cbs.onclosetag(this.sectionStart, this.index);
          this.sectionStart = -1;
          this.state = 10;
          this.stateAfterClosingTagName(c);
        }
      }
      stateAfterClosingTagName(c) {
        if (c === 62) {
          this.state = 1;
          this.sectionStart = this.index + 1;
        }
      }
      stateBeforeAttrName(c) {
        if (c === 62) {
          this.cbs.onopentagend(this.index);
          if (this.inRCDATA) {
            this.state = 32;
          } else {
            this.state = 1;
          }
          this.sectionStart = this.index + 1;
        } else if (c === 47) {
          this.state = 7;
          if (this.peek() !== 62) {
            this.cbs.onerr(22, this.index);
          }
        } else if (c === 60 && this.peek() === 47) {
          this.cbs.onopentagend(this.index);
          this.state = 5;
          this.sectionStart = this.index;
        } else if (!isWhitespace(c)) {
          if (c === 61) {
            this.cbs.onerr(
              19,
              this.index
            );
          }
          this.handleAttrStart(c);
        }
      }
      handleAttrStart(c) {
        if (c === 118 && this.peek() === 45) {
          this.state = 13;
          this.sectionStart = this.index;
        } else if (c === 46 || c === 58 || c === 64 || c === 35) {
          this.cbs.ondirname(this.index, this.index + 1);
          this.state = 14;
          this.sectionStart = this.index + 1;
        } else {
          this.state = 12;
          this.sectionStart = this.index;
        }
      }
      stateInSelfClosingTag(c) {
        if (c === 62) {
          this.cbs.onselfclosingtag(this.index);
          this.state = 1;
          this.sectionStart = this.index + 1;
          this.inRCDATA = false;
        } else if (!isWhitespace(c)) {
          this.state = 11;
          this.stateBeforeAttrName(c);
        }
      }
      stateInAttrName(c) {
        if (c === 61 || isEndOfTagSection(c)) {
          this.cbs.onattribname(this.sectionStart, this.index);
          this.handleAttrNameEnd(c);
        } else if (c === 34 || c === 39 || c === 60) {
          this.cbs.onerr(
            17,
            this.index
          );
        }
      }
      stateInDirName(c) {
        if (c === 61 || isEndOfTagSection(c)) {
          this.cbs.ondirname(this.sectionStart, this.index);
          this.handleAttrNameEnd(c);
        } else if (c === 58) {
          this.cbs.ondirname(this.sectionStart, this.index);
          this.state = 14;
          this.sectionStart = this.index + 1;
        } else if (c === 46) {
          this.cbs.ondirname(this.sectionStart, this.index);
          this.state = 16;
          this.sectionStart = this.index + 1;
        }
      }
      stateInDirArg(c) {
        if (c === 61 || isEndOfTagSection(c)) {
          this.cbs.ondirarg(this.sectionStart, this.index);
          this.handleAttrNameEnd(c);
        } else if (c === 91) {
          this.state = 15;
        } else if (c === 46) {
          this.cbs.ondirarg(this.sectionStart, this.index);
          this.state = 16;
          this.sectionStart = this.index + 1;
        }
      }
      stateInDynamicDirArg(c) {
        if (c === 93) {
          this.state = 14;
        } else if (c === 61 || isEndOfTagSection(c)) {
          this.cbs.ondirarg(this.sectionStart, this.index + 1);
          this.handleAttrNameEnd(c);
          if (true) {
            this.cbs.onerr(
              27,
              this.index
            );
          }
        }
      }
      stateInDirModifier(c) {
        if (c === 61 || isEndOfTagSection(c)) {
          this.cbs.ondirmodifier(this.sectionStart, this.index);
          this.handleAttrNameEnd(c);
        } else if (c === 46) {
          this.cbs.ondirmodifier(this.sectionStart, this.index);
          this.sectionStart = this.index + 1;
        }
      }
      handleAttrNameEnd(c) {
        this.sectionStart = this.index;
        this.state = 17;
        this.cbs.onattribnameend(this.index);
        this.stateAfterAttrName(c);
      }
      stateAfterAttrName(c) {
        if (c === 61) {
          this.state = 18;
        } else if (c === 47 || c === 62) {
          this.cbs.onattribend(0, this.sectionStart);
          this.sectionStart = -1;
          this.state = 11;
          this.stateBeforeAttrName(c);
        } else if (!isWhitespace(c)) {
          this.cbs.onattribend(0, this.sectionStart);
          this.handleAttrStart(c);
        }
      }
      stateBeforeAttrValue(c) {
        if (c === 34) {
          this.state = 19;
          this.sectionStart = this.index + 1;
        } else if (c === 39) {
          this.state = 20;
          this.sectionStart = this.index + 1;
        } else if (!isWhitespace(c)) {
          this.sectionStart = this.index;
          this.state = 21;
          this.stateInAttrValueNoQuotes(c);
        }
      }
      handleInAttrValue(c, quote) {
        if (c === quote || this.fastForwardTo(quote)) {
          this.cbs.onattribdata(this.sectionStart, this.index);
          this.sectionStart = -1;
          this.cbs.onattribend(
            quote === 34 ? 3 : 2,
            this.index + 1
          );
          this.state = 11;
        }
      }
      stateInAttrValueDoubleQuotes(c) {
        this.handleInAttrValue(c, 34);
      }
      stateInAttrValueSingleQuotes(c) {
        this.handleInAttrValue(c, 39);
      }
      stateInAttrValueNoQuotes(c) {
        if (isWhitespace(c) || c === 62) {
          this.cbs.onattribdata(this.sectionStart, this.index);
          this.sectionStart = -1;
          this.cbs.onattribend(1, this.index);
          this.state = 11;
          this.stateBeforeAttrName(c);
        } else if (c === 34 || c === 39 || c === 60 || c === 61 || c === 96) {
          this.cbs.onerr(
            18,
            this.index
          );
        } else ;
      }
      stateBeforeDeclaration(c) {
        if (c === 91) {
          this.state = 26;
          this.sequenceIndex = 0;
        } else {
          this.state = c === 45 ? 25 : 23;
        }
      }
      stateInDeclaration(c) {
        if (c === 62 || this.fastForwardTo(62)) {
          this.state = 1;
          this.sectionStart = this.index + 1;
        }
      }
      stateInProcessingInstruction(c) {
        if (c === 62 || this.fastForwardTo(62)) {
          this.cbs.onprocessinginstruction(this.sectionStart, this.index);
          this.state = 1;
          this.sectionStart = this.index + 1;
        }
      }
      stateBeforeComment(c) {
        if (c === 45) {
          this.state = 28;
          this.currentSequence = Sequences.CommentEnd;
          this.sequenceIndex = 2;
          this.sectionStart = this.index + 1;
        } else {
          this.state = 23;
        }
      }
      stateInSpecialComment(c) {
        if (c === 62 || this.fastForwardTo(62)) {
          this.cbs.oncomment(this.sectionStart, this.index);
          this.state = 1;
          this.sectionStart = this.index + 1;
        }
      }
      stateBeforeSpecialS(c) {
        if (c === Sequences.ScriptEnd[3]) {
          this.startSpecial(Sequences.ScriptEnd, 4);
        } else if (c === Sequences.StyleEnd[3]) {
          this.startSpecial(Sequences.StyleEnd, 4);
        } else {
          this.state = 6;
          this.stateInTagName(c);
        }
      }
      stateBeforeSpecialT(c) {
        if (c === Sequences.TitleEnd[3]) {
          this.startSpecial(Sequences.TitleEnd, 4);
        } else if (c === Sequences.TextareaEnd[3]) {
          this.startSpecial(Sequences.TextareaEnd, 4);
        } else {
          this.state = 6;
          this.stateInTagName(c);
        }
      }
      startEntity() {
      }
      stateInEntity() {
      }
      /**
       * Iterates through the buffer, calling the function corresponding to the current state.
       *
       * States that are more likely to be hit are higher up, as a performance improvement.
       */
      parse(input) {
        this.buffer = input;
        while (this.index < this.buffer.length) {
          const c = this.buffer.charCodeAt(this.index);
          if (c === 10) {
            this.newlines.push(this.index);
          }
          switch (this.state) {
            case 1: {
              this.stateText(c);
              break;
            }
            case 2: {
              this.stateInterpolationOpen(c);
              break;
            }
            case 3: {
              this.stateInterpolation(c);
              break;
            }
            case 4: {
              this.stateInterpolationClose(c);
              break;
            }
            case 31: {
              this.stateSpecialStartSequence(c);
              break;
            }
            case 32: {
              this.stateInRCDATA(c);
              break;
            }
            case 26: {
              this.stateCDATASequence(c);
              break;
            }
            case 19: {
              this.stateInAttrValueDoubleQuotes(c);
              break;
            }
            case 12: {
              this.stateInAttrName(c);
              break;
            }
            case 13: {
              this.stateInDirName(c);
              break;
            }
            case 14: {
              this.stateInDirArg(c);
              break;
            }
            case 15: {
              this.stateInDynamicDirArg(c);
              break;
            }
            case 16: {
              this.stateInDirModifier(c);
              break;
            }
            case 28: {
              this.stateInCommentLike(c);
              break;
            }
            case 27: {
              this.stateInSpecialComment(c);
              break;
            }
            case 11: {
              this.stateBeforeAttrName(c);
              break;
            }
            case 6: {
              this.stateInTagName(c);
              break;
            }
            case 34: {
              this.stateInSFCRootTagName(c);
              break;
            }
            case 9: {
              this.stateInClosingTagName(c);
              break;
            }
            case 5: {
              this.stateBeforeTagName(c);
              break;
            }
            case 17: {
              this.stateAfterAttrName(c);
              break;
            }
            case 20: {
              this.stateInAttrValueSingleQuotes(c);
              break;
            }
            case 18: {
              this.stateBeforeAttrValue(c);
              break;
            }
            case 8: {
              this.stateBeforeClosingTagName(c);
              break;
            }
            case 10: {
              this.stateAfterClosingTagName(c);
              break;
            }
            case 29: {
              this.stateBeforeSpecialS(c);
              break;
            }
            case 30: {
              this.stateBeforeSpecialT(c);
              break;
            }
            case 21: {
              this.stateInAttrValueNoQuotes(c);
              break;
            }
            case 7: {
              this.stateInSelfClosingTag(c);
              break;
            }
            case 23: {
              this.stateInDeclaration(c);
              break;
            }
            case 22: {
              this.stateBeforeDeclaration(c);
              break;
            }
            case 25: {
              this.stateBeforeComment(c);
              break;
            }
            case 24: {
              this.stateInProcessingInstruction(c);
              break;
            }
            case 33: {
              this.stateInEntity();
              break;
            }
          }
          this.index++;
        }
        this.cleanup();
        this.finish();
      }
      /**
       * Remove data that has already been consumed from the buffer.
       */
      cleanup() {
        if (this.sectionStart !== this.index) {
          if (this.state === 1 || this.state === 32 && this.sequenceIndex === 0) {
            this.cbs.ontext(this.sectionStart, this.index);
            this.sectionStart = this.index;
          } else if (this.state === 19 || this.state === 20 || this.state === 21) {
            this.cbs.onattribdata(this.sectionStart, this.index);
            this.sectionStart = this.index;
          }
        }
      }
      finish() {
        this.handleTrailingData();
        this.cbs.onend();
      }
      /** Handle any trailing data. */
      handleTrailingData() {
        const endIndex = this.buffer.length;
        if (this.sectionStart >= endIndex) {
          return;
        }
        if (this.state === 28) {
          if (this.currentSequence === Sequences.CdataEnd) {
            this.cbs.oncdata(this.sectionStart, endIndex);
          } else {
            this.cbs.oncomment(this.sectionStart, endIndex);
          }
        } else if (this.state === 6 || this.state === 11 || this.state === 18 || this.state === 17 || this.state === 12 || this.state === 13 || this.state === 14 || this.state === 15 || this.state === 16 || this.state === 20 || this.state === 19 || this.state === 21 || this.state === 9) ;
        else {
          this.cbs.ontext(this.sectionStart, endIndex);
        }
      }
      emitCodePoint(cp, consumed) {
      }
    };
    CompilerDeprecationTypes = {
      "COMPILER_IS_ON_ELEMENT": "COMPILER_IS_ON_ELEMENT",
      "COMPILER_V_BIND_SYNC": "COMPILER_V_BIND_SYNC",
      "COMPILER_V_BIND_OBJECT_ORDER": "COMPILER_V_BIND_OBJECT_ORDER",
      "COMPILER_V_ON_NATIVE": "COMPILER_V_ON_NATIVE",
      "COMPILER_V_IF_V_FOR_PRECEDENCE": "COMPILER_V_IF_V_FOR_PRECEDENCE",
      "COMPILER_NATIVE_TEMPLATE": "COMPILER_NATIVE_TEMPLATE",
      "COMPILER_INLINE_TEMPLATE": "COMPILER_INLINE_TEMPLATE",
      "COMPILER_FILTERS": "COMPILER_FILTERS"
    };
    deprecationData = {
      ["COMPILER_IS_ON_ELEMENT"]: {
        message: `Platform-native elements with "is" prop will no longer be treated as components in Vue 3 unless the "is" value is explicitly prefixed with "vue:".`,
        link: `https://v3-migration.vuejs.org/breaking-changes/custom-elements-interop.html`
      },
      ["COMPILER_V_BIND_SYNC"]: {
        message: (key) => `.sync modifier for v-bind has been removed. Use v-model with argument instead. \`v-bind:${key}.sync\` should be changed to \`v-model:${key}\`.`,
        link: `https://v3-migration.vuejs.org/breaking-changes/v-model.html`
      },
      ["COMPILER_V_BIND_OBJECT_ORDER"]: {
        message: `v-bind="obj" usage is now order sensitive and behaves like JavaScript object spread: it will now overwrite an existing non-mergeable attribute that appears before v-bind in the case of conflict. To retain 2.x behavior, move v-bind to make it the first attribute. You can also suppress this warning if the usage is intended.`,
        link: `https://v3-migration.vuejs.org/breaking-changes/v-bind.html`
      },
      ["COMPILER_V_ON_NATIVE"]: {
        message: `.native modifier for v-on has been removed as is no longer necessary.`,
        link: `https://v3-migration.vuejs.org/breaking-changes/v-on-native-modifier-removed.html`
      },
      ["COMPILER_V_IF_V_FOR_PRECEDENCE"]: {
        message: `v-if / v-for precedence when used on the same element has changed in Vue 3: v-if now takes higher precedence and will no longer have access to v-for scope variables. It is best to avoid the ambiguity with <template> tags or use a computed property that filters v-for data source.`,
        link: `https://v3-migration.vuejs.org/breaking-changes/v-if-v-for.html`
      },
      ["COMPILER_NATIVE_TEMPLATE"]: {
        message: `<template> with no special directives will render as a native template element instead of its inner content in Vue 3.`
      },
      ["COMPILER_INLINE_TEMPLATE"]: {
        message: `"inline-template" has been removed in Vue 3.`,
        link: `https://v3-migration.vuejs.org/breaking-changes/inline-template-attribute.html`
      },
      ["COMPILER_FILTERS"]: {
        message: `filters have been removed in Vue 3. The "|" symbol will be treated as native JavaScript bitwise OR operator. Use method calls or computed properties instead.`,
        link: `https://v3-migration.vuejs.org/breaking-changes/filters.html`
      }
    };
    ErrorCodes = {
      "ABRUPT_CLOSING_OF_EMPTY_COMMENT": 0,
      "0": "ABRUPT_CLOSING_OF_EMPTY_COMMENT",
      "CDATA_IN_HTML_CONTENT": 1,
      "1": "CDATA_IN_HTML_CONTENT",
      "DUPLICATE_ATTRIBUTE": 2,
      "2": "DUPLICATE_ATTRIBUTE",
      "END_TAG_WITH_ATTRIBUTES": 3,
      "3": "END_TAG_WITH_ATTRIBUTES",
      "END_TAG_WITH_TRAILING_SOLIDUS": 4,
      "4": "END_TAG_WITH_TRAILING_SOLIDUS",
      "EOF_BEFORE_TAG_NAME": 5,
      "5": "EOF_BEFORE_TAG_NAME",
      "EOF_IN_CDATA": 6,
      "6": "EOF_IN_CDATA",
      "EOF_IN_COMMENT": 7,
      "7": "EOF_IN_COMMENT",
      "EOF_IN_SCRIPT_HTML_COMMENT_LIKE_TEXT": 8,
      "8": "EOF_IN_SCRIPT_HTML_COMMENT_LIKE_TEXT",
      "EOF_IN_TAG": 9,
      "9": "EOF_IN_TAG",
      "INCORRECTLY_CLOSED_COMMENT": 10,
      "10": "INCORRECTLY_CLOSED_COMMENT",
      "INCORRECTLY_OPENED_COMMENT": 11,
      "11": "INCORRECTLY_OPENED_COMMENT",
      "INVALID_FIRST_CHARACTER_OF_TAG_NAME": 12,
      "12": "INVALID_FIRST_CHARACTER_OF_TAG_NAME",
      "MISSING_ATTRIBUTE_VALUE": 13,
      "13": "MISSING_ATTRIBUTE_VALUE",
      "MISSING_END_TAG_NAME": 14,
      "14": "MISSING_END_TAG_NAME",
      "MISSING_WHITESPACE_BETWEEN_ATTRIBUTES": 15,
      "15": "MISSING_WHITESPACE_BETWEEN_ATTRIBUTES",
      "NESTED_COMMENT": 16,
      "16": "NESTED_COMMENT",
      "UNEXPECTED_CHARACTER_IN_ATTRIBUTE_NAME": 17,
      "17": "UNEXPECTED_CHARACTER_IN_ATTRIBUTE_NAME",
      "UNEXPECTED_CHARACTER_IN_UNQUOTED_ATTRIBUTE_VALUE": 18,
      "18": "UNEXPECTED_CHARACTER_IN_UNQUOTED_ATTRIBUTE_VALUE",
      "UNEXPECTED_EQUALS_SIGN_BEFORE_ATTRIBUTE_NAME": 19,
      "19": "UNEXPECTED_EQUALS_SIGN_BEFORE_ATTRIBUTE_NAME",
      "UNEXPECTED_NULL_CHARACTER": 20,
      "20": "UNEXPECTED_NULL_CHARACTER",
      "UNEXPECTED_QUESTION_MARK_INSTEAD_OF_TAG_NAME": 21,
      "21": "UNEXPECTED_QUESTION_MARK_INSTEAD_OF_TAG_NAME",
      "UNEXPECTED_SOLIDUS_IN_TAG": 22,
      "22": "UNEXPECTED_SOLIDUS_IN_TAG",
      "X_INVALID_END_TAG": 23,
      "23": "X_INVALID_END_TAG",
      "X_MISSING_END_TAG": 24,
      "24": "X_MISSING_END_TAG",
      "X_MISSING_INTERPOLATION_END": 25,
      "25": "X_MISSING_INTERPOLATION_END",
      "X_MISSING_DIRECTIVE_NAME": 26,
      "26": "X_MISSING_DIRECTIVE_NAME",
      "X_MISSING_DYNAMIC_DIRECTIVE_ARGUMENT_END": 27,
      "27": "X_MISSING_DYNAMIC_DIRECTIVE_ARGUMENT_END",
      "X_V_IF_NO_EXPRESSION": 28,
      "28": "X_V_IF_NO_EXPRESSION",
      "X_V_IF_SAME_KEY": 29,
      "29": "X_V_IF_SAME_KEY",
      "X_V_ELSE_NO_ADJACENT_IF": 30,
      "30": "X_V_ELSE_NO_ADJACENT_IF",
      "X_V_FOR_NO_EXPRESSION": 31,
      "31": "X_V_FOR_NO_EXPRESSION",
      "X_V_FOR_MALFORMED_EXPRESSION": 32,
      "32": "X_V_FOR_MALFORMED_EXPRESSION",
      "X_V_FOR_TEMPLATE_KEY_PLACEMENT": 33,
      "33": "X_V_FOR_TEMPLATE_KEY_PLACEMENT",
      "X_V_BIND_NO_EXPRESSION": 34,
      "34": "X_V_BIND_NO_EXPRESSION",
      "X_V_ON_NO_EXPRESSION": 35,
      "35": "X_V_ON_NO_EXPRESSION",
      "X_V_SLOT_UNEXPECTED_DIRECTIVE_ON_SLOT_OUTLET": 36,
      "36": "X_V_SLOT_UNEXPECTED_DIRECTIVE_ON_SLOT_OUTLET",
      "X_V_SLOT_MIXED_SLOT_USAGE": 37,
      "37": "X_V_SLOT_MIXED_SLOT_USAGE",
      "X_V_SLOT_DUPLICATE_SLOT_NAMES": 38,
      "38": "X_V_SLOT_DUPLICATE_SLOT_NAMES",
      "X_V_SLOT_EXTRANEOUS_DEFAULT_SLOT_CHILDREN": 39,
      "39": "X_V_SLOT_EXTRANEOUS_DEFAULT_SLOT_CHILDREN",
      "X_V_SLOT_MISPLACED": 40,
      "40": "X_V_SLOT_MISPLACED",
      "X_V_MODEL_NO_EXPRESSION": 41,
      "41": "X_V_MODEL_NO_EXPRESSION",
      "X_V_MODEL_MALFORMED_EXPRESSION": 42,
      "42": "X_V_MODEL_MALFORMED_EXPRESSION",
      "X_V_MODEL_ON_SCOPE_VARIABLE": 43,
      "43": "X_V_MODEL_ON_SCOPE_VARIABLE",
      "X_V_MODEL_ON_PROPS": 44,
      "44": "X_V_MODEL_ON_PROPS",
      "X_INVALID_EXPRESSION": 45,
      "45": "X_INVALID_EXPRESSION",
      "X_KEEP_ALIVE_INVALID_CHILDREN": 46,
      "46": "X_KEEP_ALIVE_INVALID_CHILDREN",
      "X_PREFIX_ID_NOT_SUPPORTED": 47,
      "47": "X_PREFIX_ID_NOT_SUPPORTED",
      "X_MODULE_MODE_NOT_SUPPORTED": 48,
      "48": "X_MODULE_MODE_NOT_SUPPORTED",
      "X_CACHE_HANDLER_NOT_SUPPORTED": 49,
      "49": "X_CACHE_HANDLER_NOT_SUPPORTED",
      "X_SCOPE_ID_NOT_SUPPORTED": 50,
      "50": "X_SCOPE_ID_NOT_SUPPORTED",
      "X_VNODE_HOOKS": 51,
      "51": "X_VNODE_HOOKS",
      "X_V_BIND_INVALID_SAME_NAME_ARGUMENT": 52,
      "52": "X_V_BIND_INVALID_SAME_NAME_ARGUMENT",
      "__EXTEND_POINT__": 53,
      "53": "__EXTEND_POINT__"
    };
    errorMessages = {
      // parse errors
      [0]: "Illegal comment.",
      [1]: "CDATA section is allowed only in XML context.",
      [2]: "Duplicate attribute.",
      [3]: "End tag cannot have attributes.",
      [4]: "Illegal '/' in tags.",
      [5]: "Unexpected EOF in tag.",
      [6]: "Unexpected EOF in CDATA section.",
      [7]: "Unexpected EOF in comment.",
      [8]: "Unexpected EOF in script.",
      [9]: "Unexpected EOF in tag.",
      [10]: "Incorrectly closed comment.",
      [11]: "Incorrectly opened comment.",
      [12]: "Illegal tag name. Use '&lt;' to print '<'.",
      [13]: "Attribute value was expected.",
      [14]: "End tag name was expected.",
      [15]: "Whitespace was expected.",
      [16]: "Unexpected '<!--' in comment.",
      [17]: `Attribute name cannot contain U+0022 ("), U+0027 ('), and U+003C (<).`,
      [18]: "Unquoted attribute value cannot contain U+0022 (\"), U+0027 ('), U+003C (<), U+003D (=), and U+0060 (`).",
      [19]: "Attribute name cannot start with '='.",
      [21]: "'<?' is allowed only in XML context.",
      [20]: `Unexpected null character.`,
      [22]: "Illegal '/' in tags.",
      // Vue-specific parse errors
      [23]: "Invalid end tag.",
      [24]: "Element is missing end tag.",
      [25]: "Interpolation end sign was not found.",
      [27]: "End bracket for dynamic directive argument was not found. Note that dynamic directive argument cannot contain spaces.",
      [26]: "Legal directive name was expected.",
      // transform errors
      [28]: `v-if/v-else-if is missing expression.`,
      [29]: `v-if/else branches must use unique keys.`,
      [30]: `v-else/v-else-if has no adjacent v-if or v-else-if.`,
      [31]: `v-for is missing expression.`,
      [32]: `v-for has invalid expression.`,
      [33]: `<template v-for> key should be placed on the <template> tag.`,
      [34]: `v-bind is missing expression.`,
      [52]: `v-bind with same-name shorthand only allows static argument.`,
      [35]: `v-on is missing expression.`,
      [36]: `Unexpected custom directive on <slot> outlet.`,
      [37]: `Mixed v-slot usage on both the component and nested <template>. When there are multiple named slots, all slots should use <template> syntax to avoid scope ambiguity.`,
      [38]: `Duplicate slot names found. `,
      [39]: `Extraneous children found when component already has explicitly named default slot. These children will be ignored.`,
      [40]: `v-slot can only be used on components or <template> tags.`,
      [41]: `v-model is missing expression.`,
      [42]: `v-model value must be a valid JavaScript member expression.`,
      [43]: `v-model cannot be used on v-for or v-slot scope variables because they are not writable.`,
      [44]: `v-model cannot be used on a prop, because local prop bindings are not writable.
Use a v-bind binding combined with a v-on listener that emits update:x event instead.`,
      [45]: `Error parsing JavaScript expression: `,
      [46]: `<KeepAlive> expects exactly one child component.`,
      [51]: `@vnode-* hooks in templates are no longer supported. Use the vue: prefix instead. For example, @vnode-mounted should be changed to @vue:mounted. @vnode-* hooks support has been removed in 3.4.`,
      // generic errors
      [47]: `"prefixIdentifiers" option is not supported in this build of compiler.`,
      [48]: `ES module mode is not supported in this build of compiler.`,
      [49]: `"cacheHandlers" option is only supported when the "prefixIdentifiers" option is enabled.`,
      [50]: `"scopeId" option is only supported in module mode.`,
      // just to fulfill types
      [53]: ``
    };
    isFunctionType = (node) => {
      return /Function(?:Expression|Declaration)$|Method$/.test(node.type);
    };
    isStaticProperty = (node) => node && (node.type === "ObjectProperty" || node.type === "ObjectMethod") && !node.computed;
    isStaticPropertyKey = (node, parent) => isStaticProperty(parent) && parent.key === node;
    TS_NODE_TYPES = [
      "TSAsExpression",
      // foo as number
      "TSTypeAssertion",
      // (<number>foo)
      "TSNonNullExpression",
      // foo!
      "TSInstantiationExpression",
      // foo<string>
      "TSSatisfiesExpression"
      // foo satisfies T
    ];
    isStaticExp = (p) => p.type === 4 && p.isStatic;
    nonIdentifierRE = /^\d|[^\$\w\xA0-\uFFFF]/;
    isSimpleIdentifier = (name) => !nonIdentifierRE.test(name);
    validFirstIdentCharRE = /[A-Za-z_$\xA0-\uFFFF]/;
    validIdentCharRE = /[\.\?\w$\xA0-\uFFFF]/;
    whitespaceRE = /\s+[.[]\s*|\s*[.[]\s+/g;
    getExpSource = (exp) => exp.type === 4 ? exp.content : exp.loc.source;
    isMemberExpressionBrowser = (exp) => {
      const path = getExpSource(exp).trim().replace(whitespaceRE, (s) => s.trim());
      let state = 0;
      let stateStack = [];
      let currentOpenBracketCount = 0;
      let currentOpenParensCount = 0;
      let currentStringType = null;
      for (let i = 0; i < path.length; i++) {
        const char = path.charAt(i);
        switch (state) {
          case 0:
            if (char === "[") {
              stateStack.push(state);
              state = 1;
              currentOpenBracketCount++;
            } else if (char === "(") {
              stateStack.push(state);
              state = 2;
              currentOpenParensCount++;
            } else if (!(i === 0 ? validFirstIdentCharRE : validIdentCharRE).test(char)) {
              return false;
            }
            break;
          case 1:
            if (char === `'` || char === `"` || char === "`") {
              stateStack.push(state);
              state = 3;
              currentStringType = char;
            } else if (char === `[`) {
              currentOpenBracketCount++;
            } else if (char === `]`) {
              if (!--currentOpenBracketCount) {
                state = stateStack.pop();
              }
            }
            break;
          case 2:
            if (char === `'` || char === `"` || char === "`") {
              stateStack.push(state);
              state = 3;
              currentStringType = char;
            } else if (char === `(`) {
              currentOpenParensCount++;
            } else if (char === `)`) {
              if (i === path.length - 1) {
                return false;
              }
              if (!--currentOpenParensCount) {
                state = stateStack.pop();
              }
            }
            break;
          case 3:
            if (char === currentStringType) {
              state = stateStack.pop();
              currentStringType = null;
            }
            break;
        }
      }
      return !currentOpenBracketCount && !currentOpenParensCount;
    };
    isMemberExpressionNode = NOOP;
    isMemberExpression = isMemberExpressionBrowser;
    fnExpRE = /^\s*(async\s*)?(\([^)]*?\)|[\w$_]+)\s*(:[^=]+)?=>|^\s*(async\s+)?function(?:\s+[\w$]+)?\s*\(/;
    isFnExpressionBrowser = (exp) => fnExpRE.test(getExpSource(exp));
    isFnExpressionNode = NOOP;
    isFnExpression = isFnExpressionBrowser;
    propsHelperSet = /* @__PURE__ */ new Set([NORMALIZE_PROPS, GUARD_REACTIVE_PROPS]);
    forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+(\S[\s\S]*)/;
    defaultParserOptions = {
      parseMode: "base",
      ns: 0,
      delimiters: [`{{`, `}}`],
      getNamespace: () => 0,
      isVoidTag: NO,
      isPreTag: NO,
      isIgnoreNewlineTag: NO,
      isCustomElement: NO,
      onError: defaultOnError,
      onWarn: defaultOnWarn,
      comments: true,
      prefixIdentifiers: false
    };
    currentOptions = defaultParserOptions;
    currentRoot = null;
    currentInput = "";
    currentOpenTag = null;
    currentProp = null;
    currentAttrValue = "";
    currentAttrStartIndex = -1;
    currentAttrEndIndex = -1;
    inPre = 0;
    inVPre = false;
    currentVPreBoundary = null;
    stack = [];
    tokenizer = new Tokenizer(stack, {
      onerr: emitError,
      ontext(start, end) {
        onText(getSlice(start, end), start, end);
      },
      ontextentity(char, start, end) {
        onText(char, start, end);
      },
      oninterpolation(start, end) {
        if (inVPre) {
          return onText(getSlice(start, end), start, end);
        }
        let innerStart = start + tokenizer.delimiterOpen.length;
        let innerEnd = end - tokenizer.delimiterClose.length;
        while (isWhitespace(currentInput.charCodeAt(innerStart))) {
          innerStart++;
        }
        while (isWhitespace(currentInput.charCodeAt(innerEnd - 1))) {
          innerEnd--;
        }
        let exp = getSlice(innerStart, innerEnd);
        if (exp.includes("&")) {
          {
            exp = currentOptions.decodeEntities(exp, false);
          }
        }
        addNode({
          type: 5,
          content: createExp(exp, false, getLoc(innerStart, innerEnd)),
          loc: getLoc(start, end)
        });
      },
      onopentagname(start, end) {
        const name = getSlice(start, end);
        currentOpenTag = {
          type: 1,
          tag: name,
          ns: currentOptions.getNamespace(name, stack[0], currentOptions.ns),
          tagType: 0,
          // will be refined on tag close
          props: [],
          children: [],
          loc: getLoc(start - 1, end),
          codegenNode: void 0
        };
      },
      onopentagend(end) {
        endOpenTag(end);
      },
      onclosetag(start, end) {
        const name = getSlice(start, end);
        if (!currentOptions.isVoidTag(name)) {
          let found = false;
          for (let i = 0; i < stack.length; i++) {
            const e = stack[i];
            if (e.tag.toLowerCase() === name.toLowerCase()) {
              found = true;
              if (i > 0) {
                emitError(24, stack[0].loc.start.offset);
              }
              for (let j = 0; j <= i; j++) {
                const el = stack.shift();
                onCloseTag(el, end, j < i);
              }
              break;
            }
          }
          if (!found) {
            emitError(23, backTrack(start, 60));
          }
        }
      },
      onselfclosingtag(end) {
        const name = currentOpenTag.tag;
        currentOpenTag.isSelfClosing = true;
        endOpenTag(end);
        if (stack[0] && stack[0].tag === name) {
          onCloseTag(stack.shift(), end);
        }
      },
      onattribname(start, end) {
        currentProp = {
          type: 6,
          name: getSlice(start, end),
          nameLoc: getLoc(start, end),
          value: void 0,
          loc: getLoc(start)
        };
      },
      ondirname(start, end) {
        const raw = getSlice(start, end);
        const name = raw === "." || raw === ":" ? "bind" : raw === "@" ? "on" : raw === "#" ? "slot" : raw.slice(2);
        if (!inVPre && name === "") {
          emitError(26, start);
        }
        if (inVPre || name === "") {
          currentProp = {
            type: 6,
            name: raw,
            nameLoc: getLoc(start, end),
            value: void 0,
            loc: getLoc(start)
          };
        } else {
          currentProp = {
            type: 7,
            name,
            rawName: raw,
            exp: void 0,
            arg: void 0,
            modifiers: raw === "." ? [createSimpleExpression("prop")] : [],
            loc: getLoc(start)
          };
          if (name === "pre") {
            inVPre = tokenizer.inVPre = true;
            currentVPreBoundary = currentOpenTag;
            const props = currentOpenTag.props;
            for (let i = 0; i < props.length; i++) {
              if (props[i].type === 7) {
                props[i] = dirToAttr(props[i]);
              }
            }
          }
        }
      },
      ondirarg(start, end) {
        if (start === end) return;
        const arg = getSlice(start, end);
        if (inVPre) {
          currentProp.name += arg;
          setLocEnd(currentProp.nameLoc, end);
        } else {
          const isStatic = arg[0] !== `[`;
          currentProp.arg = createExp(
            isStatic ? arg : arg.slice(1, -1),
            isStatic,
            getLoc(start, end),
            isStatic ? 3 : 0
          );
        }
      },
      ondirmodifier(start, end) {
        const mod = getSlice(start, end);
        if (inVPre) {
          currentProp.name += "." + mod;
          setLocEnd(currentProp.nameLoc, end);
        } else if (currentProp.name === "slot") {
          const arg = currentProp.arg;
          if (arg) {
            arg.content += "." + mod;
            setLocEnd(arg.loc, end);
          }
        } else {
          const exp = createSimpleExpression(mod, true, getLoc(start, end));
          currentProp.modifiers.push(exp);
        }
      },
      onattribdata(start, end) {
        currentAttrValue += getSlice(start, end);
        if (currentAttrStartIndex < 0) currentAttrStartIndex = start;
        currentAttrEndIndex = end;
      },
      onattribentity(char, start, end) {
        currentAttrValue += char;
        if (currentAttrStartIndex < 0) currentAttrStartIndex = start;
        currentAttrEndIndex = end;
      },
      onattribnameend(end) {
        const start = currentProp.loc.start.offset;
        const name = getSlice(start, end);
        if (currentProp.type === 7) {
          currentProp.rawName = name;
        }
        if (currentOpenTag.props.some(
          (p) => (p.type === 7 ? p.rawName : p.name) === name
        )) {
          emitError(2, start);
        }
      },
      onattribend(quote, end) {
        if (currentOpenTag && currentProp) {
          setLocEnd(currentProp.loc, end);
          if (quote !== 0) {
            if (currentAttrValue.includes("&")) {
              currentAttrValue = currentOptions.decodeEntities(
                currentAttrValue,
                true
              );
            }
            if (currentProp.type === 6) {
              if (currentProp.name === "class") {
                currentAttrValue = condense(currentAttrValue).trim();
              }
              if (quote === 1 && !currentAttrValue) {
                emitError(13, end);
              }
              currentProp.value = {
                type: 2,
                content: currentAttrValue,
                loc: quote === 1 ? getLoc(currentAttrStartIndex, currentAttrEndIndex) : getLoc(currentAttrStartIndex - 1, currentAttrEndIndex + 1)
              };
              if (tokenizer.inSFCRoot && currentOpenTag.tag === "template" && currentProp.name === "lang" && currentAttrValue && currentAttrValue !== "html") {
                tokenizer.enterRCDATA(toCharCodes(`</template`), 0);
              }
            } else {
              let expParseMode = 0;
              currentProp.exp = createExp(
                currentAttrValue,
                false,
                getLoc(currentAttrStartIndex, currentAttrEndIndex),
                0,
                expParseMode
              );
              if (currentProp.name === "for") {
                currentProp.forParseResult = parseForExpression(currentProp.exp);
              }
              let syncIndex = -1;
              if (currentProp.name === "bind" && (syncIndex = currentProp.modifiers.findIndex(
                (mod) => mod.content === "sync"
              )) > -1 && checkCompatEnabled(
                "COMPILER_V_BIND_SYNC",
                currentOptions,
                currentProp.loc,
                currentProp.arg.loc.source
              )) {
                currentProp.name = "model";
                currentProp.modifiers.splice(syncIndex, 1);
              }
            }
          }
          if (currentProp.type !== 7 || currentProp.name !== "pre") {
            currentOpenTag.props.push(currentProp);
          }
        }
        currentAttrValue = "";
        currentAttrStartIndex = currentAttrEndIndex = -1;
      },
      oncomment(start, end) {
        if (currentOptions.comments) {
          addNode({
            type: 3,
            content: getSlice(start, end),
            loc: getLoc(start - 4, end + 3)
          });
        }
      },
      onend() {
        const end = currentInput.length;
        if (tokenizer.state !== 1) {
          switch (tokenizer.state) {
            case 5:
            case 8:
              emitError(5, end);
              break;
            case 3:
            case 4:
              emitError(
                25,
                tokenizer.sectionStart
              );
              break;
            case 28:
              if (tokenizer.currentSequence === Sequences.CdataEnd) {
                emitError(6, end);
              } else {
                emitError(7, end);
              }
              break;
            case 6:
            case 7:
            case 9:
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
            case 17:
            case 18:
            case 19:
            case 20:
            case 21:
              emitError(9, end);
              break;
          }
        }
        for (let index = 0; index < stack.length; index++) {
          onCloseTag(stack[index], end - 1);
          emitError(24, stack[index].loc.start.offset);
        }
      },
      oncdata(start, end) {
        if (stack[0].ns !== 0) {
          onText(getSlice(start, end), start, end);
        } else {
          emitError(1, start - 9);
        }
      },
      onprocessinginstruction(start) {
        if ((stack[0] ? stack[0].ns : currentOptions.ns) === 0) {
          emitError(
            21,
            start - 1
          );
        }
      }
    });
    forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
    stripParensRE = /^\(|\)$/g;
    specialTemplateDir = /* @__PURE__ */ new Set(["if", "else", "else-if", "for", "slot"]);
    windowsNewlineRE = /\r\n/g;
    allowHoistedHelperSet = /* @__PURE__ */ new Set([
      NORMALIZE_CLASS,
      NORMALIZE_STYLE,
      NORMALIZE_PROPS,
      GUARD_REACTIVE_PROPS
    ]);
    PURE_ANNOTATION = `/*@__PURE__*/`;
    aliasHelper = (s) => `${helperNameMap[s]}: _${helperNameMap[s]}`;
    prohibitedKeywordRE = new RegExp(
      "\\b" + "arguments,await,break,case,catch,class,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,let,new,return,super,switch,throw,try,var,void,while,with,yield".split(",").join("\\b|\\b") + "\\b"
    );
    stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;
    transformExpression = (node, context) => {
      if (node.type === 5) {
        node.content = processExpression(
          node.content,
          context
        );
      } else if (node.type === 1) {
        const memo = findDir(node, "memo");
        for (let i = 0; i < node.props.length; i++) {
          const dir = node.props[i];
          if (dir.type === 7 && dir.name !== "for") {
            const exp = dir.exp;
            const arg = dir.arg;
            if (exp && exp.type === 4 && !(dir.name === "on" && arg) && // key has been processed in transformFor(vMemo + vFor)
            !(memo && arg && arg.type === 4 && arg.content === "key")) {
              dir.exp = processExpression(
                exp,
                context,
                // slot args must be processed as function params
                dir.name === "slot"
              );
            }
            if (arg && arg.type === 4 && !arg.isStatic) {
              dir.arg = processExpression(arg, context);
            }
          }
        }
      }
    };
    transformIf = createStructuralDirectiveTransform(
      /^(if|else|else-if)$/,
      (node, dir, context) => {
        return processIf(node, dir, context, (ifNode, branch, isRoot) => {
          const siblings = context.parent.children;
          let i = siblings.indexOf(ifNode);
          let key = 0;
          while (i-- >= 0) {
            const sibling = siblings[i];
            if (sibling && sibling.type === 9) {
              key += sibling.branches.length;
            }
          }
          return () => {
            if (isRoot) {
              ifNode.codegenNode = createCodegenNodeForBranch(
                branch,
                key,
                context
              );
            } else {
              const parentCondition = getParentCondition(ifNode.codegenNode);
              parentCondition.alternate = createCodegenNodeForBranch(
                branch,
                key + ifNode.branches.length - 1,
                context
              );
            }
          };
        });
      }
    );
    transformBind = (dir, _node, context) => {
      const { modifiers, loc } = dir;
      const arg = dir.arg;
      let { exp } = dir;
      if (exp && exp.type === 4 && !exp.content.trim()) {
        {
          exp = void 0;
        }
      }
      if (!exp) {
        if (arg.type !== 4 || !arg.isStatic) {
          context.onError(
            createCompilerError(
              52,
              arg.loc
            )
          );
          return {
            props: [
              createObjectProperty(arg, createSimpleExpression("", true, loc))
            ]
          };
        }
        transformBindShorthand(dir);
        exp = dir.exp;
      }
      if (arg.type !== 4) {
        arg.children.unshift(`(`);
        arg.children.push(`) || ""`);
      } else if (!arg.isStatic) {
        arg.content = `${arg.content} || ""`;
      }
      if (modifiers.some((mod) => mod.content === "camel")) {
        if (arg.type === 4) {
          if (arg.isStatic) {
            arg.content = camelize(arg.content);
          } else {
            arg.content = `${context.helperString(CAMELIZE)}(${arg.content})`;
          }
        } else {
          arg.children.unshift(`${context.helperString(CAMELIZE)}(`);
          arg.children.push(`)`);
        }
      }
      if (!context.inSSR) {
        if (modifiers.some((mod) => mod.content === "prop")) {
          injectPrefix(arg, ".");
        }
        if (modifiers.some((mod) => mod.content === "attr")) {
          injectPrefix(arg, "^");
        }
      }
      return {
        props: [createObjectProperty(arg, exp)]
      };
    };
    transformBindShorthand = (dir, context) => {
      const arg = dir.arg;
      const propName = camelize(arg.content);
      dir.exp = createSimpleExpression(propName, false, arg.loc);
    };
    injectPrefix = (arg, prefix) => {
      if (arg.type === 4) {
        if (arg.isStatic) {
          arg.content = prefix + arg.content;
        } else {
          arg.content = `\`${prefix}\${${arg.content}}\``;
        }
      } else {
        arg.children.unshift(`'${prefix}' + (`);
        arg.children.push(`)`);
      }
    };
    transformFor = createStructuralDirectiveTransform(
      "for",
      (node, dir, context) => {
        const { helper, removeHelper } = context;
        return processFor(node, dir, context, (forNode) => {
          const renderExp = createCallExpression(helper(RENDER_LIST), [
            forNode.source
          ]);
          const isTemplate = isTemplateNode(node);
          const memo = findDir(node, "memo");
          const keyProp = findProp(node, `key`, false, true);
          const isDirKey = keyProp && keyProp.type === 7;
          if (isDirKey && !keyProp.exp) {
            transformBindShorthand(keyProp);
          }
          let keyExp = keyProp && (keyProp.type === 6 ? keyProp.value ? createSimpleExpression(keyProp.value.content, true) : void 0 : keyProp.exp);
          const keyProperty = keyProp && keyExp ? createObjectProperty(`key`, keyExp) : null;
          const isStableFragment = forNode.source.type === 4 && forNode.source.constType > 0;
          const fragmentFlag = isStableFragment ? 64 : keyProp ? 128 : 256;
          forNode.codegenNode = createVNodeCall(
            context,
            helper(FRAGMENT),
            void 0,
            renderExp,
            fragmentFlag,
            void 0,
            void 0,
            true,
            !isStableFragment,
            false,
            node.loc
          );
          return () => {
            let childBlock;
            const { children } = forNode;
            if (isTemplate) {
              node.children.some((c) => {
                if (c.type === 1) {
                  const key = findProp(c, "key");
                  if (key) {
                    context.onError(
                      createCompilerError(
                        33,
                        key.loc
                      )
                    );
                    return true;
                  }
                }
              });
            }
            const needFragmentWrapper = children.length !== 1 || children[0].type !== 1;
            const slotOutlet = isSlotOutlet(node) ? node : isTemplate && node.children.length === 1 && isSlotOutlet(node.children[0]) ? node.children[0] : null;
            if (slotOutlet) {
              childBlock = slotOutlet.codegenNode;
              if (isTemplate && keyProperty) {
                injectProp(childBlock, keyProperty, context);
              }
            } else if (needFragmentWrapper) {
              childBlock = createVNodeCall(
                context,
                helper(FRAGMENT),
                keyProperty ? createObjectExpression([keyProperty]) : void 0,
                node.children,
                64,
                void 0,
                void 0,
                true,
                void 0,
                false
              );
            } else {
              childBlock = children[0].codegenNode;
              if (isTemplate && keyProperty) {
                injectProp(childBlock, keyProperty, context);
              }
              if (childBlock.isBlock !== !isStableFragment) {
                if (childBlock.isBlock) {
                  removeHelper(OPEN_BLOCK);
                  removeHelper(
                    getVNodeBlockHelper(context.inSSR, childBlock.isComponent)
                  );
                } else {
                  removeHelper(
                    getVNodeHelper(context.inSSR, childBlock.isComponent)
                  );
                }
              }
              childBlock.isBlock = !isStableFragment;
              if (childBlock.isBlock) {
                helper(OPEN_BLOCK);
                helper(getVNodeBlockHelper(context.inSSR, childBlock.isComponent));
              } else {
                helper(getVNodeHelper(context.inSSR, childBlock.isComponent));
              }
            }
            if (memo) {
              const loop = createFunctionExpression(
                createForLoopParams(forNode.parseResult, [
                  createSimpleExpression(`_cached`)
                ])
              );
              loop.body = createBlockStatement([
                createCompoundExpression([`const _memo = (`, memo.exp, `)`]),
                createCompoundExpression([
                  `if (_cached`,
                  ...keyExp ? [` && _cached.key === `, keyExp] : [],
                  ` && ${context.helperString(
                    IS_MEMO_SAME
                  )}(_cached, _memo)) return _cached`
                ]),
                createCompoundExpression([`const _item = `, childBlock]),
                createSimpleExpression(`_item.memo = _memo`),
                createSimpleExpression(`return _item`)
              ]);
              renderExp.arguments.push(
                loop,
                createSimpleExpression(`_cache`),
                createSimpleExpression(String(context.cached.length))
              );
              context.cached.push(null);
            } else {
              renderExp.arguments.push(
                createFunctionExpression(
                  createForLoopParams(forNode.parseResult),
                  childBlock,
                  true
                )
              );
            }
          };
        });
      }
    );
    defaultFallback = createSimpleExpression(`undefined`, false);
    trackSlotScopes = (node, context) => {
      if (node.type === 1 && (node.tagType === 1 || node.tagType === 3)) {
        const vSlot = findDir(node, "slot");
        if (vSlot) {
          vSlot.exp;
          context.scopes.vSlot++;
          return () => {
            context.scopes.vSlot--;
          };
        }
      }
    };
    trackVForSlotScopes = (node, context) => {
      let vFor;
      if (isTemplateNode(node) && node.props.some(isVSlot) && (vFor = findDir(node, "for"))) {
        const result = vFor.forParseResult;
        if (result) {
          finalizeForParseResult(result, context);
          const { value, key, index } = result;
          const { addIdentifiers, removeIdentifiers } = context;
          value && addIdentifiers(value);
          key && addIdentifiers(key);
          index && addIdentifiers(index);
          return () => {
            value && removeIdentifiers(value);
            key && removeIdentifiers(key);
            index && removeIdentifiers(index);
          };
        }
      }
    };
    buildClientSlotFn = (props, _vForExp, children, loc) => createFunctionExpression(
      props,
      children,
      false,
      true,
      children.length ? children[0].loc : loc
    );
    directiveImportMap = /* @__PURE__ */ new WeakMap();
    transformElement = (node, context) => {
      return function postTransformElement() {
        node = context.currentNode;
        if (!(node.type === 1 && (node.tagType === 0 || node.tagType === 1))) {
          return;
        }
        const { tag, props } = node;
        const isComponent2 = node.tagType === 1;
        let vnodeTag = isComponent2 ? resolveComponentType(node, context) : `"${tag}"`;
        const isDynamicComponent = isObject(vnodeTag) && vnodeTag.callee === RESOLVE_DYNAMIC_COMPONENT;
        let vnodeProps;
        let vnodeChildren;
        let patchFlag = 0;
        let vnodeDynamicProps;
        let dynamicPropNames;
        let vnodeDirectives;
        let shouldUseBlock = (
          // dynamic component may resolve to plain elements
          isDynamicComponent || vnodeTag === TELEPORT || vnodeTag === SUSPENSE || !isComponent2 && // <svg> and <foreignObject> must be forced into blocks so that block
          // updates inside get proper isSVG flag at runtime. (#639, #643)
          // This is technically web-specific, but splitting the logic out of core
          // leads to too much unnecessary complexity.
          (tag === "svg" || tag === "foreignObject" || tag === "math")
        );
        if (props.length > 0) {
          const propsBuildResult = buildProps(
            node,
            context,
            void 0,
            isComponent2,
            isDynamicComponent
          );
          vnodeProps = propsBuildResult.props;
          patchFlag = propsBuildResult.patchFlag;
          dynamicPropNames = propsBuildResult.dynamicPropNames;
          const directives = propsBuildResult.directives;
          vnodeDirectives = directives && directives.length ? createArrayExpression(
            directives.map((dir) => buildDirectiveArgs(dir, context))
          ) : void 0;
          if (propsBuildResult.shouldUseBlock) {
            shouldUseBlock = true;
          }
        }
        if (node.children.length > 0) {
          if (vnodeTag === KEEP_ALIVE) {
            shouldUseBlock = true;
            patchFlag |= 1024;
            if (node.children.length > 1) {
              context.onError(
                createCompilerError(46, {
                  start: node.children[0].loc.start,
                  end: node.children[node.children.length - 1].loc.end,
                  source: ""
                })
              );
            }
          }
          const shouldBuildAsSlots = isComponent2 && // Teleport is not a real component and has dedicated runtime handling
          vnodeTag !== TELEPORT && // explained above.
          vnodeTag !== KEEP_ALIVE;
          if (shouldBuildAsSlots) {
            const { slots, hasDynamicSlots } = buildSlots(node, context);
            vnodeChildren = slots;
            if (hasDynamicSlots) {
              patchFlag |= 1024;
            }
          } else if (node.children.length === 1 && vnodeTag !== TELEPORT) {
            const child = node.children[0];
            const type = child.type;
            const hasDynamicTextChild = type === 5 || type === 8;
            if (hasDynamicTextChild && getConstantType(child, context) === 0) {
              patchFlag |= 1;
            }
            if (hasDynamicTextChild || type === 2) {
              vnodeChildren = child;
            } else {
              vnodeChildren = node.children;
            }
          } else {
            vnodeChildren = node.children;
          }
        }
        if (dynamicPropNames && dynamicPropNames.length) {
          vnodeDynamicProps = stringifyDynamicPropNames(dynamicPropNames);
        }
        node.codegenNode = createVNodeCall(
          context,
          vnodeTag,
          vnodeProps,
          vnodeChildren,
          patchFlag === 0 ? void 0 : patchFlag,
          vnodeDynamicProps,
          vnodeDirectives,
          !!shouldUseBlock,
          false,
          isComponent2,
          node.loc
        );
      };
    };
    transformSlotOutlet = (node, context) => {
      if (isSlotOutlet(node)) {
        const { children, loc } = node;
        const { slotName, slotProps } = processSlotOutlet(node, context);
        const slotArgs = [
          context.prefixIdentifiers ? `_ctx.$slots` : `$slots`,
          slotName,
          "{}",
          "undefined",
          "true"
        ];
        let expectedLen = 2;
        if (slotProps) {
          slotArgs[2] = slotProps;
          expectedLen = 3;
        }
        if (children.length) {
          slotArgs[3] = createFunctionExpression([], children, false, false, loc);
          expectedLen = 4;
        }
        if (context.scopeId && !context.slotted) {
          expectedLen = 5;
        }
        slotArgs.splice(expectedLen);
        node.codegenNode = createCallExpression(
          context.helper(RENDER_SLOT),
          slotArgs,
          loc
        );
      }
    };
    transformOn = (dir, node, context, augmentor) => {
      const { loc, modifiers, arg } = dir;
      if (!dir.exp && !modifiers.length) {
        context.onError(createCompilerError(35, loc));
      }
      let eventName;
      if (arg.type === 4) {
        if (arg.isStatic) {
          let rawName = arg.content;
          if (rawName.startsWith("vnode")) {
            context.onError(createCompilerError(51, arg.loc));
          }
          if (rawName.startsWith("vue:")) {
            rawName = `vnode-${rawName.slice(4)}`;
          }
          const eventString = node.tagType !== 0 || rawName.startsWith("vnode") || !/[A-Z]/.test(rawName) ? (
            // for non-element and vnode lifecycle event listeners, auto convert
            // it to camelCase. See issue #2249
            toHandlerKey(camelize(rawName))
          ) : (
            // preserve case for plain element listeners that have uppercase
            // letters, as these may be custom elements' custom events
            `on:${rawName}`
          );
          eventName = createSimpleExpression(eventString, true, arg.loc);
        } else {
          eventName = createCompoundExpression([
            `${context.helperString(TO_HANDLER_KEY)}(`,
            arg,
            `)`
          ]);
        }
      } else {
        eventName = arg;
        eventName.children.unshift(`${context.helperString(TO_HANDLER_KEY)}(`);
        eventName.children.push(`)`);
      }
      let exp = dir.exp;
      if (exp && !exp.content.trim()) {
        exp = void 0;
      }
      let shouldCache = context.cacheHandlers && !exp && !context.inVOnce;
      if (exp) {
        const isMemberExp = isMemberExpression(exp);
        const isInlineStatement = !(isMemberExp || isFnExpression(exp));
        const hasMultipleStatements = exp.content.includes(`;`);
        if (true) {
          validateBrowserExpression(
            exp,
            context,
            false,
            hasMultipleStatements
          );
        }
        if (isInlineStatement || shouldCache && isMemberExp) {
          exp = createCompoundExpression([
            `${isInlineStatement ? `$event` : `${``}(...args)`} => ${hasMultipleStatements ? `{` : `(`}`,
            exp,
            hasMultipleStatements ? `}` : `)`
          ]);
        }
      }
      let ret = {
        props: [
          createObjectProperty(
            eventName,
            exp || createSimpleExpression(`() => {}`, false, loc)
          )
        ]
      };
      if (augmentor) {
        ret = augmentor(ret);
      }
      if (shouldCache) {
        ret.props[0].value = context.cache(ret.props[0].value);
      }
      ret.props.forEach((p) => p.key.isHandlerKey = true);
      return ret;
    };
    transformText = (node, context) => {
      if (node.type === 0 || node.type === 1 || node.type === 11 || node.type === 10) {
        return () => {
          const children = node.children;
          let currentContainer = void 0;
          let hasText = false;
          for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (isText$1(child)) {
              hasText = true;
              for (let j = i + 1; j < children.length; j++) {
                const next = children[j];
                if (isText$1(next)) {
                  if (!currentContainer) {
                    currentContainer = children[i] = createCompoundExpression(
                      [child],
                      child.loc
                    );
                  }
                  currentContainer.children.push(` + `, next);
                  children.splice(j, 1);
                  j--;
                } else {
                  currentContainer = void 0;
                  break;
                }
              }
            }
          }
          if (!hasText || // if this is a plain element with a single text child, leave it
          // as-is since the runtime has dedicated fast path for this by directly
          // setting textContent of the element.
          // for component root it's always normalized anyway.
          children.length === 1 && (node.type === 0 || node.type === 1 && node.tagType === 0 && // #3756
          // custom directives can potentially add DOM elements arbitrarily,
          // we need to avoid setting textContent of the element at runtime
          // to avoid accidentally overwriting the DOM elements added
          // by the user through custom directives.
          !node.props.find(
            (p) => p.type === 7 && !context.directiveTransforms[p.name]
          ) && // in compat mode, <template> tags with no special directives
          // will be rendered as a fragment so its children must be
          // converted into vnodes.
          !(node.tag === "template"))) {
            return;
          }
          for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (isText$1(child) || child.type === 8) {
              const callArgs = [];
              if (child.type !== 2 || child.content !== " ") {
                callArgs.push(child);
              }
              if (!context.ssr && getConstantType(child, context) === 0) {
                callArgs.push(
                  1 + (true ? ` /* ${PatchFlagNames[1]} */` : ``)
                );
              }
              children[i] = {
                type: 12,
                content: child,
                loc: child.loc,
                codegenNode: createCallExpression(
                  context.helper(CREATE_TEXT),
                  callArgs
                )
              };
            }
          }
        };
      }
    };
    seen$1 = /* @__PURE__ */ new WeakSet();
    transformOnce = (node, context) => {
      if (node.type === 1 && findDir(node, "once", true)) {
        if (seen$1.has(node) || context.inVOnce || context.inSSR) {
          return;
        }
        seen$1.add(node);
        context.inVOnce = true;
        context.helper(SET_BLOCK_TRACKING);
        return () => {
          context.inVOnce = false;
          const cur = context.currentNode;
          if (cur.codegenNode) {
            cur.codegenNode = context.cache(
              cur.codegenNode,
              true,
              true
            );
          }
        };
      }
    };
    transformModel = (dir, node, context) => {
      const { exp, arg } = dir;
      if (!exp) {
        context.onError(
          createCompilerError(41, dir.loc)
        );
        return createTransformProps();
      }
      const rawExp = exp.loc.source.trim();
      const expString = exp.type === 4 ? exp.content : rawExp;
      const bindingType = context.bindingMetadata[rawExp];
      if (bindingType === "props" || bindingType === "props-aliased") {
        context.onError(createCompilerError(44, exp.loc));
        return createTransformProps();
      }
      if (!expString.trim() || !isMemberExpression(exp) && true) {
        context.onError(
          createCompilerError(42, exp.loc)
        );
        return createTransformProps();
      }
      const propName = arg ? arg : createSimpleExpression("modelValue", true);
      const eventName = arg ? isStaticExp(arg) ? `onUpdate:${camelize(arg.content)}` : createCompoundExpression(['"onUpdate:" + ', arg]) : `onUpdate:modelValue`;
      let assignmentExp;
      const eventArg = context.isTS ? `($event: any)` : `$event`;
      {
        assignmentExp = createCompoundExpression([
          `${eventArg} => ((`,
          exp,
          `) = $event)`
        ]);
      }
      const props = [
        // modelValue: foo
        createObjectProperty(propName, dir.exp),
        // "onUpdate:modelValue": $event => (foo = $event)
        createObjectProperty(eventName, assignmentExp)
      ];
      if (dir.modifiers.length && node.tagType === 1) {
        const modifiers = dir.modifiers.map((m) => m.content).map((m) => (isSimpleIdentifier(m) ? m : JSON.stringify(m)) + `: true`).join(`, `);
        const modifiersKey = arg ? isStaticExp(arg) ? `${arg.content}Modifiers` : createCompoundExpression([arg, ' + "Modifiers"']) : `modelModifiers`;
        props.push(
          createObjectProperty(
            modifiersKey,
            createSimpleExpression(
              `{ ${modifiers} }`,
              false,
              dir.loc,
              2
            )
          )
        );
      }
      return createTransformProps(props);
    };
    validDivisionCharRE = /[\w).+\-_$\]]/;
    transformFilter = (node, context) => {
      if (!isCompatEnabled("COMPILER_FILTERS", context)) {
        return;
      }
      if (node.type === 5) {
        rewriteFilter(node.content, context);
      } else if (node.type === 1) {
        node.props.forEach((prop) => {
          if (prop.type === 7 && prop.name !== "for" && prop.exp) {
            rewriteFilter(prop.exp, context);
          }
        });
      }
    };
    seen = /* @__PURE__ */ new WeakSet();
    transformMemo = (node, context) => {
      if (node.type === 1) {
        const dir = findDir(node, "memo");
        if (!dir || seen.has(node)) {
          return;
        }
        seen.add(node);
        return () => {
          const codegenNode = node.codegenNode || context.currentNode.codegenNode;
          if (codegenNode && codegenNode.type === 13) {
            if (node.tagType !== 1) {
              convertToBlock(codegenNode, context);
            }
            node.codegenNode = createCallExpression(context.helper(WITH_MEMO), [
              dir.exp,
              createFunctionExpression(void 0, codegenNode),
              `_cache`,
              String(context.cached.length)
            ]);
            context.cached.push(null);
          }
        };
      }
    };
    BindingTypes = {
      "DATA": "data",
      "PROPS": "props",
      "PROPS_ALIASED": "props-aliased",
      "SETUP_LET": "setup-let",
      "SETUP_CONST": "setup-const",
      "SETUP_REACTIVE_CONST": "setup-reactive-const",
      "SETUP_MAYBE_REF": "setup-maybe-ref",
      "SETUP_REF": "setup-ref",
      "OPTIONS": "options",
      "LITERAL_CONST": "literal-const"
    };
    noopDirectiveTransform = () => ({ props: [] });
  }
});

// node_modules/.pnpm/@vue+compiler-dom@3.5.16/node_modules/@vue/compiler-dom/dist/compiler-dom.esm-bundler.js
var compiler_dom_esm_bundler_exports = {};
__export(compiler_dom_esm_bundler_exports, {
  BASE_TRANSITION: () => BASE_TRANSITION,
  BindingTypes: () => BindingTypes,
  CAMELIZE: () => CAMELIZE,
  CAPITALIZE: () => CAPITALIZE,
  CREATE_BLOCK: () => CREATE_BLOCK,
  CREATE_COMMENT: () => CREATE_COMMENT,
  CREATE_ELEMENT_BLOCK: () => CREATE_ELEMENT_BLOCK,
  CREATE_ELEMENT_VNODE: () => CREATE_ELEMENT_VNODE,
  CREATE_SLOTS: () => CREATE_SLOTS,
  CREATE_STATIC: () => CREATE_STATIC,
  CREATE_TEXT: () => CREATE_TEXT,
  CREATE_VNODE: () => CREATE_VNODE,
  CompilerDeprecationTypes: () => CompilerDeprecationTypes,
  ConstantTypes: () => ConstantTypes,
  DOMDirectiveTransforms: () => DOMDirectiveTransforms,
  DOMErrorCodes: () => DOMErrorCodes,
  DOMErrorMessages: () => DOMErrorMessages,
  DOMNodeTransforms: () => DOMNodeTransforms,
  ElementTypes: () => ElementTypes,
  ErrorCodes: () => ErrorCodes,
  FRAGMENT: () => FRAGMENT,
  GUARD_REACTIVE_PROPS: () => GUARD_REACTIVE_PROPS,
  IS_MEMO_SAME: () => IS_MEMO_SAME,
  IS_REF: () => IS_REF,
  KEEP_ALIVE: () => KEEP_ALIVE,
  MERGE_PROPS: () => MERGE_PROPS,
  NORMALIZE_CLASS: () => NORMALIZE_CLASS,
  NORMALIZE_PROPS: () => NORMALIZE_PROPS,
  NORMALIZE_STYLE: () => NORMALIZE_STYLE,
  Namespaces: () => Namespaces,
  NodeTypes: () => NodeTypes,
  OPEN_BLOCK: () => OPEN_BLOCK,
  POP_SCOPE_ID: () => POP_SCOPE_ID,
  PUSH_SCOPE_ID: () => PUSH_SCOPE_ID,
  RENDER_LIST: () => RENDER_LIST,
  RENDER_SLOT: () => RENDER_SLOT,
  RESOLVE_COMPONENT: () => RESOLVE_COMPONENT,
  RESOLVE_DIRECTIVE: () => RESOLVE_DIRECTIVE,
  RESOLVE_DYNAMIC_COMPONENT: () => RESOLVE_DYNAMIC_COMPONENT,
  RESOLVE_FILTER: () => RESOLVE_FILTER,
  SET_BLOCK_TRACKING: () => SET_BLOCK_TRACKING,
  SUSPENSE: () => SUSPENSE,
  TELEPORT: () => TELEPORT,
  TO_DISPLAY_STRING: () => TO_DISPLAY_STRING,
  TO_HANDLERS: () => TO_HANDLERS,
  TO_HANDLER_KEY: () => TO_HANDLER_KEY,
  TRANSITION: () => TRANSITION,
  TRANSITION_GROUP: () => TRANSITION_GROUP,
  TS_NODE_TYPES: () => TS_NODE_TYPES,
  UNREF: () => UNREF,
  V_MODEL_CHECKBOX: () => V_MODEL_CHECKBOX,
  V_MODEL_DYNAMIC: () => V_MODEL_DYNAMIC,
  V_MODEL_RADIO: () => V_MODEL_RADIO,
  V_MODEL_SELECT: () => V_MODEL_SELECT,
  V_MODEL_TEXT: () => V_MODEL_TEXT,
  V_ON_WITH_KEYS: () => V_ON_WITH_KEYS,
  V_ON_WITH_MODIFIERS: () => V_ON_WITH_MODIFIERS,
  V_SHOW: () => V_SHOW,
  WITH_CTX: () => WITH_CTX,
  WITH_DIRECTIVES: () => WITH_DIRECTIVES,
  WITH_MEMO: () => WITH_MEMO,
  advancePositionWithClone: () => advancePositionWithClone,
  advancePositionWithMutation: () => advancePositionWithMutation,
  assert: () => assert,
  baseCompile: () => baseCompile,
  baseParse: () => baseParse,
  buildDirectiveArgs: () => buildDirectiveArgs,
  buildProps: () => buildProps,
  buildSlots: () => buildSlots,
  checkCompatEnabled: () => checkCompatEnabled,
  compile: () => compile,
  convertToBlock: () => convertToBlock,
  createArrayExpression: () => createArrayExpression,
  createAssignmentExpression: () => createAssignmentExpression,
  createBlockStatement: () => createBlockStatement,
  createCacheExpression: () => createCacheExpression,
  createCallExpression: () => createCallExpression,
  createCompilerError: () => createCompilerError,
  createCompoundExpression: () => createCompoundExpression,
  createConditionalExpression: () => createConditionalExpression,
  createDOMCompilerError: () => createDOMCompilerError,
  createForLoopParams: () => createForLoopParams,
  createFunctionExpression: () => createFunctionExpression,
  createIfStatement: () => createIfStatement,
  createInterpolation: () => createInterpolation,
  createObjectExpression: () => createObjectExpression,
  createObjectProperty: () => createObjectProperty,
  createReturnStatement: () => createReturnStatement,
  createRoot: () => createRoot,
  createSequenceExpression: () => createSequenceExpression,
  createSimpleExpression: () => createSimpleExpression,
  createStructuralDirectiveTransform: () => createStructuralDirectiveTransform,
  createTemplateLiteral: () => createTemplateLiteral,
  createTransformContext: () => createTransformContext,
  createVNodeCall: () => createVNodeCall,
  errorMessages: () => errorMessages,
  extractIdentifiers: () => extractIdentifiers,
  findDir: () => findDir,
  findProp: () => findProp,
  forAliasRE: () => forAliasRE,
  generate: () => generate,
  generateCodeFrame: () => generateCodeFrame,
  getBaseTransformPreset: () => getBaseTransformPreset,
  getConstantType: () => getConstantType,
  getMemoedVNodeCall: () => getMemoedVNodeCall,
  getVNodeBlockHelper: () => getVNodeBlockHelper,
  getVNodeHelper: () => getVNodeHelper,
  hasDynamicKeyVBind: () => hasDynamicKeyVBind,
  hasScopeRef: () => hasScopeRef,
  helperNameMap: () => helperNameMap,
  injectProp: () => injectProp,
  isCoreComponent: () => isCoreComponent,
  isFnExpression: () => isFnExpression,
  isFnExpressionBrowser: () => isFnExpressionBrowser,
  isFnExpressionNode: () => isFnExpressionNode,
  isFunctionType: () => isFunctionType,
  isInDestructureAssignment: () => isInDestructureAssignment,
  isInNewExpression: () => isInNewExpression,
  isMemberExpression: () => isMemberExpression,
  isMemberExpressionBrowser: () => isMemberExpressionBrowser,
  isMemberExpressionNode: () => isMemberExpressionNode,
  isReferencedIdentifier: () => isReferencedIdentifier,
  isSimpleIdentifier: () => isSimpleIdentifier,
  isSlotOutlet: () => isSlotOutlet,
  isStaticArgOf: () => isStaticArgOf,
  isStaticExp: () => isStaticExp,
  isStaticProperty: () => isStaticProperty,
  isStaticPropertyKey: () => isStaticPropertyKey,
  isTemplateNode: () => isTemplateNode,
  isText: () => isText$1,
  isVSlot: () => isVSlot,
  locStub: () => locStub,
  noopDirectiveTransform: () => noopDirectiveTransform,
  parse: () => parse,
  parserOptions: () => parserOptions,
  processExpression: () => processExpression,
  processFor: () => processFor,
  processIf: () => processIf,
  processSlotOutlet: () => processSlotOutlet,
  registerRuntimeHelpers: () => registerRuntimeHelpers,
  resolveComponentType: () => resolveComponentType,
  stringifyExpression: () => stringifyExpression,
  toValidAssetId: () => toValidAssetId,
  trackSlotScopes: () => trackSlotScopes,
  trackVForSlotScopes: () => trackVForSlotScopes,
  transform: () => transform,
  transformBind: () => transformBind,
  transformElement: () => transformElement,
  transformExpression: () => transformExpression,
  transformModel: () => transformModel,
  transformOn: () => transformOn,
  transformStyle: () => transformStyle,
  traverseNode: () => traverseNode,
  unwrapTSNode: () => unwrapTSNode,
  walkBlockDeclarations: () => walkBlockDeclarations,
  walkFunctionParams: () => walkFunctionParams,
  walkIdentifiers: () => walkIdentifiers,
  warnDeprecation: () => warnDeprecation
});
function decodeHtmlBrowser(raw, asAttr = false) {
  if (!decoder) {
    decoder = document.createElement("div");
  }
  if (asAttr) {
    decoder.innerHTML = `<div foo="${raw.replace(/"/g, "&quot;")}">`;
    return decoder.children[0].getAttribute("foo");
  } else {
    decoder.innerHTML = raw;
    return decoder.textContent;
  }
}
function createDOMCompilerError(code, loc) {
  return createCompilerError(
    code,
    loc,
    true ? DOMErrorMessages : void 0
  );
}
function hasMultipleChildren(node) {
  const children = node.children = node.children.filter(
    (c) => c.type !== 3 && !(c.type === 2 && !c.content.trim())
  );
  const child = children[0];
  return children.length !== 1 || child.type === 11 || child.type === 9 && child.branches.some(hasMultipleChildren);
}
function isValidHTMLNesting(parent, child) {
  if (parent === "template") {
    return true;
  }
  if (parent in onlyValidChildren) {
    return onlyValidChildren[parent].has(child);
  }
  if (child in onlyValidParents) {
    return onlyValidParents[child].has(parent);
  }
  if (parent in knownInvalidChildren) {
    if (knownInvalidChildren[parent].has(child)) return false;
  }
  if (child in knownInvalidParents) {
    if (knownInvalidParents[child].has(parent)) return false;
  }
  return true;
}
function compile(src, options = {}) {
  return baseCompile(
    src,
    extend({}, parserOptions, options, {
      nodeTransforms: [
        // ignore <script> and <tag>
        // this is not put inside DOMNodeTransforms because that list is used
        // by compiler-ssr to generate vnode fallback branches
        ignoreSideEffectTags,
        ...DOMNodeTransforms,
        ...options.nodeTransforms || []
      ],
      directiveTransforms: extend(
        {},
        DOMDirectiveTransforms,
        options.directiveTransforms || {}
      ),
      transformHoist: null
    })
  );
}
function parse(template, options = {}) {
  return baseParse(template, extend({}, parserOptions, options));
}
var V_MODEL_RADIO, V_MODEL_CHECKBOX, V_MODEL_TEXT, V_MODEL_SELECT, V_MODEL_DYNAMIC, V_ON_WITH_MODIFIERS, V_ON_WITH_KEYS, V_SHOW, TRANSITION, TRANSITION_GROUP, decoder, parserOptions, transformStyle, parseInlineCSS, DOMErrorCodes, DOMErrorMessages, transformVHtml, transformVText, transformModel2, isEventOptionModifier, isNonKeyModifier, maybeKeyModifier, isKeyboardEvent, resolveModifiers, transformClick, transformOn2, transformShow, transformTransition, ignoreSideEffectTags, headings, emptySet, onlyValidChildren, onlyValidParents, knownInvalidChildren, knownInvalidParents, validateHtmlNesting, DOMNodeTransforms, DOMDirectiveTransforms;
var init_compiler_dom_esm_bundler = __esm({
  "node_modules/.pnpm/@vue+compiler-dom@3.5.16/node_modules/@vue/compiler-dom/dist/compiler-dom.esm-bundler.js"() {
    init_compiler_core_esm_bundler();
    init_compiler_core_esm_bundler();
    init_shared_esm_bundler();
    V_MODEL_RADIO = Symbol(true ? `vModelRadio` : ``);
    V_MODEL_CHECKBOX = Symbol(
      true ? `vModelCheckbox` : ``
    );
    V_MODEL_TEXT = Symbol(true ? `vModelText` : ``);
    V_MODEL_SELECT = Symbol(
      true ? `vModelSelect` : ``
    );
    V_MODEL_DYNAMIC = Symbol(
      true ? `vModelDynamic` : ``
    );
    V_ON_WITH_MODIFIERS = Symbol(
      true ? `vOnModifiersGuard` : ``
    );
    V_ON_WITH_KEYS = Symbol(
      true ? `vOnKeysGuard` : ``
    );
    V_SHOW = Symbol(true ? `vShow` : ``);
    TRANSITION = Symbol(true ? `Transition` : ``);
    TRANSITION_GROUP = Symbol(
      true ? `TransitionGroup` : ``
    );
    registerRuntimeHelpers({
      [V_MODEL_RADIO]: `vModelRadio`,
      [V_MODEL_CHECKBOX]: `vModelCheckbox`,
      [V_MODEL_TEXT]: `vModelText`,
      [V_MODEL_SELECT]: `vModelSelect`,
      [V_MODEL_DYNAMIC]: `vModelDynamic`,
      [V_ON_WITH_MODIFIERS]: `withModifiers`,
      [V_ON_WITH_KEYS]: `withKeys`,
      [V_SHOW]: `vShow`,
      [TRANSITION]: `Transition`,
      [TRANSITION_GROUP]: `TransitionGroup`
    });
    parserOptions = {
      parseMode: "html",
      isVoidTag,
      isNativeTag: (tag) => isHTMLTag(tag) || isSVGTag(tag) || isMathMLTag(tag),
      isPreTag: (tag) => tag === "pre",
      isIgnoreNewlineTag: (tag) => tag === "pre" || tag === "textarea",
      decodeEntities: decodeHtmlBrowser,
      isBuiltInComponent: (tag) => {
        if (tag === "Transition" || tag === "transition") {
          return TRANSITION;
        } else if (tag === "TransitionGroup" || tag === "transition-group") {
          return TRANSITION_GROUP;
        }
      },
      // https://html.spec.whatwg.org/multipage/parsing.html#tree-construction-dispatcher
      getNamespace(tag, parent, rootNamespace) {
        let ns = parent ? parent.ns : rootNamespace;
        if (parent && ns === 2) {
          if (parent.tag === "annotation-xml") {
            if (tag === "svg") {
              return 1;
            }
            if (parent.props.some(
              (a) => a.type === 6 && a.name === "encoding" && a.value != null && (a.value.content === "text/html" || a.value.content === "application/xhtml+xml")
            )) {
              ns = 0;
            }
          } else if (/^m(?:[ions]|text)$/.test(parent.tag) && tag !== "mglyph" && tag !== "malignmark") {
            ns = 0;
          }
        } else if (parent && ns === 1) {
          if (parent.tag === "foreignObject" || parent.tag === "desc" || parent.tag === "title") {
            ns = 0;
          }
        }
        if (ns === 0) {
          if (tag === "svg") {
            return 1;
          }
          if (tag === "math") {
            return 2;
          }
        }
        return ns;
      }
    };
    transformStyle = (node) => {
      if (node.type === 1) {
        node.props.forEach((p, i) => {
          if (p.type === 6 && p.name === "style" && p.value) {
            node.props[i] = {
              type: 7,
              name: `bind`,
              arg: createSimpleExpression(`style`, true, p.loc),
              exp: parseInlineCSS(p.value.content, p.loc),
              modifiers: [],
              loc: p.loc
            };
          }
        });
      }
    };
    parseInlineCSS = (cssText, loc) => {
      const normalized = parseStringStyle(cssText);
      return createSimpleExpression(
        JSON.stringify(normalized),
        false,
        loc,
        3
      );
    };
    DOMErrorCodes = {
      "X_V_HTML_NO_EXPRESSION": 53,
      "53": "X_V_HTML_NO_EXPRESSION",
      "X_V_HTML_WITH_CHILDREN": 54,
      "54": "X_V_HTML_WITH_CHILDREN",
      "X_V_TEXT_NO_EXPRESSION": 55,
      "55": "X_V_TEXT_NO_EXPRESSION",
      "X_V_TEXT_WITH_CHILDREN": 56,
      "56": "X_V_TEXT_WITH_CHILDREN",
      "X_V_MODEL_ON_INVALID_ELEMENT": 57,
      "57": "X_V_MODEL_ON_INVALID_ELEMENT",
      "X_V_MODEL_ARG_ON_ELEMENT": 58,
      "58": "X_V_MODEL_ARG_ON_ELEMENT",
      "X_V_MODEL_ON_FILE_INPUT_ELEMENT": 59,
      "59": "X_V_MODEL_ON_FILE_INPUT_ELEMENT",
      "X_V_MODEL_UNNECESSARY_VALUE": 60,
      "60": "X_V_MODEL_UNNECESSARY_VALUE",
      "X_V_SHOW_NO_EXPRESSION": 61,
      "61": "X_V_SHOW_NO_EXPRESSION",
      "X_TRANSITION_INVALID_CHILDREN": 62,
      "62": "X_TRANSITION_INVALID_CHILDREN",
      "X_IGNORED_SIDE_EFFECT_TAG": 63,
      "63": "X_IGNORED_SIDE_EFFECT_TAG",
      "__EXTEND_POINT__": 64,
      "64": "__EXTEND_POINT__"
    };
    DOMErrorMessages = {
      [53]: `v-html is missing expression.`,
      [54]: `v-html will override element children.`,
      [55]: `v-text is missing expression.`,
      [56]: `v-text will override element children.`,
      [57]: `v-model can only be used on <input>, <textarea> and <select> elements.`,
      [58]: `v-model argument is not supported on plain elements.`,
      [59]: `v-model cannot be used on file inputs since they are read-only. Use a v-on:change listener instead.`,
      [60]: `Unnecessary value binding used alongside v-model. It will interfere with v-model's behavior.`,
      [61]: `v-show is missing expression.`,
      [62]: `<Transition> expects exactly one child element or component.`,
      [63]: `Tags with side effect (<script> and <style>) are ignored in client component templates.`
    };
    transformVHtml = (dir, node, context) => {
      const { exp, loc } = dir;
      if (!exp) {
        context.onError(
          createDOMCompilerError(53, loc)
        );
      }
      if (node.children.length) {
        context.onError(
          createDOMCompilerError(54, loc)
        );
        node.children.length = 0;
      }
      return {
        props: [
          createObjectProperty(
            createSimpleExpression(`innerHTML`, true, loc),
            exp || createSimpleExpression("", true)
          )
        ]
      };
    };
    transformVText = (dir, node, context) => {
      const { exp, loc } = dir;
      if (!exp) {
        context.onError(
          createDOMCompilerError(55, loc)
        );
      }
      if (node.children.length) {
        context.onError(
          createDOMCompilerError(56, loc)
        );
        node.children.length = 0;
      }
      return {
        props: [
          createObjectProperty(
            createSimpleExpression(`textContent`, true),
            exp ? getConstantType(exp, context) > 0 ? exp : createCallExpression(
              context.helperString(TO_DISPLAY_STRING),
              [exp],
              loc
            ) : createSimpleExpression("", true)
          )
        ]
      };
    };
    transformModel2 = (dir, node, context) => {
      const baseResult = transformModel(dir, node, context);
      if (!baseResult.props.length || node.tagType === 1) {
        return baseResult;
      }
      if (dir.arg) {
        context.onError(
          createDOMCompilerError(
            58,
            dir.arg.loc
          )
        );
      }
      function checkDuplicatedValue() {
        const value = findDir(node, "bind");
        if (value && isStaticArgOf(value.arg, "value")) {
          context.onError(
            createDOMCompilerError(
              60,
              value.loc
            )
          );
        }
      }
      const { tag } = node;
      const isCustomElement = context.isCustomElement(tag);
      if (tag === "input" || tag === "textarea" || tag === "select" || isCustomElement) {
        let directiveToUse = V_MODEL_TEXT;
        let isInvalidType = false;
        if (tag === "input" || isCustomElement) {
          const type = findProp(node, `type`);
          if (type) {
            if (type.type === 7) {
              directiveToUse = V_MODEL_DYNAMIC;
            } else if (type.value) {
              switch (type.value.content) {
                case "radio":
                  directiveToUse = V_MODEL_RADIO;
                  break;
                case "checkbox":
                  directiveToUse = V_MODEL_CHECKBOX;
                  break;
                case "file":
                  isInvalidType = true;
                  context.onError(
                    createDOMCompilerError(
                      59,
                      dir.loc
                    )
                  );
                  break;
                default:
                  checkDuplicatedValue();
                  break;
              }
            }
          } else if (hasDynamicKeyVBind(node)) {
            directiveToUse = V_MODEL_DYNAMIC;
          } else {
            checkDuplicatedValue();
          }
        } else if (tag === "select") {
          directiveToUse = V_MODEL_SELECT;
        } else {
          checkDuplicatedValue();
        }
        if (!isInvalidType) {
          baseResult.needRuntime = context.helper(directiveToUse);
        }
      } else {
        context.onError(
          createDOMCompilerError(
            57,
            dir.loc
          )
        );
      }
      baseResult.props = baseResult.props.filter(
        (p) => !(p.key.type === 4 && p.key.content === "modelValue")
      );
      return baseResult;
    };
    isEventOptionModifier = makeMap(`passive,once,capture`);
    isNonKeyModifier = makeMap(
      // event propagation management
      `stop,prevent,self,ctrl,shift,alt,meta,exact,middle`
    );
    maybeKeyModifier = makeMap("left,right");
    isKeyboardEvent = makeMap(`onkeyup,onkeydown,onkeypress`);
    resolveModifiers = (key, modifiers, context, loc) => {
      const keyModifiers = [];
      const nonKeyModifiers = [];
      const eventOptionModifiers = [];
      for (let i = 0; i < modifiers.length; i++) {
        const modifier = modifiers[i].content;
        if (modifier === "native" && checkCompatEnabled(
          "COMPILER_V_ON_NATIVE",
          context,
          loc
        )) {
          eventOptionModifiers.push(modifier);
        } else if (isEventOptionModifier(modifier)) {
          eventOptionModifiers.push(modifier);
        } else {
          if (maybeKeyModifier(modifier)) {
            if (isStaticExp(key)) {
              if (isKeyboardEvent(key.content.toLowerCase())) {
                keyModifiers.push(modifier);
              } else {
                nonKeyModifiers.push(modifier);
              }
            } else {
              keyModifiers.push(modifier);
              nonKeyModifiers.push(modifier);
            }
          } else {
            if (isNonKeyModifier(modifier)) {
              nonKeyModifiers.push(modifier);
            } else {
              keyModifiers.push(modifier);
            }
          }
        }
      }
      return {
        keyModifiers,
        nonKeyModifiers,
        eventOptionModifiers
      };
    };
    transformClick = (key, event) => {
      const isStaticClick = isStaticExp(key) && key.content.toLowerCase() === "onclick";
      return isStaticClick ? createSimpleExpression(event, true) : key.type !== 4 ? createCompoundExpression([
        `(`,
        key,
        `) === "onClick" ? "${event}" : (`,
        key,
        `)`
      ]) : key;
    };
    transformOn2 = (dir, node, context) => {
      return transformOn(dir, node, context, (baseResult) => {
        const { modifiers } = dir;
        if (!modifiers.length) return baseResult;
        let { key, value: handlerExp } = baseResult.props[0];
        const { keyModifiers, nonKeyModifiers, eventOptionModifiers } = resolveModifiers(key, modifiers, context, dir.loc);
        if (nonKeyModifiers.includes("right")) {
          key = transformClick(key, `onContextmenu`);
        }
        if (nonKeyModifiers.includes("middle")) {
          key = transformClick(key, `onMouseup`);
        }
        if (nonKeyModifiers.length) {
          handlerExp = createCallExpression(context.helper(V_ON_WITH_MODIFIERS), [
            handlerExp,
            JSON.stringify(nonKeyModifiers)
          ]);
        }
        if (keyModifiers.length && // if event name is dynamic, always wrap with keys guard
        (!isStaticExp(key) || isKeyboardEvent(key.content.toLowerCase()))) {
          handlerExp = createCallExpression(context.helper(V_ON_WITH_KEYS), [
            handlerExp,
            JSON.stringify(keyModifiers)
          ]);
        }
        if (eventOptionModifiers.length) {
          const modifierPostfix = eventOptionModifiers.map(capitalize).join("");
          key = isStaticExp(key) ? createSimpleExpression(`${key.content}${modifierPostfix}`, true) : createCompoundExpression([`(`, key, `) + "${modifierPostfix}"`]);
        }
        return {
          props: [createObjectProperty(key, handlerExp)]
        };
      });
    };
    transformShow = (dir, node, context) => {
      const { exp, loc } = dir;
      if (!exp) {
        context.onError(
          createDOMCompilerError(61, loc)
        );
      }
      return {
        props: [],
        needRuntime: context.helper(V_SHOW)
      };
    };
    transformTransition = (node, context) => {
      if (node.type === 1 && node.tagType === 1) {
        const component = context.isBuiltInComponent(node.tag);
        if (component === TRANSITION) {
          return () => {
            if (!node.children.length) {
              return;
            }
            if (hasMultipleChildren(node)) {
              context.onError(
                createDOMCompilerError(
                  62,
                  {
                    start: node.children[0].loc.start,
                    end: node.children[node.children.length - 1].loc.end,
                    source: ""
                  }
                )
              );
            }
            const child = node.children[0];
            if (child.type === 1) {
              for (const p of child.props) {
                if (p.type === 7 && p.name === "show") {
                  node.props.push({
                    type: 6,
                    name: "persisted",
                    nameLoc: node.loc,
                    value: void 0,
                    loc: node.loc
                  });
                }
              }
            }
          };
        }
      }
    };
    ignoreSideEffectTags = (node, context) => {
      if (node.type === 1 && node.tagType === 0 && (node.tag === "script" || node.tag === "style")) {
        context.onError(
          createDOMCompilerError(
            63,
            node.loc
          )
        );
        context.removeNode();
      }
    };
    headings = /* @__PURE__ */ new Set(["h1", "h2", "h3", "h4", "h5", "h6"]);
    emptySet = /* @__PURE__ */ new Set([]);
    onlyValidChildren = {
      head: /* @__PURE__ */ new Set([
        "base",
        "basefront",
        "bgsound",
        "link",
        "meta",
        "title",
        "noscript",
        "noframes",
        "style",
        "script",
        "template"
      ]),
      optgroup: /* @__PURE__ */ new Set(["option"]),
      select: /* @__PURE__ */ new Set(["optgroup", "option", "hr"]),
      // table
      table: /* @__PURE__ */ new Set(["caption", "colgroup", "tbody", "tfoot", "thead"]),
      tr: /* @__PURE__ */ new Set(["td", "th"]),
      colgroup: /* @__PURE__ */ new Set(["col"]),
      tbody: /* @__PURE__ */ new Set(["tr"]),
      thead: /* @__PURE__ */ new Set(["tr"]),
      tfoot: /* @__PURE__ */ new Set(["tr"]),
      // these elements can not have any children elements
      script: emptySet,
      iframe: emptySet,
      option: emptySet,
      textarea: emptySet,
      style: emptySet,
      title: emptySet
    };
    onlyValidParents = {
      // sections
      html: emptySet,
      body: /* @__PURE__ */ new Set(["html"]),
      head: /* @__PURE__ */ new Set(["html"]),
      // table
      td: /* @__PURE__ */ new Set(["tr"]),
      colgroup: /* @__PURE__ */ new Set(["table"]),
      caption: /* @__PURE__ */ new Set(["table"]),
      tbody: /* @__PURE__ */ new Set(["table"]),
      tfoot: /* @__PURE__ */ new Set(["table"]),
      col: /* @__PURE__ */ new Set(["colgroup"]),
      th: /* @__PURE__ */ new Set(["tr"]),
      thead: /* @__PURE__ */ new Set(["table"]),
      tr: /* @__PURE__ */ new Set(["tbody", "thead", "tfoot"]),
      // data list
      dd: /* @__PURE__ */ new Set(["dl", "div"]),
      dt: /* @__PURE__ */ new Set(["dl", "div"]),
      // other
      figcaption: /* @__PURE__ */ new Set(["figure"]),
      // li: new Set(["ul", "ol"]),
      summary: /* @__PURE__ */ new Set(["details"]),
      area: /* @__PURE__ */ new Set(["map"])
    };
    knownInvalidChildren = {
      p: /* @__PURE__ */ new Set([
        "address",
        "article",
        "aside",
        "blockquote",
        "center",
        "details",
        "dialog",
        "dir",
        "div",
        "dl",
        "fieldset",
        "figure",
        "footer",
        "form",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "header",
        "hgroup",
        "hr",
        "li",
        "main",
        "nav",
        "menu",
        "ol",
        "p",
        "pre",
        "section",
        "table",
        "ul"
      ]),
      svg: /* @__PURE__ */ new Set([
        "b",
        "blockquote",
        "br",
        "code",
        "dd",
        "div",
        "dl",
        "dt",
        "em",
        "embed",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "hr",
        "i",
        "img",
        "li",
        "menu",
        "meta",
        "ol",
        "p",
        "pre",
        "ruby",
        "s",
        "small",
        "span",
        "strong",
        "sub",
        "sup",
        "table",
        "u",
        "ul",
        "var"
      ])
    };
    knownInvalidParents = {
      a: /* @__PURE__ */ new Set(["a"]),
      button: /* @__PURE__ */ new Set(["button"]),
      dd: /* @__PURE__ */ new Set(["dd", "dt"]),
      dt: /* @__PURE__ */ new Set(["dd", "dt"]),
      form: /* @__PURE__ */ new Set(["form"]),
      li: /* @__PURE__ */ new Set(["li"]),
      h1: headings,
      h2: headings,
      h3: headings,
      h4: headings,
      h5: headings,
      h6: headings
    };
    validateHtmlNesting = (node, context) => {
      if (node.type === 1 && node.tagType === 0 && context.parent && context.parent.type === 1 && context.parent.tagType === 0 && !isValidHTMLNesting(context.parent.tag, node.tag)) {
        const error = new SyntaxError(
          `<${node.tag}> cannot be child of <${context.parent.tag}>, according to HTML specifications. This can cause hydration errors or potentially disrupt future functionality.`
        );
        error.loc = node.loc;
        context.onWarn(error);
      }
    };
    DOMNodeTransforms = [
      transformStyle,
      ...true ? [transformTransition, validateHtmlNesting] : []
    ];
    DOMDirectiveTransforms = {
      cloak: noopDirectiveTransform,
      html: transformVHtml,
      text: transformVText,
      model: transformModel2,
      // override compiler-core
      on: transformOn2,
      // override compiler-core
      show: transformShow
    };
  }
});

// node_modules/.pnpm/vue@3.5.16/node_modules/vue/dist/vue.cjs.js
var require_vue_cjs = __commonJS({
  "node_modules/.pnpm/vue@3.5.16/node_modules/vue/dist/vue.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var compilerDom = (init_compiler_dom_esm_bundler(), __toCommonJS(compiler_dom_esm_bundler_exports));
    var runtimeDom = (init_runtime_dom_esm_bundler(), __toCommonJS(runtime_dom_esm_bundler_exports));
    var shared = (init_shared_esm_bundler(), __toCommonJS(shared_esm_bundler_exports));
    function _interopNamespaceDefault(e) {
      var n = /* @__PURE__ */ Object.create(null);
      if (e) {
        for (var k in e) {
          n[k] = e[k];
        }
      }
      n.default = e;
      return Object.freeze(n);
    }
    var runtimeDom__namespace = _interopNamespaceDefault(runtimeDom);
    var compileCache = /* @__PURE__ */ Object.create(null);
    function compileToFunction(template, options) {
      if (!shared.isString(template)) {
        if (template.nodeType) {
          template = template.innerHTML;
        } else {
          runtimeDom.warn(`invalid template option: `, template);
          return shared.NOOP;
        }
      }
      const key = shared.genCacheKey(template, options);
      const cached = compileCache[key];
      if (cached) {
        return cached;
      }
      if (template[0] === "#") {
        const el = document.querySelector(template);
        if (!el) {
          runtimeDom.warn(`Template element not found or is empty: ${template}`);
        }
        template = el ? el.innerHTML : ``;
      }
      const opts = shared.extend(
        {
          hoistStatic: true,
          onError,
          onWarn: (e) => onError(e, true)
        },
        options
      );
      if (!opts.isCustomElement && typeof customElements !== "undefined") {
        opts.isCustomElement = (tag) => !!customElements.get(tag);
      }
      const { code } = compilerDom.compile(template, opts);
      function onError(err, asWarning = false) {
        const message = asWarning ? err.message : `Template compilation error: ${err.message}`;
        const codeFrame = err.loc && shared.generateCodeFrame(
          template,
          err.loc.start.offset,
          err.loc.end.offset
        );
        runtimeDom.warn(codeFrame ? `${message}
${codeFrame}` : message);
      }
      const render = new Function("Vue", code)(runtimeDom__namespace);
      render._rc = true;
      return compileCache[key] = render;
    }
    runtimeDom.registerRuntimeCompiler(compileToFunction);
    exports.compile = compileToFunction;
    Object.keys(runtimeDom).forEach(function(k) {
      if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports, k)) exports[k] = runtimeDom[k];
    });
  }
});

// node_modules/.pnpm/vue@3.5.16/node_modules/vue/index.js
var require_vue = __commonJS({
  "node_modules/.pnpm/vue@3.5.16/node_modules/vue/index.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_vue_cjs();
    }
  }
});

// node_modules/.pnpm/@element-plus+icons-vue@2.0.0_vue@3.5.16/node_modules/@element-plus/icons-vue/dist/index.cjs
var require_dist = __commonJS({
  "node_modules/.pnpm/@element-plus+icons-vue@2.0.0_vue@3.5.16/node_modules/@element-plus/icons-vue/dist/index.cjs"(exports, module) {
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))
          if (!__hasOwnProp.call(to, key) && key !== except)
            __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
    var src_exports = {};
    __export2(src_exports, {
      AddLocation: () => add_location_default,
      Aim: () => aim_default,
      AlarmClock: () => alarm_clock_default,
      Apple: () => apple_default,
      ArrowDown: () => arrow_down_default,
      ArrowDownBold: () => arrow_down_bold_default,
      ArrowLeft: () => arrow_left_default,
      ArrowLeftBold: () => arrow_left_bold_default,
      ArrowRight: () => arrow_right_default,
      ArrowRightBold: () => arrow_right_bold_default,
      ArrowUp: () => arrow_up_default,
      ArrowUpBold: () => arrow_up_bold_default,
      Avatar: () => avatar_default,
      Back: () => back_default,
      Baseball: () => baseball_default,
      Basketball: () => basketball_default,
      Bell: () => bell_default,
      BellFilled: () => bell_filled_default,
      Bicycle: () => bicycle_default,
      Bottom: () => bottom_default,
      BottomLeft: () => bottom_left_default,
      BottomRight: () => bottom_right_default,
      Bowl: () => bowl_default,
      Box: () => box_default,
      Briefcase: () => briefcase_default,
      Brush: () => brush_default,
      BrushFilled: () => brush_filled_default,
      Burger: () => burger_default,
      Calendar: () => calendar_default,
      Camera: () => camera_default,
      CameraFilled: () => camera_filled_default,
      CaretBottom: () => caret_bottom_default,
      CaretLeft: () => caret_left_default,
      CaretRight: () => caret_right_default,
      CaretTop: () => caret_top_default,
      Cellphone: () => cellphone_default,
      ChatDotRound: () => chat_dot_round_default,
      ChatDotSquare: () => chat_dot_square_default,
      ChatLineRound: () => chat_line_round_default,
      ChatLineSquare: () => chat_line_square_default,
      ChatRound: () => chat_round_default,
      ChatSquare: () => chat_square_default,
      Check: () => check_default,
      Checked: () => checked_default,
      Cherry: () => cherry_default,
      Chicken: () => chicken_default,
      CircleCheck: () => circle_check_default,
      CircleCheckFilled: () => circle_check_filled_default,
      CircleClose: () => circle_close_default,
      CircleCloseFilled: () => circle_close_filled_default,
      CirclePlus: () => circle_plus_default,
      CirclePlusFilled: () => circle_plus_filled_default,
      Clock: () => clock_default,
      Close: () => close_default,
      CloseBold: () => close_bold_default,
      Cloudy: () => cloudy_default,
      Coffee: () => coffee_default,
      CoffeeCup: () => coffee_cup_default,
      Coin: () => coin_default,
      ColdDrink: () => cold_drink_default,
      Collection: () => collection_default,
      CollectionTag: () => collection_tag_default,
      Comment: () => comment_default,
      Compass: () => compass_default,
      Connection: () => connection_default,
      Coordinate: () => coordinate_default,
      CopyDocument: () => copy_document_default,
      Cpu: () => cpu_default,
      CreditCard: () => credit_card_default,
      Crop: () => crop_default,
      DArrowLeft: () => d_arrow_left_default,
      DArrowRight: () => d_arrow_right_default,
      DCaret: () => d_caret_default,
      DataAnalysis: () => data_analysis_default,
      DataBoard: () => data_board_default,
      DataLine: () => data_line_default,
      Delete: () => delete_default,
      DeleteFilled: () => delete_filled_default,
      DeleteLocation: () => delete_location_default,
      Dessert: () => dessert_default,
      Discount: () => discount_default,
      Dish: () => dish_default,
      DishDot: () => dish_dot_default,
      Document: () => document_default,
      DocumentAdd: () => document_add_default,
      DocumentChecked: () => document_checked_default,
      DocumentCopy: () => document_copy_default,
      DocumentDelete: () => document_delete_default,
      DocumentRemove: () => document_remove_default,
      Download: () => download_default,
      Drizzling: () => drizzling_default,
      Edit: () => edit_default,
      EditPen: () => edit_pen_default,
      Eleme: () => eleme_default,
      ElemeFilled: () => eleme_filled_default,
      ElementPlus: () => element_plus_default,
      Expand: () => expand_default,
      Failed: () => failed_default,
      Female: () => female_default,
      Files: () => files_default,
      Film: () => film_default,
      Filter: () => filter_default,
      Finished: () => finished_default,
      FirstAidKit: () => first_aid_kit_default,
      Flag: () => flag_default,
      Fold: () => fold_default,
      Folder: () => folder_default,
      FolderAdd: () => folder_add_default,
      FolderChecked: () => folder_checked_default,
      FolderDelete: () => folder_delete_default,
      FolderOpened: () => folder_opened_default,
      FolderRemove: () => folder_remove_default,
      Food: () => food_default,
      Football: () => football_default,
      ForkSpoon: () => fork_spoon_default,
      Fries: () => fries_default,
      FullScreen: () => full_screen_default,
      Goblet: () => goblet_default,
      GobletFull: () => goblet_full_default,
      GobletSquare: () => goblet_square_default,
      GobletSquareFull: () => goblet_square_full_default,
      Goods: () => goods_default,
      GoodsFilled: () => goods_filled_default,
      Grape: () => grape_default,
      Grid: () => grid_default,
      Guide: () => guide_default,
      Headset: () => headset_default,
      Help: () => help_default,
      HelpFilled: () => help_filled_default,
      Hide: () => hide_default,
      Histogram: () => histogram_default,
      HomeFilled: () => home_filled_default,
      HotWater: () => hot_water_default,
      House: () => house_default,
      IceCream: () => ice_cream_default,
      IceCreamRound: () => ice_cream_round_default,
      IceCreamSquare: () => ice_cream_square_default,
      IceDrink: () => ice_drink_default,
      IceTea: () => ice_tea_default,
      InfoFilled: () => info_filled_default,
      Iphone: () => iphone_default,
      Key: () => key_default,
      KnifeFork: () => knife_fork_default,
      Lightning: () => lightning_default,
      Link: () => link_default,
      List: () => list_default,
      Loading: () => loading_default,
      Location: () => location_default,
      LocationFilled: () => location_filled_default,
      LocationInformation: () => location_information_default,
      Lock: () => lock_default,
      Lollipop: () => lollipop_default,
      MagicStick: () => magic_stick_default,
      Magnet: () => magnet_default,
      Male: () => male_default,
      Management: () => management_default,
      MapLocation: () => map_location_default,
      Medal: () => medal_default,
      Menu: () => menu_default,
      Message: () => message_default,
      MessageBox: () => message_box_default,
      Mic: () => mic_default,
      Microphone: () => microphone_default,
      MilkTea: () => milk_tea_default,
      Minus: () => minus_default,
      Money: () => money_default,
      Monitor: () => monitor_default,
      Moon: () => moon_default,
      MoonNight: () => moon_night_default,
      More: () => more_default,
      MoreFilled: () => more_filled_default,
      MostlyCloudy: () => mostly_cloudy_default,
      Mouse: () => mouse_default,
      Mug: () => mug_default,
      Mute: () => mute_default,
      MuteNotification: () => mute_notification_default,
      NoSmoking: () => no_smoking_default,
      Notebook: () => notebook_default,
      Notification: () => notification_default,
      Odometer: () => odometer_default,
      OfficeBuilding: () => office_building_default,
      Open: () => open_default,
      Operation: () => operation_default,
      Opportunity: () => opportunity_default,
      Orange: () => orange_default,
      Paperclip: () => paperclip_default,
      PartlyCloudy: () => partly_cloudy_default,
      Pear: () => pear_default,
      Phone: () => phone_default,
      PhoneFilled: () => phone_filled_default,
      Picture: () => picture_default,
      PictureFilled: () => picture_filled_default,
      PictureRounded: () => picture_rounded_default,
      PieChart: () => pie_chart_default,
      Place: () => place_default,
      Platform: () => platform_default,
      Plus: () => plus_default,
      Pointer: () => pointer_default,
      Position: () => position_default,
      Postcard: () => postcard_default,
      Pouring: () => pouring_default,
      Present: () => present_default,
      PriceTag: () => price_tag_default,
      Printer: () => printer_default,
      Promotion: () => promotion_default,
      QuestionFilled: () => question_filled_default,
      Rank: () => rank_default,
      Reading: () => reading_default,
      ReadingLamp: () => reading_lamp_default,
      Refresh: () => refresh_default,
      RefreshLeft: () => refresh_left_default,
      RefreshRight: () => refresh_right_default,
      Refrigerator: () => refrigerator_default,
      Remove: () => remove_default,
      RemoveFilled: () => remove_filled_default,
      Right: () => right_default,
      ScaleToOriginal: () => scale_to_original_default,
      School: () => school_default,
      Scissor: () => scissor_default,
      Search: () => search_default,
      Select: () => select_default,
      Sell: () => sell_default,
      SemiSelect: () => semi_select_default,
      Service: () => service_default,
      SetUp: () => set_up_default,
      Setting: () => setting_default,
      Share: () => share_default,
      Ship: () => ship_default,
      Shop: () => shop_default,
      ShoppingBag: () => shopping_bag_default,
      ShoppingCart: () => shopping_cart_default,
      ShoppingCartFull: () => shopping_cart_full_default,
      Smoking: () => smoking_default,
      Soccer: () => soccer_default,
      SoldOut: () => sold_out_default,
      Sort: () => sort_default,
      SortDown: () => sort_down_default,
      SortUp: () => sort_up_default,
      Stamp: () => stamp_default,
      Star: () => star_default,
      StarFilled: () => star_filled_default,
      Stopwatch: () => stopwatch_default,
      SuccessFilled: () => success_filled_default,
      Sugar: () => sugar_default,
      Suitcase: () => suitcase_default,
      Sunny: () => sunny_default,
      Sunrise: () => sunrise_default,
      Sunset: () => sunset_default,
      Switch: () => switch_default,
      SwitchButton: () => switch_button_default,
      TakeawayBox: () => takeaway_box_default,
      Ticket: () => ticket_default,
      Tickets: () => tickets_default,
      Timer: () => timer_default,
      ToiletPaper: () => toilet_paper_default,
      Tools: () => tools_default,
      Top: () => top_default,
      TopLeft: () => top_left_default,
      TopRight: () => top_right_default,
      TrendCharts: () => trend_charts_default,
      Trophy: () => trophy_default,
      TurnOff: () => turn_off_default,
      Umbrella: () => umbrella_default,
      Unlock: () => unlock_default,
      Upload: () => upload_default,
      UploadFilled: () => upload_filled_default,
      User: () => user_default,
      UserFilled: () => user_filled_default,
      Van: () => van_default,
      VideoCamera: () => video_camera_default,
      VideoCameraFilled: () => video_camera_filled_default,
      VideoPause: () => video_pause_default,
      VideoPlay: () => video_play_default,
      View: () => view_default,
      Wallet: () => wallet_default,
      WalletFilled: () => wallet_filled_default,
      Warning: () => warning_default,
      WarningFilled: () => warning_filled_default,
      Watch: () => watch_default,
      Watermelon: () => watermelon_default,
      WindPower: () => wind_power_default,
      ZoomIn: () => zoom_in_default,
      ZoomOut: () => zoom_out_default,
      default: () => src_default,
      icons: () => components_exports
    });
    module.exports = __toCommonJS2(src_exports);
    var components_exports = {};
    __export2(components_exports, {
      AddLocation: () => add_location_default,
      Aim: () => aim_default,
      AlarmClock: () => alarm_clock_default,
      Apple: () => apple_default,
      ArrowDown: () => arrow_down_default,
      ArrowDownBold: () => arrow_down_bold_default,
      ArrowLeft: () => arrow_left_default,
      ArrowLeftBold: () => arrow_left_bold_default,
      ArrowRight: () => arrow_right_default,
      ArrowRightBold: () => arrow_right_bold_default,
      ArrowUp: () => arrow_up_default,
      ArrowUpBold: () => arrow_up_bold_default,
      Avatar: () => avatar_default,
      Back: () => back_default,
      Baseball: () => baseball_default,
      Basketball: () => basketball_default,
      Bell: () => bell_default,
      BellFilled: () => bell_filled_default,
      Bicycle: () => bicycle_default,
      Bottom: () => bottom_default,
      BottomLeft: () => bottom_left_default,
      BottomRight: () => bottom_right_default,
      Bowl: () => bowl_default,
      Box: () => box_default,
      Briefcase: () => briefcase_default,
      Brush: () => brush_default,
      BrushFilled: () => brush_filled_default,
      Burger: () => burger_default,
      Calendar: () => calendar_default,
      Camera: () => camera_default,
      CameraFilled: () => camera_filled_default,
      CaretBottom: () => caret_bottom_default,
      CaretLeft: () => caret_left_default,
      CaretRight: () => caret_right_default,
      CaretTop: () => caret_top_default,
      Cellphone: () => cellphone_default,
      ChatDotRound: () => chat_dot_round_default,
      ChatDotSquare: () => chat_dot_square_default,
      ChatLineRound: () => chat_line_round_default,
      ChatLineSquare: () => chat_line_square_default,
      ChatRound: () => chat_round_default,
      ChatSquare: () => chat_square_default,
      Check: () => check_default,
      Checked: () => checked_default,
      Cherry: () => cherry_default,
      Chicken: () => chicken_default,
      CircleCheck: () => circle_check_default,
      CircleCheckFilled: () => circle_check_filled_default,
      CircleClose: () => circle_close_default,
      CircleCloseFilled: () => circle_close_filled_default,
      CirclePlus: () => circle_plus_default,
      CirclePlusFilled: () => circle_plus_filled_default,
      Clock: () => clock_default,
      Close: () => close_default,
      CloseBold: () => close_bold_default,
      Cloudy: () => cloudy_default,
      Coffee: () => coffee_default,
      CoffeeCup: () => coffee_cup_default,
      Coin: () => coin_default,
      ColdDrink: () => cold_drink_default,
      Collection: () => collection_default,
      CollectionTag: () => collection_tag_default,
      Comment: () => comment_default,
      Compass: () => compass_default,
      Connection: () => connection_default,
      Coordinate: () => coordinate_default,
      CopyDocument: () => copy_document_default,
      Cpu: () => cpu_default,
      CreditCard: () => credit_card_default,
      Crop: () => crop_default,
      DArrowLeft: () => d_arrow_left_default,
      DArrowRight: () => d_arrow_right_default,
      DCaret: () => d_caret_default,
      DataAnalysis: () => data_analysis_default,
      DataBoard: () => data_board_default,
      DataLine: () => data_line_default,
      Delete: () => delete_default,
      DeleteFilled: () => delete_filled_default,
      DeleteLocation: () => delete_location_default,
      Dessert: () => dessert_default,
      Discount: () => discount_default,
      Dish: () => dish_default,
      DishDot: () => dish_dot_default,
      Document: () => document_default,
      DocumentAdd: () => document_add_default,
      DocumentChecked: () => document_checked_default,
      DocumentCopy: () => document_copy_default,
      DocumentDelete: () => document_delete_default,
      DocumentRemove: () => document_remove_default,
      Download: () => download_default,
      Drizzling: () => drizzling_default,
      Edit: () => edit_default,
      EditPen: () => edit_pen_default,
      Eleme: () => eleme_default,
      ElemeFilled: () => eleme_filled_default,
      ElementPlus: () => element_plus_default,
      Expand: () => expand_default,
      Failed: () => failed_default,
      Female: () => female_default,
      Files: () => files_default,
      Film: () => film_default,
      Filter: () => filter_default,
      Finished: () => finished_default,
      FirstAidKit: () => first_aid_kit_default,
      Flag: () => flag_default,
      Fold: () => fold_default,
      Folder: () => folder_default,
      FolderAdd: () => folder_add_default,
      FolderChecked: () => folder_checked_default,
      FolderDelete: () => folder_delete_default,
      FolderOpened: () => folder_opened_default,
      FolderRemove: () => folder_remove_default,
      Food: () => food_default,
      Football: () => football_default,
      ForkSpoon: () => fork_spoon_default,
      Fries: () => fries_default,
      FullScreen: () => full_screen_default,
      Goblet: () => goblet_default,
      GobletFull: () => goblet_full_default,
      GobletSquare: () => goblet_square_default,
      GobletSquareFull: () => goblet_square_full_default,
      Goods: () => goods_default,
      GoodsFilled: () => goods_filled_default,
      Grape: () => grape_default,
      Grid: () => grid_default,
      Guide: () => guide_default,
      Headset: () => headset_default,
      Help: () => help_default,
      HelpFilled: () => help_filled_default,
      Hide: () => hide_default,
      Histogram: () => histogram_default,
      HomeFilled: () => home_filled_default,
      HotWater: () => hot_water_default,
      House: () => house_default,
      IceCream: () => ice_cream_default,
      IceCreamRound: () => ice_cream_round_default,
      IceCreamSquare: () => ice_cream_square_default,
      IceDrink: () => ice_drink_default,
      IceTea: () => ice_tea_default,
      InfoFilled: () => info_filled_default,
      Iphone: () => iphone_default,
      Key: () => key_default,
      KnifeFork: () => knife_fork_default,
      Lightning: () => lightning_default,
      Link: () => link_default,
      List: () => list_default,
      Loading: () => loading_default,
      Location: () => location_default,
      LocationFilled: () => location_filled_default,
      LocationInformation: () => location_information_default,
      Lock: () => lock_default,
      Lollipop: () => lollipop_default,
      MagicStick: () => magic_stick_default,
      Magnet: () => magnet_default,
      Male: () => male_default,
      Management: () => management_default,
      MapLocation: () => map_location_default,
      Medal: () => medal_default,
      Menu: () => menu_default,
      Message: () => message_default,
      MessageBox: () => message_box_default,
      Mic: () => mic_default,
      Microphone: () => microphone_default,
      MilkTea: () => milk_tea_default,
      Minus: () => minus_default,
      Money: () => money_default,
      Monitor: () => monitor_default,
      Moon: () => moon_default,
      MoonNight: () => moon_night_default,
      More: () => more_default,
      MoreFilled: () => more_filled_default,
      MostlyCloudy: () => mostly_cloudy_default,
      Mouse: () => mouse_default,
      Mug: () => mug_default,
      Mute: () => mute_default,
      MuteNotification: () => mute_notification_default,
      NoSmoking: () => no_smoking_default,
      Notebook: () => notebook_default,
      Notification: () => notification_default,
      Odometer: () => odometer_default,
      OfficeBuilding: () => office_building_default,
      Open: () => open_default,
      Operation: () => operation_default,
      Opportunity: () => opportunity_default,
      Orange: () => orange_default,
      Paperclip: () => paperclip_default,
      PartlyCloudy: () => partly_cloudy_default,
      Pear: () => pear_default,
      Phone: () => phone_default,
      PhoneFilled: () => phone_filled_default,
      Picture: () => picture_default,
      PictureFilled: () => picture_filled_default,
      PictureRounded: () => picture_rounded_default,
      PieChart: () => pie_chart_default,
      Place: () => place_default,
      Platform: () => platform_default,
      Plus: () => plus_default,
      Pointer: () => pointer_default,
      Position: () => position_default,
      Postcard: () => postcard_default,
      Pouring: () => pouring_default,
      Present: () => present_default,
      PriceTag: () => price_tag_default,
      Printer: () => printer_default,
      Promotion: () => promotion_default,
      QuestionFilled: () => question_filled_default,
      Rank: () => rank_default,
      Reading: () => reading_default,
      ReadingLamp: () => reading_lamp_default,
      Refresh: () => refresh_default,
      RefreshLeft: () => refresh_left_default,
      RefreshRight: () => refresh_right_default,
      Refrigerator: () => refrigerator_default,
      Remove: () => remove_default,
      RemoveFilled: () => remove_filled_default,
      Right: () => right_default,
      ScaleToOriginal: () => scale_to_original_default,
      School: () => school_default,
      Scissor: () => scissor_default,
      Search: () => search_default,
      Select: () => select_default,
      Sell: () => sell_default,
      SemiSelect: () => semi_select_default,
      Service: () => service_default,
      SetUp: () => set_up_default,
      Setting: () => setting_default,
      Share: () => share_default,
      Ship: () => ship_default,
      Shop: () => shop_default,
      ShoppingBag: () => shopping_bag_default,
      ShoppingCart: () => shopping_cart_default,
      ShoppingCartFull: () => shopping_cart_full_default,
      Smoking: () => smoking_default,
      Soccer: () => soccer_default,
      SoldOut: () => sold_out_default,
      Sort: () => sort_default,
      SortDown: () => sort_down_default,
      SortUp: () => sort_up_default,
      Stamp: () => stamp_default,
      Star: () => star_default,
      StarFilled: () => star_filled_default,
      Stopwatch: () => stopwatch_default,
      SuccessFilled: () => success_filled_default,
      Sugar: () => sugar_default,
      Suitcase: () => suitcase_default,
      Sunny: () => sunny_default,
      Sunrise: () => sunrise_default,
      Sunset: () => sunset_default,
      Switch: () => switch_default,
      SwitchButton: () => switch_button_default,
      TakeawayBox: () => takeaway_box_default,
      Ticket: () => ticket_default,
      Tickets: () => tickets_default,
      Timer: () => timer_default,
      ToiletPaper: () => toilet_paper_default,
      Tools: () => tools_default,
      Top: () => top_default,
      TopLeft: () => top_left_default,
      TopRight: () => top_right_default,
      TrendCharts: () => trend_charts_default,
      Trophy: () => trophy_default,
      TurnOff: () => turn_off_default,
      Umbrella: () => umbrella_default,
      Unlock: () => unlock_default,
      Upload: () => upload_default,
      UploadFilled: () => upload_filled_default,
      User: () => user_default,
      UserFilled: () => user_filled_default,
      Van: () => van_default,
      VideoCamera: () => video_camera_default,
      VideoCameraFilled: () => video_camera_filled_default,
      VideoPause: () => video_pause_default,
      VideoPlay: () => video_play_default,
      View: () => view_default,
      Wallet: () => wallet_default,
      WalletFilled: () => wallet_filled_default,
      Warning: () => warning_default,
      WarningFilled: () => warning_filled_default,
      Watch: () => watch_default,
      Watermelon: () => watermelon_default,
      WindPower: () => wind_power_default,
      ZoomIn: () => zoom_in_default,
      ZoomOut: () => zoom_out_default
    });
    var import_vue = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var plugin_vue_export_helper_default = (sfc, props) => {
      const target = sfc.__vccOpts || sfc;
      for (const [key, val] of props) {
        target[key] = val;
      }
      return target;
    };
    var _sfc_main = {
      name: "AddLocation"
    };
    var _hoisted_1 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2 = (0, import_vue.createElementVNode)("path", {
      fill: "currentColor",
      d: "M288 896h448q32 0 32 32t-32 32H288q-32 0-32-32t32-32z"
    }, null, -1);
    var _hoisted_3 = (0, import_vue.createElementVNode)("path", {
      fill: "currentColor",
      d: "M800 416a288 288 0 1 0-576 0c0 118.144 94.528 272.128 288 456.576C705.472 688.128 800 534.144 800 416zM512 960C277.312 746.688 160 565.312 160 416a352 352 0 0 1 704 0c0 149.312-117.312 330.688-352 544z"
    }, null, -1);
    var _hoisted_4 = (0, import_vue.createElementVNode)("path", {
      fill: "currentColor",
      d: "M544 384h96a32 32 0 1 1 0 64h-96v96a32 32 0 0 1-64 0v-96h-96a32 32 0 0 1 0-64h96v-96a32 32 0 0 1 64 0v96z"
    }, null, -1);
    var _hoisted_5 = [
      _hoisted_2,
      _hoisted_3,
      _hoisted_4
    ];
    function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue.openBlock)(), (0, import_vue.createElementBlock)("svg", _hoisted_1, _hoisted_5);
    }
    var add_location_default = plugin_vue_export_helper_default(_sfc_main, [["render", _sfc_render], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/add-location.vue"]]);
    var import_vue2 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main2 = {
      name: "Aim"
    };
    var _hoisted_12 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_22 = (0, import_vue2.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
    }, null, -1);
    var _hoisted_32 = (0, import_vue2.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 96a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V128a32 32 0 0 1 32-32zm0 576a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V704a32 32 0 0 1 32-32zM96 512a32 32 0 0 1 32-32h192a32 32 0 0 1 0 64H128a32 32 0 0 1-32-32zm576 0a32 32 0 0 1 32-32h192a32 32 0 1 1 0 64H704a32 32 0 0 1-32-32z"
    }, null, -1);
    var _hoisted_42 = [
      _hoisted_22,
      _hoisted_32
    ];
    function _sfc_render2(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("svg", _hoisted_12, _hoisted_42);
    }
    var aim_default = plugin_vue_export_helper_default(_sfc_main2, [["render", _sfc_render2], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/aim.vue"]]);
    var import_vue3 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main3 = {
      name: "AlarmClock"
    };
    var _hoisted_13 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_23 = (0, import_vue3.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 832a320 320 0 1 0 0-640 320 320 0 0 0 0 640zm0 64a384 384 0 1 1 0-768 384 384 0 0 1 0 768z"
    }, null, -1);
    var _hoisted_33 = (0, import_vue3.createElementVNode)("path", {
      fill: "currentColor",
      d: "m292.288 824.576 55.424 32-48 83.136a32 32 0 1 1-55.424-32l48-83.136zm439.424 0-55.424 32 48 83.136a32 32 0 1 0 55.424-32l-48-83.136zM512 512h160a32 32 0 1 1 0 64H480a32 32 0 0 1-32-32V320a32 32 0 0 1 64 0v192zM90.496 312.256A160 160 0 0 1 312.32 90.496l-46.848 46.848a96 96 0 0 0-128 128L90.56 312.256zm835.264 0A160 160 0 0 0 704 90.496l46.848 46.848a96 96 0 0 1 128 128l46.912 46.912z"
    }, null, -1);
    var _hoisted_43 = [
      _hoisted_23,
      _hoisted_33
    ];
    function _sfc_render3(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue3.openBlock)(), (0, import_vue3.createElementBlock)("svg", _hoisted_13, _hoisted_43);
    }
    var alarm_clock_default = plugin_vue_export_helper_default(_sfc_main3, [["render", _sfc_render3], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/alarm-clock.vue"]]);
    var import_vue4 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main4 = {
      name: "Apple"
    };
    var _hoisted_14 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_24 = (0, import_vue4.createElementVNode)("path", {
      fill: "currentColor",
      d: "M599.872 203.776a189.44 189.44 0 0 1 64.384-4.672l2.624.128c31.168 1.024 51.2 4.096 79.488 16.32 37.632 16.128 74.496 45.056 111.488 89.344 96.384 115.264 82.752 372.8-34.752 521.728-7.68 9.728-32 41.6-30.72 39.936a426.624 426.624 0 0 1-30.08 35.776c-31.232 32.576-65.28 49.216-110.08 50.048-31.36.64-53.568-5.312-84.288-18.752l-6.528-2.88c-20.992-9.216-30.592-11.904-47.296-11.904-18.112 0-28.608 2.88-51.136 12.672l-6.464 2.816c-28.416 12.224-48.32 18.048-76.16 19.2-74.112 2.752-116.928-38.08-180.672-132.16-96.64-142.08-132.608-349.312-55.04-486.4 46.272-81.92 129.92-133.632 220.672-135.04 32.832-.576 60.288 6.848 99.648 22.72 27.136 10.88 34.752 13.76 37.376 14.272 16.256-20.16 27.776-36.992 34.56-50.24 13.568-26.304 27.2-59.968 40.704-100.8a32 32 0 1 1 60.8 20.224c-12.608 37.888-25.408 70.4-38.528 97.664zm-51.52 78.08c-14.528 17.792-31.808 37.376-51.904 58.816a32 32 0 1 1-46.72-43.776l12.288-13.248c-28.032-11.2-61.248-26.688-95.68-26.112-70.4 1.088-135.296 41.6-171.648 105.792C121.6 492.608 176 684.16 247.296 788.992c34.816 51.328 76.352 108.992 130.944 106.944 52.48-2.112 72.32-34.688 135.872-34.688 63.552 0 81.28 34.688 136.96 33.536 56.448-1.088 75.776-39.04 126.848-103.872 107.904-136.768 107.904-362.752 35.776-449.088-72.192-86.272-124.672-84.096-151.68-85.12-41.472-4.288-81.6 12.544-113.664 25.152z"
    }, null, -1);
    var _hoisted_34 = [
      _hoisted_24
    ];
    function _sfc_render4(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue4.openBlock)(), (0, import_vue4.createElementBlock)("svg", _hoisted_14, _hoisted_34);
    }
    var apple_default = plugin_vue_export_helper_default(_sfc_main4, [["render", _sfc_render4], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/apple.vue"]]);
    var import_vue5 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main5 = {
      name: "ArrowDownBold"
    };
    var _hoisted_15 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_25 = (0, import_vue5.createElementVNode)("path", {
      fill: "currentColor",
      d: "M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8 316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496z"
    }, null, -1);
    var _hoisted_35 = [
      _hoisted_25
    ];
    function _sfc_render5(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue5.openBlock)(), (0, import_vue5.createElementBlock)("svg", _hoisted_15, _hoisted_35);
    }
    var arrow_down_bold_default = plugin_vue_export_helper_default(_sfc_main5, [["render", _sfc_render5], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/arrow-down-bold.vue"]]);
    var import_vue6 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main6 = {
      name: "ArrowDown"
    };
    var _hoisted_16 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_26 = (0, import_vue6.createElementVNode)("path", {
      fill: "currentColor",
      d: "M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"
    }, null, -1);
    var _hoisted_36 = [
      _hoisted_26
    ];
    function _sfc_render6(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue6.openBlock)(), (0, import_vue6.createElementBlock)("svg", _hoisted_16, _hoisted_36);
    }
    var arrow_down_default = plugin_vue_export_helper_default(_sfc_main6, [["render", _sfc_render6], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/arrow-down.vue"]]);
    var import_vue7 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main7 = {
      name: "ArrowLeftBold"
    };
    var _hoisted_17 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_27 = (0, import_vue7.createElementVNode)("path", {
      fill: "currentColor",
      d: "M685.248 104.704a64 64 0 0 1 0 90.496L368.448 512l316.8 316.8a64 64 0 0 1-90.496 90.496L232.704 557.248a64 64 0 0 1 0-90.496l362.048-362.048a64 64 0 0 1 90.496 0z"
    }, null, -1);
    var _hoisted_37 = [
      _hoisted_27
    ];
    function _sfc_render7(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue7.openBlock)(), (0, import_vue7.createElementBlock)("svg", _hoisted_17, _hoisted_37);
    }
    var arrow_left_bold_default = plugin_vue_export_helper_default(_sfc_main7, [["render", _sfc_render7], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/arrow-left-bold.vue"]]);
    var import_vue8 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main8 = {
      name: "ArrowLeft"
    };
    var _hoisted_18 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_28 = (0, import_vue8.createElementVNode)("path", {
      fill: "currentColor",
      d: "M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0z"
    }, null, -1);
    var _hoisted_38 = [
      _hoisted_28
    ];
    function _sfc_render8(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue8.openBlock)(), (0, import_vue8.createElementBlock)("svg", _hoisted_18, _hoisted_38);
    }
    var arrow_left_default = plugin_vue_export_helper_default(_sfc_main8, [["render", _sfc_render8], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/arrow-left.vue"]]);
    var import_vue9 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main9 = {
      name: "ArrowRightBold"
    };
    var _hoisted_19 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_29 = (0, import_vue9.createElementVNode)("path", {
      fill: "currentColor",
      d: "M338.752 104.704a64 64 0 0 0 0 90.496l316.8 316.8-316.8 316.8a64 64 0 0 0 90.496 90.496l362.048-362.048a64 64 0 0 0 0-90.496L429.248 104.704a64 64 0 0 0-90.496 0z"
    }, null, -1);
    var _hoisted_39 = [
      _hoisted_29
    ];
    function _sfc_render9(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue9.openBlock)(), (0, import_vue9.createElementBlock)("svg", _hoisted_19, _hoisted_39);
    }
    var arrow_right_bold_default = plugin_vue_export_helper_default(_sfc_main9, [["render", _sfc_render9], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/arrow-right-bold.vue"]]);
    var import_vue10 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main10 = {
      name: "ArrowRight"
    };
    var _hoisted_110 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_210 = (0, import_vue10.createElementVNode)("path", {
      fill: "currentColor",
      d: "M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
    }, null, -1);
    var _hoisted_310 = [
      _hoisted_210
    ];
    function _sfc_render10(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue10.openBlock)(), (0, import_vue10.createElementBlock)("svg", _hoisted_110, _hoisted_310);
    }
    var arrow_right_default = plugin_vue_export_helper_default(_sfc_main10, [["render", _sfc_render10], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/arrow-right.vue"]]);
    var import_vue11 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main11 = {
      name: "ArrowUpBold"
    };
    var _hoisted_111 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_211 = (0, import_vue11.createElementVNode)("path", {
      fill: "currentColor",
      d: "M104.704 685.248a64 64 0 0 0 90.496 0l316.8-316.8 316.8 316.8a64 64 0 0 0 90.496-90.496L557.248 232.704a64 64 0 0 0-90.496 0L104.704 594.752a64 64 0 0 0 0 90.496z"
    }, null, -1);
    var _hoisted_311 = [
      _hoisted_211
    ];
    function _sfc_render11(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue11.openBlock)(), (0, import_vue11.createElementBlock)("svg", _hoisted_111, _hoisted_311);
    }
    var arrow_up_bold_default = plugin_vue_export_helper_default(_sfc_main11, [["render", _sfc_render11], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/arrow-up-bold.vue"]]);
    var import_vue12 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main12 = {
      name: "ArrowUp"
    };
    var _hoisted_112 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_212 = (0, import_vue12.createElementVNode)("path", {
      fill: "currentColor",
      d: "m488.832 344.32-339.84 356.672a32 32 0 0 0 0 44.16l.384.384a29.44 29.44 0 0 0 42.688 0l320-335.872 319.872 335.872a29.44 29.44 0 0 0 42.688 0l.384-.384a32 32 0 0 0 0-44.16L535.168 344.32a32 32 0 0 0-46.336 0z"
    }, null, -1);
    var _hoisted_312 = [
      _hoisted_212
    ];
    function _sfc_render12(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue12.openBlock)(), (0, import_vue12.createElementBlock)("svg", _hoisted_112, _hoisted_312);
    }
    var arrow_up_default = plugin_vue_export_helper_default(_sfc_main12, [["render", _sfc_render12], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/arrow-up.vue"]]);
    var import_vue13 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main13 = {
      name: "Avatar"
    };
    var _hoisted_113 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_213 = (0, import_vue13.createElementVNode)("path", {
      fill: "currentColor",
      d: "M628.736 528.896A416 416 0 0 1 928 928H96a415.872 415.872 0 0 1 299.264-399.104L512 704l116.736-175.104zM720 304a208 208 0 1 1-416 0 208 208 0 0 1 416 0z"
    }, null, -1);
    var _hoisted_313 = [
      _hoisted_213
    ];
    function _sfc_render13(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue13.openBlock)(), (0, import_vue13.createElementBlock)("svg", _hoisted_113, _hoisted_313);
    }
    var avatar_default = plugin_vue_export_helper_default(_sfc_main13, [["render", _sfc_render13], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/avatar.vue"]]);
    var import_vue14 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main14 = {
      name: "Back"
    };
    var _hoisted_114 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_214 = (0, import_vue14.createElementVNode)("path", {
      fill: "currentColor",
      d: "M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
    }, null, -1);
    var _hoisted_314 = (0, import_vue14.createElementVNode)("path", {
      fill: "currentColor",
      d: "m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
    }, null, -1);
    var _hoisted_44 = [
      _hoisted_214,
      _hoisted_314
    ];
    function _sfc_render14(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue14.openBlock)(), (0, import_vue14.createElementBlock)("svg", _hoisted_114, _hoisted_44);
    }
    var back_default = plugin_vue_export_helper_default(_sfc_main14, [["render", _sfc_render14], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/back.vue"]]);
    var import_vue15 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main15 = {
      name: "Baseball"
    };
    var _hoisted_115 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_215 = (0, import_vue15.createElementVNode)("path", {
      fill: "currentColor",
      d: "M195.2 828.8a448 448 0 1 1 633.6-633.6 448 448 0 0 1-633.6 633.6zm45.248-45.248a384 384 0 1 0 543.104-543.104 384 384 0 0 0-543.104 543.104z"
    }, null, -1);
    var _hoisted_315 = (0, import_vue15.createElementVNode)("path", {
      fill: "currentColor",
      d: "M497.472 96.896c22.784 4.672 44.416 9.472 64.896 14.528a256.128 256.128 0 0 0 350.208 350.208c5.056 20.48 9.856 42.112 14.528 64.896A320.128 320.128 0 0 1 497.472 96.896zM108.48 491.904a320.128 320.128 0 0 1 423.616 423.68c-23.04-3.648-44.992-7.424-65.728-11.52a256.128 256.128 0 0 0-346.496-346.432 1736.64 1736.64 0 0 1-11.392-65.728z"
    }, null, -1);
    var _hoisted_45 = [
      _hoisted_215,
      _hoisted_315
    ];
    function _sfc_render15(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue15.openBlock)(), (0, import_vue15.createElementBlock)("svg", _hoisted_115, _hoisted_45);
    }
    var baseball_default = plugin_vue_export_helper_default(_sfc_main15, [["render", _sfc_render15], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/baseball.vue"]]);
    var import_vue16 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main16 = {
      name: "Basketball"
    };
    var _hoisted_116 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_216 = (0, import_vue16.createElementVNode)("path", {
      fill: "currentColor",
      d: "M778.752 788.224a382.464 382.464 0 0 0 116.032-245.632 256.512 256.512 0 0 0-241.728-13.952 762.88 762.88 0 0 1 125.696 259.584zm-55.04 44.224a699.648 699.648 0 0 0-125.056-269.632 256.128 256.128 0 0 0-56.064 331.968 382.72 382.72 0 0 0 181.12-62.336zm-254.08 61.248A320.128 320.128 0 0 1 557.76 513.6a715.84 715.84 0 0 0-48.192-48.128 320.128 320.128 0 0 1-379.264 88.384 382.4 382.4 0 0 0 110.144 229.696 382.4 382.4 0 0 0 229.184 110.08zM129.28 481.088a256.128 256.128 0 0 0 331.072-56.448 699.648 699.648 0 0 0-268.8-124.352 382.656 382.656 0 0 0-62.272 180.8zm106.56-235.84a762.88 762.88 0 0 1 258.688 125.056 256.512 256.512 0 0 0-13.44-241.088A382.464 382.464 0 0 0 235.84 245.248zm318.08-114.944c40.576 89.536 37.76 193.92-8.448 281.344a779.84 779.84 0 0 1 66.176 66.112 320.832 320.832 0 0 1 282.112-8.128 382.4 382.4 0 0 0-110.144-229.12 382.4 382.4 0 0 0-229.632-110.208zM828.8 828.8a448 448 0 1 1-633.6-633.6 448 448 0 0 1 633.6 633.6z"
    }, null, -1);
    var _hoisted_316 = [
      _hoisted_216
    ];
    function _sfc_render16(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue16.openBlock)(), (0, import_vue16.createElementBlock)("svg", _hoisted_116, _hoisted_316);
    }
    var basketball_default = plugin_vue_export_helper_default(_sfc_main16, [["render", _sfc_render16], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/basketball.vue"]]);
    var import_vue17 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main17 = {
      name: "BellFilled"
    };
    var _hoisted_117 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_217 = (0, import_vue17.createElementVNode)("path", {
      fill: "currentColor",
      d: "M640 832a128 128 0 0 1-256 0h256zm192-64H134.4a38.4 38.4 0 0 1 0-76.8H192V448c0-154.88 110.08-284.16 256.32-313.6a64 64 0 1 1 127.36 0A320.128 320.128 0 0 1 832 448v243.2h57.6a38.4 38.4 0 0 1 0 76.8H832z"
    }, null, -1);
    var _hoisted_317 = [
      _hoisted_217
    ];
    function _sfc_render17(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue17.openBlock)(), (0, import_vue17.createElementBlock)("svg", _hoisted_117, _hoisted_317);
    }
    var bell_filled_default = plugin_vue_export_helper_default(_sfc_main17, [["render", _sfc_render17], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/bell-filled.vue"]]);
    var import_vue18 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main18 = {
      name: "Bell"
    };
    var _hoisted_118 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_218 = (0, import_vue18.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 64a64 64 0 0 1 64 64v64H448v-64a64 64 0 0 1 64-64z"
    }, null, -1);
    var _hoisted_318 = (0, import_vue18.createElementVNode)("path", {
      fill: "currentColor",
      d: "M256 768h512V448a256 256 0 1 0-512 0v320zm256-640a320 320 0 0 1 320 320v384H192V448a320 320 0 0 1 320-320z"
    }, null, -1);
    var _hoisted_46 = (0, import_vue18.createElementVNode)("path", {
      fill: "currentColor",
      d: "M96 768h832q32 0 32 32t-32 32H96q-32 0-32-32t32-32zm352 128h128a64 64 0 0 1-128 0z"
    }, null, -1);
    var _hoisted_52 = [
      _hoisted_218,
      _hoisted_318,
      _hoisted_46
    ];
    function _sfc_render18(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue18.openBlock)(), (0, import_vue18.createElementBlock)("svg", _hoisted_118, _hoisted_52);
    }
    var bell_default = plugin_vue_export_helper_default(_sfc_main18, [["render", _sfc_render18], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/bell.vue"]]);
    var import_vue19 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main19 = {
      name: "Bicycle"
    };
    var _hoisted_119 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_219 = (0, import_vue19.createStaticVNode)('<path fill="currentColor" d="M256 832a128 128 0 1 0 0-256 128 128 0 0 0 0 256zm0 64a192 192 0 1 1 0-384 192 192 0 0 1 0 384z"></path><path fill="currentColor" d="M288 672h320q32 0 32 32t-32 32H288q-32 0-32-32t32-32z"></path><path fill="currentColor" d="M768 832a128 128 0 1 0 0-256 128 128 0 0 0 0 256zm0 64a192 192 0 1 1 0-384 192 192 0 0 1 0 384z"></path><path fill="currentColor" d="M480 192a32 32 0 0 1 0-64h160a32 32 0 0 1 31.04 24.256l96 384a32 32 0 0 1-62.08 15.488L615.04 192H480zM96 384a32 32 0 0 1 0-64h128a32 32 0 0 1 30.336 21.888l64 192a32 32 0 1 1-60.672 20.224L200.96 384H96z"></path><path fill="currentColor" d="m373.376 599.808-42.752-47.616 320-288 42.752 47.616z"></path>', 5);
    var _hoisted_7 = [
      _hoisted_219
    ];
    function _sfc_render19(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue19.openBlock)(), (0, import_vue19.createElementBlock)("svg", _hoisted_119, _hoisted_7);
    }
    var bicycle_default = plugin_vue_export_helper_default(_sfc_main19, [["render", _sfc_render19], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/bicycle.vue"]]);
    var import_vue20 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main20 = {
      name: "BottomLeft"
    };
    var _hoisted_120 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_220 = (0, import_vue20.createElementVNode)("path", {
      fill: "currentColor",
      d: "M256 768h416a32 32 0 1 1 0 64H224a32 32 0 0 1-32-32V352a32 32 0 0 1 64 0v416z"
    }, null, -1);
    var _hoisted_319 = (0, import_vue20.createElementVNode)("path", {
      fill: "currentColor",
      d: "M246.656 822.656a32 32 0 0 1-45.312-45.312l544-544a32 32 0 0 1 45.312 45.312l-544 544z"
    }, null, -1);
    var _hoisted_47 = [
      _hoisted_220,
      _hoisted_319
    ];
    function _sfc_render20(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue20.openBlock)(), (0, import_vue20.createElementBlock)("svg", _hoisted_120, _hoisted_47);
    }
    var bottom_left_default = plugin_vue_export_helper_default(_sfc_main20, [["render", _sfc_render20], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/bottom-left.vue"]]);
    var import_vue21 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main21 = {
      name: "BottomRight"
    };
    var _hoisted_121 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_221 = (0, import_vue21.createElementVNode)("path", {
      fill: "currentColor",
      d: "M352 768a32 32 0 1 0 0 64h448a32 32 0 0 0 32-32V352a32 32 0 0 0-64 0v416H352z"
    }, null, -1);
    var _hoisted_320 = (0, import_vue21.createElementVNode)("path", {
      fill: "currentColor",
      d: "M777.344 822.656a32 32 0 0 0 45.312-45.312l-544-544a32 32 0 0 0-45.312 45.312l544 544z"
    }, null, -1);
    var _hoisted_48 = [
      _hoisted_221,
      _hoisted_320
    ];
    function _sfc_render21(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue21.openBlock)(), (0, import_vue21.createElementBlock)("svg", _hoisted_121, _hoisted_48);
    }
    var bottom_right_default = plugin_vue_export_helper_default(_sfc_main21, [["render", _sfc_render21], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/bottom-right.vue"]]);
    var import_vue22 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main22 = {
      name: "Bottom"
    };
    var _hoisted_122 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_222 = (0, import_vue22.createElementVNode)("path", {
      fill: "currentColor",
      d: "M544 805.888V168a32 32 0 1 0-64 0v637.888L246.656 557.952a30.72 30.72 0 0 0-45.312 0 35.52 35.52 0 0 0 0 48.064l288 306.048a30.72 30.72 0 0 0 45.312 0l288-306.048a35.52 35.52 0 0 0 0-48 30.72 30.72 0 0 0-45.312 0L544 805.824z"
    }, null, -1);
    var _hoisted_321 = [
      _hoisted_222
    ];
    function _sfc_render22(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue22.openBlock)(), (0, import_vue22.createElementBlock)("svg", _hoisted_122, _hoisted_321);
    }
    var bottom_default = plugin_vue_export_helper_default(_sfc_main22, [["render", _sfc_render22], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/bottom.vue"]]);
    var import_vue23 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main23 = {
      name: "Bowl"
    };
    var _hoisted_123 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_223 = (0, import_vue23.createElementVNode)("path", {
      fill: "currentColor",
      d: "M714.432 704a351.744 351.744 0 0 0 148.16-256H161.408a351.744 351.744 0 0 0 148.16 256h404.864zM288 766.592A415.68 415.68 0 0 1 96 416a32 32 0 0 1 32-32h768a32 32 0 0 1 32 32 415.68 415.68 0 0 1-192 350.592V832a64 64 0 0 1-64 64H352a64 64 0 0 1-64-64v-65.408zM493.248 320h-90.496l254.4-254.4a32 32 0 1 1 45.248 45.248L493.248 320zm187.328 0h-128l269.696-155.712a32 32 0 0 1 32 55.424L680.576 320zM352 768v64h320v-64H352z"
    }, null, -1);
    var _hoisted_322 = [
      _hoisted_223
    ];
    function _sfc_render23(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue23.openBlock)(), (0, import_vue23.createElementBlock)("svg", _hoisted_123, _hoisted_322);
    }
    var bowl_default = plugin_vue_export_helper_default(_sfc_main23, [["render", _sfc_render23], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/bowl.vue"]]);
    var import_vue24 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main24 = {
      name: "Box"
    };
    var _hoisted_124 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_224 = (0, import_vue24.createElementVNode)("path", {
      fill: "currentColor",
      d: "M317.056 128 128 344.064V896h768V344.064L706.944 128H317.056zm-14.528-64h418.944a32 32 0 0 1 24.064 10.88l206.528 236.096A32 32 0 0 1 960 332.032V928a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V332.032a32 32 0 0 1 7.936-21.12L278.4 75.008A32 32 0 0 1 302.528 64z"
    }, null, -1);
    var _hoisted_323 = (0, import_vue24.createElementVNode)("path", {
      fill: "currentColor",
      d: "M64 320h896v64H64z"
    }, null, -1);
    var _hoisted_49 = (0, import_vue24.createElementVNode)("path", {
      fill: "currentColor",
      d: "M448 327.872V640h128V327.872L526.08 128h-28.16L448 327.872zM448 64h128l64 256v352a32 32 0 0 1-32 32H416a32 32 0 0 1-32-32V320l64-256z"
    }, null, -1);
    var _hoisted_53 = [
      _hoisted_224,
      _hoisted_323,
      _hoisted_49
    ];
    function _sfc_render24(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue24.openBlock)(), (0, import_vue24.createElementBlock)("svg", _hoisted_124, _hoisted_53);
    }
    var box_default = plugin_vue_export_helper_default(_sfc_main24, [["render", _sfc_render24], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/box.vue"]]);
    var import_vue25 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main25 = {
      name: "Briefcase"
    };
    var _hoisted_125 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_225 = (0, import_vue25.createElementVNode)("path", {
      fill: "currentColor",
      d: "M320 320V128h384v192h192v192H128V320h192zM128 576h768v320H128V576zm256-256h256.064V192H384v128z"
    }, null, -1);
    var _hoisted_324 = [
      _hoisted_225
    ];
    function _sfc_render25(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue25.openBlock)(), (0, import_vue25.createElementBlock)("svg", _hoisted_125, _hoisted_324);
    }
    var briefcase_default = plugin_vue_export_helper_default(_sfc_main25, [["render", _sfc_render25], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/briefcase.vue"]]);
    var import_vue26 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main26 = {
      name: "BrushFilled"
    };
    var _hoisted_126 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_226 = (0, import_vue26.createElementVNode)("path", {
      fill: "currentColor",
      d: "M608 704v160a96 96 0 0 1-192 0V704h-96a128 128 0 0 1-128-128h640a128 128 0 0 1-128 128h-96zM192 512V128.064h640V512H192z"
    }, null, -1);
    var _hoisted_325 = [
      _hoisted_226
    ];
    function _sfc_render26(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue26.openBlock)(), (0, import_vue26.createElementBlock)("svg", _hoisted_126, _hoisted_325);
    }
    var brush_filled_default = plugin_vue_export_helper_default(_sfc_main26, [["render", _sfc_render26], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/brush-filled.vue"]]);
    var import_vue27 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main27 = {
      name: "Brush"
    };
    var _hoisted_127 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_227 = (0, import_vue27.createElementVNode)("path", {
      fill: "currentColor",
      d: "M896 448H128v192a64 64 0 0 0 64 64h192v192h256V704h192a64 64 0 0 0 64-64V448zm-770.752-64c0-47.552 5.248-90.24 15.552-128 14.72-54.016 42.496-107.392 83.2-160h417.28l-15.36 70.336L736 96h211.2c-24.832 42.88-41.92 96.256-51.2 160a663.872 663.872 0 0 0-6.144 128H960v256a128 128 0 0 1-128 128H704v160a32 32 0 0 1-32 32H352a32 32 0 0 1-32-32V768H192A128 128 0 0 1 64 640V384h61.248zm64 0h636.544c-2.048-45.824.256-91.584 6.848-137.216 4.48-30.848 10.688-59.776 18.688-86.784h-96.64l-221.12 141.248L561.92 160H256.512c-25.856 37.888-43.776 75.456-53.952 112.832-8.768 32.064-13.248 69.12-13.312 111.168z"
    }, null, -1);
    var _hoisted_326 = [
      _hoisted_227
    ];
    function _sfc_render27(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue27.openBlock)(), (0, import_vue27.createElementBlock)("svg", _hoisted_127, _hoisted_326);
    }
    var brush_default = plugin_vue_export_helper_default(_sfc_main27, [["render", _sfc_render27], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/brush.vue"]]);
    var import_vue28 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main28 = {
      name: "Burger"
    };
    var _hoisted_128 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_228 = (0, import_vue28.createElementVNode)("path", {
      fill: "currentColor",
      d: "M160 512a32 32 0 0 0-32 32v64a32 32 0 0 0 30.08 32H864a32 32 0 0 0 32-32v-64a32 32 0 0 0-32-32H160zm736-58.56A96 96 0 0 1 960 544v64a96 96 0 0 1-51.968 85.312L855.36 833.6a96 96 0 0 1-89.856 62.272H258.496A96 96 0 0 1 168.64 833.6l-52.608-140.224A96 96 0 0 1 64 608v-64a96 96 0 0 1 64-90.56V448a384 384 0 1 1 768 5.44zM832 448a320 320 0 0 0-640 0h640zM512 704H188.352l40.192 107.136a32 32 0 0 0 29.952 20.736h507.008a32 32 0 0 0 29.952-20.736L835.648 704H512z"
    }, null, -1);
    var _hoisted_327 = [
      _hoisted_228
    ];
    function _sfc_render28(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue28.openBlock)(), (0, import_vue28.createElementBlock)("svg", _hoisted_128, _hoisted_327);
    }
    var burger_default = plugin_vue_export_helper_default(_sfc_main28, [["render", _sfc_render28], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/burger.vue"]]);
    var import_vue29 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main29 = {
      name: "Calendar"
    };
    var _hoisted_129 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_229 = (0, import_vue29.createElementVNode)("path", {
      fill: "currentColor",
      d: "M128 384v512h768V192H768v32a32 32 0 1 1-64 0v-32H320v32a32 32 0 0 1-64 0v-32H128v128h768v64H128zm192-256h384V96a32 32 0 1 1 64 0v32h160a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h160V96a32 32 0 0 1 64 0v32zm-32 384h64a32 32 0 0 1 0 64h-64a32 32 0 0 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm192-192h64a32 32 0 0 1 0 64h-64a32 32 0 0 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm192-192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64z"
    }, null, -1);
    var _hoisted_328 = [
      _hoisted_229
    ];
    function _sfc_render29(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue29.openBlock)(), (0, import_vue29.createElementBlock)("svg", _hoisted_129, _hoisted_328);
    }
    var calendar_default = plugin_vue_export_helper_default(_sfc_main29, [["render", _sfc_render29], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/calendar.vue"]]);
    var import_vue30 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main30 = {
      name: "CameraFilled"
    };
    var _hoisted_130 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_230 = (0, import_vue30.createElementVNode)("path", {
      fill: "currentColor",
      d: "M160 224a64 64 0 0 0-64 64v512a64 64 0 0 0 64 64h704a64 64 0 0 0 64-64V288a64 64 0 0 0-64-64H748.416l-46.464-92.672A64 64 0 0 0 644.736 96H379.328a64 64 0 0 0-57.216 35.392L275.776 224H160zm352 435.2a115.2 115.2 0 1 0 0-230.4 115.2 115.2 0 0 0 0 230.4zm0 140.8a256 256 0 1 1 0-512 256 256 0 0 1 0 512z"
    }, null, -1);
    var _hoisted_329 = [
      _hoisted_230
    ];
    function _sfc_render30(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue30.openBlock)(), (0, import_vue30.createElementBlock)("svg", _hoisted_130, _hoisted_329);
    }
    var camera_filled_default = plugin_vue_export_helper_default(_sfc_main30, [["render", _sfc_render30], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/camera-filled.vue"]]);
    var import_vue31 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main31 = {
      name: "Camera"
    };
    var _hoisted_131 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_231 = (0, import_vue31.createElementVNode)("path", {
      fill: "currentColor",
      d: "M896 256H128v576h768V256zm-199.424-64-32.064-64h-304.96l-32 64h369.024zM96 192h160l46.336-92.608A64 64 0 0 1 359.552 64h304.96a64 64 0 0 1 57.216 35.328L768.192 192H928a32 32 0 0 1 32 32v640a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V224a32 32 0 0 1 32-32zm416 512a160 160 0 1 0 0-320 160 160 0 0 0 0 320zm0 64a224 224 0 1 1 0-448 224 224 0 0 1 0 448z"
    }, null, -1);
    var _hoisted_330 = [
      _hoisted_231
    ];
    function _sfc_render31(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue31.openBlock)(), (0, import_vue31.createElementBlock)("svg", _hoisted_131, _hoisted_330);
    }
    var camera_default = plugin_vue_export_helper_default(_sfc_main31, [["render", _sfc_render31], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/camera.vue"]]);
    var import_vue32 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main32 = {
      name: "CaretBottom"
    };
    var _hoisted_132 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_232 = (0, import_vue32.createElementVNode)("path", {
      fill: "currentColor",
      d: "m192 384 320 384 320-384z"
    }, null, -1);
    var _hoisted_331 = [
      _hoisted_232
    ];
    function _sfc_render32(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue32.openBlock)(), (0, import_vue32.createElementBlock)("svg", _hoisted_132, _hoisted_331);
    }
    var caret_bottom_default = plugin_vue_export_helper_default(_sfc_main32, [["render", _sfc_render32], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/caret-bottom.vue"]]);
    var import_vue33 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main33 = {
      name: "CaretLeft"
    };
    var _hoisted_133 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_233 = (0, import_vue33.createElementVNode)("path", {
      fill: "currentColor",
      d: "M672 192 288 511.936 672 832z"
    }, null, -1);
    var _hoisted_332 = [
      _hoisted_233
    ];
    function _sfc_render33(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue33.openBlock)(), (0, import_vue33.createElementBlock)("svg", _hoisted_133, _hoisted_332);
    }
    var caret_left_default = plugin_vue_export_helper_default(_sfc_main33, [["render", _sfc_render33], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/caret-left.vue"]]);
    var import_vue34 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main34 = {
      name: "CaretRight"
    };
    var _hoisted_134 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_234 = (0, import_vue34.createElementVNode)("path", {
      fill: "currentColor",
      d: "M384 192v640l384-320.064z"
    }, null, -1);
    var _hoisted_333 = [
      _hoisted_234
    ];
    function _sfc_render34(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue34.openBlock)(), (0, import_vue34.createElementBlock)("svg", _hoisted_134, _hoisted_333);
    }
    var caret_right_default = plugin_vue_export_helper_default(_sfc_main34, [["render", _sfc_render34], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/caret-right.vue"]]);
    var import_vue35 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main35 = {
      name: "CaretTop"
    };
    var _hoisted_135 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_235 = (0, import_vue35.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 320 192 704h639.936z"
    }, null, -1);
    var _hoisted_334 = [
      _hoisted_235
    ];
    function _sfc_render35(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue35.openBlock)(), (0, import_vue35.createElementBlock)("svg", _hoisted_135, _hoisted_334);
    }
    var caret_top_default = plugin_vue_export_helper_default(_sfc_main35, [["render", _sfc_render35], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/caret-top.vue"]]);
    var import_vue36 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main36 = {
      name: "Cellphone"
    };
    var _hoisted_136 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_236 = (0, import_vue36.createElementVNode)("path", {
      fill: "currentColor",
      d: "M256 128a64 64 0 0 0-64 64v640a64 64 0 0 0 64 64h512a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64H256zm0-64h512a128 128 0 0 1 128 128v640a128 128 0 0 1-128 128H256a128 128 0 0 1-128-128V192A128 128 0 0 1 256 64zm128 128h256a32 32 0 1 1 0 64H384a32 32 0 0 1 0-64zm128 640a64 64 0 1 1 0-128 64 64 0 0 1 0 128z"
    }, null, -1);
    var _hoisted_335 = [
      _hoisted_236
    ];
    function _sfc_render36(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue36.openBlock)(), (0, import_vue36.createElementBlock)("svg", _hoisted_136, _hoisted_335);
    }
    var cellphone_default = plugin_vue_export_helper_default(_sfc_main36, [["render", _sfc_render36], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/cellphone.vue"]]);
    var import_vue37 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main37 = {
      name: "ChatDotRound"
    };
    var _hoisted_137 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_237 = (0, import_vue37.createElementVNode)("path", {
      fill: "currentColor",
      d: "m174.72 855.68 135.296-45.12 23.68 11.84C388.096 849.536 448.576 864 512 864c211.84 0 384-166.784 384-352S723.84 160 512 160 128 326.784 128 512c0 69.12 24.96 139.264 70.848 199.232l22.08 28.8-46.272 115.584zm-45.248 82.56A32 32 0 0 1 89.6 896l58.368-145.92C94.72 680.32 64 596.864 64 512 64 299.904 256 96 512 96s448 203.904 448 416-192 416-448 416a461.056 461.056 0 0 1-206.912-48.384l-175.616 58.56z"
    }, null, -1);
    var _hoisted_336 = (0, import_vue37.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 563.2a51.2 51.2 0 1 1 0-102.4 51.2 51.2 0 0 1 0 102.4zm192 0a51.2 51.2 0 1 1 0-102.4 51.2 51.2 0 0 1 0 102.4zm-384 0a51.2 51.2 0 1 1 0-102.4 51.2 51.2 0 0 1 0 102.4z"
    }, null, -1);
    var _hoisted_410 = [
      _hoisted_237,
      _hoisted_336
    ];
    function _sfc_render37(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue37.openBlock)(), (0, import_vue37.createElementBlock)("svg", _hoisted_137, _hoisted_410);
    }
    var chat_dot_round_default = plugin_vue_export_helper_default(_sfc_main37, [["render", _sfc_render37], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/chat-dot-round.vue"]]);
    var import_vue38 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main38 = {
      name: "ChatDotSquare"
    };
    var _hoisted_138 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_238 = (0, import_vue38.createElementVNode)("path", {
      fill: "currentColor",
      d: "M273.536 736H800a64 64 0 0 0 64-64V256a64 64 0 0 0-64-64H224a64 64 0 0 0-64 64v570.88L273.536 736zM296 800 147.968 918.4A32 32 0 0 1 96 893.44V256a128 128 0 0 1 128-128h576a128 128 0 0 1 128 128v416a128 128 0 0 1-128 128H296z"
    }, null, -1);
    var _hoisted_337 = (0, import_vue38.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 499.2a51.2 51.2 0 1 1 0-102.4 51.2 51.2 0 0 1 0 102.4zm192 0a51.2 51.2 0 1 1 0-102.4 51.2 51.2 0 0 1 0 102.4zm-384 0a51.2 51.2 0 1 1 0-102.4 51.2 51.2 0 0 1 0 102.4z"
    }, null, -1);
    var _hoisted_411 = [
      _hoisted_238,
      _hoisted_337
    ];
    function _sfc_render38(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue38.openBlock)(), (0, import_vue38.createElementBlock)("svg", _hoisted_138, _hoisted_411);
    }
    var chat_dot_square_default = plugin_vue_export_helper_default(_sfc_main38, [["render", _sfc_render38], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/chat-dot-square.vue"]]);
    var import_vue39 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main39 = {
      name: "ChatLineRound"
    };
    var _hoisted_139 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_239 = (0, import_vue39.createElementVNode)("path", {
      fill: "currentColor",
      d: "m174.72 855.68 135.296-45.12 23.68 11.84C388.096 849.536 448.576 864 512 864c211.84 0 384-166.784 384-352S723.84 160 512 160 128 326.784 128 512c0 69.12 24.96 139.264 70.848 199.232l22.08 28.8-46.272 115.584zm-45.248 82.56A32 32 0 0 1 89.6 896l58.368-145.92C94.72 680.32 64 596.864 64 512 64 299.904 256 96 512 96s448 203.904 448 416-192 416-448 416a461.056 461.056 0 0 1-206.912-48.384l-175.616 58.56z"
    }, null, -1);
    var _hoisted_338 = (0, import_vue39.createElementVNode)("path", {
      fill: "currentColor",
      d: "M352 576h320q32 0 32 32t-32 32H352q-32 0-32-32t32-32zm32-192h256q32 0 32 32t-32 32H384q-32 0-32-32t32-32z"
    }, null, -1);
    var _hoisted_412 = [
      _hoisted_239,
      _hoisted_338
    ];
    function _sfc_render39(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue39.openBlock)(), (0, import_vue39.createElementBlock)("svg", _hoisted_139, _hoisted_412);
    }
    var chat_line_round_default = plugin_vue_export_helper_default(_sfc_main39, [["render", _sfc_render39], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/chat-line-round.vue"]]);
    var import_vue40 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main40 = {
      name: "ChatLineSquare"
    };
    var _hoisted_140 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_240 = (0, import_vue40.createElementVNode)("path", {
      fill: "currentColor",
      d: "M160 826.88 273.536 736H800a64 64 0 0 0 64-64V256a64 64 0 0 0-64-64H224a64 64 0 0 0-64 64v570.88zM296 800 147.968 918.4A32 32 0 0 1 96 893.44V256a128 128 0 0 1 128-128h576a128 128 0 0 1 128 128v416a128 128 0 0 1-128 128H296z"
    }, null, -1);
    var _hoisted_339 = (0, import_vue40.createElementVNode)("path", {
      fill: "currentColor",
      d: "M352 512h320q32 0 32 32t-32 32H352q-32 0-32-32t32-32zm0-192h320q32 0 32 32t-32 32H352q-32 0-32-32t32-32z"
    }, null, -1);
    var _hoisted_413 = [
      _hoisted_240,
      _hoisted_339
    ];
    function _sfc_render40(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue40.openBlock)(), (0, import_vue40.createElementBlock)("svg", _hoisted_140, _hoisted_413);
    }
    var chat_line_square_default = plugin_vue_export_helper_default(_sfc_main40, [["render", _sfc_render40], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/chat-line-square.vue"]]);
    var import_vue41 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main41 = {
      name: "ChatRound"
    };
    var _hoisted_141 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_241 = (0, import_vue41.createElementVNode)("path", {
      fill: "currentColor",
      d: "m174.72 855.68 130.048-43.392 23.424 11.392C382.4 849.984 444.352 864 512 864c223.744 0 384-159.872 384-352 0-192.832-159.104-352-384-352S128 319.168 128 512a341.12 341.12 0 0 0 69.248 204.288l21.632 28.8-44.16 110.528zm-45.248 82.56A32 32 0 0 1 89.6 896l56.512-141.248A405.12 405.12 0 0 1 64 512C64 299.904 235.648 96 512 96s448 203.904 448 416-173.44 416-448 416c-79.68 0-150.848-17.152-211.712-46.72l-170.88 56.96z"
    }, null, -1);
    var _hoisted_340 = [
      _hoisted_241
    ];
    function _sfc_render41(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue41.openBlock)(), (0, import_vue41.createElementBlock)("svg", _hoisted_141, _hoisted_340);
    }
    var chat_round_default = plugin_vue_export_helper_default(_sfc_main41, [["render", _sfc_render41], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/chat-round.vue"]]);
    var import_vue42 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main42 = {
      name: "ChatSquare"
    };
    var _hoisted_142 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_242 = (0, import_vue42.createElementVNode)("path", {
      fill: "currentColor",
      d: "M273.536 736H800a64 64 0 0 0 64-64V256a64 64 0 0 0-64-64H224a64 64 0 0 0-64 64v570.88L273.536 736zM296 800 147.968 918.4A32 32 0 0 1 96 893.44V256a128 128 0 0 1 128-128h576a128 128 0 0 1 128 128v416a128 128 0 0 1-128 128H296z"
    }, null, -1);
    var _hoisted_341 = [
      _hoisted_242
    ];
    function _sfc_render42(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue42.openBlock)(), (0, import_vue42.createElementBlock)("svg", _hoisted_142, _hoisted_341);
    }
    var chat_square_default = plugin_vue_export_helper_default(_sfc_main42, [["render", _sfc_render42], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/chat-square.vue"]]);
    var import_vue43 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main43 = {
      name: "Check"
    };
    var _hoisted_143 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_243 = (0, import_vue43.createElementVNode)("path", {
      fill: "currentColor",
      d: "M406.656 706.944 195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"
    }, null, -1);
    var _hoisted_342 = [
      _hoisted_243
    ];
    function _sfc_render43(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue43.openBlock)(), (0, import_vue43.createElementBlock)("svg", _hoisted_143, _hoisted_342);
    }
    var check_default = plugin_vue_export_helper_default(_sfc_main43, [["render", _sfc_render43], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/check.vue"]]);
    var import_vue44 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main44 = {
      name: "Checked"
    };
    var _hoisted_144 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_244 = (0, import_vue44.createElementVNode)("path", {
      fill: "currentColor",
      d: "M704 192h160v736H160V192h160.064v64H704v-64zM311.616 537.28l-45.312 45.248L447.36 763.52l316.8-316.8-45.312-45.184L447.36 673.024 311.616 537.28zM384 192V96h256v96H384z"
    }, null, -1);
    var _hoisted_343 = [
      _hoisted_244
    ];
    function _sfc_render44(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue44.openBlock)(), (0, import_vue44.createElementBlock)("svg", _hoisted_144, _hoisted_343);
    }
    var checked_default = plugin_vue_export_helper_default(_sfc_main44, [["render", _sfc_render44], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/checked.vue"]]);
    var import_vue45 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main45 = {
      name: "Cherry"
    };
    var _hoisted_145 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_245 = (0, import_vue45.createElementVNode)("path", {
      fill: "currentColor",
      d: "M261.056 449.6c13.824-69.696 34.88-128.96 63.36-177.728 23.744-40.832 61.12-88.64 112.256-143.872H320a32 32 0 0 1 0-64h384a32 32 0 1 1 0 64H554.752c14.912 39.168 41.344 86.592 79.552 141.76 47.36 68.48 84.8 106.752 106.304 114.304a224 224 0 1 1-84.992 14.784c-22.656-22.912-47.04-53.76-73.92-92.608-38.848-56.128-67.008-105.792-84.352-149.312-55.296 58.24-94.528 107.52-117.76 147.2-23.168 39.744-41.088 88.768-53.568 147.072a224.064 224.064 0 1 1-64.96-1.6zM288 832a160 160 0 1 0 0-320 160 160 0 0 0 0 320zm448-64a160 160 0 1 0 0-320 160 160 0 0 0 0 320z"
    }, null, -1);
    var _hoisted_344 = [
      _hoisted_245
    ];
    function _sfc_render45(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue45.openBlock)(), (0, import_vue45.createElementBlock)("svg", _hoisted_145, _hoisted_344);
    }
    var cherry_default = plugin_vue_export_helper_default(_sfc_main45, [["render", _sfc_render45], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/cherry.vue"]]);
    var import_vue46 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main46 = {
      name: "Chicken"
    };
    var _hoisted_146 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_246 = (0, import_vue46.createElementVNode)("path", {
      fill: "currentColor",
      d: "M349.952 716.992 478.72 588.16a106.688 106.688 0 0 1-26.176-19.072 106.688 106.688 0 0 1-19.072-26.176L304.704 671.744c.768 3.072 1.472 6.144 2.048 9.216l2.048 31.936 31.872 1.984c3.136.64 6.208 1.28 9.28 2.112zm57.344 33.152a128 128 0 1 1-216.32 114.432l-1.92-32-32-1.92a128 128 0 1 1 114.432-216.32L416.64 469.248c-2.432-101.44 58.112-239.104 149.056-330.048 107.328-107.328 231.296-85.504 316.8 0 85.44 85.44 107.328 209.408 0 316.8-91.008 90.88-228.672 151.424-330.112 149.056L407.296 750.08zm90.496-226.304c49.536 49.536 233.344-7.04 339.392-113.088 78.208-78.208 63.232-163.072 0-226.304-63.168-63.232-148.032-78.208-226.24 0C504.896 290.496 448.32 474.368 497.792 523.84zM244.864 708.928a64 64 0 1 0-59.84 59.84l56.32-3.52 3.52-56.32zm8.064 127.68a64 64 0 1 0 59.84-59.84l-56.32 3.52-3.52 56.32z"
    }, null, -1);
    var _hoisted_345 = [
      _hoisted_246
    ];
    function _sfc_render46(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue46.openBlock)(), (0, import_vue46.createElementBlock)("svg", _hoisted_146, _hoisted_345);
    }
    var chicken_default = plugin_vue_export_helper_default(_sfc_main46, [["render", _sfc_render46], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/chicken.vue"]]);
    var import_vue47 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main47 = {
      name: "CircleCheckFilled"
    };
    var _hoisted_147 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_247 = (0, import_vue47.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"
    }, null, -1);
    var _hoisted_346 = [
      _hoisted_247
    ];
    function _sfc_render47(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue47.openBlock)(), (0, import_vue47.createElementBlock)("svg", _hoisted_147, _hoisted_346);
    }
    var circle_check_filled_default = plugin_vue_export_helper_default(_sfc_main47, [["render", _sfc_render47], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/circle-check-filled.vue"]]);
    var import_vue48 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main48 = {
      name: "CircleCheck"
    };
    var _hoisted_148 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_248 = (0, import_vue48.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
    }, null, -1);
    var _hoisted_347 = (0, import_vue48.createElementVNode)("path", {
      fill: "currentColor",
      d: "M745.344 361.344a32 32 0 0 1 45.312 45.312l-288 288a32 32 0 0 1-45.312 0l-160-160a32 32 0 1 1 45.312-45.312L480 626.752l265.344-265.408z"
    }, null, -1);
    var _hoisted_414 = [
      _hoisted_248,
      _hoisted_347
    ];
    function _sfc_render48(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue48.openBlock)(), (0, import_vue48.createElementBlock)("svg", _hoisted_148, _hoisted_414);
    }
    var circle_check_default = plugin_vue_export_helper_default(_sfc_main48, [["render", _sfc_render48], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/circle-check.vue"]]);
    var import_vue49 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main49 = {
      name: "CircleCloseFilled"
    };
    var _hoisted_149 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_249 = (0, import_vue49.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z"
    }, null, -1);
    var _hoisted_348 = [
      _hoisted_249
    ];
    function _sfc_render49(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue49.openBlock)(), (0, import_vue49.createElementBlock)("svg", _hoisted_149, _hoisted_348);
    }
    var circle_close_filled_default = plugin_vue_export_helper_default(_sfc_main49, [["render", _sfc_render49], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/circle-close-filled.vue"]]);
    var import_vue50 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main50 = {
      name: "CircleClose"
    };
    var _hoisted_150 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_250 = (0, import_vue50.createElementVNode)("path", {
      fill: "currentColor",
      d: "m466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248L466.752 512z"
    }, null, -1);
    var _hoisted_349 = (0, import_vue50.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
    }, null, -1);
    var _hoisted_415 = [
      _hoisted_250,
      _hoisted_349
    ];
    function _sfc_render50(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue50.openBlock)(), (0, import_vue50.createElementBlock)("svg", _hoisted_150, _hoisted_415);
    }
    var circle_close_default = plugin_vue_export_helper_default(_sfc_main50, [["render", _sfc_render50], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/circle-close.vue"]]);
    var import_vue51 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main51 = {
      name: "CirclePlusFilled"
    };
    var _hoisted_151 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_251 = (0, import_vue51.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-38.4 409.6H326.4a38.4 38.4 0 1 0 0 76.8h147.2v147.2a38.4 38.4 0 0 0 76.8 0V550.4h147.2a38.4 38.4 0 0 0 0-76.8H550.4V326.4a38.4 38.4 0 1 0-76.8 0v147.2z"
    }, null, -1);
    var _hoisted_350 = [
      _hoisted_251
    ];
    function _sfc_render51(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue51.openBlock)(), (0, import_vue51.createElementBlock)("svg", _hoisted_151, _hoisted_350);
    }
    var circle_plus_filled_default = plugin_vue_export_helper_default(_sfc_main51, [["render", _sfc_render51], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/circle-plus-filled.vue"]]);
    var import_vue52 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main52 = {
      name: "CirclePlus"
    };
    var _hoisted_152 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_252 = (0, import_vue52.createElementVNode)("path", {
      fill: "currentColor",
      d: "M352 480h320a32 32 0 1 1 0 64H352a32 32 0 0 1 0-64z"
    }, null, -1);
    var _hoisted_351 = (0, import_vue52.createElementVNode)("path", {
      fill: "currentColor",
      d: "M480 672V352a32 32 0 1 1 64 0v320a32 32 0 0 1-64 0z"
    }, null, -1);
    var _hoisted_416 = (0, import_vue52.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
    }, null, -1);
    var _hoisted_54 = [
      _hoisted_252,
      _hoisted_351,
      _hoisted_416
    ];
    function _sfc_render52(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue52.openBlock)(), (0, import_vue52.createElementBlock)("svg", _hoisted_152, _hoisted_54);
    }
    var circle_plus_default = plugin_vue_export_helper_default(_sfc_main52, [["render", _sfc_render52], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/circle-plus.vue"]]);
    var import_vue53 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main53 = {
      name: "Clock"
    };
    var _hoisted_153 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_253 = (0, import_vue53.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
    }, null, -1);
    var _hoisted_352 = (0, import_vue53.createElementVNode)("path", {
      fill: "currentColor",
      d: "M480 256a32 32 0 0 1 32 32v256a32 32 0 0 1-64 0V288a32 32 0 0 1 32-32z"
    }, null, -1);
    var _hoisted_417 = (0, import_vue53.createElementVNode)("path", {
      fill: "currentColor",
      d: "M480 512h256q32 0 32 32t-32 32H480q-32 0-32-32t32-32z"
    }, null, -1);
    var _hoisted_55 = [
      _hoisted_253,
      _hoisted_352,
      _hoisted_417
    ];
    function _sfc_render53(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue53.openBlock)(), (0, import_vue53.createElementBlock)("svg", _hoisted_153, _hoisted_55);
    }
    var clock_default = plugin_vue_export_helper_default(_sfc_main53, [["render", _sfc_render53], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/clock.vue"]]);
    var import_vue54 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main54 = {
      name: "CloseBold"
    };
    var _hoisted_154 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_254 = (0, import_vue54.createElementVNode)("path", {
      fill: "currentColor",
      d: "M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
    }, null, -1);
    var _hoisted_353 = [
      _hoisted_254
    ];
    function _sfc_render54(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue54.openBlock)(), (0, import_vue54.createElementBlock)("svg", _hoisted_154, _hoisted_353);
    }
    var close_bold_default = plugin_vue_export_helper_default(_sfc_main54, [["render", _sfc_render54], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/close-bold.vue"]]);
    var import_vue55 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main55 = {
      name: "Close"
    };
    var _hoisted_155 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_255 = (0, import_vue55.createElementVNode)("path", {
      fill: "currentColor",
      d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
    }, null, -1);
    var _hoisted_354 = [
      _hoisted_255
    ];
    function _sfc_render55(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue55.openBlock)(), (0, import_vue55.createElementBlock)("svg", _hoisted_155, _hoisted_354);
    }
    var close_default = plugin_vue_export_helper_default(_sfc_main55, [["render", _sfc_render55], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/close.vue"]]);
    var import_vue56 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main56 = {
      name: "Cloudy"
    };
    var _hoisted_156 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_256 = (0, import_vue56.createElementVNode)("path", {
      fill: "currentColor",
      d: "M598.4 831.872H328.192a256 256 0 0 1-34.496-510.528A352 352 0 1 1 598.4 831.872zm-271.36-64h272.256a288 288 0 1 0-248.512-417.664L335.04 381.44l-34.816 3.584a192 192 0 0 0 26.88 382.848z"
    }, null, -1);
    var _hoisted_355 = [
      _hoisted_256
    ];
    function _sfc_render56(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue56.openBlock)(), (0, import_vue56.createElementBlock)("svg", _hoisted_156, _hoisted_355);
    }
    var cloudy_default = plugin_vue_export_helper_default(_sfc_main56, [["render", _sfc_render56], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/cloudy.vue"]]);
    var import_vue57 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main57 = {
      name: "CoffeeCup"
    };
    var _hoisted_157 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_257 = (0, import_vue57.createElementVNode)("path", {
      fill: "currentColor",
      d: "M768 192a192 192 0 1 1-8 383.808A256.128 256.128 0 0 1 512 768H320A256 256 0 0 1 64 512V160a32 32 0 0 1 32-32h640a32 32 0 0 1 32 32v32zm0 64v256a128 128 0 1 0 0-256zM96 832h640a32 32 0 1 1 0 64H96a32 32 0 1 1 0-64zm32-640v320a192 192 0 0 0 192 192h192a192 192 0 0 0 192-192V192H128z"
    }, null, -1);
    var _hoisted_356 = [
      _hoisted_257
    ];
    function _sfc_render57(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue57.openBlock)(), (0, import_vue57.createElementBlock)("svg", _hoisted_157, _hoisted_356);
    }
    var coffee_cup_default = plugin_vue_export_helper_default(_sfc_main57, [["render", _sfc_render57], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/coffee-cup.vue"]]);
    var import_vue58 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main58 = {
      name: "Coffee"
    };
    var _hoisted_158 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_258 = (0, import_vue58.createElementVNode)("path", {
      fill: "currentColor",
      d: "M822.592 192h14.272a32 32 0 0 1 31.616 26.752l21.312 128A32 32 0 0 1 858.24 384h-49.344l-39.04 546.304A32 32 0 0 1 737.92 960H285.824a32 32 0 0 1-32-29.696L214.912 384H165.76a32 32 0 0 1-31.552-37.248l21.312-128A32 32 0 0 1 187.136 192h14.016l-6.72-93.696A32 32 0 0 1 226.368 64h571.008a32 32 0 0 1 31.936 34.304L822.592 192zm-64.128 0 4.544-64H260.736l4.544 64h493.184zm-548.16 128H820.48l-10.688-64H214.208l-10.688 64h6.784zm68.736 64 36.544 512H708.16l36.544-512H279.04z"
    }, null, -1);
    var _hoisted_357 = [
      _hoisted_258
    ];
    function _sfc_render58(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue58.openBlock)(), (0, import_vue58.createElementBlock)("svg", _hoisted_158, _hoisted_357);
    }
    var coffee_default = plugin_vue_export_helper_default(_sfc_main58, [["render", _sfc_render58], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/coffee.vue"]]);
    var import_vue59 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main59 = {
      name: "Coin"
    };
    var _hoisted_159 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_259 = (0, import_vue59.createElementVNode)("path", {
      fill: "currentColor",
      d: "m161.92 580.736 29.888 58.88C171.328 659.776 160 681.728 160 704c0 82.304 155.328 160 352 160s352-77.696 352-160c0-22.272-11.392-44.16-31.808-64.32l30.464-58.432C903.936 615.808 928 657.664 928 704c0 129.728-188.544 224-416 224S96 833.728 96 704c0-46.592 24.32-88.576 65.92-123.264z"
    }, null, -1);
    var _hoisted_358 = (0, import_vue59.createElementVNode)("path", {
      fill: "currentColor",
      d: "m161.92 388.736 29.888 58.88C171.328 467.84 160 489.792 160 512c0 82.304 155.328 160 352 160s352-77.696 352-160c0-22.272-11.392-44.16-31.808-64.32l30.464-58.432C903.936 423.808 928 465.664 928 512c0 129.728-188.544 224-416 224S96 641.728 96 512c0-46.592 24.32-88.576 65.92-123.264z"
    }, null, -1);
    var _hoisted_418 = (0, import_vue59.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 544c-227.456 0-416-94.272-416-224S284.544 96 512 96s416 94.272 416 224-188.544 224-416 224zm0-64c196.672 0 352-77.696 352-160S708.672 160 512 160s-352 77.696-352 160 155.328 160 352 160z"
    }, null, -1);
    var _hoisted_56 = [
      _hoisted_259,
      _hoisted_358,
      _hoisted_418
    ];
    function _sfc_render59(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue59.openBlock)(), (0, import_vue59.createElementBlock)("svg", _hoisted_159, _hoisted_56);
    }
    var coin_default = plugin_vue_export_helper_default(_sfc_main59, [["render", _sfc_render59], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/coin.vue"]]);
    var import_vue60 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main60 = {
      name: "ColdDrink"
    };
    var _hoisted_160 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_260 = (0, import_vue60.createElementVNode)("path", {
      fill: "currentColor",
      d: "M768 64a192 192 0 1 1-69.952 370.88L480 725.376V896h96a32 32 0 1 1 0 64H320a32 32 0 1 1 0-64h96V725.376L76.8 273.536a64 64 0 0 1-12.8-38.4v-10.688a32 32 0 0 1 32-32h71.808l-65.536-83.84a32 32 0 0 1 50.432-39.424l96.256 123.264h337.728A192.064 192.064 0 0 1 768 64zM656.896 192.448H800a32 32 0 0 1 32 32v10.624a64 64 0 0 1-12.8 38.4l-80.448 107.2a128 128 0 1 0-81.92-188.16v-.064zm-357.888 64 129.472 165.76a32 32 0 0 1-50.432 39.36l-160.256-205.12H144l304 404.928 304-404.928H299.008z"
    }, null, -1);
    var _hoisted_359 = [
      _hoisted_260
    ];
    function _sfc_render60(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue60.openBlock)(), (0, import_vue60.createElementBlock)("svg", _hoisted_160, _hoisted_359);
    }
    var cold_drink_default = plugin_vue_export_helper_default(_sfc_main60, [["render", _sfc_render60], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/cold-drink.vue"]]);
    var import_vue61 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main61 = {
      name: "CollectionTag"
    };
    var _hoisted_161 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_261 = (0, import_vue61.createElementVNode)("path", {
      fill: "currentColor",
      d: "M256 128v698.88l196.032-156.864a96 96 0 0 1 119.936 0L768 826.816V128H256zm-32-64h576a32 32 0 0 1 32 32v797.44a32 32 0 0 1-51.968 24.96L531.968 720a32 32 0 0 0-39.936 0L243.968 918.4A32 32 0 0 1 192 893.44V96a32 32 0 0 1 32-32z"
    }, null, -1);
    var _hoisted_360 = [
      _hoisted_261
    ];
    function _sfc_render61(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue61.openBlock)(), (0, import_vue61.createElementBlock)("svg", _hoisted_161, _hoisted_360);
    }
    var collection_tag_default = plugin_vue_export_helper_default(_sfc_main61, [["render", _sfc_render61], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/collection-tag.vue"]]);
    var import_vue62 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main62 = {
      name: "Collection"
    };
    var _hoisted_162 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_262 = (0, import_vue62.createElementVNode)("path", {
      fill: "currentColor",
      d: "M192 736h640V128H256a64 64 0 0 0-64 64v544zm64-672h608a32 32 0 0 1 32 32v672a32 32 0 0 1-32 32H160l-32 57.536V192A128 128 0 0 1 256 64z"
    }, null, -1);
    var _hoisted_361 = (0, import_vue62.createElementVNode)("path", {
      fill: "currentColor",
      d: "M240 800a48 48 0 1 0 0 96h592v-96H240zm0-64h656v160a64 64 0 0 1-64 64H240a112 112 0 0 1 0-224zm144-608v250.88l96-76.8 96 76.8V128H384zm-64-64h320v381.44a32 32 0 0 1-51.968 24.96L480 384l-108.032 86.4A32 32 0 0 1 320 445.44V64z"
    }, null, -1);
    var _hoisted_419 = [
      _hoisted_262,
      _hoisted_361
    ];
    function _sfc_render62(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue62.openBlock)(), (0, import_vue62.createElementBlock)("svg", _hoisted_162, _hoisted_419);
    }
    var collection_default = plugin_vue_export_helper_default(_sfc_main62, [["render", _sfc_render62], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/collection.vue"]]);
    var import_vue63 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main63 = {
      name: "Comment"
    };
    var _hoisted_163 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_263 = (0, import_vue63.createElementVNode)("path", {
      fill: "currentColor",
      d: "M736 504a56 56 0 1 1 0-112 56 56 0 0 1 0 112zm-224 0a56 56 0 1 1 0-112 56 56 0 0 1 0 112zm-224 0a56 56 0 1 1 0-112 56 56 0 0 1 0 112zM128 128v640h192v160l224-160h352V128H128z"
    }, null, -1);
    var _hoisted_362 = [
      _hoisted_263
    ];
    function _sfc_render63(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue63.openBlock)(), (0, import_vue63.createElementBlock)("svg", _hoisted_163, _hoisted_362);
    }
    var comment_default = plugin_vue_export_helper_default(_sfc_main63, [["render", _sfc_render63], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/comment.vue"]]);
    var import_vue64 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main64 = {
      name: "Compass"
    };
    var _hoisted_164 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_264 = (0, import_vue64.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
    }, null, -1);
    var _hoisted_363 = (0, import_vue64.createElementVNode)("path", {
      fill: "currentColor",
      d: "M725.888 315.008C676.48 428.672 624 513.28 568.576 568.64c-55.424 55.424-139.968 107.904-253.568 157.312a12.8 12.8 0 0 1-16.896-16.832c49.536-113.728 102.016-198.272 157.312-253.632 55.36-55.296 139.904-107.776 253.632-157.312a12.8 12.8 0 0 1 16.832 16.832z"
    }, null, -1);
    var _hoisted_420 = [
      _hoisted_264,
      _hoisted_363
    ];
    function _sfc_render64(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue64.openBlock)(), (0, import_vue64.createElementBlock)("svg", _hoisted_164, _hoisted_420);
    }
    var compass_default = plugin_vue_export_helper_default(_sfc_main64, [["render", _sfc_render64], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/compass.vue"]]);
    var import_vue65 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main65 = {
      name: "Connection"
    };
    var _hoisted_165 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_265 = (0, import_vue65.createElementVNode)("path", {
      fill: "currentColor",
      d: "M640 384v64H448a128 128 0 0 0-128 128v128a128 128 0 0 0 128 128h320a128 128 0 0 0 128-128V576a128 128 0 0 0-64-110.848V394.88c74.56 26.368 128 97.472 128 181.056v128a192 192 0 0 1-192 192H448a192 192 0 0 1-192-192V576a192 192 0 0 1 192-192h192z"
    }, null, -1);
    var _hoisted_364 = (0, import_vue65.createElementVNode)("path", {
      fill: "currentColor",
      d: "M384 640v-64h192a128 128 0 0 0 128-128V320a128 128 0 0 0-128-128H256a128 128 0 0 0-128 128v128a128 128 0 0 0 64 110.848v70.272A192.064 192.064 0 0 1 64 448V320a192 192 0 0 1 192-192h320a192 192 0 0 1 192 192v128a192 192 0 0 1-192 192H384z"
    }, null, -1);
    var _hoisted_421 = [
      _hoisted_265,
      _hoisted_364
    ];
    function _sfc_render65(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue65.openBlock)(), (0, import_vue65.createElementBlock)("svg", _hoisted_165, _hoisted_421);
    }
    var connection_default = plugin_vue_export_helper_default(_sfc_main65, [["render", _sfc_render65], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/connection.vue"]]);
    var import_vue66 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main66 = {
      name: "Coordinate"
    };
    var _hoisted_166 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_266 = (0, import_vue66.createElementVNode)("path", {
      fill: "currentColor",
      d: "M480 512h64v320h-64z"
    }, null, -1);
    var _hoisted_365 = (0, import_vue66.createElementVNode)("path", {
      fill: "currentColor",
      d: "M192 896h640a64 64 0 0 0-64-64H256a64 64 0 0 0-64 64zm64-128h512a128 128 0 0 1 128 128v64H128v-64a128 128 0 0 1 128-128zm256-256a192 192 0 1 0 0-384 192 192 0 0 0 0 384zm0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512z"
    }, null, -1);
    var _hoisted_422 = [
      _hoisted_266,
      _hoisted_365
    ];
    function _sfc_render66(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue66.openBlock)(), (0, import_vue66.createElementBlock)("svg", _hoisted_166, _hoisted_422);
    }
    var coordinate_default = plugin_vue_export_helper_default(_sfc_main66, [["render", _sfc_render66], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/coordinate.vue"]]);
    var import_vue67 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main67 = {
      name: "CopyDocument"
    };
    var _hoisted_167 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_267 = (0, import_vue67.createElementVNode)("path", {
      fill: "currentColor",
      d: "M768 832a128 128 0 0 1-128 128H192A128 128 0 0 1 64 832V384a128 128 0 0 1 128-128v64a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64h64z"
    }, null, -1);
    var _hoisted_366 = (0, import_vue67.createElementVNode)("path", {
      fill: "currentColor",
      d: "M384 128a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64H384zm0-64h448a128 128 0 0 1 128 128v448a128 128 0 0 1-128 128H384a128 128 0 0 1-128-128V192A128 128 0 0 1 384 64z"
    }, null, -1);
    var _hoisted_423 = [
      _hoisted_267,
      _hoisted_366
    ];
    function _sfc_render67(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue67.openBlock)(), (0, import_vue67.createElementBlock)("svg", _hoisted_167, _hoisted_423);
    }
    var copy_document_default = plugin_vue_export_helper_default(_sfc_main67, [["render", _sfc_render67], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/copy-document.vue"]]);
    var import_vue68 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main68 = {
      name: "Cpu"
    };
    var _hoisted_168 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_268 = (0, import_vue68.createElementVNode)("path", {
      fill: "currentColor",
      d: "M320 256a64 64 0 0 0-64 64v384a64 64 0 0 0 64 64h384a64 64 0 0 0 64-64V320a64 64 0 0 0-64-64H320zm0-64h384a128 128 0 0 1 128 128v384a128 128 0 0 1-128 128H320a128 128 0 0 1-128-128V320a128 128 0 0 1 128-128z"
    }, null, -1);
    var _hoisted_367 = (0, import_vue68.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 64a32 32 0 0 1 32 32v128h-64V96a32 32 0 0 1 32-32zm160 0a32 32 0 0 1 32 32v128h-64V96a32 32 0 0 1 32-32zm-320 0a32 32 0 0 1 32 32v128h-64V96a32 32 0 0 1 32-32zm160 896a32 32 0 0 1-32-32V800h64v128a32 32 0 0 1-32 32zm160 0a32 32 0 0 1-32-32V800h64v128a32 32 0 0 1-32 32zm-320 0a32 32 0 0 1-32-32V800h64v128a32 32 0 0 1-32 32zM64 512a32 32 0 0 1 32-32h128v64H96a32 32 0 0 1-32-32zm0-160a32 32 0 0 1 32-32h128v64H96a32 32 0 0 1-32-32zm0 320a32 32 0 0 1 32-32h128v64H96a32 32 0 0 1-32-32zm896-160a32 32 0 0 1-32 32H800v-64h128a32 32 0 0 1 32 32zm0-160a32 32 0 0 1-32 32H800v-64h128a32 32 0 0 1 32 32zm0 320a32 32 0 0 1-32 32H800v-64h128a32 32 0 0 1 32 32z"
    }, null, -1);
    var _hoisted_424 = [
      _hoisted_268,
      _hoisted_367
    ];
    function _sfc_render68(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue68.openBlock)(), (0, import_vue68.createElementBlock)("svg", _hoisted_168, _hoisted_424);
    }
    var cpu_default = plugin_vue_export_helper_default(_sfc_main68, [["render", _sfc_render68], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/cpu.vue"]]);
    var import_vue69 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main69 = {
      name: "CreditCard"
    };
    var _hoisted_169 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_269 = (0, import_vue69.createElementVNode)("path", {
      fill: "currentColor",
      d: "M896 324.096c0-42.368-2.496-55.296-9.536-68.48a52.352 52.352 0 0 0-22.144-22.08c-13.12-7.04-26.048-9.536-68.416-9.536H228.096c-42.368 0-55.296 2.496-68.48 9.536a52.352 52.352 0 0 0-22.08 22.144c-7.04 13.12-9.536 26.048-9.536 68.416v375.808c0 42.368 2.496 55.296 9.536 68.48a52.352 52.352 0 0 0 22.144 22.08c13.12 7.04 26.048 9.536 68.416 9.536h567.808c42.368 0 55.296-2.496 68.48-9.536a52.352 52.352 0 0 0 22.08-22.144c7.04-13.12 9.536-26.048 9.536-68.416V324.096zm64 0v375.808c0 57.088-5.952 77.76-17.088 98.56-11.136 20.928-27.52 37.312-48.384 48.448-20.864 11.136-41.6 17.088-98.56 17.088H228.032c-57.088 0-77.76-5.952-98.56-17.088a116.288 116.288 0 0 1-48.448-48.384c-11.136-20.864-17.088-41.6-17.088-98.56V324.032c0-57.088 5.952-77.76 17.088-98.56 11.136-20.928 27.52-37.312 48.384-48.448 20.864-11.136 41.6-17.088 98.56-17.088H795.84c57.088 0 77.76 5.952 98.56 17.088 20.928 11.136 37.312 27.52 48.448 48.384 11.136 20.864 17.088 41.6 17.088 98.56z"
    }, null, -1);
    var _hoisted_368 = (0, import_vue69.createElementVNode)("path", {
      fill: "currentColor",
      d: "M64 320h896v64H64v-64zm0 128h896v64H64v-64zm128 192h256v64H192z"
    }, null, -1);
    var _hoisted_425 = [
      _hoisted_269,
      _hoisted_368
    ];
    function _sfc_render69(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue69.openBlock)(), (0, import_vue69.createElementBlock)("svg", _hoisted_169, _hoisted_425);
    }
    var credit_card_default = plugin_vue_export_helper_default(_sfc_main69, [["render", _sfc_render69], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/credit-card.vue"]]);
    var import_vue70 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main70 = {
      name: "Crop"
    };
    var _hoisted_170 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_270 = (0, import_vue70.createElementVNode)("path", {
      fill: "currentColor",
      d: "M256 768h672a32 32 0 1 1 0 64H224a32 32 0 0 1-32-32V96a32 32 0 0 1 64 0v672z"
    }, null, -1);
    var _hoisted_369 = (0, import_vue70.createElementVNode)("path", {
      fill: "currentColor",
      d: "M832 224v704a32 32 0 1 1-64 0V256H96a32 32 0 0 1 0-64h704a32 32 0 0 1 32 32z"
    }, null, -1);
    var _hoisted_426 = [
      _hoisted_270,
      _hoisted_369
    ];
    function _sfc_render70(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue70.openBlock)(), (0, import_vue70.createElementBlock)("svg", _hoisted_170, _hoisted_426);
    }
    var crop_default = plugin_vue_export_helper_default(_sfc_main70, [["render", _sfc_render70], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/crop.vue"]]);
    var import_vue71 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main71 = {
      name: "DArrowLeft"
    };
    var _hoisted_171 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_271 = (0, import_vue71.createElementVNode)("path", {
      fill: "currentColor",
      d: "M529.408 149.376a29.12 29.12 0 0 1 41.728 0 30.592 30.592 0 0 1 0 42.688L259.264 511.936l311.872 319.936a30.592 30.592 0 0 1-.512 43.264 29.12 29.12 0 0 1-41.216-.512L197.76 534.272a32 32 0 0 1 0-44.672l331.648-340.224zm256 0a29.12 29.12 0 0 1 41.728 0 30.592 30.592 0 0 1 0 42.688L515.264 511.936l311.872 319.936a30.592 30.592 0 0 1-.512 43.264 29.12 29.12 0 0 1-41.216-.512L453.76 534.272a32 32 0 0 1 0-44.672l331.648-340.224z"
    }, null, -1);
    var _hoisted_370 = [
      _hoisted_271
    ];
    function _sfc_render71(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue71.openBlock)(), (0, import_vue71.createElementBlock)("svg", _hoisted_171, _hoisted_370);
    }
    var d_arrow_left_default = plugin_vue_export_helper_default(_sfc_main71, [["render", _sfc_render71], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/d-arrow-left.vue"]]);
    var import_vue72 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main72 = {
      name: "DArrowRight"
    };
    var _hoisted_172 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_272 = (0, import_vue72.createElementVNode)("path", {
      fill: "currentColor",
      d: "M452.864 149.312a29.12 29.12 0 0 1 41.728.064L826.24 489.664a32 32 0 0 1 0 44.672L494.592 874.624a29.12 29.12 0 0 1-41.728 0 30.592 30.592 0 0 1 0-42.752L764.736 512 452.864 192a30.592 30.592 0 0 1 0-42.688zm-256 0a29.12 29.12 0 0 1 41.728.064L570.24 489.664a32 32 0 0 1 0 44.672L238.592 874.624a29.12 29.12 0 0 1-41.728 0 30.592 30.592 0 0 1 0-42.752L508.736 512 196.864 192a30.592 30.592 0 0 1 0-42.688z"
    }, null, -1);
    var _hoisted_371 = [
      _hoisted_272
    ];
    function _sfc_render72(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue72.openBlock)(), (0, import_vue72.createElementBlock)("svg", _hoisted_172, _hoisted_371);
    }
    var d_arrow_right_default = plugin_vue_export_helper_default(_sfc_main72, [["render", _sfc_render72], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/d-arrow-right.vue"]]);
    var import_vue73 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main73 = {
      name: "DCaret"
    };
    var _hoisted_173 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_273 = (0, import_vue73.createElementVNode)("path", {
      fill: "currentColor",
      d: "m512 128 288 320H224l288-320zM224 576h576L512 896 224 576z"
    }, null, -1);
    var _hoisted_372 = [
      _hoisted_273
    ];
    function _sfc_render73(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue73.openBlock)(), (0, import_vue73.createElementBlock)("svg", _hoisted_173, _hoisted_372);
    }
    var d_caret_default = plugin_vue_export_helper_default(_sfc_main73, [["render", _sfc_render73], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/d-caret.vue"]]);
    var import_vue74 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main74 = {
      name: "DataAnalysis"
    };
    var _hoisted_174 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_274 = (0, import_vue74.createElementVNode)("path", {
      fill: "currentColor",
      d: "m665.216 768 110.848 192h-73.856L591.36 768H433.024L322.176 960H248.32l110.848-192H160a32 32 0 0 1-32-32V192H64a32 32 0 0 1 0-64h896a32 32 0 1 1 0 64h-64v544a32 32 0 0 1-32 32H665.216zM832 192H192v512h640V192zM352 448a32 32 0 0 1 32 32v64a32 32 0 0 1-64 0v-64a32 32 0 0 1 32-32zm160-64a32 32 0 0 1 32 32v128a32 32 0 0 1-64 0V416a32 32 0 0 1 32-32zm160-64a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V352a32 32 0 0 1 32-32z"
    }, null, -1);
    var _hoisted_373 = [
      _hoisted_274
    ];
    function _sfc_render74(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue74.openBlock)(), (0, import_vue74.createElementBlock)("svg", _hoisted_174, _hoisted_373);
    }
    var data_analysis_default = plugin_vue_export_helper_default(_sfc_main74, [["render", _sfc_render74], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/data-analysis.vue"]]);
    var import_vue75 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main75 = {
      name: "DataBoard"
    };
    var _hoisted_175 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_275 = (0, import_vue75.createElementVNode)("path", {
      fill: "currentColor",
      d: "M32 128h960v64H32z"
    }, null, -1);
    var _hoisted_374 = (0, import_vue75.createElementVNode)("path", {
      fill: "currentColor",
      d: "M192 192v512h640V192H192zm-64-64h768v608a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V128z"
    }, null, -1);
    var _hoisted_427 = (0, import_vue75.createElementVNode)("path", {
      fill: "currentColor",
      d: "M322.176 960H248.32l144.64-250.56 55.424 32L322.176 960zm453.888 0h-73.856L576 741.44l55.424-32L776.064 960z"
    }, null, -1);
    var _hoisted_57 = [
      _hoisted_275,
      _hoisted_374,
      _hoisted_427
    ];
    function _sfc_render75(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue75.openBlock)(), (0, import_vue75.createElementBlock)("svg", _hoisted_175, _hoisted_57);
    }
    var data_board_default = plugin_vue_export_helper_default(_sfc_main75, [["render", _sfc_render75], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/data-board.vue"]]);
    var import_vue76 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main76 = {
      name: "DataLine"
    };
    var _hoisted_176 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_276 = (0, import_vue76.createElementVNode)("path", {
      fill: "currentColor",
      d: "M359.168 768H160a32 32 0 0 1-32-32V192H64a32 32 0 0 1 0-64h896a32 32 0 1 1 0 64h-64v544a32 32 0 0 1-32 32H665.216l110.848 192h-73.856L591.36 768H433.024L322.176 960H248.32l110.848-192zM832 192H192v512h640V192zM342.656 534.656a32 32 0 1 1-45.312-45.312L444.992 341.76l125.44 94.08L679.04 300.032a32 32 0 1 1 49.92 39.936L581.632 524.224 451.008 426.24 342.656 534.592z"
    }, null, -1);
    var _hoisted_375 = [
      _hoisted_276
    ];
    function _sfc_render76(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue76.openBlock)(), (0, import_vue76.createElementBlock)("svg", _hoisted_176, _hoisted_375);
    }
    var data_line_default = plugin_vue_export_helper_default(_sfc_main76, [["render", _sfc_render76], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/data-line.vue"]]);
    var import_vue77 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main77 = {
      name: "DeleteFilled"
    };
    var _hoisted_177 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_277 = (0, import_vue77.createElementVNode)("path", {
      fill: "currentColor",
      d: "M352 192V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64H96a32 32 0 0 1 0-64h256zm64 0h192v-64H416v64zM192 960a32 32 0 0 1-32-32V256h704v672a32 32 0 0 1-32 32H192zm224-192a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32zm192 0a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32z"
    }, null, -1);
    var _hoisted_376 = [
      _hoisted_277
    ];
    function _sfc_render77(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue77.openBlock)(), (0, import_vue77.createElementBlock)("svg", _hoisted_177, _hoisted_376);
    }
    var delete_filled_default = plugin_vue_export_helper_default(_sfc_main77, [["render", _sfc_render77], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/delete-filled.vue"]]);
    var import_vue78 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main78 = {
      name: "DeleteLocation"
    };
    var _hoisted_178 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_278 = (0, import_vue78.createElementVNode)("path", {
      fill: "currentColor",
      d: "M288 896h448q32 0 32 32t-32 32H288q-32 0-32-32t32-32z"
    }, null, -1);
    var _hoisted_377 = (0, import_vue78.createElementVNode)("path", {
      fill: "currentColor",
      d: "M800 416a288 288 0 1 0-576 0c0 118.144 94.528 272.128 288 456.576C705.472 688.128 800 534.144 800 416zM512 960C277.312 746.688 160 565.312 160 416a352 352 0 0 1 704 0c0 149.312-117.312 330.688-352 544z"
    }, null, -1);
    var _hoisted_428 = (0, import_vue78.createElementVNode)("path", {
      fill: "currentColor",
      d: "M384 384h256q32 0 32 32t-32 32H384q-32 0-32-32t32-32z"
    }, null, -1);
    var _hoisted_58 = [
      _hoisted_278,
      _hoisted_377,
      _hoisted_428
    ];
    function _sfc_render78(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue78.openBlock)(), (0, import_vue78.createElementBlock)("svg", _hoisted_178, _hoisted_58);
    }
    var delete_location_default = plugin_vue_export_helper_default(_sfc_main78, [["render", _sfc_render78], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/delete-location.vue"]]);
    var import_vue79 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main79 = {
      name: "Delete"
    };
    var _hoisted_179 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_279 = (0, import_vue79.createElementVNode)("path", {
      fill: "currentColor",
      d: "M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"
    }, null, -1);
    var _hoisted_378 = [
      _hoisted_279
    ];
    function _sfc_render79(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue79.openBlock)(), (0, import_vue79.createElementBlock)("svg", _hoisted_179, _hoisted_378);
    }
    var delete_default = plugin_vue_export_helper_default(_sfc_main79, [["render", _sfc_render79], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/delete.vue"]]);
    var import_vue80 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main80 = {
      name: "Dessert"
    };
    var _hoisted_180 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_280 = (0, import_vue80.createElementVNode)("path", {
      fill: "currentColor",
      d: "M128 416v-48a144 144 0 0 1 168.64-141.888 224.128 224.128 0 0 1 430.72 0A144 144 0 0 1 896 368v48a384 384 0 0 1-352 382.72V896h-64v-97.28A384 384 0 0 1 128 416zm287.104-32.064h193.792a143.808 143.808 0 0 1 58.88-132.736 160.064 160.064 0 0 0-311.552 0 143.808 143.808 0 0 1 58.88 132.8zm-72.896 0a72 72 0 1 0-140.48 0h140.48zm339.584 0h140.416a72 72 0 1 0-140.48 0zM512 736a320 320 0 0 0 318.4-288.064H193.6A320 320 0 0 0 512 736zM384 896.064h256a32 32 0 1 1 0 64H384a32 32 0 1 1 0-64z"
    }, null, -1);
    var _hoisted_379 = [
      _hoisted_280
    ];
    function _sfc_render80(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue80.openBlock)(), (0, import_vue80.createElementBlock)("svg", _hoisted_180, _hoisted_379);
    }
    var dessert_default = plugin_vue_export_helper_default(_sfc_main80, [["render", _sfc_render80], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/dessert.vue"]]);
    var import_vue81 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main81 = {
      name: "Discount"
    };
    var _hoisted_181 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_281 = (0, import_vue81.createElementVNode)("path", {
      fill: "currentColor",
      d: "M224 704h576V318.336L552.512 115.84a64 64 0 0 0-81.024 0L224 318.336V704zm0 64v128h576V768H224zM593.024 66.304l259.2 212.096A32 32 0 0 1 864 303.168V928a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V303.168a32 32 0 0 1 11.712-24.768l259.2-212.096a128 128 0 0 1 162.112 0z"
    }, null, -1);
    var _hoisted_380 = (0, import_vue81.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 448a64 64 0 1 0 0-128 64 64 0 0 0 0 128zm0 64a128 128 0 1 1 0-256 128 128 0 0 1 0 256z"
    }, null, -1);
    var _hoisted_429 = [
      _hoisted_281,
      _hoisted_380
    ];
    function _sfc_render81(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue81.openBlock)(), (0, import_vue81.createElementBlock)("svg", _hoisted_181, _hoisted_429);
    }
    var discount_default = plugin_vue_export_helper_default(_sfc_main81, [["render", _sfc_render81], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/discount.vue"]]);
    var import_vue82 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main82 = {
      name: "DishDot"
    };
    var _hoisted_182 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_282 = (0, import_vue82.createElementVNode)("path", {
      fill: "currentColor",
      d: "m384.064 274.56.064-50.688A128 128 0 0 1 512.128 96c70.528 0 127.68 57.152 127.68 127.68v50.752A448.192 448.192 0 0 1 955.392 768H68.544A448.192 448.192 0 0 1 384 274.56zM96 832h832a32 32 0 1 1 0 64H96a32 32 0 1 1 0-64zm32-128h768a384 384 0 1 0-768 0zm447.808-448v-32.32a63.68 63.68 0 0 0-63.68-63.68 64 64 0 0 0-64 63.936V256h127.68z"
    }, null, -1);
    var _hoisted_381 = [
      _hoisted_282
    ];
    function _sfc_render82(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue82.openBlock)(), (0, import_vue82.createElementBlock)("svg", _hoisted_182, _hoisted_381);
    }
    var dish_dot_default = plugin_vue_export_helper_default(_sfc_main82, [["render", _sfc_render82], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/dish-dot.vue"]]);
    var import_vue83 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main83 = {
      name: "Dish"
    };
    var _hoisted_183 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_283 = (0, import_vue83.createElementVNode)("path", {
      fill: "currentColor",
      d: "M480 257.152V192h-96a32 32 0 0 1 0-64h256a32 32 0 1 1 0 64h-96v65.152A448 448 0 0 1 955.52 768H68.48A448 448 0 0 1 480 257.152zM128 704h768a384 384 0 1 0-768 0zM96 832h832a32 32 0 1 1 0 64H96a32 32 0 1 1 0-64z"
    }, null, -1);
    var _hoisted_382 = [
      _hoisted_283
    ];
    function _sfc_render83(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue83.openBlock)(), (0, import_vue83.createElementBlock)("svg", _hoisted_183, _hoisted_382);
    }
    var dish_default = plugin_vue_export_helper_default(_sfc_main83, [["render", _sfc_render83], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/dish.vue"]]);
    var import_vue84 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main84 = {
      name: "DocumentAdd"
    };
    var _hoisted_184 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_284 = (0, import_vue84.createElementVNode)("path", {
      fill: "currentColor",
      d: "M832 384H576V128H192v768h640V384zm-26.496-64L640 154.496V320h165.504zM160 64h480l256 256v608a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32zm320 512V448h64v128h128v64H544v128h-64V640H352v-64h128z"
    }, null, -1);
    var _hoisted_383 = [
      _hoisted_284
    ];
    function _sfc_render84(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue84.openBlock)(), (0, import_vue84.createElementBlock)("svg", _hoisted_184, _hoisted_383);
    }
    var document_add_default = plugin_vue_export_helper_default(_sfc_main84, [["render", _sfc_render84], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/document-add.vue"]]);
    var import_vue85 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main85 = {
      name: "DocumentChecked"
    };
    var _hoisted_185 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_285 = (0, import_vue85.createElementVNode)("path", {
      fill: "currentColor",
      d: "M805.504 320 640 154.496V320h165.504zM832 384H576V128H192v768h640V384zM160 64h480l256 256v608a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32zm318.4 582.144 180.992-180.992L704.64 510.4 478.4 736.64 320 578.304l45.248-45.312L478.4 646.144z"
    }, null, -1);
    var _hoisted_384 = [
      _hoisted_285
    ];
    function _sfc_render85(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue85.openBlock)(), (0, import_vue85.createElementBlock)("svg", _hoisted_185, _hoisted_384);
    }
    var document_checked_default = plugin_vue_export_helper_default(_sfc_main85, [["render", _sfc_render85], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/document-checked.vue"]]);
    var import_vue86 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main86 = {
      name: "DocumentCopy"
    };
    var _hoisted_186 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_286 = (0, import_vue86.createElementVNode)("path", {
      fill: "currentColor",
      d: "M128 320v576h576V320H128zm-32-64h640a32 32 0 0 1 32 32v640a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V288a32 32 0 0 1 32-32zM960 96v704a32 32 0 0 1-32 32h-96v-64h64V128H384v64h-64V96a32 32 0 0 1 32-32h576a32 32 0 0 1 32 32zM256 672h320v64H256v-64zm0-192h320v64H256v-64z"
    }, null, -1);
    var _hoisted_385 = [
      _hoisted_286
    ];
    function _sfc_render86(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue86.openBlock)(), (0, import_vue86.createElementBlock)("svg", _hoisted_186, _hoisted_385);
    }
    var document_copy_default = plugin_vue_export_helper_default(_sfc_main86, [["render", _sfc_render86], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/document-copy.vue"]]);
    var import_vue87 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main87 = {
      name: "DocumentDelete"
    };
    var _hoisted_187 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_287 = (0, import_vue87.createElementVNode)("path", {
      fill: "currentColor",
      d: "M805.504 320 640 154.496V320h165.504zM832 384H576V128H192v768h640V384zM160 64h480l256 256v608a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32zm308.992 546.304-90.496-90.624 45.248-45.248 90.56 90.496 90.496-90.432 45.248 45.248-90.496 90.56 90.496 90.496-45.248 45.248-90.496-90.496-90.56 90.496-45.248-45.248 90.496-90.496z"
    }, null, -1);
    var _hoisted_386 = [
      _hoisted_287
    ];
    function _sfc_render87(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue87.openBlock)(), (0, import_vue87.createElementBlock)("svg", _hoisted_187, _hoisted_386);
    }
    var document_delete_default = plugin_vue_export_helper_default(_sfc_main87, [["render", _sfc_render87], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/document-delete.vue"]]);
    var import_vue88 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main88 = {
      name: "DocumentRemove"
    };
    var _hoisted_188 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_288 = (0, import_vue88.createElementVNode)("path", {
      fill: "currentColor",
      d: "M805.504 320 640 154.496V320h165.504zM832 384H576V128H192v768h640V384zM160 64h480l256 256v608a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32zm192 512h320v64H352v-64z"
    }, null, -1);
    var _hoisted_387 = [
      _hoisted_288
    ];
    function _sfc_render88(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue88.openBlock)(), (0, import_vue88.createElementBlock)("svg", _hoisted_188, _hoisted_387);
    }
    var document_remove_default = plugin_vue_export_helper_default(_sfc_main88, [["render", _sfc_render88], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/document-remove.vue"]]);
    var import_vue89 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main89 = {
      name: "Document"
    };
    var _hoisted_189 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_289 = (0, import_vue89.createElementVNode)("path", {
      fill: "currentColor",
      d: "M832 384H576V128H192v768h640V384zm-26.496-64L640 154.496V320h165.504zM160 64h480l256 256v608a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32zm160 448h384v64H320v-64zm0-192h160v64H320v-64zm0 384h384v64H320v-64z"
    }, null, -1);
    var _hoisted_388 = [
      _hoisted_289
    ];
    function _sfc_render89(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue89.openBlock)(), (0, import_vue89.createElementBlock)("svg", _hoisted_189, _hoisted_388);
    }
    var document_default = plugin_vue_export_helper_default(_sfc_main89, [["render", _sfc_render89], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/document.vue"]]);
    var import_vue90 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main90 = {
      name: "Download"
    };
    var _hoisted_190 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_290 = (0, import_vue90.createElementVNode)("path", {
      fill: "currentColor",
      d: "M160 832h704a32 32 0 1 1 0 64H160a32 32 0 1 1 0-64zm384-253.696 236.288-236.352 45.248 45.248L508.8 704 192 387.2l45.248-45.248L480 584.704V128h64v450.304z"
    }, null, -1);
    var _hoisted_389 = [
      _hoisted_290
    ];
    function _sfc_render90(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue90.openBlock)(), (0, import_vue90.createElementBlock)("svg", _hoisted_190, _hoisted_389);
    }
    var download_default = plugin_vue_export_helper_default(_sfc_main90, [["render", _sfc_render90], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/download.vue"]]);
    var import_vue91 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main91 = {
      name: "Drizzling"
    };
    var _hoisted_191 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_291 = (0, import_vue91.createElementVNode)("path", {
      fill: "currentColor",
      d: "m739.328 291.328-35.2-6.592-12.8-33.408a192.064 192.064 0 0 0-365.952 23.232l-9.92 40.896-41.472 7.04a176.32 176.32 0 0 0-146.24 173.568c0 97.28 78.72 175.936 175.808 175.936h400a192 192 0 0 0 35.776-380.672zM959.552 480a256 256 0 0 1-256 256h-400A239.808 239.808 0 0 1 63.744 496.192a240.32 240.32 0 0 1 199.488-236.8 256.128 256.128 0 0 1 487.872-30.976A256.064 256.064 0 0 1 959.552 480zM288 800h64v64h-64v-64zm192 0h64v64h-64v-64zm-96 96h64v64h-64v-64zm192 0h64v64h-64v-64zm96-96h64v64h-64v-64z"
    }, null, -1);
    var _hoisted_390 = [
      _hoisted_291
    ];
    function _sfc_render91(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue91.openBlock)(), (0, import_vue91.createElementBlock)("svg", _hoisted_191, _hoisted_390);
    }
    var drizzling_default = plugin_vue_export_helper_default(_sfc_main91, [["render", _sfc_render91], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/drizzling.vue"]]);
    var import_vue92 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main92 = {
      name: "EditPen"
    };
    var _hoisted_192 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_292 = (0, import_vue92.createElementVNode)("path", {
      d: "m199.04 672.64 193.984 112 224-387.968-193.92-112-224 388.032zm-23.872 60.16 32.896 148.288 144.896-45.696L175.168 732.8zM455.04 229.248l193.92 112 56.704-98.112-193.984-112-56.64 98.112zM104.32 708.8l384-665.024 304.768 175.936L409.152 884.8h.064l-248.448 78.336L104.32 708.8zm384 254.272v-64h448v64h-448z",
      fill: "currentColor"
    }, null, -1);
    var _hoisted_391 = [
      _hoisted_292
    ];
    function _sfc_render92(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue92.openBlock)(), (0, import_vue92.createElementBlock)("svg", _hoisted_192, _hoisted_391);
    }
    var edit_pen_default = plugin_vue_export_helper_default(_sfc_main92, [["render", _sfc_render92], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/edit-pen.vue"]]);
    var import_vue93 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main93 = {
      name: "Edit"
    };
    var _hoisted_193 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_293 = (0, import_vue93.createElementVNode)("path", {
      fill: "currentColor",
      d: "M832 512a32 32 0 1 1 64 0v352a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h352a32 32 0 0 1 0 64H192v640h640V512z"
    }, null, -1);
    var _hoisted_392 = (0, import_vue93.createElementVNode)("path", {
      fill: "currentColor",
      d: "m469.952 554.24 52.8-7.552L847.104 222.4a32 32 0 1 0-45.248-45.248L477.44 501.44l-7.552 52.8zm422.4-422.4a96 96 0 0 1 0 135.808l-331.84 331.84a32 32 0 0 1-18.112 9.088L436.8 623.68a32 32 0 0 1-36.224-36.224l15.104-105.6a32 32 0 0 1 9.024-18.112l331.904-331.84a96 96 0 0 1 135.744 0z"
    }, null, -1);
    var _hoisted_430 = [
      _hoisted_293,
      _hoisted_392
    ];
    function _sfc_render93(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue93.openBlock)(), (0, import_vue93.createElementBlock)("svg", _hoisted_193, _hoisted_430);
    }
    var edit_default = plugin_vue_export_helper_default(_sfc_main93, [["render", _sfc_render93], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/edit.vue"]]);
    var import_vue94 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main94 = {
      name: "ElemeFilled"
    };
    var _hoisted_194 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_294 = (0, import_vue94.createElementVNode)("path", {
      fill: "currentColor",
      d: "M176 64h672c61.824 0 112 50.176 112 112v672a112 112 0 0 1-112 112H176A112 112 0 0 1 64 848V176c0-61.824 50.176-112 112-112zm150.528 173.568c-152.896 99.968-196.544 304.064-97.408 456.96a330.688 330.688 0 0 0 456.96 96.64c9.216-5.888 17.6-11.776 25.152-18.56a18.24 18.24 0 0 0 4.224-24.32L700.352 724.8a47.552 47.552 0 0 0-65.536-14.272A234.56 234.56 0 0 1 310.592 641.6C240 533.248 271.104 387.968 379.456 316.48a234.304 234.304 0 0 1 276.352 15.168c1.664.832 2.56 2.56 3.392 4.224 5.888 8.384 3.328 19.328-5.12 25.216L456.832 489.6a47.552 47.552 0 0 0-14.336 65.472l16 24.384c5.888 8.384 16.768 10.88 25.216 5.056l308.224-199.936a19.584 19.584 0 0 0 6.72-23.488v-.896c-4.992-9.216-10.048-17.6-15.104-26.88-99.968-151.168-304.064-194.88-456.96-95.744zM786.88 504.704l-62.208 40.32c-8.32 5.888-10.88 16.768-4.992 25.216L760 632.32c5.888 8.448 16.768 11.008 25.152 5.12l31.104-20.16a55.36 55.36 0 0 0 16-76.48l-20.224-31.04a19.52 19.52 0 0 0-25.152-5.12z"
    }, null, -1);
    var _hoisted_393 = [
      _hoisted_294
    ];
    function _sfc_render94(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue94.openBlock)(), (0, import_vue94.createElementBlock)("svg", _hoisted_194, _hoisted_393);
    }
    var eleme_filled_default = plugin_vue_export_helper_default(_sfc_main94, [["render", _sfc_render94], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/eleme-filled.vue"]]);
    var import_vue95 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main95 = {
      name: "Eleme"
    };
    var _hoisted_195 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_295 = (0, import_vue95.createElementVNode)("path", {
      fill: "currentColor",
      d: "M300.032 188.8c174.72-113.28 408-63.36 522.24 109.44 5.76 10.56 11.52 20.16 17.28 30.72v.96a22.4 22.4 0 0 1-7.68 26.88l-352.32 228.48c-9.6 6.72-22.08 3.84-28.8-5.76l-18.24-27.84a54.336 54.336 0 0 1 16.32-74.88l225.6-146.88c9.6-6.72 12.48-19.2 5.76-28.8-.96-1.92-1.92-3.84-3.84-4.8a267.84 267.84 0 0 0-315.84-17.28c-123.84 81.6-159.36 247.68-78.72 371.52a268.096 268.096 0 0 0 370.56 78.72 54.336 54.336 0 0 1 74.88 16.32l17.28 26.88c5.76 9.6 3.84 21.12-4.8 27.84-8.64 7.68-18.24 14.4-28.8 21.12a377.92 377.92 0 0 1-522.24-110.4c-113.28-174.72-63.36-408 111.36-522.24zm526.08 305.28a22.336 22.336 0 0 1 28.8 5.76l23.04 35.52a63.232 63.232 0 0 1-18.24 87.36l-35.52 23.04c-9.6 6.72-22.08 3.84-28.8-5.76l-46.08-71.04c-6.72-9.6-3.84-22.08 5.76-28.8l71.04-46.08z"
    }, null, -1);
    var _hoisted_394 = [
      _hoisted_295
    ];
    function _sfc_render95(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue95.openBlock)(), (0, import_vue95.createElementBlock)("svg", _hoisted_195, _hoisted_394);
    }
    var eleme_default = plugin_vue_export_helper_default(_sfc_main95, [["render", _sfc_render95], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/eleme.vue"]]);
    var import_vue96 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main96 = {
      name: "ElementPlus"
    };
    var _hoisted_196 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_296 = (0, import_vue96.createElementVNode)("path", {
      d: "M839.7 734.7c0 33.3-17.9 41-17.9 41S519.7 949.8 499.2 960c-10.2 5.1-20.5 5.1-30.7 0 0 0-314.9-184.3-325.1-192-5.1-5.1-10.2-12.8-12.8-20.5V368.6c0-17.9 20.5-28.2 20.5-28.2L466 158.6c12.8-5.1 25.6-5.1 38.4 0 0 0 279 161.3 309.8 179.2 17.9 7.7 28.2 25.6 25.6 46.1-.1-5-.1 317.5-.1 350.8zM714.2 371.2c-64-35.8-217.6-125.4-217.6-125.4-7.7-5.1-20.5-5.1-30.7 0L217.6 389.1s-17.9 10.2-17.9 23v297c0 5.1 5.1 12.8 7.7 17.9 7.7 5.1 256 148.5 256 148.5 7.7 5.1 17.9 5.1 25.6 0 15.4-7.7 250.9-145.9 250.9-145.9s12.8-5.1 12.8-30.7v-74.2l-276.5 169v-64c0-17.9 7.7-30.7 20.5-46.1L745 535c5.1-7.7 10.2-20.5 10.2-30.7v-66.6l-279 169v-69.1c0-15.4 5.1-30.7 17.9-38.4l220.1-128zM919 135.7c0-5.1-5.1-7.7-7.7-7.7h-58.9V66.6c0-5.1-5.1-5.1-10.2-5.1l-30.7 5.1c-5.1 0-5.1 2.6-5.1 5.1V128h-56.3c-5.1 0-5.1 5.1-7.7 5.1v38.4h69.1v64c0 5.1 5.1 5.1 10.2 5.1l30.7-5.1c5.1 0 5.1-2.6 5.1-5.1v-56.3h64l-2.5-38.4z",
      fill: "currentColor"
    }, null, -1);
    var _hoisted_395 = [
      _hoisted_296
    ];
    function _sfc_render96(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue96.openBlock)(), (0, import_vue96.createElementBlock)("svg", _hoisted_196, _hoisted_395);
    }
    var element_plus_default = plugin_vue_export_helper_default(_sfc_main96, [["render", _sfc_render96], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/element-plus.vue"]]);
    var import_vue97 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main97 = {
      name: "Expand"
    };
    var _hoisted_197 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_297 = (0, import_vue97.createElementVNode)("path", {
      fill: "currentColor",
      d: "M128 192h768v128H128V192zm0 256h512v128H128V448zm0 256h768v128H128V704zm576-352 192 160-192 128V352z"
    }, null, -1);
    var _hoisted_396 = [
      _hoisted_297
    ];
    function _sfc_render97(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue97.openBlock)(), (0, import_vue97.createElementBlock)("svg", _hoisted_197, _hoisted_396);
    }
    var expand_default = plugin_vue_export_helper_default(_sfc_main97, [["render", _sfc_render97], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/expand.vue"]]);
    var import_vue98 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main98 = {
      name: "Failed"
    };
    var _hoisted_198 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_298 = (0, import_vue98.createElementVNode)("path", {
      fill: "currentColor",
      d: "m557.248 608 135.744-135.744-45.248-45.248-135.68 135.744-135.808-135.68-45.248 45.184L466.752 608l-135.68 135.68 45.184 45.312L512 653.248l135.744 135.744 45.248-45.248L557.312 608zM704 192h160v736H160V192h160v64h384v-64zm-320 0V96h256v96H384z"
    }, null, -1);
    var _hoisted_397 = [
      _hoisted_298
    ];
    function _sfc_render98(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue98.openBlock)(), (0, import_vue98.createElementBlock)("svg", _hoisted_198, _hoisted_397);
    }
    var failed_default = plugin_vue_export_helper_default(_sfc_main98, [["render", _sfc_render98], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/failed.vue"]]);
    var import_vue99 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main99 = {
      name: "Female"
    };
    var _hoisted_199 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_299 = (0, import_vue99.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 640a256 256 0 1 0 0-512 256 256 0 0 0 0 512zm0 64a320 320 0 1 1 0-640 320 320 0 0 1 0 640z"
    }, null, -1);
    var _hoisted_398 = (0, import_vue99.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 640q32 0 32 32v256q0 32-32 32t-32-32V672q0-32 32-32z"
    }, null, -1);
    var _hoisted_431 = (0, import_vue99.createElementVNode)("path", {
      fill: "currentColor",
      d: "M352 800h320q32 0 32 32t-32 32H352q-32 0-32-32t32-32z"
    }, null, -1);
    var _hoisted_59 = [
      _hoisted_299,
      _hoisted_398,
      _hoisted_431
    ];
    function _sfc_render99(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue99.openBlock)(), (0, import_vue99.createElementBlock)("svg", _hoisted_199, _hoisted_59);
    }
    var female_default = plugin_vue_export_helper_default(_sfc_main99, [["render", _sfc_render99], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/female.vue"]]);
    var import_vue100 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main100 = {
      name: "Files"
    };
    var _hoisted_1100 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2100 = (0, import_vue100.createElementVNode)("path", {
      fill: "currentColor",
      d: "M128 384v448h768V384H128zm-32-64h832a32 32 0 0 1 32 32v512a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V352a32 32 0 0 1 32-32zm64-128h704v64H160zm96-128h512v64H256z"
    }, null, -1);
    var _hoisted_399 = [
      _hoisted_2100
    ];
    function _sfc_render100(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue100.openBlock)(), (0, import_vue100.createElementBlock)("svg", _hoisted_1100, _hoisted_399);
    }
    var files_default = plugin_vue_export_helper_default(_sfc_main100, [["render", _sfc_render100], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/files.vue"]]);
    var import_vue101 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main101 = {
      name: "Film"
    };
    var _hoisted_1101 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2101 = (0, import_vue101.createElementVNode)("path", {
      fill: "currentColor",
      d: "M160 160v704h704V160H160zm-32-64h768a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H128a32 32 0 0 1-32-32V128a32 32 0 0 1 32-32z"
    }, null, -1);
    var _hoisted_3100 = (0, import_vue101.createElementVNode)("path", {
      fill: "currentColor",
      d: "M320 288V128h64v352h256V128h64v160h160v64H704v128h160v64H704v128h160v64H704v160h-64V544H384v352h-64V736H128v-64h192V544H128v-64h192V352H128v-64h192z"
    }, null, -1);
    var _hoisted_432 = [
      _hoisted_2101,
      _hoisted_3100
    ];
    function _sfc_render101(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue101.openBlock)(), (0, import_vue101.createElementBlock)("svg", _hoisted_1101, _hoisted_432);
    }
    var film_default = plugin_vue_export_helper_default(_sfc_main101, [["render", _sfc_render101], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/film.vue"]]);
    var import_vue102 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main102 = {
      name: "Filter"
    };
    var _hoisted_1102 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2102 = (0, import_vue102.createElementVNode)("path", {
      fill: "currentColor",
      d: "M384 523.392V928a32 32 0 0 0 46.336 28.608l192-96A32 32 0 0 0 640 832V523.392l280.768-343.104a32 32 0 1 0-49.536-40.576l-288 352A32 32 0 0 0 576 512v300.224l-128 64V512a32 32 0 0 0-7.232-20.288L195.52 192H704a32 32 0 1 0 0-64H128a32 32 0 0 0-24.768 52.288L384 523.392z"
    }, null, -1);
    var _hoisted_3101 = [
      _hoisted_2102
    ];
    function _sfc_render102(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue102.openBlock)(), (0, import_vue102.createElementBlock)("svg", _hoisted_1102, _hoisted_3101);
    }
    var filter_default = plugin_vue_export_helper_default(_sfc_main102, [["render", _sfc_render102], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/filter.vue"]]);
    var import_vue103 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main103 = {
      name: "Finished"
    };
    var _hoisted_1103 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2103 = (0, import_vue103.createElementVNode)("path", {
      fill: "currentColor",
      d: "M280.768 753.728 691.456 167.04a32 32 0 1 1 52.416 36.672L314.24 817.472a32 32 0 0 1-45.44 7.296l-230.4-172.8a32 32 0 0 1 38.4-51.2l203.968 152.96zM736 448a32 32 0 1 1 0-64h192a32 32 0 1 1 0 64H736zM608 640a32 32 0 0 1 0-64h319.936a32 32 0 1 1 0 64H608zM480 832a32 32 0 1 1 0-64h447.936a32 32 0 1 1 0 64H480z"
    }, null, -1);
    var _hoisted_3102 = [
      _hoisted_2103
    ];
    function _sfc_render103(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue103.openBlock)(), (0, import_vue103.createElementBlock)("svg", _hoisted_1103, _hoisted_3102);
    }
    var finished_default = plugin_vue_export_helper_default(_sfc_main103, [["render", _sfc_render103], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/finished.vue"]]);
    var import_vue104 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main104 = {
      name: "FirstAidKit"
    };
    var _hoisted_1104 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2104 = (0, import_vue104.createElementVNode)("path", {
      fill: "currentColor",
      d: "M192 256a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h640a64 64 0 0 0 64-64V320a64 64 0 0 0-64-64H192zm0-64h640a128 128 0 0 1 128 128v448a128 128 0 0 1-128 128H192A128 128 0 0 1 64 768V320a128 128 0 0 1 128-128z"
    }, null, -1);
    var _hoisted_3103 = (0, import_vue104.createElementVNode)("path", {
      fill: "currentColor",
      d: "M544 512h96a32 32 0 0 1 0 64h-96v96a32 32 0 0 1-64 0v-96h-96a32 32 0 0 1 0-64h96v-96a32 32 0 0 1 64 0v96zM352 128v64h320v-64H352zm-32-64h384a32 32 0 0 1 32 32v128a32 32 0 0 1-32 32H320a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32z"
    }, null, -1);
    var _hoisted_433 = [
      _hoisted_2104,
      _hoisted_3103
    ];
    function _sfc_render104(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue104.openBlock)(), (0, import_vue104.createElementBlock)("svg", _hoisted_1104, _hoisted_433);
    }
    var first_aid_kit_default = plugin_vue_export_helper_default(_sfc_main104, [["render", _sfc_render104], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/first-aid-kit.vue"]]);
    var import_vue105 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main105 = {
      name: "Flag"
    };
    var _hoisted_1105 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2105 = (0, import_vue105.createElementVNode)("path", {
      fill: "currentColor",
      d: "M288 128h608L736 384l160 256H288v320h-96V64h96v64z"
    }, null, -1);
    var _hoisted_3104 = [
      _hoisted_2105
    ];
    function _sfc_render105(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue105.openBlock)(), (0, import_vue105.createElementBlock)("svg", _hoisted_1105, _hoisted_3104);
    }
    var flag_default = plugin_vue_export_helper_default(_sfc_main105, [["render", _sfc_render105], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/flag.vue"]]);
    var import_vue106 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main106 = {
      name: "Fold"
    };
    var _hoisted_1106 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2106 = (0, import_vue106.createElementVNode)("path", {
      fill: "currentColor",
      d: "M896 192H128v128h768V192zm0 256H384v128h512V448zm0 256H128v128h768V704zM320 384 128 512l192 128V384z"
    }, null, -1);
    var _hoisted_3105 = [
      _hoisted_2106
    ];
    function _sfc_render106(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue106.openBlock)(), (0, import_vue106.createElementBlock)("svg", _hoisted_1106, _hoisted_3105);
    }
    var fold_default = plugin_vue_export_helper_default(_sfc_main106, [["render", _sfc_render106], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/fold.vue"]]);
    var import_vue107 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main107 = {
      name: "FolderAdd"
    };
    var _hoisted_1107 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2107 = (0, import_vue107.createElementVNode)("path", {
      fill: "currentColor",
      d: "M128 192v640h768V320H485.76L357.504 192H128zm-32-64h287.872l128.384 128H928a32 32 0 0 1 32 32v576a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32zm384 416V416h64v128h128v64H544v128h-64V608H352v-64h128z"
    }, null, -1);
    var _hoisted_3106 = [
      _hoisted_2107
    ];
    function _sfc_render107(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue107.openBlock)(), (0, import_vue107.createElementBlock)("svg", _hoisted_1107, _hoisted_3106);
    }
    var folder_add_default = plugin_vue_export_helper_default(_sfc_main107, [["render", _sfc_render107], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/folder-add.vue"]]);
    var import_vue108 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main108 = {
      name: "FolderChecked"
    };
    var _hoisted_1108 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2108 = (0, import_vue108.createElementVNode)("path", {
      fill: "currentColor",
      d: "M128 192v640h768V320H485.76L357.504 192H128zm-32-64h287.872l128.384 128H928a32 32 0 0 1 32 32v576a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32zm414.08 502.144 180.992-180.992L736.32 494.4 510.08 720.64l-158.4-158.336 45.248-45.312L510.08 630.144z"
    }, null, -1);
    var _hoisted_3107 = [
      _hoisted_2108
    ];
    function _sfc_render108(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue108.openBlock)(), (0, import_vue108.createElementBlock)("svg", _hoisted_1108, _hoisted_3107);
    }
    var folder_checked_default = plugin_vue_export_helper_default(_sfc_main108, [["render", _sfc_render108], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/folder-checked.vue"]]);
    var import_vue109 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main109 = {
      name: "FolderDelete"
    };
    var _hoisted_1109 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2109 = (0, import_vue109.createElementVNode)("path", {
      fill: "currentColor",
      d: "M128 192v640h768V320H485.76L357.504 192H128zm-32-64h287.872l128.384 128H928a32 32 0 0 1 32 32v576a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32zm370.752 448-90.496-90.496 45.248-45.248L512 530.752l90.496-90.496 45.248 45.248L557.248 576l90.496 90.496-45.248 45.248L512 621.248l-90.496 90.496-45.248-45.248L466.752 576z"
    }, null, -1);
    var _hoisted_3108 = [
      _hoisted_2109
    ];
    function _sfc_render109(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue109.openBlock)(), (0, import_vue109.createElementBlock)("svg", _hoisted_1109, _hoisted_3108);
    }
    var folder_delete_default = plugin_vue_export_helper_default(_sfc_main109, [["render", _sfc_render109], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/folder-delete.vue"]]);
    var import_vue110 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main110 = {
      name: "FolderOpened"
    };
    var _hoisted_1110 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2110 = (0, import_vue110.createElementVNode)("path", {
      fill: "currentColor",
      d: "M878.08 448H241.92l-96 384h636.16l96-384zM832 384v-64H485.76L357.504 192H128v448l57.92-231.744A32 32 0 0 1 216.96 384H832zm-24.96 512H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h287.872l128.384 128H864a32 32 0 0 1 32 32v96h23.04a32 32 0 0 1 31.04 39.744l-112 448A32 32 0 0 1 807.04 896z"
    }, null, -1);
    var _hoisted_3109 = [
      _hoisted_2110
    ];
    function _sfc_render110(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue110.openBlock)(), (0, import_vue110.createElementBlock)("svg", _hoisted_1110, _hoisted_3109);
    }
    var folder_opened_default = plugin_vue_export_helper_default(_sfc_main110, [["render", _sfc_render110], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/folder-opened.vue"]]);
    var import_vue111 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main111 = {
      name: "FolderRemove"
    };
    var _hoisted_1111 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2111 = (0, import_vue111.createElementVNode)("path", {
      fill: "currentColor",
      d: "M128 192v640h768V320H485.76L357.504 192H128zm-32-64h287.872l128.384 128H928a32 32 0 0 1 32 32v576a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32zm256 416h320v64H352v-64z"
    }, null, -1);
    var _hoisted_3110 = [
      _hoisted_2111
    ];
    function _sfc_render111(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue111.openBlock)(), (0, import_vue111.createElementBlock)("svg", _hoisted_1111, _hoisted_3110);
    }
    var folder_remove_default = plugin_vue_export_helper_default(_sfc_main111, [["render", _sfc_render111], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/folder-remove.vue"]]);
    var import_vue112 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main112 = {
      name: "Folder"
    };
    var _hoisted_1112 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2112 = (0, import_vue112.createElementVNode)("path", {
      fill: "currentColor",
      d: "M128 192v640h768V320H485.76L357.504 192H128zm-32-64h287.872l128.384 128H928a32 32 0 0 1 32 32v576a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32z"
    }, null, -1);
    var _hoisted_3111 = [
      _hoisted_2112
    ];
    function _sfc_render112(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue112.openBlock)(), (0, import_vue112.createElementBlock)("svg", _hoisted_1112, _hoisted_3111);
    }
    var folder_default = plugin_vue_export_helper_default(_sfc_main112, [["render", _sfc_render112], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/folder.vue"]]);
    var import_vue113 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main113 = {
      name: "Food"
    };
    var _hoisted_1113 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2113 = (0, import_vue113.createElementVNode)("path", {
      fill: "currentColor",
      d: "M128 352.576V352a288 288 0 0 1 491.072-204.224 192 192 0 0 1 274.24 204.48 64 64 0 0 1 57.216 74.24C921.6 600.512 850.048 710.656 736 756.992V800a96 96 0 0 1-96 96H384a96 96 0 0 1-96-96v-43.008c-114.048-46.336-185.6-156.48-214.528-330.496A64 64 0 0 1 128 352.64zm64-.576h64a160 160 0 0 1 320 0h64a224 224 0 0 0-448 0zm128 0h192a96 96 0 0 0-192 0zm439.424 0h68.544A128.256 128.256 0 0 0 704 192c-15.36 0-29.952 2.688-43.52 7.616 11.328 18.176 20.672 37.76 27.84 58.304A64.128 64.128 0 0 1 759.424 352zM672 768H352v32a32 32 0 0 0 32 32h256a32 32 0 0 0 32-32v-32zm-342.528-64h365.056c101.504-32.64 165.76-124.928 192.896-288H136.576c27.136 163.072 91.392 255.36 192.896 288z"
    }, null, -1);
    var _hoisted_3112 = [
      _hoisted_2113
    ];
    function _sfc_render113(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue113.openBlock)(), (0, import_vue113.createElementBlock)("svg", _hoisted_1113, _hoisted_3112);
    }
    var food_default = plugin_vue_export_helper_default(_sfc_main113, [["render", _sfc_render113], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/food.vue"]]);
    var import_vue114 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main114 = {
      name: "Football"
    };
    var _hoisted_1114 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2114 = (0, import_vue114.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 960a448 448 0 1 1 0-896 448 448 0 0 1 0 896zm0-64a384 384 0 1 0 0-768 384 384 0 0 0 0 768z"
    }, null, -1);
    var _hoisted_3113 = (0, import_vue114.createElementVNode)("path", {
      fill: "currentColor",
      d: "M186.816 268.288c16-16.384 31.616-31.744 46.976-46.08 17.472 30.656 39.808 58.112 65.984 81.28l-32.512 56.448a385.984 385.984 0 0 1-80.448-91.648zm653.696-5.312a385.92 385.92 0 0 1-83.776 96.96l-32.512-56.384a322.923 322.923 0 0 0 68.48-85.76c15.552 14.08 31.488 29.12 47.808 45.184zM465.984 445.248l11.136-63.104a323.584 323.584 0 0 0 69.76 0l11.136 63.104a387.968 387.968 0 0 1-92.032 0zm-62.72-12.8A381.824 381.824 0 0 1 320 396.544l32-55.424a319.885 319.885 0 0 0 62.464 27.712l-11.2 63.488zm300.8-35.84a381.824 381.824 0 0 1-83.328 35.84l-11.2-63.552A319.885 319.885 0 0 0 672 341.184l32 55.424zm-520.768 364.8a385.92 385.92 0 0 1 83.968-97.28l32.512 56.32c-26.88 23.936-49.856 52.352-67.52 84.032-16-13.44-32.32-27.712-48.96-43.072zm657.536.128a1442.759 1442.759 0 0 1-49.024 43.072 321.408 321.408 0 0 0-67.584-84.16l32.512-56.32c33.216 27.456 61.696 60.352 84.096 97.408zM465.92 578.752a387.968 387.968 0 0 1 92.032 0l-11.136 63.104a323.584 323.584 0 0 0-69.76 0l-11.136-63.104zm-62.72 12.8 11.2 63.552a319.885 319.885 0 0 0-62.464 27.712L320 627.392a381.824 381.824 0 0 1 83.264-35.84zm300.8 35.84-32 55.424a318.272 318.272 0 0 0-62.528-27.712l11.2-63.488c29.44 8.64 57.28 20.736 83.264 35.776z"
    }, null, -1);
    var _hoisted_434 = [
      _hoisted_2114,
      _hoisted_3113
    ];
    function _sfc_render114(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue114.openBlock)(), (0, import_vue114.createElementBlock)("svg", _hoisted_1114, _hoisted_434);
    }
    var football_default = plugin_vue_export_helper_default(_sfc_main114, [["render", _sfc_render114], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/football.vue"]]);
    var import_vue115 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main115 = {
      name: "ForkSpoon"
    };
    var _hoisted_1115 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2115 = (0, import_vue115.createElementVNode)("path", {
      fill: "currentColor",
      d: "M256 410.304V96a32 32 0 0 1 64 0v314.304a96 96 0 0 0 64-90.56V96a32 32 0 0 1 64 0v223.744a160 160 0 0 1-128 156.8V928a32 32 0 1 1-64 0V476.544a160 160 0 0 1-128-156.8V96a32 32 0 0 1 64 0v223.744a96 96 0 0 0 64 90.56zM672 572.48C581.184 552.128 512 446.848 512 320c0-141.44 85.952-256 192-256s192 114.56 192 256c0 126.848-69.184 232.128-160 252.48V928a32 32 0 1 1-64 0V572.48zM704 512c66.048 0 128-82.56 128-192s-61.952-192-128-192-128 82.56-128 192 61.952 192 128 192z"
    }, null, -1);
    var _hoisted_3114 = [
      _hoisted_2115
    ];
    function _sfc_render115(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue115.openBlock)(), (0, import_vue115.createElementBlock)("svg", _hoisted_1115, _hoisted_3114);
    }
    var fork_spoon_default = plugin_vue_export_helper_default(_sfc_main115, [["render", _sfc_render115], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/fork-spoon.vue"]]);
    var import_vue116 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main116 = {
      name: "Fries"
    };
    var _hoisted_1116 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2116 = (0, import_vue116.createElementVNode)("path", {
      fill: "currentColor",
      d: "M608 224v-64a32 32 0 0 0-64 0v336h26.88A64 64 0 0 0 608 484.096V224zm101.12 160A64 64 0 0 0 672 395.904V384h64V224a32 32 0 1 0-64 0v160h37.12zm74.88 0a92.928 92.928 0 0 1 91.328 110.08l-60.672 323.584A96 96 0 0 1 720.32 896H303.68a96 96 0 0 1-94.336-78.336L148.672 494.08A92.928 92.928 0 0 1 240 384h-16V224a96 96 0 0 1 188.608-25.28A95.744 95.744 0 0 1 480 197.44V160a96 96 0 0 1 188.608-25.28A96 96 0 0 1 800 224v160h-16zM670.784 512a128 128 0 0 1-99.904 48H453.12a128 128 0 0 1-99.84-48H352v-1.536a128.128 128.128 0 0 1-9.984-14.976L314.88 448H240a28.928 28.928 0 0 0-28.48 34.304L241.088 640h541.824l29.568-157.696A28.928 28.928 0 0 0 784 448h-74.88l-27.136 47.488A132.405 132.405 0 0 1 672 510.464V512h-1.216zM480 288a32 32 0 0 0-64 0v196.096A64 64 0 0 0 453.12 496H480V288zm-128 96V224a32 32 0 0 0-64 0v160h64-37.12A64 64 0 0 1 352 395.904zm-98.88 320 19.072 101.888A32 32 0 0 0 303.68 832h416.64a32 32 0 0 0 31.488-26.112L770.88 704H253.12z"
    }, null, -1);
    var _hoisted_3115 = [
      _hoisted_2116
    ];
    function _sfc_render116(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue116.openBlock)(), (0, import_vue116.createElementBlock)("svg", _hoisted_1116, _hoisted_3115);
    }
    var fries_default = plugin_vue_export_helper_default(_sfc_main116, [["render", _sfc_render116], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/fries.vue"]]);
    var import_vue117 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main117 = {
      name: "FullScreen"
    };
    var _hoisted_1117 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2117 = (0, import_vue117.createElementVNode)("path", {
      fill: "currentColor",
      d: "m160 96.064 192 .192a32 32 0 0 1 0 64l-192-.192V352a32 32 0 0 1-64 0V96h64v.064zm0 831.872V928H96V672a32 32 0 1 1 64 0v191.936l192-.192a32 32 0 1 1 0 64l-192 .192zM864 96.064V96h64v256a32 32 0 1 1-64 0V160.064l-192 .192a32 32 0 1 1 0-64l192-.192zm0 831.872-192-.192a32 32 0 0 1 0-64l192 .192V672a32 32 0 1 1 64 0v256h-64v-.064z"
    }, null, -1);
    var _hoisted_3116 = [
      _hoisted_2117
    ];
    function _sfc_render117(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue117.openBlock)(), (0, import_vue117.createElementBlock)("svg", _hoisted_1117, _hoisted_3116);
    }
    var full_screen_default = plugin_vue_export_helper_default(_sfc_main117, [["render", _sfc_render117], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/full-screen.vue"]]);
    var import_vue118 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main118 = {
      name: "GobletFull"
    };
    var _hoisted_1118 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2118 = (0, import_vue118.createElementVNode)("path", {
      fill: "currentColor",
      d: "M256 320h512c0-78.592-12.608-142.4-36.928-192h-434.24C269.504 192.384 256 256.256 256 320zm503.936 64H264.064a256.128 256.128 0 0 0 495.872 0zM544 638.4V896h96a32 32 0 1 1 0 64H384a32 32 0 1 1 0-64h96V638.4A320 320 0 0 1 192 320c0-85.632 21.312-170.944 64-256h512c42.688 64.32 64 149.632 64 256a320 320 0 0 1-288 318.4z"
    }, null, -1);
    var _hoisted_3117 = [
      _hoisted_2118
    ];
    function _sfc_render118(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue118.openBlock)(), (0, import_vue118.createElementBlock)("svg", _hoisted_1118, _hoisted_3117);
    }
    var goblet_full_default = plugin_vue_export_helper_default(_sfc_main118, [["render", _sfc_render118], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/goblet-full.vue"]]);
    var import_vue119 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main119 = {
      name: "GobletSquareFull"
    };
    var _hoisted_1119 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2119 = (0, import_vue119.createElementVNode)("path", {
      fill: "currentColor",
      d: "M256 270.912c10.048 6.72 22.464 14.912 28.992 18.624a220.16 220.16 0 0 0 114.752 30.72c30.592 0 49.408-9.472 91.072-41.152l.64-.448c52.928-40.32 82.368-55.04 132.288-54.656 55.552.448 99.584 20.8 142.72 57.408l1.536 1.28V128H256v142.912zm.96 76.288C266.368 482.176 346.88 575.872 512 576c157.44.064 237.952-85.056 253.248-209.984a952.32 952.32 0 0 1-40.192-35.712c-32.704-27.776-63.36-41.92-101.888-42.24-31.552-.256-50.624 9.28-93.12 41.6l-.576.448c-52.096 39.616-81.024 54.208-129.792 54.208-54.784 0-100.48-13.376-142.784-37.056zM480 638.848C250.624 623.424 192 442.496 192 319.68V96a32 32 0 0 1 32-32h576a32 32 0 0 1 32 32v224c0 122.816-58.624 303.68-288 318.912V896h96a32 32 0 1 1 0 64H384a32 32 0 1 1 0-64h96V638.848z"
    }, null, -1);
    var _hoisted_3118 = [
      _hoisted_2119
    ];
    function _sfc_render119(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue119.openBlock)(), (0, import_vue119.createElementBlock)("svg", _hoisted_1119, _hoisted_3118);
    }
    var goblet_square_full_default = plugin_vue_export_helper_default(_sfc_main119, [["render", _sfc_render119], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/goblet-square-full.vue"]]);
    var import_vue120 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main120 = {
      name: "GobletSquare"
    };
    var _hoisted_1120 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2120 = (0, import_vue120.createElementVNode)("path", {
      fill: "currentColor",
      d: "M544 638.912V896h96a32 32 0 1 1 0 64H384a32 32 0 1 1 0-64h96V638.848C250.624 623.424 192 442.496 192 319.68V96a32 32 0 0 1 32-32h576a32 32 0 0 1 32 32v224c0 122.816-58.624 303.68-288 318.912zM256 319.68c0 149.568 80 256.192 256 256.256C688.128 576 768 469.568 768 320V128H256v191.68z"
    }, null, -1);
    var _hoisted_3119 = [
      _hoisted_2120
    ];
    function _sfc_render120(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue120.openBlock)(), (0, import_vue120.createElementBlock)("svg", _hoisted_1120, _hoisted_3119);
    }
    var goblet_square_default = plugin_vue_export_helper_default(_sfc_main120, [["render", _sfc_render120], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/goblet-square.vue"]]);
    var import_vue121 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main121 = {
      name: "Goblet"
    };
    var _hoisted_1121 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2121 = (0, import_vue121.createElementVNode)("path", {
      fill: "currentColor",
      d: "M544 638.4V896h96a32 32 0 1 1 0 64H384a32 32 0 1 1 0-64h96V638.4A320 320 0 0 1 192 320c0-85.632 21.312-170.944 64-256h512c42.688 64.32 64 149.632 64 256a320 320 0 0 1-288 318.4zM256 320a256 256 0 1 0 512 0c0-78.592-12.608-142.4-36.928-192h-434.24C269.504 192.384 256 256.256 256 320z"
    }, null, -1);
    var _hoisted_3120 = [
      _hoisted_2121
    ];
    function _sfc_render121(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue121.openBlock)(), (0, import_vue121.createElementBlock)("svg", _hoisted_1121, _hoisted_3120);
    }
    var goblet_default = plugin_vue_export_helper_default(_sfc_main121, [["render", _sfc_render121], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/goblet.vue"]]);
    var import_vue122 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main122 = {
      name: "GoodsFilled"
    };
    var _hoisted_1122 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2122 = (0, import_vue122.createElementVNode)("path", {
      fill: "currentColor",
      d: "M192 352h640l64 544H128l64-544zm128 224h64V448h-64v128zm320 0h64V448h-64v128zM384 288h-64a192 192 0 1 1 384 0h-64a128 128 0 1 0-256 0z"
    }, null, -1);
    var _hoisted_3121 = [
      _hoisted_2122
    ];
    function _sfc_render122(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue122.openBlock)(), (0, import_vue122.createElementBlock)("svg", _hoisted_1122, _hoisted_3121);
    }
    var goods_filled_default = plugin_vue_export_helper_default(_sfc_main122, [["render", _sfc_render122], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/goods-filled.vue"]]);
    var import_vue123 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main123 = {
      name: "Goods"
    };
    var _hoisted_1123 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2123 = (0, import_vue123.createElementVNode)("path", {
      fill: "currentColor",
      d: "M320 288v-22.336C320 154.688 405.504 64 512 64s192 90.688 192 201.664v22.4h131.072a32 32 0 0 1 31.808 28.8l57.6 576a32 32 0 0 1-31.808 35.2H131.328a32 32 0 0 1-31.808-35.2l57.6-576a32 32 0 0 1 31.808-28.8H320zm64 0h256v-22.336C640 189.248 582.272 128 512 128c-70.272 0-128 61.248-128 137.664v22.4zm-64 64H217.92l-51.2 512h690.56l-51.264-512H704v96a32 32 0 1 1-64 0v-96H384v96a32 32 0 0 1-64 0v-96z"
    }, null, -1);
    var _hoisted_3122 = [
      _hoisted_2123
    ];
    function _sfc_render123(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue123.openBlock)(), (0, import_vue123.createElementBlock)("svg", _hoisted_1123, _hoisted_3122);
    }
    var goods_default = plugin_vue_export_helper_default(_sfc_main123, [["render", _sfc_render123], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/goods.vue"]]);
    var import_vue124 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main124 = {
      name: "Grape"
    };
    var _hoisted_1124 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2124 = (0, import_vue124.createElementVNode)("path", {
      fill: "currentColor",
      d: "M544 195.2a160 160 0 0 1 96 60.8 160 160 0 1 1 146.24 254.976 160 160 0 0 1-128 224 160 160 0 1 1-292.48 0 160 160 0 0 1-128-224A160 160 0 1 1 384 256a160 160 0 0 1 96-60.8V128h-64a32 32 0 0 1 0-64h192a32 32 0 0 1 0 64h-64v67.2zM512 448a96 96 0 1 0 0-192 96 96 0 0 0 0 192zm-256 0a96 96 0 1 0 0-192 96 96 0 0 0 0 192zm128 224a96 96 0 1 0 0-192 96 96 0 0 0 0 192zm128 224a96 96 0 1 0 0-192 96 96 0 0 0 0 192zm128-224a96 96 0 1 0 0-192 96 96 0 0 0 0 192zm128-224a96 96 0 1 0 0-192 96 96 0 0 0 0 192z"
    }, null, -1);
    var _hoisted_3123 = [
      _hoisted_2124
    ];
    function _sfc_render124(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue124.openBlock)(), (0, import_vue124.createElementBlock)("svg", _hoisted_1124, _hoisted_3123);
    }
    var grape_default = plugin_vue_export_helper_default(_sfc_main124, [["render", _sfc_render124], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/grape.vue"]]);
    var import_vue125 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main125 = {
      name: "Grid"
    };
    var _hoisted_1125 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2125 = (0, import_vue125.createElementVNode)("path", {
      fill: "currentColor",
      d: "M640 384v256H384V384h256zm64 0h192v256H704V384zm-64 512H384V704h256v192zm64 0V704h192v192H704zm-64-768v192H384V128h256zm64 0h192v192H704V128zM320 384v256H128V384h192zm0 512H128V704h192v192zm0-768v192H128V128h192z"
    }, null, -1);
    var _hoisted_3124 = [
      _hoisted_2125
    ];
    function _sfc_render125(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue125.openBlock)(), (0, import_vue125.createElementBlock)("svg", _hoisted_1125, _hoisted_3124);
    }
    var grid_default = plugin_vue_export_helper_default(_sfc_main125, [["render", _sfc_render125], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/grid.vue"]]);
    var import_vue126 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main126 = {
      name: "Guide"
    };
    var _hoisted_1126 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2126 = (0, import_vue126.createElementVNode)("path", {
      fill: "currentColor",
      d: "M640 608h-64V416h64v192zm0 160v160a32 32 0 0 1-32 32H416a32 32 0 0 1-32-32V768h64v128h128V768h64zM384 608V416h64v192h-64zm256-352h-64V128H448v128h-64V96a32 32 0 0 1 32-32h192a32 32 0 0 1 32 32v160z"
    }, null, -1);
    var _hoisted_3125 = (0, import_vue126.createElementVNode)("path", {
      fill: "currentColor",
      d: "m220.8 256-71.232 80 71.168 80H768V256H220.8zm-14.4-64H800a32 32 0 0 1 32 32v224a32 32 0 0 1-32 32H206.4a32 32 0 0 1-23.936-10.752l-99.584-112a32 32 0 0 1 0-42.496l99.584-112A32 32 0 0 1 206.4 192zm678.784 496-71.104 80H266.816V608h547.2l71.168 80zm-56.768-144H234.88a32 32 0 0 0-32 32v224a32 32 0 0 0 32 32h593.6a32 32 0 0 0 23.936-10.752l99.584-112a32 32 0 0 0 0-42.496l-99.584-112A32 32 0 0 0 828.48 544z"
    }, null, -1);
    var _hoisted_435 = [
      _hoisted_2126,
      _hoisted_3125
    ];
    function _sfc_render126(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue126.openBlock)(), (0, import_vue126.createElementBlock)("svg", _hoisted_1126, _hoisted_435);
    }
    var guide_default = plugin_vue_export_helper_default(_sfc_main126, [["render", _sfc_render126], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/guide.vue"]]);
    var import_vue127 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main127 = {
      name: "Headset"
    };
    var _hoisted_1127 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2127 = (0, import_vue127.createElementVNode)("path", {
      fill: "currentColor",
      d: "M896 529.152V512a384 384 0 1 0-768 0v17.152A128 128 0 0 1 320 640v128a128 128 0 1 1-256 0V512a448 448 0 1 1 896 0v256a128 128 0 1 1-256 0V640a128 128 0 0 1 192-110.848zM896 640a64 64 0 0 0-128 0v128a64 64 0 0 0 128 0V640zm-768 0v128a64 64 0 0 0 128 0V640a64 64 0 1 0-128 0z"
    }, null, -1);
    var _hoisted_3126 = [
      _hoisted_2127
    ];
    function _sfc_render127(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue127.openBlock)(), (0, import_vue127.createElementBlock)("svg", _hoisted_1127, _hoisted_3126);
    }
    var headset_default = plugin_vue_export_helper_default(_sfc_main127, [["render", _sfc_render127], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/headset.vue"]]);
    var import_vue128 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main128 = {
      name: "HelpFilled"
    };
    var _hoisted_1128 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2128 = (0, import_vue128.createElementVNode)("path", {
      fill: "currentColor",
      d: "M926.784 480H701.312A192.512 192.512 0 0 0 544 322.688V97.216A416.064 416.064 0 0 1 926.784 480zm0 64A416.064 416.064 0 0 1 544 926.784V701.312A192.512 192.512 0 0 0 701.312 544h225.472zM97.28 544h225.472A192.512 192.512 0 0 0 480 701.312v225.472A416.064 416.064 0 0 1 97.216 544zm0-64A416.064 416.064 0 0 1 480 97.216v225.472A192.512 192.512 0 0 0 322.688 480H97.216z"
    }, null, -1);
    var _hoisted_3127 = [
      _hoisted_2128
    ];
    function _sfc_render128(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue128.openBlock)(), (0, import_vue128.createElementBlock)("svg", _hoisted_1128, _hoisted_3127);
    }
    var help_filled_default = plugin_vue_export_helper_default(_sfc_main128, [["render", _sfc_render128], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/help-filled.vue"]]);
    var import_vue129 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main129 = {
      name: "Help"
    };
    var _hoisted_1129 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2129 = (0, import_vue129.createElementVNode)("path", {
      fill: "currentColor",
      d: "m759.936 805.248-90.944-91.008A254.912 254.912 0 0 1 512 768a254.912 254.912 0 0 1-156.992-53.76l-90.944 91.008A382.464 382.464 0 0 0 512 896c94.528 0 181.12-34.176 247.936-90.752zm45.312-45.312A382.464 382.464 0 0 0 896 512c0-94.528-34.176-181.12-90.752-247.936l-91.008 90.944C747.904 398.4 768 452.864 768 512c0 59.136-20.096 113.6-53.76 156.992l91.008 90.944zm-45.312-541.184A382.464 382.464 0 0 0 512 128c-94.528 0-181.12 34.176-247.936 90.752l90.944 91.008A254.912 254.912 0 0 1 512 256c59.136 0 113.6 20.096 156.992 53.76l90.944-91.008zm-541.184 45.312A382.464 382.464 0 0 0 128 512c0 94.528 34.176 181.12 90.752 247.936l91.008-90.944A254.912 254.912 0 0 1 256 512c0-59.136 20.096-113.6 53.76-156.992l-91.008-90.944zm417.28 394.496a194.56 194.56 0 0 0 22.528-22.528C686.912 602.56 704 559.232 704 512a191.232 191.232 0 0 0-67.968-146.56A191.296 191.296 0 0 0 512 320a191.232 191.232 0 0 0-146.56 67.968C337.088 421.44 320 464.768 320 512a191.232 191.232 0 0 0 67.968 146.56C421.44 686.912 464.768 704 512 704c47.296 0 90.56-17.088 124.032-45.44zM512 960a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
    }, null, -1);
    var _hoisted_3128 = [
      _hoisted_2129
    ];
    function _sfc_render129(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue129.openBlock)(), (0, import_vue129.createElementBlock)("svg", _hoisted_1129, _hoisted_3128);
    }
    var help_default = plugin_vue_export_helper_default(_sfc_main129, [["render", _sfc_render129], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/help.vue"]]);
    var import_vue130 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main130 = {
      name: "Hide"
    };
    var _hoisted_1130 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2130 = (0, import_vue130.createElementVNode)("path", {
      d: "M876.8 156.8c0-9.6-3.2-16-9.6-22.4-6.4-6.4-12.8-9.6-22.4-9.6-9.6 0-16 3.2-22.4 9.6L736 220.8c-64-32-137.6-51.2-224-60.8-160 16-288 73.6-377.6 176C44.8 438.4 0 496 0 512s48 73.6 134.4 176c22.4 25.6 44.8 48 73.6 67.2l-86.4 89.6c-6.4 6.4-9.6 12.8-9.6 22.4 0 9.6 3.2 16 9.6 22.4 6.4 6.4 12.8 9.6 22.4 9.6 9.6 0 16-3.2 22.4-9.6l704-710.4c3.2-6.4 6.4-12.8 6.4-22.4Zm-646.4 528c-76.8-70.4-128-128-153.6-172.8 28.8-48 80-105.6 153.6-172.8C304 272 400 230.4 512 224c64 3.2 124.8 19.2 176 44.8l-54.4 54.4C598.4 300.8 560 288 512 288c-64 0-115.2 22.4-160 64s-64 96-64 160c0 48 12.8 89.6 35.2 124.8L256 707.2c-9.6-6.4-19.2-16-25.6-22.4Zm140.8-96c-12.8-22.4-19.2-48-19.2-76.8 0-44.8 16-83.2 48-112 32-28.8 67.2-48 112-48 28.8 0 54.4 6.4 73.6 19.2L371.2 588.8ZM889.599 336c-12.8-16-28.8-28.8-41.6-41.6l-48 48c73.6 67.2 124.8 124.8 150.4 169.6-28.8 48-80 105.6-153.6 172.8-73.6 67.2-172.8 108.8-284.8 115.2-51.2-3.2-99.2-12.8-140.8-28.8l-48 48c57.6 22.4 118.4 38.4 188.8 44.8 160-16 288-73.6 377.6-176C979.199 585.6 1024 528 1024 512s-48.001-73.6-134.401-176Z",
      fill: "currentColor"
    }, null, -1);
    var _hoisted_3129 = (0, import_vue130.createElementVNode)("path", {
      d: "M511.998 672c-12.8 0-25.6-3.2-38.4-6.4l-51.2 51.2c28.8 12.8 57.6 19.2 89.6 19.2 64 0 115.2-22.4 160-64 41.6-41.6 64-96 64-160 0-32-6.4-64-19.2-89.6l-51.2 51.2c3.2 12.8 6.4 25.6 6.4 38.4 0 44.8-16 83.2-48 112-32 28.8-67.2 48-112 48Z",
      fill: "currentColor"
    }, null, -1);
    var _hoisted_436 = [
      _hoisted_2130,
      _hoisted_3129
    ];
    function _sfc_render130(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue130.openBlock)(), (0, import_vue130.createElementBlock)("svg", _hoisted_1130, _hoisted_436);
    }
    var hide_default = plugin_vue_export_helper_default(_sfc_main130, [["render", _sfc_render130], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/hide.vue"]]);
    var import_vue131 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main131 = {
      name: "Histogram"
    };
    var _hoisted_1131 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2131 = (0, import_vue131.createElementVNode)("path", {
      fill: "currentColor",
      d: "M416 896V128h192v768H416zm-288 0V448h192v448H128zm576 0V320h192v576H704z"
    }, null, -1);
    var _hoisted_3130 = [
      _hoisted_2131
    ];
    function _sfc_render131(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue131.openBlock)(), (0, import_vue131.createElementBlock)("svg", _hoisted_1131, _hoisted_3130);
    }
    var histogram_default = plugin_vue_export_helper_default(_sfc_main131, [["render", _sfc_render131], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/histogram.vue"]]);
    var import_vue132 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main132 = {
      name: "HomeFilled"
    };
    var _hoisted_1132 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2132 = (0, import_vue132.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 128 128 447.936V896h255.936V640H640v256h255.936V447.936z"
    }, null, -1);
    var _hoisted_3131 = [
      _hoisted_2132
    ];
    function _sfc_render132(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue132.openBlock)(), (0, import_vue132.createElementBlock)("svg", _hoisted_1132, _hoisted_3131);
    }
    var home_filled_default = plugin_vue_export_helper_default(_sfc_main132, [["render", _sfc_render132], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/home-filled.vue"]]);
    var import_vue133 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main133 = {
      name: "HotWater"
    };
    var _hoisted_1133 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2133 = (0, import_vue133.createElementVNode)("path", {
      fill: "currentColor",
      d: "M273.067 477.867h477.866V409.6H273.067v68.267zm0 68.266v51.2A187.733 187.733 0 0 0 460.8 785.067h102.4a187.733 187.733 0 0 0 187.733-187.734v-51.2H273.067zm-34.134-204.8h546.134a34.133 34.133 0 0 1 34.133 34.134v221.866a256 256 0 0 1-256 256H460.8a256 256 0 0 1-256-256V375.467a34.133 34.133 0 0 1 34.133-34.134zM512 34.133a34.133 34.133 0 0 1 34.133 34.134v170.666a34.133 34.133 0 0 1-68.266 0V68.267A34.133 34.133 0 0 1 512 34.133zM375.467 102.4a34.133 34.133 0 0 1 34.133 34.133v102.4a34.133 34.133 0 0 1-68.267 0v-102.4a34.133 34.133 0 0 1 34.134-34.133zm273.066 0a34.133 34.133 0 0 1 34.134 34.133v102.4a34.133 34.133 0 1 1-68.267 0v-102.4a34.133 34.133 0 0 1 34.133-34.133zM170.667 921.668h682.666a34.133 34.133 0 1 1 0 68.267H170.667a34.133 34.133 0 1 1 0-68.267z"
    }, null, -1);
    var _hoisted_3132 = [
      _hoisted_2133
    ];
    function _sfc_render133(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue133.openBlock)(), (0, import_vue133.createElementBlock)("svg", _hoisted_1133, _hoisted_3132);
    }
    var hot_water_default = plugin_vue_export_helper_default(_sfc_main133, [["render", _sfc_render133], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/hot-water.vue"]]);
    var import_vue134 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main134 = {
      name: "House"
    };
    var _hoisted_1134 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2134 = (0, import_vue134.createElementVNode)("path", {
      fill: "currentColor",
      d: "M192 413.952V896h640V413.952L512 147.328 192 413.952zM139.52 374.4l352-293.312a32 32 0 0 1 40.96 0l352 293.312A32 32 0 0 1 896 398.976V928a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V398.976a32 32 0 0 1 11.52-24.576z"
    }, null, -1);
    var _hoisted_3133 = [
      _hoisted_2134
    ];
    function _sfc_render134(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue134.openBlock)(), (0, import_vue134.createElementBlock)("svg", _hoisted_1134, _hoisted_3133);
    }
    var house_default = plugin_vue_export_helper_default(_sfc_main134, [["render", _sfc_render134], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/house.vue"]]);
    var import_vue135 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main135 = {
      name: "IceCreamRound"
    };
    var _hoisted_1135 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2135 = (0, import_vue135.createElementVNode)("path", {
      fill: "currentColor",
      d: "m308.352 489.344 226.304 226.304a32 32 0 0 0 45.248 0L783.552 512A192 192 0 1 0 512 240.448L308.352 444.16a32 32 0 0 0 0 45.248zm135.744 226.304L308.352 851.392a96 96 0 0 1-135.744-135.744l135.744-135.744-45.248-45.248a96 96 0 0 1 0-135.808L466.752 195.2A256 256 0 0 1 828.8 557.248L625.152 760.96a96 96 0 0 1-135.808 0l-45.248-45.248zM398.848 670.4 353.6 625.152 217.856 760.896a32 32 0 0 0 45.248 45.248L398.848 670.4zm248.96-384.64a32 32 0 0 1 0 45.248L466.624 512a32 32 0 1 1-45.184-45.248l180.992-181.056a32 32 0 0 1 45.248 0zm90.496 90.496a32 32 0 0 1 0 45.248L557.248 602.496A32 32 0 1 1 512 557.248l180.992-180.992a32 32 0 0 1 45.312 0z"
    }, null, -1);
    var _hoisted_3134 = [
      _hoisted_2135
    ];
    function _sfc_render135(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue135.openBlock)(), (0, import_vue135.createElementBlock)("svg", _hoisted_1135, _hoisted_3134);
    }
    var ice_cream_round_default = plugin_vue_export_helper_default(_sfc_main135, [["render", _sfc_render135], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/ice-cream-round.vue"]]);
    var import_vue136 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main136 = {
      name: "IceCreamSquare"
    };
    var _hoisted_1136 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2136 = (0, import_vue136.createElementVNode)("path", {
      fill: "currentColor",
      d: "M416 640h256a32 32 0 0 0 32-32V160a32 32 0 0 0-32-32H352a32 32 0 0 0-32 32v448a32 32 0 0 0 32 32h64zm192 64v160a96 96 0 0 1-192 0V704h-64a96 96 0 0 1-96-96V160a96 96 0 0 1 96-96h320a96 96 0 0 1 96 96v448a96 96 0 0 1-96 96h-64zm-64 0h-64v160a32 32 0 1 0 64 0V704z"
    }, null, -1);
    var _hoisted_3135 = [
      _hoisted_2136
    ];
    function _sfc_render136(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue136.openBlock)(), (0, import_vue136.createElementBlock)("svg", _hoisted_1136, _hoisted_3135);
    }
    var ice_cream_square_default = plugin_vue_export_helper_default(_sfc_main136, [["render", _sfc_render136], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/ice-cream-square.vue"]]);
    var import_vue137 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main137 = {
      name: "IceCream"
    };
    var _hoisted_1137 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2137 = (0, import_vue137.createElementVNode)("path", {
      fill: "currentColor",
      d: "M128.64 448a208 208 0 0 1 193.536-191.552 224 224 0 0 1 445.248 15.488A208.128 208.128 0 0 1 894.784 448H896L548.8 983.68a32 32 0 0 1-53.248.704L128 448h.64zm64.256 0h286.208a144 144 0 0 0-286.208 0zm351.36 0h286.272a144 144 0 0 0-286.272 0zm-294.848 64 271.808 396.608L778.24 512H249.408zM511.68 352.64a207.872 207.872 0 0 1 189.184-96.192 160 160 0 0 0-314.752 5.632c52.608 12.992 97.28 46.08 125.568 90.56z"
    }, null, -1);
    var _hoisted_3136 = [
      _hoisted_2137
    ];
    function _sfc_render137(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue137.openBlock)(), (0, import_vue137.createElementBlock)("svg", _hoisted_1137, _hoisted_3136);
    }
    var ice_cream_default = plugin_vue_export_helper_default(_sfc_main137, [["render", _sfc_render137], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/ice-cream.vue"]]);
    var import_vue138 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main138 = {
      name: "IceDrink"
    };
    var _hoisted_1138 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2138 = (0, import_vue138.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 448v128h239.68l16.064-128H512zm-64 0H256.256l16.064 128H448V448zm64-255.36V384h247.744A256.128 256.128 0 0 0 512 192.64zm-64 8.064A256.448 256.448 0 0 0 264.256 384H448V200.704zm64-72.064A320.128 320.128 0 0 1 825.472 384H896a32 32 0 1 1 0 64h-64v1.92l-56.96 454.016A64 64 0 0 1 711.552 960H312.448a64 64 0 0 1-63.488-56.064L192 449.92V448h-64a32 32 0 0 1 0-64h70.528A320.384 320.384 0 0 1 448 135.04V96a96 96 0 0 1 96-96h128a32 32 0 1 1 0 64H544a32 32 0 0 0-32 32v32.64zM743.68 640H280.32l32.128 256h399.104l32.128-256z"
    }, null, -1);
    var _hoisted_3137 = [
      _hoisted_2138
    ];
    function _sfc_render138(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue138.openBlock)(), (0, import_vue138.createElementBlock)("svg", _hoisted_1138, _hoisted_3137);
    }
    var ice_drink_default = plugin_vue_export_helper_default(_sfc_main138, [["render", _sfc_render138], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/ice-drink.vue"]]);
    var import_vue139 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main139 = {
      name: "IceTea"
    };
    var _hoisted_1139 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2139 = (0, import_vue139.createElementVNode)("path", {
      fill: "currentColor",
      d: "M197.696 259.648a320.128 320.128 0 0 1 628.608 0A96 96 0 0 1 896 352v64a96 96 0 0 1-71.616 92.864l-49.408 395.072A64 64 0 0 1 711.488 960H312.512a64 64 0 0 1-63.488-56.064l-49.408-395.072A96 96 0 0 1 128 416v-64a96 96 0 0 1 69.696-92.352zM264.064 256h495.872a256.128 256.128 0 0 0-495.872 0zm495.424 256H264.512l48 384h398.976l48-384zM224 448h576a32 32 0 0 0 32-32v-64a32 32 0 0 0-32-32H224a32 32 0 0 0-32 32v64a32 32 0 0 0 32 32zm160 192h64v64h-64v-64zm192 64h64v64h-64v-64zm-128 64h64v64h-64v-64zm64-192h64v64h-64v-64z"
    }, null, -1);
    var _hoisted_3138 = [
      _hoisted_2139
    ];
    function _sfc_render139(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue139.openBlock)(), (0, import_vue139.createElementBlock)("svg", _hoisted_1139, _hoisted_3138);
    }
    var ice_tea_default = plugin_vue_export_helper_default(_sfc_main139, [["render", _sfc_render139], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/ice-tea.vue"]]);
    var import_vue140 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main140 = {
      name: "InfoFilled"
    };
    var _hoisted_1140 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2140 = (0, import_vue140.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 64a448 448 0 1 1 0 896.064A448 448 0 0 1 512 64zm67.2 275.072c33.28 0 60.288-23.104 60.288-57.344s-27.072-57.344-60.288-57.344c-33.28 0-60.16 23.104-60.16 57.344s26.88 57.344 60.16 57.344zM590.912 699.2c0-6.848 2.368-24.64 1.024-34.752l-52.608 60.544c-10.88 11.456-24.512 19.392-30.912 17.28a12.992 12.992 0 0 1-8.256-14.72l87.68-276.992c7.168-35.136-12.544-67.2-54.336-71.296-44.096 0-108.992 44.736-148.48 101.504 0 6.784-1.28 23.68.064 33.792l52.544-60.608c10.88-11.328 23.552-19.328 29.952-17.152a12.8 12.8 0 0 1 7.808 16.128L388.48 728.576c-10.048 32.256 8.96 63.872 55.04 71.04 67.84 0 107.904-43.648 147.456-100.416z"
    }, null, -1);
    var _hoisted_3139 = [
      _hoisted_2140
    ];
    function _sfc_render140(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue140.openBlock)(), (0, import_vue140.createElementBlock)("svg", _hoisted_1140, _hoisted_3139);
    }
    var info_filled_default = plugin_vue_export_helper_default(_sfc_main140, [["render", _sfc_render140], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/info-filled.vue"]]);
    var import_vue141 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main141 = {
      name: "Iphone"
    };
    var _hoisted_1141 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2141 = (0, import_vue141.createElementVNode)("path", {
      fill: "currentColor",
      d: "M224 768v96.064a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64V768H224zm0-64h576V160a64 64 0 0 0-64-64H288a64 64 0 0 0-64 64v544zm32 288a96 96 0 0 1-96-96V128a96 96 0 0 1 96-96h512a96 96 0 0 1 96 96v768a96 96 0 0 1-96 96H256zm304-144a48 48 0 1 1-96 0 48 48 0 0 1 96 0z"
    }, null, -1);
    var _hoisted_3140 = [
      _hoisted_2141
    ];
    function _sfc_render141(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue141.openBlock)(), (0, import_vue141.createElementBlock)("svg", _hoisted_1141, _hoisted_3140);
    }
    var iphone_default = plugin_vue_export_helper_default(_sfc_main141, [["render", _sfc_render141], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/iphone.vue"]]);
    var import_vue142 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main142 = {
      name: "Key"
    };
    var _hoisted_1142 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2142 = (0, import_vue142.createElementVNode)("path", {
      fill: "currentColor",
      d: "M448 456.064V96a32 32 0 0 1 32-32.064L672 64a32 32 0 0 1 0 64H512v128h160a32 32 0 0 1 0 64H512v128a256 256 0 1 1-64 8.064zM512 896a192 192 0 1 0 0-384 192 192 0 0 0 0 384z"
    }, null, -1);
    var _hoisted_3141 = [
      _hoisted_2142
    ];
    function _sfc_render142(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue142.openBlock)(), (0, import_vue142.createElementBlock)("svg", _hoisted_1142, _hoisted_3141);
    }
    var key_default = plugin_vue_export_helper_default(_sfc_main142, [["render", _sfc_render142], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/key.vue"]]);
    var import_vue143 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main143 = {
      name: "KnifeFork"
    };
    var _hoisted_1143 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2143 = (0, import_vue143.createElementVNode)("path", {
      fill: "currentColor",
      d: "M256 410.56V96a32 32 0 0 1 64 0v314.56A96 96 0 0 0 384 320V96a32 32 0 0 1 64 0v224a160 160 0 0 1-128 156.8V928a32 32 0 1 1-64 0V476.8A160 160 0 0 1 128 320V96a32 32 0 0 1 64 0v224a96 96 0 0 0 64 90.56zm384-250.24V544h126.72c-3.328-78.72-12.928-147.968-28.608-207.744-14.336-54.528-46.848-113.344-98.112-175.872zM640 608v320a32 32 0 1 1-64 0V64h64c85.312 89.472 138.688 174.848 160 256 21.312 81.152 32 177.152 32 288H640z"
    }, null, -1);
    var _hoisted_3142 = [
      _hoisted_2143
    ];
    function _sfc_render143(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue143.openBlock)(), (0, import_vue143.createElementBlock)("svg", _hoisted_1143, _hoisted_3142);
    }
    var knife_fork_default = plugin_vue_export_helper_default(_sfc_main143, [["render", _sfc_render143], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/knife-fork.vue"]]);
    var import_vue144 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main144 = {
      name: "Lightning"
    };
    var _hoisted_1144 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2144 = (0, import_vue144.createElementVNode)("path", {
      fill: "currentColor",
      d: "M288 671.36v64.128A239.808 239.808 0 0 1 63.744 496.192a240.32 240.32 0 0 1 199.488-236.8 256.128 256.128 0 0 1 487.872-30.976A256.064 256.064 0 0 1 736 734.016v-64.768a192 192 0 0 0 3.328-377.92l-35.2-6.592-12.8-33.408a192.064 192.064 0 0 0-365.952 23.232l-9.92 40.896-41.472 7.04a176.32 176.32 0 0 0-146.24 173.568c0 91.968 70.464 167.36 160.256 175.232z"
    }, null, -1);
    var _hoisted_3143 = (0, import_vue144.createElementVNode)("path", {
      fill: "currentColor",
      d: "M416 736a32 32 0 0 1-27.776-47.872l128-224a32 32 0 1 1 55.552 31.744L471.168 672H608a32 32 0 0 1 27.776 47.872l-128 224a32 32 0 1 1-55.68-31.744L552.96 736H416z"
    }, null, -1);
    var _hoisted_437 = [
      _hoisted_2144,
      _hoisted_3143
    ];
    function _sfc_render144(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue144.openBlock)(), (0, import_vue144.createElementBlock)("svg", _hoisted_1144, _hoisted_437);
    }
    var lightning_default = plugin_vue_export_helper_default(_sfc_main144, [["render", _sfc_render144], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/lightning.vue"]]);
    var import_vue145 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main145 = {
      name: "Link"
    };
    var _hoisted_1145 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2145 = (0, import_vue145.createElementVNode)("path", {
      fill: "currentColor",
      d: "M715.648 625.152 670.4 579.904l90.496-90.56c75.008-74.944 85.12-186.368 22.656-248.896-62.528-62.464-173.952-52.352-248.96 22.656L444.16 353.6l-45.248-45.248 90.496-90.496c100.032-99.968 251.968-110.08 339.456-22.656 87.488 87.488 77.312 239.424-22.656 339.456l-90.496 90.496zm-90.496 90.496-90.496 90.496C434.624 906.112 282.688 916.224 195.2 828.8c-87.488-87.488-77.312-239.424 22.656-339.456l90.496-90.496 45.248 45.248-90.496 90.56c-75.008 74.944-85.12 186.368-22.656 248.896 62.528 62.464 173.952 52.352 248.96-22.656l90.496-90.496 45.248 45.248zm0-362.048 45.248 45.248L398.848 670.4 353.6 625.152 625.152 353.6z"
    }, null, -1);
    var _hoisted_3144 = [
      _hoisted_2145
    ];
    function _sfc_render145(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue145.openBlock)(), (0, import_vue145.createElementBlock)("svg", _hoisted_1145, _hoisted_3144);
    }
    var link_default = plugin_vue_export_helper_default(_sfc_main145, [["render", _sfc_render145], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/link.vue"]]);
    var import_vue146 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main146 = {
      name: "List"
    };
    var _hoisted_1146 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2146 = (0, import_vue146.createElementVNode)("path", {
      fill: "currentColor",
      d: "M704 192h160v736H160V192h160v64h384v-64zM288 512h448v-64H288v64zm0 256h448v-64H288v64zm96-576V96h256v96H384z"
    }, null, -1);
    var _hoisted_3145 = [
      _hoisted_2146
    ];
    function _sfc_render146(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue146.openBlock)(), (0, import_vue146.createElementBlock)("svg", _hoisted_1146, _hoisted_3145);
    }
    var list_default = plugin_vue_export_helper_default(_sfc_main146, [["render", _sfc_render146], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/list.vue"]]);
    var import_vue147 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main147 = {
      name: "Loading"
    };
    var _hoisted_1147 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2147 = (0, import_vue147.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"
    }, null, -1);
    var _hoisted_3146 = [
      _hoisted_2147
    ];
    function _sfc_render147(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue147.openBlock)(), (0, import_vue147.createElementBlock)("svg", _hoisted_1147, _hoisted_3146);
    }
    var loading_default = plugin_vue_export_helper_default(_sfc_main147, [["render", _sfc_render147], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/loading.vue"]]);
    var import_vue148 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main148 = {
      name: "LocationFilled"
    };
    var _hoisted_1148 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2148 = (0, import_vue148.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 928c23.936 0 117.504-68.352 192.064-153.152C803.456 661.888 864 535.808 864 416c0-189.632-155.84-320-352-320S160 226.368 160 416c0 120.32 60.544 246.4 159.936 359.232C394.432 859.84 488 928 512 928zm0-435.2a64 64 0 1 0 0-128 64 64 0 0 0 0 128zm0 140.8a204.8 204.8 0 1 1 0-409.6 204.8 204.8 0 0 1 0 409.6z"
    }, null, -1);
    var _hoisted_3147 = [
      _hoisted_2148
    ];
    function _sfc_render148(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue148.openBlock)(), (0, import_vue148.createElementBlock)("svg", _hoisted_1148, _hoisted_3147);
    }
    var location_filled_default = plugin_vue_export_helper_default(_sfc_main148, [["render", _sfc_render148], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/location-filled.vue"]]);
    var import_vue149 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main149 = {
      name: "LocationInformation"
    };
    var _hoisted_1149 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2149 = (0, import_vue149.createElementVNode)("path", {
      fill: "currentColor",
      d: "M288 896h448q32 0 32 32t-32 32H288q-32 0-32-32t32-32z"
    }, null, -1);
    var _hoisted_3148 = (0, import_vue149.createElementVNode)("path", {
      fill: "currentColor",
      d: "M800 416a288 288 0 1 0-576 0c0 118.144 94.528 272.128 288 456.576C705.472 688.128 800 534.144 800 416zM512 960C277.312 746.688 160 565.312 160 416a352 352 0 0 1 704 0c0 149.312-117.312 330.688-352 544z"
    }, null, -1);
    var _hoisted_438 = (0, import_vue149.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 512a96 96 0 1 0 0-192 96 96 0 0 0 0 192zm0 64a160 160 0 1 1 0-320 160 160 0 0 1 0 320z"
    }, null, -1);
    var _hoisted_510 = [
      _hoisted_2149,
      _hoisted_3148,
      _hoisted_438
    ];
    function _sfc_render149(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue149.openBlock)(), (0, import_vue149.createElementBlock)("svg", _hoisted_1149, _hoisted_510);
    }
    var location_information_default = plugin_vue_export_helper_default(_sfc_main149, [["render", _sfc_render149], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/location-information.vue"]]);
    var import_vue150 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main150 = {
      name: "Location"
    };
    var _hoisted_1150 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2150 = (0, import_vue150.createElementVNode)("path", {
      fill: "currentColor",
      d: "M800 416a288 288 0 1 0-576 0c0 118.144 94.528 272.128 288 456.576C705.472 688.128 800 534.144 800 416zM512 960C277.312 746.688 160 565.312 160 416a352 352 0 0 1 704 0c0 149.312-117.312 330.688-352 544z"
    }, null, -1);
    var _hoisted_3149 = (0, import_vue150.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 512a96 96 0 1 0 0-192 96 96 0 0 0 0 192zm0 64a160 160 0 1 1 0-320 160 160 0 0 1 0 320z"
    }, null, -1);
    var _hoisted_439 = [
      _hoisted_2150,
      _hoisted_3149
    ];
    function _sfc_render150(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue150.openBlock)(), (0, import_vue150.createElementBlock)("svg", _hoisted_1150, _hoisted_439);
    }
    var location_default = plugin_vue_export_helper_default(_sfc_main150, [["render", _sfc_render150], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/location.vue"]]);
    var import_vue151 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main151 = {
      name: "Lock"
    };
    var _hoisted_1151 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2151 = (0, import_vue151.createElementVNode)("path", {
      fill: "currentColor",
      d: "M224 448a32 32 0 0 0-32 32v384a32 32 0 0 0 32 32h576a32 32 0 0 0 32-32V480a32 32 0 0 0-32-32H224zm0-64h576a96 96 0 0 1 96 96v384a96 96 0 0 1-96 96H224a96 96 0 0 1-96-96V480a96 96 0 0 1 96-96z"
    }, null, -1);
    var _hoisted_3150 = (0, import_vue151.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 544a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V576a32 32 0 0 1 32-32zm192-160v-64a192 192 0 1 0-384 0v64h384zM512 64a256 256 0 0 1 256 256v128H256V320A256 256 0 0 1 512 64z"
    }, null, -1);
    var _hoisted_440 = [
      _hoisted_2151,
      _hoisted_3150
    ];
    function _sfc_render151(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue151.openBlock)(), (0, import_vue151.createElementBlock)("svg", _hoisted_1151, _hoisted_440);
    }
    var lock_default = plugin_vue_export_helper_default(_sfc_main151, [["render", _sfc_render151], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/lock.vue"]]);
    var import_vue152 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main152 = {
      name: "Lollipop"
    };
    var _hoisted_1152 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2152 = (0, import_vue152.createElementVNode)("path", {
      fill: "currentColor",
      d: "M513.28 448a64 64 0 1 1 76.544 49.728A96 96 0 0 0 768 448h64a160 160 0 0 1-320 0h1.28zm-126.976-29.696a256 256 0 1 0 43.52-180.48A256 256 0 0 1 832 448h-64a192 192 0 0 0-381.696-29.696zm105.664 249.472L285.696 874.048a96 96 0 0 1-135.68-135.744l206.208-206.272a320 320 0 1 1 135.744 135.744zm-54.464-36.032a321.92 321.92 0 0 1-45.248-45.248L195.2 783.552a32 32 0 1 0 45.248 45.248l197.056-197.12z"
    }, null, -1);
    var _hoisted_3151 = [
      _hoisted_2152
    ];
    function _sfc_render152(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue152.openBlock)(), (0, import_vue152.createElementBlock)("svg", _hoisted_1152, _hoisted_3151);
    }
    var lollipop_default = plugin_vue_export_helper_default(_sfc_main152, [["render", _sfc_render152], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/lollipop.vue"]]);
    var import_vue153 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main153 = {
      name: "MagicStick"
    };
    var _hoisted_1153 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2153 = (0, import_vue153.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 64h64v192h-64V64zm0 576h64v192h-64V640zM160 480v-64h192v64H160zm576 0v-64h192v64H736zM249.856 199.04l45.248-45.184L430.848 289.6 385.6 334.848 249.856 199.104zM657.152 606.4l45.248-45.248 135.744 135.744-45.248 45.248L657.152 606.4zM114.048 923.2 68.8 877.952l316.8-316.8 45.248 45.248-316.8 316.8zM702.4 334.848 657.152 289.6l135.744-135.744 45.248 45.248L702.4 334.848z"
    }, null, -1);
    var _hoisted_3152 = [
      _hoisted_2153
    ];
    function _sfc_render153(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue153.openBlock)(), (0, import_vue153.createElementBlock)("svg", _hoisted_1153, _hoisted_3152);
    }
    var magic_stick_default = plugin_vue_export_helper_default(_sfc_main153, [["render", _sfc_render153], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/magic-stick.vue"]]);
    var import_vue154 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main154 = {
      name: "Magnet"
    };
    var _hoisted_1154 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2154 = (0, import_vue154.createElementVNode)("path", {
      fill: "currentColor",
      d: "M832 320V192H704v320a192 192 0 1 1-384 0V192H192v128h128v64H192v128a320 320 0 0 0 640 0V384H704v-64h128zM640 512V128h256v384a384 384 0 1 1-768 0V128h256v384a128 128 0 1 0 256 0z"
    }, null, -1);
    var _hoisted_3153 = [
      _hoisted_2154
    ];
    function _sfc_render154(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue154.openBlock)(), (0, import_vue154.createElementBlock)("svg", _hoisted_1154, _hoisted_3153);
    }
    var magnet_default = plugin_vue_export_helper_default(_sfc_main154, [["render", _sfc_render154], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/magnet.vue"]]);
    var import_vue155 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main155 = {
      name: "Male"
    };
    var _hoisted_1155 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2155 = (0, import_vue155.createElementVNode)("path", {
      fill: "currentColor",
      d: "M399.5 849.5a225 225 0 1 0 0-450 225 225 0 0 0 0 450zm0 56.25a281.25 281.25 0 1 1 0-562.5 281.25 281.25 0 0 1 0 562.5zm253.125-787.5h225q28.125 0 28.125 28.125T877.625 174.5h-225q-28.125 0-28.125-28.125t28.125-28.125z"
    }, null, -1);
    var _hoisted_3154 = (0, import_vue155.createElementVNode)("path", {
      fill: "currentColor",
      d: "M877.625 118.25q28.125 0 28.125 28.125v225q0 28.125-28.125 28.125T849.5 371.375v-225q0-28.125 28.125-28.125z"
    }, null, -1);
    var _hoisted_441 = (0, import_vue155.createElementVNode)("path", {
      fill: "currentColor",
      d: "M604.813 458.9 565.1 419.131l292.613-292.668 39.825 39.824z"
    }, null, -1);
    var _hoisted_511 = [
      _hoisted_2155,
      _hoisted_3154,
      _hoisted_441
    ];
    function _sfc_render155(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue155.openBlock)(), (0, import_vue155.createElementBlock)("svg", _hoisted_1155, _hoisted_511);
    }
    var male_default = plugin_vue_export_helper_default(_sfc_main155, [["render", _sfc_render155], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/male.vue"]]);
    var import_vue156 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main156 = {
      name: "Management"
    };
    var _hoisted_1156 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2156 = (0, import_vue156.createElementVNode)("path", {
      fill: "currentColor",
      d: "M576 128v288l96-96 96 96V128h128v768H320V128h256zm-448 0h128v768H128V128z"
    }, null, -1);
    var _hoisted_3155 = [
      _hoisted_2156
    ];
    function _sfc_render156(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue156.openBlock)(), (0, import_vue156.createElementBlock)("svg", _hoisted_1156, _hoisted_3155);
    }
    var management_default = plugin_vue_export_helper_default(_sfc_main156, [["render", _sfc_render156], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/management.vue"]]);
    var import_vue157 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main157 = {
      name: "MapLocation"
    };
    var _hoisted_1157 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2157 = (0, import_vue157.createElementVNode)("path", {
      fill: "currentColor",
      d: "M800 416a288 288 0 1 0-576 0c0 118.144 94.528 272.128 288 456.576C705.472 688.128 800 534.144 800 416zM512 960C277.312 746.688 160 565.312 160 416a352 352 0 0 1 704 0c0 149.312-117.312 330.688-352 544z"
    }, null, -1);
    var _hoisted_3156 = (0, import_vue157.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 448a64 64 0 1 0 0-128 64 64 0 0 0 0 128zm0 64a128 128 0 1 1 0-256 128 128 0 0 1 0 256zm345.6 192L960 960H672v-64H352v64H64l102.4-256h691.2zm-68.928 0H235.328l-76.8 192h706.944l-76.8-192z"
    }, null, -1);
    var _hoisted_442 = [
      _hoisted_2157,
      _hoisted_3156
    ];
    function _sfc_render157(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue157.openBlock)(), (0, import_vue157.createElementBlock)("svg", _hoisted_1157, _hoisted_442);
    }
    var map_location_default = plugin_vue_export_helper_default(_sfc_main157, [["render", _sfc_render157], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/map-location.vue"]]);
    var import_vue158 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main158 = {
      name: "Medal"
    };
    var _hoisted_1158 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2158 = (0, import_vue158.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 896a256 256 0 1 0 0-512 256 256 0 0 0 0 512zm0 64a320 320 0 1 1 0-640 320 320 0 0 1 0 640z"
    }, null, -1);
    var _hoisted_3157 = (0, import_vue158.createElementVNode)("path", {
      fill: "currentColor",
      d: "M576 128H448v200a286.72 286.72 0 0 1 64-8c19.52 0 40.832 2.688 64 8V128zm64 0v219.648c24.448 9.088 50.56 20.416 78.4 33.92L757.44 128H640zm-256 0H266.624l39.04 253.568c27.84-13.504 53.888-24.832 78.336-33.92V128zM229.312 64h565.376a32 32 0 0 1 31.616 36.864L768 480c-113.792-64-199.104-96-256-96-56.896 0-142.208 32-256 96l-58.304-379.136A32 32 0 0 1 229.312 64z"
    }, null, -1);
    var _hoisted_443 = [
      _hoisted_2158,
      _hoisted_3157
    ];
    function _sfc_render158(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue158.openBlock)(), (0, import_vue158.createElementBlock)("svg", _hoisted_1158, _hoisted_443);
    }
    var medal_default = plugin_vue_export_helper_default(_sfc_main158, [["render", _sfc_render158], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/medal.vue"]]);
    var import_vue159 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main159 = {
      name: "Menu"
    };
    var _hoisted_1159 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2159 = (0, import_vue159.createElementVNode)("path", {
      fill: "currentColor",
      d: "M160 448a32 32 0 0 1-32-32V160.064a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V416a32 32 0 0 1-32 32H160zm448 0a32 32 0 0 1-32-32V160.064a32 32 0 0 1 32-32h255.936a32 32 0 0 1 32 32V416a32 32 0 0 1-32 32H608zM160 896a32 32 0 0 1-32-32V608a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32H160zm448 0a32 32 0 0 1-32-32V608a32 32 0 0 1 32-32h255.936a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32H608z"
    }, null, -1);
    var _hoisted_3158 = [
      _hoisted_2159
    ];
    function _sfc_render159(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue159.openBlock)(), (0, import_vue159.createElementBlock)("svg", _hoisted_1159, _hoisted_3158);
    }
    var menu_default = plugin_vue_export_helper_default(_sfc_main159, [["render", _sfc_render159], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/menu.vue"]]);
    var import_vue160 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main160 = {
      name: "MessageBox"
    };
    var _hoisted_1160 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2160 = (0, import_vue160.createElementVNode)("path", {
      fill: "currentColor",
      d: "M288 384h448v64H288v-64zm96-128h256v64H384v-64zM131.456 512H384v128h256V512h252.544L721.856 192H302.144L131.456 512zM896 576H704v128H320V576H128v256h768V576zM275.776 128h472.448a32 32 0 0 1 28.608 17.664l179.84 359.552A32 32 0 0 1 960 519.552V864a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V519.552a32 32 0 0 1 3.392-14.336l179.776-359.552A32 32 0 0 1 275.776 128z"
    }, null, -1);
    var _hoisted_3159 = [
      _hoisted_2160
    ];
    function _sfc_render160(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue160.openBlock)(), (0, import_vue160.createElementBlock)("svg", _hoisted_1160, _hoisted_3159);
    }
    var message_box_default = plugin_vue_export_helper_default(_sfc_main160, [["render", _sfc_render160], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/message-box.vue"]]);
    var import_vue161 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main161 = {
      name: "Message"
    };
    var _hoisted_1161 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2161 = (0, import_vue161.createElementVNode)("path", {
      fill: "currentColor",
      d: "M128 224v512a64 64 0 0 0 64 64h640a64 64 0 0 0 64-64V224H128zm0-64h768a64 64 0 0 1 64 64v512a128 128 0 0 1-128 128H192A128 128 0 0 1 64 736V224a64 64 0 0 1 64-64z"
    }, null, -1);
    var _hoisted_3160 = (0, import_vue161.createElementVNode)("path", {
      fill: "currentColor",
      d: "M904 224 656.512 506.88a192 192 0 0 1-289.024 0L120 224h784zm-698.944 0 210.56 240.704a128 128 0 0 0 192.704 0L818.944 224H205.056z"
    }, null, -1);
    var _hoisted_444 = [
      _hoisted_2161,
      _hoisted_3160
    ];
    function _sfc_render161(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue161.openBlock)(), (0, import_vue161.createElementBlock)("svg", _hoisted_1161, _hoisted_444);
    }
    var message_default = plugin_vue_export_helper_default(_sfc_main161, [["render", _sfc_render161], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/message.vue"]]);
    var import_vue162 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main162 = {
      name: "Mic"
    };
    var _hoisted_1162 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2162 = (0, import_vue162.createElementVNode)("path", {
      fill: "currentColor",
      d: "M480 704h160a64 64 0 0 0 64-64v-32h-96a32 32 0 0 1 0-64h96v-96h-96a32 32 0 0 1 0-64h96v-96h-96a32 32 0 0 1 0-64h96v-32a64 64 0 0 0-64-64H384a64 64 0 0 0-64 64v32h96a32 32 0 0 1 0 64h-96v96h96a32 32 0 0 1 0 64h-96v96h96a32 32 0 0 1 0 64h-96v32a64 64 0 0 0 64 64h96zm64 64v128h192a32 32 0 1 1 0 64H288a32 32 0 1 1 0-64h192V768h-96a128 128 0 0 1-128-128V192A128 128 0 0 1 384 64h256a128 128 0 0 1 128 128v448a128 128 0 0 1-128 128h-96z"
    }, null, -1);
    var _hoisted_3161 = [
      _hoisted_2162
    ];
    function _sfc_render162(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue162.openBlock)(), (0, import_vue162.createElementBlock)("svg", _hoisted_1162, _hoisted_3161);
    }
    var mic_default = plugin_vue_export_helper_default(_sfc_main162, [["render", _sfc_render162], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/mic.vue"]]);
    var import_vue163 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main163 = {
      name: "Microphone"
    };
    var _hoisted_1163 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2163 = (0, import_vue163.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 128a128 128 0 0 0-128 128v256a128 128 0 1 0 256 0V256a128 128 0 0 0-128-128zm0-64a192 192 0 0 1 192 192v256a192 192 0 1 1-384 0V256A192 192 0 0 1 512 64zm-32 832v-64a288 288 0 0 1-288-288v-32a32 32 0 0 1 64 0v32a224 224 0 0 0 224 224h64a224 224 0 0 0 224-224v-32a32 32 0 1 1 64 0v32a288 288 0 0 1-288 288v64h64a32 32 0 1 1 0 64H416a32 32 0 1 1 0-64h64z"
    }, null, -1);
    var _hoisted_3162 = [
      _hoisted_2163
    ];
    function _sfc_render163(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue163.openBlock)(), (0, import_vue163.createElementBlock)("svg", _hoisted_1163, _hoisted_3162);
    }
    var microphone_default = plugin_vue_export_helper_default(_sfc_main163, [["render", _sfc_render163], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/microphone.vue"]]);
    var import_vue164 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main164 = {
      name: "MilkTea"
    };
    var _hoisted_1164 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2164 = (0, import_vue164.createElementVNode)("path", {
      fill: "currentColor",
      d: "M416 128V96a96 96 0 0 1 96-96h128a32 32 0 1 1 0 64H512a32 32 0 0 0-32 32v32h320a96 96 0 0 1 11.712 191.296l-39.68 581.056A64 64 0 0 1 708.224 960H315.776a64 64 0 0 1-63.872-59.648l-39.616-581.056A96 96 0 0 1 224 128h192zM276.48 320l39.296 576h392.448l4.8-70.784a224.064 224.064 0 0 1 30.016-439.808L747.52 320H276.48zM224 256h576a32 32 0 1 0 0-64H224a32 32 0 0 0 0 64zm493.44 503.872 21.12-309.12a160 160 0 0 0-21.12 309.12z"
    }, null, -1);
    var _hoisted_3163 = [
      _hoisted_2164
    ];
    function _sfc_render164(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue164.openBlock)(), (0, import_vue164.createElementBlock)("svg", _hoisted_1164, _hoisted_3163);
    }
    var milk_tea_default = plugin_vue_export_helper_default(_sfc_main164, [["render", _sfc_render164], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/milk-tea.vue"]]);
    var import_vue165 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main165 = {
      name: "Minus"
    };
    var _hoisted_1165 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2165 = (0, import_vue165.createElementVNode)("path", {
      fill: "currentColor",
      d: "M128 544h768a32 32 0 1 0 0-64H128a32 32 0 0 0 0 64z"
    }, null, -1);
    var _hoisted_3164 = [
      _hoisted_2165
    ];
    function _sfc_render165(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue165.openBlock)(), (0, import_vue165.createElementBlock)("svg", _hoisted_1165, _hoisted_3164);
    }
    var minus_default = plugin_vue_export_helper_default(_sfc_main165, [["render", _sfc_render165], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/minus.vue"]]);
    var import_vue166 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main166 = {
      name: "Money"
    };
    var _hoisted_1166 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2166 = (0, import_vue166.createElementVNode)("path", {
      fill: "currentColor",
      d: "M256 640v192h640V384H768v-64h150.976c14.272 0 19.456 1.472 24.64 4.288a29.056 29.056 0 0 1 12.16 12.096c2.752 5.184 4.224 10.368 4.224 24.64v493.952c0 14.272-1.472 19.456-4.288 24.64a29.056 29.056 0 0 1-12.096 12.16c-5.184 2.752-10.368 4.224-24.64 4.224H233.024c-14.272 0-19.456-1.472-24.64-4.288a29.056 29.056 0 0 1-12.16-12.096c-2.688-5.184-4.224-10.368-4.224-24.576V640h64z"
    }, null, -1);
    var _hoisted_3165 = (0, import_vue166.createElementVNode)("path", {
      fill: "currentColor",
      d: "M768 192H128v448h640V192zm64-22.976v493.952c0 14.272-1.472 19.456-4.288 24.64a29.056 29.056 0 0 1-12.096 12.16c-5.184 2.752-10.368 4.224-24.64 4.224H105.024c-14.272 0-19.456-1.472-24.64-4.288a29.056 29.056 0 0 1-12.16-12.096C65.536 682.432 64 677.248 64 663.04V169.024c0-14.272 1.472-19.456 4.288-24.64a29.056 29.056 0 0 1 12.096-12.16C85.568 129.536 90.752 128 104.96 128h685.952c14.272 0 19.456 1.472 24.64 4.288a29.056 29.056 0 0 1 12.16 12.096c2.752 5.184 4.224 10.368 4.224 24.64z"
    }, null, -1);
    var _hoisted_445 = (0, import_vue166.createElementVNode)("path", {
      fill: "currentColor",
      d: "M448 576a160 160 0 1 1 0-320 160 160 0 0 1 0 320zm0-64a96 96 0 1 0 0-192 96 96 0 0 0 0 192z"
    }, null, -1);
    var _hoisted_512 = [
      _hoisted_2166,
      _hoisted_3165,
      _hoisted_445
    ];
    function _sfc_render166(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue166.openBlock)(), (0, import_vue166.createElementBlock)("svg", _hoisted_1166, _hoisted_512);
    }
    var money_default = plugin_vue_export_helper_default(_sfc_main166, [["render", _sfc_render166], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/money.vue"]]);
    var import_vue167 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main167 = {
      name: "Monitor"
    };
    var _hoisted_1167 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2167 = (0, import_vue167.createElementVNode)("path", {
      fill: "currentColor",
      d: "M544 768v128h192a32 32 0 1 1 0 64H288a32 32 0 1 1 0-64h192V768H192A128 128 0 0 1 64 640V256a128 128 0 0 1 128-128h640a128 128 0 0 1 128 128v384a128 128 0 0 1-128 128H544zM192 192a64 64 0 0 0-64 64v384a64 64 0 0 0 64 64h640a64 64 0 0 0 64-64V256a64 64 0 0 0-64-64H192z"
    }, null, -1);
    var _hoisted_3166 = [
      _hoisted_2167
    ];
    function _sfc_render167(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue167.openBlock)(), (0, import_vue167.createElementBlock)("svg", _hoisted_1167, _hoisted_3166);
    }
    var monitor_default = plugin_vue_export_helper_default(_sfc_main167, [["render", _sfc_render167], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/monitor.vue"]]);
    var import_vue168 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main168 = {
      name: "MoonNight"
    };
    var _hoisted_1168 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2168 = (0, import_vue168.createElementVNode)("path", {
      fill: "currentColor",
      d: "M384 512a448 448 0 0 1 215.872-383.296A384 384 0 0 0 213.76 640h188.8A448.256 448.256 0 0 1 384 512zM171.136 704a448 448 0 0 1 636.992-575.296A384 384 0 0 0 499.328 704h-328.32z"
    }, null, -1);
    var _hoisted_3167 = (0, import_vue168.createElementVNode)("path", {
      fill: "currentColor",
      d: "M32 640h960q32 0 32 32t-32 32H32q-32 0-32-32t32-32zm128 128h384a32 32 0 1 1 0 64H160a32 32 0 1 1 0-64zm160 127.68 224 .256a32 32 0 0 1 32 32V928a32 32 0 0 1-32 32l-224-.384a32 32 0 0 1-32-32v-.064a32 32 0 0 1 32-32z"
    }, null, -1);
    var _hoisted_446 = [
      _hoisted_2168,
      _hoisted_3167
    ];
    function _sfc_render168(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue168.openBlock)(), (0, import_vue168.createElementBlock)("svg", _hoisted_1168, _hoisted_446);
    }
    var moon_night_default = plugin_vue_export_helper_default(_sfc_main168, [["render", _sfc_render168], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/moon-night.vue"]]);
    var import_vue169 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main169 = {
      name: "Moon"
    };
    var _hoisted_1169 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2169 = (0, import_vue169.createElementVNode)("path", {
      fill: "currentColor",
      d: "M240.448 240.448a384 384 0 1 0 559.424 525.696 448 448 0 0 1-542.016-542.08 390.592 390.592 0 0 0-17.408 16.384zm181.056 362.048a384 384 0 0 0 525.632 16.384A448 448 0 1 1 405.056 76.8a384 384 0 0 0 16.448 525.696z"
    }, null, -1);
    var _hoisted_3168 = [
      _hoisted_2169
    ];
    function _sfc_render169(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue169.openBlock)(), (0, import_vue169.createElementBlock)("svg", _hoisted_1169, _hoisted_3168);
    }
    var moon_default = plugin_vue_export_helper_default(_sfc_main169, [["render", _sfc_render169], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/moon.vue"]]);
    var import_vue170 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main170 = {
      name: "MoreFilled"
    };
    var _hoisted_1170 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2170 = (0, import_vue170.createElementVNode)("path", {
      fill: "currentColor",
      d: "M176 416a112 112 0 1 1 0 224 112 112 0 0 1 0-224zm336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224zm336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224z"
    }, null, -1);
    var _hoisted_3169 = [
      _hoisted_2170
    ];
    function _sfc_render170(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue170.openBlock)(), (0, import_vue170.createElementBlock)("svg", _hoisted_1170, _hoisted_3169);
    }
    var more_filled_default = plugin_vue_export_helper_default(_sfc_main170, [["render", _sfc_render170], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/more-filled.vue"]]);
    var import_vue171 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main171 = {
      name: "More"
    };
    var _hoisted_1171 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2171 = (0, import_vue171.createElementVNode)("path", {
      fill: "currentColor",
      d: "M176 416a112 112 0 1 0 0 224 112 112 0 0 0 0-224m0 64a48 48 0 1 1 0 96 48 48 0 0 1 0-96zm336-64a112 112 0 1 1 0 224 112 112 0 0 1 0-224zm0 64a48 48 0 1 0 0 96 48 48 0 0 0 0-96zm336-64a112 112 0 1 1 0 224 112 112 0 0 1 0-224zm0 64a48 48 0 1 0 0 96 48 48 0 0 0 0-96z"
    }, null, -1);
    var _hoisted_3170 = [
      _hoisted_2171
    ];
    function _sfc_render171(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue171.openBlock)(), (0, import_vue171.createElementBlock)("svg", _hoisted_1171, _hoisted_3170);
    }
    var more_default = plugin_vue_export_helper_default(_sfc_main171, [["render", _sfc_render171], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/more.vue"]]);
    var import_vue172 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main172 = {
      name: "MostlyCloudy"
    };
    var _hoisted_1172 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2172 = (0, import_vue172.createElementVNode)("path", {
      fill: "currentColor",
      d: "M737.216 357.952 704 349.824l-11.776-32a192.064 192.064 0 0 0-367.424 23.04l-8.96 39.04-39.04 8.96A192.064 192.064 0 0 0 320 768h368a207.808 207.808 0 0 0 207.808-208 208.32 208.32 0 0 0-158.592-202.048zm15.168-62.208A272.32 272.32 0 0 1 959.744 560a271.808 271.808 0 0 1-271.552 272H320a256 256 0 0 1-57.536-505.536 256.128 256.128 0 0 1 489.92-30.72z"
    }, null, -1);
    var _hoisted_3171 = [
      _hoisted_2172
    ];
    function _sfc_render172(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue172.openBlock)(), (0, import_vue172.createElementBlock)("svg", _hoisted_1172, _hoisted_3171);
    }
    var mostly_cloudy_default = plugin_vue_export_helper_default(_sfc_main172, [["render", _sfc_render172], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/mostly-cloudy.vue"]]);
    var import_vue173 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main173 = {
      name: "Mouse"
    };
    var _hoisted_1173 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2173 = (0, import_vue173.createElementVNode)("path", {
      fill: "currentColor",
      d: "M438.144 256c-68.352 0-92.736 4.672-117.76 18.112-20.096 10.752-35.52 26.176-46.272 46.272C260.672 345.408 256 369.792 256 438.144v275.712c0 68.352 4.672 92.736 18.112 117.76 10.752 20.096 26.176 35.52 46.272 46.272C345.408 891.328 369.792 896 438.144 896h147.712c68.352 0 92.736-4.672 117.76-18.112 20.096-10.752 35.52-26.176 46.272-46.272C763.328 806.592 768 782.208 768 713.856V438.144c0-68.352-4.672-92.736-18.112-117.76a110.464 110.464 0 0 0-46.272-46.272C678.592 260.672 654.208 256 585.856 256H438.144zm0-64h147.712c85.568 0 116.608 8.96 147.904 25.6 31.36 16.768 55.872 41.344 72.576 72.64C823.104 321.536 832 352.576 832 438.08v275.84c0 85.504-8.96 116.544-25.6 147.84a174.464 174.464 0 0 1-72.64 72.576C702.464 951.104 671.424 960 585.92 960H438.08c-85.504 0-116.544-8.96-147.84-25.6a174.464 174.464 0 0 1-72.64-72.704c-16.768-31.296-25.664-62.336-25.664-147.84v-275.84c0-85.504 8.96-116.544 25.6-147.84a174.464 174.464 0 0 1 72.768-72.576c31.232-16.704 62.272-25.6 147.776-25.6z"
    }, null, -1);
    var _hoisted_3172 = (0, import_vue173.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 320q32 0 32 32v128q0 32-32 32t-32-32V352q0-32 32-32zm32-96a32 32 0 0 1-64 0v-64a32 32 0 0 0-32-32h-96a32 32 0 0 1 0-64h96a96 96 0 0 1 96 96v64z"
    }, null, -1);
    var _hoisted_447 = [
      _hoisted_2173,
      _hoisted_3172
    ];
    function _sfc_render173(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue173.openBlock)(), (0, import_vue173.createElementBlock)("svg", _hoisted_1173, _hoisted_447);
    }
    var mouse_default = plugin_vue_export_helper_default(_sfc_main173, [["render", _sfc_render173], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/mouse.vue"]]);
    var import_vue174 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main174 = {
      name: "Mug"
    };
    var _hoisted_1174 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2174 = (0, import_vue174.createElementVNode)("path", {
      fill: "currentColor",
      d: "M736 800V160H160v640a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64zm64-544h63.552a96 96 0 0 1 96 96v224a96 96 0 0 1-96 96H800v128a128 128 0 0 1-128 128H224A128 128 0 0 1 96 800V128a32 32 0 0 1 32-32h640a32 32 0 0 1 32 32v128zm0 64v288h63.552a32 32 0 0 0 32-32V352a32 32 0 0 0-32-32H800z"
    }, null, -1);
    var _hoisted_3173 = [
      _hoisted_2174
    ];
    function _sfc_render174(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue174.openBlock)(), (0, import_vue174.createElementBlock)("svg", _hoisted_1174, _hoisted_3173);
    }
    var mug_default = plugin_vue_export_helper_default(_sfc_main174, [["render", _sfc_render174], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/mug.vue"]]);
    var import_vue175 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main175 = {
      name: "MuteNotification"
    };
    var _hoisted_1175 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2175 = (0, import_vue175.createElementVNode)("path", {
      fill: "currentColor",
      d: "m241.216 832 63.616-64H768V448c0-42.368-10.24-82.304-28.48-117.504l46.912-47.232C815.36 331.392 832 387.84 832 448v320h96a32 32 0 1 1 0 64H241.216zm-90.24 0H96a32 32 0 1 1 0-64h96V448a320.128 320.128 0 0 1 256-313.6V128a64 64 0 1 1 128 0v6.4a319.552 319.552 0 0 1 171.648 97.088l-45.184 45.44A256 256 0 0 0 256 448v278.336L151.04 832zM448 896h128a64 64 0 0 1-128 0z"
    }, null, -1);
    var _hoisted_3174 = (0, import_vue175.createElementVNode)("path", {
      fill: "currentColor",
      d: "M150.72 859.072a32 32 0 0 1-45.44-45.056l704-708.544a32 32 0 0 1 45.44 45.056l-704 708.544z"
    }, null, -1);
    var _hoisted_448 = [
      _hoisted_2175,
      _hoisted_3174
    ];
    function _sfc_render175(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue175.openBlock)(), (0, import_vue175.createElementBlock)("svg", _hoisted_1175, _hoisted_448);
    }
    var mute_notification_default = plugin_vue_export_helper_default(_sfc_main175, [["render", _sfc_render175], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/mute-notification.vue"]]);
    var import_vue176 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main176 = {
      name: "Mute"
    };
    var _hoisted_1176 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2176 = (0, import_vue176.createElementVNode)("path", {
      fill: "currentColor",
      d: "m412.16 592.128-45.44 45.44A191.232 191.232 0 0 1 320 512V256a192 192 0 1 1 384 0v44.352l-64 64V256a128 128 0 1 0-256 0v256c0 30.336 10.56 58.24 28.16 80.128zm51.968 38.592A128 128 0 0 0 640 512v-57.152l64-64V512a192 192 0 0 1-287.68 166.528l47.808-47.808zM314.88 779.968l46.144-46.08A222.976 222.976 0 0 0 480 768h64a224 224 0 0 0 224-224v-32a32 32 0 1 1 64 0v32a288 288 0 0 1-288 288v64h64a32 32 0 1 1 0 64H416a32 32 0 1 1 0-64h64v-64c-61.44 0-118.4-19.2-165.12-52.032zM266.752 737.6A286.976 286.976 0 0 1 192 544v-32a32 32 0 0 1 64 0v32c0 56.832 21.184 108.8 56.064 148.288L266.752 737.6z"
    }, null, -1);
    var _hoisted_3175 = (0, import_vue176.createElementVNode)("path", {
      fill: "currentColor",
      d: "M150.72 859.072a32 32 0 0 1-45.44-45.056l704-708.544a32 32 0 0 1 45.44 45.056l-704 708.544z"
    }, null, -1);
    var _hoisted_449 = [
      _hoisted_2176,
      _hoisted_3175
    ];
    function _sfc_render176(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue176.openBlock)(), (0, import_vue176.createElementBlock)("svg", _hoisted_1176, _hoisted_449);
    }
    var mute_default = plugin_vue_export_helper_default(_sfc_main176, [["render", _sfc_render176], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/mute.vue"]]);
    var import_vue177 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main177 = {
      name: "NoSmoking"
    };
    var _hoisted_1177 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2177 = (0, import_vue177.createElementVNode)("path", {
      fill: "currentColor",
      d: "M440.256 576H256v128h56.256l-64 64H224a32 32 0 0 1-32-32V544a32 32 0 0 1 32-32h280.256l-64 64zm143.488 128H704V583.744L775.744 512H928a32 32 0 0 1 32 32v192a32 32 0 0 1-32 32H519.744l64-64zM768 576v128h128V576H768zm-29.696-207.552 45.248 45.248-497.856 497.856-45.248-45.248zM256 64h64v320h-64zM128 192h64v192h-64zM64 512h64v256H64z"
    }, null, -1);
    var _hoisted_3176 = [
      _hoisted_2177
    ];
    function _sfc_render177(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue177.openBlock)(), (0, import_vue177.createElementBlock)("svg", _hoisted_1177, _hoisted_3176);
    }
    var no_smoking_default = plugin_vue_export_helper_default(_sfc_main177, [["render", _sfc_render177], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/no-smoking.vue"]]);
    var import_vue178 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main178 = {
      name: "Notebook"
    };
    var _hoisted_1178 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2178 = (0, import_vue178.createElementVNode)("path", {
      fill: "currentColor",
      d: "M192 128v768h640V128H192zm-32-64h704a32 32 0 0 1 32 32v832a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32z"
    }, null, -1);
    var _hoisted_3177 = (0, import_vue178.createElementVNode)("path", {
      fill: "currentColor",
      d: "M672 128h64v768h-64zM96 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32zm0 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32zm0 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32zm0 192h128q32 0 32 32t-32 32H96q-32 0-32-32t32-32z"
    }, null, -1);
    var _hoisted_450 = [
      _hoisted_2178,
      _hoisted_3177
    ];
    function _sfc_render178(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue178.openBlock)(), (0, import_vue178.createElementBlock)("svg", _hoisted_1178, _hoisted_450);
    }
    var notebook_default = plugin_vue_export_helper_default(_sfc_main178, [["render", _sfc_render178], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/notebook.vue"]]);
    var import_vue179 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main179 = {
      name: "Notification"
    };
    var _hoisted_1179 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2179 = (0, import_vue179.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 128v64H256a64 64 0 0 0-64 64v512a64 64 0 0 0 64 64h512a64 64 0 0 0 64-64V512h64v256a128 128 0 0 1-128 128H256a128 128 0 0 1-128-128V256a128 128 0 0 1 128-128h256z"
    }, null, -1);
    var _hoisted_3178 = (0, import_vue179.createElementVNode)("path", {
      fill: "currentColor",
      d: "M768 384a128 128 0 1 0 0-256 128 128 0 0 0 0 256zm0 64a192 192 0 1 1 0-384 192 192 0 0 1 0 384z"
    }, null, -1);
    var _hoisted_451 = [
      _hoisted_2179,
      _hoisted_3178
    ];
    function _sfc_render179(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue179.openBlock)(), (0, import_vue179.createElementBlock)("svg", _hoisted_1179, _hoisted_451);
    }
    var notification_default = plugin_vue_export_helper_default(_sfc_main179, [["render", _sfc_render179], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/notification.vue"]]);
    var import_vue180 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main180 = {
      name: "Odometer"
    };
    var _hoisted_1180 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2180 = (0, import_vue180.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
    }, null, -1);
    var _hoisted_3179 = (0, import_vue180.createElementVNode)("path", {
      fill: "currentColor",
      d: "M192 512a320 320 0 1 1 640 0 32 32 0 1 1-64 0 256 256 0 1 0-512 0 32 32 0 0 1-64 0z"
    }, null, -1);
    var _hoisted_452 = (0, import_vue180.createElementVNode)("path", {
      fill: "currentColor",
      d: "M570.432 627.84A96 96 0 1 1 509.568 608l60.992-187.776A32 32 0 1 1 631.424 440l-60.992 187.776zM502.08 734.464a32 32 0 1 0 19.84-60.928 32 32 0 0 0-19.84 60.928z"
    }, null, -1);
    var _hoisted_513 = [
      _hoisted_2180,
      _hoisted_3179,
      _hoisted_452
    ];
    function _sfc_render180(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue180.openBlock)(), (0, import_vue180.createElementBlock)("svg", _hoisted_1180, _hoisted_513);
    }
    var odometer_default = plugin_vue_export_helper_default(_sfc_main180, [["render", _sfc_render180], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/odometer.vue"]]);
    var import_vue181 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main181 = {
      name: "OfficeBuilding"
    };
    var _hoisted_1181 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2181 = (0, import_vue181.createElementVNode)("path", {
      fill: "currentColor",
      d: "M192 128v704h384V128H192zm-32-64h448a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32z"
    }, null, -1);
    var _hoisted_3180 = (0, import_vue181.createElementVNode)("path", {
      fill: "currentColor",
      d: "M256 256h256v64H256v-64zm0 192h256v64H256v-64zm0 192h256v64H256v-64zm384-128h128v64H640v-64zm0 128h128v64H640v-64zM64 832h896v64H64v-64z"
    }, null, -1);
    var _hoisted_453 = (0, import_vue181.createElementVNode)("path", {
      fill: "currentColor",
      d: "M640 384v448h192V384H640zm-32-64h256a32 32 0 0 1 32 32v512a32 32 0 0 1-32 32H608a32 32 0 0 1-32-32V352a32 32 0 0 1 32-32z"
    }, null, -1);
    var _hoisted_514 = [
      _hoisted_2181,
      _hoisted_3180,
      _hoisted_453
    ];
    function _sfc_render181(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue181.openBlock)(), (0, import_vue181.createElementBlock)("svg", _hoisted_1181, _hoisted_514);
    }
    var office_building_default = plugin_vue_export_helper_default(_sfc_main181, [["render", _sfc_render181], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/office-building.vue"]]);
    var import_vue182 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main182 = {
      name: "Open"
    };
    var _hoisted_1182 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2182 = (0, import_vue182.createElementVNode)("path", {
      fill: "currentColor",
      d: "M329.956 257.138a254.862 254.862 0 0 0 0 509.724h364.088a254.862 254.862 0 0 0 0-509.724H329.956zm0-72.818h364.088a327.68 327.68 0 1 1 0 655.36H329.956a327.68 327.68 0 1 1 0-655.36z"
    }, null, -1);
    var _hoisted_3181 = (0, import_vue182.createElementVNode)("path", {
      fill: "currentColor",
      d: "M694.044 621.227a109.227 109.227 0 1 0 0-218.454 109.227 109.227 0 0 0 0 218.454zm0 72.817a182.044 182.044 0 1 1 0-364.088 182.044 182.044 0 0 1 0 364.088z"
    }, null, -1);
    var _hoisted_454 = [
      _hoisted_2182,
      _hoisted_3181
    ];
    function _sfc_render182(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue182.openBlock)(), (0, import_vue182.createElementBlock)("svg", _hoisted_1182, _hoisted_454);
    }
    var open_default = plugin_vue_export_helper_default(_sfc_main182, [["render", _sfc_render182], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/open.vue"]]);
    var import_vue183 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main183 = {
      name: "Operation"
    };
    var _hoisted_1183 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2183 = (0, import_vue183.createElementVNode)("path", {
      fill: "currentColor",
      d: "M389.44 768a96.064 96.064 0 0 1 181.12 0H896v64H570.56a96.064 96.064 0 0 1-181.12 0H128v-64h261.44zm192-288a96.064 96.064 0 0 1 181.12 0H896v64H762.56a96.064 96.064 0 0 1-181.12 0H128v-64h453.44zm-320-288a96.064 96.064 0 0 1 181.12 0H896v64H442.56a96.064 96.064 0 0 1-181.12 0H128v-64h133.44z"
    }, null, -1);
    var _hoisted_3182 = [
      _hoisted_2183
    ];
    function _sfc_render183(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue183.openBlock)(), (0, import_vue183.createElementBlock)("svg", _hoisted_1183, _hoisted_3182);
    }
    var operation_default = plugin_vue_export_helper_default(_sfc_main183, [["render", _sfc_render183], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/operation.vue"]]);
    var import_vue184 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main184 = {
      name: "Opportunity"
    };
    var _hoisted_1184 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2184 = (0, import_vue184.createElementVNode)("path", {
      fill: "currentColor",
      d: "M384 960v-64h192.064v64H384zm448-544a350.656 350.656 0 0 1-128.32 271.424C665.344 719.04 640 763.776 640 813.504V832H320v-14.336c0-48-19.392-95.36-57.216-124.992a351.552 351.552 0 0 1-128.448-344.256c25.344-136.448 133.888-248.128 269.76-276.48A352.384 352.384 0 0 1 832 416zm-544 32c0-132.288 75.904-224 192-224v-64c-154.432 0-256 122.752-256 288h64z"
    }, null, -1);
    var _hoisted_3183 = [
      _hoisted_2184
    ];
    function _sfc_render184(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue184.openBlock)(), (0, import_vue184.createElementBlock)("svg", _hoisted_1184, _hoisted_3183);
    }
    var opportunity_default = plugin_vue_export_helper_default(_sfc_main184, [["render", _sfc_render184], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/opportunity.vue"]]);
    var import_vue185 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main185 = {
      name: "Orange"
    };
    var _hoisted_1185 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2185 = (0, import_vue185.createElementVNode)("path", {
      fill: "currentColor",
      d: "M544 894.72a382.336 382.336 0 0 0 215.936-89.472L577.024 622.272c-10.24 6.016-21.248 10.688-33.024 13.696v258.688zm261.248-134.784A382.336 382.336 0 0 0 894.656 544H635.968c-3.008 11.776-7.68 22.848-13.696 33.024l182.976 182.912zM894.656 480a382.336 382.336 0 0 0-89.408-215.936L622.272 446.976c6.016 10.24 10.688 21.248 13.696 33.024h258.688zm-134.72-261.248A382.336 382.336 0 0 0 544 129.344v258.688c11.776 3.008 22.848 7.68 33.024 13.696l182.912-182.976zM480 129.344a382.336 382.336 0 0 0-215.936 89.408l182.912 182.976c10.24-6.016 21.248-10.688 33.024-13.696V129.344zm-261.248 134.72A382.336 382.336 0 0 0 129.344 480h258.688c3.008-11.776 7.68-22.848 13.696-33.024L218.752 264.064zM129.344 544a382.336 382.336 0 0 0 89.408 215.936l182.976-182.912A127.232 127.232 0 0 1 388.032 544H129.344zm134.72 261.248A382.336 382.336 0 0 0 480 894.656V635.968a127.232 127.232 0 0 1-33.024-13.696L264.064 805.248zM512 960a448 448 0 1 1 0-896 448 448 0 0 1 0 896zm0-384a64 64 0 1 0 0-128 64 64 0 0 0 0 128z"
    }, null, -1);
    var _hoisted_3184 = [
      _hoisted_2185
    ];
    function _sfc_render185(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue185.openBlock)(), (0, import_vue185.createElementBlock)("svg", _hoisted_1185, _hoisted_3184);
    }
    var orange_default = plugin_vue_export_helper_default(_sfc_main185, [["render", _sfc_render185], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/orange.vue"]]);
    var import_vue186 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main186 = {
      name: "Paperclip"
    };
    var _hoisted_1186 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2186 = (0, import_vue186.createElementVNode)("path", {
      fill: "currentColor",
      d: "M602.496 240.448A192 192 0 1 1 874.048 512l-316.8 316.8A256 256 0 0 1 195.2 466.752L602.496 59.456l45.248 45.248L240.448 512A192 192 0 0 0 512 783.552l316.8-316.8a128 128 0 1 0-181.056-181.056L353.6 579.904a32 32 0 1 0 45.248 45.248l294.144-294.144 45.312 45.248L444.096 670.4a96 96 0 1 1-135.744-135.744l294.144-294.208z"
    }, null, -1);
    var _hoisted_3185 = [
      _hoisted_2186
    ];
    function _sfc_render186(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue186.openBlock)(), (0, import_vue186.createElementBlock)("svg", _hoisted_1186, _hoisted_3185);
    }
    var paperclip_default = plugin_vue_export_helper_default(_sfc_main186, [["render", _sfc_render186], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/paperclip.vue"]]);
    var import_vue187 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main187 = {
      name: "PartlyCloudy"
    };
    var _hoisted_1187 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2187 = (0, import_vue187.createElementVNode)("path", {
      fill: "currentColor",
      d: "M598.4 895.872H328.192a256 256 0 0 1-34.496-510.528A352 352 0 1 1 598.4 895.872zm-271.36-64h272.256a288 288 0 1 0-248.512-417.664L335.04 445.44l-34.816 3.584a192 192 0 0 0 26.88 382.848z"
    }, null, -1);
    var _hoisted_3186 = (0, import_vue187.createElementVNode)("path", {
      fill: "currentColor",
      d: "M139.84 501.888a256 256 0 1 1 417.856-277.12c-17.728 2.176-38.208 8.448-61.504 18.816A192 192 0 1 0 189.12 460.48a6003.84 6003.84 0 0 0-49.28 41.408z"
    }, null, -1);
    var _hoisted_455 = [
      _hoisted_2187,
      _hoisted_3186
    ];
    function _sfc_render187(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue187.openBlock)(), (0, import_vue187.createElementBlock)("svg", _hoisted_1187, _hoisted_455);
    }
    var partly_cloudy_default = plugin_vue_export_helper_default(_sfc_main187, [["render", _sfc_render187], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/partly-cloudy.vue"]]);
    var import_vue188 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main188 = {
      name: "Pear"
    };
    var _hoisted_1188 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2188 = (0, import_vue188.createElementVNode)("path", {
      fill: "currentColor",
      d: "M542.336 258.816a443.255 443.255 0 0 0-9.024 25.088 32 32 0 1 1-60.8-20.032l1.088-3.328a162.688 162.688 0 0 0-122.048 131.392l-17.088 102.72-20.736 15.36C256.192 552.704 224 610.88 224 672c0 120.576 126.4 224 288 224s288-103.424 288-224c0-61.12-32.192-119.296-89.728-161.92l-20.736-15.424-17.088-102.72a162.688 162.688 0 0 0-130.112-133.12zm-40.128-66.56c7.936-15.552 16.576-30.08 25.92-43.776 23.296-33.92 49.408-59.776 78.528-77.12a32 32 0 1 1 32.704 55.04c-20.544 12.224-40.064 31.552-58.432 58.304a316.608 316.608 0 0 0-9.792 15.104 226.688 226.688 0 0 1 164.48 181.568l12.8 77.248C819.456 511.36 864 587.392 864 672c0 159.04-157.568 288-352 288S160 831.04 160 672c0-84.608 44.608-160.64 115.584-213.376l12.8-77.248a226.624 226.624 0 0 1 213.76-189.184z"
    }, null, -1);
    var _hoisted_3187 = [
      _hoisted_2188
    ];
    function _sfc_render188(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue188.openBlock)(), (0, import_vue188.createElementBlock)("svg", _hoisted_1188, _hoisted_3187);
    }
    var pear_default = plugin_vue_export_helper_default(_sfc_main188, [["render", _sfc_render188], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/pear.vue"]]);
    var import_vue189 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main189 = {
      name: "PhoneFilled"
    };
    var _hoisted_1189 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2189 = (0, import_vue189.createElementVNode)("path", {
      fill: "currentColor",
      d: "M199.232 125.568 90.624 379.008a32 32 0 0 0 6.784 35.2l512.384 512.384a32 32 0 0 0 35.2 6.784l253.44-108.608a32 32 0 0 0 10.048-52.032L769.6 633.92a32 32 0 0 0-36.928-5.952l-130.176 65.088-271.488-271.552 65.024-130.176a32 32 0 0 0-5.952-36.928L251.2 115.52a32 32 0 0 0-51.968 10.048z"
    }, null, -1);
    var _hoisted_3188 = [
      _hoisted_2189
    ];
    function _sfc_render189(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue189.openBlock)(), (0, import_vue189.createElementBlock)("svg", _hoisted_1189, _hoisted_3188);
    }
    var phone_filled_default = plugin_vue_export_helper_default(_sfc_main189, [["render", _sfc_render189], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/phone-filled.vue"]]);
    var import_vue190 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main190 = {
      name: "Phone"
    };
    var _hoisted_1190 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2190 = (0, import_vue190.createElementVNode)("path", {
      fill: "currentColor",
      d: "M79.36 432.256 591.744 944.64a32 32 0 0 0 35.2 6.784l253.44-108.544a32 32 0 0 0 9.984-52.032l-153.856-153.92a32 32 0 0 0-36.928-6.016l-69.888 34.944L358.08 394.24l35.008-69.888a32 32 0 0 0-5.952-36.928L233.152 133.568a32 32 0 0 0-52.032 10.048L72.512 397.056a32 32 0 0 0 6.784 35.2zm60.48-29.952 81.536-190.08L325.568 316.48l-24.64 49.216-20.608 41.216 32.576 32.64 271.552 271.552 32.64 32.64 41.216-20.672 49.28-24.576 104.192 104.128-190.08 81.472L139.84 402.304zM512 320v-64a256 256 0 0 1 256 256h-64a192 192 0 0 0-192-192zm0-192V64a448 448 0 0 1 448 448h-64a384 384 0 0 0-384-384z"
    }, null, -1);
    var _hoisted_3189 = [
      _hoisted_2190
    ];
    function _sfc_render190(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue190.openBlock)(), (0, import_vue190.createElementBlock)("svg", _hoisted_1190, _hoisted_3189);
    }
    var phone_default = plugin_vue_export_helper_default(_sfc_main190, [["render", _sfc_render190], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/phone.vue"]]);
    var import_vue191 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main191 = {
      name: "PictureFilled"
    };
    var _hoisted_1191 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2191 = (0, import_vue191.createElementVNode)("path", {
      fill: "currentColor",
      d: "M96 896a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h832a32 32 0 0 1 32 32v704a32 32 0 0 1-32 32H96zm315.52-228.48-68.928-68.928a32 32 0 0 0-45.248 0L128 768.064h778.688l-242.112-290.56a32 32 0 0 0-49.216 0L458.752 665.408a32 32 0 0 1-47.232 2.112zM256 384a96 96 0 1 0 192.064-.064A96 96 0 0 0 256 384z"
    }, null, -1);
    var _hoisted_3190 = [
      _hoisted_2191
    ];
    function _sfc_render191(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue191.openBlock)(), (0, import_vue191.createElementBlock)("svg", _hoisted_1191, _hoisted_3190);
    }
    var picture_filled_default = plugin_vue_export_helper_default(_sfc_main191, [["render", _sfc_render191], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/picture-filled.vue"]]);
    var import_vue192 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main192 = {
      name: "PictureRounded"
    };
    var _hoisted_1192 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2192 = (0, import_vue192.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 128a384 384 0 1 0 0 768 384 384 0 0 0 0-768zm0-64a448 448 0 1 1 0 896 448 448 0 0 1 0-896z"
    }, null, -1);
    var _hoisted_3191 = (0, import_vue192.createElementVNode)("path", {
      fill: "currentColor",
      d: "M640 288q64 0 64 64t-64 64q-64 0-64-64t64-64zM214.656 790.656l-45.312-45.312 185.664-185.6a96 96 0 0 1 123.712-10.24l138.24 98.688a32 32 0 0 0 39.872-2.176L906.688 422.4l42.624 47.744L699.52 693.696a96 96 0 0 1-119.808 6.592l-138.24-98.752a32 32 0 0 0-41.152 3.456l-185.664 185.6z"
    }, null, -1);
    var _hoisted_456 = [
      _hoisted_2192,
      _hoisted_3191
    ];
    function _sfc_render192(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue192.openBlock)(), (0, import_vue192.createElementBlock)("svg", _hoisted_1192, _hoisted_456);
    }
    var picture_rounded_default = plugin_vue_export_helper_default(_sfc_main192, [["render", _sfc_render192], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/picture-rounded.vue"]]);
    var import_vue193 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main193 = {
      name: "Picture"
    };
    var _hoisted_1193 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2193 = (0, import_vue193.createElementVNode)("path", {
      fill: "currentColor",
      d: "M160 160v704h704V160H160zm-32-64h768a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H128a32 32 0 0 1-32-32V128a32 32 0 0 1 32-32z"
    }, null, -1);
    var _hoisted_3192 = (0, import_vue193.createElementVNode)("path", {
      fill: "currentColor",
      d: "M384 288q64 0 64 64t-64 64q-64 0-64-64t64-64zM185.408 876.992l-50.816-38.912L350.72 556.032a96 96 0 0 1 134.592-17.856l1.856 1.472 122.88 99.136a32 32 0 0 0 44.992-4.864l216-269.888 49.92 39.936-215.808 269.824-.256.32a96 96 0 0 1-135.04 14.464l-122.88-99.072-.64-.512a32 32 0 0 0-44.8 5.952L185.408 876.992z"
    }, null, -1);
    var _hoisted_457 = [
      _hoisted_2193,
      _hoisted_3192
    ];
    function _sfc_render193(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue193.openBlock)(), (0, import_vue193.createElementBlock)("svg", _hoisted_1193, _hoisted_457);
    }
    var picture_default = plugin_vue_export_helper_default(_sfc_main193, [["render", _sfc_render193], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/picture.vue"]]);
    var import_vue194 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main194 = {
      name: "PieChart"
    };
    var _hoisted_1194 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2194 = (0, import_vue194.createElementVNode)("path", {
      fill: "currentColor",
      d: "M448 68.48v64.832A384.128 384.128 0 0 0 512 896a384.128 384.128 0 0 0 378.688-320h64.768A448.128 448.128 0 0 1 64 512 448.128 448.128 0 0 1 448 68.48z"
    }, null, -1);
    var _hoisted_3193 = (0, import_vue194.createElementVNode)("path", {
      fill: "currentColor",
      d: "M576 97.28V448h350.72A384.064 384.064 0 0 0 576 97.28zM512 64V33.152A448 448 0 0 1 990.848 512H512V64z"
    }, null, -1);
    var _hoisted_458 = [
      _hoisted_2194,
      _hoisted_3193
    ];
    function _sfc_render194(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue194.openBlock)(), (0, import_vue194.createElementBlock)("svg", _hoisted_1194, _hoisted_458);
    }
    var pie_chart_default = plugin_vue_export_helper_default(_sfc_main194, [["render", _sfc_render194], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/pie-chart.vue"]]);
    var import_vue195 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main195 = {
      name: "Place"
    };
    var _hoisted_1195 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2195 = (0, import_vue195.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 512a192 192 0 1 0 0-384 192 192 0 0 0 0 384zm0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512z"
    }, null, -1);
    var _hoisted_3194 = (0, import_vue195.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 512a32 32 0 0 1 32 32v256a32 32 0 1 1-64 0V544a32 32 0 0 1 32-32z"
    }, null, -1);
    var _hoisted_459 = (0, import_vue195.createElementVNode)("path", {
      fill: "currentColor",
      d: "M384 649.088v64.96C269.76 732.352 192 771.904 192 800c0 37.696 139.904 96 320 96s320-58.304 320-96c0-28.16-77.76-67.648-192-85.952v-64.96C789.12 671.04 896 730.368 896 800c0 88.32-171.904 160-384 160s-384-71.68-384-160c0-69.696 106.88-128.96 256-150.912z"
    }, null, -1);
    var _hoisted_515 = [
      _hoisted_2195,
      _hoisted_3194,
      _hoisted_459
    ];
    function _sfc_render195(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue195.openBlock)(), (0, import_vue195.createElementBlock)("svg", _hoisted_1195, _hoisted_515);
    }
    var place_default = plugin_vue_export_helper_default(_sfc_main195, [["render", _sfc_render195], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/place.vue"]]);
    var import_vue196 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main196 = {
      name: "Platform"
    };
    var _hoisted_1196 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2196 = (0, import_vue196.createElementVNode)("path", {
      fill: "currentColor",
      d: "M448 832v-64h128v64h192v64H256v-64h192zM128 704V128h768v576H128z"
    }, null, -1);
    var _hoisted_3195 = [
      _hoisted_2196
    ];
    function _sfc_render196(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue196.openBlock)(), (0, import_vue196.createElementBlock)("svg", _hoisted_1196, _hoisted_3195);
    }
    var platform_default = plugin_vue_export_helper_default(_sfc_main196, [["render", _sfc_render196], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/platform.vue"]]);
    var import_vue197 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main197 = {
      name: "Plus"
    };
    var _hoisted_1197 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2197 = (0, import_vue197.createElementVNode)("path", {
      fill: "currentColor",
      d: "M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z"
    }, null, -1);
    var _hoisted_3196 = [
      _hoisted_2197
    ];
    function _sfc_render197(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue197.openBlock)(), (0, import_vue197.createElementBlock)("svg", _hoisted_1197, _hoisted_3196);
    }
    var plus_default = plugin_vue_export_helper_default(_sfc_main197, [["render", _sfc_render197], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/plus.vue"]]);
    var import_vue198 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main198 = {
      name: "Pointer"
    };
    var _hoisted_1198 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2198 = (0, import_vue198.createElementVNode)("path", {
      fill: "currentColor",
      d: "M511.552 128c-35.584 0-64.384 28.8-64.384 64.448v516.48L274.048 570.88a94.272 94.272 0 0 0-112.896-3.456 44.416 44.416 0 0 0-8.96 62.208L332.8 870.4A64 64 0 0 0 384 896h512V575.232a64 64 0 0 0-45.632-61.312l-205.952-61.76A96 96 0 0 1 576 360.192V192.448C576 156.8 547.2 128 511.552 128zM359.04 556.8l24.128 19.2V192.448a128.448 128.448 0 1 1 256.832 0v167.744a32 32 0 0 0 22.784 30.656l206.016 61.76A128 128 0 0 1 960 575.232V896a64 64 0 0 1-64 64H384a128 128 0 0 1-102.4-51.2L101.056 668.032A108.416 108.416 0 0 1 128 512.512a158.272 158.272 0 0 1 185.984 8.32L359.04 556.8z"
    }, null, -1);
    var _hoisted_3197 = [
      _hoisted_2198
    ];
    function _sfc_render198(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue198.openBlock)(), (0, import_vue198.createElementBlock)("svg", _hoisted_1198, _hoisted_3197);
    }
    var pointer_default = plugin_vue_export_helper_default(_sfc_main198, [["render", _sfc_render198], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/pointer.vue"]]);
    var import_vue199 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main199 = {
      name: "Position"
    };
    var _hoisted_1199 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2199 = (0, import_vue199.createElementVNode)("path", {
      fill: "currentColor",
      d: "m249.6 417.088 319.744 43.072 39.168 310.272L845.12 178.88 249.6 417.088zm-129.024 47.168a32 32 0 0 1-7.68-61.44l777.792-311.04a32 32 0 0 1 41.6 41.6l-310.336 775.68a32 32 0 0 1-61.44-7.808L512 516.992l-391.424-52.736z"
    }, null, -1);
    var _hoisted_3198 = [
      _hoisted_2199
    ];
    function _sfc_render199(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue199.openBlock)(), (0, import_vue199.createElementBlock)("svg", _hoisted_1199, _hoisted_3198);
    }
    var position_default = plugin_vue_export_helper_default(_sfc_main199, [["render", _sfc_render199], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/position.vue"]]);
    var import_vue200 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main200 = {
      name: "Postcard"
    };
    var _hoisted_1200 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2200 = (0, import_vue200.createElementVNode)("path", {
      fill: "currentColor",
      d: "M160 224a32 32 0 0 0-32 32v512a32 32 0 0 0 32 32h704a32 32 0 0 0 32-32V256a32 32 0 0 0-32-32H160zm0-64h704a96 96 0 0 1 96 96v512a96 96 0 0 1-96 96H160a96 96 0 0 1-96-96V256a96 96 0 0 1 96-96z"
    }, null, -1);
    var _hoisted_3199 = (0, import_vue200.createElementVNode)("path", {
      fill: "currentColor",
      d: "M704 320a64 64 0 1 1 0 128 64 64 0 0 1 0-128zM288 448h256q32 0 32 32t-32 32H288q-32 0-32-32t32-32zm0 128h256q32 0 32 32t-32 32H288q-32 0-32-32t32-32z"
    }, null, -1);
    var _hoisted_460 = [
      _hoisted_2200,
      _hoisted_3199
    ];
    function _sfc_render200(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue200.openBlock)(), (0, import_vue200.createElementBlock)("svg", _hoisted_1200, _hoisted_460);
    }
    var postcard_default = plugin_vue_export_helper_default(_sfc_main200, [["render", _sfc_render200], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/postcard.vue"]]);
    var import_vue201 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main201 = {
      name: "Pouring"
    };
    var _hoisted_1201 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2201 = (0, import_vue201.createElementVNode)("path", {
      fill: "currentColor",
      d: "m739.328 291.328-35.2-6.592-12.8-33.408a192.064 192.064 0 0 0-365.952 23.232l-9.92 40.896-41.472 7.04a176.32 176.32 0 0 0-146.24 173.568c0 97.28 78.72 175.936 175.808 175.936h400a192 192 0 0 0 35.776-380.672zM959.552 480a256 256 0 0 1-256 256h-400A239.808 239.808 0 0 1 63.744 496.192a240.32 240.32 0 0 1 199.488-236.8 256.128 256.128 0 0 1 487.872-30.976A256.064 256.064 0 0 1 959.552 480zM224 800a32 32 0 0 1 32 32v96a32 32 0 1 1-64 0v-96a32 32 0 0 1 32-32zm192 0a32 32 0 0 1 32 32v96a32 32 0 1 1-64 0v-96a32 32 0 0 1 32-32zm192 0a32 32 0 0 1 32 32v96a32 32 0 1 1-64 0v-96a32 32 0 0 1 32-32zm192 0a32 32 0 0 1 32 32v96a32 32 0 1 1-64 0v-96a32 32 0 0 1 32-32z"
    }, null, -1);
    var _hoisted_3200 = [
      _hoisted_2201
    ];
    function _sfc_render201(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue201.openBlock)(), (0, import_vue201.createElementBlock)("svg", _hoisted_1201, _hoisted_3200);
    }
    var pouring_default = plugin_vue_export_helper_default(_sfc_main201, [["render", _sfc_render201], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/pouring.vue"]]);
    var import_vue202 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main202 = {
      name: "Present"
    };
    var _hoisted_1202 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2202 = (0, import_vue202.createElementVNode)("path", {
      fill: "currentColor",
      d: "M480 896V640H192v-64h288V320H192v576h288zm64 0h288V320H544v256h288v64H544v256zM128 256h768v672a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V256z"
    }, null, -1);
    var _hoisted_3201 = (0, import_vue202.createElementVNode)("path", {
      fill: "currentColor",
      d: "M96 256h832q32 0 32 32t-32 32H96q-32 0-32-32t32-32z"
    }, null, -1);
    var _hoisted_461 = (0, import_vue202.createElementVNode)("path", {
      fill: "currentColor",
      d: "M416 256a64 64 0 1 0 0-128 64 64 0 0 0 0 128zm0 64a128 128 0 1 1 0-256 128 128 0 0 1 0 256z"
    }, null, -1);
    var _hoisted_516 = (0, import_vue202.createElementVNode)("path", {
      fill: "currentColor",
      d: "M608 256a64 64 0 1 0 0-128 64 64 0 0 0 0 128zm0 64a128 128 0 1 1 0-256 128 128 0 0 1 0 256z"
    }, null, -1);
    var _hoisted_6 = [
      _hoisted_2202,
      _hoisted_3201,
      _hoisted_461,
      _hoisted_516
    ];
    function _sfc_render202(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue202.openBlock)(), (0, import_vue202.createElementBlock)("svg", _hoisted_1202, _hoisted_6);
    }
    var present_default = plugin_vue_export_helper_default(_sfc_main202, [["render", _sfc_render202], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/present.vue"]]);
    var import_vue203 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main203 = {
      name: "PriceTag"
    };
    var _hoisted_1203 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2203 = (0, import_vue203.createElementVNode)("path", {
      fill: "currentColor",
      d: "M224 318.336V896h576V318.336L552.512 115.84a64 64 0 0 0-81.024 0L224 318.336zM593.024 66.304l259.2 212.096A32 32 0 0 1 864 303.168V928a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V303.168a32 32 0 0 1 11.712-24.768l259.2-212.096a128 128 0 0 1 162.112 0z"
    }, null, -1);
    var _hoisted_3202 = (0, import_vue203.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 448a64 64 0 1 0 0-128 64 64 0 0 0 0 128zm0 64a128 128 0 1 1 0-256 128 128 0 0 1 0 256z"
    }, null, -1);
    var _hoisted_462 = [
      _hoisted_2203,
      _hoisted_3202
    ];
    function _sfc_render203(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue203.openBlock)(), (0, import_vue203.createElementBlock)("svg", _hoisted_1203, _hoisted_462);
    }
    var price_tag_default = plugin_vue_export_helper_default(_sfc_main203, [["render", _sfc_render203], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/price-tag.vue"]]);
    var import_vue204 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main204 = {
      name: "Printer"
    };
    var _hoisted_1204 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2204 = (0, import_vue204.createElementVNode)("path", {
      fill: "currentColor",
      d: "M256 768H105.024c-14.272 0-19.456-1.472-24.64-4.288a29.056 29.056 0 0 1-12.16-12.096C65.536 746.432 64 741.248 64 727.04V379.072c0-42.816 4.48-58.304 12.8-73.984 8.384-15.616 20.672-27.904 36.288-36.288 15.68-8.32 31.168-12.8 73.984-12.8H256V64h512v192h68.928c42.816 0 58.304 4.48 73.984 12.8 15.616 8.384 27.904 20.672 36.288 36.288 8.32 15.68 12.8 31.168 12.8 73.984v347.904c0 14.272-1.472 19.456-4.288 24.64a29.056 29.056 0 0 1-12.096 12.16c-5.184 2.752-10.368 4.224-24.64 4.224H768v192H256V768zm64-192v320h384V576H320zm-64 128V512h512v192h128V379.072c0-29.376-1.408-36.48-5.248-43.776a23.296 23.296 0 0 0-10.048-10.048c-7.232-3.84-14.4-5.248-43.776-5.248H187.072c-29.376 0-36.48 1.408-43.776 5.248a23.296 23.296 0 0 0-10.048 10.048c-3.84 7.232-5.248 14.4-5.248 43.776V704h128zm64-448h384V128H320v128zm-64 128h64v64h-64v-64zm128 0h64v64h-64v-64z"
    }, null, -1);
    var _hoisted_3203 = [
      _hoisted_2204
    ];
    function _sfc_render204(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue204.openBlock)(), (0, import_vue204.createElementBlock)("svg", _hoisted_1204, _hoisted_3203);
    }
    var printer_default = plugin_vue_export_helper_default(_sfc_main204, [["render", _sfc_render204], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/printer.vue"]]);
    var import_vue205 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main205 = {
      name: "Promotion"
    };
    var _hoisted_1205 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2205 = (0, import_vue205.createElementVNode)("path", {
      fill: "currentColor",
      d: "m64 448 832-320-128 704-446.08-243.328L832 192 242.816 545.472 64 448zm256 512V657.024L512 768 320 960z"
    }, null, -1);
    var _hoisted_3204 = [
      _hoisted_2205
    ];
    function _sfc_render205(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue205.openBlock)(), (0, import_vue205.createElementBlock)("svg", _hoisted_1205, _hoisted_3204);
    }
    var promotion_default = plugin_vue_export_helper_default(_sfc_main205, [["render", _sfc_render205], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/promotion.vue"]]);
    var import_vue206 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main206 = {
      name: "QuestionFilled"
    };
    var _hoisted_1206 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2206 = (0, import_vue206.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm23.744 191.488c-52.096 0-92.928 14.784-123.2 44.352-30.976 29.568-45.76 70.4-45.76 122.496h80.256c0-29.568 5.632-52.8 17.6-68.992 13.376-19.712 35.2-28.864 66.176-28.864 23.936 0 42.944 6.336 56.32 19.712 12.672 13.376 19.712 31.68 19.712 54.912 0 17.6-6.336 34.496-19.008 49.984l-8.448 9.856c-45.76 40.832-73.216 70.4-82.368 89.408-9.856 19.008-14.08 42.24-14.08 68.992v9.856h80.96v-9.856c0-16.896 3.52-31.68 10.56-45.76 6.336-12.672 15.488-24.64 28.16-35.2 33.792-29.568 54.208-48.576 60.544-55.616 16.896-22.528 26.048-51.392 26.048-86.592 0-42.944-14.08-76.736-42.24-101.376-28.16-25.344-65.472-37.312-111.232-37.312zm-12.672 406.208a54.272 54.272 0 0 0-38.72 14.784 49.408 49.408 0 0 0-15.488 38.016c0 15.488 4.928 28.16 15.488 38.016A54.848 54.848 0 0 0 523.072 768c15.488 0 28.16-4.928 38.72-14.784a51.52 51.52 0 0 0 16.192-38.72 51.968 51.968 0 0 0-15.488-38.016 55.936 55.936 0 0 0-39.424-14.784z"
    }, null, -1);
    var _hoisted_3205 = [
      _hoisted_2206
    ];
    function _sfc_render206(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue206.openBlock)(), (0, import_vue206.createElementBlock)("svg", _hoisted_1206, _hoisted_3205);
    }
    var question_filled_default = plugin_vue_export_helper_default(_sfc_main206, [["render", _sfc_render206], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/question-filled.vue"]]);
    var import_vue207 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main207 = {
      name: "Rank"
    };
    var _hoisted_1207 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2207 = (0, import_vue207.createElementVNode)("path", {
      fill: "currentColor",
      d: "m186.496 544 41.408 41.344a32 32 0 1 1-45.248 45.312l-96-96a32 32 0 0 1 0-45.312l96-96a32 32 0 1 1 45.248 45.312L186.496 480h290.816V186.432l-41.472 41.472a32 32 0 1 1-45.248-45.184l96-96.128a32 32 0 0 1 45.312 0l96 96.064a32 32 0 0 1-45.248 45.184l-41.344-41.28V480H832l-41.344-41.344a32 32 0 0 1 45.248-45.312l96 96a32 32 0 0 1 0 45.312l-96 96a32 32 0 0 1-45.248-45.312L832 544H541.312v293.44l41.344-41.28a32 32 0 1 1 45.248 45.248l-96 96a32 32 0 0 1-45.312 0l-96-96a32 32 0 1 1 45.312-45.248l41.408 41.408V544H186.496z"
    }, null, -1);
    var _hoisted_3206 = [
      _hoisted_2207
    ];
    function _sfc_render207(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue207.openBlock)(), (0, import_vue207.createElementBlock)("svg", _hoisted_1207, _hoisted_3206);
    }
    var rank_default = plugin_vue_export_helper_default(_sfc_main207, [["render", _sfc_render207], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/rank.vue"]]);
    var import_vue208 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main208 = {
      name: "ReadingLamp"
    };
    var _hoisted_1208 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2208 = (0, import_vue208.createElementVNode)("path", {
      fill: "currentColor",
      d: "M352 896h320q32 0 32 32t-32 32H352q-32 0-32-32t32-32zm-44.672-768-99.52 448h608.384l-99.52-448H307.328zm-25.6-64h460.608a32 32 0 0 1 31.232 25.088l113.792 512A32 32 0 0 1 856.128 640H167.872a32 32 0 0 1-31.232-38.912l113.792-512A32 32 0 0 1 281.664 64z"
    }, null, -1);
    var _hoisted_3207 = (0, import_vue208.createElementVNode)("path", {
      fill: "currentColor",
      d: "M672 576q32 0 32 32v128q0 32-32 32t-32-32V608q0-32 32-32zm-192-.064h64V960h-64z"
    }, null, -1);
    var _hoisted_463 = [
      _hoisted_2208,
      _hoisted_3207
    ];
    function _sfc_render208(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue208.openBlock)(), (0, import_vue208.createElementBlock)("svg", _hoisted_1208, _hoisted_463);
    }
    var reading_lamp_default = plugin_vue_export_helper_default(_sfc_main208, [["render", _sfc_render208], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/reading-lamp.vue"]]);
    var import_vue209 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main209 = {
      name: "Reading"
    };
    var _hoisted_1209 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2209 = (0, import_vue209.createElementVNode)("path", {
      fill: "currentColor",
      d: "m512 863.36 384-54.848v-638.72L525.568 222.72a96 96 0 0 1-27.136 0L128 169.792v638.72l384 54.848zM137.024 106.432l370.432 52.928a32 32 0 0 0 9.088 0l370.432-52.928A64 64 0 0 1 960 169.792v638.72a64 64 0 0 1-54.976 63.36l-388.48 55.488a32 32 0 0 1-9.088 0l-388.48-55.488A64 64 0 0 1 64 808.512v-638.72a64 64 0 0 1 73.024-63.36z"
    }, null, -1);
    var _hoisted_3208 = (0, import_vue209.createElementVNode)("path", {
      fill: "currentColor",
      d: "M480 192h64v704h-64z"
    }, null, -1);
    var _hoisted_464 = [
      _hoisted_2209,
      _hoisted_3208
    ];
    function _sfc_render209(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue209.openBlock)(), (0, import_vue209.createElementBlock)("svg", _hoisted_1209, _hoisted_464);
    }
    var reading_default = plugin_vue_export_helper_default(_sfc_main209, [["render", _sfc_render209], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/reading.vue"]]);
    var import_vue210 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main210 = {
      name: "RefreshLeft"
    };
    var _hoisted_1210 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2210 = (0, import_vue210.createElementVNode)("path", {
      fill: "currentColor",
      d: "M289.088 296.704h92.992a32 32 0 0 1 0 64H232.96a32 32 0 0 1-32-32V179.712a32 32 0 0 1 64 0v50.56a384 384 0 0 1 643.84 282.88 384 384 0 0 1-383.936 384 384 384 0 0 1-384-384h64a320 320 0 1 0 640 0 320 320 0 0 0-555.712-216.448z"
    }, null, -1);
    var _hoisted_3209 = [
      _hoisted_2210
    ];
    function _sfc_render210(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue210.openBlock)(), (0, import_vue210.createElementBlock)("svg", _hoisted_1210, _hoisted_3209);
    }
    var refresh_left_default = plugin_vue_export_helper_default(_sfc_main210, [["render", _sfc_render210], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/refresh-left.vue"]]);
    var import_vue211 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main211 = {
      name: "RefreshRight"
    };
    var _hoisted_1211 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2211 = (0, import_vue211.createElementVNode)("path", {
      fill: "currentColor",
      d: "M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88z"
    }, null, -1);
    var _hoisted_3210 = [
      _hoisted_2211
    ];
    function _sfc_render211(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue211.openBlock)(), (0, import_vue211.createElementBlock)("svg", _hoisted_1211, _hoisted_3210);
    }
    var refresh_right_default = plugin_vue_export_helper_default(_sfc_main211, [["render", _sfc_render211], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/refresh-right.vue"]]);
    var import_vue212 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main212 = {
      name: "Refresh"
    };
    var _hoisted_1212 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2212 = (0, import_vue212.createElementVNode)("path", {
      fill: "currentColor",
      d: "M771.776 794.88A384 384 0 0 1 128 512h64a320 320 0 0 0 555.712 216.448H654.72a32 32 0 1 1 0-64h149.056a32 32 0 0 1 32 32v148.928a32 32 0 1 1-64 0v-50.56zM276.288 295.616h92.992a32 32 0 0 1 0 64H220.16a32 32 0 0 1-32-32V178.56a32 32 0 0 1 64 0v50.56A384 384 0 0 1 896.128 512h-64a320 320 0 0 0-555.776-216.384z"
    }, null, -1);
    var _hoisted_3211 = [
      _hoisted_2212
    ];
    function _sfc_render212(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue212.openBlock)(), (0, import_vue212.createElementBlock)("svg", _hoisted_1212, _hoisted_3211);
    }
    var refresh_default = plugin_vue_export_helper_default(_sfc_main212, [["render", _sfc_render212], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/refresh.vue"]]);
    var import_vue213 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main213 = {
      name: "Refrigerator"
    };
    var _hoisted_1213 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2213 = (0, import_vue213.createElementVNode)("path", {
      fill: "currentColor",
      d: "M256 448h512V160a32 32 0 0 0-32-32H288a32 32 0 0 0-32 32v288zm0 64v352a32 32 0 0 0 32 32h448a32 32 0 0 0 32-32V512H256zm32-448h448a96 96 0 0 1 96 96v704a96 96 0 0 1-96 96H288a96 96 0 0 1-96-96V160a96 96 0 0 1 96-96zm32 224h64v96h-64v-96zm0 288h64v96h-64v-96z"
    }, null, -1);
    var _hoisted_3212 = [
      _hoisted_2213
    ];
    function _sfc_render213(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue213.openBlock)(), (0, import_vue213.createElementBlock)("svg", _hoisted_1213, _hoisted_3212);
    }
    var refrigerator_default = plugin_vue_export_helper_default(_sfc_main213, [["render", _sfc_render213], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/refrigerator.vue"]]);
    var import_vue214 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main214 = {
      name: "RemoveFilled"
    };
    var _hoisted_1214 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2214 = (0, import_vue214.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zM288 512a38.4 38.4 0 0 0 38.4 38.4h371.2a38.4 38.4 0 0 0 0-76.8H326.4A38.4 38.4 0 0 0 288 512z"
    }, null, -1);
    var _hoisted_3213 = [
      _hoisted_2214
    ];
    function _sfc_render214(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue214.openBlock)(), (0, import_vue214.createElementBlock)("svg", _hoisted_1214, _hoisted_3213);
    }
    var remove_filled_default = plugin_vue_export_helper_default(_sfc_main214, [["render", _sfc_render214], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/remove-filled.vue"]]);
    var import_vue215 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main215 = {
      name: "Remove"
    };
    var _hoisted_1215 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2215 = (0, import_vue215.createElementVNode)("path", {
      fill: "currentColor",
      d: "M352 480h320a32 32 0 1 1 0 64H352a32 32 0 0 1 0-64z"
    }, null, -1);
    var _hoisted_3214 = (0, import_vue215.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
    }, null, -1);
    var _hoisted_465 = [
      _hoisted_2215,
      _hoisted_3214
    ];
    function _sfc_render215(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue215.openBlock)(), (0, import_vue215.createElementBlock)("svg", _hoisted_1215, _hoisted_465);
    }
    var remove_default = plugin_vue_export_helper_default(_sfc_main215, [["render", _sfc_render215], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/remove.vue"]]);
    var import_vue216 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main216 = {
      name: "Right"
    };
    var _hoisted_1216 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2216 = (0, import_vue216.createElementVNode)("path", {
      fill: "currentColor",
      d: "M754.752 480H160a32 32 0 1 0 0 64h594.752L521.344 777.344a32 32 0 0 0 45.312 45.312l288-288a32 32 0 0 0 0-45.312l-288-288a32 32 0 1 0-45.312 45.312L754.752 480z"
    }, null, -1);
    var _hoisted_3215 = [
      _hoisted_2216
    ];
    function _sfc_render216(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue216.openBlock)(), (0, import_vue216.createElementBlock)("svg", _hoisted_1216, _hoisted_3215);
    }
    var right_default = plugin_vue_export_helper_default(_sfc_main216, [["render", _sfc_render216], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/right.vue"]]);
    var import_vue217 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main217 = {
      name: "ScaleToOriginal"
    };
    var _hoisted_1217 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2217 = (0, import_vue217.createElementVNode)("path", {
      fill: "currentColor",
      d: "M813.176 180.706a60.235 60.235 0 0 1 60.236 60.235v481.883a60.235 60.235 0 0 1-60.236 60.235H210.824a60.235 60.235 0 0 1-60.236-60.235V240.94a60.235 60.235 0 0 1 60.236-60.235h602.352zm0-60.235H210.824A120.47 120.47 0 0 0 90.353 240.94v481.883a120.47 120.47 0 0 0 120.47 120.47h602.353a120.47 120.47 0 0 0 120.471-120.47V240.94a120.47 120.47 0 0 0-120.47-120.47zm-120.47 180.705a30.118 30.118 0 0 0-30.118 30.118v301.177a30.118 30.118 0 0 0 60.236 0V331.294a30.118 30.118 0 0 0-30.118-30.118zm-361.412 0a30.118 30.118 0 0 0-30.118 30.118v301.177a30.118 30.118 0 1 0 60.236 0V331.294a30.118 30.118 0 0 0-30.118-30.118zM512 361.412a30.118 30.118 0 0 0-30.118 30.117v30.118a30.118 30.118 0 0 0 60.236 0V391.53A30.118 30.118 0 0 0 512 361.412zM512 512a30.118 30.118 0 0 0-30.118 30.118v30.117a30.118 30.118 0 0 0 60.236 0v-30.117A30.118 30.118 0 0 0 512 512z"
    }, null, -1);
    var _hoisted_3216 = [
      _hoisted_2217
    ];
    function _sfc_render217(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue217.openBlock)(), (0, import_vue217.createElementBlock)("svg", _hoisted_1217, _hoisted_3216);
    }
    var scale_to_original_default = plugin_vue_export_helper_default(_sfc_main217, [["render", _sfc_render217], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/scale-to-original.vue"]]);
    var import_vue218 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main218 = {
      name: "School"
    };
    var _hoisted_1218 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2218 = (0, import_vue218.createElementVNode)("path", {
      fill: "currentColor",
      d: "M224 128v704h576V128H224zm-32-64h640a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32z"
    }, null, -1);
    var _hoisted_3217 = (0, import_vue218.createElementVNode)("path", {
      fill: "currentColor",
      d: "M64 832h896v64H64zm256-640h128v96H320z"
    }, null, -1);
    var _hoisted_466 = (0, import_vue218.createElementVNode)("path", {
      fill: "currentColor",
      d: "M384 832h256v-64a128 128 0 1 0-256 0v64zm128-256a192 192 0 0 1 192 192v128H320V768a192 192 0 0 1 192-192zM320 384h128v96H320zm256-192h128v96H576zm0 192h128v96H576z"
    }, null, -1);
    var _hoisted_517 = [
      _hoisted_2218,
      _hoisted_3217,
      _hoisted_466
    ];
    function _sfc_render218(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue218.openBlock)(), (0, import_vue218.createElementBlock)("svg", _hoisted_1218, _hoisted_517);
    }
    var school_default = plugin_vue_export_helper_default(_sfc_main218, [["render", _sfc_render218], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/school.vue"]]);
    var import_vue219 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main219 = {
      name: "Scissor"
    };
    var _hoisted_1219 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2219 = (0, import_vue219.createElementVNode)("path", {
      fill: "currentColor",
      d: "m512.064 578.368-106.88 152.768a160 160 0 1 1-23.36-78.208L472.96 522.56 196.864 128.256a32 32 0 1 1 52.48-36.736l393.024 561.344a160 160 0 1 1-23.36 78.208l-106.88-152.704zm54.4-189.248 208.384-297.6a32 32 0 0 1 52.48 36.736l-221.76 316.672-39.04-55.808zm-376.32 425.856a96 96 0 1 0 110.144-157.248 96 96 0 0 0-110.08 157.248zm643.84 0a96 96 0 1 0-110.08-157.248 96 96 0 0 0 110.08 157.248z"
    }, null, -1);
    var _hoisted_3218 = [
      _hoisted_2219
    ];
    function _sfc_render219(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue219.openBlock)(), (0, import_vue219.createElementBlock)("svg", _hoisted_1219, _hoisted_3218);
    }
    var scissor_default = plugin_vue_export_helper_default(_sfc_main219, [["render", _sfc_render219], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/scissor.vue"]]);
    var import_vue220 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main220 = {
      name: "Search"
    };
    var _hoisted_1220 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2220 = (0, import_vue220.createElementVNode)("path", {
      fill: "currentColor",
      d: "m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704z"
    }, null, -1);
    var _hoisted_3219 = [
      _hoisted_2220
    ];
    function _sfc_render220(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue220.openBlock)(), (0, import_vue220.createElementBlock)("svg", _hoisted_1220, _hoisted_3219);
    }
    var search_default = plugin_vue_export_helper_default(_sfc_main220, [["render", _sfc_render220], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/search.vue"]]);
    var import_vue221 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main221 = {
      name: "Select"
    };
    var _hoisted_1221 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2221 = (0, import_vue221.createElementVNode)("path", {
      fill: "currentColor",
      d: "M77.248 415.04a64 64 0 0 1 90.496 0l226.304 226.304L846.528 188.8a64 64 0 1 1 90.56 90.496l-543.04 543.04-316.8-316.8a64 64 0 0 1 0-90.496z"
    }, null, -1);
    var _hoisted_3220 = [
      _hoisted_2221
    ];
    function _sfc_render221(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue221.openBlock)(), (0, import_vue221.createElementBlock)("svg", _hoisted_1221, _hoisted_3220);
    }
    var select_default = plugin_vue_export_helper_default(_sfc_main221, [["render", _sfc_render221], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/select.vue"]]);
    var import_vue222 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main222 = {
      name: "Sell"
    };
    var _hoisted_1222 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2222 = (0, import_vue222.createElementVNode)("path", {
      fill: "currentColor",
      d: "M704 288h131.072a32 32 0 0 1 31.808 28.8L886.4 512h-64.384l-16-160H704v96a32 32 0 1 1-64 0v-96H384v96a32 32 0 0 1-64 0v-96H217.92l-51.2 512H512v64H131.328a32 32 0 0 1-31.808-35.2l57.6-576a32 32 0 0 1 31.808-28.8H320v-22.336C320 154.688 405.504 64 512 64s192 90.688 192 201.664v22.4zm-64 0v-22.336C640 189.248 582.272 128 512 128c-70.272 0-128 61.248-128 137.664v22.4h256zm201.408 483.84L768 698.496V928a32 32 0 1 1-64 0V698.496l-73.344 73.344a32 32 0 1 1-45.248-45.248l128-128a32 32 0 0 1 45.248 0l128 128a32 32 0 1 1-45.248 45.248z"
    }, null, -1);
    var _hoisted_3221 = [
      _hoisted_2222
    ];
    function _sfc_render222(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue222.openBlock)(), (0, import_vue222.createElementBlock)("svg", _hoisted_1222, _hoisted_3221);
    }
    var sell_default = plugin_vue_export_helper_default(_sfc_main222, [["render", _sfc_render222], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/sell.vue"]]);
    var import_vue223 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main223 = {
      name: "SemiSelect"
    };
    var _hoisted_1223 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2223 = (0, import_vue223.createElementVNode)("path", {
      fill: "currentColor",
      d: "M128 448h768q64 0 64 64t-64 64H128q-64 0-64-64t64-64z"
    }, null, -1);
    var _hoisted_3222 = [
      _hoisted_2223
    ];
    function _sfc_render223(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue223.openBlock)(), (0, import_vue223.createElementBlock)("svg", _hoisted_1223, _hoisted_3222);
    }
    var semi_select_default = plugin_vue_export_helper_default(_sfc_main223, [["render", _sfc_render223], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/semi-select.vue"]]);
    var import_vue224 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main224 = {
      name: "Service"
    };
    var _hoisted_1224 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2224 = (0, import_vue224.createElementVNode)("path", {
      fill: "currentColor",
      d: "M864 409.6a192 192 0 0 1-37.888 349.44A256.064 256.064 0 0 1 576 960h-96a32 32 0 1 1 0-64h96a192.064 192.064 0 0 0 181.12-128H736a32 32 0 0 1-32-32V416a32 32 0 0 1 32-32h32c10.368 0 20.544.832 30.528 2.432a288 288 0 0 0-573.056 0A193.235 193.235 0 0 1 256 384h32a32 32 0 0 1 32 32v320a32 32 0 0 1-32 32h-32a192 192 0 0 1-96-358.4 352 352 0 0 1 704 0zM256 448a128 128 0 1 0 0 256V448zm640 128a128 128 0 0 0-128-128v256a128 128 0 0 0 128-128z"
    }, null, -1);
    var _hoisted_3223 = [
      _hoisted_2224
    ];
    function _sfc_render224(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue224.openBlock)(), (0, import_vue224.createElementBlock)("svg", _hoisted_1224, _hoisted_3223);
    }
    var service_default = plugin_vue_export_helper_default(_sfc_main224, [["render", _sfc_render224], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/service.vue"]]);
    var import_vue225 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main225 = {
      name: "SetUp"
    };
    var _hoisted_1225 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2225 = (0, import_vue225.createElementVNode)("path", {
      fill: "currentColor",
      d: "M224 160a64 64 0 0 0-64 64v576a64 64 0 0 0 64 64h576a64 64 0 0 0 64-64V224a64 64 0 0 0-64-64H224zm0-64h576a128 128 0 0 1 128 128v576a128 128 0 0 1-128 128H224A128 128 0 0 1 96 800V224A128 128 0 0 1 224 96z"
    }, null, -1);
    var _hoisted_3224 = (0, import_vue225.createElementVNode)("path", {
      fill: "currentColor",
      d: "M384 416a64 64 0 1 0 0-128 64 64 0 0 0 0 128zm0 64a128 128 0 1 1 0-256 128 128 0 0 1 0 256z"
    }, null, -1);
    var _hoisted_467 = (0, import_vue225.createElementVNode)("path", {
      fill: "currentColor",
      d: "M480 320h256q32 0 32 32t-32 32H480q-32 0-32-32t32-32zm160 416a64 64 0 1 0 0-128 64 64 0 0 0 0 128zm0 64a128 128 0 1 1 0-256 128 128 0 0 1 0 256z"
    }, null, -1);
    var _hoisted_518 = (0, import_vue225.createElementVNode)("path", {
      fill: "currentColor",
      d: "M288 640h256q32 0 32 32t-32 32H288q-32 0-32-32t32-32z"
    }, null, -1);
    var _hoisted_62 = [
      _hoisted_2225,
      _hoisted_3224,
      _hoisted_467,
      _hoisted_518
    ];
    function _sfc_render225(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue225.openBlock)(), (0, import_vue225.createElementBlock)("svg", _hoisted_1225, _hoisted_62);
    }
    var set_up_default = plugin_vue_export_helper_default(_sfc_main225, [["render", _sfc_render225], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/set-up.vue"]]);
    var import_vue226 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main226 = {
      name: "Setting"
    };
    var _hoisted_1226 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2226 = (0, import_vue226.createElementVNode)("path", {
      fill: "currentColor",
      d: "M600.704 64a32 32 0 0 1 30.464 22.208l35.2 109.376c14.784 7.232 28.928 15.36 42.432 24.512l112.384-24.192a32 32 0 0 1 34.432 15.36L944.32 364.8a32 32 0 0 1-4.032 37.504l-77.12 85.12a357.12 357.12 0 0 1 0 49.024l77.12 85.248a32 32 0 0 1 4.032 37.504l-88.704 153.6a32 32 0 0 1-34.432 15.296L708.8 803.904c-13.44 9.088-27.648 17.28-42.368 24.512l-35.264 109.376A32 32 0 0 1 600.704 960H423.296a32 32 0 0 1-30.464-22.208L357.696 828.48a351.616 351.616 0 0 1-42.56-24.64l-112.32 24.256a32 32 0 0 1-34.432-15.36L79.68 659.2a32 32 0 0 1 4.032-37.504l77.12-85.248a357.12 357.12 0 0 1 0-48.896l-77.12-85.248A32 32 0 0 1 79.68 364.8l88.704-153.6a32 32 0 0 1 34.432-15.296l112.32 24.256c13.568-9.152 27.776-17.408 42.56-24.64l35.2-109.312A32 32 0 0 1 423.232 64H600.64zm-23.424 64H446.72l-36.352 113.088-24.512 11.968a294.113 294.113 0 0 0-34.816 20.096l-22.656 15.36-116.224-25.088-65.28 113.152 79.68 88.192-1.92 27.136a293.12 293.12 0 0 0 0 40.192l1.92 27.136-79.808 88.192 65.344 113.152 116.224-25.024 22.656 15.296a294.113 294.113 0 0 0 34.816 20.096l24.512 11.968L446.72 896h130.688l36.48-113.152 24.448-11.904a288.282 288.282 0 0 0 34.752-20.096l22.592-15.296 116.288 25.024 65.28-113.152-79.744-88.192 1.92-27.136a293.12 293.12 0 0 0 0-40.256l-1.92-27.136 79.808-88.128-65.344-113.152-116.288 24.96-22.592-15.232a287.616 287.616 0 0 0-34.752-20.096l-24.448-11.904L577.344 128zM512 320a192 192 0 1 1 0 384 192 192 0 0 1 0-384zm0 64a128 128 0 1 0 0 256 128 128 0 0 0 0-256z"
    }, null, -1);
    var _hoisted_3225 = [
      _hoisted_2226
    ];
    function _sfc_render226(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue226.openBlock)(), (0, import_vue226.createElementBlock)("svg", _hoisted_1226, _hoisted_3225);
    }
    var setting_default = plugin_vue_export_helper_default(_sfc_main226, [["render", _sfc_render226], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/setting.vue"]]);
    var import_vue227 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main227 = {
      name: "Share"
    };
    var _hoisted_1227 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2227 = (0, import_vue227.createElementVNode)("path", {
      fill: "currentColor",
      d: "m679.872 348.8-301.76 188.608a127.808 127.808 0 0 1 5.12 52.16l279.936 104.96a128 128 0 1 1-22.464 59.904l-279.872-104.96a128 128 0 1 1-16.64-166.272l301.696-188.608a128 128 0 1 1 33.92 54.272z"
    }, null, -1);
    var _hoisted_3226 = [
      _hoisted_2227
    ];
    function _sfc_render227(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue227.openBlock)(), (0, import_vue227.createElementBlock)("svg", _hoisted_1227, _hoisted_3226);
    }
    var share_default = plugin_vue_export_helper_default(_sfc_main227, [["render", _sfc_render227], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/share.vue"]]);
    var import_vue228 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main228 = {
      name: "Ship"
    };
    var _hoisted_1228 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2228 = (0, import_vue228.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 386.88V448h405.568a32 32 0 0 1 30.72 40.768l-76.48 267.968A192 192 0 0 1 687.168 896H336.832a192 192 0 0 1-184.64-139.264L75.648 488.768A32 32 0 0 1 106.368 448H448V117.888a32 32 0 0 1 47.36-28.096l13.888 7.616L512 96v2.88l231.68 126.4a32 32 0 0 1-2.048 57.216L512 386.88zm0-70.272 144.768-65.792L512 171.84v144.768zM512 512H148.864l18.24 64H856.96l18.24-64H512zM185.408 640l28.352 99.2A128 128 0 0 0 336.832 832h350.336a128 128 0 0 0 123.072-92.8l28.352-99.2H185.408z"
    }, null, -1);
    var _hoisted_3227 = [
      _hoisted_2228
    ];
    function _sfc_render228(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue228.openBlock)(), (0, import_vue228.createElementBlock)("svg", _hoisted_1228, _hoisted_3227);
    }
    var ship_default = plugin_vue_export_helper_default(_sfc_main228, [["render", _sfc_render228], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/ship.vue"]]);
    var import_vue229 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main229 = {
      name: "Shop"
    };
    var _hoisted_1229 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2229 = (0, import_vue229.createElementVNode)("path", {
      fill: "currentColor",
      d: "M704 704h64v192H256V704h64v64h384v-64zm188.544-152.192C894.528 559.616 896 567.616 896 576a96 96 0 1 1-192 0 96 96 0 1 1-192 0 96 96 0 1 1-192 0 96 96 0 1 1-192 0c0-8.384 1.408-16.384 3.392-24.192L192 128h640l60.544 423.808z"
    }, null, -1);
    var _hoisted_3228 = [
      _hoisted_2229
    ];
    function _sfc_render229(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue229.openBlock)(), (0, import_vue229.createElementBlock)("svg", _hoisted_1229, _hoisted_3228);
    }
    var shop_default = plugin_vue_export_helper_default(_sfc_main229, [["render", _sfc_render229], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/shop.vue"]]);
    var import_vue230 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main230 = {
      name: "ShoppingBag"
    };
    var _hoisted_1230 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2230 = (0, import_vue230.createElementVNode)("path", {
      fill: "currentColor",
      d: "M704 320v96a32 32 0 0 1-32 32h-32V320H384v128h-32a32 32 0 0 1-32-32v-96H192v576h640V320H704zm-384-64a192 192 0 1 1 384 0h160a32 32 0 0 1 32 32v640a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V288a32 32 0 0 1 32-32h160zm64 0h256a128 128 0 1 0-256 0z"
    }, null, -1);
    var _hoisted_3229 = (0, import_vue230.createElementVNode)("path", {
      fill: "currentColor",
      d: "M192 704h640v64H192z"
    }, null, -1);
    var _hoisted_468 = [
      _hoisted_2230,
      _hoisted_3229
    ];
    function _sfc_render230(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue230.openBlock)(), (0, import_vue230.createElementBlock)("svg", _hoisted_1230, _hoisted_468);
    }
    var shopping_bag_default = plugin_vue_export_helper_default(_sfc_main230, [["render", _sfc_render230], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/shopping-bag.vue"]]);
    var import_vue231 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main231 = {
      name: "ShoppingCartFull"
    };
    var _hoisted_1231 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2231 = (0, import_vue231.createElementVNode)("path", {
      fill: "currentColor",
      d: "M432 928a48 48 0 1 1 0-96 48 48 0 0 1 0 96zm320 0a48 48 0 1 1 0-96 48 48 0 0 1 0 96zM96 128a32 32 0 0 1 0-64h160a32 32 0 0 1 31.36 25.728L320.64 256H928a32 32 0 0 1 31.296 38.72l-96 448A32 32 0 0 1 832 768H384a32 32 0 0 1-31.36-25.728L229.76 128H96zm314.24 576h395.904l82.304-384H333.44l76.8 384z"
    }, null, -1);
    var _hoisted_3230 = (0, import_vue231.createElementVNode)("path", {
      fill: "currentColor",
      d: "M699.648 256 608 145.984 516.352 256h183.296zm-140.8-151.04a64 64 0 0 1 98.304 0L836.352 320H379.648l179.2-215.04z"
    }, null, -1);
    var _hoisted_469 = [
      _hoisted_2231,
      _hoisted_3230
    ];
    function _sfc_render231(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue231.openBlock)(), (0, import_vue231.createElementBlock)("svg", _hoisted_1231, _hoisted_469);
    }
    var shopping_cart_full_default = plugin_vue_export_helper_default(_sfc_main231, [["render", _sfc_render231], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/shopping-cart-full.vue"]]);
    var import_vue232 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main232 = {
      name: "ShoppingCart"
    };
    var _hoisted_1232 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2232 = (0, import_vue232.createElementVNode)("path", {
      fill: "currentColor",
      d: "M432 928a48 48 0 1 1 0-96 48 48 0 0 1 0 96zm320 0a48 48 0 1 1 0-96 48 48 0 0 1 0 96zM96 128a32 32 0 0 1 0-64h160a32 32 0 0 1 31.36 25.728L320.64 256H928a32 32 0 0 1 31.296 38.72l-96 448A32 32 0 0 1 832 768H384a32 32 0 0 1-31.36-25.728L229.76 128H96zm314.24 576h395.904l82.304-384H333.44l76.8 384z"
    }, null, -1);
    var _hoisted_3231 = [
      _hoisted_2232
    ];
    function _sfc_render232(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue232.openBlock)(), (0, import_vue232.createElementBlock)("svg", _hoisted_1232, _hoisted_3231);
    }
    var shopping_cart_default = plugin_vue_export_helper_default(_sfc_main232, [["render", _sfc_render232], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/shopping-cart.vue"]]);
    var import_vue233 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main233 = {
      name: "Smoking"
    };
    var _hoisted_1233 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2233 = (0, import_vue233.createElementVNode)("path", {
      fill: "currentColor",
      d: "M256 576v128h640V576H256zm-32-64h704a32 32 0 0 1 32 32v192a32 32 0 0 1-32 32H224a32 32 0 0 1-32-32V544a32 32 0 0 1 32-32z"
    }, null, -1);
    var _hoisted_3232 = (0, import_vue233.createElementVNode)("path", {
      fill: "currentColor",
      d: "M704 576h64v128h-64zM256 64h64v320h-64zM128 192h64v192h-64zM64 512h64v256H64z"
    }, null, -1);
    var _hoisted_470 = [
      _hoisted_2233,
      _hoisted_3232
    ];
    function _sfc_render233(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue233.openBlock)(), (0, import_vue233.createElementBlock)("svg", _hoisted_1233, _hoisted_470);
    }
    var smoking_default = plugin_vue_export_helper_default(_sfc_main233, [["render", _sfc_render233], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/smoking.vue"]]);
    var import_vue234 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main234 = {
      name: "Soccer"
    };
    var _hoisted_1234 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2234 = (0, import_vue234.createElementVNode)("path", {
      fill: "currentColor",
      d: "M418.496 871.04 152.256 604.8c-16.512 94.016-2.368 178.624 42.944 224 44.928 44.928 129.344 58.752 223.296 42.24zm72.32-18.176a573.056 573.056 0 0 0 224.832-137.216 573.12 573.12 0 0 0 137.216-224.832L533.888 171.84a578.56 578.56 0 0 0-227.52 138.496A567.68 567.68 0 0 0 170.432 532.48l320.384 320.384zM871.04 418.496c16.512-93.952 2.688-178.368-42.24-223.296-44.544-44.544-128.704-58.048-222.592-41.536L871.04 418.496zM149.952 874.048c-112.96-112.96-88.832-408.96 111.168-608.96C461.056 65.152 760.96 36.928 874.048 149.952c113.024 113.024 86.784 411.008-113.152 610.944-199.936 199.936-497.92 226.112-610.944 113.152zm452.544-497.792 22.656-22.656a32 32 0 0 1 45.248 45.248l-22.656 22.656 45.248 45.248A32 32 0 1 1 647.744 512l-45.248-45.248L557.248 512l45.248 45.248a32 32 0 1 1-45.248 45.248L512 557.248l-45.248 45.248L512 647.744a32 32 0 1 1-45.248 45.248l-45.248-45.248-22.656 22.656a32 32 0 1 1-45.248-45.248l22.656-22.656-45.248-45.248A32 32 0 1 1 376.256 512l45.248 45.248L466.752 512l-45.248-45.248a32 32 0 1 1 45.248-45.248L512 466.752l45.248-45.248L512 376.256a32 32 0 0 1 45.248-45.248l45.248 45.248z"
    }, null, -1);
    var _hoisted_3233 = [
      _hoisted_2234
    ];
    function _sfc_render234(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue234.openBlock)(), (0, import_vue234.createElementBlock)("svg", _hoisted_1234, _hoisted_3233);
    }
    var soccer_default = plugin_vue_export_helper_default(_sfc_main234, [["render", _sfc_render234], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/soccer.vue"]]);
    var import_vue235 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main235 = {
      name: "SoldOut"
    };
    var _hoisted_1235 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2235 = (0, import_vue235.createElementVNode)("path", {
      fill: "currentColor",
      d: "M704 288h131.072a32 32 0 0 1 31.808 28.8L886.4 512h-64.384l-16-160H704v96a32 32 0 1 1-64 0v-96H384v96a32 32 0 0 1-64 0v-96H217.92l-51.2 512H512v64H131.328a32 32 0 0 1-31.808-35.2l57.6-576a32 32 0 0 1 31.808-28.8H320v-22.336C320 154.688 405.504 64 512 64s192 90.688 192 201.664v22.4zm-64 0v-22.336C640 189.248 582.272 128 512 128c-70.272 0-128 61.248-128 137.664v22.4h256zm201.408 476.16a32 32 0 1 1 45.248 45.184l-128 128a32 32 0 0 1-45.248 0l-128-128a32 32 0 1 1 45.248-45.248L704 837.504V608a32 32 0 1 1 64 0v229.504l73.408-73.408z"
    }, null, -1);
    var _hoisted_3234 = [
      _hoisted_2235
    ];
    function _sfc_render235(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue235.openBlock)(), (0, import_vue235.createElementBlock)("svg", _hoisted_1235, _hoisted_3234);
    }
    var sold_out_default = plugin_vue_export_helper_default(_sfc_main235, [["render", _sfc_render235], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/sold-out.vue"]]);
    var import_vue236 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main236 = {
      name: "SortDown"
    };
    var _hoisted_1236 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2236 = (0, import_vue236.createElementVNode)("path", {
      fill: "currentColor",
      d: "M576 96v709.568L333.312 562.816A32 32 0 1 0 288 608l297.408 297.344A32 32 0 0 0 640 882.688V96a32 32 0 0 0-64 0z"
    }, null, -1);
    var _hoisted_3235 = [
      _hoisted_2236
    ];
    function _sfc_render236(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue236.openBlock)(), (0, import_vue236.createElementBlock)("svg", _hoisted_1236, _hoisted_3235);
    }
    var sort_down_default = plugin_vue_export_helper_default(_sfc_main236, [["render", _sfc_render236], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/sort-down.vue"]]);
    var import_vue237 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main237 = {
      name: "SortUp"
    };
    var _hoisted_1237 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2237 = (0, import_vue237.createElementVNode)("path", {
      fill: "currentColor",
      d: "M384 141.248V928a32 32 0 1 0 64 0V218.56l242.688 242.688A32 32 0 1 0 736 416L438.592 118.656A32 32 0 0 0 384 141.248z"
    }, null, -1);
    var _hoisted_3236 = [
      _hoisted_2237
    ];
    function _sfc_render237(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue237.openBlock)(), (0, import_vue237.createElementBlock)("svg", _hoisted_1237, _hoisted_3236);
    }
    var sort_up_default = plugin_vue_export_helper_default(_sfc_main237, [["render", _sfc_render237], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/sort-up.vue"]]);
    var import_vue238 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main238 = {
      name: "Sort"
    };
    var _hoisted_1238 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2238 = (0, import_vue238.createElementVNode)("path", {
      fill: "currentColor",
      d: "M384 96a32 32 0 0 1 64 0v786.752a32 32 0 0 1-54.592 22.656L95.936 608a32 32 0 0 1 0-45.312h.128a32 32 0 0 1 45.184 0L384 805.632V96zm192 45.248a32 32 0 0 1 54.592-22.592L928.064 416a32 32 0 0 1 0 45.312h-.128a32 32 0 0 1-45.184 0L640 218.496V928a32 32 0 1 1-64 0V141.248z"
    }, null, -1);
    var _hoisted_3237 = [
      _hoisted_2238
    ];
    function _sfc_render238(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue238.openBlock)(), (0, import_vue238.createElementBlock)("svg", _hoisted_1238, _hoisted_3237);
    }
    var sort_default = plugin_vue_export_helper_default(_sfc_main238, [["render", _sfc_render238], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/sort.vue"]]);
    var import_vue239 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main239 = {
      name: "Stamp"
    };
    var _hoisted_1239 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2239 = (0, import_vue239.createElementVNode)("path", {
      fill: "currentColor",
      d: "M624 475.968V640h144a128 128 0 0 1 128 128H128a128 128 0 0 1 128-128h144V475.968a192 192 0 1 1 224 0zM128 896v-64h768v64H128z"
    }, null, -1);
    var _hoisted_3238 = [
      _hoisted_2239
    ];
    function _sfc_render239(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue239.openBlock)(), (0, import_vue239.createElementBlock)("svg", _hoisted_1239, _hoisted_3238);
    }
    var stamp_default = plugin_vue_export_helper_default(_sfc_main239, [["render", _sfc_render239], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/stamp.vue"]]);
    var import_vue240 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main240 = {
      name: "StarFilled"
    };
    var _hoisted_1240 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2240 = (0, import_vue240.createElementVNode)("path", {
      fill: "currentColor",
      d: "M283.84 867.84 512 747.776l228.16 119.936a6.4 6.4 0 0 0 9.28-6.72l-43.52-254.08 184.512-179.904a6.4 6.4 0 0 0-3.52-10.88l-255.104-37.12L517.76 147.904a6.4 6.4 0 0 0-11.52 0L392.192 379.072l-255.104 37.12a6.4 6.4 0 0 0-3.52 10.88L318.08 606.976l-43.584 254.08a6.4 6.4 0 0 0 9.28 6.72z"
    }, null, -1);
    var _hoisted_3239 = [
      _hoisted_2240
    ];
    function _sfc_render240(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue240.openBlock)(), (0, import_vue240.createElementBlock)("svg", _hoisted_1240, _hoisted_3239);
    }
    var star_filled_default = plugin_vue_export_helper_default(_sfc_main240, [["render", _sfc_render240], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/star-filled.vue"]]);
    var import_vue241 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main241 = {
      name: "Star"
    };
    var _hoisted_1241 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2241 = (0, import_vue241.createElementVNode)("path", {
      fill: "currentColor",
      d: "m512 747.84 228.16 119.936a6.4 6.4 0 0 0 9.28-6.72l-43.52-254.08 184.512-179.904a6.4 6.4 0 0 0-3.52-10.88l-255.104-37.12L517.76 147.904a6.4 6.4 0 0 0-11.52 0L392.192 379.072l-255.104 37.12a6.4 6.4 0 0 0-3.52 10.88L318.08 606.976l-43.584 254.08a6.4 6.4 0 0 0 9.28 6.72L512 747.84zM313.6 924.48a70.4 70.4 0 0 1-102.144-74.24l37.888-220.928L88.96 472.96A70.4 70.4 0 0 1 128 352.896l221.76-32.256 99.2-200.96a70.4 70.4 0 0 1 126.208 0l99.2 200.96 221.824 32.256a70.4 70.4 0 0 1 39.04 120.064L774.72 629.376l37.888 220.928a70.4 70.4 0 0 1-102.144 74.24L512 820.096l-198.4 104.32z"
    }, null, -1);
    var _hoisted_3240 = [
      _hoisted_2241
    ];
    function _sfc_render241(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue241.openBlock)(), (0, import_vue241.createElementBlock)("svg", _hoisted_1241, _hoisted_3240);
    }
    var star_default = plugin_vue_export_helper_default(_sfc_main241, [["render", _sfc_render241], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/star.vue"]]);
    var import_vue242 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main242 = {
      name: "Stopwatch"
    };
    var _hoisted_1242 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2242 = (0, import_vue242.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
    }, null, -1);
    var _hoisted_3241 = (0, import_vue242.createElementVNode)("path", {
      fill: "currentColor",
      d: "M672 234.88c-39.168 174.464-80 298.624-122.688 372.48-64 110.848-202.624 30.848-138.624-80C453.376 453.44 540.48 355.968 672 234.816z"
    }, null, -1);
    var _hoisted_471 = [
      _hoisted_2242,
      _hoisted_3241
    ];
    function _sfc_render242(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue242.openBlock)(), (0, import_vue242.createElementBlock)("svg", _hoisted_1242, _hoisted_471);
    }
    var stopwatch_default = plugin_vue_export_helper_default(_sfc_main242, [["render", _sfc_render242], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/stopwatch.vue"]]);
    var import_vue243 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main243 = {
      name: "SuccessFilled"
    };
    var _hoisted_1243 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2243 = (0, import_vue243.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"
    }, null, -1);
    var _hoisted_3242 = [
      _hoisted_2243
    ];
    function _sfc_render243(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue243.openBlock)(), (0, import_vue243.createElementBlock)("svg", _hoisted_1243, _hoisted_3242);
    }
    var success_filled_default = plugin_vue_export_helper_default(_sfc_main243, [["render", _sfc_render243], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/success-filled.vue"]]);
    var import_vue244 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main244 = {
      name: "Sugar"
    };
    var _hoisted_1244 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2244 = (0, import_vue244.createElementVNode)("path", {
      fill: "currentColor",
      d: "m801.728 349.184 4.48 4.48a128 128 0 0 1 0 180.992L534.656 806.144a128 128 0 0 1-181.056 0l-4.48-4.48-19.392 109.696a64 64 0 0 1-108.288 34.176L78.464 802.56a64 64 0 0 1 34.176-108.288l109.76-19.328-4.544-4.544a128 128 0 0 1 0-181.056l271.488-271.488a128 128 0 0 1 181.056 0l4.48 4.48 19.392-109.504a64 64 0 0 1 108.352-34.048l142.592 143.04a64 64 0 0 1-34.24 108.16l-109.248 19.2zm-548.8 198.72h447.168v2.24l60.8-60.8a63.808 63.808 0 0 0 18.752-44.416h-426.88l-89.664 89.728a64.064 64.064 0 0 0-10.24 13.248zm0 64c2.752 4.736 6.144 9.152 10.176 13.248l135.744 135.744a64 64 0 0 0 90.496 0L638.4 611.904H252.928zm490.048-230.976L625.152 263.104a64 64 0 0 0-90.496 0L416.768 380.928h326.208zM123.712 757.312l142.976 142.976 24.32-137.6a25.6 25.6 0 0 0-29.696-29.632l-137.6 24.256zm633.6-633.344-24.32 137.472a25.6 25.6 0 0 0 29.632 29.632l137.28-24.064-142.656-143.04z"
    }, null, -1);
    var _hoisted_3243 = [
      _hoisted_2244
    ];
    function _sfc_render244(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue244.openBlock)(), (0, import_vue244.createElementBlock)("svg", _hoisted_1244, _hoisted_3243);
    }
    var sugar_default = plugin_vue_export_helper_default(_sfc_main244, [["render", _sfc_render244], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/sugar.vue"]]);
    var import_vue245 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main245 = {
      name: "Suitcase"
    };
    var _hoisted_1245 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2245 = (0, import_vue245.createElementVNode)("path", {
      fill: "currentColor",
      d: "M128 384h768v-64a64 64 0 0 0-64-64H192a64 64 0 0 0-64 64v64zm0 64v320a64 64 0 0 0 64 64h640a64 64 0 0 0 64-64V448H128zm64-256h640a128 128 0 0 1 128 128v448a128 128 0 0 1-128 128H192A128 128 0 0 1 64 768V320a128 128 0 0 1 128-128z"
    }, null, -1);
    var _hoisted_3244 = (0, import_vue245.createElementVNode)("path", {
      fill: "currentColor",
      d: "M384 128v64h256v-64H384zm0-64h256a64 64 0 0 1 64 64v64a64 64 0 0 1-64 64H384a64 64 0 0 1-64-64v-64a64 64 0 0 1 64-64z"
    }, null, -1);
    var _hoisted_472 = [
      _hoisted_2245,
      _hoisted_3244
    ];
    function _sfc_render245(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue245.openBlock)(), (0, import_vue245.createElementBlock)("svg", _hoisted_1245, _hoisted_472);
    }
    var suitcase_default = plugin_vue_export_helper_default(_sfc_main245, [["render", _sfc_render245], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/suitcase.vue"]]);
    var import_vue246 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main246 = {
      name: "Sunny"
    };
    var _hoisted_1246 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2246 = (0, import_vue246.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 704a192 192 0 1 0 0-384 192 192 0 0 0 0 384zm0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512zm0-704a32 32 0 0 1 32 32v64a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 768a32 32 0 0 1 32 32v64a32 32 0 1 1-64 0v-64a32 32 0 0 1 32-32zM195.2 195.2a32 32 0 0 1 45.248 0l45.248 45.248a32 32 0 1 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm543.104 543.104a32 32 0 0 1 45.248 0l45.248 45.248a32 32 0 0 1-45.248 45.248l-45.248-45.248a32 32 0 0 1 0-45.248zM64 512a32 32 0 0 1 32-32h64a32 32 0 0 1 0 64H96a32 32 0 0 1-32-32zm768 0a32 32 0 0 1 32-32h64a32 32 0 1 1 0 64h-64a32 32 0 0 1-32-32zM195.2 828.8a32 32 0 0 1 0-45.248l45.248-45.248a32 32 0 0 1 45.248 45.248L240.448 828.8a32 32 0 0 1-45.248 0zm543.104-543.104a32 32 0 0 1 0-45.248l45.248-45.248a32 32 0 0 1 45.248 45.248l-45.248 45.248a32 32 0 0 1-45.248 0z"
    }, null, -1);
    var _hoisted_3245 = [
      _hoisted_2246
    ];
    function _sfc_render246(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue246.openBlock)(), (0, import_vue246.createElementBlock)("svg", _hoisted_1246, _hoisted_3245);
    }
    var sunny_default = plugin_vue_export_helper_default(_sfc_main246, [["render", _sfc_render246], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/sunny.vue"]]);
    var import_vue247 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main247 = {
      name: "Sunrise"
    };
    var _hoisted_1247 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2247 = (0, import_vue247.createElementVNode)("path", {
      fill: "currentColor",
      d: "M32 768h960a32 32 0 1 1 0 64H32a32 32 0 1 1 0-64zm129.408-96a352 352 0 0 1 701.184 0h-64.32a288 288 0 0 0-572.544 0h-64.32zM512 128a32 32 0 0 1 32 32v96a32 32 0 0 1-64 0v-96a32 32 0 0 1 32-32zm407.296 168.704a32 32 0 0 1 0 45.248l-67.84 67.84a32 32 0 1 1-45.248-45.248l67.84-67.84a32 32 0 0 1 45.248 0zm-814.592 0a32 32 0 0 1 45.248 0l67.84 67.84a32 32 0 1 1-45.248 45.248l-67.84-67.84a32 32 0 0 1 0-45.248z"
    }, null, -1);
    var _hoisted_3246 = [
      _hoisted_2247
    ];
    function _sfc_render247(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue247.openBlock)(), (0, import_vue247.createElementBlock)("svg", _hoisted_1247, _hoisted_3246);
    }
    var sunrise_default = plugin_vue_export_helper_default(_sfc_main247, [["render", _sfc_render247], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/sunrise.vue"]]);
    var import_vue248 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main248 = {
      name: "Sunset"
    };
    var _hoisted_1248 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2248 = (0, import_vue248.createElementVNode)("path", {
      fill: "currentColor",
      d: "M82.56 640a448 448 0 1 1 858.88 0h-67.2a384 384 0 1 0-724.288 0H82.56zM32 704h960q32 0 32 32t-32 32H32q-32 0-32-32t32-32zm256 128h448q32 0 32 32t-32 32H288q-32 0-32-32t32-32z"
    }, null, -1);
    var _hoisted_3247 = [
      _hoisted_2248
    ];
    function _sfc_render248(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue248.openBlock)(), (0, import_vue248.createElementBlock)("svg", _hoisted_1248, _hoisted_3247);
    }
    var sunset_default = plugin_vue_export_helper_default(_sfc_main248, [["render", _sfc_render248], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/sunset.vue"]]);
    var import_vue249 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main249 = {
      name: "SwitchButton"
    };
    var _hoisted_1249 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2249 = (0, import_vue249.createElementVNode)("path", {
      fill: "currentColor",
      d: "M352 159.872V230.4a352 352 0 1 0 320 0v-70.528A416.128 416.128 0 0 1 512 960a416 416 0 0 1-160-800.128z"
    }, null, -1);
    var _hoisted_3248 = (0, import_vue249.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 64q32 0 32 32v320q0 32-32 32t-32-32V96q0-32 32-32z"
    }, null, -1);
    var _hoisted_473 = [
      _hoisted_2249,
      _hoisted_3248
    ];
    function _sfc_render249(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue249.openBlock)(), (0, import_vue249.createElementBlock)("svg", _hoisted_1249, _hoisted_473);
    }
    var switch_button_default = plugin_vue_export_helper_default(_sfc_main249, [["render", _sfc_render249], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/switch-button.vue"]]);
    var import_vue250 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main250 = {
      name: "Switch"
    };
    var _hoisted_1250 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2250 = (0, import_vue250.createElementVNode)("path", {
      fill: "currentColor",
      d: "M118.656 438.656a32 32 0 0 1 0-45.248L416 96l4.48-3.776A32 32 0 0 1 461.248 96l3.712 4.48a32.064 32.064 0 0 1-3.712 40.832L218.56 384H928a32 32 0 1 1 0 64H141.248a32 32 0 0 1-22.592-9.344zM64 608a32 32 0 0 1 32-32h786.752a32 32 0 0 1 22.656 54.592L608 928l-4.48 3.776a32.064 32.064 0 0 1-40.832-49.024L805.632 640H96a32 32 0 0 1-32-32z"
    }, null, -1);
    var _hoisted_3249 = [
      _hoisted_2250
    ];
    function _sfc_render250(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue250.openBlock)(), (0, import_vue250.createElementBlock)("svg", _hoisted_1250, _hoisted_3249);
    }
    var switch_default = plugin_vue_export_helper_default(_sfc_main250, [["render", _sfc_render250], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/switch.vue"]]);
    var import_vue251 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main251 = {
      name: "TakeawayBox"
    };
    var _hoisted_1251 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2251 = (0, import_vue251.createElementVNode)("path", {
      fill: "currentColor",
      d: "M832 384H192v448h640V384zM96 320h832V128H96v192zm800 64v480a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V384H64a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32h896a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32h-64zM416 512h192a32 32 0 0 1 0 64H416a32 32 0 0 1 0-64z"
    }, null, -1);
    var _hoisted_3250 = [
      _hoisted_2251
    ];
    function _sfc_render251(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue251.openBlock)(), (0, import_vue251.createElementBlock)("svg", _hoisted_1251, _hoisted_3250);
    }
    var takeaway_box_default = plugin_vue_export_helper_default(_sfc_main251, [["render", _sfc_render251], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/takeaway-box.vue"]]);
    var import_vue252 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main252 = {
      name: "Ticket"
    };
    var _hoisted_1252 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2252 = (0, import_vue252.createElementVNode)("path", {
      fill: "currentColor",
      d: "M640 832H64V640a128 128 0 1 0 0-256V192h576v160h64V192h256v192a128 128 0 1 0 0 256v192H704V672h-64v160zm0-416v192h64V416h-64z"
    }, null, -1);
    var _hoisted_3251 = [
      _hoisted_2252
    ];
    function _sfc_render252(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue252.openBlock)(), (0, import_vue252.createElementBlock)("svg", _hoisted_1252, _hoisted_3251);
    }
    var ticket_default = plugin_vue_export_helper_default(_sfc_main252, [["render", _sfc_render252], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/ticket.vue"]]);
    var import_vue253 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main253 = {
      name: "Tickets"
    };
    var _hoisted_1253 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2253 = (0, import_vue253.createElementVNode)("path", {
      fill: "currentColor",
      d: "M192 128v768h640V128H192zm-32-64h704a32 32 0 0 1 32 32v832a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32zm160 448h384v64H320v-64zm0-192h192v64H320v-64zm0 384h384v64H320v-64z"
    }, null, -1);
    var _hoisted_3252 = [
      _hoisted_2253
    ];
    function _sfc_render253(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue253.openBlock)(), (0, import_vue253.createElementBlock)("svg", _hoisted_1253, _hoisted_3252);
    }
    var tickets_default = plugin_vue_export_helper_default(_sfc_main253, [["render", _sfc_render253], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/tickets.vue"]]);
    var import_vue254 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main254 = {
      name: "Timer"
    };
    var _hoisted_1254 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2254 = (0, import_vue254.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 896a320 320 0 1 0 0-640 320 320 0 0 0 0 640zm0 64a384 384 0 1 1 0-768 384 384 0 0 1 0 768z"
    }, null, -1);
    var _hoisted_3253 = (0, import_vue254.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 320a32 32 0 0 1 32 32l-.512 224a32 32 0 1 1-64 0L480 352a32 32 0 0 1 32-32z"
    }, null, -1);
    var _hoisted_474 = (0, import_vue254.createElementVNode)("path", {
      fill: "currentColor",
      d: "M448 576a64 64 0 1 0 128 0 64 64 0 1 0-128 0zm96-448v128h-64V128h-96a32 32 0 0 1 0-64h256a32 32 0 1 1 0 64h-96z"
    }, null, -1);
    var _hoisted_519 = [
      _hoisted_2254,
      _hoisted_3253,
      _hoisted_474
    ];
    function _sfc_render254(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue254.openBlock)(), (0, import_vue254.createElementBlock)("svg", _hoisted_1254, _hoisted_519);
    }
    var timer_default = plugin_vue_export_helper_default(_sfc_main254, [["render", _sfc_render254], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/timer.vue"]]);
    var import_vue255 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main255 = {
      name: "ToiletPaper"
    };
    var _hoisted_1255 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2255 = (0, import_vue255.createElementVNode)("path", {
      fill: "currentColor",
      d: "M595.2 128H320a192 192 0 0 0-192 192v576h384V352c0-90.496 32.448-171.2 83.2-224zM736 64c123.712 0 224 128.96 224 288S859.712 640 736 640H576v320H64V320A256 256 0 0 1 320 64h416zM576 352v224h160c84.352 0 160-97.28 160-224s-75.648-224-160-224-160 97.28-160 224z"
    }, null, -1);
    var _hoisted_3254 = (0, import_vue255.createElementVNode)("path", {
      fill: "currentColor",
      d: "M736 448c-35.328 0-64-43.008-64-96s28.672-96 64-96 64 43.008 64 96-28.672 96-64 96z"
    }, null, -1);
    var _hoisted_475 = [
      _hoisted_2255,
      _hoisted_3254
    ];
    function _sfc_render255(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue255.openBlock)(), (0, import_vue255.createElementBlock)("svg", _hoisted_1255, _hoisted_475);
    }
    var toilet_paper_default = plugin_vue_export_helper_default(_sfc_main255, [["render", _sfc_render255], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/toilet-paper.vue"]]);
    var import_vue256 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main256 = {
      name: "Tools"
    };
    var _hoisted_1256 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2256 = (0, import_vue256.createElementVNode)("path", {
      fill: "currentColor",
      d: "M764.416 254.72a351.68 351.68 0 0 1 86.336 149.184H960v192.064H850.752a351.68 351.68 0 0 1-86.336 149.312l54.72 94.72-166.272 96-54.592-94.72a352.64 352.64 0 0 1-172.48 0L371.136 936l-166.272-96 54.72-94.72a351.68 351.68 0 0 1-86.336-149.312H64v-192h109.248a351.68 351.68 0 0 1 86.336-149.312L204.8 160l166.208-96h.192l54.656 94.592a352.64 352.64 0 0 1 172.48 0L652.8 64h.128L819.2 160l-54.72 94.72zM704 499.968a192 192 0 1 0-384 0 192 192 0 0 0 384 0z"
    }, null, -1);
    var _hoisted_3255 = [
      _hoisted_2256
    ];
    function _sfc_render256(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue256.openBlock)(), (0, import_vue256.createElementBlock)("svg", _hoisted_1256, _hoisted_3255);
    }
    var tools_default = plugin_vue_export_helper_default(_sfc_main256, [["render", _sfc_render256], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/tools.vue"]]);
    var import_vue257 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main257 = {
      name: "TopLeft"
    };
    var _hoisted_1257 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2257 = (0, import_vue257.createElementVNode)("path", {
      fill: "currentColor",
      d: "M256 256h416a32 32 0 1 0 0-64H224a32 32 0 0 0-32 32v448a32 32 0 0 0 64 0V256z"
    }, null, -1);
    var _hoisted_3256 = (0, import_vue257.createElementVNode)("path", {
      fill: "currentColor",
      d: "M246.656 201.344a32 32 0 0 0-45.312 45.312l544 544a32 32 0 0 0 45.312-45.312l-544-544z"
    }, null, -1);
    var _hoisted_476 = [
      _hoisted_2257,
      _hoisted_3256
    ];
    function _sfc_render257(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue257.openBlock)(), (0, import_vue257.createElementBlock)("svg", _hoisted_1257, _hoisted_476);
    }
    var top_left_default = plugin_vue_export_helper_default(_sfc_main257, [["render", _sfc_render257], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/top-left.vue"]]);
    var import_vue258 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main258 = {
      name: "TopRight"
    };
    var _hoisted_1258 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2258 = (0, import_vue258.createElementVNode)("path", {
      fill: "currentColor",
      d: "M768 256H353.6a32 32 0 1 1 0-64H800a32 32 0 0 1 32 32v448a32 32 0 0 1-64 0V256z"
    }, null, -1);
    var _hoisted_3257 = (0, import_vue258.createElementVNode)("path", {
      fill: "currentColor",
      d: "M777.344 201.344a32 32 0 0 1 45.312 45.312l-544 544a32 32 0 0 1-45.312-45.312l544-544z"
    }, null, -1);
    var _hoisted_477 = [
      _hoisted_2258,
      _hoisted_3257
    ];
    function _sfc_render258(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue258.openBlock)(), (0, import_vue258.createElementBlock)("svg", _hoisted_1258, _hoisted_477);
    }
    var top_right_default = plugin_vue_export_helper_default(_sfc_main258, [["render", _sfc_render258], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/top-right.vue"]]);
    var import_vue259 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main259 = {
      name: "Top"
    };
    var _hoisted_1259 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2259 = (0, import_vue259.createElementVNode)("path", {
      fill: "currentColor",
      d: "M572.235 205.282v600.365a30.118 30.118 0 1 1-60.235 0V205.282L292.382 438.633a28.913 28.913 0 0 1-42.646 0 33.43 33.43 0 0 1 0-45.236l271.058-288.045a28.913 28.913 0 0 1 42.647 0L834.5 393.397a33.43 33.43 0 0 1 0 45.176 28.913 28.913 0 0 1-42.647 0l-219.618-233.23z"
    }, null, -1);
    var _hoisted_3258 = [
      _hoisted_2259
    ];
    function _sfc_render259(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue259.openBlock)(), (0, import_vue259.createElementBlock)("svg", _hoisted_1259, _hoisted_3258);
    }
    var top_default = plugin_vue_export_helper_default(_sfc_main259, [["render", _sfc_render259], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/top.vue"]]);
    var import_vue260 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main260 = {
      name: "TrendCharts"
    };
    var _hoisted_1260 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2260 = (0, import_vue260.createElementVNode)("path", {
      fill: "currentColor",
      d: "M128 896V128h768v768H128zm291.712-327.296 128 102.4 180.16-201.792-47.744-42.624-139.84 156.608-128-102.4-180.16 201.792 47.744 42.624 139.84-156.608zM816 352a48 48 0 1 0-96 0 48 48 0 0 0 96 0z"
    }, null, -1);
    var _hoisted_3259 = [
      _hoisted_2260
    ];
    function _sfc_render260(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue260.openBlock)(), (0, import_vue260.createElementBlock)("svg", _hoisted_1260, _hoisted_3259);
    }
    var trend_charts_default = plugin_vue_export_helper_default(_sfc_main260, [["render", _sfc_render260], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/trend-charts.vue"]]);
    var import_vue261 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main261 = {
      name: "Trophy"
    };
    var _hoisted_1261 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2261 = (0, import_vue261.createElementVNode)("path", {
      fill: "currentColor",
      d: "M480 896V702.08A256.256 256.256 0 0 1 264.064 512h-32.64a96 96 0 0 1-91.968-68.416L93.632 290.88a76.8 76.8 0 0 1 73.6-98.88H256V96a32 32 0 0 1 32-32h448a32 32 0 0 1 32 32v96h88.768a76.8 76.8 0 0 1 73.6 98.88L884.48 443.52A96 96 0 0 1 792.576 512h-32.64A256.256 256.256 0 0 1 544 702.08V896h128a32 32 0 1 1 0 64H352a32 32 0 1 1 0-64h128zm224-448V128H320v320a192 192 0 1 0 384 0zm64 0h24.576a32 32 0 0 0 30.656-22.784l45.824-152.768A12.8 12.8 0 0 0 856.768 256H768v192zm-512 0V256h-88.768a12.8 12.8 0 0 0-12.288 16.448l45.824 152.768A32 32 0 0 0 231.424 448H256z"
    }, null, -1);
    var _hoisted_3260 = [
      _hoisted_2261
    ];
    function _sfc_render261(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue261.openBlock)(), (0, import_vue261.createElementBlock)("svg", _hoisted_1261, _hoisted_3260);
    }
    var trophy_default = plugin_vue_export_helper_default(_sfc_main261, [["render", _sfc_render261], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/trophy.vue"]]);
    var import_vue262 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main262 = {
      name: "TurnOff"
    };
    var _hoisted_1262 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2262 = (0, import_vue262.createElementVNode)("path", {
      fill: "currentColor",
      d: "M329.956 257.138a254.862 254.862 0 0 0 0 509.724h364.088a254.862 254.862 0 0 0 0-509.724H329.956zm0-72.818h364.088a327.68 327.68 0 1 1 0 655.36H329.956a327.68 327.68 0 1 1 0-655.36z"
    }, null, -1);
    var _hoisted_3261 = (0, import_vue262.createElementVNode)("path", {
      fill: "currentColor",
      d: "M329.956 621.227a109.227 109.227 0 1 0 0-218.454 109.227 109.227 0 0 0 0 218.454zm0 72.817a182.044 182.044 0 1 1 0-364.088 182.044 182.044 0 0 1 0 364.088z"
    }, null, -1);
    var _hoisted_478 = [
      _hoisted_2262,
      _hoisted_3261
    ];
    function _sfc_render262(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue262.openBlock)(), (0, import_vue262.createElementBlock)("svg", _hoisted_1262, _hoisted_478);
    }
    var turn_off_default = plugin_vue_export_helper_default(_sfc_main262, [["render", _sfc_render262], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/turn-off.vue"]]);
    var import_vue263 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main263 = {
      name: "Umbrella"
    };
    var _hoisted_1263 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2263 = (0, import_vue263.createElementVNode)("path", {
      fill: "currentColor",
      d: "M320 768a32 32 0 1 1 64 0 64 64 0 0 0 128 0V512H64a448 448 0 1 1 896 0H576v256a128 128 0 1 1-256 0zm570.688-320a384.128 384.128 0 0 0-757.376 0h757.376z"
    }, null, -1);
    var _hoisted_3262 = [
      _hoisted_2263
    ];
    function _sfc_render263(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue263.openBlock)(), (0, import_vue263.createElementBlock)("svg", _hoisted_1263, _hoisted_3262);
    }
    var umbrella_default = plugin_vue_export_helper_default(_sfc_main263, [["render", _sfc_render263], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/umbrella.vue"]]);
    var import_vue264 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main264 = {
      name: "Unlock"
    };
    var _hoisted_1264 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2264 = (0, import_vue264.createElementVNode)("path", {
      fill: "currentColor",
      d: "M224 448a32 32 0 0 0-32 32v384a32 32 0 0 0 32 32h576a32 32 0 0 0 32-32V480a32 32 0 0 0-32-32H224zm0-64h576a96 96 0 0 1 96 96v384a96 96 0 0 1-96 96H224a96 96 0 0 1-96-96V480a96 96 0 0 1 96-96z"
    }, null, -1);
    var _hoisted_3263 = (0, import_vue264.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 544a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V576a32 32 0 0 1 32-32zm178.304-295.296A192.064 192.064 0 0 0 320 320v64h352l96 38.4V448H256V320a256 256 0 0 1 493.76-95.104l-59.456 23.808z"
    }, null, -1);
    var _hoisted_479 = [
      _hoisted_2264,
      _hoisted_3263
    ];
    function _sfc_render264(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue264.openBlock)(), (0, import_vue264.createElementBlock)("svg", _hoisted_1264, _hoisted_479);
    }
    var unlock_default = plugin_vue_export_helper_default(_sfc_main264, [["render", _sfc_render264], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/unlock.vue"]]);
    var import_vue265 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main265 = {
      name: "UploadFilled"
    };
    var _hoisted_1265 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2265 = (0, import_vue265.createElementVNode)("path", {
      fill: "currentColor",
      d: "M544 864V672h128L512 480 352 672h128v192H320v-1.6c-5.376.32-10.496 1.6-16 1.6A240 240 0 0 1 64 624c0-123.136 93.12-223.488 212.608-237.248A239.808 239.808 0 0 1 512 192a239.872 239.872 0 0 1 235.456 194.752c119.488 13.76 212.48 114.112 212.48 237.248a240 240 0 0 1-240 240c-5.376 0-10.56-1.28-16-1.6v1.6H544z"
    }, null, -1);
    var _hoisted_3264 = [
      _hoisted_2265
    ];
    function _sfc_render265(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue265.openBlock)(), (0, import_vue265.createElementBlock)("svg", _hoisted_1265, _hoisted_3264);
    }
    var upload_filled_default = plugin_vue_export_helper_default(_sfc_main265, [["render", _sfc_render265], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/upload-filled.vue"]]);
    var import_vue266 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main266 = {
      name: "Upload"
    };
    var _hoisted_1266 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2266 = (0, import_vue266.createElementVNode)("path", {
      fill: "currentColor",
      d: "M160 832h704a32 32 0 1 1 0 64H160a32 32 0 1 1 0-64zm384-578.304V704h-64V247.296L237.248 490.048 192 444.8 508.8 128l316.8 316.8-45.312 45.248L544 253.696z"
    }, null, -1);
    var _hoisted_3265 = [
      _hoisted_2266
    ];
    function _sfc_render266(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue266.openBlock)(), (0, import_vue266.createElementBlock)("svg", _hoisted_1266, _hoisted_3265);
    }
    var upload_default = plugin_vue_export_helper_default(_sfc_main266, [["render", _sfc_render266], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/upload.vue"]]);
    var import_vue267 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main267 = {
      name: "UserFilled"
    };
    var _hoisted_1267 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2267 = (0, import_vue267.createElementVNode)("path", {
      fill: "currentColor",
      d: "M288 320a224 224 0 1 0 448 0 224 224 0 1 0-448 0zm544 608H160a32 32 0 0 1-32-32v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 0 1-32 32z"
    }, null, -1);
    var _hoisted_3266 = [
      _hoisted_2267
    ];
    function _sfc_render267(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue267.openBlock)(), (0, import_vue267.createElementBlock)("svg", _hoisted_1267, _hoisted_3266);
    }
    var user_filled_default = plugin_vue_export_helper_default(_sfc_main267, [["render", _sfc_render267], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/user-filled.vue"]]);
    var import_vue268 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main268 = {
      name: "User"
    };
    var _hoisted_1268 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2268 = (0, import_vue268.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 512a192 192 0 1 0 0-384 192 192 0 0 0 0 384zm0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512zm320 320v-96a96 96 0 0 0-96-96H288a96 96 0 0 0-96 96v96a32 32 0 1 1-64 0v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 1 1-64 0z"
    }, null, -1);
    var _hoisted_3267 = [
      _hoisted_2268
    ];
    function _sfc_render268(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue268.openBlock)(), (0, import_vue268.createElementBlock)("svg", _hoisted_1268, _hoisted_3267);
    }
    var user_default = plugin_vue_export_helper_default(_sfc_main268, [["render", _sfc_render268], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/user.vue"]]);
    var import_vue269 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main269 = {
      name: "Van"
    };
    var _hoisted_1269 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2269 = (0, import_vue269.createElementVNode)("path", {
      fill: "currentColor",
      d: "M128.896 736H96a32 32 0 0 1-32-32V224a32 32 0 0 1 32-32h576a32 32 0 0 1 32 32v96h164.544a32 32 0 0 1 31.616 27.136l54.144 352A32 32 0 0 1 922.688 736h-91.52a144 144 0 1 1-286.272 0H415.104a144 144 0 1 1-286.272 0zm23.36-64a143.872 143.872 0 0 1 239.488 0H568.32c17.088-25.6 42.24-45.376 71.744-55.808V256H128v416h24.256zm655.488 0h77.632l-19.648-128H704v64.896A144 144 0 0 1 807.744 672zm48.128-192-14.72-96H704v96h151.872zM688 832a80 80 0 1 0 0-160 80 80 0 0 0 0 160zm-416 0a80 80 0 1 0 0-160 80 80 0 0 0 0 160z"
    }, null, -1);
    var _hoisted_3268 = [
      _hoisted_2269
    ];
    function _sfc_render269(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue269.openBlock)(), (0, import_vue269.createElementBlock)("svg", _hoisted_1269, _hoisted_3268);
    }
    var van_default = plugin_vue_export_helper_default(_sfc_main269, [["render", _sfc_render269], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/van.vue"]]);
    var import_vue270 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main270 = {
      name: "VideoCameraFilled"
    };
    var _hoisted_1270 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2270 = (0, import_vue270.createElementVNode)("path", {
      fill: "currentColor",
      d: "m768 576 192-64v320l-192-64v96a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V480a32 32 0 0 1 32-32h640a32 32 0 0 1 32 32v96zM192 768v64h384v-64H192zm192-480a160 160 0 0 1 320 0 160 160 0 0 1-320 0zm64 0a96 96 0 1 0 192.064-.064A96 96 0 0 0 448 288zm-320 32a128 128 0 1 1 256.064.064A128 128 0 0 1 128 320zm64 0a64 64 0 1 0 128 0 64 64 0 0 0-128 0z"
    }, null, -1);
    var _hoisted_3269 = [
      _hoisted_2270
    ];
    function _sfc_render270(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue270.openBlock)(), (0, import_vue270.createElementBlock)("svg", _hoisted_1270, _hoisted_3269);
    }
    var video_camera_filled_default = plugin_vue_export_helper_default(_sfc_main270, [["render", _sfc_render270], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/video-camera-filled.vue"]]);
    var import_vue271 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main271 = {
      name: "VideoCamera"
    };
    var _hoisted_1271 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2271 = (0, import_vue271.createElementVNode)("path", {
      fill: "currentColor",
      d: "M704 768V256H128v512h576zm64-416 192-96v512l-192-96v128a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V224a32 32 0 0 1 32-32h640a32 32 0 0 1 32 32v128zm0 71.552v176.896l128 64V359.552l-128 64zM192 320h192v64H192v-64z"
    }, null, -1);
    var _hoisted_3270 = [
      _hoisted_2271
    ];
    function _sfc_render271(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue271.openBlock)(), (0, import_vue271.createElementBlock)("svg", _hoisted_1271, _hoisted_3270);
    }
    var video_camera_default = plugin_vue_export_helper_default(_sfc_main271, [["render", _sfc_render271], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/video-camera.vue"]]);
    var import_vue272 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main272 = {
      name: "VideoPause"
    };
    var _hoisted_1272 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2272 = (0, import_vue272.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 0 0 0-768 384 384 0 0 0 0 768zm-96-544q32 0 32 32v256q0 32-32 32t-32-32V384q0-32 32-32zm192 0q32 0 32 32v256q0 32-32 32t-32-32V384q0-32 32-32z"
    }, null, -1);
    var _hoisted_3271 = [
      _hoisted_2272
    ];
    function _sfc_render272(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue272.openBlock)(), (0, import_vue272.createElementBlock)("svg", _hoisted_1272, _hoisted_3271);
    }
    var video_pause_default = plugin_vue_export_helper_default(_sfc_main272, [["render", _sfc_render272], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/video-pause.vue"]]);
    var import_vue273 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main273 = {
      name: "VideoPlay"
    };
    var _hoisted_1273 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2273 = (0, import_vue273.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 0 0 0-768 384 384 0 0 0 0 768zm-48-247.616L668.608 512 464 375.616v272.768zm10.624-342.656 249.472 166.336a48 48 0 0 1 0 79.872L474.624 718.272A48 48 0 0 1 400 678.336V345.6a48 48 0 0 1 74.624-39.936z"
    }, null, -1);
    var _hoisted_3272 = [
      _hoisted_2273
    ];
    function _sfc_render273(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue273.openBlock)(), (0, import_vue273.createElementBlock)("svg", _hoisted_1273, _hoisted_3272);
    }
    var video_play_default = plugin_vue_export_helper_default(_sfc_main273, [["render", _sfc_render273], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/video-play.vue"]]);
    var import_vue274 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main274 = {
      name: "View"
    };
    var _hoisted_1274 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2274 = (0, import_vue274.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z"
    }, null, -1);
    var _hoisted_3273 = [
      _hoisted_2274
    ];
    function _sfc_render274(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue274.openBlock)(), (0, import_vue274.createElementBlock)("svg", _hoisted_1274, _hoisted_3273);
    }
    var view_default = plugin_vue_export_helper_default(_sfc_main274, [["render", _sfc_render274], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/view.vue"]]);
    var import_vue275 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main275 = {
      name: "WalletFilled"
    };
    var _hoisted_1275 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2275 = (0, import_vue275.createElementVNode)("path", {
      fill: "currentColor",
      d: "M688 512a112 112 0 1 0 0 224h208v160H128V352h768v160H688zm32 160h-32a48 48 0 0 1 0-96h32a48 48 0 0 1 0 96zm-80-544 128 160H384l256-160z"
    }, null, -1);
    var _hoisted_3274 = [
      _hoisted_2275
    ];
    function _sfc_render275(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue275.openBlock)(), (0, import_vue275.createElementBlock)("svg", _hoisted_1275, _hoisted_3274);
    }
    var wallet_filled_default = plugin_vue_export_helper_default(_sfc_main275, [["render", _sfc_render275], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/wallet-filled.vue"]]);
    var import_vue276 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main276 = {
      name: "Wallet"
    };
    var _hoisted_1276 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2276 = (0, import_vue276.createElementVNode)("path", {
      fill: "currentColor",
      d: "M640 288h-64V128H128v704h384v32a32 32 0 0 0 32 32H96a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32h512a32 32 0 0 1 32 32v192z"
    }, null, -1);
    var _hoisted_3275 = (0, import_vue276.createElementVNode)("path", {
      fill: "currentColor",
      d: "M128 320v512h768V320H128zm-32-64h832a32 32 0 0 1 32 32v576a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V288a32 32 0 0 1 32-32z"
    }, null, -1);
    var _hoisted_480 = (0, import_vue276.createElementVNode)("path", {
      fill: "currentColor",
      d: "M704 640a64 64 0 1 1 0-128 64 64 0 0 1 0 128z"
    }, null, -1);
    var _hoisted_520 = [
      _hoisted_2276,
      _hoisted_3275,
      _hoisted_480
    ];
    function _sfc_render276(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue276.openBlock)(), (0, import_vue276.createElementBlock)("svg", _hoisted_1276, _hoisted_520);
    }
    var wallet_default = plugin_vue_export_helper_default(_sfc_main276, [["render", _sfc_render276], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/wallet.vue"]]);
    var import_vue277 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main277 = {
      name: "WarningFilled"
    };
    var _hoisted_1277 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2277 = (0, import_vue277.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256zm0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4z"
    }, null, -1);
    var _hoisted_3276 = [
      _hoisted_2277
    ];
    function _sfc_render277(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue277.openBlock)(), (0, import_vue277.createElementBlock)("svg", _hoisted_1277, _hoisted_3276);
    }
    var warning_filled_default = plugin_vue_export_helper_default(_sfc_main277, [["render", _sfc_render277], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/warning-filled.vue"]]);
    var import_vue278 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main278 = {
      name: "Warning"
    };
    var _hoisted_1278 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2278 = (0, import_vue278.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 0 0 0-768 384 384 0 0 0 0 768zm48-176a48 48 0 1 1-96 0 48 48 0 0 1 96 0zm-48-464a32 32 0 0 1 32 32v288a32 32 0 0 1-64 0V288a32 32 0 0 1 32-32z"
    }, null, -1);
    var _hoisted_3277 = [
      _hoisted_2278
    ];
    function _sfc_render278(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue278.openBlock)(), (0, import_vue278.createElementBlock)("svg", _hoisted_1278, _hoisted_3277);
    }
    var warning_default = plugin_vue_export_helper_default(_sfc_main278, [["render", _sfc_render278], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/warning.vue"]]);
    var import_vue279 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main279 = {
      name: "Watch"
    };
    var _hoisted_1279 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2279 = (0, import_vue279.createElementVNode)("path", {
      fill: "currentColor",
      d: "M512 768a256 256 0 1 0 0-512 256 256 0 0 0 0 512zm0 64a320 320 0 1 1 0-640 320 320 0 0 1 0 640z"
    }, null, -1);
    var _hoisted_3278 = (0, import_vue279.createElementVNode)("path", {
      fill: "currentColor",
      d: "M480 352a32 32 0 0 1 32 32v160a32 32 0 0 1-64 0V384a32 32 0 0 1 32-32z"
    }, null, -1);
    var _hoisted_481 = (0, import_vue279.createElementVNode)("path", {
      fill: "currentColor",
      d: "M480 512h128q32 0 32 32t-32 32H480q-32 0-32-32t32-32zm128-256V128H416v128h-64V64h320v192h-64zM416 768v128h192V768h64v192H352V768h64z"
    }, null, -1);
    var _hoisted_521 = [
      _hoisted_2279,
      _hoisted_3278,
      _hoisted_481
    ];
    function _sfc_render279(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue279.openBlock)(), (0, import_vue279.createElementBlock)("svg", _hoisted_1279, _hoisted_521);
    }
    var watch_default = plugin_vue_export_helper_default(_sfc_main279, [["render", _sfc_render279], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/watch.vue"]]);
    var import_vue280 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main280 = {
      name: "Watermelon"
    };
    var _hoisted_1280 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2280 = (0, import_vue280.createElementVNode)("path", {
      fill: "currentColor",
      d: "m683.072 600.32-43.648 162.816-61.824-16.512 53.248-198.528L576 493.248l-158.4 158.4-45.248-45.248 158.4-158.4-55.616-55.616-198.528 53.248-16.512-61.824 162.816-43.648L282.752 200A384 384 0 0 0 824 741.248L683.072 600.32zm231.552 141.056a448 448 0 1 1-632-632l632 632z"
    }, null, -1);
    var _hoisted_3279 = [
      _hoisted_2280
    ];
    function _sfc_render280(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue280.openBlock)(), (0, import_vue280.createElementBlock)("svg", _hoisted_1280, _hoisted_3279);
    }
    var watermelon_default = plugin_vue_export_helper_default(_sfc_main280, [["render", _sfc_render280], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/watermelon.vue"]]);
    var import_vue281 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main281 = {
      name: "WindPower"
    };
    var _hoisted_1281 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2281 = (0, import_vue281.createElementVNode)("path", {
      fill: "currentColor",
      d: "M160 64q32 0 32 32v832q0 32-32 32t-32-32V96q0-32 32-32zm416 354.624 128-11.584V168.96l-128-11.52v261.12zm-64 5.824V151.552L320 134.08V160h-64V64l616.704 56.064A96 96 0 0 1 960 215.68v144.64a96 96 0 0 1-87.296 95.616L256 512V224h64v217.92l192-17.472zm256-23.232 98.88-8.96A32 32 0 0 0 896 360.32V215.68a32 32 0 0 0-29.12-31.872l-98.88-8.96v226.368z"
    }, null, -1);
    var _hoisted_3280 = [
      _hoisted_2281
    ];
    function _sfc_render281(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue281.openBlock)(), (0, import_vue281.createElementBlock)("svg", _hoisted_1281, _hoisted_3280);
    }
    var wind_power_default = plugin_vue_export_helper_default(_sfc_main281, [["render", _sfc_render281], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/wind-power.vue"]]);
    var import_vue282 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main282 = {
      name: "ZoomIn"
    };
    var _hoisted_1282 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2282 = (0, import_vue282.createElementVNode)("path", {
      fill: "currentColor",
      d: "m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704zm-32-384v-96a32 32 0 0 1 64 0v96h96a32 32 0 0 1 0 64h-96v96a32 32 0 0 1-64 0v-96h-96a32 32 0 0 1 0-64h96z"
    }, null, -1);
    var _hoisted_3281 = [
      _hoisted_2282
    ];
    function _sfc_render282(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue282.openBlock)(), (0, import_vue282.createElementBlock)("svg", _hoisted_1282, _hoisted_3281);
    }
    var zoom_in_default = plugin_vue_export_helper_default(_sfc_main282, [["render", _sfc_render282], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/zoom-in.vue"]]);
    var import_vue283 = (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports));
    var _sfc_main283 = {
      name: "ZoomOut"
    };
    var _hoisted_1283 = {
      viewBox: "0 0 1024 1024",
      xmlns: "http://www.w3.org/2000/svg"
    };
    var _hoisted_2283 = (0, import_vue283.createElementVNode)("path", {
      fill: "currentColor",
      d: "m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704zM352 448h256a32 32 0 0 1 0 64H352a32 32 0 0 1 0-64z"
    }, null, -1);
    var _hoisted_3282 = [
      _hoisted_2283
    ];
    function _sfc_render283(_ctx, _cache, $props, $setup, $data, $options) {
      return (0, import_vue283.openBlock)(), (0, import_vue283.createElementBlock)("svg", _hoisted_1283, _hoisted_3282);
    }
    var zoom_out_default = plugin_vue_export_helper_default(_sfc_main283, [["render", _sfc_render283], ["__file", "/home/runner/work/element-plus-icons/element-plus-icons/packages/vue/src/components/zoom-out.vue"]]);
    var src_default = (app, { prefix = "ElIcon" } = {}) => {
      for (const [key, component] of Object.entries(components_exports)) {
        app.component(prefix + key, component);
      }
    };
  }
});

// node_modules/.pnpm/element-plus-fast-form@1.1.0_@element-plus+icons-vue@2.0.0_vue@3.5.16__element-plus@2.7.4_vue@3.5.16__vue@3.5.16/node_modules/element-plus-fast-form/dist/index.umd.js
var require_index_umd = __commonJS({
  "node_modules/.pnpm/element-plus-fast-form@1.1.0_@element-plus+icons-vue@2.0.0_vue@3.5.16__element-plus@2.7.4_vue@3.5.16__vue@3.5.16/node_modules/element-plus-fast-form/dist/index.umd.js"(exports, module) {
    (function webpackUniversalModuleDefinition(root, factory) {
      if (typeof exports === "object" && typeof module === "object")
        module.exports = factory(require_vue(), require_dist());
      else if (typeof define === "function" && define.amd)
        define("ElementPlusFastForm", ["Vue", "@element-plus/icons-vue"], factory);
      else if (typeof exports === "object")
        exports["ElementPlusFastForm"] = factory(require_vue(), require_dist());
      else
        root["ElementPlusFastForm"] = factory(root["Vue"], root["@element-plus/icons-vue"]);
    })(typeof self !== "undefined" ? self : exports, function(__WEBPACK_EXTERNAL_MODULE__2508__, __WEBPACK_EXTERNAL_MODULE__2711__) {
      return (
        /******/
        function() {
          var __webpack_modules__ = {
            /***/
            197: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var anObject = __webpack_require__2(8485);
                var iteratorClose = __webpack_require__2(2817);
                module2.exports = function(iterator, fn, value, ENTRIES) {
                  try {
                    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
                  } catch (error) {
                    iteratorClose(iterator, "throw", error);
                  }
                };
              }
            ),
            /***/
            217: (
              /***/
              function(module2) {
                "use strict";
                var $String = String;
                module2.exports = function(argument) {
                  try {
                    return $String(argument);
                  } catch (error) {
                    return "Object";
                  }
                };
              }
            ),
            /***/
            218: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var internalObjectKeys = __webpack_require__2(7910);
                var enumBugKeys = __webpack_require__2(2613);
                module2.exports = Object.keys || function keys(O) {
                  return internalObjectKeys(O, enumBugKeys);
                };
              }
            ),
            /***/
            221: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var hasOwn = __webpack_require__2(9883);
                var isCallable = __webpack_require__2(4827);
                var toObject = __webpack_require__2(987);
                var sharedKey = __webpack_require__2(7121);
                var CORRECT_PROTOTYPE_GETTER = __webpack_require__2(6721);
                var IE_PROTO = sharedKey("IE_PROTO");
                var $Object = Object;
                var ObjectPrototype = $Object.prototype;
                module2.exports = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function(O) {
                  var object = toObject(O);
                  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
                  var constructor = object.constructor;
                  if (isCallable(constructor) && object instanceof constructor) {
                    return constructor.prototype;
                  }
                  return object instanceof $Object ? ObjectPrototype : null;
                };
              }
            ),
            /***/
            230: (
              /***/
              function(__unused_webpack_module, exports2, __webpack_require__2) {
                "use strict";
                var internalObjectKeys = __webpack_require__2(7910);
                var enumBugKeys = __webpack_require__2(2613);
                var hiddenKeys = enumBugKeys.concat("length", "prototype");
                exports2.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
                  return internalObjectKeys(O, hiddenKeys);
                };
              }
            ),
            /***/
            302: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var DESCRIPTORS = __webpack_require__2(6846);
                var definePropertyModule = __webpack_require__2(8043);
                var createPropertyDescriptor = __webpack_require__2(4314);
                module2.exports = function(object, key, value) {
                  if (DESCRIPTORS) definePropertyModule.f(object, key, createPropertyDescriptor(0, value));
                  else object[key] = value;
                };
              }
            ),
            /***/
            392: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var isCallable = __webpack_require__2(4827);
                module2.exports = function(it) {
                  return typeof it == "object" ? it !== null : isCallable(it);
                };
              }
            ),
            /***/
            413: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var globalThis2 = __webpack_require__2(2506);
                var userAgent = __webpack_require__2(9301);
                var process2 = globalThis2.process;
                var Deno = globalThis2.Deno;
                var versions = process2 && process2.versions || Deno && Deno.version;
                var v8 = versions && versions.v8;
                var match, version;
                if (v8) {
                  match = v8.split(".");
                  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
                }
                if (!version && userAgent) {
                  match = userAgent.match(/Edge\/(\d+)/);
                  if (!match || match[1] >= 74) {
                    match = userAgent.match(/Chrome\/(\d+)/);
                    if (match) version = +match[1];
                  }
                }
                module2.exports = version;
              }
            ),
            /***/
            489: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var defineBuiltIn = __webpack_require__2(2138);
                module2.exports = function(target, src, options) {
                  for (var key in src) defineBuiltIn(target, key, src[key], options);
                  return target;
                };
              }
            ),
            /***/
            575: (
              /***/
              function(module2) {
                "use strict";
                module2.exports = function(value, done) {
                  return { value, done };
                };
              }
            ),
            /***/
            625: (
              /***/
              function(__unused_webpack_module, exports2, __webpack_require__2) {
                "use strict";
                var DESCRIPTORS = __webpack_require__2(6846);
                var call = __webpack_require__2(6671);
                var propertyIsEnumerableModule = __webpack_require__2(1883);
                var createPropertyDescriptor = __webpack_require__2(4314);
                var toIndexedObject = __webpack_require__2(7599);
                var toPropertyKey = __webpack_require__2(2103);
                var hasOwn = __webpack_require__2(9883);
                var IE8_DOM_DEFINE = __webpack_require__2(4631);
                var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
                exports2.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
                  O = toIndexedObject(O);
                  P = toPropertyKey(P);
                  if (IE8_DOM_DEFINE) try {
                    return $getOwnPropertyDescriptor(O, P);
                  } catch (error) {
                  }
                  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
                };
              }
            ),
            /***/
            987: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var requireObjectCoercible = __webpack_require__2(8336);
                var $Object = Object;
                module2.exports = function(argument) {
                  return $Object(requireObjectCoercible(argument));
                };
              }
            ),
            /***/
            1027: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var globalThis2 = __webpack_require__2(2506);
                module2.exports = function(METHOD_NAME, ExpectedError) {
                  var Iterator = globalThis2.Iterator;
                  var IteratorPrototype = Iterator && Iterator.prototype;
                  var method = IteratorPrototype && IteratorPrototype[METHOD_NAME];
                  var CLOSED = false;
                  if (method) try {
                    method.call({
                      next: function() {
                        return { done: true };
                      },
                      "return": function() {
                        CLOSED = true;
                      }
                    }, -1);
                  } catch (error) {
                    if (!(error instanceof ExpectedError)) CLOSED = false;
                  }
                  if (!CLOSED) return method;
                };
              }
            ),
            /***/
            1379: (
              /***/
              function(module2) {
                "use strict";
                var $TypeError = TypeError;
                var MAX_SAFE_INTEGER = 9007199254740991;
                module2.exports = function(it) {
                  if (it > MAX_SAFE_INTEGER) throw $TypeError("Maximum allowed index exceeded");
                  return it;
                };
              }
            ),
            /***/
            1467: (
              /***/
              function(__unused_webpack_module, exports2) {
                "use strict";
                exports2.f = Object.getOwnPropertySymbols;
              }
            ),
            /***/
            1479: (
              /***/
              function(module2) {
                "use strict";
                var ceil = Math.ceil;
                var floor = Math.floor;
                module2.exports = Math.trunc || function trunc(x) {
                  var n = +x;
                  return (n > 0 ? floor : ceil)(n);
                };
              }
            ),
            /***/
            1481: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var getBuiltIn = __webpack_require__2(9073);
                var uncurryThis = __webpack_require__2(8026);
                var getOwnPropertyNamesModule = __webpack_require__2(230);
                var getOwnPropertySymbolsModule = __webpack_require__2(1467);
                var anObject = __webpack_require__2(8485);
                var concat = uncurryThis([].concat);
                module2.exports = getBuiltIn("Reflect", "ownKeys") || function ownKeys(it) {
                  var keys = getOwnPropertyNamesModule.f(anObject(it));
                  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
                  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
                };
              }
            ),
            /***/
            1484: (
              /***/
              function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var $ = __webpack_require__2(7508);
                var toObject = __webpack_require__2(987);
                var lengthOfArrayLike = __webpack_require__2(7184);
                var setArrayLength = __webpack_require__2(7609);
                var doesNotExceedSafeInteger = __webpack_require__2(1379);
                var fails = __webpack_require__2(7737);
                var INCORRECT_TO_LENGTH = fails(function() {
                  return [].push.call({ length: 4294967296 }, 1) !== 4294967297;
                });
                var properErrorOnNonWritableLength = function() {
                  try {
                    Object.defineProperty([], "length", { writable: false }).push();
                  } catch (error) {
                    return error instanceof TypeError;
                  }
                };
                var FORCED = INCORRECT_TO_LENGTH || !properErrorOnNonWritableLength();
                $({ target: "Array", proto: true, arity: 1, forced: FORCED }, {
                  // eslint-disable-next-line no-unused-vars -- required for `.length`
                  push: function push(item) {
                    var O = toObject(this);
                    var len = lengthOfArrayLike(O);
                    var argCount = arguments.length;
                    doesNotExceedSafeInteger(len + argCount);
                    for (var i = 0; i < argCount; i++) {
                      O[len] = arguments[i];
                      len++;
                    }
                    setArrayLength(O, len);
                    return len;
                  }
                });
              }
            ),
            /***/
            1832: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var isCallable = __webpack_require__2(4827);
                var tryToString = __webpack_require__2(217);
                var $TypeError = TypeError;
                module2.exports = function(argument) {
                  if (isCallable(argument)) return argument;
                  throw new $TypeError(tryToString(argument) + " is not a function");
                };
              }
            ),
            /***/
            1883: (
              /***/
              function(__unused_webpack_module, exports2) {
                "use strict";
                var $propertyIsEnumerable = {}.propertyIsEnumerable;
                var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
                var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);
                exports2.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
                  var descriptor = getOwnPropertyDescriptor(this, V);
                  return !!descriptor && descriptor.enumerable;
                } : $propertyIsEnumerable;
              }
            ),
            /***/
            1891: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var call = __webpack_require__2(6671);
                var isObject2 = __webpack_require__2(392);
                var isSymbol2 = __webpack_require__2(9935);
                var getMethod = __webpack_require__2(7604);
                var ordinaryToPrimitive = __webpack_require__2(6156);
                var wellKnownSymbol = __webpack_require__2(9489);
                var $TypeError = TypeError;
                var TO_PRIMITIVE = wellKnownSymbol("toPrimitive");
                module2.exports = function(input, pref) {
                  if (!isObject2(input) || isSymbol2(input)) return input;
                  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
                  var result;
                  if (exoticToPrim) {
                    if (pref === void 0) pref = "default";
                    result = call(exoticToPrim, input, pref);
                    if (!isObject2(result) || isSymbol2(result)) return result;
                    throw new $TypeError("Can't convert object to primitive value");
                  }
                  if (pref === void 0) pref = "number";
                  return ordinaryToPrimitive(input, pref);
                };
              }
            ),
            /***/
            1899: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var getBuiltIn = __webpack_require__2(9073);
                module2.exports = getBuiltIn("document", "documentElement");
              }
            ),
            /***/
            2050: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var classof = __webpack_require__2(3326);
                module2.exports = Array.isArray || function isArray2(argument) {
                  return classof(argument) === "Array";
                };
              }
            ),
            /***/
            2103: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var toPrimitive = __webpack_require__2(1891);
                var isSymbol2 = __webpack_require__2(9935);
                module2.exports = function(argument) {
                  var key = toPrimitive(argument, "string");
                  return isSymbol2(key) ? key : key + "";
                };
              }
            ),
            /***/
            2138: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var isCallable = __webpack_require__2(4827);
                var definePropertyModule = __webpack_require__2(8043);
                var makeBuiltIn = __webpack_require__2(8425);
                var defineGlobalProperty = __webpack_require__2(8047);
                module2.exports = function(O, key, value, options) {
                  if (!options) options = {};
                  var simple = options.enumerable;
                  var name = options.name !== void 0 ? options.name : key;
                  if (isCallable(value)) makeBuiltIn(value, name, options);
                  if (options.global) {
                    if (simple) O[key] = value;
                    else defineGlobalProperty(key, value);
                  } else {
                    try {
                      if (!options.unsafe) delete O[key];
                      else if (O[key]) simple = true;
                    } catch (error) {
                    }
                    if (simple) O[key] = value;
                    else definePropertyModule.f(O, key, {
                      value,
                      enumerable: false,
                      configurable: !options.nonConfigurable,
                      writable: !options.nonWritable
                    });
                  }
                  return O;
                };
              }
            ),
            /***/
            2404: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var toIntegerOrInfinity = __webpack_require__2(9853);
                var min = Math.min;
                module2.exports = function(argument) {
                  var len = toIntegerOrInfinity(argument);
                  return len > 0 ? min(len, 9007199254740991) : 0;
                };
              }
            ),
            /***/
            2506: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var check = function(it) {
                  return it && it.Math === Math && it;
                };
                module2.exports = // eslint-disable-next-line es/no-global-this -- safe
                check(typeof globalThis == "object" && globalThis) || check(typeof window == "object" && window) || // eslint-disable-next-line no-restricted-globals -- safe
                check(typeof self == "object" && self) || check(typeof __webpack_require__2.g == "object" && __webpack_require__2.g) || check(typeof this == "object" && this) || // eslint-disable-next-line no-new-func -- fallback
                /* @__PURE__ */ function() {
                  return this;
                }() || Function("return this")();
              }
            ),
            /***/
            2508: (
              /***/
              function(module2) {
                "use strict";
                module2.exports = __WEBPACK_EXTERNAL_MODULE__2508__;
              }
            ),
            /***/
            2613: (
              /***/
              function(module2) {
                "use strict";
                module2.exports = [
                  "constructor",
                  "hasOwnProperty",
                  "isPrototypeOf",
                  "propertyIsEnumerable",
                  "toLocaleString",
                  "toString",
                  "valueOf"
                ];
              }
            ),
            /***/
            2642: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var fails = __webpack_require__2(7737);
                module2.exports = !fails(function() {
                  var test = (function() {
                  }).bind();
                  return typeof test != "function" || test.hasOwnProperty("prototype");
                });
              }
            ),
            /***/
            2711: (
              /***/
              function(module2) {
                "use strict";
                module2.exports = __WEBPACK_EXTERNAL_MODULE__2711__;
              }
            ),
            /***/
            2807: (
              /***/
              function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var $ = __webpack_require__2(7508);
                var call = __webpack_require__2(6671);
                var aCallable = __webpack_require__2(1832);
                var anObject = __webpack_require__2(8485);
                var getIteratorDirect = __webpack_require__2(9065);
                var createIteratorProxy = __webpack_require__2(6964);
                var callWithSafeIterationClosing = __webpack_require__2(197);
                var iteratorClose = __webpack_require__2(2817);
                var iteratorHelperWithoutClosingOnEarlyError = __webpack_require__2(1027);
                var IS_PURE = __webpack_require__2(6101);
                var mapWithoutClosingOnEarlyError = !IS_PURE && iteratorHelperWithoutClosingOnEarlyError("map", TypeError);
                var IteratorProxy = createIteratorProxy(function() {
                  var iterator = this.iterator;
                  var result = anObject(call(this.next, iterator));
                  var done = this.done = !!result.done;
                  if (!done) return callWithSafeIterationClosing(iterator, this.mapper, [result.value, this.counter++], true);
                });
                $({ target: "Iterator", proto: true, real: true, forced: IS_PURE || mapWithoutClosingOnEarlyError }, {
                  map: function map(mapper) {
                    anObject(this);
                    try {
                      aCallable(mapper);
                    } catch (error) {
                      iteratorClose(this, "throw", error);
                    }
                    if (mapWithoutClosingOnEarlyError) return call(mapWithoutClosingOnEarlyError, this, mapper);
                    return new IteratorProxy(getIteratorDirect(this), {
                      mapper
                    });
                  }
                });
              }
            ),
            /***/
            2817: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var call = __webpack_require__2(6671);
                var anObject = __webpack_require__2(8485);
                var getMethod = __webpack_require__2(7604);
                module2.exports = function(iterator, kind, value) {
                  var innerResult, innerError;
                  anObject(iterator);
                  try {
                    innerResult = getMethod(iterator, "return");
                    if (!innerResult) {
                      if (kind === "throw") throw value;
                      return value;
                    }
                    innerResult = call(innerResult, iterator);
                  } catch (error) {
                    innerError = true;
                    innerResult = error;
                  }
                  if (kind === "throw") throw value;
                  if (innerError) throw innerResult;
                  anObject(innerResult);
                  return value;
                };
              }
            ),
            /***/
            2994: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var wellKnownSymbol = __webpack_require__2(9489);
                var TO_STRING_TAG = wellKnownSymbol("toStringTag");
                var test = {};
                test[TO_STRING_TAG] = "z";
                module2.exports = String(test) === "[object z]";
              }
            ),
            /***/
            3326: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var uncurryThis = __webpack_require__2(8026);
                var toString = uncurryThis({}.toString);
                var stringSlice = uncurryThis("".slice);
                module2.exports = function(it) {
                  return stringSlice(toString(it), 8, -1);
                };
              }
            ),
            /***/
            3351: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var store = __webpack_require__2(7159);
                module2.exports = function(key, value) {
                  return store[key] || (store[key] = value || {});
                };
              }
            ),
            /***/
            3418: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var classofRaw = __webpack_require__2(3326);
                var uncurryThis = __webpack_require__2(8026);
                module2.exports = function(fn) {
                  if (classofRaw(fn) === "Function") return uncurryThis(fn);
                };
              }
            ),
            /***/
            3556: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var uncurryThis = __webpack_require__2(8026);
                var isCallable = __webpack_require__2(4827);
                var store = __webpack_require__2(7159);
                var functionToString = uncurryThis(Function.toString);
                if (!isCallable(store.inspectSource)) {
                  store.inspectSource = function(it) {
                    return functionToString(it);
                  };
                }
                module2.exports = store.inspectSource;
              }
            ),
            /***/
            3603: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var NATIVE_WEAK_MAP = __webpack_require__2(8164);
                var globalThis2 = __webpack_require__2(2506);
                var isObject2 = __webpack_require__2(392);
                var createNonEnumerableProperty = __webpack_require__2(7325);
                var hasOwn = __webpack_require__2(9883);
                var shared = __webpack_require__2(7159);
                var sharedKey = __webpack_require__2(7121);
                var hiddenKeys = __webpack_require__2(6755);
                var OBJECT_ALREADY_INITIALIZED = "Object already initialized";
                var TypeError2 = globalThis2.TypeError;
                var WeakMap2 = globalThis2.WeakMap;
                var set, get, has;
                var enforce = function(it) {
                  return has(it) ? get(it) : set(it, {});
                };
                var getterFor = function(TYPE) {
                  return function(it) {
                    var state;
                    if (!isObject2(it) || (state = get(it)).type !== TYPE) {
                      throw new TypeError2("Incompatible receiver, " + TYPE + " required");
                    }
                    return state;
                  };
                };
                if (NATIVE_WEAK_MAP || shared.state) {
                  var store = shared.state || (shared.state = new WeakMap2());
                  store.get = store.get;
                  store.has = store.has;
                  store.set = store.set;
                  set = function(it, metadata) {
                    if (store.has(it)) throw new TypeError2(OBJECT_ALREADY_INITIALIZED);
                    metadata.facade = it;
                    store.set(it, metadata);
                    return metadata;
                  };
                  get = function(it) {
                    return store.get(it) || {};
                  };
                  has = function(it) {
                    return store.has(it);
                  };
                } else {
                  var STATE = sharedKey("state");
                  hiddenKeys[STATE] = true;
                  set = function(it, metadata) {
                    if (hasOwn(it, STATE)) throw new TypeError2(OBJECT_ALREADY_INITIALIZED);
                    metadata.facade = it;
                    createNonEnumerableProperty(it, STATE, metadata);
                    return metadata;
                  };
                  get = function(it) {
                    return hasOwn(it, STATE) ? it[STATE] : {};
                  };
                  has = function(it) {
                    return hasOwn(it, STATE);
                  };
                }
                module2.exports = {
                  set,
                  get,
                  has,
                  enforce,
                  getterFor
                };
              }
            ),
            /***/
            3645: (
              /***/
              function(module2) {
                "use strict";
                module2.exports = function(cssWithMappingToString) {
                  var list = [];
                  list.toString = function toString() {
                    return this.map(function(item) {
                      var content = "";
                      var needLayer = typeof item[5] !== "undefined";
                      if (item[4]) {
                        content += "@supports (".concat(item[4], ") {");
                      }
                      if (item[2]) {
                        content += "@media ".concat(item[2], " {");
                      }
                      if (needLayer) {
                        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
                      }
                      content += cssWithMappingToString(item);
                      if (needLayer) {
                        content += "}";
                      }
                      if (item[2]) {
                        content += "}";
                      }
                      if (item[4]) {
                        content += "}";
                      }
                      return content;
                    }).join("");
                  };
                  list.i = function i(modules, media, dedupe, supports, layer) {
                    if (typeof modules === "string") {
                      modules = [[null, modules, void 0]];
                    }
                    var alreadyImportedModules = {};
                    if (dedupe) {
                      for (var k = 0; k < this.length; k++) {
                        var id = this[k][0];
                        if (id != null) {
                          alreadyImportedModules[id] = true;
                        }
                      }
                    }
                    for (var _k = 0; _k < modules.length; _k++) {
                      var item = [].concat(modules[_k]);
                      if (dedupe && alreadyImportedModules[item[0]]) {
                        continue;
                      }
                      if (typeof layer !== "undefined") {
                        if (typeof item[5] === "undefined") {
                          item[5] = layer;
                        } else {
                          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
                          item[5] = layer;
                        }
                      }
                      if (media) {
                        if (!item[2]) {
                          item[2] = media;
                        } else {
                          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
                          item[2] = media;
                        }
                      }
                      if (supports) {
                        if (!item[4]) {
                          item[4] = "".concat(supports);
                        } else {
                          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
                          item[4] = supports;
                        }
                      }
                      list.push(item);
                    }
                  };
                  return list;
                };
              }
            ),
            /***/
            4219: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var toIndexedObject = __webpack_require__2(7599);
                var toAbsoluteIndex = __webpack_require__2(9376);
                var lengthOfArrayLike = __webpack_require__2(7184);
                var createMethod = function(IS_INCLUDES) {
                  return function($this, el, fromIndex) {
                    var O = toIndexedObject($this);
                    var length = lengthOfArrayLike(O);
                    if (length === 0) return !IS_INCLUDES && -1;
                    var index = toAbsoluteIndex(fromIndex, length);
                    var value;
                    if (IS_INCLUDES && el !== el) while (length > index) {
                      value = O[index++];
                      if (value !== value) return true;
                    }
                    else for (; length > index; index++) {
                      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
                    }
                    return !IS_INCLUDES && -1;
                  };
                };
                module2.exports = {
                  // `Array.prototype.includes` method
                  // https://tc39.es/ecma262/#sec-array.prototype.includes
                  includes: createMethod(true),
                  // `Array.prototype.indexOf` method
                  // https://tc39.es/ecma262/#sec-array.prototype.indexof
                  indexOf: createMethod(false)
                };
              }
            ),
            /***/
            4233: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var uncurryThis = __webpack_require__2(8026);
                var fails = __webpack_require__2(7737);
                var classof = __webpack_require__2(3326);
                var $Object = Object;
                var split = uncurryThis("".split);
                module2.exports = fails(function() {
                  return !$Object("z").propertyIsEnumerable(0);
                }) ? function(it) {
                  return classof(it) === "String" ? split(it, "") : $Object(it);
                } : $Object;
              }
            ),
            /***/
            4235: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var NATIVE_BIND = __webpack_require__2(2642);
                var FunctionPrototype = Function.prototype;
                var apply = FunctionPrototype.apply;
                var call = FunctionPrototype.call;
                module2.exports = typeof Reflect == "object" && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function() {
                  return call.apply(apply, arguments);
                });
              }
            ),
            /***/
            4278: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                var content = __webpack_require__2(5437);
                if (content.__esModule) content = content.default;
                if (typeof content === "string") content = [[module2.id, content, ""]];
                if (content.locals) module2.exports = content.locals;
                var add = __webpack_require__2(9405).A;
                var update = add("41faf491", content, true, { "sourceMap": false, "shadowMode": false });
              }
            ),
            /***/
            4314: (
              /***/
              function(module2) {
                "use strict";
                module2.exports = function(bitmap, value) {
                  return {
                    enumerable: !(bitmap & 1),
                    configurable: !(bitmap & 2),
                    writable: !(bitmap & 4),
                    value
                  };
                };
              }
            ),
            /***/
            4322: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var uncurryThis = __webpack_require__2(3418);
                var aCallable = __webpack_require__2(1832);
                var NATIVE_BIND = __webpack_require__2(2642);
                var bind = uncurryThis(uncurryThis.bind);
                module2.exports = function(fn, that) {
                  aCallable(fn);
                  return that === void 0 ? fn : NATIVE_BIND ? bind(fn, that) : function() {
                    return fn.apply(that, arguments);
                  };
                };
              }
            ),
            /***/
            4346: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var fails = __webpack_require__2(7737);
                var isCallable = __webpack_require__2(4827);
                var replacement = /#|\.prototype\./;
                var isForced = function(feature, detection) {
                  var value = data[normalize(feature)];
                  return value === POLYFILL ? true : value === NATIVE ? false : isCallable(detection) ? fails(detection) : !!detection;
                };
                var normalize = isForced.normalize = function(string) {
                  return String(string).replace(replacement, ".").toLowerCase();
                };
                var data = isForced.data = {};
                var NATIVE = isForced.NATIVE = "N";
                var POLYFILL = isForced.POLYFILL = "P";
                module2.exports = isForced;
              }
            ),
            /***/
            4440: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var DESCRIPTORS = __webpack_require__2(6846);
                var fails = __webpack_require__2(7737);
                module2.exports = DESCRIPTORS && fails(function() {
                  return Object.defineProperty(function() {
                  }, "prototype", {
                    value: 42,
                    writable: false
                  }).prototype !== 42;
                });
              }
            ),
            /***/
            4631: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var DESCRIPTORS = __webpack_require__2(6846);
                var fails = __webpack_require__2(7737);
                var createElement = __webpack_require__2(8089);
                module2.exports = !DESCRIPTORS && !fails(function() {
                  return Object.defineProperty(createElement("div"), "a", {
                    get: function() {
                      return 7;
                    }
                  }).a !== 7;
                });
              }
            ),
            /***/
            4827: (
              /***/
              function(module2) {
                "use strict";
                var documentAll = typeof document == "object" && document.all;
                module2.exports = typeof documentAll == "undefined" && documentAll !== void 0 ? function(argument) {
                  return typeof argument == "function" || argument === documentAll;
                } : function(argument) {
                  return typeof argument == "function";
                };
              }
            ),
            /***/
            4929: (
              /***/
              function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var $ = __webpack_require__2(7508);
                var call = __webpack_require__2(6671);
                var iterate = __webpack_require__2(9282);
                var aCallable = __webpack_require__2(1832);
                var anObject = __webpack_require__2(8485);
                var getIteratorDirect = __webpack_require__2(9065);
                var iteratorClose = __webpack_require__2(2817);
                var iteratorHelperWithoutClosingOnEarlyError = __webpack_require__2(1027);
                var someWithoutClosingOnEarlyError = iteratorHelperWithoutClosingOnEarlyError("some", TypeError);
                $({ target: "Iterator", proto: true, real: true, forced: someWithoutClosingOnEarlyError }, {
                  some: function some(predicate) {
                    anObject(this);
                    try {
                      aCallable(predicate);
                    } catch (error) {
                      iteratorClose(this, "throw", error);
                    }
                    if (someWithoutClosingOnEarlyError) return call(someWithoutClosingOnEarlyError, this, predicate);
                    var record = getIteratorDirect(this);
                    var counter = 0;
                    return iterate(record, function(value, stop) {
                      if (predicate(value, counter++)) return stop();
                    }, { IS_RECORD: true, INTERRUPTED: true }).stopped;
                  }
                });
              }
            ),
            /***/
            5096: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var makeBuiltIn = __webpack_require__2(8425);
                var defineProperty = __webpack_require__2(8043);
                module2.exports = function(target, name, descriptor) {
                  if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
                  if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
                  return defineProperty.f(target, name, descriptor);
                };
              }
            ),
            /***/
            5327: (
              /***/
              function(module2) {
                "use strict";
                module2.exports = function(it) {
                  return it === null || it === void 0;
                };
              }
            ),
            /***/
            5437: (
              /***/
              function(module2, __webpack_exports__2, __webpack_require__2) {
                "use strict";
                __webpack_require__2.r(__webpack_exports__2);
                var _node_modules_pnpm_css_loader_6_11_0_webpack_5_99_9_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__2(5556);
                var _node_modules_pnpm_css_loader_6_11_0_webpack_5_99_9_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__2.n(_node_modules_pnpm_css_loader_6_11_0_webpack_5_99_9_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
                var _node_modules_pnpm_css_loader_6_11_0_webpack_5_99_9_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__2(3645);
                var _node_modules_pnpm_css_loader_6_11_0_webpack_5_99_9_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__2.n(_node_modules_pnpm_css_loader_6_11_0_webpack_5_99_9_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
                var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_6_11_0_webpack_5_99_9_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(_node_modules_pnpm_css_loader_6_11_0_webpack_5_99_9_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());
                ___CSS_LOADER_EXPORT___.push([module2.id, ".veRAata14yUDKryyKRCo :deep(.O_d11asr8hQ1g66gzmWL>*){width:100%}.veRAata14yUDKryyKRCo .el-form-item__content>*{width:100%}.xIGng_BkAEIrdSKhT6Mk{width:100%;padding:0 24px 24px}.wJ1DWtVyQVFBxTWKq4fg{border:1px solid #dcdfe6;padding:12px 0;margin-bottom:12px;border-radius:8px;position:relative}.e5gXkUeF9cAERvYMTnrF{position:absolute;right:8px;bottom:8px}", ""]);
                ___CSS_LOADER_EXPORT___.locals = {
                  "form-item": "veRAata14yUDKryyKRCo",
                  "el-form-item__content": "O_d11asr8hQ1g66gzmWL",
                  "groupRow": "xIGng_BkAEIrdSKhT6Mk",
                  "border": "wJ1DWtVyQVFBxTWKq4fg",
                  "operate": "e5gXkUeF9cAERvYMTnrF"
                };
                __webpack_exports__2["default"] = ___CSS_LOADER_EXPORT___;
              }
            ),
            /***/
            5556: (
              /***/
              function(module2) {
                "use strict";
                module2.exports = function(i) {
                  return i[1];
                };
              }
            ),
            /***/
            5712: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var DESCRIPTORS = __webpack_require__2(6846);
                var hasOwn = __webpack_require__2(9883);
                var FunctionPrototype = Function.prototype;
                var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;
                var EXISTS = hasOwn(FunctionPrototype, "name");
                var PROPER = EXISTS && (function something() {
                }).name === "something";
                var CONFIGURABLE = EXISTS && (!DESCRIPTORS || DESCRIPTORS && getDescriptor(FunctionPrototype, "name").configurable);
                module2.exports = {
                  EXISTS,
                  PROPER,
                  CONFIGURABLE
                };
              }
            ),
            /***/
            5799: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var call = __webpack_require__2(6671);
                var aCallable = __webpack_require__2(1832);
                var anObject = __webpack_require__2(8485);
                var tryToString = __webpack_require__2(217);
                var getIteratorMethod = __webpack_require__2(7561);
                var $TypeError = TypeError;
                module2.exports = function(argument, usingIterator) {
                  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
                  if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
                  throw new $TypeError(tryToString(argument) + " is not iterable");
                };
              }
            ),
            /***/
            5807: (
              /***/
              function(module2, exports2, __webpack_require__2) {
                module2 = __webpack_require__2.nmd(module2);
                __webpack_require__2(1484);
                __webpack_require__2(6961);
                __webpack_require__2(9370);
                __webpack_require__2(2807);
                var LARGE_ARRAY_SIZE = 200;
                var HASH_UNDEFINED = "__lodash_hash_undefined__";
                var MAX_SAFE_INTEGER = 9007199254740991;
                var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", promiseTag = "[object Promise]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", weakMapTag = "[object WeakMap]";
                var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
                var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
                var reFlags = /\w*$/;
                var reIsHostCtor = /^\[object .+?Constructor\]$/;
                var reIsUint = /^(?:0|[1-9]\d*)$/;
                var cloneableTags = {};
                cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
                cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
                var freeGlobal = typeof __webpack_require__2.g == "object" && __webpack_require__2.g && __webpack_require__2.g.Object === Object && __webpack_require__2.g;
                var freeSelf = typeof self == "object" && self && self.Object === Object && self;
                var root = freeGlobal || freeSelf || Function("return this")();
                var freeExports = exports2 && !exports2.nodeType && exports2;
                var freeModule = freeExports && true && module2 && !module2.nodeType && module2;
                var moduleExports = freeModule && freeModule.exports === freeExports;
                function addMapEntry(map, pair) {
                  map.set(pair[0], pair[1]);
                  return map;
                }
                function addSetEntry(set, value) {
                  set.add(value);
                  return set;
                }
                function arrayEach(array, iteratee) {
                  var index = -1, length = array ? array.length : 0;
                  while (++index < length) {
                    if (iteratee(array[index], index, array) === false) {
                      break;
                    }
                  }
                  return array;
                }
                function arrayPush(array, values) {
                  var index = -1, length = values.length, offset = array.length;
                  while (++index < length) {
                    array[offset + index] = values[index];
                  }
                  return array;
                }
                function arrayReduce(array, iteratee, accumulator, initAccum) {
                  var index = -1, length = array ? array.length : 0;
                  if (initAccum && length) {
                    accumulator = array[++index];
                  }
                  while (++index < length) {
                    accumulator = iteratee(accumulator, array[index], index, array);
                  }
                  return accumulator;
                }
                function baseTimes(n, iteratee) {
                  var index = -1, result = Array(n);
                  while (++index < n) {
                    result[index] = iteratee(index);
                  }
                  return result;
                }
                function getValue(object, key) {
                  return object == null ? void 0 : object[key];
                }
                function isHostObject(value) {
                  var result = false;
                  if (value != null && typeof value.toString != "function") {
                    try {
                      result = !!(value + "");
                    } catch (e) {
                    }
                  }
                  return result;
                }
                function mapToArray(map) {
                  var index = -1, result = Array(map.size);
                  map.forEach(function(value, key) {
                    result[++index] = [key, value];
                  });
                  return result;
                }
                function overArg(func, transform2) {
                  return function(arg) {
                    return func(transform2(arg));
                  };
                }
                function setToArray(set) {
                  var index = -1, result = Array(set.size);
                  set.forEach(function(value) {
                    result[++index] = value;
                  });
                  return result;
                }
                var arrayProto = Array.prototype, funcProto = Function.prototype, objectProto = Object.prototype;
                var coreJsData = root["__core-js_shared__"];
                var maskSrcKey = function() {
                  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
                  return uid ? "Symbol(src)_1." + uid : "";
                }();
                var funcToString = funcProto.toString;
                var hasOwnProperty = objectProto.hasOwnProperty;
                var objectToString = objectProto.toString;
                var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
                var Buffer = moduleExports ? root.Buffer : void 0, Symbol2 = root.Symbol, Uint8Array2 = root.Uint8Array, getPrototype = overArg(Object.getPrototypeOf, Object), objectCreate = Object.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice;
                var nativeGetSymbols = Object.getOwnPropertySymbols, nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0, nativeKeys = overArg(Object.keys, Object);
                var DataView = getNative(root, "DataView"), Map2 = getNative(root, "Map"), Promise2 = getNative(root, "Promise"), Set2 = getNative(root, "Set"), WeakMap2 = getNative(root, "WeakMap"), nativeCreate = getNative(Object, "create");
                var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map2), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set2), weakMapCtorString = toSource(WeakMap2);
                var symbolProto = Symbol2 ? Symbol2.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
                function Hash(entries) {
                  var index = -1, length = entries ? entries.length : 0;
                  this.clear();
                  while (++index < length) {
                    var entry = entries[index];
                    this.set(entry[0], entry[1]);
                  }
                }
                function hashClear() {
                  this.__data__ = nativeCreate ? nativeCreate(null) : {};
                }
                function hashDelete(key) {
                  return this.has(key) && delete this.__data__[key];
                }
                function hashGet(key) {
                  var data = this.__data__;
                  if (nativeCreate) {
                    var result = data[key];
                    return result === HASH_UNDEFINED ? void 0 : result;
                  }
                  return hasOwnProperty.call(data, key) ? data[key] : void 0;
                }
                function hashHas(key) {
                  var data = this.__data__;
                  return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
                }
                function hashSet(key, value) {
                  var data = this.__data__;
                  data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
                  return this;
                }
                Hash.prototype.clear = hashClear;
                Hash.prototype["delete"] = hashDelete;
                Hash.prototype.get = hashGet;
                Hash.prototype.has = hashHas;
                Hash.prototype.set = hashSet;
                function ListCache(entries) {
                  var index = -1, length = entries ? entries.length : 0;
                  this.clear();
                  while (++index < length) {
                    var entry = entries[index];
                    this.set(entry[0], entry[1]);
                  }
                }
                function listCacheClear() {
                  this.__data__ = [];
                }
                function listCacheDelete(key) {
                  var data = this.__data__, index = assocIndexOf(data, key);
                  if (index < 0) {
                    return false;
                  }
                  var lastIndex = data.length - 1;
                  if (index == lastIndex) {
                    data.pop();
                  } else {
                    splice.call(data, index, 1);
                  }
                  return true;
                }
                function listCacheGet(key) {
                  var data = this.__data__, index = assocIndexOf(data, key);
                  return index < 0 ? void 0 : data[index][1];
                }
                function listCacheHas(key) {
                  return assocIndexOf(this.__data__, key) > -1;
                }
                function listCacheSet(key, value) {
                  var data = this.__data__, index = assocIndexOf(data, key);
                  if (index < 0) {
                    data.push([key, value]);
                  } else {
                    data[index][1] = value;
                  }
                  return this;
                }
                ListCache.prototype.clear = listCacheClear;
                ListCache.prototype["delete"] = listCacheDelete;
                ListCache.prototype.get = listCacheGet;
                ListCache.prototype.has = listCacheHas;
                ListCache.prototype.set = listCacheSet;
                function MapCache(entries) {
                  var index = -1, length = entries ? entries.length : 0;
                  this.clear();
                  while (++index < length) {
                    var entry = entries[index];
                    this.set(entry[0], entry[1]);
                  }
                }
                function mapCacheClear() {
                  this.__data__ = {
                    "hash": new Hash(),
                    "map": new (Map2 || ListCache)(),
                    "string": new Hash()
                  };
                }
                function mapCacheDelete(key) {
                  return getMapData(this, key)["delete"](key);
                }
                function mapCacheGet(key) {
                  return getMapData(this, key).get(key);
                }
                function mapCacheHas(key) {
                  return getMapData(this, key).has(key);
                }
                function mapCacheSet(key, value) {
                  getMapData(this, key).set(key, value);
                  return this;
                }
                MapCache.prototype.clear = mapCacheClear;
                MapCache.prototype["delete"] = mapCacheDelete;
                MapCache.prototype.get = mapCacheGet;
                MapCache.prototype.has = mapCacheHas;
                MapCache.prototype.set = mapCacheSet;
                function Stack(entries) {
                  this.__data__ = new ListCache(entries);
                }
                function stackClear() {
                  this.__data__ = new ListCache();
                }
                function stackDelete(key) {
                  return this.__data__["delete"](key);
                }
                function stackGet(key) {
                  return this.__data__.get(key);
                }
                function stackHas(key) {
                  return this.__data__.has(key);
                }
                function stackSet(key, value) {
                  var cache = this.__data__;
                  if (cache instanceof ListCache) {
                    var pairs = cache.__data__;
                    if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
                      pairs.push([key, value]);
                      return this;
                    }
                    cache = this.__data__ = new MapCache(pairs);
                  }
                  cache.set(key, value);
                  return this;
                }
                Stack.prototype.clear = stackClear;
                Stack.prototype["delete"] = stackDelete;
                Stack.prototype.get = stackGet;
                Stack.prototype.has = stackHas;
                Stack.prototype.set = stackSet;
                function arrayLikeKeys(value, inherited) {
                  var result = isArray2(value) || isArguments(value) ? baseTimes(value.length, String) : [];
                  var length = result.length, skipIndexes = !!length;
                  for (var key in value) {
                    if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isIndex(key, length)))) {
                      result.push(key);
                    }
                  }
                  return result;
                }
                function assignValue(object, key, value) {
                  var objValue = object[key];
                  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
                    object[key] = value;
                  }
                }
                function assocIndexOf(array, key) {
                  var length = array.length;
                  while (length--) {
                    if (eq(array[length][0], key)) {
                      return length;
                    }
                  }
                  return -1;
                }
                function baseAssign(object, source) {
                  return object && copyObject(source, keys(source), object);
                }
                function baseClone(value, isDeep, isFull, customizer, key, object, stack2) {
                  var result;
                  if (customizer) {
                    result = object ? customizer(value, key, object, stack2) : customizer(value);
                  }
                  if (result !== void 0) {
                    return result;
                  }
                  if (!isObject2(value)) {
                    return value;
                  }
                  var isArr = isArray2(value);
                  if (isArr) {
                    result = initCloneArray(value);
                    if (!isDeep) {
                      return copyArray(value, result);
                    }
                  } else {
                    var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
                    if (isBuffer(value)) {
                      return cloneBuffer(value, isDeep);
                    }
                    if (tag == objectTag || tag == argsTag || isFunc && !object) {
                      if (isHostObject(value)) {
                        return object ? value : {};
                      }
                      result = initCloneObject(isFunc ? {} : value);
                      if (!isDeep) {
                        return copySymbols(value, baseAssign(result, value));
                      }
                    } else {
                      if (!cloneableTags[tag]) {
                        return object ? value : {};
                      }
                      result = initCloneByTag(value, tag, baseClone, isDeep);
                    }
                  }
                  stack2 || (stack2 = new Stack());
                  var stacked = stack2.get(value);
                  if (stacked) {
                    return stacked;
                  }
                  stack2.set(value, result);
                  if (!isArr) {
                    var props = isFull ? getAllKeys(value) : keys(value);
                  }
                  arrayEach(props || value, function(subValue, key2) {
                    if (props) {
                      key2 = subValue;
                      subValue = value[key2];
                    }
                    assignValue(result, key2, baseClone(subValue, isDeep, isFull, customizer, key2, value, stack2));
                  });
                  return result;
                }
                function baseCreate(proto) {
                  return isObject2(proto) ? objectCreate(proto) : {};
                }
                function baseGetAllKeys(object, keysFunc, symbolsFunc) {
                  var result = keysFunc(object);
                  return isArray2(object) ? result : arrayPush(result, symbolsFunc(object));
                }
                function baseGetTag(value) {
                  return objectToString.call(value);
                }
                function baseIsNative(value) {
                  if (!isObject2(value) || isMasked(value)) {
                    return false;
                  }
                  var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
                  return pattern.test(toSource(value));
                }
                function baseKeys(object) {
                  if (!isPrototype(object)) {
                    return nativeKeys(object);
                  }
                  var result = [];
                  for (var key in Object(object)) {
                    if (hasOwnProperty.call(object, key) && key != "constructor") {
                      result.push(key);
                    }
                  }
                  return result;
                }
                function cloneBuffer(buffer, isDeep) {
                  if (isDeep) {
                    return buffer.slice();
                  }
                  var result = new buffer.constructor(buffer.length);
                  buffer.copy(result);
                  return result;
                }
                function cloneArrayBuffer(arrayBuffer) {
                  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
                  new Uint8Array2(result).set(new Uint8Array2(arrayBuffer));
                  return result;
                }
                function cloneDataView(dataView, isDeep) {
                  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
                  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
                }
                function cloneMap(map, isDeep, cloneFunc) {
                  var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
                  return arrayReduce(array, addMapEntry, new map.constructor());
                }
                function cloneRegExp(regexp) {
                  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
                  result.lastIndex = regexp.lastIndex;
                  return result;
                }
                function cloneSet(set, isDeep, cloneFunc) {
                  var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
                  return arrayReduce(array, addSetEntry, new set.constructor());
                }
                function cloneSymbol(symbol) {
                  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
                }
                function cloneTypedArray(typedArray, isDeep) {
                  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
                  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
                }
                function copyArray(source, array) {
                  var index = -1, length = source.length;
                  array || (array = Array(length));
                  while (++index < length) {
                    array[index] = source[index];
                  }
                  return array;
                }
                function copyObject(source, props, object, customizer) {
                  object || (object = {});
                  var index = -1, length = props.length;
                  while (++index < length) {
                    var key = props[index];
                    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
                    assignValue(object, key, newValue === void 0 ? source[key] : newValue);
                  }
                  return object;
                }
                function copySymbols(source, object) {
                  return copyObject(source, getSymbols(source), object);
                }
                function getAllKeys(object) {
                  return baseGetAllKeys(object, keys, getSymbols);
                }
                function getMapData(map, key) {
                  var data = map.__data__;
                  return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
                }
                function getNative(object, key) {
                  var value = getValue(object, key);
                  return baseIsNative(value) ? value : void 0;
                }
                var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;
                var getTag = baseGetTag;
                if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap2 && getTag(new WeakMap2()) != weakMapTag) {
                  getTag = function(value) {
                    var result = objectToString.call(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : void 0;
                    if (ctorString) {
                      switch (ctorString) {
                        case dataViewCtorString:
                          return dataViewTag;
                        case mapCtorString:
                          return mapTag;
                        case promiseCtorString:
                          return promiseTag;
                        case setCtorString:
                          return setTag;
                        case weakMapCtorString:
                          return weakMapTag;
                      }
                    }
                    return result;
                  };
                }
                function initCloneArray(array) {
                  var length = array.length, result = array.constructor(length);
                  if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
                    result.index = array.index;
                    result.input = array.input;
                  }
                  return result;
                }
                function initCloneObject(object) {
                  return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
                }
                function initCloneByTag(object, tag, cloneFunc, isDeep) {
                  var Ctor = object.constructor;
                  switch (tag) {
                    case arrayBufferTag:
                      return cloneArrayBuffer(object);
                    case boolTag:
                    case dateTag:
                      return new Ctor(+object);
                    case dataViewTag:
                      return cloneDataView(object, isDeep);
                    case float32Tag:
                    case float64Tag:
                    case int8Tag:
                    case int16Tag:
                    case int32Tag:
                    case uint8Tag:
                    case uint8ClampedTag:
                    case uint16Tag:
                    case uint32Tag:
                      return cloneTypedArray(object, isDeep);
                    case mapTag:
                      return cloneMap(object, isDeep, cloneFunc);
                    case numberTag:
                    case stringTag:
                      return new Ctor(object);
                    case regexpTag:
                      return cloneRegExp(object);
                    case setTag:
                      return cloneSet(object, isDeep, cloneFunc);
                    case symbolTag:
                      return cloneSymbol(object);
                  }
                }
                function isIndex(value, length) {
                  length = length == null ? MAX_SAFE_INTEGER : length;
                  return !!length && (typeof value == "number" || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
                }
                function isKeyable(value) {
                  var type = typeof value;
                  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
                }
                function isMasked(func) {
                  return !!maskSrcKey && maskSrcKey in func;
                }
                function isPrototype(value) {
                  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
                  return value === proto;
                }
                function toSource(func) {
                  if (func != null) {
                    try {
                      return funcToString.call(func);
                    } catch (e) {
                    }
                    try {
                      return func + "";
                    } catch (e) {
                    }
                  }
                  return "";
                }
                function cloneDeepWith(value, customizer) {
                  return baseClone(value, true, true, customizer);
                }
                function eq(value, other) {
                  return value === other || value !== value && other !== other;
                }
                function isArguments(value) {
                  return isArrayLikeObject(value) && hasOwnProperty.call(value, "callee") && (!propertyIsEnumerable.call(value, "callee") || objectToString.call(value) == argsTag);
                }
                var isArray2 = Array.isArray;
                function isArrayLike(value) {
                  return value != null && isLength(value.length) && !isFunction(value);
                }
                function isArrayLikeObject(value) {
                  return isObjectLike(value) && isArrayLike(value);
                }
                var isBuffer = nativeIsBuffer || stubFalse;
                function isFunction(value) {
                  var tag = isObject2(value) ? objectToString.call(value) : "";
                  return tag == funcTag || tag == genTag;
                }
                function isLength(value) {
                  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
                }
                function isObject2(value) {
                  var type = typeof value;
                  return !!value && (type == "object" || type == "function");
                }
                function isObjectLike(value) {
                  return !!value && typeof value == "object";
                }
                function keys(object) {
                  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
                }
                function stubArray() {
                  return [];
                }
                function stubFalse() {
                  return false;
                }
                module2.exports = cloneDeepWith;
              }
            ),
            /***/
            6077: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var V8_VERSION = __webpack_require__2(413);
                var fails = __webpack_require__2(7737);
                var globalThis2 = __webpack_require__2(2506);
                var $String = globalThis2.String;
                module2.exports = !!Object.getOwnPropertySymbols && !fails(function() {
                  var symbol = Symbol("symbol detection");
                  return !$String(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
                  !Symbol.sham && V8_VERSION && V8_VERSION < 41;
                });
              }
            ),
            /***/
            6101: (
              /***/
              function(module2) {
                "use strict";
                module2.exports = false;
              }
            ),
            /***/
            6134: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var hasOwn = __webpack_require__2(9883);
                var ownKeys = __webpack_require__2(1481);
                var getOwnPropertyDescriptorModule = __webpack_require__2(625);
                var definePropertyModule = __webpack_require__2(8043);
                module2.exports = function(target, source, exceptions) {
                  var keys = ownKeys(source);
                  var defineProperty = definePropertyModule.f;
                  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
                  for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
                      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
                    }
                  }
                };
              }
            ),
            /***/
            6156: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var call = __webpack_require__2(6671);
                var isCallable = __webpack_require__2(4827);
                var isObject2 = __webpack_require__2(392);
                var $TypeError = TypeError;
                module2.exports = function(input, pref) {
                  var fn, val;
                  if (pref === "string" && isCallable(fn = input.toString) && !isObject2(val = call(fn, input))) return val;
                  if (isCallable(fn = input.valueOf) && !isObject2(val = call(fn, input))) return val;
                  if (pref !== "string" && isCallable(fn = input.toString) && !isObject2(val = call(fn, input))) return val;
                  throw new $TypeError("Can't convert object to primitive value");
                };
              }
            ),
            /***/
            6399: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var uncurryThis = __webpack_require__2(8026);
                module2.exports = uncurryThis({}.isPrototypeOf);
              }
            ),
            /***/
            6671: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var NATIVE_BIND = __webpack_require__2(2642);
                var call = Function.prototype.call;
                module2.exports = NATIVE_BIND ? call.bind(call) : function() {
                  return call.apply(call, arguments);
                };
              }
            ),
            /***/
            6721: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var fails = __webpack_require__2(7737);
                module2.exports = !fails(function() {
                  function F() {
                  }
                  F.prototype.constructor = null;
                  return Object.getPrototypeOf(new F()) !== F.prototype;
                });
              }
            ),
            /***/
            6755: (
              /***/
              function(module2) {
                "use strict";
                module2.exports = {};
              }
            ),
            /***/
            6846: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var fails = __webpack_require__2(7737);
                module2.exports = !fails(function() {
                  return Object.defineProperty({}, 1, { get: function() {
                    return 7;
                  } })[1] !== 7;
                });
              }
            ),
            /***/
            6961: (
              /***/
              function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var $ = __webpack_require__2(7508);
                var globalThis2 = __webpack_require__2(2506);
                var anInstance = __webpack_require__2(8133);
                var anObject = __webpack_require__2(8485);
                var isCallable = __webpack_require__2(4827);
                var getPrototypeOf = __webpack_require__2(221);
                var defineBuiltInAccessor = __webpack_require__2(5096);
                var createProperty = __webpack_require__2(302);
                var fails = __webpack_require__2(7737);
                var hasOwn = __webpack_require__2(9883);
                var wellKnownSymbol = __webpack_require__2(9489);
                var IteratorPrototype = __webpack_require__2(7371).IteratorPrototype;
                var DESCRIPTORS = __webpack_require__2(6846);
                var IS_PURE = __webpack_require__2(6101);
                var CONSTRUCTOR = "constructor";
                var ITERATOR = "Iterator";
                var TO_STRING_TAG = wellKnownSymbol("toStringTag");
                var $TypeError = TypeError;
                var NativeIterator = globalThis2[ITERATOR];
                var FORCED = IS_PURE || !isCallable(NativeIterator) || NativeIterator.prototype !== IteratorPrototype || !fails(function() {
                  NativeIterator({});
                });
                var IteratorConstructor = function Iterator() {
                  anInstance(this, IteratorPrototype);
                  if (getPrototypeOf(this) === IteratorPrototype) throw new $TypeError("Abstract class Iterator not directly constructable");
                };
                var defineIteratorPrototypeAccessor = function(key, value) {
                  if (DESCRIPTORS) {
                    defineBuiltInAccessor(IteratorPrototype, key, {
                      configurable: true,
                      get: function() {
                        return value;
                      },
                      set: function(replacement) {
                        anObject(this);
                        if (this === IteratorPrototype) throw new $TypeError("You can't redefine this property");
                        if (hasOwn(this, key)) this[key] = replacement;
                        else createProperty(this, key, replacement);
                      }
                    });
                  } else IteratorPrototype[key] = value;
                };
                if (!hasOwn(IteratorPrototype, TO_STRING_TAG)) defineIteratorPrototypeAccessor(TO_STRING_TAG, ITERATOR);
                if (FORCED || !hasOwn(IteratorPrototype, CONSTRUCTOR) || IteratorPrototype[CONSTRUCTOR] === Object) {
                  defineIteratorPrototypeAccessor(CONSTRUCTOR, IteratorConstructor);
                }
                IteratorConstructor.prototype = IteratorPrototype;
                $({ global: true, constructor: true, forced: FORCED }, {
                  Iterator: IteratorConstructor
                });
              }
            ),
            /***/
            6964: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var call = __webpack_require__2(6671);
                var create = __webpack_require__2(8362);
                var createNonEnumerableProperty = __webpack_require__2(7325);
                var defineBuiltIns = __webpack_require__2(489);
                var wellKnownSymbol = __webpack_require__2(9489);
                var InternalStateModule = __webpack_require__2(3603);
                var getMethod = __webpack_require__2(7604);
                var IteratorPrototype = __webpack_require__2(7371).IteratorPrototype;
                var createIterResultObject = __webpack_require__2(575);
                var iteratorClose = __webpack_require__2(2817);
                var TO_STRING_TAG = wellKnownSymbol("toStringTag");
                var ITERATOR_HELPER = "IteratorHelper";
                var WRAP_FOR_VALID_ITERATOR = "WrapForValidIterator";
                var setInternalState = InternalStateModule.set;
                var createIteratorProxyPrototype = function(IS_ITERATOR) {
                  var getInternalState = InternalStateModule.getterFor(IS_ITERATOR ? WRAP_FOR_VALID_ITERATOR : ITERATOR_HELPER);
                  return defineBuiltIns(create(IteratorPrototype), {
                    next: function next() {
                      var state = getInternalState(this);
                      if (IS_ITERATOR) return state.nextHandler();
                      if (state.done) return createIterResultObject(void 0, true);
                      try {
                        var result = state.nextHandler();
                        return state.returnHandlerResult ? result : createIterResultObject(result, state.done);
                      } catch (error) {
                        state.done = true;
                        throw error;
                      }
                    },
                    "return": function() {
                      var state = getInternalState(this);
                      var iterator = state.iterator;
                      state.done = true;
                      if (IS_ITERATOR) {
                        var returnMethod = getMethod(iterator, "return");
                        return returnMethod ? call(returnMethod, iterator) : createIterResultObject(void 0, true);
                      }
                      if (state.inner) try {
                        iteratorClose(state.inner.iterator, "normal");
                      } catch (error) {
                        return iteratorClose(iterator, "throw", error);
                      }
                      if (iterator) iteratorClose(iterator, "normal");
                      return createIterResultObject(void 0, true);
                    }
                  });
                };
                var WrapForValidIteratorPrototype = createIteratorProxyPrototype(true);
                var IteratorHelperPrototype = createIteratorProxyPrototype(false);
                createNonEnumerableProperty(IteratorHelperPrototype, TO_STRING_TAG, "Iterator Helper");
                module2.exports = function(nextHandler, IS_ITERATOR, RETURN_HANDLER_RESULT) {
                  var IteratorProxy = function Iterator(record, state) {
                    if (state) {
                      state.iterator = record.iterator;
                      state.next = record.next;
                    } else state = record;
                    state.type = IS_ITERATOR ? WRAP_FOR_VALID_ITERATOR : ITERATOR_HELPER;
                    state.returnHandlerResult = !!RETURN_HANDLER_RESULT;
                    state.nextHandler = nextHandler;
                    state.counter = 0;
                    state.done = false;
                    setInternalState(this, state);
                  };
                  IteratorProxy.prototype = IS_ITERATOR ? WrapForValidIteratorPrototype : IteratorHelperPrototype;
                  return IteratorProxy;
                };
              }
            ),
            /***/
            7121: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var shared = __webpack_require__2(3351);
                var uid = __webpack_require__2(7658);
                var keys = shared("keys");
                module2.exports = function(key) {
                  return keys[key] || (keys[key] = uid(key));
                };
              }
            ),
            /***/
            7159: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var IS_PURE = __webpack_require__2(6101);
                var globalThis2 = __webpack_require__2(2506);
                var defineGlobalProperty = __webpack_require__2(8047);
                var SHARED = "__core-js_shared__";
                var store = module2.exports = globalThis2[SHARED] || defineGlobalProperty(SHARED, {});
                (store.versions || (store.versions = [])).push({
                  version: "3.42.0",
                  mode: IS_PURE ? "pure" : "global",
                  copyright: "© 2014-2025 Denis Pushkarev (zloirock.ru)",
                  license: "https://github.com/zloirock/core-js/blob/v3.42.0/LICENSE",
                  source: "https://github.com/zloirock/core-js"
                });
              }
            ),
            /***/
            7184: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var toLength = __webpack_require__2(2404);
                module2.exports = function(obj) {
                  return toLength(obj.length);
                };
              }
            ),
            /***/
            7325: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var DESCRIPTORS = __webpack_require__2(6846);
                var definePropertyModule = __webpack_require__2(8043);
                var createPropertyDescriptor = __webpack_require__2(4314);
                module2.exports = DESCRIPTORS ? function(object, key, value) {
                  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
                } : function(object, key, value) {
                  object[key] = value;
                  return object;
                };
              }
            ),
            /***/
            7354: (
              /***/
              function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var $ = __webpack_require__2(7508);
                var call = __webpack_require__2(6671);
                var iterate = __webpack_require__2(9282);
                var aCallable = __webpack_require__2(1832);
                var anObject = __webpack_require__2(8485);
                var getIteratorDirect = __webpack_require__2(9065);
                var iteratorClose = __webpack_require__2(2817);
                var iteratorHelperWithoutClosingOnEarlyError = __webpack_require__2(1027);
                var findWithoutClosingOnEarlyError = iteratorHelperWithoutClosingOnEarlyError("find", TypeError);
                $({ target: "Iterator", proto: true, real: true, forced: findWithoutClosingOnEarlyError }, {
                  find: function find(predicate) {
                    anObject(this);
                    try {
                      aCallable(predicate);
                    } catch (error) {
                      iteratorClose(this, "throw", error);
                    }
                    if (findWithoutClosingOnEarlyError) return call(findWithoutClosingOnEarlyError, this, predicate);
                    var record = getIteratorDirect(this);
                    var counter = 0;
                    return iterate(record, function(value, stop) {
                      if (predicate(value, counter++)) return stop(value);
                    }, { IS_RECORD: true, INTERRUPTED: true }).result;
                  }
                });
              }
            ),
            /***/
            7371: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var fails = __webpack_require__2(7737);
                var isCallable = __webpack_require__2(4827);
                var isObject2 = __webpack_require__2(392);
                var create = __webpack_require__2(8362);
                var getPrototypeOf = __webpack_require__2(221);
                var defineBuiltIn = __webpack_require__2(2138);
                var wellKnownSymbol = __webpack_require__2(9489);
                var IS_PURE = __webpack_require__2(6101);
                var ITERATOR = wellKnownSymbol("iterator");
                var BUGGY_SAFARI_ITERATORS = false;
                var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;
                if ([].keys) {
                  arrayIterator = [].keys();
                  if (!("next" in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
                  else {
                    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
                    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
                  }
                }
                var NEW_ITERATOR_PROTOTYPE = !isObject2(IteratorPrototype) || fails(function() {
                  var test = {};
                  return IteratorPrototype[ITERATOR].call(test) !== test;
                });
                if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};
                else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);
                if (!isCallable(IteratorPrototype[ITERATOR])) {
                  defineBuiltIn(IteratorPrototype, ITERATOR, function() {
                    return this;
                  });
                }
                module2.exports = {
                  IteratorPrototype,
                  BUGGY_SAFARI_ITERATORS
                };
              }
            ),
            /***/
            7508: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var globalThis2 = __webpack_require__2(2506);
                var getOwnPropertyDescriptor = __webpack_require__2(625).f;
                var createNonEnumerableProperty = __webpack_require__2(7325);
                var defineBuiltIn = __webpack_require__2(2138);
                var defineGlobalProperty = __webpack_require__2(8047);
                var copyConstructorProperties = __webpack_require__2(6134);
                var isForced = __webpack_require__2(4346);
                module2.exports = function(options, source) {
                  var TARGET = options.target;
                  var GLOBAL = options.global;
                  var STATIC = options.stat;
                  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
                  if (GLOBAL) {
                    target = globalThis2;
                  } else if (STATIC) {
                    target = globalThis2[TARGET] || defineGlobalProperty(TARGET, {});
                  } else {
                    target = globalThis2[TARGET] && globalThis2[TARGET].prototype;
                  }
                  if (target) for (key in source) {
                    sourceProperty = source[key];
                    if (options.dontCallGetSet) {
                      descriptor = getOwnPropertyDescriptor(target, key);
                      targetProperty = descriptor && descriptor.value;
                    } else targetProperty = target[key];
                    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key, options.forced);
                    if (!FORCED && targetProperty !== void 0) {
                      if (typeof sourceProperty == typeof targetProperty) continue;
                      copyConstructorProperties(sourceProperty, targetProperty);
                    }
                    if (options.sham || targetProperty && targetProperty.sham) {
                      createNonEnumerableProperty(sourceProperty, "sham", true);
                    }
                    defineBuiltIn(target, key, sourceProperty, options);
                  }
                };
              }
            ),
            /***/
            7561: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var classof = __webpack_require__2(9745);
                var getMethod = __webpack_require__2(7604);
                var isNullOrUndefined = __webpack_require__2(5327);
                var Iterators = __webpack_require__2(8519);
                var wellKnownSymbol = __webpack_require__2(9489);
                var ITERATOR = wellKnownSymbol("iterator");
                module2.exports = function(it) {
                  if (!isNullOrUndefined(it)) return getMethod(it, ITERATOR) || getMethod(it, "@@iterator") || Iterators[classof(it)];
                };
              }
            ),
            /***/
            7599: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var IndexedObject = __webpack_require__2(4233);
                var requireObjectCoercible = __webpack_require__2(8336);
                module2.exports = function(it) {
                  return IndexedObject(requireObjectCoercible(it));
                };
              }
            ),
            /***/
            7604: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var aCallable = __webpack_require__2(1832);
                var isNullOrUndefined = __webpack_require__2(5327);
                module2.exports = function(V, P) {
                  var func = V[P];
                  return isNullOrUndefined(func) ? void 0 : aCallable(func);
                };
              }
            ),
            /***/
            7609: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var DESCRIPTORS = __webpack_require__2(6846);
                var isArray2 = __webpack_require__2(2050);
                var $TypeError = TypeError;
                var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
                var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS && !function() {
                  if (this !== void 0) return true;
                  try {
                    Object.defineProperty([], "length", { writable: false }).length = 1;
                  } catch (error) {
                    return error instanceof TypeError;
                  }
                }();
                module2.exports = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function(O, length) {
                  if (isArray2(O) && !getOwnPropertyDescriptor(O, "length").writable) {
                    throw new $TypeError("Cannot set read only .length");
                  }
                  return O.length = length;
                } : function(O, length) {
                  return O.length = length;
                };
              }
            ),
            /***/
            7658: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var uncurryThis = __webpack_require__2(8026);
                var id = 0;
                var postfix = Math.random();
                var toString = uncurryThis(1 .toString);
                module2.exports = function(key) {
                  return "Symbol(" + (key === void 0 ? "" : key) + ")_" + toString(++id + postfix, 36);
                };
              }
            ),
            /***/
            7737: (
              /***/
              function(module2) {
                "use strict";
                module2.exports = function(exec) {
                  try {
                    return !!exec();
                  } catch (error) {
                    return true;
                  }
                };
              }
            ),
            /***/
            7910: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var uncurryThis = __webpack_require__2(8026);
                var hasOwn = __webpack_require__2(9883);
                var toIndexedObject = __webpack_require__2(7599);
                var indexOf = __webpack_require__2(4219).indexOf;
                var hiddenKeys = __webpack_require__2(6755);
                var push = uncurryThis([].push);
                module2.exports = function(object, names) {
                  var O = toIndexedObject(object);
                  var i = 0;
                  var result = [];
                  var key;
                  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
                  while (names.length > i) if (hasOwn(O, key = names[i++])) {
                    ~indexOf(result, key) || push(result, key);
                  }
                  return result;
                };
              }
            ),
            /***/
            8026: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var NATIVE_BIND = __webpack_require__2(2642);
                var FunctionPrototype = Function.prototype;
                var call = FunctionPrototype.call;
                var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);
                module2.exports = NATIVE_BIND ? uncurryThisWithBind : function(fn) {
                  return function() {
                    return call.apply(fn, arguments);
                  };
                };
              }
            ),
            /***/
            8043: (
              /***/
              function(__unused_webpack_module, exports2, __webpack_require__2) {
                "use strict";
                var DESCRIPTORS = __webpack_require__2(6846);
                var IE8_DOM_DEFINE = __webpack_require__2(4631);
                var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__2(4440);
                var anObject = __webpack_require__2(8485);
                var toPropertyKey = __webpack_require__2(2103);
                var $TypeError = TypeError;
                var $defineProperty = Object.defineProperty;
                var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
                var ENUMERABLE = "enumerable";
                var CONFIGURABLE = "configurable";
                var WRITABLE = "writable";
                exports2.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
                  anObject(O);
                  P = toPropertyKey(P);
                  anObject(Attributes);
                  if (typeof O === "function" && P === "prototype" && "value" in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
                    var current = $getOwnPropertyDescriptor(O, P);
                    if (current && current[WRITABLE]) {
                      O[P] = Attributes.value;
                      Attributes = {
                        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
                        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
                        writable: false
                      };
                    }
                  }
                  return $defineProperty(O, P, Attributes);
                } : $defineProperty : function defineProperty(O, P, Attributes) {
                  anObject(O);
                  P = toPropertyKey(P);
                  anObject(Attributes);
                  if (IE8_DOM_DEFINE) try {
                    return $defineProperty(O, P, Attributes);
                  } catch (error) {
                  }
                  if ("get" in Attributes || "set" in Attributes) throw new $TypeError("Accessors not supported");
                  if ("value" in Attributes) O[P] = Attributes.value;
                  return O;
                };
              }
            ),
            /***/
            8047: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var globalThis2 = __webpack_require__2(2506);
                var defineProperty = Object.defineProperty;
                module2.exports = function(key, value) {
                  try {
                    defineProperty(globalThis2, key, { value, configurable: true, writable: true });
                  } catch (error) {
                    globalThis2[key] = value;
                  }
                  return value;
                };
              }
            ),
            /***/
            8089: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var globalThis2 = __webpack_require__2(2506);
                var isObject2 = __webpack_require__2(392);
                var document2 = globalThis2.document;
                var EXISTS = isObject2(document2) && isObject2(document2.createElement);
                module2.exports = function(it) {
                  return EXISTS ? document2.createElement(it) : {};
                };
              }
            ),
            /***/
            8133: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var isPrototypeOf = __webpack_require__2(6399);
                var $TypeError = TypeError;
                module2.exports = function(it, Prototype) {
                  if (isPrototypeOf(Prototype, it)) return it;
                  throw new $TypeError("Incorrect invocation");
                };
              }
            ),
            /***/
            8164: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var globalThis2 = __webpack_require__2(2506);
                var isCallable = __webpack_require__2(4827);
                var WeakMap2 = globalThis2.WeakMap;
                module2.exports = isCallable(WeakMap2) && /native code/.test(String(WeakMap2));
              }
            ),
            /***/
            8336: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var isNullOrUndefined = __webpack_require__2(5327);
                var $TypeError = TypeError;
                module2.exports = function(it) {
                  if (isNullOrUndefined(it)) throw new $TypeError("Can't call method on " + it);
                  return it;
                };
              }
            ),
            /***/
            8362: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var anObject = __webpack_require__2(8485);
                var definePropertiesModule = __webpack_require__2(9335);
                var enumBugKeys = __webpack_require__2(2613);
                var hiddenKeys = __webpack_require__2(6755);
                var html = __webpack_require__2(1899);
                var documentCreateElement = __webpack_require__2(8089);
                var sharedKey = __webpack_require__2(7121);
                var GT = ">";
                var LT = "<";
                var PROTOTYPE = "prototype";
                var SCRIPT = "script";
                var IE_PROTO = sharedKey("IE_PROTO");
                var EmptyConstructor = function() {
                };
                var scriptTag = function(content) {
                  return LT + SCRIPT + GT + content + LT + "/" + SCRIPT + GT;
                };
                var NullProtoObjectViaActiveX = function(activeXDocument2) {
                  activeXDocument2.write(scriptTag(""));
                  activeXDocument2.close();
                  var temp = activeXDocument2.parentWindow.Object;
                  activeXDocument2 = null;
                  return temp;
                };
                var NullProtoObjectViaIFrame = function() {
                  var iframe = documentCreateElement("iframe");
                  var JS = "java" + SCRIPT + ":";
                  var iframeDocument;
                  iframe.style.display = "none";
                  html.appendChild(iframe);
                  iframe.src = String(JS);
                  iframeDocument = iframe.contentWindow.document;
                  iframeDocument.open();
                  iframeDocument.write(scriptTag("document.F=Object"));
                  iframeDocument.close();
                  return iframeDocument.F;
                };
                var activeXDocument;
                var NullProtoObject = function() {
                  try {
                    activeXDocument = new ActiveXObject("htmlfile");
                  } catch (error) {
                  }
                  NullProtoObject = typeof document != "undefined" ? document.domain && activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame() : NullProtoObjectViaActiveX(activeXDocument);
                  var length = enumBugKeys.length;
                  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
                  return NullProtoObject();
                };
                hiddenKeys[IE_PROTO] = true;
                module2.exports = Object.create || function create(O, Properties) {
                  var result;
                  if (O !== null) {
                    EmptyConstructor[PROTOTYPE] = anObject(O);
                    result = new EmptyConstructor();
                    EmptyConstructor[PROTOTYPE] = null;
                    result[IE_PROTO] = O;
                  } else result = NullProtoObject();
                  return Properties === void 0 ? result : definePropertiesModule.f(result, Properties);
                };
              }
            ),
            /***/
            8425: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var uncurryThis = __webpack_require__2(8026);
                var fails = __webpack_require__2(7737);
                var isCallable = __webpack_require__2(4827);
                var hasOwn = __webpack_require__2(9883);
                var DESCRIPTORS = __webpack_require__2(6846);
                var CONFIGURABLE_FUNCTION_NAME = __webpack_require__2(5712).CONFIGURABLE;
                var inspectSource = __webpack_require__2(3556);
                var InternalStateModule = __webpack_require__2(3603);
                var enforceInternalState = InternalStateModule.enforce;
                var getInternalState = InternalStateModule.get;
                var $String = String;
                var defineProperty = Object.defineProperty;
                var stringSlice = uncurryThis("".slice);
                var replace = uncurryThis("".replace);
                var join = uncurryThis([].join);
                var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function() {
                  return defineProperty(function() {
                  }, "length", { value: 8 }).length !== 8;
                });
                var TEMPLATE = String(String).split("String");
                var makeBuiltIn = module2.exports = function(value, name, options) {
                  if (stringSlice($String(name), 0, 7) === "Symbol(") {
                    name = "[" + replace($String(name), /^Symbol\(([^)]*)\).*$/, "$1") + "]";
                  }
                  if (options && options.getter) name = "get " + name;
                  if (options && options.setter) name = "set " + name;
                  if (!hasOwn(value, "name") || CONFIGURABLE_FUNCTION_NAME && value.name !== name) {
                    if (DESCRIPTORS) defineProperty(value, "name", { value: name, configurable: true });
                    else value.name = name;
                  }
                  if (CONFIGURABLE_LENGTH && options && hasOwn(options, "arity") && value.length !== options.arity) {
                    defineProperty(value, "length", { value: options.arity });
                  }
                  try {
                    if (options && hasOwn(options, "constructor") && options.constructor) {
                      if (DESCRIPTORS) defineProperty(value, "prototype", { writable: false });
                    } else if (value.prototype) value.prototype = void 0;
                  } catch (error) {
                  }
                  var state = enforceInternalState(value);
                  if (!hasOwn(state, "source")) {
                    state.source = join(TEMPLATE, typeof name == "string" ? name : "");
                  }
                  return value;
                };
                Function.prototype.toString = makeBuiltIn(function toString() {
                  return isCallable(this) && getInternalState(this).source || inspectSource(this);
                }, "toString");
              }
            ),
            /***/
            8485: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var isObject2 = __webpack_require__2(392);
                var $String = String;
                var $TypeError = TypeError;
                module2.exports = function(argument) {
                  if (isObject2(argument)) return argument;
                  throw new $TypeError($String(argument) + " is not an object");
                };
              }
            ),
            /***/
            8519: (
              /***/
              function(module2) {
                "use strict";
                module2.exports = {};
              }
            ),
            /***/
            8747: (
              /***/
              function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var $ = __webpack_require__2(7508);
                var iterate = __webpack_require__2(9282);
                var aCallable = __webpack_require__2(1832);
                var anObject = __webpack_require__2(8485);
                var getIteratorDirect = __webpack_require__2(9065);
                var iteratorClose = __webpack_require__2(2817);
                var iteratorHelperWithoutClosingOnEarlyError = __webpack_require__2(1027);
                var apply = __webpack_require__2(4235);
                var fails = __webpack_require__2(7737);
                var $TypeError = TypeError;
                var FAILS_ON_INITIAL_UNDEFINED = fails(function() {
                  [].keys().reduce(function() {
                  }, void 0);
                });
                var reduceWithoutClosingOnEarlyError = !FAILS_ON_INITIAL_UNDEFINED && iteratorHelperWithoutClosingOnEarlyError("reduce", $TypeError);
                $({ target: "Iterator", proto: true, real: true, forced: FAILS_ON_INITIAL_UNDEFINED || reduceWithoutClosingOnEarlyError }, {
                  reduce: function reduce(reducer) {
                    anObject(this);
                    try {
                      aCallable(reducer);
                    } catch (error) {
                      iteratorClose(this, "throw", error);
                    }
                    var noInitial = arguments.length < 2;
                    var accumulator = noInitial ? void 0 : arguments[1];
                    if (reduceWithoutClosingOnEarlyError) {
                      return apply(reduceWithoutClosingOnEarlyError, this, noInitial ? [reducer] : [reducer, accumulator]);
                    }
                    var record = getIteratorDirect(this);
                    var counter = 0;
                    iterate(record, function(value) {
                      if (noInitial) {
                        noInitial = false;
                        accumulator = value;
                      } else {
                        accumulator = reducer(accumulator, value, counter);
                      }
                      counter++;
                    }, { IS_RECORD: true });
                    if (noInitial) throw new $TypeError("Reduce of empty iterator with no initial value");
                    return accumulator;
                  }
                });
              }
            ),
            /***/
            9065: (
              /***/
              function(module2) {
                "use strict";
                module2.exports = function(obj) {
                  return {
                    iterator: obj,
                    next: obj.next,
                    done: false
                  };
                };
              }
            ),
            /***/
            9073: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var globalThis2 = __webpack_require__2(2506);
                var isCallable = __webpack_require__2(4827);
                var aFunction = function(argument) {
                  return isCallable(argument) ? argument : void 0;
                };
                module2.exports = function(namespace, method) {
                  return arguments.length < 2 ? aFunction(globalThis2[namespace]) : globalThis2[namespace] && globalThis2[namespace][method];
                };
              }
            ),
            /***/
            9282: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var bind = __webpack_require__2(4322);
                var call = __webpack_require__2(6671);
                var anObject = __webpack_require__2(8485);
                var tryToString = __webpack_require__2(217);
                var isArrayIteratorMethod = __webpack_require__2(9987);
                var lengthOfArrayLike = __webpack_require__2(7184);
                var isPrototypeOf = __webpack_require__2(6399);
                var getIterator = __webpack_require__2(5799);
                var getIteratorMethod = __webpack_require__2(7561);
                var iteratorClose = __webpack_require__2(2817);
                var $TypeError = TypeError;
                var Result = function(stopped, result) {
                  this.stopped = stopped;
                  this.result = result;
                };
                var ResultPrototype = Result.prototype;
                module2.exports = function(iterable, unboundFunction, options) {
                  var that = options && options.that;
                  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
                  var IS_RECORD = !!(options && options.IS_RECORD);
                  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
                  var INTERRUPTED = !!(options && options.INTERRUPTED);
                  var fn = bind(unboundFunction, that);
                  var iterator, iterFn, index, length, result, next, step;
                  var stop = function(condition) {
                    if (iterator) iteratorClose(iterator, "normal", condition);
                    return new Result(true, condition);
                  };
                  var callFn = function(value) {
                    if (AS_ENTRIES) {
                      anObject(value);
                      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
                    }
                    return INTERRUPTED ? fn(value, stop) : fn(value);
                  };
                  if (IS_RECORD) {
                    iterator = iterable.iterator;
                  } else if (IS_ITERATOR) {
                    iterator = iterable;
                  } else {
                    iterFn = getIteratorMethod(iterable);
                    if (!iterFn) throw new $TypeError(tryToString(iterable) + " is not iterable");
                    if (isArrayIteratorMethod(iterFn)) {
                      for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
                        result = callFn(iterable[index]);
                        if (result && isPrototypeOf(ResultPrototype, result)) return result;
                      }
                      return new Result(false);
                    }
                    iterator = getIterator(iterable, iterFn);
                  }
                  next = IS_RECORD ? iterable.next : iterator.next;
                  while (!(step = call(next, iterator)).done) {
                    try {
                      result = callFn(step.value);
                    } catch (error) {
                      iteratorClose(iterator, "throw", error);
                    }
                    if (typeof result == "object" && result && isPrototypeOf(ResultPrototype, result)) return result;
                  }
                  return new Result(false);
                };
              }
            ),
            /***/
            9301: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var globalThis2 = __webpack_require__2(2506);
                var navigator2 = globalThis2.navigator;
                var userAgent = navigator2 && navigator2.userAgent;
                module2.exports = userAgent ? String(userAgent) : "";
              }
            ),
            /***/
            9335: (
              /***/
              function(__unused_webpack_module, exports2, __webpack_require__2) {
                "use strict";
                var DESCRIPTORS = __webpack_require__2(6846);
                var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__2(4440);
                var definePropertyModule = __webpack_require__2(8043);
                var anObject = __webpack_require__2(8485);
                var toIndexedObject = __webpack_require__2(7599);
                var objectKeys = __webpack_require__2(218);
                exports2.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
                  anObject(O);
                  var props = toIndexedObject(Properties);
                  var keys = objectKeys(Properties);
                  var length = keys.length;
                  var index = 0;
                  var key;
                  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
                  return O;
                };
              }
            ),
            /***/
            9370: (
              /***/
              function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var $ = __webpack_require__2(7508);
                var call = __webpack_require__2(6671);
                var iterate = __webpack_require__2(9282);
                var aCallable = __webpack_require__2(1832);
                var anObject = __webpack_require__2(8485);
                var getIteratorDirect = __webpack_require__2(9065);
                var iteratorClose = __webpack_require__2(2817);
                var iteratorHelperWithoutClosingOnEarlyError = __webpack_require__2(1027);
                var forEachWithoutClosingOnEarlyError = iteratorHelperWithoutClosingOnEarlyError("forEach", TypeError);
                $({ target: "Iterator", proto: true, real: true, forced: forEachWithoutClosingOnEarlyError }, {
                  forEach: function forEach(fn) {
                    anObject(this);
                    try {
                      aCallable(fn);
                    } catch (error) {
                      iteratorClose(this, "throw", error);
                    }
                    if (forEachWithoutClosingOnEarlyError) return call(forEachWithoutClosingOnEarlyError, this, fn);
                    var record = getIteratorDirect(this);
                    var counter = 0;
                    iterate(record, function(value) {
                      fn(value, counter++);
                    }, { IS_RECORD: true });
                  }
                });
              }
            ),
            /***/
            9376: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var toIntegerOrInfinity = __webpack_require__2(9853);
                var max = Math.max;
                var min = Math.min;
                module2.exports = function(index, length) {
                  var integer = toIntegerOrInfinity(index);
                  return integer < 0 ? max(integer + length, 0) : min(integer, length);
                };
              }
            ),
            /***/
            9405: (
              /***/
              function(__unused_webpack_module, __webpack_exports__2, __webpack_require__2) {
                "use strict";
                __webpack_require__2.d(__webpack_exports__2, {
                  A: function() {
                    return (
                      /* binding */
                      addStylesClient
                    );
                  }
                });
                var es_array_push = __webpack_require__2(1484);
                ;
                function listToStyles(parentId, list) {
                  var styles = [];
                  var newStyles = {};
                  for (var i = 0; i < list.length; i++) {
                    var item = list[i];
                    var id = item[0];
                    var css = item[1];
                    var media = item[2];
                    var sourceMap = item[3];
                    var part = {
                      id: parentId + ":" + i,
                      css,
                      media,
                      sourceMap
                    };
                    if (!newStyles[id]) {
                      styles.push(newStyles[id] = {
                        id,
                        parts: [part]
                      });
                    } else {
                      newStyles[id].parts.push(part);
                    }
                  }
                  return styles;
                }
                ;
                var hasDocument = typeof document !== "undefined";
                if (typeof DEBUG !== "undefined" && DEBUG) {
                  if (!hasDocument) {
                    throw new Error(
                      "vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
                    );
                  }
                }
                var stylesInDom = {
                  /*
                    [id: number]: {
                      id: number,
                      refs: number,
                      parts: Array<(obj?: StyleObjectPart) => void>
                    }
                  */
                };
                var head = hasDocument && (document.head || document.getElementsByTagName("head")[0]);
                var singletonElement = null;
                var singletonCounter = 0;
                var isProduction = false;
                var noop = function() {
                };
                var options = null;
                var ssrIdKey = "data-vue-ssr-id";
                var isOldIE = typeof navigator !== "undefined" && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase());
                function addStylesClient(parentId, list, _isProduction, _options) {
                  isProduction = _isProduction;
                  options = _options || {};
                  var styles = listToStyles(parentId, list);
                  addStylesToDom(styles);
                  return function update(newList) {
                    var mayRemove = [];
                    for (var i = 0; i < styles.length; i++) {
                      var item = styles[i];
                      var domStyle = stylesInDom[item.id];
                      domStyle.refs--;
                      mayRemove.push(domStyle);
                    }
                    if (newList) {
                      styles = listToStyles(parentId, newList);
                      addStylesToDom(styles);
                    } else {
                      styles = [];
                    }
                    for (var i = 0; i < mayRemove.length; i++) {
                      var domStyle = mayRemove[i];
                      if (domStyle.refs === 0) {
                        for (var j = 0; j < domStyle.parts.length; j++) {
                          domStyle.parts[j]();
                        }
                        delete stylesInDom[domStyle.id];
                      }
                    }
                  };
                }
                function addStylesToDom(styles) {
                  for (var i = 0; i < styles.length; i++) {
                    var item = styles[i];
                    var domStyle = stylesInDom[item.id];
                    if (domStyle) {
                      domStyle.refs++;
                      for (var j = 0; j < domStyle.parts.length; j++) {
                        domStyle.parts[j](item.parts[j]);
                      }
                      for (; j < item.parts.length; j++) {
                        domStyle.parts.push(addStyle(item.parts[j]));
                      }
                      if (domStyle.parts.length > item.parts.length) {
                        domStyle.parts.length = item.parts.length;
                      }
                    } else {
                      var parts = [];
                      for (var j = 0; j < item.parts.length; j++) {
                        parts.push(addStyle(item.parts[j]));
                      }
                      stylesInDom[item.id] = { id: item.id, refs: 1, parts };
                    }
                  }
                }
                function createStyleElement() {
                  var styleElement = document.createElement("style");
                  styleElement.type = "text/css";
                  head.appendChild(styleElement);
                  return styleElement;
                }
                function addStyle(obj) {
                  var update, remove;
                  var styleElement = document.querySelector("style[" + ssrIdKey + '~="' + obj.id + '"]');
                  if (styleElement) {
                    if (isProduction) {
                      return noop;
                    } else {
                      styleElement.parentNode.removeChild(styleElement);
                    }
                  }
                  if (isOldIE) {
                    var styleIndex = singletonCounter++;
                    styleElement = singletonElement || (singletonElement = createStyleElement());
                    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
                    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
                  } else {
                    styleElement = createStyleElement();
                    update = applyToTag.bind(null, styleElement);
                    remove = function() {
                      styleElement.parentNode.removeChild(styleElement);
                    };
                  }
                  update(obj);
                  return function updateStyle(newObj) {
                    if (newObj) {
                      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
                        return;
                      }
                      update(obj = newObj);
                    } else {
                      remove();
                    }
                  };
                }
                var replaceText = /* @__PURE__ */ function() {
                  var textStore = [];
                  return function(index, replacement) {
                    textStore[index] = replacement;
                    return textStore.filter(Boolean).join("\n");
                  };
                }();
                function applyToSingletonTag(styleElement, index, remove, obj) {
                  var css = remove ? "" : obj.css;
                  if (styleElement.styleSheet) {
                    styleElement.styleSheet.cssText = replaceText(index, css);
                  } else {
                    var cssNode = document.createTextNode(css);
                    var childNodes = styleElement.childNodes;
                    if (childNodes[index]) styleElement.removeChild(childNodes[index]);
                    if (childNodes.length) {
                      styleElement.insertBefore(cssNode, childNodes[index]);
                    } else {
                      styleElement.appendChild(cssNode);
                    }
                  }
                }
                function applyToTag(styleElement, obj) {
                  var css = obj.css;
                  var media = obj.media;
                  var sourceMap = obj.sourceMap;
                  if (media) {
                    styleElement.setAttribute("media", media);
                  }
                  if (options.ssrId) {
                    styleElement.setAttribute(ssrIdKey, obj.id);
                  }
                  if (sourceMap) {
                    css += "\n/*# sourceURL=" + sourceMap.sources[0] + " */";
                    css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
                  }
                  if (styleElement.styleSheet) {
                    styleElement.styleSheet.cssText = css;
                  } else {
                    while (styleElement.firstChild) {
                      styleElement.removeChild(styleElement.firstChild);
                    }
                    styleElement.appendChild(document.createTextNode(css));
                  }
                }
              }
            ),
            /***/
            9489: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var globalThis2 = __webpack_require__2(2506);
                var shared = __webpack_require__2(3351);
                var hasOwn = __webpack_require__2(9883);
                var uid = __webpack_require__2(7658);
                var NATIVE_SYMBOL = __webpack_require__2(6077);
                var USE_SYMBOL_AS_UID = __webpack_require__2(9630);
                var Symbol2 = globalThis2.Symbol;
                var WellKnownSymbolsStore = shared("wks");
                var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol2["for"] || Symbol2 : Symbol2 && Symbol2.withoutSetter || uid;
                module2.exports = function(name) {
                  if (!hasOwn(WellKnownSymbolsStore, name)) {
                    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol2, name) ? Symbol2[name] : createWellKnownSymbol("Symbol." + name);
                  }
                  return WellKnownSymbolsStore[name];
                };
              }
            ),
            /***/
            9630: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var NATIVE_SYMBOL = __webpack_require__2(6077);
                module2.exports = NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == "symbol";
              }
            ),
            /***/
            9745: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var TO_STRING_TAG_SUPPORT = __webpack_require__2(2994);
                var isCallable = __webpack_require__2(4827);
                var classofRaw = __webpack_require__2(3326);
                var wellKnownSymbol = __webpack_require__2(9489);
                var TO_STRING_TAG = wellKnownSymbol("toStringTag");
                var $Object = Object;
                var CORRECT_ARGUMENTS = classofRaw(/* @__PURE__ */ function() {
                  return arguments;
                }()) === "Arguments";
                var tryGet = function(it, key) {
                  try {
                    return it[key];
                  } catch (error) {
                  }
                };
                module2.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function(it) {
                  var O, tag, result;
                  return it === void 0 ? "Undefined" : it === null ? "Null" : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == "string" ? tag : CORRECT_ARGUMENTS ? classofRaw(O) : (result = classofRaw(O)) === "Object" && isCallable(O.callee) ? "Arguments" : result;
                };
              }
            ),
            /***/
            9853: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var trunc = __webpack_require__2(1479);
                module2.exports = function(argument) {
                  var number = +argument;
                  return number !== number || number === 0 ? 0 : trunc(number);
                };
              }
            ),
            /***/
            9883: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var uncurryThis = __webpack_require__2(8026);
                var toObject = __webpack_require__2(987);
                var hasOwnProperty = uncurryThis({}.hasOwnProperty);
                module2.exports = Object.hasOwn || function hasOwn(it, key) {
                  return hasOwnProperty(toObject(it), key);
                };
              }
            ),
            /***/
            9935: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var getBuiltIn = __webpack_require__2(9073);
                var isCallable = __webpack_require__2(4827);
                var isPrototypeOf = __webpack_require__2(6399);
                var USE_SYMBOL_AS_UID = __webpack_require__2(9630);
                var $Object = Object;
                module2.exports = USE_SYMBOL_AS_UID ? function(it) {
                  return typeof it == "symbol";
                } : function(it) {
                  var $Symbol = getBuiltIn("Symbol");
                  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
                };
              }
            ),
            /***/
            9987: (
              /***/
              function(module2, __unused_webpack_exports, __webpack_require__2) {
                "use strict";
                var wellKnownSymbol = __webpack_require__2(9489);
                var Iterators = __webpack_require__2(8519);
                var ITERATOR = wellKnownSymbol("iterator");
                var ArrayPrototype = Array.prototype;
                module2.exports = function(it) {
                  return it !== void 0 && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
                };
              }
            )
            /******/
          };
          var __webpack_module_cache__ = {};
          function __webpack_require__(moduleId) {
            var cachedModule = __webpack_module_cache__[moduleId];
            if (cachedModule !== void 0) {
              return cachedModule.exports;
            }
            var module2 = __webpack_module_cache__[moduleId] = {
              /******/
              id: moduleId,
              /******/
              loaded: false,
              /******/
              exports: {}
              /******/
            };
            __webpack_modules__[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__);
            module2.loaded = true;
            return module2.exports;
          }
          !function() {
            __webpack_require__.n = function(module2) {
              var getter = module2 && module2.__esModule ? (
                /******/
                function() {
                  return module2["default"];
                }
              ) : (
                /******/
                function() {
                  return module2;
                }
              );
              __webpack_require__.d(getter, { a: getter });
              return getter;
            };
          }();
          !function() {
            __webpack_require__.d = function(exports2, definition) {
              for (var key in definition) {
                if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports2, key)) {
                  Object.defineProperty(exports2, key, { enumerable: true, get: definition[key] });
                }
              }
            };
          }();
          !function() {
            __webpack_require__.g = function() {
              if (typeof globalThis === "object") return globalThis;
              try {
                return this || new Function("return this")();
              } catch (e) {
                if (typeof window === "object") return window;
              }
            }();
          }();
          !function() {
            __webpack_require__.o = function(obj, prop) {
              return Object.prototype.hasOwnProperty.call(obj, prop);
            };
          }();
          !function() {
            __webpack_require__.r = function(exports2) {
              if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
                Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
              }
              Object.defineProperty(exports2, "__esModule", { value: true });
            };
          }();
          !function() {
            __webpack_require__.nmd = function(module2) {
              module2.paths = [];
              if (!module2.children) module2.children = [];
              return module2;
            };
          }();
          !function() {
            __webpack_require__.p = "";
          }();
          var __webpack_exports__ = {};
          !function() {
            "use strict";
            __webpack_require__.d(__webpack_exports__, {
              "default": function() {
                return (
                  /* binding */
                  entry_lib
                );
              }
            });
            ;
            if (typeof window !== "undefined") {
              var currentScript = window.document.currentScript;
              if (false) {
                var getCurrentScript;
              }
              var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/);
              if (src) {
                __webpack_require__.p = src[1];
              }
            }
            var setPublicPath = null;
            var es_array_push = __webpack_require__(1484);
            var es_iterator_constructor = __webpack_require__(6961);
            var es_iterator_find = __webpack_require__(7354);
            var es_iterator_for_each = __webpack_require__(9370);
            var es_iterator_reduce = __webpack_require__(8747);
            var es_iterator_some = __webpack_require__(4929);
            var es_iterator_map = __webpack_require__(2807);
            var external_Vue_ = __webpack_require__(2508);
            ;
            function _typeof(o) {
              "@babel/helpers - typeof";
              return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
                return typeof o2;
              } : function(o2) {
                return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
              }, _typeof(o);
            }
            ;
            function toPrimitive(t, r) {
              if ("object" != _typeof(t) || !t) return t;
              var e = t[Symbol.toPrimitive];
              if (void 0 !== e) {
                var i = e.call(t, r || "default");
                if ("object" != _typeof(i)) return i;
                throw new TypeError("@@toPrimitive must return a primitive value.");
              }
              return ("string" === r ? String : Number)(t);
            }
            ;
            function toPropertyKey(t) {
              var i = toPrimitive(t, "string");
              return "symbol" == _typeof(i) ? i : i + "";
            }
            ;
            function _defineProperty(e, r, t) {
              return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
                value: t,
                enumerable: true,
                configurable: true,
                writable: true
              }) : e[r] = t, e;
            }
            ;
            let EOptions = function(EOptions2) {
              EOptions2["el-select"] = "el-option";
              EOptions2["el-radio-group"] = "el-radio";
              EOptions2["el-checkbox-group"] = "el-checkbox";
              EOptions2["el-cascader"] = "span";
              EOptions2["el-tree-select"] = "span";
              return EOptions2;
            }({});
            const InitialValueMap = {
              "el-checkbox-group": []
            };
            const crudSlotsMap = {
              /** 新增区 */
              "c-": ["footer"],
              /** 搜索区 */
              "r-": ["searchBtn"]
            };
            var lodash_clonedeepwith = __webpack_require__(5807);
            var lodash_clonedeepwith_default = __webpack_require__.n(lodash_clonedeepwith);
            var index_module = __webpack_require__(4278);
            var index_module_default = __webpack_require__.n(index_module);
            var icons_vue_ = __webpack_require__(2711);
            ;
            function _isSlot(s) {
              return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !(0, external_Vue_.isVNode)(s);
            }
            function isSupportMemo() {
              const instance = getCurrentInstance();
              const version = instance.appContext.app.version;
              const secondVersion = parseInt(version.split(".")[1], 10);
              return version.startsWith("3.") && secondVersion >= 2;
            }
            function deepCloneWithMarkRaw(obj) {
              return lodash_clonedeepwith_default()(obj, (value, key) => {
                if (key === "component" && (typeof value === "object" || typeof value === "function")) {
                  return (0, external_Vue_.markRaw)(value);
                }
                return void 0;
              });
            }
            class FormCore {
              constructor(config) {
                var _a;
                _defineProperty(this, "formValue", {});
                _defineProperty(this, "formRef", (0, external_Vue_.ref)());
                _defineProperty(this, "formConfig", []);
                _defineProperty(this, "rowProps", {});
                _defineProperty(this, "colProps", {});
                _defineProperty(this, "formProps", {});
                _defineProperty(this, "disabled", (0, external_Vue_.ref)(false));
                const processedConfig = this._handleConfig(config.formConfig);
                this.formConfig = (0, external_Vue_.reactive)(processedConfig);
                this.rowProps = this._handleConfig(config.rowProps || {});
                this.colProps = this._handleConfig(config.colProps || {});
                this.formProps = this._handleConfig(config.formProps || {});
                const model = this._handleConfig(((_a = this.formProps) == null ? void 0 : _a.model) || {});
                const vals = this._initValue(model, processedConfig);
                Object.assign(this.formValue, vals);
                this.formValue = (0, external_Vue_.reactive)(this.formValue);
                this.addItem = this.addItem.bind(this);
                this.removeItem = this.removeItem.bind(this);
              }
              _generateComponent(itemConfig, slots, nestedKey) {
                var _a;
                if (itemConfig.component === "slot") {
                  return this._generateSlot(itemConfig, slots, nestedKey);
                } else if (this._isVueComponent(itemConfig.component)) {
                  return this._generateCustomComponent(itemConfig, nestedKey);
                } else if (typeof (itemConfig == null ? void 0 : itemConfig.component) === "string" && ((_a = itemConfig == null ? void 0 : itemConfig.component) == null ? void 0 : _a.startsWith("el-"))) {
                  return this._generateElementComponent(itemConfig, nestedKey);
                }
                return null;
              }
              _generateNestedData(nestedKey, prop, value) {
                const lastData = {
                  [prop]: value
                };
                if (!this.formValue[nestedKey.prop]) {
                  this.formValue[nestedKey.prop] = [];
                  this.formValue[nestedKey.prop][nestedKey.key] = lastData;
                } else {
                  this.formValue[nestedKey.prop][nestedKey.key] = {
                    ...this.formValue[nestedKey.prop][nestedKey.key],
                    ...lastData
                  };
                }
              }
              /**
               * 处理配置对象
               * @param config 配置对象
               * @returns 处理后的普通对象
               */
              _handleConfig(config) {
                const rawConfig = (0, external_Vue_.isReactive)(config) || (0, external_Vue_.isRef)(config) ? (0, external_Vue_.toRaw)(config) : config;
                return deepCloneWithMarkRaw(rawConfig);
              }
              _isVueComponent(arg) {
                return Object.prototype.hasOwnProperty.call(arg, "render") || Object.prototype.hasOwnProperty.call(arg, "setup");
              }
              _generateElementComponent(itemConfig, nestedKey) {
                var _a, _b, _c, _d, _e;
                return (0, external_Vue_.h)((0, external_Vue_.resolveComponent)(itemConfig.component), {
                  ...itemConfig.componentProps,
                  modelValue: nestedKey ? (_c = (_b = (_a = this.formValue) == null ? void 0 : _a[nestedKey.prop]) == null ? void 0 : _b[nestedKey.key]) == null ? void 0 : _c[itemConfig.formItemProps.prop] : this.formValue[itemConfig.formItemProps.prop],
                  "onUpdate:modelValue": (value) => {
                    if (nestedKey) {
                      this._generateNestedData(nestedKey, itemConfig.formItemProps.prop, value);
                    } else {
                      this.formValue[itemConfig.formItemProps.prop] = value;
                    }
                  }
                }, ((_e = (_d = itemConfig == null ? void 0 : itemConfig.componentProps) == null ? void 0 : _d.options) == null ? void 0 : _e.length) ? {
                  default: ({
                    data
                  }) => {
                    var _a2;
                    return EOptions[itemConfig.component] == "span" ? data.label : (0, external_Vue_.h)(external_Vue_.Fragment, {}, [...(((_a2 = itemConfig == null ? void 0 : itemConfig.componentProps) == null ? void 0 : _a2.options) || []).map((i) => {
                      return (0, external_Vue_.h)((0, external_Vue_.resolveComponent)(EOptions[itemConfig.component]), {
                        key: i.key || i.value,
                        ...i
                      });
                    })]);
                  }
                } : {});
              }
              /**
               * 获取子类方法
               * @returns 子类方法对象
               */
              _getSubClassMethods() {
                const proto = Object.getPrototypeOf(this);
                const methods = {};
                Object.getOwnPropertyNames(proto).forEach((key) => {
                  if (typeof this[key] === "function" && key !== "constructor") {
                    methods[key] = this[key].bind(this);
                  }
                });
                return methods;
              }
              _generateCustomComponent(itemConfig, nestedKey) {
                var _a, _b, _c;
                const methods = this._getSubClassMethods();
                return (0, external_Vue_.h)(itemConfig.component, {
                  prop: itemConfig.formItemProps.prop,
                  formValue: this.formValue,
                  modelValue: nestedKey ? (_c = (_b = (_a = this.formValue) == null ? void 0 : _a[nestedKey.prop]) == null ? void 0 : _b[nestedKey.key]) == null ? void 0 : _c[itemConfig.formItemProps.prop] : this.formValue[itemConfig.formItemProps.prop],
                  "onUpdate:modelValue": (value) => {
                    if (nestedKey) {
                      this._generateNestedData(nestedKey, itemConfig.formItemProps.prop, value);
                    } else {
                      this.formValue[itemConfig.formItemProps.prop] = value;
                    }
                  },
                  ...methods
                });
              }
              _generateSlot(itemConfig, slots, nestedKey) {
                var _a, _b, _c, _d;
                return (_d = slots == null ? void 0 : slots[itemConfig.formItemProps.prop]) == null ? void 0 : _d.call(slots, {
                  formValue: this.formValue,
                  nestedKey,
                  modelValue: nestedKey ? (_c = (_b = (_a = this.formValue) == null ? void 0 : _a[nestedKey.prop]) == null ? void 0 : _b[nestedKey.key]) == null ? void 0 : _c[itemConfig.formItemProps.prop] : this.formValue[itemConfig.formItemProps.prop]
                  // ...methods,
                });
              }
              _initValue(formValue, config, parentProp, key) {
                const values = {};
                config == null ? void 0 : config.forEach((item) => {
                  var _a, _b;
                  if (item.children) {
                    const listValue = [];
                    item.children.forEach((i, k) => {
                      listValue.push(this._initValue(formValue, i, item.formItemProps.prop, k));
                    });
                    values[item.formItemProps.prop] = listValue;
                  } else {
                    const initialValue = InitialValueMap[item.formItemProps.prop] || null;
                    const preValue = parentProp ? ((_b = (_a = formValue == null ? void 0 : formValue[parentProp]) == null ? void 0 : _a[key]) == null ? void 0 : _b[item.formItemProps.prop]) || "" : formValue[item.formItemProps.prop];
                    const defaultValue = item.defaultValue;
                    values[item.formItemProps.prop] = preValue !== void 0 ? preValue : defaultValue || initialValue;
                  }
                });
                return values;
              }
              addItem(prop) {
                var _a, _b;
                const index = this.formConfig.findIndex((i) => i.formItemProps.prop === prop);
                if (index > -1) {
                  this.formConfig[index].children.push((_b = (_a = this.formConfig[index]) == null ? void 0 : _a.children) == null ? void 0 : _b[0]);
                  const processedConfig = this._handleConfig(this.formConfig);
                  const vals = this._initValue(this.formValue, processedConfig);
                  Object.assign(this.formValue, vals);
                }
              }
              removeItem(prop, key) {
                const index = this.formConfig.findIndex((i) => i.formItemProps.prop === prop);
                if (index > -1 && key > 0) {
                  this.formValue[prop].splice(key, 1);
                  this.formConfig[index].children.splice(key, 1);
                  const processedConfig = this._handleConfig(this.formConfig);
                  const vals = this._initValue(this.formValue, processedConfig);
                  Object.assign(this.formValue, vals);
                }
              }
              getform() {
                return (0, external_Vue_.defineComponent)({
                  setup: (_props, {
                    slots
                  }) => {
                    return () => {
                      let _slot3;
                      const finalFormProps = {
                        ref: this.formRef,
                        model: this.formValue,
                        disabled: this.disabled.value,
                        ...this.formProps
                      };
                      return (0, external_Vue_.createVNode)((0, external_Vue_.resolveComponent)("el-form"), finalFormProps, {
                        default: () => {
                          var _a;
                          return [(0, external_Vue_.createVNode)((0, external_Vue_.resolveComponent)("el-row"), (0, external_Vue_.mergeProps)(this.rowProps || {}, {
                            "gutter": ((_a = this.rowProps) == null ? void 0 : _a.gutter) || 24
                          }), _isSlot(_slot3 = (this.formConfig || []).map((item) => {
                            var _a2, _b;
                            let _slot2;
                            return Array.isArray(item.children) ? (0, external_Vue_.createVNode)("div", {
                              "class": `${index_module_default().groupRow}`
                            }, [(item.children || []).map((citem, ckey) => {
                              var _a3;
                              return (0, external_Vue_.createVNode)((0, external_Vue_.resolveComponent)("el-row"), (0, external_Vue_.mergeProps)(this.rowProps || {}, {
                                "gutter": ((_a3 = this.rowProps) == null ? void 0 : _a3.gutter) || 24,
                                "class": index_module_default().border
                              }), {
                                default: () => [citem == null ? void 0 : citem.map((c) => {
                                  var _a4, _b2;
                                  let _slot;
                                  return (0, external_Vue_.createVNode)((0, external_Vue_.resolveComponent)("el-col"), (0, external_Vue_.mergeProps)({
                                    "key": `${item.formItemProps.prop}.${ckey}.${c.formItemProps.prop}`
                                  }, (c == null ? void 0 : c.colProps) || this.colProps || {}, {
                                    "span": ((_a4 = c == null ? void 0 : c.colProps) == null ? void 0 : _a4.span) || ((_b2 = this.colProps) == null ? void 0 : _b2.span) || 24
                                  }), {
                                    default: () => [(0, external_Vue_.createVNode)((0, external_Vue_.resolveComponent)("el-form-item"), (0, external_Vue_.mergeProps)(c.formItemProps, {
                                      "class": index_module_default()["form-item"],
                                      "prop": `${item.formItemProps.prop}.${ckey}.${c.formItemProps.prop}`
                                    }), _isSlot(_slot = this._generateComponent(c, slots, {
                                      prop: item.formItemProps.prop,
                                      key: ckey
                                    })) ? _slot : {
                                      default: () => [_slot]
                                    })]
                                  });
                                }), (0, external_Vue_.createVNode)("div", {
                                  "class": index_module_default().operate
                                }, [(0, external_Vue_.createVNode)((0, external_Vue_.resolveComponent)("el-button"), {
                                  "icon": icons_vue_.Plus,
                                  "circle": true,
                                  "size": "small",
                                  "onClick": () => {
                                    this.addItem(item.formItemProps.prop);
                                  }
                                }, null), ckey > 0 ? (0, external_Vue_.createVNode)((0, external_Vue_.resolveComponent)("el-popconfirm"), {
                                  "title": "确定删除吗？",
                                  "onConfirm": () => {
                                    this.removeItem(item.formItemProps.prop, ckey);
                                  },
                                  "confirm-button-text": "确定",
                                  "cancel-button-text": "取消"
                                }, {
                                  reference: (0, external_Vue_.createVNode)((0, external_Vue_.resolveComponent)("el-button"), {
                                    "icon": icons_vue_.Delete,
                                    "circle": true,
                                    "size": "small"
                                  }, null)
                                }) : null])]
                              });
                            })]) : (0, external_Vue_.createVNode)((0, external_Vue_.resolveComponent)("el-col"), (0, external_Vue_.mergeProps)((item == null ? void 0 : item.colProps) || this.colProps || {}, {
                              "span": ((_a2 = item == null ? void 0 : item.colProps) == null ? void 0 : _a2.span) || ((_b = this.colProps) == null ? void 0 : _b.span) || 8,
                              "key": item.formItemProps.prop
                            }), {
                              default: () => [(0, external_Vue_.createVNode)((0, external_Vue_.resolveComponent)("el-form-item"), (0, external_Vue_.mergeProps)(item.formItemProps, {
                                "class": index_module_default()["form-item"]
                              }), _isSlot(_slot2 = this._generateComponent(item, slots)) ? _slot2 : {
                                default: () => [_slot2]
                              })]
                            });
                          })) ? _slot3 : {
                            default: () => [_slot3]
                          })];
                        }
                      });
                    };
                  }
                });
              }
            }
            ;
            class Form extends FormCore {
              constructor(config) {
                super(config);
                this.setComponentProps = this.setComponentProps.bind(this);
                this.setFormValue = this.setFormValue.bind(this);
                this.setFormConfig = this.setFormConfig.bind(this);
                this.addFormConfig = this.addFormConfig.bind(this);
                this.removeFormConfig = this.removeFormConfig.bind(this);
                this.setFormDisabled = this.setFormDisabled.bind(this);
              }
              /**
               * 动态更新表单项的组件属性
               * @param prop 表单项的 prop 值
               * @param componentProps 需要更新的组件属性对象
               */
              setComponentProps(prop, componentProps) {
                const targetItem = this.formConfig.find((item) => item.formItemProps.prop === prop);
                if (targetItem) {
                  if (!targetItem.componentProps) {
                    targetItem.componentProps = {};
                  }
                  Object.assign(targetItem.componentProps, componentProps);
                }
              }
              /**
               * 动态更新表单值
               * @param key 表单项的 key
               * @param value 要更新的值
               */
              setFormValue(formData) {
                Object.assign(this.formValue, formData);
              }
              /**
               * 更新指定表单项的配置
               * @param prop 表单项的 prop 值
               * @param config 新的配置项
               */
              setFormConfig(prop, config) {
                const targetIndex = this.formConfig.findIndex((item) => item.formItemProps.prop === prop);
                if (targetIndex > -1) {
                  const newConfig = {
                    ...this.formConfig[targetIndex],
                    formItemProps: {
                      ...this.formConfig[targetIndex].formItemProps,
                      ...config.formItemProps || {},
                      prop
                      // Ensure prop is preserved
                    },
                    componentProps: {
                      ...this.formConfig[targetIndex].componentProps,
                      ...config.componentProps || {}
                    }
                  };
                  this.formConfig[targetIndex] = newConfig;
                  if (config.hasOwnProperty("defaultValue")) {
                    this.formValue[prop] = config.defaultValue;
                  }
                }
              }
              /**
               * 在指定位置添加表单配置项
               * @param config 要添加的表单配置
               * @param index 插入的位置索引，如果不传则追加到末尾
               */
              addFormConfig(config, index) {
                const exists = this.formConfig.some((item) => item.formItemProps.prop === config.formItemProps.prop);
                if (!exists) {
                  const processedConfig = this._handleConfig([config])[0];
                  if (typeof index === "number" && index >= 0 && index <= this.formConfig.length) {
                    this.formConfig.splice(index, 0, processedConfig);
                  } else {
                    this.formConfig.push(processedConfig);
                  }
                  const vals = this._initValue(this.formValue, [processedConfig]);
                  Object.assign(this.formValue, vals);
                }
              }
              /**
               * 删除表单配置项
               * @param prop 要删除的表单项的 prop 值
               */
              removeFormConfig(props) {
                const indexesToRemove = props.reduce((acc, prop) => {
                  const index = this.formConfig.findIndex((item) => item.formItemProps.prop === prop);
                  if (index > -1) {
                    acc.push(index);
                  }
                  return acc;
                }, []);
                if (indexesToRemove.length > 0) {
                  indexesToRemove.sort((a, b) => b - a);
                  indexesToRemove.forEach((index) => {
                    const prop = this.formConfig[index].formItemProps.prop;
                    this.formConfig.splice(index, 1);
                    delete this.formValue[prop];
                  });
                }
              }
              setFormDisabled(disabled) {
                this.disabled.value = disabled;
              }
            }
            ;
            function useForm(config) {
              const form = new Form(config);
              const FastForm = form.getform();
              const {
                formRef,
                formValue,
                addItem,
                removeItem,
                setComponentProps,
                setFormValue,
                setFormConfig,
                addFormConfig,
                removeFormConfig,
                setFormDisabled
              } = form;
              return {
                FastForm,
                formValue,
                rawFormValue: (0, external_Vue_.toRaw)(formValue),
                formRef,
                addItem,
                removeItem,
                setComponentProps,
                setFormValue,
                setFormConfig,
                addFormConfig,
                removeFormConfig,
                setFormDisabled
              };
            }
            ;
            const hooks = {
              useForm
            };
            const ElementPlusFastForm = {
              install: (app) => {
                app.config.globalProperties.$useForm = useForm;
              },
              ...hooks
            };
            var src_0 = ElementPlusFastForm;
            const debounce = (fn, delay) => {
              let timer = null;
              return function(...args) {
                const _t = this;
                clearTimeout(timer);
                timer = setTimeout(function() {
                  fn.apply(_t, args);
                }, delay);
              };
            };
            const _ResizeObserver = window.ResizeObserver;
            window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
              constructor(callback) {
                callback = debounce(callback, 16);
                super(callback);
              }
            };
            ;
            var entry_lib = src_0;
          }();
          __webpack_exports__ = __webpack_exports__["default"];
          return __webpack_exports__;
        }()
      );
    });
  }
});
export default require_index_umd();
/*! Bundled license information:

@vue/compiler-core/dist/compiler-core.esm-bundler.js:
  (**
  * @vue/compiler-core v3.5.16
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **)

@vue/compiler-dom/dist/compiler-dom.esm-bundler.js:
  (**
  * @vue/compiler-dom v3.5.16
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **)

vue/dist/vue.cjs.js:
  (**
  * vue v3.5.16
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **)
*/
//# sourceMappingURL=element-plus-fast-form.js.map
