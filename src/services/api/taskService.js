import taskData from '../mockData/tasks.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let tasks = [...taskData]

const taskService = {
  async getAll() {
    await delay(320)
    return [...tasks]
  },

  async getById(id) {
    await delay(200)
    const task = tasks.find(t => t.id === id)
    return task ? { ...task } : null
  },

  async create(taskData) {
    await delay(400)
    const newTask = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    tasks.push(newTask)
    return { ...newTask }
  },

  async update(id, updateData) {
    await delay(300)
    const index = tasks.findIndex(t => t.id === id)
    if (index === -1) throw new Error('Task not found')
    
    tasks[index] = {
      ...tasks[index],
      ...updateData
    }
    return { ...tasks[index] }
  },

  async delete(id) {
    await delay(200)
    const index = tasks.findIndex(t => t.id === id)
    if (index === -1) throw new Error('Task not found')
    
    const deleted = tasks.splice(index, 1)[0]
    return { ...deleted }
  }
}

export default taskService