import animateHome from 'apostrophe-pages/public/js/home/client-home'
import animateCareer from 'career-pages/public/js/client'
import playContactWidget from 'contact-submit-widgets/public/js/client'
import { titlePosition } from 'helpers/utils'

const routes = [
  {
    type: 'home',
    script: animateHome,
  },
  {
    type: 'contact-page',
    script: titlePosition,
  },
  {
    type: 'project-page',
    script: titlePosition,
  },
  {
    type: 'article-page',
    script: titlePosition,
  },
  {
    type: 'career-page',
    script: animateCareer,
  },
]

const widgets = [
  {
    type: 'contact-submit',
    script: playContactWidget,
  },
]

export { routes, widgets }
