import { Dimensions, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import SafeAreaWrapper from '../components/SafeAreaWrapper'
import globalStyles from '../styles/global.style'
import Heading from '../components/ui/Heading'
import Paragraph from '../components/ui/Paragraph'
import { useTranslation } from '../hooks/useTranslation'
import Select from '../components/ui/Select'
import { Controller, useForm } from 'react-hook-form'
import Textarea from '../components/ui/Textarea'
import { yupResolver } from '@hookform/resolvers/yup'
import { validationSchema } from '../validations/login'
import AppButton from '../components/ui/AppButton'
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native'
import { AppStackParamList } from '../constants/route'
import { showToast } from '../utils/toast'
import { useApi } from '../hooks/useApi'
import LoadingOverlay from '../components/LoadingOverlay'
import ApiStrings from '../lib/apis_string'
import BackButton from '../components/BackButton'

const StatusScreen = () => {

    const { t } = useTranslation()
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();
    const route = useRoute<ImamHomeScreenRouteProp>();
    const poorPeople = route.params?.item as PersonItemProps;
    const { request, loading } = useApi()
    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onBlur',
    });

    const handleSubmitFormSubmit = async (form: any) => {
        const { message } = await request('post', ApiStrings.ADD_MARK_COMPLETE(poorPeople._id), { status: form.status, story: form?.story })
        showToast('success', message)
        navigation.navigate('RehabilitationDashboard')
        reset()
    }

    return (
        <SafeAreaWrapper>
            <LoadingOverlay visible={loading} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <View style={globalStyles.container}>
            <BackButton  />
                    <Heading style={{ marginTop: 10}} level={6} weight="Bold">
                        {t('rehabilitation.ensureRehabilitation.title')}
                    </Heading>
                    <Paragraph level='Small'>{t('rehabilitation.ensureRehabilitation.description')}</Paragraph>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={{ marginTop: 20 }}>
                            <Controller
                                name={'status'}
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <Select
                                        value={value}
                                        onChange={onChange}
                                        label={t('rehabilitation.currentStatus.label')}
                                        data={[{ label: 'failed', value: 'failed' }, { label: 'completed', value: 'completed' }]}
                                        placeholder={t('rehabilitation.currentStatus.placeholder')}
                                        error={errors?.status?.message}
                                    />
                                )}
                            />
                            <Controller
                                name={'story'}
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <Textarea
                                        label={t('rehabilitation.storyDescription.label')}
                                        value={value ?? ''}
                                        onChangeText={onChange}
                                        placeholder={t('rehabilitation.storyDescription.placeholder')}
                                        maxLength={300}
                                        error={errors.story?.message}
                                        numberOfLines={5}
                                    />
                                )}
                            />
                            <AppButton
                                onPress={handleSubmit(handleSubmitFormSubmit)}
                                text={t('submit')}
                                style={{ marginTop: Dimensions.get('window').height / 3.5 }}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaWrapper>
    )
}

export default StatusScreen