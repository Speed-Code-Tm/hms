import { CircularProgress } from "@mui/material";
import ReusableTable from "../../pages/ReusableTable"
import {CircularProgressbar, } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


export const Inventory = ({data}) =>{

    const inventoryColumns = [
        { accessor: 'itemName', Header: 'Item Name' },
        { accessor: 'category', Header: 'Category' },
        { accessor: 'reorderLevel', Header: 'Reorder Level' },
        {accessor:"startStock",Header:"Initial Stock"},
        {accessor:"currentStock",Header:"Current Stock"},
        {accessor:"newStock",Header:"New Stock"},
        { accessor: 'unitType', Header: 'Unit Type' },
        { accessor: 'unitCost', Header: 'Unit Cost' },
        { accessor: 'quantity', Header: 'Quantity' },
        {accessor:'expiryDate', Header: 'Expiry Date'},
        {
          accessor: 'status',
          Header: 'Remaining Stock',
          Cell: ({ row }) => {
            const item = row.original

            const percantageUsed = item.startStock >= item.currentStock ? 0 : ((item.startStock + item.newStock) - item.currentStock)/item.startStock * 100

            const remainingPercentage = 100 - percantageUsed
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
            data={data}
            initialState={{ pageSize: 10 }} 
            ActionDropdown={() => <div>Actions</div>} 
      
            />
        </div>
    )
}