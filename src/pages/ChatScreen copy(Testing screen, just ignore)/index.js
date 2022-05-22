// import React, { useEffect, useState } from 'react';
// import {
//   ScrollView, StyleSheet, Text, View,
// } from 'react-native';
// import { ILNullPhoto } from '../../assets';
// import { ChatItem, Header, InputChat } from '../../component';
// import { databaseRef } from '../../config';
// import {
//   colors, fonts, getData, onLogScreenView, showError,
// } from '../../utils';
// import { getChatTime, setDateChat } from '../../utils/date';

// function ChatScreen({ navigation, route }) {
//   const userChat = route.params;
//   const [chatContent, setChatContent] = useState('');
//   const [user, setUser] = useState({});
//   const [chatData, setChatData] = useState([]);

//   useEffect(() => {
//     onLogScreenView('ChatScreen');
//     getDataUserFromLocal();
//     const chatId = `${user.uid}_${userChat.uid}`;
//     const urlFirebase = `chatting/${chatId}/allChat/`;
//     databaseRef()
//       .ref(urlFirebase)
//       .on('value', (snapshot) => {
//         // console.log('data chat : ', snapshot.val());
//         if (snapshot.val()) {
//           const dataSnapshot = snapshot.val();
//           const allDataChat = [];
//           // mengubah object tanggal menjadi sebuah array
//           Object.keys(dataSnapshot).map((key) => {
//             const dataChat = dataSnapshot[key];
//             const newDataChat = [];

//             // mengubah data chat yang berada didalam tanggal menjadi array
//             Object.keys(dataChat).map((itemChat) => {
//               newDataChat.push({
//                 id: itemChat,
//                 data: dataChat[itemChat],
//               });
//             });
//             allDataChat.push({
//               id: key,
//               data: newDataChat,
//             });
//           });
//           setChatData(allDataChat);
//         }
//       });
//   }, [userChat.uid, user.uid]);

//   const getDataUserFromLocal = () => {
//     getData('user').then((res) => {
//       setUser(res);
//     });
//   };

//   const chatSend = () => {
//     const today = new Date();

//     const data = {
//       sendBy: user.uid,
//       chatDate: today.getTime(),
//       chatTime: getChatTime(today),
//       chatContent,
//     };

//     const chatId = `${user.uid}_${userChat.uid}`;

//     const urlFirebase = `chatting/${chatId}/allChat/${setDateChat(today)}`;
//     const urlMessageUser = `messages/${user.uid}/${chatId}`;
//     const urlMessageAnotherUser = `messages/${userChat.uid}/${chatId}`;
//     const dataHistoryChatForUser = {
//       lastContentChat: chatContent,
//       lastChatDate: today.getTime(),
//       uidPartner: userChat.uid,
//     };
//     const dataHistoryChatForAnotherUser = {
//       lastContentChat: chatContent,
//       lastChatDate: today.getTime(),
//       uidPartner: user.uid,
//     };
//     databaseRef()
//       .ref(urlFirebase)
//       .push(data)
//       .then(() => {
//         setChatContent('');
//         // set history for user
//         databaseRef().ref(urlMessageUser).set(dataHistoryChatForUser);

//         // set history for dataDoctor
//         databaseRef().ref(urlMessageAnotherUser).set(dataHistoryChatForAnotherUser);
//       })
//       .catch((err) => {
//         showError(err.message);
//       });
//   };
//   return (
//     <View style={styles.page}>
// <Header
//   type="dark-profile"
//   title={userChat.fullname}
//   photo={userChat.photo.length > 1 ? { uri: userChat.photo } : ILNullPhoto}
//   desc={userChat.bio}
//   onPress={() => navigation.goBack()}
// />;
//       <View style={styles.content}>
//         <ScrollView showsVerticalScrollIndicator={false}>
//           {chatData.map((chat) => (
//             <View key={chat.id}>
//               <Text style={styles.chatDate}>{chat.id}</Text>
//               {console.log(chat)}
//               {chat.data.map((itemChat) => {
//                 const isMe = itemChat.data.sendBy === user.uid;
//                 return (
//                   <ChatItem
//                     key={itemChat.id}
//                     isMe={isMe}
//                     text={itemChat.data.chatContent}
//                     date={itemChat.data.chatTime}
//                     photo={isMe ? null : { uri: userChat.photo }}
//                   />
//                 );
//               })}
//             </View>
//           ))}
//         </ScrollView>
//       </View>
//       <InputChat
//         value={chatContent}
//         onChangeText={(value) => setChatContent(value)}
//         onButtonPress={chatSend}
//         targetChat={userChat}
//       />
//     </View>
//   );
// }

// export default ChatScreen;

// const styles = StyleSheet.create({
//   page: {
//     flex: 1,
//     backgroundColor: colors.background.primary,
//   },
//   chatDate: {
//     fontSize: 11,
//     fontFamily: fonts.primary.normal,
//     color: colors.text.secondary,
//     textAlign: 'center',
//     marginVertical: 20,
//   },
//   content: {
//     flex: 1,
//   },
// });
