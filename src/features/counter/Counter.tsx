import { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { decrement, increment, incrementByAmount, incrementAsync, incrementIfOdd, selectCount } from './counterSlice';
import { addFormField } from './formSlice';
import styles from './Counter.module.css';
import FormTitle from '../../components/organisms/FormTitle';
import FormBox from '../../components/organisms/FormBox';
import Button from '@mui/material/Button';
import { generateStringId } from '../../utils/generateId';

export function CreateFormPage() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;
  const formFields = useAppSelector(state => state.formField);
  console.log('formFields', formFields);
  const formFieldAddHandler = () => {
    dispatch(
      addFormField({
        id: generateStringId(),
        type: '단답형',
        label: '',
      })
    );
  };

  return (
    <div>
      {/* <div className={styles.row}>
        <button className={styles.button} aria-label="Decrement value" onClick={() => dispatch(decrement())}>
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button className={styles.button} aria-label="Increment value" onClick={() => dispatch(increment())}>
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={e => setIncrementAmount(e.target.value)}
        />
        <button className={styles.button} onClick={() => dispatch(incrementByAmount(incrementValue))}>
          Add Amount
        </button>
        <button className={styles.asyncButton} onClick={() => dispatch(incrementAsync(incrementValue))}>
          Add Async
        </button>
        <button className={styles.button} onClick={() => dispatch(incrementIfOdd(incrementValue))}>
          Add If Odd
        </button>
      </div> */}
      {formFields.map(formField => (
        <FormBox key={formField.id} id={formField.id} />
      ))}
      <Button onClick={formFieldAddHandler}>필드추가</Button>
    </div>
  );
  // return (
  //   <div>
  //     <FormTitle />
  //     <FormBox />
  //   </div>
  // );
}
