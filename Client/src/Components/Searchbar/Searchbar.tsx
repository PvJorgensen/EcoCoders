import React, { useState } from 'react';
import { useDebounce } from '../Searchbar/hooks/useDebounce';
import styles from './Searchbar.module.scss';
import Result from '../Searchbar/Result/Result';

interface Suggestion {
  id: number;
  name: string;
  description: string;
  category: string;
}

interface SuggestionEvent {
  name: string;
  description: string;
  longitude: number;
  latitude: number;
  date_start: number;
  date_end: number;
  imageURL: string;
}

interface Props {
  fetchData: (value: string) => Promise<Suggestion[]> | Promise<SuggestionEvent[]>;
  setResult: (result: Suggestion | SuggestionEvent | null) => void;
  suggestionKey: string;
}

const SearchBar: React.FC<Props> = ({ fetchData, setResult, suggestionKey }) => {
  const [value, setValue] = useState(''); //this is the value of the search bar
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]); // this is where the search suggestions get stored
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchResults, setSearchResults] = useState<(Suggestion| SuggestionEvent)[]>([]); // Store search results

  const findResult = (value: string) => {
    const result = suggestions.find((suggestion) => (suggestion as any)[suggestionKey] === value);
    if (result) {
      setResult(result as Suggestion | SuggestionEvent);
      setSearchResults([result as Suggestion | SuggestionEvent]);
    } else {
      setResult(null);
      setSearchResults([]);
    }
  }; 

  useDebounce({ value, setSuggestions, fetchData }, 1000, [value]);  

  const handleFocus = () => {
    setShowSuggestions(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  const handleSearchInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    // Fetch suggestions from API based on inputValue
    const fetchedSuggestions = await fetchData(inputValue);

    // Show suggestions only if there are suggestions and the input value is not empty
    setShowSuggestions(fetchedSuggestions.length > 0 && inputValue.trim() !== '');
  };

  return (
    <>
      <div className={styles['container']} id="searchBarContainer">
        <input
          onFocus={handleFocus}
          onBlur={handleBlur}
          type="search"
          className={styles['textbox']}
          placeholder=" Search"
          value={value}
          onChange={handleSearchInputChange}
        />
        { showSuggestions && (
          <div
            className={`${styles.suggestions}`} 
            id='suggestion'
          >
          {suggestions.map((suggestion,index) => (
            <div
              key={index} 
              className={styles.suggestion}
              onMouseDown={() => findResult( (suggestion as any)[suggestionKey])}
            >
              { (suggestion as any)[suggestionKey]}
            </div>
          ))}
        </div>
        )}
      </div>
      {/* Display search results */}
      { searchResults.map((result, index) => (
        <Result key={index} {...result} />
      ))}
    </>
  );
};

export default SearchBar;
