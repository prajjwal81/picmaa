const BASE_URL = 'http://192.168.0.113:6000/api/';

export const LOGIN = `${BASE_URL}public/mobile-login`;
export const Register_User = `${BASE_URL}public/signup`;
export const _OTP = `${BASE_URL}public/send-mobile-otp`;
export const Verify_OTP = `${BASE_URL}public/verify-mobile-otp`;
export const Get_Event_List = `${BASE_URL}public/eventCategory/get-grouped-list`;
export const Get_Photographer_List = `${BASE_URL}public/photographer-list`;
export const Get_Photographer_Detail = `${BASE_URL}/public/photographer-profile`;
export const GET_PHOTOPACKEGE_LIST = `${BASE_URL}photoPackage/get-list`;
export const Get_USER_PROFILE = `${BASE_URL}/users/get-current-user`;
export const USER_PROFILE_UPDATE = `${BASE_URL}/photographerProfile/update-profile`;
export const GET_EVENT = `${BASE_URL}events/get`;
export const GET_EVENT_LIST_FOR_USER = `${BASE_URL}events/get-list-user`;
export const ADD_FACE_ID = `${BASE_URL}users/update-face-id`;
export const POST_SELECTED_IMAGES = `${BASE_URL}events/add-selected-images`;
export const GET_SELECTED_IMAGES = `${BASE_URL}events/selected-images`;
export const DELETE_SELECTED_IMAGES = `${BASE_URL}events/remove-selected-images`;
