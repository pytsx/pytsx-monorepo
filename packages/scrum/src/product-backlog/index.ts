export interface BacklogItem {
  id: number;
  description: string;
  priority: number;
  estimatedEffort: number | null;
  createdAt: Date;
  updatedAt?: Date;
  sprintId?: string
}

export class Backlog {
  private _items: BacklogItem[]

  constructor(items: BacklogItem[] = []) {
    this._items = items
  }

  public push(item: BacklogItem): void {
    this._items.push(item);
  }

  public delete(id: number): void {
    const index = this._items.findIndex((item) => item.id === id);
    if (index !== -1) {
      this._items.splice(index, 1);
    }
  }

  public get(id: number): BacklogItem | undefined {
    return this._items.find((item) => item.id === id);
  }

  public list(sprint: string): BacklogItem[] {
    return this._items.filter(item => item.sprintId == sprint) || []
  }
}