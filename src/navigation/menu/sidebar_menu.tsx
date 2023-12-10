import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BallotIcon from '@mui/icons-material/Ballot';
import PeopleIcon from '@mui/icons-material/People';


export const SidebarMenu = [
    {name: 'Home', route: '/', icon: <HomeIcon/>}, 
    {name: 'Products', route: '/products', icon: <BallotIcon/>}, 
    {name: 'Users', route: '/users', icon: <PeopleIcon/>}, 
    {name: 'Activity', route: '/activity', icon: <AssignmentIcon/>}
];