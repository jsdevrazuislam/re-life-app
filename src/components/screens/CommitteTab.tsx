import React from 'react'
import { imamStyles } from '../../styles/imamHomeStyles';
import { View, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import Paragraph from '../ui/Paragraph';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '../../constants/route';
import Heading from '../ui/Heading';



const CommitteeTab: React.FC<CommitteeTabProps> = ({ data, onEdit, onDelete }) => {

    const navigation = useNavigation<NavigationProp<AppStackParamList>>();

    return (
        <View style={imamStyles.tabContainer}>
            <TouchableOpacity style={imamStyles.addButton} onPress={() => navigation.navigate('AddCommitteeScreen')}>
                <Icon name="group-add" size={20} color="white" />
                <Text style={imamStyles.buttonText}>Add Committee</Text>
            </TouchableOpacity>
            {
                data.length === 0 ? (
                    <View style={imamStyles.emptyContainer}>
                        <Icon name="people-outline" size={60} color="#888" />
                        <Heading level={6} weight='Bold' style={imamStyles.emptyTitle}>No committee added yet</Heading>
                        <Paragraph level='Small' weight='Medium' style={imamStyles.emptyDescription}>
                            Tap the button above to add a new committee in need.
                        </Paragraph>
                    </View>
                ) : <ScrollView>
                    {data.map((item) => (
                        <View key={item._id} style={imamStyles.infoCard}>
                            <View style={imamStyles.cardContent}>
                                <Image source={{ uri: "https://images.pexels.com/photos/30140435/pexels-photo-30140435/free-photo-of-moody-forest-in-heavy-fog.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" }} style={imamStyles.infoPhoto} />
                                <View style={imamStyles.cardText}>
                                    <Paragraph level='Small' weight='Bold' style={imamStyles.cardTitle}>{item.name}</Paragraph>
                                    <Paragraph level='Small' weight='Medium' style={imamStyles.cardSubtitle}>Profession: {item.profession}</Paragraph>
                                    <Paragraph level='Small' weight='Medium' style={imamStyles.cardSubtitle}>Location: {item.address}</Paragraph>
                                </View>
                            </View>
                            <View style={imamStyles.actionButtons}>
                                <TouchableOpacity onPress={() => onEdit(item)}>
                                    <Icon name="edit" size={20} color="#4CAF50" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => onDelete(item?._id)}>
                                    <Icon name="delete" size={20} color="#F44336" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            }

        </View>
    )
}

export default CommitteeTab;