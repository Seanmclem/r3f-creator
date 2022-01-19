import React, { useState } from "react";
import { TextInput } from "ready-fields";

//
import { BabelFileResult, NodePath, transform } from "@babel/core";
import tsPlugin from "@babel/plugin-syntax-typescript";
import generate from "@babel/generator";
import traverse from "@babel/traverse";
import * as types from "@babel/types";
import ReactJson from "react-json-view";
import {
  ASTtoolsContainer,
  TopBar,
  Spacer,
  ColumnsContainer,
  Column,
} from "./AstTools";
import * as astFunctions from "../functions/ast_functions";
import { UIchild } from "../translators/TemplateToComponents";
//
import { basicCanvas1 } from "../templates/canvas-templates";

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
    filename: "form-file.tsx",
  });
};
const changeAstToCode = (
  newAST: any,
  babelFileResult: BabelFileResult | null
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
const addImports = (path: NodePath<types.Program>) => {
  path.pushContainer(
    "body",
    types.importDeclaration(
      [
        types.importDefaultSpecifier(types.identifier("React")),
        types.importSpecifier(
          types.identifier("useState"),
          types.identifier("useState")
        ),
      ],
      types.stringLiteral("react")
    )
  );

  path.pushContainer(
    "body",
    types.importDeclaration(
      [
        types.importSpecifier(
          types.identifier("TextInput"),
          types.identifier("TextInput")
        ),
      ],
      types.stringLiteral("ready-fields")
    )
  );
};

const addExport = (path: NodePath<types.Program>) => {
  const commentDebugger = types.debuggerStatement();
  commentDebugger.leadingComments = [
    {
      type: "CommentLine",
      value: "  ",
    } as any,
  ];

  const useStateTypeCallExpression = types.callExpression(
    types.identifier("useState"),
    [types.stringLiteral("")]
  );
  useStateTypeCallExpression.typeParameters =
    types.tsTypeParameterInstantiation([types.tsStringKeyword()]);

  path.pushContainer(
    "body",
    /// START Simple function declaration/body
    [
      types.exportNamedDeclaration(
        types.variableDeclaration("const", [
          types.variableDeclarator(
            // typeAnnotation on identifier -> https://github.com/babel/babel/issues/12895
            Object.assign(types.identifier("FormCreatorInner"), {
              typeAnnotation: types.typeAnnotation(
                types.genericTypeAnnotation(
                  types.qualifiedTypeIdentifier(
                    types.identifier("FC"),
                    types.identifier("React")
                  ),
                  types.typeParameterInstantiation([
                    types.objectTypeAnnotation([]),
                  ])
                )
              ),
            }),
            types.arrowFunctionExpression(
              [
                // types.objectPattern([])
              ],
              // blockStatement body, is just an array of the function statements...
              types.blockStatement([
                types.returnStatement(
                  types.jsxFragment(
                    types.jsxOpeningFragment(),
                    types.jsxClosingFragment(),
                    renderChildren(basicCanvas1)
                  )
                ),
              ])
            )
          ),
        ])
      ),
    ]
    /// END Simple function declaration/body
  );
};

const renderChildren: any = (children: UIchild[]) => {
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

const renderAttributes: any = (attributes: any) => {
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

const transformAST = (
  babelFileResult: BabelFileResult | null,
  setBabelFileResult: any
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
const codeToAst = (code: string = "", setBabelFileResult?: any) => {
  const babelFileResult = changeCodetoAST(code);
  setBabelFileResult(babelFileResult);
};

const theString = `
export const FormCreatorInner: React.FC<{}> = () => {

    return (
        <>
          <mesh>
            <boxGeometry args={[5, 5, 5]} />
            <meshBasicMaterial color={"blue"} />
          </mesh>
        </>
    )
}`;
export const FormCreator: React.FC<{}> = () => {
  const [babelFileResult, setBabelFileResult] = useState<any>();
  const [astResult, setAstResult] = useState<any>();
  const [finalCode, setFinalCode] = useState("");

  return (
    <ASTtoolsContainer>
      <TopBar>
        <button
          onClick={() => {
            codeToAst(theString, setBabelFileResult);
          }}
        >
          {`Code To full AST`}
        </button>
        <Spacer />
      </TopBar>

      <TopBar>
        <button
          onClick={() => {
            codeToAst("", setBabelFileResult);
          }}
        >
          {`Code To blank AST`}
        </button>
        <Spacer />
        <button
          onClick={() => {
            const ast = transformAST(babelFileResult, setBabelFileResult);
            setAstResult(ast);
          }}
        >
          {`Add Body to AST`}
        </button>
        <Spacer />
        <button
          onClick={() => {
            const finalCode = changeAstToCode(astResult, babelFileResult);
            setFinalCode(finalCode?.code || "");
          }}
        >
          {`AST back to Code`}
        </button>
      </TopBar>
      <ColumnsContainer>
        <Column>
          <div>
            {`--------------------------------------
                      ${theString}`}
          </div>
        </Column>

        <Column>
          {babelFileResult?.ast && (
            <ReactJson
              src={babelFileResult.ast}
              collapsed
              enableClipboard={false}
            />
          )}
        </Column>
        <Column>{finalCode}</Column>
      </ColumnsContainer>
    </ASTtoolsContainer>
  );
};

const handleSubmit = (event: any) => {
  event.preventDefault();
  debugger;
};
export const FormCreatorInner: React.FC<{}> = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextInput
          name="first-name"
          label="First Name"
          text={firstName}
          setText={setFirstName}
        />
        <TextInput
          name="phone"
          label="Phone"
          text={phone}
          setText={setPhone}
          type="tel"
        />
        <TextInput
          name="email"
          label="Email"
          text={email}
          setText={setEmail}
          type="email"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
