import React, { useState, useEffect } from 'react';
import './Rasyon.scss';
import DataGrid, {
  Column,
  Editing,
  Popup,
  Form,
  Paging,
  Pager,
  SearchPanel,
} from 'devextreme-react/data-grid';
import { Item } from 'devextreme-react/form';
import 'devextreme/dist/css/dx.light.css';
import API from '../../api/api'; // Ensure this path is correct

const Rasyon = () => {
  const [rasyonData, setRasyonData] = useState([]);
  const [componentData, setComponentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRasyonId, setSelectedRasyonId] = useState(null);

  useEffect(() => {
    fetchRasyonData();
  }, []);

  const fetchRasyonData = async () => {
    try {
      const response = await API.get('/rasyon'); // Fetch all Rasyon records
      console.log('Fetched rasyon data:', response.data); // Log fetched data
      setRasyonData(response.data); // Set data to state
      setLoading(false); // Set loading to false
    } catch (error) {
      console.error('Error fetching rasyon data:', error);
      setLoading(false);
    }
  };

  const fetchComponentData = async (rasyonId) => {
    try {
      const response = await API.get(`/rasyonComponents/rasyon/${rasyonId}`); // Fetch all components for the selected Rasyon
      console.log('Fetched component data:', response.data); // Log fetched data
      setComponentData(response.data); // Set data to state
    } catch (error) {
      console.error('Error fetching component data:', error);
    }
  };

  const handleRasyonInsert = async (e) => {
    try {
      console.log('Inserting rasyon data:', e.data); // Log the incoming data

      // Make the POST request to add new Rasyon
      const response = await API.post('/rasyon', e.data);

      console.log('Rasyon insert response:', response); // Log the response from the server
      fetchRasyonData(); // Refresh data
    } catch (error) {
      console.error('Error inserting rasyon data:', error.response || error.message || error); // Log the error details
      e.cancel = true; // Cancel the insert operation in the DataGrid
    }
  };

  const handleRasyonUpdate = async (e) => {
    try {
      // Merge newData with oldData to ensure all fields are present
      const updatedData = {
        ...e.oldData,
        ...e.newData
      };

      await API.put(`/rasyon/${e.key}`, updatedData); // Update Rasyon record
      fetchRasyonData(); // Refresh data
    } catch (error) {
      console.error('Error updating rasyon data:', error.response || error.message || error); // Log the error details
      e.cancel = true; // Cancel the update operation in the DataGrid
    }
  };

  const handleRasyonDelete = async (e) => {
    try {
      await API.delete(`/rasyon/${e.key}`); // Delete Rasyon record
      fetchRasyonData(); // Refresh data
    } catch (error) {
      console.error('Error deleting rasyon data:', error.response || error.message || error); // Log the error details
      e.cancel = true; // Cancel the delete operation in the DataGrid
    }
  };

  const handleComponentInsert = async (e) => {
    try {
      console.log('Inserting component data:', e.data); // Log the incoming data

      // Make the POST request to add new component
      const response = await API.post('/rasyonComponents', { ...e.data, rasyon_id: selectedRasyonId });

      console.log('Component insert response:', response); // Log the response from the server
      fetchComponentData(selectedRasyonId); // Refresh data
    } catch (error) {
      console.error('Error inserting component data:', error.response || error.message || error); // Log the error details
      e.cancel = true; // Cancel the insert operation in the DataGrid
    }
  };

  const handleComponentUpdate = async (e) => {
    try {
      // Merge newData with oldData to ensure all fields are present
      const updatedData = {
        ...e.oldData,
        ...e.newData
      };

      await API.put(`/rasyonComponents/${e.key}`, updatedData); // Update component record
      fetchComponentData(selectedRasyonId); // Refresh data
    } catch (error) {
      console.error('Error updating component data:', error.response || error.message || error); // Log the error details
      e.cancel = true; // Cancel the update operation in the DataGrid
    }
  };

  const handleComponentDelete = async (e) => {
    try {
      await API.delete(`/rasyonComponents/${e.key}`); // Delete component record
      fetchComponentData(selectedRasyonId); // Refresh data
    } catch (error) {
      console.error('Error deleting component data:', error.response || error.message || error); // Log the error details
      e.cancel = true; // Cancel the delete operation in the DataGrid
    }
  };

  return (
    <React.Fragment>
      <h2 className={'content-block'}>Rasyon</h2>
      <div className={'content-block'}>
        <div className={'dx-card responsive-paddings'}>
          <DataGrid
            dataSource={rasyonData} // Set data source to fetched data
            keyExpr="id" // Ensure this matches your primary key
            showBorders={true}
            onRowInserting={handleRasyonInsert}
            onRowUpdating={handleRasyonUpdate}
            onRowRemoving={handleRasyonDelete}
            onRowClick={(e) => {
              setSelectedRasyonId(e.key);
              fetchComponentData(e.key);
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
              <Popup title="Rasyon Info" showTitle={true} width={700} height={525} />
              <Form>
                <Item itemType="group" colCount={2} colSpan={2}>
                  <Item dataField="name" />
                  <Item dataField="description" />
                </Item>
              </Form>
            </Editing>
            <Column dataField="name" caption="Name" />
            <Column dataField="description" caption="Description" />
          </DataGrid>
        </div>
      </div>

      {selectedRasyonId && (
        <div className={'content-block'}>
          <h2 className={'content-block'}>Rasyon Components for {selectedRasyonId}</h2>
          <div className={'dx-card responsive-paddings'}>
            <DataGrid
              dataSource={componentData} // Set data source to fetched data
              keyExpr="id" // Ensure this matches your primary key for components
              showBorders={true}
              onRowInserting={handleComponentInsert}
              onRowUpdating={handleComponentUpdate}
              onRowRemoving={handleComponentDelete}
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
                <Popup title="Component Info" showTitle={true} width={700} height={525} />
                <Form>
                  <Item itemType="group" colCount={2} colSpan={2}>
                    <Item dataField="component_name" />
                    <Item dataField="dm" />
                    <Item dataField="amount" />
                    <Item dataField="price" />
                  </Item>
                </Form>
              </Editing>
              <Column dataField="component_name" caption="Component Name" />
              <Column dataField="dm" caption="DM" />
              <Column dataField="amount" caption="Amount" />
              <Column dataField="price" caption="Price" />
            </DataGrid>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Rasyon;
