import { BabelFileResult, NodePath, transform } from "@babel/core";
import tsPlugin from "@babel/plugin-syntax-typescript";
import generate from "@babel/generator";
import traverse from "@babel/traverse";
import * as types from "@babel/types";
import { UIchild } from "../../translators/TemplateToComponents";
import { EntryType, getTextFileContents } from "../../utils/file-system-utils";

export interface NamedImport {
  name: string;
  nameOverride?: string;
}

export interface Imported {
  default?: string;
  named?: NamedImport[];
  from: string;
}

export interface FilePreview {
  path: string;
  file_name: string;
  file_contents: string;
}

export const changeCode_to_BabelFileResult = (code: string) => {
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

export const new_blank_BabelFileResult = () =>
  changeCode_to_BabelFileResult("");

export const get_PreviewOutput = ({
  mainTemplate,
}: {
  mainTemplate: UIchild[];
}) => {
  console.log({ mainTemplate });

  const new_BabelFileResult = new_blank_BabelFileResult();

  if (new_BabelFileResult?.ast) {
    const ast = new_BabelFileResult.ast;
    const parentComponentName = "ExportedTree"; // Name of top-level component in file
    traverse(ast, {
      Program(path) {
        addImports({ path, mainTemplate });
        addExport({ path, parentComponentName, mainTemplate });
      },
    });

    return { new_Ast: ast, new_BabelFileResult }; // fully loaded, next - magic happens
  }
};

const addImports = ({
  path,
  mainTemplate,
}: {
  path: NodePath<types.Program>;
  mainTemplate: UIchild[];
}) => {
  const reactImport: Imported = { default: "React", from: "react" };
  console.log({ "mainTemplate[0].children": mainTemplate[0].children });

  const physics_Rapier_Import: Imported = {
    named: [{ name: "Physics" }],
    from: "@react-three/rapier",
  };

  const importsMapped = mainTemplate[0].children.map(
    (usedComponents) => usedComponents.tagName
  );

  const uniqueImportsMapped = [...new Set(importsMapped)];

  const uniqueImportsFormatted = uniqueImportsMapped.map((tagName) => {
    const the_import: Imported = {
      named: [{ name: tagName }],
      from: `./${tagName}`,
    };
    return the_import;
  });

  const imports = [
    reactImport,
    physics_Rapier_Import,
    ...uniqueImportsFormatted,
  ];

  addImports_ToBody({ path, imports });
};

export const addImports_ToBody = ({
  path,
  imports,
}: {
  path: NodePath<types.Program>;
  imports: Imported[];
}) => {
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
};

//

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
              types.identifier(parentComponentName || "GameCreatorInner"),
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
                  types.jsxElement(
                    // double fragment
                    types.jsxOpeningElement(types.jsxIdentifier("Physics"), []),
                    types.jsxClosingElement(types.jsxIdentifier("Physics")),
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
};

export const renderChildren: any = (children: UIchild[]) => {
  if (!children?.length) {
    return [types.jsxText("\n")];
  }

  const child_ast = children.map((mainChild) => {
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
          mainChild.children.length === 0
            ? []
            : renderChildren(mainChild.children) // fixes "/n" in children, errors
        );
  });

  const jsx_newLines_array: types.JSX[] = [];

  child_ast.forEach((child_item) => {
    jsx_newLines_array.push(child_item);
    jsx_newLines_array.push(types.jsxText("\n"));
  });

  return [...jsx_newLines_array];
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

export const formatPropValue = (value: unknown) => {
  // Magic happens
  if (typeof value === "string") {
    return types.stringLiteral(value);
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

export const changeAstToCode = ({
  new_Ast,
  new_BabelFileResult,
}: {
  new_Ast: types.File;
  new_BabelFileResult: BabelFileResult;
}) => {
  if (
    (!new_BabelFileResult?.code && new_BabelFileResult?.code !== "") ||
    !new_Ast
  ) {
    // babelFileResult?.code should be empty. what about after?
    return;
  } else {
    const backToCode = generate(
      new_Ast,
      {
        sourceFileName: "change_me_maybe.tsx",
        filename: "change_me_maybe.tsx",
      },
      new_BabelFileResult.code
    );
    console.log("new_BabelFileResult?.code", new_BabelFileResult?.code);

    // extract resule as code property, backToCode.code
    return backToCode;
  }
};

export const generate_files = async ({
  mainTemplate,
  live_folder_contents,
}: {
  mainTemplate: UIchild[];
  live_folder_contents: EntryType[];
}) => {
  const built_ast = get_PreviewOutput({ mainTemplate });
  if (built_ast) {
    const string_code = changeAstToCode(built_ast);
    console.log({ string_code });

    const exportedTree_file: FilePreview = {
      path: "components",
      file_name: "ExportedTree.tsx",
      file_contents: string_code?.code || "no output, woops.",
    };

    const imported_main_componants = get_imported_components({ mainTemplate });

    // from parsed directory
    const components_to_copy = live_folder_contents.filter((file) => {
      const componen_name_from_file = file[0].split(".tsx")[0];
      return imported_main_componants.includes(componen_name_from_file);
    });

    const other_imported_files = await get_all_files_as_FilePreview(
      components_to_copy
    );

    return [exportedTree_file, ...other_imported_files];
  }
};

export const get_all_files_as_FilePreview = async (
  components_to_copy: EntryType[]
) => {
  const promises = components_to_copy.map(async (component_file) => {
    return {
      path: "/",
      file_name: component_file[0],
      file_contents: await getTextFileContents(
        component_file[1] as FileSystemFileHandle
      ),
    };
  });
  return Promise.all(promises);
};

const get_imported_components = ({
  mainTemplate,
}: {
  mainTemplate: UIchild[];
}) => {
  const imports_mapped = mainTemplate[0].children.map(
    (usedComponents) => usedComponents.tagName
  );
  console.log({ imports_mapped });

  return imports_mapped;
};
