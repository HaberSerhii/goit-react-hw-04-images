import React, { useCallback, useEffect, useState } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import * as ButtonUpStyled from './ButtonUp.styled';
import { FaArrowCircleUp } from 'react-icons/fa';

export const ButtonUp = () => {
  const [buttonIsHidden, setButtonIsHidden] = useState(true);

  const handleScroll = useCallback(() => {
    const scrolledDistance = window.scrollY;

    if (scrolledDistance >= 600) {
      setButtonIsHidden(false);
    } else {
      setButtonIsHidden(true);
    }
  }, [setButtonIsHidden]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, [handleScroll])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll])

  return (
    <ButtonUpStyled.ButtonUpStyled
      onClick={() => scroll.scrollToTop()}
      style={{ display: buttonIsHidden ? 'none' : 'block' }}
    >
      <FaArrowCircleUp fill="#3f51b5" />
    </ButtonUpStyled.ButtonUpStyled>
  );
};