//DocumentTitle
import { Helmet } from 'react-helmet-async';
export const DocumentTitle = ({ children }) => {
  return (
    <Helmet>
      <title>{children}</title>
    </Helmet>
  );
};
export default DocumentTitle;

//При використанні цього компонента в інших частинах  застосунку, можна змінювати заголовок сторінки, що є корисним для SEO та зручності користувачів.
