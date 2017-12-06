export default () => {
  window.setTimeout(() => document.querySelectorAll('.at_content__slide').forEach(i => i.classList.add('in-view')), 0)
  const clickableElements = document.querySelectorAll('.at_intro__btn')

  /**
   * Attach event listener on "page" attribute
   */
  clickableElements.forEach(el =>
    el.addEventListener('click', e => {
      const shown = el.classList.contains('shown')
      el.classList.toggle('shown')
      const paragraphs = el.parentElement.querySelectorAll('.at_intro .at_content__slide p:nth-child(n + 3)')
      paragraphs.forEach(paragraph => paragraph.classList.toggle('p-show'))

      if (shown) {
        // already show => need to go back to original state
        el.querySelector('.at_intro .icon').style.transform = 'rotate(90deg)'
        el.querySelector('.btn--label').innerHTML = 'Voir plus'
      } else {
        // not shown yet => need to rotate arrow and display "See less" message
        el.querySelector('.at_intro .icon').style.transform = 'rotate(270deg)'
        el.querySelector('.btn--label').innerHTML = 'Voir moins'
      }
    }),
  )
}
