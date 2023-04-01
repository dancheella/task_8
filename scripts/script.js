window.onload = function () {
    //Нахождение элементов
    let inputFullName = document.getElementById('fullName');
    let inputUserName = document.getElementById('userName');
    let inputEmail = document.getElementById('email');
    let inputPassword = document.getElementById('password');
    let inputRepeatPassword = document.getElementById('repeat-password');
    let inputCheckbox = document.getElementById('checkbox');
    let buttonSubmit = document.getElementById('button');
    let popupOpen = document.getElementById('popup');

    //Запрет вводить цифры в Full Name
    inputFullName.oninput = function () {
        this.value = this.value.replace(/[0-9]/g, '');
    }

    //Запрет вводить символы "." и "," в поле Your username
    inputUserName.oninput = function () {
        this.value = this.value.replace(/[,.]/g, '');
    }

    //Проверка изменения значения чекбокса
    inputCheckbox.oninput = (event) => {
        if (event.target.checked) {
            console.log("Согласен");
        } else {
            console.log("Не согласен");
        }
    }

    //Проверка при нажатии на кнопку “Sign Up”
    buttonSubmit.onclick = function () {
        if (inputFullName.value.trim() === '') {
            alert("Заполните поле Full Name");
            return;
        }
        if (inputUserName.value.trim() === '') {
            alert("Заполните поле Your username");
            return;
        }
        if (inputEmail.value.trim() === '') {
            alert("Заполните поле E-mail");
            return;
        }
        if (inputPassword.value.length < 8) {
            alert("Пароль должен содержать не менее 8 символов");
            return;
        }
        if (inputPassword.value !== inputRepeatPassword.value) {
            alert("Пароли не совпадают");
        }
        if (!inputCheckbox.checked) {
            alert('Checkbox не выбран');
        } else {
            popupOpen.classList.add('open');
        }
    }

    //Кнопка, крестик и ссылка 'Already have an account?'
    let popupClose = document.getElementById('popup-close');
    let popupButton = document.getElementById('popup-button');
    let linkHaveAnAccount = document.getElementById('account__link');

    function fn() {
        //Очистка формы
        document.querySelector('form').reset();

        //Удаление popup
        popupOpen.classList.remove('open');

        //Текст "Get your free account" заменить на "Log in to the system"
        document.getElementsByClassName('form__title')[0].innerText = 'Log in to the system';

        //Удаление блоков с полями "Full Name", "E-mail", "Repeat Password", "Checkbox"
        document.getElementsByClassName('form__name')[0].remove();
        document.getElementsByClassName('form__email')[0].remove();
        document.getElementsByClassName('form__repeat-password')[0].remove();
        document.getElementsByClassName('form__label-checkbox')[0].remove();

        //Замена текста в кнопке на «Sign In»
        buttonSubmit.innerText = 'Sign In';

        //Удаление ссылки "Already have an account?"
        document.getElementById('account__link').remove();

        //Проверка, что оба поля (Username и Password) заполнены
        buttonSubmit.onclick = function () {
            if (inputUserName.value.trim() === '') {
                alert("Заполните поле Your username");
                return;
            }
            if (inputPassword.value.trim() === '') {
                alert("Введите пароль");
            } else {
                alert("Добро пожаловать, " + inputUserName.value + "!");
            }
        }
    }

    //Обработка событий
    popupClose.addEventListener("click", fn);
    popupButton.addEventListener('click', fn);
    linkHaveAnAccount.addEventListener('click', fn);
}

console.log('По заданию написать вывод какого-нибудь сообщения в консоль.');