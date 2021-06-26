// Validation 
interface Validatable{
    value: string | number,
    required?: boolean,
    minLength?: number,
    maxLength?: number,
    min?: number,
    max?: number
}

function validate(input: Validatable): boolean{
    let isValid = true;
    if(input.required){
        isValid = isValid && input.value.toString().trim().length !== 0
    }
    if(input.minLength != null && typeof input.value === "string"){
        isValid = isValid && input.value.trim().length >= input.minLength
    }
    if(input.maxLength != null && typeof input.value === "string"){
        isValid = isValid && input.value.trim().length <= input.maxLength
    }
    if(input.min != null && typeof input.value === "number"){
        isValid = isValid && input.value >= input.min
        console.log(isValid,  input.value, input.min)
    }
    if(input.max != null && typeof input.value === "number"){
        isValid = isValid && input.value <= input.max
    }
    return isValid;
}


// autobind decorator
function autobind(_: any, _2: string, descriptor: PropertyDescriptor){
    const originalMethod = descriptor.value;
    const adjDescriptor : PropertyDescriptor = {
        configurable: true,
        get(){
            const boundFn = originalMethod.bind(this);
            return boundFn
        }
    }
    return adjDescriptor;
}


// ProjectInput Class
class ProjectInput {

    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor(){
        this.templateElement = document.getElementById("project-input") as HTMLTemplateElement;
        this.hostElement = document.getElementById("app") as HTMLDivElement;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = "user-input";

        this.titleInputElement = this.element.querySelector("#title") as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector("#description") as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector("#people") as HTMLInputElement;

        this.configure();
        this.attach();
    }

    private gatherUserInput() : [string, string, number] | void {
        const enteredTitle =  this.titleInputElement.value;
        const enteredDescription =  this.descriptionInputElement.value;
        const enteredPeople =  this.peopleInputElement.value;
        if(validate({value: enteredTitle, required: true, minLength: 4, maxLength: 20}) &&
            validate({value: enteredDescription, required: true, minLength: 4, maxLength: 100}) &&
            validate({value: +enteredPeople, required: true, min: 1, max: 5})) {
                return [enteredTitle, enteredDescription, +enteredPeople];
        }
        else {
            alert("not valid");
            return;
        }
    }


    private clearInputs(){
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = "";
    }

    @autobind
    private sumbitHandler(event: Event){
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if(Array.isArray(userInput)){
            const [title, desc, people] = userInput;
            console.log(title,desc, people);
            this.clearInputs();
        }   
    }

    private configure(){
        this.element.addEventListener("submit", this.sumbitHandler);
    }

    private attach(){
        this.hostElement.insertAdjacentElement("afterbegin", this.element);
    }
}

const prjInput = new ProjectInput();