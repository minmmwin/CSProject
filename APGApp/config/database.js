if(process.env.NODE_ENV ==='production') {
    module.exports = {mongoURI: 'mongodb://minmmwin:my1Corvec@ds119662.mlab.com:19662/apgdatabase'}
} else {
    module.exports = {mongoURI: 'mongodb://localhost/apg-dev'}
}