import React, { Dispatch, FunctionComponent, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const DropZoneComponents: FunctionComponent<{ setFile: Dispatch<any> }> = ({
  setFile,
}) => {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: {
        "image/jpeg": [".jpeg", ".png"],
        "audio/mpeg": [".mp3", "mpeg"],
      },
    });
  return (
    <div className="p-4 w-full">
      <div
        {...getRootProps()}
        className="w-full rounded-md cursor-pointer h-80 focus:outline-none"
      >
        <input {...getInputProps()} />

        <div
          className={
            "flex flex-col items-center justify-center border-2 border-dashed border-yellow-light h-full rounded-xl space-y-3 " +
            (isDragReject === true ? "border-red-500" : "") +
            (isDragAccept === true ? "border-green-500" : "")
          }
        >
          <img src="/images/folder.png" alt="folder" className="h-16 w-16" />
          {isDragReject ? (
            <p>Sorry, This app only supports images and mp3</p>
          ) : (
            <div>
              <p>Drag & Drop Files Here</p>
              <p className="mt-2 text-base text-gray-300">
                Only jpeg , png & mp3 file supported
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DropZoneComponents;
