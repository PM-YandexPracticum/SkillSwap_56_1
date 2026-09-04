import styles from './Radio.module.css';

type RadioButtopProps = {
  text: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
}

const RadioButtonUI = (props: RadioButtopProps) => {
  return (
      <>
      <input
          id={`radio-${props.value}`}
          type='radio'
          name={props.name}
          value={props.value}
          onChange={props.onChange}
      />
      <label
        htmlFor={`radio-${props.value}`}
        className={styles['custom-radio']}>
          <span className={`${styles['circle']} ${props.checked ? styles['active'] : ''}`.trim()}>
            <span className={`${styles['dot']} ${!props.checked ? styles['hidden'] : ''}`.trim()}></span>
          </span>
        {props.text}
    </label>
    </>
  )
}

export default RadioButtonUI
