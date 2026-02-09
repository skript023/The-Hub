import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box, { BoxProps } from '@mui/material/Box';

type Props = CircularProgressProps & {
  value: number;
  sx?: BoxProps['sx']; // sx untuk root Box
};

export default function CircularProgressWithLabel({
  value,
  sx,
  ...circularProps
}: Props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', ...sx }}>
      <CircularProgress
        variant="determinate"
        value={value}
        {...circularProps}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ color: 'text.secondary' }}
        >
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}