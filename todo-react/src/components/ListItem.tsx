export default function ListItem({ key, text }: { key: number; text: string }) {
  return (
    <>
      <li key={key}>
        {text}
        <span>
          <button>X</button>
        </span>
      </li>
    </>
  );
}
