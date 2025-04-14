// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Platform,
//   StatusBar,
//   TouchableOpacity,
//   Alert,
//   PermissionsAndroid,
//   StyleSheet,
// } from "react-native";
// import { Camera, CameraType } from "react-native-camera-kit";

// const App = () => {
//   const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);

//   useEffect(() => {
//     const requestCameraPermission = async () => {
//       try {
//         const granted: any = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.CAMERA
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           setHasCameraPermission(true);
//         } else {
//           setHasCameraPermission(false);
//         }
//       } catch (err) {
//         setHasCameraPermission(false);
//         return false;
//       }
//     };

//     requestCameraPermission();
//   }, []);

//   const handleBarcodeScan = (event: any) => {
//     try {
//       const scannedValue = event.nativeEvent.codeStringValue;
//       console.log("Scanned value:", scannedValue);

//       // You can also show an alert with the scanned value
//       Alert.alert(
//         "Scan Successful",
//         `Scanned value: ${scannedValue}`,
//         [
//           { text: "OK", onPress: () => console.log("OK Pressed") }
//         ]
//       );
//     } catch (error) {
//       console.error("Error scanning barcode:", error);
//       Alert.alert(
//         "Error",
//         "Something went wrong! Please try again"
//       );
//     }
//   };

//   const renderCameraView = () => {
//     if (hasCameraPermission) {
//       return (
//         <View style={styles.cameraHeader}>
//           <View style={styles.frameOverlay}>
//             <Camera
//               style={styles.camera}
//               cameraType={CameraType.Back}
//               scanBarcode={true}
//               showFrame={true} // Show frame for better UX
//               laserColor="red" // Add laser effect
//               frameColor="white" // Frame color
//               onReadCode={handleBarcodeScan}
//               // Optional: configure which barcode types to scan
//               barcodeScannerOptions={{
//                 barcodeTypes: [
//                   "qr",
//                   "pdf417",
//                   "upc_e",
//                   "upc_a",
//                   "ean_8",
//                   "ean_13",
//                   "code_128",
//                   "code_39",
//                   "code_93",
//                   "itf",
//                   "codabar",
//                   "datamatrix",
//                   "aztec",
//                 ],
//               }}
//             />
//           </View>
//         </View>
//       );
//     } else if (hasCameraPermission === false) {
//       return (
//         <View style={styles.permissionDenied}>
//           <Text style={styles.permissionText}>
//             Camera permission was denied. Please enable it in settings.
//           </Text>
//         </View>
//       );
//     }
//     return null;
//   };

//   return <>{renderCameraView()}</>;
// };

// const styles = StyleSheet.create({
//   modalOverlay: {
//     padding: 0,
//     margin: 0,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   modalContainer: {
//     flex: 1,
//     width: "100%",
//     height: "100%",
//     paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 30,
//     backgroundColor: "#b2b2b2",
//   },
//   frameOverlay: {
//     borderWidth: 3,
//     borderColor: "green",
//     justifyContent: "center",
//     alignItems: "center",
//     alignSelf: "center",
//   },
//   cameraHeader: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#000",
//     alignSelf: "center",
//     width: "100%",
//   },
//   camera: {
//     width: 400,
//     height: 400,
//     justifyContent: "center",
//     alignItems: "center",
//     alignSelf: "center",
//   },
//   permissionDenied: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   permissionText: {
//     color: "red",
//     fontSize: 18,
//     textAlign: "center",
//   },
//   frameBorder: {
//     width: 250,
//     height: 250,
//   },
//   headerView: {
//     marginTop: 100,
//     marginBottom: 100,
//   },
//   headerText: {
//     textAlign: "center",
//     fontSize: 16,
//     fontFamily: "Roboto-Regular",
//     fontWeight: "800",
//     color: "#000",
//   },
//   closeBtn: {
//     marginTop: 100,
//     marginBottom: 100,
//     backgroundColor: "#0477FF",
//     height: 45,
//     width: "50%",
//     alignSelf: "center",
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 5,
//   },
//   closeBtnText: {
//     fontSize: 16,
//     textAlign: "center",
//     color: "#fff",
//     fontWeight: "bold",
//   },
// });

// export default App;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './src/navigation';
import { Provider } from "react-redux";
import { store } from './src/reducers/store';
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const bg = require('./src/assets/images/background.jpg');

const App = () => {
  let persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;