export function getString(file, callback) {    
    if (file) {
    const reader = new FileReader();
        reader.readAsDataURL(file)

    reader.onload = () => {
      callback(reader.result)
    }
  }
}

export function getFileData(file) {
    return new Promise((resolve, reject )=> {
        if (file) {
            const reader = new window.FileReader();
            reader.readAsArrayBuffer(file)

            reader.onloadend = () => {
                const buffer = Buffer.from(reader.result);
                resolve(buffer); 
            }
        } else {
            reject("Can't read the file");
        }
    });
}
