import React, { useRef } from "react";

const ImageUpload = ({ onFileUpload }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      ["image/jpeg", "image/png"].includes(file.type) &&
      file.size <= 5 * 1024 * 1024
    ) {
      onFileUpload(file);
    } else {
      alert("5MB以下のJPEGまたはPNGファイルをアップロードしてください。");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (
      file &&
      ["image/jpeg", "image/png"].includes(file.type) &&
      file.size <= 5 * 1024 * 1024
    ) {
      onFileUpload(file);
    } else {
      alert("5MB以下のJPEGまたはPNGファイルをアップロードしてください。");
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
        画像をドラッグ＆ドロップするか、<span>ファイルを選択</span>してアップロード
      </p>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/jpeg,image/png"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </form>
  );
};

export default ImageUpload;