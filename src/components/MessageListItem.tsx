import React from 'react';
import {
  IonItem,
  IonLabel,
  IonNote,
  IonIcon
} from '@ionic/react';
import { Message } from '../data/messages';
import './MessageListItem.css';
import { linkOutline } from 'ionicons/icons';

interface MessageListItemProps {
  message: Message;
}

function stopProp(e: React.MouseEvent) {
  e.stopPropagation()
}

const MessageListItem: React.FC<MessageListItemProps> = ({ message }) => {
  return (
    <IonItem routerLink={`/message/${message.txid}`} detail={false}>
      <div slot="start"></div>
      <IonLabel className="ion-text-wrap">
        <h2>
          @{message.twitterHandle}
          <span>&nbsp;</span>
          <a href={`https://www.blockstream.info/tx/${message.txid}`} onClick={stopProp} title="View on chain">
            <IonIcon icon={linkOutline} color="primary" size="small"></IonIcon>
          </a>
          <span className="date">
            <IonNote>{message.date.toLocaleString()}</IonNote>
          </span>
        </h2>
        <p>
          {message.content}
        </p>
      </IonLabel>
    </IonItem>
  );
};

export default MessageListItem;
