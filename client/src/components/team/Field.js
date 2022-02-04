import * as React from 'react';
import PropTypes from 'prop-types';
import './Field.css';
import Player from './Player';
import Coach from './Coach';
import Button from '@mui/material/Button';
import {
  verifyUserToken,
  saveFantasy
} from '../../scripts/apiScripts';
import SaveTeamDialog from './SaveTeamDialog';

const Field = (props) => {
  const { formation, selected_players, setSelectedDT } = props;
  const [open, setOpen] = React.useState(false);
  const [success, setSuccess] = React.useState(true);

  const attackers = [],
    midfielders = [],
    defenders = [];
  for (let i = 0; i < Number.parseInt(formation[4]); i++) {
    const selected_attackers = selected_players.Attacker;
    if (selected_attackers.length > i) {
      attackers.push(
        <Player
          key={i}
          playerPhoto={selected_attackers[i].img}
          playerName={selected_attackers[i].name}
          position={selected_attackers[i].position}
        />
      );
    } else {
      attackers.push(<Player key={i} />);
    }
  }

  for (let i = 0; i < Number.parseInt(formation[2]); i++) {
    const selected_midfielders = selected_players.Midfielder;
    if (selected_midfielders.length > i) {
      midfielders.push(
        <Player
          key={i}
          playerPhoto={selected_midfielders[i].img}
          playerName={selected_midfielders[i].name}
          position={selected_midfielders[i].position}
        />
      );
    } else {
      midfielders.push(<Player key={i} />);
    }
  }

  for (let i = 0; i < Number.parseInt(formation[0]); i++) {
    const selected_defenders = selected_players.Defender;
    if (selected_defenders.length > i) {
      defenders.push(
        <Player
          key={i}
          playerPhoto={selected_defenders[i].img}
          playerName={selected_defenders[i].name}
          position={selected_defenders[i].position}
        />
      );
    } else {
      defenders.push(<Player key={i} />);
    }
  }

  const saveTeam = async () => {
    const token_res = await verifyUserToken(document.cookie);
    const fantasy_saved_res = await saveFantasy(token_res.userId, {
      players: selected_players,
      formation: formation
    });
    // give here result
    setSuccess(true);
    setOpen(true);
  };

  const Dialog = (
    <SaveTeamDialog
      open={open}
      success={success}
      onClose={() => setOpen(false)}
    />
  );

  return (
    <div>
      <div className="field">
        <div className="line">{attackers}</div>
        <div className="line">{midfielders}</div>
        <div className="line">{defenders}</div>
        <div className="line">
          {selected_players.Goalkeeper.length > 0 ? (
            <Player
              key={0}
              playerPhoto={selected_players.Goalkeeper[0].img}
              playerName={selected_players.Goalkeeper[0].name}
              position={selected_players.Goalkeeper[0].position}
            />
          ) : (
            <Player key={0} />
          )}
        </div>
        <Coach
          selectedValue={selected_players.Dt}
          setSelectedValue={setSelectedDT}
        />
      </div>
      <div className="footerField">
        <Button
          color="success"
          sx={{
            display: 'flex',
            alignSelf: 'center',
            marginTop: '5px'
          }}
          onClick={saveTeam}
          variant="contained"
        >
          save team
        </Button>
      </div>
      {Dialog}
    </div>
  );
};

Field.propTypes = {
  formation: PropTypes.string,
  selected_players: PropTypes.object,
  setSelectedDT: PropTypes.func.isRequired
};
Field.defaultProps = {
  formation: '4-3-3',
  selected_players: {}
};
export default Field;
