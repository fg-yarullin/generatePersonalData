window.onload = function()
{
    const initPerson = personGenerator.getPerson();
    const surname = document.getElementById('surnameOutput');
    const firstName = document.getElementById('firstNameOutput');
    const patronymic = document.getElementById('patronymicOutput');
    const gender = document.getElementById('genderOutput');
    const birthDate =  document.getElementById('birthDateOutput');
    const profession = document.getElementById('professionOutput');
    surname.innerText = initPerson.surname;
    firstName.innerText = initPerson.firstName;
    patronymic.innerText = initPerson.patronymic;
    gender.innerText = initPerson.gender;
    birthDate.innerText = initPerson.birthDate;
    profession.innerText = initPerson.profession;
    
    document.getElementById('generateData').addEventListener('click', () => {
        location.reload();
    })

    document.getElementById('clearPersonalData').addEventListener('click', () => {
        surname.innerText = '';
        firstName.innerText = '';
        patronymic.innerText = '';
        gender.innerText = '';
        birthDate.innerText = '';
        profession.innerText = '';
        document.getElementById('birthDateFiled').innerText = 'пол, дата рождения';
    })
};
