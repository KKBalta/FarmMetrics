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
} from 'devextreme-react/data-grid';
import { Item } from 'devextreme-react/form';
import 'devextreme/dist/css/dx.light.css';
import API from '../../api/api'; // Ensure this path is correct

const Tartim = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await API.get('/monthlyWeights'); // Fetch all weights
      console.log('Fetched data:', response.data); // Log fetched data
      setData(response.data); // Set data to state
      setLoading(false); // Set loading to false
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleInsert = (e) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Format the date to 'YYYY-MM-DD'
        const formattedData = {
          ...e.data,
          record_date: new Date(e.data.record_date).toISOString().split('T')[0], // Extract date part
        };

        console.log('Inserting data:', formattedData); // Log the formatted data

        await API.post('/monthlyWeights', formattedData); // Add new weight
        fetchData(); // Refresh data
        resolve(); // Resolve the promise on success
      } catch (error) {
        reject(); // Reject the promise on error
      }
    });
  };

  const handleUpdate = (e) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Format the date to 'YYYY-MM-DD'
        const formattedData = {
          ...e.data,
          record_date: new Date(e.data.record_date).toISOString().split('T')[0], // Extract date part
        };

        console.log('Updating data:', formattedData); // Log the formatted data

        await API.put(`/monthlyWeights/${e.key}`, formattedData); // Use formatted data to update weight
        fetchData(); // Refresh data
        resolve(); // Resolve the promise on success
      } catch (error) {
        console.error('Error updating data:', error.response || error.message || error); // Log the error details
        alert('Error updating data: ' + (error.response?.data?.message || error.message || 'Unknown error')); // Provide user feedback
        reject(); // Reject the promise on error
      }
    });
  };

  const handleDelete = (e) => {
    return new Promise(async (resolve, reject) => {
      try {
        await API.delete(`/monthlyWeights/${e.key}`); // Delete weight
        fetchData(); // Refresh data
        resolve(); // Resolve the promise on success
      } catch (error) {
        console.error('Error deleting data:', error.response || error.message || error); // Log the error details
        alert('Error deleting data: ' + (error.response?.data?.message || error.message || 'Unknown error')); // Provide user feedback
        reject(); // Reject the promise on error
      }
    });
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
              <Popup title="Monthly Weight Info" showTitle={true} width={700} height={525} />
              <Form>
                <Item itemType="group" colCount={2} colSpan={2}>
                  <Item dataField="eartag" />
                  <Item dataField="record_date" dataType="date" defaultValue={new Date().toISOString().split('T')[0]} />
                  <Item dataField="weight" />
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
