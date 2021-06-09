export default
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