/*eslint-disable*/

const uploadPicture = () => {
    const uploadButton = document.getElementById('add-picture');
    const pushImage = async (event) => {
        let form = new FormData();
        form.append('image', event.target.files[0]);
       await $.ajax({
            url: '/uploadImage',
            type: 'POST',
            processData: false,
            contentType: false,
            dataType: 'json',
            data: form,
        }).then((image) => {
            console.log(image)
            document.getElementById('added-image').src = `data:${image.contentType};base64,${image.buffer}`;
            document.getElementById('account-image-outer').src = `data:${image.contentType};base64,${image.buffer}`;
        })


    }

    uploadButton.addEventListener('change', pushImage, false);




}
export {uploadPicture}

