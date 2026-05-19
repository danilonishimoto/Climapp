import "./styles.css";

const SearchBar = ({setCity}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formEl = event.currentTarget;
    const formData = new FormData(formEl);
    const city = formData.get("city");
    setCity(city)
    formEl.reset();
  };

  return (
    <form className="form-search" onSubmit={handleSubmit}>
      <label className="search-bar">
        <input type="text" placeholder="Digite a cidade" name="city"/>
        <button type="submit">
          <img src="./search.svg" alt="ícone de busca" />
        </button>
      </label>
    </form>
  );
};

export default SearchBar;
