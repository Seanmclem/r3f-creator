import * as types from "@babel/types";


interface createUseStateProps {
    valueName: string;
    setValue: string;
    initialValue: string;
}
export const createStringUseState = ({valueName, setValue, initialValue}: createUseStateProps) => {
    const useStateTypeCallExpression = types.callExpression(
        types.identifier("useState"),
        [
            types.stringLiteral(initialValue)
        ]
    )
    useStateTypeCallExpression.typeParameters = types.tsTypeParameterInstantiation([
        types.tsStringKeyword()
    ])

    return types.variableDeclaration("const", 
        [
            types.variableDeclarator(
                types.arrayPattern([
                    types.identifier(valueName),
                    types.identifier(setValue)
                ]),
                useStateTypeCallExpression
            )
        ]
    )
}