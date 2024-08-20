import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, DataTypeDefinition, GridApi } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import "ag-grid-autocomplete-editor/dist/main.css";
import AutocompleteSelectCellEditor from 'ag-grid-autocomplete-editor';
@Component({
  selector: 'app-grid-form',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './grid-form.component.html',
  styleUrl: './grid-form.component.scss'
})
export class GridFormComponent {
  gridApi!: GridApi;
  selectData = [
    { value: 0, label: "this" },
    { value: 1, label: "is" },
    { value: 2, label: "sparta" },
    { value: 3, label: "yolo" },
    { value: 4, label: "yoloooooo" },
    { value: 5, label: "yola" },
    { value: 6, label: "yoli" },
    { value: 7, label: "yolu" },
    { value: 8, label: "yolp" },
    { value: 9, label: "yolop" },
    { value: 10, label: "yolpo" },
    { value: 11, label: "yolui" },
    { value: 12, label: "yolqw" },
    { value: 13, label: "yolxz" },
    { value: 14, label: "yolcv" },
    { value: 15, label: "yolbn" }
  ];
  columnDefs: ColDef[] = [
    {
      headerName: 'Make', field: 'make', editable: true,
      // cellEditor: 'agSelectCellEditor',
      // cellEditorParams: {
      //   values: ['Tesla', 'Ford', 'Toyota'],
      // },
      cellEditor: AutocompleteSelectCellEditor,
      cellEditorParams: {
        required: true,
        selectData: this.selectData,
        placeholder: "Select an option"
      },
      valueFormatter: params => {
        if (params.value) {
          return params.value.label || params.value.value || params.value;
        }
        return "";
      },
      flex: 2
    },
    { headerName: 'Model', field: 'model', flex: 2 },
    { headerName: 'Price', field: 'price', flex: 2 },
    { headerName: "Date", field: "date", editable: true, },
  ];

  public dataTypeDefinitions: {
    [cellDataType: string]: DataTypeDefinition;
  } = {
      object: {
        baseDataType: "object",
        extendsDataType: "object",
        valueParser: (params) => ({ name: params.newValue }),
        valueFormatter: (params) =>
          params.value == null ? "" : params.value.name,
      },
    };
  data = [
    { make: 'Toyota', model: 'Celica', price: 35000, "date": "24/08/2008", "country": "Russia", },
    { make: 'Ford', model: 'Mondeo', price: 32000, "date": "12/08/2012", "country": "india", },
    { make: 'Porsche', model: 'Boxster', price: 72000, "date": "12/08/2012", "country": "china", },

  ];
  rowData = this.data.map((rowData) => {
    const dateParts = rowData.date.split("/");
    return {
      ...rowData,
      date: `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`,
      countryObject: {
        name: rowData.country,
      },
    };
  })
  onGridReady(params: any) {
    this.gridApi = params.api;
    console.log(params.api.getModel().rowsToDisplay.map((item: any) => item.data))
  }

  onRowSelect(event: any) {
    const selectedRows = this.gridApi.getSelectedRows();
    console.log(selectedRows);
  }
}