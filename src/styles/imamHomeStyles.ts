
import { ScaledSheet } from "react-native-size-matters";
import { Colors } from "../configs/colors";


export const imamStyles = ScaledSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[300],
    paddingBottom: 10,
    marginBottom: 15,
  },
  greeting: {
    color: Colors.text,
  },
  skeletonPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.neutral[300],
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  skeletonText: {
    width: 120,
    height: 15,
    backgroundColor: Colors.neutral[300],
    marginBottom: 5,
    borderRadius: 5,
  },
  skeletonTextSmall: {
    width: 80,
    height: 12,
    backgroundColor: Colors.neutral[300],
    marginBottom: 5,
    borderRadius: 5,
  },
  infoPhoto: {
    width: '60@ms',
    height: '60@ms',
    borderRadius: '3@ms',
    objectFit: 'cover'
  },
  profileAvatar: {
    width: '40@ms',
    height: '40@ms',
    borderRadius: '40@ms',
    objectFit: 'cover'
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '20@ms',
    marginBottom: '20@ms',
    gap: "20@ms"
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: '8@ms',
    padding: '16@ms',
    alignItems: 'center',
    elevation: 2,
  },
  statLabel: {
    color: Colors.black,
  },
  statValue: {
    color: Colors.text,
  },
  tabContainer: {
    flex: 1,
    marginTop: '16@ms'
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    padding: '12@ms',
    borderRadius: '8@ms',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16@ms',
  },
  buttonText: {
    color: 'white',
    marginLeft: '8@ms',
    fontWeight: 'bold',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardText: {
    flex: 1,
    marginLeft: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 5,
  },
  infoCard: {
    backgroundColor: Colors.white,
    borderRadius: '8@ms',
    padding: '16@ms',
    marginTop: '16@ms',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.neutral[200]
  },
  cardTitle: {
    color: Colors.text,
  },
  cardSubtitle: {
    color: Colors.text,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.0)",
  },
  menu: {
    position: "absolute",
    top: 80,
    right: 15,
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingVertical: 10,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    width: 150,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  menuText: {
    marginLeft: 10,
    fontSize: 16,
  },
  kycContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  kycTitle: {
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  kycDescription: {
    color: Colors.lightGray,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 10,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontWeight: 'bold',
  },
  emptyDescription: {
    color: Colors.black,
    textAlign: 'center',
    marginTop: 5,
    paddingHorizontal: 20,
  },
  rejectionContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  rejectionReason: {
    color: Colors.danger,
    textAlign: 'center',
    marginBottom: 10,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: '8@ms',
    marginRight: '20@ms',
    width: '200@ms',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: '4@ms',
    elevation: 2,
    marginTop: '15@ms',
  },
  detailsProfilePicture: { width: '100%', height: '125@ms', alignSelf: 'center', borderTopLeftRadius: '10@ms', borderTopRightRadius: '10@ms', objectFit: 'cover' },
  flexLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '5@ms',
    gap: '10@ms'
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '90%',
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
  closeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
  },
  label: {
    width: 100,
    color: Colors.black,
  },
  value: {
    flex: 1,
    color: Colors.black,
  },

});