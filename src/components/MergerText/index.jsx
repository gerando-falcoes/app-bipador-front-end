import React, { useState } from 'react';
import style from "./mergerText.module.css";

const FileUploader = () => {
  const [fileList, setFileList] = useState([]);
  const [downloadLink, setDownloadLink] = useState(null);
  const [error, setError] = useState(null);
  const [totalQuantity, setTotalQuantity] = useState(0);

const handleFileUpload = async e => {
  const files = e.target.files;
  const fileArray = Array.from(files);

  const promises = fileArray.map(file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => {
        const text = e.target.result;
        let fileTotal = 0;

        const lines = text.split('\n');
        lines.forEach(line => {
          const [code, qtyStr] = line.trim().split(/\s+/);
          const qty = parseInt(qtyStr, 10);
          if (!isNaN(qty)) {
            fileTotal += qty;
          }
        });

        resolve({
          name: file.name,
          textContent: text,
          itemCount: fileTotal, // opcional: pode usar depois se quiser ver por arquivo
        });
      };
      reader.readAsText(file);
    });
  });

  const fileData = await Promise.all(promises);
  setFileList(fileData);

  // Soma total de todos os arquivos
  const total = fileData.reduce((sum, file) => sum + file.itemCount, 0);
  setTotalQuantity(total);
};

const mergeFiles = async () => {
  if (fileList.length < 2) {
    setError('Selecione pelo menos 2 arquivos');
    return;
  }

  setError(null);

  const productMap = new Map();

  fileList.forEach(file => {
    const lines = file.textContent.split('\n').filter(line => line.trim() !== '');

    lines.forEach(line => {
      const [code, quantityStr] = line.trim().split(/\s+/);
      const quantity = parseInt(quantityStr, 10);

      if (!isNaN(quantity)) {
        const currentQuantity = productMap.get(code) || 0;
        productMap.set(code, currentQuantity + quantity);
      }
    });
  });

  // Ordena os códigos numericamente (opcional)
  const sortedEntries = Array.from(productMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));

  let result = sortedEntries.map(([code, quantity]) => `${code} ${quantity}`).join('\n');

  const file = new Blob([result], { type: 'text/plain' });
  const fileURL = URL.createObjectURL(file);
  setDownloadLink(fileURL);
};

  const reset = () => {
    setFileList([]);
    setDownloadLink(null);
    setError(null);
    setTotalQuantity(0);
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
      {<p>Quantidade total de produtos: {totalQuantity}</p>}
      <p>Quantidade total de arquivos: {fileList.length}</p>
      <div className={style.buttons}>
      <button className="shadow-none btn btn-primary" onClick={mergeFiles}>Mesclar</button>
      <button className="btn btn-danger" onClick={reset}>Limpar</button>
      {downloadLink && fileList.length > 1  && (
        <a className="shadow-none btn btn-success"  href={downloadLink} download="merged.txt">
          Download
        </a>
      )}
      </div>     
    </div>
  );
};

export default FileUploader;
