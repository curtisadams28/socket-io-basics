import { useEffect, useState } from "react";
import io from "socket.io-client";

function GmPage(props) {
  if (props.playerType === 'gm') {
    return (
      <div>GMPAGE</div>
    );
  }
}

export default GmPage;