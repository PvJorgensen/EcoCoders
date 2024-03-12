
import { useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import styles from './Searchbar.module.scss';

interface Suggestion {
  [key: string]: any; 
}

interface Props {
  fetchData: (value: string) => Promise<Suggestion[]>; 
  setResult: (result: Suggestion | null) => void; 
  suggestionKey: string; 
}

const SearchBar: React.FC<Props> = ({ fetchData, setResult, suggestionKey }) => {
  const [value, setValue] = useState(''); //this is the value of the search bar
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]); // this is where the search suggestions get stored
  const [hideSuggestions, setHideSuggestions] = useState(true);

  const findResult = (value: string) => {
    const result = suggestions.find((suggestion) => suggestion[suggestionKey] === value);
    setResult(result || null); 
  }; 

  useDebounce(
    async () => {
      try {
        const suggestions = await fetchData(value);

        setSuggestions(suggestions || []);
      } catch (error) {
        console.log(error);
      }
    },
    1000,
    [value]
  );

  const handleFocus = () => {
    setHideSuggestions(false);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setHideSuggestions(true);
    }, 200);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div className={styles['container']}>
        <input
          onFocus={handleFocus}
          onBlur={handleBlur}
          type="search"
          className={styles['textbox']}
          placeholder="Search"
          value={value}
          onChange={handleSearchInputChange}
        />
        <div
          className={`${styles.suggestions} ${
            hideSuggestions && styles.hidden
          }`}
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index} 
              className={styles.suggestion}
              onClick={() => findResult(suggestion[suggestionKey])}
            >
              {suggestion[suggestionKey]}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchBar;