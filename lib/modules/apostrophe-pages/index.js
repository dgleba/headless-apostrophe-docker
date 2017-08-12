// This configures the apostrophe-pages module to add a "home" page type to the
// pages menu

module.exports = {
  // types: [],
  park: [
    {
      slug: '/',
      published: true,
      _defaults: {
        title: 'Home',
        type: 'home'
      }
    },
    {
      slug: '/contact',
      published: true,
      type: 'contact',
      title: 'Contact'
    },
    {
      slug: '/projets',
      published: true,
      type: 'project-page',
      title: 'Projets'
    },
    {
      slug: '/blog',
      published: true,
      type: 'article-page',
      title: 'Blog'
    },
    {
      slug: '/parcours',
      published: true,
      type: 'career-page',
      title: 'Parcours'
    }
  ]
  // afterConstruct: self => {
  //   self.pushAsset('script', 'always', { when: 'always' })
  // }
}
