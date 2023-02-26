const getHomePageInfo = () => {
    fetch('/getHomePageInfo').then(res => res.json())
        .then(res => {

            document.querySelector('.account-container').innerHTML = '';
            const login = document.createElement('div');
            login.classList.add('login');

            login.textContent = 'Login';


            const loginField = document.createElement('div');
            loginField.classList.add('login');
            loginField.id = 'login-field';
            loginField.classList.add('field');

            const name = document.createElement('div');
            name.classList.add('login');
            name.textContent = 'Name';



            const nameField = document.createElement('div');
            nameField.classList.add('login');
            nameField.id = 'name-field';
            nameField.classList.add('field');

            document.querySelector('.account-container').append(login, loginField, name, nameField)

            document.getElementById('login-field').textContent = `${res.mail}`;
            document.getElementById('name-field').textContent = `${res.userName}`;
        });

};
export {getHomePageInfo};