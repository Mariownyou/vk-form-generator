const defaultConfig = {
    styles: true,
    classes: {
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
        }
    },
    elements: {
        sectionTitle: 'h3'
    }
}


export class Form {

    constructor(json, params = {}) {
        this.form = json
        this.config = params.config ?? defaultConfig
        this.parent = params.parent ?? document.body
        this.generate = params.generate ?? true
        if (this.generate) {
            this.generateForm()
        }
    }

    createForm() {
        console.log(this.form)
        let formEl = this.createEl('form', [this.config.classes.form])
        formEl.action = this.form.action
        
        this.form.sections.forEach(el => {
            formEl.appendChild(this.createSection(el))
        })
        return formEl
    }
    
    generateForm() {
        this.parent.appendChild(this.createForm())
    }

    get html() {
        return this.createForm()
    }


    createEl(element, classes=[]) {
        let el = document.createElement(element)
        if (this.config.styles && classes.length > 0) {
            el.classList.add(classes)
        }
        return el
    }

    createParams(el, params) {
        for (const [key, value] of Object.entries(params)) {
            el[key] = value
        }
        return el
    }

    createInput(input) {
        let inputEl = this.createEl('input', [input.overwrite ? 'none' : this.config.classes.inputs.input])
        const type = input.type

        inputEl.type = type
        if (input.params) {
            inputEl = this.createParams(inputEl, input.params)
        }

        if (input.classes) {
            inputEl.classList.add(input.classes)
        }

        switch(type) {
            case 'text':
                break
                
            case 'checkbox':
                let labelEl = this.createEl('label', [input.overwrite ? 'none' : this.config.classes.inputs.checkbox])
                labelEl.appendChild(inputEl)
                labelEl.innerHTML += input.label
                return labelEl

            case 'select': 
                let selectEl = this.createEl('select', [input.overwrite ? 'none' : this.config.classes.inputs.select])
                const options = input.options ? input.options : []
                if (input.params) {
                    selectEl = this.createParams(selectEl, input.params)
                }

                options.forEach(el => {
                    let optionEl = this.createEl('option', [input.overwrite ? 'none' : this.config.classes.inputs.option])
                    optionEl.innerText = el
                    selectEl.appendChild(optionEl)
                })
                return selectEl

            case 'button': 
                let buttonEl = this.createEl('button', [input.overwrite ? 'none' : this.config.classes.submitButton])
                if (input.params) {
                    buttonEl = this.createParams(buttonEl, input.params)
                }
                buttonEl.innerText = input.text
                buttonEl.type = 'submit'
                return buttonEl
        }
        return inputEl
    }

    createControl(control) {
        let controlEl = this.createEl('div', [control.overwrite ? 'none' : this.config.classes.formControl])
        let inputsEl = this.createEl('div', [this.config.classes.formControlInputs])
        let inputs = control.inputs

        if (control.direction == 'col') {
            inputsEl.classList.add('form-control__inputs_col')
        }

        if (control.label) {
            let controlTitle = this.createEl('label', [this.config.classes.formControlLabel])
            controlTitle.innerText = control.label
            controlEl.appendChild(controlTitle)
        }

        if (control.classes) {
            controlEl.classList.add(control.classes)
        }
        
        inputs.forEach(el => {
            let input = this.createInput(el)
            inputsEl.appendChild(input)
        })
        controlEl.appendChild(inputsEl)
        
        return controlEl
    }

    createSection(section) {
        let sectionEl = this.createEl('section', [section.overwrite ? null : this.config.classes.section])
        let controls = section.controls

        if(section.title) {
            let sectionTitle = this.createEl(this.config.elements.sectionTitle, [this.config.classes.sectionTitle])
            sectionTitle.innerText = section.title
            sectionEl.appendChild(sectionTitle)
        }

        if (section.classes) {
            sectionEl.classList.add(section.classes)
        }
        
        controls.forEach(el => {
            let control = this.createControl(el)
            sectionEl.appendChild(control)
        })
        return sectionEl
    }
}

// Убирает outline для обычных пользователей 
(function(document, window){
	if (!document || !window) {
		return;
	}
	
	var styleText = '::-moz-focus-inner{border:0 !important;}:focus{outline: none !important;';
	var unfocus_style = document.createElement('STYLE');

	window.unfocus = function(){
		document.getElementsByTagName('HEAD')[0].appendChild(unfocus_style);

		document.addEventListener('mousedown', function(){
			unfocus_style.innerHTML = styleText+'}';
		});
		document.addEventListener('keydown', function(){
			unfocus_style.innerHTML = '';
		});
	};

	unfocus.style = function(style){
		styleText += style;
	};

	unfocus();
})(document, window);