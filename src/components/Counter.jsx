import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from '../store/actions/counterActions';

function Counter() {
  const count = useSelector(state => state.counter.count);
  const dispatch = useDispatch();

  return (
    <div className="counter">
      <h2>Counter Example</h2>
      <div className="counter-display">
        <h3>Count: {count}</h3>
        <button onClick={() => dispatch(decrement())}>-</button>
        <button onClick={() => dispatch(reset())}>Reset</button>
        <button onClick={() => dispatch(increment())}>+</button>
      </div>
    </div>
  );
}

export default Counter;
