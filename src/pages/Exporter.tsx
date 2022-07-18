import React, { useState } from "react";

//
import { BabelFileResult, NodePath } from "@babel/core"; // ???!!?
import * as types from "@babel/types";
import ReactJson from "react-json-view";
import {
  ASTtoolsContainer,
  TopBar,
  Spacer,
  ColumnsContainer,
  Column,
} from "./_OLD_AstTools";
//
import { basicCanvas1 } from "../templates/canvas-templates";
import {
  changeAstToCode,
  // stringCode_To_Ast,
  renderChildren,
  addExportBody_to_AST,
  changeCodetoAST,
} from "../functions/ast_functions";

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

const addExport = (
  path: NodePath<types.Program>,
  parentComponentName?: string
) => {
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
            Object.assign(
              types.identifier(parentComponentName || "FormCreatorInner"),
              {
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
              }
            ),
            types.arrowFunctionExpression(
              [
                // types.objectPattern([])
              ],
              // blockStatement body, is just an array of the function statements...
              types.blockStatement([
                types.returnStatement(
                  types.jsxFragment(
                    // double fragment
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
export const Exporter: React.FC<{}> = () => {
  /** BabelFileResult contains the dot-ast object */
  const [babelFileResult, setBabelFileResult] =
    useState<BabelFileResult | null>(null);
  const [astResult, setAstResult] = useState<types.File | undefined>();
  const [finalCode, setFinalCode] = useState<string>("");

  const handleJsonTemplate_to_AST = () => {
    /** BabelFileResult contains the dot-ast object */
    const newBabelFileResult = changeCodetoAST("");
    const newAST = addExportBody_to_AST(
      newBabelFileResult,
      addExport, //addExport populates the json template, into the AST, before returning it
      "CustomComponent"
    );

    console.log({ newAST });

    setBabelFileResult(newBabelFileResult); // do I need this
    setAstResult(newAST);
  };

  const handleAst_to_codeString = () => {
    const newFinalCode = changeAstToCode(astResult, babelFileResult);
    setFinalCode(newFinalCode?.code || ""); // dot-code is the code-string-result
    console.log({ code: newFinalCode?.code || "poo" });
  };

  const doAll = () => {
    const newBabelFileResult = changeCodetoAST("");
    const newAST = addExportBody_to_AST(
      newBabelFileResult,
      addExport, //addExport populates the json template, into the AST, before returning it
      "CustomComponent"
    );

    console.log({ newAST });

    setBabelFileResult(newBabelFileResult); // do I need this
    setAstResult(newAST);

    const newFinalCode = changeAstToCode(newAST, newBabelFileResult);
    setFinalCode(newFinalCode?.code || "");
  };

  return (
    <ASTtoolsContainer>
      <TopBar>
        <button onClick={handleJsonTemplate_to_AST}>
          {`JSON Template to AST`}
        </button>
        <Spacer />

        <button onClick={handleAst_to_codeString}>
          {`AST to Code-string`}
        </button>
        <Spacer />

        <button onClick={doAll}>{`Export To File`}</button>
        <Spacer />
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
