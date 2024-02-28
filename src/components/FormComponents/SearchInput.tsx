import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';

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
        name='search_input'
        placeholder='Search for Products, Brands and More'
        style={{
          width: '100%',
          height: '40px',
          padding: '5px 5px 5px 45px',
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
            color: 'grey',
            padding: '10px',
            borderRadius: '50px',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            left: '10px',
            cursor: 'pointer',
          }}
        />
    </form>
  );
}
