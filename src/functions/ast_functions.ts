import { BabelFileResult, NodePath, transform } from "@babel/core";
import tsPlugin from "@babel/plugin-syntax-typescript";
import generate from "@babel/generator";
import traverse from "@babel/traverse";
import * as types from "@babel/types";
import { UIchild } from "../translators/TemplateToComponents";

interface createUseStateProps {
  valueName: string;
  setValue: string;
  initialValue: string;
}
export const createStringUseState = ({
  valueName,
  setValue,
  initialValue,
}: createUseStateProps) => {
  const useStateTypeCallExpression = types.callExpression(
    types.identifier("useState"),
    [types.stringLiteral(initialValue)]
  );
  useStateTypeCallExpression.typeParameters =
    types.tsTypeParameterInstantiation([types.tsStringKeyword()]);

  return types.variableDeclaration("const", [
    types.variableDeclarator(
      types.arrayPattern([
        types.identifier(valueName),
        types.identifier(setValue),
      ]),
      useStateTypeCallExpression
    ),
  ]);
};

export const renderChildren: any = (children: UIchild[]) => {
  if (!children?.length) {
    return [];
  }
  return children.map((mainChild) => {
    const TheComponent = mainChild.tagName as any;
    const props = mainChild.props || [];

    return mainChild.tagName === "Fragment"
      ? types.jsxFragment(
          types.jsxOpeningFragment(),
          types.jsxClosingFragment(),
          renderChildren(mainChild.children)
        )
      : types.jsxElement(
          types.jsxOpeningElement(
            types.jsxIdentifier(mainChild.tagName),
            renderAttributes(mainChild.props)
          ),
          types.jsxClosingElement(types.jsxIdentifier(mainChild.tagName)),
          renderChildren(mainChild.children)
        );
  });
};

export const renderAttributes: any = (attributes: any) => {
  if (!attributes) {
    return [];
  }

  const attributesArray = Object.entries(attributes);

  return attributesArray.map((attributePair) =>
    types.jsxAttribute(
      types.jsxIdentifier(attributePair[0]),
      types.jsxExpressionContainer(
        types.stringLiteral(JSON.stringify(attributePair[1]))
      )
    )
  );
};

export const transformAST = (
  babelFileResult: BabelFileResult | undefined,
  setBabelFileResult: any,
  addExport: (...args: any[]) => void
) => {
  if (!babelFileResult?.ast) {
    return undefined;
  } else {
    const ast = babelFileResult.ast;
    traverse(ast, {
      Program(path) {
        // When the current node is the Program node
        // addImports(path);
        addExport(path);
      },
    });
    setBabelFileResult(babelFileResult);
    return ast;
  }
};

export const stringCode_To_Ast = (
  code: string = "",
  setBabelFileResult?: any
) => {
  const babelFileResult = changeCodetoAST(code);
  setBabelFileResult(babelFileResult);
};
const changeCodetoAST = (code: string) => {
  return transform(code, {
    ast: true,
    babelrc: false,
    plugins: [
      [
        tsPlugin,
        {
          isTSX: true,
          allExtensions: true,
        },
      ],
    ],
    filename: "code-output.tsx",
  });
};

export const changeAstToCode = (
  newAST: any,
  babelFileResult: BabelFileResult | undefined
) => {
  if (!babelFileResult?.code && babelFileResult?.code !== "") {
    return undefined;
  } else {
    const backToCode = generate(
      newAST,
      {
        sourceFileName: "example.tsx",
        filename: "example.tsx",
      },
      babelFileResult.code
    );
    return backToCode;
  }
};
