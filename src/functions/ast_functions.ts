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
  // Magic happens
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
  } else if (typeof value === "boolean") {
    return types.booleanLiteral(value);
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
        // render prop by name
        types.jsxIdentifier(PropsKeyValue[0]),
        types.jsxExpressionContainer(
          // format prop values
          formatPropValue(PropsKeyValue[1])!
        )
      );
    });
};

export interface NamedImport {
  name: string;
  nameOverride?: string;
}

export interface Imported {
  default?: string;
  named?: NamedImport[];
  from: string;
}

export const addImports_ToBody = (
  path: NodePath<types.Program>,
  imports: Imported[]
) => {
  imports.forEach((imported) => {
    const arrayToAdd = [];

    if (imported.default) {
      arrayToAdd.push(
        types.importDefaultSpecifier(types.identifier(imported.default))
      );
    }
    if (imported.named?.length) {
      imported.named.forEach((namedImport) => {
        arrayToAdd.push(
          types.importSpecifier(
            types.identifier(namedImport.name),
            types.identifier(namedImport.nameOverride || namedImport.name)
          )
        );
      });
    }

    path.pushContainer(
      "body",
      types.importDeclaration(
        [...arrayToAdd],
        types.stringLiteral(imported.from)
      )
    );
  });

  // path.pushContainer(
  //   "body",
  //   types.importDeclaration(
  //     [
  //       types.importDefaultSpecifier(types.identifier("React")),
  //       types.importSpecifier(
  //         types.identifier("useState"),
  //         types.identifier("useState")
  //       ),
  //     ],
  //     types.stringLiteral("react")
  //   )
  // );

  // path.pushContainer(
  //   "body",
  //   types.importDeclaration(
  //     [
  //       types.importSpecifier(
  //         types.identifier("TextInput"),
  //         types.identifier("TextInput")
  //       ),
  //     ],
  //     types.stringLiteral("ready-fields")
  //   )
  // );
};

/** addExport: populates the json template, into the AST, before returning it */
export const addExportBody_to_AST = ({
  babelFileResult,
  addImports,
  addExport,
  parentComponentName = "CustomComponent",
  mainTemplate,
}: {
  babelFileResult: BabelFileResult | null;
  addImports: (path: NodePath<types.Program>) => void;
  addExport: ({
    path,
    mainTemplate,
    parentComponentName,
  }: {
    path: NodePath<types.Program>;
    mainTemplate: UIchild[];
    parentComponentName?: string | undefined;
  }) => void;
  parentComponentName?: string;
  mainTemplate: UIchild[];
}) => {
  if (!babelFileResult?.ast) {
    return undefined;
  } else {
    const ast = babelFileResult.ast;
    traverse(ast, {
      Program(path) {
        addImports(path);
        addExport({ path, parentComponentName, mainTemplate });
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
