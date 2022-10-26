import React, { useEffect, useState } from "react";

//
import { BabelFileResult, NodePath } from "@babel/core"; // ???!!?
import * as types from "@babel/types";
import ReactJson from "react-json-view";
import {
  ASTtoolsContainer,
  TopBar,
  Space,
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
  addImports_ToBody,
  Imported,
} from "../functions/ast_functions_DEPRECATED";
import { saveFile } from "../functions/file-system-utils";
import { useTemplateStore } from "../stores/templateStore";
import { UIchild } from "../translators/TemplateToComponents";

const addExport = ({
  path,
  mainTemplate,
  parentComponentName,
}: {
  path: NodePath<types.Program>;
  mainTemplate: UIchild[];
  parentComponentName?: string;
}) => {
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
                    renderChildren(mainTemplate) // not equiv to mainTemplate
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

  console.log({ basicCanvas1 });
  console.log({ mainTemplate });
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
export const ExporterDEPRECATED: React.FC<{}> = () => {
  /** BabelFileResult contains the dot-ast object */
  const [babelFileResult, setBabelFileResult] =
    useState<BabelFileResult | null>(null);
  const [astResult, setAstResult] = useState<types.File | undefined>();
  const [finalCode, setFinalCode] = useState<string>("");

  const mainTemplate = useTemplateStore((state) => state.mainTemplate);
  const updateMainTemplate = useTemplateStore(
    (state) => state.updateMainTemplate
  );
  // useEffect(() => {
  //   updateMainTemplate(basicCanvas1); // added on first load ... Needs to not do this, after Exporter is implemented as modal
  // }, []);

  const addImports = (path: NodePath<types.Program>) => {
    const reactImport: Imported = { default: "React", from: "react" };
    console.log({ "mainTemplate[0].children": mainTemplate[0].children });

    const importsMapped = mainTemplate[0].children.map(
      (usedComponents) => usedComponents.tagName
    );

    const uniqueImportsMapped = [...new Set(importsMapped)];

    const uniqueImportsFormatted = uniqueImportsMapped.map((tagName) => ({
      default: tagName,
      from: `./${tagName}`,
    }));

    const imported = [reactImport, ...uniqueImportsFormatted];

    addImports_ToBody(path, imported);
  };

  const handleJsonTemplate_to_AST = () => {
    /** BabelFileResult contains the dot-ast object */
    const newBabelFileResult = changeCodetoAST("");
    const newAST = addExportBody_to_AST({
      babelFileResult: newBabelFileResult,
      addImports,
      addExport,
      mainTemplate,
    });

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
    const newAST = addExportBody_to_AST({
      babelFileResult: newBabelFileResult,
      addImports,
      addExport,
      mainTemplate,
    });

    console.log({ newAST });

    setBabelFileResult(newBabelFileResult); // do I need this
    setAstResult(newAST);

    const newFinalCode = changeAstToCode(newAST, newBabelFileResult);
    setFinalCode(newFinalCode?.code || "");
  };

  const justExport = () => {
    const newBabelFileResult = changeCodetoAST("");
    const newAST = addExportBody_to_AST({
      babelFileResult: newBabelFileResult,
      addImports,
      addExport,
      mainTemplate,
    });
    const newFinalCode = changeAstToCode(newAST, newBabelFileResult);

    newFinalCode?.code && saveFile(newFinalCode.code);

    // export to new file handle,
    // or later make a directory and just drop it there
  };

  return (
    <ASTtoolsContainer>
      <TopBar>
        <button onClick={handleJsonTemplate_to_AST}>
          {`JSON Template to AST`}
        </button>
        <Space />

        <button onClick={handleAst_to_codeString}>
          {`AST to Code-string`}
        </button>
        <Space />

        <button onClick={doAll}>{`Finish Code-gen`}</button>
        <Space />

        <button onClick={justExport}>{`Actually Export To File`}</button>
        <Space />
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
