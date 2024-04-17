import { types } from "../../../constans/application.constan";
import { ApplicationData, UpdateApplicationData } from "../../../../types/data";

// Definisikan tipe state
interface ApplicationState {
  application: {
    data: ApplicationData[] | null;
    error: string | null;
    isLoading: boolean;
  };
  updateApplication: {
    data: UpdateApplicationData | null;
    error: string | null;
    isLoading: boolean;
  };
}

// Inisialisasi state awal
const initialState: ApplicationState = {
  application: {
    data: [
      {
        id: 1,
        status: "Success",
        statusId: 1,
        companyName: "PT. Abhimata Citra Abadi asd",
        position: "Mobile Developer",
        employmentType: "Full Time",
        portal: "Linked In",
        offering: "Offering",
        progressDate: "06-02-2024"
      },
      {
        id: 2,
        status: "Registered",
        statusId: 4,
        companyName: "PT. XYZ Indonesia",
        position: "Web Developer",
        employmentType: "Part Time",
        portal: "LinkedIn",
        offering: "Offering",
        progressDate: "10-03-2024"
      },
      {
        id: 3,
        status: "Failed",
        statusId: 2,
        companyName: "PT. ABC Teknologi",
        position: "Software Engineer",
        employmentType: "Contract",
        portal: "GitHub",
        offering: "Offering",
        progressDate: "15-05-2024"
      },
      {
        id: 4,
        status: "On Process",
        statusId: 3,
        companyName: "PT. QWE Solutions",
        position: "Data Analyst",
        employmentType: "Full Time",
        portal: "Indeed",
        offering: "Offering",
        progressDate: "20-07-2024"
      },
      {
        id: 5,
        status: "Success",
        statusId: 1,
        companyName: "PT. ZXC Corporation",
        position: "UI/UX Designer",
        employmentType: "Freelance",
        portal: "Dribbble",
        offering: "Offering",
        progressDate: "25-09-2024"
      },
      {
        id: 6,
        status: "Registered",
        statusId: 4,
        companyName: "PT. DEF Technology",
        position: "Backend Developer",
        employmentType: "Internship",
        portal: "LinkedIn",
        offering: "Offering",
        progressDate: "30-10-2024"
      },
      {
        id: 7,
        status: "Failed",
        statusId: 2,
        companyName: "PT. MNO Software",
        position: "Frontend Developer",
        employmentType: "Full Time",
        portal: "GitHub",
        offering: "Offering",
        progressDate: "02-12-2024"
      },
      {
        id: 8,
        status: "On Process",
        statusId: 3,
        companyName: "PT. RST Solutions",
        position: "Product Manager",
        employmentType: "Contract",
        portal: "Indeed",
        offering: "Offering",
        progressDate: "02-12-2024"
      },
      {
        id: 9,
        status: "Success",
        statusId: 1,
        companyName: "PT. GHI Corporation",
        position: "QA Engineer",
        employmentType: "Full Time",
        portal: "LinkedIn",
        offering: "Offering",
        progressDate: "02-14-2024"
      },
      {
        id: 10,
        status: "Registered",
        statusId: 4,
        companyName: "PT. JKL Technologies",
        position: "Systems Analyst",
        employmentType: "Freelance",
        portal: "Indeed",
        offering: "Offering",
        progressDate: "02-12-2025"
      }
    ],
    error: null,
    isLoading: false
  },
  updateApplication: {
    data: null,
    error: null,
    isLoading: false
  }
};

// Reducer untuk mengelola state autentikasi
const applicationReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.GET_APPLICATION_REQUEST:
      return {
        ...state,
        application: {
          isLoading: true,
          error: null,
          data: null
        }
      };
    case types.GET_APPLICATION_SUCCESS:
      return {
        ...state,
        application: {
          data: action.payload,
          error: null,
          isLoading: false
        }
      };
    case types.GET_APPLICATION_FAILED:
      return {
        ...state,
        application: {
          error: action.payload,
          isLoading: false,
          data: null
        }
      };

    case types.UPDATE_APPLICATION_REQUEST:
      return {
        ...state,
        updateApplication: {
          isLoading: true,
          data: null,
          error: null
        }
      };
    case types.UPDATE_APPLICATION_SUCCESS:
      return {
        ...state,
        updateApplication: {
          data: action.payload,
          isLoading: false,
          error: null
        }
      };
    case types.UPDATE_APPLICATION_FAILED:
      return {
        ...state,
        updateApplication: {
          error: action.payload,
          isLoading: false,
          data: null
        }
      };
    case types.DELETE_APPLICATION_REQUEST:
    default:
      return state;
  }
};

export default applicationReducer;
