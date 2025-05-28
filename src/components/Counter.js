import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset, setValue, incrementAsync } from '../redux/actions';

const Counter = () => {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  const handleSetValue = () => {
    const value = parseInt(inputValue, 10);
    if (!isNaN(value)) {
      dispatch(setValue(value));
      setInputValue('');
    }
  };

  return (
    <div className="section">
      <h2>Counter Example</h2>
      <div>
        <p>Current Count: <strong>{count}</strong></p>
        
        <div>
          <button onClick={() => dispatch(decrement())}>
            Decrement
          </button>
          <button onClick={() => dispatch(increment())}>
            Increment
          </button>
          <button onClick={() => dispatch(reset())}>
            Reset
          </button>
          <button onClick={() => dispatch(incrementAsync(5))}>
            Increment by 5 (async)
          </button>
        </div>
        
        <div style={{ marginTop: '1rem' }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter a value"
          />
          <button onClick={handleSetValue}>Set Value</button>
        </div>
      </div>
      
      <div style={{ marginTop: '1rem' }}>
        <h3>Redux Concepts Demonstrated:</h3>
        <ul>
          <li>Using <code>useSelector</code> to access Redux state</li>
          <li>Using <code>useDispatch</code> to dispatch actions</li>
          <li>Synchronous actions (increment, decrement, reset, setValue)</li>
          <li>Asynchronous actions using Redux Thunk (incrementAsync)</li>
        </ul>
      </div>
    </div>
  );
};

export default Counter;
