import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../configs/colors';
import { useTranslation } from '../hooks/useTranslation';
import ImageComponent from './ui/Image';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { styles as style } from './PersonalScreen'
import { mvs } from 'react-native-size-matters';
import Paragraph from './ui/Paragraph';


interface ChildrenListProps {
    childrenData: ChildrenDetails[];
    openImage: (url: string) => void
}

const ChildrenList: React.FC<ChildrenListProps> = ({ childrenData, openImage }) => {

    const { t } = useTranslation()

    return (
        <View style={styles.container}>
            {childrenData.map((child) => (
                <View key={child._id} style={styles.card}>
                    <View style={styles.row}>
                        <Icon name="account-child" size={24} color={Colors.primary} />
                        <Paragraph level='Small' weight='Bold' style={styles.name}>{child.name}</Paragraph>
                        <Paragraph level='Small' weight='Medium' style={styles.age}>{child.age} {t('years')}</Paragraph>
                    </View>

                    {child.age > 15 ? (
                        <>
                            <View style={styles.row}>
                                <Icon name="briefcase" size={20} color="#2196F3" />
                                <Paragraph level='Small' weight='Bold' style={styles.label}>{t("childProfession")} : </Paragraph>
                                <Paragraph level='Small' weight='Medium' style={styles.value}>{child.profession || 'N/A'}</Paragraph>
                            </View>
                            <View style={styles.row}>
                                <Icon name="phone" size={20} color="#FF9800" />
                                <Paragraph level='Small' weight='Bold' style={styles.label}>{"childNumber"} : </Paragraph>
                                <Paragraph level='Small' weight='Medium' style={styles.value}>{child.mobile || 'N/A'}</Paragraph>
                            </View>
                            <View style={styles.row}>
                                <Icon name="cash" size={20} color="#4CAF50" />
                                <Paragraph level='Small' weight='Bold' style={styles.label}>{t('childIncome')} :</Paragraph>
                                <Paragraph level='Small' weight='Medium' style={styles.value}>{`${child.income}/${child.frequency}` || 'N/A'}</Paragraph>
                            </View>
                        </>
                    ) : (
                        <View>
                            <View style={styles.row}>
                                <Icon name="image" size={20} color="#795548" />
                                <Paragraph level='Small' weight='Bold' style={styles.label}>{t('childrenProveDocument')}:</Paragraph>
                            </View>
                            <View style={[style.masjidImage, { width: 85, height: 80, marginTop: 10 }]}>
                                <ImageComponent
                                    source={child.childrenProveDocument}
                                    style={styles.image}
                                    imageStyle={{ borderRadius: 4 }}
                                />
                                <TouchableOpacity style={style.expanded} onPress={() => openImage(child.childrenProveDocument)}>
                                    <SimpleLineIcons color={Colors.white} name='size-fullscreen' size={mvs(12)} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10
    },
    card: {
        backgroundColor: Colors.white,
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
        borderColor: Colors.neutral[200],
        borderWidth: 2
    },
    row: {
        flexDirection: 'row',
        marginVertical: 5,
    },
    name: {
        marginLeft: 8,
    },
    age: {
        color: Colors.textSecondary,
        marginLeft: 8,
    },
    label: {
        marginLeft: 6,
    },
    value: {
        marginLeft: 6,
        color: Colors.text,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginLeft: 6,
    },
});

export default ChildrenList;
