const Search = ({ inputClass, buttonClass }) => {
  const $input = document.querySelector(`.${inputClass}`);
  const $button = document.querySelector(`.${buttonClass}`);


  $input.addEventListener('keyup', (event) => {
    if(event.key !== 'Enter') return;

    window.location.href = `${window.location.origin}/${$input.value}`;
  })

  $button.addEventListener('click', () => {
    window.location.href = `${window.location.origin}/${$input.value}`;
  })
}

module.exports = Search