module.exports = {
  addFields: [
    {
      name: '_menus',
      label: 'Menus Rank',
      type: 'joinByArray',
      filters: {
        projection: {
          title: 1,
          slug: 1,
          type: 1,
          pageId: 1,
        },
      },
    },
    {
      name: '_careers',
      label: 'Careers Rank',
      type: 'joinByArray',
      filters: {
        projection: {
          title: 1,
          slug: 1,
          type: 1,
          description: 1,
        },
      },
    },
  ],
}
