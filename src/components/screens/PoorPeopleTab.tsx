import React from 'react';
import { imamStyles } from '../../styles/imamHomeStyles';
import { View, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import Paragraph from '../ui/Paragraph';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Heading from '../ui/Heading';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { baseURLPhoto } from '../../lib/api';

const PeopleTab: React.FC<PeopleTabProps> = ({ data, onAdd, onEdit, onDelete, loading }) => (
    <View style={imamStyles.tabContainer}>
        <TouchableOpacity style={imamStyles.addButton} onPress={onAdd}>
            <Icon name="person-add" size={20} color="white" />
            <Text style={imamStyles.buttonText}>Add Person</Text>
        </TouchableOpacity>

        {loading ? (
            <ScrollView>
                {Array.from({ length: 3 }).map((_, index) => (
                    <SkeletonPlaceholder key={index}>
                        <View style={imamStyles.infoCard}>
                            <View style={imamStyles.cardContent}>
                                <View style={imamStyles.skeletonPhoto} />
                                <View style={{ marginLeft: 10 }}>
                                    <View style={imamStyles.skeletonText} />
                                    <View style={imamStyles.skeletonTextSmall} />
                                    <View style={imamStyles.skeletonTextSmall} />
                                </View>
                            </View>
                        </View>
                    </SkeletonPlaceholder>
                ))}
            </ScrollView>
        ) : data.length === 0 ? (
            <View style={imamStyles.emptyContainer}>
                <Icon name="people-outline" size={60} color="#888" />
                <Heading level={6} weight="Bold" style={imamStyles.emptyTitle}>
                    No people added yet
                </Heading>
                <Paragraph level="Small" weight="Medium" style={imamStyles.emptyDescription}>
                    Tap the button above to add a new person in need.
                </Paragraph>
            </View>
        ) : (
            <ScrollView>
                {data.map((item) => (
                    <View key={item?._id} style={imamStyles.infoCard}>
                        <View style={imamStyles.cardContent}>
                            <Image
                                source={{ uri: baseURLPhoto(item?.photoUrl || "") || "https://images.pexels.com/photos/30140435/pexels-photo-30140435/free-photo-of-moody-forest-in-heavy-fog.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" }}
                                style={imamStyles.infoPhoto}
                            />
                            <View style={imamStyles.cardText}>
                                <Paragraph level="Small" weight="Bold" style={imamStyles.cardTitle}>
                                    {item.name}
                                </Paragraph>
                                <Paragraph level="Small" weight="Medium" style={imamStyles.cardSubtitle}>
                                    Age: {item.age}
                                </Paragraph>
                                <Paragraph level="Small" weight="Medium" style={imamStyles.cardSubtitle}>
                                    Location: {item.address}
                                </Paragraph>
                            </View>
                        </View>
                        <View style={imamStyles.actionButtons}>
                            <TouchableOpacity onPress={() => onEdit(item)}>
                                <Icon name="edit" size={20} color="#4CAF50" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => onDelete(item._id)}>
                                <Icon name="delete" size={20} color="#F44336" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        )}
    </View>
);

export default PeopleTab;
