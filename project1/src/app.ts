/// <reference path="model/project.ts"/>
/// <reference path="state/project-state.ts"/>
/// <reference path="util/validation.ts"/>
/// <reference path="decorator/autobind.ts"/>
/// <reference path="component/project-item.ts"/>
/// <reference path="component/project-input.ts"/>
/// <reference path="component/project-list.ts"/>

namespace App {
  new ProjectInput();
  new ProjectList("active");
  new ProjectList("finished");
}
