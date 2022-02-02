const positions = [
  'Goalkeeper',
  'Defender',
  'Midfielder',
  'Attacker'
];

const getColor = (position) => {
  return 'info';
  if (position === 'Goalkeeper') {
    return 'error';
  }
  if (position === 'Defender') {
    return 'info';
  }
  if (position === 'Attacker') {
    return 'secondary';
  }

  return 'primary';
};

export { positions, getColor };
