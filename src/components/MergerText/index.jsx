import React, { useState } from 'react';
import style from "./mergerText.module.css";
import { Button } from "react-bootstrap";

const FileUploader = () => {
  const [fileList, setFileList] = useState([]);
  const [downloadLink, setDownloadLink] = useState(null);
  const [error, setError] = useState(null);

  const handleFileUpload = async e => {
    const files = e.target.files;
    const fileArray = Array.from(files);

    const promises = fileArray.map(async file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => {
          resolve({
            name: file.name,
            textContent: e.target.result
          });
        };
        reader.readAsText(file);
      });
    });

    const fileData = await Promise.all(promises);
    setFileList(fileData);
  };

  const mergeFiles = async () => {
    if (fileList.length < 2) {
      setError('Selecione pelo menos 2 arquivos');
      return;
    }

    setError(null);

    const file = new Blob(
      fileList.map(file => file.textContent + '\n'),
      { type: 'text/plain' }
    );

    const fileURL = URL.createObjectURL(file);
    setDownloadLink(fileURL);
  };

  const reset = () => {
    setFileList([]);
    setDownloadLink(null);
    setError(null);
  };

   return (
    <div className={style.mergerElements}   >
      <label  className={style.labelStyle}   for="file">Escolher arquivos TXT</label>
      <input accept = ".txt" className={style.inputFiles} type="file" name="file" id='file' multiple onChange={handleFileUpload} />
      {error && <p className={style.msgErro} >{error}</p>}
      <ul className={style.lista}>
        {fileList.map(file => (
          <li key={file.name}  className={style.fileName} >{file.name}</li>
        ))}
      </ul>
      <div className={style.buttons}>
      <button class="shadow-none btn btn-primary" onClick={mergeFiles}>Mesclar</button>
      <button class="btn btn-danger" onClick={reset}>Resetar</button>
      {downloadLink && fileList.length > 1  && (
        <a class="shadow-none btn btn-success"  href={downloadLink} download="merged.txt">
          Download
        </a>
      )}
      </div>     
    </div>
  );
};

export default FileUploader;
