import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Platform,
  StatusBar,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  StyleSheet,
} from "react-native";
import { Camera, CameraType } from "react-native-camera-kit";


const Scan = (props:any) => {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isScanningEnabled, setIsScanningEnabled] = useState(true);
  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        const granted: any = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setHasCameraPermission(true);
        } else {
          setHasCameraPermission(false);
        }
      } catch (err) {
        setHasCameraPermission(false);
        return false;
      }
    };

    requestCameraPermission();
  }, []);

  const handleBarcodeScan = (event: any) => {
    if (!isScanningEnabled) return; 
    try {
      const scannedValue = event.nativeEvent.codeStringValue;
      console.log("Scanned value:", scannedValue);
      setIsScanningEnabled(false);
      Alert.alert(
        "Scan Successful",
        `Scanned value: ${scannedValue}`,
        [
          { text: "OK", onPress: () => props.navigation.navigate("AddDetails") }
        ]
      );
    } catch (error) {
      console.error("Error scanning barcode:", error);
      Alert.alert(
        "Error",
        "Something went wrong! Please try again"
      );
    }
  };

  const renderCameraView = () => {
    if (hasCameraPermission) {
      return (
        <View style={styles.cameraHeader}>
          <View style={styles.frameOverlay}>
            <Camera
              style={styles.camera}
              cameraType={CameraType.Back}
              scanBarcode={true}
              showFrame={true} 
              laserColor="red" 
              frameColor="white" 
              onReadCode={handleBarcodeScan}
              barcodeScannerOptions={{
                barcodeTypes: [
                  "qr",
                  "pdf417",
                  "upc_e",
                  "upc_a",
                  "ean_8",
                  "ean_13",
                  "code_128",
                  "code_39",
                  "code_93",
                  "itf",
                  "codabar",
                  "datamatrix",
                  "aztec",
                ],
              }}
            />
          </View>
        </View>
      );
    } else if (hasCameraPermission === false) {
      return (
        <View style={styles.permissionDenied}>
          <Text style={styles.permissionText}>
            Camera permission was denied. Please enable it in settings.
          </Text>
        </View>
      );
    }
    return null;
  };

  return <>{renderCameraView()}</>;
};

const styles = StyleSheet.create({
  modalOverlay: {
    padding: 0,
    margin: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 30,
    backgroundColor: "#b2b2b2",
  },
  frameOverlay: {
    borderWidth: 3,
    borderColor: "green",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  cameraHeader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    alignSelf: "center",
    width: "100%",
  },
  camera: {
    width: 400,
    height: 400,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  permissionDenied: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  permissionText: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
  },
  frameBorder: {
    width: 250,
    height: 250,
  },
  headerView: {
    marginTop: 100,
    marginBottom: 100,
  },
  headerText: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    fontWeight: "800",
    color: "#000",
  },
  closeBtn: {
    marginTop: 100,
    marginBottom: 100,
    backgroundColor: "#0477FF",
    height: 45,
    width: "50%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  closeBtnText: {
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Scan;