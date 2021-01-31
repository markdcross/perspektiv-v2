import React, { useState } from "react";
import ImageUploader from "react-images-upload";

const ImageUp = props => {
const [pictures, setPictures] = useState([]);

const onDrop = picture => {
    setPictures([...pictures, picture]);
    };
    console.log(pictures);
    return (
        <ImageUploader
            {...props}
            withIcon={false}
            onChange={onDrop}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
            withPreview={true}
            singleImage={true}
            withLabel={false}
            buttonText="Choose Image"
            buttonClassName="imageUpButton"
        />
    );
};

export default ImageUp;