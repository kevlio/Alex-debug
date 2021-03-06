import react, { useState } from "react";
import { RecoilRoot } from "recoil";
import { Link } from "react-router-dom";
// CSS från Chakra UI
import {
  Heading,
  Text,
  Button,
  Stack,
  Image,
  Box,
  SimpleGrid,
} from "@chakra-ui/react";

// Importera atomer och "states" från recoil.
import { useRecoilState, useRecoilValue } from "recoil";
import { cartState } from "../recoil/cart/atom";
import { productsState } from "../recoil/products/ProductsAtom";

// Importerar från "product"/"cart" med recoil.
function Products() {
  const products = useRecoilValue(productsState);
  const [cart, setCart] = useRecoilState(cartState);

  // Importerar från "Carts" atom/selektor
  function handleAdd(product) {
    const newProduct = {
      id: Math.floor(Math.random() * 10000),
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      rating: {
        rate: product.rating.rate,
        count: product.rating.count,
      },
    };
    setCart((prevCart) => {
      return [...prevCart, newProduct];
    });
  }

  return (
    <Box minHeight="60vh">
      <Stack spacing="50px">
        {products.map((product) => (
          <SimpleGrid key={product.id} columns={2} gridColumn="2">
            <Image
              width="auto"
              paddingBlock="25"
              paddingRight="50"
              src={product.image}
            />
            <Box>
              <Heading fontSize="larger">{product.title}</Heading>
              <Text fontWeight="bold">{product.price} $</Text>
              <br />
              <Button
                border="1px"
                fontWeight="bold"
                marginRight="5"
                as={Link}
                to={`/products/${product.id}`}
              >
                Details
              </Button>
              <Button
                border="1px"
                fontWeight="bold"
                onClick={() => handleAdd(product)}
              >
                {" "}
                Add product{" "}
              </Button>
            </Box>
          </SimpleGrid>
        ))}
      </Stack>
    </Box>
  );
}
export default Products;
