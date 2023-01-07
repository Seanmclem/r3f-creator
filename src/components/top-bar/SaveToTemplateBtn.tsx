import { Button } from "@mantine/core";
import React, { useState } from "react";
import styled from "styled-components";
import { useTemplateStore } from "../../stores/templateStore";
import {
  createFileInDirectory,
  EntryType,
  getDirectoryContents,
  getTextFileContents,
  setup_opened_directory,
  traverse_folder_paths,
  update_File_In_Directory,
} from "../../utils/file-system-utils";
import { template_objects } from "../../templates/canvas-templates";
import { changeAstToCode, changeCodetoAST } from "../exporter-two/export-utils";

interface props {}

export const SaveToTemplateBtn: React.FC<props> = () => {
  const mainTemplate = useTemplateStore((state) => state.mainTemplate);

  const [_selected_folder, set_selected_folder] = useState<
    FileSystemDirectoryHandle | undefined
  >();

  const [selected_folder_contents, set_folder_contents] = useState<
    EntryType[] | undefined
  >();

  const handle_save_to_JSON = async () => {
    const directoryHandle = await window.showDirectoryPicker();
    set_selected_folder(directoryHandle); // ?

    const folder_contents = await getDirectoryContents({ directoryHandle });
    set_folder_contents(folder_contents); // ?

    const templates_folder_handle = await traverse_folder_paths({
      folder_contents,
      paths: ["src", "templates"],
    });

    if (
      !templates_folder_handle ||
      templates_folder_handle?.[0] !== "templates"
    ) {
      alert(`"templates" folder not found`);
      return;
    }

    const templates_folder_contents = await setup_opened_directory(
      templates_folder_handle[1] as FileSystemDirectoryHandle
    );

    console.log({ templates_folder_contents });

    const the_file = templates_folder_contents.find(
      (file) => file[0] === "canvas-templates.ts"
    );

    console.log({ the_file });

    const templates_fileHandle = the_file?.[1];

    if (templates_fileHandle) {
      const file_text = await getTextFileContents(
        templates_fileHandle as FileSystemFileHandle
      );
      console.log({ file_text });

      const all_templates_babel_file = changeCodetoAST(file_text) as any;

      console.log({
        ast: all_templates_babel_file?.ast?.program.body[0]?.declaration
          .declarations[0].init,
      });

      const updated_template_ast = changeCodetoAST(
        JSON.stringify(mainTemplate)
      ) as any;

      console.log({
        updated_template_ast:
          updated_template_ast?.ast?.program.body[0].expression.elements[0],
      });

      if (
        all_templates_babel_file?.ast?.program.body[0]?.declaration
          .declarations[0].init
      ) {
        // Set specific-static-template to updated-template
        all_templates_babel_file.ast.program.body[0].declaration.declarations[0].init =
          updated_template_ast?.ast?.program.body[0].expression.elements[0];

        const newBabelFileResult = changeCodetoAST("");

        const new_contents = changeAstToCode({
          new_Ast: all_templates_babel_file.ast,
          new_BabelFileResult: all_templates_babel_file,
        });

        console.log({ new_contents });

        await update_File_In_Directory({
          directoryHandle:
            templates_folder_handle[1] as FileSystemDirectoryHandle,
          filename: "canvas-templates.ts",
          contents: new_contents?.code || "", // need it
        });
      }

      //need to write to file
    }

    // ast[0].declaration.declaration[0]
    // literally, just replace the node
    // parse it from the template_store, obj->json->ast-> copy-to- that node above ^^

    // this is all about saving, not reading. reading templates here, not important
    // ...

    // "export"_path-> FILE > externalModileIndicator > modifiers > ExportKeyword

    // "const"_path-> FILE > externalModileIndicator > declarationList >

    // "main_template"_path-> FILE > externalModileIndicator > declarationList > declarations[] > VariableDeclaration > name>escapedText > "main_template"

    // "JSON"_path-> FILE > externalModileIndicator > declarationList > declarations[] > VariableDeclaration > initializer > text > JSON

    //window.alert("not implemented");
  };

  return (
    <Container>
      <Button
        size="xs"
        onClick={handle_save_to_JSON}
        style={{ height: "75%", marginTop: 3 }}
      >
        Save to Template
      </Button>
    </Container>
  );
};

const Container = styled.div``;
