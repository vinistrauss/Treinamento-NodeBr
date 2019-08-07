class NotImplementedException extends Error {
  constructor() {
    super("Not Implemented Exception");
  }
}
class Icrud {
  create(item) {
    throw new NotImplementedException();
  }
  read(query) {
    throw new NotImplementedException();
  }
  update(id, item) {
    throw new NotImplementedException();
  }
  delete(id) {
    throw new NotImplementedException();
  }
}

class Postgres extends Icrud {
  constructor() {
    super();
  }
  create(item) {
    console.log("o item foi salvo no postgres");
  }
}

class MongoDB extends Icrud {
  constructor() {
    super();
  }
  create(item) {
    console.log("o item foi salvo no mongodb");
  }
}

class ContextStrategy {
  constructor(strategy) {
    this._database = strategy;
  }

  create(item) {
    return this._database.create(item);
  }

  read(item) {
    return this._database.read(item);
  }
  update(id, item) {
    return this._database.update(id, item);
  }
  delete(id) {
    return this._database.read(id);
  }
}

const context = new ContextStrategy(new MongoDB());
context.read();
