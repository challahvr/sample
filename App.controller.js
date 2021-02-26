sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/sap/ExcelImportnExport/controller/jszip",
	"com/sap/ExcelImportnExport/controller/xlsx",
	"sap/ui/export/Spreadsheet",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function (Controller, jszip, xlsx, Spreadsheet, MessageToast, MessageBox) {
	"use strict";

	return Controller.extend("com.sap.ExcelImportnExport.controller.App", {
		onInit: function () {
			this.onRouterMatch();
		},

		onRouterMatch: function () {
			var oJson = new sap.ui.model.json.JSONModel([]);
			this.getView().byId("idTable").setModel(oJson);
			this.clearAppliedFilterValues();
		},
		clearAppliedFilterValues: function (oEvt) {
			var wrkItmsTbl = this.getView().byId("idTable");
			if (wrkItmsTbl.getColumns().length) {
				for (var i = 0; i < wrkItmsTbl.getColumns().length; i++) {
					wrkItmsTbl.getColumns()[i].setFilterValue("").setFiltered(false);
				}
			}
			var bindingInfo = wrkItmsTbl.getBinding("rows");
			if (bindingInfo) {
				wrkItmsTbl.getBinding("rows").filter([]);
				wrkItmsTbl.getBinding("rows").sort("");
			}
		},
		onChangeFUP: function (e) {
			var file = e.getParameter("files");
			if (file === undefined || file === "") {
				return;
			} else {
				this.clearAppliedFilterValues();
				this.oExcelName = e.getParameter("files")[0].name;
				this._import(e.getParameter("files") && e.getParameter("files")[0], this);
			}
		},
		_import: function (sfile, that) {
			var file = sfile;
			try {
				if (file && window.FileReader) {
				/*	var oBusy = new sap.m.BusyDialog();
					oBusy.open();*/
					that.getView().setBusy(true);
					var reader = new FileReader();
					reader.readAsBinaryString(file);
					reader.onload = function (e) {
						var noOfCols = 16;
						var strCSV = e.target.result;
						var XL_row_object = [];
						var workbook = XLSX.read(strCSV, {
							type: 'binary'
						});
						var sheetName = workbook.SheetNames[0]
						XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
						// workbook.SheetNames[0].forEach(function(sheetName)
						// {
						// XL_row_object =
						// XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
						// })
						var oTab = that.getView().byId("idTable");
						if (XL_row_object.length === 0) {
								var oJson = new sap.ui.model.json.JSONModel([]);
								that.getView().byId("idTable").setModel(oJson);
							MessageBox.information(
								"Please fill the data!", {
									icon: MessageBox.Icon.ERROR,
									title: "Error",
									actions: [MessageBox.Action.OK],
									onClose: function (oAction) {
										if (oAction === "OK") {
										//	oBusy.close();
											that.getView().setBusy(false);
										}
									}
								});
							that.getView().byId("idfileUploader").setValue("");
							oJSMod.setData("");
							oTab.setModel(oJSMod);
							return;
						}
						var oJSMod = new sap.ui.model.json.JSONModel(XL_row_object);
						oTab.setModel(oJSMod);
						oTab.getModel().refresh();
					//	oBusy.close();
						that.getView().setBusy(false);

					}
				}
			} catch (e) {
			//	oBusy.close();
				that.getView().setBusy(true);
				MessageBox.error("File format Error");
				return;
			}
		},
		onDownloadPress: function (evt) {
			var aCols = this.createColumnConfig();
			var oSettings = {
				workbook: {
					columns: aCols
				},
				dataSource: this.getView().byId("idTable").getModel().getData(),
				fileName: this.oExcelName
			};

			new Spreadsheet(oSettings).build().then(function () {
				MessageToast.show("Spreadsheet export has finished");
			});
		},
		createColumnConfig: function () {
			return [{
				label: 'VERSION',
				property: 'VERSION'
			}, {
				label: 'DATE',
				property: 'DATE'
			}, {
				label: 'ITEM',
				property: 'ITEM'
			}, {
				label: 'Account',
				property: 'Account'
			}, {
				label: 'ITEM_STATUS',
				property: 'ITEM_STATUS'
			}, {
				label: 'STATUS',
				property: 'STATUS',

			}, {
				label: 'AREA',
				property: 'AREA',

			}, {
				label: 'Measure',
				property: 'Measure',

			}];
		},

	});
});