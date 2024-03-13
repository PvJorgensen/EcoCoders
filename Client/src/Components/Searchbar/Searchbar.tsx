import React, { useState } from 'react';
import { useDebounce } from './hooks/useDebounce';
import styles from './Searchbar.module.scss';
import Result from './Result/Result';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface Suggestion {
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
  const [value, setValue] = useState(''); // Este es el valor del campo de búsqueda
  const [suggestions, setSuggestions] = useState<(Suggestion | SuggestionEvent)[]>([]); // Aquí es donde se almacenan las sugerencias de búsqueda
  const [hideSuggestions, setHideSuggestions] = useState(true);
  const [searchResults, setSearchResults] = useState<(Suggestion | SuggestionEvent)[]>([]); // Almacena los resultados de la búsqueda

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

  useDebounce(
    async () => {
      try {
        const data = await fetchData(value);

        if (Array.isArray(data)) {
          setSuggestions(data);
        } else {
          setSuggestions([data]);
        }
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
          <div className={styles['textbox-with-icon']}>
            <input
              onFocus={handleFocus}
              onBlur={handleBlur}
              type="search"
              className={styles['textbox']}
              placeholder="Buscar"
              value={value}
              onChange={handleSearchInputChange}
            />
            <button className={styles['search-button']}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>

        <div
          className={`${styles.suggestions} ${hideSuggestions && styles.hidden}`}
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className={styles.suggestion}
              onMouseDown={() => findResult((suggestion as any)[suggestionKey])}
            >
              {(suggestion as any)[suggestionKey]}
            </div>
          ))}
        </div>
      </div>

      {/* Mostrar resultados de la búsqueda */}
      {searchResults.map((result, index) => (
        <Result key={index} {...result} />
      ))}
    </>
  );
};

export default SearchBar;
