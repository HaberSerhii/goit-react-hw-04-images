import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryStyled } from './ImageGallery.styled';
import { Modal } from '../Modal/Modal';
import { ModalStyled } from '../Modal/Modal.styled';
ReactModal.setAppElement('#root');

export const ImageGallery = ({ img }) => {
  const [showModal, setShowModal] = useState(false);
  const [showImg, setShowImg] = useState({});

  const handleOpenModal = ({ imgUrl, alt }) => {
    document.body.style.overflow = 'hidden';
    setShowModal(true);
    setShowImg({ imgUrl, alt });
  };

  const handleCloseModal = () => {
    document.body.style.overflow = '';
    setShowModal(false);
  };

  return (
      <>
        <ImageGalleryStyled className="galleryWrapp">
          {img &&
            img.map(item => (
              <ImageGalleryItem
                key={item.id}
                itemImg={item}
                onOpenModal={handleOpenModal}
              />
            ))}
        </ImageGalleryStyled>
        <ReactModal
          isOpen={showModal}
          contentLabel="Modal"
          onRequestClose={handleCloseModal}
          style={ModalStyled}
        >
          <Modal imgData={showImg} />
        </ReactModal>
      </>
    );


};