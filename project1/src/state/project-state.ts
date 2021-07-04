import { Project, ProjectStatus } from "../model/project";

// Project State Management
type Listener<T> = (projects: T[]) => void;

class BaseState<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

export class ProjectState extends BaseState<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ProjectState();
    }
    return this.instance;
  }

  addProject(title: string, description: string, people: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      people,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    this.notifyListeners();
  }

  notifyListeners(): void {
    for (const listener of this.listeners) {
      listener(this.projects.slice());
    }
  }

  changeProjectStatus(projectId: string, status: ProjectStatus): void {
    const project = this.projects.find((p) => p.id === projectId);
    if (project && project.status != status) {
      project.status = status;
      this.notifyListeners();
    }
  }
}

export const projectState = ProjectState.getInstance();
