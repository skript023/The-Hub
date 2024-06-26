import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import StorefrontIcon from '@mui/icons-material/Storefront';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import './styles/ellohim.css';
import PopularProduct from "./products/product.popular";
import BarChart from "@/components/charts/bar";
import Sidenav from "@/view/navigation/sidebar";

export default function Home() {
    return (
        <Box sx={{ display: 'flex', height: '100vh', mt: 8 }}>
            <Sidenav />
            <Box component={"main"} sx={{ flexGrow: 1, p: 2, overflowY: 'auto', mt: { xs: 2, md: 0 } }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                            <Card sx={{ width: '100%', height: 140 }} className="gradient-green">
                                <CardContent>
                                    <div className="icon">
                                        <CreditCardIcon sx={{ color: "white" }} />
                                    </div>
                                    <Typography variant="h5" component="div" sx={{ color: "white" }}>
                                        $20
                                    </Typography>
                                    <Typography variant="body2" gutterBottom component="div" sx={{ color: "#3b3b3b" }}>
                                        Total Income
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card sx={{ width: '100%', height: 140 }} className="gradient-blue">
                                <CardContent>
                                    <div>
                                        <ShoppingCartIcon sx={{ color: "white" }} />
                                    </div>
                                    <Typography gutterBottom variant="h5" component="div" sx={{ color: "white" }}>
                                        50
                                    </Typography>
                                    <Typography variant="body2" gutterBottom component="div" sx={{ color: "gray" }}>
                                        Total Order
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Stack spacing={2}>
                            <Card sx={{ width: '100%' }}>
                                <CardContent>
                                    <Stack spacing={2} direction={"row"}>
                                        <div style={{ marginTop: "20px", marginLeft: "20px" }}>
                                            <StorefrontIcon />
                                        </div>
                                        <div className="card-main">
                                            <span className="card-main-title">$20</span>
                                            <br />
                                            <span className="card-main-subtitle">Total Income</span>
                                        </div>
                                    </Stack>
                                </CardContent>
                            </Card>
                            <Card sx={{ width: '100%' }}>
                                <CardContent>
                                    <Stack spacing={2} direction={"row"}>
                                        <div style={{ marginTop: "20px", marginLeft: "20px" }}>
                                            <ShoppingCartIcon />
                                        </div>
                                        <div className="card-main">
                                            <span className="card-main-title">20</span>
                                            <br />
                                            <span className="card-main-subtitle">Total Order</span>
                                        </div>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Stack>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ marginTop: "5px" }}>
                    <Grid item xs={12} md={8}>
                        <Card>
                            <CardContent sx={{ height: { xs: 'auto', md: '60vh' } }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    Title
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <BarChart />
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent sx={{ height: { xs: 'auto', md: '60vh' } }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    Title
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <PopularProduct />
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
