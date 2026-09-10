import React from "react";
import ImageUploader from "react-images-upload";

const ImageUp = props => {


const onDrop = picture => {
    props.setPictures([...props.pictures, picture]);
    };
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