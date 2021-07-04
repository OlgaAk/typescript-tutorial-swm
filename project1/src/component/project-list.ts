import { Component } from "./base-component";
import { DropTarget } from "../model/drag-drop";
import { Project, ProjectStatus } from "../model/project";
import { ProjectItem } from "./project-item";
import { autobind } from "../decorator/autobind";
import { projectState } from "../state/project-state";

// ProjectList Class
export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DropTarget
{
  assignedProjects: Project[];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);

    this.assignedProjects = [];

    this.configure();

    this.renderContent();
  }
  @autobind
  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.add("droppable");
    }
  }
  @autobind
  dropHandler(event: DragEvent): void {
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.remove("droppable");
    const id = event.dataTransfer!.getData("text"); // dataTransef data not shown in browser consoles
    projectState.changeProjectStatus(
      id,
      this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }
  @autobind
  dragLeaveHandler(_: DragEvent): void {
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.remove("droppable");
  }

  configure() {
    projectState.addListener((projects: any[]) => {
      const relevantProjects = projects.filter((p) => {
        if (this.type === "active") {
          return p.status === ProjectStatus.Active;
        }
        return p.status === ProjectStatus.Finished;
      });
      this.assignedProjects = relevantProjects;
      this.renderProjectList();
    });

    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    this.element.addEventListener("drop", this.dropHandler);
  }

  renderContent() {
    this.element.querySelector(
      "h2"
    )!.textContent = `${this.type.toUpperCase()} PROJECTS`;

    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
  }

  renderProjectList() {
    const list = document.getElementById(
      `${this.type}-projects-list`
    ) as HTMLUListElement;
    list.innerHTML = "";
    for (const project of this.assignedProjects) {
      new ProjectItem(this.element.querySelector("ul")!.id, project);
    }
  }
}
