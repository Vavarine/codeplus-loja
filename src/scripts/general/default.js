const menu = require('../modules/menu');
const Minicart = require('../modules/Minicart');
const Search = require('../modules/Search');

const Default = {
    init: function () {
        Default.menuInit();
        Minicart.init({ 
            minicartButtonClass: 'headerMain__userNav-cart',
            outterBox: true
        });
        Default.searchInit();
    },

    menuInit: function () {
        const menuConfig = {
            tree: 3,
            mainClass: 'menu__nav'
        }

        menu.init(menuConfig);
    },

    searchInit: function () {
      Search({
          inputClass: 'headerMain__search-input',
          buttonClass: 'headerMain__search-button'
      })
    }
}

module.exports = Default