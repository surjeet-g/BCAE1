import {
  INQUIRY_INIT,
  INQUIRY_DATA,
  INQUIRY_ERROR,
  INIT_FETCH_DETAILS,
  SET_FETCH_DETAILS,
  FAILURE_FETCH_DETAILS,
  RESET_INQUIRY_DATA,
  SET_PROBLEM_FETCH_DETAILS,
  SET_ORGANIZATION_FETCH_DETAILS,
} from "./InquiryAction";

const inquiryInitialState = {
  initInquiry: false,
  isInquiryError: false,
  inquiryData: {},
  initDetailsData: false,
  isDetailsDataError: false,
  DetailsDataData: {},
  problemCode: {},
  organization: {},
  deptData: {},
};

const InquiryReducer = (state = inquiryInitialState, action) => {
  switch (action.type) {
    case INIT_FETCH_DETAILS:
      return {
        ...state,
        initDetailsData: true,
        isDetailsDataError: false,
        DetailsDataData: {},
      };

    case SET_FETCH_DETAILS:
      return {
        ...state,
        initDetailsData: false,
        isDetailsDataError: false,
        DetailsDataData: action.data,
      };
    case SET_PROBLEM_FETCH_DETAILS:
      return {
        ...state,
        problemCode: action?.data?.data,
      };
    case SET_ORGANIZATION_FETCH_DETAILS:
      let formatedData = [];
      let deptDescArr = [];
      if (action?.data?.data.length != 0) {
        formatedData = action?.data?.data.map((d) => {
          const obj = { id: d.unitId, description: d.unitDesc };
          deptDescArr.push(obj);
          return { ...d, ...{ description: d.langEng } };
        });
      }
      return {
        ...state,
        organization: formatedData,
        deptData: deptDescArr,
      };

    case FAILURE_FETCH_DETAILS:
      return {
        ...state,
        initDetailsData: false,
        isDetailsDataError: true,
        DetailsDataData: action?.data,
      };

    case INQUIRY_INIT:
      return {
        ...state,
        initInquiry: true,
        isInquiryError: false,
        inquiryData: {},
      };

    case INQUIRY_ERROR:
      return {
        ...state,
        initInquiry: false,
        isInquiryError: true,
        inquiryData: action.data,
      };

    case INQUIRY_DATA:
      return {
        ...state,
        initInquiry: false,
        isInquiryError: false,
        inquiryData: action.data,
      };
    case RESET_INQUIRY_DATA:
      return {
        ...state,
        initInquiry: false,
        isInquiryError: false,
        inquiryData: {},
      };
    default:
      return state;
  }
};
export default InquiryReducer;
