const buildStylesString = props => {
  let stylesString = '';

  for (let style in props) {
    if (props.hasOwnProperty(style)) {
      stylesString += `${style}:${props[style]};`
    }
  }

  return stylesString;
};

module.exports = buildStylesString;
