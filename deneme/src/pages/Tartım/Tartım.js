import React, { useState, useEffect } from 'react';
import './Tartım.scss';
import DataGrid, {
  Column,
  Editing,
  Popup,
  Form,
  Paging,
  Pager,
  SearchPanel,
  ValidationRule,
  RequiredRule,
} from 'devextreme-react/data-grid';
import { Item } from 'devextreme-react/form';
import 'devextreme/dist/css/dx.light.css';
import API from '../../api/api'; // Ensure this path is correct

const Tartim = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Fetching data...');
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      console.log('API request to fetch data');
      const response = await API.get('/monthlyWeights'); // Fetch all weights
      console.log('Fetched data:', response.data); // Log fetched data
      setData(response.data); // Set data to state
      setLoading(false); // Set loading to false
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleInsert = async (e) => {
    try {
      console.log('Inserting data:', e.data); // Log the incoming data

      // Ensure e.data exists
      if (!e.data) {
        throw new Error('Invalid data');
      }

      // Format the date to 'YYYY-MM-DD'
      const formattedData = {
        ...e.data,
        record_date: new Date(e.data.record_date).toISOString().split('T')[0], // Extract date part
      };

      console.log('Formatted data for insertion:', formattedData); // Log the formatted data

      await API.post('/monthlyWeights', formattedData); // Add new weight
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error inserting data:', error);
      alert('Error inserting data: ' + (error.response ? error.response.data.message : error.message)); // Provide user feedback
      e.cancel = true; // Cancel the insert operation in the DataGrid
    }
  };

  const handleUpdate = async (e) => {
    try {
      console.log('Updating data:', e.newData); // Log the incoming new data

      // Ensure e.newData exists
      if (!e.newData) {
        throw new Error('Invalid data');
      }

      // Merge newData with oldData to ensure all fields are present
      const updatedData = {
        ...e.oldData,
        ...e.newData,
        record_date: new Date(e.newData.record_date || e.oldData.record_date).toISOString().split('T')[0], // Extract date part
      };

      console.log('Formatted data for updating:', updatedData); // Log the updated data

      await API.put(`/monthlyWeights/${e.key}`, updatedData); // Use updated data to update weight
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error updating data:', error);
      alert('Error updating data: ' + (error.response ? error.response.data.message : error.message)); // Provide user feedback
      e.cancel = true; // Cancel the update operation in the DataGrid
    }
  };

  const handleDelete = async (e) => {
    try {
      console.log('Deleting data with key:', e.key); // Log the key of the data to be deleted
      await API.delete(`/monthlyWeights/${e.key}`); // Delete weight
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error deleting data:', error);
      alert('Error deleting data: ' + (error.response ? error.response.data.message : error.message)); // Provide user feedback
      e.cancel = true; // Cancel the delete operation in the DataGrid
    }
  };

  const validateRow = async (e) => {
    console.log('Validating row:', e); // Log the entire event object

    // Ensure e.newData exists
    if (!e.newData) {
      e.isValid = false;
      e.errorText = 'Invalid data';
      console.error('Invalid data:', e);
      return;
    }

    // Merge newData with oldData to ensure all fields are present for validation
    const mergedData = {
      ...e.oldData,
      ...e.newData,
    };

    // Perform validation
    const { eartag, record_date, weight } = mergedData;

    if (!eartag || !record_date || !weight) {
      e.isValid = false;
      e.errorText = 'All fields are required';
      console.error('Validation error: All fields are required');
      return;
    }

    // Check if eartag exists in live stock
    try {
      console.log('Checking if eartag exists in live stock:', eartag);
      const response = await API.get(`/livestock/${eartag}`);
      if (response.status !== 200 || !response.data) {
        e.isValid = false;
        e.errorText = 'Eartag not found in live stock';
        console.error('Eartag not found in live stock');
      }
    } catch (error) {
      e.isValid = false;
      e.errorText = 'Error validating eartag';
      console.error('Error validating eartag:', error);
    }
  };

  return (
    <React.Fragment>
      <h2 className={'content-block'}>Tartım</h2>
      <div className={'content-block'}>
        <div className={'dx-card responsive-paddings'}>
          <DataGrid
            dataSource={data} // Set data source to fetched data
            keyExpr="record_id" // Ensure this matches your primary key
            showBorders={true}
            onRowInserting={handleInsert}
            onRowUpdating={handleUpdate}
            onRowRemoving={handleDelete}
            onRowValidating={validateRow} // Add validation
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
              <Popup title="Monthly Weight Info" showTitle={true} width={700} height={525} />
              <Form>
                <Item itemType="group" colCount={2} colSpan={2}>
                  <Item dataField="eartag">
                    <RequiredRule message="Eartag is required" />
                  </Item>
                  <Item dataField="record_date" dataType="date">
                    <RequiredRule message="Record date is required" />
                  </Item>
                  <Item dataField="weight">
                    <RequiredRule message="Weight is required" />
                  </Item>
                </Item>
              </Form>
            </Editing>
            <Column dataField="eartag" caption="Ear Tag" />
            <Column dataField="record_date" caption="Record Date" dataType="date" />
            <Column dataField="weight" caption="Weight" />
          </DataGrid>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Tartim;
