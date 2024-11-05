function FormButtons() {
  return (
    <div className="task-form-buttons">
      <button className="form-button" type="submit" name="create">
        Create
      </button>
      <button className="form-button" type="submit" name="delete">
        Delete all tasks
      </button>
    </div>
  );
}

export default FormButtons;
