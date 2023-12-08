import Input from '../../atoms/Input';

export default function LongAnswer() {
  return <Input inputProps={{ readOnly: true }} placeholder="장문형 텍스트" />;
}
