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
