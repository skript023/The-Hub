import React from 'react';
import {
	AppBar,
	Tabs,
	Tab,
	Box,
	Container,
	Typography,
	useMediaQuery,
	Grid,
} from '@mui/material';
import MUIDataTable from 'mui-datatables';
import useTheme from '@mui/material/styles/useTheme';
import Sidenav from '@/view/navigation/sidebar';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
	<div
	  role="tabpanel"
	  hidden={value !== index}
	  id={`tabpanel-${index}`}
	  aria-labelledby={`tab-${index}`}
	  {...other}
	>
	  {value === index && (
		<Box p={3}>
		  {children}
		</Box>
	  )}
	</div>
  );
}

const columns = [
  { name: 'product', label: 'Product' },
  { name: 'unit', label: 'Unit of Measure' },
  { name: 'productLine', label: 'Product Line' },
  { name: 'productClass', label: 'Product Class' },
  { name: 'structureType', label: 'Structure Type' },
  { name: 'lockedBy', label: 'Locked By' },
  { name: 'eligibility', label: 'Eligibility', options: { customBodyRender: (value: boolean) => (value ? 'Yes' : 'No') } },
];

const data = [
  { product: 'Origin Dependent Routing Non-Recurring Charge', unit: 'Per Month', productLine: 'Origin Dependent Routing PS', productClass: 'Customizable', structureType: '', lockedBy: '', eligibility: false },
  { product: 'Call Distribution', unit: 'Month', productLine: 'Call Distribution PS', productClass: 'Customizable', structureType: '', lockedBy: '', eligibility: false },
  // Add more rows here
];

const versionColumns = [
  { name: 'version', label: 'Version' },
  { name: 'startDate', label: 'Start Date' },
  { name: 'endDate', label: 'End Date' },
  { name: 'productClass', label: 'Product Class' },
];

const versionData = [
  { version: 2, startDate: '6/5/2018 03:55:34 PM', endDate: '', productClass: 'CNDC PS' },
  { version: 1, startDate: '4/5/2018 04:22:18 PM', endDate: '6/5/2018 03:55:34 PM', productClass: 'CNDC PS' },
  // Add more rows here
];

const ProductNew: React.FC = () => {
	const [value, setValue] = React.useState(0);
	const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
	};

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<Box height={70}>
			<Box sx={{ display: 'flex' }}>
				<Sidenav />
				<Box component={"main"} sx={{ flexGrow: 1, mt: 5, ...(!isMobile && { p: 3 }), ...(isMobile && { mb: 8 }) }}>
					<Box m="20px">
						<Grid container justifyContent="center" sx={{ mb: 1 }}>
                            <Typography variant="h4" component="div">
                                Products
                            </Typography>
                        </Grid>
						<MUIDataTable
								title={"Product List"}
								data={data}
								columns={columns}
								options={{
								selectableRows: 'none',
								rowsPerPage: 5,
								rowsPerPageOptions: [5, 10, 15],
								responsive: 'standard',
								}}
							/>
					</Box>
				<AppBar position="static" style={{ marginTop: '20px' }}>
					<Tabs
					value={value}
					onChange={handleChange}
					variant={isMobile ? 'scrollable' : 'standard'}
					scrollButtons={isMobile}
					>
					<Tab label="Products" />
					<Tab label="Versions" />
					<Tab label="User Defined Attributes" />
					<Tab label="More Info" />
					<Tab label="Eligibility and Compatibility Rules" />
					<Tab label="Pricing" />
					<Tab label="Recommendations" />
					<Tab label="Collateral" />
					<Tab label="Translations" />
					<Tab label="Service Information" />
					<Tab label="Product Validation" />
					<Tab label="Bundle Product" />
					<Tab label="Category" />
					<Tab label="More Info" />
					</Tabs>
				</AppBar>
				<Container>
					<TabPanel value={value} index={0}>
						<Typography variant="h6">Product Details</Typography>
					</TabPanel>
					<TabPanel value={value} index={1}>
						<MUIDataTable
							title={"Version History"}
							data={versionData}
							columns={versionColumns}
							options={{
								selectableRows: 'none',
								rowsPerPage: 5,
								rowsPerPageOptions: [5, 10, 15],
								responsive: 'vertical',
							}}
						/>
					</TabPanel>
					<TabPanel value={value} index={2}>
						<Typography variant="h6">User Defined Attributes</Typography>
					</TabPanel>
					<TabPanel value={value} index={3}>
						<Typography variant="h6">More Info</Typography>
					</TabPanel>
					<TabPanel value={value} index={4}>
						<Typography variant="h6">Eligibility and Compatibility Rules</Typography>
					</TabPanel>
					<TabPanel value={value} index={5}>
						<Typography variant="h6">Pricing</Typography>
					</TabPanel>
					<TabPanel value={value} index={6}>
						<Typography variant="h6">Recommendations</Typography>
					</TabPanel>
						<TabPanel value={value} index={7}>
					<Typography variant="h6">Collateral</Typography>
					</TabPanel>
						<TabPanel value={value} index={8}>
					<Typography variant="h6">Translations</Typography>
						</TabPanel>
					<TabPanel value={value} index={9}>
						<Typography variant="h6">Service Information</Typography>
					</TabPanel>
					<TabPanel value={value} index={10}>
						<Typography variant="h6">Product Validation</Typography>
					</TabPanel>
					<TabPanel value={value} index={11}>
						<Typography variant="h6">Bundle Product</Typography>
					</TabPanel>
					<TabPanel value={value} index={12}>
						<Typography variant="h6">Category</Typography>
					</TabPanel>
					<TabPanel value={value} index={13}>
						<Typography variant="h6">More Info</Typography>
					</TabPanel>
				</Container>
				</Box>
			</Box>
		</Box>
	);
};

export default ProductNew;
