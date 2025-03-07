import React, { useEffect, useState } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Animated,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Paragraph from '../components/ui/Paragraph';
import Heading from '../components/ui/Heading';
import { useTranslation } from '../hooks/useTranslation';

const NoInternetScreen = () => {
    const [isConnected, setIsConnected] = useState(true);
    const { t } = useTranslation()
    const fadeAnim = new Animated.Value(0);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            setIsConnected(state.isConnected ?? false);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!isConnected) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(fadeAnim, {
                        toValue: 0,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        }
    }, [isConnected]);

    const checkConnection = async () => {
        const state = await NetInfo.fetch();
        setIsConnected(state.isConnected ?? false);
    };

    if (isConnected) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.iconContainer, { opacity: fadeAnim }]}>
                <Ionicons name="wifi" size={80} color="red" />
            </Animated.View>

            <Heading level={5} weight='Bold' style={styles.title}>{t('internetTitle')}</Heading>
            <Paragraph level='Medium' style={styles.subtitle}>
                {t('internetDescription')}
            </Paragraph>

            <TouchableOpacity style={styles.retryButton} onPress={checkConnection}>
                <Paragraph level='Small' weight='Bold' style={styles.retryText}>{t('internetButton')}</Paragraph>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        marginBottom: 20,
    },
    title: {
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    subtitle: {
        color: '#666',
        textAlign: 'center',
        marginHorizontal: 30,
        marginBottom: 20,
    },
    retryButton: {
        backgroundColor: '#ff4d4d',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
    retryText: {
        color: '#fff',
    },
});

export default NoInternetScreen;
