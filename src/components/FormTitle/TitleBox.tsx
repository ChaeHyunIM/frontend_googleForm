export default function TitleBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      css={{
        width: '100%',
        position: 'relative',
        padding: '22px 0 24px 0',
        borderRadius: '8px',
        border: '1px solid rgb(218, 220, 224)',
        marginBottom: '24px',
      }}
    >
      <div
        css={{
          width: '100%',
          height: '10px',
          position: 'absolute',
          top: '1px',
          backgroundColor: 'rgb(103, 58, 183)',
        }}
      >
        {' '}
      </div>
      {children}
    </div>
  );
}
