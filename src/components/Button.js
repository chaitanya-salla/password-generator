const Button = ({ onClick, text, cssClass }) => {
  return (
    <button className={cssClass} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
