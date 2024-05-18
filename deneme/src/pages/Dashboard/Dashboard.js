import React, { useState, useEffect } from 'react';
import './Dashboard.scss';
import DataGrid, {
  Column,
  Editing,
  Popup,
  Form,
  Paging,
  Pager,
  SearchPanel,
  Button
} from 'devextreme-react/data-grid';
import { Item } from 'devextreme-react/form';
import 'devextreme/dist/css/dx.light.css';
import API from '../../api/api'; // Ensure this path is correct

const LiveStock = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEartag, setSelectedEartag] = useState(null);
  const [weights, setWeights] = useState([]);
  const [showWeights, setShowWeights] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await API.get('/livestock'); // Fetch all live stock
      console.log('Fetched data:', response.data); // Log fetched data
      setData(response.data); // Set data to state
      setLoading(false); // Set loading to false
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const fetchWeights = async (eartag) => {
    try {
      const response = await API.get(`/monthlyWeights/${eartag}`); // Fetch weights by eartag
      console.log('Fetched weights:', response.data); // Log fetched weights
      setWeights(response.data); // Set weights to state
      setShowWeights(true); // Show weights
    } catch (error) {
      console.error('Error fetching weights:', error);
    }
  };

  const handleInsert = async (e) => {
    try {
      await API.post('/livestock', e.data); // Add new live stock
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error inserting data:', error.response || error.message || error); // Log the error details
    }
  };

  const handleUpdate = async (e) => {
    try {
      await API.put(`/livestock/${e.key}`, e.data); // Update live stock
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error updating data:', error.response || error.message || error); // Log the error details
    }
  };

  const handleDelete = async (e) => {
    try {
      await API.delete(`/livestock/${e.key}`); // Delete live stock
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error deleting data:', error.response || error.message || error); // Log the error details
    }
  };

  return (
    <React.Fragment>
      <h2 className={'content-block'}>Live Stock</h2>
      <div className={'content-block'}>
        <div className={'dx-card responsive-paddings'}>
          <DataGrid
            dataSource={data} // Set data source to fetched data
            keyExpr="eartag" // Ensure this matches your primary key
            showBorders={true}
            onRowInserting={(e) => {
              e.cancel = handleInsert(e);
            }}
            onRowUpdating={(e) => {
              e.cancel = handleUpdate(e);
            }}
            onRowRemoving={(e) => {
              e.cancel = handleDelete(e);
            }}
            loading={loading}
          >
            <SearchPanel visible={true} highlightCaseSensitive={true} /> {/* Add SearchPanel */}
            <Paging defaultPageSize={10} />
            <Pager showPageSizeSelector={true} allowedPageSizes={[5, 10, 20]} showInfo={true} />
            <Editing
              mode="popup"
              allowAdding={true}
              allowUpdating={true}
              allowDeleting={true}
              useIcons={true}
            >
              <Popup title="Live Stock Info" showTitle={true} width={700} height={525} />
              <Form>
                <Item itemType="group" colCount={2} colSpan={2}>
                  <Item dataField="eartag" />
                  <Item dataField="race" />
                  <Item dataField="gender" />
                  <Item dataField="room" />
                  <Item dataField="cost" />
                </Item>
              </Form>
            </Editing>
            <Column dataField="eartag" caption="Ear Tag" />
            <Column dataField="race" caption="Race" />
            <Column dataField="gender" caption="Gender" />
            <Column dataField="room" caption="Room" />
            <Column dataField="cost" caption="Cost" />
            <Column
              type="buttons"
              buttons={[
                {
                  hint: 'View Weights',
                  icon: 'info',
                  onClick: (e) => {
                    setSelectedEartag(e.row.data.eartag);
                    fetchWeights(e.row.data.eartag);
                  }
                },
                'edit',
                'delete'
              ]}
            />
          </DataGrid>
        </div>
      </div>
      {showWeights && (
        <div className={'content-block'}>
          <h2 className={'content-block'}>Weights for {selectedEartag}</h2>
          <div className={'dx-card responsive-paddings'}>
            <DataGrid
              dataSource={weights} // Set data source to fetched weights
              keyExpr="record_id" // Ensure this matches your primary key for weights
              showBorders={true}
            >
              <Paging defaultPageSize={10} />
              <Pager showPageSizeSelector={true} allowedPageSizes={[5, 10, 20]} showInfo={true} />
              <Column dataField="record_date" caption="Record Date" dataType="date" />
              <Column dataField="weight" caption="Weight" />
            </DataGrid>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default LiveStock;
