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

    const changePass = () => {
        const newPass = document.createElement('input');
        newPass.id = 'new-pass';
        newPass.type = 'password';
        newPass.classList.add('setting-button');
        changePassword.after(newPass);
        changePassword.removeEventListener('click', changePass);
    };

    changePassword.addEventListener('click',changePass );

};
export {getSettingButtonInfo};