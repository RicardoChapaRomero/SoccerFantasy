import * as React from 'react';
import PropTypes from 'prop-types';
import './Field.css';
import Player from './Player';

const Field = (props) => {
  const { formation } = props;
  console.log(formation);
  return (
    <div className="field">
      <div className="line">
        {formation[2].map((i, player) => (
          <Player key={i} />
        ))}
      </div>
      <div className="line">
        {formation[1].map((i, player) => (
          <Player key={i} />
        ))}
      </div>
      <div className="line">
        {formation[0].map((i, player) => (
          <Player key={i} />
        ))}
      </div>
      <div className="line">
        <Player />
      </div>
    </div>
  );
};
Field.propTypes = {
  formation: PropTypes.array
};
Field.defaultProps = {
  formation: [
    [1, 2, 3, 4],
    [1, 2, 3],
    [1, 2, 3]
  ]
};
export default Field;
