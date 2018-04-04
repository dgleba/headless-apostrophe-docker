import { animateHome, enterHome, leaveHome } from 'apostrophe-pages/public/js/home/client-home'
import { animateCareer, enterCareer, leaveCareer } from 'career-pages/public/js/client'
import { animateArticle, enterArticle, leaveArticle } from 'article-pages/public/js/client'
import animateContact from 'contact-pages/public/js/client'
import playContactWidget from 'contact-submit-widgets/public/js/client'

const noop = _ => _

const enterScripts = [
  {
    type: 'home',
    script: enterHome,
  },
  {
    type: 'contact-page',
    script: animateContact,
  },
  {
    type: 'project-page',
    script: noop,
  },
  {
    type: 'article-page',
    script: enterArticle,
  },
  {
    type: 'career-page',
    script: enterCareer,
  },
]

const leaveScripts = [
  {
    type: 'home',
    script: leaveHome,
  },
  {
    type: 'career-page',
    script: leaveCareer,
  },
  {
    type: 'article-page',
    script: leaveArticle,
  },
]

const widgets = [
  {
    type: 'contact-submit',
    script: playContactWidget,
  },
]

const animateScripts = [
  {
    type: 'menu',
    script: animateHome,
  },
  {
    type: 'article',
    script: animateArticle,
  },
  {
    type: 'career',
    script: animateCareer,
  },
]

export { animateScripts, enterScripts, leaveScripts, widgets }
