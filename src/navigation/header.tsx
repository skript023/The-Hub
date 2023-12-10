import { Typography, Box } from "@mui/material";

export default function Header({ title, subtitle } : any) 
{
    return (
        <Box mb="30px" mr="30px">
            <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{ m: "0 0 5px 0" }}
            >
                {title}
            </Typography>
            <Typography variant="subtitle2">
                {subtitle}
            </Typography>
        </Box>
    );
}