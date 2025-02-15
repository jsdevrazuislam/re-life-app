import React from 'react'
import { imamStyles } from '../../styles/imamHomeStyles';
import { View, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import Paragraph from '../ui/Paragraph';
import Icon from 'react-native-vector-icons/MaterialIcons';


const PeopleTab: React.FC<PeopleTabProps> = ({ data, onAdd, onEdit, onDelete }) => (
    <View style={imamStyles.tabContainer}>
        <TouchableOpacity style={imamStyles.addButton} onPress={onAdd}>
            <Icon name="person-add" size={20} color="white" />
            <Text style={imamStyles.buttonText}>Add Person</Text>
        </TouchableOpacity>
        <ScrollView>
            {data.map((item) => (
                <View key={item.id} style={imamStyles.infoCard}>
                    <View style={imamStyles.cardContent}>
                        <Image source={{ uri: "https://images.pexels.com/photos/30140435/pexels-photo-30140435/free-photo-of-moody-forest-in-heavy-fog.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" }} style={imamStyles.infoPhoto} />
                        <View style={imamStyles.cardText}>
                            <Paragraph level='Small' weight='Bold' style={imamStyles.cardTitle}>{item.name}</Paragraph>
                            <Paragraph level='Small' weight='Medium' style={imamStyles.cardSubtitle}>Age: {item.age}</Paragraph>
                            <Paragraph level='Small' weight='Medium' style={imamStyles.cardSubtitle}>Needs: {item.needs}</Paragraph>
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
);

export default PeopleTab