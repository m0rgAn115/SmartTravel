import React, { useState } from 'react'
import { FaImage } from "react-icons/fa";

const ImageUpload = ({ onImageSelect }) => {
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setPreviewUrl(imageUrl);
        onImageSelect(imageUrl, file);
      }
    };
  return (
    <div className="imgUploadBoxWrapper">
        <div className="imgUploadBox cursor-pointer overflow-hidden rounded-md duration-300 flex items-center justify-center flex-col">
            <input type="file" accept='image/*' onChange={handleImageChange} />
            {previewUrl ? (
                <img
                    src={previewUrl}
                    alt="Vista previa"
                    className="rounded-md"
                    style={{ maxWidth: "100px", maxHeight: "100px", marginTop: "10px" }}
                />
                ) : (
                <>
                    <FaImage className="icon" />
                    <h4 className="mb-0 text-gray-600 text-center w-100">Subir Imagen</h4>
                </>
            )}
        </div>
    </div>
  )
}

export default ImageUpload
