function ButtonBar({options, values, updateState}) {
  let buttons = [];
  for (let i = 0; i < options.length; i++) {
    buttons.push(<button className='btn' key={options[i]} value={values[i]} onClick={updateState}>{options[i]}</button>);
    
  }
  return(
    <div className="button-bar">
      {buttons}
    </div>
  );
}

export default ButtonBar;