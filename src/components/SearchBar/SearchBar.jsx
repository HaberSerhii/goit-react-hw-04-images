import { animateScroll as scroll } from 'react-scroll';
import { ErrorMessage, Formik } from 'formik';
import { object, string } from 'yup';
import { AiOutlineSearch } from 'react-icons/ai';
import {
  CurrentPageStyled,
  ErrorMessageStyled,
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './SearchBar.styled';

const schema = object().shape({
  search: string().trim().required('This field is required'),
});
const initialValues = {
  search: '',
};
export const Searchbar = ({ onSubmit, currentPage: { page, totalPage } }) => {
  const handleSubmit = (value, { resetForm }) => {
    onSubmit(value.search);
    resetForm();
  };
  return (
    <Header>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <SearchForm>
          <SearchFormButton type="submit">
            <AiOutlineSearch />
          </SearchFormButton>

          <SearchFormInput
            name="search"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <ErrorMessage component={ErrorMessageStyled} name="number" />
        </SearchForm>
      </Formik>
      {totalPage > 1 && (
        <CurrentPageStyled onClick={() => scroll.scrollToBottom()}>
          {page}/{totalPage}
        </CurrentPageStyled>
      )}
    </Header>
  );
};