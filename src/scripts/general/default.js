const menu = require('../modules/menu');

const Default = {
    init: function () {
        Default.menuInit();
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