import React, { useRef } from "react";

const FileUpload = ({ accept, setFiles, children }) => {
  const input = useRef(null);
  return (
    <div onClick={() => input.current.click()}>
      <input
        ref={input}
        style={{ display: "none" }}
        type="file"
        name="files"
        multiple
        accept={accept}
        onChange={(e) => setFiles(e.target.files)}
      />
      {children}
    </div>
  );
};

export default FileUpload;
