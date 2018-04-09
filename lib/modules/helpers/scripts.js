import { animateEnterHome, animateLeaveHome, enterHome } from 'apostrophe-pages/public/js/home/client-home'
import { animateEnterCareer, animateLeaveCareer, enterCareer } from 'career-pages/public/js/client'
import { animateEnterArticle, animateLeaveArticle, enterArticle } from 'article-pages/public/js/client'
import { animateEnterProject, animateLeaveProject, enterProject } from 'project-pages/public/js/client'
import { animateLeaveContact, enterContact } from 'contact-pages/public/js/client'
import playContactWidget from 'contact-submit-widgets/public/js/client'

const noop = _ => new Promise(_ => _())

const enterScripts = [
  {
    type: 'home',
    script: enterHome,
  },
  {
    type: 'contact-page',
    script: enterContact,
  },
  {
    type: 'project-page',
    script: enterProject,
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
    script: animateEnterProject,
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
    script: animateLeaveContact,
  },
  {
    type: 'project-page',
    script: animateLeaveProject,
  },
]

export { animateEnterScripts, animateLeaveScripts, enterScripts, widgets }
