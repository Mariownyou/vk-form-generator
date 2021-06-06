# [Тестовое задание для стажёра в команду фронтенд-инфраструктуры](https://vk.com/@vkteam-testovoe-zadanie-frontend-infrastruktura)

## Генератор форм

> Напишите код, который будет преобразовывать `JSON` с описанием контента формы — в готовую вёрстку.


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
                    "inputs": [{"type": "text", "id": "last_name"}]
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

### Список импутов и их параметров
```
Во все импуты опцианально можно предать следующие параметры: id, classes
1. textfield — {type: "text"} // placehodler, value
2. textarea — {type: "textarea"} // placeholder, value
3. checkbox — {type: "checkbox"} // value, checked
4. radio group — {type: "radio", options: [{text: 'вариант 1', checked}], id: 'radio'}
5. checkbox group — {type: "checkbox-group", options: [{text: 'вариант 1', checked}], id: 'checkbox'}
6. select — {type: "select", options: [1, 2, 3, 4]}
7. date — {type: "date"} // value (format - dd.mm.yyyy)
8. email — {type: "email"} // value
```

### Катсомные свойства
Если нужно поменять класс у кого-то элемента, секции, контрола — можно указать нужный нам класс. Если нужно использовать **только** кастомный класс — используем свойство `overwrite: true`
```json
{
	"action": "url",
	"sections": [
		{
            "classes": ["custom-class"],
            "controls": [
                {
                    "classes": ["custom-class"],
                    "overwrite": true,
                    "label": "Фамилия",
                    "inputs": [{"type": "text", "id": "last_name"}]
                }
            ]
        },
    ]
}
```

```html
<form class="form" action="url">
    <section class="section custom-class">
        <div class="custom-class">
            <label class="form-control__label" for="last_name">Фамилия</label>
            <div class="form-control__inputs">
                <input class="input" type="text" id="last_name" name="last_name" placeholder="">
            </div>
        </div>
    </section>
</form>
```

Если надо поменять поярдок элементов в контороле, наприемер нам надо чтобы под полем был чекбокс — испольщуем свойстов `direction: 'col'` в нужном нам контороле. На этот элемент будет добавлен класс, который поменяет порядок. *По умолчанию все элементы будут пытаться уместиться на одной строке*.
```json
{
    "label": "Фамилия",
    "direction": "col" ,
    "inputs": [{"type": "text", "id": "last_name"}, {"type": "checkbox", "label": " ранее менялась", "id": "check"}]
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