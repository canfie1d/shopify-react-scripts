import * as actions from '../../actions/actionCreators';

const ProductImages = props => {
  const [state, dispatch] = useContext(Context);

  const changeFeaturedImage = image => {
    dispatch(actions.changeFeaturedImage(image));
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
