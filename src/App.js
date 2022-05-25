import { useEffect, useRef, useState } from 'react';
import MemoItem from './components/MemoItem';
import './style.css';

function App() {
  const [memos, setMemos] = useState([]);
  const [selectedMemo, setSelectedMemo] = useState(null);
  const [isWriting, setIsWriting] = useState(false);
  const textRef = useRef();

  useEffect(() => {
    isWriting && textRef?.current?.focus();
  }, [isWriting]);

  const onAddMemo = () => {
    if (memos.length >= 1 && !memos[0].content) {
      return;
    }

    const newMemo = {
      id: Date.now(),
      content: '',
    };
    setMemos([newMemo, ...memos]);
    setSelectedMemo(newMemo);
    setIsWriting(true);
  };

  const onChange = (e) => {
    const changedSelectedMemo = {
      ...selectedMemo,
      content: e.target.value,
    };
    setSelectedMemo(changedSelectedMemo);
    changeContent(changedSelectedMemo.content, changedSelectedMemo.id);
  };

  const changeContent = (contentText, id) => {
    const checkedMemo = memos.map((memo) => {
      if (memo.id === id) {
        return { ...memo, content: contentText };
      }
      return memo;
    });
    setMemos(checkedMemo);
  };

  const onBlur = () => {
    const checkBlank = memos.filter((memo) => memo.content.length >= 1);
    if (memos) {
      setMemos(checkBlank);
      setIsWriting(false);
    }
    setIsWriting(false);
  };

  const onItemClick = (memo) => {
    setSelectedMemo(memo);
    setIsWriting(false);
  };

  return (
    <div className="App">
      <div className="memoContainer">
        <div className="nav">
          <button className="btn" onClick={() => onAddMemo()}>
            메모 작성하기
          </button>
        </div>
        <section className="memoSection">
          <div className="listArea">
            <ul>
              {memos &&
                memos.map((memo, index) => (
                  <MemoItem
                    key={index}
                    memo={memo}
                    onItemClick={onItemClick}
                    selectedMemo={selectedMemo}
                  />
                ))}
            </ul>
          </div>
          <div className="contentArea">
            {memos.length > 0 && (
              <>
                <textarea
                  className="contentText"
                  value={selectedMemo?.content}
                  rows="5"
                  ref={textRef}
                  onChange={onChange}
                  onBlur={onBlur}
                />
                <button>삭제하기</button>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
