import React, { useState } from 'react';

function Collapsible(props) {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="faq" id={props.id}>
      <h4 onClick={toggle}>{props.title}<span>{isOpen ? '-' : '+'}</span></h4>
      {isOpen && <div className="content">{props.children}</div>}
    </div>
  );
}

export default Collapsible;