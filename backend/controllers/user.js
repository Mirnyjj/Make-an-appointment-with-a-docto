const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generate } = require('../helpers/token');
const ROLES = require('../constants/roles')

// register

async function register(login, password) {
    if (!password) {
        throw new Error('Отсутствует пароль');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({ login, password: passwordHash })
    const token = generate({ id: user.id });

    return { user, token };
}

// login

async function login(login, password) {
    const user = await User.findOne({ login });

    if (!user) {
        throw new Error('Пользователь не найден')
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        throw new Error('Не верный пароль')
    }

    const token = generate({ id: user.id });

    return { token, user };
}

function getUsers() {
    return User.find();
}


module.exports = {
    register,
    login,
    getUsers,
}