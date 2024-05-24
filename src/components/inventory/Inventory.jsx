import { CircularProgress } from "@mui/material";
import ReusableTable from "../../pages/ReusableTable"
import {CircularProgressbar, } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


export const Inventory = () =>{

    const inventoryColumns = [
        { accessor: 'itemName', Header: 'Item Name' },
        { accessor: 'category', Header: 'Category' },
        { accessor: 'reorderLevel', Header: 'Reorder Level' },
        { accessor: 'unitType', Header: 'Unit Type' },
        { accessor: 'unitCost', Header: 'Unit Cost' },
        { accessor: 'quantity', Header: 'Quantity' },
        {
          accessor: 'status',
          Header: 'Remaining Stock',
          Cell: ({ row }) => {
            let remainingPercentage = (row.original.quantity - row.original.issuedItems) / row.original.quantity * 100;
            remainingPercentage = Math.round(remainingPercentage)
           return<div style={{ width: 70, height: 70 }}> <CircularProgressbar
           value={remainingPercentage}
           text={`${remainingPercentage}%`}
         /> </div>
          },
        },
      ];

      const inventoryData = [
        {
          category: 'Medical Supplies',
          description: 'Surgical blade',
          itemName: 'Surgical Blade',
          quantity: '30',
          reorderLevel: 10,
          unitCost: '500',
          issuedItems:10,
          unitType: 'Box',
        }
      ];

    return (
        <div>
            <ReusableTable
            columns={inventoryColumns}
            data={inventoryData}
            initialState={{ pageSize: 10 }} 
            ActionDropdown={() => <div>Actions</div>} 
      
            />
        </div>
    )
}