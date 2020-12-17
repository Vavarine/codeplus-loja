const createElement = ({ className = '', tagName, href = '', innerHTML='' }) => {
  const el = document.createElement(tagName);
  el.className = className;

  if(innerHTML !== ''){
    el.innerHTML = innerHTML;
  }

  if(tagName === 'a'){
    el.setAttribute('href', href)
  }

  return el;
}

module.exports = createElement;