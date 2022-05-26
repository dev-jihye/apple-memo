const MemoItem = ({ memo, onItemClick, selectedMemo }) => {
  console.log(memo);
  return (
    <li
      key={memo.id}
      className={
        selectedMemo.id === memo.id ? 'selectedMemo memoTitle' : 'memoTitle'
      }
      onClick={() => onItemClick(memo)}
    >
      {memo.content.trim() ? (
        memo.content
      ) : (
        <p className="emptyTitle">새로운 메모</p>
      )}
    </li>
  );
};

export default MemoItem;
