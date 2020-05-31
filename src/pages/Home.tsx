import MessageListItem from '../components/MessageListItem';
import React, { useState } from 'react';
import { Message, getMessages } from '../data/messages';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonImg
} from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {

  let [messages, setMessages] = useState<Message[]>([]);
  let [page, setPage] = useState(1);

  useIonViewWillEnter(async () => {
    await nextMessages()
  });

  const nextMessagesEvent = async (e: CustomEvent) => {
    await nextMessages();
    (e.target as HTMLIonInfiniteScrollElement).complete()
  };

  const nextMessages = async () => {
    setMessages(messages.concat(await getMessages(page)))
    setPage(page + 1)
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <img src="/assets/bitwish.png" width="200" height="50" />
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle>
              <IonImg src="/assets/bitwish.png" />
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {messages.map(m => <MessageListItem key={m.txid} message={m} />)}
          <IonInfiniteScroll threshold="100px"
            onIonInfinite={nextMessagesEvent}>
            <IonInfiniteScrollContent
              loadingText="Loading more wishes...">
            </IonInfiniteScrollContent>
          </IonInfiniteScroll>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
