import React, { useState } from 'react';
import { FilePond } from 'react-filepond';
import { useSelector } from 'react-redux';

// расширения для изображений
// import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
// import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
// import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

// registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function UploadMusic() {
  const [files, setFiles] = useState([]);
  const { user } = useSelector((state) => state.authState);

  const handleInit = () => {
    console.log('upload');
  };
  console.log(files);

  return (
    <FilePond
      files={files}
      onupdatefiles={(fileItems) => {
        // Set currently active file objects to this.state
        setFiles({
          files: fileItems.map((fileItem) => fileItem.file)
        });
      }}
      allowMultiple
      maxFiles={10}
      oninit={() => handleInit}
      server={`/user/${user && user.id}/music`}
      name="files"
      labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
    />
  );
}

export default UploadMusic;
