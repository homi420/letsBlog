const StyleButton = ({ active, label, onToggle, style }) => {
  const handleToggle = (e) => {
    e.preventDefault();
    onToggle(style);
  };

  let className =
    "RichEditor-styleButton bg-gunmetal text-ghost-white p-2 rounded cursor-pointer";
  if (active) {
    className = " RichEditor-activeButton ";
  }

  return (
    <span className={className} onMouseDown={handleToggle}>
      {label}
    </span>
  );
};
export default StyleButton;
