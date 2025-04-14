import React from "react";
import { Modal, View, ActivityIndicator, StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "grey",
    },
});
interface OverlayProps {
    visible: any;
    color?: any;
}
const OverlayLoader: React.FC<OverlayProps> = (props) => (
    <Modal
        visible={props.visible}
        transparent={true}
        statusBarTranslucent={true}
        animationType="none"
    >
        <View style={styles.container}>
            <ActivityIndicator
                size="large"
                color={props.color ? props.color : "blue"}
            />
        </View>
    </Modal>
);
export default OverlayLoader;