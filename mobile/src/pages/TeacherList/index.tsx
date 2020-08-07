import React, { useState } from 'react';
import { View, Text } from 'react-native';

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';
//import { useFocusEffect } from '@react-navigation/native';

export default function TeacherList() {

    const [isFilterVisible, setIsFilterVisible] = useState(false);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    const [teachers, setTeachers] = useState([]);

    const [favorites, setFavorites] = useState<number[]>([]);

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if(response) {            
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id;
                })

                setFavorites(favoritedTeachersIds);
            }
        });
    }

   // useFocusEffect(() => {loadFavorites()});


    function handleToggleFilterVisible() {
        setIsFilterVisible(!isFilterVisible);
    }

    async function handleFIltersSubmit() {
        loadFavorites();
        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        });
        setIsFilterVisible(false);
        setTeachers(response.data);
    }

    return (
        
        <View style={styles.container}>
            <PageHeader title="Proffys disponiveis" 
            headerRight={
                <BorderlessButton onPress={handleToggleFilterVisible}>
                    <Feather name="filter" size={20} color="#fff" />
                </BorderlessButton>
            }>
               {isFilterVisible && (
                   
                   <View style={styles.searchForm}>
                        <Text style={styles.label}>Matérias</Text>
                        <TextInput style={styles.input} placeholder="Matérias:" placeholderTextColor="#c1bccc"
                        value={subject} onChangeText={text => setSubject(text)} />
                    

                        <View style={styles.inputGroup}>
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Dia da semana</Text>
                            <TextInput style={styles.input} placeholder="Dia:" placeholderTextColor="#c1bccc"
                            value={week_day} onChangeText={text => setWeekDay(text)}  />
                        </View>

                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Horário</Text>
                            <TextInput style={styles.input} placeholder="Hora:" placeholderTextColor="#c1bccc"
                            value={time} onChangeText={text => setTime(text)}  />
                        </View>

                        
                        </View>
                        <RectButton onPress={handleFIltersSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Pesquisar</Text>
                        </RectButton>
                    </View>                    
               )}                    
               
            </PageHeader>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
            >
                {teachers.map((teacher: Teacher) =>{
                    return (
                    <TeacherItem 
                    key={teacher.id} 
                    teacher={teacher}
                    favorited={favorites.includes(teacher.id)}
                    />
                    )
                }  )}
             
            </ScrollView>
        </View>
        
    );
}