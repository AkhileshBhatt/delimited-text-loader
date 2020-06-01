import axios from 'axios';
const ROOT_URL = 'http://localhost:3005';

export const getTableData = async () => {
  try {
    const URL = ROOT_URL.concat('/tableData');
    const response = await axios.get(URL);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateFileInNode = async (file) => {
  try {
    const URL = ROOT_URL.concat('/uploadData');
    const response = await axios.post(URL, file, {
      headers: {
        accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${file._boundary}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
