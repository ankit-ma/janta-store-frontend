function MyButton(props) {
  const classes =
    "p-2 bg-[#6366fcd0] hover:from-[#0077b6] hover:bg-[#023e8a] text-white rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 " +
    props.className;
  return (
    <>
      <button className={classes} type="button" onClick={props.buttonHandler}>
        {props.buttonName}
      </button>
    </>
  );
}
export default MyButton;
