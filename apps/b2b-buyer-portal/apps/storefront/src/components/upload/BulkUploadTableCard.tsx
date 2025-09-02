import { Box, Typography } from '@mui/material';

interface BulkUploadTableCardProps {
  products: CustomFieldItems;
  activeTab: string;
}

function BulkUploadTableCard(props: BulkUploadTableCardProps) {
  const { products, activeTab } = props;

  const lineItemStyle = {
    display: 'flex',
  };

  return (
    <Box
      className="CSVProducts-info"
      key={products.sku}
      sx={{
        boxShadow:
          '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)',
        borderRadius: '4px',
        padding: '16px',
      }}
    >
      <Box sx={lineItemStyle}>
        <Typography
          sx={{
            color: '#313440',
            fontWeight: 700,
            fontSize: '16px',
            paddingRight: '0.5rem',
          }}
        >
          SKU:{' '}
        </Typography>
        <span>{products.sku}</span>
      </Box>
      <Box sx={lineItemStyle}>
        <Typography
          sx={{
            color: '#313440',
            fontWeight: 700,
            fontSize: '16px',
            paddingRight: '0.5rem',
          }}
        >
          Qty:{' '}
        </Typography>
        <span>{products.qty}</span>
      </Box>

      {activeTab === 'error' && (
        <>
          <Box sx={lineItemStyle}>
            <Typography
              sx={{
                color: '#313440',
                fontWeight: 700,
                fontSize: '16px',
                paddingRight: '0.5rem',
              }}
            >
              Row:{' '}
            </Typography>
            <span>{products.row + 1}</span>
          </Box>
          <Box sx={lineItemStyle}>
            <Typography
              sx={{
                color: '#313440',
                fontWeight: 700,
                fontSize: '16px',
                paddingRight: '0.5rem',
              }}
            >
              Error:{' '}
            </Typography>
            <span>{products.error}</span>
          </Box>
        </>
      )}
    </Box>
  );
}

export default BulkUploadTableCard;
