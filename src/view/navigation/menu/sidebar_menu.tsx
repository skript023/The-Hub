import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BallotIcon from '@mui/icons-material/Ballot';
import PeopleIcon from '@mui/icons-material/People';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { base } from '../../../util/base';

export const SidebarMenu = [
    {name: 'Home', route: `${base}home`, icon: <HomeIcon/>}, 
    {name: 'Products', route: `${base}products`, icon: <BallotIcon/>}, 
    {name: 'Users', route: `${base}users`, icon: <PeopleIcon/>}, 
    {name: 'Roles', route: `${base}roles`, icon: <AdminPanelSettingsIcon/>}, 
    {name: 'Activity', route: `${base}activity`, icon: <AssignmentIcon/>},
    {name: 'Attendance', route: `${base}attendance`, icon: <EventAvailableIcon/>},
];