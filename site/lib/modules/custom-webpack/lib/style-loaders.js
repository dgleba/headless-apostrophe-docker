var ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.vueStyleLoaders = function ({extract = false, sourceMap = false, minimize = false}) {
  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: minimize,
      sourceMap: sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    // var loaders = [cssLoader]
    var loaders = []
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    // if (extract) {
    //   return ExtractTextPlugin.extract({
    //     use: loaders,
    //     fallback: 'vue-style-loader'
    //   })
    // } else {
    //   return ['vue-style-loader'].concat(loaders)
    // }
    if (extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'css-loader'
      })
    } else {
      return ['css-loader'].concat(loaders)
    }
  }

  // Based on https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.vueStyleLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}
