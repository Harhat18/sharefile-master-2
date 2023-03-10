import DowloadFile from "@components/DowloadFile";
import DropZoneComponents from "@components/DropZoneComponents";
import RenderFile from "@components/RenderFile";
import axios from "axios";
import { useState } from "react";
import EmailFrom from "../components/EmailFrom";
export default function Home() {
  const [file, setFile] = useState(null);
  const [id, setId] = useState(null);
  const [downloadPageLink, setdownloadPageLink] = useState(null);
  const [uploadState, setUploadState] = useState<
    "Uploading" | "Upload Failed" | "Uploaded" | "Upload"
  >("Upload");
  const handleUpload = async () => {
    if (uploadState === "Uploading") return;
    setUploadState("Uploading");
    const formData = new FormData();
    formData.append("myFile", file);
    try {
      const { data } = await axios({
        method: "post",
        data: formData,
        url: "api/files/upload",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setdownloadPageLink(data.downloadPageLink);
      setId(data.id);
    } catch (error) {
      console.log(error.response.data);
      setUploadState("Upload Failed");
    }
  };
  const resetComponent = () => {
    setFile(null);
    setdownloadPageLink(null);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="my-4 text-3x1 font-medium">
        Got a File? Share It Like Fake News
      </h1>
      <div className="flex flex-col items-center justify-center w-96 bg-gray-800 shadow-xl rounded-xl justify-xl">
        {!downloadPageLink && <DropZoneComponents setFile={setFile} />}
        {file && (
          <RenderFile
            file={{
              format: file.type.split("/")[1],
              name: file.name,
              sizeInBytes: file.size,
            }}
          />
        )}

        {/* upload button */}
        {!downloadPageLink && file && (
          <button
            className="w-44 bg-gray-900 rounded-md p-2 my-5 focus:outline-none "
            onClick={handleUpload}
          >
            {uploadState}
          </button>
        )}
        {downloadPageLink && (
          <div className="p-2 text-center">
            <DowloadFile downloadPageLink={downloadPageLink} />
            <EmailFrom id={id} />
            {/* Email form */}
            <button
              className="w-44 bg-gray-900 rounded-md p-2 my-5 focus:outline-none "
              onClick={resetComponent}
            >
              Upload New file
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
