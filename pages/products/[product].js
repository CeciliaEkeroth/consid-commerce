import Head from "next/head";
import Layout from "../components/layout";
import ProductDetails from "../components/ProductDetails";
import { useRouter } from "next/router";
import { createClient } from "contentful";

// Get data for dynamic page
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

function productDetails(products) {
  // Get product slug
  const router = useRouter();
  const productSlug = router.query.product;

  const productDetailsArray = [];

  products.products.map((product) => {
    if (product.fields.slug == productSlug) {
      productDetailsArray.push(product);
    }
  });

  const productDetail = productDetailsArray[0];

  return (
    <>
      <Head>
        <title>Consid Commerce - {productDetail.fields.name}</title>
      </Head>
      <Layout>
        <ProductDetails product={productDetail} />
      </Layout>
    </>
  );
}

export default productDetails;
