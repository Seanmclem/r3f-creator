import { useState } from "react";
import styled from "styled-components";
import {
  createFileInDirectory,
  EntryType,
  getDirectoryContents,
  setup_opened_directory,
  traverse_folder_paths,
  writeFile,
} from "../../utils/file-system-utils";
import { useTemplateStore } from "../../stores/templateStore";
import { FilePreview, generate_files } from "./export-utils";

export const ExporterTwo = () => {
  const mainTemplate = useTemplateStore((state) => state.mainTemplate);
  const [filePreviews, setFilePreviews] = useState<FilePreview[]>([]);
  const [selected_preview, set_Selected_preview] = useState<
    FilePreview | undefined
  >();

  const [_selected_folder, set_selected_folder] = useState<
    FileSystemDirectoryHandle | undefined
  >();

  const [selected_folder_contents, set_folder_contents] = useState<
    EntryType[] | undefined
  >();

  const selectPreview = (idx: number) =>
    set_Selected_preview(filePreviews[idx]);

  const handleClick_PreviewOutput = async () => {
    const directoryHandle = await window.showDirectoryPicker();
    set_selected_folder(directoryHandle);

    const folder_contents = await getDirectoryContents({ directoryHandle });
    set_folder_contents(folder_contents);

    const live_folder_handle = await traverse_folder_paths({
      folder_contents,
      paths: ["src", "components", "main-ui", "editor-gui-components", "live"],
    });

    if (live_folder_handle?.[0] !== "live") {
      alert(`"live" folder not found`);
      return;
    }

    const live_folder_contents = await setup_opened_directory(
      live_folder_handle[1] as FileSystemDirectoryHandle
    );

    const new_file_previews = await generate_files({
      mainTemplate,
      live_folder_contents,
    });

    //need to convert to file-handles

    if (new_file_previews) {
      setFilePreviews(new_file_previews);
    }
  };

  const handleClick_Export_previews_to_final_folder = async () => {
    // opens directory for 'exported'
    if (!selected_folder_contents) {
      console.error("No selected_folder_contents found");
      return false;
    }

    const directory_entry = await traverse_folder_paths({
      folder_contents: selected_folder_contents,
      paths: ["exported", "src", "components"],
    });

    if (!directory_entry?.[1]) {
      console.error("No directory_entry[1] found");
      return false;
    }

    const directoryHandle = directory_entry[1] as FileSystemDirectoryHandle;

    const fileFolder_create_promises: Promise<FileSystemFileHandle>[] = [];

    filePreviews.forEach((file_preview) =>
      fileFolder_create_promises.push(
        createFileInDirectory({
          directoryHandle,
          filename: file_preview.file_name,
        })
      )
    );

    const fileFolder_create_results = await Promise.all(
      fileFolder_create_promises
    );

    // const fileHandle_inside_directoryHandle = await createFileInDirectory({
    //   directoryHandle,
    //   filename: "file_test.txt",
    // });
    // console.log("got file handle"); // 2

    const write_files_results: any[] = [];

    fileFolder_create_results.forEach((fileFolder_create, idx) =>
      write_files_results.push(
        writeFile({
          fileHandle: fileFolder_create,
          contents: filePreviews[idx].file_contents,
        })
      )
    );

    await Promise.all(write_files_results);

    // await writeFile({
    //   fileHandle: fileHandle_inside_directoryHandle,
    //   contents: "Look at all this FILE",
    // });
    console.log("wrote files?"); // 3
    //
    /// ^^ Test steps work great.
    /// Need to build a loop for them
    /// And, just bite the bullet, use one shared directory handle
    /// instead of 2
    //

    //open exported/src/components ... everything can be written there
    // ...
    // hold directory-handle
    // iterate over file_previews, use createFileInDirectory for each to save each file to that directory
    // done?
    /// OR
    // get main project directory_handle
    // hold it
    // save to it here
    // turn file_previews into file_handles/entry
    // save file_handles into directory_handle
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
        {filePreviews.length ? (
          <ButtonPretty onClick={handleClick_Export_previews_to_final_folder}>
            Do Export
          </ButtonPretty>
        ) : null}
      </TopBar>
      <FileArea>
        <FileList>
          {filePreviews.map((filePreview, idx) => (
            <FilenameItem
              selected={selected_preview?.file_name === filePreview.file_name}
              onClick={() => selectPreview(idx)}
            >
              {filePreview.file_name}
            </FilenameItem>
          ))}
        </FileList>
        <FileContentsPreview>
          {selected_preview?.file_contents || "none"}
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
  grid-template-columns: 1fr 2.5fr;
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

const FilenameItem = styled.div<{ selected?: boolean }>`
  background-color: ${({ selected }) => (selected ? "blue" : "transparent")};
  cursor: pointer;
  margin: 0px 5px 5px 0px;
  padding: 5px;
  padding-left: 10px;
  border-radius: 10px;
  color: ${({ selected }) => (selected ? "white" : "black")};
`;
