import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { WeatherResponse } from "../../types/WeatherResponse";

export interface weatherState {
  //userId: any;
  weatherData: WeatherResponse | null;
}
export const weatherSlice = createSlice({
  name: "WeatherData",
  initialState: {
    data: {
      //userId: null,
      weatherData: null,
    } as weatherState,
  },
  reducers: {
    // setUserId: (state, action: PayloadAction<any>) => {
    //   state.data.userId = action.payload;
    // },
    // resetUserId: (state:any) => {
    //   state.data.userId = null;
    // },
    setWeathersData: (state, action: PayloadAction<WeatherResponse>) => {
      state.data.weatherData = action.payload;
    },
    resetWeatherFilterData: (state: any) => {
      state.data.profileData = null;
    },
    weatherFilterData: (state: any, action) => {
      state.data.profileData = action.payload;
    }
  },
});

export const { setWeathersData, resetWeatherFilterData,weatherFilterData } =
weatherSlice.actions;
export default weatherSlice.reducer;
