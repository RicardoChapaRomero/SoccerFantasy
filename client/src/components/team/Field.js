import * as React from 'react';
import PropTypes from 'prop-types';
import './Field.css';
import Player from './Player';

const Field = (props) => {
  const { formation } = props;
  const attackers = [],
    midfielders = [],
    defenders = [];
  for (let i = 0; i < Number.parseInt(formation[4]); i++)
    attackers.push(<Player key={i} />);
  for (let i = 0; i < Number.parseInt(formation[2]); i++)
    midfielders.push(<Player key={i} />);
  for (let i = 0; i < Number.parseInt(formation[0]); i++)
    defenders.push(<Player key={i} />);

  return (
    <div className="field">
      <div className="line">{attackers}</div>
      <div className="line">{midfielders}</div>
      <div className="line">{defenders}</div>
      <div className="line">
        <Player />
      </div>
    </div>
  );
};
Field.propTypes = {
  formation: PropTypes.string
};
Field.defaultProps = {
  formation: '4-3-3'
};
export default Field;
