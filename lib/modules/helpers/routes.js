import animateHome from 'apostrophe-pages/public/js/home/client-home.js'
import animateCareer from 'career-pages/public/js/client'
import { titlePosition } from 'helpers/utils'

export default [
  {
    type: 'home',
    script: animateHome
  },
  {
    type: 'project-page',
    script: titlePosition
  },
  {
    type: 'article-page',
    script: titlePosition
  },
  {
    type: 'career-page',
    script: animateCareer
  }
]
