
import { Colors } from "../configs/colors";
import { ScaledSheet } from "react-native-size-matters";


export const kycStartedStyles = ScaledSheet.create({
    scrollContent: {
        paddingHorizontal: '20@s',
        paddingBottom: '20@vs',
    },
    header: {
        marginBottom: '30@vs',
    },
    title: {
        color: Colors.text,
        marginBottom: '10@vs',
    },
    subtitle: {
        color: Colors.textSecondary,
    },
    stepsContainer: {
        marginTop: '5@vs',
    },
    stepItem: {
        flexDirection: 'row',
        // alignItems: 'center',
        backgroundColor: Colors.light,
        borderRadius: '10@s',
        padding: '15@s',
        marginBottom: '15@vs',
    },
    stepIcon: {
        marginRight: '15@s',
    },
    stepTextContainer: {
        flex: 1,
    },
    stepTitle: {
        color: Colors.text,
        marginBottom: '5@vs',
    },
    stepDescription: {
        color: Colors.text,
        lineHeight: '20@vs',
    },
    footer: {
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        padding: '20@s',
        backgroundColor: Colors.white,
    },
    securityInfo: {
        flexDirection: 'row',
        // alignItems: 'center',
        marginBottom: '20@vs',
    },
    securityText: {
        color: Colors.text,
        marginLeft: '10@s',
        flex: 1,
    },
});