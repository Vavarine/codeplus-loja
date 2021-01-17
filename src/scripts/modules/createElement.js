const createElement = (props) => {
  const el = document.createElement(props.tagName ? props.tagName : 'div');

  props?.className && (el.className = props.className); 

  props?.classList && el.classList.add(...props.classList);

  props?.innerHTML && (el.innerHTML = props.innerHTML); 

  props?.childrenList && el.append(...props.childrenList);

  props.tagName === 'a' && el.setAttribute('href', props.href);

  props.tagName === 'img' && el.setAttribute('src', props.src);

  return el;
}

module.exports = createElement;