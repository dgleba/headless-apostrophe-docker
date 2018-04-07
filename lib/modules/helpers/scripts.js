import { animateEnterHome, animateLeaveHome, enterHome } from 'apostrophe-pages/public/js/home/client-home'
import { animateEnterCareer, animateLeaveCareer, enterCareer } from 'career-pages/public/js/client'
import { animateEnterArticle, animateLeaveArticle, enterArticle } from 'article-pages/public/js/client'
import animateContact from 'contact-pages/public/js/client'
import playContactWidget from 'contact-submit-widgets/public/js/client'

const noop = _ => new Promise(_ => _())

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

const widgets = [
  {
    type: 'contact-submit',
    script: playContactWidget,
  },
]

const animateEnterScripts = [
  {
    type: 'menu',
    script: animateEnterHome,
  },
  {
    type: 'article',
    script: animateEnterArticle,
  },
  {
    type: 'career',
    script: animateEnterCareer,
  },
  {
    type: 'contact-page',
    script: noop,
  },
  {
    type: 'project-page',
    script: noop,
  },
]

const animateLeaveScripts = [
  {
    type: 'home',
    script: animateLeaveHome,
  },
  {
    type: 'article-page',
    script: animateLeaveArticle,
  },
  {
    type: 'career-page',
    script: animateLeaveCareer,
  },
  {
    type: 'contact-page',
    script: noop,
  },
  {
    type: 'project-page',
    script: noop,
  },
]

export { animateEnterScripts, animateLeaveScripts, enterScripts, widgets }
