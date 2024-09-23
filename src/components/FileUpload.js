import React, { useRef } from "react";

const FileUpload = ({ onFileUpload }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      file.type === "application/pdf" &&
      file.size <= 5 * 1024 * 1024
    ) {
      onFileUpload(file);
    } else {
      alert("5MB以下のPDFファイルをアップロードしてください。");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (
      file &&
      file.type === "application/pdf" &&
      file.size <= 5 * 1024 * 1024
    ) {
      onFileUpload(file);
    } else {
      alert("5MB以下のPDFファイルをアップロードしてください。");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <form
      encType="multipart/form-data"
      className="dropzone"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={() => fileInputRef.current.click()}
    >
      <p>
        ファイルをドラッグ＆ドロップするか、<span>ファイルを選択</span>してアップロード
      </p>
      <input
        type="file"
        name="pdf"
        ref={fileInputRef}
        accept="application/pdf"
        onChange={handleFileChange}
      />
    </form>
  );
};

export default FileUpload;