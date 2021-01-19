const createElement = require('./createElement');
const formatReal = require('./formatReal');

const Minicart = {
  init: ({ minicartButtonClass, containerClass, outterBox }) => {
    const $minicart = document.querySelector(`.${minicartButtonClass}`);

    // Código para botão temporario de adição de produtos ao carrinho
    const $addToCartButton = document.querySelector('body main button');

    $addToCartButton.addEventListener('click', () => {
      var item = {
        id: 3,
        quantity: 2,
        seller: '1'
      };
      vtexjs.checkout.addToCart([item], null)
        .done(function(orderForm) {
          alert('Item adicionado!');
        });
    })

    // Código para o botão que abre o carrinho
    $minicart.addEventListener('click', () => {
      Minicart.create({ containerClass, outterBox });
    })
  },

  create: ({ containerClass, outterBox }) => {
    const $minicartContainer = document.querySelector(containerClass ? `.${containerClass}` : 'body');

    vtexjs.checkout.getOrderForm().done((orderForm) => {
      const { items } = orderForm;
      
      // Minicart top elements
      const minicartTitleIcon = createElement({
        tagName: 'img',
        src: '/arquivos/evailson-barbosa-carrinho.svg'
      })

      const minicartTitleText = createElement({
        tagName: 'h3',
        innerHTML: 'MEU CARRINHO'
      })

      const minicartTitle = createElement({
        className: 'minicart__top-title',
        childrenList: [minicartTitleIcon, minicartTitleText]
      })

      const minicartCloseButton = createElement({
        className: 'minicart__top-close-button',
        innerHTML: '<img src="/arquivos/evailson-barbosa-close.svg" />'
      });

      minicartCloseButton.addEventListener('click', e => Minicart.close(e, outterBox));

      const minicartTop = createElement({
        className: 'minicart__top',
        childrenList: [minicartCloseButton, minicartTitle]
      });

      // Minicart middle elements
      const minicartMiddle = createElement({
        tagName: 'ul',
        className: 'minicart__middle',
        childrenList: items.map((item, index) => Minicart.createProduct(item, index))
      });

      // Minicart botton Elements
      const minicartCartLink = createElement({
        tagName: 'a',
        innerHTML: 'Ver minha sacola',
        href: '#',
        className: 'minicart__botton__info-left__cart-link'
      })

      const minicartInfoLeft = createElement({
        className: 'minicart__botton__info-left',
        innerHTML: 'Total valor(sem frete):',
        childrenList: [minicartCartLink]
      })

      const minicartInfoRight = createElement({
        className: 'minicart__botton__info-right',
        innerHTML: `R$ ${formatReal(Minicart.calculateTotal(items))}`
      });

      const minicartInfo = createElement({
        className: 'minicart__botton__info',
        childrenList: [minicartInfoLeft, minicartInfoRight]
      });

      const minicartCheckoutButton = createElement({
        tagName: 'a',
        className: 'minicart__botton-controllers__checkout-button',
        href: '/checkout',
        innerHTML: 'FECHAR PEDIDO'
      });

      const minicartKeepBuying = createElement({
        tagName: 'a',
        className: 'minicart__botton-controllers__keep-buying',
        innerHTML: 'Continuar Comprando'
      });

      minicartKeepBuying.addEventListener('click', e => {
        e.preventDefault();

        Minicart.close(e, outterBox);
      });

      const minicartBottonControllers = createElement({
        className: 'minicart__botton-controllers',
        childrenList: [minicartCheckoutButton, minicartKeepBuying]
      })

      const minicartBotton = createElement({
        className: 'minicart__botton',
        childrenList: [minicartInfo, minicartBottonControllers]
      });
  
      const minicart = createElement({
        className: 'minicart',
        childrenList: [minicartTop, minicartMiddle, minicartBotton]
      });
      
  
      if(outterBox) {
        const minicartOutterBox = createElement({
          className: 'minicart__outter-box',
        });

        minicartOutterBox.addEventListener('click', e => {
          if(e.target.className === 'minicart__outter-box') Minicart.close(e, outterBox);
        });
  
        minicartOutterBox.append(minicart);
        $minicartContainer.append(minicartOutterBox);
      } else {
        $minicartContainer.append(minicart)
      }

    })
  },

  createProduct: ({ imageUrl, name, price, listPrice, skuName, quantity, productId }, index) => {
    const removeProduct = createElement({
      className: 'minicart__product-remove',
      innerHTML: '<img src="/arquivos/evailson-barbosa-close.svg" />'
    });

    removeProduct.addEventListener('click', () => Minicart.removeProduct(index));
    
    const productName = createElement({
      tagName: 'p',
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
      className: 'minicart__product-price'
    })

    const productQuantity = createElement({
      className: 'minicart__product-quantity',
      innerHTML: `Qtd: ${quantity}`
    })

    const productInfoWrapper = createElement({
      className: 'minicart__product-info',
      childrenList: [productName, productSkuName, productPrice, productQuantity]
    });

    const productImage = createElement({
      tagName: 'img',
      src: imageUrl,
      className: 'minicart__product-image'
    })
    
    const product = createElement({
      tagName: 'li',
      className: 'minicart__product',
      childrenList: [productImage, removeProduct, productInfoWrapper] 
    });

    return product;
  },

  refreshProducts: () => {
    const minicartMiddle = document.querySelector('.minicart__middle');

    console.log(minicartMiddle);

    minicartMiddle.innerHTML = '';

    vtexjs.checkout.getOrderForm().done((orderForm) => {
      const { items } = orderForm;
      
      minicartMiddle.append(items.map((item, index) => Minicart.createProduct(item, index)));
    })
  },

  removeProduct: (item) => {
    vtexjs.checkout.getOrderForm()
      .then(function(orderForm) {
        orderForm.items.getin

        var itemIndex = 0
        var item = orderForm.items[itemIndex];
        var itemsToRemove = [
          {
            "index": 0,
            "quantity": 0,
          }
        ]
        return vtexjs.checkout.removeItems(itemsToRemove);
      })
      .done(function(orderForm) {
        alert('Item removido!');

        console.log('removido')

        Minicart.refreshProducts();
      });
  },

  calculateTotal: (items) => {
    if(items.length < 1) return 0;

    const total = items
      .map(item => (item.sellingPrice * item.quantity))
      .reduce((total, current) => (total + current));

    return total;
  },

  close: (event, outterBox) => {
    if(outterBox) {
      document.querySelector('.minicart__outter-box').remove();
      return
    } else {
      document.querySelector('.minicart').remove();
    }
    
  }
}

module.exports = Minicart