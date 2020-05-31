import React, { useState } from 'react';
import { Message, getMessage } from '../data/messages';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonToolbar,
  useIonViewWillEnter,
  IonSpinner
} from '@ionic/react';
import { personCircle, linkOutline } from 'ionicons/icons';
import { RouteComponentProps } from 'react-router';
import './ViewMessage.css';

interface ViewMessageProps extends RouteComponentProps<{ txid: string; }> { }

const ViewMessage: React.FC<ViewMessageProps> = ({ match }) => {

  const [message, setMessage] = useState<Message | null>();

  useIonViewWillEnter(async () => {
    let msg = null
    try {
      msg = await getMessage(match.params.txid);
    } catch (e) {
      console.error(e);
    }
    setMessage(msg);
  });

  return (
    <IonPage id="view-message-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons>
            <IonBackButton text="Feed" defaultHref="/home"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {message ? (
          <>
            <IonItem>
              <span className="ion-padding"></span>
              <IonLabel className="ion-text-wrap">
                <h2>
                  @{message.twitterHandle}
                  <span>&nbsp;</span>
                  <a href={`https://www.blockstream.info/tx/${message.txid}`} onClick={e => e.stopPropagation()} title="View on chain">
                    <IonIcon icon={linkOutline} color="primary" size="small"></IonIcon>
                  </a>
                  <span className="date">
                    <IonNote>{message.date.toLocaleString()}</IonNote>
                  </span>
                </h2>
              </IonLabel>
            </IonItem>

            <div className="ion-padding">
              <p>
                {message.content}
              </p>
            </div>
          </>
        ) :
          message === null ? <div>Message not found</div> :
            <IonSpinner color="primary" style={{
              position: 'absolute', left: '50%', top: '50%',
              transform: 'translate(-50%, -50%)'
            }} />
        }
      </IonContent>
    </IonPage>
  );
};

export default ViewMessage;
