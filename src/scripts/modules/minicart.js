const createElement = require('./createElement');
const formatReal = require('./formatReal');

const Minicart = {
  init: ({ minicartButtonClass, containerClass, outterBox }) => {
    const $minicart = document.querySelector(`.${minicartButtonClass}`);

    $minicart.addEventListener('click', () => {
      Minicart.create({ containerClass, outterBox });
    })
  },

  create: ({ containerClass, outterBox }) => {
    const $minicartContainer = document.querySelector(containerClass ? `.${containerClass}` : 'body');

    vtexjs.checkout.getOrderForm().done((orderForm) => {
      const { items } = orderForm;

      const minicartTop = createElement({
        className: 'minicart__top'
      });

      const minicartMiddle = createElement({
        tagName: 'ul',
        className: 'minicart__middle',
        childrenList: items.map(item => Minicart.createProduct(item))
      });

      const minicartBotton = createElement({
        className: 'minicart__botton'
      });
  
      const minicart = createElement({
        className: 'minicart',
        childrenList: [minicartTop, minicartMiddle, minicartBotton]
      });
  
      if(outterBox) {
        const minicartOutterBox = createElement({
          className: 'minicart__outter-box',
        });

        minicartOutterBox.addEventListener('click', minicartOutterBox.remove);
  
        minicartOutterBox.append(minicart);
        $minicartContainer.append(minicartOutterBox);
      } else {
        $minicartContainer.append(minicart)
      }

    })

  },

  createProduct: ({ imageUrl, name, price, listPrice, skuName }) => {
    const productName = createElement({
      tagName: 'h4',
      innerHTML: name,
      className: 'minicart__product-name'
    });

    const productSkuName = createElement({
      tagName: 'p',
      innerHTML: skuName,
      className: 'minicart__product-sku-name'
    })

    const productPrice = createElement({
      tagName: 'span',
      innerHTML: `<s>R$${formatReal(price)}</s> <b>R$${formatReal(listPrice)}</b>`,
      className: 'product__product-price'
    })

    const productInfoWrapper = createElement({
      className: 'minicart__product-info',
      childrenList: [productName, productSkuName, productPrice]
    });

    const productImage = createElement({
      tagName: 'img',
      src: imageUrl,
      className: 'minicart__product-image'
    })
    
    const product = createElement({
      tagName: 'li',
      className: 'minicart__product',
      childrenList: [productImage, productInfoWrapper] 
    });

    return product;
  }
}

module.exports = Minicart