module.exports = {
  addFields: [
    {
      name: '_menus',
      label: 'Menus Rank',
      type: 'joinByArray',
      filters: {
        // Fetch just enough information
        projection: {
          title: 1,
          slug: 1,
          type: 1
        }
      }
    }
  ]
}
