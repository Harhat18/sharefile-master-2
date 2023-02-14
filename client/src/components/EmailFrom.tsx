import axios from "axios";
import { FunctionComponent, useState } from "react";
const EmailFrom: FunctionComponent<{ id: string }> = ({ id }) => {
  const [emailFrom, setEmailFrom] = useState("");
  const [emailTo, setEmailTo] = useState("");
  const [message, setMessage] = useState(null);

  const handleEmail = async () => {
    try {
      const { data } = await axios({
        method: "POST",
        url: "api/files/email",
        data: {
          id,
          emailFrom,
          emailTo,
        },
      });
      setMessage(data.message);
    } catch (error) {
      setMessage(error.data.response.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full p-2 space-y-3 ">
      <h3>you can also send the file through mail</h3>
      <form
        className="flex flex-col items-center justify-center w-full p-2 space-y-3 "
        onSubmit={handleEmail}
      >
        <input
          className="p-1 text-white bg-gray-800 border-2 focus:outline-none"
          type="email"
          placeholder="Email From"
          required
          onChange={(e) => setEmailFrom(e.target.value)}
          value={emailFrom}
        />
        <input
          className="p-1 text-white bg-gray-800 border-2 focus:outline-none"
          type="email"
          placeholder="Email From"
          required
          onChange={(e) => setEmailTo(e.target.value)}
          value={emailTo}
        />
        <button
          className="w-44 bg-gray-900 rounded-md p-2 my-5 focus:outline-none"
          type="submit"
        >
          Email
        </button>
      </form>
      {}
    </div>
  );
};

export default EmailFrom;