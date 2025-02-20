
import { moderateScale, ScaledSheet } from "react-native-size-matters";
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
    borderBottomColor: '#ddd',
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
    backgroundColor: "#ddd",
  },
  container:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
},
  skeletonText: {
    width: 120,
    height: 15,
    backgroundColor: "#ddd",
    marginBottom: 5,
    borderRadius: 5,
  },
  skeletonTextSmall: {
    width: 80,
    height: 12,
    backgroundColor: "#ddd",
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
    color: '#666',
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
  infoCard: {
    backgroundColor: 'white',
    borderRadius: '8@ms',
    padding: '16@ms',
    marginBottom: '16@ms',
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardContent: {
    flexDirection: 'row',
  },
  cardText: {
    marginLeft: '16@ms',
  },
  cardTitle: {
    color: Colors.text,
  },
  cardSubtitle: {
    color: Colors.text,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: '5@ms',
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.0)",
  },
  menu: {
    position: "absolute",
    top: 80,
    right: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 10,
    shadowColor: "#000",
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
  supportButton: {
    marginTop: 20,
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  supportButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
    paddingHorizontal: 20,
  },
  

});