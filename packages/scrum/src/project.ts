
import moment from "moment";
import { Backlog } from "./product-backlog";
import { Sprint } from "./sprint";
import { ISprint, SprintOption } from "./sprint/interface";

export class Project {
  private _productBacklog: Backlog;
  private _currentSprint?: Sprint;
  private _sprints: Map<string, Sprint> = new Map()

  constructor() {
    this._productBacklog = new Backlog();
  }

  createSprint(option: Omit<SprintOption, "backlog">) {
    const newOptions: Omit<ISprint, "status"> = {
      ...option,
      backlog: new Backlog(this._productBacklog.list(option.id)),
      dateDetails: {
        createAt: option.createAt || new Date(),
        finishAt: option.finishAt || moment().add(1, "month").toDate()
      },
    }
    this._sprints.set(newOptions.id, new Sprint(newOptions))
  }

  startSprint(sprintId: string) {
    if (this._currentSprint && this._currentSprint.status !== "active") throw new Error("there is a current active sprint")
    const sprint = this._sprints.get(sprintId)
    if (!sprint) throw new Error("sprint doesn't exist")
    sprint.start()
    this._currentSprint = sprint
  }

}
