import { getImagesApi } from 'api/images';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { useEffect, useState } from 'react';

const App = () => {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [imgModal, setImgModal] = useState('');

  useEffect(() => {
    if (!search) return;
    const getImages = async () => {
      try {
        setIsLoading(true);
        const { hits, totalHits } = await getImagesApi(search, page);

        setImages(prev => [...prev, ...hits]);
        setIsLoadMore(page < Math.ceil(totalHits / 12));
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    getImages();
  }, [search, page]);

  const getSearchRequest = search => {
    setSearch(search);
    setPage(1);
    setImages([]);
    setIsLoadMore(false);
  };

  const handleLoadMore = () => setPage(prev => prev + 1);

  const toggleModal = () => setIsShowModal(prev => !prev);

  const handleModal = img => {
    setImgModal(img);
    setIsShowModal(true);
  };

  return (
    <>
      <Searchbar getSearchRequest={getSearchRequest} />
      <ImageGallery data={images} handleModal={handleModal} />
      {isLoading && <Loader text="Loading..." />}
      {isLoadMore && <Button handleLoadMore={handleLoadMore} />}
      {isShowModal && <Modal imgURL={imgModal} toggleModal={toggleModal} />}
    </>
  );
};

export default App;
