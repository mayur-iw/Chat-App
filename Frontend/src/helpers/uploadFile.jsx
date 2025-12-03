const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`

// console.log("process.env.REACT_APP_CLOUD_NAME",import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file',file);
    formData.append('upload_preset','chat-application');

    const response = await fetch(url,{
        method:'post',
        body:formData
    });
    const responseData = await response.json();

    return responseData;
}

export default uploadFile;