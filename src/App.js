import MemoItem from './components/MemoItem';
import memos from './mock.json';

function App() {
  return (
    <div className="App">
      <div className="memoContainer">
        <div className="nav">
          <button className="btn">메모 작성하기</button>
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
                <textarea className="contentText" rows="5" />
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
