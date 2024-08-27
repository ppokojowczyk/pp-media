const processFiles = (files, whenDone) => {
    const outputFiles = [];
    let done = 0;
    const callback = (e, file) => {
        outputFiles.push({
            name: 'new-upload',
            data: e.target.result,
            file,
        });
        done++;
        if (done === files.length) {
            whenDone(outputFiles);
        }
    };

    if (files.length) {
        for (const file of files) {
            const reader = new FileReader();
            reader.onload = (e) => callback(e, file);
            reader.readAsDataURL(file);
        }
    }
};

export default processFiles;
