import { modifier } from 'ember-modifier';

export default modifier(function onClickOutside(element, params) {
  let handler = params[0] || function(){};
  function handleClick(event) {
    if (!element.contains(event.target) && event.target.contains(element)) {
      handler();
    }
  }

  document.addEventListener('click', handleClick);

  return () => {
    document.removeEventListener('click', handleClick);
  };

});
