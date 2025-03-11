import React, { useRef } from 'react';
import { View, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Colors } from '../configs/colors';
import Paragraph from './ui/Paragraph';

const { width } = Dimensions.get('window');

interface TabItem {
    key: string;
    label: string;
}

interface CustomTabsProps {
    tabs: TabItem[];
    onTabChange: (key: string) => void;
    activeTab: string;
}

const CustomTabs: React.FC<CustomTabsProps> = ({ tabs, onTabChange, activeTab }) => {
    const translateX = useRef(new Animated.Value(0)).current;

    const moveIndicator = (index: number) => {
        Animated.spring(translateX, {
            toValue: (width / tabs.length) * index,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View>
            <View style={{ flexDirection: 'row' }}>
                {tabs.map((tab, index) => (
                    <TouchableOpacity
                        key={tab.key}
                        onPress={() => {
                            onTabChange(tab.key);
                            moveIndicator(index);
                        }}
                        style={{
                            flex: 1,
                            paddingVertical: 8,
                            alignItems: 'center',
                            borderBottomWidth: activeTab === tab.key ? 3 : 0,
                            borderBottomColor: activeTab === tab.key ? Colors.primary : 'transparent',
                        }}
                    >
                        <Paragraph weight='Bold' level='Small' style={{ color: activeTab === tab.key ? Colors.primary : Colors.text }}>
                            {tab.label}
                        </Paragraph>
                    </TouchableOpacity>
                ))}
            </View>

            <Animated.View
                style={{
                    width: width / 10,
                    height: 3,
                    backgroundColor: Colors.primary,
                    position: 'absolute',
                    bottom: 0,
                    transform: [{ translateX }],
                }}
            />
        </View>
    );
};

export default CustomTabs;
