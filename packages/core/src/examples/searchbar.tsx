import * as React from 'react';
import Searchbar from '@/components/Searchbar';

const SearchBarExample = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
    />
  );
};

export default SearchBarExample;

