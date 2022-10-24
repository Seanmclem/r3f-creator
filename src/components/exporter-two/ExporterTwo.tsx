import styled from "styled-components";
import { useTemplateStore } from "../../stores/templateStore";
import { changeAstToCode, get_PreviewOutput } from "./export-utils";

export const ExporterTwo = () => {
  const mainTemplate = useTemplateStore((state) => state.mainTemplate);

  const handleClick_PreviewOutput = () => {
    const built_ast = get_PreviewOutput({ mainTemplate });
    if (built_ast) {
      const string_code = changeAstToCode(built_ast);
      console.log({ string_code });
      // ^^TEST me/all
    }
  };

  // generate
  //  ExportedTree.tsx
  //  GenericBox

  return (
    <Container>
      <TopBar>
        <ButtonPretty onClick={handleClick_PreviewOutput}>
          Preview output
        </ButtonPretty>
      </TopBar>
    </Container>
  );
};

const Container = styled.div``;

const ButtonPretty = styled.button`
  background-color: lightblue;
  outline: none;
  border: none;
  padding: 5px 10px;
  border-radius: 10px;
`;

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  width: auto;
  height: var(--top-menu-height);
  border: 1px solid gray;
  margin: 2px 10px 10px 10px;
  padding: 10px;
`;
