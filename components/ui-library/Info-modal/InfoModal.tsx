import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Modal } from 'react-native';

interface InfoModalProps {
  visible: boolean;
  title: string;
  description: string;
  action: () => void;
  onClose?: () => void;
  locked?: boolean;
  review?: boolean;
}

const screenWidth = Dimensions.get('window').width;

 const InfoModal: React.FC<InfoModalProps> = ({ visible, title, description, action, onClose }) => {
  if (!visible) return null;

  return (
    <Modal transparent={true} visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <View style={styles.arrowContainer}>
            <View style={styles.arrow} />
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <TouchableOpacity style={styles.button} onPress={action}>
            <Text style={styles.buttonText}>Action</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', // Semi-transparent background
    zIndex: 1000, // Ensure it's on top
  },
  arrowContainer: {
    position: 'absolute',
    bottom: 60, // Adjust based on your design
    width: 0,
    height: 0,
    alignItems: 'center',
  },
  arrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#34D399', // Green color matching the modal
  },
  modalContent: {
    backgroundColor: '#34D399', // Green background
    borderRadius: 8,
    padding: 16,
    width: screenWidth * 0.8, // Ensure modal takes up 80% of the screen width
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    color: '#ffffff',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: '#34D399', // Green color
    fontSize: 14,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#34D399', // Green color
    fontSize: 14,
    fontWeight: 'bold',
  },
});


export default InfoModal;