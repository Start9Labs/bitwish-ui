import MessageListItem from '../components/MessageListItem';
import React, { useState } from 'react';
import { Message, getMessages, perPage } from '../data/messages';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonImg,
  IonSpinner
} from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {

  let [messages, setMessages] = useState<Message[]>([]);
  let [page, setPage] = useState(1);
  const [disableInfiniteScroll, setDisableInfiniteScroll] = useState<boolean>(false);
  let [ready, setReady] = useState(false);

  useIonViewWillEnter(async () => {
    await nextMessages()
    setReady(true)
  });

  const nextMessagesEvent = async (e: CustomEvent) => {
    await nextMessages();
    (e.target as HTMLIonInfiniteScrollElement).complete()
  };

  const nextMessages = async () => {
    const newMessages = await getMessages(page)
    setDisableInfiniteScroll(newMessages.length < perPage)
    setMessages(messages.concat(newMessages))
    setPage(page + 1)
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <img src="/assets/bitwish.png" width="200" height="50" alt="logo" />
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      {ready ?
        <IonContent fullscreen>
          {messages.map(m => <MessageListItem key={m.txid} message={m} />)}

          <IonInfiniteScroll
            threshold="100px"
            disabled={disableInfiniteScroll}
            onIonInfinite={nextMessagesEvent}>
            <IonInfiniteScrollContent
              loadingText="Loading more wishes...">
            </IonInfiniteScrollContent>
          </IonInfiniteScroll>
        </IonContent> : <IonSpinner color="primary" style={{
          position: 'absolute', left: '50%', top: '50%'
        }} />
      }
    </IonPage>
  );
};

export default Home;
