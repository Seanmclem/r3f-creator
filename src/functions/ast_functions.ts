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
    return [types.jsxText("\n")];
  }

  const result = children.map((mainChild, idx) => {
    const TheComponent = mainChild.tagName as any;
    const props = mainChild.props || [];

    return mainChild.tagName === "Fragment"
      ? types.jsxFragment(
          types.jsxOpeningFragment(),
          types.jsxClosingFragment(),
          [types.jsxText("\n"), ...renderChildren(mainChild.children)]
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
  //   console.log(children);
  return [...result, types.jsxText("\n")];
};

export const formatPropValue = (value: unknown) => {
  if (typeof value === "string") {
    return types.stringLiteral(JSON.stringify(value));
  } else if (Array.isArray(value)) {
    return types.arrayExpression(
      value.map((val) =>
        typeof val === "string"
          ? types.stringLiteral(val)
          : types.numericLiteral(val)
      )
    );
  }
};

export const renderAttributes: any = (props: any) => {
  if (!props) {
    return [];
  }

  const propsArray = Object.entries(props);

  return propsArray
    .filter((PropsKeyValue) => PropsKeyValue[0] && PropsKeyValue[1])
    .map((PropsKeyValue) => {
      return types.jsxAttribute(
        types.jsxIdentifier(PropsKeyValue[0]),
        types.jsxExpressionContainer(
          // // here
          formatPropValue(PropsKeyValue[1])!
        )
      );
    });
};

export const addExportBody_to_AST = (
  babelFileResult: BabelFileResult | null,
  addExport: (...args: any[]) => void,
  parentComponentName?: string
) => {
  if (!babelFileResult?.ast) {
    return undefined;
  } else {
    const ast = babelFileResult.ast;
    traverse(ast, {
      Program(path) {
        // addImports(path);
        addExport(path, parentComponentName);
      },
    });
    return ast;
  }
};

// export const stringCode_To_Ast = (
//   code: string = "",
//   setBabelFileResult?: any
// ) => {
//   const babelFileResult = changeCodetoAST(code);
//   setBabelFileResult(babelFileResult);
// };

export const changeCodetoAST = (code: string) => {
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
  newAST: types.File | undefined,
  babelFileResult: BabelFileResult | null
) => {
  if ((!babelFileResult?.code && babelFileResult?.code !== "") || !newAST) {
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
