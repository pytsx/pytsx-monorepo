import moment from "moment";
import { Backlog } from "../product-backlog";
import { DateDetails, SprintAbstract, SprintAction, SprintOption, SprintStatus } from "./interface";

export class Sprint implements SprintAbstract {
  private _id: string;
  private _goal: string;
  private _dateDetails: DateDetails = {};
  private _status: SprintStatus = "idle"

  constructor(private _options: SprintOption) {
    this._id = _options.id;
    this._goal = _options.goal;
    this._dateDetails = _options.dateDetails || this._dateDetails

    if (!this._dateDetails.finishAt) {
      this._dateDetails.finishAt = _options.dateDetails?.finishAt ? _options.dateDetails.finishAt : moment().add(1, "M").toDate()
    }
  }

  public registre({ type, payload }: SprintAction): void {
    this._registreUpdate()
    switch (type) {
      case "date":
        this._dateDetails[payload.key] = payload.value
        break

      case "status":
        this._actionBlocker("change status")
        this._status = payload.value
      default:
        break
    }
  }

  public start(): void {
    this._actionBlocker("start")
    this.registre({
      type: "status",
      payload: { value: "active" }
    })

    this.registre({
      type: "date",
      payload: { key: "createAt", value: new Date() }
    })
  }

  public stop(): void {
    this._actionBlocker("stop")
    this.registre({
      type: "status",
      payload: { value: "stopped" }
    })
  }

  public complete(): void {
    this._actionBlocker("complete")

    this.registre({
      type: "status",
      payload: { value: "done" }
    })

    this.registre({
      type: "date",
      payload: { key: "completedAt", value: new Date() }
    })
  }

  private _actionBlocker(action: string): void {
    if (this._status === "done") throw new Error(`you cannot ${action} a completed sprint`)
  }

  private _registreUpdate(): void {
    this._dateDetails.updatedAt = new Date()
  }

  // this getters
  public get backlog(): Backlog { return this._options.backlog }
  get goal(): string { return this._goal }
  get id(): string { return this._id }
  get dateDetails(): DateDetails { return this._dateDetails }
  get status(): SprintStatus { return this._status }
}