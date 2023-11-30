import { ImageList, Skeleton, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import ProductCardItem from '../HomePage/ProductCardItem';
import PaginationStack from './PaginationStack';

function ProductStack() {
  const products = useSelector((states) => states.products);
  const { default: loading } = useSelector((states) => states.loadingBar);

  return (
    <Stack>
      <ImageList
        gap={12}
        variant="standard"
        sx={{
          p: 1,
          gridTemplateColumns:
            'repeat(auto-fill, minmax(10rem, 1fr)) !important',
        }}
      >
        {products.map((product) => (
          <ProductCardItem key={product.id} product={product} />
        ))}
        {loading > 0 &&
          [1, 2, 3, 4, 5].map((val) => (
            <Stack
              key={val}
              sx={{ minWidth: '10rem', borderRadius: 1, overflow: 'hidden' }}
            >
              <Skeleton variant="rectangular" width="100%" height="10rem" />
              <Skeleton variant="text" width="100%" />
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="40%" />
              <Skeleton variant="text" width="60%" />
            </Stack>
          ))}
      </ImageList>
      {products.length > 0 ? (
        <PaginationStack />
      ) : (
        <Typography textAlign="center">Produk Tidak Ditemukan</Typography>
      )}
    </Stack>
  );
}

export default ProductStack;
