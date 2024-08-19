function MyButton(props) {
  const classes =
    "p-2 bg-[#023e8a] hover:bg-[#0077b6] text-white rounded " + props.className;
  return (
    <>
      <button className={classes} type="button" onClick={props.buttonHandler}>
        {props.buttonName}
      </button>
    </>
  );
}
export default MyButton;
