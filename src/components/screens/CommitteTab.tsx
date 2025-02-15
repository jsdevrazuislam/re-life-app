import React from 'react'
import { imamStyles } from '../../styles/imamHomeStyles';
import { View, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import Paragraph from '../ui/Paragraph';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '../../constants/route';



const CommitteeTab: React.FC<CommitteeTabProps> = ({ data, onEdit, onDelete }) => {

    const navigation = useNavigation<NavigationProp<AppStackParamList>>();

    return (
        <View style={imamStyles.tabContainer}>
            <TouchableOpacity style={imamStyles.addButton} onPress={() => navigation.navigate('AddCommitteeScreen')}>
                <Icon name="group-add" size={20} color="white" />
                <Text style={imamStyles.buttonText}>Add Committee</Text>
            </TouchableOpacity>
            <ScrollView>
                {data.map((item) => (
                    <View key={item.id} style={imamStyles.infoCard}>
                        <View style={imamStyles.cardContent}>
                            <Image source={{ uri: "https://images.pexels.com/photos/30140435/pexels-photo-30140435/free-photo-of-moody-forest-in-heavy-fog.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" }} style={imamStyles.infoPhoto} />
                            <View style={imamStyles.cardText}>
                                <Paragraph level='Small' weight='Bold' style={imamStyles.cardTitle}>{item.name}</Paragraph>
                                <Paragraph level='Small' weight='Medium' style={imamStyles.cardSubtitle}>Members: {item.members}</Paragraph>
                                <Paragraph level='Small' weight='Medium' style={imamStyles.cardSubtitle}>Location: {item.location}</Paragraph>
                            </View>
                        </View>
                        <View style={imamStyles.actionButtons}>
                            <TouchableOpacity onPress={() => onEdit(item.id)}>
                                <Icon name="edit" size={20} color="#4CAF50" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => onDelete(item.id)}>
                                <Icon name="delete" size={20} color="#F44336" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

export default CommitteeTab;