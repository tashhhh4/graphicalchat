console.log('Loaded ui_test.js');

// Import HTML
import html from './test_template.html?raw';

// Import CSS
import './test_ui.css';

const uiWrapper = document.getElementById('ui_wrapper');
uiWrapper.innerHTML = html;