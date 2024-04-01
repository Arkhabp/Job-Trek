import { types } from "../../../constans/auth.constan";

// Inisialisasi state awal
const initialState = {
  user: null, // Informasi pengguna yang login
  error: null, // Pesan kesalahan yang muncul saat login gagal
  isLoading: false // Menandakan apakah proses login sedang berlangsung
};

// Reducer untuk mengelola state autentikasi
const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true, // Menandakan bahwa proses login sedang berlangsung
        error: null // Menghapus pesan kesalahan
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload, // Memperbarui informasi pengguna setelah berhasil login
        isLoading: false, // Mengubah status loading menjadi false
        error: null // Menghapus pesan kesalahan
      };
    case types.LOGIN_FAILED:
      return {
        ...state,
        error: action.payload, // Menyimpan pesan kesalahan saat login gagal
        isLoading: false // Mengubah status loading menjadi false
      };
    case types.LOGOUT:
      return {
        ...state,
        user: null // Menghapus informasi pengguna saat logout
      };
    default:
      return state;
  }
};

export default authReducer;
