import React, { useState } from "react";
import styled from "styled-components";

import { BabelFileResult, NodePath, transform } from "@babel/core";
import tsPlugin from "@babel/plugin-syntax-typescript";
import generate from "@babel/generator";
// import template from '@babel/template'
import traverse from "@babel/traverse";
import * as types from "@babel/types";

import { useHistory } from "react-router-dom";
import ReactJson from "react-json-view";
import { useToasts } from "react-toast-notifications";

const originalFiles = {
  blank: ``,
  hasImport: `import React from 'react';`,
  hasJSXcomponent: `import React from 'react'
    export const AstTools: React.FC<{}> = ({}) => {
    return (
        <div>
            AST tools
        </div>
    )
} `,
};

export const ASTtoolsContainer = styled.div``;

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  width: auto;
  height: var(--top-menu-height);
  border: 1px solid gray;
  margin: 2px 10px 10px 10px;
  padding: 10px;
`;

export const ColumnsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Column = styled.div`
  width: 33%;
  border: 1px solid black;
  margin: 5px 10px;
  padding: 10px;
  white-space: pre-wrap;
  overflow-x: auto;
`;

export const Spacer = styled.div`
  height: 100%;
  width: 20px;
`;

const codeToAstToCode = (code: string, setFinalCode: any) => {
  const babelFileResult = changeCodetoAST(code);
  const newAST = transformAST(babelFileResult);
  const finalCode = changeAstToCode(newAST, babelFileResult);

  setFinalCode(finalCode?.code || "");
  console.log({ babelFileResult });
};

const transformAST = (babelFileResult: BabelFileResult | null) => {
  if (!babelFileResult?.ast) {
    return undefined;
  } else {
    const ast = babelFileResult.ast;
    traverse(ast, {
      Program(path) {
        // When the current node is the Program node
        addImports(path);
        addExport(path);
      },
    });
    return ast;
  }
};

const addExport = (path: NodePath<types.Program>) => {
  path.pushContainer(
    "body",
    types.exportNamedDeclaration(
      types.variableDeclaration("const", [
        types.variableDeclarator(
          // typeAnnotation on identifier -> https://github.com/babel/babel/issues/12895
          Object.assign(types.identifier("AstTools"), {
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
            [types.objectPattern([])],
            types.blockStatement(
              [
                types.returnStatement(
                  types.jsxElement(
                    types.jsxOpeningElement(types.jsxIdentifier("div"), []),
                    types.jsxClosingElement(types.jsxIdentifier("div")),
                    [types.jsxText("\n            AST test poop \n")]
                  )
                ),
              ] //,
              //types.objectPattern([])
            )
          )
        ),
      ])
    )
  );
};

const addImports = (path: NodePath<types.Program>) => {
  path.pushContainer(
    "body",
    types.importDeclaration(
      [types.importDefaultSpecifier(types.identifier("React"))],
      types.stringLiteral("react")
    )
  );
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
    filename: "example.tsx",
  });
};

export const AstTools: React.FC<{}> = () => {
  const history = useHistory();
  const gotoFormCreator = () => history.push("/form-creator");

  const codeBlock = originalFiles.hasJSXcomponent;
  const [finalCode, setFinalCode] = useState("");

  const [babelFileResult, setBabelFileResult] = useState<any>();
  const [astResult, setAstResult] = useState<any>();

  const { addToast } = useToasts();

  return (
    <ASTtoolsContainer>
      {/* <TopBar>
                <div>Mode: </div>
                <button>
                    {`Text -> AST -> Text`}
                </button>
            </TopBar> */}
      <TopBar>
        <div>Links: </div>
        <button onClick={gotoFormCreator}>Form Creator</button>
      </TopBar>
      <TopBar>
        <div>Run: </div>
        <button
          onClick={() => codeToAstToCode(originalFiles.blank, setFinalCode)}
        >
          {`Code -> AST -> Code`}
        </button>
        <Spacer />

        <button
          id="code-to-ast"
          onClick={() => {
            const ast = changeCodetoAST(originalFiles.blank);
            setBabelFileResult(ast);
          }}
        >
          {`Code -> AST`}
        </button>
        <Spacer />

        <button
          onClick={() => {
            const ast = transformAST(babelFileResult);
            setAstResult(ast);
            addToast("Transform done~", { appearance: "success" });
          }}
        >
          {`Do Transform`}
        </button>
        <Spacer />

        <button
          onClick={() => {
            const finalCode = changeAstToCode(astResult, babelFileResult);
            setFinalCode(finalCode?.code || "");
          }}
        >
          {`AST to Code`}
        </button>
      </TopBar>
      <ColumnsContainer>
        <Column>{codeBlock}</Column>
        {/* <Column>
                    put like, custom transforms here? need some toasts
                </Column> */}
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
