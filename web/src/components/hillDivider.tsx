import Box from '@mui/material/Box';

type HillDividerProps = {
  fill: string;
  flip?: boolean;
};

/**
 * A rolling-hills silhouette used as the one recurring brand device —
 * the skyline of Moominvalley — instead of a hard edge between bands.
 */
export default function HillDivider({ fill, flip = false }: HillDividerProps) {
  return (
    <Box
      component="svg"
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      sx={{
        display: 'block',
        width: '100%',
        height: { xs: 36, sm: 56 },
        transform: flip ? 'scaleY(-1)' : 'none',
      }}
    >
      <path
        d="M0,42 C220,88 340,4 560,30 C780,56 900,94 1120,66 C1260,48 1350,58 1440,46 L1440,100 L0,100 Z"
        fill={fill}
      />
    </Box>
  );
}
