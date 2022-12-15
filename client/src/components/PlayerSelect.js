function PlayerSelect(props) {
  function handleClick(e) {
    props.setPlayerType(e.target.value);
  }

  if (props.playerType === null) {
    return (
      <div className="player-selector">
        <div className="title">
          <h1>Select User</h1>
        </div>
        <div className="player-selector-buttons">
          <button className='btn' value='gm' onClick={handleClick}>Game Master</button>
          <button className='btn' value='player' onClick={handleClick}>Player</button>
        </div>
      </div>
    );
  }
}

export default PlayerSelect;