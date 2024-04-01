import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import api from '../api/api';

export default function SignInWithGoogleButton({ disabled }: { disabled: boolean}) 
{
    const handleSignInWithGoogle = () => {
        const authWindow = window.open(`${api.server()}/auth/google`, '_blank', 'width=600,height=400,top=100,left=100')

        const checkClosed = setInterval(() => {
            if (authWindow?.closed) {
              // Clear the interval when the window is closed
              clearInterval(checkClosed);
              // Reload the parent window
              window.location.reload();
            }
          }, 1000); // Check every second if the window is closed
    };

    return (
        <Button
            disabled={disabled}
            type="button"
            fullWidth
            variant="contained"
            startIcon={<GoogleIcon />}
            onClick={handleSignInWithGoogle}
            sx={{
            bgcolor: '#4285F4',
            color: '#ffffff',
                '&:hover': {
                    bgcolor: '#357AE8',
                },
            }}
        >
        Sign in with Google
        </Button>
    );
};
