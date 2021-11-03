import React, { useState } from "react"
import { TextInput } from "ready-fields"

//
import { BabelFileResult, NodePath, transform } from '@babel/core'
import tsPlugin from "@babel/plugin-syntax-typescript"
import generate from "@babel/generator"
import traverse from "@babel/traverse";
import * as types from "@babel/types";
import ReactJson from "react-json-view"
import { ASTtoolsContainer, TopBar, Spacer, ColumnsContainer, Column } from "./AstTools"
import * as astFunctions from "../functions/ast_functions"
//

const changeCodetoAST = (code: string) => {
    return transform(code, {
        ast: true,
        babelrc: false,
        plugins: [
            [
                tsPlugin,
                {
                    "isTSX": true,
                    allExtensions: true,
                }
            ]
        ],
        filename: "form-file.tsx"
    });
}
const changeAstToCode = (newAST: any, babelFileResult: BabelFileResult | null) => {
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
}
const addImports = (path: NodePath<types.Program>) => {
    path.pushContainer('body', types.importDeclaration(
        [
            types.importDefaultSpecifier(types.identifier("React")),
            types.importSpecifier(types.identifier("useState"), types.identifier("useState")),
        ],
        types.stringLiteral("react")
    ));

    path.pushContainer('body', types.importDeclaration(
        [
            types.importSpecifier(types.identifier("TextInput"), types.identifier("TextInput")),
        ],
        types.stringLiteral("ready-fields")
    ));
}

