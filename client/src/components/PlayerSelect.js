function PlayerSelect(props) {
  function handleClick(e) {
    props.setPlayerType(e.target.value);
  }

  if (props.playerType === null) {
    return (
      <div className="player-selector">
        <h1>Select User</h1>
        <button value='gm' onClick={handleClick}>Game Master</button>
        <button value='player' onClick={handleClick}>Player</button>
      </div>
    );
  }
}

export default PlayerSelect;