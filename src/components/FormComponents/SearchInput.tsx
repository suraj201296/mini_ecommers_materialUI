import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

type Props = {
  handleSearch: (searchItem: string) => void;
};

export default function SearchInput({ handleSearch }: Props) {
  const [searchItem, setSearchItem] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(searchItem);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value);
  };

  return (
    <form
      autoComplete='off'
      onSubmit={handleSubmit}
      style={{ position: 'relative', width: '70%' }}
    >
      <input
        type='text'
        autoComplete='off'
        onChange={handleChange}
        name='search'
        placeholder='Search here what you want'
        style={{
          width: '100%',
          height: '40px',
          padding: '5px 20px',
          margin: '5px',
          border: 'none',
          boxShadow: '0px 0px 5px 0px grey',
          borderRadius: '50px',
          outline: 'none',
          fontFamily: 'inherit',
          fontSize: '16px',
        }}
      />
      <SearchIcon
        sx={{
          backgroundColor: 'darkblue',
          color: 'white',
          padding: '10px',
          borderRadius: '50px',
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          right: '-41px',
          cursor: 'pointer',
        }}
      />
    </form>
  );
}