const addExport = (path: NodePath<types.Program>) => {
    const commentDebugger = types.debuggerStatement();
        commentDebugger.leadingComments = [{
            "type": "CommentLine",
            "value": "  ",
        } as any]

    const useStateTypeCallExpression = types.callExpression(
        types.identifier("useState"),
        [
            types.stringLiteral("")
        ]
    )
    useStateTypeCallExpression.typeParameters = types.tsTypeParameterInstantiation([
        types.tsStringKeyword()
    ])

    path.pushContainer(
      "body",
      /// START Simple function declaration/body
      [
        types.variableDeclaration("const", [
          types.variableDeclarator(
            types.identifier("handleSubmit"),
            types.arrowFunctionExpression(
              [
                Object.assign(types.identifier("event"), {
                  typeAnnotation: types.typeAnnotation(
                    types.genericTypeAnnotation(types.identifier("any"))
                  ),
                  // leadingComment: "//"
                }),
              ],
              types.blockStatement([
                types.expressionStatement(
                  types.callExpression(
                    types.memberExpression(
                      types.identifier("event"),
                      types.identifier("preventDefault")
                    ),
                    []
                  )
                ),
                commentDebugger,
              ])
            )
          ),
        ]),
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
                  astFunctions.createStringUseState({
                    valueName: "firstName",
                    setValue: "setFirstName",
                    initialValue: "",
                  }),
                  astFunctions.createStringUseState({
                    valueName: "phone",
                    setValue: "setPhone",
                    initialValue: "",
                  }),
                  astFunctions.createStringUseState({
                    valueName: "email",
                    setValue: "setEmail",
                    initialValue: "",
                  }),
                  types.returnStatement(
                    types.jsxElement(
                      types.jsxOpeningElement(types.jsxIdentifier("div"), []),
                      types.jsxClosingElement(types.jsxIdentifier("div")),
                      [
                        types.jsxText("\n \n"),

                        types.jsxElement(
                            types.jsxOpeningElement(
                                types.jsxIdentifier("form"),
                                [
                                    types.jsxAttribute(
                                        types.jsxIdentifier("onSubmit"),
                                        types.jsxExpressionContainer(
                                            types.identifier("handleSubmit")
                                        )                                    ),
                                ]
                            ),
                            types.jsxClosingElement(
                                types.jsxIdentifier("form")
                            ),
                            [

                                types.jsxText("\n \n"),

                                types.jsxElement(
                                  types.jsxOpeningElement(
                                    types.jsxIdentifier("TextInput"),
                                    [
                                      types.jsxAttribute(
                                        types.jsxIdentifier("name"),
                                        types.stringLiteral("first-name")
                                      ),
                                      types.jsxAttribute(
                                        types.jsxIdentifier("label"),
                                        types.stringLiteral("First Name")
                                      ),
                                      types.jsxAttribute(
                                        types.jsxIdentifier("text"),
                                        types.jsxExpressionContainer(
                                          types.identifier("firstName")
                                        )
                                      ),
                                      types.jsxAttribute(
                                        types.jsxIdentifier("setText"),
                                        types.jsxExpressionContainer(
                                          types.identifier("setFirstName")
                                        )
                                      ),
                                    ]
                                  ),
                                  null,
                                  []
                                ),
                                types.jsxText("\n \n"),
        
                                types.jsxElement(
                                  types.jsxOpeningElement(
                                    types.jsxIdentifier("TextInput"),
                                    [
                                      types.jsxAttribute(
                                        types.jsxIdentifier("name"),
                                        types.stringLiteral("phone")
                                      ),
                                      types.jsxAttribute(
                                        types.jsxIdentifier("label"),
                                        types.stringLiteral("Phone")
                                      ),
                                      types.jsxAttribute(
                                        types.jsxIdentifier("text"),
                                        types.jsxExpressionContainer(
                                          types.identifier("phone")
                                        )
                                      ),
                                      types.jsxAttribute(
                                        types.jsxIdentifier("setText"),
                                        types.jsxExpressionContainer(
                                          types.identifier("setPhone")
                                        )
                                      ),
                                    ]
                                  ),
                                  null,
                                  []
                                ),
                                types.jsxText("\n \n"),
        
                                types.jsxElement(
                                  types.jsxOpeningElement(
                                    types.jsxIdentifier("TextInput"),
                                    [
                                      types.jsxAttribute(
                                        types.jsxIdentifier("name"),
                                        types.stringLiteral("email")
                                      ),
                                      types.jsxAttribute(
                                        types.jsxIdentifier("label"),
                                        types.stringLiteral("Email")
                                      ),
                                      types.jsxAttribute(
                                        types.jsxIdentifier("text"),
                                        types.jsxExpressionContainer(
                                          types.identifier("email")
                                        )
                                      ),
                                      types.jsxAttribute(
                                        types.jsxIdentifier("setText"),
                                        types.jsxExpressionContainer(
                                          types.identifier("setEmail")
                                        )
                                      ),
                                    ]
                                  ),
                                  null,
                                  []
                                ),
                                types.jsxText("\n \n"),
        
                                types.jsxElement(
                                    types.jsxOpeningElement(
                                      types.jsxIdentifier("button"),
                                      [
                                        types.jsxAttribute(
                                            types.jsxIdentifier("type"),
                                            types.stringLiteral("ssubmit")
                                          ),
                                      ]
                                    ),
                                    types.jsxClosingElement(
                                        types.jsxIdentifier("button")
                                    ),
                                    [
                                        types.jsxText("\n           Submit\n"),
                                    ]
                                ),

                                types.jsxText("\n \n"),

                            ]
                        ),
                        
                        types.jsxText("\n \n"),
                      ]
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


const transformAST = (babelFileResult: BabelFileResult | null, setBabelFileResult: any) => {
    if (!babelFileResult?.ast) {
        return undefined
    }
    else {
        const ast = babelFileResult.ast
        traverse(ast, {
            Program(path) { // When the current node is the Program node
                addImports(path)
                addExport(path)
            }
        })
        setBabelFileResult(babelFileResult)
        return ast
    }
}
const codeToAst = (code: string = "", setBabelFileResult?: any) => {
    const babelFileResult = changeCodetoAST(code)
    setBabelFileResult(babelFileResult)
}

const theString = `import React, { useState } from "react";
import { TextInput } from "ready-fields";


const handleSubmit = (event: any) => {
    event.preventDefault();
    debugger;
}
export const FormCreatorInner: React.FC<{}> = () => {
    const [firstName, setFirstName] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [email, setEmail] = useState<string>("")
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
                <button
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}`
export const FormCreator: React.FC<{}> = () => {
    const [babelFileResult, setBabelFileResult] = useState<any>()
    const [astResult, setAstResult] = useState<any>()
    const [finalCode, setFinalCode] = useState("");

    return (
        <ASTtoolsContainer>
            <TopBar>
                <button onClick={() => {
                    codeToAst(theString, setBabelFileResult)
                }}>
                    {`Code To full AST`}
                </button>
                <Spacer />
            </TopBar>

            <TopBar>
                <button onClick={() => {
                    codeToAst("", setBabelFileResult)
                }}>
                    {`Code To blank AST`}
                </button>
                <Spacer />
                <button onClick={() => {
                    const ast = transformAST(babelFileResult, setBabelFileResult)
                    setAstResult(ast)
                }}>
                    {`Add Body to AST`}
                </button>
                <Spacer />
                <button onClick={() => {
                    const finalCode = changeAstToCode(astResult, babelFileResult)
                    setFinalCode(finalCode?.code || '')
                }}>
                    {`AST back to Code`}
                </button>
            </TopBar>
            <ColumnsContainer>
                <Column>
                    <FormCreatorInner />
                    <div>
                      {`----------------------------------------------
                      ${theString}`}
                    </div>
                </Column>
                
                <Column>
                    {babelFileResult?.ast && 
                      <ReactJson
                        src={babelFileResult.ast}
                        collapsed
                        enableClipboard={false}
                      />
                    }
                </Column>
                <Column>
                    {finalCode}
                </Column>
            </ColumnsContainer>
        </ASTtoolsContainer>
    )
}


const handleSubmit = (event: any) => {
    event.preventDefault();
    debugger;
}
export const FormCreatorInner: React.FC<{}> = () => {
    const [firstName, setFirstName] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [email, setEmail] = useState<string>("")
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
                <button
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}