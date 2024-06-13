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
  const [rasyons, setRasyons] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [showChangeRasyon, setShowChangeRasyon] = useState(false);
  const [newRasyonId, setNewRasyonId] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await API.get('/livestock'); // Fetch all live stock
      setData(response.data); // Set data to state
      setLoading(false); // Set loading to false
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const fetchDetails = async (eartag) => {
    console.log('Fetching details for eartag:', eartag);
    try {
      const [weightsResponse, rasyonsResponse] = await Promise.all([
        API.get(`/monthlyWeights/eartag/${eartag}`), // Fetch weights by eartag
        API.get(`/livestockRasyon/eartag/${eartag}/all`) // Fetch all rasyon records by eartag
      ]);
      console.log('Weights response:', weightsResponse.data);
      console.log('Rasyons response:', rasyonsResponse.data);
      setWeights(weightsResponse.data); // Set weights to state
      setRasyons(rasyonsResponse.data); // Set rasyons to state
      setShowDetails(true); // Show details
    } catch (error) {
      console.error('Error fetching details:', error);
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
      // Merge newData with oldData to ensure all fields are present
      const updatedData = {
        ...e.oldData,
        ...e.newData
      };

      await API.put(`/livestock/${e.key}`, updatedData); // Update live stock
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

  const handleChangeRasyon = () => {
    setShowChangeRasyon(true);
  };

  const submitChangeRasyon = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    try {
      await API.put(`/livestockRasyon/eartag/${selectedEartag}/changeRasyon`, { rasyon_id: newRasyonId });
      setShowChangeRasyon(false);
      setNewRasyonId(''); // Clear the input field
      fetchDetails(selectedEartag); // Refresh details
    } catch (error) {
      console.error('Error changing rasyon:', error);
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
                  hint: 'View Details',
                  icon: 'info',
                  onClick: (e) => {
                    setSelectedEartag(e.row.data.eartag);
                    fetchDetails(e.row.data.eartag);
                  }
                },
                'edit',
                'delete'
              ]}
            />
          </DataGrid>
        </div>
      </div>
      {showDetails && (
        <div className={'content-block'}>
          <h2 className={'content-block'}>Details for {selectedEartag}</h2>
          <div className={'dx-card responsive-paddings'}>
            <h3>Weights</h3>
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
            <h3>Rasyon</h3>
            <div>
              {rasyons.length > 0 ? (
                <ul>
                  {rasyons.map((rasyon) => (
                    <li key={rasyon.id}>
                      Rasyon ID: {rasyon.rasyon_id}, Start Date: {rasyon.start_date}, End Date: {rasyon.end_date}
                    </li>
                  ))}
                  <li>
                    <button onClick={handleChangeRasyon}>Change Rasyon</button>
                  </li>
                </ul>
              ) : (
                <p>No rasyon data available.</p>
              )}
            </div>
          </div>
        </div>
      )}
      {showChangeRasyon && (
        <div className="popup">
          <h3>Change Rasyon for {selectedEartag}</h3>
          <form onSubmit={submitChangeRasyon}>
            <label>
              New Rasyon ID:
              <input type="text" value={newRasyonId} onChange={(e) => setNewRasyonId(e.target.value)} />
            </label>
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setShowChangeRasyon(false)}>Cancel</button>
          </form>
        </div>
      )}
    </React.Fragment>
  );
};

export default LiveStock;
