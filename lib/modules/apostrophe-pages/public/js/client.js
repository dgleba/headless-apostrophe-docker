import { handleEvents, handleMenuClick } from 'helpers'

// Start the frontend application
// and activate listeners on the first page
// (then listeners will be attached through helpers/pageHistory.js)
handleEvents()
handleMenuClick() // activate listeners for clicks on menu just once
