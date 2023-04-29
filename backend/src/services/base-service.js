class BaseService {
  constructor(model) {
    this.model = model
    this.filename = model.name.toLowerCase()
  }

  async save(objects) {
    return await this.model.insertMany(objects)
  }

  async load() {
    return this.model.find().sort({ createdAt: -1 })
  }

  async loadLimit(limit) {
    return this.model.find().limit(limit)
  }

  async insert(object) {
    return await this.model.create(object)
  }

  async removeBy(property, value) {
    return this.model.deleteOne({ [property]: value })
  }

  async update(id, object) {
    return await this.model.findByIdAndUpdate(id, object)
  }

  async find(id) {
    return await this.model.findById(id)
  }

  async findBy(property, value) {
    return this.model.findOne({ [property]: value })
  }

  async findByCondition(condition) {
    const result = await this.model.find(condition)
    return result
  }
}

module.exports = BaseService
