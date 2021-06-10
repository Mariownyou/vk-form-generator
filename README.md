# [Тестовое задание для стажёра в команду фронтенд-инфраструктуры](https://vk.com/@vkteam-testovoe-zadanie-frontend-infrastruktura)

## Генератор форм

**Задание**
> Напишите код, который будет преобразовывать `JSON` с описанием контента формы — в готовую вёрстку.

**Пример**
> Работа модуля [ссылка](https://competent-shirley-57400d.netlify.app/)


## Модуль

### Подключение 
```html
<script type="module">
    import { Form } from './js/form.js'

    const form = new Form("json")
</script>
```
По-умолчанию форма атвоматически сгенерируется и добавиться к `body`, но это можно отключить.

### Настройки

Можно передать только что-то одно, тогда будут применены настройки по-умолчанию.
```html
<script type="module">
    import { Form } from './js/form.js'
    const params {
        config: cfg, // конфиг
        generate: false, // рендерить форму или нет
        parent: document.body // родитель формы
    }

    const form = new Form("json", params)
    const html = form.html // Если понадобится просто html-код
    console.log(html)
</script>
```


## Формат 
Пример простой формы с одним полем ввода
```json
{
	"action": "url",
	"sections": [
		{
            "controls": [
                {
                    "label": "Фамилия",
                    "inputs": [{"type": "text", "params": {"id": "last_name"}}]
                }
            ]
        },
    ]
}
```
Сгенерированный HTML
```html
<form class="form" action="url">
    <section class="section">
        <div class="form-control">
            <label class="form-control__label" for="last_name">Фамилия</label>
            <div class="form-control__inputs">
                <input class="input" type="text" id="last_name" name="last_name" placeholder="">
            </div>
        </div>
    </section>
</form>
```

Формат не очень простой и интуитивный, но дает широкую кастомизацию. Разберем формат подробнее. Форма делится на секции. В каждой секции, есть несколько или один `form-contorl`. `form-control` состоит из `label` (опционально) и `inputs` — любое кол-во интпутов.

### Список импутов
```
Во все импуты опцианально можно предать params, в котором находятся все валидные для данного тега атрибуты: params: {id: 12, value: 10}
1. textfield — {type: "text"}
2. textarea — {type: "textarea"}
3. checkbox — {type: "checkbox"}
4. radio group — {type: "radio", options: [{text: 'вариант 1', checked}]}
5. checkbox group — {type: "checkbox-group", options: [{text: 'вариант 1', checked}]}
6. select — {type: "select", options: [1, 2, 3, 4]}
7. date — {type: "date"}
8. email — {type: "email"}
9. button — {type: "button"} // submit button
```

### Катсомные свойства
Если нужно поменять класс у кого-то элемента, секции, контрола — можно указать нужный нам класс. Если нужно использовать **только** кастомный класс — используем свойство `overwrite: true`
```json
{
    "classes": ["custom-class"],
    "controls": [
        {
            "classes": ["custom-class"],
            "overwrite": true,
            "label": "Фамилия",
            "inputs": [{"type": "text"}]
        }
    ]
}
```

```html
<div class="custom-class">
    <label class="form-control__label" for="last_name">Фамилия</label>
    <div class="form-control__inputs">
        <input class="input" type="text" id="last_name" name="last_name" placeholder="">
    </div>
</div>
```

Если надо поменять направление элементов в контороле, наприемер нам надо чтобы под полем был чекбокс — испольщуем свойстов `direction: 'col'` в нужном нам контороле. На этот элемент будет добавлен класс, который поменяет порядок. *По умолчанию все элементы будут пытаться уместиться на одной строке*.
```json
{
    "label": "Фамилия",
    "direction": "col" ,
    "inputs": [{"type": "text"}, {"type": "checkbox", "label": " ранее менялась"}]
},
```
```html
<div class="form-control">
    <label class="form-control__label" for="last_name">Фамилия</label>
    <div class="form-control__inputs form-control__inputs_col">
        <input class="input" type="text" id="last_name" name="last_name" placeholder="">
        <label class="checkbox">
            <input class="checkbox" type="checkbox" id="check" name="check"> ранее менялась</label>
    </div>
</div>
```

### Переназначение дефолтных классов
Любой класс можно переназанчить используя конфиг.
```js
const config = {
    styles: true, // Использовать стили или нет
    classes: { // классы всех элементов
        form: 'form',
        section: 'section',
        sectionTitle: 'section__title',
        formControl: 'form-control',
        formControlLabel: 'form-control__label',
        formControlInputs: 'form-control__inputs',
        submitButton: 'submit-button',
        inputs: {
            input: 'input',
            text: 'text',
            checkbox: 'checkbox',
            radio: 'radio',
            select: 'select',
            option: 'select__option',
            textarea: 'textarea'
        }
    },
    elements: { // Теги элементов
        sectionTitle: 'h3' // Заголовок секции будет <h3>
    }
}
```

### Примеры
Структура
```js
{
    action: "url",
    sections: [
        {
            title: string
            controls: [
                {
                    label: string,
                    direction: string // "col" || ""
                    inputs: [
                        {
                            type: string,
                            params: {}
                        }
                    ]
                }
            ]
        }
    ]
}
```

```html
<form class="form" action="url">
    <section class="section">
        <div class="form-control">
            <label class="form-control__label" for="last_name">Фамилия</label>
            <div class="form-control__inputs">
                <input class="input" type="text" id="last_name" name="last_name" placeholder="">
            </div>
        </div>
    </section>
</form>
```



Комплексная форма

**JSON**
```js
{
	"action": "url",
	"sections": [
		{
            "controls": [
                {
                    "label": "Фамилия",
                    "direction": "col" ,
                    "inputs": [{"type": "text", "params": {"id": "last_name"}}, {"type": "checkbox", "label": " ранее менялась", "params": {"id": "check"}}]
                },
                {
                    "label": "Имя",
                    "inputs": [{"type": "text"}]
                },
                {
                    "label": "Отчество",
                    "inputs": [{"type": "text"}]
                },
            ]
		},
        {
			"controls": [
                {
                    "label": "Фамилия латиницей",
                    "inputs": [{"type": "text"}]
                },
                {
                    "label": "Имя латиницей",
                    "inputs": [{"type": "text"}]
                }
			]	
		},
        {
			"controls": [
                {
                    "label": "Дата рождения",
                    "inputs": [
                        {"type": "select", "options": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}, 
                        {"type": "select", "options": ['январь', 'февраль']}, 
                        {"type": "select", "options": [2001, 2002, 2003, 2004, 2005, 2006]}
                    ]
                },
                {
                    "label": "Семейное положение",
                    "inputs": [{"type": "select", "options": ["Женат", "Замужем", "Помолвен", "Есть девушка / парень"]}]
                },
                {
                    "label": "Образование",
                    "inputs": [{"type": "select", "options": ["Высшее", "Среднее", "Нет"]}]
                }
			]	
		},
		{
			"title": "Контактная информация",
			"controls": [
                {
                    "label": "Моб. телефон",
                    "inputs": [{"type": "text", "params": {"placeholder": "+7", "id": "number"}}]
                },
                {
                    "label": "Электронная почта",
                    "inputs": [{"type": "email"}]
                }
			]	
		},
        {
            "classes": ['section_submit'],
            "controls": [
                {
                    direction: 'col',
                    "inputs": [{"type": "checkbox", "label": "ранее менялась", "overwrite": true, classes: ['custom-checkbox']}, {"type": "button", "text": "Полететь на Марс"}]
                }
            ]
        }
	]
}
```

**Сгенерированный HTML**
```html
<form class="form" action="url">
    <section class="section">
        <div class="form-control"><label class="form-control__label">Фамилия</label>
            <div class="form-control__inputs form-control__inputs_col"><input class="input" type="text"
                    id="last_name"><label class="checkbox"><input class="input" type="checkbox" id="check"> ранее
                    менялась</label></div>
        </div>
        <div class="form-control"><label class="form-control__label">Имя</label>
            <div class="form-control__inputs"><input class="input" type="text"></div>
        </div>
        <div class="form-control"><label class="form-control__label">Отчество</label>
            <div class="form-control__inputs"><input class="input" type="text"></div>
        </div>
    </section>
    <section class="section">
        <div class="form-control"><label class="form-control__label">Фамилия латиницей</label>
            <div class="form-control__inputs"><input class="input" type="text"></div>
        </div>
        <div class="form-control"><label class="form-control__label">Имя латиницей</label>
            <div class="form-control__inputs"><input class="input" type="text"></div>
        </div>
    </section>
    <section class="section">
        <div class="form-control"><label class="form-control__label">Дата рождения</label>
            <div class="form-control__inputs"><select class="select">
                    <option class="select__option">1</option>
                    <option class="select__option">2</option>
                    <option class="select__option">3</option>
                    <option class="select__option">4</option>
                    <option class="select__option">5</option>
                    <option class="select__option">6</option>
                    <option class="select__option">7</option>
                    <option class="select__option">8</option>
                    <option class="select__option">9</option>
                    <option class="select__option">10</option>
                </select><select class="select">
                    <option class="select__option">январь</option>
                    <option class="select__option">февраль</option>
                </select><select class="select">
                    <option class="select__option">2001</option>
                    <option class="select__option">2002</option>
                    <option class="select__option">2003</option>
                    <option class="select__option">2004</option>
                    <option class="select__option">2005</option>
                    <option class="select__option">2006</option>
                </select></div>
        </div>
        <div class="form-control"><label class="form-control__label">Семейное положение</label>
            <div class="form-control__inputs"><select class="select">
                    <option class="select__option">Женат</option>
                    <option class="select__option">Замужем</option>
                    <option class="select__option">Помолвен</option>
                    <option class="select__option">Есть девушка / парень</option>
                </select></div>
        </div>
        <div class="form-control"><label class="form-control__label">Образование</label>
            <div class="form-control__inputs"><select class="select">
                    <option class="select__option">Высшее</option>
                    <option class="select__option">Среднее</option>
                    <option class="select__option">Нет</option>
                </select></div>
        </div>
    </section>
    <section class="section">
        <h3 class="section__title">Контактная информация</h3>
        <div class="form-control"><label class="form-control__label">Моб. телефон</label>
            <div class="form-control__inputs"><input class="input" type="text" placeholder="+7" id="number"></div>
        </div>
        <div class="form-control"><label class="form-control__label">Электронная почта</label>
            <div class="form-control__inputs"><input class="input" type="email"></div>
        </div>
    </section>
    <section class="section section_submit">
        <div class="form-control">
            <div class="form-control__inputs form-control__inputs_col"><label class="none"><input
                        class="none custom-checkbox" type="checkbox">ранее менялась</label><button class="submit-button"
                    type="submit">Полететь на Марс</button></div>
        </div>
    </section>
</form>
```

## Недостатки формата и кода
1. Формат достаточно сложный для маленьких форм
2. Много дублирующегося кода (нужен рефакторинг)
3. checkbox не активируется по нажатию на пробел
4. В конфиг нужно передавть все данные, иначе будет ошибка (это конечно можно исправить, просто нужно время)
5. Мелкие баги