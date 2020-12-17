const createElement = require('./createElement');
const api = require('./api');

const menu = {
  init: ({ tree, mainClass }) => {
    const apiConfig = {
      method: 'GET',
      url: `/api/catalog_system/pub/category/tree/${tree}`
    }
  
    const callbackApi = data => {
      menu.render({data, main: mainClass});
    }
  
    api(apiConfig, callbackApi);
  },

  render: ({data, main}) => {
    const $main = typeof main === 'string' ? document.querySelector(`.${main}`) : main;
    const mainClassName = $main.className;

    data.forEach(category => {
      const { name, url, hasChildren, children } = category;
      
      const newCategory = createElement({ className: `${mainClassName}-item`, tagName: 'div' });
      const newCategoryLink = createElement({ className: `${mainClassName}-itemLink`, tagName: 'a', href: url, innerHTML: name});
      const newCategoryBox = createElement({ className: `${mainClassName}-categoryBox`, tagName: 'div' });

      newCategory.appendChild(newCategoryLink);
      newCategory.appendChild(newCategoryBox);

      $main.appendChild(newCategory);
    
      if(hasChildren) {
        menu.render({ data: children, main: newCategoryBox });
      }
    });
  }
}

module.exports = menu;