import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  userContainer: {
    marginTop: 20,
    flexDirection: "column",
    alignItems: "center",
  },

  userAvatar: {
    width: 90,
    height: 90,
    borderRadius: 30,
  },

  txtInput: {
    width: 250,
    paddingLeft: 10,
    marginVertical: 5,
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 4
  },

  ImgView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  InputsView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  InputsBtns: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  signUpBtn: {
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9896B',
    padding: 10,
    borderRadius: 5,
    marginVertical: 3
  },

  signInBtn: {
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4F46BA',
    padding: 10,
    borderRadius: 5,
    marginVertical: 3
  },

  btnTxt: {
    color: '#fff'
  }

});
