import { Helmet } from "react-helmet-async";
import { USER_DISPLAY_STRINGS as STRINGS} from "../resources/user_display_strings";

const ProductPage = () => {
  return <div>
    <Helmet>
      <title>{STRINGS.productPage.title}</title>
    </Helmet>
    Product page</div>;
};

export default ProductPage;
