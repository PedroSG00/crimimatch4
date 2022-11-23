module.exports = app => {

    // Base routes
    const indexRouter = require('./index.routes')
    app.use('/', indexRouter)

    const authRouter = require('./auth.routes')
    app.use('/auth', authRouter)

    const newsRouter = require('./news.routes')
    app.use('/news', newsRouter)

    const commentsRouter = require('./comment.routes')
    app.use('/news', commentsRouter)

    const criminalRouter = require('./criminals.routes')
    app.use('/wanted', criminalRouter)

    // COMENTARIO PRUEBA PEDRO
}

