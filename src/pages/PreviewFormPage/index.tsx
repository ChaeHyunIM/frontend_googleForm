import { useAppSelector } from '../../app/hooks';
import Preview from '../../components/Preview';

export default function PreviewFormPage() {
  const formFields = useAppSelector(state => state.formField);
  return (
    <div>
      <Preview />
    </div>
  );
}
