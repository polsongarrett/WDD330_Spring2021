export class Todo {
  constructor(content) {
    this.Id = Date.now();
    this.Completed = false;
    this.Content = content;
  }
}