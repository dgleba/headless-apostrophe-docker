import animateHome from 'apostrophe-pages/public/js/home/client-home'
import { enterCareer, leaveCareer } from 'career-pages/public/js/client'
import animateContact from 'contact-pages/public/js/client'
import playContactWidget from 'contact-submit-widgets/public/js/client'

const noop = _ => _

const enterScripts = [
  {
    type: 'home',
    script: animateHome,
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
    script: noop,
  },
  {
    type: 'career-page',
    script: enterCareer,
  },
]

const leaveScripts = [
  {
    type: 'career-page',
    script: leaveCareer,
  },
]

const widgets = [
  {
    type: 'contact-submit',
    script: playContactWidget,
  },
]

export { enterScripts, leaveScripts, widgets }
