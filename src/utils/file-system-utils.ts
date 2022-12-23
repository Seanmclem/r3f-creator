export const saveFile = async (data: FileSystemWriteChunkType) => {
  // create a new handle
  const newHandle = await window.showSaveFilePicker();

  // create a FileSystemWritableFileStream to write to
  const writableStream = await newHandle.createWritable();

  // write our file
  await writableStream.write(data);

  // close the file and write the contents to disk.
  await writableStream.close();
};

///////crap?
export type EntryType = [string, FileSystemHandle];

const asyncIteratorToArray = async (iterator: any, sort?: boolean) => {
  // verified
  const array = [];
  for await (const handle of iterator) {
    array.push(handle);
  }

  // console.log({array})
  sort && array.sort(comparator);
  return array;
};

function comparator(a: string, b: string) {
  if (a[0] < b[0]) return -1;
  if (a[0] > b[0]) return 1;
  return 0;
}
// https://stackoverflow.com/questions/5435228/sort-an-array-with-arrays-in-it-by-string/5435341

export const saveFilesToDirectory = async (
  directoryHandle: FileSystemDirectoryHandle,
  fileHandles: FileSystemFileHandle[]
) => {
  const poo = await directoryHandle.getFileHandle("name", {});
  // const fileHandle = await directoryHandle.getFileHandle(filename, {
  //   create: true,
  // });
  // await writeFile(fileHandle, " ");
  // return fileHandle;
}; // Can only save with a space

export const createFileInDirectory = async ({
  directoryHandle,
  filename,
}: {
  directoryHandle: FileSystemDirectoryHandle;
  filename: string;
}) => {
  const fileHandle = await directoryHandle.getFileHandle(filename, {
    create: true,
  });
  await writeFile({ fileHandle, contents: " " });
  return fileHandle;
}; // Can only save with a space

export const createDirectory = async ({
  directoryHandle,
  directoryName,
}: {
  directoryHandle: FileSystemDirectoryHandle;
  directoryName: string;
}) => await directoryHandle.getDirectoryHandle(directoryName, { create: true }); // UNverified

// UNverified
export const writeFile = async (
  {
    fileHandle,
    contents,
  }: { fileHandle: FileSystemFileHandle; contents: FileSystemWriteChunkType } // is it? Dafuq is that
) => {
  const writer = await fileHandle.createWritable();
  await writer.truncate(0); // Make sure we start with an empty file
  await writer.write(contents);
  await writer.close();
};

export const openTextFile = async () => {
  // dafuq test // or create?
  // https://wicg.github.io/file-system-access/#api-filpickeroptions-types
  const options: OpenFilePickerOptions = {
    types: [
      {
        description: "Text Files",
        accept: {
          "text/plain": [".txt", ".text"],
          "text/html": [".html", ".htm"],
        },
      },
    ],
    multiple: false,
  };
  return window.showOpenFilePicker(options);
};

// Verified
export const getDirectoryContents = async ({
  directoryHandle,
  sort = true,
}: {
  directoryHandle: FileSystemDirectoryHandle;
  sort?: boolean;
}): Promise<EntryType[]> => {
  const handlesEntriesIterator = directoryHandle.entries();
  return asyncIteratorToArray(handlesEntriesIterator, sort);
};

// Files
export const getTextFileContents = async (fileHandle: FileSystemFileHandle) => {
  const file: File = await fileHandle.getFile();
  const fileText: string = await file.text();
  return fileText;
};

export const getFileBlobUrl = async (fileHandle: FileSystemFileHandle) => {
  const file: File = await fileHandle.getFile();
  let url = URL.createObjectURL(file);

  return url;
};

export interface VideoData {
  blobUrl: string;
  type: string;
  name: string;
}

export const getVideoData = async (
  fileHandle: FileSystemFileHandle
): Promise<VideoData> => {
  const file: File = await fileHandle.getFile();
  const type: string = file.type;
  let blobUrl = URL.createObjectURL(file);

  const data: VideoData = {
    blobUrl,
    type,
    name: file.name,
  };
  return data;
};

export const setup_opened_directory = async (
  directoryHandle: FileSystemDirectoryHandle
) => {
  const contents = await getDirectoryContents({ directoryHandle });
  // setRootHandle(handle);
  console.log({ contents, directoryHandle });

  return contents;
};

// awesome
const loop_paths = async ({
  folder_contents,
  paths,
  current_path,
}: {
  folder_contents: EntryType[];
  paths: string[];
  current_path: string;
}): Promise<EntryType | undefined> => {
  if (paths.length === 1) {
    return folder_contents.find((entry) => entry[0] === current_path);
  }

  const next_folder = folder_contents.find(
    (entry) => entry[0] === current_path
  );
  if (!next_folder) {
    console.error("Failed to find path", {
      folder_contents,
      paths,
      current_path,
    });
    return undefined;
  }

  const next_folder_handle = next_folder[1];

  if (next_folder_handle.kind !== "directory") {
    console.error("Entry handle is not a directory", {
      folder_contents,
      paths,
      current_path,
    });
  }

  const next_folder_handle_contents = await getDirectoryContents({
    directoryHandle: next_folder_handle as FileSystemDirectoryHandle,
  });

  const next_paths = paths.splice(1);
  const next_current_path = next_paths[0];

  return await loop_paths({
    folder_contents: next_folder_handle_contents,
    paths: next_paths,
    current_path: next_current_path,
  });
};

/** Takes a folder's contnets, and array of nested paths, and returns the EntryType[name][contents] at the final path */
export const traverse_folder_paths = async ({
  folder_contents,
  paths,
}: {
  folder_contents: EntryType[];
  paths: string[];
}) => {
  const result = await loop_paths({
    folder_contents,
    paths,
    current_path: paths[0],
  });

  return result;
};
