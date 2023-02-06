import { StyleSheet } from "react-native";

export const commonStyle = StyleSheet.create({
  row_start: {
    flexDirection: "row",
    // justifyContent: "flex-start",
  },
  row_start_center: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  row_end: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  row_end_center: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  row_space_arround: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  row_space_arround_center: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  row_space_arround_evenly: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  row_space_arround_evenly_center: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  row_space_arround_between_center: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row_space_arround_between_center: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  column_space_arround: {
    flexDirection: "column",
    alignItems: "space-around",
  },
  column_space_arround_center: {
    flexDirection: "column",
    alignItems: "space-around",
    justifyContent: "center",
  },
  column_space_between: {
    flexDirection: "column",
    alignItems: "space-between",
  },
  column_start: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  column_start_start: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  column_space_between_center: {
    flexDirection: "column",
    alignItems: "space-between",
    justifyContent: "center",
  },
  column_space_evenly: {
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  column_space_evenly_center: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  column_end: {
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  column_end_center: {
    flexDirection: "column",
    alignItems: "end",
    justifyContent: "center",
  },
  column_center_center: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
});
