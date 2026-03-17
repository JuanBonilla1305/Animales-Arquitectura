export default class dueñoController {
  constructor({ createDueño, getAllDueños }) {
    this.createDueño = createDueño;
    this.getAllDueños = getAllDueños;
  }

  async create(req, res) {
    try {
      const dueño = await this.createDueño.execute(req.body);
      res.status(201).json(dueño);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getAll(req, res) {
    try {
      const dueños = await this.getAllDueños.execute();
      res.status(200).json(dueños);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}