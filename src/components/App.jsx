import React, { useState, useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { Searchbar } from './SearchBar/SearchBar';
import { ContainerStyled } from './App.styled';
import { ErrorMessageStyled } from './SearchBar/SearchBar.styled';
import { Loader } from './Loader/Loader';
import { ButtonUp } from './ButtonUp/ButtonUp';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { getImage } from '../api/fetchImg';
import { Notify } from 'notiflix';

Notify.init({
  width: '300px',
  position: 'left-top',
  timeout: 2000,
});

export const App = () => {
  const [images, setImg] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  // const [currentPage, setCurrentpage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const smoothScroll = (cardHeight) => {
    if (!cardHeight) {
      return;
    }
    scroll.scrollMore(cardHeight * 2);
  };

  const onSubmit = (value) => {
    setSearchValue(value);
  };

  const getNextPageHeight = () => {
    const galleryRef =
      document.querySelector('.galleryWrapp').firstElementChild;
    if (!galleryRef) {
      return null;
    }
    const { height: cardHeight } = galleryRef.getBoundingClientRect();
    return cardHeight;
  };

  const onChangePage = () => {
    setPage(prevState => prevState + 1);
    setIsLoading(true);
  };
  useEffect(() => {
    if (!searchValue) {
      return;
    }
    getImage(searchValue, 1)
      .then((data) => {
        if (data.totalHits < 1) {
          setImg([]);
        throw new Error(
          'Вибачайте, але нажаль ми не знайшли нічого за цим запитом. Спробуйте ще.'
        );
      }
        setImg(data.hits);
        Notify.success(`Круто! Ми знайшли ${data.totalHits} картинок.`);
        setError(null);
        setPage(1)
        setTotalPage(Math.ceil(data.totalHits / 12));
    })
      .catch(error => setError(error.message))
      .finally(() => setIsLoading(false));
  }, [searchValue])
  
  useEffect(() => {
    if (page === 1 ) {
      return;
    }

    getImage(searchValue, page)
      .then(data => {
        if (data.totalHits < 1) {
          throw new Error(
            'Вибачайте, але нажаль ми не знайшли нічого за цим запитом. Спробуйте ще.'
          );
        }
        setImg(prevState => [...prevState, ...data.hits]);
        setTotalPage(Math.ceil(data.totalHits / 12));

        Notify.success(`Круто! Ми знайшли ${data.totalHits} картинок.`);
        smoothScroll(getNextPageHeight());
      })
      .catch(error => setError(error.message))
      .finally(() => setIsLoading(false));
  }, [page]);

  return (
      <ContainerStyled>
        <Searchbar onSubmit={onSubmit} currentPage={{ page, totalPage }} />
        {error && <ErrorMessageStyled>{error}</ErrorMessageStyled>}
        <ImageGallery img={images} />
        {isLoading && <Loader />}
      { }<Button onClick={onChangePage} />
        <ButtonUp />
      </ContainerStyled>
    );
};