import { Hono } from 'hono'

const app = new Hono()

// Penyimpanan sementara di memory (array)
let notes = []

// GET semua catatan
app.get('/notes', (c) => {
  return c.json(notes)
})

// POST catatan baru
app.post('/notes', async (c) => {
  const body = await c.req.json()
  const newNote = {
    id: Date.now().toString(),
    text: body.text || '',
  }
  notes.push(newNote)
  return c.json(newNote)
})

// DELETE catatan berdasarkan ID
app.delete('/notes/:id', (c) => {
  const id = c.req.param('id')
  notes = notes.filter((note) => note.id !== id)
  return c.json({ success: true })
})

export default app
