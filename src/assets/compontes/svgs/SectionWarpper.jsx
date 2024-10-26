import PropTypes from 'prop-types';

const SectionWrapper = ({
  children,
  className,
}) => {
  return (
    <div className={` md:max-w-[90%] xl:max-w-[80%] md:m-auto ${className}`}>
      {children}
    </div>
  );
};
SectionWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default SectionWrapper;
