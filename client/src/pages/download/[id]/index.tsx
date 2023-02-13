import { GetServerSidePropsContext, NextPage } from "next";
import axios from "axios";
import { IFile } from "libs/types";
import RenderFile from "@components/RenderFile";

const index: NextPage<{ file: IFile }> = ({
  file: { format, name, sizeInBytes, id },
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-3 space-y-4 bg-gray-800 rounded-md shadow-xl w-96">
      {!id ? (
        <span>ooops! File does not exist! che</span>
      ) : (
        <>
          <img src="/images/file-download.png" alt="" className="w-16 h-16  " />
          <h1 className="text-xl ">Your file is ready to be downloaded</h1>
          <RenderFile file={{ format, name, sizeInBytes }} />
          <button className="w-44 bg-gray-900 rounded-md p-2 my-5 focus:outline-none ">
            Download
          </button>
        </>
      )}
    </div>
  );
};

export default index;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  let file;
  try {
    const { data } = await axios.get(`http://localhost:8000/api/files/${id}`);
    file = data;
  } catch (error) {
    console.log(error);
    file = {};
  }
  return {
    props: {
      file,
    },
  };
}
