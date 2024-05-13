import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Basic styling
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Theme styling

const animals = () => {
    const [rowData, setRowData] = useState([]);
    const [columnDefs, setColumnDefs] = useState([
        { headerName: "Kulak Kupesi", field: "eartag", sortable: true, filter: true, editable: true },
        { headerName: "Kayit Tarhi", field: "record_date", sortable: true, filter: true, editable: true },
        { headerName: "KG", field: "weight", sortable: true, filter: true, editable: true }
    ]);

    useEffect(() => {
        fetch('http://localhost:3031/monthlyWeights')
            .then(result => result.json())
            .then(rowData => setRowData(rowData))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                domLayout='autoHeight'
                animateRows={true}
            ></AgGridReact>
        </div>
    );
};

export default Dashboard;
