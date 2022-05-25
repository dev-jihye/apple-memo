const MemoItem = ({ memo, onItemClick, selectedMemo }) => {
  return (
    <li
      key={memo.id}
      className={
        selectedMemo.id === memo.id ? 'selectedMemo memoTitle' : 'memoTitle'
      }
      onClick={() => onItemClick(memo)}
    >
      {memo.content ? memo.content : <p className="emptyTitle">빈 메모</p>}
    </li>
  );
};

export default MemoItem;
