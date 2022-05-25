const MemoItem = ({ memo }) => {
  return (
    <li className="memoTitle">
      {memo.content ? memo.content : <p className="emptyTitle">빈 메모</p>}
    </li>
  );
};

export default MemoItem;
