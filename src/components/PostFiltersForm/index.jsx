import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

PostFiltersForm.propTypes = {
  onSubmit: PropTypes.func,
};

PostFiltersForm.defaultProps = {
  onSubmit: null,
};

function PostFiltersForm(props) {
  const { onSubmit } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const typingTimeoutRef = useRef(null);

  function handleSearchTernChange(e) {
    const value = e.target.value;
    setSearchTerm(value);

    if (!onSubmit) return;

    if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(function () {
      const formValues = {
        searchTerm: value,
      };
      onSubmit(formValues);
    }, 300);
  }

  return (
    <div>
      <form>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchTernChange}
        />
      </form>
    </div>
  );
}

export default PostFiltersForm;
