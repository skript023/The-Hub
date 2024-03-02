import { styled } from "@mui/material";

const Svg = styled('svg')({
    width: '150px',
    height: '150px',
    display: 'block',
    margin: '0 auto',
    '@media (max-width: 768px)': { // Change max-width to match your desired mobile breakpoint
        width: '100px',
        height: '100px',
    },
});

export default function SpinningDot()
{
    return (//#FF156D
        <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
            <linearGradient id="a10">
                <stop offset="0" stop-color="#FFFFFF" stop-opacity="0"></stop>
                <stop offset="1" stop-color="#FFFFFF"></stop>
            </linearGradient>
            <circle fill="none" stroke="url(#a10)" stroke-width="15" stroke-linecap="round" stroke-dasharray="0 44 0 44 0 44 0 44 0 360" cx="100" cy="100" r="70" transform-origin="center">
                <animateTransform type="rotate" attributeName="transform" calcMode="discrete" dur="1" values="360;324;288;252;216;180;144;108;72;36" repeatCount="indefinite">
                </animateTransform>
            </circle>
        </Svg>
    )
}