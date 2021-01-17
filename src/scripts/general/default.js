const menu = require('../modules/menu');
const Minicart = require('../modules/Minicart');

const Default = {
    init: function () {
        Default.menuInit();
        Minicart.init({ 
            minicartButtonClass: 'headerMain__userNav-cart',
            outterBox: true
        });
    },

    menuInit: function () {
        const menuConfig = {
            tree: 3,
            mainClass: 'menu__nav'
        }

        menu.init(menuConfig);
    } 
}

module.exports = Default