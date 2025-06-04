import dealData from '../mockData/deals.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let deals = [...dealData]

const dealService = {
  async getAll() {
    await delay(350)
    return [...deals]
  },

  async getById(id) {
    await delay(200)
    const deal = deals.find(d => d.id === id)
    return deal ? { ...deal } : null
  },

  async create(dealData) {
    await delay(400)
    const newDeal = {
      ...dealData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    deals.push(newDeal)
    return { ...newDeal }
  },

  async update(id, updateData) {
    await delay(300)
    const index = deals.findIndex(d => d.id === id)
    if (index === -1) throw new Error('Deal not found')
    
    deals[index] = {
      ...deals[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    }
    return { ...deals[index] }
  },

  async delete(id) {
    await delay(200)
    const index = deals.findIndex(d => d.id === id)
    if (index === -1) throw new Error('Deal not found')
    
    const deleted = deals.splice(index, 1)[0]
    return { ...deleted }
  }
}

export default dealService