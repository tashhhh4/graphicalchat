console.log('Loaded ui_test.js');

// Import HTML
// import htmlTemplate from './test_template.html';
const html = '<div class="ui-textbox">A cute text box appeared!</div>'

// Import CSS
import './test_ui.css';

const uiWrapper = document.getElementById('ui_wrapper');
uiWrapper.innerHTML = html;