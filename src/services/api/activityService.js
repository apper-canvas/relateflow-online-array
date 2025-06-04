import activityData from '../mockData/activities.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let activities = [...activityData]

const activityService = {
  async getAll() {
    await delay(280)
    return [...activities]
  },

  async getById(id) {
    await delay(200)
    const activity = activities.find(a => a.id === id)
    return activity ? { ...activity } : null
  },

  async create(activityData) {
    await delay(400)
    const newActivity = {
      ...activityData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    }
    activities.push(newActivity)
    return { ...newActivity }
  },

  async update(id, updateData) {
    await delay(300)
    const index = activities.findIndex(a => a.id === id)
    if (index === -1) throw new Error('Activity not found')
    
    activities[index] = {
      ...activities[index],
      ...updateData
    }
    return { ...activities[index] }
  },

  async delete(id) {
    await delay(200)
    const index = activities.findIndex(a => a.id === id)
    if (index === -1) throw new Error('Activity not found')
    
    const deleted = activities.splice(index, 1)[0]
    return { ...deleted }
  }
}

export default activityService