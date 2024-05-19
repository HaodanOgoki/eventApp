import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Share, Modal } from 'react-native';
import { Clipboard } from 'react-native';
import ShareSocial from 'react-native-share-social'; 

const TabLiveDetail = ({ route, navigation }) => {
  const { title, description, content } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [shareUrl, setShareUrl] = useState(''); 
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, 
  []);

  const generateShareUrl = () => {
    const generatedUrl = `${title}\n\n${content}`;

    // const generatedUrl = `https://example.com/${title.replace(/\s/g, '-')}/details?id=123`;

    setShareUrl(generatedUrl);
  };

  const onShare = async () => {
    try {
      await Share.share({
        message: shareUrl, 
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const copyLink = () => {
    Clipboard.setString(shareUrl);
    alert('Link copied to clipboard!');
    setModalVisible(false);
  };

  const shareToFacebook = async () => {
    try {
      await ShareSocial.shareToFacebook({
        url: shareUrl,
        caption: title,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const shareToTwitter = async () => {
    try {
      await ShareSocial.shareToTwitter({
        url: shareUrl,
        title: title,
        message: content,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    generateShareUrl();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.content}>{content}</Text>
      <Button title="Share" onPress={() => setModalVisible(true)} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <Button title="Copy Link" onPress={copyLink} />
          <Button title="Share on Facebook" onPress={shareToFacebook} />
          <Button title="Share on Twitter" onPress={shareToTwitter} />
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
      <Button title="Back to Main Screen" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default TabLiveDetail;
