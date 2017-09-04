// const http = require('http')
// const config = require('config')
// const chainify = require('../apostrophe-pages/public/js/helpers/chainify')

// module.exports = {
//   construct: (self, options) => {
//     self.getScripts = req => {
//       return new Promise((resolve, reject) => {
//         const index = config.get('webpack.output.index')
//         let inline = []
//         let scripts
//         let port = 3001
//         if (process.env.NODE_ENV === 'production') port = 3000

//         let request = http.get(`http://localhost:${port}/${index}`, response => {
//           response.setEncoding('utf8')
//           response.on('data', chunk => {
//             inline = chunk.match(/((<script[^>]+>)+)(.*)<\/script>/)

//             // if (req.data.page._url === '/') {
//             //   // if homepage, load all scripts
//             //   scripts = inline[0]
//             // } else {
//             //   // otherwise, do not load scripts for homepage
//             //   scripts = inline[0].split('</script>')
//             //   chainify(scripts, ['filter', 'join'], Array)
//             //   scripts = scripts.filter(value => !value.includes('home-vendor'), true).join('</script>')
//             // }
//             scripts = inline[0]
//             req.data.page.webpackScripts = scripts
//             resolve()
//           })
//         })

//         request.on('error', e => reject(`Apostrophe-assets get ${index} error: ${e.message}`))
//       })
//     }

//     self.pageBeforeSend = (req, callback) => {
//       if (!req.data) {
//         return callback(null)
//       }

//       if (req.res.statusCode === 404 || req.res.statusCode === 500) {
//         console.log(`error: ${req.res.statusCode}`)
//         return callback()
//       }

//       if (req.res.statusCode === 200 && req.data.page) {
//         self.getScripts(req).then(_ => callback(null))
//       } else return callback(null)
//     }
//   }
// }
