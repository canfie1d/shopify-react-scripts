const Hero = props => {
  const imageUrl = this.props.image;
  const title = this.props.title;
  let image;
  if (imageUrl !== '') {
    const styles = {
      backgroundImage: 'url(' + imageUrl + ')',
    };
    image = <div className="collection-hero__image" style={styles} />;
  } else {
    image = <div className="collection-hero__image" />;
  }
  return (
    <div className="collection-hero">
      {image}
      <div className="collection-hero__title-wrapper">
        <h1 className="collection-hero__title page-width">{title}</h1>
      </div>
    </div>
  );
};

export default Hero;
