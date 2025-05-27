import React from 'react';
import { StyleSheet, View, Modal, Pressable, ScrollView, Text, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../themes/ThemeContext";

const CustomModal = ({ visible = false, onClose, title = "Modal Title", children }) => {
    const { theme } = useTheme();

    return (
        <Modal visible={visible} animationType="fade" transparent={true}>
            <Pressable
                style={styles.backdrop}
                onPress={() => {
                    Keyboard.dismiss();
                    onClose();
                }}
            >
                <KeyboardAvoidingView
                    style={styles.modalContainerWrapper}
                >
                    <Pressable
                        style={[styles.modalContainer, { backgroundColor: theme.background }]}
                        onPress={(e) => e.stopPropagation()} 
                    >
                        <View style={styles.handleBar} />

                        <View style={styles.headerContainer}>
                            <Text style={[styles.titleText, { color: theme.text }]}>{title}</Text>
                            <Pressable onPress={onClose} style={styles.closeButton}>
                                <Ionicons name="close-circle" color={theme.accent} size={28} />
                            </Pressable>
                        </View>

                        <ScrollView contentContainerStyle={styles.scrollContent}>
                            {children}
                        </ScrollView>
                    </Pressable>
                </KeyboardAvoidingView>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainerWrapper: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    modalContainer: {
        width: '90%',
        maxWidth: 400,
        maxHeight: '80%',
        borderRadius: 20,
        overflow: 'hidden',
        paddingVertical: 20,
        paddingHorizontal: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 10,
    },
    handleBar: {
        width: 40,
        height: 4,
        backgroundColor: '#ccc',
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 12,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    titleText: {
        fontSize: 20,
        fontWeight: '600',
        flex: 1,
        textAlign: 'center',
    },
    closeButton: {
        paddingLeft: 10,
    },
    scrollContent: {
        paddingBottom: 20,
    }
});

export default CustomModal;
