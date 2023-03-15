export default class QPoll {
  constructor(params = {}) {
    this.id = params.id;
    this.name = params.name || "";
    this.description = params.description || "";
    this.questions = params.questions || [
      { id: crypto.randomUUID(), title: "", options: [{ id: crypto.randomUUID(), title: "" }] }
    ];
  }

  static fromJSON(json) {
    const args = {
      id: json.id,
      name: json.name,
      description: json.description,
      json: json.questions || [{ options: [] }]
    };

    new QPoll(args);
  }
}
