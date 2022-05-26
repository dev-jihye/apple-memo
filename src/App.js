import { useEffect, useRef, useState } from 'react';
import MemoItem from './components/MemoItem';
import './style.css';

function App() {
  const [memos, setMemos] = useState(
    JSON.parse(localStorage.getItem('MEMOS_KEY')) || []
  );
  const [selectedMemo, setSelectedMemo] = useState(memos[0]);
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
  };

  const onDeleteClick = (selectedMemo) => {
    const memoIndex = memos.indexOf(selectedMemo);
    const remainingMemo = memos.filter((memo) => memo.id !== selectedMemo.id);
    console.log(remainingMemo);
    setMemos(remainingMemo);
    if (memoIndex < memos.length - 1) {
      if (memoIndex === -1 && selectedMemo.content.length > 0) {
        setSelectedMemo(memos[1]);
      } else if (memoIndex === -1 && selectedMemo.content.length === 0) {
        setSelectedMemo(memos[0]);
      } else {
        setSelectedMemo(memos[memoIndex + 1]);
      }
    } else if (memoIndex === memos.length - 1) {
      setSelectedMemo(memos[memoIndex - 1]);
    }
  };

  useEffect(() => {
    if (memos.length >= 0) {
      localStorage.setItem('MEMOS_KEY', JSON.stringify(memos));
    }
  }, [memos]);

  return (
    <div className="App">
      <div className="memoContainer">
        <div className="nav">
          <button className="btn" onClick={() => onAddMemo()}>
            📒 새로운 메모
          </button>
        </div>
        <section className="memoSection">
          <div className="listArea">
            <ul>
              {memos &&
                memos.map((memo, id) => (
                  <MemoItem
                    key={memo.id}
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
                  rows="10"
                  ref={textRef}
                  onChange={onChange}
                  onBlur={onBlur}
                />
                <button
                  className="btn"
                  onClick={() => onDeleteClick(selectedMemo)}
                >
                  🗑 삭제하기
                </button>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
