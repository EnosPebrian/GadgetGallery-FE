import Grid from '@mui/material/Grid';

export function ImagePayment({ imgSrc, setOpen }) {
  return (
    <Grid container>
      <Grid
        type="button"
        item
        xs={12}
        display={imgSrc ? 'grid' : 'none'}
        onClick={() => setOpen(true)}
      >
        <img
          id="paymentProof"
          alt="paymentProof receipt"
          src={imgSrc}
          style={{
            height: '300px',
            objectFit: 'cover',
          }}
        />
      </Grid>
    </Grid>
  );
}
