import React from 'react';

export default function HeaderBar(props) {
  return (
    <div>
      <header>
        <h2 className="screen-header">{props.title}</h2>
      </header>
    </div>
  );
}