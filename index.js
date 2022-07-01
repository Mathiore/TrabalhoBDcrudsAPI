const express = require('express')
const app = express()

const mongoose = require('mongoose')

const Funcionario = require('./models/Funcionarios')

const Remedios = require('./models/Remedios')

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())
//rotas Remedios
app.post('/remedios', async (req, res) => {
    const { nome, dosagem, quantidade, price} = req.body
  
    const remedio = {
      nome,
      dosagem,
      quantidade,
      price
    }
  
    try {
      await Remedios.create(remedio)
  
      res.status(201).json({ message: 'Remédio inserido no sistema!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
  
  app.get('/remedios', async (req, res) => {
    try {
      const droga = await Remedios.find()
  
      res.status(200).json(droga)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
  
  app.get('/remedios/:id', async (req, res) => {
    const id = req.params.id
  
    try {
      const remedio = await Remedios.findOne({ _id: id })
  
      if (!remedio) {
        res.status(422).json({ message: 'Remédio não encontrado!' })
        return
      }
  
      res.status(200).json(remedio)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
  
  app.patch('/remedios/:id', async (req, res) => {
    const id = req.params.id
  
    const { nome, dosagem, quantidade, price } = req.body
  
    const remedio = {
      nome,
      dosagem,
      quantidade,
      price
    }
  
    try {
      const updatedDroga = await Remedios.updateOne({ _id: id }, remedio)
  
      if (updatedDroga.matchedCount === 0) {
        res.status(422).json({ message: 'Remédio não encontrado!' })
        return
      }
  
      res.status(200).json(remedio)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
  
  app.delete('/remedios/:id', async (req, res) => {
    const id = req.params.id
  
    const remedio = await Remedios.findOne({ _id: id })
  
    if (!remedio) {
      res.status(422).json({ message: 'Remédio não encontrado!' })
      return
    }
  
    try {
      await Remedios.deleteOne({ _id: id })
  
      res.status(200).json({ message: 'Remédio removido com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
// rotas Funcionarios.
app.post('/funcionarios', async (req, res) => {
  const { nome, funcao} = req.body

  const funcionario = {
    nome,
    funcao
  }

  try {
    await Funcionario.create(funcionario)

    res.status(201).json({ message: 'Funcionário inserido no sistema!' })
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

app.get('/funcionario', async (req, res) => {
  try {
    const pessoa = await Funcionario.find()

    res.status(200).json(pessoa)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

app.get('/funcionario/:id', async (req, res) => {
  const id = req.params.id

  try {
    const funcionario = await Funcionario.findOne({ _id: id })

    if (!funcionario) {
      res.status(422).json({ message: 'Usuário não encontrado!' })
      return
    }

    res.status(200).json(funcionario)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

app.patch('/funcionario/:id', async (req, res) => {
  const id = req.params.id

  const { nome, funcao } = req.body

  const funcionario = {
    nome,
    funcao
  }

  try {
    const updatedPerson = await Funcionario.updateOne({ _id: id }, funcionario)

    if (updatedPerson.matchedCount === 0) {
      res.status(422).json({ message: 'Usuário não encontrado!' })
      return
    }

    res.status(200).json(funcionario)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

app.delete('/funcionario/:id', async (req, res) => {
  const id = req.params.id

  const funcionario = await Funcionario.findOne({ _id: id })

  if (!funcionario) {
    res.status(422).json({ message: 'Usuário não encontrado!' })
    return
  }

  try {
    await Funcionario.deleteOne({ _id: id })

    res.status(200).json({ message: 'Usuário removido com sucesso!' })
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

app.get('/', (req, res) => {
  res.json({ message: 'Oi Express!' })
})

const mongoDB_USER = ""
const mongoDB_SENHA = ""

mongoose
  .connect(
    `mongodb+srv://${mongoDB_USER}:${mongoDB_SENHA}@Crudapplication:<password>@cluster0.mtzga.mongodb.net/?retryWrites=true&w=majority`,
  )
  .then(() => {
    console.log('Conectou ao banco!')
    app.listen(3000)
  })
  .catch((err) => console.log(err))
