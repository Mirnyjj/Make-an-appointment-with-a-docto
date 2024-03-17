require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { register, login, getUsers} = require('./controllers/user');
const { getForm, addForm} = require('./controllers/form');
const mapUser = require('./helpers/mapUser');
const authenticated = require('./middlewares/authenticated')
const mapForm = require('./helpers/mapForm');

const port = 3001;
const app = express();

app.use(express.static('../frontend/dist'))

app.use(cookieParser());
app.use(express.json());

app.post('/register', async (req, res) => {
    try {
        const { user, token } = await register(req.body.login, req.body.password);

        res.cookie('token', token, { httpOnly: true })
            .send({ error: null, user: mapUser(user) });
    } catch (e) {
        res.send({ error: e.message || "Неизвестная ошибка" })
    }
})

app.post('/login', async (req, res) => {
    try {
        const { user, token } = await login(req.body.login, req.body.password)

        res.cookie('token', token, { httpOnly: true })
            .send({ error: null, user: mapUser(user) });
    } catch (e) {
        res.send({ error: e.message || "Неизвестная ошибка" })
    }
})


app.get('/form', async (req, res) => {
    const { forms, lastPage } = await getForm(
        req.query.search,
        req.query.limit,
        req.query.page
    )
    res.send({ data: { lastPage, forms: forms.map(mapForm) } })
})

app.use(authenticated);

app.post('/form', async (req, res) => {
    const newForm = await addForm({
        name: req.body.name,
        telephone: req.body.telephone,
        title: req.body.title,
    });

    res.send({ data: mapForm(newForm), message: `${newForm.name}, Ваша форма успешно отправлена!`})
})

app.get('/users', async (req, res) => {
    const users = await getUsers();

    res.send({ data: users.map(mapUser) })
})

mongoose.connect(
    process.env.DB_CONNECTION_STRING
).then(() => {
    app.listen(port, () => {
        console.log(`Сервер запущен на порту ${port}`)
    })
})