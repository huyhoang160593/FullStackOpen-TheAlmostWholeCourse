export default function PersonForm({
  onPhoneFormSubmitHandle, onNameChangeHandle, newName, onPhoneNumberChangeHandle, newPhoneNumber,
}) {
  return (
    <form onSubmit={onPhoneFormSubmitHandle}>
      <div>
        name: <input onChange={onNameChangeHandle} value={newName} />
      </div>
      <div>
        number:
        <input onChange={onPhoneNumberChangeHandle} value={newPhoneNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}
