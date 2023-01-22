
module.exports={
    useDefaults: false,
    directives: {
        "defaultSrc":["'self'"],
        "imgSrc":["'self'"],
        "scriptSrc" : ["'self'","'unsafe-inline'","'unsafe-eval'"],
        "styleSrc":["'self'"],
        "styleSrcElem":["'self'","'unsafe-inline'"],
        "objectSrc": ["'none'"],
        "fontSrc":["'self'"],
        "connectSrc": ["'self'","ws://localhost:3000"],
      },
}