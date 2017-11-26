export default () =>
  window.setTimeout(() => document.querySelectorAll('.at_content__slide').forEach(i => i.classList.add('in-view')), 0)
