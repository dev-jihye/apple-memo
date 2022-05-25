import { useEffect, useRef, useState } from 'react';
import MemoItem from './components/MemoItem';
import './style.css';

function App() {
  const [memos, setMemos] = useState([]);
  const [selectedMemo, setSelectedMemo] = useState(null);
  const [isWriting, setIsWriting] = useState(false);
  const textRef = useRef();

  useEffect(() => {
    textRef?.current?.focus();
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
                  <MemoItem key={index} memo={memo} />
                ))}
            </ul>
          </div>
          <div className="contentArea">
            {memos.length > 0 && (
              <>
                <textarea className="contentText" rows="5" ref={textRef} />
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
