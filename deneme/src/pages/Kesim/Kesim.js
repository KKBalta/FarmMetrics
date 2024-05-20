import React, { useState, useEffect } from 'react';
import './Kesim.scss';
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

const Slaughter = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await API.get('/slaughterSchema'); // Fetch all slaughter records
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
      
      // Ensure date is correctly formatted
      const formattedData = {
        ...e.data,
        date: new Date(e.data.date).toISOString().split('T')[0], // Format date to 'YYYY-MM-DD'
      };

      // Make the POST request to add new slaughter record
      const response = await API.post('/slaughterSchema', formattedData);
      
      console.log('Insert response:', response); // Log the response from the server
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error inserting data:', error.response || error.message || error); // Log the error details
      e.cancel = true; // Cancel the insert operation in the DataGrid
    }
  };

  const handleUpdate = async (e) => {
    try {
      // Merge newData with oldData to ensure all fields are present
      const updatedData = {
        ...e.oldData,
        ...e.newData,
        date: new Date(e.newData.date || e.oldData.date).toISOString().split('T')[0], // Format date to 'YYYY-MM-DD'
      };

      await API.put(`/slaughterSchema/${e.key}`, updatedData); // Update slaughter record
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error updating data:', error.response || error.message || error); // Log the error details
      e.cancel = true; // Cancel the update operation in the DataGrid
    }
  };

  const handleDelete = async (e) => {
    try {
      await API.delete(`/slaughterSchema/${e.key}`); // Delete slaughter record
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error deleting data:', error.response || error.message || error); // Log the error details
      e.cancel = true; // Cancel the delete operation in the DataGrid
    }
  };

  return (
    <React.Fragment>
      <h2 className={'content-block'}>Kesim</h2>
      <div className={'content-block'}>
        <div className={'dx-card responsive-paddings'}>
          <DataGrid
            dataSource={data} // Set data source to fetched data
            keyExpr="slaughter_id" // Ensure this matches your primary key
            showBorders={true}
            onRowInserting={handleInsert}
            onRowUpdating={handleUpdate}
            onRowRemoving={handleDelete}
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
              <Popup title="Slaughter Info" showTitle={true} width={700} height={525} />
              <Form>
                <Item itemType="group" colCount={2} colSpan={2}>
                  <Item dataField="eartag" />
                  <Item dataField="date" dataType="date" />
                  <Item dataField="carcas_weight" />
                  <Item dataField="sale_price" />
                </Item>
              </Form>
            </Editing>
            <Column dataField="eartag" caption="Ear Tag" />
            <Column dataField="date" caption="Date" dataType="date" />
            <Column dataField="carcas_weight" caption="Carcas Weight" />
            <Column dataField="sale_price" caption="Sale Price" />
          </DataGrid>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Slaughter;
