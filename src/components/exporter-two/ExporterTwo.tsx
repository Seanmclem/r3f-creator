import { useState } from "react";
import styled from "styled-components";
import { setup_opened_directory } from "../../functions/file-system-utils";
import { useTemplateStore } from "../../stores/templateStore";
import {
  changeAstToCode,
  FilePreview,
  generate_files,
  get_PreviewOutput,
} from "./export-utils";

export const ExporterTwo = () => {
  const mainTemplate = useTemplateStore((state) => state.mainTemplate);
  const [filePreviews, setFilePreviews] = useState<FilePreview[]>([]);
  const [selected_preview_text, set_Selected_preview_text] = useState("");

  const selectPreview = (idx: number) =>
    set_Selected_preview_text(filePreviews[idx].file_contents);

  const handleClick_PreviewOutput = async () => {
    // const showFolderPicker = async () => {
    const handle = await window.showDirectoryPicker();

    if (handle.name !== "live") {
      alert(`Select the 'live' folder`);
      return;
    }

    const live_folder_contents = await setup_opened_directory(handle);
    // };

    generate_files({ mainTemplate, setFilePreviews, live_folder_contents });
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
      <FileArea>
        <FileList>
          {filePreviews.map((filePreview, idx) => (
            <div onClick={() => selectPreview(idx)}>
              {filePreview.file_name}
            </div>
          ))}
        </FileList>
        <FileContentsPreview>
          {selected_preview_text || "none"}
        </FileContentsPreview>
      </FileArea>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 90%;
  /* margin-bottom: 130px; */
`;

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
  margin: 5px 0;
  padding: 10px;
`;

const FileArea = styled.div`
  /* background-color: red; */
  width: 100%;
  height: 95%;
  display: grid;
  grid-template-columns: 1fr 2fr;
`;

const FileList = styled.div`
  /* background-color: yellow; */
  display: flex;
  flex-direction: column;
  border: 1px solid gray;
  padding: 10px;
  display: flex;
`;

const FileContentsPreview = styled.div`
  /* background-color: blue; */
  border: 1px solid gray;
  margin-left: 10px;
  white-space: pre-wrap;
  overflow-x: auto;
`;
