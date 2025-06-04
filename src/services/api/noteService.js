import noteData from '../mockData/notes.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let notes = [...noteData]

const noteService = {
  async getAll() {
    await delay(250)
    return [...notes]
  },

  async getById(id) {
    await delay(200)
    const note = notes.find(n => n.id === id)
    return note ? { ...note } : null
  },

  async create(noteData) {
    await delay(400)
    const newNote = {
      ...noteData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    notes.push(newNote)
    return { ...newNote }
  },

  async update(id, updateData) {
    await delay(300)
    const index = notes.findIndex(n => n.id === id)
    if (index === -1) throw new Error('Note not found')
    
    notes[index] = {
      ...notes[index],
      ...updateData
    }
    return { ...notes[index] }
  },

  async delete(id) {
    await delay(200)
    const index = notes.findIndex(n => n.id === id)
    if (index === -1) throw new Error('Note not found')
    
    const deleted = notes.splice(index, 1)[0]
    return { ...deleted }
  }
}

export default noteService