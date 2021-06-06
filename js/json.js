export default
{
	"action": "url",
	"sections": [
		{
            "controls": [
                {
                    "label": "Фамилия",
                    "direction": "col" ,
                    "inputs": [{"type": "text", "id": "last_name"}, {"type": "checkbox", "label": " ранее менялась", "id": "check"}]
                },
                {
                    "label": "Имя",
                    "inputs": [{"type": "text", "id": "first_name"}]
                },
                {
                    "label": "Отчество",
                    "inputs": [{"type": "text", "id": "patronymic"}]
                },
            ]
		},
        {
			"controls": [
                {
                    "label": "Фамилия латиницей",
                    "inputs": [{"type": "text", "id": "last_name_lat"}]
                },
                {
                    "label": "Имя латиницей",
                    "inputs": [{"type": "text", "id": "first_name_lat"}]
                }
			]	
		},
        {
			"controls": [
                {
                    "label": "Дата рождения",
                    "inputs": [
                        {"type": "select", "id": "day", "options": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}, 
                        {"type": "select", "id": "month", "options": ['январь', 'февраль']}, 
                        {"type": "select", "id": "year", "options": [2001, 2002, 2003, 2004, 2005, 2006]}
                    ]
                },
                {
                    "label": "Семейное положение",
                    "inputs": [{"type": "select", "id": "relationships", "options": ["Женат", "Замужем", "Помолвен", "Есть девушка / парень"]}]
                },
                {
                    "label": "Образование",
                    "inputs": [{"type": "select", "id": "education", "options": ["Высшее", "Среднее", "Нет"]}]
                }
			]	
		},
		{
			"title": "Контактная информация",
			"controls": [
                {
                    "label": "Моб. телефон",
                    "inputs": [{"type": "text", "placeholder": "+7", "id": "number"}]
                },
                {
                    "label": "Электронная почта",
                    "inputs": [{"type": "email", "id": "email"}]
                }
			]	
		},
        {
            "classes": ['section_submit'],
            "controls": [
                {
                    direction: 'col',
                    "inputs": [{"type": "checkbox", "label": "ранее менялась"}, {"type": "button", "text": "Полететь на Марс"}]
                }
            ]
        }
	]
}