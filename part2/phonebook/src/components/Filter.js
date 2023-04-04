export default function Filter({ onFilterChangeHandle, filter }) {
  return (
    <div>
      filter shown with <input onChange={onFilterChangeHandle} value={filter} />
    </div>
  );
}
