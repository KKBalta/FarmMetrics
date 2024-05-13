import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PetsIcon from '@mui/icons-material/Pets';
import ScaleIcon from '@mui/icons-material/FitnessCenter'; // Icon for weight
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'; // Icon for rasyon
import SalesIcon from '@mui/icons-material/AttachMoney'; // Icon for sales

const NavBar = () => {
    const menuItems = [
        { text: "Dashboard", icon: <DashboardIcon />, path: "/dasboard" },
        { text: "Animals", icon: <PetsIcon />, path: "/animals" },
        { text: "Weight", icon: <ScaleIcon />, path: "/weight" },
        { text: "Rasyon", icon: <RestaurantMenuIcon />, path: "/rasyon" },
        { text: "Sales", icon: <SalesIcon />, path: "/sales" }
    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
            }}
        >
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton component={Link} to={item.path}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default NavBar;
