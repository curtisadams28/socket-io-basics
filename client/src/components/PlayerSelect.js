import { useNavigate } from "react-router-dom";

function PlayerSelect(props) {
  const navigate = useNavigate();
  function handleClick(e) {
    props.setPlayerType(e.target.value);
    navigate(e.target.value);
  }

  if (props.playerType === null) {
    return (
      <div className="player-selector">
        <div className="title">
          <h1>Select User</h1>
        </div>
        <div className="player-selector-buttons">
          <button className='btn' value='/GMScreen' onClick={handleClick}>Game Master</button>
          <button className='btn' value='/Player' onClick={handleClick}>Player</button>
        </div>
      </div>
    );
  }
}

export default PlayerSelect;