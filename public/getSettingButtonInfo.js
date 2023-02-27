

const getSettingButtonInfo = () => {
    document.querySelector('.account-container').innerHTML = '';
    const changePassword = document.createElement('div');
    changePassword.id = 'change-password';
    changePassword.classList.add('setting-button');
    changePassword.textContent = 'Змінити пароль';

    const exitButton = document.createElement('div');
    exitButton.id = 'exit-button';
    exitButton.classList.add('setting-button');
    exitButton.textContent = 'Вийти';
    document.querySelector('.account-container').append(changePassword, exitButton);

    exitButton.addEventListener('click', () => {fetch('/logout')
        .then(res => res.json()).then(
            () => {
                window.location = 'http://localhost:3000/';
            }
        )
    ;});

    function addMessage(message){
        let messageDiv = document.createElement('div');
        messageDiv.classList.add('tooltip-reg')
        messageDiv.style.backgroundColor = 'lightgreen';
        messageDiv.style.borderRadius = '1vh';
        messageDiv.style.fontSize = '2vh'
        messageDiv.style.width = '60%';
        messageDiv.style.height = '20%';
        messageDiv.style.color = 'white';
        messageDiv.textContent = message;
        changePassword.after(messageDiv);

    }

    const changingPass = () => {
        $.post('/changingPassword', {
            oldPass: document.getElementById('old-pass').value,
            newPass: document.getElementById('new-pass').value,
            approvePass: document.getElementById('approve-pass').value,
        }).then( res => addMessage(res));
    }

    const changePass = () => {
        const oldPass = document.createElement('input');
        oldPass.id = 'old-pass';
        oldPass.type = 'password';
        oldPass.classList.add('setting-button');
        oldPass.placeholder = 'старий пароль'

        const newPass = document.createElement('input');
        newPass.id = 'new-pass';
        newPass.type = 'password'
        newPass.classList.add('setting-button');
        newPass.placeholder = 'Новий пароль'
        changePassword.after(oldPass, newPass);

        const approvePass = document.createElement('input');
        approvePass.id = 'approve-pass';
        approvePass.type = 'password'
        approvePass.classList.add('setting-button');
        approvePass.placeholder = 'Підтверідть новий пароль'

        const change = document.createElement('input');
        change.type = 'button';
        change.id = 'change-pass-button'
        change.classList.add('setting-button');
        change.value = 'Змінити'

        changePassword.after(oldPass, newPass, approvePass, change);

        change.addEventListener('click', changingPass)



        changePassword.removeEventListener('click', changePass);
    };


    changePassword.addEventListener('click',changePass );

};
export {getSettingButtonInfo};