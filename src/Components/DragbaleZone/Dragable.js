import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { updateFileInNode } from '../Services';
import FormData from 'form-data';

function MyDropzone({ setTextDisbaled }) {
  const [uploadFile, setUploadFile] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setUploadFile(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // To pass dropped file to Node for processing
  const uploadFileToNode = async () => {
    var fData = new FormData();
    fData.append('file', uploadFile[0]);
    const response = await updateFileInNode(fData);
    if (response.uploadComplete) {
      setTextDisbaled(false);
      alert('Upload Succesful! Proceed with data fetching.');
    }
  };

  return (
    <>
      <div
        className='ui center aligned container'
        {...getRootProps()}
        style={{
          height: '100px',
          borderStyle: 'solid',
          borderBlockColor: 'red',
          backgroundColor: 'lightGreen',
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p
            style={{
              marginTop: '30px',
              fontWeight: 'bold',
            }}
          >
            Drop the files here ...
          </p>
        ) : (
          <p style={{ marginTop: '30px' }}>
            {uploadFile[0]
              ? uploadFile[0].name
              : `Drag 'n' drop some files here, or click to select files`}
          </p>
        )}
      </div>

      <div>
        <button
          style={{ marginTop: '5px' }}
          className='ui button primary'
          onClick={uploadFileToNode}
          disabled={!uploadFile.length}
        >
          Upload
        </button>
      </div>
    </>
  );
}

export default MyDropzone;
