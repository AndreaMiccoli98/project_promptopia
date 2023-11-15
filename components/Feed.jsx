'use client';

import { useState, useEffect } from 'react';

import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {

  const [searchText, setSearchText] = useState('');
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [posts, setPosts] = useState([]);


  const filterPrompts = (searchValue) => {
    const regex = new RegExp(searchValue, "gi");
    return posts.filter(
      (item) => (regex.test(item.creator.username) || regex.test(item.tag) || regex.test(item.prompt))
    )
  }

  const handleSearchChange = (value) => {
    setSearchText(value);

    const searchResult = filterPrompts(value);
    setSearchedPosts(searchResult);
  }

  const fetchPosts = async () => {
    const response = await fetch('/api/prompt');
    const data = await response.json();

    setPosts(data);
  }

  const handleTagClick = (tag) => {
    setSearchText(tag)

    const searchResult = filterPrompts(tag);
    setSearchedPosts(searchResult);
  }

  useEffect(() => {
    fetchPosts();
  }, []);


  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type="text"
          placeholder='Search for a tag or a username...'
          value={searchText}
          onChange={(e) => handleSearchChange(e.target.value)}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList
        data={searchText ? searchedPosts : posts}
        handleTagClick={handleTagClick}
      />
    </section>
  )

}

export default Feed