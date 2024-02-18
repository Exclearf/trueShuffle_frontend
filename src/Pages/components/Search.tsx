import SearchStyled from "./StyledComponents/SearchStyled";

interface SettingsPageProps {
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  searchInput: string;
}

const Search: React.FC<SettingsPageProps> = ({
  setSearchInput,
  searchInput,
}) => {
  return (
    <SearchStyled>
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
    </SearchStyled>
  );
};

export default Search;
