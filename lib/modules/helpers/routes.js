import animateHome from 'apostrophe-pages/public/js/home/client-home.js'
import animateCareer from 'career-pages/public/js/client'

export default [
  {
    type: 'home',
    script: animateHome
  },
  {
    type: 'career-page',
    script: animateCareer
  }
]
