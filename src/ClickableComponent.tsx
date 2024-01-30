// ClickableComponent.js
const ClickableComponent = ({ onClick }: { onClick: () => void }) => {
  return (
    <div>
      <button onClick={onClick}>rn</button>
    </div>
  );
};

export default ClickableComponent;
