import Sidebar from "../components/Sidebar";
import ProductListing from "../components/ProductListing";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import { createClient } from "contentful";
import styles from '../../styles/ProductListing.module.css'

export async function getStaticPaths(ctx) {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps() {
  const client = createClient({
    space: "9dfuiiplny0l",
    accessToken: "kpEeblBQnevucoN7lG8BHqgQb-8XHcHYp-FV5tF4B5g",
  });

  const response = await client.getEntries({ content_type: "products" });

  return {
    props: {
      products: response.items,
    },
  };
}

function category({ products }) {

  const router = useRouter();
  const categoryName = router.query.category;

  const categoryProducts = [];

  products.map((product) => {
    if (product.fields.category === categoryName) {
      categoryProducts.push(product);
    }
  });

  console.log(categoryProducts)

  return (
    <>
      <Layout>
        <Sidebar products={products} location={categoryName}/>
        <h1 className={styles.title}>{categoryName}</h1>
        <div className={styles.listing}>
        <ProductListing products={categoryProducts}/>
        </div>
      </Layout>
    </>
  );
}

export default category;
