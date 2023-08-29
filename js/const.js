//<!-- GUI PARAMETER -->
const AppMode = {
    LIST_MODE: "LIST",
    ADD_MODE: "ADD",
    EDIT_MODE: "EDIT",
    EXPORT_MODE: "EXPORT",
  };
  let CurrentMode = AppMode.LIST_MODE;
  
  const SortOrder = {
    NONE: "NONE",
    ASC: "ASC",
    DESC: "DESC",
  };
  let CurrentPriceOrder = SortOrder.NONE;
  let CurrentDateOrder = SortOrder.NONE;
  
  const SortItime = {
    SORT_NONE: "SORT_NONE",
    SORT_PRICE: "SORT_PRICE",
    SORT_DATE: "SORT_DATE",
  };
  let CurrentSortItime = SortItime.SORT_NONE;
  
  const AppTitleName = {
    STORE_TITLE: "Welcome to MyStore",
    EXPORT_TITLE: "Welcome to MyExport",
  };
  const ExportButtonName = {
    NAME_IN_STORE: "Goto Export",
    NAME_IN_EXPORT: "Backto Store",
  };
  
  const SortMode = {
    ALL_PRODUCT: "ALL_PRODUCT",
    FOR_SALE: "FOR_SALE",
    RUN_OUT: "RUN_OUT",
  };
  let CurrentSort = SortMode.ALL_PRODUCT;
  
  const DataMode = {
    STORE_DATA: "STORE_DATA",
    EXPORT_DATA: "EXPORT_DATA",
  };
  let CurrentData = DataMode.STORE_DATA;