import React, { useState } from 'react';
import { useDebounce } from './hooks/useDebounce';
import styles from './Searchbar.module.scss';
import Result from './Result/Result';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


interface Suggestion {
  name: string;
  description: string;
  category: string;}

interface Props {
  fetchData: (value: string) => Promise<Suggestion[]>; 
  setResult: (result: Suggestion | null) => void; 
  suggestionKey: string; 
}

const SearchBar: React.FC<Props> = ({ fetchData, setResult, suggestionKey }) => {
  const [value, setValue] = useState(''); //this is the value of the search bar
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]); // this is where the search suggestions get stored
  const [hideSuggestions, setHideSuggestions] = useState(true);
  const [searchResults, setSearchResults] = useState<Suggestion[]>([]); // Store search results

  const findResult = (value: string) => {
    const result = suggestions.find((suggestion) => (suggestion as any)[suggestionKey] === value);
    if (result) {
      setResult(result);
      setSearchResults([result]);
    } else {
      setResult(null);
      setSearchResults([]);
    }
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
      <div className={styles['textboxdiv']}>
  <input
    onFocus={handleFocus}
    onBlur={handleBlur}
    type="search"
    className={styles['textbox']}
    placeholder="Search"
    value={value}
    onChange={handleSearchInputChange}
  />
  <button  >
    <FontAwesomeIcon icon={faSearch}  />
  </button>
</div>

        
        <div
          className={`${styles.suggestions} ${
            hideSuggestions && styles.hidden
          }`}
        >
          {suggestions.map((suggestion) => (
            <div
              
              className={styles.suggestion}
              onMouseDown={() => findResult((suggestion as any)[suggestionKey])}
              >
              {(suggestion as any)[suggestionKey]}
            </div>
          ))}
        </div>
      </div>

      {/* Display search results */}
      {searchResults.map((result, index) => (
        <Result key={index} {...result} />
      ))}
    </>
  );
};

export default SearchBar;
