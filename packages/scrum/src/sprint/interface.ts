import { Backlog } from "../product-backlog"

export interface ISprint {
  status: SprintStatus
  backlog: Backlog
  goal: string
  id: string
  dateDetails: DateDetails
}

export abstract class SprintAbstract implements ISprint {
  abstract registre({ }: SprintAction): void
  abstract start(): void
  abstract stop(): void
  abstract complete(): void
  abstract get status(): SprintStatus
  abstract get backlog(): Backlog
  abstract get goal(): string
  abstract get id(): string
  abstract get dateDetails(): DateDetails
}

type DateKeys = "createAt" | "updatedAt" | "finishAt" | "completedAt"
export type DateDetails<K extends DateKeys = DateKeys> = {
  [key in K]?: Date;
} & Partial<{
  createAt: Date;
  updatedAt: Date;
  finishAt: Date;
  completedAt: Date;
}>;

export type SprintOption = Partial<ISprint>
  & Omit<ISprint, "status" | "dateDetails">
  & Pick<ISprint["dateDetails"], "finishAt" | "createAt">
  & Pick<ISprint, "id" | "goal">

export type SprintStatus = "active" | "done" | "cancelled" | "idle" | "stopped"

export type SprintAction =
  | { type: "date", payload: { key: DateKeys, value: Date } }
  | { type: "status", payload: { value: SprintStatus } }
