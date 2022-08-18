class Observable {
  constructor(subscriber?: () => void) {}

  static create() {
    return new Observable();
  }

  pipe() {}

  subscribe() {}
}
