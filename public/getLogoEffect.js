/*eslint-disable*/

import {uploadPicture} from './uploadPicture.js';
import {getHomePageInfo} from './getHomePageInfo.js';
import {getSettingButtonInfo} from './getSettingButtonInfo.js';

const accountLogo = document.getElementById('account-logo');
const accountImage = document.getElementById('account-image-outer');

const getAccount = () => {
    accountImage.style.display = 'none';

    accountLogo.style.width = '100%';
    accountLogo.style.height = '100vh';
    accountLogo.style.clipPath = 'circle(100%)';
    accountLogo.style.backgroundImage = 'none';
    accountLogo.style.display = 'flex'

    fetch('/getUser').then(res => res.json()).then(
        res1 => {
            fetch('/getCurrentImageAvatar').then(res => res.json()).then(imageRes =>{

                const getBackButton = document.createElement('div');
                getBackButton.classList.add('get-back');
                getBackButton.id = 'get-back';
                getBackButton.addEventListener('click', getBack);


                const plus = document.createElement('div');
                plus.classList.add('plus-icon-account');


                const plusButton = document.createElement('input');
                plusButton.type = 'file'
                plusButton.id = 'add-picture'
                plusButton.name = 'image'
                plusButton.classList.add('plus-button');


                const label = document.createElement('label');
                label.append(plusButton, plus)


                const addPicture = document.createElement('div');
                addPicture.classList.add('add-pic');
                addPicture.append(label);

                const image = document.createElement('img');
                image.id = 'added-image';


                const mainLogo = document.createElement('div');
                mainLogo.classList.add('main-logo');
                mainLogo.id = 'main-logo';
                mainLogo.style.transition = '1s';
                mainLogo.style.opacity = '1';

                const subImageBlock = document.createElement('div');
                subImageBlock.classList.add('sub-image-block');

                subImageBlock.append(image);

                mainLogo.append(addPicture, subImageBlock);

                const userName = document.createElement('div');
                userName.classList.add('user-name-main');
                userName.textContent = res1.username;

                const backGround = document.createElement('div');
                backGround.classList.add('account-background');

                const accountContent = document.createElement('div');
                accountContent.classList.add('account-content');

                const accountContainer = document.createElement('div');
                accountContainer.classList.add('account-container');

                accountContent.append(accountContainer);

                const login = document.createElement('div');
                login.classList.add('login');

                login.textContent = 'Login';


                const loginField = document.createElement('div');
                loginField.classList.add('login');
                loginField.id = 'login-field';
                loginField.classList.add('field');

                const name = document.createElement('div');
                name.classList.add('login');
                name.textContent = 'Name'



                const nameField = document.createElement('div');
                nameField.classList.add('login');
                nameField.id = 'name-field';
                nameField.classList.add('field')

                accountContainer.append(login, loginField, name, nameField)




                const menuAccount = document.createElement('div');
                menuAccount.classList.add('menu-account');
                menuAccount.id = 'menu-acc'

                const homeButton = document.createElement('div');
                homeButton.classList.add('home-button', 'menuBut');

                const statisticButton = document.createElement('div');
                statisticButton.classList.add('statistic-button', 'menuBut');

                const settingsButton = document.createElement('div');
                settingsButton.classList.add('settings-button', 'menuBut');

                const infoButton = document.createElement('div');
                infoButton.classList.add('info-button' , 'menuBut');

                menuAccount.append(homeButton,statisticButton,settingsButton,infoButton)

                const topBlock = document.createElement('div');
                topBlock.classList.add('top-block');
                topBlock.append(getBackButton,backGround,mainLogo,userName);


                accountLogo.append(topBlock, accountContent, menuAccount);

                let currentActiveButton = document.getElementById('menu-acc').firstChild;

                currentActiveButton.classList.toggle('active-but');

                menuAccount.addEventListener('click', event => {
                    if (event.target.className.includes('settings-button')){
                        getSettingButtonInfo();
                    }
                    if (event.target.className.includes('home-button')){
                        getHomePageInfo();
                    }


                    if (event.target.className.includes('menuBut')){
                        currentActiveButton.classList.toggle('active-but')
                        event.target.classList.toggle('active-but');
                        currentActiveButton = event.target;

                    }
                })

                    getHomePageInfo();
                    uploadPicture();
                document.getElementById('added-image').src = `data:${imageRes.contentType};base64,${imageRes.buffer}`;

            })


        }
    );
    accountLogo.removeEventListener('click', getAccount);




};

const getBack = () => {

    accountLogo.style.width = '12vh';
    accountLogo.style.height = '12vh';

    accountLogo.style.backgroundImage = 'url("/image/user-logo.png")';

    setTimeout(()=>{
        accountLogo.style.clipPath = 'circle(40%)'
        accountLogo.innerHTML = '';
        accountLogo.style.display  = 'grid'
        accountImage.style.display = 'flex';
        accountLogo.append(accountImage);

        accountLogo.addEventListener('click', getAccount);},100);
};



accountLogo.addEventListener('click', getAccount);



