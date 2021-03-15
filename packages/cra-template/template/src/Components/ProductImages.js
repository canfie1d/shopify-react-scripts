import { useContext } from 'react';
import Context from './Contexts/AppStore';

const ProductImages = props => {
  const [state, dispatch] = useContext(Context); // eslint-disable-line

  const changeFeaturedImage = image => {
    dispatch({
      type: 'CHANGE_FEATURED_IMAGE',
      payload: { featured_image: image },
    });
  };

  const images = props.images;

  let imagesList = Object.keys(images).map(key => {
    return (
      <li
        className="product-images__item"
        key={key}
        onClick={() => changeFeaturedImage(images[key])}
      >
        <img src={images[key]} alt="" />
      </li>
    );
  });

  return <ul className="product-images">{imagesList}</ul>;
};

export default ProductImages;
