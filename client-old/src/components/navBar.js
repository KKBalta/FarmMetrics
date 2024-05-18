import React, { useState } from 'react';
import { Drawer, ScrollView } from 'devextreme-react';
import { List } from 'devextreme-react/list';
import Button from 'devextreme-react/button';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Animals', path: '/animals' },
    { text: 'Weight', path: '/weight' },
    { text: 'Rasyon', path: '/rasyon' },
    { text: 'Sale', path: '/sales' },
  ];

  const handleMenuClick = (e) => {
    navigate(e.itemData.path);
    setOpened(false);
  };

  return (
    <Drawer
      opened={opened}
      closeOnOutsideClick={true}
      openedStateMode="shrink"
      revealMode="expand"
      component={() => (
        <ScrollView>
          <List
            dataSource={menuItems}
            onItemClick={handleMenuClick}
            displayExpr="text"
          />
        </ScrollView>
      )}
    >
      <Button icon="menu" onClick={() => setOpened(!opened)} />
    </Drawer>
  );
};

export default NavBar;
