(function() {​​
let template = document.createElement("INPUT");
template.setAttribute("type", "file");


// document.createElement("template");
template.innerHTML =
<style></style>
<div id="ui5_content" name="ui5_content">
<slot name="content"></slot>
</div>
<script id="oView" name="oView" type="sapui5/xmlview">
<mvc:View xmlns:core="sap.ui.core" xmlns:mvc="sap.ui.core.mvc"
xmlns:html="http://www.w3.org/1999/xhtml" displayBlock="true" xmlns="sap.m" xmlns:uitable="sap.ui.table" xmlns:l="sap.ui.layout"
xmlns:f="sap.ui.layout.form">
<App id="app">
<pages>
<Page title="Excel Import/Export" >
<content>
<FlexBox height="100px" alignItems="Center" justifyContent="Center">
<items>
<Label />
<VBox alignItems="Center" justifyContent="Center">
<FileUploader xmlns="sap.ui.unified" id="idfileUploader" fileType="xlsx,XLSX,CSV,csv"
sameFilenameAllowed="true" change="onChangeFUP" placeholder="Upload File"
uploadComplete="onUploadCompleteFUP" typeMissmatch="onFailedFUP"
fileSizeExceed="onFailedFUP" uploadAborted="onFailedFUP"
filenameLengthExceed="onFailedFUP" />
</VBox>
</items>
</FlexBox>
<uitable:Table id="idTable" selectionMode="None" rows="{​​/}​​" visibleRowCount="12"
class="sapUiSizeCompact">
<uitable:toolbar>
<Toolbar >
<Title text="XLSSAC" class="sapUiSizeCompact"/>
<ToolbarSpacer/>
<Button icon="sap-icon://excel-attachment" text="Export to Excel" tooltip="Export to Excel" press="onDownloadPress" type="Transparent"/>
</Toolbar>
</uitable:toolbar>
<uitable:columns>
<uitable:Column filterProperty="VERSION" sortProperty="VERSION">
<Label text="VERSION"/>
<uitable:template>
<Text text="{​​VERSION}​​" wrapping="false"/>
</uitable:template>
</uitable:Column>
<uitable:Column sortProperty="DATE" filterProperty="DATE">
<Label text="DATE"/>
<uitable:template>
<Text text="{​​DATE}​​" wrapping="false"/>
</uitable:template>
</uitable:Column>
<uitable:Column sortProperty="ITEM" filterProperty="ITEM">
<Label text="ITEM"/>
<uitable:template>
<Text text="{​​ITEM}​​" wrapping="false"/>
</uitable:template>
</uitable:Column>
<uitable:Column sortProperty="Account" filterProperty="Account">
<Label text="Account"/>
<uitable:template>
<Text text="{​​Account}​​" wrapping="false"/>
</uitable:template>
</uitable:Column >
<uitable:Column sortProperty="ITEM_STATUS" filterProperty="ITEM_STATUS" hAlign="Begin">
<Label text="ITEM_STATUS"/>
<uitable:template>
<Text text="{​​ITEM_STATUS}​​"/>
</uitable:template>
</uitable:Column>
<uitable:Column sortProperty="STATUS" filterProperty="STATUS">
<Label text="STATUS"/>
<uitable:template>
<Text text="{​​STATUS}​​" wrapping="false"/>
</uitable:template>
</uitable:Column>
<uitable:Column sortProperty="AREA" filterProperty="AREA">
<Label text="AREA"/>
<uitable:template>
<Text text="{​​AREA}​​" wrapping="false"/>
</uitable:template>
</uitable:Column>
<uitable:Column sortProperty="Measure" filterProperty="Measure">
<Label text="Measure"/>
<uitable:template>
<Text text="{​​Measure}​​" wrapping="false"/>
</uitable:template>
</uitable:Column>
</uitable:columns>
</uitable:Table>



</content>
</Page>
</pages>
</App>
</mvc:View>



</script>;



class ExcelImportnExport extends HTMLElement {​​
constructor() {​​
super();

}​​



onCustomWidgetBeforeUpdate(changedProperties) {​​

}​​



onCustomWidgetAfterUpdate(changedProperties) {​​

}​​
}​​



// customElements.define("com-sap-sample-coloredbox", ColoredBox);
}​​)();