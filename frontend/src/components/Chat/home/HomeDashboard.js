import React from 'react';

import Grid from '@material-ui/core/Grid';

import HomeTabList from './HomeTabList';
import HomeRoomList from './HomeRoomList';
import HomeFriendsList from './HomeFriendsList';
import HomeSettings from './HomeSettings';

export default function HomeDashboard({ socket }) {
  const [selectedTab, setSelectedTab] = React.useState('rooms');

  const renderContent = () => {
    switch (selectedTab) {
      case 'rooms':
        return <HomeRoomList socket={socket} />;
      case 'friends':
        return <HomeFriendsList />;
      case 'settings':
        return <HomeSettings />;
    }
  };

  return (
    <React.Fragment>
      <Grid item xs={2}>
        <HomeTabList
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      </Grid>
      <Grid item xs>
        {renderContent()}
      </Grid>
    </React.Fragment>
  );
}
