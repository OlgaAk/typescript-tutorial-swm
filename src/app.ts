// Project State Management

class ProjectState{
    private listeners: any[] = [];
    private projects : any[]= [];
    private static instance: ProjectState;

    private constructor(){

    }

    static getInstance(){
        if(!this.instance){
            this.instance = new ProjectState();
        }
            return this.instance;
    }

    addProject(title: string, description: string, people: number){
        const newProject = {
            id: Math.random().toString(),
            title,
            description,
            people,
            type: "active"
        }
        this.projects.push(newProject);
        for(const listener of this.listeners){
            listener(this.projects.slice());
        }
    }

    addListener(listenerFn: Function){
        this.listeners.push(listenerFn);
    }

}

const projectState = ProjectState.getInstance();


// Validation 
interface Validatable {
    value: string | number,
        required ? : boolean,
        minLength ? : number,
        maxLength ? : number,
        min ? : number,
        max ? : number
}

function validate(input: Validatable): boolean {
    let isValid = true;
    if (input.required) {
        isValid = isValid && input.value.toString().trim().length !== 0
    }
    if (input.minLength != null && typeof input.value === "string") {
        isValid = isValid && input.value.trim().length >= input.minLength
    }
    if (input.maxLength != null && typeof input.value === "string") {
        isValid = isValid && input.value.trim().length <= input.maxLength
    }
    if (input.min != null && typeof input.value === "number") {
        isValid = isValid && input.value >= input.min
        console.log(isValid, input.value, input.min)
    }
    if (input.max != null && typeof input.value === "number") {
        isValid = isValid && input.value <= input.max
    }
    return isValid;
}


// autobind decorator
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn
        }
    }
    return adjDescriptor;
}

// ProjectList Class
class ProjectList {

    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element : HTMLElement;
    assignedProjects: any[];

    constructor(private type: "active" | "finished"){
        this.templateElement = document.getElementById("project-list") as HTMLTemplateElement;
        this.hostElement = document.getElementById("app") as HTMLDivElement;

        this.assignedProjects = [];

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.querySelector("section") as HTMLElement;
        this.element.id = `${this.type}-projects`;

        projectState.addListener((projects: any[])=>{
            this.assignedProjects = projects;
            this.updateProjectList();
        });

        this.renderContent();
        this.attach();
    }

    private renderContent(){
        this.element.querySelector("h2")!.textContent = `${this.type.toUpperCase()} PROJECTS`;

        const listId = `${this.type}-projects-list`;
        this.element.querySelector("ul")!.id = listId;
    }


     updateProjectList(){
         const list = document.getElementById(`${this.type}-projects-list`) as HTMLUListElement;
         list.innerHTML = "";
        for(let project of this.assignedProjects){
            if(this.type === project.type){
                let li = document.createElement("li");
                li.textContent = project.title;
                list.append(li);
            }
        }
    }

    private attach(){
        this.hostElement.insertAdjacentElement("beforeend", this.element);
    }
}




// ProjectInput Class
class ProjectInput {

    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
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

    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;

        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true,
            minLength: 4,
            maxLength: 20
        };
        const descValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 4,
            maxLength: 100
        }
        const peopleValidatable: Validatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5
        }

        if (validate(titleValidatable) && validate(descValidatable) && validate(peopleValidatable)) {
            return [enteredTitle, enteredDescription, +enteredPeople];
        } else {
            alert("not valid");
            return;
        }
    }


    private clearInputs() {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = "";
    }

    @autobind
    private sumbitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            projectState.addProject(title, desc, people);
            this.clearInputs();
        }
    }

    private configure() {
        this.element.addEventListener("submit", this.sumbitHandler);
    }

    private attach() {
        this.hostElement.insertAdjacentElement("afterbegin", this.element);
    }
}


const prjInput = new ProjectInput();
const activeProjectList = new ProjectList("active");
const finishedProjectList = new ProjectList("finished");