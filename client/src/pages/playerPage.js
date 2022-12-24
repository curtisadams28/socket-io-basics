import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PlayerPage(props) {

  return (
    <div className="player-page">
      <label>Name</label>
      <input type='text'></input>
      <label>Abilities</label>
      <input type='text'></input>
      <label>Desciption</label>
      <input type='text'></input>
      <label>Resolve</label>
      <input type='number'></input>
    </div>
  );
}

export default PlayerPage