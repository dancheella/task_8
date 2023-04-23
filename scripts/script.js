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
  let errorInputs = document.querySelectorAll('.error-input');
  let formTitle = document.querySelectorAll('.form__title');

//Проверка заполнения
  // Сброс формы
  function resetInputBorders() {
    const inputElements = [inputFullName, inputUserName, inputEmail, inputPassword, inputRepeatPassword, inputCheckbox];
    inputElements.forEach(element => {
      element.style.border = '1px solid transparent';
    });
  }

  // Сброс рамки
  function hideErrorInputs() {
    for (let i = 0; i < errorInputs.length; i++) {
      errorInputs[i].style.display = 'none';
    }
  }

  // Сообщение в случаи несоответствия
  function showError(inputElement, message) {
    inputElement.style.border = '1px solid red';
    inputElement.style.marginBottom = '10px';
    inputElement.nextElementSibling.textContent = message;
    inputElement.nextElementSibling.style.display = 'block';
  }

  // Проверяем, есть ли массив clients в Local Storage
  let clients = JSON.parse(localStorage.getItem('clients')) || [];

  // Записать данные
  function saveUserToLocalStorage() {
    // Создаем объект с данными пользователя
    const user = {
      fullName: inputFullName.value.trim(),
      userName: inputUserName.value.trim(),
      email: inputEmail.value.trim(),
      password: inputPassword.value.trim()
    };

    // Выводим его содержимое в консоль
    console.log(clients);

    // Добавляем нового пользователя в массив clients
    clients.push(user);

    // Сохраняем обновленный массив clients в Local Storage
    localStorage.setItem('clients', JSON.stringify(clients));
  }

  // Проверка присутствия в массиве
  function loginUser() {
    const username = inputUserName.value.trim();
    const password = inputPassword.value.trim();

    if (username && password) {
      const users = clients.filter(user => user.userName === username);

      if (users.length === 0) {
        showError(inputUserName, 'Такой пользователь не зарегистрирован');
      } else {
        const user = users.find(user => user.password === password);

        if (!user) {
          showError(inputPassword, 'Неверный пароль');
        } else {
          formTitle[0].style.textAlign = 'center';
          formTitle[0].innerText = `Welcome, ${user.fullName}`;
          document.querySelectorAll('.form__label').forEach(elem => elem.remove());
          buttonSubmit.innerText = 'Exit';

          //Перезагрузка страницы
          buttonSubmit.addEventListener('click', function () {
            location.reload();
          });
        }
      }
    }
  }

  buttonSubmit.onclick = function () {
    resetInputBorders();
    hideErrorInputs();

    // Full Name может содержать только буквы и пробел
    if (inputFullName.value.trim() === '') {
      showError(inputFullName, 'Пустое поле');
    } else if (!/^[a-zа-я\s]+$/gi.test(inputFullName.value.trim())) {
      showError(inputFullName, 'Может содержать только буквы и пробелы');
      return;
    }

    // Проверяем, есть ли уже пользователь с таким именем
    const userNameExists = clients.some(client => client.userName === inputUserName.value.trim());

    // Your username - может содержать только буквы, цифры, символ подчеркивания и тире
    if (inputUserName.value.trim() === '') {
      showError(inputUserName, 'Пустое поле');
    } else if (!/^[a-zа-я0-9_-]+$/gi.test(inputUserName.value.trim())) {
      showError(inputUserName, 'Может содержать только буквы, цифры, символ подчеркивания и тире');
    } else if (userNameExists) {
      // Если пользователь уже существует, выводим сообщение об ошибке
      showError(inputUserName, 'Имя данного пользователя уже создано');
      return;
    }

    // Проверка введенного E-mail на корректность
    if (inputEmail.value.trim() === '') {
      showError(inputEmail, 'Пустое поле');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail.value.trim())) {
      showError(inputEmail, 'Некорректный email');
      return;
    }

    // Проверка пароля
    if (inputPassword.value.trim() === '') {
      showError(inputPassword, 'Пустое поле');
    } else if (inputPassword.value.length < 8) {
      showError(inputPassword, 'Поле пароля должно содержать минимум 8 символов');
      return;
    } else if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[~`!@#$%^&*()_+\-[\]\\';,./{}|":<>?]).{8,}$/.test(inputPassword.value)) {
      showError(inputPassword, 'Пароль должен содержать хотя бы одну букву в верхнем регистре, хотя бы одну цифру и хотя бы один спецсимвол');
      return;
    }

    // Password и Repeat Password должны совпадать
    if (inputPassword.value !== inputRepeatPassword.value) {
      showError(inputRepeatPassword, 'Пароли не совпадают');
      return;
    }

    // Пользователь должен согласиться с условиями
    if (!inputCheckbox.checked) {
      showError(inputCheckbox, 'Необходимо согласиться с условиями');
    } else {
      saveUserToLocalStorage();
      popupOpen.classList.add('open');
    }
  }

  //Кнопка, крестик и ссылка 'Already have an account?'
  let popupClose = document.getElementById('popup-close');
  let popupButton = document.getElementById('popup-button');
  let linkHaveAnAccount = document.getElementById('account__link');

  function fn() {
    resetInputBorders();
    hideErrorInputs();

    //Очистка формы
    document.querySelector('form').reset();

    //Удаление popup
    popupOpen.classList.remove('open');

    //Текст "Get your free account" заменить на "Log in to the system"
    formTitle[0].innerText = 'Log in to the system';

    //Удаление блоков с полями "Full Name", "E-mail", "Repeat Password", "Checkbox"
    document.querySelectorAll('.form__name').forEach(elem => elem.remove());
    document.querySelectorAll('.form__email').forEach(elem => elem.remove());
    document.querySelectorAll('.form__repeat-password').forEach(elem => elem.remove());
    document.querySelectorAll('.form__label-checkbox').forEach(elem => elem.remove());

    //Замена текста в кнопке на «Sign In»
    buttonSubmit.innerText = 'Sign In';

    //Обработка события
    buttonSubmit.addEventListener('click', loginUser);

    //Замена текста на Registration
    linkHaveAnAccount.innerText = 'Registration';

    //Перезагрузка страницы
    linkHaveAnAccount.addEventListener('click', function () {
      location.reload();
    });
  }

  //Обработка событий
  popupClose.addEventListener("click", fn);
  popupButton.addEventListener('click', fn);
  linkHaveAnAccount.addEventListener('click', fn);
}