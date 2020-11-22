const personGenerator = {
    surnameJson: `{  
        "count": 16,
        "list": {
            "id_1": "Иванов",
            "id_2": "Смирнов",
            "id_3": "Кузнецов",
            "id_4": "Васильев",
            "id_5": "Петров",
            "id_6": "Михайлов",
            "id_7": "Новиков",
            "id_8": "Федоров",
            "id_9": "Кравцов",
            "id_10": "Николаев",
            "id_11": "Семёнов",
            "id_12": "Славин",
            "id_13": "Степанов",
            "id_14": "Павлов",
            "id_15": "Александров",
            "id_16": "Морозов"
        }
    }`,
    firstNameMaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Александр",
            "id_2": "Максим",
            "id_3": "Иван",
            "id_4": "Артем",
            "id_5": "Дмитрий",
            "id_6": "Никита",
            "id_7": "Михаил",
            "id_8": "Даниил",
            "id_9": "Егор",
            "id_10": "Андрей"
        }
    }`,
    firstNameFemaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Александра",
            "id_2": "Марина",
            "id_3": "Иванна",
            "id_4": "Арина",
            "id_5": "Дарья",
            "id_6": "Наталья",
            "id_7": "Марфа",
            "id_8": "Диана",
            "id_9": "Евгения",
            "id_10": "Алена"
        }
    }`,

    professionJson: `{
        "count": 15,
        "list": {     
            "id_1": "Выборщик-укладчик камня",
            "id_2": "Заготовщик слюды",
            "id_3": "Машинист глинорезной машины",
            "id_4": "Бурильщик капитального ремонта скважин",
            "id_5": "Изолировщик труб на линии",
            "id_6": "Сборщик трансформаторов",
            "id_7": "Слесарь-монтажник судовой",
            "id_8": "Врач",
            "id_9": "Разрисовщик ткани",
            "id_10": "Контролер сетеизделий",
            "id_11": "Художник по костюму",
            "id_12": "Раскладчик лекал",
            "id_13": "Вышивальщица",
            "id_14": "Медсестра",
            "id_15": "Кружевница"
        }
    }`,

    GENDER_MALE: 'Мужчина',
    GENDER_FEMALE: 'Женщина',

    randomIntNumber: (max = 1, min = 0) => Math.floor(Math.random() * (max - min + 1) + min),

    randomValue: function (json, profession = false) {
        const obj = JSON.parse(json);
        //const prop = `id_${this.randomIntNumber(obj.count, 1)}`;  // this = personGenerator
        let prop;
        if (!profession) {
            prop = `id_${this.randomIntNumber(obj.count, 1)}`;
        } else {
            this.person.gender === 'Женщина' ? prop = `id_${this.randomIntNumber(obj.count, 8)}`: prop = `id_${this.randomIntNumber(obj.count - 3, 1)}`;
        }
        return obj.list[prop];
    },

    randomFirstName: function() {
        return this.person.gender === 'Женщина' ?
        this.randomValue(this.firstNameFemaleJson) :
        this.randomValue(this.firstNameMaleJson);
    },


    randomSurname: function() {
        return this.person.gender === 'Женщина' ? 
        this.randomValue(this.surnameJson) + 'а' :
        this.randomValue(this.surnameJson);         
    },

    randomPatronymic: function() {
        let patronymic = this.randomValue(this.firstNameMaleJson);
        return this.nameToPatronymic(patronymic);
    },

    nameToPatronymic: function(name) {
        if (this.person.gender === 'Женщина') {
            switch (name) {
                case "Дмитрий": 
                case "Андрей": {return name.slice(0, -1) + 'евна';}
                break;
                case "Никита" : return name.slice(0, -1) + 'ична';
                break;
                case "Александр":
                case "Максим":
                case  "Иван":
                case  "Артем":
                case  "Михаил":
                case  "Даниил":
                case  "Егор": return name + 'овна';
                break;
            }
        }
        else {
            switch (name) {
                case "Дмитрий":
                case "Андрей" : return name.slice(0, -1) + 'евич';
                break;
                case "Никита" : return name.slice(0, -1) + 'ич';
                break;
                case "Александр":
                case "Максим":
                case  "Иван":
                case  "Артем":
                case  "Михаил":
                case  "Даниил":
                case  "Егор": return name + 'ович';
                break;
            }
        }
    },

    randomGender: function() {
        let gender = this.randomIntNumber(1, 0);
        return gender === 1 ? this.GENDER_FEMALE : this.GENDER_MALE;
    },

    randomBirthDate: function randomDate(startDate, endDate) {
        let birthDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
        // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Intl.DateTimeFormat('ru-RU', options).format(birthDate);
    },

    randomProfession: function() {
        return this.randomValue(this.professionJson, true);
    },
    
    getPerson: function() {
        this.person = {};
        this.person.gender = this.randomGender();
        this.person.surname = this.randomSurname();
        this.person.firstName = this.randomFirstName();
        this.person.patronymic = this.randomPatronymic();
        this.person.profession = this.randomProfession();
        //  генерация даты рождения
        let startDate = new Date(1950, 0, 1);
        let endDate = new Date(2002, 0, 1);
        this.person.birthDate = this.randomBirthDate(startDate, endDate);

        return this.person;
    }
};