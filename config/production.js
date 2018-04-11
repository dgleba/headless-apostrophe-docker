module.exports = {
  baseUrl: 'https://tarlao.fr',
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
