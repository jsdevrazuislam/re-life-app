import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import { Colors } from '../../configs/colors';
import Paragraph from '../ui/Paragraph';
import { useState } from 'react';

interface FollowUpCardProps {
    date: string;
    comment: string;
    status: 'in-progress' | 'completed' | 'failed';
    mediaFiles: Array<{ url: string }>;
}

const FollowUpCard: React.FC<FollowUpCardProps> = ({
    date,
    comment,
    status,
    mediaFiles,
}) => {

    const [videoUrl, setVideoUrl] = useState("")
    const getMediaType = (uri: string): 'image' | 'video' => {
        const extension = uri.split('.').pop()?.toLowerCase();
        const videoExtensions = ['mp4', 'mov', 'avi', 'mkv', 'webm'];
        return videoExtensions.includes(extension || '') ? 'video' : 'image';
    };


    const renderMediaItem = ({ item, index }: { item: { url: string }; index: number }) => {
        const mediaType = getMediaType(item.url);

        return (
            <TouchableOpacity
                style={styles.mediaContainer}
                activeOpacity={0.8}
            >
                {mediaType === 'image' ? (
                    <Image
                        source={{ uri: item.url }}
                        style={styles.media}
                        resizeMode="cover"
                    />
                ) : (
                    <>
                        {
                            !videoUrl && <View style={styles.videoThumbnail}>
                            <MaterialIcons name="videocam" size={32} color={Colors.neutral[200]} />
                        </View>
                        }
                        <TouchableOpacity onPress={() => setVideoUrl(item.url)} style={styles.videoOverlay}>
                            <Ionicons name="play-circle" size={32} color="white" />
                        </TouchableOpacity>
                        {
                            videoUrl && <Video
                            source={{ uri: videoUrl }}
                            style={{ width: '100%', height:'100%'}}
                            controls
                            resizeMode='cover'
                        />
                        }
                    </>
                )}

                {index === 3 && mediaFiles.length > 4 && (
                    <View style={styles.remainingMedia}>
                        <Text style={styles.remainingText}>+{mediaFiles.length - 4}</Text>
                    </View>
                )}
            </TouchableOpacity>
        );
    };


    const statusColors = {
        'completed': Colors.primary,
        'in-progress': Colors.warning,
        'failed': Colors.danger
    };

    const statusLabels = {
        'completed': 'পুনর্বাসিত',
        'in-progress': 'চলমান',
        'failed': 'নতুন'
    };


    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.statusContainer}>
                    <View style={[styles.statusDot, { backgroundColor: statusColors[status] }]} />
                    <Text style={styles.statusText}>{statusLabels[status]}</Text>
                </View>
                <View style={styles.date}>
                    <MaterialIcons name="date-range" size={18} color={Colors.neutral[400]} />
                    <Paragraph style={{ color: Colors.neutral[400] }} level='Small' weight='SemiBold'>
                        {date}
                    </Paragraph>
                </View>
            </View>

            {comment && (
                <View style={styles.commentContainer}>
                    <FontAwesome name="comment-o" size={16} color={Colors.neutral[200]} />
                    <Text style={styles.commentText}>{comment}</Text>
                </View>
            )}

            {mediaFiles.length > 0 && (
                <FlatList
                    data={mediaFiles}
                    renderItem={renderMediaItem}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    scrollEnabled={false}
                    contentContainerStyle={styles.mediaGrid}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: Colors.neutral[200]
    },
    videoThumbnail: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 6,
    },
    statusText: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.dark,
    },
    date: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    commentContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
        backgroundColor: Colors.light,
        padding: 12,
        borderRadius: 8,
    },
    commentText: {
        fontSize: 14,
        color: Colors.dark,
        marginLeft: 8,
        flex: 1,
    },
    mediaGrid: {
        marginHorizontal: -4,
    },
    mediaContainer: {
        flex: 1,
        aspectRatio: 1,
        margin: 4,
        borderRadius: 8,
        overflow: 'hidden',
    },
    media: {
        width: '100%',
        height: '100%',
    },
    videoOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    remainingMedia: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    remainingText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    }
});

export default FollowUpCard;