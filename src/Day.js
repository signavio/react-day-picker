/* eslint-disable jsx-a11y/no-static-element-interactions, react/forbid-prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import { defaultStyle } from 'substyle';

function handleEvent(handler, day, modifiers) {
  if (!handler) {
    return undefined;
  }
  const dayState = {};
  modifiers.forEach((modifier) => { dayState[modifier] = true; });
  return (e) => {
    e.persist();
    handler(e, day, dayState);
  };
}
function Day({
  day,
  tabIndex,
  empty,
  modifiers,
  onMouseEnter,
  onMouseLeave,
  onClick,
  onKeyDown,
  onTouchStart,
  onTouchEnd,
  onFocus,
  ariaLabel,
  ariaDisabled,
  ariaSelected,
  dataDayInside,
  children,
  style,
}) {
  if (empty) {
    return <div role="gridcell" aria-disabled { ...style } />;
  }
  return (
    <div
      { ...style }
      tabIndex={ tabIndex }
      role="gridcell"
      data-dayInside={ dataDayInside }
      aria-label={ ariaLabel }
      aria-disabled={ ariaDisabled.toString() }
      aria-selected={ ariaSelected.toString() }
      onClick={ handleEvent(onClick, day, modifiers) }
      onKeyDown={ handleEvent(onKeyDown, day, modifiers) }
      onMouseEnter={ handleEvent(onMouseEnter, day, modifiers) }
      onMouseLeave={ handleEvent(onMouseLeave, day, modifiers) }
      onTouchEnd={ handleEvent(onTouchEnd, day, modifiers) }
      onTouchStart={ handleEvent(onTouchStart, day, modifiers) }
      onFocus={ handleEvent(onFocus, day, modifiers) }
    >
      {children}
    </div>
  );
}

Day.propTypes = {
  day: PropTypes.instanceOf(Date).isRequired,
  children: PropTypes.node.isRequired,

  dataDayInside: PropTypes.bool,
  ariaDisabled: PropTypes.bool,
  ariaLabel: PropTypes.string,
  ariaSelected: PropTypes.bool,
  empty: PropTypes.bool,
  modifiers: PropTypes.array,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onTouchEnd: PropTypes.func,
  onTouchStart: PropTypes.func,
  onFocus: PropTypes.func,
  tabIndex: PropTypes.number,
  style: PropTypes.func.isRequired,
};

Day.defaultProps = {
  modifiers: [],
  empty: false,
};

const styled = defaultStyle({
  display: 'table-cell',
  cursor: 'pointer',
  verticalAlign: 'middle',

  '&today': {
    fontWeight: 500,
  },

  '&disabled': {
    cursor: 'default',
  },

  '&outside': {
    cursor: 'default',
  },
}, ({ modifiers }) => (
  modifiers.map(modifier => `&${modifier}`)
));

export default styled(Day);
