module.exports = {
  baseUrl: 'tarlao.fr',
  modules: {
    'webpack-custom': {
      loaders: {
        sass: {
          options: {
            sourceMap: false,
          },
        },
      },
    },
  },
}
