import path from "path";
import { types as t } from "@marko/compiler";
import {
  isNativeTag,
  isDynamicTag,
  isAttributeTag,
  getTagDef,
  importDefault,
} from "@marko/babel-utils";
import { closest } from "./wrapper-component";

const returnRuntimePath = path.join(__dirname, "../components/return");

export default {
  MarkoTag: {
    enter(tag) {
      if (!isCustomTagWithVar(tag)) {
        return;
      }

      const { node } = tag;
      const tagVar = node.var as t.PatternLike;
      const tagVarReplacement = t.objectPattern([
        t.objectProperty(t.identifier("default"), tagVar),
      ]);
      const meta = closest(tag.parentPath)!;
      const returnValueId = tag.scope.generateUidIdentifier(
        `${(tag.node.name as t.StringLiteral).value}Return`
      );
      tag.set("var", tagVarReplacement);

      tag.pushContainer("attributes", [
        t.markoAttribute("_return", returnValueId),
      ]);

      tag.insertBefore(
        t.markoScriptlet([
          t.variableDeclaration("var", [
            t.variableDeclarator(
              returnValueId,
              t.callExpression(
                importDefault(tag.hub.file, returnRuntimePath, "return"),
                [meta.component]
              )
            ),
          ]),
        ])
      );

      tag.insertAfter(
        t.markoScriptlet([
          t.variableDeclaration("const", [
            t.variableDeclarator(
              tagVarReplacement,
              t.callExpression(returnValueId, [])
            ),
          ]),
        ])
      );
    },
    exit(tag) {
      if (isCustomTagWithVar(tag)) {
        tag.node.var = null;
      }
    },
  },
} as t.Visitor;

function isCustomTagWithVar(tag: t.NodePath<t.MarkoTag>) {
  return (
    tag.node.var &&
    !(
      isNativeTag(tag) ||
      isAttributeTag(tag) ||
      isDynamicTag(tag) ||
      getTagDef(tag)?.translator
    )
  );
}
