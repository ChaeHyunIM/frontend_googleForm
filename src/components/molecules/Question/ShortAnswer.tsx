import Input from '../../atoms/Input';

export default function ShortAnswer() {
  return <Input inputProps={{ readOnly: true }} placeholder="단답형 텍스트" />;
}
