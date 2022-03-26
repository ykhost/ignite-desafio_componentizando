import { useEffect, useState } from 'react'

import { Button } from '../components/Button';
import { Content } from './Content'

import { api } from '../services/api';
import '../styles/global.scss';
import '../styles/sidebar.scss';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SidebarProp{
  selectedGenreId: number;
  handleClickButton: Function;
}


export function SideBar({selectedGenreId, handleClickButton}: SidebarProp) {
  
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);
  
  // Complete aqui
  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>
      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          /> 
        ))}
      </div>
    </nav>
  )
}